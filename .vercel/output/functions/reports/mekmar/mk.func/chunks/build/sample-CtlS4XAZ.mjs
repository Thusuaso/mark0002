import { _ as _plugin_vue_export_helper_default, c as dateToString, F as FilterMatchMode, e as formatPriceUsd, u as useCookie, a as useAppToast } from '../virtual/entry.mjs';
import { n as script } from './button-C8Z7Yc79.mjs';
import { n as script$4 } from './column-CT6GXkG2.mjs';
import { n as script$3 } from './datatable-D6ou7HZJ.mjs';
import { n as script$5 } from './inputtext-s6cxdqDx.mjs';
import { t as script$1 } from './select-T8LIeBQG.mjs';
import { n as script$a } from './radiobutton-C-685P7O.mjs';
import { n as script$e } from './autocomplete-5Wwvp4c8.mjs';
import { t as script$b } from './textarea-DHWHHqLi.mjs';
import { n as script$9 } from './floatlabel-BDqo8RCT.mjs';
import { t as toIsoDate, f as fromIsoDate } from './dates-C-BBx50j.mjs';
import { n as script$2 } from './dialog-BB6no0wu.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { n as script$8 } from './card-D9W2BIHg.mjs';
import { u as useReferenceData } from './useReferenceData-DTHP3Dno.mjs';
import { u as useModelsStore } from './models-CeLtEMS4.mjs';
import { C as CustomInput_default } from './CustomInput-B9GfGXia.mjs';
import { u as useFileService } from './useFileService-Bon6d2kz.mjs';
import { n as script$d } from './fileupload-Q8ndBK5J.mjs';
import { n as script$c } from './datepicker-BGpmmzow.mjs';
import { t as script$7 } from './tabpanel-DPLeP9v3.mjs';
import { t as script$6 } from './tabview-BysloIbG.mjs';
import { u as useSampleStore } from './sample-BxPJhB-c.mjs';
import { withAsyncContext, mergeProps, withCtx, createVNode, unref, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
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
import './checkbox-wtvrQjx7.mjs';
import './minus-C71kU5yE.mjs';
import './plus-CA09jZgn.mjs';
import './focustrap-kXXT0pga.mjs';
import './sortamountupalt-MmmjHcOR.mjs';
import './chip--BHyxaU9.mjs';
import './timescircle-0itGCn-i.mjs';
import './utils-9fKJJYP7.mjs';
import './useApi-CGFzrxZs.mjs';
import './useLegacyApi-B5zRc7ig.mjs';
import './message-DvSNQ9wF.mjs';
import './progressbar-BWtVAJVg.mjs';
import './chevronleft-Dy82Mung.mjs';
import './chevronup-CFGDy7zv.mjs';

//#region app/components/sample/List.vue
var _sfc_main$2 = {
	props: { list: {
		type: Array,
		required: false
	} },
	data() {
		return {
			sampleFilters: {
				NumuneTarihi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				NumuneTemsilciAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				NumuneNo: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				}
			},
			selectedSample: null
		};
	}
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_DataTable = script$3;
	const _component_Column = script$4;
	const _component_InputText = script$5;
	_push(`<div${ssrRenderAttrs(_attrs)}>`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $props.list,
		class: "p-datatable-sm",
		filters: $data.sampleFilters,
		"onUpdate:filters": ($event) => $data.sampleFilters = $event,
		filterDisplay: "row",
		selection: $data.selectedSample,
		"onUpdate:selection": ($event) => $data.selectedSample = $event,
		selectionMode: "single",
		onRowClick: ($event) => _ctx.$emit("sample_selected_list", $event)
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "NumuneTarihi",
					header: "Date",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody",
					sortable: ""
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.NumuneTarihi))}`);
						else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.NumuneTarihi)), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "NumuneTemsilciAdi",
					header: "Seller",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "NumuneNo",
					header: "Sample Po",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "NumuneKategori",
					header: "Category",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					header: "Miktar/Birim",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.Miktar)} / ${ssrInterpolate(slotProps.data.NumuneUrunBirim)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.Miktar) + " / " + toDisplayString(slotProps.data.NumuneUrunBirim), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "NumuneGonderiTipi",
					header: "Shipment Type",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "NumuneBanka",
					header: "Bank",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "NumuneTarihi",
					header: "Date",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody",
					sortable: ""
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.NumuneTarihi)), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "NumuneTemsilciAdi",
					header: "Seller",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "NumuneNo",
					header: "Sample Po",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "NumuneKategori",
					header: "Category",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					header: "Miktar/Birim",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.Miktar) + " / " + toDisplayString(slotProps.data.NumuneUrunBirim), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "NumuneGonderiTipi",
					header: "Shipment Type",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "NumuneBanka",
					header: "Bank",
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sample/List.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var List_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]), { __name: "SampleList" });
//#endregion
//#region app/components/sample/Form.vue
var _sfc_main$1 = {
	computed: {},
	computed: { sampleStore() {
		return useSampleStore();
	} },
	props: {
		model: {
			type: Object,
			required: true
		},
		customers: {
			type: Array,
			required: true
		},
		country: {
			type: Array,
			required: true
		},
		users: {
			type: Array,
			required: true
		},
		category: {
			type: Array,
			required: true
		},
		unit: {
			type: Array,
			required: true
		},
		sending: {
			type: Array,
			required: true
		},
		bank: {
			type: Array,
			required: true
		},
		paid: {
			type: Array,
			required: false
		},
		status: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			dhl_date: null,
			input_date: null,
			output_date: null,
			filteredCustomers: null,
			selectedCustomer: null,
			selectedCountry: null,
			filteredCountry: null,
			selectedUser: null,
			filteredUser: null,
			selectedCategory: null,
			selectedUnit: null,
			selectedSendingType: null,
			selectedBankType: null,
			bankTypeDisabled: false,
			paid_date: null,
			selectedBank: null,
			freigthCost: null,
			paidDescription: null,
			selectedFrontPhoto: null,
			selectedBackPhoto: null
		};
	},
	mounted() {
		if (!this.status) this.createdProcess();
	},
	methods: {
		dhlDateSelected(event) {
			this.model.DhlTarihi = toIsoDate(event);
		},
		customerInput(event) {
			this.model.FirmaAdi = event;
		},
		createdProcess() {
			this.selectedCategory = this.category.find((x) => x.ID == this.model.KategoriID);
			this.selectedUnit = this.unit.find((x) => x.ID == this.model.UrunBirimi);
			this.selectedSendingType = this.sending.find((x) => x.ID == this.model.GonderiTipi).ID;
			if (this.model.GonderiTipi == 1 || this.model.GonderiTipi == 3) this.bankTypeDisabled = true;
			if (this.model.BankaSecim == null || this.model.BankaSecim == 0 || this.model.BankaSecim == "null" || this.model.BankaSecim == void 0 || this.model.BankaSecim == 0) {
				this.selectedBankType = null;
				this.model.BankaSecim = 0;
			} else this.selectedBankType = this.bank.find((x) => x.ID == this.model.BankaSecim).ID;
			if (this.model.NumuneTarihi == null || this.model.NumuneTarihi == " " || this.model.NumuneTarihi == void 0 || this.model.NumuneTarihi == "1900-01-01" || this.model.NumuneTarihi == "1900-01-01T00:00:00.000Z") this.input_date = null;
			else this.input_date = fromIsoDate(this.model.NumuneTarihi);
			if (this.model.YuklemeTarihi == null || this.model.YuklemeTarihi == " " || this.model.YuklemeTarihi == void 0 || this.model.YuklemeTarihi == "1900-01-01" || this.model.YuklemeTarihi == "1900-01-01T00:00:00.000Z") this.output_date = null;
			else this.output_date = fromIsoDate(this.model.YuklemeTarihi);
			if (this.model.DhlTarihi == null || this.model.DhlTarihi == "" || this.model.DhlTarihi == void 0 || this.model.DhlTarihi == "1900-01-01" || this.model.DhlTarihi == "1900-01-01T00:00:00.000Z") this.dhl_date = "";
			else this.dhl_date = fromIsoDate(this.model.DhlTarihi);
			this.selectedCustomer = this.customers.find((x) => x.Id == this.model.MusteriID);
			this.selectedCountry = this.country.find((x) => x.Id == this.model.Ulke);
			this.selectedUser = this.users.find((x) => x.ID == this.model.NumuneTemsilci);
		},
		deleteProcess() {
			if (confirm("Are you sure you want to perform this action?")) {
				const data = {
					id: this.model.ID,
					po: this.model.NumuneNo
				};
				this.$emit("delete_process", data);
			}
		},
		process() {
			this.model.NumuneTarihi = toIsoDate(this.input_date);
			if (this.output_date == null || this.output_date == " " || this.output_date == "1900-01-01" || this.output_date == void 0 || this.output_date == "1900-01-01T00:00:00.000Z") this.model.YuklemeTarihi = "";
			else this.model.YuklemeTarihi = toIsoDate(this.output_date);
			if (this.model.DhlTarihi == null || this.model.DhlTarihi == "1900-01-01" || this.model.DhlTarihi == void 0 || this.model.DhlTarihi == "1900-01-01T00:00:00.000Z") this.model.DhlTarihi = "";
			this.$emit("process", this.model);
		},
		backPhotoSelected(event) {
			useFileService().sendSample(event.files[0], this.model.ID).then((response) => {
				if (response.Status) {
					const data = {
						ID: this.model.ID,
						Numune_Cloud2: true,
						Numune_Cloud_Dosya2: event.files[0].name
					};
					this.sampleStore.setSamplePhotosBack(data);
					this.model.ArkaYuzFoto = `https://file-service.mekmar.com/file/download/numune/numuneDosya/${this.model.ID}/${event.files[0].name}`;
				} else useAppToast().error("Fotoğrafın Arka Yüzü Yüklenemedi.");
			});
		},
		frontPhotoSelected(event) {
			useFileService().sendSample(event.files[0], this.model.ID).then((response) => {
				if (response.Status) {
					const data = {
						ID: this.model.ID,
						Numune_Cloud: true,
						Numune_Cloud_Dosya: event.files[0].name
					};
					this.sampleStore.setSamplePhotosFront(data);
					this.model.OnYuzFoto = `https://file-service.mekmar.com/file/download/numune/numuneDosya/${this.model.ID}/${event.files[0].name}`;
				} else useAppToast().error("Fotoğrafın Ön Yüzü Yüklenemedi.");
			});
		},
		savePaid() {
			const paidData = {
				Tarih: toIsoDate(this.paid_date),
				MusteriID: this.model.MusteriID,
				MusteriAdi: this.model.MusteriAdi,
				NumuneNo: this.model.NumuneNo,
				Aciklama: this.paidDescription,
				MusteriID: this.model.MusteriID,
				Tutar: this.freigthCost,
				Kullanici: useCookie("userId").value,
				KullaniciAdi: useCookie("username").value,
				Banka: this.selectedBank.BankaAdi
			};
			this.sampleStore.setSamplePaidSave(paidData);
			this.sampleStore.setSampleDetailPaidList(this.model.NumuneNo);
		},
		formatPoint(value) {
			if (value == null) return 0;
			else return value.replace(",", ".");
		},
		bankTypeSelected(event) {
			this.model.BankaSecim = this.selectedBankType;
		},
		sendingTypeSelected(event) {
			this.model.GonderiTipi = this.selectedSendingType;
			if (this.selectedSendingType == 1 || this.selectedSendingType == 3) this.bankTypeDisabled = true;
			else this.bankTypeDisabled = false;
		},
		unitSelected(event) {
			this.model.UrunBirimi = event.value.ID;
		},
		categorySelected(event) {
			this.model.KategoriID = event.value.ID;
		},
		userSelected(event) {
			this.model.NumuneTemsilci = event.value.ID;
		},
		searchUser(event) {
			let results;
			if (event.query.length == 0) results = this.users;
			else results = this.users.filter((x) => {
				return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredUser = results;
		},
		countrySelected(event) {
			this.model.UlkeAdi = event.value.UlkeAdi;
			this.model.Ulke = event.value.Id;
		},
		searchCountry(event) {
			let results;
			if (event.query.length == 0) results = this.country;
			else results = this.country.filter((x) => {
				return x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredCountry = results;
		},
		customerSelected(event) {
			this.model.FirmaAdi = event.value.MusteriAdi;
			this.model.MusteriID = event.value.Id;
			this.selectedCountry = this.country.find((x) => x.Id == event.value.UlkeId);
			this.model.UlkeAdi = this.selectedCountry.UlkeAdi;
			this.model.Ulke = this.selectedCountry.Id;
			this.model.Adres = event.value.Adress;
		},
		searchCustomers(event) {
			let results;
			if (event.query.length == 0) results = this.customers;
			else results = this.customers.filter((x) => {
				return x.MusteriAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredCustomers = results;
		}
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_TabView = script$6;
	const _component_TabPanel = script$7;
	const _component_Card = script$8;
	const _component_Select = script$1;
	const _component_FloatLabel = script$9;
	const _component_InputText = script$5;
	const _component_RadioButton = script$a;
	const _component_Textarea = script$b;
	const _component_DatePicker = script$c;
	const _component_CustomInput = CustomInput_default;
	const _component_Button = script;
	const _component_DataTable = script$3;
	const _component_Column = script$4;
	const _component_FileUpload = script$d;
	const _component_AutoComplete = script$e;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "row" }, _attrs))} data-v-4da559f4><div class="col-12 col-lg-9" data-v-4da559f4>`);
	_push(ssrRenderComponent(_component_TabView, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_TabPanel, { header: "Information" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="container" data-v-4da559f4${_scopeId}>`);
							_push(ssrRenderComponent(_component_Card, { class: "mb-4" }, {
								title: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` Product Info`);
									else return [createTextVNode(" Product Info")];
								}),
								content: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<div class="row" data-v-4da559f4${_scopeId}><div class="col" data-v-4da559f4${_scopeId}>`);
										_push(ssrRenderComponent(_component_Select, {
											modelValue: $data.selectedCategory,
											"onUpdate:modelValue": ($event) => $data.selectedCategory = $event,
											options: $props.category,
											optionLabel: "Urun",
											placeholder: "Select a Category",
											class: "w-100",
											onChange: ($event) => $options.categorySelected($event)
										}, null, _parent, _scopeId));
										_push(`</div><div class="col" data-v-4da559f4${_scopeId}>`);
										_push(ssrRenderComponent(_component_Select, {
											modelValue: $data.selectedUnit,
											"onUpdate:modelValue": ($event) => $data.selectedUnit = $event,
											options: $props.unit,
											optionLabel: "BirimAdi",
											placeholder: "Select a Unit",
											class: "w-100",
											onChange: ($event) => $options.unitSelected($event)
										}, null, _parent, _scopeId));
										_push(`</div><div class="col" data-v-4da559f4${_scopeId}>`);
										_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) {
													_push(ssrRenderComponent(_component_InputText, {
														id: "amount",
														modelValue: $props.model.Miktar,
														"onUpdate:modelValue": ($event) => $props.model.Miktar = $event,
														class: "w-100"
													}, null, _parent, _scopeId));
													_push(`<label for="amount" data-v-4da559f4${_scopeId}>Amount</label>`);
												} else return [createVNode(_component_InputText, {
													id: "amount",
													modelValue: $props.model.Miktar,
													"onUpdate:modelValue": ($event) => $props.model.Miktar = $event,
													class: "w-100"
												}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "amount" }, "Amount")];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(`</div></div>`);
									} else return [createVNode("div", { class: "row" }, [
										createVNode("div", { class: "col" }, [createVNode(_component_Select, {
											modelValue: $data.selectedCategory,
											"onUpdate:modelValue": ($event) => $data.selectedCategory = $event,
											options: $props.category,
											optionLabel: "Urun",
											placeholder: "Select a Category",
											class: "w-100",
											onChange: ($event) => $options.categorySelected($event)
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"options",
											"onChange"
										])]),
										createVNode("div", { class: "col" }, [createVNode(_component_Select, {
											modelValue: $data.selectedUnit,
											"onUpdate:modelValue": ($event) => $data.selectedUnit = $event,
											options: $props.unit,
											optionLabel: "BirimAdi",
											placeholder: "Select a Unit",
											class: "w-100",
											onChange: ($event) => $options.unitSelected($event)
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"options",
											"onChange"
										])]),
										createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, { class: "mb-4" }, {
											default: withCtx(() => [createVNode(_component_InputText, {
												id: "amount",
												modelValue: $props.model.Miktar,
												"onUpdate:modelValue": ($event) => $props.model.Miktar = $event,
												class: "w-100"
											}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "amount" }, "Amount")]),
											_: 1
										})])
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Card, { class: "mb-4" }, {
								title: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`Payment Info`);
									else return [createTextVNode("Payment Info")];
								}),
								content: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<div class="container" data-v-4da559f4${_scopeId}><div class="row" data-v-4da559f4${_scopeId}><div class="col" data-v-4da559f4${_scopeId}>`);
										_push(ssrRenderComponent(_component_Card, {
											class: "mb-4",
											style: { "height": "300px" }
										}, {
											title: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(` Shipment Type`);
												else return [createTextVNode(" Shipment Type")];
											}),
											content: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) {
													_push(`<!--[-->`);
													ssrRenderList($props.sending, (item) => {
														_push(`<div class="flex align-items-center mb-4" data-v-4da559f4${_scopeId}>`);
														_push(ssrRenderComponent(_component_RadioButton, {
															modelValue: $data.selectedSendingType,
															"onUpdate:modelValue": ($event) => $data.selectedSendingType = $event,
															inputId: item.ID,
															name: "dynamic",
															value: item.ID,
															onChange: ($event) => $options.sendingTypeSelected($event)
														}, null, _parent, _scopeId));
														_push(`<label${ssrRenderAttr("for", item.ID)} class="ml-2" data-v-4da559f4${_scopeId}>${ssrInterpolate(item.GonderiAdi)}</label></div>`);
													});
													_push(`<!--]-->`);
												} else return [(openBlock(true), createBlock(Fragment, null, renderList($props.sending, (item) => {
													return openBlock(), createBlock("div", {
														class: "flex align-items-center mb-4",
														key: item.ID
													}, [createVNode(_component_RadioButton, {
														modelValue: $data.selectedSendingType,
														"onUpdate:modelValue": ($event) => $data.selectedSendingType = $event,
														inputId: item.ID,
														name: "dynamic",
														value: item.ID,
														onChange: ($event) => $options.sendingTypeSelected($event)
													}, null, 8, [
														"modelValue",
														"onUpdate:modelValue",
														"inputId",
														"value",
														"onChange"
													]), createVNode("label", {
														for: item.ID,
														class: "ml-2"
													}, toDisplayString(item.GonderiAdi), 9, ["for"])]);
												}), 128))];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(`</div><div class="col" data-v-4da559f4${_scopeId}>`);
										_push(ssrRenderComponent(_component_Card, {
											class: "mb-4",
											style: { "height": "300px" }
										}, {
											title: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(`Bank`);
												else return [createTextVNode("Bank")];
											}),
											content: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) {
													_push(`<!--[-->`);
													ssrRenderList($props.bank, (item) => {
														_push(`<div class="flex align-items-center mb-4" data-v-4da559f4${_scopeId}>`);
														_push(ssrRenderComponent(_component_RadioButton, {
															modelValue: $data.selectedBankType,
															"onUpdate:modelValue": ($event) => $data.selectedBankType = $event,
															inputId: item.ID,
															name: "dynamic",
															value: item.ID,
															onChange: ($event) => $options.bankTypeSelected($event),
															disabled: $data.bankTypeDisabled
														}, null, _parent, _scopeId));
														_push(`<label${ssrRenderAttr("for", item.ID)} class="ml-2" data-v-4da559f4${_scopeId}>${ssrInterpolate(item.BankaAdi)}</label></div>`);
													});
													_push(`<!--]-->`);
												} else return [(openBlock(true), createBlock(Fragment, null, renderList($props.bank, (item) => {
													return openBlock(), createBlock("div", {
														class: "flex align-items-center mb-4",
														key: item.ID
													}, [createVNode(_component_RadioButton, {
														modelValue: $data.selectedBankType,
														"onUpdate:modelValue": ($event) => $data.selectedBankType = $event,
														inputId: item.ID,
														name: "dynamic",
														value: item.ID,
														onChange: ($event) => $options.bankTypeSelected($event),
														disabled: $data.bankTypeDisabled
													}, null, 8, [
														"modelValue",
														"onUpdate:modelValue",
														"inputId",
														"value",
														"onChange",
														"disabled"
													]), createVNode("label", {
														for: item.ID,
														class: "ml-2"
													}, toDisplayString(item.BankaAdi), 9, ["for"])]);
												}), 128))];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(`</div><div class="col" data-v-4da559f4${_scopeId}>`);
										_push(ssrRenderComponent(_component_Card, {
											class: "mb-4",
											style: { "height": "300px" }
										}, {
											title: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(`Courier Cost`);
												else return [createTextVNode("Courier Cost")];
											}),
											content: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) {
													_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) {
																_push(ssrRenderComponent(_component_InputText, {
																	id: "usd",
																	modelValue: $props.model.KuryeAlis,
																	"onUpdate:modelValue": ($event) => $props.model.KuryeAlis = $event,
																	onInput: ($event) => $props.model.KuryeAlis = $options.formatPoint($event)
																}, null, _parent, _scopeId));
																_push(`<label for="usd" data-v-4da559f4${_scopeId}>\$</label>`);
															} else return [createVNode(_component_InputText, {
																id: "usd",
																modelValue: $props.model.KuryeAlis,
																"onUpdate:modelValue": ($event) => $props.model.KuryeAlis = $event,
																onInput: ($event) => $props.model.KuryeAlis = $options.formatPoint($event)
															}, null, 8, [
																"modelValue",
																"onUpdate:modelValue",
																"onInput"
															]), createVNode("label", { for: "usd" }, "$")];
														}),
														_: 1
													}, _parent, _scopeId));
													_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) {
																_push(ssrRenderComponent(_component_InputText, {
																	id: "euro",
																	modelValue: $props.model.Euro_Alis,
																	"onUpdate:modelValue": ($event) => $props.model.Euro_Alis = $event,
																	onInput: ($event) => $props.model.Euro_Alis = $options.formatPoint($event)
																}, null, _parent, _scopeId));
																_push(`<label for="euro" data-v-4da559f4${_scopeId}>€</label>`);
															} else return [createVNode(_component_InputText, {
																id: "euro",
																modelValue: $props.model.Euro_Alis,
																"onUpdate:modelValue": ($event) => $props.model.Euro_Alis = $event,
																onInput: ($event) => $props.model.Euro_Alis = $options.formatPoint($event)
															}, null, 8, [
																"modelValue",
																"onUpdate:modelValue",
																"onInput"
															]), createVNode("label", { for: "euro" }, "€")];
														}),
														_: 1
													}, _parent, _scopeId));
													_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) {
																_push(ssrRenderComponent(_component_InputText, {
																	id: "tl",
																	modelValue: $props.model.TL_Alis,
																	"onUpdate:modelValue": ($event) => $props.model.TL_Alis = $event,
																	onInput: ($event) => $props.model.TL_Alis = $options.formatPoint($event)
																}, null, _parent, _scopeId));
																_push(`<label for="tl" data-v-4da559f4${_scopeId}>₺</label>`);
															} else return [createVNode(_component_InputText, {
																id: "tl",
																modelValue: $props.model.TL_Alis,
																"onUpdate:modelValue": ($event) => $props.model.TL_Alis = $event,
																onInput: ($event) => $props.model.TL_Alis = $options.formatPoint($event)
															}, null, 8, [
																"modelValue",
																"onUpdate:modelValue",
																"onInput"
															]), createVNode("label", { for: "tl" }, "₺")];
														}),
														_: 1
													}, _parent, _scopeId));
												} else return [
													createVNode(_component_FloatLabel, { class: "mb-4" }, {
														default: withCtx(() => [createVNode(_component_InputText, {
															id: "usd",
															modelValue: $props.model.KuryeAlis,
															"onUpdate:modelValue": ($event) => $props.model.KuryeAlis = $event,
															onInput: ($event) => $props.model.KuryeAlis = $options.formatPoint($event)
														}, null, 8, [
															"modelValue",
															"onUpdate:modelValue",
															"onInput"
														]), createVNode("label", { for: "usd" }, "$")]),
														_: 1
													}),
													createVNode(_component_FloatLabel, { class: "mb-4" }, {
														default: withCtx(() => [createVNode(_component_InputText, {
															id: "euro",
															modelValue: $props.model.Euro_Alis,
															"onUpdate:modelValue": ($event) => $props.model.Euro_Alis = $event,
															onInput: ($event) => $props.model.Euro_Alis = $options.formatPoint($event)
														}, null, 8, [
															"modelValue",
															"onUpdate:modelValue",
															"onInput"
														]), createVNode("label", { for: "euro" }, "€")]),
														_: 1
													}),
													createVNode(_component_FloatLabel, { class: "mb-4" }, {
														default: withCtx(() => [createVNode(_component_InputText, {
															id: "tl",
															modelValue: $props.model.TL_Alis,
															"onUpdate:modelValue": ($event) => $props.model.TL_Alis = $event,
															onInput: ($event) => $props.model.TL_Alis = $options.formatPoint($event)
														}, null, 8, [
															"modelValue",
															"onUpdate:modelValue",
															"onInput"
														]), createVNode("label", { for: "tl" }, "₺")]),
														_: 1
													})
												];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(`</div><div class="col" data-v-4da559f4${_scopeId}>`);
										_push(ssrRenderComponent(_component_Card, {
											class: "mb-4",
											style: { "height": "300px" }
										}, {
											title: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(`Quoted Price`);
												else return [createTextVNode("Quoted Price")];
											}),
											content: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) {
													_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) {
																_push(ssrRenderComponent(_component_InputText, {
																	id: "usd",
																	modelValue: $props.model.KuryeSatis,
																	"onUpdate:modelValue": ($event) => $props.model.KuryeSatis = $event,
																	onInput: ($event) => $props.model.KuryeSatis = $options.formatPoint($event)
																}, null, _parent, _scopeId));
																_push(`<label for="usd" data-v-4da559f4${_scopeId}>\$</label>`);
															} else return [createVNode(_component_InputText, {
																id: "usd",
																modelValue: $props.model.KuryeSatis,
																"onUpdate:modelValue": ($event) => $props.model.KuryeSatis = $event,
																onInput: ($event) => $props.model.KuryeSatis = $options.formatPoint($event)
															}, null, 8, [
																"modelValue",
																"onUpdate:modelValue",
																"onInput"
															]), createVNode("label", { for: "usd" }, "$")];
														}),
														_: 1
													}, _parent, _scopeId));
													_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) {
																_push(ssrRenderComponent(_component_InputText, {
																	id: "euro",
																	modelValue: $props.model.Euro_Satis,
																	"onUpdate:modelValue": ($event) => $props.model.Euro_Satis = $event,
																	onInput: ($event) => $props.model.Euro_Satis = $options.formatPoint($event)
																}, null, _parent, _scopeId));
																_push(`<label for="euro" data-v-4da559f4${_scopeId}>€</label>`);
															} else return [createVNode(_component_InputText, {
																id: "euro",
																modelValue: $props.model.Euro_Satis,
																"onUpdate:modelValue": ($event) => $props.model.Euro_Satis = $event,
																onInput: ($event) => $props.model.Euro_Satis = $options.formatPoint($event)
															}, null, 8, [
																"modelValue",
																"onUpdate:modelValue",
																"onInput"
															]), createVNode("label", { for: "euro" }, "€")];
														}),
														_: 1
													}, _parent, _scopeId));
													_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) {
																_push(ssrRenderComponent(_component_InputText, {
																	id: "tl",
																	modelValue: $props.model.TL_Satis,
																	"onUpdate:modelValue": ($event) => $props.model.TL_Satis = $event,
																	onInput: ($event) => $props.model.TL_Satis = $options.formatPoint($event)
																}, null, _parent, _scopeId));
																_push(`<label for="tl" data-v-4da559f4${_scopeId}>₺</label>`);
															} else return [createVNode(_component_InputText, {
																id: "tl",
																modelValue: $props.model.TL_Satis,
																"onUpdate:modelValue": ($event) => $props.model.TL_Satis = $event,
																onInput: ($event) => $props.model.TL_Satis = $options.formatPoint($event)
															}, null, 8, [
																"modelValue",
																"onUpdate:modelValue",
																"onInput"
															]), createVNode("label", { for: "tl" }, "₺")];
														}),
														_: 1
													}, _parent, _scopeId));
												} else return [
													createVNode(_component_FloatLabel, { class: "mb-4" }, {
														default: withCtx(() => [createVNode(_component_InputText, {
															id: "usd",
															modelValue: $props.model.KuryeSatis,
															"onUpdate:modelValue": ($event) => $props.model.KuryeSatis = $event,
															onInput: ($event) => $props.model.KuryeSatis = $options.formatPoint($event)
														}, null, 8, [
															"modelValue",
															"onUpdate:modelValue",
															"onInput"
														]), createVNode("label", { for: "usd" }, "$")]),
														_: 1
													}),
													createVNode(_component_FloatLabel, { class: "mb-4" }, {
														default: withCtx(() => [createVNode(_component_InputText, {
															id: "euro",
															modelValue: $props.model.Euro_Satis,
															"onUpdate:modelValue": ($event) => $props.model.Euro_Satis = $event,
															onInput: ($event) => $props.model.Euro_Satis = $options.formatPoint($event)
														}, null, 8, [
															"modelValue",
															"onUpdate:modelValue",
															"onInput"
														]), createVNode("label", { for: "euro" }, "€")]),
														_: 1
													}),
													createVNode(_component_FloatLabel, { class: "mb-4" }, {
														default: withCtx(() => [createVNode(_component_InputText, {
															id: "tl",
															modelValue: $props.model.TL_Satis,
															"onUpdate:modelValue": ($event) => $props.model.TL_Satis = $event,
															onInput: ($event) => $props.model.TL_Satis = $options.formatPoint($event)
														}, null, 8, [
															"modelValue",
															"onUpdate:modelValue",
															"onInput"
														]), createVNode("label", { for: "tl" }, "₺")]),
														_: 1
													})
												];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(`</div></div></div>`);
									} else return [createVNode("div", { class: "container" }, [createVNode("div", { class: "row" }, [
										createVNode("div", { class: "col" }, [createVNode(_component_Card, {
											class: "mb-4",
											style: { "height": "300px" }
										}, {
											title: withCtx(() => [createTextVNode(" Shipment Type")]),
											content: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList($props.sending, (item) => {
												return openBlock(), createBlock("div", {
													class: "flex align-items-center mb-4",
													key: item.ID
												}, [createVNode(_component_RadioButton, {
													modelValue: $data.selectedSendingType,
													"onUpdate:modelValue": ($event) => $data.selectedSendingType = $event,
													inputId: item.ID,
													name: "dynamic",
													value: item.ID,
													onChange: ($event) => $options.sendingTypeSelected($event)
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"inputId",
													"value",
													"onChange"
												]), createVNode("label", {
													for: item.ID,
													class: "ml-2"
												}, toDisplayString(item.GonderiAdi), 9, ["for"])]);
											}), 128))]),
											_: 1
										})]),
										createVNode("div", { class: "col" }, [createVNode(_component_Card, {
											class: "mb-4",
											style: { "height": "300px" }
										}, {
											title: withCtx(() => [createTextVNode("Bank")]),
											content: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList($props.bank, (item) => {
												return openBlock(), createBlock("div", {
													class: "flex align-items-center mb-4",
													key: item.ID
												}, [createVNode(_component_RadioButton, {
													modelValue: $data.selectedBankType,
													"onUpdate:modelValue": ($event) => $data.selectedBankType = $event,
													inputId: item.ID,
													name: "dynamic",
													value: item.ID,
													onChange: ($event) => $options.bankTypeSelected($event),
													disabled: $data.bankTypeDisabled
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"inputId",
													"value",
													"onChange",
													"disabled"
												]), createVNode("label", {
													for: item.ID,
													class: "ml-2"
												}, toDisplayString(item.BankaAdi), 9, ["for"])]);
											}), 128))]),
											_: 1
										})]),
										createVNode("div", { class: "col" }, [createVNode(_component_Card, {
											class: "mb-4",
											style: { "height": "300px" }
										}, {
											title: withCtx(() => [createTextVNode("Courier Cost")]),
											content: withCtx(() => [
												createVNode(_component_FloatLabel, { class: "mb-4" }, {
													default: withCtx(() => [createVNode(_component_InputText, {
														id: "usd",
														modelValue: $props.model.KuryeAlis,
														"onUpdate:modelValue": ($event) => $props.model.KuryeAlis = $event,
														onInput: ($event) => $props.model.KuryeAlis = $options.formatPoint($event)
													}, null, 8, [
														"modelValue",
														"onUpdate:modelValue",
														"onInput"
													]), createVNode("label", { for: "usd" }, "$")]),
													_: 1
												}),
												createVNode(_component_FloatLabel, { class: "mb-4" }, {
													default: withCtx(() => [createVNode(_component_InputText, {
														id: "euro",
														modelValue: $props.model.Euro_Alis,
														"onUpdate:modelValue": ($event) => $props.model.Euro_Alis = $event,
														onInput: ($event) => $props.model.Euro_Alis = $options.formatPoint($event)
													}, null, 8, [
														"modelValue",
														"onUpdate:modelValue",
														"onInput"
													]), createVNode("label", { for: "euro" }, "€")]),
													_: 1
												}),
												createVNode(_component_FloatLabel, { class: "mb-4" }, {
													default: withCtx(() => [createVNode(_component_InputText, {
														id: "tl",
														modelValue: $props.model.TL_Alis,
														"onUpdate:modelValue": ($event) => $props.model.TL_Alis = $event,
														onInput: ($event) => $props.model.TL_Alis = $options.formatPoint($event)
													}, null, 8, [
														"modelValue",
														"onUpdate:modelValue",
														"onInput"
													]), createVNode("label", { for: "tl" }, "₺")]),
													_: 1
												})
											]),
											_: 1
										})]),
										createVNode("div", { class: "col" }, [createVNode(_component_Card, {
											class: "mb-4",
											style: { "height": "300px" }
										}, {
											title: withCtx(() => [createTextVNode("Quoted Price")]),
											content: withCtx(() => [
												createVNode(_component_FloatLabel, { class: "mb-4" }, {
													default: withCtx(() => [createVNode(_component_InputText, {
														id: "usd",
														modelValue: $props.model.KuryeSatis,
														"onUpdate:modelValue": ($event) => $props.model.KuryeSatis = $event,
														onInput: ($event) => $props.model.KuryeSatis = $options.formatPoint($event)
													}, null, 8, [
														"modelValue",
														"onUpdate:modelValue",
														"onInput"
													]), createVNode("label", { for: "usd" }, "$")]),
													_: 1
												}),
												createVNode(_component_FloatLabel, { class: "mb-4" }, {
													default: withCtx(() => [createVNode(_component_InputText, {
														id: "euro",
														modelValue: $props.model.Euro_Satis,
														"onUpdate:modelValue": ($event) => $props.model.Euro_Satis = $event,
														onInput: ($event) => $props.model.Euro_Satis = $options.formatPoint($event)
													}, null, 8, [
														"modelValue",
														"onUpdate:modelValue",
														"onInput"
													]), createVNode("label", { for: "euro" }, "€")]),
													_: 1
												}),
												createVNode(_component_FloatLabel, { class: "mb-4" }, {
													default: withCtx(() => [createVNode(_component_InputText, {
														id: "tl",
														modelValue: $props.model.TL_Satis,
														"onUpdate:modelValue": ($event) => $props.model.TL_Satis = $event,
														onInput: ($event) => $props.model.TL_Satis = $options.formatPoint($event)
													}, null, 8, [
														"modelValue",
														"onUpdate:modelValue",
														"onInput"
													]), createVNode("label", { for: "tl" }, "₺")]),
													_: 1
												})
											]),
											_: 1
										})])
									])])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Textarea, {
											class: "w-100",
											modelValue: $props.model.Aciklama,
											"onUpdate:modelValue": ($event) => $props.model.Aciklama = $event
										}, null, _parent, _scopeId));
										_push(`<label data-v-4da559f4${_scopeId}>Description</label>`);
									} else return [createVNode(_component_Textarea, {
										class: "w-100",
										modelValue: $props.model.Aciklama,
										"onUpdate:modelValue": ($event) => $props.model.Aciklama = $event
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						} else return [createVNode("div", { class: "container" }, [
							createVNode(_component_Card, { class: "mb-4" }, {
								title: withCtx(() => [createTextVNode(" Product Info")]),
								content: withCtx(() => [createVNode("div", { class: "row" }, [
									createVNode("div", { class: "col" }, [createVNode(_component_Select, {
										modelValue: $data.selectedCategory,
										"onUpdate:modelValue": ($event) => $data.selectedCategory = $event,
										options: $props.category,
										optionLabel: "Urun",
										placeholder: "Select a Category",
										class: "w-100",
										onChange: ($event) => $options.categorySelected($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"options",
										"onChange"
									])]),
									createVNode("div", { class: "col" }, [createVNode(_component_Select, {
										modelValue: $data.selectedUnit,
										"onUpdate:modelValue": ($event) => $data.selectedUnit = $event,
										options: $props.unit,
										optionLabel: "BirimAdi",
										placeholder: "Select a Unit",
										class: "w-100",
										onChange: ($event) => $options.unitSelected($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"options",
										"onChange"
									])]),
									createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, { class: "mb-4" }, {
										default: withCtx(() => [createVNode(_component_InputText, {
											id: "amount",
											modelValue: $props.model.Miktar,
											"onUpdate:modelValue": ($event) => $props.model.Miktar = $event,
											class: "w-100"
										}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "amount" }, "Amount")]),
										_: 1
									})])
								])]),
								_: 1
							}),
							createVNode(_component_Card, { class: "mb-4" }, {
								title: withCtx(() => [createTextVNode("Payment Info")]),
								content: withCtx(() => [createVNode("div", { class: "container" }, [createVNode("div", { class: "row" }, [
									createVNode("div", { class: "col" }, [createVNode(_component_Card, {
										class: "mb-4",
										style: { "height": "300px" }
									}, {
										title: withCtx(() => [createTextVNode(" Shipment Type")]),
										content: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList($props.sending, (item) => {
											return openBlock(), createBlock("div", {
												class: "flex align-items-center mb-4",
												key: item.ID
											}, [createVNode(_component_RadioButton, {
												modelValue: $data.selectedSendingType,
												"onUpdate:modelValue": ($event) => $data.selectedSendingType = $event,
												inputId: item.ID,
												name: "dynamic",
												value: item.ID,
												onChange: ($event) => $options.sendingTypeSelected($event)
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"inputId",
												"value",
												"onChange"
											]), createVNode("label", {
												for: item.ID,
												class: "ml-2"
											}, toDisplayString(item.GonderiAdi), 9, ["for"])]);
										}), 128))]),
										_: 1
									})]),
									createVNode("div", { class: "col" }, [createVNode(_component_Card, {
										class: "mb-4",
										style: { "height": "300px" }
									}, {
										title: withCtx(() => [createTextVNode("Bank")]),
										content: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList($props.bank, (item) => {
											return openBlock(), createBlock("div", {
												class: "flex align-items-center mb-4",
												key: item.ID
											}, [createVNode(_component_RadioButton, {
												modelValue: $data.selectedBankType,
												"onUpdate:modelValue": ($event) => $data.selectedBankType = $event,
												inputId: item.ID,
												name: "dynamic",
												value: item.ID,
												onChange: ($event) => $options.bankTypeSelected($event),
												disabled: $data.bankTypeDisabled
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"inputId",
												"value",
												"onChange",
												"disabled"
											]), createVNode("label", {
												for: item.ID,
												class: "ml-2"
											}, toDisplayString(item.BankaAdi), 9, ["for"])]);
										}), 128))]),
										_: 1
									})]),
									createVNode("div", { class: "col" }, [createVNode(_component_Card, {
										class: "mb-4",
										style: { "height": "300px" }
									}, {
										title: withCtx(() => [createTextVNode("Courier Cost")]),
										content: withCtx(() => [
											createVNode(_component_FloatLabel, { class: "mb-4" }, {
												default: withCtx(() => [createVNode(_component_InputText, {
													id: "usd",
													modelValue: $props.model.KuryeAlis,
													"onUpdate:modelValue": ($event) => $props.model.KuryeAlis = $event,
													onInput: ($event) => $props.model.KuryeAlis = $options.formatPoint($event)
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"onInput"
												]), createVNode("label", { for: "usd" }, "$")]),
												_: 1
											}),
											createVNode(_component_FloatLabel, { class: "mb-4" }, {
												default: withCtx(() => [createVNode(_component_InputText, {
													id: "euro",
													modelValue: $props.model.Euro_Alis,
													"onUpdate:modelValue": ($event) => $props.model.Euro_Alis = $event,
													onInput: ($event) => $props.model.Euro_Alis = $options.formatPoint($event)
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"onInput"
												]), createVNode("label", { for: "euro" }, "€")]),
												_: 1
											}),
											createVNode(_component_FloatLabel, { class: "mb-4" }, {
												default: withCtx(() => [createVNode(_component_InputText, {
													id: "tl",
													modelValue: $props.model.TL_Alis,
													"onUpdate:modelValue": ($event) => $props.model.TL_Alis = $event,
													onInput: ($event) => $props.model.TL_Alis = $options.formatPoint($event)
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"onInput"
												]), createVNode("label", { for: "tl" }, "₺")]),
												_: 1
											})
										]),
										_: 1
									})]),
									createVNode("div", { class: "col" }, [createVNode(_component_Card, {
										class: "mb-4",
										style: { "height": "300px" }
									}, {
										title: withCtx(() => [createTextVNode("Quoted Price")]),
										content: withCtx(() => [
											createVNode(_component_FloatLabel, { class: "mb-4" }, {
												default: withCtx(() => [createVNode(_component_InputText, {
													id: "usd",
													modelValue: $props.model.KuryeSatis,
													"onUpdate:modelValue": ($event) => $props.model.KuryeSatis = $event,
													onInput: ($event) => $props.model.KuryeSatis = $options.formatPoint($event)
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"onInput"
												]), createVNode("label", { for: "usd" }, "$")]),
												_: 1
											}),
											createVNode(_component_FloatLabel, { class: "mb-4" }, {
												default: withCtx(() => [createVNode(_component_InputText, {
													id: "euro",
													modelValue: $props.model.Euro_Satis,
													"onUpdate:modelValue": ($event) => $props.model.Euro_Satis = $event,
													onInput: ($event) => $props.model.Euro_Satis = $options.formatPoint($event)
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"onInput"
												]), createVNode("label", { for: "euro" }, "€")]),
												_: 1
											}),
											createVNode(_component_FloatLabel, { class: "mb-4" }, {
												default: withCtx(() => [createVNode(_component_InputText, {
													id: "tl",
													modelValue: $props.model.TL_Satis,
													"onUpdate:modelValue": ($event) => $props.model.TL_Satis = $event,
													onInput: ($event) => $props.model.TL_Satis = $options.formatPoint($event)
												}, null, 8, [
													"modelValue",
													"onUpdate:modelValue",
													"onInput"
												]), createVNode("label", { for: "tl" }, "₺")]),
												_: 1
											})
										]),
										_: 1
									})])
								])])]),
								_: 1
							}),
							createVNode(_component_FloatLabel, { class: "mb-4" }, {
								default: withCtx(() => [createVNode(_component_Textarea, {
									class: "w-100",
									modelValue: $props.model.Aciklama,
									"onUpdate:modelValue": ($event) => $props.model.Aciklama = $event
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")]),
								_: 1
							})
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_TabPanel, { header: "Payments" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="container w-100 mb-4" data-v-4da559f4${_scopeId}><div class="row" data-v-4da559f4${_scopeId}><div class="col" data-v-4da559f4${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_DatePicker, {
											modelValue: $data.paid_date,
											"onUpdate:modelValue": ($event) => $data.paid_date = $event,
											inputId: "paid_date",
											dateFormat: "dd/mm/yy"
										}, null, _parent, _scopeId));
										_push(`<label for="paid_date" data-v-4da559f4${_scopeId}>Payment Date</label>`);
									} else return [createVNode(_component_DatePicker, {
										modelValue: $data.paid_date,
										"onUpdate:modelValue": ($event) => $data.paid_date = $event,
										inputId: "paid_date",
										dateFormat: "dd/mm/yy"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "paid_date" }, "Payment Date")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-4da559f4${_scopeId}>`);
							_push(ssrRenderComponent(_component_CustomInput, {
								value: $data.freigthCost,
								text: "($)",
								onOnInput: ($event) => $data.freigthCost = $event,
								disabled: false
							}, null, _parent, _scopeId));
							_push(`</div><div class="col" data-v-4da559f4${_scopeId}>`);
							_push(ssrRenderComponent(_component_Select, {
								modelValue: $data.selectedBank,
								"onUpdate:modelValue": ($event) => $data.selectedBank = $event,
								options: $props.bank,
								optionLabel: "BankaAdi",
								placeholder: "Select a Bank",
								class: "w-100"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="row" data-v-4da559f4${_scopeId}><div class="col" data-v-4da559f4${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Textarea, {
											modelValue: $data.paidDescription,
											"onUpdate:modelValue": ($event) => $data.paidDescription = $event,
											rows: "5",
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label data-v-4da559f4${_scopeId}>Explanation</label>`);
									} else return [createVNode(_component_Textarea, {
										modelValue: $data.paidDescription,
										"onUpdate:modelValue": ($event) => $data.paidDescription = $event,
										rows: "5",
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Explanation")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100 mb-4",
								onClick: $options.savePaid,
								label: "Save"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_DataTable, { value: $props.paid }, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Column, {
											field: "Tarih",
											header: "Date"
										}, {
											body: withCtx((slotProps, _push, _parent, _scopeId) => {
												if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih))}`);
												else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih)), 1)];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_Column, {
											field: "Tutar",
											header: "Amount"
										}, {
											body: withCtx((slotProps, _push, _parent, _scopeId) => {
												if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Tutar))}`);
												else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Tutar)), 1)];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_Column, {
											field: "Banka",
											header: "Bank"
										}, null, _parent, _scopeId));
										_push(ssrRenderComponent(_component_Column, {
											field: "Aciklama",
											header: "Exp."
										}, null, _parent, _scopeId));
									} else return [
										createVNode(_component_Column, {
											field: "Tarih",
											header: "Date"
										}, {
											body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih)), 1)]),
											_: 1
										}),
										createVNode(_component_Column, {
											field: "Tutar",
											header: "Amount"
										}, {
											body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Tutar)), 1)]),
											_: 1
										}),
										createVNode(_component_Column, {
											field: "Banka",
											header: "Bank"
										}),
										createVNode(_component_Column, {
											field: "Aciklama",
											header: "Exp."
										})
									];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						} else return [createVNode("div", { class: "container w-100 mb-4" }, [
							createVNode("div", { class: "row" }, [
								createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
									default: withCtx(() => [createVNode(_component_DatePicker, {
										modelValue: $data.paid_date,
										"onUpdate:modelValue": ($event) => $data.paid_date = $event,
										inputId: "paid_date",
										dateFormat: "dd/mm/yy"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "paid_date" }, "Payment Date")]),
									_: 1
								})]),
								createVNode("div", { class: "col" }, [createVNode(_component_CustomInput, {
									value: $data.freigthCost,
									text: "($)",
									onOnInput: ($event) => $data.freigthCost = $event,
									disabled: false
								}, null, 8, ["value", "onOnInput"])]),
								createVNode("div", { class: "col" }, [createVNode(_component_Select, {
									modelValue: $data.selectedBank,
									"onUpdate:modelValue": ($event) => $data.selectedBank = $event,
									options: $props.bank,
									optionLabel: "BankaAdi",
									placeholder: "Select a Bank",
									class: "w-100"
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options"
								])])
							]),
							createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Textarea, {
									modelValue: $data.paidDescription,
									"onUpdate:modelValue": ($event) => $data.paidDescription = $event,
									rows: "5",
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Explanation")]),
								_: 1
							})])]),
							createVNode(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100 mb-4",
								onClick: $options.savePaid,
								label: "Save"
							}, null, 8, ["onClick"]),
							createVNode(_component_DataTable, { value: $props.paid }, {
								default: withCtx(() => [
									createVNode(_component_Column, {
										field: "Tarih",
										header: "Date"
									}, {
										body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih)), 1)]),
										_: 1
									}),
									createVNode(_component_Column, {
										field: "Tutar",
										header: "Amount"
									}, {
										body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Tutar)), 1)]),
										_: 1
									}),
									createVNode(_component_Column, {
										field: "Banka",
										header: "Bank"
									}),
									createVNode(_component_Column, {
										field: "Aciklama",
										header: "Exp."
									})
								]),
								_: 1
							}, 8, ["value"])
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_TabPanel, { header: "Photos" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="row" data-v-4da559f4${_scopeId}><div class="col" data-v-4da559f4${_scopeId}>`);
							_push(ssrRenderComponent(_component_FileUpload, {
								mode: "basic",
								chooseLabel: "Front of Photo",
								modelValue: $data.selectedFrontPhoto,
								"onUpdate:modelValue": ($event) => $data.selectedFrontPhoto = $event,
								onSelect: ($event) => $options.frontPhotoSelected($event),
								accept: "image/*"
							}, null, _parent, _scopeId));
							_push(`<br data-v-4da559f4${_scopeId}><img${ssrRenderAttr("src", $props.model.OnYuzFoto)} style="${ssrRenderStyle({
								"width": "100%",
								"height": "500px"
							})}" data-v-4da559f4${_scopeId}></div><div class="col" data-v-4da559f4${_scopeId}>`);
							_push(ssrRenderComponent(_component_FileUpload, {
								mode: "basic",
								chooseLabel: "Back of Photo",
								modelValue: $data.selectedBackPhoto,
								"onUpdate:modelValue": ($event) => $data.selectedBackPhoto = $event,
								onSelect: ($event) => $options.backPhotoSelected($event),
								accept: "image/*"
							}, null, _parent, _scopeId));
							_push(`<br data-v-4da559f4${_scopeId}><img${ssrRenderAttr("src", $props.model.ArkaYuzFoto)} style="${ssrRenderStyle({
								"width": "100%",
								"height": "500px"
							})}" data-v-4da559f4${_scopeId}></div></div>`);
						} else return [createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [
							createVNode(_component_FileUpload, {
								mode: "basic",
								chooseLabel: "Front of Photo",
								modelValue: $data.selectedFrontPhoto,
								"onUpdate:modelValue": ($event) => $data.selectedFrontPhoto = $event,
								onSelect: ($event) => $options.frontPhotoSelected($event),
								accept: "image/*"
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"onSelect"
							]),
							createVNode("br"),
							createVNode("img", {
								src: $props.model.OnYuzFoto,
								style: {
									"width": "100%",
									"height": "500px"
								}
							}, null, 8, ["src"])
						]), createVNode("div", { class: "col" }, [
							createVNode(_component_FileUpload, {
								mode: "basic",
								chooseLabel: "Back of Photo",
								modelValue: $data.selectedBackPhoto,
								"onUpdate:modelValue": ($event) => $data.selectedBackPhoto = $event,
								onSelect: ($event) => $options.backPhotoSelected($event),
								accept: "image/*"
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"onSelect"
							]),
							createVNode("br"),
							createVNode("img", {
								src: $props.model.ArkaYuzFoto,
								style: {
									"width": "100%",
									"height": "500px"
								}
							}, null, 8, ["src"])
						])])];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_TabPanel, { header: "Information" }, {
					default: withCtx(() => [createVNode("div", { class: "container" }, [
						createVNode(_component_Card, { class: "mb-4" }, {
							title: withCtx(() => [createTextVNode(" Product Info")]),
							content: withCtx(() => [createVNode("div", { class: "row" }, [
								createVNode("div", { class: "col" }, [createVNode(_component_Select, {
									modelValue: $data.selectedCategory,
									"onUpdate:modelValue": ($event) => $data.selectedCategory = $event,
									options: $props.category,
									optionLabel: "Urun",
									placeholder: "Select a Category",
									class: "w-100",
									onChange: ($event) => $options.categorySelected($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options",
									"onChange"
								])]),
								createVNode("div", { class: "col" }, [createVNode(_component_Select, {
									modelValue: $data.selectedUnit,
									"onUpdate:modelValue": ($event) => $data.selectedUnit = $event,
									options: $props.unit,
									optionLabel: "BirimAdi",
									placeholder: "Select a Unit",
									class: "w-100",
									onChange: ($event) => $options.unitSelected($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options",
									"onChange"
								])]),
								createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, { class: "mb-4" }, {
									default: withCtx(() => [createVNode(_component_InputText, {
										id: "amount",
										modelValue: $props.model.Miktar,
										"onUpdate:modelValue": ($event) => $props.model.Miktar = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "amount" }, "Amount")]),
									_: 1
								})])
							])]),
							_: 1
						}),
						createVNode(_component_Card, { class: "mb-4" }, {
							title: withCtx(() => [createTextVNode("Payment Info")]),
							content: withCtx(() => [createVNode("div", { class: "container" }, [createVNode("div", { class: "row" }, [
								createVNode("div", { class: "col" }, [createVNode(_component_Card, {
									class: "mb-4",
									style: { "height": "300px" }
								}, {
									title: withCtx(() => [createTextVNode(" Shipment Type")]),
									content: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList($props.sending, (item) => {
										return openBlock(), createBlock("div", {
											class: "flex align-items-center mb-4",
											key: item.ID
										}, [createVNode(_component_RadioButton, {
											modelValue: $data.selectedSendingType,
											"onUpdate:modelValue": ($event) => $data.selectedSendingType = $event,
											inputId: item.ID,
											name: "dynamic",
											value: item.ID,
											onChange: ($event) => $options.sendingTypeSelected($event)
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"inputId",
											"value",
											"onChange"
										]), createVNode("label", {
											for: item.ID,
											class: "ml-2"
										}, toDisplayString(item.GonderiAdi), 9, ["for"])]);
									}), 128))]),
									_: 1
								})]),
								createVNode("div", { class: "col" }, [createVNode(_component_Card, {
									class: "mb-4",
									style: { "height": "300px" }
								}, {
									title: withCtx(() => [createTextVNode("Bank")]),
									content: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList($props.bank, (item) => {
										return openBlock(), createBlock("div", {
											class: "flex align-items-center mb-4",
											key: item.ID
										}, [createVNode(_component_RadioButton, {
											modelValue: $data.selectedBankType,
											"onUpdate:modelValue": ($event) => $data.selectedBankType = $event,
											inputId: item.ID,
											name: "dynamic",
											value: item.ID,
											onChange: ($event) => $options.bankTypeSelected($event),
											disabled: $data.bankTypeDisabled
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"inputId",
											"value",
											"onChange",
											"disabled"
										]), createVNode("label", {
											for: item.ID,
											class: "ml-2"
										}, toDisplayString(item.BankaAdi), 9, ["for"])]);
									}), 128))]),
									_: 1
								})]),
								createVNode("div", { class: "col" }, [createVNode(_component_Card, {
									class: "mb-4",
									style: { "height": "300px" }
								}, {
									title: withCtx(() => [createTextVNode("Courier Cost")]),
									content: withCtx(() => [
										createVNode(_component_FloatLabel, { class: "mb-4" }, {
											default: withCtx(() => [createVNode(_component_InputText, {
												id: "usd",
												modelValue: $props.model.KuryeAlis,
												"onUpdate:modelValue": ($event) => $props.model.KuryeAlis = $event,
												onInput: ($event) => $props.model.KuryeAlis = $options.formatPoint($event)
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"onInput"
											]), createVNode("label", { for: "usd" }, "$")]),
											_: 1
										}),
										createVNode(_component_FloatLabel, { class: "mb-4" }, {
											default: withCtx(() => [createVNode(_component_InputText, {
												id: "euro",
												modelValue: $props.model.Euro_Alis,
												"onUpdate:modelValue": ($event) => $props.model.Euro_Alis = $event,
												onInput: ($event) => $props.model.Euro_Alis = $options.formatPoint($event)
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"onInput"
											]), createVNode("label", { for: "euro" }, "€")]),
											_: 1
										}),
										createVNode(_component_FloatLabel, { class: "mb-4" }, {
											default: withCtx(() => [createVNode(_component_InputText, {
												id: "tl",
												modelValue: $props.model.TL_Alis,
												"onUpdate:modelValue": ($event) => $props.model.TL_Alis = $event,
												onInput: ($event) => $props.model.TL_Alis = $options.formatPoint($event)
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"onInput"
											]), createVNode("label", { for: "tl" }, "₺")]),
											_: 1
										})
									]),
									_: 1
								})]),
								createVNode("div", { class: "col" }, [createVNode(_component_Card, {
									class: "mb-4",
									style: { "height": "300px" }
								}, {
									title: withCtx(() => [createTextVNode("Quoted Price")]),
									content: withCtx(() => [
										createVNode(_component_FloatLabel, { class: "mb-4" }, {
											default: withCtx(() => [createVNode(_component_InputText, {
												id: "usd",
												modelValue: $props.model.KuryeSatis,
												"onUpdate:modelValue": ($event) => $props.model.KuryeSatis = $event,
												onInput: ($event) => $props.model.KuryeSatis = $options.formatPoint($event)
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"onInput"
											]), createVNode("label", { for: "usd" }, "$")]),
											_: 1
										}),
										createVNode(_component_FloatLabel, { class: "mb-4" }, {
											default: withCtx(() => [createVNode(_component_InputText, {
												id: "euro",
												modelValue: $props.model.Euro_Satis,
												"onUpdate:modelValue": ($event) => $props.model.Euro_Satis = $event,
												onInput: ($event) => $props.model.Euro_Satis = $options.formatPoint($event)
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"onInput"
											]), createVNode("label", { for: "euro" }, "€")]),
											_: 1
										}),
										createVNode(_component_FloatLabel, { class: "mb-4" }, {
											default: withCtx(() => [createVNode(_component_InputText, {
												id: "tl",
												modelValue: $props.model.TL_Satis,
												"onUpdate:modelValue": ($event) => $props.model.TL_Satis = $event,
												onInput: ($event) => $props.model.TL_Satis = $options.formatPoint($event)
											}, null, 8, [
												"modelValue",
												"onUpdate:modelValue",
												"onInput"
											]), createVNode("label", { for: "tl" }, "₺")]),
											_: 1
										})
									]),
									_: 1
								})])
							])])]),
							_: 1
						}),
						createVNode(_component_FloatLabel, { class: "mb-4" }, {
							default: withCtx(() => [createVNode(_component_Textarea, {
								class: "w-100",
								modelValue: $props.model.Aciklama,
								"onUpdate:modelValue": ($event) => $props.model.Aciklama = $event
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")]),
							_: 1
						})
					])]),
					_: 1
				}),
				createVNode(_component_TabPanel, { header: "Payments" }, {
					default: withCtx(() => [createVNode("div", { class: "container w-100 mb-4" }, [
						createVNode("div", { class: "row" }, [
							createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_DatePicker, {
									modelValue: $data.paid_date,
									"onUpdate:modelValue": ($event) => $data.paid_date = $event,
									inputId: "paid_date",
									dateFormat: "dd/mm/yy"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "paid_date" }, "Payment Date")]),
								_: 1
							})]),
							createVNode("div", { class: "col" }, [createVNode(_component_CustomInput, {
								value: $data.freigthCost,
								text: "($)",
								onOnInput: ($event) => $data.freigthCost = $event,
								disabled: false
							}, null, 8, ["value", "onOnInput"])]),
							createVNode("div", { class: "col" }, [createVNode(_component_Select, {
								modelValue: $data.selectedBank,
								"onUpdate:modelValue": ($event) => $data.selectedBank = $event,
								options: $props.bank,
								optionLabel: "BankaAdi",
								placeholder: "Select a Bank",
								class: "w-100"
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"options"
							])])
						]),
						createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_Textarea, {
								modelValue: $data.paidDescription,
								"onUpdate:modelValue": ($event) => $data.paidDescription = $event,
								rows: "5",
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Explanation")]),
							_: 1
						})])]),
						createVNode(_component_Button, {
							type: "button",
							severity: "success",
							class: "w-100 mb-4",
							onClick: $options.savePaid,
							label: "Save"
						}, null, 8, ["onClick"]),
						createVNode(_component_DataTable, { value: $props.paid }, {
							default: withCtx(() => [
								createVNode(_component_Column, {
									field: "Tarih",
									header: "Date"
								}, {
									body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih)), 1)]),
									_: 1
								}),
								createVNode(_component_Column, {
									field: "Tutar",
									header: "Amount"
								}, {
									body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Tutar)), 1)]),
									_: 1
								}),
								createVNode(_component_Column, {
									field: "Banka",
									header: "Bank"
								}),
								createVNode(_component_Column, {
									field: "Aciklama",
									header: "Exp."
								})
							]),
							_: 1
						}, 8, ["value"])
					])]),
					_: 1
				}),
				createVNode(_component_TabPanel, { header: "Photos" }, {
					default: withCtx(() => [createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [
						createVNode(_component_FileUpload, {
							mode: "basic",
							chooseLabel: "Front of Photo",
							modelValue: $data.selectedFrontPhoto,
							"onUpdate:modelValue": ($event) => $data.selectedFrontPhoto = $event,
							onSelect: ($event) => $options.frontPhotoSelected($event),
							accept: "image/*"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onSelect"
						]),
						createVNode("br"),
						createVNode("img", {
							src: $props.model.OnYuzFoto,
							style: {
								"width": "100%",
								"height": "500px"
							}
						}, null, 8, ["src"])
					]), createVNode("div", { class: "col" }, [
						createVNode(_component_FileUpload, {
							mode: "basic",
							chooseLabel: "Back of Photo",
							modelValue: $data.selectedBackPhoto,
							"onUpdate:modelValue": ($event) => $data.selectedBackPhoto = $event,
							onSelect: ($event) => $options.backPhotoSelected($event),
							accept: "image/*"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onSelect"
						]),
						createVNode("br"),
						createVNode("img", {
							src: $props.model.ArkaYuzFoto,
							style: {
								"width": "100%",
								"height": "500px"
							}
						}, null, 8, ["src"])
					])])]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col-3 mt-5" data-v-4da559f4><div class="row mb-4" data-v-4da559f4><div class="col" data-v-4da559f4>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "success",
		class: "w-100",
		label: "Save",
		onClick: $options.process
	}, null, _parent));
	_push(`</div>`);
	if (!$props.status) {
		_push(`<div class="col" data-v-4da559f4>`);
		_push(ssrRenderComponent(_component_Button, {
			type: "button",
			severity: "danger",
			class: "w-100",
			label: "Delete",
			onClick: $options.deleteProcess
		}, null, _parent));
		_push(`</div>`);
	} else _push(`<!---->`);
	_push(`</div>`);
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "sampleno",
					modelValue: $props.model.NumuneNo,
					"onUpdate:modelValue": ($event) => $props.model.NumuneNo = $event,
					class: "w-100",
					disabled: !$props.status
				}, null, _parent, _scopeId));
				_push(`<label for="sampleno" data-v-4da559f4${_scopeId}>Sample No</label>`);
			} else return [createVNode(_component_InputText, {
				id: "sampleno",
				modelValue: $props.model.NumuneNo,
				"onUpdate:modelValue": ($event) => $props.model.NumuneNo = $event,
				class: "w-100",
				disabled: !$props.status
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"disabled"
			]), createVNode("label", { for: "sampleno" }, "Sample No")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_DatePicker, {
					modelValue: $data.input_date,
					"onUpdate:modelValue": ($event) => $data.input_date = $event,
					inputId: "inputdate",
					class: "w-100",
					dateFormat: "dd/mm/yy"
				}, null, _parent, _scopeId));
				_push(`<label for="inputdate" data-v-4da559f4${_scopeId}>Input Date</label>`);
			} else return [createVNode(_component_DatePicker, {
				modelValue: $data.input_date,
				"onUpdate:modelValue": ($event) => $data.input_date = $event,
				inputId: "inputdate",
				class: "w-100",
				dateFormat: "dd/mm/yy"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "inputdate" }, "Input Date")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_DatePicker, {
					modelValue: $data.output_date,
					"onUpdate:modelValue": ($event) => $data.output_date = $event,
					inputId: "outputdate",
					class: "w-100",
					dateFormat: "dd/mm/yy"
				}, null, _parent, _scopeId));
				_push(`<label for="outputdate" data-v-4da559f4${_scopeId}>Shipment Date</label>`);
			} else return [createVNode(_component_DatePicker, {
				modelValue: $data.output_date,
				"onUpdate:modelValue": ($event) => $data.output_date = $event,
				inputId: "outputdate",
				class: "w-100",
				dateFormat: "dd/mm/yy"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "outputdate" }, "Shipment Date")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_DatePicker, {
					modelValue: $data.dhl_date,
					"onUpdate:modelValue": ($event) => $data.dhl_date = $event,
					inputId: "dhl_date",
					class: "w-100",
					dateFormat: "dd/mm/yy",
					onDateSelect: ($event) => $options.dhlDateSelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="dhl_date" data-v-4da559f4${_scopeId}>Dhl Date</label>`);
			} else return [createVNode(_component_DatePicker, {
				modelValue: $data.dhl_date,
				"onUpdate:modelValue": ($event) => $data.dhl_date = $event,
				inputId: "dhl_date",
				class: "w-100",
				dateFormat: "dd/mm/yy",
				onDateSelect: ($event) => $options.dhlDateSelected($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"onDateSelect"
			]), createVNode("label", { for: "dhl_date" }, "Dhl Date")];
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
					suggestions: $data.filteredCustomers,
					optionLabel: "MusteriAdi",
					onComplete: ($event) => $options.searchCustomers($event),
					onItemSelect: ($event) => $options.customerSelected($event),
					onInput: ($event) => $options.customerInput($event)
				}, null, _parent, _scopeId));
				_push(`<label for="customer" data-v-4da559f4${_scopeId}>Customer</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedCustomer,
				"onUpdate:modelValue": ($event) => $data.selectedCustomer = $event,
				inputId: "customer",
				suggestions: $data.filteredCustomers,
				optionLabel: "MusteriAdi",
				onComplete: ($event) => $options.searchCustomers($event),
				onItemSelect: ($event) => $options.customerSelected($event),
				onInput: ($event) => $options.customerInput($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect",
				"onInput"
			]), createVNode("label", { for: "customer" }, "Customer")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedCountry,
					"onUpdate:modelValue": ($event) => $data.selectedCountry = $event,
					inputId: "country",
					suggestions: $data.filteredCountry,
					optionLabel: "UlkeAdi",
					onComplete: ($event) => $options.searchCountry($event),
					onItemSelect: ($event) => $options.countrySelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="country" data-v-4da559f4${_scopeId}>Country</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedCountry,
				"onUpdate:modelValue": ($event) => $data.selectedCountry = $event,
				inputId: "country",
				suggestions: $data.filteredCountry,
				optionLabel: "UlkeAdi",
				onComplete: ($event) => $options.searchCountry($event),
				onItemSelect: ($event) => $options.countrySelected($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect"
			]), createVNode("label", { for: "country" }, "Country")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Textarea, {
					modelValue: $props.model.Adres,
					"onUpdate:modelValue": ($event) => $props.model.Adres = $event,
					rows: "5",
					cols: "30",
					class: "w-100"
				}, null, _parent, _scopeId));
				_push(`<label data-v-4da559f4${_scopeId}>Address</label>`);
			} else return [createVNode(_component_Textarea, {
				modelValue: $props.model.Adres,
				"onUpdate:modelValue": ($event) => $props.model.Adres = $event,
				rows: "5",
				cols: "30",
				class: "w-100"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Address")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedUser,
					"onUpdate:modelValue": ($event) => $data.selectedUser = $event,
					inputId: "user",
					suggestions: $data.filteredUser,
					optionLabel: "KullaniciAdi",
					onComplete: ($event) => $options.searchUser($event),
					onItemSelect: ($event) => $options.userSelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="user" data-v-4da559f4${_scopeId}>Seller</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedUser,
				"onUpdate:modelValue": ($event) => $data.selectedUser = $event,
				inputId: "user",
				suggestions: $data.filteredUser,
				optionLabel: "KullaniciAdi",
				onComplete: ($event) => $options.searchUser($event),
				onItemSelect: ($event) => $options.userSelected($event)
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
				_push(ssrRenderComponent(_component_InputText, {
					id: "following",
					modelValue: $props.model.TrackingNo,
					"onUpdate:modelValue": ($event) => $props.model.TrackingNo = $event,
					class: "w-100"
				}, null, _parent, _scopeId));
				_push(`<label for="following" data-v-4da559f4${_scopeId}>Tracking Number</label>`);
			} else return [createVNode(_component_InputText, {
				id: "following",
				modelValue: $props.model.TrackingNo,
				"onUpdate:modelValue": ($event) => $props.model.TrackingNo = $event,
				class: "w-100"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "following" }, "Tracking Number")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "parite",
					modelValue: $props.model.Parite,
					"onUpdate:modelValue": ($event) => $props.model.Parite = $event,
					class: "w-100"
				}, null, _parent, _scopeId));
				_push(`<label for="parite" data-v-4da559f4${_scopeId}>Parity</label>`);
			} else return [createVNode(_component_InputText, {
				id: "parite",
				modelValue: $props.model.Parite,
				"onUpdate:modelValue": ($event) => $props.model.Parite = $event,
				class: "w-100"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "parite" }, "Parity")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sample/Form.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Form_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-4da559f4"]]), { __name: "SampleForm" });
//#endregion
//#region app/pages/sample/sample.vue
var _sfc_main = /*@__PURE__*/ Object.assign({
	middleware: ["authority"],
	computed: {
		modelsStore() {
			return useModelsStore();
		},
		sampleStore() {
			return useSampleStore();
		},
		sharedStore() {
			return useSharedStore();
		}
	},
	mounted() {
		this.sampleStore.setSampleList();
	},
	data() {
		return {
			selectedYear: { Yil: (/* @__PURE__ */ new Date()).getFullYear() },
			sample_form_dialog: false,
			model: {}
		};
	},
	methods: {
		sampleSelectedList(event) {
			this.model = event.data;
			this.sampleStore.setSampleButtonStatus(false);
			this.sampleStore.setSampleDetailPaidList(this.model.NumuneNo);
			this.sample_form_dialog = true;
		},
		deleteProcess(event) {
			this.sampleStore.setSampleDelete(event);
			this.sample_form_dialog = false;
		},
		process(event) {
			if (this.sampleStore.getSampleButtonStatus) this.save(event);
			else this.update(event);
		},
		save(event) {
			this.sampleStore.setSampleSave(event);
			this.sample_form_dialog = false;
		},
		update(event) {
			this.sampleStore.setSampleUpdate(event);
			this.sample_form_dialog = false;
		},
		yearSelected(event) {
			this.sampleStore.setSampleListYear(event.value.Yil);
		},
		newForm() {
			this.modelsStore.setSampleModel();
			this.sampleStore.setSampleButtonStatus(true);
			this.model = this.modelsStore.getSampleModel;
			this.sample_form_dialog = true;
		}
	}
}, {
	__name: "sample",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const sampleSharedStore = useSharedStore();
		[__temp, __restore] = withAsyncContext(() => useReferenceData("sample-form", [
			["customersOfferList", () => sampleSharedStore.setCustomersOfferList()],
			["countryList", () => sampleSharedStore.setCountryList()],
			["sampleCategoryList", () => sampleSharedStore.setSampleCategoryList()],
			["sampleUnitList", () => sampleSharedStore.setSampleUnitList()],
			["sampleSendingList", () => sampleSharedStore.setSampleSendingTypeList()],
			["sampleBankAccountTypeList", () => sampleSharedStore.setSampleBankAccountTypeList()]
		])), await __temp, __restore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Button = script;
			const _component_Select = script$1;
			const _component_SampleList = List_default;
			const _component_Dialog = script$2;
			const _component_SampleForm = Form_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><div class="row"><div class="col">`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				severity: "success",
				class: "w-100",
				label: "New",
				onClick: _ctx.newForm
			}, null, _parent));
			_push(`</div><div class="col">`);
			_push(ssrRenderComponent(_component_Select, {
				modelValue: _ctx.selectedYear,
				"onUpdate:modelValue": ($event) => _ctx.selectedYear = $event,
				options: _ctx.sampleStore.getSampleYearList,
				optionLabel: "Yil",
				onChange: ($event) => _ctx.yearSelected($event),
				class: "w-100"
			}, null, _parent));
			_push(`</div></div>`);
			_push(ssrRenderComponent(_component_SampleList, {
				list: _ctx.sampleStore.getSampleList,
				onSample_selected_list: ($event) => _ctx.sampleSelectedList($event)
			}, null, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.sample_form_dialog,
				"onUpdate:visible": ($event) => _ctx.sample_form_dialog = $event,
				header: "",
				modal: "",
				style: { width: "100%" },
				breakpoints: {
					"1199px": "75vw",
					"575px": "90vw"
				}
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_SampleForm, {
						model: _ctx.model,
						customers: _ctx.sharedStore.getCustomersOfferList,
						country: _ctx.sharedStore.getCountryList,
						users: _ctx.sharedStore.getUserList,
						category: _ctx.sharedStore.getSampleCategoryList,
						unit: _ctx.sharedStore.getSampleUnitList,
						sending: _ctx.sharedStore.getSampleSendingList,
						bank: _ctx.sharedStore.getSampleBankAccountTypeList,
						paid: _ctx.sampleStore.getSamplePaidList,
						onProcess: ($event) => _ctx.process($event),
						status: _ctx.sampleStore.getSampleButtonStatus,
						onDelete_process: ($event) => _ctx.deleteProcess($event)
					}, null, _parent, _scopeId));
					else return [createVNode(_component_SampleForm, {
						model: _ctx.model,
						customers: _ctx.sharedStore.getCustomersOfferList,
						country: _ctx.sharedStore.getCountryList,
						users: _ctx.sharedStore.getUserList,
						category: _ctx.sharedStore.getSampleCategoryList,
						unit: _ctx.sharedStore.getSampleUnitList,
						sending: _ctx.sharedStore.getSampleSendingList,
						bank: _ctx.sharedStore.getSampleBankAccountTypeList,
						paid: _ctx.sampleStore.getSamplePaidList,
						onProcess: ($event) => _ctx.process($event),
						status: _ctx.sampleStore.getSampleButtonStatus,
						onDelete_process: ($event) => _ctx.deleteProcess($event)
					}, null, 8, [
						"model",
						"customers",
						"country",
						"users",
						"category",
						"unit",
						"sending",
						"bank",
						"paid",
						"onProcess",
						"status",
						"onDelete_process"
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sample/sample.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=sample-CtlS4XAZ.mjs.map
