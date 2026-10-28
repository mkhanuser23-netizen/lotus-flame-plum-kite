import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { emirates } from "@/lib/family/content";
import { copy } from "@/lib/family/copy";
import { useFamily } from "@/lib/family/store";
import type { Role } from "@/lib/family/types";
import { Button, Field, fieldClass } from "@/components/family/ui";

export const Route = createFileRoute("/family")({ component: FamilyPage });

const roles: Role[] = ["parent", "grandparent", "teen", "child"];

function FamilyPage() {
  const lang = useFamily((state) => state.lang);
  const householdEn = useFamily((state) => state.householdEn);
  const householdAr = useFamily((state) => state.householdAr);
  const emirate = useFamily((state) => state.emirate);
  const members = useFamily((state) => state.members);
  const setHousehold = useFamily((state) => state.setHousehold);
  const updateMember = useFamily((state) => state.updateMember);
  const addMember = useFamily((state) => state.addMember);
  const removeMember = useFamily((state) => state.removeMember);
  const resetDemo = useFamily((state) => state.resetDemo);
  const c = copy[lang];
  const [arm, setArm] = useState(false);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <header>
        <h1 className="font-display text-4xl">{c.family.title}</h1>
        <p className="mt-3 max-w-xl text-muted">{c.family.lead}</p>
      </header>

      <section className="grid gap-4 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2">
        <Field label={c.family.nameEn}>
          <input
            className={fieldClass}
            value={householdEn}
            onChange={(event) => setHousehold({ householdEn: event.target.value })}
          />
        </Field>
        <Field label={c.family.nameAr}>
          <input
            className={fieldClass}
            value={householdAr}
            dir="rtl"
            onChange={(event) => setHousehold({ householdAr: event.target.value })}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label={c.family.emirate}>
            <select
              className={fieldClass}
              value={emirate}
              onChange={(event) => setHousehold({ emirate: event.target.value })}
            >
              {emirates.map((item) => (
                <option key={item.id} value={item.id}>
                  {lang === "ar" ? item.ar : item.en}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl">{c.family.members}</h2>
          <Button variant="quiet" onClick={addMember}>
            {c.family.add}
          </Button>
        </div>
        <ul className="mt-3 flex flex-col gap-3">
          {members.map((member) => (
            <li key={member.id} className="grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2">
              <Field label={c.family.personEn}>
                <input
                  className={fieldClass}
                  value={member.name}
                  onChange={(event) => updateMember(member.id, { name: event.target.value })}
                />
              </Field>
              <Field label={c.family.personAr}>
                <input
                  className={fieldClass}
                  dir="rtl"
                  value={member.nameAr}
                  onChange={(event) => updateMember(member.id, { nameAr: event.target.value })}
                />
              </Field>
              <Field label={c.family.role}>
                <select
                  className={fieldClass}
                  value={member.role}
                  onChange={(event) => updateMember(member.id, { role: event.target.value as Role })}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {c.roles[role]}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="flex items-end">
                <Button variant="ghost" disabled={members.length <= 2} onClick={() => removeMember(member.id)}>
                  {c.family.remove}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-sunken p-5">
        <h2 className="font-display text-2xl">{c.family.walkTitle}</h2>
        <ol className="mt-3 flex list-decimal flex-col gap-2 ps-5 text-sm leading-relaxed">
          {c.family.walk.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section>
        {!arm ? (
          <Button variant="ghost" onClick={() => setArm(true)}>
            {c.family.reset}
          </Button>
        ) : (
          <div className="flex flex-col items-start gap-3">
            <p className="text-sm text-muted">{c.family.resetArm}</p>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  resetDemo();
                  setArm(false);
                }}
              >
                {c.family.resetYes}
              </Button>
              <Button variant="ghost" onClick={() => setArm(false)}>
                {c.week.cancel}
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
