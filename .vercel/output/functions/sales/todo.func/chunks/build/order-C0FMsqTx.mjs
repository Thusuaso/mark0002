import { a as useAppToast } from '../virtual/entry.mjs';
import { u as useApi } from './useApi-CGFzrxZs.mjs';
import { u as useLegacyApi } from './useLegacyApi-B5zRc7ig.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { u as useModelsStore } from './models-CeLtEMS4.mjs';
import { defineStore } from 'pinia';

//#region app/stores/order.ts
function __noneNullControl(value) {
	if (value == null || value == "" || value == void 0 || value == " ") return parseFloat(0);
	else return parseFloat(value);
}
var useOrderStore = defineStore("order", {
	state: () => ({
		orderProductionCustomer: "",
		orderList: [],
		orderListAll: [],
		orderProductionButtonStatus: false,
		orderProductionProductDetailList: [],
		orderProductionProductDetailNotChangeList: [],
		orderProductionPo: "",
		orderProductAdded: [],
		orderProductUpdated: [],
		orderProductDeleted: [],
		orderProductionCostList: [],
		orderProductionCostTotal: 0,
		orderProductionSupplierList: [],
		orderSupplierProductList: [],
		orderProductionDocumentList: [],
		orderProductionCheckList: [],
		orderProductionCheckListTotal: {
			crate: 0,
			box: 0,
			piece: 0,
			amount: 0,
			ton: 0
		},
		orderProductionProductTotal: 0,
		orderProductionFreightTotal: 0,
		orderProductionDetailTotal: 0,
		orderProductionProductDetailTotal: {
			m2: 0,
			piece: 0,
			mt: 0,
			ton: 0,
			total: 0
		},
		orderProductionProductDetailCostTotal: {
			supplier: 0,
			workerman: 0,
			brokerage: 0,
			freight: 0,
			detail: 0,
			fob: 0
		},
		orderProductionProductDetailFobCostTotal: 0,
		orderProductionProductDetailWorkermanList: [],
		orderProductionYearsList: [],
		orderProductionSaveButtonStatus: false,
		orderProductionId: 0,
		orderProductionUploadProformaButtonStatus: true,
		orderProductionTotal: {
			order: 0,
			production: 0,
			ton: 0,
			price: 0,
			buying: 0
		},
		orderProductionDivideList: [],
		orderProductionDivideOrderList: [],
		orderProductionInsuranceTotal: 0,
		orderProductionSourceTypes: []
	}),
	getters: {
		getOrderProductionCustomer: (state) => state.orderProductionCustomer,
		getOrderProductionSourceTypes: (state) => state.orderProductionSourceTypes,
		getOrderProductionDivideOrderList: (state) => state.orderProductionDivideOrderList,
		getOrderProductionDivideList: (state) => state.orderProductionDivideList,
		getOrderProductionTotal: (state) => state.orderProductionTotal,
		getOrderList: (state) => state.orderList,
		getOrderProductionButtonStatus: (state) => state.orderProductionButtonStatus,
		getOrderProductionProductDetailList: (state) => state.orderProductionProductDetailList,
		getOrderProductionProductDetailNotChangeList: (state) => state.orderProductionProductDetailNotChangeList,
		getOrderProductionPo: (state) => state.orderProductionPo,
		getOrderProductAdded: (state) => state.orderProductAdded,
		getOrderProductUpdated: (state) => state.orderProductUpdated,
		getOrderProductDeleted: (state) => state.orderProductDeleted,
		getOrderProductionCostList: (state) => state.orderProductionCostList,
		getOrderProductionCostTotal: (state) => state.orderProductionCostTotal,
		getOrderProductionSupplierList: (state) => state.orderProductionSupplierList,
		getOrderSupplierProductList: (state) => state.orderSupplierProductList,
		getOrderProductionDocumentList: (state) => state.orderProductionDocumentList,
		getOrderProductionCheckList: (state) => state.orderProductionCheckList,
		getOrderProductionCheckListTotal: (state) => state.orderProductionCheckListTotal,
		getOrderProductionProductTotalCalculation: (state) => state.orderProductionProductTotalCalculation,
		getOrderProductionProductTotal: (state) => state.orderProductionProductTotal,
		getOrderProductionFreightTotal: (state) => state.orderProductionFreightTotal,
		getOrderProductionInsuranceTotal: (state) => state.orderProductionInsuranceTotal,
		getOrderProductionDetailTotal: (state) => state.orderProductionDetailTotal,
		getOrderProductionProductDetailTotal: (state) => state.orderProductionProductDetailTotal,
		getOrderProductionProductDetailCostTotal: (state) => state.orderProductionProductDetailCostTotal,
		getOrderProductionProductDetailWorkermanList: (state) => state.orderProductionProductDetailWorkermanList,
		getOrderProductionYearsList: (state) => state.orderProductionYearsList,
		getOrderListAll: (state) => state.orderListAll,
		getOrderProductionSaveButtonStatus: (state) => state.orderProductionSaveButtonStatus,
		getOrderProductionId: (state) => state.orderProductionId,
		getOrderProductionUploadProformaButtonStatus: (state) => state.orderProductionUploadProformaButtonStatus
	},
	actions: {
		setDivide(payload) {
			return useApi()("/order/divide", {
				method: "POST",
				body: payload
			});
		},
		setProductionDivideOrderListUpdate(payload) {
			return new Promise((resolve, reject) => {
				this.MUT_setProductionDivideOrderListUpdate(payload);
				resolve(true);
			});
		},
		setProductionDivideOrderList(payload) {
			return new Promise((resolve, resject) => {
				this.MUT_setProductionDivideOrderList(payload);
				resolve(true);
			});
		},
		setOrdersProductsDivideList(po) {
			const legacyApi = useLegacyApi();
			return new Promise(async (resolve, reject) => {
				await legacyApi.get("/orders/product/divide/list/" + po).then((response) => {
					if (response) {
						this.MUT_setOrdersProductsDivideList(response.data.list);
						resolve(true);
					} else resolve(false);
				});
			});
		},
		setOrderOnHoldMekmerList() {
			useLegacyApi().get("/order/onhold/mekmer/list").then((response) => {
				if (response.data.list) {
					this.MUT_setOrderList(response.data.list);
					this.MUT_setOrderProductionYearsList(response.data.years);
					this.MUT_setOrderListAll(response.data.list);
					this.MUT_setOrderProductionTotal(response.data.list);
				}
			});
		},
		setOrderProductionMekmerList() {
			const legacyApi = useLegacyApi();
			return new Promise(async (resolve, reject) => {
				legacyApi.get("/order/production/mekmer/list").then((response) => {
					if (response.data.list) {
						this.MUT_setOrderList(response.data.list);
						this.MUT_setOrderProductionYearsList(response.data.years);
						this.MUT_setOrderListAll(response.data.list);
						this.MUT_setOrderProductionTotal(response.data.list);
						resolve(true);
					}
				});
			});
		},
		setOrderProductionTotal(list) {
			this.MUT_setOrderProductionTotal(list);
		},
		setOrderProductionIsfDelete(event) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const sharedStore = useSharedStore();
			legacyApi.get(`/production/isf/delete/${event.ID}/${event.EvrakAdi}/${event.SiparisNo}`).then((response) => {
				if (response.data.status) {
					sharedStore.endLoading();
					toast.success("Isf Silindi.");
					this.MUT_setOrderProductionProformaDelete(event.ID);
				} else toast.error("Isf Silme Başarısız.");
			});
		},
		setOrderProductionProformaDelete(id) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.get(`/production/proforma/delete/${id}`).then((response) => {
				if (response.data.status) {
					toast.success("Proforma Silindi.");
					this.MUT_setOrderProductionProformaDelete(id);
				} else toast.error("Proforma Silme Başarısız.");
			});
		},
		setOrderProductionMekmer2List() {
			useLegacyApi().get("/order/production/mekmer2/list").then((response) => {
				if (response.data.list) {
					this.MUT_setOrderList(response.data.list);
					this.MUT_setOrderProductionYearsList(response.data.years);
					this.MUT_setOrderListAll(response.data.list);
					this.MUT_setOrderProductionTotal(response.data.list);
				}
			});
		},
		setOrderProductionList() {
			useLegacyApi().get("/order/production/list").then(async (response) => {
				if (response.data.list) {
					await this.MUT_setOrderList(response.data.list);
					await this.MUT_setOrderProductionYearsList(response.data.years);
					await this.MUT_setOrderListAll(response.data.list);
					await this.MUT_setOrderProductionTotal(response.data.list);
				}
			});
		},
		setOrderProductionListYear(year) {
			useLegacyApi().get(`/order/production/list/year/${year}`).then((response) => {
				if (response.data.list) {
					this.MUT_setOrderList(response.data.list);
					this.MUT_setOrderProductionTotal(response.data.list);
				}
			});
		},
		setOrderShippedList() {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get("/order/shipped/list").then((response) => {
				if (response.data.list) {
					this.MUT_setOrderList(response.data.list);
					this.MUT_setOrderProductionYearsList(response.data.years);
					this.MUT_setOrderProductionTotal(response.data.list);
				}
			}).catch((err) => {
				console.error("setOrderShippedList basarisiz:", err);
			}).finally(() => {
				sharedStore.endLoading();
			});
		},
		setOrderShippedMekmerList() {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get("/order/shipped/mekmer/list").then((response) => {
				if (response.data.list) {
					this.MUT_setOrderList(response.data.list);
					this.MUT_setOrderProductionYearsList(response.data.years);
					this.MUT_setOrderProductionTotal(response.data.list);
				}
			}).catch((err) => {
				console.error("setOrderShippedMekmerList basarisiz:", err);
			}).finally(() => {
				sharedStore.endLoading();
			});
		},
		setOrderShippedMekmer2List() {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get("/order/shipped/mekmer2/list").then((response) => {
				if (response.data.list) {
					this.MUT_setOrderList(response.data.list);
					this.MUT_setOrderProductionYearsList(response.data.years);
					this.MUT_setOrderProductionTotal(response.data.list);
				}
			}).catch((err) => {
				console.error("setOrderShippedMekmer2List basarisiz:", err);
			}).finally(() => {
				sharedStore.endLoading();
			});
		},
		setOrderShippedMekmer2ListYears(year) {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get(`/order/shipped/mekmer2/list/${year}`).then((response) => {
				if (response.data.list) {
					this.MUT_setOrderList(response.data.list);
					this.MUT_setOrderProductionYearsList(response.data.years);
					this.MUT_setOrderProductionTotal(response.data.list);
				}
			}).catch((err) => {
				console.error("setOrderShippedMekmer2ListYears basarisiz:", err);
			}).finally(() => {
				sharedStore.endLoading();
			});
		},
		filterShipment(filter) {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoadingDatatable();
			legacyApi.post(`/order/shipped/list/filter`, filter).then((response) => {
				if (response.data.list) {
					this.MUT_setOrderList(response.data.list);
					this.MUT_setOrderProductionTotal(response.data.list);
					sharedStore.endLoadingDatatable();
				}
			});
		},
		setFilterShipmentGlobal(filter) {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoadingDatatable();
			legacyApi.get(`/order/shipped/list/filter/global/${filter}`).then((response) => {
				if (response.data.list) {
					this.MUT_setOrderList(response.data.list);
					this.MUT_setOrderProductionTotal(response.data.list);
					sharedStore.endLoadingDatatable();
				}
			});
		},
		setOrderShippedListYear(year) {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get(`/order/shipped/list/year/${year}`).then((response) => {
				if (response.data.list) {
					this.MUT_setOrderList(response.data.list);
					this.MUT_setOrderProductionTotal(response.data.list);
				}
			}).catch((err) => {
				console.error("setOrderShippedListYear basarisiz:", err);
			}).finally(() => {
				sharedStore.endLoading();
			});
		},
		setOrderWaitingList() {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get("/order/waiting/list").then((response) => {
				if (response.data.list) {
					this.MUT_setOrderList(response.data.list);
					this.MUT_setOrderProductionYearsList(response.data.years);
					this.MUT_setOrderProductionTotal(response.data.list);
				}
			}).catch((err) => {
				console.error("setOrderWaitingList basarisiz:", err);
			}).finally(() => {
				sharedStore.endLoading();
			});
		},
		setOrderWaitingListYear(year) {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get(`/order/waiting/list/year/${year}`).then((response) => {
				if (response.data.list) {
					this.MUT_setOrderList(response.data.list);
					this.MUT_setOrderProductionTotal(response.data.list);
				}
			}).catch((err) => {
				console.error("setOrderWaitingListYear basarisiz:", err);
			}).finally(() => {
				sharedStore.endLoading();
			});
		},
		setOrderProductionButtonStatus(payload) {
			this.MUT_setOrderProductionButtonStatus(payload);
		},
		setOrderProductionProductDetailList(po) {
			useLegacyApi().get(`/order/production/product/detail/list/${po}`).then((response) => {
				this.MUT_setOrderProductionProductDetailList(response.data.list);
				this.MUT_setOrderProductionProductTotal(response.data.list);
				this.setOrderProductionProductDetailTotal(response.data.list);
			});
		},
		setOrderProductionProductDetailMekmerList(po) {
			useLegacyApi().get(`/order/production/product/detail/mekmer/list/${po}`).then((response) => {
				this.MUT_setOrderProductionProductDetailList(response.data.list);
				this.MUT_setOrderProductionProductTotal(response.data.list);
				this.setOrderProductionProductDetailTotal(response.data.list);
			});
		},
		setOrderProductionPo(po) {
			this.MUT_setOrderProductionPo(po);
		},
		setOrderProductionCustomer(customer) {
			this.MUT_setOrderProductionCustomer(customer);
		},
		setOrderProductAdded(payload) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const modelsStore = useModelsStore();
			legacyApi.post("/order/production/product/add", payload).then((response) => {
				if (response.data.status) {
					toast.success("Başarıyla Eklendi.");
					this.MUT_setOrderProductAdded({
						...payload,
						ID: response.data.id
					});
					this.setOrderProductionCheckList(payload.SiparisNo);
					this.setOrderProductionSupplierList(payload.SiparisNo);
					modelsStore.setOrderProductModel();
				} else toast.error("Ekleme İşlemi Başarısız.");
			});
		},
		setOrderProductUpdated(payload) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const modelsStore = useModelsStore();
			legacyApi.put("/order/production/product/update", payload).then((response) => {
				if (response.data.status) {
					toast.success("Başarıyla Güncellendi.");
					this.MUT_setOrderProductUpdated(payload);
					modelsStore.setOrderProductModel();
					this.setOrderProductionCheckList(payload.SiparisNo);
					this.setOrderProductionSupplierList(payload.SiparisNo);
				} else toast.error("Güncelleme Başarısız.");
			});
		},
		setOrderProductDeleted(payload) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const modelsStore = useModelsStore();
			legacyApi.delete(`/order/production/product/delete/${payload.ID}`).then((response) => {
				if (response.data.status) {
					toast.success("Başarıyla Silindi.");
					this.MUT_setOrderProductDeleted(payload);
					this.setOrderProductionSupplierList(payload.SiparisNo);
					modelsStore.setOrderProductModel();
				} else toast.error("Silme İşlemi Başarısız.");
			});
		},
		setOrderProformaUpload(payload) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.post("/order/production/proforma/upload", payload).then((response) => {
				if (response.data.status) {
					toast.success("Başarıyla Yüklendi");
					this.setOrderProductionDocumentList(payload.po);
				} else toast.error("Yükleme Başarısız");
			});
		},
		setOrderProductionCostList(po) {
			useLegacyApi().get(`/order/production/cost/list/${po}`).then((response) => {
				this.MUT_setOrderProductionCostList(response.data.list);
				this.setOrderProductionCostTotal(response.data.list);
			});
		},
		setOrderProductionCostTotal(payload) {
			this.MUT_setOrderProductionCostTotal(payload);
		},
		setOrderProductionSupplierList(po) {
			useLegacyApi().get(`/order/production/product/supplier/${po}`).then((response) => {
				this.MUT_setOrderProductionSupplierList(response.data.list);
			});
		},
		setOrderSupplierProductList(payload) {
			useLegacyApi().get(`/order/production/supplier/product/${payload.po}/${payload.supplier}`).then((response) => {
				this.MUT_setOrderSupplierProductList(response.data.list);
			});
		},
		setProductionProductSupplierIsfSave(payload) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			return new Promise((resolve, reject) => {
				legacyApi.post("/order/production/supplier/isf/save", payload).then((response) => {
					if (response.data.status) {
						toast.success("Başarıyla Kaydedildi.");
						this.setOrderProductionList();
						this.setOrderProductionDocumentList(payload.po);
						resolve(true);
					} else {
						toast.error("Kaydetme Başarısız.");
						resolve(false);
					}
				});
			});
		},
		setOrderProductionDocumentList(po) {
			useLegacyApi().get(`/order/production/product/document/${po}`).then((response) => {
				this.MUT_setOrderProductionDocumentList(response.data.list);
			});
		},
		setOrderProductionCheckList(po) {
			useLegacyApi().get(`/order/production/product/check/${po}`).then((response) => {
				this.MUT_setOrderProductionCheckList(response.data.list);
				this.setOrderProductionCheckListTotal(response.data.list);
			});
		},
		setOrderProductionCheckMekmerList(po) {
			useLegacyApi().get(`/order/production/product/check/mekmer/${po}`).then((response) => {
				this.MUT_setOrderProductionCheckList(response.data.list);
				this.setOrderProductionCheckListTotal(response.data.list);
			});
		},
		setOrderProductionCheckListTotal(payload) {
			this.MUT_setOrderProductionCheckListTotal(payload);
		},
		setOrderProductionDetailListReset() {
			this.MUT_setOrderProductionDetailListReset();
		},
		setOrderProductionSave(production) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.post("/order/production/save", production).then((response) => {
				if (response.data.status) {
					toast.success("Başarıyla Kaydedildi. Ürünlerinizi Girebilirsiniz!");
					this.setOrderProductionButtonStatus(false);
					this.setOrderProductionSaveButtonStatus(false);
					this.setOrderProductionId(response.data.id);
					this.setOrderProductionUploadProformaButtonStatus(false);
				} else toast.error("Kaydetme Başarısız");
			});
		},
		setOrderProductionUpdate(production) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.put("/order/production/update", production).then((response) => {
				if (response.data.status) toast.success("Başarıyla Güncellendi.");
				else toast.error("Güncelleme Başarısız");
			});
		},
		setOrderProductionProductTotal(product) {
			this.MUT_setOrderProductionProductTotal(product);
		},
		setOrderProductionFreightTotal(freight) {
			this.MUT_setOrderProductionFreightTotal(freight);
		},
		setOrderProductionInsuranceTotal(insurance) {
			if (insurance == null || insurance == void 0 || insurance == " " || insurance == "") this.MUT_setOrderProductionInsuranceTotal(0);
			else this.MUT_setOrderProductionInsuranceTotal(insurance);
		},
		setOrderProductionDetailTotal(detail) {
			this.MUT_setOrderProductionDetailTotal(detail);
		},
		setOrderProductionProductDetailTotal(detail) {
			this.MUT_setOrderProductionProductDetailTotal(detail);
		},
		setOrderProductionProductDetailCostTotal(production) {
			this.MUT_setOrderProductionProductDetailCostTotal(production);
		},
		setProductionProductWorkermanList(workerman) {
			useLegacyApi().get(`/order/production/product/workerman/${workerman.po}/${workerman.productId}`).then((response) => {
				this.MUT_setProductionProductWorkermanList(response.data.list);
				this.MUT_setProductionProductWorkermanCalculation(response.data.workerman);
			});
		},
		setProductionProductWorkermanSave(workerman) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const modelsStore = useModelsStore();
			legacyApi.post("/order/production/product/workerman/save", workerman).then((response) => {
				if (response.data.status) {
					const data = {
						productId: workerman.UrunKartId,
						po: workerman.SiparisNo
					};
					this.setProductionProductWorkermanList(data);
					modelsStore.setOrderProductWorkermanModel();
					this.setOrderProductionProductDetailList(workerman.SiparisNo);
					toast.success("Başarıyla Kaydedildi.");
				} else toast.error("Kaydetme Başarısız.");
			});
		},
		setProductionProductWorkermanDelete(workerman) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const modelsStore = useModelsStore();
			legacyApi.delete(`/order/production/product/workerman/delete/${workerman.ID}`).then((response) => {
				if (response.data.status) {
					const data = {
						productId: workerman.UrunKartId,
						po: workerman.SiparisNo
					};
					toast.success("Başarıyla Silindi");
					this.setOrderProductionProductDetailList(workerman.SiparisNo);
					modelsStore.setOrderProductWorkermanModel();
					this.setProductionProductWorkermanList(data);
				} else toast.error("Silme Başarısız.");
			});
		},
		setProductionProductWorkermanUpdate(workerman) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const modelsStore = useModelsStore();
			legacyApi.put("/order/production/product/workerman/update", workerman).then((response) => {
				if (response.data.status) {
					const data = {
						productId: workerman.UrunKartId,
						po: workerman.SiparisNo
					};
					toast.success("Başarıyla Güncellendi");
					this.setOrderProductionProductDetailList(workerman.SiparisNo);
					this.setProductionProductWorkermanList(data);
					modelsStore.setOrderProductWorkermanModel();
				} else toast.error("Güncelleme Başarısız.");
			});
		},
		setProductionProductSaveMail(production) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.post("/order/production/product/save/mail", production).then((response) => {
				if (response.data.status) {
					toast.success("Mail Gönderildi.");
					this.setProductionProductMailReset();
				}
			});
		},
		setProductionProductMailReset() {
			this.MUT_setProductionProductMailReset();
		},
		setOrderProductionSaveButtonStatus(status) {
			this.MUT_setOrderProductionSaveButtonStatus(status);
		},
		setOrderProductionProductDetailNotChangeList(product) {
			this.MUT_setOrderProductionProductDetailNotChangeList(product);
		},
		setOrderProductionProductDetailNotChangeListReset() {
			this.MUT_setOrderProductionProductDetailNotChangeListReset();
		},
		setOrderProductionId(id) {
			this.MUT_setOrderProductionId(id);
		},
		setOrderProductionUploadProformaButtonStatus(status) {
			this.MUT_setOrderProductionUploadProformaButtonStatus(status);
		},
		setOrderProductionIsfSendMail(payload) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.post("/production/isf/send/mail", payload).then((response) => {
				if (response.data.status) toast.success("Mail Gönderildi.");
			});
		},
		setOrderProductionSourceTypes(payload) {
			useLegacyApi().get("/order/production/source/types").then((response) => {
				this.MUT_setOrderProductionSourceTypes(response.data.list);
			});
		},
		MUT_setOrderProductionCustomer(payload) {
			this.orderProductionCustomer = payload;
		},
		MUT_setOrderProductionSourceTypes(payload) {
			this.orderProductionSourceTypes = payload;
		},
		MUT_addWorkerman(payload) {
			this.orderProductionProductDetailWorkermanList.push(payload);
		},
		MUT_setProductionDivideOrderListUpdate(payload) {
			if (this.orderProductionDivideOrderList.length > 0) {
				const index = this.orderProductionDivideOrderList.findIndex((x) => x.id == payload.id);
				this.orderProductionDivideOrderList.splice(index, 1, payload);
			} else return;
		},
		MUT_setProductionDivideOrderList(payload) {
			this.orderProductionDivideOrderList.push(payload);
		},
		MUT_setProductionDivideOrderListReset() {
			this.orderProductionDivideOrderList = [];
		},
		MUT_setOrdersProductsDivideList(list) {
			this.orderProductionDivideList = list;
		},
		MUT_setOrderProductionTotal(list) {
			let order = 0;
			let production = 0;
			let ton = 0;
			let price = 0;
			let buying = 0;
			list.forEach((x) => {
				order += __noneNullControl(x.Miktar);
				production += __noneNullControl(x.Uretim);
				ton += __noneNullControl(x.Ton);
				price += __noneNullControl(x.SatisToplam);
				buying += __noneNullControl(x.AlisFiyati);
			});
			this.orderProductionTotal = {
				order,
				production,
				ton,
				price,
				buying
			};
		},
		MUT_setOrderProductionProformaDelete(id) {
			const index = this.orderProductionDocumentList.findIndex((x) => x.ID == id);
			this.orderProductionDocumentList.splice(index, 1);
		},
		MUT_setOrderList(payload) {
			this.orderList = Object.freeze(payload);
		},
		MUT_setOrderListAll(payload) {
			this.orderListAll = Object.freeze(payload);
		},
		MUT_setOrderProductionButtonStatus(payload) {
			this.orderProductionButtonStatus = payload;
		},
		MUT_setOrderProductionProductDetailList(payload) {
			this.orderProductionProductDetailList = payload;
		},
		MUT_setOrderProductionProductDetailNotChangeList(payload) {
			this.orderProductionProductDetailNotChangeList.push(payload);
		},
		MUT_setOrderProductionProductDetailNotChangeListReset() {
			this.orderProductionProductDetailNotChangeList = [];
		},
		MUT_setOrderProductionPo(payload) {
			this.orderProductionPo = payload;
		},
		MUT_setOrderProductAdded(payload) {
			this.orderProductAdded.push(payload);
			this.orderProductionProductDetailList.push(payload);
			this.orderProductionProductDetailNotChangeList.push(payload);
			this.orderProductionProductTotal = 0;
			this.orderProductionProductDetailList.forEach((x) => {
				this.orderProductionProductTotal += x.SatisToplam;
			});
			this.orderProductionProductDetailTotal = {
				m2: 0,
				piece: 0,
				mt: 0,
				ton: 0,
				total: 0
			};
			this.orderProductionProductDetailCostTotal.supplier = 0;
			this.orderProductionProductDetailCostTotal.workerman = 0;
			this.orderProductionProductDetailList.forEach((x) => {
				if (x.UrunBirimID == 1) {
					this.orderProductionProductDetailTotal.m2 += parseFloat(x.Miktar);
					this.orderProductionProductDetailTotal.piece += x.Adet;
				} else if (x.UrunBirimID == 2) {
					this.orderProductionProductDetailTotal.piece += parseFloat(x.Miktar);
					this.orderProductionProductDetailTotal.m2 += x.OzelMiktar;
				} else if (x.UrunBirimID == 3) {
					this.orderProductionProductDetailTotal.mt += parseFloat(x.Miktar);
					this.orderProductionProductDetailTotal.piece += x.Adet;
					this.orderProductionProductDetailTotal.m2 += x.OzelMiktar;
				}
				this.orderProductionProductDetailTotal.ton += parseFloat(x.Ton);
				this.orderProductionProductDetailTotal.total += x.Miktar * x.SatisFiyati;
				this.orderProductionProductDetailCostTotal.supplier += x.Miktar * x.AlisFiyati;
				if (x.Iscilik == null) this.orderProductionProductDetailCostTotal.workerman = 0;
				else this.orderProductionProductDetailCostTotal.workerman += x.Iscilik;
			});
		},
		MUT_setOrderProductDeleted(payload) {
			this.orderProductDeleted.push(payload);
			const index = this.orderProductionProductDetailList.findIndex((x) => x.ID == payload.ID);
			this.orderProductionProductDetailList.splice(index, 1);
			this.orderProductionProductDetailNotChangeList.splice(index, 1);
			this.orderProductionProductTotal = 0;
			this.orderProductionProductDetailList.forEach((x) => {
				this.orderProductionProductTotal += x.SatisToplam;
			});
			this.orderProductionProductDetailTotal = {
				m2: 0,
				piece: 0,
				mt: 0,
				ton: 0,
				total: 0
			};
			this.orderProductionProductDetailCostTotal.supplier = 0;
			this.orderProductionProductDetailCostTotal.workerman = 0;
			this.orderProductionProductDetailList.forEach((x) => {
				if (x.UrunBirimID == 1) {
					this.orderProductionProductDetailTotal.m2 += x.Miktar;
					this.orderProductionProductDetailTotal.piece += x.Adet;
				} else if (x.UrunBirimID == 2) {
					this.orderProductionProductDetailTotal.piece += x.Miktar;
					this.orderProductionProductDetailTotal.m2 += x.OzelMiktar;
				} else if (x.UrunBirimID == 3) {
					this.orderProductionProductDetailTotal.mt += x.Miktar;
					this.orderProductionProductDetailTotal.piece += x.Adet;
					this.orderProductionProductDetailTotal.m2 += x.OzelMiktar;
				}
				this.orderProductionProductDetailTotal.ton += x.Ton;
				this.orderProductionProductDetailTotal.total += x.Miktar * x.SatisFiyati;
				this.orderProductionProductDetailCostTotal.supplier += x.Miktar * x.AlisFiyati;
				this.orderProductionProductDetailCostTotal.workerman += x.Iscilik;
			});
		},
		MUT_setOrderProductUpdated(payload) {
			const index2 = this.orderProductUpdated.findIndex((x) => x.ID == payload.ID);
			if (index2 == -1) this.orderProductUpdated.push(payload);
			else this.orderProductUpdated.splice(index2, 1, payload);
			const index = this.orderProductionProductDetailList.findIndex((x) => x.ID == payload.ID);
			this.orderProductionProductDetailList.splice(index, 1, payload);
			this.orderProductionProductTotal = 0;
			this.orderProductionProductDetailList.forEach((x) => {
				this.orderProductionProductTotal += x.SatisToplam;
			});
			this.orderProductionProductDetailTotal = {
				m2: 0,
				piece: 0,
				mt: 0,
				ton: 0,
				total: 0
			};
			this.orderProductionProductDetailCostTotal.supplier = 0;
			this.orderProductionProductDetailCostTotal.workerman = 0;
			this.orderProductionProductDetailList.forEach((x) => {
				if (x.UrunBirimID == 1) {
					this.orderProductionProductDetailTotal.m2 += parseFloat(x.Miktar);
					this.orderProductionProductDetailTotal.piece += x.Adet;
				} else if (x.UrunBirimID == 2) {
					this.orderProductionProductDetailTotal.piece += parseFloat(x.Miktar);
					this.orderProductionProductDetailTotal.m2 += x.OzelMiktar;
				} else if (x.UrunBirimID == 3) {
					this.orderProductionProductDetailTotal.mt += parseFloat(x.Miktar);
					this.orderProductionProductDetailTotal.piece += x.Adet;
					this.orderProductionProductDetailTotal.m2 += x.OzelMiktar;
				}
				this.orderProductionProductDetailTotal.ton += parseFloat(x.Ton);
				this.orderProductionProductDetailTotal.total += x.Miktar * x.SatisFiyati;
				this.orderProductionProductDetailCostTotal.supplier += x.Miktar * x.AlisFiyati;
				if (x.Iscilik == null) this.orderProductionProductDetailCostTotal.workerman = 0;
				else this.orderProductionProductDetailCostTotal.workerman += x.Iscilik;
			});
		},
		MUT_setOrderProductionCostList(payload) {
			this.orderProductionCostList = payload;
			this.orderProductionProductDetailCostTotal.fob = 0;
			payload.forEach((x) => {
				if (x.Tur == "Navlun" || x.Tur == "İşçilik") this.orderProductionProductDetailCostTotal.fob += 0;
				else this.orderProductionProductDetailCostTotal.fob += x.tut;
			});
		},
		MUT_setOrderProductionCostTotal(payload) {
			let __total = 0;
			payload.forEach((x) => {
				__total += x.tut;
			});
			this.orderProductionCostTotal = __total;
		},
		MUT_setOrderProductionSupplierList(payload) {
			this.orderProductionSupplierList = payload;
		},
		MUT_setOrderSupplierProductList(payload) {
			this.orderSupplierProductList = payload;
		},
		MUT_setOrderProductionDocumentList(payload) {
			this.orderProductionDocumentList = payload;
		},
		MUT_setOrderProductionCheckList(payload) {
			this.orderProductionCheckList = payload;
		},
		MUT_setOrderProductionCheckListTotal(payload) {
			let crate = 0;
			let box = 0;
			let piece = 0;
			let amount = 0;
			let ton = 0;
			crate += payload.filter((x) => x.KasaGrupIlk === void 0 ? true : x.KasaGrupIlk).length;
			payload.forEach((x) => {
				box += x.KutuAdet;
				piece += x.Adet;
				amount += x.Miktar;
				ton += x.Ton;
			});
			this.orderProductionCheckListTotal = {
				crate,
				box,
				piece,
				amount,
				ton
			};
		},
		MUT_setOrderProductionDetailListReset() {
			this.orderProductionCostList = [];
			this.orderProductionCostTotal = 0;
			this.orderProductionSupplierList = [];
			this.orderSupplierProductList = [];
			this.orderProductionDocumentList = [];
			this.orderProductionCheckList = [];
			this.orderProductionProductDetailList = [];
			this.orderProductionCheckListTotal = {
				crate: 0,
				box: 0,
				piece: 0,
				amount: 0,
				ton: 0
			};
			this.orderProductionProductTotal = 0;
			this.orderProductionFreightTotal = 0;
			this.orderProductionDetailTotal = 0;
			this.orderProductionProductDetailTotal = {
				m2: 0,
				piece: 0,
				mt: 0,
				ton: 0,
				total: 0
			};
			this.orderProductionProductDetailCostTotal = {
				supplier: 0,
				workerman: 0,
				brokerage: 0,
				freight: 0,
				detail: 0,
				fob: 0
			};
			this.orderProductionProductDetailFobCostTotal = 0;
			this.orderProductionProductDetailWorkermanList = [];
		},
		MUT_setOrderProductionProductTotal(payload) {
			let __total = 0;
			payload.forEach((x) => {
				__total += x.SatisToplam;
			});
			this.orderProductionProductTotal = __total;
		},
		MUT_setOrderProductionFreightTotal(payload) {
			this.orderProductionFreightTotal = payload;
		},
		MUT_setOrderProductionInsuranceTotal(payload) {
			this.orderProductionInsuranceTotal = payload;
		},
		MUT_setOrderProductionDetailTotal(payload) {
			this.orderProductionDetailTotal = parseFloat(payload.DetayTutar_1) + parseFloat(payload.DetayTutar_2) + parseFloat(payload.DetayTutar_3);
		},
		MUT_setOrderProductionProductDetailTotal(payload) {
			this.orderProductionProductDetailTotal = {
				m2: 0,
				piece: 0,
				mt: 0,
				ton: 0,
				total: 0
			};
			this.orderProductionProductDetailCostTotal.supplier = 0;
			this.orderProductionProductDetailCostTotal.workerman = 0;
			payload.forEach((x) => {
				if (x.UrunBirimID == 1) {
					this.orderProductionProductDetailTotal.m2 += x.Miktar;
					this.orderProductionProductDetailTotal.piece += x.Adet;
				} else if (x.UrunBirimID == 2) {
					this.orderProductionProductDetailTotal.piece += x.Miktar;
					this.orderProductionProductDetailTotal.m2 += x.OzelMiktar;
				} else if (x.UrunBirimID == 3) {
					this.orderProductionProductDetailTotal.mt += x.Miktar;
					this.orderProductionProductDetailTotal.piece += x.Adet;
					this.orderProductionProductDetailTotal.m2 += x.OzelMiktar;
				}
				this.orderProductionProductDetailTotal.ton += x.Ton;
				this.orderProductionProductDetailTotal.total += x.Miktar * x.SatisFiyati;
				this.orderProductionProductDetailCostTotal.supplier += x.Miktar * x.AlisFiyati;
				this.orderProductionProductDetailCostTotal.workerman += x.Iscilik;
			});
		},
		MUT_setOrderProductionProductDetailCostTotal(payload) {
			this.orderProductionProductDetailCostTotal.brokerage = 0;
			this.orderProductionProductDetailCostTotal.freight = 0;
			this.orderProductionProductDetailCostTotal.detail = 0;
			this.orderProductionProductDetailCostTotal.brokerage = parseFloat(payload.Komisyon);
			this.orderProductionProductDetailCostTotal.freight = parseFloat(payload.NavlunAlis);
			this.orderProductionProductDetailCostTotal.detail = parseFloat(payload.DetayAlis_1) + parseFloat(payload.DetayAlis_2) + parseFloat(payload.DetayAlis_3) + parseFloat(payload.EvrakGideri) + parseFloat(payload.sigorta_Tutar) + parseFloat(payload.DetayTutar_4);
		},
		MUT_setProductionProductWorkermanList(payload) {
			this.orderProductionProductDetailWorkermanList = payload;
		},
		MUT_setProductionProductWorkermanCalculation(payload) {
			if (payload.Tutar == null) this.orderProductionProductDetailCostTotal.workerman = 0;
			else this.orderProductionProductDetailCostTotal.workerman = parseFloat(payload.Tutar);
		},
		MUT_setProductionProductMailReset() {
			this.orderProductAdded = [];
			this.orderProductUpdated = [];
			this.orderProductDeleted = [];
		},
		MUT_setOrderProductionYearsList(payload) {
			this.orderProductionYearsList = payload;
		},
		MUT_setOrderProductionSaveButtonStatus(payload) {
			this.orderProductionSaveButtonStatus = payload;
		},
		MUT_setOrderProductionId(payload) {
			this.orderProductionId = payload;
		},
		MUT_setOrderProductionUploadProformaButtonStatus(payload) {
			this.orderProductionUploadProformaButtonStatus = payload;
		}
	}
});

export { useOrderStore as u };
//# sourceMappingURL=order-C0FMsqTx.mjs.map
