import { $ as $fetch$2 } from '../virtual/entry.mjs';

//#region app/composables/useTcmb.ts
function useTcmb() {
	async function getUSDRate(requested, kind = "forex") {
		const date = new Date(requested);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return await $fetch$2(`/tcmb-api/usd/${kind}/${year}/${month}/${day}`, { baseURL: "/" });
	}
	return { getUSDRate };
}

export { useTcmb as u };
//# sourceMappingURL=useTcmb-B8gDruVs.mjs.map
