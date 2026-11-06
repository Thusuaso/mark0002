import { b as useAsyncData } from '../virtual/entry.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';

//#region app/composables/useReferenceData.ts
async function useReferenceData(key, lists, options = {}) {
	const shared = useSharedStore();
	await useAsyncData(key, async () => {
		const pending = lists.filter(([stateKey]) => {
			if (options.force) return true;
			const current = shared.$state[stateKey];
			return !Array.isArray(current) || current.length === 0;
		}).map(([, fetchIt]) => fetchIt());
		await Promise.all(pending);
		return true;
	}, { server: false });
}

export { useReferenceData as u };
//# sourceMappingURL=useReferenceData-DTHP3Dno.mjs.map
