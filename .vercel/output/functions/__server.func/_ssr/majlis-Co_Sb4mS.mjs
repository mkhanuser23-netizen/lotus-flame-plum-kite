import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as rituals, d as copy, u as useFamily } from "./router-CmPzlRzd.mjs";
import { l as tx, o as ValuePill } from "./ui-B6Spv7EJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/majlis-Co_Sb4mS.js
var import_jsx_runtime = require_jsx_runtime();
function MajlisPage() {
	const lang = useFamily((state) => state.lang);
	const c = copy[lang];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-3xl flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl",
			children: c.majlis.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-muted",
			children: c.majlis.lead
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border border-y border-border",
			children: rituals.map((ritual) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/majlis/$ritualId",
				params: { ritualId: ritual.id },
				className: "flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-display text-2xl",
						children: tx(lang, ritual.title)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm text-muted",
						children: tx(lang, ritual.fits)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex shrink-0 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValuePill, {
						id: ritual.value,
						lang
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm font-medium text-primary",
						children: [
							c.minutes(ritual.minutes),
							" · ",
							c.majlis.begin
						]
					})]
				})]
			}) }, ritual.id))
		})]
	});
}
//#endregion
export { MajlisPage as component };
