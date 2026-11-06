import { u as useCookie, a as useAppToast, b as useAsyncData } from '../virtual/entry.mjs';
import { n as script } from './button-C8Z7Yc79.mjs';
import { t as toIsoDate } from './dates-C-BBx50j.mjs';
import { n as script$1 } from './dialog-BB6no0wu.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { u as useModelsStore } from './models-CeLtEMS4.mjs';
import { e as exportExcel } from './useExcelExport-B-DCkvaR.mjs';
import { u as useOrderStore } from './order-C0FMsqTx.mjs';
import { T as Table2_default } from './Table2-CD_kss_b.mjs';
import { F as Form_default } from './Form-DN5HyRj6.mjs';
import { u as useOrderReferenceData, W as WorkermanForm_default } from './useOrderReferenceData-C-Aooz5D.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
import 'pinia';
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
import './times-CPhkDIFg.mjs';
import './portal-DQKNPUee.mjs';
import './focustrap-kXXT0pga.mjs';
import './utils-9fKJJYP7.mjs';
import '@primeuix/utils/zindex';
import './useApi-CGFzrxZs.mjs';
import './useLegacyApi-B5zRc7ig.mjs';
import './column-CT6GXkG2.mjs';
import './datatable-D6ou7HZJ.mjs';
import './utils-DLTV_uUI.mjs';
import './paginator-Xy7ujKDP.mjs';
import './angleleft-D6vOFyjM.mjs';
import './select-T8LIeBQG.mjs';
import './blank-BQmA3nuA.mjs';
import './check-CR3Cx6NX.mjs';
import './chevrondown-C7RD7jv8.mjs';
import './search-fCMh6s0Y.mjs';
import './iconfield-D2ODE-2Z.mjs';
import './inputicon-DEvfAPpy.mjs';
import './baseinput-SDS7K395.mjs';
import './baseeditableholder-y-Ph8z9F.mjs';
import './inputtext-s6cxdqDx.mjs';
import './overlayeventbus-CNwdnFrZ.mjs';
import './virtualscroller-CALiPpRg.mjs';
import './inputnumber-DEH2bm5F.mjs';
import './angledown-DbnE05CF.mjs';
import './angleup-Bp9xicZh.mjs';
import './angleright-DC6YOV01.mjs';
import './chevronright-DpreV3r3.mjs';
import './bars-DE1IUcnH.mjs';
import './checkbox-wtvrQjx7.mjs';
import './minus-C71kU5yE.mjs';
import './radiobutton-C-685P7O.mjs';
import './plus-CA09jZgn.mjs';
import './sortamountupalt-MmmjHcOR.mjs';
import './autocomplete-5Wwvp4c8.mjs';
import './chip--BHyxaU9.mjs';
import './timescircle-0itGCn-i.mjs';
import './textarea-DHWHHqLi.mjs';
import './floatlabel-BDqo8RCT.mjs';
import './CustomInput-B9GfGXia.mjs';
import './datepicker-BGpmmzow.mjs';
import './chevronleft-Dy82Mung.mjs';
import './chevronup-CFGDy7zv.mjs';
import './tabpanel-DPLeP9v3.mjs';
import './tabview-BysloIbG.mjs';
import './Cards-D_Ydl_4N.mjs';
import './socket-AbqLYDWT.mjs';
import './card-D9W2BIHg.mjs';
import './useReferenceData-DTHP3Dno.mjs';
import './useFileService-Bon6d2kz.mjs';
import './fileupload-Q8ndBK5J.mjs';
import './message-DvSNQ9wF.mjs';
import './progressbar-BWtVAJVg.mjs';

//#region app/pages/mekmer/products/production.vue
var _sfc_main = /*@__PURE__*/ Object.assign({
	computed: {
		orderStore() {
			return useOrderStore();
		},
		modelsStore() {
			return useModelsStore();
		},
		sharedStore() {
			return useSharedStore();
		}
	},
	data() {
		return {
			production_detail_form: false,
			productionModel: {},
			productModel: {},
			workerman_dialog_form: false,
			productId: 0,
			selectedYear: null,
			selectedSupplier: null,
			suppliers: [
				{
					key: 0,
					name: "All"
				},
				{
					key: 1,
					name: "Mekmer"
				},
				{
					key: 2,
					name: "External"
				}
			],
			selectedSupplier: "All",
			marketings: [{
				key: 0,
				name: "All"
			}, {
				key: 1,
				name: "Mekmar"
			}],
			selectedMarketing: "All"
		};
	},
	methods: {
		isfDelete(event) {
			this.orderStore.setOrderProductionIsfDelete(event);
		},
		proformaDelete(id) {
			this.orderStore.setOrderProductionProformaDelete(id);
		},
		async excel_output() {
			try {
				await exportExcel("/excel-api/orders/uretim", this.orderStore.getOrderList, "Uretim_list.xlsx");
			} catch (err) {
				console.error("uretim listesi ciktisi basarisiz:", err);
				useAppToast().error("Excel olusturulamadi.");
			}
		},
		marketingChange(event) {
			if (this.selectedMarketing == "All") this.orderStore.MUT_setOrderList(this.orderStore.getOrderListAll);
			else {
				const datas = this.orderStore.getOrderListAll.filter((x) => x.FaturaKesimTurID == 1);
				this.orderStore.MUT_setOrderList(datas);
			}
		},
		supplierChange(event) {
			this.allProductionData = this.orderStore.getOrderList;
			if (this.selectedSupplier == "All") this.orderStore.MUT_setOrderList(this.orderStore.getOrderListAll);
			else if (this.selectedSupplier == "Mekmer") {
				this.filteredProductionStatus = true;
				const datas = this.orderStore.getOrderListAll.filter((x) => x.TedarikciID == 1 || x.TedarikciID == 123);
				this.orderStore.MUT_setOrderList(datas);
			} else if (this.selectedSupplier == "External") {
				this.filteredProductionStatus = true;
				const datas = this.orderStore.getOrderListAll.filter((x) => x.TedarikciID != 1 && x.TedarikciID != 123);
				this.orderStore.MUT_setOrderList(datas);
			}
		},
		yearChange(event) {
			if (event.value.Yil == "All") this.orderStore.setOrderProductionList();
			else this.orderStore.setOrderProductionListYear(event.value.Yil);
		},
		closeProductionForm() {
			const data = {
				po: this.orderStore.getOrderProductionPo,
				date: toIsoDate(/* @__PURE__ */ new Date()),
				username: useCookie("username").value,
				added: this.orderStore.getOrderProductAdded,
				updated: this.orderStore.getOrderProductUpdated,
				deleted: this.orderStore.getOrderProductDeleted,
				operation: this.productionModel.operationMail,
				representative: this.productionModel.representativeMail,
				status: 2,
				notchange: this.orderStore.getOrderProductionProductDetailNotChangeList,
				new: this.orderStore.getOrderProductionButtonStatus
			};
			if (confirm("Çıkmak istediğinize emin misiniz?")) {
				this.orderStore.setProductionProductSaveMail(data);
				this.production_detail_form = false;
			}
		},
		workermanSelected(event) {
			this.productId = event;
			const data = {
				productId: event,
				po: this.orderStore.getOrderProductionPo
			};
			this.orderStore.setProductionProductWorkermanList(data);
			this.workerman_dialog_form = true;
		},
		__stringCharacterChange(event) {
			const data = event.split("'");
			let value = "";
			data.forEach((x) => {
				value += x + "''";
			});
			return value.substring(0, value.length - 2);
		},
		update() {
			this.productionModel.FinansAciklama_2 = this.__stringCharacterChange(this.productionModel.FinansAciklama);
			this.productionModel.UretimAciklama_2 = this.__stringCharacterChange(this.productionModel.UretimAciklama);
			this.productionModel.SevkiyatAciklama_2 = this.__stringCharacterChange(this.productionModel.SevkiyatAciklama);
			this.productionModel.DetayAciklama_1_2 = this.__stringCharacterChange(this.productionModel.DetayAciklama_1);
			this.productionModel.DetayAciklama_2_2 = this.__stringCharacterChange(this.productionModel.DetayAciklama_2);
			this.productionModel.DetayAciklama_3_2 = this.__stringCharacterChange(this.productionModel.DetayAciklama_3);
			this.productionModel.DetayAciklama_4_2 = this.__stringCharacterChange(this.productionModel.DetayAciklama_4);
			this.productionModel.DetayMekmarNot_1_2 = this.__stringCharacterChange(this.productionModel.DetayMekmarNot_1);
			this.productionModel.DetayMekmarNot_2_2 = this.__stringCharacterChange(this.productionModel.DetayMekmarNot_2);
			this.productionModel.DetayMekmarNot_3_2 = this.__stringCharacterChange(this.productionModel.DetayMekmarNot_3);
			this.productionModel.SiparisKontrolEden = 0;
			this.orderStore.setOrderProductionUpdate({
				...this.productionModel,
				SiparisId: this.orderStore.getOrderProductionId
			});
		},
		save() {
			this.productionModel.FinansAciklama_2 = this.__stringCharacterChange(this.productionModel.FinansAciklama);
			this.productionModel.UretimAciklama_2 = this.__stringCharacterChange(this.productionModel.UretimAciklama);
			this.productionModel.SevkiyatAciklama_2 = this.__stringCharacterChange(this.productionModel.SevkiyatAciklama);
			this.productionModel.DetayAciklama_1_2 = this.__stringCharacterChange(this.productionModel.DetayAciklama_1);
			this.productionModel.DetayAciklama_2_2 = this.__stringCharacterChange(this.productionModel.DetayAciklama_2);
			this.productionModel.DetayAciklama_3_2 = this.__stringCharacterChange(this.productionModel.DetayAciklama_3);
			this.productionModel.DetayAciklama_4_2 = this.__stringCharacterChange(this.productionModel.DetayAciklama_4);
			this.productionModel.DetayMekmarNot_1_2 = this.__stringCharacterChange(this.productionModel.DetayMekmarNot_1);
			this.productionModel.DetayMekmarNot_2_2 = this.__stringCharacterChange(this.productionModel.DetayMekmarNot_2);
			this.productionModel.DetayMekmarNot_3_2 = this.__stringCharacterChange(this.productionModel.DetayMekmarNot_3);
			this.productionModel.SiparisKontrolEden = 0;
			this.orderStore.setOrderProductionSaveButtonStatus(true);
			this.productionModel.KayitTarihi = toIsoDate(/* @__PURE__ */ new Date());
			this.productionModel.KullaniciID = useCookie("userId").value;
			this.orderStore.setOrderProductionSave(this.productionModel);
			this.orderStore.setOrderProductionPo(this.productionModel.SiparisNo);
		},
		process() {
			if (this.orderStore.getOrderProductionButtonStatus) this.save();
			else this.update();
		},
		newForm() {
			this.orderStore.setOrderProductionButtonStatus(true);
			this.modelsStore.setOrderProductionModel();
			this.modelsStore.setOrderProductModel();
			this.orderStore.setOrderProductionDetailListReset();
			this.orderStore.setOrderProductionPo(null);
			this.orderStore.setOrderProductionUploadProformaButtonStatus(true);
			this.orderStore.MUT_setOrderSupplierProductList([]);
			this.orderStore.setOrderProductionSourceTypes();
			this.sharedStore.setOrderAllList();
			this.productionModel = this.modelsStore.getOrderProductionModel;
			this.production_detail_form = true;
		},
		productionSelected(event) {
			this.orderStore.setOrderProductionButtonStatus(false);
			this.modelsStore.setOrderProductModel();
			this.orderStore.setOrderProductionProductDetailMekmerList(event.SiparisNo);
			this.orderStore.setOrderProductionCostList(event.SiparisNo);
			this.orderStore.setOrderProductionSupplierList(event.SiparisNo);
			this.orderStore.setOrderProductionDocumentList(event.SiparisNo);
			this.orderStore.setOrderProductionCheckMekmerList(event.SiparisNo);
			this.orderStore.setOrderProductionFreightTotal(event.NavlunSatis);
			this.orderStore.setOrderProductionInsuranceTotal(event.sigorta_tutar_satis);
			this.orderStore.setOrderProductionSourceTypes();
			this.orderStore.setOrderProductionDetailTotal(event);
			this.orderStore.setOrderProductionProductDetailCostTotal(event);
			this.orderStore.setOrderProductionSaveButtonStatus(false);
			this.orderStore.setOrderProductionProductDetailNotChangeListReset();
			this.orderStore.setOrderProductionUploadProformaButtonStatus(false);
			this.orderStore.MUT_setOrderSupplierProductList([]);
			this.orderStore.setOrderProductionId(event.SiparisId);
			this.productionModel = event;
			this.orderStore.setOrderProductionPo(event.SiparisNo);
			this.production_detail_form = true;
		}
	},
	watch: { "orderStore.getOrderProductionYearsList"() {
		this.selectedYear = { Yil: (/* @__PURE__ */ new Date()).getFullYear() };
	} }
}, {
	__name: "production",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		[__temp, __restore] = withAsyncContext(() => useOrderReferenceData()), await __temp, __restore();
		const orderStore = useOrderStore();
		[__temp, __restore] = withAsyncContext(() => useAsyncData("mekmer-products-production", () => orderStore.setOrderProductionMekmerList(), { server: false })), await __temp, __restore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Button = script;
			const _component_OrderTable2 = Table2_default;
			const _component_Dialog = script$1;
			const _component_OrderDetailForm = Form_default;
			const _component_OrderDetailWorkermanForm = WorkermanForm_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><div class="row m-auto text-center"><div class="col-6">`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				severity: "success",
				class: "w-100",
				label: "New Order",
				onClick: _ctx.newForm
			}, null, _parent));
			_push(`</div><div class="col-6">`);
			_push(ssrRenderComponent(_component_Button, {
				severity: "warn",
				class: "w-100",
				label: "Excel",
				onClick: _ctx.excel_output
			}, null, _parent));
			_push(`</div></div>`);
			_push(ssrRenderComponent(_component_OrderTable2, {
				list: unref(orderStore).getOrderList,
				onProduction_selected_emit: ($event) => _ctx.productionSelected($event),
				status: "Production",
				total: unref(orderStore).getOrderProductionTotal
			}, null, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.production_detail_form,
				"onUpdate:visible": ($event) => _ctx.production_detail_form = $event,
				header: "",
				modal: "",
				style: { width: "100%" },
				breakpoints: {
					"1199px": "75vw",
					"575px": "90vw"
				},
				closeOnEscape: false,
				closable: false,
				maximizable: true
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_OrderDetailForm, {
						modelProduction: _ctx.productionModel,
						modelProduct: _ctx.modelsStore.getOrderProductModel,
						status: unref(orderStore).getOrderProductionButtonStatus,
						customer: _ctx.sharedStore.getCustomersList,
						user: _ctx.sharedStore.getUserList,
						productsList: unref(orderStore).getOrderProductionProductDetailList,
						supplier: _ctx.sharedStore.getSupplierList,
						unit: _ctx.sharedStore.getUnitList,
						po: unref(orderStore).getOrderProductionPo,
						delivery: _ctx.sharedStore.getOrderKindOfDeliveryList,
						payment: _ctx.sharedStore.getOrderKindOfPaymentList,
						country: _ctx.sharedStore.getCountryList,
						invoice: _ctx.sharedStore.getOrderKindOfInvoiceList,
						cost: unref(orderStore).getOrderProductionCostList,
						costTotal: unref(orderStore).getOrderProductionCostTotal,
						supplierDelivery: _ctx.sharedStore.getOrderKindOfDeliverySupplierList,
						productSupplier: unref(orderStore).getOrderProductionSupplierList,
						supplierProduct: unref(orderStore).getOrderSupplierProductList,
						document: unref(orderStore).getOrderProductionDocumentList,
						check: unref(orderStore).getOrderProductionCheckList,
						checkTotal: unref(orderStore).getOrderProductionCheckListTotal,
						productCalculation: unref(orderStore).getOrderProductionProductTotal,
						freightCalculation: unref(orderStore).getOrderProductionFreightTotal,
						detailCalculation: unref(orderStore).getOrderProductionDetailTotal,
						detailProductTotal: unref(orderStore).getOrderProductionProductDetailTotal,
						detailProductCost: unref(orderStore).getOrderProductionProductDetailCostTotal,
						saveButtonStatus: unref(orderStore).getOrderProductionSaveButtonStatus,
						proformaUploadButtonStatus: unref(orderStore).getOrderProductionUploadProformaButtonStatus,
						statusAlfa: true,
						onOrder_production_product_reset_model_emit: ($event) => _ctx.orderProductionProductResetModel($event),
						onProcess: _ctx.process,
						onWorkerman_selected_emit: ($event) => _ctx.workermanSelected($event),
						onClose_production_form_emit: _ctx.closeProductionForm,
						onProforma_delete_emit: ($event) => _ctx.proformaDelete($event),
						onIsf_delete_emit: ($event) => _ctx.isfDelete($event),
						source: unref(orderStore).getOrderProductionSourceTypes,
						insuranceCalculation: 0
					}, null, _parent, _scopeId));
					else return [createVNode(_component_OrderDetailForm, {
						modelProduction: _ctx.productionModel,
						modelProduct: _ctx.modelsStore.getOrderProductModel,
						status: unref(orderStore).getOrderProductionButtonStatus,
						customer: _ctx.sharedStore.getCustomersList,
						user: _ctx.sharedStore.getUserList,
						productsList: unref(orderStore).getOrderProductionProductDetailList,
						supplier: _ctx.sharedStore.getSupplierList,
						unit: _ctx.sharedStore.getUnitList,
						po: unref(orderStore).getOrderProductionPo,
						delivery: _ctx.sharedStore.getOrderKindOfDeliveryList,
						payment: _ctx.sharedStore.getOrderKindOfPaymentList,
						country: _ctx.sharedStore.getCountryList,
						invoice: _ctx.sharedStore.getOrderKindOfInvoiceList,
						cost: unref(orderStore).getOrderProductionCostList,
						costTotal: unref(orderStore).getOrderProductionCostTotal,
						supplierDelivery: _ctx.sharedStore.getOrderKindOfDeliverySupplierList,
						productSupplier: unref(orderStore).getOrderProductionSupplierList,
						supplierProduct: unref(orderStore).getOrderSupplierProductList,
						document: unref(orderStore).getOrderProductionDocumentList,
						check: unref(orderStore).getOrderProductionCheckList,
						checkTotal: unref(orderStore).getOrderProductionCheckListTotal,
						productCalculation: unref(orderStore).getOrderProductionProductTotal,
						freightCalculation: unref(orderStore).getOrderProductionFreightTotal,
						detailCalculation: unref(orderStore).getOrderProductionDetailTotal,
						detailProductTotal: unref(orderStore).getOrderProductionProductDetailTotal,
						detailProductCost: unref(orderStore).getOrderProductionProductDetailCostTotal,
						saveButtonStatus: unref(orderStore).getOrderProductionSaveButtonStatus,
						proformaUploadButtonStatus: unref(orderStore).getOrderProductionUploadProformaButtonStatus,
						statusAlfa: true,
						onOrder_production_product_reset_model_emit: ($event) => _ctx.orderProductionProductResetModel($event),
						onProcess: _ctx.process,
						onWorkerman_selected_emit: ($event) => _ctx.workermanSelected($event),
						onClose_production_form_emit: _ctx.closeProductionForm,
						onProforma_delete_emit: ($event) => _ctx.proformaDelete($event),
						onIsf_delete_emit: ($event) => _ctx.isfDelete($event),
						source: unref(orderStore).getOrderProductionSourceTypes,
						insuranceCalculation: 0
					}, null, 8, [
						"modelProduction",
						"modelProduct",
						"status",
						"customer",
						"user",
						"productsList",
						"supplier",
						"unit",
						"po",
						"delivery",
						"payment",
						"country",
						"invoice",
						"cost",
						"costTotal",
						"supplierDelivery",
						"productSupplier",
						"supplierProduct",
						"document",
						"check",
						"checkTotal",
						"productCalculation",
						"freightCalculation",
						"detailCalculation",
						"detailProductTotal",
						"detailProductCost",
						"saveButtonStatus",
						"proformaUploadButtonStatus",
						"onOrder_production_product_reset_model_emit",
						"onProcess",
						"onWorkerman_selected_emit",
						"onClose_production_form_emit",
						"onProforma_delete_emit",
						"onIsf_delete_emit",
						"source"
					])];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.workerman_dialog_form,
				"onUpdate:visible": ($event) => _ctx.workerman_dialog_form = $event,
				header: "",
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_OrderDetailWorkermanForm, {
						list: unref(orderStore).getOrderProductionProductDetailWorkermanList,
						model: _ctx.modelsStore.getOrderProductWorkermanModel,
						supplier: _ctx.sharedStore.getSupplierList,
						productId: _ctx.productId,
						po: unref(orderStore).getOrderProductionPo
					}, null, _parent, _scopeId));
					else return [createVNode(_component_OrderDetailWorkermanForm, {
						list: unref(orderStore).getOrderProductionProductDetailWorkermanList,
						model: _ctx.modelsStore.getOrderProductWorkermanModel,
						supplier: _ctx.sharedStore.getSupplierList,
						productId: _ctx.productId,
						po: unref(orderStore).getOrderProductionPo
					}, null, 8, [
						"list",
						"model",
						"supplier",
						"productId",
						"po"
					])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mekmer/products/production.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=production-CrgZh_S0.mjs.map
