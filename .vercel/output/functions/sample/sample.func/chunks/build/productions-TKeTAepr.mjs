import { u as useCookie, a as useAppToast, b as useAsyncData, _ as _plugin_vue_export_helper_default, e as formatPriceUsd, f as formatDecimal } from '../virtual/entry.mjs';
import { n as script } from './button-C8Z7Yc79.mjs';
import { n as script$a } from './column-CT6GXkG2.mjs';
import { n as script$9 } from './datatable-D6ou7HZJ.mjs';
import { n as script$5 } from './inputtext-s6cxdqDx.mjs';
import { n as script$7 } from './autocomplete-5Wwvp4c8.mjs';
import { t as script$8 } from './textarea-DHWHHqLi.mjs';
import { n as script$4 } from './floatlabel-BDqo8RCT.mjs';
import { t as toIsoDate, f as fromIsoDate } from './dates-C-BBx50j.mjs';
import { n as script$1 } from './dialog-BB6no0wu.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { u as useModelsStore } from './models-CeLtEMS4.mjs';
import { e as exportExcel } from './useExcelExport-B-DCkvaR.mjs';
import { C as CustomInput_default } from './CustomInput-B9GfGXia.mjs';
import { n as script$6 } from './datepicker-BGpmmzow.mjs';
import { t as script$3 } from './tabpanel-DPLeP9v3.mjs';
import { t as script$2 } from './tabview-BysloIbG.mjs';
import { u as useOrderStore } from './order-C0FMsqTx.mjs';
import { T as Table2_default } from './Table2-CD_kss_b.mjs';
import { C as Cards_default } from './Cards-D_Ydl_4N.mjs';
import { u as useOrderReferenceData, W as WorkermanForm_default, P as ProformaForm_default, C as CostForm_default, S as SupplierForm_default, D as DocumentForm_default, a as CheckForm_default } from './useOrderReferenceData-C-Aooz5D.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
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
import './utils-DLTV_uUI.mjs';
import './paginator-Xy7ujKDP.mjs';
import './angleleft-D6vOFyjM.mjs';
import './select-T8LIeBQG.mjs';
import './blank-BQmA3nuA.mjs';
import './check-CR3Cx6NX.mjs';
import './chevrondown-C7RD7jv8.mjs';
import './search-fCMh6s0Y.mjs';
import './times-CPhkDIFg.mjs';
import './iconfield-D2ODE-2Z.mjs';
import './inputicon-DEvfAPpy.mjs';
import './baseinput-SDS7K395.mjs';
import './baseeditableholder-y-Ph8z9F.mjs';
import './overlayeventbus-CNwdnFrZ.mjs';
import './portal-DQKNPUee.mjs';
import './virtualscroller-CALiPpRg.mjs';
import '@primeuix/utils/zindex';
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
import './focustrap-kXXT0pga.mjs';
import './sortamountupalt-MmmjHcOR.mjs';
import './chip--BHyxaU9.mjs';
import './timescircle-0itGCn-i.mjs';
import './utils-9fKJJYP7.mjs';
import './useApi-CGFzrxZs.mjs';
import './useLegacyApi-B5zRc7ig.mjs';
import './chevronleft-Dy82Mung.mjs';
import './chevronup-CFGDy7zv.mjs';
import './socket-AbqLYDWT.mjs';
import './card-D9W2BIHg.mjs';
import './useReferenceData-DTHP3Dno.mjs';
import './useFileService-Bon6d2kz.mjs';
import './fileupload-Q8ndBK5J.mjs';
import './message-DvSNQ9wF.mjs';
import './progressbar-BWtVAJVg.mjs';

//#region app/components/orderDetail/OrderForm2.vue
var _sfc_main$2 = {
	computed: {
		orderStore() {
			return useOrderStore();
		},
		modelsStore() {
			return useModelsStore();
		}
	},
	props: {
		sourceModel: {
			type: Object,
			required: true
		},
		products: {
			type: Array,
			required: false
		},
		supplier: {
			type: Array,
			required: true
		},
		unit: {
			type: Array,
			required: true
		},
		po: {
			type: String,
			required: false
		},
		detailProductTotal: {
			type: Object,
			required: false
		},
		status: {
			type: Boolean,
			required: false
		}
	},
	data() {
		return {
			model: { ...this.sourceModel ?? {} },
			width: 0,
			height: 0,
			thickness: 0,
			totals: 0,
			product_cards_form_dialog: false,
			categoryName: null,
			productName: null,
			surfaceName: null,
			sizeName: null,
			selectedSupplier: null,
			filteredSupplier: null,
			selectedUnit: null,
			filteredUnit: null,
			selectedOrderProducts: null,
			new_button_disabled: false,
			cancel_button_disabled: true,
			add_button_disabled: true,
			update_button_disabled: true,
			delete_button_disabled: true,
			product_form_disabled: true,
			workerman_button_disabled: true
		};
	},
	mounted() {
		this.totals = 0;
		this.products.forEach((x) => {
			this.totals += this.__noneControl(x.AlisFiyati) * this.__noneControl(x.Miktar);
		});
	},
	watch: { sourceModel(next) {
		this.model = { ...next ?? {} };
	} },
	methods: {
		__typeFloatControl(payload) {
			if (payload.toString().indexOf(",") == -1) return parseFloat(payload);
			else return parseFloat(payload.replace(",", "."));
		},
		oM2Change(en, boy, miktar, birim) {
			if (birim == 1) return miktar;
			else if (birim == 2) {
				if (en == "FR" || en == "FRENCH" || en == "VAR" || en == "Various" || en == "ANT" || en == "SLAB" || en == "1 LT" || en == "Crazy" || en == "Other" || en == "SET" || en == "MINI" || boy == "SET" || boy == "Free" || boy == "FREE") return 0;
				else return (parseFloat(en.replace(",", ".")) / 100 * (parseFloat(boy.replace(",", ".")) / 100) * miktar).toFixed(4);
			} else if (birim == 3) {
				if (en == "FR" || en == "FRENCH" || en == "VAR" || en == "Various" || en == "ANT" || en == "SLAB" || en == "1 LT" || en == "Crazy" || en == "Other" || en == "SET" || en == "MINI" || boy == "SET") return 0;
				else if (boy == "Free" || boy == "FREE") return (miktar * (parseFloat(en.replace(",", ".")) / 100)).toFixed(4);
				else return (miktar / (parseFloat(boy.replace(",", ".")) / 100) * (parseFloat(boy.replace(",", ".")) / 100) * (parseFloat(en.replace(",", ".")) / 100)).toFixed(4);
			} else return 0;
		},
		productCoefficient(event) {
			if (event == "Travertine") return 2.4;
			else if (event == "Marble") return 2.82;
			else if (event == "Limestone") return 2.6;
			else if (event == "Quarts") return 2.5;
			else return 0;
		},
		tonajChange2(event) {
			if (event == 0) {
				this.model.Ton = 0;
				return;
			}
			let coefficient = this.productCoefficient(this.categoryName.split(" ")[0]);
			if (this.thickness == "VAR" || this.thickness == "Various" || this.thickness == "SLAB" || this.thickness == "Slab") this.model.Ton = 0;
			else if (this.selectedUnit.ID == 1) this.model.Ton = coefficient * 10 * this.__typeFloatControl(event) * parseFloat(this.thickness.replace(",", ".")) / 1e3;
			else this.model.Ton = coefficient * 10 * this.__typeFloatControl(event) * parseFloat(this.thickness.replace(",", ".")) / 1e3;
		},
		tonajChange(event) {
			if (event == 0) {
				this.model.Ton = 0;
				this.model.OzelMiktar = 0;
				this.model.Adet = 0;
				return;
			}
			if (this.height == "Free" || this.height == "FREE" || this.height == "VAR" || this.height == "Var" || this.heiht == "Various" || this.height == "SLAB" || this.height == "Slab" || this.height == "PAT" || this.height == "Pat" || this.height == "SET" || this.height == "SINK" || this.width == "Ant" || this.width == "ANT" || this.width == "FRENCH" || this.width == "MINI" || this.thickness == "Other" || this.width == "özel" || this.width == "1 LT") {
				if (this.selectedUnit.ID == 1) this.model.OzelMiktar = this.model.Miktar;
				else if (this.selectedUnit.ID == 2) this.model.Adet = this.model.Miktar;
				else this.model.OzelMiktar = 0;
			} else if (this.selectedUnit.ID == 1) {
				this.model.OzelMiktar = this.model.Miktar;
				this.model.Adet = Math.round(this.__typeFloatControl(event) / (this.__typeFloatControl(this.width) / 100) / (this.__typeFloatControl(this.height) / 100));
			} else if (this.selectedUnit.ID == 2) {
				this.model.OzelMiktar = this.__typeFloatControl(this.width) * this.__typeFloatControl(this.height) * this.__typeFloatControl(event) / 1e4;
				this.model.Adet = this.model.Miktar;
			} else if (this.selectedUnit.ID == 3) {
				this.model.OzelMiktar = this.__typeFloatControl(event) * this.__typeFloatControl(this.width) / 100;
				this.model.Adet = Math.round(this.__typeFloatControl(this.model.OzelMiktar) / (this.__typeFloatControl(this.width) / 100) / (this.__typeFloatControl(this.height) / 100));
			}
			let coefficient = this.productCoefficient(this.categoryName.split(" ")[0]);
			if (this.thickness == "VAR" || this.thickness == "Various" || this.thickness == "SLAB" || this.thickness == "Slab") this.model.Ton = 0;
			else if (this.selectedUnit.ID == 1) this.model.Ton = coefficient * 10 * this.__typeFloatControl(event) * parseFloat(this.thickness.replace(",", ".")) / 1e3;
			else this.model.Ton = coefficient * 10 * this.__typeFloatControl(this.model.OzelMiktar) * parseFloat(this.thickness.replace(",", ".")) / 1e3;
		},
		__noneControl(val) {
			if (val == null || val == void 0 || val == "") return 0;
			else return val;
		},
		rowClass(event) {
			if (event.AlisFiyati == 0 || event.AlisFiyati == null || event.AlisFiyati == void 0) return "row-accessories";
		},
		__nullControl(value) {
			if (value == null || value == "" || value == void 0) return 0;
			else return value;
		},
		deleteItem() {
			const log = {
				description: this.po + " siparişinden " + this.model.MusteriAciklama + " (" + this.model.Miktar + ") " + this.selectedUnit.BirimAdi + " kalemi silindi.",
				po: this.po,
				color: "#ffec31"
			};
			this.$logs.save(log);
			this.categoryName = null;
			this.productName = null;
			this.surfaceName = null;
			this.sizeName = null;
			this.selectedSupplier = null;
			this.selectedUnit = null;
			this.selectedOrderProducts = null;
			this.product_form_disabled = true;
			this.new_button_disabled = false;
			this.cancel_button_disabled = true;
			this.add_button_disabled = true;
			this.update_button_disabled = true;
			this.delete_button_disabled = true;
			this.workerman_button_disabled = true;
			this.orderStore.setOrderProductDeleted(this.model);
		},
		add() {
			const log = {
				description: this.po + " siparişine " + this.model.MusteriAciklama + " (" + this.model.Miktar + ") " + this.selectedUnit.BirimAdi + " yeni kalem eklendi.",
				po: this.po,
				color: "#ffec31"
			};
			this.$logs.save(log);
			this.categoryName = null;
			this.productName = null;
			this.surfaceName = null;
			this.sizeName = null;
			this.selectedSupplier = null;
			this.selectedUnit = null;
			this.selectedOrderProducts = null;
			this.product_form_disabled = true;
			this.new_button_disabled = false;
			this.cancel_button_disabled = true;
			this.add_button_disabled = true;
			this.update_button_disabled = true;
			this.delete_button_disabled = true;
			this.model.SatisToplam = this.model.SatisFiyati * this.model.Miktar;
			this.model.SiparisNo = this.po;
			this.workerman_button_disabled = true;
			this.model.Adet = this.__nullControl(this.model.Adet);
			this.orderStore.setOrderProductAdded(this.model);
		},
		update() {
			const log = {
				description: this.po + " siparişinde " + this.model.MusteriAciklama + " (" + this.model.Miktar + ") " + this.selectedUnit.BirimAdi + " kalemi güncellendi.",
				po: this.po,
				color: "#ffec31"
			};
			this.$logs.save(log);
			this.categoryName = null;
			this.productName = null;
			this.surfaceName = null;
			this.sizeName = null;
			this.selectedSupplier = null;
			this.selectedUnit = null;
			this.selectedOrderProducts = null;
			this.product_form_disabled = true;
			this.new_button_disabled = false;
			this.cancel_button_disabled = true;
			this.add_button_disabled = true;
			this.update_button_disabled = true;
			this.delete_button_disabled = true;
			this.model.SatisToplam = this.model.SatisFiyati * this.model.Miktar;
			this.model.SiparisNo = this.po;
			this.workerman_button_disabled = true;
			this.model.Adet = this.__nullControl(this.model.Adet);
			this.orderStore.setOrderProductUpdated(this.model);
		},
		cancelForm() {
			this.new_button_disabled = false;
			this.cancel_button_disabled = true;
			this.add_button_disabled = true;
			this.update_button_disabled = true;
			this.delete_button_disabled = true;
			this.categoryName = null;
			this.productName = null;
			this.surfaceName = null;
			this.sizeName = null;
			this.selectedSupplier = null;
			this.selectedUnit = null;
			this.selectedOrderProducts = null;
			this.product_form_disabled = true;
			this.workerman_button_disabled = true;
			this.modelsStore.setOrderProductModel();
		},
		newForm() {
			this.new_button_disabled = true;
			this.cancel_button_disabled = false;
			this.add_button_disabled = false;
			this.product_form_disabled = false;
			this.model.SiraNo = this.products.length + 1;
		},
		orderProductsSelected(event) {
			this.product_form_disabled = false;
			this.new_button_disabled = true;
			this.cancel_button_disabled = false;
			this.add_button_disabled = true;
			this.update_button_disabled = false;
			this.delete_button_disabled = false;
			this.workerman_button_disabled = false;
			this.model = event.data;
			this.selectedUnit = this.unit.find((x) => x.ID == event.data.UrunBirimID);
			this.selectedSupplier = this.supplier.find((x) => x.ID == event.data.TedarikciID);
			this.categoryName = event.data.KategoriAdi;
			this.productName = event.data.UrunAdi;
			this.surfaceName = event.data.YuzeyIslemAdi;
			this.sizeName = event.data.En + "x" + event.data.Boy + "x" + event.data.Kenar;
			this.width = event.data.En;
			this.height = event.data.Boy;
			this.thickness = event.data.Kenar;
			const data = {
				SiparisNo: event.data.SiparisNo,
				FirmaAdi: event.data.FirmaAdi,
				KategoriAdi: event.data.KategoriAdi,
				UrunAdi: event.data.UrunAdi,
				YuzeyIslemAdi: event.data.YuzeyIslemAdi,
				En: event.data.En,
				Boy: event.data.Boy,
				Kenar: event.data.Kenar,
				UretimAciklama: event.data.UretimAciklama,
				Miktar: event.data.Miktar,
				AlisFiyati: event.data.AlisFiyati,
				SatisFiyati: event.data.SatisFiyati,
				ID: event.data.ID
			};
			this.orderStore.setOrderProductionProductDetailNotChangeList(data);
		},
		unitSelected(event) {
			this.model.UrunBirimID = event.value.ID;
		},
		searchUnit(event) {
			let results;
			if (event.query.length === 0) results = this.unit;
			else results = this.unit.filter((x) => {
				return x.BirimAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredUnit = results;
		},
		supplierSelected(event) {
			this.model.TedarikciID = event.value.ID;
			this.model.FirmaAdi = event.value.FirmaAdi;
		},
		searchSupplier(event) {
			let results;
			if (event.query.length === 0) results = this.supplier;
			else results = this.supplier.filter((x) => {
				return x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredSupplier = results;
		},
		productCardsSelected(event) {
			this.product_cards_form_dialog = false;
			this.model.UrunKartID = event.ID;
			this.categoryName = event.KategoriAdi;
			this.productName = event.UrunAdi;
			this.surfaceName = event.YuzeyIslemAdi;
			this.sizeName = event.En + "x" + event.Boy + "x" + event.Kenar;
			this.model.MusteriAciklama = event.KategoriAdi + "-" + event.UrunAdi + "-" + event.YuzeyIslemAdi + "-" + event.En + "x" + event.Boy + "x" + event.Kenar;
			this.model.UrunAdi = event.UrunAdi;
			this.model.YuzeyIslemAdi = event.YuzeyIslemAdi;
			this.model.En = event.En;
			this.model.Boy = event.Boy;
			this.model.Kenar = event.Kenar;
			this.model.KategoriAdi = event.KategoriAdi;
			this.width = event.En;
			this.height = event.Boy;
			this.thickness = event.Kenar;
		}
	}
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_FloatLabel = script$4;
	const _component_InputText = script$5;
	const _component_Button = script;
	const _component_AutoComplete = script$7;
	const _component_CustomInput = CustomInput_default;
	const _component_Textarea = script$8;
	const _component_DataTable = script$9;
	const _component_Column = script$a;
	const _component_Dialog = script$1;
	const _component_ProductCards = Cards_default;
	_push(`<div${ssrRenderAttrs(_attrs)}><div class="row mt-3"><div class="col-4"><div class="row mb-4"><div class="col-9">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					class: "w-100",
					id: "productId",
					modelValue: $data.model.UrunKartID,
					"onUpdate:modelValue": ($event) => $data.model.UrunKartID = $event,
					disabled: ""
				}, null, _parent, _scopeId));
				_push(`<label for="productId"${_scopeId}>Product Card Id</label>`);
			} else return [createVNode(_component_InputText, {
				class: "w-100",
				id: "productId",
				modelValue: $data.model.UrunKartID,
				"onUpdate:modelValue": ($event) => $data.model.UrunKartID = $event,
				disabled: ""
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productId" }, "Product Card Id")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "secondary",
		label: "@",
		onClick: ($event) => $data.product_cards_form_dialog = true,
		disabled: $data.product_form_disabled
	}, null, _parent));
	_push(`</div></div>`);
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					class: "w-100",
					id: "category",
					modelValue: $data.categoryName,
					"onUpdate:modelValue": ($event) => $data.categoryName = $event,
					disabled: ""
				}, null, _parent, _scopeId));
				_push(`<label for="category"${_scopeId}>Category</label>`);
			} else return [createVNode(_component_InputText, {
				class: "w-100",
				id: "category",
				modelValue: $data.categoryName,
				"onUpdate:modelValue": ($event) => $data.categoryName = $event,
				disabled: ""
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "category" }, "Category")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					class: "w-100",
					id: "product",
					modelValue: $data.productName,
					"onUpdate:modelValue": ($event) => $data.productName = $event,
					disabled: ""
				}, null, _parent, _scopeId));
				_push(`<label for="product"${_scopeId}>Product</label>`);
			} else return [createVNode(_component_InputText, {
				class: "w-100",
				id: "product",
				modelValue: $data.productName,
				"onUpdate:modelValue": ($event) => $data.productName = $event,
				disabled: ""
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "product" }, "Product")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					class: "w-100",
					id: "surface",
					modelValue: $data.surfaceName,
					"onUpdate:modelValue": ($event) => $data.surfaceName = $event,
					disabled: ""
				}, null, _parent, _scopeId));
				_push(`<label for="surface"${_scopeId}>Surface</label>`);
			} else return [createVNode(_component_InputText, {
				class: "w-100",
				id: "surface",
				modelValue: $data.surfaceName,
				"onUpdate:modelValue": ($event) => $data.surfaceName = $event,
				disabled: ""
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "surface" }, "Surface")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					class: "w-100",
					id: "size",
					modelValue: $data.sizeName,
					"onUpdate:modelValue": ($event) => $data.sizeName = $event,
					disabled: ""
				}, null, _parent, _scopeId));
				_push(`<label for="size"${_scopeId}>Size</label>`);
			} else return [createVNode(_component_InputText, {
				class: "w-100",
				id: "size",
				modelValue: $data.sizeName,
				"onUpdate:modelValue": ($event) => $data.sizeName = $event,
				disabled: ""
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "size" }, "Size")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4 w-100" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedSupplier,
					"onUpdate:modelValue": ($event) => $data.selectedSupplier = $event,
					inputId: "supplier",
					suggestions: $data.filteredSupplier,
					onComplete: ($event) => $options.searchSupplier($event),
					onItemSelect: ($event) => $options.supplierSelected($event),
					optionLabel: "FirmaAdi",
					class: "w-100",
					disabled: $data.product_form_disabled
				}, null, _parent, _scopeId));
				_push(`<label for="supplier"${_scopeId}>Supplier</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedSupplier,
				"onUpdate:modelValue": ($event) => $data.selectedSupplier = $event,
				inputId: "supplier",
				suggestions: $data.filteredSupplier,
				onComplete: ($event) => $options.searchSupplier($event),
				onItemSelect: ($event) => $options.supplierSelected($event),
				optionLabel: "FirmaAdi",
				class: "w-100",
				disabled: $data.product_form_disabled
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect",
				"disabled"
			]), createVNode("label", { for: "supplier" }, "Supplier")];
		}),
		_: 1
	}, _parent));
	_push(`<div class="row mb-4"><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.model.AlisFiyati,
		text: "Purchase Price",
		onOnInput: ($event) => $data.model.AlisFiyati = $event,
		disabled: $data.product_form_disabled
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.model.SatisFiyati,
		text: "Selling Price",
		onOnInput: ($event) => $data.model.SatisFiyati = $event,
		disabled: $data.product_form_disabled
	}, null, _parent));
	_push(`</div></div><div class="row mb-4"><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, { class: "w-100" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedUnit,
					"onUpdate:modelValue": ($event) => $data.selectedUnit = $event,
					inputId: "unit",
					suggestions: $data.filteredUnit,
					onComplete: ($event) => $options.searchUnit($event),
					onItemSelect: ($event) => $options.unitSelected($event),
					optionLabel: "BirimAdi",
					class: "w-100",
					disabled: $data.product_form_disabled
				}, null, _parent, _scopeId));
				_push(`<label for="unit"${_scopeId}>Unit</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedUnit,
				"onUpdate:modelValue": ($event) => $data.selectedUnit = $event,
				inputId: "unit",
				suggestions: $data.filteredUnit,
				onComplete: ($event) => $options.searchUnit($event),
				onItemSelect: ($event) => $options.unitSelected($event),
				optionLabel: "BirimAdi",
				class: "w-100",
				disabled: $data.product_form_disabled
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect",
				"disabled"
			]), createVNode("label", { for: "unit" }, "Unit")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.model.Miktar,
		text: "Amount",
		onOnInput: ($event) => $data.model.Miktar = $event,
		disabled: $data.product_form_disabled,
		onChange: ($event) => $options.tonajChange($event)
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.model.Adet,
		text: "Piece",
		onOnInput: ($event) => $data.model.Adet = $event,
		disabled: $data.product_form_disabled
	}, null, _parent));
	_push(`</div></div><div class="row mb-4"><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					class: "w-100",
					id: "queue",
					modelValue: $data.model.SiraNo,
					"onUpdate:modelValue": ($event) => $data.model.SiraNo = $event,
					disabled: $data.product_form_disabled
				}, null, _parent, _scopeId));
				_push(`<label for="queue"${_scopeId}>#</label>`);
			} else return [createVNode(_component_InputText, {
				class: "w-100",
				id: "queue",
				modelValue: $data.model.SiraNo,
				"onUpdate:modelValue": ($event) => $data.model.SiraNo = $event,
				disabled: $data.product_form_disabled
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"disabled"
			]), createVNode("label", { for: "queue" }, "#")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.model.OzelMiktar,
		text: "M2",
		onOnInput: ($event) => $data.model.OzelMiktar = $event,
		disabled: $data.product_form_disabled,
		onChange: ($event) => $options.tonajChange2($event)
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.model.Ton,
		text: "Ton",
		onOnInput: ($event) => $data.model.Ton = $event,
		disabled: $data.product_form_disabled
	}, null, _parent));
	_push(`</div></div><div class="row mb-4"><div class="col">`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "info",
		class: "w-100",
		label: "Labour Cost",
		onClick: ($event) => _ctx.$emit("workerman_selected_emit", $data.model.UrunKartID),
		disabled: $data.workerman_button_disabled
	}, null, _parent));
	_push(`</div></div></div><div class="col-8">`);
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Textarea, {
					modelValue: $data.model.MusteriAciklama,
					"onUpdate:modelValue": ($event) => $data.model.MusteriAciklama = $event,
					rows: "10",
					class: "w-100",
					disabled: $data.product_form_disabled
				}, null, _parent, _scopeId));
				_push(`<label${_scopeId}>Explanation(EN)</label>`);
			} else return [createVNode(_component_Textarea, {
				modelValue: $data.model.MusteriAciklama,
				"onUpdate:modelValue": ($event) => $data.model.MusteriAciklama = $event,
				rows: "10",
				class: "w-100",
				disabled: $data.product_form_disabled
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"disabled"
			]), createVNode("label", null, "Explanation(EN)")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Textarea, {
					modelValue: $data.model.UretimAciklama,
					"onUpdate:modelValue": ($event) => $data.model.UretimAciklama = $event,
					rows: "10",
					class: "w-100",
					disabled: $data.product_form_disabled
				}, null, _parent, _scopeId));
				_push(`<label${_scopeId}>Explanation(TR)</label>`);
			} else return [createVNode(_component_Textarea, {
				modelValue: $data.model.UretimAciklama,
				"onUpdate:modelValue": ($event) => $data.model.UretimAciklama = $event,
				rows: "10",
				class: "w-100",
				disabled: $data.product_form_disabled
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"disabled"
			]), createVNode("label", null, "Explanation(TR)")];
		}),
		_: 1
	}, _parent));
	if ($props.po) {
		_push(`<div class="row mt-4"><div class="col">`);
		_push(ssrRenderComponent(_component_Button, {
			type: "button",
			class: "p-button-primary w-100",
			label: "New Product",
			disabled: $data.new_button_disabled,
			onClick: $options.newForm
		}, null, _parent));
		_push(`</div><div class="col">`);
		_push(ssrRenderComponent(_component_Button, {
			type: "button",
			severity: "secondary",
			class: "w-100",
			label: "Cancel",
			disabled: $data.cancel_button_disabled,
			onClick: $options.cancelForm
		}, null, _parent));
		_push(`</div><div class="col">`);
		_push(ssrRenderComponent(_component_Button, {
			type: "button",
			severity: "success",
			class: "w-100",
			label: "Add",
			disabled: $data.add_button_disabled,
			onClick: $options.add
		}, null, _parent));
		_push(`</div><div class="col">`);
		_push(ssrRenderComponent(_component_Button, {
			type: "button",
			severity: "warn",
			class: "w-100",
			label: "Update",
			disabled: $data.update_button_disabled,
			onClick: $options.update
		}, null, _parent));
		_push(`</div><div class="col">`);
		_push(ssrRenderComponent(_component_Button, {
			type: "button",
			severity: "danger",
			class: "w-100",
			label: "Delete",
			disabled: $data.delete_button_disabled,
			onClick: $options.deleteItem
		}, null, _parent));
		_push(`</div></div>`);
	} else _push(`<!---->`);
	_push(`</div></div>`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $props.products,
		selection: $data.selectedOrderProducts,
		"onUpdate:selection": ($event) => $data.selectedOrderProducts = $event,
		selectionMode: "single",
		onRowClick: ($event) => $options.orderProductsSelected($event),
		sortField: "SiraNo",
		sortOrder: 1,
		rowClass: $options.rowClass
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "SiraNo",
					header: "#"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "FirmaAdi",
					header: "Supplier"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "UrunAdi",
					header: "Product"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "YuzeyIslemAdi",
					header: "Surface"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "En",
					header: "Width"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Boy",
					header: "Height"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Kenar",
					header: "Thickness"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, { header: "M2" }, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (slotProps.data.UrunBirimID == 1) _push(`<div style="${ssrRenderStyle({ backgroundColor: slotProps.data.UrunBirimID == 1 ? "red" : "" })}"${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar))}</div>`);
							else _push(`<div style="${ssrRenderStyle({ backgroundColor: slotProps.data.UrunBirimID == 1 ? "red" : "" })}"${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.OzelMiktar))}</div>`);
						} else return [slotProps.data.UrunBirimID == 1 ? (openBlock(), createBlock("div", {
							key: 0,
							style: { backgroundColor: slotProps.data.UrunBirimID == 1 ? "red" : "" }
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 5)) : (openBlock(), createBlock("div", {
							key: 1,
							style: { backgroundColor: slotProps.data.UrunBirimID == 1 ? "red" : "" }
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.OzelMiktar)), 5))];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.m2))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.m2)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, { header: "Piece" }, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (slotProps.data.UrunBirimID == 2) _push(`<div style="${ssrRenderStyle({ backgroundColor: slotProps.data.UrunBirimID == 2 ? "red" : "" })}"${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar))}</div>`);
							else _push(`<div style="${ssrRenderStyle({ backgroundColor: slotProps.data.UrunBirimID == 2 ? "red" : "" })}"${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(0))}</div>`);
						} else return [slotProps.data.UrunBirimID == 2 ? (openBlock(), createBlock("div", {
							key: 0,
							style: { backgroundColor: slotProps.data.UrunBirimID == 2 ? "red" : "" }
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 5)) : (openBlock(), createBlock("div", {
							key: 1,
							style: { backgroundColor: slotProps.data.UrunBirimID == 2 ? "red" : "" }
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(0)), 5))];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.piece))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.piece)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, { header: "MT" }, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (slotProps.data.UrunBirimID == 3) _push(`<div style="${ssrRenderStyle({ backgroundColor: slotProps.data.UrunBirimID == 3 ? "red" : "" })}"${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar))}</div>`);
							else _push(`<div style="${ssrRenderStyle({ backgroundColor: slotProps.data.UrunBirimID == 3 ? "red" : "" })}"${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(0))}</div>`);
						} else return [slotProps.data.UrunBirimID == 3 ? (openBlock(), createBlock("div", {
							key: 0,
							style: { backgroundColor: slotProps.data.UrunBirimID == 3 ? "red" : "" }
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 5)) : (openBlock(), createBlock("div", {
							key: 1,
							style: { backgroundColor: slotProps.data.UrunBirimID == 3 ? "red" : "" }
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(0)), 5))];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.mt))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.mt)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Ton",
					header: "Ton"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.ton)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "OzelMiktar",
					header: "Ö.M"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.OzelMiktar))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.OzelMiktar)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SatisFiyati",
					header: "Sales Price"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, { header: "Total (Selling)" }, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Miktar * slotProps.data.SatisFiyati))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Miktar * slotProps.data.SatisFiyati)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductTotal.total))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductTotal.total)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "AlisFiyati",
					header: "Purchase Price"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, { header: "Total (Purchase)" }, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Miktar * slotProps.data.AlisFiyati))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Miktar * slotProps.data.AlisFiyati)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductTotal.total))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductTotal.total)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "SiraNo",
					header: "#"
				}),
				createVNode(_component_Column, {
					field: "FirmaAdi",
					header: "Supplier"
				}),
				createVNode(_component_Column, {
					field: "UrunAdi",
					header: "Product"
				}),
				createVNode(_component_Column, {
					field: "YuzeyIslemAdi",
					header: "Surface"
				}),
				createVNode(_component_Column, {
					field: "En",
					header: "Width"
				}),
				createVNode(_component_Column, {
					field: "Boy",
					header: "Height"
				}),
				createVNode(_component_Column, {
					field: "Kenar",
					header: "Thickness"
				}),
				createVNode(_component_Column, { header: "M2" }, {
					body: withCtx((slotProps) => [slotProps.data.UrunBirimID == 1 ? (openBlock(), createBlock("div", {
						key: 0,
						style: { backgroundColor: slotProps.data.UrunBirimID == 1 ? "red" : "" }
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 5)) : (openBlock(), createBlock("div", {
						key: 1,
						style: { backgroundColor: slotProps.data.UrunBirimID == 1 ? "red" : "" }
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.OzelMiktar)), 5))]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.m2)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, { header: "Piece" }, {
					body: withCtx((slotProps) => [slotProps.data.UrunBirimID == 2 ? (openBlock(), createBlock("div", {
						key: 0,
						style: { backgroundColor: slotProps.data.UrunBirimID == 2 ? "red" : "" }
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 5)) : (openBlock(), createBlock("div", {
						key: 1,
						style: { backgroundColor: slotProps.data.UrunBirimID == 2 ? "red" : "" }
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(0)), 5))]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.piece)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, { header: "MT" }, {
					body: withCtx((slotProps) => [slotProps.data.UrunBirimID == 3 ? (openBlock(), createBlock("div", {
						key: 0,
						style: { backgroundColor: slotProps.data.UrunBirimID == 3 ? "red" : "" }
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 5)) : (openBlock(), createBlock("div", {
						key: 1,
						style: { backgroundColor: slotProps.data.UrunBirimID == 3 ? "red" : "" }
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(0)), 5))]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.mt)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Ton",
					header: "Ton"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.ton)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "OzelMiktar",
					header: "Ö.M"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.OzelMiktar)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SatisFiyati",
					header: "Sales Price"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, { header: "Total (Selling)" }, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Miktar * slotProps.data.SatisFiyati)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductTotal.total)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "AlisFiyati",
					header: "Purchase Price"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, { header: "Total (Purchase)" }, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Miktar * slotProps.data.AlisFiyati)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductTotal.total)), 1)]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_Dialog, {
		visible: $data.product_cards_form_dialog,
		"onUpdate:visible": ($event) => $data.product_cards_form_dialog = $event,
		header: "Product Data",
		modal: ""
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(ssrRenderComponent(_component_ProductCards, { onCards_selected_emit: ($event) => $options.productCardsSelected($event) }, null, _parent, _scopeId));
			else return [createVNode(_component_ProductCards, { onCards_selected_emit: ($event) => $options.productCardsSelected($event) }, null, 8, ["onCards_selected_emit"])];
		}),
		_: 1
	}, _parent));
	_push(`</div>`);
}
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/orderDetail/OrderForm2.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var OrderForm2_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]), { __name: "OrderDetailOrderForm2" });
//#endregion
//#region app/components/orderDetail/Form2.vue
var _sfc_main$1 = {
	computed: { sharedStore() {
		return useSharedStore();
	} },
	props: {
		modelProduction: {
			type: Object,
			required: true
		},
		modelProduct: {
			type: Object,
			required: true
		},
		status: {
			type: Boolean,
			required: true
		},
		customer: {
			type: Array,
			required: true
		},
		user: {
			type: Array,
			required: true
		},
		productsList: {
			type: Array,
			required: false
		},
		supplier: {
			type: Array,
			required: false
		},
		unit: {
			type: Array,
			required: false
		},
		po: {
			type: String,
			required: false
		},
		delivery: {
			type: Array,
			required: true
		},
		payment: {
			type: Array,
			required: true
		},
		country: {
			type: Array,
			required: true
		},
		invoice: {
			type: Array,
			required: true
		},
		cost: {
			type: Array,
			required: false
		},
		costTotal: {
			type: Number,
			required: false
		},
		supplierDelivery: {
			type: Array,
			required: true
		},
		productSupplier: {
			type: Array,
			required: true
		},
		supplierProduct: {
			type: Array,
			required: false
		},
		document: {
			type: Array,
			required: false
		},
		check: {
			type: Array,
			required: false
		},
		checkTotal: {
			type: Object,
			required: false
		},
		productCalculation: {
			type: Number,
			required: false
		},
		freightCalculation: {
			type: Number,
			required: false
		},
		detailCalculation: {
			type: Number,
			required: false
		},
		detailProductTotal: {
			type: Object,
			required: false
		},
		detailProductCost: {
			type: Object,
			required: false
		},
		saveButtonStatus: {
			type: Boolean,
			required: false
		},
		proformaUploadButtonStatus: {
			type: Boolean,
			required: false
		},
		statusAlfa: {
			type: Boolean,
			required: false
		},
		source: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			prepaymentDisabledForm: true,
			guess_loading_date: null,
			order_date: null,
			filteredCustomer: null,
			selectedCustomer: null,
			selectedOrderer: null,
			filteredOrderer: null,
			selectedOperation: null,
			filteredOperation: null,
			selectedFinanceman: null,
			filteredFinanceman: null,
			load_date: null,
			eta_date: null
		};
	},
	created() {
		if (!this.status) this.createdProcess();
	},
	methods: {
		inputPo(event) {
			if (this.sharedStore.getOrdersAllList.find((x) => x.SiparisNo == event)) useAppToast().warn("Bu po ya ait sipariş bulunmakta.");
		},
		prePaymentIsActivated(event) {
			let prepayment = 0;
			this.productsList.forEach((product) => {
				prepayment += product.SatisToplam;
			});
			if (event == 1) {
				this.prepaymentDisabledForm = false;
				this.modelProduction.Pesinat = prepayment;
			} else if (event == 2) {
				this.prepaymentDisabledForm = false;
				this.modelProduction.Pesinat = 0;
			} else {
				this.prepaymentDisabledForm = true;
				this.modelProduction.Pesinat = 0;
			}
		},
		guessLoadingDateSelected(event) {
			this.modelProduction.TahminiYuklemeTarihi = toIsoDate(event);
		},
		orderDateSelected(event) {
			this.modelProduction.SiparisTarihi = toIsoDate(event);
		},
		financemanSelected(event) {
			this.modelProduction.Finansman = event.value.ID;
		},
		searchFinanceman(event) {
			let results;
			if (event.query.length == 0) results = this.user;
			else results = this.user.filter((x) => {
				return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredFinanceman = results;
		},
		operationSelected(event) {
			this.modelProduction.Operasyon = event.value.ID;
			this.modelProduction.operationMail = event.value.MailAdres;
		},
		searchOperation(event) {
			let results;
			if (event.query.length == 0) results = this.user;
			else results = this.user.filter((x) => {
				return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredOperation = results;
		},
		searchOrderer(event) {
			let results;
			if (event.query.length == 0) results = this.user;
			else results = this.user.filter((x) => {
				return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredOrderer = results;
		},
		ordererSelected(event) {
			this.modelProduction.SiparisSahibi = event.value.ID;
			this.modelProduction.representativeMail = event.value.MailAdres;
		},
		customerSelected(event) {
			this.modelProduction.MusteriID = event.value.ID;
		},
		searchCustomer(event) {
			let results;
			if (event.query.length == 0) results = this.customer;
			else results = this.customer.filter((x) => {
				return x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredCustomer = results;
		},
		createdProcess() {
			this.guess_loading_date = fromIsoDate(this.modelProduction.TahminiYuklemeTarihi);
			this.order_date = fromIsoDate(this.modelProduction.SiparisTarihi);
			this.selectedCustomer = this.customer.find((x) => x.ID == this.modelProduction.MusteriID);
			this.selectedOrderer = this.user.find((x) => x.ID == this.modelProduction.SiparisSahibi);
			this.selectedOperation = this.user.find((x) => x.ID == this.modelProduction.Operasyon);
			this.selectedFinanceman = this.user.find((x) => x.ID == this.modelProduction.Finansman);
			this.load_date = fromIsoDate(this.modelProduction.YuklemeTarihi);
			this.eta_date = fromIsoDate(this.modelProduction.Eta);
			if (this.modelProduction.SiparisKontrol == null || this.modelProduction.SiparisKontrol == "" || this.modelProduction.SiparisKontrol == "null") {
				this.selectedControlBoolean = false;
				this.modelProduction.SiparisKontrol = false;
			} else {
				this.selectedControlBoolean = true;
				this.modelProduction.SiparisKontrol = true;
			}
		}
	},
	watch: {}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_TabView = script$2;
	const _component_TabPanel = script$3;
	const _component_OrderDetailOrderForm2 = OrderForm2_default;
	const _component_OrderDetailProformaForm = ProformaForm_default;
	const _component_OrderDetailCostForm = CostForm_default;
	const _component_OrderDetailSupplierForm = SupplierForm_default;
	const _component_OrderDetailDocumentForm = DocumentForm_default;
	const _component_OrderDetailCheckForm = CheckForm_default;
	const _component_Button = script;
	const _component_FloatLabel = script$4;
	const _component_InputText = script$5;
	const _component_DatePicker = script$6;
	const _component_AutoComplete = script$7;
	const _component_CustomInput = CustomInput_default;
	_push(`<div${ssrRenderAttrs(mergeProps({
		class: "row mt-3",
		style: { "padding": "0px 50px" }
	}, _attrs))}><div class="col-10">`);
	_push(ssrRenderComponent(_component_TabView, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_TabPanel, { header: "Order" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_OrderDetailOrderForm2, {
							sourceModel: $props.modelProduct,
							products: $props.productsList,
							supplier: $props.supplier,
							unit: $props.unit,
							po: $props.po,
							detailProductTotal: $props.detailProductTotal,
							status: $props.status,
							saveButtonStatus: $props.saveButtonStatus,
							onWorkerman_selected_emit: ($event) => _ctx.$emit("workerman_selected_emit", $event)
						}, null, _parent, _scopeId));
						else return [createVNode(_component_OrderDetailOrderForm2, {
							sourceModel: $props.modelProduct,
							products: $props.productsList,
							supplier: $props.supplier,
							unit: $props.unit,
							po: $props.po,
							detailProductTotal: $props.detailProductTotal,
							status: $props.status,
							saveButtonStatus: $props.saveButtonStatus,
							onWorkerman_selected_emit: ($event) => _ctx.$emit("workerman_selected_emit", $event)
						}, null, 8, [
							"sourceModel",
							"products",
							"supplier",
							"unit",
							"po",
							"detailProductTotal",
							"status",
							"saveButtonStatus",
							"onWorkerman_selected_emit"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_TabPanel, { header: "Proforma" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_OrderDetailProformaForm, {
							model: $props.modelProduction,
							delivery: $props.delivery,
							payment: $props.payment,
							status: $props.status,
							country: $props.country,
							invoice: $props.invoice,
							po: $props.po,
							proformaUploadButtonStatus: $props.proformaUploadButtonStatus,
							onPrepayment_is_activated_emit: ($event) => $options.prePaymentIsActivated($event),
							source: $props.source
						}, null, _parent, _scopeId));
						else return [createVNode(_component_OrderDetailProformaForm, {
							model: $props.modelProduction,
							delivery: $props.delivery,
							payment: $props.payment,
							status: $props.status,
							country: $props.country,
							invoice: $props.invoice,
							po: $props.po,
							proformaUploadButtonStatus: $props.proformaUploadButtonStatus,
							onPrepayment_is_activated_emit: ($event) => $options.prePaymentIsActivated($event),
							source: $props.source
						}, null, 8, [
							"model",
							"delivery",
							"payment",
							"status",
							"country",
							"invoice",
							"po",
							"proformaUploadButtonStatus",
							"onPrepayment_is_activated_emit",
							"source"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				if (!$props.statusAlfa) _push(ssrRenderComponent(_component_TabPanel, { header: "Cost" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_OrderDetailCostForm, {
							cost: $props.cost,
							total: $props.costTotal
						}, null, _parent, _scopeId));
						else return [createVNode(_component_OrderDetailCostForm, {
							cost: $props.cost,
							total: $props.costTotal
						}, null, 8, ["cost", "total"])];
					}),
					_: 1
				}, _parent, _scopeId));
				else _push(`<!---->`);
				_push(ssrRenderComponent(_component_TabPanel, { header: "Supplier" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_OrderDetailSupplierForm, {
							modelProduction: $props.modelProduction,
							productSupplier: $props.productSupplier,
							invoice: $props.invoice,
							supplierDelivery: $props.supplierDelivery,
							po: $props.po,
							supplierProduct: $props.supplierProduct
						}, null, _parent, _scopeId));
						else return [createVNode(_component_OrderDetailSupplierForm, {
							modelProduction: $props.modelProduction,
							productSupplier: $props.productSupplier,
							invoice: $props.invoice,
							supplierDelivery: $props.supplierDelivery,
							po: $props.po,
							supplierProduct: $props.supplierProduct
						}, null, 8, [
							"modelProduction",
							"productSupplier",
							"invoice",
							"supplierDelivery",
							"po",
							"supplierProduct"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_TabPanel, { header: "Document" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_OrderDetailDocumentForm, {
							list: $props.document,
							onProforma_delete_emit: ($event) => _ctx.$emit("proforma_delete_emit", $event),
							onIsf_delete_emit: ($event) => _ctx.$emit("isf_delete_emit", $event)
						}, null, _parent, _scopeId));
						else return [createVNode(_component_OrderDetailDocumentForm, {
							list: $props.document,
							onProforma_delete_emit: ($event) => _ctx.$emit("proforma_delete_emit", $event),
							onIsf_delete_emit: ($event) => _ctx.$emit("isf_delete_emit", $event)
						}, null, 8, [
							"list",
							"onProforma_delete_emit",
							"onIsf_delete_emit"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_TabPanel, { header: "Check" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_OrderDetailCheckForm, {
							list: $props.check,
							total: $props.checkTotal
						}, null, _parent, _scopeId));
						else return [createVNode(_component_OrderDetailCheckForm, {
							list: $props.check,
							total: $props.checkTotal
						}, null, 8, ["list", "total"])];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_TabPanel, { header: "Order" }, {
					default: withCtx(() => [createVNode(_component_OrderDetailOrderForm2, {
						sourceModel: $props.modelProduct,
						products: $props.productsList,
						supplier: $props.supplier,
						unit: $props.unit,
						po: $props.po,
						detailProductTotal: $props.detailProductTotal,
						status: $props.status,
						saveButtonStatus: $props.saveButtonStatus,
						onWorkerman_selected_emit: ($event) => _ctx.$emit("workerman_selected_emit", $event)
					}, null, 8, [
						"sourceModel",
						"products",
						"supplier",
						"unit",
						"po",
						"detailProductTotal",
						"status",
						"saveButtonStatus",
						"onWorkerman_selected_emit"
					])]),
					_: 1
				}),
				createVNode(_component_TabPanel, { header: "Proforma" }, {
					default: withCtx(() => [createVNode(_component_OrderDetailProformaForm, {
						model: $props.modelProduction,
						delivery: $props.delivery,
						payment: $props.payment,
						status: $props.status,
						country: $props.country,
						invoice: $props.invoice,
						po: $props.po,
						proformaUploadButtonStatus: $props.proformaUploadButtonStatus,
						onPrepayment_is_activated_emit: ($event) => $options.prePaymentIsActivated($event),
						source: $props.source
					}, null, 8, [
						"model",
						"delivery",
						"payment",
						"status",
						"country",
						"invoice",
						"po",
						"proformaUploadButtonStatus",
						"onPrepayment_is_activated_emit",
						"source"
					])]),
					_: 1
				}),
				!$props.statusAlfa ? (openBlock(), createBlock(_component_TabPanel, {
					key: 0,
					header: "Cost"
				}, {
					default: withCtx(() => [createVNode(_component_OrderDetailCostForm, {
						cost: $props.cost,
						total: $props.costTotal
					}, null, 8, ["cost", "total"])]),
					_: 1
				})) : createCommentVNode("", true),
				createVNode(_component_TabPanel, { header: "Supplier" }, {
					default: withCtx(() => [createVNode(_component_OrderDetailSupplierForm, {
						modelProduction: $props.modelProduction,
						productSupplier: $props.productSupplier,
						invoice: $props.invoice,
						supplierDelivery: $props.supplierDelivery,
						po: $props.po,
						supplierProduct: $props.supplierProduct
					}, null, 8, [
						"modelProduction",
						"productSupplier",
						"invoice",
						"supplierDelivery",
						"po",
						"supplierProduct"
					])]),
					_: 1
				}),
				createVNode(_component_TabPanel, { header: "Document" }, {
					default: withCtx(() => [createVNode(_component_OrderDetailDocumentForm, {
						list: $props.document,
						onProforma_delete_emit: ($event) => _ctx.$emit("proforma_delete_emit", $event),
						onIsf_delete_emit: ($event) => _ctx.$emit("isf_delete_emit", $event)
					}, null, 8, [
						"list",
						"onProforma_delete_emit",
						"onIsf_delete_emit"
					])]),
					_: 1
				}),
				createVNode(_component_TabPanel, { header: "Check" }, {
					default: withCtx(() => [createVNode(_component_OrderDetailCheckForm, {
						list: $props.check,
						total: $props.checkTotal
					}, null, 8, ["list", "total"])]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col-2">`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "success",
		class: "w-100 mb-3",
		label: "Save",
		onClick: ($event) => _ctx.$emit("process"),
		disabled: $props.saveButtonStatus
	}, null, _parent));
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "danger",
		class: "w-100 mb-4",
		label: "Exit",
		onClick: ($event) => _ctx.$emit("close_production_form_emit")
	}, null, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "po",
					modelValue: $props.modelProduction.SiparisNo,
					"onUpdate:modelValue": ($event) => $props.modelProduction.SiparisNo = $event,
					class: "w-100",
					disabled: !$props.status,
					onInput: ($event) => $options.inputPo($event)
				}, null, _parent, _scopeId));
				_push(`<label for="po"${_scopeId}>Po</label>`);
			} else return [createVNode(_component_InputText, {
				id: "po",
				modelValue: $props.modelProduction.SiparisNo,
				"onUpdate:modelValue": ($event) => $props.modelProduction.SiparisNo = $event,
				class: "w-100",
				disabled: !$props.status,
				onInput: ($event) => $options.inputPo($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"disabled",
				"onInput"
			]), createVNode("label", { for: "po" }, "Po")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_DatePicker, {
					modelValue: $data.order_date,
					"onUpdate:modelValue": ($event) => $data.order_date = $event,
					inputId: "order_date",
					class: "w-100",
					onDateSelect: ($event) => $options.orderDateSelected($event),
					disabled: !$props.status,
					dateFormat: "dd/mm/yy"
				}, null, _parent, _scopeId));
				_push(`<label for="order_date"${_scopeId}>Date</label>`);
			} else return [createVNode(_component_DatePicker, {
				modelValue: $data.order_date,
				"onUpdate:modelValue": ($event) => $data.order_date = $event,
				inputId: "order_date",
				class: "w-100",
				onDateSelect: ($event) => $options.orderDateSelected($event),
				disabled: !$props.status,
				dateFormat: "dd/mm/yy"
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"onDateSelect",
				"disabled"
			]), createVNode("label", { for: "order_date" }, "Date")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_DatePicker, {
					modelValue: $data.guess_loading_date,
					"onUpdate:modelValue": ($event) => $data.guess_loading_date = $event,
					inputId: "guess_loading_date",
					class: "w-100",
					onDateSelect: ($event) => $options.guessLoadingDateSelected($event),
					disabled: !$props.status,
					dateFormat: "dd/mm/yy"
				}, null, _parent, _scopeId));
				_push(`<label for="guess_loading_date"${_scopeId}>Estimated Shipment Date</label>`);
			} else return [createVNode(_component_DatePicker, {
				modelValue: $data.guess_loading_date,
				"onUpdate:modelValue": ($event) => $data.guess_loading_date = $event,
				inputId: "guess_loading_date",
				class: "w-100",
				onDateSelect: ($event) => $options.guessLoadingDateSelected($event),
				disabled: !$props.status,
				dateFormat: "dd/mm/yy"
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"onDateSelect",
				"disabled"
			]), createVNode("label", { for: "guess_loading_date" }, "Estimated Shipment Date")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedCustomer,
					"onUpdate:modelValue": ($event) => $data.selectedCustomer = $event,
					inputId: "customer",
					suggestions: $data.filteredCustomer,
					onComplete: ($event) => $options.searchCustomer($event),
					optionLabel: "FirmaAdi",
					onItemSelect: ($event) => $options.customerSelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="customer"${_scopeId}>Customer</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedCustomer,
				"onUpdate:modelValue": ($event) => $data.selectedCustomer = $event,
				inputId: "customer",
				suggestions: $data.filteredCustomer,
				onComplete: ($event) => $options.searchCustomer($event),
				optionLabel: "FirmaAdi",
				onItemSelect: ($event) => $options.customerSelected($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect"
			]), createVNode("label", { for: "customer" }, "Customer")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedOrderer,
					"onUpdate:modelValue": ($event) => $data.selectedOrderer = $event,
					inputId: "user",
					suggestions: $data.filteredOrderer,
					onComplete: ($event) => $options.searchOrderer($event),
					optionLabel: "KullaniciAdi",
					onItemSelect: ($event) => $options.ordererSelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="user"${_scopeId}>Seller</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedOrderer,
				"onUpdate:modelValue": ($event) => $data.selectedOrderer = $event,
				inputId: "user",
				suggestions: $data.filteredOrderer,
				onComplete: ($event) => $options.searchOrderer($event),
				optionLabel: "KullaniciAdi",
				onItemSelect: ($event) => $options.ordererSelected($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect"
			]), createVNode("label", { for: "user" }, "Seller")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedOperation,
					"onUpdate:modelValue": ($event) => $data.selectedOperation = $event,
					inputId: "operation",
					suggestions: $data.filteredOperation,
					onComplete: ($event) => $options.searchOperation($event),
					optionLabel: "KullaniciAdi",
					onItemSelect: ($event) => $options.operationSelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="operation"${_scopeId}>Operation</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedOperation,
				"onUpdate:modelValue": ($event) => $data.selectedOperation = $event,
				inputId: "operation",
				suggestions: $data.filteredOperation,
				onComplete: ($event) => $options.searchOperation($event),
				optionLabel: "KullaniciAdi",
				onItemSelect: ($event) => $options.operationSelected($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect"
			]), createVNode("label", { for: "operation" }, "Operation")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedFinanceman,
					"onUpdate:modelValue": ($event) => $data.selectedFinanceman = $event,
					inputId: "financeman",
					suggestions: $data.filteredFinanceman,
					onComplete: ($event) => $options.searchFinanceman($event),
					optionLabel: "KullaniciAdi",
					onItemSelect: ($event) => $options.financemanSelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="financeman"${_scopeId}>Finance</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedFinanceman,
				"onUpdate:modelValue": ($event) => $data.selectedFinanceman = $event,
				inputId: "financeman",
				suggestions: $data.filteredFinanceman,
				onComplete: ($event) => $options.searchFinanceman($event),
				optionLabel: "KullaniciAdi",
				onItemSelect: ($event) => $options.financemanSelected($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect"
			]), createVNode("label", { for: "financeman" }, "Finance")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $props.modelProduction.Pesinat,
		text: "Prepayment",
		onOnInput: ($event) => $props.modelProduction.Pesinat = $event,
		disabled: $data.prepaymentDisabledForm
	}, null, _parent));
	_push(`<table class="table mb-4"><thead><tr><th scope="col"></th></tr></thead><tbody><tr><th scope="row">Total</th><td>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.productCalculation))}</td></tr><tr><th scope="row">Freight Cost</th><td>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.freightCalculation))}</td></tr><tr><th scope="row">Total (Other)</th><td>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailCalculation))}</td></tr><tr><th scope="row">G.Total</th><td>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.productCalculation + $props.freightCalculation + $props.detailCalculation))}</td></tr></tbody></table>`);
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_DatePicker, {
					modelValue: $data.load_date,
					"onUpdate:modelValue": ($event) => $data.load_date = $event,
					inputId: "load_date",
					class: "w-100",
					disabled: "",
					dateFormat: "dd/mm/yy"
				}, null, _parent, _scopeId));
				_push(`<label for="load_date"${_scopeId}>Shipment Date</label>`);
			} else return [createVNode(_component_DatePicker, {
				modelValue: $data.load_date,
				"onUpdate:modelValue": ($event) => $data.load_date = $event,
				inputId: "load_date",
				class: "w-100",
				disabled: "",
				dateFormat: "dd/mm/yy"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "load_date" }, "Shipment Date")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_DatePicker, {
					modelValue: $data.eta_date,
					"onUpdate:modelValue": ($event) => $data.eta_date = $event,
					inputId: "eta_date",
					class: "w-100",
					disabled: "",
					dateFormat: "dd/mm/yy"
				}, null, _parent, _scopeId));
				_push(`<label for="eta_date"${_scopeId}>ETA</label>`);
			} else return [createVNode(_component_DatePicker, {
				modelValue: $data.eta_date,
				"onUpdate:modelValue": ($event) => $data.eta_date = $event,
				inputId: "eta_date",
				class: "w-100",
				disabled: "",
				dateFormat: "dd/mm/yy"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "eta_date" }, "ETA")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "container",
					modelValue: $props.modelProduction.KonteynerNo,
					"onUpdate:modelValue": ($event) => $props.modelProduction.KonteynerNo = $event,
					class: "w-100",
					disabled: ""
				}, null, _parent, _scopeId));
				_push(`<label for="container"${_scopeId}>Container No</label>`);
			} else return [createVNode(_component_InputText, {
				id: "container",
				modelValue: $props.modelProduction.KonteynerNo,
				"onUpdate:modelValue": ($event) => $props.modelProduction.KonteynerNo = $event,
				class: "w-100",
				disabled: ""
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "container" }, "Container No")];
		}),
		_: 1
	}, _parent));
	_push(`<table class="table mb-4"><thead><tr><th scope="col"></th></tr></thead><tbody><tr><th scope="row">Producer</th><td>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductCost.supplier))}</td></tr><tr><th scope="row">Labour Cost</th><td>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductCost.workerman))}</td></tr><tr><th scope="row">Freight Quote</th><td>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductCost.freight))}</td></tr><tr><th scope="row">Other (Cost)</th><td>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductCost.detail))}</td></tr><tr><th scope="row">Commission</th><td>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductCost.brokerage))}</td></tr><tr><th scope="row">Fob</th><td>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductCost.fob))}</td></tr><tr><th scope="row">G. Total</th><td>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductCost.supplier + $props.detailProductCost.workerman + $props.detailProductCost.freight + $props.detailProductCost.detail + $props.detailProductCost.brokerage + $props.detailProductCost.fob))}</td></tr><tr><th scope="row">Profit</th><td>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.productCalculation + $props.freightCalculation + $props.detailCalculation - ($props.detailProductCost.supplier + $props.detailProductCost.workerman + $props.detailProductCost.freight + $props.detailProductCost.detail + $props.detailProductCost.brokerage + $props.detailProductCost.fob)))}</td></tr></tbody></table></div></div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/orderDetail/Form2.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Form2_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]), { __name: "OrderDetailForm2" });
//#endregion
//#region app/pages/reports/mekmer/productions.vue
var _sfc_main = /*@__PURE__*/ Object.assign({
	computed: {
		orderStore() {
			return useOrderStore();
		},
		sharedStore() {
			return useSharedStore();
		},
		modelsStore() {
			return useModelsStore();
		}
	},
	data() {
		return {
			localOrderList: [],
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
	watch: {
		"orderStore.getOrderList"(newVal) {
			if (newVal && newVal.length > 0) this.localOrderList = JSON.parse(JSON.stringify(newVal));
		},
		"orderStore.getOrderProductionYearsList"() {
			this.selectedYear = { Yil: (/* @__PURE__ */ new Date()).getFullYear() };
		}
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
			this.orderStore.setOrderProductionSourceTypes();
			this.orderStore.setOrderProductionButtonStatus(true);
			this.modelsStore.setOrderProductionModel();
			this.modelsStore.setOrderProductModel();
			this.orderStore.setOrderProductionDetailListReset();
			this.orderStore.setOrderProductionPo(null);
			this.orderStore.setOrderProductionUploadProformaButtonStatus(true);
			this.orderStore.MUT_setOrderSupplierProductList([]);
			this.sharedStore.setOrderAllList();
			this.productionModel = this.modelsStore.getOrderProductionModel;
			this.production_detail_form = true;
		},
		productionSelected(event) {
			this.orderStore.setOrderProductionSourceTypes();
			this.orderStore.setOrderProductionButtonStatus(false);
			this.modelsStore.setOrderProductModel();
			this.orderStore.setOrderProductionProductDetailMekmerList(event.SiparisNo);
			this.orderStore.setOrderProductionCostList(event.SiparisNo);
			this.orderStore.setOrderProductionSupplierList(event.SiparisNo);
			this.orderStore.setOrderProductionDocumentList(event.SiparisNo);
			this.orderStore.setOrderProductionCheckMekmerList(event.SiparisNo);
			this.orderStore.setOrderProductionFreightTotal(event.NavlunSatis);
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
			this.production_detail_form = true;
		}
	}
}, {
	__name: "productions",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		[__temp, __restore] = withAsyncContext(() => useOrderReferenceData()), await __temp, __restore();
		const orderStore = useOrderStore();
		[__temp, __restore] = withAsyncContext(async () => useAsyncData("reports-mekmer-productions", async () => {
			await Promise.all([orderStore.setOrderProductionMekmerList(), orderStore.setOrderProductionSourceTypes()]);
			return true;
		}, { server: false })), await __temp, __restore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Button = script;
			const _component_OrderTable2 = Table2_default;
			const _component_Dialog = script$1;
			const _component_OrderDetailForm2 = Form2_default;
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
				loading: _ctx.sharedStore.isLoadingDatatable,
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
					if (_push) _push(ssrRenderComponent(_component_OrderDetailForm2, {
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
						source: unref(orderStore).getOrderProductionSourceTypes
					}, null, _parent, _scopeId));
					else return [createVNode(_component_OrderDetailForm2, {
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reports/mekmer/productions.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=productions-TKeTAepr.mjs.map
