import { b as useAsyncData, _ as _plugin_vue_export_helper_default, k as formatPriceTl, e as formatPriceUsd, a as useAppToast, u as useCookie } from '../virtual/entry.mjs';
import { n as script$1 } from './button-C8Z7Yc79.mjs';
import { n as script$6 } from './column-CT6GXkG2.mjs';
import { n as script$5 } from './datatable-D6ou7HZJ.mjs';
import { n as script$4 } from './inputtext-s6cxdqDx.mjs';
import { n as script$3 } from './autocomplete-5Wwvp4c8.mjs';
import { n as script$2 } from './floatlabel-BDqo8RCT.mjs';
import { t as toIsoDate, f as fromIsoDate } from './dates-C-BBx50j.mjs';
import { n as script } from './dialog-BB6no0wu.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { C as CustomInput_default } from './CustomInput-B9GfGXia.mjs';
import { u as useFileService } from './useFileService-Bon6d2kz.mjs';
import { n as script$7 } from './fileupload-Q8ndBK5J.mjs';
import { u as useLogsStore } from './logs-BCO5TrJQ.mjs';
import { C as Currency_default } from './Currency-KtOU2lzT.mjs';
import { u as useTransportStore } from './transport-BGjKDFw3.mjs';
import { C as CompanyForm_default } from './CompanyForm-U-wHa4kr.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
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
import './message-DvSNQ9wF.mjs';
import './progressbar-BWtVAJVg.mjs';
import './datepicker-BGpmmzow.mjs';
import './chevronleft-Dy82Mung.mjs';
import './chevronup-CFGDy7zv.mjs';
import './useTcmb-B8gDruVs.mjs';

//#region app/components/transport/InputForm.vue
var _sfc_main$1 = {
	props: {
		company: {
			type: Array,
			required: false,
			default: () => []
		},
		orders: {
			type: Array,
			required: false,
			default: () => []
		}
	},
	computed: {
		transportStore() {
			return useTransportStore();
		},
		logsStore() {
			return useLogsStore();
		}
	},
	data() {
		return {
			filteredCompany: null,
			selectedCompany: null,
			transportdate: null,
			invoiceno: null,
			selectedPo: null,
			filteredPo: null,
			tl: 0,
			currency: 0,
			usd: 0,
			newButtonDisabled: false,
			transportList: [],
			saveButtonDisabled: true,
			updateButtonDisabled: true,
			deleteButtonDisabled: true,
			selectedTransport: {}
		};
	},
	methods: {
		rateFetched(event) {
			this.currency = event.rate;
		},
		dateSelected(event) {
			this.transportdate = toIsoDate(event);
		},
		inputUsd(event) {
			this.usd = event;
			this.tl = event * this.currency;
		},
		inputTl(event) {
			this.tl = event;
			this.usd = event / this.currency;
		},
		async onUpload(event) {
			if (!this.selectedCompany || !this.transportList.length) {
				console.warn("transport/InputForm.onUpload(): firma secili degil ya da liste bos, dosya gonderilmedi.");
				useAppToast().error("Önce firma seçip en az bir satır eklemelisiniz.");
				return;
			}
			await useFileService().sendTransport(event.files[0], this.selectedCompany.ID, this.invoiceno);
			await this.transportStore.setTransportFileSave(this.transportList);
			this.reset();
		},
		transportSelected(event) {
			this.saveButtonDisabled = true;
			this.updateButtonDisabled = false;
			this.deleteButtonDisabled = false;
			this.newButtonDisabled = true;
			this.selectedCompany = this.company.find((x) => x.ID == event.data.companyId);
			this.transportdate = fromIsoDate(event.data.date);
			this.invoiceno = event.data.invoiceno;
			this.selectedPo = this.orders.find((x) => x.SiparisNo == event.data.po);
			this.tl = event.data.tl;
			this.usd = event.data.usd;
			this.currency = event.data.currency;
		},
		saveTransport() {
			this.transportStore.setTransportSave(this.transportList);
			this.newButtonDisabled = false;
		},
		reset() {
			this.saveButtonDisabled = true;
			this.updateButtonDisabled = true;
			this.transportdate = null;
			this.selectedPo = null;
			this.tl = 0;
			this.currency = 0;
			this.usd = 0;
			this.selectedTransport = {};
			this.selectedCompany = null;
			this.invoiceno = null;
		},
		newForm() {
			this.newButtonDisabled = true;
			this.saveButtonDisabled = false;
			this.updateButtonDisabled = true;
			this.deleteButtonDisabled = true;
		},
		save() {
			if (!this.selectedCompany || !this.selectedPo) {
				useAppToast().error("Firma ve PO seçilmelidir.");
				return;
			}
			this.transportList.push({
				id: Math.random().toString(36).slice(2, 11),
				companyId: this.selectedCompany.ID,
				companyName: this.selectedCompany.FirmaAdi,
				date: toIsoDate(this.transportdate),
				po: this.selectedPo.SiparisNo,
				tl: this.tl,
				currency: this.currency,
				usd: this.usd,
				invoiceno: this.invoiceno,
				nowDate: toIsoDate(/* @__PURE__ */ new Date()),
				userId: useCookie("userId").value
			});
			this.logsStore.setLogs({
				description: this.selectedPo.SiparisNo + " po ya " + this.invoiceno + " fatura no ile Nakliye Faturası $" + this.usd.toFixed(4) + " ve $" + this.currency + " kur girilmiştir.",
				po: this.selectedPo.SiparisNo,
				color: "#ffec31"
			});
			this.newButtonDisabled = false;
		},
		update() {
			if (!this.selectedCompany || !this.selectedPo) {
				useAppToast().error("Firma ve PO seçilmelidir.");
				return;
			}
			const index = this.transportList.findIndex((x) => x.id == this.selectedTransport.id);
			if (index < 0) {
				console.warn("transport/InputForm.update(): secili satir listede yok, guncelleme yapilmadi.");
				return;
			}
			const row = this.transportList[index];
			row.companyId = this.selectedCompany.ID;
			row.companyName = this.selectedCompany.FirmaAdi;
			row.date = toIsoDate(this.transportdate);
			row.po = this.selectedPo.SiparisNo;
			row.tl = this.tl;
			row.currency = this.currency;
			row.usd = this.usd;
			row.invoiceno = this.invoiceno;
			this.reset();
			this.newButtonDisabled = false;
		},
		deleteForm() {
			const index = this.transportList.findIndex((x) => x.id == this.selectedTransport.id);
			if (index < 0) {
				console.warn("transport/InputForm.deleteForm(): secili satir listede yok, silme yapilmadi.");
				return;
			}
			this.transportList.splice(index, 1);
			this.reset();
			this.newButtonDisabled = false;
		},
		searchPo(event) {
			if (event.query.length == 0) {
				this.filteredPo = this.orders;
				return;
			}
			this.filteredPo = this.orders.filter((x) => x.SiparisNo.toLowerCase().startsWith(event.query.toLowerCase()));
		},
		searchCompany(event) {
			if (event.query.length == 0) {
				this.filteredCompany = this.company;
				return;
			}
			this.filteredCompany = this.company.filter((x) => x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase()));
		},
		newCompany() {
			this.$emit("new-company-form-dialog");
		}
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_TcmbCurrency = Currency_default;
	const _component_Button = script$1;
	const _component_FloatLabel = script$2;
	const _component_AutoComplete = script$3;
	const _component_InputText = script$4;
	const _component_CustomInput = CustomInput_default;
	const _component_DataTable = script$5;
	const _component_Column = script$6;
	const _component_FileUpload = script$7;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-c5aab687>`);
	_push(ssrRenderComponent(_component_TcmbCurrency, {
		onDateSelectedEmit: ($event) => $options.dateSelected($event),
		onRateFetchedEmit: ($event) => $options.rateFetched($event)
	}, null, _parent));
	_push(`<div class="row mb-3" data-v-c5aab687><div class="col" data-v-c5aab687>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		label: "New Company",
		onClick: $options.newCompany
	}, null, _parent));
	_push(`</div></div><div class="row mb-3" data-v-c5aab687><div class="col-3" data-v-c5aab687>`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedCompany,
					"onUpdate:modelValue": ($event) => $data.selectedCompany = $event,
					inputId: "company",
					suggestions: $data.filteredCompany,
					optionLabel: "FirmaAdi",
					onComplete: ($event) => $options.searchCompany($event),
					disabled: !$data.currency
				}, null, _parent, _scopeId));
				_push(`<label for="company" data-v-c5aab687${_scopeId}>Company</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedCompany,
				"onUpdate:modelValue": ($event) => $data.selectedCompany = $event,
				inputId: "company",
				suggestions: $data.filteredCompany,
				optionLabel: "FirmaAdi",
				onComplete: ($event) => $options.searchCompany($event),
				disabled: !$data.currency
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"disabled"
			]), createVNode("label", { for: "company" }, "Company")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col-3" data-v-c5aab687>`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "invoiceno",
					modelValue: $data.invoiceno,
					"onUpdate:modelValue": ($event) => $data.invoiceno = $event,
					disabled: !$data.currency
				}, null, _parent, _scopeId));
				_push(`<label for="invoiceno" data-v-c5aab687${_scopeId}>Invoice No</label>`);
			} else return [createVNode(_component_InputText, {
				id: "invoiceno",
				modelValue: $data.invoiceno,
				"onUpdate:modelValue": ($event) => $data.invoiceno = $event,
				disabled: !$data.currency
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"disabled"
			]), createVNode("label", { for: "invoiceno" }, "Invoice No")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row" data-v-c5aab687><div class="col" data-v-c5aab687>`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedPo,
					"onUpdate:modelValue": ($event) => $data.selectedPo = $event,
					inputId: "po",
					suggestions: $data.filteredPo,
					optionLabel: "SiparisNo",
					onComplete: ($event) => $options.searchPo($event),
					disabled: !$data.currency
				}, null, _parent, _scopeId));
				_push(`<label for="po" data-v-c5aab687${_scopeId}>Order No</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedPo,
				"onUpdate:modelValue": ($event) => $data.selectedPo = $event,
				inputId: "po",
				suggestions: $data.filteredPo,
				optionLabel: "SiparisNo",
				onComplete: ($event) => $options.searchPo($event),
				disabled: !$data.currency
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"disabled"
			]), createVNode("label", { for: "po" }, "Order No")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col" data-v-c5aab687>`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.tl,
		text: "₺",
		onOnInput: ($event) => $options.inputTl($event),
		disabled: !$data.currency
	}, null, _parent));
	_push(`</div><div class="col" data-v-c5aab687>`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.usd,
		text: "$",
		onOnInput: ($event) => $options.inputUsd($event),
		disabled: !$data.currency
	}, null, _parent));
	_push(`</div></div><div class="row" data-v-c5aab687><div class="col" data-v-c5aab687>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		class: "w-100",
		label: "New",
		onClick: $options.newForm,
		disabled: $data.newButtonDisabled
	}, null, _parent));
	_push(`</div><div class="col" data-v-c5aab687>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "success",
		class: "w-100",
		label: "Save",
		onClick: $options.save,
		disabled: $data.saveButtonDisabled
	}, null, _parent));
	_push(`</div><div class="col" data-v-c5aab687>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "warn",
		class: "w-100",
		label: "Update",
		onClick: $options.update,
		disabled: $data.updateButtonDisabled
	}, null, _parent));
	_push(`</div><div class="col" data-v-c5aab687>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "danger",
		class: "w-100",
		label: "Delete",
		onClick: $options.deleteForm,
		disabled: $data.deleteButtonDisabled
	}, null, _parent));
	_push(`</div></div><div class="row" data-v-c5aab687><div class="col" data-v-c5aab687>`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $data.transportList,
		selection: $data.selectedTransport,
		"onUpdate:selection": ($event) => $data.selectedTransport = $event,
		selectionMode: "single",
		onRowClick: ($event) => $options.transportSelected($event)
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "companyName",
					header: "Company"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "po",
					header: "Po"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "invoiceno",
					header: "Invoice No"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "date",
					header: "Date"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "tl",
					header: "Tl"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.tl))}`);
						else return [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.tl)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "currency",
					header: "Currency"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.currency))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.currency)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "usd",
					header: "Usd"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.usd))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.usd)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "companyName",
					header: "Company"
				}),
				createVNode(_component_Column, {
					field: "po",
					header: "Po"
				}),
				createVNode(_component_Column, {
					field: "invoiceno",
					header: "Invoice No"
				}),
				createVNode(_component_Column, {
					field: "date",
					header: "Date"
				}),
				createVNode(_component_Column, {
					field: "tl",
					header: "Tl"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.tl)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "currency",
					header: "Currency"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.currency)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "usd",
					header: "Usd"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.usd)), 1)]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row" data-v-c5aab687><div class="col" data-v-c5aab687>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "success",
		class: "w-100",
		label: "Save",
		disabled: !$data.transportList.length,
		onClick: $options.saveTransport
	}, null, _parent));
	_push(`</div></div><div class="row" data-v-c5aab687><div class="col" data-v-c5aab687>`);
	_push(ssrRenderComponent(_component_FileUpload, {
		mode: "basic",
		accept: ".pdf",
		maxFileSize: 1e6,
		disabled: !$data.selectedCompany || !$data.transportList.length,
		onSelect: ($event) => $options.onUpload($event)
	}, null, _parent));
	_push(`</div></div></div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/transport/InputForm.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var InputForm_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-c5aab687"]]), { __name: "TransportInputForm" });
//#endregion
//#region app/pages/operation/transport.vue
var _sfc_main = /*@__PURE__*/ Object.assign({
	computed: {
		transportStore() {
			return useTransportStore();
		},
		sharedStore() {
			return useSharedStore();
		}
	},
	data() {
		return { new_form_dialog: false };
	}
}, {
	__name: "transport",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const transportStore = useTransportStore();
		const sharedStore = useSharedStore();
		[__temp, __restore] = withAsyncContext(async () => useAsyncData("operation-transport", async () => {
			await Promise.all([transportStore.setCompanyList(), sharedStore.setOrderAllList()]);
			return true;
		}, { server: false })), await __temp, __restore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_TransportInputForm = InputForm_default;
			const _component_Dialog = script;
			const _component_TransportCompanyForm = CompanyForm_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_TransportInputForm, {
				company: unref(transportStore).getCompanyList,
				orders: unref(sharedStore).getOrdersAllList,
				onNewCompanyFormDialog: ($event) => _ctx.new_form_dialog = true
			}, null, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.new_form_dialog,
				"onUpdate:visible": ($event) => _ctx.new_form_dialog = $event,
				header: "New Company",
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_TransportCompanyForm, { company: unref(transportStore).getCompanyList }, null, _parent, _scopeId));
					else return [createVNode(_component_TransportCompanyForm, { company: unref(transportStore).getCompanyList }, null, 8, ["company"])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/operation/transport.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=transport-D4gpnUpQ.mjs.map
