import { createFileRoute, Link } from "@tanstack/react-router";
import { rituals } from "@/lib/family/content";
import { copy } from "@/lib/family/copy";
import { useFamily } from "@/lib/family/store";
import { tx } from "@/lib/family/types";
import { ValuePill } from "@/components/family/ui";

export const Route = createFileRoute("/majlis/")({ component: MajlisPage });

function MajlisPage() {
  const lang = useFamily((state) => state.lang);
  const c = copy[lang];
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <header>
        <h1 className="font-display text-4xl">{c.majlis.title}</h1>
        <p className="mt-3 max-w-xl text-muted">{c.majlis.lead}</p>
      </header>
      <ul className="divide-y divide-border border-y border-border">
        {rituals.map((ritual) => (
          <li key={ritual.id}>
            <Link
              to="/majlis/$ritualId"
              params={{ ritualId: ritual.id }}
              className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="min-w-0">
                <span className="block font-display text-2xl">{tx(lang, ritual.title)}</span>
                <span className="mt-1 block text-sm text-muted">{tx(lang, ritual.fits)}</span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <ValuePill id={ritual.value} lang={lang} />
                <span className="text-sm font-medium text-primary">
                  {c.minutes(ritual.minutes)} · {c.majlis.begin}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
