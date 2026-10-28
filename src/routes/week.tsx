import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { values } from "@/lib/family/content";
import { copy } from "@/lib/family/copy";
import { planTitle, sortedPlans, useFamily } from "@/lib/family/store";
import type { ValueId } from "@/lib/family/types";
import { memberName, tx } from "@/lib/family/types";
import { Button, Field, ValuePill, fieldClass } from "@/components/family/ui";
import { useWeekday } from "@/lib/family/use-weekday";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/week")({ component: WeekPage });

const lengths = [8, 10, 12, 15, 20, 45, 90];

function WeekPage() {
  const lang = useFamily((state) => state.lang);
  const members = useFamily((state) => state.members);
  const plans = useFamily((state) => state.plans);
  const togglePlan = useFamily((state) => state.togglePlan);
  const addPlan = useFamily((state) => state.addPlan);
  const removePlan = useFamily((state) => state.removePlan);
  const c = copy[lang];
  const today = useWeekday();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState(0);
  const [time, setTime] = useState("19:00");
  const [minutes, setMinutes] = useState(12);
  const [value, setValue] = useState<ValueId>("kindness");
  const [who, setWho] = useState<string[]>([]);
  const [error, setError] = useState("");

  function submit() {
    const name = title.trim();
    if (!name) {
      setError(c.week.noTitle);
      return;
    }
    addPlan({
      titleEn: name,
      titleAr: name,
      day,
      time,
      minutes,
      value,
      memberIds: who,
    });
    setTitle("");
    setWho([]);
    setError("");
    setOpen(false);
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <header>
        <h1 className="font-display text-4xl">{c.week.title}</h1>
        <p className="mt-3 max-w-xl text-muted">{c.week.lead}</p>
      </header>

      {open ? (
        <form
          className="grid gap-4 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <div className="sm:col-span-2">
            <Field label={c.week.name}>
              <input
                className={fieldClass}
                value={title}
                placeholder={c.week.titlePh}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Field>
          </div>
          <Field label={c.week.day}>
            <select className={fieldClass} value={day} onChange={(event) => setDay(Number(event.target.value))}>
              {c.days.map((label, index) => (
                <option key={label} value={index}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <Field label={c.week.time}>
            <input className={fieldClass} type="time" value={time} onChange={(event) => setTime(event.target.value)} />
          </Field>
          <Field label={c.week.length}>
            <select
              className={fieldClass}
              value={minutes}
              onChange={(event) => setMinutes(Number(event.target.value))}
            >
              {lengths.map((length) => (
                <option key={length} value={length}>
                  {c.minutes(length)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={c.week.value}>
            <select
              className={fieldClass}
              value={value}
              onChange={(event) => setValue(event.target.value as ValueId)}
            >
              {values.map((item) => (
                <option key={item.id} value={item.id}>
                  {tx(lang, item.name)}
                </option>
              ))}
            </select>
          </Field>
          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-medium">{c.week.who}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {members.map((member) => {
                const on = who.includes(member.id);
                return (
                  <button
                    key={member.id}
                    type="button"
                    aria-pressed={on}
                    className={cn(
                      "min-h-11 rounded-full border px-3 text-sm",
                      on ? "border-primary bg-bg text-fg" : "border-border text-muted",
                    )}
                    onClick={() =>
                      setWho((ids) => (on ? ids.filter((id) => id !== member.id) : [...ids, member.id]))
                    }
                  >
                    {memberName(member, lang)}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-sm text-muted">{who.length === 0 ? c.everyone : ""}</p>
          </fieldset>
          {error && <p className="text-sm text-primary sm:col-span-2">{error}</p>}
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <Button type="submit">{c.week.save}</Button>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              {c.week.cancel}
            </Button>
          </div>
        </form>
      ) : (
        <Button variant="quiet" onClick={() => setOpen(true)}>
          {c.week.add}
        </Button>
      )}

      <ol className="flex flex-col gap-4">
        {c.days.map((label, index) => {
          const dayPlans = sortedPlans(plans).filter((plan) => plan.day === index);
          const isToday = today === index;
          return (
            <li
              key={label}
              className={cn("rounded-2xl border border-border bg-surface p-4", isToday && "border-s-4 border-s-primary")}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl">{label}</h2>
                {isToday && <span className="text-sm font-medium text-primary">{c.week.today}</span>}
              </div>
              {dayPlans.length === 0 ? (
                <p className="mt-2 text-sm text-muted">{c.open}</p>
              ) : (
                <ul className="mt-3 flex flex-col gap-3">
                  {dayPlans.map((plan) => (
                    <li key={plan.id} className="flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm tabular-nums text-muted">
                          {plan.time} · {c.minutes(plan.minutes)}
                        </p>
                        <p className="font-medium">{planTitle(plan, lang)}</p>
                        <div className="mt-2">
                          <ValuePill id={plan.value} lang={lang} />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant={plan.done ? "quiet" : "primary"} onClick={() => togglePlan(plan.id)}>
                          {plan.done ? c.week.undo : c.week.mark}
                        </Button>
                        <Button variant="ghost" onClick={() => removePlan(plan.id)}>
                          {c.week.remove}
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
