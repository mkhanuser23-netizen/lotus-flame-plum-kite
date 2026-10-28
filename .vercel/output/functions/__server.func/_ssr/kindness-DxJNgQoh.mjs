import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as copy, o as noteText, p as kindnessPrompts, r as cn, s as noteWhen, u as useFamily } from "./router-CmPzlRzd.mjs";
import { c as memberName, l as tx, n as Face, r as Field, s as fieldClass, t as Button } from "./ui-B6Spv7EJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kindness-DxJNgQoh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KindnessPage() {
	const lang = useFamily((state) => state.lang);
	const members = useFamily((state) => state.members);
	const notes = useFamily((state) => state.notes);
	const addNote = useFamily((state) => state.addNote);
	const removeNote = useFamily((state) => state.removeNote);
	const c = copy[lang];
	const [fromId, setFromId] = (0, import_react.useState)(members[0]?.id ?? "");
	const [toId, setToId] = (0, import_react.useState)(members[1]?.id ?? members[0]?.id ?? "");
	const [text, setText] = (0, import_react.useState)("");
	const from = members.some((member) => member.id === fromId) ? fromId : members[0]?.id ?? "";
	const to = members.some((member) => member.id === toId) ? toId : members[1]?.id ?? from;
	function send() {
		const line = text.trim();
		if (!line || !from || !to) return;
		addNote({
			fromId: from,
			toId: to,
			text: line,
			lang
		});
		setText("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-3xl flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: c.kindness.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-muted",
				children: c.kindness.lead
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2",
				onSubmit: (event) => {
					event.preventDefault();
					send();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: c.kindness.from,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: fieldClass,
							value: from,
							onChange: (event) => setFromId(event.target.value),
							children: members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: member.id,
								children: memberName(member, lang)
							}, member.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: c.kindness.to,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: fieldClass,
							value: to,
							onChange: (event) => setToId(event.target.value),
							children: members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: member.id,
								children: memberName(member, lang)
							}, member.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: c.kindness.note,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: cn(fieldClass, "min-h-28 py-3"),
								maxLength: 180,
								value: text,
								onChange: (event) => setText(event.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-end text-xs tabular-nums text-muted",
							children: [text.length, "/180"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: c.kindness.prompts
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: kindnessPrompts.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 rounded-full border border-border px-3 text-start text-sm text-fg",
								onClick: () => setText(tx(lang, prompt)),
								children: tx(lang, prompt)
							}, prompt.en))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: !text.trim(),
						children: c.kindness.send
					}) })
				]
			}),
			notes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: c.kindness.empty
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-3",
				children: notes.map((note) => {
					const fromMember = members.find((member) => member.id === note.fromId);
					const toMember = members.find((member) => member.id === note.toId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t-2 border-accent bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg",
							children: noteText(note, lang)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex min-w-0 items-center gap-2 text-sm text-muted",
								children: [fromMember && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
									member: fromMember,
									lang,
									className: "size-8 text-xs"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "truncate",
									children: [
										fromMember ? memberName(fromMember, lang) : "—",
										lang === "ar" ? " إلى " : " to ",
										toMember ? memberName(toMember, lang) : "—",
										" · ",
										noteWhen(note, lang)
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 shrink-0 text-sm text-muted",
								onClick: () => removeNote(note.id),
								children: c.kindness.remove
							})]
						})]
					}, note.id);
				})
			})
		]
	});
}
//#endregion
export { KindnessPage as component };
