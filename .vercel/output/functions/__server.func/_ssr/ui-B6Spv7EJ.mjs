import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as HandHeart, i as ShieldCheck, s as Heart, t as Users } from "../_libs/lucide-react.mjs";
import { r as cn, v as valueById } from "./router-CmPzlRzd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-B6Spv7EJ.js
var import_jsx_runtime = require_jsx_runtime();
function tx(lang, copy) {
	return copy[lang];
}
function memberName(member, lang) {
	const primary = lang === "ar" ? member.nameAr : member.name;
	const fallback = lang === "ar" ? member.name : member.nameAr;
	return primary.trim() || fallback.trim() || "—";
}
var valueIcons = {
	respect: HandHeart,
	kindness: Heart,
	cooperation: Users,
	responsibility: ShieldCheck
};
function ValueIcon({ id, className }) {
	const Icon = valueIcons[id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		className,
		"aria-hidden": "true",
		strokeWidth: 1.75
	});
}
function ValuePill({ id, lang }) {
	const value = valueById(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 rounded-full bg-sunken px-2.5 py-1 text-sm text-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueIcon, {
			id,
			className: "size-3.5"
		}), tx(lang, value.name)]
	});
}
function Face({ member, lang, className }) {
	const label = memberName(member, lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-sunken text-sm font-medium text-primary", className),
		"aria-hidden": "true",
		children: label.charAt(0)
	});
}
function Button({ variant = "primary", className, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition-transform duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:not-disabled:scale-[0.96] disabled:opacity-40", variant === "primary" && "bg-primary text-bg", variant === "quiet" && "bg-sunken text-fg", variant === "ghost" && "bg-transparent text-fg hover:bg-sunken", className),
		...props
	});
}
function TextLink({ to, children, className, hash }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		hash,
		className: cn("inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline", className),
		children
	});
}
var fieldClass = "min-h-11 w-full rounded-xl border border-border bg-bg px-3 text-base text-fg outline-none focus-visible:border-primary";
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex min-w-0 flex-col gap-1.5 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			children: label
		}), children]
	});
}
//#endregion
export { ValueIcon as a, memberName as c, TextLink as i, tx as l, Face as n, ValuePill as o, Field as r, fieldClass as s, Button as t };
