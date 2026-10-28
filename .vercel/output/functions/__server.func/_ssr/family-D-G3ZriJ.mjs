import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as copy, f as emirates, u as useFamily } from "./router-CmPzlRzd.mjs";
import { r as Field, s as fieldClass, t as Button } from "./ui-B6Spv7EJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/family-D-G3ZriJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var roles = [
	"parent",
	"grandparent",
	"teen",
	"child"
];
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
	const [arm, setArm] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-3xl flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: c.family.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-muted",
				children: c.family.lead
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: c.family.nameEn,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							value: householdEn,
							onChange: (event) => setHousehold({ householdEn: event.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: c.family.nameAr,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							value: householdAr,
							dir: "rtl",
							onChange: (event) => setHousehold({ householdAr: event.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: c.family.emirate,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: fieldClass,
								value: emirate,
								onChange: (event) => setHousehold({ emirate: event.target.value }),
								children: emirates.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item.id,
									children: lang === "ar" ? item.ar : item.en
								}, item.id))
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: c.family.members
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "quiet",
					onClick: addMember,
					children: c.family.add
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-3",
				children: members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: c.family.name,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: fieldClass,
								value: member.name,
								onChange: (event) => updateMember(member.id, { name: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: c.family.nameAr,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: fieldClass,
								dir: "rtl",
								value: member.nameAr,
								onChange: (event) => updateMember(member.id, { nameAr: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: c.family.role,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: fieldClass,
								value: member.role,
								onChange: (event) => updateMember(member.id, { role: event.target.value }),
								children: roles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: role,
									children: c.roles[role]
								}, role))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								disabled: members.length <= 2,
								onClick: () => removeMember(member.id),
								children: c.family.remove
							})
						})
					]
				}, member.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-sunken p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: c.family.walkTitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 flex list-decimal flex-col gap-2 ps-5 text-sm leading-relaxed",
					children: c.family.walk.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: step }, step))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: !arm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: () => setArm(true),
				children: c.family.reset
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: c.family.resetArm
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							resetDemo();
							setArm(false);
						},
						children: c.family.resetYes
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => setArm(false),
						children: c.week.cancel
					})]
				})]
			}) })
		]
	});
}
//#endregion
export { FamilyPage as component };
