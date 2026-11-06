import { a as useAppToast } from '../virtual/entry.mjs';
import { u as useLegacyApi } from './useLegacyApi-B5zRc7ig.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { defineStore } from 'pinia';

//#region app/stores/sample.ts
var useSampleStore = defineStore("sample", {
	state: () => ({
		sampleList: [],
		sampleYearList: [],
		samplePaidList: [],
		sampleButtonStatus: false,
		sampleFinanceList: [],
		sampleFinanceListTotal: {
			"getUsd": 0,
			"setUsd": 0,
			"getEuro": 0,
			"setEuro": 0,
			"getTl": 0,
			"setTl": 0,
			"bank": 0
		},
		sampleFinanceBankList: [],
		sampleFinanceDetailList: []
	}),
	getters: {
		getSampleList: (state) => state.sampleList,
		getSampleYearList: (state) => state.sampleYearList,
		getSamplePaidList: (state) => state.samplePaidList,
		getSampleButtonStatus: (state) => state.sampleButtonStatus,
		getSampleFinanceList: (state) => state.sampleFinanceList,
		getSampleFinanceListTotal: (state) => state.sampleFinanceListTotal,
		getSampleFinanceBankList: (state) => state.sampleFinanceBankList,
		getSampleFinanceDetailList: (state) => state.sampleFinanceDetailList
	},
	actions: {
		setSampleList() {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get("/sample/list").then((response) => {
				this.MUT_setSampleList(response.data);
				sharedStore.endLoading();
			}).catch((err) => {
				console.error("setSampleList basarisiz:", err);
				sharedStore.endLoading();
			});
		},
		setSampleListYear(year) {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get(`/sample/list/${year}`).then((response) => {
				this.MUT_setSampleList(response.data);
				sharedStore.endLoading();
			}).catch((err) => {
				console.error("setSampleListYear basarisiz:", err);
				sharedStore.endLoading();
			});
		},
		setSamplePaidSave(payload) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.post("/sample/paid/save", payload).then((response) => {
				if (response.data.status) {
					this.setSampleDetailPaidList(payload.NumuneNo);
					toast.success("Başarıyla Kaydedildi.");
				} else toast.error("Kaydetme Başarısız");
			});
		},
		setSamplePhotosFront(payload) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.post("/sample/photos/front", payload).then((response) => {
				if (response.data.status) toast.success("Başarıyla Kaydedildi.");
				else toast.error("Kaydetme Başarısız");
			});
		},
		setSamplePhotosBack(payload) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.post("/sample/photos/back", payload).then((response) => {
				if (response.data.status) toast.success("Başarıyla Kaydedildi.");
				else toast.error("Kaydetme Başarısız");
			});
		},
		setSampleButtonStatus(payload) {
			this.MUT_setSampleButtonStatus(payload);
		},
		setSampleSave(payload) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const sharedStore = useSharedStore();
			legacyApi.post("/sample/save", payload).then((response) => {
				if (response.data.status) {
					this.setSampleList();
					sharedStore.setCustomersOfferList();
					toast.success("Başarıyla Kaydedildi.");
				} else toast.error("Kaydetme Başarısız");
			});
		},
		setSampleDelete(payload) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.delete(`/sample/delete/${payload.id}/${payload.po}`).then((response) => {
				if (response.data.status) {
					this.setSampleList();
					toast.success("Başarıyla Silindi.");
				} else toast.error("Silme Başarısız");
			});
		},
		setSampleUpdate(payload) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const sharedStore = useSharedStore();
			legacyApi.put("/sample/update", payload).then((response) => {
				if (response.data.status) {
					this.setSampleList();
					sharedStore.setCustomersOfferList();
					toast.success("Başarıyla Güncellendi.");
				} else toast.error("Güncelleme Başarısız");
			});
		},
		setSampleDetailPaidList(payload) {
			useLegacyApi().get(`/sample/detail/paid/list/${payload}`).then((response) => {
				this.MUT_setSampleDetailPaidList(response.data.list);
			});
		},
		setSampleFinanceList() {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get("/sample/finance/list").then((response) => {
				this.MUT_setSampleFinanceList(response.data);
				this.setSampleFinanceListTotal(response.data);
				sharedStore.endLoading();
			}).catch((err) => {
				console.error("setSampleFinanceList basarisiz:", err);
				sharedStore.endLoading();
			});
		},
		setSampleFinanceListYear(year) {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get(`/sample/finance/list/${year}`).then((response) => {
				this.MUT_setSampleFinanceList(response.data);
				this.setSampleFinanceListTotal(response.data);
				sharedStore.endLoading();
			}).catch((err) => {
				console.error("setSampleFinanceListYear basarisiz:", err);
				sharedStore.endLoading();
			});
		},
		setSampleFinanceListTotal(payload) {
			this.MUT_setSampleFinanceListTotal(payload);
		},
		setSampleFinanceDetailList(payload) {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get(`/sample/finance/detail/list/${payload.year}/${payload.customer}`).then((response) => {
				this.MUT_setSampleFinanceDetailList(response.data.list);
				sharedStore.endLoading();
			}).catch((err) => {
				console.error("setSampleFinanceDetailList basarisiz:", err);
				sharedStore.endLoading();
			});
		},
		MUT_setSampleList(payload) {
			this.sampleList = payload.list;
			this.sampleYearList = payload.years;
		},
		MUT_setSampleButtonStatus(payload) {
			this.sampleButtonStatus = payload;
		},
		MUT_setSampleDetailPaidList(payload) {
			this.samplePaidList = payload;
		},
		MUT_setSampleFinanceList(payload) {
			this.sampleFinanceList = payload.list;
			this.sampleYearList = payload.years;
			this.sampleFinanceBankList = payload.bank;
		},
		MUT_setSampleFinanceListTotal(payload) {
			this.sampleFinanceListTotal = {
				"getUsd": 0,
				"setUsd": 0,
				"getEuro": 0,
				"setEuro": 0,
				"getTl": 0,
				"setTl": 0,
				"bank": 0
			};
			payload.list.forEach((x) => {
				this.sampleFinanceListTotal.getUsd += x.AlisUsd;
				this.sampleFinanceListTotal.setUsd += x.SatisUsd;
				this.sampleFinanceListTotal.getEuro += x.AlisEuro;
				this.sampleFinanceListTotal.setEuro += x.SatisEuro;
				this.sampleFinanceListTotal.getTl += x.AlisTl;
				this.sampleFinanceListTotal.setTl += x.SatisTl;
			});
			payload.bank.forEach((x) => {
				this.sampleFinanceListTotal.bank += x.Tutar;
			});
		},
		MUT_setSampleFinanceDetailList(payload) {
			this.sampleFinanceDetailList = payload;
		}
	}
});

export { useSampleStore as u };
//# sourceMappingURL=sample-BxPJhB-c.mjs.map
