import { b as useAsyncData, _ as _plugin_vue_export_helper_default, f as formatDecimal, e as formatPriceUsd, a as useAppToast, u as useCookie } from '../virtual/entry.mjs';
import { n as script$7 } from './button-C8Z7Yc79.mjs';
import { n as script$9 } from './column-CT6GXkG2.mjs';
import { n as script$8 } from './datatable-D6ou7HZJ.mjs';
import { n as script$3 } from './inputtext-s6cxdqDx.mjs';
import { t as script$6 } from './select-T8LIeBQG.mjs';
import { n as script$4 } from './checkbox-wtvrQjx7.mjs';
import { n as script$5 } from './radiobutton-C-685P7O.mjs';
import { n as script$1 } from './autocomplete-5Wwvp4c8.mjs';
import { n as script } from './floatlabel-BDqo8RCT.mjs';
import { t as toIsoDate } from './dates-C-BBx50j.mjs';
import { u as useApi } from './useApi-CGFzrxZs.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { u as useReferenceData } from './useReferenceData-DTHP3Dno.mjs';
import { n as script$2 } from './datepicker-BGpmmzow.mjs';
import { u as useOrderStore } from './order-C0FMsqTx.mjs';
import { M as MissingPanel_default } from './MissingPanel-BhvEJsLp.mjs';
import { u as useSelectionStore } from './selection-DbHVNc2X.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { defineStore } from 'pinia';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import 'nostics';
import 'nostics/formatters/ansi';
import 'unhead/utils';
import '../routes/renderer.mjs';
import '../_/nitro.mjs';
import 'node:https';
import 'node:crypto';
import 'node:module';
import 'node:http';
import 'node:events';
import 'node:buffer';
import '@primevue/core/base/style';
import '@primevue/core/basecomponent/style';
import '@primeuix/styles/autocomplete';
import '@primeuix/utils/object';
import '@primeuix/styles/cascadeselect';
import '@primeuix/styles/checkbox';
import '@primeuix/styles/checkboxgroup';
import '@primeuix/styles/colorpicker';
import '@primeuix/styles/datepicker';
import '@primeuix/styles/floatlabel';
import '@primeuix/styles/iconfield';
import '@primeuix/styles/iftalabel';
import '@primeuix/styles/inputchips';
import '@primeuix/styles/inputgroup';
import '@primeuix/styles/inputnumber';
import '@primeuix/styles/inputotp';
import '@primeuix/styles/inputtext';
import '@primeuix/styles/knob';
import '@primeuix/styles/listbox';
import '@primeuix/styles/multiselect';
import '@primeuix/styles/password';
import '@primeuix/styles/radiobutton';
import '@primeuix/styles/radiobuttongroup';
import '@primeuix/styles/rating';
import '@primeuix/styles/select';
import '@primeuix/styles/selectbutton';
import '@primeuix/styles/slider';
import '@primeuix/styles/textarea';
import '@primeuix/styles/togglebutton';
import '@primeuix/styles/toggleswitch';
import '@primeuix/styles/treeselect';
import '@primeuix/styles/button';
import '@primeuix/styles/buttongroup';
import '@primeuix/styles/speeddial';
import '@primeuix/styles/splitbutton';
import '@primeuix/styles/datatable';
import '@primeuix/styles/dataview';
import '@primeuix/styles/orderlist';
import '@primeuix/styles/organizationchart';
import '@primeuix/styles/paginator';
import '@primeuix/styles/picklist';
import '@primeuix/styles/tree';
import '@primeuix/styles/treetable';
import '@primeuix/styles/timeline';
import '@primeuix/styles/virtualscroller';
import '@primeuix/styles/accordion';
import '@primeuix/styles/card';
import '@primeuix/styles/divider';
import '@primeuix/styles/fieldset';
import '@primeuix/styles/panel';
import '@primeuix/styles/scrollpanel';
import '@primeuix/styles/splitter';
import '@primeuix/styles/stepper';
import '@primeuix/styles/tabview';
import '@primeuix/styles/tabs';
import '@primeuix/styles/toolbar';
import '@primeuix/styles/confirmdialog';
import '@primeuix/styles/confirmpopup';
import '@primeuix/styles/dialog';
import '@primeuix/styles/drawer';
import '@primeuix/styles/popover';
import '@primeuix/styles/fileupload';
import '@primeuix/styles/breadcrumb';
import '@primeuix/styles/contextmenu';
import '@primeuix/styles/dock';
import '@primeuix/styles/menu';
import '@primeuix/styles/menubar';
import '@primeuix/styles/megamenu';
import '@primeuix/styles/panelmenu';
import '@primeuix/styles/steps';
import '@primeuix/styles/tabmenu';
import '@primeuix/styles/tieredmenu';
import '@primeuix/styles/message';
import '@primeuix/styles/inlinemessage';
import '@primeuix/styles/toast';
import '@primeuix/styles/carousel';
import '@primeuix/styles/galleria';
import '@primeuix/styles/image';
import '@primeuix/styles/imagecompare';
import '@primeuix/styles/avatar';
import '@primeuix/styles/badge';
import '@primeuix/styles/blockui';
import '@primeuix/styles/chip';
import '@primeuix/styles/inplace';
import '@primeuix/styles/metergroup';
import '@primeuix/styles/overlaybadge';
import '@primeuix/styles/scrolltop';
import '@primeuix/styles/skeleton';
import '@primeuix/styles/progressbar';
import '@primeuix/styles/progressspinner';
import '@primeuix/styles/tag';
import '@primeuix/styles/terminal';
import '@primevue/forms/form/style';
import '@primevue/forms/formfield/style';
import '@primeuix/styles/tooltip';
import '@primeuix/styles/ripple';
import '@primeuix/styled';
import 'socket.io';
import 'jsonwebtoken';
import 'mssql';
import 'aws-sdk';
import 'body-parser';
import 'express';
import 'nodemailer';
import 'axios';
import 'xml2js';
import 'crypto';
import 'cookie-parser';
import 'node:fs';
import 'node:path';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@primeuix/utils/eventbus';
import 'vue-router';
import '@vue/shared';
import '@primeuix/utils';
import '@primeuix/styles/base';
import '@primeuix/utils/dom';
import './rolldown-runtime-D7D4PA-g.mjs';
import './basecomponent-CEvq-Ypu.mjs';
import './spinner-Bg9uPPDs.mjs';
import './baseicon-COIgioD1.mjs';
import './badge-Djy3ODAc.mjs';
import './ripple-BAuDWuPF.mjs';
import './basedirective-00hguNen.mjs';
import '@primeuix/utils/uuid';
import './utils-DLTV_uUI.mjs';
import './paginator-Xy7ujKDP.mjs';
import './angleleft-D6vOFyjM.mjs';
import './inputnumber-DEH2bm5F.mjs';
import './times-CPhkDIFg.mjs';
import './baseinput-SDS7K395.mjs';
import './baseeditableholder-y-Ph8z9F.mjs';
import './angledown-DbnE05CF.mjs';
import './angleup-Bp9xicZh.mjs';
import './angleright-DC6YOV01.mjs';
import './blank-BQmA3nuA.mjs';
import './check-CR3Cx6NX.mjs';
import './chevrondown-C7RD7jv8.mjs';
import './search-fCMh6s0Y.mjs';
import './iconfield-D2ODE-2Z.mjs';
import './inputicon-DEvfAPpy.mjs';
import './overlayeventbus-CNwdnFrZ.mjs';
import './portal-DQKNPUee.mjs';
import './virtualscroller-CALiPpRg.mjs';
import '@primeuix/utils/zindex';
import './chevronright-DpreV3r3.mjs';
import './bars-DE1IUcnH.mjs';
import './plus-CA09jZgn.mjs';
import './focustrap-kXXT0pga.mjs';
import './sortamountupalt-MmmjHcOR.mjs';
import './minus-C71kU5yE.mjs';
import './chip--BHyxaU9.mjs';
import './timescircle-0itGCn-i.mjs';
import './useLegacyApi-B5zRc7ig.mjs';
import './chevronleft-Dy82Mung.mjs';
import './chevronup-CFGDy7zv.mjs';
import './models-CeLtEMS4.mjs';

//#region app/stores/shipment.ts
var useShipmentStore = defineStore("shipment", {
	state: () => ({
		shipmentAmount: {
			order: 0,
			production: 0,
			remainder: 0
		},
		shipmentProductionList: [],
		shipmentSendProductionList: [],
		shipmentSendProductionTotal: {
			crate: 0,
			total: 0,
			amount: 0
		}
	}),
	getters: {
		getShipmentAmount: (state) => state.shipmentAmount,
		getShipmentProductionList: (state) => state.shipmentProductionList,
		getShipmentSendProductionList: (state) => state.shipmentSendProductionList,
		getShipmentSendProductionTotal: (state) => state.shipmentSendProductionTotal
	},
	actions: {
		async setShipmentOrderControl(po) {
			try {
				return (await useApi()(`/shipment/order/control/${po}`))?.po ?? null;
			} catch (err) {
				console.error("setShipmentOrderControl basarisiz:", err);
				return null;
			}
		},
		setShipmentSendProductionList() {
			this.shipmentSendProductionList = [];
		},
		async setShipmentAmount(product) {
			try {
				const res = await useApi()(`/shipment/product/amount/${product.SiparisNo}/${product.ID}/${product.UrunKartId}/${product.TedarikciID}`);
				const sayi = (v) => {
					const n = typeof v === "number" ? v : Number(v);
					return Number.isFinite(n) ? n : 0;
				};
				const order = sayi(res.order);
				const production = sayi(res.production);
				const remainder = Number.isFinite(Number(res.remainder)) ? Number(res.remainder) : order - production;
				this.shipmentAmount = {
					order: order.toFixed(4),
					production: production.toFixed(4),
					remainder: remainder.toFixed(4)
				};
				this.shipmentProductionList = res.productionList ?? [];
			} catch (err) {
				console.error("setShipmentAmount basarisiz:", err);
			}
		},
		setShipmentSendingProduction(products) {
			if (!products || !products.length) {
				console.warn("setShipmentSendingProduction: secili kasa yok, liste degistirilmedi.");
				return;
			}
			for (const item of products) {
				this.shipmentSendProductionTotal.total += item.TotalProduct ?? 0;
				this.shipmentSendProductionTotal.amount += item.Miktar;
				this.shipmentSendProductionList.push(item);
			}
			this.shipmentSendProductionTotal.crate += products.length;
		},
		setShipmentProductionDeleteList() {
			this.shipmentProductionList = [];
		},
		resetShipmentAmount() {
			this.shipmentAmount = {
				order: 0,
				production: 0,
				remainder: 0
			};
		},
		async setShipmentSave(products) {
			const toast = useAppToast();
			try {
				const api = useApi();
				if (!(await api("/shipment/products/save", {
					method: "POST",
					body: products
				})).status) return false;
				const mailed = await api("/shipment/products/save/mail", {
					method: "POST",
					body: products
				});
				if (mailed.status) toast.success("Mail Gönderildi");
				else toast.error("Mail Gönderme Başarısız");
				return mailed.status;
			} catch (err) {
				console.error("setShipmentSave basarisiz:", err);
				toast.error("Mail Gönderme Başarısız");
				return false;
			}
		},
		setShipmentSendProductionTotalCrateReset() {
			this.shipmentSendProductionTotal = {
				crate: 0,
				total: 0,
				amount: 0
			};
		}
	}
});
//#endregion
//#region app/components/shipment/Form.vue
var _sfc_main$1 = {
	props: { orders: {
		type: Array,
		required: true
	} },
	computed: {
		shipmentStore() {
			return useShipmentStore();
		},
		sharedStore() {
			return useSharedStore();
		},
		orderStore() {
			return useOrderStore();
		},
		selectionStore() {
			return useSelectionStore();
		}
	},
	data() {
		return {
			selectedProducts: null,
			selectedOrder: null,
			filteredOrders: null,
			forwardingDate: null,
			invoice: null,
			follow: 0,
			forwardingstatus: "normal",
			selectedProduct: null,
			save_button_disabled: false,
			sending_crate_button_disabled: true
		};
	},
	methods: {
		async ordersSelected(po) {
			this.sharedStore.setOrderProductionProductListNormal(po);
			this.clearForm();
			const control = await this.shipmentStore.setShipmentOrderControl(po);
			if (!control) {
				useAppToast().error("Sipariş bilgisi alınamadı, tekrar deneyiniz...");
				return;
			}
			const needsFreight = ![
				5,
				6,
				7
			].includes(control.TeslimTurID);
			const freightMissing = control.NavlunSatis == 0 || control.NavlunSatis == null || control.NavlunSatis == "" || control.NavlunSatis == void 0;
			if (needsFreight && freightMissing) useAppToast().error("Navlun satış bilgisi girilmeli.Girdikten Sonra Sayfayı Yenileyiniz!");
			this.save_button_disabled = false;
			this.sending_crate_button_disabled = false;
		},
		clearForm() {
			this.forwardingDate = null;
			this.invoice = null;
			this.follow = null;
			this.forwardingstatus = null;
			this.selectedProduct = null;
			this.selectedProducts = null;
			this.shipmentStore.resetShipmentAmount();
			this.shipmentStore.setShipmentProductionDeleteList();
			this.shipmentStore.setShipmentSendProductionList();
			this.shipmentStore.setShipmentSendProductionTotalCrateReset();
		},
		__getPriceControl(payload) {
			if (payload.SatisFiyati == 0 || payload.SatisFiyati == void 0 || payload.SatisFiyati == null || payload.SatisFiyati == "") {
				const supplier = this.sharedStore.getSupplierList.find((x) => x.ID == payload.TedarikciID);
				const supplierName = supplier ? supplier.FirmaAdi : "Tedarikçi";
				useAppToast().error(`${supplierName} ürünlerine satış fiyati girilmeli.Girdikten Sonra Sayfayı Yenileyiniz!`);
			}
			this.save_button_disabled = false;
			this.sending_crate_button_disabled = false;
		},
		reset() {
			this.selectedOrder = null;
			this.clearForm();
		},
		save() {
			if (this.sharedStore.getOrderProductionProductNormalList.length !== 0) {
				useAppToast().error("Gönderilmemiş Ürünler Mevcut. Kontrol edip tekrar dene...");
				return;
			}
			this.save_button_disabled = true;
			if (!this.selectedOrder) {
				useAppToast().error("Sipariş seçilmemiş, tekrar deneyiniz...");
				this.save_button_disabled = false;
				return;
			}
			if (!this.forwardingDate) {
				useAppToast().error("Sevkiyat tarihi girilmemiş, tekrar deneyiniz...");
				this.save_button_disabled = false;
				return;
			}
			if (this.invoice == "" || this.invoice == " " || this.invoice == null || this.invoice == void 0) {
				useAppToast().error("Fatura no girilmemiş, tekrar deneyiniz...");
				this.save_button_disabled = false;
				return;
			}
			if (this.forwardingstatus == "" || this.forwardingstatus == " " || this.forwardingstatus == null || this.forwardingstatus == void 0) {
				if (!confirm("Sevk türü seçilmemiş yine de sevk etmek istiyor musunuz?")) {
					this.save_button_disabled = false;
					return;
				}
			}
			this.submit();
		},
		async submit() {
			const data = this.shipmentStore.getShipmentSendProductionList;
			const userId = useCookie("userId").value;
			const shipDate = toIsoDate(this.forwardingDate);
			for (const item of data) {
				item.KullaniciId = userId;
				item.Tarih = shipDate;
				item.MusteriId = this.selectedOrder.MusteriID;
				item.SiparisNo = this.selectedOrder.SiparisNo;
			}
			if (await this.shipmentStore.setShipmentSave({
				data,
				MusteriID: this.selectedOrder.MusteriID,
				SiparisNo: this.selectedOrder.SiparisNo,
				FaturaNo: this.invoice,
				YuklemeTarihi: shipDate,
				SevkStatus: this.forwardingstatus,
				Takip: this.follow,
				KullaniciAdi: useCookie("username").value,
				mail: useCookie("mail").value
			})) {
				useAppToast().success("Başarıyla Sevk Edildi");
				this.orderStore.setOrderProductionList();
				this.save_button_disabled = false;
				this.reset();
			} else {
				useAppToast().error("Sevk Edilemedi");
				this.save_button_disabled = false;
			}
		},
		sendingCrate() {
			if (!this.selectedProduct) {
				useAppToast().error("Ürün seçilmelidir.");
				return;
			}
			this.shipmentStore.setShipmentSendingProduction(this.selectedProducts);
			this.shipmentStore.setShipmentProductionDeleteList();
			this.selectionStore.setSelectionProductionProductDelete(this.selectedProduct.ID);
			this.sharedStore.MUT_setShipmentDropProducts(this.selectedProduct.ID);
			this.sending_crate_button_disabled = true;
			this.selectedProducts = null;
		},
		productSelected(event) {
			this.shipmentStore.setShipmentAmount(event.value);
			this.sending_crate_button_disabled = false;
			this.__getPriceControl(event.value);
		},
		__benzersizSiparisler() {
			const gorulen = /* @__PURE__ */ new Set();
			const liste = [];
			for (const o of this.orders ?? []) {
				const no = o?.SiparisNo;
				if (!no || gorulen.has(no)) continue;
				gorulen.add(no);
				liste.push(o);
			}
			return liste;
		},
		searchOrders(event) {
			const benzersiz = this.__benzersizSiparisler();
			if (event.query.length == 0) {
				this.filteredOrders = benzersiz;
				return;
			}
			this.filteredOrders = benzersiz.filter((x) => x.SiparisNo.toLowerCase().startsWith(event.query.toLowerCase()));
		}
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_FloatLabel = script;
	const _component_AutoComplete = script$1;
	const _component_DatePicker = script$2;
	const _component_InputText = script$3;
	const _component_Checkbox = script$4;
	const _component_RadioButton = script$5;
	const _component_uploadMissingPanel = MissingPanel_default;
	const _component_Select = script$6;
	const _component_Button = script$7;
	const _component_DataTable = script$8;
	const _component_Column = script$9;
	_push(`<div${ssrRenderAttrs(_attrs)} data-v-aec997ab><div class="row mb-4" data-v-aec997ab><div class="col" data-v-aec997ab>`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedOrder,
					"onUpdate:modelValue": ($event) => $data.selectedOrder = $event,
					inputId: "order",
					suggestions: $data.filteredOrders,
					optionLabel: "SiparisNo",
					onComplete: ($event) => $options.searchOrders($event),
					onItemSelect: ($event) => $options.ordersSelected($event.value.SiparisNo)
				}, null, _parent, _scopeId));
				_push(`<label for="order" data-v-aec997ab${_scopeId}>Orders</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedOrder,
				"onUpdate:modelValue": ($event) => $data.selectedOrder = $event,
				inputId: "order",
				suggestions: $data.filteredOrders,
				optionLabel: "SiparisNo",
				onComplete: ($event) => $options.searchOrders($event),
				onItemSelect: ($event) => $options.ordersSelected($event.value.SiparisNo)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect"
			]), createVNode("label", { for: "order" }, "Orders")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col" data-v-aec997ab>`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_DatePicker, {
					modelValue: $data.forwardingDate,
					"onUpdate:modelValue": ($event) => $data.forwardingDate = $event,
					inputId: "forwardingdate",
					dateFormat: "dd/mm/yy"
				}, null, _parent, _scopeId));
				_push(`<label for="forwardingdate" data-v-aec997ab${_scopeId}>Shipment Date</label>`);
			} else return [createVNode(_component_DatePicker, {
				modelValue: $data.forwardingDate,
				"onUpdate:modelValue": ($event) => $data.forwardingDate = $event,
				inputId: "forwardingdate",
				dateFormat: "dd/mm/yy"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "forwardingdate" }, "Shipment Date")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col" data-v-aec997ab>`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "invoice",
					modelValue: $data.invoice,
					"onUpdate:modelValue": ($event) => $data.invoice = $event
				}, null, _parent, _scopeId));
				_push(`<label for="invoice" data-v-aec997ab${_scopeId}>Invoice No</label>`);
			} else return [createVNode(_component_InputText, {
				id: "invoice",
				modelValue: $data.invoice,
				"onUpdate:modelValue": ($event) => $data.invoice = $event
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "invoice" }, "Invoice No")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col" data-v-aec997ab><div class="flex align-items-center" data-v-aec997ab>`);
	_push(ssrRenderComponent(_component_Checkbox, {
		class: "me-1",
		inputId: "follow",
		modelValue: $data.follow,
		"onUpdate:modelValue": ($event) => $data.follow = $event,
		binary: ""
	}, null, _parent));
	_push(`<label for="follow" data-v-aec997ab> Track </label></div></div><div class="col" data-v-aec997ab><div class="flex align-items-center" data-v-aec997ab>`);
	_push(ssrRenderComponent(_component_RadioButton, {
		inputId: "shipNormal",
		modelValue: $data.forwardingstatus,
		"onUpdate:modelValue": ($event) => $data.forwardingstatus = $event,
		name: "forwardingstatus",
		value: "normal"
	}, null, _parent));
	_push(`<label for="shipNormal" class="ml-2" data-v-aec997ab>Regular Shipment</label></div><div class="flex align-items-center" data-v-aec997ab>`);
	_push(ssrRenderComponent(_component_RadioButton, {
		inputId: "shipFast",
		modelValue: $data.forwardingstatus,
		"onUpdate:modelValue": ($event) => $data.forwardingstatus = $event,
		name: "forwardingstatus",
		value: "fast"
	}, null, _parent));
	_push(`<label for="shipFast" class="ml-2" data-v-aec997ab>Fast Shipment</label></div></div></div>`);
	if ($data.selectedOrder) {
		_push(`<div class="row mb-4" data-v-aec997ab><div class="col" data-v-aec997ab>`);
		_push(ssrRenderComponent(_component_uploadMissingPanel, { po: $data.selectedOrder.SiparisNo }, null, _parent));
		_push(`</div></div>`);
	} else _push(`<!---->`);
	_push(`<div class="row mb-4" data-v-aec997ab><div class="col-3" data-v-aec997ab>`);
	_push(ssrRenderComponent(_component_Select, {
		modelValue: $data.selectedProduct,
		"onUpdate:modelValue": ($event) => $data.selectedProduct = $event,
		options: $options.sharedStore.getOrderProductionProductNormalList,
		optionLabel: "Aciklama",
		placeholder: "Select a Product",
		class: "w-100",
		onChange: ($event) => $options.productSelected($event)
	}, null, _parent));
	_push(`</div><div class="col-3" data-v-aec997ab>`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "orderamount",
					"model-value": $options.shipmentStore.getShipmentAmount.order,
					disabled: ""
				}, null, _parent, _scopeId));
				_push(`<label for="orderamount" data-v-aec997ab${_scopeId}>Order</label>`);
			} else return [createVNode(_component_InputText, {
				id: "orderamount",
				"model-value": $options.shipmentStore.getShipmentAmount.order,
				disabled: ""
			}, null, 8, ["model-value"]), createVNode("label", { for: "orderamount" }, "Order")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col-3" data-v-aec997ab>`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "forwardamount",
					"model-value": $options.shipmentStore.getShipmentAmount.production,
					disabled: ""
				}, null, _parent, _scopeId));
				_push(`<label for="forwardamount" data-v-aec997ab${_scopeId}>Shipped</label>`);
			} else return [createVNode(_component_InputText, {
				id: "forwardamount",
				"model-value": $options.shipmentStore.getShipmentAmount.production,
				disabled: ""
			}, null, 8, ["model-value"]), createVNode("label", { for: "forwardamount" }, "Shipped")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col-3" data-v-aec997ab>`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "remainderamount",
					"model-value": $options.shipmentStore.getShipmentAmount.remainder,
					disabled: ""
				}, null, _parent, _scopeId));
				_push(`<label for="remainderamount" data-v-aec997ab${_scopeId}>Remained</label>`);
			} else return [createVNode(_component_InputText, {
				id: "remainderamount",
				"model-value": $options.shipmentStore.getShipmentAmount.remainder,
				disabled: ""
			}, null, 8, ["model-value"]), createVNode("label", { for: "remainderamount" }, "Remained")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row mb-4" data-v-aec997ab><div class="col" data-v-aec997ab>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "success",
		class: "w-100",
		label: "Ship",
		onClick: $options.save,
		disabled: $data.save_button_disabled
	}, null, _parent));
	_push(`</div></div><div class="row mb-4" data-v-aec997ab><div class="col-12 col-lg-4" data-v-aec997ab>`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $options.shipmentStore.getShipmentProductionList,
		dataKey: "ID",
		selection: $data.selectedProducts,
		"onUpdate:selection": ($event) => $data.selectedProducts = $event,
		scrollable: true,
		scrollHeight: "400px",
		sortField: "KasaNo",
		sortOrder: 1
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					selectionMode: "multiple",
					headerStyle: "width: 2rem",
					header: "All",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "KasaNo",
					header: "Crate No",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Miktar",
					header: "Amount",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "BirimAdi",
					header: "Unit",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					selectionMode: "multiple",
					headerStyle: "width: 2rem",
					header: "All",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "KasaNo",
					header: "Crate No",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "Miktar",
					header: "Amount",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "BirimAdi",
					header: "Unit",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col-1" data-v-aec997ab>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		label: "Send Crate",
		onClick: $options.sendingCrate,
		disabled: $data.sending_crate_button_disabled
	}, null, _parent));
	_push(`</div><div class="col" data-v-aec997ab>`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $options.shipmentStore.getShipmentSendProductionList,
		scrollable: true,
		scrollHeight: "400px"
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "KasaNo",
					header: "Crate No",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "UrunAdi",
					header: "Product",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate($options.shipmentStore.getShipmentSendProductionTotal.crate)}`);
						else return [createTextVNode(toDisplayString($options.shipmentStore.getShipmentSendProductionTotal.crate), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "YuzeyIslemAdi",
					header: "Surface",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					header: "Size",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.En + "x" + slotProps.data.Boy + "x" + slotProps.data.Kenar)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.En + "x" + slotProps.data.Boy + "x" + slotProps.data.Kenar), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "BirimAdi",
					header: "Unit",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Miktar",
					header: "Amount",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($options.shipmentStore.getShipmentSendProductionTotal.amount))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($options.shipmentStore.getShipmentSendProductionTotal.amount)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "TotalProduct",
					header: "Total",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.TotalProduct))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.TotalProduct)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($options.shipmentStore.getShipmentSendProductionTotal.total))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($options.shipmentStore.getShipmentSendProductionTotal.total)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "KasaNo",
					header: "Crate No",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "UrunAdi",
					header: "Product",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					footer: withCtx(() => [createTextVNode(toDisplayString($options.shipmentStore.getShipmentSendProductionTotal.crate), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "YuzeyIslemAdi",
					header: "Surface",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					header: "Size",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.En + "x" + slotProps.data.Boy + "x" + slotProps.data.Kenar), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "BirimAdi",
					header: "Unit",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "Miktar",
					header: "Amount",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($options.shipmentStore.getShipmentSendProductionTotal.amount)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "TotalProduct",
					header: "Total",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.TotalProduct)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($options.shipmentStore.getShipmentSendProductionTotal.total)), 1)]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div></div></div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shipment/Form.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Form_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-aec997ab"]]), { __name: "ShipmentForm" });
//#endregion
//#region app/pages/operation/shipment.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ computed: { orderStore() {
	return useOrderStore();
} } }, {
	__name: "shipment",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const orderStore = useOrderStore();
		[__temp, __restore] = withAsyncContext(() => useAsyncData("operation-shipment", () => orderStore.setOrderProductionList(), { server: false })), await __temp, __restore();
		const shipmentSharedStore = useSharedStore();
		[__temp, __restore] = withAsyncContext(() => useReferenceData("operation-shipment-reference", [["supplierList", () => shipmentSharedStore.setSupplierList()]])), await __temp, __restore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ShipmentForm = Form_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_ShipmentForm, { orders: unref(orderStore).getOrderList }, null, _parent));
			_push(`</div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/operation/shipment.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=shipment-BnPrmifP.mjs.map
