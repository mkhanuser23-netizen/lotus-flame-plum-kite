import { i as __toESM } from "../_runtime.mjs";
import { J as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-weekday-DQhWj1mI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useWeekday() {
	const [day, setDay] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setDay((/* @__PURE__ */ new Date()).getDay());
	}, []);
	return day;
}
function useDaypart() {
	const [part, setPart] = (0, import_react.useState)(null);
	const [day, setDay] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const now = /* @__PURE__ */ new Date();
		const hour = now.getHours();
		setDay(now.getDay());
		setPart(hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening");
	}, []);
	return {
		part,
		day
	};
}
//#endregion
export { useWeekday as n, useDaypart as t };
