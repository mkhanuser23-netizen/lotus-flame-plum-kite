import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as copy, h as quests, r as cn, u as useFamily } from "./router-CmPzlRzd.mjs";
import { l as tx, o as ValuePill, t as Button } from "./ui-B6Spv7EJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quests-CQR_V609.js
var import_jsx_runtime = require_jsx_runtime();
function QuestsPage() {
	const lang = useFamily((state) => state.lang);
	const questState = useFamily((state) => state.quests);
	const setQuest = useFamily((state) => state.setQuest);
	const c = copy[lang];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-3xl flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl",
			children: c.quests.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-muted",
			children: c.quests.lead
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-4",
			children: quests.map((quest) => {
				const progress = questState[quest.id];
				const done = Boolean(progress?.done);
				const reflection = lang === "ar" ? progress?.noteAr || progress?.noteEn || "" : progress?.noteEn || progress?.noteAr || "";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl border border-border bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValuePill, {
									id: quest.value,
									lang
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted",
									children: c.minutes(quest.minutes)
								}),
								done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-primary",
									children: c.kept
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-2xl",
							children: tx(lang, quest.title)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted",
							children: tx(lang, quest.detail)
						}),
						done && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 flex flex-col gap-1.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: c.quests.reflection
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: cn("min-h-11 w-full rounded-xl border border-border bg-bg px-3 text-base text-fg outline-none focus-visible:border-primary", "min-h-24 py-3"),
								maxLength: 180,
								placeholder: c.quests.notePh,
								value: reflection,
								onChange: (event) => {
									const line = event.target.value;
									setQuest(quest.id, lang === "ar" ? { noteAr: line } : { noteEn: line });
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: done ? "quiet" : "primary",
								onClick: () => setQuest(quest.id, { done: !done }),
								children: done ? c.quests.undo : c.quests.mark
							})
						})
					]
				}, quest.id);
			})
		})]
	});
}
//#endregion
export { QuestsPage as component };
