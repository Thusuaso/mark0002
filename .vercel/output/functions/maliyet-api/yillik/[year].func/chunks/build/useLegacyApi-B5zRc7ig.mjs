import { u as useApi } from './useApi-CGFzrxZs.mjs';

//#region app/composables/useLegacyApi.ts
function wrap(data, status = 200) {
	return {
		data,
		status
	};
}
function useLegacyApi() {
	const api = useApi();
	async function request(url, opts = {}) {
		return wrap(await api(url, opts));
	}
	return {
		get: (url, opts) => request(url, {
			...opts,
			method: "GET"
		}),
		post: (url, body, opts) => request(url, {
			...opts,
			method: "POST",
			body
		}),
		put: (url, body, opts) => request(url, {
			...opts,
			method: "PUT",
			body
		}),
		delete: (url, opts) => request(url, {
			...opts,
			method: "DELETE"
		})
	};
}

export { useLegacyApi as u };
//# sourceMappingURL=useLegacyApi-B5zRc7ig.mjs.map
