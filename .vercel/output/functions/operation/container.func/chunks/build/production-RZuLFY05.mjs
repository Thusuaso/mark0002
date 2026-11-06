import { u as useCookie, a as useAppToast, b as useAsyncData } from '../virtual/entry.mjs';
import { n as script } from './button-C8Z7Yc79.mjs';
import { n as script$1 } from './radiobutton-C-685P7O.mjs';
import { t as toIsoDate } from './dates-C-BBx50j.mjs';
import { n as script$2 } from './dialog-BB6no0wu.mjs';
import { u as useLegacyApi } from './useLegacyApi-B5zRc7ig.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { u as useSocketStore } from './socket-AbqLYDWT.mjs';
import { u as useModelsStore } from './models-CeLtEMS4.mjs';
import { e as exportExcel } from './useExcelExport-B-DCkvaR.mjs';
import { u as useOrderStore } from './order-C0FMsqTx.mjs';
import { u as useRealtime } from './Cards-D_Ydl_4N.mjs';
import { F as Form_default } from './Form-DN5HyRj6.mjs';
import { b as useCostStore, u as useOrderReferenceData, W as WorkermanForm_default } from './useOrderReferenceData-C-Aooz5D.mjs';
import { T as Table_default } from './Table-DjukAIQg.mjs';
import { D as DivideDialog_default } from './DivideDialog-CmyUrlOr.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
import './baseinput-SDS7K395.mjs';
import './baseeditableholder-y-Ph8z9F.mjs';
import './times-CPhkDIFg.mjs';
import './portal-DQKNPUee.mjs';
import './focustrap-kXXT0pga.mjs';
import './utils-9fKJJYP7.mjs';
import '@primeuix/utils/zindex';
import './useApi-CGFzrxZs.mjs';
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
import './card-D9W2BIHg.mjs';
import './useReferenceData-DTHP3Dno.mjs';
import './useFileService-Bon6d2kz.mjs';
import './fileupload-Q8ndBK5J.mjs';
import './message-DvSNQ9wF.mjs';
import './progressbar-BWtVAJVg.mjs';
import './tag-CObxgYIW.mjs';

//#region app/pages/orders/production.vue
var _sfc_main = /*@__PURE__*/ Object.assign({
	setup() {
		useOrderStore();
		useRealtime();
	},
	computed: {
		orderStore() {
			return useOrderStore();
		},
		costStore() {
			return useCostStore();
		},
		modelsStore() {
			return useModelsStore();
		},
		sharedStore() {
			return useSharedStore();
		},
		socketStore() {
			return useSocketStore();
		}
	},
	data() {
		return {
			oldOrderPayload: {},
			divide_dialog_form: false,
			production_detail_form: false,
			productionModel: {},
			productModel: {},
			workerman_dialog_form: false,
			productId: 0,
			selectedYear: null,
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
		divide() {
			this.divide_dialog_form = true;
		},
		divided() {
			this.production_detail_form = false;
			this.orderStore.setOrderProductionList();
		},
		drawingDelete(event) {
			useLegacyApi().get(`/production/drawing/delete/${event}`).then((res) => {
				if (res.data.status) {
					useAppToast().success("Drawing deleted successfully");
					this.orderStore.MUT_setOrderProductionProformaDelete(event);
				} else useAppToast().error("Error while deleting drawing");
			});
		},
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
				if (this.$route.path == "/orders/production") this.orderStore.setOrderProductionList();
				else if (this.$route.path == "/orders/waiting") this.orderStore.setOrderWaitingList();
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
			if (this.productionModel.SiparisNo == null || this.productionModel.SiparisNo == "" || this.productionModel.SiparisNo == " " || this.productionModel.SiparisNo == void 0) {
				alert("Po name is missing");
				return;
			}
			if (this.productionModel.OdemeTurID == null || this.productionModel.OdemeTurID == "" || this.productionModel.OdemeTurID == " " || this.productionModel.OdemeTurID == void 0 || this.productionModel.OdemeTurID == 0) {
				alert("Payment Term is missing");
				return;
			}
			if (this.productionModel.Operasyon == null || this.productionModel.Operasyon == "" || this.productionModel.Operasyon == " " || this.productionModel.Operasyon == void 0 || this.productionModel.Operasyon == 0) {
				alert("Operation is missing");
				return;
			}
			if (this.productionModel.SiparisSahibi == null || this.productionModel.SiparisSahibi == "" || this.productionModel.SiparisSahibi == " " || this.productionModel.SiparisSahibi == void 0 || this.productionModel.SiparisSahibi == 0) {
				alert("Representative is missing");
				return;
			}
			if (this.productionModel.UlkeId == null || this.productionModel.UlkeId == "" || this.productionModel.UlkeId == " " || this.productionModel.UlkeId == void 0 || this.productionModel.UlkeId == 0) {
				alert("Country is missing");
				return;
			}
			if (this.productionModel.MusteriID == null || this.productionModel.MusteriID == "" || this.productionModel.MusteriID == " " || this.productionModel.MusteriID == void 0 || this.productionModel.MusteriID == 0) {
				alert("Customer is missing");
				return;
			}
			if (this.productionModel.Finansman == null || this.productionModel.Finansman == "" || this.productionModel.Finansman == " " || this.productionModel.Finansman == void 0 || this.productionModel.Finansman == 0) {
				alert("Finansman is missing");
				return;
			}
			if (this.productionModel.TeslimTurID == null || this.productionModel.TeslimTurID == "" || this.productionModel.TeslimTurID == " " || this.productionModel.TeslimTurID == void 0 || this.productionModel.TeslimTurID == 0) {
				alert("Delivery Term is missing");
				return;
			}
			if (this.productionModel.FaturaKesimTurID == null || this.productionModel.FaturaKesimTurID == "" || this.productionModel.FaturaKesimTurID == " " || this.productionModel.FaturaKesimTurID == void 0 || this.productionModel.FaturaKesimTurID == 0) {
				alert("Invoice Type is missing");
				return;
			}
			if (this.productionModel.SiparisTarihi == null || this.productionModel.SiparisTarihi == "" || this.productionModel.SiparisTarihi == " " || this.productionModel.SiparisTarihi == void 0 || this.productionModel.SiparisTarihi == 0) {
				alert("Order date is missing");
				return;
			}
			if (this.productionModel.TahminiYuklemeTarihi == null || this.productionModel.TahminiYuklemeTarihi == "" || this.productionModel.TahminiYuklemeTarihi == " " || this.productionModel.TahminiYuklemeTarihi == void 0 || this.productionModel.TahminiYuklemeTarihi == 0) {
				alert("Estimated date is missing");
				return;
			}
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
			this.productionModel.SiparisKontrolEden = useCookie("userId").value;
			this.orderStore.setOrderProductionUpdate({
				...this.productionModel,
				SiparisId: this.orderStore.getOrderProductionId
			});
			this.costControlUpdate(this.productionModel, { ...this.oldOrderPayload });
		},
		__zeroControl(event) {
			if (event.toString().length == 1) return "0" + event.toString();
			else return event.toString();
		},
		async save() {
			if (this.productionModel.SiparisNo == null || this.productionModel.SiparisNo == "" || this.productionModel.SiparisNo == " " || this.productionModel.SiparisNo == void 0) {
				alert("Po name is missing");
				return;
			}
			if (this.productionModel.OdemeTurID == null || this.productionModel.OdemeTurID == "" || this.productionModel.OdemeTurID == " " || this.productionModel.OdemeTurID == void 0 || this.productionModel.OdemeTurID == 0) {
				alert("Payment Term is missing");
				return;
			}
			if (this.productionModel.Operasyon == null || this.productionModel.Operasyon == "" || this.productionModel.Operasyon == " " || this.productionModel.Operasyon == void 0 || this.productionModel.Operasyon == 0) {
				alert("Operation is missing");
				return;
			}
			if (this.productionModel.SiparisSahibi == null || this.productionModel.SiparisSahibi == "" || this.productionModel.SiparisSahibi == " " || this.productionModel.SiparisSahibi == void 0 || this.productionModel.SiparisSahibi == 0) {
				alert("Representative is missing");
				return;
			}
			if (this.productionModel.UlkeId == null || this.productionModel.UlkeId == "" || this.productionModel.UlkeId == " " || this.productionModel.UlkeId == void 0 || this.productionModel.UlkeId == 0) {
				alert("Country is missing");
				return;
			}
			if (this.productionModel.MusteriID == null || this.productionModel.MusteriID == "" || this.productionModel.MusteriID == " " || this.productionModel.MusteriID == void 0 || this.productionModel.MusteriID == 0) {
				alert("Customer is missing");
				return;
			}
			if (this.productionModel.Finansman == null || this.productionModel.Finansman == "" || this.productionModel.Finansman == " " || this.productionModel.Finansman == void 0 || this.productionModel.Finansman == 0) {
				alert("Finansman is missing");
				return;
			}
			if (this.productionModel.TeslimTurID == null || this.productionModel.TeslimTurID == "" || this.productionModel.TeslimTurID == " " || this.productionModel.TeslimTurID == void 0 || this.productionModel.TeslimTurID == 0) {
				alert("Delivery Term is missing");
				return;
			}
			if (this.productionModel.FaturaKesimTurID == null || this.productionModel.FaturaKesimTurID == "" || this.productionModel.FaturaKesimTurID == " " || this.productionModel.FaturaKesimTurID == void 0 || this.productionModel.FaturaKesimTurID == 0) {
				alert("Invoice Type is missing");
				return;
			}
			if (this.productionModel.SiparisTarihi == null || this.productionModel.SiparisTarihi == "" || this.productionModel.SiparisTarihi == " " || this.productionModel.SiparisTarihi == void 0 || this.productionModel.SiparisTarihi == 0) {
				alert("Order date is missing");
				return;
			}
			if (this.productionModel.TahminiYuklemeTarihi == null || this.productionModel.TahminiYuklemeTarihi == "" || this.productionModel.TahminiYuklemeTarihi == " " || this.productionModel.TahminiYuklemeTarihi == void 0 || this.productionModel.TahminiYuklemeTarihi == 0) {
				alert("Estimated date is missing");
				return;
			}
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
			this.productionModel.KayitTarihi = toIsoDate(/* @__PURE__ */ new Date());
			this.productionModel.KullaniciID = useCookie("userId").value;
			this.orderStore.setOrderProductionSaveButtonStatus(true);
			await this.orderStore.setOrderProductionSave(this.productionModel);
			this.socketStore.getSocket.emit("production_save_emit");
			this.orderStore.setOrderProductionPo(this.productionModel.SiparisNo);
			this.costControlAdd(this.productionModel);
		},
		costControlAdd(payload) {
			const user = useCookie("username").value;
			const po = payload.SiparisNo;
			const date = /* @__PURE__ */ new Date();
			const customer = payload.MusteriAdi;
			const seller = payload.SiparisSahibiAdi;
			const operation = payload.OperasyonAdi;
			const finansman = payload.FinansmanAdi;
			const prePayment = payload.Pesinat;
			const maturity = payload.Vade;
			const country = payload.Ulke;
			const paymetDesc = payload.OdemeAciklama;
			const containerDesc = payload.KonteynerAyrinti;
			const commission = payload.Komisyon;
			const refund = payload.Iade;
			const productionDesc = payload.UretimAciklama;
			const shippedDesc = payload.SevkiyatAciklama;
			const financeDesc = payload.FinansAciklama;
			const freightSelling = payload.NavlunSatis;
			const freightSellingCompany = payload.NavlunFirma;
			const detail1 = payload.DetayTutar_1;
			const detail1Desc = payload.DetayAciklama_1;
			const detail2 = payload.DetayTutar_2;
			const detail2Desc = payload.DetayAciklama_2;
			const insuranceSelling = payload.sigorta_tutar_satis;
			const freightBuying = payload.NavlunAlis;
			const freightBuyingDesc = payload.DetayMekmarNot_1;
			const detail1Buying = payload.DetayAlis_1;
			const detail1BuyingDesc = payload.DetayMekmarNot_2;
			const detail2Buying = payload.DetayAlis_2;
			const detail2BuyingDesc = payload.DetayMekmarNot_3;
			const insuranceBuying = payload.sigorta_Tutar;
			const paymentKind = payload.OdemeTur;
			const shippedKind = payload.TeslimTur;
			const invoiceKind = payload.FaturaKesimTurAdi;
			if (po == null || po == "" || po == " " || po == void 0 || po == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po su sipariş olarak eklenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (customer == null || customer == "" || customer == " " || customer == void 0 || customer == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe " + customer + " müşteri olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (seller == null || seller == "" || seller == " " || seller == void 0 || seller == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe " + seller + " satış temsilci olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (operation == null || operation == "" || operation == " " || operation == void 0 || operation == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe " + operation + " operasyoncu olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (finansman == null || finansman == "" || finansman == " " || finansman == void 0 || finansman == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe " + finansman + " finansman olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (prePayment == null || prePayment == "" || prePayment == " " || prePayment == void 0 || prePayment == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe $" + prePayment + " pesinat olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (maturity == null || maturity == "" || maturity == " " || maturity == void 0 || maturity == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe " + maturity + " vade olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (country == null || country == "" || country == " " || country == void 0 || country == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe " + country + " ülke olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (paymetDesc == null || paymetDesc == "" || paymetDesc == " " || paymetDesc == void 0 || paymetDesc == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe ~" + paymetDesc + "~ ödeme açıklaması olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (containerDesc == null || containerDesc == "" || containerDesc == " " || containerDesc == void 0 || containerDesc == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe ~" + containerDesc + "~ konteyner ayrıntı olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (commission == null || commission == "" || commission == " " || commission == void 0 || commission == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe $" + commission + " komisyon olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (refund == null || refund == "" || refund == " " || refund == void 0 || refund == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe $" + refund + " iade olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (productionDesc == null || productionDesc == "" || productionDesc == " " || productionDesc == void 0 || productionDesc == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe ~" + productionDesc + "~ üretim açıklaması olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (shippedDesc == null || shippedDesc == "" || shippedDesc == " " || shippedDesc == void 0 || shippedDesc == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe ~" + shippedDesc + "~ sevkiyat açıklaması olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (financeDesc == null || financeDesc == "" || financeDesc == " " || financeDesc == void 0 || financeDesc == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe ~" + financeDesc + "~ finans açıklaması olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (freightSelling == null || freightSelling == "" || freightSelling == " " || freightSelling == void 0 || freightSelling == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe $" + freightSelling + " navlun satış fiyatı olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (freightSellingCompany == null || freightSellingCompany == "" || freightSellingCompany == " " || freightSellingCompany == void 0 || freightSellingCompany == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe ~" + freightSellingCompany + "~ navlun satış açıklama olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (detail1 == null || detail1 == "" || detail1 == " " || detail1 == void 0 || detail1 == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe $" + detail1 + " detay 1 satış fiyatı olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (detail2 == null || detail2 == "" || detail2 == " " || detail2 == void 0 || detail2 == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe $" + detail2 + " detay 2 satış fiyatı olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (detail1Desc == null || detail1Desc == "" || detail1Desc == " " || detail1Desc == void 0 || detail1Desc == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe ~" + detail1Desc + "~ detay 1 satış açıklama olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (detail2Desc == null || detail2Desc == "" || detail2Desc == " " || detail2Desc == void 0 || detail2Desc == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe ~" + detail2Desc + "~ detay 2 satış açıklama olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (insuranceSelling == null || insuranceSelling == "" || insuranceSelling == " " || insuranceSelling == void 0 || insuranceSelling == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe $" + insuranceSelling + " sigorta satış olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (freightBuying == null || freightBuying == "" || freightBuying == " " || freightBuying == void 0 || freightBuying == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe $" + freightBuying + " navlun alış fiyatı olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (freightBuyingDesc == null || freightBuyingDesc == "" || freightBuyingDesc == " " || freightBuyingDesc == void 0 || freightBuyingDesc == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe ~" + freightBuyingDesc + "~ navlun alış açıklama olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (detail1Buying == null || detail1Buying == "" || detail1Buying == " " || detail1Buying == void 0 || detail1Buying == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe $" + detail1Buying + " detay 1 alış fiyatı olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (detail2Buying == null || detail2Buying == "" || detail2Buying == " " || detail2Buying == void 0 || detail2Buying == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe $" + detail2Buying + " detay 2 alış fiyatı olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (detail1BuyingDesc == null || detail1BuyingDesc == "" || detail1BuyingDesc == " " || detail1BuyingDesc == void 0 || detail1BuyingDesc == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe ~" + detail1BuyingDesc + "~ detay 1 alış açıklama olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (detail2BuyingDesc == null || detail2BuyingDesc == "" || detail2BuyingDesc == " " || detail2BuyingDesc == void 0 || detail2BuyingDesc == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe ~" + detail2BuyingDesc + "~ detay 1 alış açıklama olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (insuranceBuying == null || insuranceBuying == "" || insuranceBuying == " " || insuranceBuying == void 0 || insuranceBuying == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe $" + insuranceBuying + " sigorta alış olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (paymentKind == null || paymentKind == "" || paymentKind == " " || paymentKind == void 0 || paymentKind == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe ~" + paymentKind + "~ ödeme tür olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (shippedKind == null || shippedKind == "" || shippedKind == " " || shippedKind == void 0 || shippedKind == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe ~" + shippedKind + "~ yükleme tür olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			if (invoiceKind == null || invoiceKind == "" || invoiceKind == " " || invoiceKind == void 0 || invoiceKind == 0) ; else {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişe ~" + invoiceKind + "~ fatura tür olarak girilmiştir."
				};
				this.costStore.addCost(data);
			}
			useLegacyApi().post("/production/add/cost/list", this.costStore.getCostList);
			this.costStore.resetCostList();
		},
		costControlUpdate(newList, oldList) {
			const user = useCookie("username").value;
			const po = oldList.SiparisNo;
			const date = /* @__PURE__ */ new Date();
			const newCustomer = newList.MusteriAdi;
			const newSeller = newList.SiparisSahibiAdi;
			const newOperation = newList.OperasyonAdi;
			const newFinansman = newList.FinansmanAdi;
			const newPrePayment = newList.Pesinat;
			const newMaturity = newList.Vade;
			const newCountry = newList.Ulke;
			const newPaymetDesc = newList.OdemeAciklama;
			const newContainerDesc = newList.KonteynerAyrinti;
			const newCommission = newList.Komisyon;
			const newRefund = newList.Iade;
			const newProductionDesc = newList.UretimAciklama;
			const newShippedDesc = newList.SevkiyatAciklama;
			const newFinanceDesc = newList.FinansAciklama;
			const newFreightSelling = newList.NavlunSatis;
			const newFreightSellingCompany = newList.NavlunFirma;
			const newDetail1 = newList.DetayTutar_1;
			const newDetail1Desc = newList.DetayAciklama_1;
			const newDetail2 = newList.DetayTutar_2;
			const newDetail2Desc = newList.DetayAciklama_2;
			const newInsuranceSelling = newList.sigorta_tutar_satis;
			const newFreightBuying = newList.NavlunAlis;
			const newFreightBuyingDesc = newList.DetayMekmarNot_1;
			const newDetail1Buying = newList.DetayAlis_1;
			const newDetail1BuyingDesc = newList.DetayMekmarNot_2;
			const newDetail2Buying = newList.DetayAlis_2;
			const newDetail2BuyingDesc = newList.DetayMekmarNot_3;
			const newInsuranceBuying = newList.sigorta_Tutar;
			const newPaymentKind = newList.OdemeTur;
			const newShippedKind = newList.TeslimTur;
			const newInvoiceKind = newList.FaturaKesimTurAdi;
			const oldCustomer = oldList.MusteriAdi;
			const oldSeller = oldList.SiparisSahibiAdi;
			const oldOperation = oldList.OperasyonAdi;
			const oldFinansman = oldList.FinansmanAdi;
			const oldPrePayment = oldList.Pesinat;
			const oldMaturity = oldList.Vade;
			const oldCountry = oldList.Ulke;
			const oldPaymetDesc = oldList.OdemeAciklama;
			const oldContainerDesc = oldList.KonteynerAyrinti;
			const oldCommission = oldList.Komisyon;
			const oldRefund = oldList.Iade;
			const oldProductionDesc = oldList.UretimAciklama;
			const oldShippedDesc = oldList.SevkiyatAciklama;
			const oldFinanceDesc = oldList.FinansAciklama;
			const oldFreightSelling = oldList.NavlunSatis;
			const oldFreightSellingCompany = oldList.NavlunFirma;
			const oldDetail1 = oldList.DetayTutar_1;
			const oldDetail1Desc = oldList.DetayAciklama_1;
			const oldDetail2 = oldList.DetayTutar_2;
			const oldDetail2Desc = oldList.DetayAciklama_2;
			const oldInsuranceSelling = oldList.sigorta_tutar_satis;
			const oldFreightBuying = oldList.NavlunAlis;
			const oldFreightBuyingDesc = oldList.DetayMekmarNot_1;
			const oldDetail1Buying = oldList.DetayAlis_1;
			const oldDetail1BuyingDesc = oldList.DetayMekmarNot_2;
			const oldDetail2Buying = oldList.DetayAlis_2;
			const oldDetail2BuyingDesc = oldList.DetayMekmarNot_3;
			const oldInsuranceBuying = oldList.sigorta_Tutar;
			const oldPaymentKind = oldList.OdemeTur;
			const oldShippedKind = oldList.TeslimTur;
			const oldInvoiceKind = oldList.FaturaKesimTurAdi;
			if (newCustomer != oldCustomer) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin müşteri bilgisi " + oldCustomer + " dan => " + newCustomer + " olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newSeller != oldSeller) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin siparişçi bilgisi " + oldSeller + " dan => " + newSeller + " olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newOperation != oldOperation) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin operasyon bilgisi " + oldOperation + " dan => " + newOperation + " olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newFinansman != oldFinansman) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin finansman bilgisi " + oldFinansman + " dan => " + newFinansman + " olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newPrePayment != oldPrePayment) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin pesinat bilgisi $" + oldPrePayment + " dan => $" + newPrePayment + " olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newMaturity != oldMaturity) {
				if (newMaturity == null || oldMaturity == null) ; else {
					const data = {
						date,
						user,
						po,
						desc: po + " po sahip siparişinin vade tarihi " + oldMaturity + " dan => " + newMaturity + " olarak güncellenmiştir."
					};
					this.costStore.addCost(data);
				}
			}
			if (newCountry != oldCountry) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin ülke bilgisi " + oldCountry + " dan => " + newCountry + " olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newPaymetDesc != oldPaymetDesc) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin ödeme bilgisi ~" + oldPaymetDesc + "~ dan => ~" + newPaymetDesc + "~ olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newContainerDesc != oldContainerDesc) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin konteyner bilgisi ~" + oldContainerDesc + "~ dan => ~" + newContainerDesc + "~ olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newCommission != oldCommission) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin komisyon bilgisi $" + oldCommission + " dan => $" + newCommission + " olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newRefund != oldRefund) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin iade bilgisi $" + oldRefund + " dan => $" + newRefund + " olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newProductionDesc != oldProductionDesc) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin ürün üretimi bilgisi ~" + oldProductionDesc + "~ dan => ~" + newProductionDesc + "~ olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newShippedDesc != oldShippedDesc) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin teslim bilgisi ~" + oldShippedDesc + "~ dan => ~" + newShippedDesc + "~ olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newFinanceDesc != oldFinanceDesc) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin finans açıklama bilgisi ~" + oldFinanceDesc + "~ dan => ~" + newFinanceDesc + "~ olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newFreightSelling != oldFreightSelling) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin navlun satış bilgisi $" + oldFreightSelling + "dan => $" + newFreightSelling + " olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newFreightSellingCompany != oldFreightSellingCompany) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin navlun satış şirketi ~" + oldFreightSellingCompany + "~ dan => ~" + newFreightSellingCompany + "~ olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newDetail1 != oldDetail1) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin detay 1 satış $" + oldDetail1 + "~ dan => $" + newDetail1 + "~ olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newDetail1Desc != oldDetail1Desc) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin detay 1 satış açıklama ~" + oldDetail1Desc + "~ dan => ~" + newDetail1Desc + "~ olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newDetail2 != oldDetail2) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin detay 2 satış $" + oldDetail2 + " dan => $" + newDetail2 + " olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newDetail2Desc != oldDetail2Desc) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin detay 2 satış açıklama ~" + oldDetail2Desc + "~ dan => ~" + newDetail2Desc + "~ olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newInsuranceSelling != oldInsuranceSelling) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin sigorta satış $" + oldInsuranceSelling + " dan => $" + newInsuranceSelling + " olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newFreightBuying != oldFreightBuying) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin navlun alış $" + oldFreightBuying + " dan => $" + newFreightBuying + " olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newFreightBuyingDesc != oldFreightBuyingDesc) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin navlun alış açıklama ~" + oldFreightBuyingDesc + "~ dan => ~" + newFreightBuyingDesc + "~ olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newDetail1Buying != oldDetail1Buying) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin detay 1 alış $" + oldDetail1Buying + " dan => $" + newDetail1Buying + " olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newDetail1BuyingDesc != oldDetail1BuyingDesc) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin detay 1 alış açıklama ~" + oldDetail1BuyingDesc + "~ dan => ~" + newDetail1BuyingDesc + "~ olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newDetail2Buying != oldDetail2Buying) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin detay 2 alış $" + oldDetail2Buying + " dan => $" + newDetail2Buying + " olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newDetail2BuyingDesc != oldDetail2BuyingDesc) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin detay 2 alış açıklama ~" + oldDetail2BuyingDesc + "~ dan => ~" + newDetail2BuyingDesc + "~ olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newInsuranceBuying != oldInsuranceBuying) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin sigorta alış $" + oldInsuranceBuying + " dan => $" + newInsuranceBuying + " olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newPaymentKind != oldPaymentKind) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin ödeme türü ~" + oldPaymentKind + "~ dan => ~" + newPaymentKind + "~ olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newShippedKind != oldShippedKind) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin gönderim türü ~" + oldShippedKind + "~ dan => ~" + newShippedKind + "~ olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			if (newInvoiceKind != oldInvoiceKind) {
				const data = {
					date,
					user,
					po,
					desc: po + " po sahip siparişinin fatura türü ~" + oldInvoiceKind + "~ dan => ~" + newInvoiceKind + "~ olarak güncellenmiştir."
				};
				this.costStore.addCost(data);
			}
			useLegacyApi().post("/production/add/cost/list", this.costStore.getCostList);
			this.costStore.resetCostList();
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
			this.orderStore.setOrderProductionSourceTypes();
			this.orderStore.MUT_setOrderSupplierProductList([]);
			this.sharedStore.setOrderAllList();
			this.productionModel = this.modelsStore.getOrderProductionModel;
			this.production_detail_form = true;
		},
		productionSelected(event) {
			this.orderStore.setOrderProductionButtonStatus(false);
			this.modelsStore.setOrderProductModel();
			this.orderStore.setOrderProductionProductDetailList(event.SiparisNo);
			this.orderStore.setOrderProductionCostList(event.SiparisNo);
			this.orderStore.setOrderProductionSupplierList(event.SiparisNo);
			this.orderStore.setOrderProductionDocumentList(event.SiparisNo);
			this.orderStore.setOrderProductionCheckList(event.SiparisNo);
			this.orderStore.setOrderProductionFreightTotal(event.NavlunSatis);
			this.orderStore.setOrderProductionSourceTypes();
			this.orderStore.setOrderProductionInsuranceTotal(event.sigorta_tutar_satis);
			this.orderStore.setOrderProductionDetailTotal(event);
			this.orderStore.setOrderProductionProductDetailCostTotal(event);
			this.orderStore.setOrderProductionSaveButtonStatus(false);
			this.orderStore.setOrderProductionProductDetailNotChangeListReset();
			this.orderStore.setOrderProductionUploadProformaButtonStatus(false);
			this.orderStore.MUT_setOrderSupplierProductList([]);
			this.orderStore.setOrderProductionId(event.SiparisId);
			this.productionModel = event;
			this.orderStore.setOrderProductionPo(event.SiparisNo);
			this.orderStore.setOrderProductionCustomer(event.FirmaAdi);
			this.production_detail_form = true;
			this.oldOrderPayload = { ...event };
			this.costStore.resetCostList();
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
		const orderStore = useOrderStore();
		[__temp, __restore] = withAsyncContext(() => useOrderReferenceData()), await __temp, __restore();
		[__temp, __restore] = withAsyncContext(async () => useAsyncData("orders-production", async () => {
			await Promise.all([orderStore.setOrderProductionList(), orderStore.setOrderProductionSourceTypes()]);
			return true;
		}, { server: false })), await __temp, __restore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Button = script;
			const _component_RadioButton = script$1;
			const _component_OrderTable = Table_default;
			const _component_Dialog = script$2;
			const _component_OrderDetailForm = Form_default;
			const _component_OrderDetailWorkermanForm = WorkermanForm_default;
			const _component_OrderDivideDialog = DivideDialog_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><div class="row m-auto text-center"><div class="col-4">`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				severity: "success",
				class: "w-100",
				label: "New Order",
				onClick: _ctx.newForm
			}, null, _parent));
			_push(`</div><div class="col-4 m-auto text-center"><div class="m-auto text-center" style="${ssrRenderStyle({
				"max-width": "400px",
				"width": "100%"
			})}"><div class="m-auto text-center"><div class="row mb-2 m-auto text-center"><div class="col-2">Supplier</div><div class="col"><div class="flex flex-wrap gap-3"><!--[-->`);
			ssrRenderList(_ctx.suppliers, (supplier) => {
				_push(`<div class="flex align-items-center">`);
				_push(ssrRenderComponent(_component_RadioButton, {
					modelValue: _ctx.selectedSupplier,
					"onUpdate:modelValue": ($event) => _ctx.selectedSupplier = $event,
					inputId: `supplier-${supplier.key}`,
					name: "dynamic",
					value: supplier.name,
					onChange: ($event) => _ctx.supplierChange($event)
				}, null, _parent));
				_push(`<label${ssrRenderAttr("for", `supplier-${supplier.key}`)} class="ml-2">${ssrInterpolate(supplier.name)}</label></div>`);
			});
			_push(`<!--]--></div></div></div><div class="row m-auto text-center"><div class="col-2">Seller</div><div class="col"><div class="flex flex-wrap gap-3"><!--[-->`);
			ssrRenderList(_ctx.marketings, (marketing) => {
				_push(`<div class="flex align-items-center">`);
				_push(ssrRenderComponent(_component_RadioButton, {
					modelValue: _ctx.selectedMarketing,
					"onUpdate:modelValue": ($event) => _ctx.selectedMarketing = $event,
					inputId: `marketing-${marketing.key}`,
					name: "dynamic",
					value: marketing.name,
					onChange: ($event) => _ctx.marketingChange($event)
				}, null, _parent));
				_push(`<label${ssrRenderAttr("for", `marketing-${marketing.key}`)} class="ml-2">${ssrInterpolate(marketing.name)}</label></div>`);
			});
			_push(`<!--]--></div></div></div></div></div></div><div class="col-4">`);
			_push(ssrRenderComponent(_component_Button, {
				severity: "warn",
				class: "w-100",
				label: "Excel",
				onClick: _ctx.excel_output
			}, null, _parent));
			_push(`</div></div>`);
			_push(ssrRenderComponent(_component_OrderTable, {
				list: unref(orderStore).getOrderList,
				onProduction_selected_emit: ($event) => _ctx.productionSelected($event),
				status: "Production",
				total: unref(orderStore).getOrderProductionTotal,
				loading: _ctx.sharedStore.isLoadingDatatable
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
						statusAlfa: false,
						insuranceCalculation: unref(orderStore).getOrderProductionInsuranceTotal,
						onOrder_production_product_reset_model_emit: ($event) => _ctx.orderProductionProductResetModel($event),
						onProcess: _ctx.process,
						onWorkerman_selected_emit: ($event) => _ctx.workermanSelected($event),
						onClose_production_form_emit: _ctx.closeProductionForm,
						onProforma_delete_emit: ($event) => _ctx.proformaDelete($event),
						onIsf_delete_emit: ($event) => _ctx.isfDelete($event),
						onDrawing_delete_emit: ($event) => _ctx.drawingDelete($event),
						onDivide: _ctx.divide,
						source: unref(orderStore).getOrderProductionSourceTypes
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
						statusAlfa: false,
						insuranceCalculation: unref(orderStore).getOrderProductionInsuranceTotal,
						onOrder_production_product_reset_model_emit: ($event) => _ctx.orderProductionProductResetModel($event),
						onProcess: _ctx.process,
						onWorkerman_selected_emit: ($event) => _ctx.workermanSelected($event),
						onClose_production_form_emit: _ctx.closeProductionForm,
						onProforma_delete_emit: ($event) => _ctx.proformaDelete($event),
						onIsf_delete_emit: ($event) => _ctx.isfDelete($event),
						onDrawing_delete_emit: ($event) => _ctx.drawingDelete($event),
						onDivide: _ctx.divide,
						source: unref(orderStore).getOrderProductionSourceTypes
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
						"insuranceCalculation",
						"onOrder_production_product_reset_model_emit",
						"onProcess",
						"onWorkerman_selected_emit",
						"onClose_production_form_emit",
						"onProforma_delete_emit",
						"onIsf_delete_emit",
						"onDrawing_delete_emit",
						"onDivide",
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
			_push(ssrRenderComponent(_component_OrderDivideDialog, {
				visible: _ctx.divide_dialog_form,
				"onUpdate:visible": ($event) => _ctx.divide_dialog_form = $event,
				productionModel: _ctx.productionModel,
				onDivided: _ctx.divided
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/orders/production.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=production-RZuLFY05.mjs.map
