import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as planTitle, d as copy, l as sortedPlans, r as cn, u as useFamily, y as values } from "./router-CmPzlRzd.mjs";
import { c as memberName, l as tx, o as ValuePill, r as Field, s as fieldClass, t as Button } from "./ui-B6Spv7EJ.mjs";
import { n as useWeekday } from "./use-weekday-DQhWj1mI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/week-DICua76q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lengths = [
	8,
	10,
	12,
	15,
	20,
	45,
	90
];
function WeekPage() {
	const lang = useFamily((state) => state.lang);
	const members = useFamily((state) => state.members);
	const plans = useFamily((state) => state.plans);
	const togglePlan = useFamily((state) => state.togglePlan);
	const addPlan = useFamily((state) => state.addPlan);
	const removePlan = useFamily((state) => state.removePlan);
	const c = copy[lang];
	const today = useWeekday();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [day, setDay] = (0, import_react.useState)(0);
	const [time, setTime] = (0, import_react.useState)("19:00");
	const [minutes, setMinutes] = (0, import_react.useState)(12);
	const [value, setValue] = (0, import_react.useState)("kindness");
	const [who, setWho] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
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
			memberIds: who
		});
		setTitle("");
		setWho([]);
		setError("");
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-3xl flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: c.week.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-muted",
				children: c.week.lead
			})] }),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2",
				onSubmit: (event) => {
					event.preventDefault();
					submit();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: c.week.name,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: fieldClass,
								value: title,
								placeholder: c.week.titlePh,
								onChange: (event) => setTitle(event.target.value)
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: c.week.day,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: fieldClass,
							value: day,
							onChange: (event) => setDay(Number(event.target.value)),
							children: c.days.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: index,
								children: label
							}, label))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: c.week.time,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fieldClass,
							type: "time",
							value: time,
							onChange: (event) => setTime(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: c.week.length,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: fieldClass,
							value: minutes,
							onChange: (event) => setMinutes(Number(event.target.value)),
							children: lengths.map((length) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: length,
								children: c.minutes(length)
							}, length))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: c.week.value,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: fieldClass,
							value,
							onChange: (event) => setValue(event.target.value),
							children: values.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: tx(lang, item.name)
							}, item.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "sm:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "text-sm font-medium",
								children: c.week.who
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: members.map((member) => {
									const on = who.includes(member.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-pressed": on,
										className: cn("min-h-11 rounded-full border px-3 text-sm", on ? "border-primary bg-bg text-fg" : "border-border text-muted"),
										onClick: () => setWho((ids) => on ? ids.filter((id) => id !== member.id) : [...ids, member.id]),
										children: memberName(member, lang)
									}, member.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: who.length === 0 ? c.everyone : ""
							})
						]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-primary sm:col-span-2",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: c.week.save
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => setOpen(false),
							children: c.week.cancel
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "quiet",
				onClick: () => setOpen(true),
				children: c.week.add
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-col gap-4",
				children: c.days.map((label, index) => {
					const dayPlans = sortedPlans(plans).filter((plan) => plan.day === index);
					const isToday = today === index;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("rounded-2xl border border-border bg-surface p-4", isToday && "border-s-4 border-s-primary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: label
							}), isToday && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-primary",
								children: c.week.today
							})]
						}), dayPlans.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: c.open
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 flex flex-col gap-3",
							children: dayPlans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm tabular-nums text-muted",
											children: [
												plan.time,
												" · ",
												c.minutes(plan.minutes)
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: planTitle(plan, lang)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValuePill, {
												id: plan.value,
												lang
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: plan.done ? "quiet" : "primary",
										onClick: () => togglePlan(plan.id),
										children: plan.done ? c.week.undo : c.week.mark
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										onClick: () => removePlan(plan.id),
										children: c.week.remove
									})]
								})]
							}, plan.id))
						})]
					}, label);
				})
			})
		]
	});
}
//#endregion
export { WeekPage as component };
