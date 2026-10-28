import { Link } from "@tanstack/react-router";
import { HandHeart, Heart, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { valueById } from "@/lib/family/content";
import type { Lang, Member, ValueId } from "@/lib/family/types";
import { memberName, tx } from "@/lib/family/types";
import { cn } from "@/lib/cn";

const valueIcons: Record<ValueId, LucideIcon> = {
  respect: HandHeart,
  kindness: Heart,
  cooperation: Users,
  responsibility: ShieldCheck,
};

export function ValueIcon({ id, className }: { id: ValueId; className?: string }) {
  const Icon = valueIcons[id];
  return <Icon className={className} aria-hidden="true" strokeWidth={1.75} />;
}

export function ValuePill({ id, lang }: { id: ValueId; lang: Lang }) {
  const value = valueById(id);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-sunken px-2.5 py-1 text-sm text-primary">
      <ValueIcon id={id} className="size-3.5" />
      {tx(lang, value.name)}
    </span>
  );
}

export function Face({ member, lang, className }: { member: Member; lang: Lang; className?: string }) {
  const label = memberName(member, lang);
  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-sunken text-sm font-medium text-primary",
        className,
      )}
      aria-hidden="true"
    >
      {label.charAt(0)}
    </span>
  );
}

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "quiet" | "ghost" }) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition-transform duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:not-disabled:scale-[0.96] disabled:opacity-40",
        variant === "primary" && "bg-primary text-bg",
        variant === "quiet" && "bg-sunken text-fg",
        variant === "ghost" && "bg-transparent text-fg hover:bg-sunken",
        className,
      )}
      {...props}
    />
  );
}

export function TextLink({
  to,
  children,
  className,
  hash,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  hash?: string;
}) {
  return (
    <Link
      to={to}
      hash={hash}
      className={cn(
        "inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export const fieldClass =
  "min-h-11 w-full rounded-xl border border-border bg-bg px-3 text-base text-fg outline-none focus-visible:border-primary";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5 text-sm">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}
