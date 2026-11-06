import { a as useAppToast } from '../virtual/entry.mjs';
import { u as useApi } from './useApi-CGFzrxZs.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { defineStore } from 'pinia';

//#region app/stores/transport.ts
var useTransportStore = defineStore("transport", {
	state: () => ({
		companyList: [],
		transportList: []
	}),
	getters: {
		getCompanyList: (state) => state.companyList,
		getTransportList: (state) => state.transportList
	},
	actions: {
		async setCompanyList() {
			try {
				const res = await useApi()("/transport/company/list");
				this.companyList = res?.company ?? [];
			} catch (err) {
				console.error("setCompanyList basarisiz:", err);
				this.companyList = [];
			}
		},
		async setCompanySave(company) {
			const toast = useAppToast();
			try {
				if ((await useApi()("/transport/company/save", {
					method: "POST",
					body: company
				})).status) {
					toast.success("Başarıyla Kaydedildi.");
					await this.setCompanyList();
				} else toast.error("Kaydetme Başarısız.");
			} catch (err) {
				console.error("setCompanySave basarisiz:", err);
				toast.error("Kaydetme Başarısız.");
			}
		},
		async setTransportSave(transport) {
			const toast = useAppToast();
			try {
				if ((await useApi()("/transport/list/save", {
					method: "POST",
					body: transport
				})).status) toast.success("Başarıyla Kaydedildi.");
				else toast.error("Kaydetme Başarısız");
			} catch (err) {
				console.error("setTransportSave basarisiz:", err);
				toast.error("Kaydetme Başarısız");
			}
		},
		async setTransportFileSave(transport) {
			const toast = useAppToast();
			try {
				if ((await useApi()("/transport/file/list/save", {
					method: "POST",
					body: transport
				})).status) toast.success("Başarıyla Kaydedildi.");
				else toast.error("Kaydetme Başarısız");
			} catch (err) {
				console.error("setTransportFileSave basarisiz:", err);
				toast.error("Kaydetme Başarısız");
			}
		},
		async setTransportList() {
			const shared = useSharedStore();
			shared.beginLoading();
			try {
				const res = await useApi()("/transport/list");
				this.transportList = res?.transport ?? [];
			} catch (err) {
				console.error("setTransportList basarisiz:", err);
				this.transportList = [];
			} finally {
				shared.endLoading();
			}
		},
		async setUpdateTransport(transport) {
			try {
				if (!(await useApi()("/transport/list/update", {
					method: "PUT",
					body: transport
				})).status) return false;
				await this.setTransportList();
				return true;
			} catch (err) {
				console.error("setUpdateTransport basarisiz:", err);
				return false;
			}
		},
		async setDeleteTransport(transport) {
			try {
				if (!(await useApi()("/transport/list/delete", {
					method: "PUT",
					body: transport
				})).status) return false;
				await this.setTransportList();
				return true;
			} catch (err) {
				console.error("setDeleteTransport basarisiz:", err);
				return false;
			}
		}
	}
});

export { useTransportStore as u };
//# sourceMappingURL=transport-BGjKDFw3.mjs.map
