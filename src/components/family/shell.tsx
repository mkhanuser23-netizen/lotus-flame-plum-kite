import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays, Compass, Feather, House, MessagesSquare, Sun } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { emirateLabel } from "@/lib/family/content";
import { copy } from "@/lib/family/copy";
import { useFamily } from "@/lib/family/store";
import { cn } from "@/lib/cn";

const dock = [
  { to: "/", label: "today" as const, icon: Sun, exact: true },
  { to: "/majlis", label: "majlis" as const, icon: MessagesSquare, exact: false },
  { to: "/week", label: "week" as const, icon: CalendarDays, exact: false },
  { to: "/kindness", label: "kindness" as const, icon: Feather, exact: false },
  { to: "/quests", label: "quests" as const, icon: Compass, exact: false },
];

const desktop = [
  dock[0],
  dock[1],
  { to: "/values", label: "values" as const, icon: House, exact: false },
  dock[2],
  dock[3],
  dock[4],
];

function isActive(path: string, to: string, exact: boolean) {
  if (exact) return path === to;
  return path === to || path.startsWith(`${to}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const lang = useFamily((state) => state.lang);
  const setLang = useFamily((state) => state.setLang);
  const emirate = useFamily((state) => state.emirate);
  const path = useRouterState({ select: (state) => state.location.pathname });
  const c = copy[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const playing = path.startsWith("/majlis/");
  const navLabel = lang === "ar" ? "التنقل" : "Navigation";

  useEffect(() => {
    let live = true;
    void (async () => {
      await useFamily.persist.rehydrate();
      if (!live) return;
      const next = useFamily.getState().lang;
      document.documentElement.lang = next;
      document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    })();
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <div lang={lang} dir={dir} className={cn("min-h-dvh bg-bg text-fg", lang === "ar" && "font-ar")}>
      <div className="h-1 bg-primary" />
      <header className="sticky top-0 z-20 border-b border-border bg-bg">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 md:px-8">
          <Link to="/" className="min-w-0">
            <span className="flex items-center gap-2">
              <span className="size-2.5 shrink-0 rounded-sm bg-accent" aria-hidden="true" />
              <span className={cn("font-display text-xl leading-none", lang === "en" && "tracking-tight")}>
                {lang === "ar" ? "بيتنا" : "Baytna"}
              </span>
            </span>
            <span className="mt-1 block truncate text-xs text-muted">{emirateLabel(emirate, lang)}</span>
          </Link>
          <div className="ms-auto flex shrink-0 items-center gap-1">
            <Link
              to="/family"
              className={cn(
                "inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium",
                isActive(path, "/family", false) ? "text-primary" : "text-fg",
              )}
            >
              {c.nav.household}
            </Link>
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-medium text-primary transition-transform duration-150 ease-out active:scale-[0.96]"
              aria-label={c.switchLabel}
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
            >
              {c.switchTo}
            </button>
          </div>
        </div>
        <nav className="mx-auto hidden max-w-5xl gap-1 px-6 pb-2 md:flex md:px-8" aria-label={navLabel}>
          {desktop.map((item) => {
            const active = isActive(path, item.to, item.exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium",
                  active ? "bg-sunken text-primary" : "text-muted",
                )}
              >
                {c.nav[item.label]}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className={cn("mx-auto w-full max-w-5xl px-4 pt-6 md:px-8", playing ? "pb-10" : "pb-28 md:pb-16")}>
        {children}
      </main>
      {!playing && (
        <nav
          className="dock fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg md:hidden"
          aria-label={navLabel}
        >
          <ul className="mx-auto flex max-w-5xl">
            {dock.map((item) => {
              const active = isActive(path, item.to, item.exact);
              const Icon = item.icon;
              return (
                <li key={item.to} className="min-w-0 flex-1">
                  <Link
                    to={item.to}
                    className={cn(
                      "flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-xs leading-tight",
                      active ? "text-primary" : "text-muted",
                    )}
                  >
                    <span className={cn("h-0.5 w-4 rounded-full", active ? "bg-primary" : "bg-transparent")} />
                    <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
                    <span className="max-w-full truncate">{c.nav[item.label]}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
