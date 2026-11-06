import { a as useAppToast } from '../virtual/entry.mjs';
import { u as useLegacyApi } from './useLegacyApi-B5zRc7ig.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { defineStore } from 'pinia';

//#region app/stores/selection.ts
var EMPTY_SUM_TOTAL = {
	miktar: 0,
	kutu: 0,
	kutuiciadet: 0,
	kasaadedi: 0
};
var useSelectionStore = defineStore("selection", {
	state: () => ({
		productionCrateSizeList: [],
		productionCrateSizeButtonStatus: false,
		productionProductsList: [],
		productsList: {},
		productList: [],
		productionTotal: {},
		productionSumTotal: { ...EMPTY_SUM_TOTAL },
		productionButtonStatus: false,
		productionCrateNo: null,
		productionMekmerButtonStatus: false,
		productionDisButtonStatus: false,
		productionDisMekmerButtonStatus: false,
		productionBulunamadiButtonStatus: false,
		filteredSelectionList: [],
		productionCrateOptions: [],
		productionCrateGroupReady: false
	}),
	getters: {
		getProductionCrateSizeList: (state) => state.productionCrateSizeList,
		getProductionCrateSizeButtonStatus: (state) => state.productionCrateSizeButtonStatus,
		getProductionProductsList: (state) => state.productionProductsList,
		getFilteredSelectionList: (state) => state.filteredSelectionList,
		getProductionTotal: (state) => state.productionTotal,
		getProductsList: (state) => state.productsList,
		getProductList: (state) => state.productList,
		getProductionSumTotal: (state) => state.productionSumTotal,
		getProductionButtonStatus: (state) => state.productionButtonStatus,
		getProductionCrateNo: (state) => state.productionCrateNo,
		getProductionCrateOptions: (state) => state.productionCrateOptions,
		getProductionCrateGroupReady: (state) => state.productionCrateGroupReady
	},
	actions: {
		async setSelectionProductionCrateSizeList() {
			const shared = useSharedStore();
			shared.beginLoading();
			try {
				const res = await useLegacyApi().get("/selection/production/cratesize");
				this.productionCrateSizeList = res.data.cratesize ?? [];
			} catch (err) {
				console.error("setSelectionProductionCrateSizeList basarisiz:", err);
			} finally {
				shared.endLoading();
			}
		},
		setSelectionProductionCrateSizeButtonStatus(status) {
			this.productionCrateSizeButtonStatus = status;
		},
		async setSelectionProductionCrateSizeSave(cratesize) {
			const toast = useAppToast();
			try {
				const res = await useLegacyApi().post("/selection/production/cratesize/save", cratesize);
				if (res.data.status) {
					this.productionCrateSizeList.push(res.data.cratesize);
					await this.setSelectionProductionCrateSizeList();
					toast.success("Başarıyla Kaydedildi.");
				} else toast.error("Kaydetme Başarısız.");
			} catch (err) {
				console.error("setSelectionProductionCrateSizeSave basarisiz:", err);
				toast.error("Kaydetme Başarısız.");
			}
		},
		async setSelectionProductionCrateSizeUpdate(cratesize) {
			const toast = useAppToast();
			try {
				if ((await useLegacyApi().put("/selection/production/cratesize/update", cratesize)).data.status) {
					const i = this.productionCrateSizeList.findIndex((x) => x.Id === cratesize.Id);
					if (i > -1) this.productionCrateSizeList[i] = cratesize;
					await this.setSelectionProductionCrateSizeList();
					toast.success("Başarıyla Güncellendi.");
				} else toast.error("Güncelleme Başarısız.");
			} catch (err) {
				console.error("setSelectionProductionCrateSizeUpdate basarisiz:", err);
				toast.error("Güncelleme Başarısız.");
			}
		},
		async setSelectionProductionCrateSizeDelete(id) {
			const toast = useAppToast();
			try {
				const res = await useLegacyApi().delete(`/selection/production/cratesize/delete/${id}`);
				if (res.data.status) {
					const i = this.productionCrateSizeList.findIndex((x) => x.Id === res.data.id);
					if (i > -1) this.productionCrateSizeList.splice(i, 1);
					await this.setSelectionProductionCrateSizeList();
					toast.success("Başarıyla Silindi.");
				} else toast.error("Silme Başarısız.");
			} catch (err) {
				console.error("setSelectionProductionCrateSizeDelete basarisiz:", err);
				toast.error("Silme Başarısız.");
			}
		},
		setSelectionProductionProductDelete(id) {
			const index = this.productionProductsList.findIndex((x) => x.ID === id);
			if (index < 0) {
				console.warn("setSelectionProductionProductDelete: urun listede yok, liste degistirilmedi. ID:", id);
				return;
			}
			this.productionProductsList.splice(index, 1);
		},
		MUT_setSelectionProductTotalList(payload) {
			const rows = payload ?? [];
			const sum = { ...EMPTY_SUM_TOTAL };
			rows.forEach((x) => {
				sum.miktar += Number(x.Miktar) || 0;
				sum.kutu += Number(x.KutuAdet) || 0;
				sum.kutuiciadet += Number(x.Adet) || 0;
			});
			sum.kasaadedi = rows.length;
			this.productionSumTotal = sum;
		},
		MUT_setSelectionProductionCrateNo(no) {
			this.productionCrateNo = no;
		},
		setSelectionProductFilteredList(payload) {
			this.filteredSelectionList = payload;
		},
		async setSelectionProductsList() {
			const shared = useSharedStore();
			shared.beginLoading();
			try {
				const res = await useLegacyApi().get("/selection/production/list");
				if (res.data) {
					this.productsList = res.data.data ?? {};
					const mekmer = res.data.data?.mekmerList ?? [];
					this.productList = mekmer;
					this.MUT_setSelectionProductTotalList(mekmer);
				}
			} catch (err) {
				console.error("setSelectionProductsList basarisiz:", err);
			} finally {
				shared.endLoading();
			}
		},
		async setSelectionProductionCrateOptions() {
			try {
				const res = await useLegacyApi().get("/selection/production/crate/options");
				this.productionCrateOptions = res.data.list || [];
				this.productionCrateGroupReady = !!res.data.hazir;
			} catch (err) {
				console.error("crate/options cekilemedi:", err);
				this.productionCrateOptions = [];
				this.productionCrateGroupReady = false;
			}
		},
		async setSelectionProductionTotal() {
			try {
				const res = await useLegacyApi().get("/selection/production/total");
				this.productionTotal = res.data.data ?? {};
			} catch (err) {
				console.error("setSelectionProductionTotal basarisiz:", err);
			}
		},
		applyProductFilter(key) {
			const rows = this.productsList?.[key] ?? [];
			this.productList = rows;
			this.MUT_setSelectionProductTotalList(rows);
		},
		setSelectionProductionMekmerButton() {
			this.applyProductFilter("mekmerList");
		},
		setSelectionProductionDisButton() {
			this.applyProductFilter("disList");
		},
		setSelectionProductionMekmerDisButton() {
			this.applyProductFilter("mekmerDisList");
		},
		setSelectionProductionBulunamadiButton() {
			this.applyProductFilter("bulunamadiList");
		},
		setActiveFilterFlag(active) {
			this.productionMekmerButtonStatus = active === "mekmer";
			this.productionDisButtonStatus = active === "dis";
			this.productionDisMekmerButtonStatus = active === "mekmerDis";
			this.productionBulunamadiButtonStatus = active === "bulunamadi";
		},
		setSelectionProductionMekmerButtonStatus() {
			this.setActiveFilterFlag("mekmer");
		},
		setSelectionProductionDisButtonStatus() {
			this.setActiveFilterFlag("dis");
		},
		setSelectionProductionMekmerDisButtonStatus() {
			this.setActiveFilterFlag("mekmerDis");
		},
		setSelectionProductionBulunamadiButtonStatus() {
			this.setActiveFilterFlag("bulunamadi");
		},
		setSelectionProductionButtonStatus(status) {
			this.productionButtonStatus = status;
		},
		async setSelectionProductionProductsList(po) {
			try {
				const res = await useLegacyApi().get(`/order/products/${po}`);
				this.productionProductsList = res.data.products ?? [];
			} catch (err) {
				console.error("setSelectionProductionProductsList basarisiz:", err);
			}
		},
		async setSelectionProductionCrateNoIn() {
			try {
				const res = await useLegacyApi().get("/selection/production/crateno/in");
				this.productionCrateNo = res.data.no;
			} catch (err) {
				console.error("setSelectionProductionCrateNoIn basarisiz:", err);
			}
		},
		async setSelectionProductionCrateNoOut() {
			try {
				const res = await useLegacyApi().get("/selection/production/crateno/out");
				this.productionCrateNo = res.data.no;
			} catch (err) {
				console.error("setSelectionProductionCrateNoOut basarisiz:", err);
			}
		},
		async setSelectionProductionSave(product) {
			const toast = useAppToast();
			try {
				if ((await useLegacyApi().post("/selection/production/save", product)).data.status) {
					await this.setSelectionProductionUpdateList();
					toast.success("Başarıyla Kaydedildi.");
				}
			} catch (err) {
				console.error("setSelectionProductionSave basarisiz:", err);
			}
		},
		async setSelectionProductionUpdate(product) {
			const toast = useAppToast();
			try {
				if ((await useLegacyApi().put("/selection/production/update", product)).data.status) {
					await this.setSelectionProductionUpdateList();
					toast.success("Başarıyla Güncellendi.");
				} else toast.error("Güncelleme Başarısız.");
			} catch (err) {
				console.error("setSelectionProductionUpdate basarisiz:", err);
				toast.error("Güncelleme Başarısız.");
			}
		},
		async setSelectionProductionDelete(crateno) {
			const toast = useAppToast();
			try {
				if ((await useLegacyApi().delete(`/selection/production/delete/${crateno}`)).data.status) {
					await this.setSelectionProductionUpdateList();
					toast.success("Başarıyla Silindi.");
				} else toast.error("Silme Başarısız.");
			} catch (err) {
				console.error("setSelectionProductionDelete basarisiz:", err);
				toast.error("Silme Başarısız.");
			}
		},
		async setSelectionProductionUpdateList() {
			try {
				const res = await useLegacyApi().get("/selection/production/list");
				this.productsList = res.data.data ?? {};
				if (this.productionMekmerButtonStatus) this.setSelectionProductionMekmerButton();
				else if (this.productionDisButtonStatus) this.setSelectionProductionDisButton();
				else if (this.productionDisMekmerButtonStatus) this.setSelectionProductionMekmerDisButton();
				else if (this.productionBulunamadiButtonStatus) this.setSelectionProductionBulunamadiButton();
			} catch (err) {
				console.error("setSelectionProductionUpdateList basarisiz:", err);
			}
		}
	}
});

export { useSelectionStore as u };
//# sourceMappingURL=selection-DbHVNc2X.mjs.map
