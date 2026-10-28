import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { kindnessPrompts } from "@/lib/family/content";
import { copy } from "@/lib/family/copy";
import { noteText, noteWhen, useFamily } from "@/lib/family/store";
import { memberName, tx } from "@/lib/family/types";
import { Button, Face, Field, fieldClass } from "@/components/family/ui";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/kindness")({ component: KindnessPage });

function KindnessPage() {
  const lang = useFamily((state) => state.lang);
  const members = useFamily((state) => state.members);
  const notes = useFamily((state) => state.notes);
  const addNote = useFamily((state) => state.addNote);
  const removeNote = useFamily((state) => state.removeNote);
  const c = copy[lang];
  const [fromId, setFromId] = useState(members[0]?.id ?? "");
  const [toId, setToId] = useState(members[1]?.id ?? members[0]?.id ?? "");
  const [text, setText] = useState("");

  const from = members.some((member) => member.id === fromId) ? fromId : (members[0]?.id ?? "");
  const to = members.some((member) => member.id === toId) ? toId : (members[1]?.id ?? from);

  function send() {
    const line = text.trim();
    if (!line || !from || !to) return;
    addNote({ fromId: from, toId: to, text: line, lang });
    setText("");
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <header>
        <h1 className="font-display text-4xl">{c.kindness.title}</h1>
        <p className="mt-3 max-w-xl text-muted">{c.kindness.lead}</p>
      </header>

      <form
        className="grid gap-4 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          send();
        }}
      >
        <Field label={c.kindness.from}>
          <select className={fieldClass} value={from} onChange={(event) => setFromId(event.target.value)}>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {memberName(member, lang)}
              </option>
            ))}
          </select>
        </Field>
        <Field label={c.kindness.to}>
          <select className={fieldClass} value={to} onChange={(event) => setToId(event.target.value)}>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {memberName(member, lang)}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label={c.kindness.note}>
            <textarea
              className={cn(fieldClass, "min-h-28 py-3")}
              maxLength={180}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </Field>
          <p className="mt-1 text-end text-xs tabular-nums text-muted">{text.length}/180</p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-sm font-medium">{c.kindness.prompts}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {kindnessPrompts.map((prompt) => (
              <button
                key={prompt.en}
                type="button"
                className="min-h-11 rounded-full border border-border px-3 text-start text-sm text-fg"
                onClick={() => setText(tx(lang, prompt))}
              >
                {tx(lang, prompt)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Button type="submit" disabled={!text.trim()}>
            {c.kindness.send}
          </Button>
        </div>
      </form>

      {notes.length === 0 ? (
        <p className="text-muted">{c.kindness.empty}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {notes.map((note) => {
            const fromMember = members.find((member) => member.id === note.fromId);
            const toMember = members.find((member) => member.id === note.toId);
            return (
              <li key={note.id} className="border-t-2 border-accent bg-surface p-4">
                <p className="text-lg">{noteText(note, lang)}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="flex min-w-0 items-center gap-2 text-sm text-muted">
                    {fromMember && <Face member={fromMember} lang={lang} className="size-8 text-xs" />}
                    <span className="truncate">
                      {fromMember ? memberName(fromMember, lang) : "—"}
                      {lang === "ar" ? " إلى " : " to "}
                      {toMember ? memberName(toMember, lang) : "—"} · {noteWhen(note, lang)}
                    </span>
                  </p>
                  <button
                    type="button"
                    className="min-h-11 shrink-0 text-sm text-muted"
                    onClick={() => removeNote(note.id)}
                  >
                    {c.kindness.remove}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
