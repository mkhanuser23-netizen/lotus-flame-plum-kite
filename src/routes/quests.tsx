import { createFileRoute } from "@tanstack/react-router";
import { quests } from "@/lib/family/content";
import { copy } from "@/lib/family/copy";
import { useFamily } from "@/lib/family/store";
import { tx } from "@/lib/family/types";
import { Button, ValuePill, fieldClass } from "@/components/family/ui";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/quests")({ component: QuestsPage });

function QuestsPage() {
  const lang = useFamily((state) => state.lang);
  const questState = useFamily((state) => state.quests);
  const setQuest = useFamily((state) => state.setQuest);
  const c = copy[lang];

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <header>
        <h1 className="font-display text-4xl">{c.quests.title}</h1>
        <p className="mt-3 max-w-xl text-muted">{c.quests.lead}</p>
      </header>
      <ul className="flex flex-col gap-4">
        {quests.map((quest) => {
          const progress = questState[quest.id];
          const done = Boolean(progress?.done);
          const reflection = lang === "ar" ? progress?.noteAr || progress?.noteEn || "" : progress?.noteEn || progress?.noteAr || "";
          return (
            <li key={quest.id} className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex flex-wrap items-center gap-2">
                <ValuePill id={quest.value} lang={lang} />
                <span className="text-sm text-muted">{c.minutes(quest.minutes)}</span>
                {done && <span className="text-sm font-medium text-primary">{c.kept}</span>}
              </div>
              <h2 className="mt-3 font-display text-2xl">{tx(lang, quest.title)}</h2>
              <p className="mt-2 text-muted">{tx(lang, quest.detail)}</p>
              {done && (
                <label className="mt-4 flex flex-col gap-1.5 text-sm">
                  <span className="font-medium">{c.quests.reflection}</span>
                  <textarea
                    className={cn(fieldClass, "min-h-24 py-3")}
                    maxLength={180}
                    placeholder={c.quests.notePh}
                    value={reflection}
                    onChange={(event) => {
                      const line = event.target.value;
                      setQuest(quest.id, lang === "ar" ? { noteAr: line } : { noteEn: line });
                    }}
                  />
                </label>
              )}
              <div className="mt-4">
                <Button
                  variant={done ? "quiet" : "primary"}
                  onClick={() => setQuest(quest.id, { done: !done })}
                >
                  {done ? c.quests.undo : c.quests.mark}
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
