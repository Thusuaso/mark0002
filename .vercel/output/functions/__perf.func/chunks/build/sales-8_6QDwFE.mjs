import { a as useAppToast } from '../virtual/entry.mjs';
import { u as useApi } from './useApi-CGFzrxZs.mjs';
import { u as useModelsStore } from './models-CeLtEMS4.mjs';
import { defineStore } from 'pinia';

//#region app/stores/sales.ts
var useSalesStore = defineStore("sales", {
	state: () => ({
		followList: [],
		followDetail: [],
		followDetailData: {},
		followDetailNewButton: false,
		salesPointsOfConsiderList: [],
		salesPointsOfConsiderButtonStatus: false
	}),
	getters: {
		getFollowList: (state) => state.followList,
		getFollowDetail: (state) => state.followDetail,
		getFollowDetailData: (state) => state.followDetailData,
		getFollowDetailNewButton: (state) => state.followDetailNewButton,
		getSalesPointsOfConsiderList: (state) => state.salesPointsOfConsiderList,
		getSalesPointsOfConsiderButtonStatus: (state) => state.salesPointsOfConsiderButtonStatus
	},
	actions: {
		async setFollowList() {
			try {
				const res = await useApi()("/sales/follow");
				this.followList = res?.data ?? [];
			} catch (err) {
				console.error("setFollowList basarisiz:", err);
				this.followList = [];
			}
		},
		async setFollowDetail(customer) {
			try {
				const res = await useApi()(`/sales/follow/detail/${customer}`);
				this.followDetail = res?.data ?? [];
			} catch (err) {
				console.error("setFollowDetail basarisiz:", err);
				this.followDetail = [];
			}
		},
		setFollowDetailData(detailData) {
			this.followDetailData = detailData;
		},
		setFollowDetailNewButton(newButton) {
			this.followDetailNewButton = newButton;
		},
		async setFollowDetailSave(saveData) {
			const toast = useAppToast();
			try {
				const res = await useApi()("/sales/follow/detail/save", {
					method: "POST",
					body: saveData
				});
				if (res.status) {
					this.followDetail.push(res.data);
					toast.success("Başarıyla Kaydedildi.");
				} else toast.error("Kaydetme Başarısız");
			} catch (err) {
				console.error("setFollowDetailSave basarisiz:", err);
				toast.error("Kaydetme Başarısız");
			}
		},
		async setFollowDetailUpdate(updateData) {
			const toast = useAppToast();
			try {
				const res = await useApi()("/sales/follow/detail/update", {
					method: "PUT",
					body: updateData
				});
				if (res.status) {
					const index = this.followDetail.findIndex((x) => x.ID == res.data.ID);
					if (index > -1) this.followDetail.splice(index, 1, res.data);
					else console.warn("setFollowDetailUpdate: guncellenen kayit listede yok, liste degistirilmedi. ID:", res.data?.ID);
					toast.success("Başarıyla Güncellendi.");
				} else toast.error("Güncelleme Başarısız");
			} catch (err) {
				console.error("setFollowDetailUpdate basarisiz:", err);
				toast.error("Güncelleme Başarısız");
			}
		},
		async setFollowDetailDelete(id) {
			const toast = useAppToast();
			try {
				if ((await useApi()(`/sales/follow/detail/delete/${id}`, { method: "DELETE" })).status) {
					const index = this.followDetail.findIndex((x) => x.ID == id);
					if (index > -1) this.followDetail.splice(index, 1);
					else console.warn("setFollowDetailDelete: silinen kayit listede yok, liste degistirilmedi. ID:", id);
					toast.success("Silme Başarılı");
				} else toast.error("Silme Başarısız");
			} catch (err) {
				console.error("setFollowDetailDelete basarisiz:", err);
				toast.error("Silme Başarısız");
			}
		},
		async setSalesPointsOfConsiderList() {
			try {
				const res = await useApi()("/sales/points/of/consider/list");
				this.salesPointsOfConsiderList = res?.list ?? [];
			} catch (err) {
				console.error("setSalesPointsOfConsiderList basarisiz:", err);
				this.salesPointsOfConsiderList = [];
			}
		},
		setSalesPointsOfConsiderButtonStatus(status) {
			this.salesPointsOfConsiderButtonStatus = status;
		},
		async setSalesPointsOfConsiderSave(data) {
			const toast = useAppToast();
			try {
				if ((await useApi()("/sales/points/of/consider/save", {
					method: "POST",
					body: data
				})).status) {
					toast.success("Kayıt Başarılı");
					await this.setSalesPointsOfConsiderList();
					useModelsStore().setSalesPointsOfConsiderModel();
				} else toast.error("Kayıt Başarısız");
			} catch (err) {
				console.error("setSalesPointsOfConsiderSave basarisiz:", err);
				toast.error("Kayıt Başarısız");
			}
		},
		async setSalesPointsOfConsiderUpdate(data) {
			const toast = useAppToast();
			try {
				if ((await useApi()("/sales/points/of/consider/update", {
					method: "PUT",
					body: data
				})).status) {
					toast.success("Kayıt Başarılı");
					await this.setSalesPointsOfConsiderList();
				} else toast.error("Kayıt Başarısız");
			} catch (err) {
				console.error("setSalesPointsOfConsiderUpdate basarisiz:", err);
				toast.error("Kayıt Başarısız");
			}
		},
		async setSalesPointsOfConsiderDelete(id) {
			const toast = useAppToast();
			try {
				if ((await useApi()(`/sales/points/of/consider/delete/${id}`, { method: "DELETE" })).status) {
					toast.success("Başarıyla Silindi.");
					await this.setSalesPointsOfConsiderList();
				} else toast.error("Silme Başarısız.");
			} catch (err) {
				console.error("setSalesPointsOfConsiderDelete basarisiz:", err);
				toast.error("Silme Başarısız.");
			}
		}
	}
});

export { useSalesStore as u };
//# sourceMappingURL=sales-8_6QDwFE.mjs.map
