import { u as useCookie, a as useAppToast } from '../virtual/entry.mjs';
import { u as useApi } from './useApi-CGFzrxZs.mjs';
import { defineStore } from 'pinia';

//#region app/stores/logs.ts
var useLogsStore = defineStore("logs", { actions: { async setLogs(payload) {
	const toast = useAppToast();
	try {
		if ((await useApi()("/logs/save", {
			method: "POST",
			body: {
				...payload,
				username: useCookie("username").value,
				date: /* @__PURE__ */ new Date()
			}
		})).status) toast.success("Loglara Eklendi.");
		else toast.error("Loglara Eklenemedi.");
	} catch (err) {
		console.error("setLogs basarisiz:", err);
		toast.error("Loglara Eklenemedi.");
	}
} } });

export { useLogsStore as u };
//# sourceMappingURL=logs-BCO5TrJQ.mjs.map
