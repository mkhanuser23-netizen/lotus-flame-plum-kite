import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Check } from "../_libs/lucide-react.mjs";
import { d as copy, m as practices, r as cn, u as useFamily, y as values } from "./router-CmPzlRzd.mjs";
import { a as ValueIcon, l as tx } from "./ui-B6Spv7EJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/values-DBR5O1xq.js
var import_jsx_runtime = require_jsx_runtime();
function ValuesPage() {
	const lang = useFamily((state) => state.lang);
	const practiceState = useFamily((state) => state.practices);
	const togglePractice = useFamily((state) => state.togglePractice);
	const c = copy[lang];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-3xl flex-col gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl",
			children: c.values.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-muted",
			children: c.values.lead
		})] }), values.map((value) => {
			const items = practices.filter((practice) => practice.value === value.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: value.id,
				className: "border-t border-border pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex size-11 items-center justify-center rounded-full bg-sunken text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueIcon, {
								id: value.id,
								className: "size-5"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl",
							children: tx(lang, value.name)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-lg leading-relaxed",
						children: tx(lang, value.blurb)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 flex flex-col gap-2",
						children: items.map((practice) => {
							const on = Boolean(practiceState[practice.id]);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-pressed": on,
								className: "flex min-h-11 w-full items-center gap-3 rounded-2xl border border-border bg-surface px-3 py-2 text-start",
								onClick: () => togglePractice(practice.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("inline-flex size-6 shrink-0 items-center justify-center rounded-full border", on ? "border-primary bg-primary text-bg" : "border-border text-transparent"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										className: "size-3.5",
										"aria-hidden": "true"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: on ? "text-fg" : "text-muted",
									children: tx(lang, practice.text)
								})]
							}) }, practice.id);
						})
					})
				]
			}, value.id);
		})]
	});
}
//#endregion
export { ValuesPage as component };
