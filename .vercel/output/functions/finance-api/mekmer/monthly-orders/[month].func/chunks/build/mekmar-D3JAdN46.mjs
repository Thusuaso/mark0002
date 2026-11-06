import { a as useAppToast, _ as _plugin_vue_export_helper_default, F as FilterMatchMode, e as formatPriceUsd, u as useCookie, f as formatDecimal } from '../virtual/entry.mjs';
import { n as script } from './button-C8Z7Yc79.mjs';
import { n as script$3 } from './column-CT6GXkG2.mjs';
import { n as script$2 } from './datatable-D6ou7HZJ.mjs';
import { n as script$4 } from './inputtext-s6cxdqDx.mjs';
import { t as script$7 } from './select-T8LIeBQG.mjs';
import { n as script$9 } from './checkbox-wtvrQjx7.mjs';
import { n as script$8 } from './autocomplete-5Wwvp4c8.mjs';
import { t as script$6 } from './textarea-DHWHHqLi.mjs';
import { n as script$5 } from './floatlabel-BDqo8RCT.mjs';
import { t as toIsoDate } from './dates-C-BBx50j.mjs';
import { n as script$1 } from './dialog-BB6no0wu.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { u as useReferenceData } from './useReferenceData-DTHP3Dno.mjs';
import { u as useModelsStore } from './models-CeLtEMS4.mjs';
import { u as useCustomerStore } from './customer-DH4F4_Cr.mjs';
import { e as exportExcel } from './useExcelExport-B-DCkvaR.mjs';
import { withAsyncContext, mergeProps, withCtx, createVNode, openBlock, createBlock, unref, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
import './chip--BHyxaU9.mjs';
import './timescircle-0itGCn-i.mjs';
import './utils-9fKJJYP7.mjs';
import './useApi-CGFzrxZs.mjs';
import './useLegacyApi-B5zRc7ig.mjs';

//#region app/components/customer/mekmar/List.vue
var _sfc_main$4 = {
	computed: {},
	computed: { customerStore() {
		return useCustomerStore();
	} },
	props: { list: {
		type: Array,
		required: false
	} },
	data() {
		return {
			selectedCustomer: null,
			filters1: {
				FirmaAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				Marketing: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				UlkeAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				Temsilci: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				SatisciAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				}
			}
		};
	},
	methods: { customerSelected(event) {
		this.$emit("customer_mekmar_selected_emit", event);
		this.customerStore.setMekmarDetailOrdersList(event.data.ID);
	} }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_DataTable = script$2;
	const _component_Column = script$3;
	const _component_InputText = script$4;
	_push(`<div${ssrRenderAttrs(_attrs)}>`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $props.list,
		sortField: "ID",
		sortOrder: -1,
		selection: $data.selectedCustomer,
		"onUpdate:selection": ($event) => $data.selectedCustomer = $event,
		selectionMode: "single",
		onRowClick: ($event) => $options.customerSelected($event),
		paginator: true,
		rows: 15,
		filters: $data.filters1,
		"onUpdate:filters": ($event) => $data.filters1 = $event,
		filterDisplay: "row"
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "ID",
					header: "Id",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "FirmaAdi",
					header: "Company",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Adres",
					header: "Address",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Marketing",
					header: "Marketing",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "UlkeAdi",
					header: "Country",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Png_Flags",
					header: "Logo",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`<img${ssrRenderAttr("src", "https://cdn.mekmarimage.com/countryLogo/" + slotProps.data.Png_Flags)} width="50" heigth="50"${_scopeId}>`);
						else return [createVNode("img", {
							src: "https://cdn.mekmarimage.com/countryLogo/" + slotProps.data.Png_Flags,
							width: "50",
							heigth: "50"
						}, null, 8, ["src"])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Temsilci",
					header: "Representative",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SatisciAdi",
					header: "Seller",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Devir",
					header: "Assigned",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (slotProps.data.Devir) _push(`<div${_scopeId}>✓</div>`);
							else _push(`<div${_scopeId}>X</div>`);
						} else return [slotProps.data.Devir ? (openBlock(), createBlock("div", { key: 0 }, "✓")) : (openBlock(), createBlock("div", { key: 1 }, "X"))];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Ozel",
					header: "Personal",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (slotProps.data.Ozel) _push(`<div${_scopeId}>✓</div>`);
							else _push(`<div${_scopeId}>X</div>`);
						} else return [slotProps.data.Ozel ? (openBlock(), createBlock("div", { key: 0 }, "✓")) : (openBlock(), createBlock("div", { key: 1 }, "X"))];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "ID",
					header: "Id",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "FirmaAdi",
					header: "Company",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Adres",
					header: "Address",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "Marketing",
					header: "Marketing",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "UlkeAdi",
					header: "Country",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Png_Flags",
					header: "Logo",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createVNode("img", {
						src: "https://cdn.mekmarimage.com/countryLogo/" + slotProps.data.Png_Flags,
						width: "50",
						heigth: "50"
					}, null, 8, ["src"])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Temsilci",
					header: "Representative",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SatisciAdi",
					header: "Seller",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Devir",
					header: "Assigned",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [slotProps.data.Devir ? (openBlock(), createBlock("div", { key: 0 }, "✓")) : (openBlock(), createBlock("div", { key: 1 }, "X"))]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Ozel",
					header: "Personal",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [slotProps.data.Ozel ? (openBlock(), createBlock("div", { key: 0 }, "✓")) : (openBlock(), createBlock("div", { key: 1 }, "X"))]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div>`);
}
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/customer/mekmar/List.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var List_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3]]), { __name: "CustomerMekmarList" });
//#endregion
//#region app/components/customer/mekmar/Form.vue
var _sfc_main$3 = {
	computed: {},
	computed: { customerStore() {
		return useCustomerStore();
	} },
	props: {
		model: {
			type: Object,
			required: false
		},
		country: {
			type: Array,
			required: true
		},
		status: {
			type: Boolean,
			required: true
		},
		users: {
			type: Array,
			required: true
		},
		orders: {
			type: Array,
			required: false
		}
	},
	data() {
		return {
			customerModel: "",
			selectedCountry: null,
			filteredCountry: null,
			selectedRepresentative: null,
			filteredRepresentative: null,
			selectedOrderer: null,
			filteredOrderer: null,
			selectedPriority: null,
			priorities: [
				{ priority: "A" },
				{ priority: "B" },
				{ priority: "C" }
			],
			selectedOrderYear: null,
			modelValue: null
		};
	},
	created() {
		this.modelValue = this.model;
		if (!this.status) this.createdProcess();
	},
	mounted() {},
	methods: {
		update() {
			this.modelValue.MusteriOncelik = this.selectedPriority.priority;
			this.modelValue.Temsilci = this.selectedRepresentative.KullaniciAdi;
			this.modelValue.TemsilciId = this.selectedRepresentative.ID;
			this.modelValue.Satisci = this.selectedOrderer.KullaniciAdi;
			this.modelValue.SatisciId = this.selectedOrderer.ID;
			this.modelValue.Aktif = 1;
			this.modelValue.Ulke = this.selectedCountry.UlkeAdi;
			this.modelValue.UlkeId = this.selectedCountry.Id;
			this.modelValue.Mt_No = 2;
			if (this.modelValue.Devir) this.modelValue.Devir = 1;
			else this.modelValue.Devir = 0;
			if (this.modelValue.Ozel) this.modelValue.Ozel = 1;
			else this.modelValue.Ozel = 0;
			if (this.modelValue.Takip) this.modelValue.Takip = 1;
			else this.modelValue.Takip = 0;
			if (this.modelValue.SonKullanici) this.modelValue.SonKullanici = 1;
			else this.modelValue.SonKullanici = 0;
			this.customerStore.setMekmarCustomerUpdate(this.modelValue);
			this.$emit("customer_mekmar_dialog", false);
		},
		save() {
			this.modelValue.MusteriOncelik = this.selectedPriority.priority;
			this.modelValue.Temsilci = this.selectedRepresentative.KullaniciAdi;
			this.modelValue.TemsilciId = this.selectedRepresentative.ID;
			this.modelValue.Satisci = this.selectedOrderer.KullaniciAdi;
			this.modelValue.SatisciId = this.selectedOrderer.ID;
			this.modelValue.Aktif = 1;
			this.modelValue.Ulke = this.selectedCountry.UlkeAdi;
			this.modelValue.UlkeId = this.selectedCountry.Id;
			this.modelValue.KayitTarihi = toIsoDate(/* @__PURE__ */ new Date());
			this.modelValue.Mt_No = 2;
			this.modelValue.KullaniciID = useCookie("userId").value;
			if (this.modelValue.Devir) this.modelValue.Devir = 1;
			else this.modelValue.Devir = 0;
			if (this.modelValue.Ozel) this.modelValue.Ozel = 1;
			else this.modelValue.Ozel = 0;
			if (this.modelValue.Takip) this.modelValue.Takip = 1;
			else this.modelValue.Takip = 0;
			if (this.modelValue.SonKullanici) this.modelValue.SonKullanici = 1;
			else this.modelValue.SonKullanici = 0;
			this.customerStore.setMekmarCustomerSave(this.modelValue).then((res) => {
			});
			this.$emit("customer_mekmar_dialog", false);
		},
		deleteForm() {
			this.customerStore.setMekmarCustomerDelete(this.modelValue.ID);
			this.$emit("customer_mekmar_dialog", false);
		},
		saveProcess() {
			if (this.status) this.save();
			else this.update();
		},
		orderYearSelected(event) {
			this.$emit("customer_mekmar_order_po_emit", event.data);
		},
		searchOrderer(event) {
			let results;
			if (event.query.length == 0) results = this.users;
			else results = this.users.filter((x) => {
				return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredOrderer = results;
		},
		searchRepresentative(event) {
			let results;
			if (event.query.length == 0) results = this.users;
			else results = this.users.filter((x) => {
				return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredRepresentative = results;
		},
		createdProcess() {
			this.selectedCountry = this.country.find((x) => x.Id == this.modelValue.UlkeId);
			this.selectedRepresentative = this.users.find((x) => x.ID == this.modelValue.TemsilciId);
			this.selectedOrderer = this.users.find((x) => x.ID == this.modelValue.SatisciId);
			this.selectedPriority = this.priorities.find((x) => x.priority == this.modelValue.MusteriOncelik);
		},
		searchCountry(event) {
			let results;
			if (event.query.length == 0) results = this.country;
			else results = this.country.filter((x) => {
				return x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredCountry = results;
		}
	}
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_FloatLabel = script$5;
	const _component_InputText = script$4;
	const _component_Textarea = script$6;
	const _component_Select = script$7;
	const _component_AutoComplete = script$8;
	const _component_Checkbox = script$9;
	const _component_DataTable = script$2;
	const _component_Column = script$3;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><div class="row mt-3"><div class="col-9"><div class="row mb-3"><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "customer",
					type: "text",
					modelValue: $data.modelValue.FirmaAdi,
					"onUpdate:modelValue": ($event) => $data.modelValue.FirmaAdi = $event,
					class: "w-100"
				}, null, _parent, _scopeId));
				_push(`<label for="customer"${_scopeId}>Customer</label>`);
			} else return [createVNode(_component_InputText, {
				id: "customer",
				type: "text",
				modelValue: $data.modelValue.FirmaAdi,
				"onUpdate:modelValue": ($event) => $data.modelValue.FirmaAdi = $event,
				class: "w-100"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "customer" }, "Customer")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "mail",
					type: "text",
					modelValue: $data.modelValue.MailAdresi,
					"onUpdate:modelValue": ($event) => $data.modelValue.MailAdresi = $event,
					class: "w-100"
				}, null, _parent, _scopeId));
				_push(`<label for="mail"${_scopeId}>Mail</label>`);
			} else return [createVNode(_component_InputText, {
				id: "mail",
				type: "text",
				modelValue: $data.modelValue.MailAdresi,
				"onUpdate:modelValue": ($event) => $data.modelValue.MailAdresi = $event,
				class: "w-100"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "mail" }, "Mail")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row mb-3"><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Textarea, {
					modelValue: $data.modelValue.Unvan,
					"onUpdate:modelValue": ($event) => $data.modelValue.Unvan = $event,
					rows: "4",
					cols: "30",
					style: { "width": "100%" }
				}, null, _parent, _scopeId));
				_push(`<label${_scopeId}>Company</label>`);
			} else return [createVNode(_component_Textarea, {
				modelValue: $data.modelValue.Unvan,
				"onUpdate:modelValue": ($event) => $data.modelValue.Unvan = $event,
				rows: "4",
				cols: "30",
				style: { "width": "100%" }
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Company")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row mb-3"><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Textarea, {
					modelValue: $data.modelValue.Adres,
					"onUpdate:modelValue": ($event) => $data.modelValue.Adres = $event,
					rows: "4",
					cols: "30",
					style: { "width": "100%" }
				}, null, _parent, _scopeId));
				_push(`<label${_scopeId}>Address</label>`);
			} else return [createVNode(_component_Textarea, {
				modelValue: $data.modelValue.Adres,
				"onUpdate:modelValue": ($event) => $data.modelValue.Adres = $event,
				rows: "4",
				cols: "30",
				style: { "width": "100%" }
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Address")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row mb-3"><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "marketing",
					type: "text",
					modelValue: $data.modelValue.Marketing,
					"onUpdate:modelValue": ($event) => $data.modelValue.Marketing = $event,
					class: "w-100"
				}, null, _parent, _scopeId));
				_push(`<label for="marketing"${_scopeId}>Marketing</label>`);
			} else return [createVNode(_component_InputText, {
				id: "marketing",
				type: "text",
				modelValue: $data.modelValue.Marketing,
				"onUpdate:modelValue": ($event) => $data.modelValue.Marketing = $event,
				class: "w-100"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "marketing" }, "Marketing")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "phone",
					type: "text",
					modelValue: $data.modelValue.Telefon,
					"onUpdate:modelValue": ($event) => $data.modelValue.Telefon = $event,
					class: "w-100"
				}, null, _parent, _scopeId));
				_push(`<label for="phone"${_scopeId}>Phone</label>`);
			} else return [createVNode(_component_InputText, {
				id: "phone",
				type: "text",
				modelValue: $data.modelValue.Telefon,
				"onUpdate:modelValue": ($event) => $data.modelValue.Telefon = $event,
				class: "w-100"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "phone" }, "Phone")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_Select, {
		modelValue: $data.selectedPriority,
		"onUpdate:modelValue": ($event) => $data.selectedPriority = $event,
		options: $data.priorities,
		class: "w-100",
		optionLabel: "priority"
	}, null, _parent));
	_push(`</div></div><div class="row mb-3"><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedRepresentative,
					"onUpdate:modelValue": ($event) => $data.selectedRepresentative = $event,
					inputId: "representative",
					suggestions: $data.filteredRepresentative,
					optionLabel: "KullaniciAdi",
					onComplete: ($event) => $options.searchRepresentative($event)
				}, null, _parent, _scopeId));
				_push(`<label for="representative"${_scopeId}>Representative</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedRepresentative,
				"onUpdate:modelValue": ($event) => $data.selectedRepresentative = $event,
				inputId: "representative",
				suggestions: $data.filteredRepresentative,
				optionLabel: "KullaniciAdi",
				onComplete: ($event) => $options.searchRepresentative($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete"
			]), createVNode("label", { for: "representative" }, "Representative")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedOrderer,
					"onUpdate:modelValue": ($event) => $data.selectedOrderer = $event,
					inputId: "orderer",
					suggestions: $data.filteredOrderer,
					optionLabel: "KullaniciAdi",
					onComplete: ($event) => $options.searchOrderer($event)
				}, null, _parent, _scopeId));
				_push(`<label for="orderer"${_scopeId}>Seller</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedOrderer,
				"onUpdate:modelValue": ($event) => $data.selectedOrderer = $event,
				inputId: "orderer",
				suggestions: $data.filteredOrderer,
				optionLabel: "KullaniciAdi",
				onComplete: ($event) => $options.searchOrderer($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete"
			]), createVNode("label", { for: "orderer" }, "Seller")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedCountry,
					"onUpdate:modelValue": ($event) => $data.selectedCountry = $event,
					inputId: "country",
					suggestions: $data.filteredCountry,
					optionLabel: "UlkeAdi",
					onComplete: ($event) => $options.searchCountry($event)
				}, null, _parent, _scopeId));
				_push(`<label for="country"${_scopeId}>Country</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedCountry,
				"onUpdate:modelValue": ($event) => $data.selectedCountry = $event,
				inputId: "country",
				suggestions: $data.filteredCountry,
				optionLabel: "UlkeAdi",
				onComplete: ($event) => $options.searchCountry($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete"
			]), createVNode("label", { for: "country" }, "Country")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row mb-3"><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Textarea, {
					modelValue: $data.modelValue.Notlar,
					"onUpdate:modelValue": ($event) => $data.modelValue.Notlar = $event,
					rows: "5",
					class: "w-100"
				}, null, _parent, _scopeId));
				_push(`<label${_scopeId}>Description</label>`);
			} else return [createVNode(_component_Textarea, {
				modelValue: $data.modelValue.Notlar,
				"onUpdate:modelValue": ($event) => $data.modelValue.Notlar = $event,
				rows: "5",
				class: "w-100"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row mb-3"><div class="col"><div class="flex align-items-center">`);
	_push(ssrRenderComponent(_component_Checkbox, {
		modelValue: $data.modelValue.Devir,
		"onUpdate:modelValue": ($event) => $data.modelValue.Devir = $event,
		inputId: "cycle",
		binary: true
	}, null, _parent));
	_push(`<label for="cycle" class="ml-2"> Assigned </label></div></div><div class="col"><div class="flex align-items-center">`);
	_push(ssrRenderComponent(_component_Checkbox, {
		modelValue: $data.modelValue.Ozel,
		"onUpdate:modelValue": ($event) => $data.modelValue.Ozel = $event,
		inputId: "special",
		binary: true
	}, null, _parent));
	_push(`<label for="special" class="ml-2"> Personal </label></div></div><div class="col"><div class="flex align-items-center">`);
	_push(ssrRenderComponent(_component_Checkbox, {
		modelValue: $data.modelValue.Takip,
		"onUpdate:modelValue": ($event) => $data.modelValue.Takip = $event,
		inputId: "follow",
		binary: true
	}, null, _parent));
	_push(`<label for="follow" class="ml-2"> Follow </label></div></div><div class="col"><div class="flex align-items-center">`);
	_push(ssrRenderComponent(_component_Checkbox, {
		modelValue: $data.modelValue.SonKullanici,
		"onUpdate:modelValue": ($event) => $data.modelValue.SonKullanici = $event,
		inputId: "lastuser",
		binary: true
	}, null, _parent));
	_push(`<label for="lastuser" class="ml-2"> Last Orderer </label></div></div></div></div><div class="col-12 col-lg-3">`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $props.orders,
		sortField: "year",
		sortOrder: -1,
		selection: $data.selectedOrderYear,
		"onUpdate:selection": ($event) => $data.selectedOrderYear = $event,
		selectionMode: "single",
		onRowClick: ($event) => $options.orderYearSelected($event)
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "year",
					header: "Year",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "total",
					header: "Total",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.total))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.total)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [createVNode(_component_Column, {
				field: "year",
				header: "Year",
				headerClass: "tableHeader",
				bodyClass: "tableBody"
			}), createVNode(_component_Column, {
				field: "total",
				header: "Total",
				headerClass: "tableHeader",
				bodyClass: "tableBody"
			}, {
				body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.total)), 1)]),
				_: 1
			})];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row mt-3"><div class="col"><button type="button" class="btn btn-success w-100"> Save </button></div>`);
	if (!$props.status) _push(`<div class="col"><button type="button" class="btn btn-danger w-100"> Delete </button></div>`);
	else _push(`<!---->`);
	_push(`</div></div>`);
}
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/customer/mekmar/Form.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var Form_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]), { __name: "CustomerMekmarForm" });
//#endregion
//#region app/components/customer/mekmar/OrdersPoForm.vue
var _sfc_main$2 = {
	props: { po: {
		type: Array,
		required: false
	} },
	data() {
		return { selectedPo: null };
	}
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_DataTable = script$2;
	const _component_Column = script$3;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}>`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $props.po,
		selection: $data.selectedPo,
		"onUpdate:selection": ($event) => $data.selectedPo = $event,
		selectionMode: "single",
		onRowClick: ($event) => _ctx.$emit("customer_order_po_selected_emit", $event.data.SiparisNo)
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "SiparisNo",
					header: "Po",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SiparisSahibi",
					header: "Order Owner",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Operasyon",
					header: "Operation",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "SiparisNo",
					header: "Po",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "SiparisSahibi",
					header: "Order Owner",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "Operasyon",
					header: "Operation",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div>`);
}
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/customer/mekmar/OrdersPoForm.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var OrdersPoForm_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]), { __name: "CustomerMekmarOrdersPoForm" });
//#endregion
//#region app/components/customer/mekmar/OrdersPoProductsForm.vue
var _sfc_main$1 = { props: { products: {
	type: Array,
	required: false
} } };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_DataTable = script$2;
	const _component_Column = script$3;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}>`);
	_push(ssrRenderComponent(_component_DataTable, { value: $props.products }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "KategoriAdi",
					header: "Category",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "UrunAdi",
					header: "Product",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "YuzeyIslemAdi",
					header: "Surface",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "En",
					header: "Width",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Boy",
					header: "Height",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Kenar",
					header: "Edge",
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
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "BirimAdi",
					header: "Unit",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SatisFiyati",
					header: "Price",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SatisToplam",
					header: "Total",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisToplam))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisToplam)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "KategoriAdi",
					header: "Category",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "UrunAdi",
					header: "Product",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "YuzeyIslemAdi",
					header: "Surface",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "En",
					header: "Width",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "Boy",
					header: "Height",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "Kenar",
					header: "Edge",
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
					_: 1
				}),
				createVNode(_component_Column, {
					field: "BirimAdi",
					header: "Unit",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "SatisFiyati",
					header: "Price",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SatisToplam",
					header: "Total",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisToplam)), 1)]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/customer/mekmar/OrdersPoProductsForm.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var OrdersPoProductsForm_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]), { __name: "CustomerMekmarOrdersPoProductsForm" });
//#endregion
//#region app/pages/customer/mekmar.vue
var _sfc_main = /*@__PURE__*/ Object.assign({
	middleware: ["authority"],
	computed: {
		customerStore() {
			return useCustomerStore();
		},
		modelsStore() {
			return useModelsStore();
		},
		sharedStore() {
			return useSharedStore();
		}
	},
	mounted() {
		this.customerStore.setMekmarList();
	},
	data() {
		return {
			customer_mekmar_dialog_form: false,
			model: null,
			custommer_mekmar_orders_dialog_form: false,
			cusomer_mekmar_orders_products_dialog_form: false,
			excelColumnsField: [
				{
					label: "Firma Adı",
					field: "FirmaAdi"
				},
				{
					label: "Unvan",
					field: "Unvan"
				},
				{
					label: "Adres",
					field: "Adres"
				},
				{
					label: "Ulke",
					field: "Ulke"
				},
				{
					label: "Marketing",
					field: "Marketing"
				},
				{
					label: "Temsilci",
					field: "Temsilci"
				},
				{
					label: "Satisci Adi",
					field: "SatisciAdi"
				},
				{
					label: "Mail Adresi",
					field: "MailAdresi"
				},
				{
					label: "Telefon",
					field: "Telefon"
				},
				{
					label: "Musteri Yeri",
					field: "MusteriYeri"
				}
			]
		};
	},
	methods: {
		async customer_excel_output() {
			try {
				await exportExcel("/excel-api/reports/customer-mekmar", this.customerStore.getMekmarList, "Customers.xlsx");
			} catch (err) {
				console.error("customer-mekmar excel ciktisi basarisiz:", err);
				useAppToast().error("Excel olusturulamadi.");
			}
		},
		customerOrderPoSelectedEmit(po) {
			this.customerStore.setMekmarDetailOrdersPoProductsList(po);
			this.cusomer_mekmar_orders_products_dialog_form = true;
		},
		customerMekmarOrderPo(event) {
			this.custommer_mekmar_orders_dialog_form = true;
			this.customerStore.setMekmarDetailOrdersPoList(event);
		},
		newForm() {
			this.modelsStore.setCustomerModel();
			this.model = this.modelsStore.getCustomerModel;
			this.customerStore.setMekmarButtonStatus(true);
			this.customer_mekmar_dialog_form = true;
		},
		customerMekmarSelected(event) {
			this.model = event.data;
			this.customerStore.setMekmarButtonStatus(false);
			this.customer_mekmar_dialog_form = true;
		}
	}
}, {
	__name: "mekmar",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const mekmarSharedStore = useSharedStore();
		[__temp, __restore] = withAsyncContext(() => useReferenceData("customer-mekmar", [["countryList", () => mekmarSharedStore.setCountryList()]])), await __temp, __restore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Button = script;
			const _component_CustomerMekmarList = List_default;
			const _component_Dialog = script$1;
			const _component_CustomerMekmarForm = Form_default;
			const _component_CustomerMekmarOrdersPoForm = OrdersPoForm_default;
			const _component_CustomerMekmarOrdersPoProductsForm = OrdersPoProductsForm_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><div class="row"><div class="col">`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				severity: "success",
				class: "w-100",
				label: "New",
				onClick: _ctx.newForm
			}, null, _parent));
			_push(`</div><div class="col">`);
			_push(ssrRenderComponent(_component_Button, {
				class: "w-100 p-button-primary",
				onClick: _ctx.customer_excel_output,
				label: "Excel"
			}, null, _parent));
			_push(`</div></div>`);
			_push(ssrRenderComponent(_component_CustomerMekmarList, {
				list: _ctx.customerStore.getMekmarList,
				onCustomer_mekmar_selected_emit: ($event) => _ctx.customerMekmarSelected($event)
			}, null, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.customer_mekmar_dialog_form,
				"onUpdate:visible": ($event) => _ctx.customer_mekmar_dialog_form = $event,
				header: "",
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_CustomerMekmarForm, {
						model: _ctx.model,
						country: _ctx.sharedStore.getCountryList,
						status: _ctx.customerStore.getMekmarButtonStatus,
						users: _ctx.sharedStore.getUserList,
						orders: _ctx.customerStore.getMekmarButtonStatus ? [] : _ctx.customerStore.getMekmarDetailOrdersList,
						onCustomer_mekmar_order_po_emit: ($event) => _ctx.customerMekmarOrderPo($event),
						onCustomer_mekmar_dialog: ($event) => _ctx.customer_mekmar_dialog_form = $event
					}, null, _parent, _scopeId));
					else return [createVNode(_component_CustomerMekmarForm, {
						model: _ctx.model,
						country: _ctx.sharedStore.getCountryList,
						status: _ctx.customerStore.getMekmarButtonStatus,
						users: _ctx.sharedStore.getUserList,
						orders: _ctx.customerStore.getMekmarButtonStatus ? [] : _ctx.customerStore.getMekmarDetailOrdersList,
						onCustomer_mekmar_order_po_emit: ($event) => _ctx.customerMekmarOrderPo($event),
						onCustomer_mekmar_dialog: ($event) => _ctx.customer_mekmar_dialog_form = $event
					}, null, 8, [
						"model",
						"country",
						"status",
						"users",
						"orders",
						"onCustomer_mekmar_order_po_emit",
						"onCustomer_mekmar_dialog"
					])];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.custommer_mekmar_orders_dialog_form,
				"onUpdate:visible": ($event) => _ctx.custommer_mekmar_orders_dialog_form = $event,
				header: "",
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_CustomerMekmarOrdersPoForm, {
						po: _ctx.customerStore.getMekmarDetailOrdersPoList,
						onCustomer_order_po_selected_emit: ($event) => _ctx.customerOrderPoSelectedEmit($event)
					}, null, _parent, _scopeId));
					else return [createVNode(_component_CustomerMekmarOrdersPoForm, {
						po: _ctx.customerStore.getMekmarDetailOrdersPoList,
						onCustomer_order_po_selected_emit: ($event) => _ctx.customerOrderPoSelectedEmit($event)
					}, null, 8, ["po", "onCustomer_order_po_selected_emit"])];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.cusomer_mekmar_orders_products_dialog_form,
				"onUpdate:visible": ($event) => _ctx.cusomer_mekmar_orders_products_dialog_form = $event,
				header: "",
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_CustomerMekmarOrdersPoProductsForm, { products: _ctx.customerStore.getSetMekmarDetailOrdersPoProductsList }, null, _parent, _scopeId));
					else return [createVNode(_component_CustomerMekmarOrdersPoProductsForm, { products: _ctx.customerStore.getSetMekmarDetailOrdersPoProductsList }, null, 8, ["products"])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/customer/mekmar.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=mekmar-D3JAdN46.mjs.map
