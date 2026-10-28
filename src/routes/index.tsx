import { createFileRoute, Link } from "@tanstack/react-router";
import { practices, quests, ritualById, rituals } from "@/lib/family/content";
import { copy } from "@/lib/family/copy";
import {
  memoryNote,
  memoryWhen,
  noteText,
  noteWhen,
  planTitle,
  sortedPlans,
  useFamily,
} from "@/lib/family/store";
import { memberName, tx } from "@/lib/family/types";
import { Face, TextLink, ValuePill } from "@/components/family/ui";
import { useDaypart } from "@/lib/family/use-weekday";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const lang = useFamily((state) => state.lang);
  const householdEn = useFamily((state) => state.householdEn);
  const householdAr = useFamily((state) => state.householdAr);
  const members = useFamily((state) => state.members);
  const plans = useFamily((state) => state.plans);
  const notes = useFamily((state) => state.notes);
  const memories = useFamily((state) => state.memories);
  const questState = useFamily((state) => state.quests);
  const practiceState = useFamily((state) => state.practices);
  const c = copy[lang];
  const { part, day } = useDaypart();
  const featured = rituals[0];
  const short = rituals[1];
  const keptPractices = practices.filter((practice) => practiceState[practice.id]).length;
  const questsDone = Object.values(questState).filter((quest) => quest.done).length;
  const minutes =
    memories.reduce((sum, memory) => sum + memory.minutes, 0) +
    plans.filter((plan) => plan.done).reduce((sum, plan) => sum + plan.minutes, 0);
  const nextQuest = quests.find((quest) => !questState[quest.id]?.done) ?? quests[0];
  const greeting = part ? c[part] : null;

  return (
    <div className="flex flex-col gap-10">
      <header className="max-w-2xl">
        {greeting && day !== null && (
          <p className="text-sm text-muted">
            {greeting} · {c.days[day]}
          </p>
        )}
        <h1 className="mt-2 font-display text-4xl leading-tight md:text-5xl">
          {c.householdLine(lang === "ar" ? householdAr : householdEn)}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">{c.home.dek}</p>
        <p className="mt-4 text-sm text-fg">{c.stats(minutes, notes.length, questsDone)}</p>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.85fr)]">
        <div className="flex flex-col gap-8">
          <article className="rounded-2xl bg-primary p-6 text-bg md:p-8">
            <p className="text-sm">{tx(lang, featured.fits)}</p>
            <h2 className="mt-3 font-display text-4xl leading-tight">{tx(lang, featured.title)}</h2>
            <p className="mt-3 max-w-md text-lg">{tx(lang, featured.promise)}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/majlis/$ritualId"
                params={{ ritualId: featured.id }}
                className="inline-flex min-h-11 items-center rounded-full bg-bg px-5 text-sm font-medium text-primary"
              >
                {c.home.begin}
              </Link>
              <span className="text-sm">
                {c.minutes(featured.minutes)} · {tx(lang, { en: "Kindness", ar: "اللطف" })}
              </span>
            </div>
          </article>

          {short && (
            <Link
              to="/majlis/$ritualId"
              params={{ ritualId: short.id }}
              className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5"
            >
              <span>
                <span className="block text-sm text-muted">{c.home.ifShort}</span>
                <span className="mt-1 block font-display text-2xl">{tx(lang, short.title)}</span>
                <span className="mt-1 block text-sm text-muted">{tx(lang, short.promise)}</span>
              </span>
              <span className="shrink-0 text-sm font-medium text-primary">{c.minutes(short.minutes)}</span>
            </Link>
          )}

          <section>
            <div className="flex items-end justify-between gap-3">
              <h2 className="font-display text-2xl">{c.home.thisWeek}</h2>
              <TextLink to="/week">{c.home.seeWeek}</TextLink>
            </div>
            <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-surface">
              {sortedPlans(plans).map((plan) => (
                <li key={plan.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted">
                      {c.days[plan.day]} · {plan.time}
                    </p>
                    <p className="truncate font-medium">{planTitle(plan, lang)}</p>
                  </div>
                  <span className="shrink-0 text-sm text-muted">{c.minutes(plan.minutes)}</span>
                  <span className={plan.done ? "text-sm font-medium text-primary" : "text-sm text-muted"}>
                    {plan.done ? c.kept : c.open}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {memories.length > 0 && (
            <section>
              <h2 className="font-display text-2xl">{c.home.keptMoments}</h2>
              <ul className="mt-3 flex flex-col gap-3">
                {memories.slice(0, 3).map((memory) => {
                  const ritual = ritualById(memory.ritualId);
                  return (
                    <li key={memory.id} className="rounded-2xl border border-border bg-surface p-4">
                      <p className="text-sm text-muted">
                        {memoryWhen(memory, lang)}
                        {ritual ? ` · ${tx(lang, ritual.title)}` : ""}
                      </p>
                      <p className="mt-1">{memoryNote(memory, lang) || tx(lang, ritual?.title ?? { en: "Majlis", ar: "مجلس" })}</p>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>

        <div className="flex flex-col gap-8">
          <section>
            <h2 className="font-display text-2xl">{c.home.valuesTitle}</h2>
            <p className="mt-1 text-sm text-muted">{c.home.practicesKept(keptPractices, practices.length)}</p>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {(["respect", "kindness", "cooperation", "responsibility"] as const).map((id) => {
                const owned = practices.filter((practice) => practice.value === id);
                const done = owned.filter((practice) => practiceState[practice.id]).length;
                return (
                  <li key={id}>
                    <Link
                      to="/values"
                      hash={id}
                      className="flex min-h-24 flex-col justify-between rounded-2xl border border-border bg-surface p-3"
                    >
                      <ValuePill id={id} lang={lang} />
                      <span className="mt-3 text-sm tabular-nums text-muted">
                        {done}/{owned.length}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <div className="flex items-end justify-between gap-3">
              <h2 className="font-display text-2xl">{c.home.saidAloud}</h2>
              <TextLink to="/kindness">{c.home.seeNotes}</TextLink>
            </div>
            <ul className="mt-3 flex flex-col gap-3">
              {notes.slice(0, 2).map((note) => {
                const from = members.find((member) => member.id === note.fromId);
                const to = members.find((member) => member.id === note.toId);
                return (
                  <li key={note.id} className="border-t-2 border-accent bg-surface p-4">
                    <p>{noteText(note, lang)}</p>
                    <p className="mt-3 flex items-center gap-2 text-sm text-muted">
                      {from && <Face member={from} lang={lang} className="size-7 text-xs" />}
                      <span>
                        {from ? memberName(from, lang) : "—"}
                        {lang === "ar" ? " إلى " : " to "}
                        {to ? memberName(to, lang) : "—"} · {noteWhen(note, lang)}
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>

          {nextQuest && (
            <section>
              <div className="flex items-end justify-between gap-3">
                <h2 className="font-display text-2xl">{c.home.stillOpen}</h2>
                <TextLink to="/quests">{c.home.seeQuests}</TextLink>
              </div>
              <Link to="/quests" className="mt-3 block rounded-2xl border border-border bg-surface p-4">
                <ValuePill id={nextQuest.value} lang={lang} />
                <p className="mt-3 font-display text-2xl">{tx(lang, nextQuest.title)}</p>
                <p className="mt-2 text-sm text-muted">{tx(lang, nextQuest.detail)}</p>
              </Link>
            </section>
          )}
        </div>
      </div>

      <p className="max-w-3xl border-t border-border pt-6 text-sm leading-relaxed text-muted">{c.home.thesis}</p>
    </div>
  );
}
