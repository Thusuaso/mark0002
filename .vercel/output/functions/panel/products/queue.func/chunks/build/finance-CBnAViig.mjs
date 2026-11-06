import { $ as $fetch$2, a as useAppToast } from '../virtual/entry.mjs';
import { u as useLegacyApi } from './useLegacyApi-B5zRc7ig.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { u as useModelsStore } from './models-CeLtEMS4.mjs';
import { defineStore } from 'pinia';

//#region app/stores/finance.ts
var useFinanceStore = defineStore("finance", {
	state: () => ({
		financeExpiryListTotal: 0,
		financeDetailInsuranceList: [],
		financeList: [],
		financeListAll: [],
		financeListTotal: {
			total: 0,
			production: 0,
			forwarding: 0,
			advanced: 0,
			paid: 0,
			balance: 0,
			balanceProduction: 0
		},
		financeExpiryList: [],
		financeCollectionList: [],
		financeCollectionYearList: [],
		financeCollectionMonthList: [],
		financeCollectionTotal: 0,
		financeAdvancedPaymentList: [],
		financePoList: [],
		financePaidList: [],
		financePoListTotal: {
			order: 0,
			advancedPayment: 0,
			paid: 0,
			balanced: 0
		},
		financeTotalListMekmer: {
			order: 0,
			shipped: 0,
			produced: 0,
			paid: 0,
			balanced: 0,
			balancedExceptProduction: 0
		},
		financePaidListTotal: 0,
		financePoButtonStatus: true,
		financePoPaidList: [],
		financePoPaidDetailList: [],
		financeListMaya: [],
		financeCollectionSampleList: [],
		financeCollectionSampleTotal: 0,
		financePoPaidListMekmer: [],
		financeListFilter: [],
		financePurchaseList: [],
		financePurchaseDetailList: []
	}),
	getters: {
		getFinanceExpiryListTotal: (state) => state.financeExpiryListTotal,
		getFinanceDetailInsuranceList: (state) => state.financeDetailInsuranceList,
		getFinanceTotalListMekmer: (state) => state.financeTotalListMekmer,
		getFinanceListFilter: (state) => state.financeListFilter,
		getfinanceList: (state) => state.financeList,
		getFinanceListAll: (state) => state.financeListAll,
		getFinanceListTotal: (state) => state.financeListTotal,
		getFinanceExpiryList: (state) => state.financeExpiryList,
		getFinanceCollectionList: (state) => state.financeCollectionList,
		getFinanceCollectionYearList: (state) => state.financeCollectionYearList,
		getFinanceCollectionMonthList: (state) => state.financeCollectionMonthList,
		getFinanceCollectionTotal: (state) => state.financeCollectionTotal,
		getFinanceAdvancedPaymentList: (state) => state.financeAdvancedPaymentList,
		getFinancePoList: (state) => state.financePoList,
		getFinancePaidList: (state) => state.financePaidList,
		getFinancePoListTotal: (state) => state.financePoListTotal,
		getFinancePaidListTotal: (state) => state.financePaidListTotal,
		getFinancePoButtonStatus: (state) => state.financePoButtonStatus,
		getFinancePoPaidList: (state) => state.financePoPaidList,
		getFinancePoPaidDetailList: (state) => state.financePoPaidDetailList,
		getFinanceListMaya: (state) => state.financeListMaya,
		getFinanceCollectionSampleList: (state) => state.financeCollectionSampleList,
		getFinanceCollectionSampleTotal: (state) => state.financeCollectionSampleTotal,
		getFinancePoPaidListMekmer: (state) => state.financePoPaidListMekmer,
		getFinancePurchaseMainList: (state) => state.financePurchaseList,
		getFinancePurchaseDetailList: (state) => state.financePurchaseDetailList
	},
	actions: {
		setFinanceAllListMekmer() {
			return $fetch$2("/finance-api/reports/mekmer-all", { baseURL: "/" }).then((data) => {
				this.MUT_setFinanceListFilter(data.financeList);
				this.MUT_setFinanceTotalList(data.financeList);
				return true;
			}).catch((err) => {
				console.error("mekmer tum finans listesi alinamadi:", err);
				useAppToast().error("Finans listesi alınamadı.");
				return false;
			});
		},
		setFinanceList() {
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			$fetch$2("/finance-api/reports/test", { baseURL: "/" }).then((data) => {
				this.MUT_setFinanceList(data);
				this.MUT_setFinanceTotalList(data.financeList);
			}).catch((err) => {
				console.error("finans listesi alinamadi:", err);
				useAppToast().error("Finans listesi alınamadı.");
			}).finally(() => {
				sharedStore.endLoading();
			});
		},
		setFinanceListFilter() {
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			$fetch$2("/finance-api/reports/test-filter", { baseURL: "/" }).then((data) => {
				this.MUT_setFinanceListFilter(data.financeList);
				this.MUT_setFinanceTotalListMekmer(data.financeList);
			}).catch((err) => {
				console.error("finans filtre listesi alinamadi:", err);
				useAppToast().error("Finans listesi alınamadı.");
			}).finally(() => {
				sharedStore.endLoading();
			});
		},
		setFinanceTotalList(finance) {
			this.MUT_setFinanceTotalList(finance);
		},
		setFinanceTotalListMekmer(finance) {
			this.MUT_setFinanceTotalListMekmer(finance);
		},
		setFinanceCollectionList() {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get("/finance/collection/list").then((response) => {
				this.MUT_setFinanceCollectionList(response.data);
				this.setFinanceCollectionTotal(response.data.list);
				this.MUT_setFinanceCollectionSampleTotal(response.data.sample);
				sharedStore.endLoading();
			}).catch((err) => {
				console.error("setFinanceCollectionList basarisiz:", err);
				sharedStore.endLoading();
			});
		},
		setFinanceCollectionListMekmer() {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get("/finance/collection/list/mekmer").then((response) => {
				this.MUT_setFinanceCollectionList(response.data);
				this.setFinanceCollectionTotal(response.data.list);
				this.MUT_setFinanceCollectionSampleTotal(response.data.sample);
				sharedStore.endLoading();
			}).catch((err) => {
				console.error("setFinanceCollectionListMekmer basarisiz:", err);
				sharedStore.endLoading();
			});
		},
		setFinanceCollectionListMekmerYear(year) {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get(`/finance/collection/list/mekmer/year/${year}`).then((response) => {
				this.MUT_setFinanceCollectionListMekmerYear(response.data);
				this.setFinanceCollectionTotal(response.data.list);
				this.MUT_setFinanceCollectionSampleTotal(response.data.sample);
				sharedStore.endLoading();
			}).catch((err) => {
				console.error("setFinanceCollectionListMekmerYear basarisiz:", err);
				sharedStore.endLoading();
			});
		},
		setFinanceCollectionListMekmerMonth(data) {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get(`/finance/collection/list/mekmer/month/${data.year}/${data.month}`).then((response) => {
				this.MUT_setFinanceCollectionListMekmerMonth(response.data);
				this.setFinanceCollectionTotal(response.data.list);
				this.MUT_setFinanceCollectionSampleTotal(response.data.sample);
				sharedStore.endLoading();
			}).catch((err) => {
				console.error("setFinanceCollectionListMekmerMonth basarisiz:", err);
				sharedStore.endLoading();
			});
		},
		setFinanceCollectionTotal(payload) {
			this.MUT_setFinanceCollectionTotal(payload);
		},
		setFinanceCollectionListYear(year) {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get(`/finance/collection/list/year/${year}`).then((response) => {
				this.MUT_setFinanceCollectionListYear(response.data);
				this.setFinanceCollectionTotal(response.data.list);
				this.MUT_setFinanceCollectionSampleTotal(response.data.sample);
				sharedStore.endLoading();
			}).catch((err) => {
				console.error("setFinanceCollectionListYear basarisiz:", err);
				sharedStore.endLoading();
			});
		},
		setFinanceCollectionListMonth(finance) {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get(`/finance/collection/list/month/${finance.month}/${finance.year}`).then((response) => {
				this.MUT_setFinanceCollectionListMonth(response.data.list);
				this.setFinanceCollectionTotal(response.data.list);
				sharedStore.endLoading();
			}).catch((err) => {
				console.error("setFinanceCollectionListMonth basarisiz:", err);
				sharedStore.endLoading();
			});
		},
		setFinanceAdvancedPaymentList() {
			useLegacyApi().get("/finance/advanced/payment/list").then((response) => {
				this.MUT_setFinanceAdvancedPaymentList(response.data.list);
			});
		},
		setFinanceAdvancedPaymentListMekmer() {
			useLegacyApi().get("/finance/advanced/payment/list/mekmer").then((response) => {
				this.MUT_setFinanceAdvancedPaymentList(response.data.list);
			});
		},
		setAdvancedPaymentSave(advancedPayment) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.post("/finance/advanced/payment/save", advancedPayment).then((response) => {
				if (response.data.status) {
					toast.success("Peşinat Başarıyla Kaydedildi.");
					this.setAdvancedPaymentSendMail({
						...advancedPayment,
						Mail: "bilgiislem@mekmar.com"
					});
					this.setAdvancedPaymentSendMail({
						...advancedPayment,
						Mail: "huseyin@mekmer.com"
					});
					this.setAdvancedPaymentSendMail({
						...advancedPayment,
						Mail: "info@mekmar.com"
					});
					this.setAdvancedPaymentSendMail({
						...advancedPayment,
						Mail: "mehmet@mekmer.com"
					});
					this.setFinancePoPaidList(paid.SiparisNo);
					this.setFinanceList();
					this.setFinancePoList(paid.MusteriID);
					this.setFinanceAdvancedPaymentList();
				} else toast.error("Peşinat Kaydetme Başarısız.");
			});
		},
		setAdvancedPaymentSaveMekmer(advancedPayment) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.post("/finance/advanced/payment/save/mekmer", advancedPayment).then((response) => {
				if (response.data.status) {
					toast.success("Peşinat Başarıyla Kaydedildi.");
					this.setAdvancedPaymentSendMail({
						...advancedPayment,
						Mail: "bilgiislem@mekmar.com"
					});
					this.setAdvancedPaymentSendMail({
						...advancedPayment,
						Mail: "huseyin@mekmer.com"
					});
					this.setFinancePoPaidList(paid.SiparisNo);
					this.setFinanceList();
					this.setFinancePoList(paid.MusteriID);
					this.setFinanceAdvancedPaymentListMekmer();
				} else toast.error("Peşinat Kaydetme Başarısız.");
			});
		},
		setAdvancedPaymentSendMail(advancedPayment) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.post("/mail/advanced/payment/server", advancedPayment).then((response) => {
				if (response.data.status) toast.success("Mail Başarıyla Gönderildi.");
				else toast.error("Mail Gönderme Başarısız.");
			});
		},
		setFinancePoList(customerId) {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get(`/finance/po/list/${customerId}`).then((response) => {
				this.MUT_setFinancePoList(response.data);
				this.setFinancePoListTotal(response.data.poList);
				this.setFinancePaidListTotal(response.data.paidList);
				sharedStore.endLoading();
			});
		},
		setFinancePoListMekmer(customerId) {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get(`/finance/po/list/${customerId}`).then((response) => {
				this.MUT_setFinancePoListMekmer(response.data);
				this.setFinancePoListTotal(response.data.poList);
				this.setFinancePaidListTotal(response.data.paidList);
				sharedStore.endLoading();
			});
		},
		setFinancePoMekmerList(customerId) {
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			$fetch$2(`/finance-api/mekmer/customer-orders/${customerId}`, { baseURL: "/" }).then((data) => {
				this.MUT_setFinancePoListMekmer(data);
				this.MUT_setFinancePoPaidList(data.odeme_liste);
				this.setFinancePoListTotalMekmer(data.ayrinti_list);
				this.setFinancePaidListTotalMekmer(data.odeme_liste);
			}).catch((err) => {
				console.error("musteri PO listesi alinamadi:", err);
				useAppToast().error("Müşteri sipariş listesi alınamadı.");
			}).finally(() => {
				sharedStore.endLoading();
			});
		},
		setFinancePoListTotal(payload) {
			this.MUT_setFinancePoListTotal(payload);
		},
		setFinancePoListTotalMekmer(payload) {
			this.MUT_setFinancePoListTotalMekmer(payload);
		},
		setFinancePaidListTotal(payload) {
			this.MUT_setFinancePaidListTotal(payload);
		},
		setFinancePaidListTotalMekmer(payload) {
			this.MUT_setFinancePaidListTotalMekmer(payload);
		},
		setFinancePoButtonStatus(payload) {
			this.MUT_setFinancePoButtonStatus(payload);
		},
		setPoPaidSave(paid) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const modelsStore = useModelsStore();
			legacyApi.post("/finance/po/paid/save", paid).then((response) => {
				if (response.data.status) {
					toast.success("Ödeme Kaydedildi.");
					this.setPoPaidSaveSendMail({
						...paid,
						Mail: "bilgiislem@mekmar.com"
					});
					this.setPoPaidSaveSendMail({
						...paid,
						Mail: "huseyin@mekmer.com"
					});
					this.setPoPaidSaveSendMail({
						...paid,
						Mail: "info@mekmar.com"
					});
					this.setPoPaidSaveSendMail({
						...paid,
						Mail: "mehmet@mekmer.com"
					});
					this.setPoPaidSaveSendMail({
						...paid,
						Mail: "export1@mekmar.com"
					});
					this.setPoPaidSaveSendMail({
						...paid,
						Mail: "export2@mekmar.com"
					});
					this.setFinancePoList(paid.MusteriID);
					this.setFinanceList();
					modelsStore.setFinancePoModel();
				} else toast.error("Ödeme Kaydedilemedi.");
			});
		},
		setPoPaidMekmerSave(paid) {
			const toast = useAppToast();
			const modelsStore = useModelsStore();
			$fetch$2("/finance-api/mekmer/po-paid-save", {
				baseURL: "/",
				method: "POST",
				body: paid
			}).then((response) => {
				if (response.status) {
					toast.success("Ödeme Kaydedildi.");
					this.setPoPaidSaveSendMailMekmer({
						...paid,
						Mail: "bilgiislem@mekmar.com"
					});
					this.setPoPaidSaveSendMailMekmer({
						...paid,
						Mail: "huseyin@mekmer.com"
					});
					this.setPoPaidSaveSendMailMekmer({
						...paid,
						Mail: "sergen@mekmer.com"
					});
					this.setFinancePoMekmerList(paid.musteri_id);
					this.setFinancePoPaidListMekmer(paid.siparisno);
					this.setFinanceListFilter();
					modelsStore.setFinancePoModelMekmer();
				} else toast.success("Ödeme Kaydedilemedi.");
			});
		},
		setPoPaidSaveSendMail(paid) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.post("/finance/po/paid/send/mail", paid).then((response) => {
				if (response.data.status) toast.success("Mail Başarıyla Gönderildi.");
				else toast.error("Mail Gönderme Başarısız.");
			});
		},
		setPoPaidSaveSendMailMekmer(paid) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.post("/finance/po/paid/send/mail/mekmer", paid).then((response) => {
				if (response.data.status) toast.success("Mail Başarıyla Gönderildi.");
				else toast.error("Mail Gönderme Başarısız.");
			});
		},
		setFinancePoPaidList(po) {
			useLegacyApi().get(`/finance/po/paid/list/${po}`).then((response) => {
				this.MUT_setFinancePoPaidList(response.data.list);
			}).catch((err) => {
				console.error("po odeme listesi alinamadi:", err);
				this.MUT_setFinancePoPaidList([]);
				useAppToast().error("Ödeme listesi alınamadı.");
			});
		},
		setFinancePoPaidListMekmer(po) {
			$fetch$2(`/finance-api/mekmer/po-payments/${encodeURIComponent(po)}`, { baseURL: "/" }).then(({ liste }) => {
				this.MUT_setFinancePoPaidListMekmer(liste);
			}).catch((err) => {
				console.error("PO odeme listesi alinamadi:", err);
				useAppToast().error("Ödeme listesi alınamadı.");
			});
		},
		setPoPaidDelete(paid) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const modelsStore = useModelsStore();
			legacyApi.delete(`/finance/po/paid/delete/${paid.ID}`).then((response) => {
				if (response.data.status) {
					toast.success("Tahsilat Başarıyla Silindi");
					this.setPoPaidDeleteSendMail({
						...paid,
						Mail: "bilgiislem@mekmar.com"
					});
					this.setPoPaidDeleteSendMail({
						...paid,
						Mail: "huseyin@mekmer.com"
					});
					this.setPoPaidDeleteSendMail({
						...paid,
						Mail: "info@mekmar.com"
					});
					this.setPoPaidDeleteSendMail({
						...paid,
						Mail: "mehmet@mekmer.com"
					});
					this.setPoPaidDeleteSendMail({
						...paid,
						Mail: "export1@mekmar.com"
					});
					this.setPoPaidDeleteSendMail({
						...paid,
						Mail: "export2@mekmar.com"
					});
					this.setFinancePoPaidList(paid.SiparisNo);
					this.setFinancePoList(paid.MusteriID);
					this.setFinanceList();
					modelsStore.setFinancePoModel();
				} else toast.error("Tahsilat Silme Başarısız.");
			});
		},
		setPoPaidDeleteMekmer(paid) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const modelsStore = useModelsStore();
			legacyApi.delete(`/finance/po/paid/delete/mekmer/${paid.id}`).then((response) => {
				if (response.data.status) {
					toast.success("Tahsilat Başarıyla Silindi");
					this.setPoPaidDeleteSendMailMekmer({
						...paid,
						Mail: "bilgiislem@mekmar.com"
					});
					this.setPoPaidDeleteSendMailMekmer({
						...paid,
						Mail: "huseyin@mekmer.com"
					});
					this.setPoPaidDeleteSendMailMekmer({
						...paid,
						Mail: "info@mekmar.com"
					});
					this.setFinancePoMekmerList(paid.musteri_id);
					this.setFinancePoPaidListMekmer(paid.siparisno);
					this.setFinanceListFilter();
					modelsStore.setFinancePoModelMekmer();
				} else toast.error("Tahsilat Silme Başarısız.");
			});
		},
		setPoPaidDeleteSendMail(paid) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.post("/finance/po/paid/delete/send/mail", paid).then((response) => {
				if (response.data.status) toast.success("Mail Başarıyla Gönderildi.");
				else toast.error("Mail Gönderme Başarısız.");
			});
		},
		setPoPaidDeleteSendMailMekmer(paid) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.post("/finance/po/paid/delete/send/mail/mekmer", paid).then((response) => {
				if (response.data.status) toast.success("Mail Başarıyla Gönderildi.");
				else toast.error("Mail Gönderme Başarısız.");
			});
		},
		setPoPaidUpdate(paid) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const modelsStore = useModelsStore();
			legacyApi.put("/finance/po/paid/update", paid).then((response) => {
				if (response.data.status) {
					toast.success("Tahsilat Başarıyla Güncellendi");
					this.setPoPaidUpdateSendMail({
						...paid,
						Mail: "bilgiislem@mekmar.com"
					});
					this.setPoPaidUpdateSendMail({
						...paid,
						Mail: "huseyin@mekmer.com"
					});
					this.setPoPaidUpdateSendMail({
						...paid,
						Mail: "info@mekmar.com"
					});
					this.setPoPaidUpdateSendMail({
						...paid,
						Mail: "mehmet@mekmer.com"
					});
					this.setPoPaidUpdateSendMail({
						...paid,
						Mail: "export1@mekmar.com"
					});
					this.setPoPaidUpdateSendMail({
						...paid,
						Mail: "export2@mekmar.com"
					});
					this.setFinancePoPaidList(paid.SiparisNo);
					this.setFinancePoList(paid.MusteriID);
					this.setFinanceList();
					modelsStore.setFinancePoModel();
				} else toast.error("Tahsilat Güncelleme Başarısız.");
			});
		},
		setPoPaidUpdateMekmer(paid) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const modelsStore = useModelsStore();
			legacyApi.put("/finance/po/paid/update/mekmer", paid).then((response) => {
				if (response.data.status) {
					toast.success("Tahsilat Başarıyla Güncellendi");
					this.setPoPaidUpdateSendMailMekmer({
						...paid,
						Mail: "bilgiislem@mekmar.com"
					});
					this.setPoPaidUpdateSendMailMekmer({
						...paid,
						Mail: "huseyin@mekmer.com"
					});
					this.setPoPaidUpdateSendMailMekmer({
						...paid,
						Mail: "sergen@mekmer.com"
					});
					this.setFinancePoMekmerList(paid.musteri_id);
					this.setFinancePoPaidListMekmer(paid.siparisno);
					this.setFinanceListFilter();
					modelsStore.setFinancePoModelMekmer();
				} else toast.error("Tahsilat Güncelleme Başarısız.");
			});
		},
		setPoPaidUpdateSendMail(paid) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.post("/finance/po/paid/update/send/mail", paid).then((response) => {
				if (response.data.status) toast.success("Mail Başarıyla Gönderildi.");
				else toast.error("Mail Gönderme Başarısız.");
			});
		},
		setPoPaidUpdateSendMailMekmer(paid) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.post("/finance/po/paid/update/send/mail/mekmer", paid).then((response) => {
				if (response.data.status) toast.success("Mail Başarıyla Gönderildi.");
				else toast.error("Mail Gönderme Başarısız.");
			});
		},
		setPoPaidDetailList(value) {
			useLegacyApi().get(`/finance/po/paid/detail/list/${value.Tarih}/${value.MusteriID}`).then((response) => {
				this.MUT_setPoPaidDetailList(response.data.list);
			});
		},
		setFinanceCost(payload) {
			useLegacyApi().post("/finance/cost/control", payload).then((res) => {});
		},
		setFinancePurchaseMainList() {
			useLegacyApi().get("/finance/purchase/main/list").then((res) => {
				console.log("/finance/purchase/main/list", res);
				this.MUT_setFinancePurchaseMainList(res.data.list);
			});
		},
		setFinancePurchaseDetail(payload) {
			useLegacyApi().get(`/finance/purchase/detail/list/${payload.po}/${payload.supplier}`).then((response) => {
				console.log("response => ", response);
				this.MUT_setFinancePurchaseDetail(response.data.list);
			});
		},
		MUT_setFinanceTotalListMekmer(payload) {
			let order = 0;
			let shipped = 0;
			let produced = 0;
			let paid = 0;
			let balanced = 0;
			let balancedExceptProduction = 0;
			payload.forEach((x) => {
				order += x.total_order_amount;
				shipped += x.forwarding;
				produced += x.production;
				paid += x.paid;
				balanced += x.total;
				balancedExceptProduction += x.totalExceptProduction;
			});
			this.financeTotalListMekmer = {
				order,
				shipped,
				produced,
				paid,
				balanced,
				balancedExceptProduction
			};
		},
		MUT_setFinanceAllListMekmer(payload) {
			this.financeListFilter = payload;
		},
		MUT_setFinanceListFilter(payload) {
			this.financeListFilter = payload;
		},
		MUT_setFinancePoPaidListMekmer(payload) {
			this.financePoPaidListMekmer = payload;
		},
		MUT_setFinanceCollectionSampleTotal(payload) {
			let __total = 0;
			payload.forEach((x) => {
				__total += x.Tutar;
			});
			this.financeCollectionSampleTotal = __total;
		},
		MUT_setFinanceTotalList(payload) {
			let total = 0;
			let production = 0;
			let forwarding = 0;
			let advanced = 0;
			let paid = 0;
			let balance = 0;
			let balanceProduction = 0;
			payload.forEach((x) => {
				total += x.total_order_amount;
				production += x.production;
				forwarding += x.forwarding;
				advanced += x.advanced_payment;
				paid += x.paid;
				balanceProduction += x.production + x.forwarding - x.paid;
				balance += x.forwarding - x.paid;
			});
			this.financeListTotal = {
				total,
				production,
				forwarding,
				advanced,
				paid,
				balance,
				balanceProduction
			};
		},
		MUT_setFinanceList(payload) {
			this.financeList = [];
			this.financeListAll = [];
			this.financeListTotal = {
				total: 0,
				production: 0,
				forwarding: 0,
				advanced: 0,
				paid: 0,
				balance: 0,
				balanceProduction: 0
			};
			for (const item of payload.financeList) if (item.forwarding - item.paid == 0) continue;
			else if (item.forwarding - item.paid > 8 || item.forwarding - item.paid < -8) {
				item.balanced = item.forwarding - item.paid;
				this.financeList.push(item);
			}
			for (const item of payload.financeList) {
				item.balanced = item.forwarding - item.paid;
				this.financeListAll.push(item);
			}
			this.financeExpiryList = payload.vadeList;
			this.financeExpiryListTotal = 0;
			payload.vadeList.forEach((x) => {
				this.financeExpiryListTotal += x.tutar;
			});
			this.financeListMaya = payload.mayaList;
		},
		MUT_setFinanceCollectionList(payload) {
			this.financeCollectionList = payload.list;
			this.financeCollectionYearList = payload.years;
			this.financeCollectionMonthList = payload.months;
			this.financeCollectionSampleList = payload.sample;
		},
		MUT_setFinanceCollectionListMekmerYear(payload) {
			this.financeCollectionList = payload.list;
			this.financeCollectionMonthList = payload.months;
			this.financeCollectionSampleList = payload.sample;
		},
		MUT_setFinanceCollectionListMekmerMonth(payload) {
			this.financeCollectionList = payload.list;
			this.financeCollectionSampleList = payload.sample;
		},
		MUT_setFinanceCollectionTotal(payload) {
			let __total = 0;
			payload.forEach((x) => {
				__total += x.Tutar;
			});
			this.financeCollectionTotal = __total;
		},
		MUT_setFinanceCollectionListYear(payload) {
			this.financeCollectionList = payload.list;
			this.financeCollectionMonthList = payload.months;
			this.financeCollectionSampleList = payload.sample;
		},
		MUT_setFinanceCollectionListMonth(payload) {
			this.financeCollectionList = payload;
		},
		MUT_setFinanceAdvancedPaymentList(payload) {
			this.financeAdvancedPaymentList = payload;
		},
		MUT_setFinancePoList(payload) {
			this.financePoList = payload.poList;
			this.financePaidList = payload.paidList;
			this.financeDetailInsuranceList = payload.insuranceList;
		},
		MUT_setFinancePoListMekmer(payload) {
			this.financePoList = payload.ayrinti_list;
			this.financePaidList = payload.odeme_liste;
		},
		MUT_setFinancePoListTotal(payload) {
			let order = 0;
			let advancedPayment = 0;
			let paid = 0;
			let balanced = 0;
			payload.forEach((x) => {
				order += x.OrderTotal;
				advancedPayment += x.Pesinat;
				paid += x.Paid;
				balanced += x.Balanced;
			});
			this.financePoListTotal = {
				order,
				advancedPayment,
				paid,
				balanced
			};
		},
		MUT_setFinancePoListTotalMekmer(payload) {
			let order = 0;
			let advancedPayment = 0;
			let paid = 0;
			let balanced = 0;
			payload.forEach((x) => {
				order += x.siparis_total;
				advancedPayment += x.pesinat;
				paid += x.odenen_tutar;
				balanced += x.kalan;
			});
			this.financePoListTotal = {
				order,
				advancedPayment,
				paid,
				balanced
			};
		},
		MUT_setFinancePaidListTotal(payload) {
			let __total = 0;
			payload.forEach((x) => {
				__total += x.Paid;
			});
			this.financePaidListTotal = __total;
		},
		MUT_setFinancePaidListTotalMekmer(payload) {
			let __total = 0;
			payload.forEach((x) => {
				__total += x.tutar;
			});
			this.financePaidListTotal = __total;
		},
		MUT_setFinancePoButtonStatus(payload) {
			this.financePoButtonStatus = payload;
		},
		MUT_setFinancePoPaidList(payload) {
			this.financePoPaidList = payload;
		},
		MUT_setPoPaidDetailList(payload) {
			this.financePoPaidDetailList = payload;
		},
		MUT_setFinancePurchaseMainList(payload) {
			this.financePurchaseList = payload;
		},
		MUT_setFinancePurchaseDetail(payload) {
			this.financePurchaseDetailList = payload;
		}
	}
});

export { useFinanceStore as u };
//# sourceMappingURL=finance-CBnAViig.mjs.map
