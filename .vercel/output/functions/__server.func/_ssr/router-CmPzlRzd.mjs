import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useRouter, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as MessagesSquare, f as CalendarDays, l as Feather, n as TriangleAlert, o as House, r as Sun, u as Compass } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CmPzlRzd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var values = [
	{
		id: "respect",
		name: {
			en: "Respect",
			ar: "الاحترام"
		},
		blurb: {
			en: "Respect is how a house sounds. It is letting someone finish, greeting an elder properly, and repairing a sharp sentence before the night ends.",
			ar: "الاحترام هو صوت البيت. أن نترك الكلام يكتمل، وأن نسلم على الكبير كما ينبغي، وأن نصلح الجملة الحادة قبل أن ينتهي الليل."
		}
	},
	{
		id: "kindness",
		name: {
			en: "Kindness",
			ar: "اللطف"
		},
		blurb: {
			en: "Kindness in a family is rarely grand. It is specific, and it is said to the person who did it.",
			ar: "اللطف في العائلة نادراً ما يكون كبيراً. هو محدد، ويُقال للشخص الذي فعله."
		}
	},
	{
		id: "cooperation",
		name: {
			en: "Cooperation",
			ar: "التعاون"
		},
		blurb: {
			en: "Cooperation is one job finished by more than one pair of hands, including the smallest.",
			ar: "التعاون عمل واحد تنهيه أكثر من يدين، بما فيها الأيدي الصغيرة."
		}
	},
	{
		id: "responsibility",
		name: {
			en: "Responsibility",
			ar: "المسؤولية"
		},
		blurb: {
			en: "Responsibility is a promise with a name on it. Someone owns it. The others do not take it over unless they are asked.",
			ar: "المسؤولية وعد عليه اسم. أحدهم يملكه. والباقون لا يأخذونه إلا إذا طُلب منهم."
		}
	}
];
var practices = [
	{
		id: "respect-finish",
		value: "respect",
		text: {
			en: "We let someone finish their sentence.",
			ar: "تركنا أحدهم يكمل جملته."
		}
	},
	{
		id: "respect-elder",
		value: "respect",
		text: {
			en: "We greeted an elder by name.",
			ar: "سلمنا على كبير بالاسم."
		}
	},
	{
		id: "respect-repair",
		value: "respect",
		text: {
			en: "We repaired one sharp tone before sleep.",
			ar: "أصلحنا نبرة حادة قبل النوم."
		}
	},
	{
		id: "kind-name",
		value: "kindness",
		text: {
			en: "We named a kindness out loud.",
			ar: "سمينا لطفاً بصوت مسموع."
		}
	},
	{
		id: "kind-note",
		value: "kindness",
		text: {
			en: "We left a note for someone in the house.",
			ar: "تركنا ملاحظة لأحد أهل البيت."
		}
	},
	{
		id: "kind-quiet",
		value: "kindness",
		text: {
			en: "Someone helped quietly and did not announce it.",
			ar: "أحدهم ساعد بهدوء ولم يعلن ذلك."
		}
	},
	{
		id: "coop-job",
		value: "cooperation",
		text: {
			en: "Two or more of us finished one job together.",
			ar: "أنهى اثنان أو أكثر عملاً واحداً معاً."
		}
	},
	{
		id: "coop-choice",
		value: "cooperation",
		text: {
			en: "A child or teen chose part of a plan.",
			ar: "طفل أو مراهق اختار جزءاً من الخطة."
		}
	},
	{
		id: "coop-decide",
		value: "cooperation",
		text: {
			en: "We decided something without one person forcing it.",
			ar: "قررنا أمراً دون أن يفرضه شخص واحد."
		}
	},
	{
		id: "resp-bags",
		value: "responsibility",
		text: {
			en: "Bags were ready the night before.",
			ar: "الحقيبة جُهزت من الليل."
		}
	},
	{
		id: "resp-care",
		value: "responsibility",
		text: {
			en: "Someone looked after a younger child, a guest, or a grandparent's comfort.",
			ar: "أحدهم اعتنى براحة طفل أصغر أو ضيف أو جد."
		}
	},
	{
		id: "resp-promise",
		value: "responsibility",
		text: {
			en: "We kept one promise that had been said out loud.",
			ar: "وفينا بوعد قيل بصوت مسموع."
		}
	}
];
var kindnessPrompts = [
	{
		en: "You made the morning easier.",
		ar: "جعلت الصباح أهون."
	},
	{
		en: "I noticed you wait without being asked.",
		ar: "لاحظت أنك تنتظر دون أن تُطلب."
	},
	{
		en: "Thank you for the ride, and for not rushing me.",
		ar: "شكراً على التوصيل، وعلى أنك لم تستعجلني."
	},
	{
		en: "You listened all the way to the end.",
		ar: "استمعت حتى النهاية."
	},
	{
		en: "The house is calmer because of something you did.",
		ar: "البيت أهدأ بسبب شيء فعلته."
	}
];
var emirates = [
	{
		id: "abu-dhabi",
		en: "Abu Dhabi",
		ar: "أبوظبي"
	},
	{
		id: "dubai",
		en: "Dubai",
		ar: "دبي"
	},
	{
		id: "sharjah",
		en: "Sharjah",
		ar: "الشارقة"
	},
	{
		id: "ajman",
		en: "Ajman",
		ar: "عجمان"
	},
	{
		id: "uaq",
		en: "Umm Al Quwain",
		ar: "أم القيوين"
	},
	{
		id: "rak",
		en: "Ras Al Khaimah",
		ar: "رأس الخيمة"
	},
	{
		id: "fuj",
		en: "Fujairah",
		ar: "الفجيرة"
	}
];
function emirateLabel(id, lang) {
	const found = emirates.find((item) => item.id === id);
	if (!found) return id;
	return found[lang];
}
var quests = [
	{
		id: "friday-dish",
		value: "cooperation",
		minutes: 45,
		title: {
			en: "One dish, several hands",
			ar: "طبق واحد، وأيدٍ كثيرة"
		},
		detail: {
			en: "Cook or plate one Friday dish together. The youngest person chooses the garnish or the drink.",
			ar: "اطبخوا أو رتّبوا طبق الجمعة معاً. أصغر الحاضرين يختار التزيين أو الشراب."
		}
	},
	{
		id: "elder-hello",
		value: "respect",
		minutes: 15,
		title: {
			en: "A hello that is not rushed",
			ar: "سلام غير مستعجل"
		},
		detail: {
			en: "Call or visit one elder. Each person prepares one real question before you begin.",
			ar: "اتصلوا أو زوروا كبيراً واحداً. كل شخص يجهز سؤالاً حقيقياً قبل أن تبدأوا."
		}
	},
	{
		id: "entrance",
		value: "cooperation",
		minutes: 12,
		title: {
			en: "The entrance, once",
			ar: "المدخل، مرة واحدة"
		},
		detail: {
			en: "Shoes, bags, and the door. No one is in charge. You finish when it looks like people live here on purpose.",
			ar: "الأحذية والحقائب والباب. لا مسؤول واحد. تنتهون حين يبدو أن ناساً يسكنون هنا بقصد."
		}
	},
	{
		id: "bags",
		value: "responsibility",
		minutes: 10,
		title: {
			en: "Tomorrow's bag, tonight",
			ar: "حقيبة الغد، الليلة"
		},
		detail: {
			en: "Each person packs what is theirs. A parent checks only if asked.",
			ar: "كل شخص يجهز ما يخصه. الوالد يتفقد فقط إذا طُلب منه."
		}
	},
	{
		id: "name-story",
		value: "respect",
		minutes: 10,
		title: {
			en: "The story of our name",
			ar: "حكاية اسمنا"
		},
		detail: {
			en: "Ten minutes on the family name: where it comes from, and who still says it the old way.",
			ar: "عشر دقائق عن اسم العائلة: من أين جاء، ومن ما زال ينطقه على الطريقة القديمة."
		}
	},
	{
		id: "saturday",
		value: "cooperation",
		minutes: 15,
		title: {
			en: "Saturday, with a young vote",
			ar: "السبت، وبصوت صغير"
		},
		detail: {
			en: "Plan part of Saturday. The youngest person chooses one stop: a walk, a relative, a park, or breakfast out.",
			ar: "خطّطوا جزءاً من السبت. أصغر شخص يختار محطة واحدة: مشياً أو قريباً أو حديقة أو فطوراً خارج البيت."
		}
	},
	{
		id: "guard",
		value: "kindness",
		minutes: 5,
		title: {
			en: "The person at the door",
			ar: "من يقف عند الباب"
		},
		detail: {
			en: "A building guard, a driver, or a neighbour. One specific thanks, said in person, not sent as a sticker.",
			ar: "حارس البناية أو السائق أو الجار. شكر محدد، يُقال وجهاً لوجه، لا ملصقاً."
		}
	},
	{
		id: "flag",
		value: "respect",
		minutes: 12,
		title: {
			en: "The flag, at home",
			ar: "العلم، في البيت"
		},
		detail: {
			en: "Hang or draw the UAE flag. Each person names one way this house shows respect outside it.",
			ar: "علّقوا علم الدولة أو ارسموه. كل شخص يسمّي طريقة يُظهر بها هذا البيت الاحترام خارجه."
		}
	}
];
var rituals = [
	{
		id: "maghrib-basket",
		minutes: 12,
		value: "kindness",
		title: {
			en: "The Maghrib basket",
			ar: "سلة المغرب"
		},
		promise: {
			en: "Phones rest. Names are said out loud.",
			ar: "الهواتف ترتاح. والأسماء تُقال بصوت مسموع."
		},
		fits: {
			en: "After maghrib, before homework spreads.",
			ar: "بعد المغرب، وقبل أن تنتشر الواجبات."
		},
		steps: [
			{
				kind: "gather",
				title: {
					en: "Put the day down",
					ar: "أنزلوا اليوم"
				},
				body: {
					en: "Phones go in a bowl in the middle. Sit where you can see every face. The youngest person says each name, slowly, and the named person answers: I'm here.",
					ar: "الهواتف في وعاء في الوسط. اجلسوا حيث ترون كل الوجوه. أصغر الحاضرين يقول كل اسم على مهل، وصاحبه يجيب: أنا هنا."
				}
			},
			{
				kind: "read",
				title: {
					en: "Kindness, said specifically",
					ar: "لطف يُقال بالتحديد"
				},
				body: {
					en: "Not a compliment about character. A thing someone did that made the house easier. If you cannot remember one, say so honestly. That is information.",
					ar: "ليس مديحاً في الطباع. شيء فعله أحدكم فصار البيت أهون. إن لم تتذكروا، قولوا ذلك بصدق. هذه معلومة."
				}
			},
			{
				kind: "talk",
				title: {
					en: "Three questions",
					ar: "ثلاثة أسئلة"
				},
				prompts: [
					{
						en: "Who carried something quietly this week?",
						ar: "من حمل شيئاً بهدوء هذا الأسبوع؟"
					},
					{
						en: "What did you notice and not say?",
						ar: "ماذا لاحظتم ولم تقولوه؟"
					},
					{
						en: "Who needs a softer voice from us tonight?",
						ar: "من يحتاج منا صوتاً ألين الليلة؟"
					}
				]
			},
			{
				kind: "do",
				title: {
					en: "Pass the bowl",
					ar: "مرّروا الوعاء"
				},
				body: {
					en: "Each person names one kindness and who it belongs to. The named person answers only: I heard you. No correcting. No turning it into a joke.",
					ar: "كل شخص يسمّي لطفاً واحداً وصاحبه. المُسمّى يجيب فقط: سمعتك. بلا تصحيح. وبلا تحويلها إلى مزاح."
				}
			}
		]
	},
	{
		id: "name-the-good",
		minutes: 8,
		value: "kindness",
		title: {
			en: "Say it by name",
			ar: "قُله باسمه"
		},
		promise: {
			en: "Eight minutes. One true sentence each.",
			ar: "ثماني دقائق. جملة صادقة من كل شخص."
		},
		fits: {
			en: "An exhausted weeknight, when the long version will not happen.",
			ar: "ليلة أسبوع متعبة، حين لا يتسع الوقت للنسخة الطويلة."
		},
		steps: [
			{
				kind: "gather",
				title: {
					en: "Stay where you are",
					ar: "ابقوا حيث أنتم"
				},
				body: {
					en: "No relocating the whole house. Phones face down, one arm's length away. If someone is still in the car, this can wait until the door closes.",
					ar: "لا تنقلوا البيت كله. الهواتف مقلوبة، على مدى ذراع. إن كان أحدكم ما زال في السيارة، فليانتظر هذا حتى يُغلق الباب."
				}
			},
			{
				kind: "read",
				title: {
					en: "Short still counts",
					ar: "القصير يُحتسب"
				},
				body: {
					en: "If the long majlis cannot happen, the short one still counts. One sentence. The person's name. Then stop.",
					ar: "إن لم يتيسر المجلس الطويل، فالقصير يُحتسب. جملة واحدة. اسم الشخص. ثم توقفوا."
				}
			},
			{
				kind: "talk",
				title: {
					en: "Only these",
					ar: "فقط هذان"
				},
				prompts: [{
					en: "Who made today lighter?",
					ar: "من خفّف اليوم؟"
				}, {
					en: "What were you glad was waiting at home?",
					ar: "ماذا سركم أنكم وجدتموه في البيت؟"
				}]
			},
			{
				kind: "do",
				title: {
					en: "One sentence",
					ar: "جملة واحدة"
				},
				body: {
					en: "Each person says one sentence to one person who is present. No speeches after. You are done when the last sentence lands.",
					ar: "كل شخص يقول جملة واحدة لشخص حاضر. بلا خطب بعدها. تنتهون حين تستقر الجملة الأخيرة."
				}
			}
		]
	},
	{
		id: "respect-voices",
		minutes: 12,
		value: "respect",
		title: {
			en: "How we speak",
			ar: "كيف نتكلم"
		},
		promise: {
			en: "Finish the sentence. Then repair the tone.",
			ar: "أكملوا الجملة. ثم أصلحوا النبرة."
		},
		fits: {
			en: "When the house has been sharp.",
			ar: "حين يكون البيت حاد النبرة."
		},
		steps: [
			{
				kind: "gather",
				title: {
					en: "A minute of quiet",
					ar: "دقيقة صمت"
				},
				body: {
					en: "Sit where you can see each other. For one minute, no one speaks. Notice who usually fills a silence.",
					ar: "اجلسوا حيث ترون بعضكم. لدقيقة واحدة لا يتكلم أحد. لاحظوا من يملأ الصمت عادة."
				}
			},
			{
				kind: "read",
				title: {
					en: "Room, not volume",
					ar: "مساحة، لا ارتفاع صوت"
				},
				body: {
					en: "Respect is not how loud a house is. It is leaving room, including for the person who talks the least. The first time an elder is mentioned, their name is said in full.",
					ar: "الاحترام ليس علو الصوت في البيت. هو ترك مساحة، بما فيها لمن يتكلم أقل. وأول مرة يُذكر فيها كبير، يُقال اسمه كاملاً."
				}
			},
			{
				kind: "talk",
				title: {
					en: "Three questions",
					ar: "ثلاثة أسئلة"
				},
				prompts: [
					{
						en: "Where did we interrupt this week?",
						ar: "أين قاطعنا الكلام هذا الأسبوع؟"
					},
					{
						en: "Which tone do we want to retire?",
						ar: "أي نبرة نريد أن نُنهيها؟"
					},
					{
						en: "What does a proper greeting sound like here?",
						ar: "كيف يكون السلام اللائق في هذا البيت؟"
					}
				]
			},
			{
				kind: "do",
				title: {
					en: "A repair sentence",
					ar: "جملة إصلاح"
				},
				body: {
					en: "Each person offers one sentence they could have used: “I cut you off. Finish. I'm listening.” Say it to the person it concerns, if they are in the room.",
					ar: "كل شخص يقدم جملة كان يمكن أن يقولها: «قاطعتك. أكمل. أنا أسمع». قولوها لصاحبها إن كان في المجلس."
				}
			}
		]
	},
	{
		id: "four-hands",
		minutes: 15,
		value: "cooperation",
		title: {
			en: "Four hands",
			ar: "أربع أيدٍ"
		},
		promise: {
			en: "One job. No foreman.",
			ar: "عمل واحد. بلا رئيس."
		},
		fits: {
			en: "When one person is about to tidy up alone.",
			ar: "حين يوشك شخص واحد أن يرتب وحده."
		},
		steps: [
			{
				kind: "gather",
				title: {
					en: "Point at one job",
					ar: "أشيروا إلى عمل واحد"
				},
				body: {
					en: "Choose one thing everyone can see: the table, the shoes, the bags by the door. Do not discuss a second job.",
					ar: "اختاروا شيئاً يراه الجميع: السفرة، الأحذية، الحقائب عند الباب. لا تناقشوا عملاً ثانياً."
				}
			},
			{
				kind: "read",
				title: {
					en: "Hands, not supervision",
					ar: "أيدٍ، لا إشراف"
				},
				body: {
					en: "Cooperation fails when it becomes management. Advice counts as extra noise. The smallest hands get a real part, not a pretend one.",
					ar: "يفشل التعاون حين يصير إدارة. النصيحة ضوضاء زائدة. والأيدي الصغيرة تأخذ جزءاً حقيقياً، لا تمثيلاً."
				}
			},
			{
				kind: "talk",
				title: {
					en: "Before you start",
					ar: "قبل أن تبدأوا"
				},
				prompts: [
					{
						en: "What makes a shared job feel like an order?",
						ar: "ما الذي يجعل العمل المشترك يبدو أمراً؟"
					},
					{
						en: "Who usually finishes what others start?",
						ar: "من يُنهي عادة ما يبدأه غيره؟"
					},
					{
						en: "What can the youngest hands actually do here?",
						ar: "ماذا تستطيع الأيدي الأصغر أن تفعل هنا فعلاً؟"
					}
				]
			},
			{
				kind: "do",
				title: {
					en: "Do it now",
					ar: "افعلوه الآن"
				},
				body: {
					en: "Do the job together until it is finished. Then sit down and say one thing that was easier because no one was alone.",
					ar: "أنفِذوا العمل معاً حتى ينتهي. ثم اجلسوا وقولوا شيئاً واحداً كان أهون لأن أحداً لم يكن وحده."
				}
			}
		]
	},
	{
		id: "what-i-keep",
		minutes: 10,
		value: "responsibility",
		title: {
			en: "What I look after",
			ar: "ما أعتني به"
		},
		promise: {
			en: "A promise with a name on it.",
			ar: "وعد عليه اسم."
		},
		fits: {
			en: "Sunday night, or any night before a busy morning.",
			ar: "ليلة الأحد، أو أي ليلة قبل صباح مزدحم."
		},
		steps: [
			{
				kind: "gather",
				title: {
					en: "Bring one object",
					ar: "أحضروا شيئاً واحداً"
				},
				body: {
					en: "Each person brings one thing they are responsible for this week: a bag, a key, a water bottle, a uniform, a laptop.",
					ar: "كل شخص يحضر شيئاً هو مسؤول عنه هذا الأسبوع: حقيبة، مفتاح، قارورة ماء، زي مدرسي، حاسوباً."
				}
			},
			{
				kind: "read",
				title: {
					en: "Ownership, not a lecture",
					ar: "ملكية، لا محاضرة"
				},
				body: {
					en: "Nobody assigns the duty. The person names it. The others do not take it over unless they are asked.",
					ar: "لا أحد يوزّع الواجب. صاحبه يسميه. والآخرون لا يأخذونه إلا إذا طُلب منهم."
				}
			},
			{
				kind: "talk",
				title: {
					en: "Three questions",
					ar: "ثلاثة أسئلة"
				},
				prompts: [
					{
						en: "What do you forget because someone else remembers?",
						ar: "ماذا تنسون لأن غيركم يتذكر؟"
					},
					{
						en: "What is actually yours, at school or at work?",
						ar: "ما الذي هو لكم فعلاً، في المدرسة أو العمل؟"
					},
					{
						en: "Who are you caring for besides yourself?",
						ar: "من تعتنون به غير أنفسكم؟"
					}
				]
			},
			{
				kind: "do",
				title: {
					en: "Say the duty",
					ar: "قولوا الواجب"
				},
				body: {
					en: "Each person says one duty out loud and when it will be done. Write nothing for them. They can write it themselves if they want a reminder.",
					ar: "كل شخص يقول واجباً واحداً بصوت مسموع ومتى سيُنجز. لا تكتبوا عنهم. يمكنهم أن يكتبوا لأنفسهم إن أرادوا تذكيراً."
				}
			}
		]
	},
	{
		id: "friday-table",
		minutes: 20,
		value: "cooperation",
		title: {
			en: "The Friday table",
			ar: "سفرة الجمعة"
		},
		promise: {
			en: "Everyone gets a say, including the quietest.",
			ar: "لكل واحد قول، بما فيه الأهدأ."
		},
		fits: {
			en: "Friday, after the half-day.",
			ar: "الجمعة، بعد دوام نصف اليوم."
		},
		steps: [
			{
				kind: "gather",
				title: {
					en: "The table you will eat at",
					ar: "السفرة التي ستأكلون عليها"
				},
				body: {
					en: "Clear the real table. Phones go in another room, not face-down beside a plate.",
					ar: "أفرغوا السفرة الحقيقية. الهواتف في غرفة أخرى، لا مقلوبة بجانب الصحن."
				}
			},
			{
				kind: "read",
				title: {
					en: "A plan, not a performance",
					ar: "خطة، لا استعراض"
				},
				body: {
					en: "One dish is enough. The point is that more than one person decided it, and a child was not only told to come and eat.",
					ar: "طبق واحد يكفي. المقصود أن يقرره أكثر من شخص، وألا يكون الطفل مدعواً للأكل فقط."
				}
			},
			{
				kind: "talk",
				title: {
					en: "Decide together",
					ar: "قرروا معاً"
				},
				prompts: [
					{
						en: "What can we make with what is already at home?",
						ar: "ماذا نقدر أن نعدّ مما هو في البيت أصلاً؟"
					},
					{
						en: "Who has not chosen a meal in a long time?",
						ar: "من لم يختر وجبة منذ مدة؟"
					},
					{
						en: "What help is real, and what is hovering?",
						ar: "أي مساعدة حقيقية، وأيها وقوف فوق الرأس؟"
					}
				]
			},
			{
				kind: "do",
				title: {
					en: "Name the plan",
					ar: "سمّوا الخطة"
				},
				body: {
					en: "Choose the dish, the time, and who leads. The youngest person chooses one part: salad, drink, fruit, or where you sit. If you can start now, start. If not, the plan itself is the gathering.",
					ar: "اختاروا الطبق والوقت ومن يقود. أصغر شخص يختار جزءاً: سلطة أو شراباً أو فاكهة أو مكان الجلوس. إن استطعتم البدء الآن فابدأوا. وإلا فالخطة نفسها هي المجلس."
				}
			}
		]
	},
	{
		id: "long-hello",
		minutes: 12,
		value: "respect",
		title: {
			en: "The long hello",
			ar: "السلام الطويل"
		},
		promise: {
			en: "A real question, then the quiet to hear the answer.",
			ar: "سؤال حقيقي، ثم صمت يكفي لسماع الجواب."
		},
		fits: {
			en: "When an elder has become a sticker on a chat.",
			ar: "حين صار الكبير ملصقاً في محادثة."
		},
		steps: [
			{
				kind: "gather",
				title: {
					en: "Choose the person",
					ar: "اختاروا الشخص"
				},
				body: {
					en: "Decide who you are calling or visiting. If they are already in the house, turn your chairs toward them and put the phones away.",
					ar: "قرروا من ستتصلون به أو تزورونه. إن كان في البيت، فوجهوا الكراسي إليه وأبعدوا الهواتف."
				}
			},
			{
				kind: "read",
				title: {
					en: "How are you is only a door",
					ar: "«كيف حالك» باب فقط"
				},
				body: {
					en: "Bring one question you do not already know the answer to. A greeting without a question is a wave from a moving car.",
					ar: "أحضروا سؤالاً لا تعرفون جوابه مسبقاً. السلام بلا سؤال تلويح من سيارة تمشي."
				}
			},
			{
				kind: "talk",
				title: {
					en: "Before the call",
					ar: "قبل الاتصال"
				},
				prompts: [
					{
						en: "What do we not know about this person's week?",
						ar: "ماذا لا نعرف عن أسبوع هذا الشخص؟"
					},
					{
						en: "What story have we never asked for?",
						ar: "أي حكاية لم نطلبها قط؟"
					},
					{
						en: "How do we show that we actually have time?",
						ar: "كيف نُظهر أن لدينا وقتاً فعلاً؟"
					}
				]
			},
			{
				kind: "do",
				title: {
					en: "Ask, then wait",
					ar: "اسألوا، ثم انتظروا"
				},
				body: {
					en: "Make the call, or have the conversation now. Each person asks their one question and does not fill the pause. Afterwards, say one thing you learned that you did not know this morning.",
					ar: "أجروا الاتصال، أو الحديث الآن. كل شخص يسأل سؤاله الواحد ولا يملأ الصمت. بعد ذلك قولوا شيئاً تعلمتموه ولم تكونوا تعرفونه هذا الصباح."
				}
			}
		]
	},
	{
		id: "flag-at-home",
		minutes: 12,
		value: "respect",
		title: {
			en: "The flag at home",
			ar: "العلم في البيت"
		},
		promise: {
			en: "A standard for the house, not a decoration.",
			ar: "ميزان للبيت، لا زينة."
		},
		fits: {
			en: "Flag Day week, or any week you need to remember where you stand.",
			ar: "أسبوع يوم العلم، أو أي أسبوع تحتاجون فيه أن تتذكروا أين تقفون."
		},
		steps: [
			{
				kind: "gather",
				title: {
					en: "Bring the flag close",
					ar: "قرّبوا العلم"
				},
				body: {
					en: "If you have a flag, put it on the table. If not, a drawing by the youngest person is enough. This is a conversation, not a parade.",
					ar: "إن كان عندكم علم فضعوه على السفرة. وإلا فرسمة من أصغر شخص تكفي. هذا حديث، لا استعراض."
				}
			},
			{
				kind: "read",
				title: {
					en: "Conduct, not a slogan",
					ar: "سلوك، لا شعار"
				},
				body: {
					en: "In a family, belonging shows up as ordinary conduct: how you speak to a guard, how you wait your turn, how you treat a classmate who is new.",
					ar: "في العائلة، الانتماء يظهر في السلوك العادي: كيف تكلمون الحارس، كيف تنتظرون دوركم، كيف تعاملون زميلاً جديداً."
				}
			},
			{
				kind: "talk",
				title: {
					en: "Outside the door",
					ar: "خارج الباب"
				},
				prompts: [
					{
						en: "What does respect look like on our street?",
						ar: "كيف يبدو الاحترام في شارعنا؟"
					},
					{
						en: "Who do we pass in this city without seeing?",
						ar: "من نمر به في هذه المدينة ولا نراه؟"
					},
					{
						en: "What would a guest remember about our house?",
						ar: "ماذا سيتذكر ضيف عن بيتنا؟"
					}
				]
			},
			{
				kind: "do",
				title: {
					en: "One conduct each",
					ar: "سلوك واحد لكل شخص"
				},
				body: {
					en: "Each person names one way they will show respect outside the house this week. Say it as a promise, not a slogan. No one applauds.",
					ar: "كل شخص يسمّي طريقة سيُظهر بها الاحترام خارج البيت هذا الأسبوع. قولوها وعداً، لا شعاراً. بلا تصفيق."
				}
			}
		]
	}
];
function ritualById(id) {
	return rituals.find((ritual) => ritual.id === id);
}
function valueById(id) {
	const found = values.find((value) => value.id === id);
	if (!found) throw new Error(`Unknown value ${id}`);
	return found;
}
var copy = {
	en: {
		switchTo: "عربي",
		switchLabel: "Switch language to Arabic",
		householdLine: (name) => `The ${name} household`,
		morning: "Good morning",
		afternoon: "Good afternoon",
		evening: "Good evening",
		nav: {
			today: "Today",
			majlis: "Majlis",
			values: "Values",
			week: "Week",
			kindness: "Kindness",
			quests: "Quests",
			household: "Household"
		},
		days: [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		],
		roles: {
			parent: "Parent",
			grandparent: "Grandparent",
			teen: "Teen",
			child: "Child"
		},
		minutes: (n) => `${n} min`,
		stats: (mins, notes, quests) => `${mins} minutes together · ${notes} kindnesses · ${quests} quests`,
		everyone: "Everyone",
		kept: "Kept",
		open: "Open",
		notFound: "That gathering is not in the library.",
		back: "Back",
		justNow: "Just now",
		home: {
			dek: "A short majlis for the people who already share your name. Small enough for a school night.",
			begin: "Begin together",
			allGatherings: "All gatherings",
			ifShort: "If the day is already too long",
			thisWeek: "This week",
			seeWeek: "See the week",
			valuesTitle: "Four values, practised",
			practicesKept: (done, total) => `${done} of ${total} practices kept`,
			saidAloud: "Said out loud",
			seeNotes: "All notes",
			stillOpen: "Still open",
			seeQuests: "All quests",
			keptMoments: "What we kept",
			thesis: "UAE families already know respect, kindness, cooperation and responsibility. What gets crowded out is the time to practise them. Baytna is a majlis that fits after school: a ritual, a week you can see, and a place to say something kind by name."
		},
		majlis: {
			title: "Gatherings",
			lead: "Pick a length the week can actually hold. Read it across the table, not alone on a phone.",
			begin: "Begin"
		},
		player: {
			back: "Library",
			startClock: "Start the clock",
			pauseClock: "Pause",
			phonesAway: "Phones in the bowl",
			whosHere: "Who is here",
			next: "Next",
			previous: "Back",
			remember: "What should we remember?",
			placeholder: "One line. A name, if you can.",
			save: "Keep this majlis",
			savedTitle: "Kept.",
			savedBody: "It sits with the rest of the week now.",
			home: "Back to today",
			leaveNote: "Leave a kindness",
			markPlan: (title) => `Mark “${title}” kept`,
			stepOf: (i, n) => `${i} of ${n}`
		},
		values: {
			title: "The four values",
			lead: "Not posters. Small conduct you can tick when it actually happened this week."
		},
		week: {
			title: "The week",
			lead: "Sunday starts the school week. Friday afternoon and Saturday are where a longer table fits. A quarter of an hour still counts.",
			name: "Name",
			add: "Add a gathering",
			save: "Save gathering",
			cancel: "Cancel",
			titlePh: "After-school check-in",
			day: "Day",
			time: "Time",
			length: "Length",
			who: "Who",
			value: "Value",
			mark: "Mark kept",
			undo: "Undo",
			remove: "Remove",
			today: "Today",
			noTitle: "Give the gathering a name."
		},
		kindness: {
			title: "Kindness, by name",
			lead: "A note is said to someone, not about them. Specific is better than grand.",
			from: "From",
			to: "To",
			note: "Note",
			send: "Leave the note",
			prompts: "Or start from a line",
			empty: "Nothing on the wall yet. One sentence is enough to begin.",
			remove: "Remove"
		},
		quests: {
			title: "Quests",
			lead: "Ordinary jobs with the family still in them. Finish one. Write one line about what changed.",
			mark: "We did this",
			undo: "Undo",
			notePh: "One line about what changed.",
			reflection: "What changed"
		},
		family: {
			title: "Household",
			lead: "This house lives on this device. No account. What you change stays in the browser.",
			nameEn: "Family name in English",
			nameAr: "Family name in Arabic",
			emirate: "Emirate",
			members: "People",
			add: "Add a person",
			remove: "Remove",
			role: "Role",
			name: "Name",
			nameAr: "الاسم",
			reset: "Restore the Al Mansoori example",
			resetArm: "This replaces the names, notes and plans on this device.",
			resetYes: "Restore example",
			walkTitle: "A two-minute walkthrough",
			walk: [
				"From Today, begin the Maghrib basket and read one question aloud.",
				"Open the week and mark the Friday table kept, or add your own gathering.",
				"Leave a kindness from one person to another.",
				"Switch the whole house into Arabic."
			]
		}
	},
	ar: {
		switchTo: "English",
		switchLabel: "التبديل إلى الإنجليزية",
		householdLine: (name) => `بيت ${name}`,
		morning: "صباح الخير",
		afternoon: "طاب يومكم",
		evening: "مساء الخير",
		nav: {
			today: "اليوم",
			majlis: "المجلس",
			values: "القيم",
			week: "الأسبوع",
			kindness: "اللطف",
			quests: "المهام",
			household: "البيت"
		},
		days: [
			"الأحد",
			"الإثنين",
			"الثلاثاء",
			"الأربعاء",
			"الخميس",
			"الجمعة",
			"السبت"
		],
		roles: {
			parent: "والد",
			grandparent: "جد",
			teen: "مراهق",
			child: "طفل"
		},
		minutes: (n) => `${n} د`,
		stats: (mins, notes, quests) => `${mins} دقيقة معاً · ${notes} ألطاف · ${quests} مهام`,
		everyone: "الجميع",
		kept: "حُفظ",
		open: "مفتوح",
		notFound: "هذا المجلس غير موجود في المكتبة.",
		back: "رجوع",
		justNow: "الآن",
		home: {
			dek: "مجلس قصير لأهل البيت الذين يشتركون في الاسم أصلاً. صغير بما يكفي لليلة مدرسة.",
			begin: "ابدأوا معاً",
			allGatherings: "كل المجالس",
			ifShort: "إن كان اليوم قد طال",
			thisWeek: "هذا الأسبوع",
			seeWeek: "الأسبوع كاملاً",
			valuesTitle: "أربع قيم تُمارَس",
			practicesKept: (done, total) => `${done} من ${total} ممارسات حُفظت`,
			saidAloud: "قيل بصوت مسموع",
			seeNotes: "كل الملاحظات",
			stillOpen: "ما زال مفتوحاً",
			seeQuests: "كل المهام",
			keptMoments: "ما حفظناه",
			thesis: "عائلات الإمارات تعرف الاحترام واللطف والتعاون والمسؤولية. ما يضيق هو الوقت لممارستها. بيتنا مجلس يتسع بعد المدرسة: طقس، وأسبوع ترونه، ومكان لقول اللطف بالاسم."
		},
		majlis: {
			title: "المجالس",
			lead: "اختاروا مدة يحتملها الأسبوع فعلاً. تُقرأ على السفرة، لا على هاتف منفرد.",
			begin: "ابدأوا"
		},
		player: {
			back: "المكتبة",
			startClock: "ابدأوا الساعة",
			pauseClock: "إيقاف",
			phonesAway: "الهواتف في الوعاء",
			whosHere: "من الحاضرون",
			next: "التالي",
			previous: "رجوع",
			remember: "ماذا نريد أن نتذكر؟",
			placeholder: "سطر واحد. واسم، إن استطعتم.",
			save: "احفظوا هذا المجلس",
			savedTitle: "حُفظ.",
			savedBody: "صار مع بقية الأسبوع.",
			home: "العودة إلى اليوم",
			leaveNote: "اكتبوا لطفاً",
			markPlan: (title) => `علّموا «${title}» محفوظاً`,
			stepOf: (i, n) => `${i} من ${n}`
		},
		values: {
			title: "القيم الأربع",
			lead: "ليست ملصقات. سلوك صغير تعلّمونه حين يحدث فعلاً هذا الأسبوع."
		},
		week: {
			title: "الأسبوع",
			lead: "الأحد يبدأ أسبوع المدرسة. عصر الجمعة والسبت يتسعان لسفرة أطول. وربع الساعة يُحتسب.",
			name: "الاسم",
			add: "أضيفوا مجلساً",
			save: "احفظوا المجلس",
			cancel: "إلغاء",
			titlePh: "اطمئنان بعد المدرسة",
			day: "اليوم",
			time: "الوقت",
			length: "المدة",
			who: "من",
			value: "القيمة",
			mark: "علّموه محفوظاً",
			undo: "تراجع",
			remove: "حذف",
			today: "اليوم",
			noTitle: "سمّوا المجلس."
		},
		kindness: {
			title: "لطف بالاسم",
			lead: "الملاحظة تُقال لشخص، لا عنه. المحدد خير من الكبير.",
			from: "من",
			to: "إلى",
			note: "الملاحظة",
			send: "اتركوا الملاحظة",
			prompts: "أو ابدأوا من سطر",
			empty: "الجدار فارغ. جملة واحدة تكفي للبداية.",
			remove: "حذف"
		},
		quests: {
			title: "المهام",
			lead: "أعمال عادية يبقى فيها الأهل معاً. أتمّوا واحدة. اكتبوا سطراً عما تغيّر.",
			mark: "فعلنا هذا",
			undo: "تراجع",
			notePh: "سطر واحد عما تغيّر.",
			reflection: "ما الذي تغيّر"
		},
		family: {
			title: "البيت",
			lead: "هذا البيت يعيش على هذا الجهاز. بلا حساب. ما تغيّرونه يبقى في المتصفح.",
			nameEn: "اسم العائلة بالإنجليزية",
			nameAr: "اسم العائلة بالعربية",
			emirate: "الإمارة",
			members: "الأهل",
			add: "أضيفوا شخصاً",
			remove: "حذف",
			role: "الدور",
			name: "الاسم بالإنجليزية",
			nameAr: "الاسم بالعربية",
			reset: "أعيدوا مثال المنصوري",
			resetArm: "هذا يستبدل الأسماء والملاحظات والخطط على هذا الجهاز.",
			resetYes: "أعيدوا المثال",
			walkTitle: "جولة من دقيقتين",
			walk: [
				"من اليوم، ابدأوا سلة المغرب واقرأوا سؤالاً واحداً بصوت مسموع.",
				"افتحوا الأسبوع وعلّموا سفرة الجمعة محفوظة، أو أضيفوا مجلسكم.",
				"اتركوا لطفاً من شخص إلى آخر.",
				"حوّلوا البيت كله إلى العربية."
			]
		}
	}
};
var memoryStorage = {
	getItem: (name) => typeof window === "undefined" ? null : localStorage.getItem(name),
	setItem: (name, value) => {
		if (typeof window !== "undefined") localStorage.setItem(name, value);
	},
	removeItem: (name) => {
		if (typeof window !== "undefined") localStorage.removeItem(name);
	}
};
function uid() {
	return Math.random().toString(36).slice(2, 10);
}
var everyone = [
	"fatima",
	"khalid",
	"maryam",
	"zayed",
	"saeeda"
];
function seed() {
	return {
		lang: "en",
		householdEn: "Al Mansoori",
		householdAr: "المنصوري",
		emirate: "abu-dhabi",
		members: [
			{
				id: "fatima",
				name: "Fatima",
				nameAr: "فاطمة",
				role: "parent"
			},
			{
				id: "khalid",
				name: "Khalid",
				nameAr: "خالد",
				role: "parent"
			},
			{
				id: "maryam",
				name: "Maryam",
				nameAr: "مريم",
				role: "teen"
			},
			{
				id: "zayed",
				name: "Zayed",
				nameAr: "زايد",
				role: "child"
			},
			{
				id: "saeeda",
				name: "Saeeda",
				nameAr: "سعيدة",
				role: "grandparent"
			}
		],
		plans: [
			{
				id: "sun-maghrib",
				titleEn: "Sunset pause",
				titleAr: "وقفة المغرب",
				day: 0,
				time: "19:30",
				minutes: 12,
				value: "kindness",
				memberIds: everyone,
				done: true
			},
			{
				id: "tue-gate",
				titleEn: "After the school gate",
				titleAr: "بعد بوابة المدرسة",
				day: 2,
				time: "16:15",
				minutes: 10,
				value: "respect",
				memberIds: [
					"fatima",
					"maryam",
					"zayed"
				],
				done: false
			},
			{
				id: "fri-table",
				titleEn: "The Friday table",
				titleAr: "سفرة الجمعة",
				day: 5,
				time: "13:30",
				minutes: 45,
				value: "cooperation",
				memberIds: everyone,
				done: false
			},
			{
				id: "sat-out",
				titleEn: "Saturday, with a young vote",
				titleAr: "سبت بصوت صغير",
				day: 6,
				time: "09:30",
				minutes: 90,
				value: "cooperation",
				memberIds: everyone,
				done: false
			}
		],
		notes: [
			{
				id: "n1",
				fromId: "maryam",
				toId: "fatima",
				textEn: "You waited at the gate and didn't look at your phone. I saw.",
				textAr: "انتظرتِ عند البوابة ولم تنظري إلى هاتفك. أنا رأيت.",
				whenEn: "Tuesday",
				whenAr: "الثلاثاء"
			},
			{
				id: "n2",
				fromId: "zayed",
				toId: "khalid",
				textEn: "You let me crack the eggs.",
				textAr: "سمحت لي أن أكسر البيض.",
				whenEn: "Sunday",
				whenAr: "الأحد"
			},
			{
				id: "n3",
				fromId: "khalid",
				toId: "saeeda",
				textEn: "You still ask about my work as if you are hearing it for the first time.",
				textAr: "ما زلتِ تسألين عن عملي كأنك تسمعينه أول مرة.",
				whenEn: "Monday",
				whenAr: "الإثنين"
			}
		],
		memories: [{
			id: "mem1",
			ritualId: "maghrib-basket",
			minutes: 12,
			noteEn: "Zayed said Maryam helped him with the reading.",
			noteAr: "قال زايد إن مريم ساعدته في القراءة.",
			whenEn: "Sunday evening",
			whenAr: "مساء الأحد",
			memberIds: everyone
		}],
		quests: { "elder-hello": {
			done: true,
			noteEn: "Saeeda asked about Maryam's project before anything else.",
			noteAr: "سألت سعيدة عن مشروع مريم قبل أي شيء آخر."
		} },
		practices: {
			"respect-finish": true,
			"kind-name": true
		}
	};
}
var useFamily = create()(persist((set) => ({
	...seed(),
	setLang: (lang) => set({ lang }),
	setHousehold: (patch) => set(patch),
	updateMember: (id, patch) => set((state) => ({ members: state.members.map((member) => member.id === id ? {
		...member,
		...patch
	} : member) })),
	addMember: () => set((state) => ({ members: [...state.members, {
		id: uid(),
		name: "Name",
		nameAr: "الاسم",
		role: "child"
	}] })),
	removeMember: (id) => set((state) => {
		if (state.members.length <= 2) return state;
		return {
			members: state.members.filter((member) => member.id !== id),
			plans: state.plans.map((plan) => ({
				...plan,
				memberIds: plan.memberIds.filter((memberId) => memberId !== id)
			})),
			notes: state.notes.filter((note) => note.fromId !== id && note.toId !== id)
		};
	}),
	togglePlan: (id) => set((state) => ({ plans: state.plans.map((plan) => plan.id === id ? {
		...plan,
		done: !plan.done
	} : plan) })),
	addPlan: (plan) => set((state) => ({ plans: [...state.plans, {
		...plan,
		id: uid(),
		done: false
	}] })),
	removePlan: (id) => set((state) => ({ plans: state.plans.filter((plan) => plan.id !== id) })),
	addNote: ({ fromId, toId, text, lang }) => set((state) => ({ notes: [{
		id: uid(),
		fromId,
		toId,
		textEn: text,
		textAr: text,
		whenEn: lang === "en" ? "Just now" : "Just now",
		whenAr: "الآن"
	}, ...state.notes] })),
	removeNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
	addMemory: (memory) => set((state) => ({ memories: [{
		...memory,
		id: uid()
	}, ...state.memories] })),
	removeMemory: (id) => set((state) => ({ memories: state.memories.filter((memory) => memory.id !== id) })),
	togglePractice: (id) => set((state) => ({ practices: {
		...state.practices,
		[id]: !state.practices[id]
	} })),
	setQuest: (id, patch) => set((state) => {
		const current = state.quests[id] ?? {
			done: false,
			noteEn: "",
			noteAr: ""
		};
		return { quests: {
			...state.quests,
			[id]: {
				...current,
				...patch
			}
		} };
	}),
	resetDemo: () => set((state) => ({
		...seed(),
		lang: state.lang
	}))
}), {
	name: "baytna-v1",
	version: 1,
	skipHydration: true,
	storage: createJSONStorage(() => memoryStorage),
	partialize: (state) => ({
		lang: state.lang,
		householdEn: state.householdEn,
		householdAr: state.householdAr,
		emirate: state.emirate,
		members: state.members,
		plans: state.plans,
		notes: state.notes,
		memories: state.memories,
		quests: state.quests,
		practices: state.practices
	})
}));
function sortedPlans(plans) {
	return [...plans].sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
}
function planTitle(plan, lang) {
	return lang === "ar" ? plan.titleAr || plan.titleEn : plan.titleEn || plan.titleAr;
}
function noteText(note, lang) {
	return lang === "ar" ? note.textAr || note.textEn : note.textEn || note.textAr;
}
function noteWhen(note, lang) {
	return lang === "ar" ? note.whenAr || note.whenEn : note.whenEn || note.whenAr;
}
function memoryNote(memory, lang) {
	return lang === "ar" ? memory.noteAr || memory.noteEn : memory.noteEn || memory.noteAr;
}
function memoryWhen(memory, lang) {
	return lang === "ar" ? memory.whenAr || memory.whenEn : memory.whenEn || memory.whenAr;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var dock = [
	{
		to: "/",
		label: "today",
		icon: Sun,
		exact: true
	},
	{
		to: "/majlis",
		label: "majlis",
		icon: MessagesSquare,
		exact: false
	},
	{
		to: "/week",
		label: "week",
		icon: CalendarDays,
		exact: false
	},
	{
		to: "/kindness",
		label: "kindness",
		icon: Feather,
		exact: false
	},
	{
		to: "/quests",
		label: "quests",
		icon: Compass,
		exact: false
	}
];
var desktop = [
	dock[0],
	dock[1],
	{
		to: "/values",
		label: "values",
		icon: House,
		exact: false
	},
	dock[2],
	dock[3],
	dock[4]
];
function isActive(path, to, exact) {
	if (exact) return path === to;
	return path === to || path.startsWith(`${to}/`);
}
function AppShell({ children }) {
	const lang = useFamily((state) => state.lang);
	const setLang = useFamily((state) => state.setLang);
	const householdEn = useFamily((state) => state.householdEn);
	const householdAr = useFamily((state) => state.householdAr);
	const emirate = useFamily((state) => state.emirate);
	const path = useRouterState({ select: (state) => state.location.pathname });
	const c = copy[lang];
	const dir = lang === "ar" ? "rtl" : "ltr";
	const playing = path.startsWith("/majlis/");
	const household = c.householdLine(lang === "ar" ? householdAr : householdEn);
	(0, import_react.useEffect)(() => {
		let live = true;
		(async () => {
			await useFamily.persist.rehydrate();
			if (!live) return;
			const next = useFamily.getState().lang;
			document.documentElement.lang = next;
			document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
		})();
		return () => {
			live = false;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = lang;
		document.documentElement.dir = dir;
	}, [lang, dir]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		lang,
		dir,
		className: cn("min-h-dvh bg-bg text-fg", lang === "ar" && "font-ar"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-primary" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 border-b border-border bg-bg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 md:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-2.5 shrink-0 rounded-sm bg-accent",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("font-display text-xl leading-none", lang === "en" && "tracking-tight"),
								children: lang === "ar" ? "بيتنا" : "Baytna"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block truncate text-xs text-muted",
							children: [
								household,
								" · ",
								emirateLabel(emirate, lang)
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ms-auto flex shrink-0 items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/family",
							className: cn("inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium", isActive(path, "/family", false) ? "text-primary" : "text-fg"),
							children: c.nav.household
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-medium text-primary transition-transform duration-150 ease-out active:scale-[0.96]",
							"aria-label": c.switchLabel,
							onClick: () => setLang(lang === "en" ? "ar" : "en"),
							children: c.switchTo
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "mx-auto hidden max-w-5xl gap-1 px-6 pb-2 md:flex md:px-8",
					"aria-label": c.nav.today,
					children: desktop.map((item) => {
						const active = isActive(path, item.to, item.exact);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: cn("inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium", active ? "bg-sunken text-primary" : "text-muted"),
							children: c.nav[item.label]
						}, item.to);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: cn("mx-auto w-full max-w-5xl px-4 pt-6 md:px-8", playing ? "pb-10" : "pb-28 md:pb-16"),
				children
			}),
			!playing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "dock fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg md:hidden",
				"aria-label": c.nav.today,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mx-auto flex max-w-5xl",
					children: dock.map((item) => {
						const active = isActive(path, item.to, item.exact);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "min-w-0 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-xs leading-tight", active ? "text-primary" : "text-muted"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-0.5 w-4 rounded-full", active ? "bg-primary" : "bg-transparent") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "size-5",
										"aria-hidden": "true",
										strokeWidth: 1.75
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "max-w-full truncate",
										children: c.nav[item.label]
									})
								]
							})
						}, item.to);
					})
				})
			})
		]
	});
}
var styles_default = "/assets/styles-BCPXx3Qf.css";
var APP_NAME = "Baytna";
var Route$8 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Baytna helps UAE families keep a short majlis for respect, kindness, cooperation and responsibility."
			},
			{
				name: "theme-color",
				content: "#0f5c4c"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,620&family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$7 = () => import("./routes-LEfy74ec.mjs");
var Route$7 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./family-D-G3ZriJ.mjs");
var Route$6 = createFileRoute("/family")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./kindness-DxJNgQoh.mjs");
var Route$5 = createFileRoute("/kindness")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./majlis-Co_Sb4mS.mjs");
var Route$4 = createFileRoute("/majlis")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./quests-CQR_V609.mjs");
var Route$3 = createFileRoute("/quests")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./values-DBR5O1xq.mjs");
var Route$2 = createFileRoute("/values")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./week-DICua76q.mjs");
var Route$1 = createFileRoute("/week")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./majlis._ritualId-DGXBWA6Z.mjs");
var Route = createFileRoute("/majlis/$ritualId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$8
});
var FamilyRoute = Route$6.update({
	id: "/family",
	path: "/family",
	getParentRoute: () => Route$8
});
var KindnessRoute = Route$5.update({
	id: "/kindness",
	path: "/kindness",
	getParentRoute: () => Route$8
});
var MajlisRoute = Route$4.update({
	id: "/majlis",
	path: "/majlis",
	getParentRoute: () => Route$8
});
var QuestsRoute = Route$3.update({
	id: "/quests",
	path: "/quests",
	getParentRoute: () => Route$8
});
var ValuesRoute = Route$2.update({
	id: "/values",
	path: "/values",
	getParentRoute: () => Route$8
});
var WeekRoute = Route$1.update({
	id: "/week",
	path: "/week",
	getParentRoute: () => Route$8
});
var MajlisRouteChildren = { MajlisRitualIdRoute: Route.update({
	id: "/$ritualId",
	path: "/$ritualId",
	getParentRoute: () => MajlisRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	FamilyRoute,
	KindnessRoute,
	MajlisRoute: MajlisRoute._addFileChildren(MajlisRouteChildren),
	QuestsRoute,
	ValuesRoute,
	WeekRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { rituals as _, memoryWhen as a, planTitle as c, copy as d, emirates as f, ritualById as g, quests as h, memoryNote as i, sortedPlans as l, practices as m, Route as n, noteText as o, kindnessPrompts as p, cn as r, noteWhen as s, router_exports as t, useFamily as u, valueById as v, values as y };
