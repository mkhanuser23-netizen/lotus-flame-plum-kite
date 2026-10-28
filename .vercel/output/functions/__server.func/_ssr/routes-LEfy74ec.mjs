import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as rituals, a as memoryWhen, c as planTitle, d as copy, g as ritualById, h as quests, i as memoryNote, l as sortedPlans, m as practices, o as noteText, s as noteWhen, u as useFamily } from "./router-CmPzlRzd.mjs";
import { c as memberName, i as TextLink, l as tx, n as Face, o as ValuePill } from "./ui-B6Spv7EJ.mjs";
import { t as useDaypart } from "./use-weekday-DQhWj1mI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-LEfy74ec.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const lang = useFamily((state) => state.lang);
	const householdEn = useFamily((state) => state.householdEn);
	const householdAr = useFamily((state) => state.householdAr);
	const members = useFamily((state) => state.members);
	const plans = useFamily((state) => state.plans);
	const notes = useFamily((state) => state.notes);
	const memories = useFamily((state) => state.memories);
	const questState = useFamily((state) => state.quests);
	const practiceState = useFamily((state) => state.practices);
	const c = copy[lang];
	const { part, day } = useDaypart();
	const featured = rituals[0];
	const short = rituals[1];
	const keptPractices = practices.filter((practice) => practiceState[practice.id]).length;
	const questsDone = Object.values(questState).filter((quest) => quest.done).length;
	const minutes = memories.reduce((sum, memory) => sum + memory.minutes, 0) + plans.filter((plan) => plan.done).reduce((sum, plan) => sum + plan.minutes, 0);
	const nextQuest = quests.find((quest) => !questState[quest.id]?.done) ?? quests[0];
	const greeting = part ? c[part] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [
					greeting && day !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							greeting,
							" · ",
							c.days[day]
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl leading-tight md:text-5xl",
						children: c.householdLine(lang === "ar" ? householdAr : householdEn)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-lg text-muted",
						children: c.home.dek
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-fg",
						children: c.stats(minutes, notes.length, questsDone)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.85fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-2xl bg-primary p-6 text-bg md:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: tx(lang, featured.fits)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 font-display text-4xl leading-tight",
									children: tx(lang, featured.title)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-md text-lg",
									children: tx(lang, featured.promise)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/majlis/$ritualId",
										params: { ritualId: featured.id },
										className: "inline-flex min-h-11 items-center rounded-full bg-bg px-5 text-sm font-medium text-primary",
										children: c.home.begin
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm",
										children: [
											c.minutes(featured.minutes),
											" · ",
											tx(lang, {
												en: "Kindness",
												ar: "اللطف"
											})
										]
									})]
								})
							]
						}),
						short && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/majlis/$ritualId",
							params: { ritualId: short.id },
							className: "flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm text-muted",
									children: c.home.ifShort
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block font-display text-2xl",
									children: tx(lang, short.title)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-sm text-muted",
									children: tx(lang, short.promise)
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-sm font-medium text-primary",
								children: c.minutes(short.minutes)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: c.home.thisWeek
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextLink, {
								to: "/week",
								children: c.home.seeWeek
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 divide-y divide-border rounded-2xl border border-border bg-surface",
							children: sortedPlans(plans).map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 px-4 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted",
											children: [
												c.days[plan.day],
												" · ",
												plan.time
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-medium",
											children: planTitle(plan, lang)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 text-sm text-muted",
										children: c.minutes(plan.minutes)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: plan.done ? "text-sm font-medium text-primary" : "text-sm text-muted",
										children: plan.done ? c.kept : c.open
									})
								]
							}, plan.id))
						})] }),
						memories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: c.home.keptMoments
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 flex flex-col gap-3",
							children: memories.slice(0, 3).map((memory) => {
								const ritual = ritualById(memory.ritualId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-2xl border border-border bg-surface p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted",
										children: [memoryWhen(memory, lang), ritual ? ` · ${tx(lang, ritual.title)}` : ""]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1",
										children: memoryNote(memory, lang) || tx(lang, ritual?.title ?? {
											en: "Majlis",
											ar: "مجلس"
										})
									})]
								}, memory.id);
							})
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: c.home.valuesTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: c.home.practicesKept(keptPractices, practices.length)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 grid grid-cols-2 gap-2",
								children: [
									"respect",
									"kindness",
									"cooperation",
									"responsibility"
								].map((id) => {
									const owned = practices.filter((practice) => practice.value === id);
									const done = owned.filter((practice) => practiceState[practice.id]).length;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/values",
										hash: id,
										className: "flex min-h-24 flex-col justify-between rounded-2xl border border-border bg-surface p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValuePill, {
											id,
											lang
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "mt-3 text-sm tabular-nums text-muted",
											children: [
												done,
												"/",
												owned.length
											]
										})]
									}) }, id);
								})
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: c.home.saidAloud
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextLink, {
								to: "/kindness",
								children: c.home.seeNotes
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 flex flex-col gap-3",
							children: notes.slice(0, 2).map((note) => {
								const from = members.find((member) => member.id === note.fromId);
								const to = members.find((member) => member.id === note.toId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "border-t-2 border-accent bg-surface p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: noteText(note, lang) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-3 flex items-center gap-2 text-sm text-muted",
										children: [from && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
											member: from,
											lang,
											className: "size-7 text-xs"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											from ? memberName(from, lang) : "—",
											lang === "ar" ? " إلى " : " to ",
											to ? memberName(to, lang) : "—",
											" · ",
											noteWhen(note, lang)
										] })]
									})]
								}, note.id);
							})
						})] }),
						nextQuest && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: c.home.stillOpen
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextLink, {
								to: "/quests",
								children: c.home.seeQuests
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/quests",
							className: "mt-3 block rounded-2xl border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValuePill, {
									id: nextQuest.value,
									lang
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-display text-2xl",
									children: tx(lang, nextQuest.title)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: tx(lang, nextQuest.detail)
								})
							]
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-3xl border-t border-border pt-6 text-sm leading-relaxed text-muted",
				children: c.home.thesis
			})
		]
	});
}
//#endregion
export { Home as component };
