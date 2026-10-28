import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Check, p as ArrowLeft } from "../_libs/lucide-react.mjs";
import { c as planTitle, d as copy, g as ritualById, l as sortedPlans, n as Route, r as cn, u as useFamily } from "./router-CmPzlRzd.mjs";
import { c as memberName, l as tx, n as Face, o as ValuePill, s as fieldClass, t as Button } from "./ui-B6Spv7EJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/majlis._ritualId-DGXBWA6Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function clock(total) {
	return `${Math.floor(total / 60)}:${(total % 60).toString().padStart(2, "0")}`;
}
function Player({ ritual }) {
	const lang = useFamily((state) => state.lang);
	const members = useFamily((state) => state.members);
	const plans = useFamily((state) => state.plans);
	const addMemory = useFamily((state) => state.addMemory);
	const togglePlan = useFamily((state) => state.togglePlan);
	const c = copy[lang];
	const steps = ritual.steps;
	const total = steps.length + 1;
	const [index, setIndex] = (0, import_react.useState)(0);
	const [present, setPresent] = (0, import_react.useState)(() => members.map((member) => member.id));
	const [note, setNote] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [remaining, setRemaining] = (0, import_react.useState)(ritual.minutes * 60);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [marked, setMarked] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		const id = window.setInterval(() => {
			setRemaining((value) => value <= 0 ? 0 : value - 1);
		}, 1e3);
		return () => window.clearInterval(id);
	}, [running]);
	(0, import_react.useEffect)(() => {
		if (remaining === 0) setRunning(false);
	}, [remaining]);
	const openPlan = sortedPlans(plans).find((plan) => !plan.done);
	function save() {
		const line = note.trim();
		addMemory({
			ritualId: ritual.id,
			minutes: ritual.minutes,
			noteEn: line,
			noteAr: line,
			whenEn: "Just now",
			whenAr: "الآن",
			memberIds: present
		});
		setSaved(true);
	}
	if (saved) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-xl flex-col gap-6 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "inline-flex size-12 items-center justify-center rounded-full bg-primary text-bg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					className: "size-6",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl text-fg",
					children: c.player.savedTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-lg text-muted",
					children: c.player.savedBody
				}),
				note.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 border-s-2 border-primary ps-4 text-xl",
					children: note.trim()
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:flex-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-bg",
						children: c.player.home
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/kindness",
						className: "inline-flex min-h-11 items-center justify-center rounded-full bg-sunken px-5 text-sm font-medium text-fg",
						children: c.player.leaveNote
					}),
					openPlan && !marked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => {
							togglePlan(openPlan.id);
							setMarked(true);
						},
						children: c.player.markPlan(planTitle(openPlan, lang))
					})
				]
			})
		]
	});
	const step = steps[index];
	const closing = index === steps.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-2xl flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/majlis",
					className: "inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						className: "size-4 rtl:rotate-180",
						"aria-hidden": "true"
					}), c.player.back]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "inline-flex min-h-11 items-center gap-2 rounded-full bg-sunken px-3 text-sm font-medium tabular-nums text-fg",
					onClick: () => setRunning((value) => !value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: clock(remaining) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: running ? c.player.pauseClock : c.player.startClock
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 flex gap-1",
					"aria-hidden": "true",
					children: Array.from({ length: total }, (_, tick) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1 flex-1 rounded-full", tick <= index ? "bg-primary" : "bg-border") }, tick))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm tabular-nums text-muted",
					children: c.player.stepOf(index + 1, total)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl leading-tight",
					children: tx(lang, ritual.title)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValuePill, {
						id: ritual.value,
						lang
					})
				})
			] }),
			closing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseStep, {
				lang,
				note,
				setNote,
				onSave: save,
				canSave: present.length > 0
			}) : step?.kind === "gather" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: tx(lang, step.title)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg leading-relaxed",
						children: tx(lang, step.body)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-t-[2.5rem] border border-border bg-sunken px-5 pb-6 pt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-sm text-muted",
							children: c.player.phonesAway
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 flex flex-wrap justify-center gap-2",
							children: members.filter((member) => present.includes(member.id)).map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
								member,
								lang
							}) }, member.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-sm font-medium",
						children: c.player.whosHere
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: members.map((member) => {
							const on = present.includes(member.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": on,
								className: cn("inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-sm", on ? "border-primary bg-surface text-fg" : "border-border text-muted"),
								onClick: () => setPresent((ids) => on ? ids.filter((id) => id !== member.id) : [...ids, member.id]),
								children: memberName(member, lang)
							}, member.id);
						})
					})] })
				]
			}) : step?.kind === "read" || step?.kind === "do" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: tx(lang, step.title)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xl leading-relaxed",
					children: tx(lang, step.body)
				})]
			}) : step?.kind === "talk" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: tx(lang, step.title)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "flex flex-col gap-4",
					children: step.prompts.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-s-2 border-primary ps-4 text-xl leading-snug",
						children: tx(lang, prompt)
					}, prompt.en))
				})]
			}) : null,
			!closing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					disabled: index === 0,
					onClick: () => setIndex((value) => Math.max(0, value - 1)),
					children: c.player.previous
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: present.length === 0,
					onClick: () => setIndex((value) => Math.min(total - 1, value + 1)),
					children: c.player.next
				})]
			})
		]
	});
}
function CloseStep({ lang, note, setNote, onSave, canSave }) {
	const c = copy[lang];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: c.player.remember
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: cn(fieldClass, "min-h-32 py-3"),
				maxLength: 180,
				value: note,
				placeholder: c.player.placeholder,
				onChange: (event) => setNote(event.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !canSave,
				onClick: onSave,
				children: c.player.save
			})
		]
	});
}
function PlayPage() {
	const { ritualId } = Route.useParams();
	const lang = useFamily((state) => state.lang);
	const ritual = ritualById(ritualId);
	const c = copy[lang];
	if (!ritual) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-lg",
			children: c.notFound
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/majlis",
			className: "mt-4 inline-flex min-h-11 items-center text-sm font-medium text-primary",
			children: c.back
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Player, { ritual });
}
//#endregion
export { PlayPage as component };
