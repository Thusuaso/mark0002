import { u as useApi } from './useApi-CGFzrxZs.mjs';
import { u as useLegacyApi } from './useLegacyApi-B5zRc7ig.mjs';
import { defineStore } from 'pinia';

var useSharedStore = defineStore("shared", {
	state: () => ({
		countryList: [],
		userList: [],
		ordersList: [],
		ordersAllList: [],
		cardList: [],
		supplierList: [],
		mineList: [],
		cardCategoryList: [],
		cardProductsList: [],
		cardSurfacesList: [],
		cardSizesList: [],
		selectionSurfaces: [],
		orderYearList: [],
		customersOfferList: [],
		sampleCategoryList: [],
		sampleUnitList: [],
		sampleSendingList: [],
		sampleBankAccountTypeList: [],
		offerCategoryList: [],
		offerProductList: [],
		offerSizeList: [],
		offerThicknessList: [],
		offerSurfaceList: [],
		offerUnitList: [],
		panelProductSize: [],
		panelProductFinish: [],
		panelProductColor: [],
		panelProductArea: [],
		panelProductStyle: [],
		panelProductType: [],
		panelProductMaterial: [],
		panelProductEdge: [],
		customersList: [],
		unitList: [],
		orderKindOfDeliveryList: [],
		orderKindOfPaymentList: [],
		orderKindOfInvoiceList: [],
		orderKindOfDeliverySupplierList: [],
		yearList: [],
		monthList: [],
		orderProductionList: [],
		orderProductionProductNormalList: [],
		loading: 0,
		loadingDatatable: 0
	}),
	getters: {
		getOrderProductionProductNormalList: (state) => state.orderProductionProductNormalList,
		getOrderProductionList: (state) => state.orderProductionList,
		getCountryList: (state) => state.countryList,
		getUserList: (state) => state.userList,
		getOrdersList: (state) => state.ordersList,
		getOrdersAllList: (state) => state.ordersAllList,
		getCardList: (state) => state.cardList,
		getSupplierList: (state) => state.supplierList,
		getMineList: (state) => state.mineList,
		getCardCategoryList: (state) => state.cardCategoryList,
		getCardProductsList: (state) => state.cardProductsList,
		getCardSurfacesList: (state) => state.cardSurfacesList,
		getCardSizesList: (state) => state.cardSizesList,
		getSelectionSurfaces: (state) => state.selectionSurfaces,
		getOrderYearList: (state) => state.orderYearList,
		getCustomersOfferList: (state) => state.customersOfferList,
		getSampleCategoryList: (state) => state.sampleCategoryList,
		getSampleUnitList: (state) => state.sampleUnitList,
		getSampleSendingList: (state) => state.sampleSendingList,
		getSampleBankAccountTypeList: (state) => state.sampleBankAccountTypeList,
		getOfferCategoryList: (state) => state.offerCategoryList,
		getOfferProductList: (state) => state.offerProductList,
		getOfferSizeList: (state) => state.offerSizeList,
		getOfferThicknessList: (state) => state.offerThicknessList,
		getOfferSurfaceList: (state) => state.offerSurfaceList,
		getOfferUnitList: (state) => state.offerUnitList,
		getPanelProductSize: (state) => state.panelProductSize,
		getPanelProductFinish: (state) => state.panelProductFinish,
		getPanelProductColor: (state) => state.panelProductColor,
		getPanelProductArea: (state) => state.panelProductArea,
		getPanelProductStyle: (state) => state.panelProductStyle,
		getPanelProductType: (state) => state.panelProductType,
		getPanelProductMaterial: (state) => state.panelProductMaterial,
		getPanelProductEdge: (state) => state.panelProductEdge,
		getCustomersList: (state) => state.customersList,
		getUnitList: (state) => state.unitList,
		getOrderKindOfDeliveryList: (state) => state.orderKindOfDeliveryList,
		getOrderKindOfPaymentList: (state) => state.orderKindOfPaymentList,
		getOrderKindOfInvoiceList: (state) => state.orderKindOfInvoiceList,
		getOrderKindOfDeliverySupplierList: (state) => state.orderKindOfDeliverySupplierList,
		getYearList: (state) => state.yearList,
		getMonthList: (state) => state.monthList,
		isLoading: (state) => state.loading > 0,
		isLoadingDatatable: (state) => state.loadingDatatable > 0
	},
	actions: {
		beginLoading() {
			this.loading++;
		},
		endLoading() {
			if (this.loading > 0) this.loading--;
			if (this.loading === 0) ;
		},
		beginLoadingDatatable() {
			this.loadingDatatable++;
		},
		endLoadingDatatable() {
			if (this.loadingDatatable > 0) this.loadingDatatable--;
		},
		setOrderProductionProductListNormal(po) {
			useLegacyApi().get(`/order/products/normal/${po}`).then((response) => {
				this.MUT_setOrderProductionProductListNormal(response.data.products);
			});
		},
		setOrderProductionList() {
			useLegacyApi().get("/orders/production/list").then((response) => {
				this.MUT_setOrderProductionList(response.data.list);
			});
		},
		setCountryList() {
			return useLegacyApi().get("/country").then((response) => {
				this.MUT_setCountryList(response.data.data);
			});
		},
		async setUserList() {
			this.beginLoading();
			try {
				const res = await useApi()("/users");
				this.userList = (res.users ?? []).map((u) => ({
					ID: Number(u.ID),
					KullaniciAdi: String(u.KullaniciAdi ?? ""),
					MailAdres: u.MailAdres == null ? null : String(u.MailAdres)
				}));
			} catch (err) {
				console.error("setUserList basarisiz:", err);
				this.userList = [];
			} finally {
				this.endLoading();
			}
		},
		setOrderList() {
			useLegacyApi().get("/orders").then((response) => {
				this.MUT_setOrderList(response.data.orders);
			});
		},
		setCardList() {
			const legacyApi = useLegacyApi();
			this.beginLoading();
			legacyApi.get("/cards").then((response) => {
				this.MUT_setCardList(response.data.cards);
				this.endLoading();
			});
		},
		async setSupplierList() {
			this.beginLoading();
			try {
				const res = await useApi()("/suppliers");
				this.supplierList = res.suppliers ?? [];
			} catch (err) {
				console.error("setSupplierList basarisiz:", err);
				this.supplierList = [];
			} finally {
				this.endLoading();
			}
		},
		setMineList() {
			return useLegacyApi().get("/mines").then((response) => {
				this.MUT_setMineList(response.data.mines);
			});
		},
		setCardCategoryList() {
			useLegacyApi().get("/cardcategories").then((response) => {
				this.MUT_setCardCategoryList(response.data.categories);
			});
		},
		setCardProductsList() {
			useLegacyApi().get("/cardproducts").then((response) => {
				this.MUT_setCardProductsList(response.data.products);
			});
		},
		setCardSurfacesList() {
			useLegacyApi().get("/cardsurfaces").then((response) => {
				this.MUT_setCardSurfacesList(response.data.surfaces);
			});
		},
		setCardSizesList() {
			useLegacyApi().get("/cardsizes").then((response) => {
				this.MUT_setCardSizesList(response.data.sizes);
			});
		},
		setOrderAllList() {
			useLegacyApi().get("/orders/all").then((response) => {
				this.MUT_setOrderAllList(response.data.orders);
			});
		},
		setSelectionSurfaces() {
			return useLegacyApi().get("/selection/surfaces").then((response) => {
				this.MUT_setSelectionSurfaces(response.data.surfaces);
			});
		},
		setOrderYearList(payload) {
			this.MUT_setOrderYearList(payload);
		},
		setCustomersOfferList() {
			return useLegacyApi().get("/customer/offer/list/all").then((response) => {
				this.MUT_setCustomersOfferList(response.data.list);
			});
		},
		setSampleCategoryList() {
			return useLegacyApi().get("/sample/category/list").then((response) => {
				this.MUT_setSampleCategoryList(response.data.list);
			});
		},
		setSampleUnitList() {
			return useLegacyApi().get("/sample/unit/list").then((response) => {
				this.MUT_setSampleUnitList(response.data.list);
			});
		},
		setSampleSendingTypeList() {
			return useLegacyApi().get("/sample/sending/type/list").then((response) => {
				this.MUT_setSampleSendingTypeList(response.data.list);
			});
		},
		setSampleBankAccountTypeList() {
			return useLegacyApi().get("/sample/bank/account/type/list").then((response) => {
				this.MUT_setSampleBankAccountTypeList(response.data.list);
			});
		},
		setOfferSharedList() {
			useLegacyApi().get("/offer/shared/list").then((response) => {
				this.MUT_setOfferSharedList(response.data);
			});
		},
		setPanelProductSharedList() {
			useLegacyApi().get("/panel/product/shared/list").then((response) => {
				this.MUT_setPanelProductSharedList(response.data);
			});
		},
		setCustomerList() {
			useLegacyApi().get("/customers/list").then((response) => {
				this.MUT_setCustomerList(response.data.list);
			});
		},
		setUnitList() {
			useLegacyApi().get("/unit/list").then((response) => {
				this.MUT_setUnitList(response.data.list);
			});
		},
		setOrderKindOfDeliveryList() {
			useLegacyApi().get("/order/kind/of/delivery").then((response) => {
				this.MUT_setOrderKindOfDeliveryList(response.data.list);
			});
		},
		setOrderKindOfPaymentList() {
			useLegacyApi().get("/order/kind/of/payment").then((response) => {
				this.MUT_setOrderKindOfPaymentList(response.data.list);
			});
		},
		setOrderKindOfInvoiceList() {
			useLegacyApi().get("/order/kind/of/invoice").then((response) => {
				this.MUT_setOrderKindOfInvoiceList(response.data.list);
			});
		},
		setOrderKindOfDeliverySupplierList() {
			useLegacyApi().get("/order/kind/of/delivery/supplier").then((response) => {
				this.MUT_setOrderKindOfDeliverySupplierList(response.data.list);
			});
		},
		setYearList() {
			return useLegacyApi().get("/year/list").then((response) => {
				this.MUT_setYearList(response.data.list);
			});
		},
		setMonthList() {
			return useLegacyApi().get("/month/list").then((response) => {
				this.MUT_setMonthList(response.data.list);
			});
		},
		setShipmentDropProducts(id) {
			this.MUT_setShipmentDropProducts(id);
		},
		MUT_setShipmentDropProducts(payload) {
			const index = this.orderProductionProductNormalList.findIndex((x) => x.ID == payload);
			if (index < 0) {
				console.warn("MUT_setShipmentDropProducts: urun listede yok, liste degistirilmedi. ID:", payload);
				return;
			}
			this.orderProductionProductNormalList.splice(index, 1);
		},
		MUT_setOrderProductionProductListNormal(payload) {
			this.orderProductionProductNormalList = payload;
		},
		MUT_setOrderProductionList(payload) {
			this.orderProductionList = payload;
		},
		MUT_setCountryList(payload) {
			this.countryList = payload;
		},
		MUT_setUserList(payload) {
			this.userList = payload;
		},
		MUT_setOrderList(payload) {
			this.ordersList = payload;
		},
		MUT_setOrderAllList(payload) {
			this.ordersAllList = payload;
		},
		MUT_setCardList(payload) {
			this.cardList = payload;
		},
		MUT_setSupplierList(payload) {
			this.supplierList = payload;
		},
		MUT_setMineList(payload) {
			this.mineList = payload;
		},
		MUT_setCardCategoryList(payload) {
			this.cardCategoryList = payload;
		},
		MUT_setCardProductsList(payload) {
			this.cardProductsList = payload;
		},
		MUT_setCardSurfacesList(payload) {
			this.cardSurfacesList = payload;
		},
		MUT_setCardSizesList(payload) {
			this.cardSizesList = payload;
		},
		MUT_setSelectionSurfaces(payload) {
			this.selectionSurfaces = payload;
		},
		MUT_setOrderYearList(payload) {
			this.orderYearList = payload;
		},
		MUT_setCustomersOfferList(payload) {
			this.customersOfferList = payload;
		},
		MUT_setSampleCategoryList(payload) {
			this.sampleCategoryList = payload;
		},
		MUT_setSampleUnitList(payload) {
			this.sampleUnitList = payload;
		},
		MUT_setSampleSendingTypeList(payload) {
			this.sampleSendingList = payload;
		},
		MUT_setSampleBankAccountTypeList(payload) {
			this.sampleBankAccountTypeList = payload;
		},
		MUT_setOfferSharedList(payload) {
			this.offerCategoryList = payload.category;
			this.offerProductList = payload.product;
			this.offerSizeList = payload.size;
			this.offerThicknessList = payload.thickness;
			this.offerSurfaceList = payload.surface;
			this.offerUnitList = payload.unit;
		},
		MUT_setPanelProductSharedList(payload) {
			this.panelProductSize = payload.size;
			this.panelProductFinish = payload.finish;
			this.panelProductColor = payload.color;
			this.panelProductArea = payload.area;
			this.panelProductStyle = payload.style;
			this.panelProductType = payload.type;
			this.panelProductMaterial = payload.material;
			this.panelProductEdge = payload.edge;
		},
		MUT_setCustomerList(payload) {
			this.customersList = payload;
		},
		MUT_setUnitList(payload) {
			this.unitList = payload;
		},
		MUT_setOrderKindOfDeliveryList(payload) {
			this.orderKindOfDeliveryList = payload;
		},
		MUT_setOrderKindOfPaymentList(payload) {
			this.orderKindOfPaymentList = payload;
		},
		MUT_setOrderKindOfInvoiceList(payload) {
			this.orderKindOfInvoiceList = payload;
		},
		MUT_setOrderKindOfDeliverySupplierList(payload) {
			this.orderKindOfDeliverySupplierList = payload;
		},
		MUT_setYearList(payload) {
			this.yearList = payload;
		},
		MUT_setMonthList(payload) {
			this.monthList = payload;
		}
	}
});

export { useSharedStore as u };
//# sourceMappingURL=shared-D6MCKVW0.mjs.map
