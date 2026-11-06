import { a as useAppToast } from '../virtual/entry.mjs';
import { u as useApi } from './useApi-CGFzrxZs.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { defineStore } from 'pinia';

//#region app/stores/container.ts
var useContainerStore = defineStore("container", {
	state: () => ({
		containerAgencyList: [],
		containerFollowList: [],
		containerUnfollowList: [],
		containerResults: null,
		containerInputList: []
	}),
	getters: {
		getContainerAgencyList: (state) => state.containerAgencyList,
		getContainerFollowList: (state) => state.containerFollowList,
		getContainerUnfollowList: (state) => state.containerUnfollowList,
		getContainerResults: (state) => state.containerResults,
		getContainerInputList: (state) => state.containerInputList
	},
	actions: {
		async setContainerFollowList() {
			const shared = useSharedStore();
			shared.beginLoading();
			try {
				const res = await useApi()("/container/follow/list");
				this.containerFollowList = res?.follow ?? [];
			} catch (err) {
				console.error("setContainerFollowList basarisiz:", err);
				this.containerFollowList = [];
			} finally {
				shared.endLoading();
			}
		},
		async setContainerUnfollowList() {
			const shared = useSharedStore();
			shared.beginLoading();
			try {
				const res = await useApi()("/container/unfollow/list");
				this.containerUnfollowList = res?.unfollow ?? [];
			} catch (err) {
				console.error("setContainerUnfollowList basarisiz:", err);
				this.containerUnfollowList = [];
			} finally {
				shared.endLoading();
			}
		},
		async setContainerFollowSave(follow) {
			const toast = useAppToast();
			try {
				if ((await useApi()("/container/follow/save", {
					method: "POST",
					body: follow
				})).status) {
					await Promise.all([this.setContainerFollowList(), this.setContainerUnfollowList()]);
					toast.success("Başarıyla Kaydedildi.");
				} else toast.error("Kaydetme Başarışız.");
			} catch (err) {
				console.error("setContainerFollowSave basarisiz:", err);
				toast.error("Kaydetme Başarışız.");
			}
		},
		async setContainerInputSave(container) {
			const toast = useAppToast();
			try {
				const res = await useApi()("/container/input/save", {
					method: "POST",
					body: container
				});
				if (res.status) {
					toast.success("Başarıyla Kaydedildi.");
					this.containerResults = res.containerResults;
				} else toast.error("Kaydetme Başarışız.");
			} catch (err) {
				console.error("setContainerInputSave basarisiz:", err);
				toast.error("Kaydetme Başarışız.");
			}
		},
		async setContainerInputFileSave(container) {
			const toast = useAppToast();
			try {
				if ((await useApi()("/container/input/file/save", {
					method: "POST",
					body: container
				})).status) toast.success("Başarıyla Kaydedildi.");
				else toast.error("Kaydetme Başarışız.");
			} catch (err) {
				console.error("setContainerInputFileSave basarisiz:", err);
				toast.error("Kaydetme Başarışız.");
			}
		},
		async setContainerAgencyList() {
			try {
				const res = await useApi()("/container/agency/list");
				this.containerAgencyList = res?.list ?? [];
			} catch (err) {
				console.error("setContainerAgencyList basarisiz:", err);
				this.containerAgencyList = [];
			}
		},
		async setContainerInputList() {
			const shared = useSharedStore();
			shared.beginLoading();
			try {
				const res = await useApi()("/container/input/list");
				this.containerInputList = res?.list ?? [];
			} catch (err) {
				console.error("setContainerInputList basarisiz:", err);
				this.containerInputList = [];
			} finally {
				shared.endLoading();
			}
		}
	}
});

export { useContainerStore as u };
//# sourceMappingURL=container-BObu6QpR.mjs.map
