import { a as useAppToast, $ as $fetch$2, e as formatPriceUsd, k as formatPriceTl, c as dateToString, _ as _plugin_vue_export_helper_default, F as FilterMatchMode } from '../virtual/entry.mjs';
import { n as script$1 } from './button-C8Z7Yc79.mjs';
import { n as script$5 } from './column-CT6GXkG2.mjs';
import { n as script$4 } from './datatable-D6ou7HZJ.mjs';
import { t as script } from './select-T8LIeBQG.mjs';
import { n as script$2 } from './checkbox-wtvrQjx7.mjs';
import { n as script$3 } from './dialog-BB6no0wu.mjs';
import { u as useLegacyApi } from './useLegacyApi-B5zRc7ig.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { e as exportExcel } from './useExcelExport-B-DCkvaR.mjs';
import { C as CustomInput_default } from './CustomInput-B9GfGXia.mjs';
import { u as useOrderStore } from './order-C0FMsqTx.mjs';
import { u as useReportsStore } from './reports-ALTSksCi.mjs';
import { unref, withCtx, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString, createVNode, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
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
import './inputnumber-DEH2bm5F.mjs';
import './times-CPhkDIFg.mjs';
import './baseinput-SDS7K395.mjs';
import './baseeditableholder-y-Ph8z9F.mjs';
import './inputtext-s6cxdqDx.mjs';
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
import './radiobutton-C-685P7O.mjs';
import './plus-CA09jZgn.mjs';
import './focustrap-kXXT0pga.mjs';
import './sortamountupalt-MmmjHcOR.mjs';
import './minus-C71kU5yE.mjs';
import './utils-9fKJJYP7.mjs';
import './useApi-CGFzrxZs.mjs';
import './floatlabel-BDqo8RCT.mjs';
import './models-CeLtEMS4.mjs';

//#region app/components/reports/mekmar/AyoCreditCardForm.vue
var _sfc_main$4 = {
	props: {
		id: {
			type: Number,
			required: true
		},
		month: {
			type: String,
			required: true
		},
		value: {
			type: Number,
			required: false
		},
		usd: {
			type: Number,
			required: true
		},
		currency: {
			type: Number,
			required: true
		},
		month_id: {
			type: Number,
			required: true
		},
		year: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			valueLocal: 0,
			currencyLocal: 0,
			usdLocal: 0,
			save_button_disabled: true,
			update_button_disabled: true
		};
	},
	created() {
		if (this.value == 0 || this.value == null || this.value == void 0 || this.value == "") {
			this.save_button_disabled = false;
			this.update_button_disabled = true;
		} else {
			this.save_button_disabled = true;
			this.update_button_disabled = false;
		}
	},
	methods: {
		save() {
			const data = {
				"month": this.month_id,
				"value": this.valueLocal,
				"usd": this.usdLocal,
				"currency": this.currencyLocal,
				"year": this.year
			};
			this.$emit("cost_save_emit", data);
			this.save_button_disabled = true;
			this.update_button_disabled = false;
		},
		update() {
			const data = {
				"id": this.id,
				"month": this.month_id,
				"value": this.valueLocal,
				"usd": this.usdLocal,
				"currency": this.currencyLocal,
				"year": this.year
			};
			this.$emit("cost_update_emit", data);
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				this.valueLocal = v;
			}
		},
		currency: {
			immediate: true,
			handler(v) {
				this.currencyLocal = v;
			}
		},
		usd: {
			immediate: true,
			handler(v) {
				this.usdLocal = v;
			}
		},
		valueLocal() {
			this.usdLocal = this.currencyLocal ? this.valueLocal / this.currencyLocal : 0;
		},
		currencyLocal() {
			this.usdLocal = this.currencyLocal ? this.valueLocal / this.currencyLocal : 0;
		}
	}
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_CustomInput = CustomInput_default;
	const _component_Button = script$1;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "row mt-3" }, _attrs))}><div class="col">${ssrInterpolate($props.month)}</div><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.valueLocal,
		text: "Tl",
		onOnInput: ($event) => $data.valueLocal = $event,
		disabled: false
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.currencyLocal,
		text: "Currency",
		onOnInput: ($event) => $data.currencyLocal = $event,
		disabled: true
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.usdLocal,
		text: "Usd",
		onOnInput: ($event) => $data.usdLocal = $event,
		disabled: false
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_Button, {
		severity: "success",
		class: "w-100",
		label: "Save",
		onClick: $options.save,
		disabled: $data.save_button_disabled
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_Button, {
		severity: "warn",
		class: "w-100",
		label: "Update",
		onClick: $options.update,
		disabled: $data.update_button_disabled
	}, null, _parent));
	_push(`</div><hr></div>`);
}
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/reports/mekmar/AyoCreditCardForm.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var AyoCreditCardForm_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3]]), { __name: "ReportsMekmarAyoCreditCardForm" });
//#endregion
//#region app/components/reports/mekmar/AyoFormCurrency.vue
var _sfc_main$3 = {
	props: {
		id: {
			type: Number,
			required: true
		},
		month: {
			type: String,
			required: true
		},
		currency: {
			type: Number,
			required: true
		},
		month_id: {
			type: Number,
			required: true
		},
		year: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			currencyValue: this.currency,
			save_button_disabled: true,
			update_button_disabled: true,
			currency_list: [],
			currency_total: 0,
			currency_loading: false
		};
	},
	mounted() {
		if (this.currencyValue == 0 || this.currencyValue == null || this.currencyValue == void 0 || this.currencyValue == "") {
			this.save_button_disabled = false;
			this.update_button_disabled = true;
		} else {
			this.save_button_disabled = true;
			this.update_button_disabled = false;
		}
	},
	methods: {
		save() {
			const data = {
				month: this.month_id,
				currency: this.currencyValue,
				year: this.year
			};
			this.$emit("cost_save_emit", data);
			this.save_button_disabled = true;
			this.update_button_disabled = false;
		},
		update() {
			const data = {
				id: this.id,
				month: this.month_id,
				currency: this.currencyValue,
				year: this.year
			};
			this.$emit("cost_update_emit", data);
		},
		getCurrency(month_) {
			this.currency_loading = true;
			const days = new Date(this.year, month_, 0).getDate();
			$fetch$2(`/tcmb-api/usd-average/${this.year}/${month_}/${days}`, { baseURL: "/" }).then((response) => {
				this.currencyValue = response.average;
				if (!response.dayCountWithData) useAppToast().warn("Bu ay icin TCMB kuru bulunamadi, ortalama hesaplanamadi.");
			}).catch((err) => {
				console.error("ortalama kur alinamadi:", err);
				useAppToast().error("Ortalama kur alınamadı.");
			}).finally(() => {
				this.currency_loading = false;
			});
		}
	},
	watch: { currency(value) {
		this.currencyValue = value;
	} }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_CustomInput = CustomInput_default;
	const _component_Button = script$1;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "row mt-3" }, _attrs))}><div class="col">${ssrInterpolate($props.month)}</div><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.currencyValue,
		text: "Currency",
		onOnInput: ($event) => $data.currencyValue = $event,
		disabled: false
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_Button, {
		severity: "secondary",
		class: "w-100",
		label: "Get Currency",
		onClick: ($event) => $options.getCurrency($props.month_id),
		loading: $data.currency_loading,
		disabled: $data.currency_loading
	}, null, _parent));
	_push(`</div><hr></div>`);
}
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/reports/mekmar/AyoFormCurrency.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var AyoFormCurrency_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]), { __name: "ReportsMekmarAyoFormCurrency" });
//#endregion
//#region app/components/reports/mekmar/AyoListForm.vue
var _sfc_main$2 = {
	name: "CustomOrderTable",
	props: { list: {
		type: Array,
		required: true
	} },
	data() {
		return {
			isTooltipVisible: false,
			activeTooltipText: "",
			tooltipX: 0,
			tooltipY: 0,
			filters: {
				siparisci: "",
				musteri_adi: "",
				siparis_no: "",
				ulke_adi: "",
				fDate: "",
				country: "",
				deliveryTerm: ""
			}
		};
	},
	computed: {
		tooltipStyle() {
			return {
				top: `${this.tooltipY + 15}px`,
				left: `${this.tooltipX + 15}px`
			};
		},
		filteredOrders() {
			return this.list.filter((item) => {
				const f = this.filters;
				return (!f.siparisci || item.siparisci.toLowerCase().includes(f.siparisci.toLowerCase())) && (!f.musteri_adi || item.musteri_adi.toLowerCase().includes(f.musteri_adi.toLowerCase())) && (!f.siparis_no || item.siparis_no.toLowerCase().includes(f.siparis_no.toLowerCase())) && (!f.ulke_adi || item.ulke_adi.toLowerCase().includes(f.ulke_adi.toLowerCase())) && (!f.teslim_sekli || item.teslim_sekli.toLowerCase().includes(f.teslim_sekli.toLowerCase())) && (!f.siparis_tarihi || item.siparis_tarihi.includes(f.siparis_tarihi)) && (!f.yukleme_tarihi || item.yukleme_tarihi.includes(f.yukleme_tarihi));
			});
		},
		totals() {
			const t = {
				toplam_bedel: 0,
				kar_zarar: 0,
				kar_zarar_tl: 0,
				mekmar_alim: 0,
				dis_alim: 0,
				nakliye: 0,
				gumruk: 0,
				ilaclama: 0,
				liman: 0,
				sigorta: 0,
				navlun: 0,
				lashing: 0,
				spazlet: 0,
				detail: 0,
				ozel_iscilik: 0,
				office_cost: 0,
				masraf_toplam: 0
			};
			this.filteredOrders.forEach((o) => {
				t.toplam_bedel += o.toplam_bedel;
				t.kar_zarar += o.kar_zarar;
				t.kar_zarar_tl += o.kar_zarar_tl;
				t.mekmar_alim += o.mekmar_alim;
				t.dis_alim += o.dis_alim;
				t.nakliye += o.nakliye;
				t.gumruk += o.gumruk;
				t.ilaclama += o.ilaclama;
				t.liman += o.liman;
				t.sigorta += o.sigorta;
				t.navlun += o.navlun;
				t.lashing += o.lashing;
				t.spazlet += o.spazlet;
				t.detail += o.detay_1 + o.detay_2 + o.detay_3;
				t.ozel_iscilik += o.ozel_iscilik;
				t.office_cost += o.banka_masrafi + o.kurye_masrafi;
				t.masraf_toplam += o.masraf_toplam;
			});
			return t;
		}
	},
	methods: {
		showTooltip(e, text) {
			this.activeTooltipText = text;
			this.isTooltipVisible = true;
			this.moveTooltip(e);
		},
		moveTooltip(e) {
			this.tooltipX = e.clientX;
			this.tooltipY = e.clientY;
		},
		hideTooltip() {
			this.isTooltipVisible = false;
		},
		mekmarAyoSelected(event) {
			this.$emit("mekmar_ayo_selected_emit", event);
		},
		formatCurrency(val, currency = "USD") {
			return new Intl.NumberFormat("en-US", {
				style: "currency",
				currency,
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}).format(val);
		}
	}
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "table-wrapper" }, _attrs))} data-v-ec318d4c>`);
	if ($data.isTooltipVisible) _push(`<div class="cursor-tooltip" style="${ssrRenderStyle($options.tooltipStyle)}" data-v-ec318d4c><span class="label" data-v-ec318d4c>PO:</span><span class="value" data-v-ec318d4c>${ssrInterpolate($data.activeTooltipText)}</span></div>`);
	else _push(`<!---->`);
	_push(`<div class="header-section" data-v-ec318d4c><h3 data-v-ec318d4c>AYO LIST</h3><span class="subtitle" data-v-ec318d4c>${ssrInterpolate($options.filteredOrders.length)} kayıt listeleniyor</span></div><div class="table-container" data-v-ec318d4c><table data-v-ec318d4c><thead data-v-ec318d4c><tr class="header-row" data-v-ec318d4c><th class="text-center" style="${ssrRenderStyle({ "max-width": "100px" })}" data-v-ec318d4c>Seller</th><th class="text-center" style="${ssrRenderStyle({ "max-width": "100px" })}" data-v-ec318d4c>Customer</th><th class="text-center" style="${ssrRenderStyle({ "max-width": "100px" })}" data-v-ec318d4c>Po</th><th class="text-center" data-v-ec318d4c>O. Date</th><th class="text-center" data-v-ec318d4c>F. Date</th><th class="text-center" style="${ssrRenderStyle({ "max-width": "100px" })}" data-v-ec318d4c>Country</th><th class="text-center" data-v-ec318d4c>Term</th><th class="text-center" data-v-ec318d4c>Proforma</th><th class="text-center" data-v-ec318d4c>Profit / USD</th><th class="text-center" data-v-ec318d4c>Profit / TRY</th><th class="text-center" data-v-ec318d4c>Profit %</th><th class="text-center" data-v-ec318d4c>Prod. (Mekmer)</th><th class="text-center" data-v-ec318d4c>Prod. (Others)</th><th class="text-center" data-v-ec318d4c>Logistics</th><th class="text-center" data-v-ec318d4c>Custom</th><th class="text-center" data-v-ec318d4c>Fumigation</th><th class="text-center" data-v-ec318d4c>Port</th><th class="text-center" data-v-ec318d4c>Insurance</th><th class="text-center" data-v-ec318d4c>Freight</th><th class="text-center" data-v-ec318d4c>Lashing</th><th class="text-center" data-v-ec318d4c>Spanzlet</th><th class="text-center" data-v-ec318d4c>Detail(SUM)</th><th class="text-center" data-v-ec318d4c>M.Labour Cost</th><th class="text-center" data-v-ec318d4c>Office Cost</th><th class="text-center" data-v-ec318d4c>Total</th><th class="text-center" data-v-ec318d4c>Date of Closure</th></tr><tr class="filter-row" data-v-ec318d4c><th data-v-ec318d4c><input${ssrRenderAttr("value", $data.filters.siparisci)} placeholder="Ara..." style="${ssrRenderStyle({ "max-width": "100px" })}" data-v-ec318d4c></th><th data-v-ec318d4c><input${ssrRenderAttr("value", $data.filters.musteri_adi)} placeholder="Ara..." style="${ssrRenderStyle({ "max-width": "100px" })}" data-v-ec318d4c></th><th data-v-ec318d4c><input${ssrRenderAttr("value", $data.filters.siparis_no)} placeholder="Ara..." style="${ssrRenderStyle({ "max-width": "100px" })}" data-v-ec318d4c></th><th data-v-ec318d4c><input${ssrRenderAttr("value", $data.filters.siparis_tarihi)} placeholder="Tarih" class="text-center" data-v-ec318d4c></th><th data-v-ec318d4c><input${ssrRenderAttr("value", $data.filters.yukleme_tarihi)} placeholder="Tarih" class="text-center" data-v-ec318d4c></th><th data-v-ec318d4c><input${ssrRenderAttr("value", $data.filters.ulke_adi)} placeholder="Ülke" data-v-ec318d4c></th><th data-v-ec318d4c><input${ssrRenderAttr("value", $data.filters.teslim_sekli)} placeholder="Term" class="text-center" data-v-ec318d4c></th><th colspan="19" class="empty-filter" data-v-ec318d4c></th></tr></thead><tbody data-v-ec318d4c><!--[-->`);
	ssrRenderList($options.filteredOrders, (item) => {
		_push(`<tr class="hover_datatable" data-v-ec318d4c><td style="${ssrRenderStyle({ "max-width": "100px" })}" data-v-ec318d4c>${ssrInterpolate(item.siparisci)}</td><td class="font-medium wrap-text" data-v-ec318d4c>${ssrInterpolate(item.musteri_adi)}</td><td style="${ssrRenderStyle({ "max-width": "100px" })}" data-v-ec318d4c><span class="badge badge-po" style="${ssrRenderStyle({ backgroundColor: item.dosya_kapanma_date == "-" ? "#fae8b3" : "" })}" data-v-ec318d4c>${ssrInterpolate(item.siparis_no)}</span></td><td class="text-center text-sm text-gray-500 wrap-text" data-v-ec318d4c>${ssrInterpolate(item.siparis_tarihi)}</td><td class="text-center text-sm text-gray-500 wrap-text" data-v-ec318d4c>${ssrInterpolate(item.yukleme_tarihi)}</td><td class="wrap-text" data-v-ec318d4c>${ssrInterpolate(item.ulke_adi)}</td><td class="text-center" data-v-ec318d4c><span class="badge badge-term" data-v-ec318d4c>${ssrInterpolate(item.teslim_sekli)}</span></td><td class="text-center font-bold" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.toplam_bedel))}</td><td class="text-center" data-v-ec318d4c><span data-v-ec318d4c><span class="${ssrRenderClass(item.profitUsd < 0 ? "text-danger" : "text-success")}" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.kar_zarar))}</span></span></td><td class="text-center" data-v-ec318d4c><span data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.kar_zarar_tl, "TRY"))}</span></td><td class="text-center text-sm" data-v-ec318d4c><span data-v-ec318d4c> %${ssrInterpolate(item.kar_zarar_tl_yuzdesi)}</span></td><td class="text-center" data-v-ec318d4c>`);
		if (item.mekmar_alim > 0) _push(`<span class="${ssrRenderClass(item.mekmer_alim_alis_kontrol > 0 ? "highlight-box" : "")}" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.mekmar_alim))}</span>`);
		else _push(`<span class="text-muted" data-v-ec318d4c>-</span>`);
		_push(`</td><td class="text-center" data-v-ec318d4c>`);
		if (item.dis_alim > 0) _push(`<span class="${ssrRenderClass(item.dis_alim_alis_kontrol > 0 ? "highlight-box" : "")}" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.dis_alim))}</span>`);
		else _push(`<span class="text-muted" data-v-ec318d4c>-</span>`);
		_push(`</td><td class="text-center" data-v-ec318d4c>`);
		if (item.nakliye > 0) _push(`<span class="${ssrRenderClass(item.nakliye_evrak.length == 0 && item.nakliye > 0 ? "highlight-box" : "")}" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.nakliye))}</span>`);
		else _push(`<span class="text-muted" data-v-ec318d4c>-</span>`);
		_push(`</td><td class="text-center" data-v-ec318d4c>`);
		if (item.gumruk > 0) _push(`<span class="${ssrRenderClass(item.gumruk_evrak.length == 0 && item.gumruk > 0 ? "highlight-box" : "")}" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.gumruk))}</span>`);
		else _push(`<span class="text-muted" data-v-ec318d4c>-</span>`);
		_push(`</td><td class="text-center" data-v-ec318d4c>`);
		if (item.ilaclama > 0) _push(`<span class="${ssrRenderClass(item.ilaclama.length == 0 && item.ilaclama > 0 ? "highlight-box" : "")}" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.ilaclama))}</span>`);
		else _push(`<span class="text-muted" data-v-ec318d4c>-</span>`);
		_push(`</td><td class="text-center" data-v-ec318d4c>`);
		if (item.liman > 0) _push(`<span class="${ssrRenderClass(item.liman.length == 0 && item.liman > 0 ? "highlight-box" : "")}" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.liman))}</span>`);
		else _push(`<span class="text-muted" data-v-ec318d4c>-</span>`);
		_push(`</td><td class="text-center" data-v-ec318d4c>`);
		if (item.sigorta > 0) _push(`<span class="${ssrRenderClass(item.sigorta_id == 1 && item.sigorta == 0 ? "highlight-box" : "")}" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.sigorta))}</span>`);
		else _push(`<span class="text-muted" data-v-ec318d4c>-</span>`);
		_push(`</td><td class="text-center" data-v-ec318d4c>`);
		if (item.navlun > 0) _push(`<span class="${ssrRenderClass(item.navlun > 0 && item.navlun_evrak.length <= 0 ? "highlight-box" : "")}" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.navlun))}</span>`);
		else _push(`<span class="text-muted" data-v-ec318d4c>-</span>`);
		_push(`</td><td class="text-center" data-v-ec318d4c>`);
		if (item.lashing > 0) _push(`<span class="${ssrRenderClass(item.lashing > 0 && item.lashing_evrak.length <= 0 ? "highlight-box" : "")}" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.lashing))}</span>`);
		else _push(`<span class="text-muted" data-v-ec318d4c>-</span>`);
		_push(`</td><td class="text-center" data-v-ec318d4c>`);
		if (item.spazlet > 0) _push(`<span class="${ssrRenderClass(item.spazlet > 0 && item.spazlet_evrak.length <= 0 ? "highlight-box" : "")}" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.spazlet))}</span>`);
		else _push(`<span class="text-muted" data-v-ec318d4c>-</span>`);
		_push(`</td><td class="text-center" data-v-ec318d4c>`);
		if (item.detay_1 + item.detay_2 + item.detay_3 > 0) _push(`<span data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.detay_1 + item.detay_2 + item.detay_3))}</span>`);
		else _push(`<span class="text-muted" data-v-ec318d4c>-</span>`);
		_push(`</td><td class="text-center" data-v-ec318d4c>`);
		if (item.ozel_iscilik > 0) _push(`<span class="${ssrRenderClass(item.ozel_iscilik > 0 && item.ozel_iscilik_evrak.length <= 0 ? "highlight-box" : "")}" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.ozel_iscilik))}</span>`);
		else _push(`<span class="text-muted" data-v-ec318d4c>-</span>`);
		_push(`</td><td class="text-center" data-v-ec318d4c>`);
		if (item.banka_masrafi + item.kurye_masrafi > 0) _push(`<span data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.banka_masrafi + item.kurye_masrafi))}</span>`);
		else _push(`<span class="text-muted" data-v-ec318d4c>-</span>`);
		_push(`</td><td class="text-center" data-v-ec318d4c>`);
		if (item.masraf_toplam > 0) _push(`<span data-v-ec318d4c>${ssrInterpolate($options.formatCurrency(item.masraf_toplam))}</span>`);
		else _push(`<span class="text-muted" data-v-ec318d4c>-</span>`);
		_push(`</td><td class="text-center" data-v-ec318d4c>${ssrInterpolate(item.dosya_kapanma_date)}</td></tr>`);
	});
	_push(`<!--]-->`);
	if ($options.filteredOrders.length === 0) _push(`<tr data-v-ec318d4c><td colspan="16" class="no-data" data-v-ec318d4c>Kayıt bulunamadı.</td></tr>`);
	else _push(`<!---->`);
	_push(`</tbody><tfoot data-v-ec318d4c><tr data-v-ec318d4c><td colspan="7" class="footer-label" data-v-ec318d4c>Genel Toplamlar:</td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.toplam_bedel))}</td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.kar_zarar))}</td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.kar_zarar_tl, "TRY"))}</td><td data-v-ec318d4c></td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.mekmar_alim))}</td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.dis_alim))}</td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.nakliye))}</td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.gumruk))}</td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.ilaclama))}</td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.liman))}</td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.sigorta))}</td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.navlun))}</td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.lashing))}</td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.spazlet))}</td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.detail))}</td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.ozel_iscilik))}</td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.office_cost))}</td><td class="text-right" data-v-ec318d4c>${ssrInterpolate($options.formatCurrency($options.totals.masraf_toplam))}</td></tr></tfoot></table></div></div>`);
}
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/reports/mekmar/AyoListForm.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var AyoListForm_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-ec318d4c"]]), { __name: "ReportsMekmarAyoListForm" });
//#endregion
//#region app/components/reports/mekmar/AyoList.vue
var _sfc_main$1 = {
	computed: { reportsStore() {
		return useReportsStore();
	} },
	props: {
		list: {
			type: Array,
			required: false
		},
		total: {
			type: Object,
			required: false
		}
	},
	data() {
		return {
			selectedMekmarAyo: null,
			filters: {
				siparisci: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				operasyon: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				musteri_adi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				siparis_no: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				marketing: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				faturatur: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				siparis_tarihi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				yukleme_tarihi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				ulke_adi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				teslim_sekli: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				}
			}
		};
	},
	methods: {
		mekmarAyoFilter(event) {
			this.reportsStore.setReportsMekmarAyoListTotal(event.filteredValue);
		},
		mekmarAyoSelected(event) {
			this.$emit("mekmar_ayo_selected_emit", event);
		}
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_ReportsMekmarAyoListForm = AyoListForm_default;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "row" }, _attrs))}><div class="col">`);
	_push(ssrRenderComponent(_component_ReportsMekmarAyoListForm, {
		list: $props.list,
		onMekmar_ayo_selected_emit: ($event) => $options.mekmarAyoSelected($event)
	}, null, _parent));
	_push(`</div></div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/reports/mekmar/AyoList.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var AyoList_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]), { __name: "ReportsMekmarAyoList" });
//#endregion
//#region app/pages/reports/mekmar/ayo.vue
var _sfc_main = /*@__PURE__*/ Object.assign({
	computed: {
		orderStore() {
			return useOrderStore();
		},
		reportsStore() {
			return useReportsStore();
		},
		sharedStore() {
			return useSharedStore();
		}
	},
	data() {
		return {
			profitProformaTl: 0,
			detail_header: "",
			mekmar_ayo_detail_dialog: false,
			mekmer_cost_form_visible: false,
			mekmerCostList: [],
			currency_list: [],
			currency_form_visible: false,
			cost_tl: 0,
			cost_usd: 0,
			other_cost_form_visible: false,
			otherCostList: [],
			sampleCostList: [],
			sample_cost_form_visible: false,
			abroadCostList: [],
			abroad_cost_form_visible: false,
			wage_cost_form_visible: false,
			wageCostList: [],
			travelCostList: [],
			travel_cost_form_visible: false,
			creditCardCostList: [],
			credit_card_form_visible: false,
			selectedHalfMonths: null,
			halfmonths: [
				{
					month: "This Month",
					id: 2
				},
				{
					month: "First 6 Months",
					id: 0
				},
				{
					month: "Last 6 Months",
					id: 1
				}
			],
			quarters: [
				{
					quarter: "This Month",
					id: 0
				},
				{
					quarter: "Q1",
					id: 1
				},
				{
					quarter: "Q2",
					id: 2
				},
				{
					quarter: "Q3",
					id: 3
				},
				{
					quarter: "Q4",
					id: 4
				}
			],
			selectedQuarter: null,
			checked: false,
			selectedYear: null,
			selectedMonth: null,
			reportsMekmarAyoListExcelField: {
				Temsilci: "SiparisSahibi",
				Operasyon: "Operasyon",
				"Firma Adi": "FirmaAdi",
				"Siparis No": "SiparisNo",
				"Fatura Adi": "FaturaAdi",
				"Siparis Tarihi": "SiparisTarihi",
				"Yukleme Tarihi": "YuklemeTarihi",
				"Ulke Adi": "UlkeAdi",
				"Teslim Tur": "TeslimTur",
				Proforma: "Proforma",
				"Mekmer Satis": "MekmerSatis",
				"Mekmoz Satis": "MekmozSatis",
				"Dis Satis": "DisSatis",
				Nakliye: "Nakliye",
				Gumruk: "Gumruk",
				Ilaclama: "Ilaclama",
				Liman: "Liman",
				"Sigorta Alış": "SigortaAlis",
				"Sigorta Satış": "SigortaSatis",
				"Navlun Alış": "NavlunAlis",
				Lashing: "Lashing",
				Booking: "Booking",
				Spanzlet: "Spanzlet",
				"Detay Alış 1": "DetayAlis1",
				"Detay Alış 2": "DetayAlis2",
				"Detay Alış 3": "DetayAlis3",
				Mekus: "Mekus",
				"Özel İşçilik": "OzelIscilik",
				"Banka Masraf": "BankaMasraf",
				Kurye: "Kurye",
				"Masraf Toplam": "MasrafToplam",
				"Profit Usd": "ProfitUsd",
				"Profit Tl": "ProfitTl"
			},
			reportsMekmarAyoListExcelField2: [
				{
					label: "Temsilci",
					field: "siparisci"
				},
				{
					label: "Operasyon",
					field: "operasyon"
				},
				{
					label: "Firma Adi",
					field: "musteri_adi"
				},
				{
					label: "Siparis No",
					field: "siparis_no"
				},
				{
					label: "Fatura Adi",
					field: "faturatur"
				},
				{
					label: "Siparis Tarihi",
					field: "siparis_tarihi"
				},
				{
					label: "Yukleme Tarihi",
					field: "yukleme_tarihi"
				},
				{
					label: "Ulke Adi",
					field: "ulke_adi"
				},
				{
					label: "Teslim Tur",
					field: "teslim_sekli"
				},
				{
					label: "Proforma",
					field: "toplam_bedel",
					dataFormat: this.formatDecimal
				},
				{
					label: "Mekmer Satis",
					field: "mekmar_alim",
					dataFormat: this.formatDecimal
				},
				{
					label: "Mekmoz Satis",
					field: "mekmoz_alim",
					dataFormat: this.formatDecimal
				},
				{
					label: "Dis Satis",
					field: "dis_alim",
					dataFormat: this.formatDecimal
				},
				{
					label: "Nakliye",
					field: "nakliye",
					dataFormat: this.formatDecimal
				},
				{
					label: "Gumruk",
					field: "gumruk",
					dataFormat: this.formatDecimal
				},
				{
					label: "Ilaclama",
					field: "ilaclama",
					dataFormat: this.formatDecimal
				},
				{
					label: "Liman",
					field: "liman",
					dataFormat: this.formatDecimal
				},
				{
					label: "Sigorta Alış",
					field: "sigorta",
					dataFormat: this.formatDecimal
				},
				{
					label: "Sigorta Satış",
					field: "sigorta_tutar_satis",
					dataFormat: this.formatDecimal
				},
				{
					label: "Navlun Alış",
					field: "navlun",
					dataFormat: this.formatDecimal
				},
				{
					label: "Lashing",
					field: "lashing",
					dataFormat: this.formatDecimal
				},
				{
					label: "Booking",
					field: "booking",
					dataFormat: this.formatDecimal
				},
				{
					label: "Spanzlet",
					field: "spazlet",
					dataFormat: this.formatDecimal
				},
				{
					label: "Detay Alış 1",
					field: "detay_1",
					dataFormat: this.formatDecimal
				},
				{
					label: "Detay Alış 2",
					field: "detay_2",
					dataFormat: this.formatDecimal
				},
				{
					label: "Detay Alış 3",
					field: "detay_3",
					dataFormat: this.formatDecimal
				},
				{
					label: "Mekus",
					field: "mekus_masraf",
					dataFormat: this.formatDecimal
				},
				{
					label: "Özel İşçilik",
					field: "ozel_iscilik",
					dataFormat: this.formatDecimal
				},
				{
					label: "Banka Masraf",
					field: "banka_masrafi",
					dataFormat: this.formatDecimal
				},
				{
					label: "Kurye",
					field: "kurye_masrafi",
					dataFormat: this.formatDecimal
				},
				{
					label: "Masraf Toplam",
					field: "masraf_toplam",
					dataFormat: this.formatDecimal
				},
				{
					label: "Profit Usd",
					field: "kar_zarar",
					dataFormat: this.formatDecimal
				},
				{
					label: "Profit Tl",
					field: "kar_zarar_tl",
					dataFormat: this.formatDecimal
				}
			],
			json_meta: [{
				key: "charset",
				value: "utf-8"
			}],
			date_disabled: false
		};
	},
	mounted() {
		this.reportsStore.setReportsMekmarAyoYearList();
		const date = {
			year: (/* @__PURE__ */ new Date()).getFullYear(),
			month: (/* @__PURE__ */ new Date()).getMonth() + 1
		};
		this.fetchMonthCost(date.year, date.month).then((response) => {
			this.reportsStore.MUT_setReportsMekmarAyoList(response.data);
			this.reportsStore.MUT_setReportsMekmarAyoListTotal(response.data);
			this.__getMonthlyCostList(date.year, date.month);
			this.sharedStore.endLoading();
		});
	},
	methods: {
		/**
		* Yil secili mi?
		*
		* Bu sayfadaki sekiz maliyet dialogu da adresini
		* `this.selectedYear.Yil` uzerinden kuruyor. selectedYear null
		* oldugunda eski kod TypeError atiyor, metot o satirda kesiliyor
		* ve `..._form_visible = true` satirina HIC gelinmiyordu: dialog
		* acilmiyor, kullaniciya da hicbir sey soylenmiyordu.
		*
		* selectedYear normalde yil listesi geldiginde izleyici tarafindan
		* doluyor (yukarida), ama iki durumda null kalabiliyor:
		*   - liste HENUZ gelmemisken kullanici butona basarsa,
		*   - yil listesi BOS donerse.
		*
		* Artik sessiz patlamak yerine sebebi soyluyor.
		*/
		requireYear() {
			if (this.selectedYear?.Yil) return true;
			useAppToast().warn("Please select a year first.");
			return false;
		},
		fetchYearCost(year) {
			return $fetch$2(`/maliyet-api/yillik/${year}`, { baseURL: "/" }).then((data) => ({ data })).catch((err) => {
				console.error("yillik maliyet listesi alinamadi:", err);
				useAppToast().error("Maliyet listesi alınamadı.");
				return { data: [] };
			});
		},
		fetchMonthCost(year, month) {
			return $fetch$2(`/maliyet-api/aylik/${year}/${month}`, { baseURL: "/" }).then((data) => ({ data })).catch((err) => {
				console.error("aylik maliyet listesi alinamadi:", err);
				useAppToast().error("Maliyet listesi alınamadı.");
				return { data: [] };
			});
		},
		reloadCurrency() {},
		mekmarAyoSelected(event) {
			this.orderStore.setOrderProductionDocumentList(event.siparis_no);
			this.detail_header = event.siparis_no;
			this.mekmar_ayo_detail_dialog = true;
		},
		mekmerCost() {
			if (!this.requireYear()) return;
			useLegacyApi().get(`/reports/ayo/mekmer/cost/list/${this.selectedYear.Yil}`).then((res) => {
				this.mekmerCostList = res.data.list;
				this.mekmer_cost_form_visible = true;
			});
		},
		mekmerCostListUpdated() {
			useLegacyApi().get(`/reports/ayo/mekmer/cost/list/${this.selectedYear.Yil}`).then((res) => {
				this.mekmerCostList = res.data.list;
			});
		},
		mekmerCostUpdate(event) {
			useLegacyApi().put("/reports/ayo/mekmer/cost/update", event).then((res) => {
				useAppToast().success("Başarıyla Güncellendi.");
			});
		},
		mekmerCostSave(event) {
			useLegacyApi().post("/reports/ayo/mekmer/cost/save", event).then((res) => {
				useAppToast().success("Başarıyla Kaydedildi.");
				this.mekmerCostListUpdated();
			});
		},
		cost_excel() {
			useLegacyApi().get(`/reports/ayo/other/cost/list/${this.selectedYear.Yil}`).then((other) => {
				useLegacyApi().get(`/reports/ayo/sample/cost/list/${this.selectedYear.Yil}`).then((sample) => {
					useLegacyApi().get(`/reports/ayo/wage/cost/list/${this.selectedYear.Yil}`).then((wage) => {
						useLegacyApi().get(`/reports/ayo/travel/cost/list/${this.selectedYear.Yil}`).then((travel) => {
							useLegacyApi().get(`/reports/ayo/credit/card/cost/list/${this.selectedYear.Yil}`).then((credit) => {
								useLegacyApi().get(`/reports/ayo/mekmer/cost/list/${this.selectedYear.Yil}`).then((meal) => {
									const data = {
										other: other.data.list,
										sample: sample.data.list,
										wage: wage.data.list,
										travel: travel.data.list,
										credit: credit.data.list,
										meal: meal.data.list
									};
									exportExcel("/excel-api/reports/ayo-cost", data, "ayo_cost_excel.xlsx").catch((err) => {
										console.error("ayo maliyet excel ciktisi basarisiz:", err);
										useAppToast().error("Excel olusturulamadi.");
									});
								});
							});
						});
					});
				});
			});
		},
		updatedCurrencyList() {
			useLegacyApi().get(`/reports/ayo/currency/list/${this.selectedYear.Yil}`).then((res) => {
				this.currency_list = res.data.list;
			});
		},
		updateCurrency(event) {
			useLegacyApi().put("/reports/ayo/currency/update", event).then((res) => {
				useAppToast().success("Başarıyla Güncellendi.");
			});
		},
		saveCurrency(event) {
			useLegacyApi().post("/reports/ayo/currency/save", event).then((res) => {
				this.updatedCurrencyList();
				useAppToast().success("Başarıyla Kaydedildi.");
			});
		},
		currency() {
			if (!this.requireYear()) return;
			useLegacyApi().get(`/reports/ayo/currency/list/${this.selectedYear.Yil}`).then((res) => {
				this.currency_list = res.data.list;
				this.currency_form_visible = true;
			});
		},
		__getHalfCostList(month_1, month_2, year) {
			useLegacyApi().get(`/reports/ayo/costs/half/${month_1}/${month_2}/${year}`).then((res) => {
				this.cost_tl = res.data.tl;
				this.cost_usd = res.data.usd;
			});
		},
		__getQuarterCostList(quarter_1, quarter_2, year) {
			useLegacyApi().get(`/reports/ayo/costs/quarter/${quarter_1}/${quarter_2}/${year}`).then((res) => {
				this.cost_tl = res.data.tl;
				this.cost_usd = res.data.usd;
			});
		},
		__getMonthlyCostList(year, month) {
			useLegacyApi().get(`/reports/ayo/costs/list/${year}/${month}`).then((res) => {
				this.cost_tl = res.data.tl;
				this.cost_usd = res.data.usd;
			});
		},
		__getYearlyCostList(year) {
			useLegacyApi().get(`/reports/ayo/costs/yearly/${year}`).then((res) => {
				this.cost_tl = res.data.tl;
				this.cost_usd = res.data.usd;
			});
		},
		otherCostListUpdated() {
			useLegacyApi().get(`/reports/ayo/other/cost/list/${this.selectedYear.Yil}`).then((res) => {
				this.otherCostList = res.data.list;
			});
		},
		otherCostUpdate(event) {
			useLegacyApi().put("/reports/ayo/other/cost/update", event).then((res) => {
				useAppToast().success("Başarıyla Güncellendi.");
			});
		},
		otherCostSave(event) {
			useLegacyApi().post("/reports/ayo/other/cost/save", event).then((res) => {
				useAppToast().success("Başarıyla Kaydedildi.");
				this.otherCostListUpdated();
			});
		},
		otherCost() {
			if (!this.requireYear()) return;
			useLegacyApi().get(`/reports/ayo/other/cost/list/${this.selectedYear.Yil}`).then((res) => {
				this.otherCostList = res.data.list;
				this.other_cost_form_visible = true;
			});
		},
		sampleCostListUpdated() {
			useLegacyApi().get(`/reports/ayo/sample/cost/list/${this.selectedYear.Yil}`).then((res) => {
				this.sampleCostList = res.data.list;
			});
		},
		sampleCostUpdate(event) {
			useLegacyApi().put("/reports/ayo/sample/cost/update", event).then((res) => {
				useAppToast().success("Başarıyla Güncellendi.");
			});
		},
		sampleCostSave(event) {
			useLegacyApi().post("/reports/ayo/sample/cost/save", event).then((res) => {
				useAppToast().success("Başarıyla Kaydedildi.");
				this.sampleCostListUpdated();
			});
		},
		sampleCost() {
			if (!this.requireYear()) return;
			useLegacyApi().get(`/reports/ayo/sample/cost/list/${this.selectedYear.Yil}`).then((res) => {
				this.sampleCostList = res.data.list;
				this.sample_cost_form_visible = true;
			});
		},
		abroadCostListUpdated() {
			useLegacyApi().get(`/reports/ayo/abroad/cost/list/${this.selectedYear.Yil}`).then((res) => {
				this.abroadCostList = res.data.list;
			});
		},
		abroadCostUpdate(event) {
			useLegacyApi().put("/reports/ayo/abroad/cost/update", event).then((res) => {
				useAppToast().success("Başarıyla Güncellendi.");
			});
		},
		abroadCostSave(event) {
			useLegacyApi().post("/reports/ayo/abroad/cost/save", event).then((res) => {
				useAppToast().success("Başarıyla Kaydedildi.");
				this.abroadCostListUpdated();
			});
		},
		abroadCost() {
			if (!this.requireYear()) return;
			useLegacyApi().get(`/reports/ayo/abroad/cost/list/${this.selectedYear.Yil}`).then((res) => {
				this.abroadCostList = res.data.list;
				this.abroad_cost_form_visible = true;
			});
		},
		wageCostUpdate(event) {
			useLegacyApi().put("/reports/ayo/wage/cost/update", event).then((res) => {
				useAppToast().success("Başarıyla Güncellendi.");
			});
		},
		wageCostSave(event) {
			useLegacyApi().post("/reports/ayo/wage/cost/save", event).then((res) => {
				this.wageCostList = res.data.list;
				useAppToast().success("Başarıyla Kaydedildi.");
				this.wageCostListUpdated();
			});
		},
		wageCostListUpdated() {
			useLegacyApi().get(`/reports/ayo/wage/cost/list/${this.selectedYear.Yil}`).then((res) => {
				this.wageCostList = res.data.list;
			});
		},
		wageCost() {
			if (!this.requireYear()) return;
			useLegacyApi().get(`/reports/ayo/wage/cost/list/${this.selectedYear.Yil}`).then((res) => {
				this.wageCostList = res.data.list;
				this.wage_cost_form_visible = true;
			});
		},
		travelCostUpdate(event) {
			useLegacyApi().put("/reports/ayo/travel/cost/update", event).then((res) => {
				useAppToast().success("Başarıyla Güncellendi.");
			});
		},
		travelCostSave(event) {
			useLegacyApi().post("/reports/ayo/travel/cost/save", event).then((res) => {
				useAppToast().success("Başarıyla Kaydedildi.");
				this.travelCostListUpdated();
			});
		},
		creditCardCostUpdate(event) {
			useLegacyApi().put("/reports/ayo/credit/card/cost/update", event).then((res) => {
				useAppToast().success("Başarıyla Güncellendi.");
			});
		},
		creditCardCostSave(event) {
			useLegacyApi().post("/reports/ayo/credit/card/cost/save", event).then((res) => {
				useAppToast().success("Başarıyla Kaydedildi.");
				this.creditCardCostListUpdated();
			});
		},
		travelCostListUpdated() {
			useLegacyApi().get(`/reports/ayo/travel/cost/list/${this.selectedYear.Yil}`).then((res) => {
				this.travelCostList = res.data.list;
			});
		},
		creditCardCostListUpdated() {
			useLegacyApi().get(`/reports/ayo/credit/card/cost/list/${this.selectedYear.Yil}`).then((res) => {
				this.creditCardCostList = res.data.list;
			});
		},
		travelCost() {
			if (!this.requireYear()) return;
			useLegacyApi().get(`/reports/ayo/travel/cost/list/${this.selectedYear.Yil}`).then((res) => {
				this.travelCostList = res.data.list;
				this.travel_cost_form_visible = true;
			});
		},
		creditCardToggle() {
			if (!this.requireYear()) return;
			useLegacyApi().get(`/reports/ayo/credit/card/cost/list/${this.selectedYear.Yil}`).then((res) => {
				this.creditCardCostList = res.data.list;
				this.credit_card_form_visible = true;
			});
		},
		halfMonthsSelected(event) {
			if (event.value.id == 0) {
				this.sharedStore.beginLoading();
				this.fetchYearCost(this.selectedYear.Yil).then((response) => {
					if (response) {
						const data = response.data.filter((x) => {
							return x.yukleme_month >= 1 && x.yukleme_month <= 6;
						});
						this.__getHalfCostList(1, 6, this.selectedYear.Yil);
						this.reportsStore.MUT_setReportsMekmarAyoList(data);
						this.reportsStore.MUT_setReportsMekmarAyoListTotal(data);
						this.sharedStore.endLoading();
						useLegacyApi().get(`/maliyet/proforma/currency/half/${this.selectedYear.Yil}/1/6`).then((res) => {
							this.profitProformaTl = this.reportsStore.getReportsMekmarAyoListTotal.proforma * res.data.currency;
						});
					}
				}).catch((err) => {
					console.error("if basarisiz:", err);
					this.sharedStore.endLoading();
				});
			} else if (event.value.id == 1) {
				this.sharedStore.beginLoading();
				this.fetchYearCost(this.selectedYear.Yil).then((response) => {
					if (response) {
						const data = response.data.filter((x) => {
							return x.yukleme_month >= 7 && x.yukleme_month <= 12;
						});
						this.__getHalfCostList(7, 12, this.selectedYear.Yil);
						this.reportsStore.MUT_setReportsMekmarAyoList(data);
						this.reportsStore.MUT_setReportsMekmarAyoListTotal(data);
						this.sharedStore.endLoading();
						useLegacyApi().get(`/maliyet/proforma/currency/half/${this.selectedYear.Yil}/7/12`).then((res) => {
							this.profitProformaTl = this.reportsStore.getReportsMekmarAyoListTotal.proforma * res.data.currency;
						});
					}
				}).catch((err) => {
					console.error("if basarisiz:", err);
					this.sharedStore.endLoading();
				});
			} else if (event.value.id == 2) {
				this.sharedStore.beginLoading();
				this.fetchYearCost(this.selectedYear.Yil).then((response) => {
					this.reportsStore.MUT_setReportsMekmarAyoList(response.data);
					this.reportsStore.MUT_setReportsMekmarAyoListTotal(response.data);
					this.sharedStore.endLoading();
					this.__getYearlyCostList(this.selectedYear.Yil);
					this.selectedQuarter = {
						quarter: "All",
						id: 0
					};
					useLegacyApi().get(`/maliyet/proforma/all/currency/${this.selectedYear.Yil}`).then((res) => {
						this.profitProformaTl = this.reportsStore.getReportsMekmarAyoListTotal.proforma * res.data.currency;
					});
				}).catch((err) => {
					console.error("if basarisiz:", err);
					this.sharedStore.endLoading();
				});
			}
		},
		quarterSelected(event) {
			if (event.value.id == 0) {
				this.sharedStore.beginLoading();
				this.fetchMonthCost(this.selectedYear.Yil, this.reportsStore.getReportsMekmarAyoMonthList[0].Ay).then((response) => {
					this.reportsStore.MUT_setReportsMekmarAyoList(response.data);
					this.reportsStore.MUT_setReportsMekmarAyoListTotal(response.data);
					this.sharedStore.endLoading();
					this.__getMonthlyCostList(this.selectedYear.Yil, this.reportsStore.getReportsMekmarAyoMonthList[0].Ay);
					this.selectedMonth = this.reportsStore.getReportsMekmarAyoMonthList[0];
					useLegacyApi().get(`/maliyet/proforma/currency/${this.selectedYear.Yil}/${this.reportsStore.getReportsMekmarAyoMonthList[0].Ay}`).then((res) => {
						this.profitProformaTl = this.reportsStore.getReportsMekmarAyoListTotal.proforma * res.data.currency;
					});
				}).catch((err) => {
					console.error("if basarisiz:", err);
					this.sharedStore.endLoading();
				});
			} else if (event.value.id == 1) {
				this.sharedStore.beginLoading();
				this.fetchYearCost(this.selectedYear.Yil).then((response) => {
					if (response) {
						const data = response.data.filter((x) => {
							return x.yukleme_month >= 1 && x.yukleme_month <= 3;
						});
						this.reportsStore.MUT_setReportsMekmarAyoList(data);
						this.reportsStore.MUT_setReportsMekmarAyoListTotal(data);
						this.__getQuarterCostList(1, 3, this.selectedYear.Yil);
						this.sharedStore.endLoading();
						useLegacyApi().get(`/maliyet/proforma/currency/quarter/${this.selectedYear.Yil}/1/3`).then((res) => {
							this.profitProformaTl = this.reportsStore.getReportsMekmarAyoListTotal.proforma * res.data.currency;
						});
					}
				}).catch((err) => {
					console.error("if basarisiz:", err);
					this.sharedStore.endLoading();
				});
			} else if (event.value.id == 2) {
				this.sharedStore.beginLoading();
				this.fetchYearCost(this.selectedYear.Yil).then((response) => {
					if (response) {
						const data = response.data.filter((x) => {
							return x.yukleme_month >= 4 && x.yukleme_month <= 6;
						});
						this.reportsStore.MUT_setReportsMekmarAyoList(data);
						this.reportsStore.MUT_setReportsMekmarAyoListTotal(data);
						this.sharedStore.endLoading();
						this.__getQuarterCostList(4, 6, this.selectedYear.Yil);
						useLegacyApi().get(`/maliyet/proforma/currency/quarter/${this.selectedYear.Yil}/4/6`).then((res) => {
							this.profitProformaTl = this.reportsStore.getReportsMekmarAyoListTotal.proforma * res.data.currency;
						});
					}
				}).catch((err) => {
					console.error("if basarisiz:", err);
					this.sharedStore.endLoading();
				});
			} else if (event.value.id == 3) {
				this.sharedStore.beginLoading();
				this.fetchYearCost(this.selectedYear.Yil).then((response) => {
					if (response) {
						const data = response.data.filter((x) => {
							return x.yukleme_month >= 7 && x.yukleme_month <= 9;
						});
						this.reportsStore.MUT_setReportsMekmarAyoList(data);
						this.reportsStore.MUT_setReportsMekmarAyoListTotal(data);
						this.sharedStore.endLoading();
						this.__getQuarterCostList(7, 9, this.selectedYear.Yil);
						useLegacyApi().get(`/maliyet/proforma/currency/quarter/${this.selectedYear.Yil}/7/9`).then((res) => {
							this.profitProformaTl = this.reportsStore.getReportsMekmarAyoListTotal.proforma * res.data.currency;
						});
					}
				}).catch((err) => {
					console.error("if basarisiz:", err);
					this.sharedStore.endLoading();
				});
			} else if (event.value.id == 4) {
				this.sharedStore.beginLoading();
				this.fetchYearCost(this.selectedYear.Yil).then((response) => {
					if (response) {
						const data = response.data.filter((x) => {
							return x.yukleme_month >= 10 && x.yukleme_month <= 12;
						});
						this.reportsStore.MUT_setReportsMekmarAyoList(data);
						this.reportsStore.MUT_setReportsMekmarAyoListTotal(data);
						this.sharedStore.endLoading();
						this.__getQuarterCostList(10, 12, this.selectedYear.Yil);
						useLegacyApi().get(`/maliyet/proforma/currency/quarter/${this.selectedYear.Yil}/10/12`).then((res) => {
							this.profitProformaTl = this.reportsStore.getReportsMekmarAyoListTotal.proforma * res.data.currency;
						});
					}
				}).catch((err) => {
					console.error("if basarisiz:", err);
					this.sharedStore.endLoading();
				});
			}
		},
		async excel_output() {
			try {
				await exportExcel("/excel-api/reports/ayo-maliyet", this.reportsStore.getReportsMekmarAyoList, "ayo_maliyet_listesi.xlsx");
			} catch (err) {
				console.error("ayo maliyet listesi ciktisi basarisiz:", err);
				useAppToast().error("Excel olusturulamadi.");
			}
		},
		allAyoList(event) {
			if (this.checked) {
				this.date_disabled = true;
				this.sharedStore.beginLoading();
				this.fetchYearCost(this.selectedYear.Yil).then((response) => {
					this.reportsStore.MUT_setReportsMekmarAyoList(response.data);
					this.reportsStore.MUT_setReportsMekmarAyoListTotal(response.data);
					this.sharedStore.endLoading();
					this.__getYearlyCostList(this.selectedYear.Yil);
					this.selectedQuarter = {
						quarter: "All",
						id: 0
					};
					useLegacyApi().get(`/maliyet/proforma/all/currency/${this.selectedYear.Yil}`).then((res) => {
						this.profitProformaTl = this.reportsStore.getReportsMekmarAyoListTotal.proforma * res.data.currency;
					});
				}).catch((err) => {
					console.error("if basarisiz:", err);
					this.sharedStore.endLoading();
				});
			} else {
				this.reportsStore.setReportsMekmarAyoMonthList(this.selectedYear.Yil);
				this.date_disabled = false;
				this.sharedStore.beginLoading();
				this.fetchMonthCost(this.selectedYear.Yil, this.reportsStore.getReportsMekmarAyoMonthList[0].Ay).then((response) => {
					this.reportsStore.MUT_setReportsMekmarAyoList(response.data);
					this.reportsStore.MUT_setReportsMekmarAyoListTotal(response.data);
					this.sharedStore.endLoading();
					this.__getMonthlyCostList(this.selectedYear.Yil, this.reportsStore.getReportsMekmarAyoMonthList[0].Ay);
					this.selectedMonth = this.reportsStore.getReportsMekmarAyoMonthList[0];
					this.selectedQuarter = {
						quarter: "All",
						id: 0
					};
					useLegacyApi().get(`/maliyet/proforma/currency/${this.selectedYear.Yil}/${this.reportsStore.getReportsMekmarAyoMonthList[0].Ay}`).then((res) => {
						this.profitProformaTl = this.reportsStore.getReportsMekmarAyoListTotal.proforma * res.data.currency;
					});
				}).catch((err) => {
					console.error("if basarisiz:", err);
					this.sharedStore.endLoading();
				});
			}
		},
		formatDecimal(value) {
			if (value == null || value == void 0 || value == "" || value == " ") return 0;
			else return value.toString().replace(".", ",");
		},
		yearSelected(event) {
			this.sharedStore.beginLoading();
			this.fetchMonthCost(event.value.Yil, 12).then((response) => {
				this.reportsStore.setReportsMekmarAyoMonthList(event.value.Yil);
				this.reportsStore.MUT_setReportsMekmarAyoList(response.data);
				this.reportsStore.MUT_setReportsMekmarAyoListTotal(response.data);
				this.sharedStore.endLoading();
				this.selectedMonth = this.reportsStore.getReportsMekmarAyoMonthList[0];
				this.selectedQuarter = {
					quarter: "All",
					id: 0
				};
				useLegacyApi().get(`/maliyet/proforma/currency/${event.value.Yil}/12`).then((res) => {
					this.profitProformaTl = this.reportsStore.getReportsMekmarAyoListTotal.proforma * res.data.currency;
				});
			}).catch((err) => {
				console.error("yearSelected basarisiz:", err);
				this.sharedStore.endLoading();
			});
		},
		monthSelected(event) {
			let date = {
				year: this.selectedYear.Yil,
				month: event.value.Ay
			};
			this.sharedStore.beginLoading();
			this.fetchMonthCost(date.year, date.month).then((response) => {
				this.reportsStore.MUT_setReportsMekmarAyoList(response.data);
				this.reportsStore.MUT_setReportsMekmarAyoListTotal(response.data);
				this.__getMonthlyCostList(date.year, date.month);
				this.sharedStore.endLoading();
				this.selectedQuarter = {
					quarter: "All",
					id: 0
				};
				useLegacyApi().get(`/maliyet/proforma/currency/${date.year}/${date.month}`).then((res) => {
					this.profitProformaTl = this.reportsStore.getReportsMekmarAyoListTotal.proforma * res.data.currency;
				});
			}).catch((err) => {
				console.error("monthSelected basarisiz:", err);
				this.sharedStore.endLoading();
			});
		}
	},
	watch: {
		"reportsStore.getReportsMekmarAyoYearList"() {
			this.selectedYear = this.reportsStore.getReportsMekmarAyoYearList[0] ?? null;
			if (!this.selectedYear) return;
			this.reportsStore.setReportsMekmarAyoMonthList(this.selectedYear.Yil);
		},
		"reportsStore.getReportsMekmarAyoMonthList"() {
			this.selectedMonth = this.reportsStore.getReportsMekmarAyoMonthList[0];
			this.sharedStore.beginLoading();
			this.fetchMonthCost(this.selectedYear.Yil, this.selectedMonth.Ay).then((response) => {
				this.reportsStore.MUT_setReportsMekmarAyoList(response.data);
				this.reportsStore.MUT_setReportsMekmarAyoListTotal(response.data);
				this.__getMonthlyCostList(this.selectedYear.Yil, this.selectedMonth.Ay);
				useLegacyApi().get(`/maliyet/proforma/currency/${this.selectedYear.Yil}/${this.selectedMonth.Ay}`).then((res) => {
					this.profitProformaTl = this.reportsStore.getReportsMekmarAyoListTotal.proforma * res.data.currency;
				});
				this.sharedStore.endLoading();
			}).catch((err) => {
				console.error("monthSelected basarisiz:", err);
				this.sharedStore.endLoading();
			});
		}
	}
}, {
	__name: "ayo",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Select = script;
			const _component_Button = script$1;
			const _component_Checkbox = script$2;
			const _component_Dialog = script$3;
			const _component_ReportsMekmarAyoCreditCardForm = AyoCreditCardForm_default;
			const _component_ReportsMekmarAyoFormCurrency = AyoFormCurrency_default;
			const _component_ReportsMekmarAyoList = AyoList_default;
			const _component_DataTable = script$4;
			const _component_Column = script$5;
			_push(`<div${ssrRenderAttrs(_attrs)}><div class="row container"><div class="col">`);
			_push(ssrRenderComponent(_component_Select, {
				modelValue: _ctx.selectedYear,
				"onUpdate:modelValue": ($event) => _ctx.selectedYear = $event,
				options: _ctx.reportsStore.getReportsMekmarAyoYearList,
				optionLabel: "Yil",
				class: "w-100",
				onChange: ($event) => _ctx.yearSelected($event),
				disabled: _ctx.date_disabled
			}, null, _parent));
			_push(`</div><div class="col">`);
			_push(ssrRenderComponent(_component_Select, {
				modelValue: _ctx.selectedMonth,
				"onUpdate:modelValue": ($event) => _ctx.selectedMonth = $event,
				options: _ctx.reportsStore.getReportsMekmarAyoMonthList,
				optionLabel: "Ay",
				class: "w-100",
				onChange: ($event) => _ctx.monthSelected($event),
				disabled: _ctx.date_disabled
			}, null, _parent));
			_push(`</div><div class="col">`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				severity: "info",
				class: "w-100",
				icon: "pi pi-file-excel",
				label: "Excel",
				onClick: _ctx.excel_output
			}, null, _parent));
			_push(`</div><div class="col"><span>`);
			_push(ssrRenderComponent(_component_Checkbox, {
				modelValue: _ctx.checked,
				"onUpdate:modelValue": ($event) => _ctx.checked = $event,
				binary: true,
				onChange: ($event) => _ctx.allAyoList($event)
			}, null, _parent));
			_push(`</span><span style="${ssrRenderStyle({ "padding-top": "25px" })}"> Hepsi </span></div><div class="col"><table class="table caption-top"><caption style="${ssrRenderStyle({ "font-weight": "bold" })}"><b>Turnover (Cari)</b></caption><tbody><tr><th scope="row">Total</th><td>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(_ctx.reportsStore.getReportsMekmarAyoListTotal.proforma))}</td><td>${ssrInterpolate(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(_ctx.profitProformaTl))}</td></tr></tbody></table></div><div class="col"><table class="table caption-top"><caption style="${ssrRenderStyle({ "font-weight": "bold" })}"><b>Profit</b></caption><tbody><tr><th scope="row">Total</th><td>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(_ctx.reportsStore.getReportsMekmarAyoListTotal.profitUsd))}</td><td>${ssrInterpolate(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(_ctx.reportsStore.getReportsMekmarAyoListTotal.profitTl))}</td></tr></tbody></table></div><div class="col"><table class="table caption-top"><caption style="${ssrRenderStyle({ "font-weight": "bold" })}"><b>Real Profit</b></caption><tbody><tr><th scope="row">Total</th><td>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(_ctx.reportsStore.getReportsMekmarAyoListTotal.profitUsd - _ctx.cost_usd))}</td><td>${ssrInterpolate(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(_ctx.reportsStore.getReportsMekmarAyoListTotal.profitTl - _ctx.cost_tl))}</td></tr></tbody></table></div></div><div class="container row"><div class="col">`);
			_push(ssrRenderComponent(_component_Select, {
				class: "w-100",
				modelValue: _ctx.selectedQuarter,
				"onUpdate:modelValue": ($event) => _ctx.selectedQuarter = $event,
				options: _ctx.quarters,
				optionLabel: "quarter",
				placeholder: "Select a Quarter",
				onChange: ($event) => _ctx.quarterSelected($event)
			}, null, _parent));
			_push(`</div><div class="col">`);
			_push(ssrRenderComponent(_component_Select, {
				class: "w-100",
				modelValue: _ctx.selectedHalfMonths,
				"onUpdate:modelValue": ($event) => _ctx.selectedHalfMonths = $event,
				options: _ctx.halfmonths,
				optionLabel: "month",
				placeholder: "Select a Month",
				onChange: ($event) => _ctx.halfMonthsSelected($event)
			}, null, _parent));
			_push(`</div><div class="col">`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				severity: "warn",
				class: "w-100",
				label: "Credit Card",
				onClick: _ctx.creditCardToggle
			}, null, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.credit_card_form_visible,
				"onUpdate:visible": ($event) => _ctx.credit_card_form_visible = $event,
				header: "Credit Card Cost",
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<!--[-->`);
						ssrRenderList(_ctx.creditCardCostList, (item) => {
							_push(ssrRenderComponent(_component_ReportsMekmarAyoCreditCardForm, {
								style: { "margin-bottom": "5px" },
								key: item,
								month: item.month,
								value: item.value,
								month_id: item.month_id,
								currency: item.currency,
								year: _ctx.selectedYear.Yil,
								usd: item.usd,
								id: item.id,
								onCredit_card_cost_list_updated_emit: _ctx.creditCardCostListUpdated,
								onCost_save_emit: ($event) => _ctx.creditCardCostSave($event),
								onCost_update_emit: ($event) => _ctx.creditCardCostUpdate($event)
							}, null, _parent, _scopeId));
						});
						_push(`<!--]-->`);
					} else return [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.creditCardCostList, (item) => {
						return openBlock(), createBlock(_component_ReportsMekmarAyoCreditCardForm, {
							style: { "margin-bottom": "5px" },
							key: item,
							month: item.month,
							value: item.value,
							month_id: item.month_id,
							currency: item.currency,
							year: _ctx.selectedYear.Yil,
							usd: item.usd,
							id: item.id,
							onCredit_card_cost_list_updated_emit: _ctx.creditCardCostListUpdated,
							onCost_save_emit: ($event) => _ctx.creditCardCostSave($event),
							onCost_update_emit: ($event) => _ctx.creditCardCostUpdate($event)
						}, null, 8, [
							"month",
							"value",
							"month_id",
							"currency",
							"year",
							"usd",
							"id",
							"onCredit_card_cost_list_updated_emit",
							"onCost_save_emit",
							"onCost_update_emit"
						]);
					}), 128))];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col">`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				severity: "info",
				class: "w-100",
				label: "Travel Cost",
				onClick: _ctx.travelCost
			}, null, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.travel_cost_form_visible,
				"onUpdate:visible": ($event) => _ctx.travel_cost_form_visible = $event,
				header: "Travel Cost",
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<!--[-->`);
						ssrRenderList(_ctx.travelCostList, (item) => {
							_push(ssrRenderComponent(_component_ReportsMekmarAyoCreditCardForm, {
								style: { "margin-bottom": "5px" },
								key: item,
								month: item.month,
								value: item.value,
								month_id: item.month_id,
								currency: item.currency,
								year: _ctx.selectedYear.Yil,
								usd: item.usd,
								id: item.id,
								onCredit_card_cost_list_updated_emit: _ctx.travelCostListUpdated,
								onCost_save_emit: ($event) => _ctx.travelCostSave($event),
								onCost_update_emit: ($event) => _ctx.travelCostUpdate($event)
							}, null, _parent, _scopeId));
						});
						_push(`<!--]-->`);
					} else return [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.travelCostList, (item) => {
						return openBlock(), createBlock(_component_ReportsMekmarAyoCreditCardForm, {
							style: { "margin-bottom": "5px" },
							key: item,
							month: item.month,
							value: item.value,
							month_id: item.month_id,
							currency: item.currency,
							year: _ctx.selectedYear.Yil,
							usd: item.usd,
							id: item.id,
							onCredit_card_cost_list_updated_emit: _ctx.travelCostListUpdated,
							onCost_save_emit: ($event) => _ctx.travelCostSave($event),
							onCost_update_emit: ($event) => _ctx.travelCostUpdate($event)
						}, null, 8, [
							"month",
							"value",
							"month_id",
							"currency",
							"year",
							"usd",
							"id",
							"onCredit_card_cost_list_updated_emit",
							"onCost_save_emit",
							"onCost_update_emit"
						]);
					}), 128))];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col">`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				severity: "secondary",
				class: "w-100",
				label: "Wage Cost",
				onClick: _ctx.wageCost
			}, null, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.wage_cost_form_visible,
				"onUpdate:visible": ($event) => _ctx.wage_cost_form_visible = $event,
				header: "Wage Cost",
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<!--[-->`);
						ssrRenderList(_ctx.wageCostList, (item) => {
							_push(ssrRenderComponent(_component_ReportsMekmarAyoCreditCardForm, {
								style: { "margin-bottom": "5px" },
								key: item,
								month: item.month,
								value: item.value,
								month_id: item.month_id,
								currency: item.currency,
								year: _ctx.selectedYear.Yil,
								usd: item.usd,
								id: item.id,
								onCredit_card_cost_list_updated_emit: _ctx.wageCostListUpdated,
								onCost_save_emit: ($event) => _ctx.wageCostSave($event),
								onCost_update_emit: ($event) => _ctx.wageCostUpdate($event)
							}, null, _parent, _scopeId));
						});
						_push(`<!--]-->`);
					} else return [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.wageCostList, (item) => {
						return openBlock(), createBlock(_component_ReportsMekmarAyoCreditCardForm, {
							style: { "margin-bottom": "5px" },
							key: item,
							month: item.month,
							value: item.value,
							month_id: item.month_id,
							currency: item.currency,
							year: _ctx.selectedYear.Yil,
							usd: item.usd,
							id: item.id,
							onCredit_card_cost_list_updated_emit: _ctx.wageCostListUpdated,
							onCost_save_emit: ($event) => _ctx.wageCostSave($event),
							onCost_update_emit: ($event) => _ctx.wageCostUpdate($event)
						}, null, 8, [
							"month",
							"value",
							"month_id",
							"currency",
							"year",
							"usd",
							"id",
							"onCredit_card_cost_list_updated_emit",
							"onCost_save_emit",
							"onCost_update_emit"
						]);
					}), 128))];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col">`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				severity: "help",
				class: "w-100",
				label: "Sample Cost",
				onClick: _ctx.sampleCost
			}, null, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.sample_cost_form_visible,
				"onUpdate:visible": ($event) => _ctx.sample_cost_form_visible = $event,
				header: "Sample Cost",
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<!--[-->`);
						ssrRenderList(_ctx.sampleCostList, (item) => {
							_push(ssrRenderComponent(_component_ReportsMekmarAyoCreditCardForm, {
								style: { "margin-bottom": "5px" },
								key: item,
								month: item.month,
								value: item.value,
								month_id: item.month_id,
								currency: item.currency,
								year: _ctx.selectedYear.Yil,
								usd: item.usd,
								id: item.id,
								onCredit_card_cost_list_updated_emit: _ctx.sampleCostListUpdated,
								onCost_save_emit: ($event) => _ctx.sampleCostSave($event),
								onCost_update_emit: ($event) => _ctx.sampleCostUpdate($event)
							}, null, _parent, _scopeId));
						});
						_push(`<!--]-->`);
					} else return [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.sampleCostList, (item) => {
						return openBlock(), createBlock(_component_ReportsMekmarAyoCreditCardForm, {
							style: { "margin-bottom": "5px" },
							key: item,
							month: item.month,
							value: item.value,
							month_id: item.month_id,
							currency: item.currency,
							year: _ctx.selectedYear.Yil,
							usd: item.usd,
							id: item.id,
							onCredit_card_cost_list_updated_emit: _ctx.sampleCostListUpdated,
							onCost_save_emit: ($event) => _ctx.sampleCostSave($event),
							onCost_update_emit: ($event) => _ctx.sampleCostUpdate($event)
						}, null, 8, [
							"month",
							"value",
							"month_id",
							"currency",
							"year",
							"usd",
							"id",
							"onCredit_card_cost_list_updated_emit",
							"onCost_save_emit",
							"onCost_update_emit"
						]);
					}), 128))];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col">`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				severity: "success",
				class: "w-100",
				label: "Fuil Cost",
				onClick: _ctx.otherCost
			}, null, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.other_cost_form_visible,
				"onUpdate:visible": ($event) => _ctx.other_cost_form_visible = $event,
				header: "Fuil Cost",
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<!--[-->`);
						ssrRenderList(_ctx.otherCostList, (item) => {
							_push(ssrRenderComponent(_component_ReportsMekmarAyoCreditCardForm, {
								style: { "margin-bottom": "5px" },
								key: item,
								month: item.month,
								value: item.value,
								month_id: item.month_id,
								currency: item.currency,
								year: _ctx.selectedYear.Yil,
								usd: item.usd,
								id: item.id,
								onCredit_card_cost_list_updated_emit: _ctx.otherCostListUpdated,
								onCost_save_emit: ($event) => _ctx.otherCostSave($event),
								onCost_update_emit: ($event) => _ctx.otherCostUpdate($event)
							}, null, _parent, _scopeId));
						});
						_push(`<!--]-->`);
					} else return [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.otherCostList, (item) => {
						return openBlock(), createBlock(_component_ReportsMekmarAyoCreditCardForm, {
							style: { "margin-bottom": "5px" },
							key: item,
							month: item.month,
							value: item.value,
							month_id: item.month_id,
							currency: item.currency,
							year: _ctx.selectedYear.Yil,
							usd: item.usd,
							id: item.id,
							onCredit_card_cost_list_updated_emit: _ctx.otherCostListUpdated,
							onCost_save_emit: ($event) => _ctx.otherCostSave($event),
							onCost_update_emit: ($event) => _ctx.otherCostUpdate($event)
						}, null, 8, [
							"month",
							"value",
							"month_id",
							"currency",
							"year",
							"usd",
							"id",
							"onCredit_card_cost_list_updated_emit",
							"onCost_save_emit",
							"onCost_update_emit"
						]);
					}), 128))];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col">`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				class: "p-button w-100",
				label: "Meal Cost",
				onClick: _ctx.mekmerCost,
				style: {
					"background-color": "blueviolet",
					"color": "white"
				}
			}, null, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.mekmer_cost_form_visible,
				"onUpdate:visible": ($event) => _ctx.mekmer_cost_form_visible = $event,
				header: "Meal Cost",
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<!--[-->`);
						ssrRenderList(_ctx.mekmerCostList, (item) => {
							_push(ssrRenderComponent(_component_ReportsMekmarAyoCreditCardForm, {
								style: { "margin-bottom": "5px" },
								key: item,
								month: item.month,
								value: item.value,
								month_id: item.month_id,
								currency: item.currency,
								year: _ctx.selectedYear.Yil,
								usd: item.usd,
								id: item.id,
								onCredit_card_cost_list_updated_emit: _ctx.mekmerCostListUpdated,
								onCost_save_emit: ($event) => _ctx.mekmerCostSave($event),
								onCost_update_emit: ($event) => _ctx.mekmerCostUpdate($event)
							}, null, _parent, _scopeId));
						});
						_push(`<!--]-->`);
					} else return [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.mekmerCostList, (item) => {
						return openBlock(), createBlock(_component_ReportsMekmarAyoCreditCardForm, {
							style: { "margin-bottom": "5px" },
							key: item,
							month: item.month,
							value: item.value,
							month_id: item.month_id,
							currency: item.currency,
							year: _ctx.selectedYear.Yil,
							usd: item.usd,
							id: item.id,
							onCredit_card_cost_list_updated_emit: _ctx.mekmerCostListUpdated,
							onCost_save_emit: ($event) => _ctx.mekmerCostSave($event),
							onCost_update_emit: ($event) => _ctx.mekmerCostUpdate($event)
						}, null, 8, [
							"month",
							"value",
							"month_id",
							"currency",
							"year",
							"usd",
							"id",
							"onCredit_card_cost_list_updated_emit",
							"onCost_save_emit",
							"onCost_update_emit"
						]);
					}), 128))];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col">`);
			_push(ssrRenderComponent(_component_Button, {
				label: "Currency",
				severity: "danger",
				onClick: _ctx.currency
			}, null, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.currency_form_visible,
				"onUpdate:visible": ($event) => _ctx.currency_form_visible = $event,
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<!--[-->`);
						ssrRenderList(_ctx.currency_list, (cur) => {
							_push(ssrRenderComponent(_component_ReportsMekmarAyoFormCurrency, {
								key: cur,
								month: cur.month,
								id: cur.id,
								month_id: cur.month_id,
								currency: cur.currency,
								onCost_save_emit: ($event) => _ctx.saveCurrency($event),
								onCost_update_emit: ($event) => _ctx.updateCurrency($event),
								year: _ctx.selectedYear.Yil
							}, null, _parent, _scopeId));
						});
						_push(`<!--]-->`);
					} else return [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.currency_list, (cur) => {
						return openBlock(), createBlock(_component_ReportsMekmarAyoFormCurrency, {
							key: cur,
							month: cur.month,
							id: cur.id,
							month_id: cur.month_id,
							currency: cur.currency,
							onCost_save_emit: ($event) => _ctx.saveCurrency($event),
							onCost_update_emit: ($event) => _ctx.updateCurrency($event),
							year: _ctx.selectedYear.Yil
						}, null, 8, [
							"month",
							"id",
							"month_id",
							"currency",
							"onCost_save_emit",
							"onCost_update_emit",
							"year"
						]);
					}), 128))];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col">`);
			_push(ssrRenderComponent(_component_Button, {
				icon: "pi pi-file-excel",
				onClick: _ctx.cost_excel,
				class: "p-button-raised p-button-rounded",
				style: { "font-size": "2rem" }
			}, null, _parent));
			_push(`</div></div>`);
			_push(ssrRenderComponent(_component_ReportsMekmarAyoList, {
				list: _ctx.reportsStore.getReportsMekmarAyoList,
				total: _ctx.reportsStore.getReportsMekmarAyoListTotal,
				onMekmar_ayo_selected_emit: ($event) => _ctx.mekmarAyoSelected($event)
			}, null, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.mekmar_ayo_detail_dialog,
				"onUpdate:visible": ($event) => _ctx.mekmar_ayo_detail_dialog = $event,
				header: _ctx.detail_header,
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_DataTable, { value: _ctx.orderStore.getOrderProductionDocumentList }, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_Column, {
									field: "Tarih",
									header: "Upload Date"
								}, {
									body: withCtx((slotProps, _push, _parent, _scopeId) => {
										if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih))}`);
										else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih)), 1)];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_Column, {
									field: "Evrak",
									header: "Document Name"
								}, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_Column, {
									field: "Link",
									header: "Link"
								}, {
									body: withCtx((slotProps, _push, _parent, _scopeId) => {
										if (_push) _push(`<a${ssrRenderAttr("href", slotProps.data.Link)}${_scopeId}><i class="pi pi-download"${_scopeId}></i></a>`);
										else return [createVNode("a", { href: slotProps.data.Link }, [createVNode("i", { class: "pi pi-download" })], 8, ["href"])];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(ssrRenderComponent(_component_Column, {
									field: "kullanici",
									header: "Document Rep"
								}, null, _parent, _scopeId));
							} else return [
								createVNode(_component_Column, {
									field: "Tarih",
									header: "Upload Date"
								}, {
									body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih)), 1)]),
									_: 1
								}),
								createVNode(_component_Column, {
									field: "Evrak",
									header: "Document Name"
								}),
								createVNode(_component_Column, {
									field: "Link",
									header: "Link"
								}, {
									body: withCtx((slotProps) => [createVNode("a", { href: slotProps.data.Link }, [createVNode("i", { class: "pi pi-download" })], 8, ["href"])]),
									_: 1
								}),
								createVNode(_component_Column, {
									field: "kullanici",
									header: "Document Rep"
								})
							];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_DataTable, { value: _ctx.orderStore.getOrderProductionDocumentList }, {
						default: withCtx(() => [
							createVNode(_component_Column, {
								field: "Tarih",
								header: "Upload Date"
							}, {
								body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih)), 1)]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "Evrak",
								header: "Document Name"
							}),
							createVNode(_component_Column, {
								field: "Link",
								header: "Link"
							}, {
								body: withCtx((slotProps) => [createVNode("a", { href: slotProps.data.Link }, [createVNode("i", { class: "pi pi-download" })], 8, ["href"])]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "kullanici",
								header: "Document Rep"
							})
						]),
						_: 1
					}, 8, ["value"])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reports/mekmar/ayo.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ayo-B_HSYdAd.mjs.map
