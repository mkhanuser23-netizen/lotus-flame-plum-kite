import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useEffect, useState } from "react";
import type { Ritual } from "@/lib/family/content";
import { copy } from "@/lib/family/copy";
import { planTitle, sortedPlans, useFamily } from "@/lib/family/store";
import type { Lang } from "@/lib/family/types";
import { memberName, tx } from "@/lib/family/types";
import { Button, Face, ValuePill, fieldClass } from "@/components/family/ui";
import { cn } from "@/lib/cn";

function clock(total: number) {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function Player({ ritual }: { ritual: Ritual }) {
  const lang = useFamily((state) => state.lang);
  const members = useFamily((state) => state.members);
  const plans = useFamily((state) => state.plans);
  const addMemory = useFamily((state) => state.addMemory);
  const togglePlan = useFamily((state) => state.togglePlan);
  const c = copy[lang];
  const steps = ritual.steps;
  const total = steps.length + 1;
  const [index, setIndex] = useState(0);
  const [present, setPresent] = useState<string[]>(() => members.map((member) => member.id));
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [remaining, setRemaining] = useState(ritual.minutes * 60);
  const [running, setRunning] = useState(false);
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setRemaining((value) => (value <= 0 ? 0 : value - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (remaining === 0) setRunning(false);
  }, [remaining]);

  const openPlan = sortedPlans(plans).find((plan) => !plan.done);

  function save() {
    const line = note.trim();
    addMemory({
      ritualId: ritual.id,
      minutes: ritual.minutes,
      noteEn: line,
      noteAr: line,
      whenEn: "Just now",
      whenAr: "الآن",
      memberIds: present,
    });
    setSaved(true);
  }

  if (saved) {
    return (
      <div className="mx-auto flex max-w-xl flex-col gap-6 py-6">
        <p className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-bg">
          <Check className="size-6" aria-hidden="true" />
        </p>
        <div>
          <h1 className="font-display text-4xl text-fg">{c.player.savedTitle}</h1>
          <p className="mt-3 text-lg text-muted">{c.player.savedBody}</p>
          {note.trim() && <p className="mt-6 border-s-2 border-primary ps-4 text-xl">{note.trim()}</p>}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-bg"
          >
            {c.player.home}
          </Link>
          <Link
            to="/kindness"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-sunken px-5 text-sm font-medium text-fg"
          >
            {c.player.leaveNote}
          </Link>
          {openPlan && !marked && (
            <Button
              variant="ghost"
              onClick={() => {
                togglePlan(openPlan.id);
                setMarked(true);
              }}
            >
              {c.player.markPlan(planTitle(openPlan, lang))}
            </Button>
          )}
        </div>
      </div>
    );
  }

  const step = steps[index];
  const closing = index === steps.length;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <Link to="/majlis" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted">
          <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
          {c.player.back}
        </Link>
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-sunken px-3 text-sm font-medium tabular-nums text-fg"
          onClick={() => setRunning((value) => !value)}
        >
          <span>{clock(remaining)}</span>
          <span className="text-muted">{running ? c.player.pauseClock : c.player.startClock}</span>
        </button>
      </div>

      <div>
        <div className="mb-3 flex gap-1" aria-hidden="true">
          {Array.from({ length: total }, (_, tick) => (
            <span key={tick} className={cn("h-1 flex-1 rounded-full", tick <= index ? "bg-primary" : "bg-border")} />
          ))}
        </div>
        <p className="text-sm tabular-nums text-muted">{c.player.stepOf(index + 1, total)}</p>
        <h1 className="mt-2 font-display text-4xl leading-tight">{tx(lang, ritual.title)}</h1>
        <div className="mt-3">
          <ValuePill id={ritual.value} lang={lang} />
        </div>
      </div>

      {closing ? (
        <CloseStep lang={lang} note={note} setNote={setNote} onSave={save} canSave={present.length > 0} />
      ) : step?.kind === "gather" ? (
        <section className="flex flex-col gap-5">
          <h2 className="font-display text-2xl">{tx(lang, step.title)}</h2>
          <p className="text-lg leading-relaxed">{tx(lang, step.body)}</p>
          <div className="rounded-t-[2.5rem] border border-border bg-sunken px-5 pb-6 pt-8">
            <p className="text-center text-sm text-muted">{c.player.phonesAway}</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {members
                .filter((member) => present.includes(member.id))
                .map((member) => (
                  <li key={member.id}>
                    <Face member={member} lang={lang} />
                  </li>
                ))}
            </ul>
          </div>
          <fieldset>
            <legend className="text-sm font-medium">{c.player.whosHere}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {members.map((member) => {
                const on = present.includes(member.id);
                return (
                  <button
                    key={member.id}
                    type="button"
                    aria-pressed={on}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-sm",
                      on ? "border-primary bg-surface text-fg" : "border-border text-muted",
                    )}
                    onClick={() =>
                      setPresent((ids) =>
                        on ? ids.filter((id) => id !== member.id) : [...ids, member.id],
                      )
                    }
                  >
                    {memberName(member, lang)}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </section>
      ) : step?.kind === "read" || step?.kind === "do" ? (
        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl">{tx(lang, step.title)}</h2>
          <p className="text-xl leading-relaxed">{tx(lang, step.body)}</p>
        </section>
      ) : step?.kind === "talk" ? (
        <section className="flex flex-col gap-4">
          <h2 className="font-display text-2xl">{tx(lang, step.title)}</h2>
          <ol className="flex flex-col gap-4">
            {step.prompts.map((prompt) => (
              <li key={prompt.en} className="border-s-2 border-primary ps-4 text-xl leading-snug">
                {tx(lang, prompt)}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <div className="flex items-center justify-between gap-3 pt-2">
        <Button variant="ghost" disabled={index === 0} onClick={() => setIndex((value) => Math.max(0, value - 1))}>
          {c.player.previous}
        </Button>
        {!closing && (
          <Button disabled={present.length === 0} onClick={() => setIndex((value) => Math.min(total - 1, value + 1))}>
            {c.player.next}
          </Button>
        )}
      </div>
    </div>
  );
}

function CloseStep({
  lang,
  note,
  setNote,
  onSave,
  canSave,
}: {
  lang: Lang;
  note: string;
  setNote: (value: string) => void;
  onSave: () => void;
  canSave: boolean;
}) {
  const c = copy[lang];
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-2xl">{c.player.remember}</h2>
      <textarea
        className={cn(fieldClass, "min-h-32 py-3")}
        maxLength={180}
        value={note}
        placeholder={c.player.placeholder}
        onChange={(event) => setNote(event.target.value)}
      />
      <Button disabled={!canSave} onClick={onSave}>
        {c.player.save}
      </Button>
    </section>
  );
}
