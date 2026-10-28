import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { practices, values } from "@/lib/family/content";
import { copy } from "@/lib/family/copy";
import { useFamily } from "@/lib/family/store";
import { tx } from "@/lib/family/types";
import { ValueIcon } from "@/components/family/ui";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/values")({ component: ValuesPage });

function ValuesPage() {
  const lang = useFamily((state) => state.lang);
  const practiceState = useFamily((state) => state.practices);
  const togglePractice = useFamily((state) => state.togglePractice);
  const c = copy[lang];

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <header>
        <h1 className="font-display text-4xl">{c.values.title}</h1>
        <p className="mt-3 max-w-xl text-muted">{c.values.lead}</p>
      </header>
      {values.map((value) => {
        const items = practices.filter((practice) => practice.value === value.id);
        return (
          <section key={value.id} id={value.id} className="border-t border-border pt-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-sunken text-primary">
                <ValueIcon id={value.id} className="size-5" />
              </span>
              <h2 className="font-display text-3xl">{tx(lang, value.name)}</h2>
            </div>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed">{tx(lang, value.blurb)}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {items.map((practice) => {
                const on = Boolean(practiceState[practice.id]);
                return (
                  <li key={practice.id}>
                    <button
                      type="button"
                      aria-pressed={on}
                      className="flex min-h-11 w-full items-center gap-3 rounded-2xl border border-border bg-surface px-3 py-2 text-start"
                      onClick={() => togglePractice(practice.id)}
                    >
                      <span
                        className={cn(
                          "inline-flex size-6 shrink-0 items-center justify-center rounded-full border",
                          on ? "border-primary bg-primary text-bg" : "border-border text-transparent",
                        )}
                      >
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className={on ? "text-fg" : "text-muted"}>{tx(lang, practice.text)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
