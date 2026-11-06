import { u as useCookie, $ as $fetch$2 } from '../virtual/entry.mjs';

//#region app/composables/useApi.ts
function useApi() {
	const token = useCookie("token");
	return $fetch$2.create({
		baseURL: "/api",
		onRequest({ options }) {
			if (token.value) options.headers.set("Authorization", `Bearer ${token.value}`);
		},
		onResponseError({ response }) {
			if (response.status === 401 || response.status === 403) console.warn("Yetkisiz işlem veya token süresi doldu!");
		}
	});
}

export { useApi as u };
//# sourceMappingURL=useApi-CGFzrxZs.mjs.map
