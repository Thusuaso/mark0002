import { _ as _plugin_vue_export_helper_default, a as useAppToast, c as dateToString, e as formatPriceUsd, u as useCookie, i as useRuntimeConfig } from '../virtual/entry.mjs';
import { n as script$2 } from './button-C8Z7Yc79.mjs';
import { n as script$b } from './column-CT6GXkG2.mjs';
import { n as script$a } from './datatable-D6ou7HZJ.mjs';
import { n as script$d } from './inputtext-s6cxdqDx.mjs';
import { n as script$c } from './checkbox-wtvrQjx7.mjs';
import { n as script$9 } from './autocomplete-5Wwvp4c8.mjs';
import { t as script$5 } from './textarea-DHWHHqLi.mjs';
import { n as script } from './floatlabel-BDqo8RCT.mjs';
import { t as toIsoDate, f as fromIsoDate } from './dates-C-BBx50j.mjs';
import { n as script$8 } from './dialog-BB6no0wu.mjs';
import { u as useLegacyApi } from './useLegacyApi-B5zRc7ig.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { u as useModelsStore } from './models-CeLtEMS4.mjs';
import { u as useCustomerStore } from './customer-DH4F4_Cr.mjs';
import { e as exportExcel } from './useExcelExport-B-DCkvaR.mjs';
import { C as CustomInput_default } from './CustomInput-B9GfGXia.mjs';
import { u as useFileService } from './useFileService-Bon6d2kz.mjs';
import { n as script$7 } from './fileupload-Q8ndBK5J.mjs';
import { n as script$6 } from './calendar-CGZX0OKk.mjs';
import { t as script$4 } from './tabpanel-DPLeP9v3.mjs';
import { t as script$3 } from './tabview-BysloIbG.mjs';
import { n as script$1 } from './dropdown-GGCf3ofb.mjs';
import { u as useLogsStore } from './logs-BCO5TrJQ.mjs';
import { mergeProps, withCtx, createVNode, unref, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { defineStore } from 'pinia';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';

//#region app/stores/offer.ts
var useOfferStore = defineStore("offer", {
	state: () => ({
		offerList: [],
		offerCountryList: [],
		offerDetailList: [],
		offerDetailProductsList: [],
		offerButtonStatus: false,
		offerId: 0,
		offerAllButtonStatus: false,
		offerOldList: [],
		offerDetailBList: [],
		offerDetailTotalA: 0,
		offerDetailTotalB: 0
	}),
	getters: {
		getOfferOldList: (state) => state.offerOldList,
		getOfferDetailTotalA: (state) => state.offerDetailTotalA,
		getOfferDetailTotalB: (state) => state.offerDetailTotalB,
		getOfferList: (state) => state.offerList,
		getOfferCountryList: (state) => state.offerCountryList,
		getOfferDetailList: (state) => state.offerDetailList,
		getOfferDetailProductsList: (state) => state.offerDetailProductsList,
		getOfferButtonStatus: (state) => state.offerButtonStatus,
		getOfferId: (state) => state.offerId,
		getOfferAllButtonStatus: (state) => state.offerAllButtonStatus,
		getOfferDetailBList: (state) => state.offerDetailBList
	},
	actions: {
		setOfferAddSize(size) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const sharedStore = useSharedStore();
			legacyApi.post("/offer/add/size", { "size": size }).then((response) => {
				if (response.data.status) {
					toast.success("Successful");
					sharedStore.setOfferSharedList();
				} else toast.error("Error");
			});
		},
		setOfferAListTotal(payload) {
			this.MUT_setOfferAListTotal(payload);
		},
		setOfferBListTotal(payload) {
			this.MUT_setOfferBListTotal(payload);
		},
		setOfferMainList() {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get("/offer/main/list").then((response) => {
				if (response.data) this.MUT_setOfferMainList(response.data);
			}).catch((err) => {
				console.error("setOfferMainList basarisiz:", err);
			}).finally(() => {
				sharedStore.endLoading();
			});
		},
		setOfferMainDetailList(representative) {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get(`/offer/main/detail/list/${representative}`).then((response) => {
				if (response.data.list) {
					this.MUT_setOfferMainDetailList(response.data.list);
					this.setOfferAListTotal(response.data.list);
				}
			}).catch((err) => {
				console.error("setOfferMainDetailList basarisiz:", err);
			}).finally(() => {
				sharedStore.endLoading();
			});
		},
		setOfferDetailProductsList(id) {
			useLegacyApi().get(`/offer/detail/products/list/${id}`).then((response) => {
				this.MUT_setOfferDetailProductsList(response.data.list);
			});
		},
		setOfferDetailProductsAdd(product) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const modelsStore = useModelsStore();
			const sharedStore = useSharedStore();
			legacyApi.post("/offer/product/add", product).then((response) => {
				if (response.data.status) {
					toast.success("Başarıyla Eklendi.");
					this.MUT_setOfferDetailProductsAdd({
						...product,
						"Id": response.data.id
					});
					modelsStore.setOfferProductModel();
					sharedStore.setOfferSharedList();
				} else toast.error("Ekleme Başarısız");
			});
		},
		setOfferDetailProductsUpdate(product) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const modelsStore = useModelsStore();
			legacyApi.put("/offer/product/update", product).then((response) => {
				if (response.data.status) {
					toast.success("Başarıyla Güncellendi.");
					this.MUT_setOfferDetailProductsUpdate(product);
					modelsStore.setOfferProductModel();
				} else toast.error("Güncelleme Başarısız");
			});
		},
		setOfferDetailProductsDelete(id) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.delete(`/offer/product/delete/${id}`).then((response) => {
				if (response.data.status) {
					toast.success("Başarıyla Silindi");
					this.MUT_setOfferDetailProductsDelete(id);
				} else toast.error("Silme Başarısız");
			});
		},
		setOfferButtonStatus(status) {
			this.MUT_setOfferButtonStatus(status);
		},
		setOfferSave(payload) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const customerStore = useCustomerStore();
			return new Promise(async (resolve, reject) => {
				legacyApi.post("/offer/save", payload).then((response) => {
					if (response.data.status) {
						this.setOfferMainList();
						this.setOfferId(response.data.id);
						this.MUT_setOfferButtonStatus(false);
						customerStore.setOfferCustomerList();
						toast.success("Başarıyla Kaydedildi");
						resolve(true);
					} else {
						toast.error("Kaydetme Başarısız");
						resolve(false);
					}
				});
			});
		},
		setOfferUpdate(payload) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			const customerStore = useCustomerStore();
			legacyApi.put("/offer/update", payload).then((response) => {
				if (response.data.status) {
					this.setOfferMainList();
					customerStore.setOfferCustomerList();
					toast.success("Başarıyla Güncellendi");
				} else toast.error("Güncelleme Başarısız");
			});
		},
		setOfferDelete(id) {
			const legacyApi = useLegacyApi();
			const toast = useAppToast();
			legacyApi.delete(`/offer/delete/${id}`).then((response) => {
				if (response.data.status) {
					this.setOfferMainList();
					this.MUT_setOfferDelete(id);
					toast.success("Başarıyla Silindi");
				} else toast.error("Silme Başarısız");
			});
		},
		setOfferId(id) {
			this.MUT_setOfferId(id);
		},
		setOfferDetailAllList() {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get("/offer/detail/all/list").then((response) => {
				if (response.data.list) {
					this.MUT_setOfferMainDetailList(response.data.list);
					this.MUT_setOfferMainDetailBList(response.data.bList);
					this.setOfferAListTotal(response.data.list);
					this.setOfferBListTotal(response.data.bList);
				}
			}).catch((err) => {
				console.error("setOfferDetailAllList basarisiz:", err);
			}).finally(() => {
				sharedStore.endLoading();
			});
		},
		setOfferAllButtonStatus(payload) {
			this.MUT_setOfferAllButtonStatus(payload);
		},
		setOfferOldList() {
			const legacyApi = useLegacyApi();
			const sharedStore = useSharedStore();
			sharedStore.beginLoading();
			legacyApi.get("/offer/old/list").then((response) => {
				if (response.data.list) this.MUT_setOfferOldList(response.data.list);
			}).catch((err) => {
				console.error("setOfferOldList basarisiz:", err);
			}).finally(() => {
				sharedStore.endLoading();
			});
		},
		setOfferMainDetailBList(representative) {
			useLegacyApi().get(`/offer/main/detail/b/list/${representative}`).then((response) => {
				this.MUT_setOfferMainDetailBList(response.data.list);
				this.setOfferBListTotal(response.data.list);
			});
		},
		setOfferReminderCloudUpload(payload) {
			const legacyApi = useLegacyApi();
			return new Promise((resolve, reject) => {
				legacyApi.put("/offer/reminder/file/upload", payload).then((response) => {
					if (response.data.status) resolve(true);
					else reject(false);
				});
			});
		},
		setOfferProformaUpload(payload) {
			const legacyApi = useLegacyApi();
			return new Promise((resolve, reject) => {
				legacyApi.put("/offer/proforma/file/upload", payload).then((response) => {
					if (response.data.status) resolve(true);
					else reject(false);
				});
			});
		},
		setOfferSampleUpload(payload) {
			const legacyApi = useLegacyApi();
			return new Promise((resolve, reject) => {
				legacyApi.put("/offer/sample/file/upload", payload).then((response) => {
					if (response.data.status) resolve(true);
					else reject(false);
				});
			});
		},
		setOfferDetailUpdatedAllEmit(payload) {
			this.MUT_setOfferDetailUpdatedAllEmit(payload);
		},
		setOfferDetailDeletedAllEmit(offerId) {
			this.MUT_setOfferDetailDeletedAllEmit(offerId);
		},
		MUT_setOfferOldList(payload) {
			this.offerOldList = payload;
		},
		MUT_setOfferDetailDeletedAllEmit(offerId) {
			const index = this.offerDetailList.findIndex((x) => x.Id == offerId);
			this.offerDetailList.splice(index, 1);
		},
		MUT_setOfferDetailUpdatedAllEmit(payload) {
			const index = this.offerDetailList.findIndex((x) => x.Id == payload.Id);
			this.offerDetailList.splice(index, 1, payload);
		},
		MUT_setOfferAListTotal(payload) {
			this.offerDetailTotalA = payload.length;
		},
		MUT_setOfferBListTotal(payload) {
			this.offerDetailTotalB = payload.length;
		},
		MUT_setOfferMainList(payload) {
			this.offerList = payload.list;
			this.offerCountryList = payload.country;
		},
		MUT_setOfferMainDetailList(payload) {
			this.offerDetailList = payload;
		},
		MUT_setOfferDetailProductsList(payload) {
			this.offerDetailProductsList = payload;
		},
		MUT_setOfferDetailProductsAdd(payload) {
			this.offerDetailProductsList.push(payload);
		},
		MUT_setOfferDetailProductsUpdate(payload) {
			const index = this.offerDetailProductsList.findIndex((x) => x.Id == payload.Id);
			this.offerDetailProductsList[index] = payload;
		},
		MUT_setOfferDetailProductsDelete(payload) {
			const index = this.offerDetailProductsList.findIndex((x) => x.Id == payload);
			this.offerDetailProductsList.splice(index, 1);
		},
		MUT_setOfferButtonStatus(payload) {
			this.offerButtonStatus = payload;
		},
		MUT_setOfferId(payload) {
			this.offerId = payload;
		},
		MUT_setOfferAllButtonStatus(payload) {
			this.offerAllButtonStatus = payload;
		},
		MUT_setOfferDelete(payload) {
			const index = this.offerDetailList.find((x) => x.Id == payload);
			this.offerDetailList.splice(index, 1);
		},
		MUT_setOfferMainDetailBList(payload) {
			this.offerDetailBList = payload;
		}
	}
});
//#endregion
//#region app/components/offer/Proforma.vue
var _sfc_main$2 = {
	props: {
		model: {
			type: Object,
			required: true
		},
		id: {
			type: Number,
			required: true
		}
	},
	computed: {
		offerStore() {
			return useOfferStore();
		},
		fileBase() {
			return useRuntimeConfig().public.fileServiceBase.replace(/\/+$/, "");
		}
	},
	data() {
		return {
			proforma_link_disabled: true,
			selectedProformaDate: null,
			proforma: {
				po: "",
				date: "",
				amount: 0,
				description: ""
			},
			proformaLink: ""
		};
	},
	created() {
		this.proforma.po = this.model.Proforma_Po_No;
		this.selectedProformaDate = fromIsoDate(this.model.Proforma_Tarih);
		this.proforma.amount = this.model.Proforma_Tutar;
		this.proforma.description = this.model.ProformaNot;
		this.proformaLink = `${this.fileBase}/file/download/teklif/proforma/${this.id}/${this.model.Proforma_Cloud_Dosya}`;
		if (this.model.Proforma_Cloud) this.proforma_link_disabled = false;
	},
	methods: {
		proformaUpload(event) {
			const toast = useAppToast();
			useFileService().sendOfferProforma(event.files[0], this.id).then((response) => {
				if (response.Status) this.offerStore.setOfferProformaUpload({
					...this.proforma,
					id: this.id,
					cloud: 1,
					name: event.files[0].name
				}).then((ok) => {
					if (ok) {
						toast.success("Başarıyla Yüklendi");
						this.proformaLink = `${this.fileBase}/file/download/teklif/proforma/${this.id}/${event.files[0].name}`;
						this.proforma_link_disabled = false;
					} else toast.error("Yükleme Başarısız");
				}).catch(() => {
					toast.error("Yükleme Başarısız");
				});
				else toast.error("Dosya Yükleme Başarısız.");
			});
		},
		proformatDateSelected(event) {
			this.proforma.date = toIsoDate(event);
		}
	}
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_FloatLabel = script;
	const _component_InputText = script$d;
	const _component_Calendar = script$6;
	const _component_CustomInput = CustomInput_default;
	const _component_FileUpload = script$7;
	const _component_Button = script$2;
	_push(`<div${ssrRenderAttrs(_attrs)}><div class="row mt-3 mb-8"><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "po",
					type: "text",
					modelValue: $data.proforma.po,
					"onUpdate:modelValue": ($event) => $data.proforma.po = $event
				}, null, _parent, _scopeId));
				_push(`<label for="po"${_scopeId}>Po</label>`);
			} else return [createVNode(_component_InputText, {
				id: "po",
				type: "text",
				modelValue: $data.proforma.po,
				"onUpdate:modelValue": ($event) => $data.proforma.po = $event
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "po" }, "Po")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Calendar, {
					modelValue: $data.selectedProformaDate,
					"onUpdate:modelValue": ($event) => $data.selectedProformaDate = $event,
					inputId: "proforma_date",
					onDateSelect: ($event) => $options.proformatDateSelected($event),
					dateFormat: "dd/mm/yy"
				}, null, _parent, _scopeId));
				_push(`<label for="proforma_date"${_scopeId}>Proforma Date</label>`);
			} else return [createVNode(_component_Calendar, {
				modelValue: $data.selectedProformaDate,
				"onUpdate:modelValue": ($event) => $data.selectedProformaDate = $event,
				inputId: "proforma_date",
				onDateSelect: ($event) => $options.proformatDateSelected($event),
				dateFormat: "dd/mm/yy"
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"onDateSelect"
			]), createVNode("label", { for: "proforma_date" }, "Proforma Date")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row mt-3 mb-8"><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.proforma.amount,
		text: "Amount",
		onOnInput: ($event) => $data.proforma.amount = $event,
		disabled: false
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "desc",
					type: "text",
					modelValue: $data.proforma.description,
					"onUpdate:modelValue": ($event) => $data.proforma.description = $event
				}, null, _parent, _scopeId));
				_push(`<label for="desc"${_scopeId}>Description</label>`);
			} else return [createVNode(_component_InputText, {
				id: "desc",
				type: "text",
				modelValue: $data.proforma.description,
				"onUpdate:modelValue": ($event) => $data.proforma.description = $event
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "desc" }, "Description")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row"><div class="col">`);
	_push(ssrRenderComponent(_component_FileUpload, {
		class: "w-100",
		mode: "basic",
		auto: false,
		customUpload: "",
		onSelect: ($event) => $options.proformaUpload($event),
		chooseLabel: "Upload"
	}, null, _parent));
	_push(`</div><div class="col"><a${ssrRenderAttr("href", $data.proformaLink)}></a>`);
	_push(ssrRenderComponent(_component_Button, {
		severity: "success",
		class: "h-100",
		onClick: ($event) => _ctx.$refs.proforma_link.click(),
		disabled: $data.proforma_link_disabled
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(`<i class="pi pi-download"${_scopeId}></i>`);
			else return [createVNode("i", { class: "pi pi-download" })];
		}),
		_: 1
	}, _parent));
	_push(`</div></div></div>`);
}
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/offer/Proforma.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var Proforma_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]), { __name: "OfferProforma" });
//#endregion
//#region app/components/offer/Sample.vue
var _sfc_main$1 = {
	props: {
		id: {
			type: Number,
			required: true
		},
		model: {
			type: Object,
			required: true
		}
	},
	computed: {
		offerStore() {
			return useOfferStore();
		},
		fileBase() {
			return useRuntimeConfig().public.fileServiceBase.replace(/\/+$/, "");
		}
	},
	data() {
		return {
			sample_link_disabled: false,
			sampleLink: null,
			selectedSampleReminderDate: null,
			selectedSampleEntryDate: null,
			sample: {
				entrydate: null,
				reminderdate: null,
				lastreminderdate: null,
				followno: null,
				paid: 0,
				received: 0,
				description: null
			}
		};
	},
	created() {
		this.selectedSampleEntryDate = fromIsoDate(this.model.Numune_Giris_Tarihi);
		this.selectedSampleReminderDate = fromIsoDate(this.model.Numune_Hatirlatma_Tarihi);
		this.sampleLink = `${this.fileBase}/file/download/teklif/teklifNumune/${this.id}/${this.model.Numune_Cloud_Dosya}`;
		this.sample.followno = this.model.Numune_Tracking_No;
		this.sample.paid = this.model.Numune_Odenen_Tutar;
		this.sample.received = this.model.Numune_Musteriden_Alinan;
		this.sample.description = this.model.NumuneNot;
	},
	methods: {
		sampleUpload(event) {
			const toast = useAppToast();
			useFileService().sendSampleFile(event.files[0], this.id).then((response) => {
				if (response.Status) this.offerStore.setOfferSampleUpload({
					...this.sample,
					cloud: 1,
					name: event.files[0].name,
					id: this.id
				}).then((ok) => {
					if (ok) {
						toast.success("Başarıyla Kaydedildi");
						this.sampleLink = `${this.fileBase}/file/download/teklif/teklifNumune/${this.id}/${event.files[0].name}`;
					} else toast.error("Kaydetme Başarısız");
				}).catch(() => {
					toast.error("Kaydetme Başarısız");
				});
				else toast.error("Dosya Yükleme Başarısız");
			});
		},
		sampleReminderDateSelected(event) {
			this.sample.reminderdate = toIsoDate(event);
			const last = new Date(event);
			last.setDate(last.getDate() + 3);
			this.sample.lastreminderdate = toIsoDate(last);
		},
		sampleEntryDateSelected(event) {
			this.sample.entrydate = toIsoDate(event);
		}
	}
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_FloatLabel = script;
	const _component_Calendar = script$6;
	const _component_InputText = script$d;
	const _component_CustomInput = CustomInput_default;
	const _component_FileUpload = script$7;
	const _component_Button = script$2;
	_push(`<div${ssrRenderAttrs(_attrs)}><div class="row mt-3"><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Calendar, {
					modelValue: $data.selectedSampleEntryDate,
					"onUpdate:modelValue": ($event) => $data.selectedSampleEntryDate = $event,
					inputId: "sample_entry_date",
					onDateSelect: ($event) => $options.sampleEntryDateSelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="sample_entry_date"${_scopeId}>Date of Entry</label>`);
			} else return [createVNode(_component_Calendar, {
				modelValue: $data.selectedSampleEntryDate,
				"onUpdate:modelValue": ($event) => $data.selectedSampleEntryDate = $event,
				inputId: "sample_entry_date",
				onDateSelect: ($event) => $options.sampleEntryDateSelected($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"onDateSelect"
			]), createVNode("label", { for: "sample_entry_date" }, "Date of Entry")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Calendar, {
					modelValue: $data.selectedSampleReminderDate,
					"onUpdate:modelValue": ($event) => $data.selectedSampleReminderDate = $event,
					inputId: "sample_reminder_date",
					onDateSelect: ($event) => $options.sampleReminderDateSelected($event),
					dateFormat: "dd/mm/yy"
				}, null, _parent, _scopeId));
				_push(`<label for="sample_reminder_date"${_scopeId}>Reminder Date</label>`);
			} else return [createVNode(_component_Calendar, {
				modelValue: $data.selectedSampleReminderDate,
				"onUpdate:modelValue": ($event) => $data.selectedSampleReminderDate = $event,
				inputId: "sample_reminder_date",
				onDateSelect: ($event) => $options.sampleReminderDateSelected($event),
				dateFormat: "dd/mm/yy"
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"onDateSelect"
			]), createVNode("label", { for: "sample_reminder_date" }, "Reminder Date")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "followno",
					type: "text",
					modelValue: $data.sample.followno,
					"onUpdate:modelValue": ($event) => $data.sample.followno = $event
				}, null, _parent, _scopeId));
				_push(`<label for="followno"${_scopeId}>Follow No</label>`);
			} else return [createVNode(_component_InputText, {
				id: "followno",
				type: "text",
				modelValue: $data.sample.followno,
				"onUpdate:modelValue": ($event) => $data.sample.followno = $event
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "followno" }, "Follow No")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row mt-7"><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.sample.paid,
		text: "Paid",
		onOnInput: ($event) => $data.sample.paid = $event,
		disabled: false
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.sample.received,
		text: "Received",
		onOnInput: ($event) => $data.sample.received = $event,
		disabled: false
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "desc",
					type: "text",
					modelValue: $data.sample.description,
					"onUpdate:modelValue": ($event) => $data.sample.description = $event
				}, null, _parent, _scopeId));
				_push(`<label for="desc"${_scopeId}>Description</label>`);
			} else return [createVNode(_component_InputText, {
				id: "desc",
				type: "text",
				modelValue: $data.sample.description,
				"onUpdate:modelValue": ($event) => $data.sample.description = $event
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "desc" }, "Description")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row mt-7"><div class="col">`);
	_push(ssrRenderComponent(_component_FileUpload, {
		class: "w-100",
		mode: "basic",
		auto: false,
		customUpload: "",
		onSelect: ($event) => $options.sampleUpload($event),
		chooseLabel: "Upload"
	}, null, _parent));
	_push(`</div><div class="col"><a${ssrRenderAttr("href", $data.sampleLink)}></a>`);
	_push(ssrRenderComponent(_component_Button, {
		severity: "success",
		class: "h-100",
		onClick: ($event) => _ctx.$refs.sample_link.click(),
		disabled: $data.sample_link_disabled
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(`<i class="pi pi-download"${_scopeId}></i>`);
			else return [createVNode("i", { class: "pi pi-download" })];
		}),
		_: 1
	}, _parent));
	_push(`</div></div></div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/offer/Sample.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Sample_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]), { __name: "OfferSample" });
//#endregion
//#region app/components/offer/Form.vue
var _sfc_main = {
	props: {
		model: {
			type: Object,
			required: true
		},
		category: {
			type: Array,
			required: true
		},
		product: {
			type: Array,
			required: true
		},
		size: {
			type: Array,
			required: true
		},
		thickness: {
			type: Array,
			required: true
		},
		surface: {
			type: Array,
			required: true
		},
		unit: {
			type: Array,
			required: true
		},
		productsList: {
			type: Array,
			required: false,
			default: () => []
		},
		modelProduct: {
			type: Object,
			required: false,
			default: () => ({})
		},
		status: {
			type: Boolean,
			required: true
		},
		customer: {
			type: Array,
			required: true
		},
		country: {
			type: Array,
			required: true
		},
		customerModel: {
			type: Object,
			required: true
		},
		id: {
			type: Number,
			required: false,
			default: 0
		},
		disabled_button_status: {
			type: Boolean,
			required: true
		}
	},
	computed: {
		logsStore() {
			return useLogsStore();
		},
		fileBase() {
			return useRuntimeConfig().public.fileServiceBase.replace(/\/+$/, "");
		}
	},
	data() {
		return {
			follow_it: false,
			selectedCheckedProductList: [],
			selectedShippedType: null,
			shippedType: [
				{
					id: 1,
					type: "FOB"
				},
				{
					id: 2,
					type: "FCA"
				},
				{
					id: 3,
					type: "C"
				},
				{
					id: 4,
					type: "D"
				}
			],
			offer_customer_disabled: false,
			proforma_dialog_form: false,
			sample_dialog_form: false,
			offerFileLink: null,
			reminder_date: null,
			selectedCountry: null,
			filteredCountry: null,
			selectedProductsList: null,
			offerDate: null,
			selectedSource: null,
			sources: [
				{
					id: 1,
					source: "Portföy"
				},
				{
					id: 2,
					source: "Site"
				},
				{
					id: 3,
					source: "Stone Contact"
				},
				{
					id: 4,
					source: "Fuar"
				},
				{
					id: 5,
					source: "Email"
				},
				{
					id: 6,
					source: "BGP Network"
				},
				{
					id: 7,
					source: "Ziyaret"
				},
				{
					id: 8,
					source: "Stone Add"
				},
				{
					id: 9,
					source: "Shopify"
				}
			],
			selectedOfferType: null,
			offerTypes: [
				{
					id: 1,
					type: "Mail"
				},
				{
					id: 2,
					type: "WhatsApp"
				},
				{
					id: 3,
					type: "Mail-Efes"
				}
			],
			offerProductDate: null,
			selectedCategory: null,
			selectedProduct: null,
			selectedSize: null,
			selectedThickness: null,
			selectedSurface: null,
			selectedUnit: null,
			filteredCategoryList: null,
			filteredProductList: null,
			filteredSizeList: null,
			filteredThicknessList: null,
			filteredSurfaceList: null,
			selectedPriority: null,
			priorities: [
				{
					id: 1,
					priority: "A"
				},
				{
					id: 2,
					priority: "B"
				},
				{
					id: 3,
					priority: "C"
				},
				{
					id: 5,
					priority: "D"
				},
				{
					id: 4,
					priority: "Toplantı"
				}
			],
			selectedCustomer: null,
			filteredCustomer: null
		};
	},
	created() {
		if (!this.status) this.createdProcess();
		else {
			this.selectedPriority = {
				id: 4,
				priority: "Toplantı"
			};
			this.model.TeklifOncelik = "Toplantı";
			this.offer_customer_disabled = false;
		}
	},
	methods: {
		productsCheckbox(event) {
			if (event.selected) this.selectedCheckedProductList.push(event);
			else {
				const index = this.selectedCheckedProductList.findIndex((x) => x.Id == event.Id);
				if (index != -1) this.selectedCheckedProductList.splice(index, 1);
			}
		},
		async proforma_excel_output() {
			const toast = useAppToast();
			if (this.selectedShippedType == null) toast.error("Please select a shipped type.");
			else if (this.selectedCheckedProductList.length === 0) toast.error("Please select a product.");
			else {
				const data = {
					data: this.selectedCheckedProductList,
					shipped: this.selectedShippedType,
					model: this.model,
					customer: this.customerModel
				};
				try {
					await exportExcel("/excel-api/offer/proforma", data, "proforma_invoice.xlsx");
				} catch (err) {
					console.error("proforma ciktisi basarisiz:", err);
					toast.error("Proforma could not be created.");
				}
			}
		},
		inputSurface(event) {
			if (typeof event !== "string") return;
			this.modelProduct.IslemAdi = event;
		},
		inputThickness(event) {
			if (typeof event !== "string") return;
			this.modelProduct.Kalinlik = event;
		},
		inputSize(event) {
			if (typeof event !== "string") return;
			this.modelProduct.EnBoy = event;
		},
		inputProduct(event) {
			if (typeof event !== "string") return;
			this.modelProduct.UrunAdi = event;
		},
		inputCategory(event) {
			if (typeof event !== "string") return;
			this.modelProduct.KategoriAdi = event;
		},
		uploadReminder(event) {
			const toast = useAppToast();
			const fileService = useFileService();
			const offerStore = useOfferStore();
			const file = event.files[0];
			fileService.offerFile(file, this.id).then((response) => {
				if (response.Status) {
					this.model.Teklif_Cloud = true;
					this.model.Teklif_Cloud_Dosya = file.name;
					const data = {
						cloud: "1",
						name: file.name,
						date: toIsoDate(this.reminder_date),
						id: this.id
					};
					offerStore.setOfferReminderCloudUpload(data).then((ok) => {
						this.offerFileLink = `${this.fileBase}/file/download/teklif/teklifDosya/${this.id}/${file.name}`;
						if (ok) toast.success("Başarıyla Kaydedildi.");
						else toast.error("Kaydetme Başarısız.");
					}).catch(() => {
						toast.error("Kaydetme Başarısız.");
					});
				}
			});
		},
		__undefinedControl(value) {
			if (value === void 0 || value === null || value == "" || value == " " || value == 0) return false;
			else return true;
		},
		deleteProcess() {
			if (confirm("Are you sure you want to perform this action?")) {
				const data = {
					offer: this.model,
					customer: this.customerModel,
					id: this.model.Id
				};
				this.$emit("offer_delete_emit", data);
			}
		},
		customerInput(event) {
			if (typeof event !== "string") return;
			this.customerModel.MusteriAdi = event;
			this.customerModel.Id = null;
		},
		__saveControl() {
			if (this.customerModel.MusteriAdi == null || this.customerModel.MusteriAdi == "" || this.customerModel.UlkeId == null || this.customerModel.UlkeId == "" || this.model.TeklifYeri == null || this.model.TeklifYeri == "" || this.model.KaynakYeri == null || this.model.KaynakYeri == "" || this.model.Tarih == null || this.model.Tarih == "") return true;
			else return false;
		},
		process() {
			if (this.__saveControl()) alert("Hatalı Giriş");
			else {
				this.customerModel.Kullanici = useCookie("userId").value;
				this.customerModel.Company = this.__nullControl(this.customerModel.Company);
				this.customerModel.Mail = this.__nullControl(this.customerModel.Mail);
				this.customerModel.Phone = this.__nullControl(this.customerModel.Phone);
				this.customerModel.Adress = this.__nullControl(this.customerModel.Adress);
				this.customerModel.Description = this.__nullControl(this.customerModel.Description);
				this.model.TakipEt = this.follow_it;
				if (this.status) this.model.TakipEt = true;
				this.model.Id = this.id;
				this.model.Tarih = toIsoDate(this.offerDate);
				const data = {
					offer: this.model,
					customer: this.customerModel
				};
				this.$emit("offer_process_emit", data);
			}
		},
		countrySelected(event) {
			this.customerModel.UlkeId = event.value.Id;
		},
		customerSelected(event) {
			this.selectedCountry = this.country.find((x) => x.Id == event.value.UlkeId);
			this.model.MusteriId = event.value.Id;
			this.customerModel.Id = event.value.Id;
			this.customerModel.UlkeId = event.value.UlkeId;
			this.customerModel.MusteriAdi = event.value.MusteriAdi;
			this.customerModel.Company = event.value.Company;
			this.customerModel.Mail = event.value.Mail;
			this.customerModel.Phone = event.value.Phone;
			this.customerModel.Adress = event.value.Adress;
			this.customerModel.Description = event.value.Description;
		},
		searchCountry(event) {
			let results;
			if (event.query.length == 0) results = this.country;
			else results = this.country.filter((x) => {
				return x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredCountry = results;
		},
		searchCustomer(event) {
			let results;
			if (event.query.length == 0) results = this.customer;
			else results = this.customer.filter((x) => {
				return x.MusteriAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredCustomer = results;
		},
		offerDateSelected(event) {
			this.model.Tarih = toIsoDate(event);
		},
		prioritySelected(event) {
			this.model.TeklifOncelik = event.value.priority;
		},
		offerTypeSelected(event) {
			this.model.TeklifYeri = event.value.type;
		},
		sourceSelected(event) {
			this.model.KaynakYeri = event.value.source;
		},
		__nullControl(value) {
			if (value == "null" || value == null || value == void 0) return "";
			else return value;
		},
		createdProcess() {
			this.offer_customer_disabled = true;
			this.offerFileLink = this.model.cloudLink;
			this.selectedSource = this.sources.find((x) => x.source == this.model.KaynakYeri);
			this.selectedOfferType = this.offerTypes.find((x) => x.type == this.model.TeklifYeri);
			this.selectedPriority = this.priorities.find((x) => x.priority == this.model.TeklifOncelik);
			this.offerDate = fromIsoDate(this.model.Tarih);
			if (this.__undefinedControl(this.model.MusteriId)) {
				this.selectedCustomer = this.customer.find((x) => x.Id == this.model.MusteriId);
				if (this.__undefinedControl(this.selectedCustomer.UlkeId)) {
					this.selectedCountry = this.country.find((x) => x.Id == this.selectedCustomer.UlkeId);
					this.customerModel.UlkeId = this.selectedCustomer.UlkeId;
				}
			}
			this.customerModel.Id = this.selectedCustomer.Id;
			this.customerModel.MusteriAdi = this.selectedCustomer.MusteriAdi;
			this.customerModel.Company = this.__nullControl(this.selectedCustomer.Company);
			this.customerModel.Mail = this.__nullControl(this.selectedCustomer.Mail);
			this.customerModel.Phone = this.__nullControl(this.selectedCustomer.Phone);
			this.customerModel.Adress = this.__nullControl(this.selectedCustomer.Adress);
			this.customerModel.Description = this.__nullControl(this.selectedCustomer.Description);
			if (this.model.TakipEt) this.follow_it = true;
			else this.follow_it = false;
		},
		productReset() {
			this.offerProductDate = null;
			this.selectedCategory = null;
			this.selectedProduct = null;
			this.selectedSize = null;
			this.selectedThickness = null;
			this.selectedSurface = null;
			this.selectedUnit = null;
			this.selectedProductsList = null;
		},
		__priceOrZero(value) {
			return value == null || value == 0 ? 0 : value;
		},
		productsListSelected(event) {
			this.selectedProductsList = null;
			this.offerProductDate = fromIsoDate(event.data.Tarih);
			this.selectedCategory = this.category.find((x) => x.Id == event.data.KategoriId);
			this.selectedProduct = this.product.find((x) => x.Id == event.data.UrunId);
			this.selectedSize = this.size.find((x) => x.id == event.data.EnBoyId);
			this.selectedThickness = this.thickness.find((x) => x.id == event.data.KalinlikId);
			this.selectedSurface = this.surface.find((x) => x.Id == event.data.YuzeyIslemId);
			this.selectedUnit = this.unit.find((x) => x.Birim == event.data.Birim);
			Object.assign(this.modelProduct, event.data, {
				FobFiyat: this.__priceOrZero(event.data.FobFiyat),
				FcaFiyat: this.__priceOrZero(event.data.FcaFiyat),
				CFiyat: this.__priceOrZero(event.data.CFiyat),
				DFiyat: this.__priceOrZero(event.data.DFiyat)
			});
		},
		offerProductDateSelected(event) {
			this.modelProduct.Tarih = toIsoDate(event);
		},
		__logStamp() {
			const d = /* @__PURE__ */ new Date();
			const month = this.__zeroControl(d.getMonth() + 1);
			const day = this.__zeroControl(d.getDate());
			const hour = this.__zeroControl(d.getHours());
			const minute = this.__zeroControl(d.getMinutes());
			return `${day}-${month}-${d.getFullYear()} ${hour}:${minute}`;
		},
		__productSizeText() {
			return `${this.modelProduct.KategoriAdi}  /  ${this.modelProduct.UrunAdi}  /  ${this.modelProduct.IslemAdi} /  ${this.modelProduct.EnBoy}  /  ${this.modelProduct.Kalinlik}`;
		},
		__saveLog(verb) {
			const username = useCookie("username").value;
			this.logsStore.setLogs({
				description: `${username}  adlı kullanıcı  ${this.__logStamp()}  tarihinde  ${this.customerModel.MusteriAdi}  teklif müşterisin${verb}`,
				po: "",
				color: ""
			});
		},
		deleteProduct() {
			this.__saveLog(`in  ${this.__productSizeText()} cm ürününü sildi.`);
			if (confirm("Are you sure you want to perform this action?")) {
				useOfferStore().setOfferDetailProductsDelete(this.modelProduct.Id);
				this.productReset();
			}
		},
		updateProduct() {
			this.__saveLog(`in  ${this.__productSizeText()} cm ürününü güncelledi.`);
			useOfferStore().setOfferDetailProductsUpdate(this.modelProduct);
			this.productReset();
		},
		__zeroControl(event) {
			if (event.toString().length == 1) return "0" + event.toString();
			else return event.toString();
		},
		addProduct() {
			const toast = useAppToast();
			if (this.selectedUnit == null || this.selectedUnit == void 0 || this.selectedUnit == "") {
				toast.error("Please select a unit.");
				return;
			}
			if (this.selectedSurface == null || this.selectedSurface == void 0 || this.selectedSurface == "") {
				toast.error("Please select a surface.");
				return;
			}
			if (this.selectedThickness == null || this.selectedThickness == void 0 || this.selectedThickness == "") {
				toast.error("Please select a thickness.");
				return;
			}
			if (this.selectedSize == null || this.selectedSize == void 0 || this.selectedSize == "") {
				toast.error("Please select a size.");
				return;
			}
			if (this.selectedProduct == null || this.selectedProduct == void 0 || this.selectedProduct == "") {
				toast.error("Please select a product.");
				return;
			}
			if (this.selectedCategory == null || this.selectedCategory == void 0 || this.selectedCategory == "") {
				toast.error("Please select a category.");
				return;
			}
			this.__saveLog(`e  ${this.__productSizeText()} cm ürününü girdi.`);
			this.modelProduct.TeklifId = this.id;
			useOfferStore().setOfferDetailProductsAdd(this.modelProduct);
			this.productReset();
		},
		unitSelected(event) {
			this.modelProduct.Birim = event.value.Birim;
		},
		surfaceListSelected(event) {
			this.modelProduct.YuzeyIslemId = event.value.Id;
			this.modelProduct.IslemAdi = event.value.IslemAdi;
		},
		thicknessListSelected(event) {
			this.modelProduct.KalinlikId = event.value.id;
			this.modelProduct.Kalinlik = event.value.Kalinlik;
		},
		sizeListSelected(event) {
			this.modelProduct.EnBoyId = event.value.id;
			this.modelProduct.EnBoy = event.value.EnBoy;
		},
		productListSelected(event) {
			this.modelProduct.UrunId = event.value.Id;
			this.modelProduct.UrunAdi = event.value.UrunAdi;
		},
		categoryListSelected(event) {
			this.modelProduct.KategoriId = event.value.Id;
			this.modelProduct.KategoriAdi = event.value.KategoriAdi;
		},
		searchSurface(event) {
			let results;
			if (event.query.length == 0) results = this.surface;
			else results = this.surface.filter((x) => {
				return x.IslemAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredSurfaceList = results;
		},
		searchThickness(event) {
			let results;
			if (event.query.length == 0) results = this.thickness;
			else results = this.thickness.filter((x) => {
				return x.Kalinlik.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredThicknessList = results;
		},
		searchSize(event) {
			let results;
			if (event.query.length == 0) results = this.size;
			else results = this.size.filter((x) => {
				return x.EnBoy.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredSizeList = results;
		},
		searchProduct(event) {
			let results;
			if (event.query.length == 0) results = this.product;
			else results = this.product.filter((x) => {
				return x.UrunAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredProductList = results;
		},
		searchCategory(event) {
			let results;
			if (event.query.length == 0) results = this.category;
			else results = this.category.filter((x) => {
				return x.KategoriAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredCategoryList = results;
		}
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_FloatLabel = script;
	const _component_Dropdown = script$1;
	const _component_Button = script$2;
	const _component_TabView = script$3;
	const _component_TabPanel = script$4;
	const _component_Textarea = script$5;
	const _component_Calendar = script$6;
	const _component_FileUpload = script$7;
	const _component_Dialog = script$8;
	const _component_OfferProforma = Proforma_default;
	const _component_OfferSample = Sample_default;
	const _component_AutoComplete = script$9;
	const _component_CustomInput = CustomInput_default;
	const _component_DataTable = script$a;
	const _component_Column = script$b;
	const _component_Checkbox = script$c;
	const _component_InputText = script$d;
	_push(`<div${ssrRenderAttrs(mergeProps({
		class: "row",
		style: { "padding": "0px 100px" }
	}, _attrs))}><div class="col-12 col-lg-9"><div class="row"><div class="col mt-3">`);
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Dropdown, {
					modelValue: $data.selectedSource,
					"onUpdate:modelValue": ($event) => $data.selectedSource = $event,
					inputId: "source",
					options: $data.sources,
					optionLabel: "source",
					class: "w-100",
					onChange: ($event) => $options.sourceSelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="source"${_scopeId}>Source</label>`);
			} else return [createVNode(_component_Dropdown, {
				modelValue: $data.selectedSource,
				"onUpdate:modelValue": ($event) => $data.selectedSource = $event,
				inputId: "source",
				options: $data.sources,
				optionLabel: "source",
				class: "w-100",
				onChange: ($event) => $options.sourceSelected($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"options",
				"onChange"
			]), createVNode("label", { for: "source" }, "Source")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Dropdown, {
					modelValue: $data.selectedOfferType,
					"onUpdate:modelValue": ($event) => $data.selectedOfferType = $event,
					inputId: "offer_type",
					options: $data.offerTypes,
					optionLabel: "type",
					class: "w-100",
					onChange: ($event) => $options.offerTypeSelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="offer_type"${_scopeId}>Quote Type</label>`);
			} else return [createVNode(_component_Dropdown, {
				modelValue: $data.selectedOfferType,
				"onUpdate:modelValue": ($event) => $data.selectedOfferType = $event,
				inputId: "offer_type",
				options: $data.offerTypes,
				optionLabel: "type",
				class: "w-100",
				onChange: ($event) => $options.offerTypeSelected($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"options",
				"onChange"
			]), createVNode("label", { for: "offer_type" }, "Quote Type")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Dropdown, {
					modelValue: $data.selectedPriority,
					"onUpdate:modelValue": ($event) => $data.selectedPriority = $event,
					inputId: "priority",
					options: $data.priorities,
					optionLabel: "priority",
					class: "w-100",
					onChange: ($event) => $options.prioritySelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="priority"${_scopeId}>Priority</label>`);
			} else return [createVNode(_component_Dropdown, {
				modelValue: $data.selectedPriority,
				"onUpdate:modelValue": ($event) => $data.selectedPriority = $event,
				inputId: "priority",
				options: $data.priorities,
				optionLabel: "priority",
				class: "w-100",
				onChange: ($event) => $options.prioritySelected($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"options",
				"onChange"
			]), createVNode("label", { for: "priority" }, "Priority")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Dropdown, {
					modelValue: $data.selectedShippedType,
					"onUpdate:modelValue": ($event) => $data.selectedShippedType = $event,
					inputId: "shipped_type",
					options: $data.shippedType,
					optionLabel: "type",
					class: "w-100"
				}, null, _parent, _scopeId));
				_push(`<label for="shipped_type"${_scopeId}>Type</label>`);
			} else return [createVNode(_component_Dropdown, {
				modelValue: $data.selectedShippedType,
				"onUpdate:modelValue": ($event) => $data.selectedShippedType = $event,
				inputId: "shipped_type",
				options: $data.shippedType,
				optionLabel: "type",
				class: "w-100"
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"options"
			]), createVNode("label", { for: "shipped_type" }, "Type")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_Button, {
		severity: "secondary",
		class: "w-100",
		label: "Proforma Excel",
		onClick: $options.proforma_excel_output
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_TabView, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_TabPanel, { header: "Description" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_Textarea, {
							modelValue: $props.model.Aciklama,
							"onUpdate:modelValue": ($event) => $props.model.Aciklama = $event,
							autoResize: "",
							rows: "5",
							cols: "30",
							class: "w-100"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_Textarea, {
							modelValue: $props.model.Aciklama,
							"onUpdate:modelValue": ($event) => $props.model.Aciklama = $event,
							autoResize: "",
							rows: "5",
							cols: "30",
							class: "w-100"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_TabPanel, { header: "Reminder" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="row"${_scopeId}><div class="col"${_scopeId}>`);
							_push(ssrRenderComponent(_component_Calendar, {
								modelValue: $data.reminder_date,
								"onUpdate:modelValue": ($event) => $data.reminder_date = $event,
								placeholder: "Date",
								dateFormat: "dd/mm/yy"
							}, null, _parent, _scopeId));
							_push(`</div><div class="col"${_scopeId}>`);
							_push(ssrRenderComponent(_component_FileUpload, {
								mode: "basic",
								auto: false,
								customUpload: "",
								onSelect: ($event) => $options.uploadReminder($event)
							}, null, _parent, _scopeId));
							_push(`</div><div class="col"${_scopeId}><a${ssrRenderAttr("href", $data.offerFileLink)}${_scopeId}></a>`);
							_push(ssrRenderComponent(_component_Button, {
								onClick: ($event) => _ctx.$refs.cloudReminder.click(),
								disabled: !$props.model.Teklif_Cloud,
								severity: "success",
								class: "h-100"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<i class="pi pi-download"${_scopeId}></i>`);
									else return [createVNode("i", { class: "pi pi-download" })];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div>`);
						} else return [createVNode("div", { class: "row" }, [
							createVNode("div", { class: "col" }, [createVNode(_component_Calendar, {
								modelValue: $data.reminder_date,
								"onUpdate:modelValue": ($event) => $data.reminder_date = $event,
								placeholder: "Date",
								dateFormat: "dd/mm/yy"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							createVNode("div", { class: "col" }, [createVNode(_component_FileUpload, {
								mode: "basic",
								auto: false,
								customUpload: "",
								onSelect: ($event) => $options.uploadReminder($event)
							}, null, 8, ["onSelect"])]),
							createVNode("div", { class: "col" }, [createVNode("a", {
								href: $data.offerFileLink,
								ref: "cloudReminder"
							}, null, 8, ["href"]), createVNode(_component_Button, {
								onClick: ($event) => _ctx.$refs.cloudReminder.click(),
								disabled: !$props.model.Teklif_Cloud,
								severity: "success",
								class: "h-100"
							}, {
								default: withCtx(() => [createVNode("i", { class: "pi pi-download" })]),
								_: 1
							}, 8, ["onClick", "disabled"])])
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_TabPanel, { header: "Sample Invoice" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="row"${_scopeId}><div class="col"${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								severity: "primary",
								label: "Proforma",
								onClick: ($event) => $data.proforma_dialog_form = true
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Dialog, {
								visible: $data.proforma_dialog_form,
								"onUpdate:visible": ($event) => $data.proforma_dialog_form = $event,
								header: "Proforma",
								modal: ""
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_OfferProforma, {
										id: $props.id,
										model: $props.model
									}, null, _parent, _scopeId));
									else return [createVNode(_component_OfferProforma, {
										id: $props.id,
										model: $props.model
									}, null, 8, ["id", "model"])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col"${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								severity: "secondary",
								label: "Sample",
								onClick: ($event) => $data.sample_dialog_form = true
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Dialog, {
								visible: $data.sample_dialog_form,
								"onUpdate:visible": ($event) => $data.sample_dialog_form = $event,
								header: "Sample",
								modal: ""
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_OfferSample, {
										id: $props.id,
										model: $props.model
									}, null, _parent, _scopeId));
									else return [createVNode(_component_OfferSample, {
										id: $props.id,
										model: $props.model
									}, null, 8, ["id", "model"])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div>`);
						} else return [createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_Button, {
							severity: "primary",
							label: "Proforma",
							onClick: ($event) => $data.proforma_dialog_form = true
						}, null, 8, ["onClick"]), createVNode(_component_Dialog, {
							visible: $data.proforma_dialog_form,
							"onUpdate:visible": ($event) => $data.proforma_dialog_form = $event,
							header: "Proforma",
							modal: ""
						}, {
							default: withCtx(() => [createVNode(_component_OfferProforma, {
								id: $props.id,
								model: $props.model
							}, null, 8, ["id", "model"])]),
							_: 1
						}, 8, ["visible", "onUpdate:visible"])]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
							severity: "secondary",
							label: "Sample",
							onClick: ($event) => $data.sample_dialog_form = true
						}, null, 8, ["onClick"]), createVNode(_component_Dialog, {
							visible: $data.sample_dialog_form,
							"onUpdate:visible": ($event) => $data.sample_dialog_form = $event,
							header: "Sample",
							modal: ""
						}, {
							default: withCtx(() => [createVNode(_component_OfferSample, {
								id: $props.id,
								model: $props.model
							}, null, 8, ["id", "model"])]),
							_: 1
						}, 8, ["visible", "onUpdate:visible"])])])];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_TabPanel, { header: "Description" }, {
					default: withCtx(() => [createVNode(_component_Textarea, {
						modelValue: $props.model.Aciklama,
						"onUpdate:modelValue": ($event) => $props.model.Aciklama = $event,
						autoResize: "",
						rows: "5",
						cols: "30",
						class: "w-100"
					}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
					_: 1
				}),
				createVNode(_component_TabPanel, { header: "Reminder" }, {
					default: withCtx(() => [createVNode("div", { class: "row" }, [
						createVNode("div", { class: "col" }, [createVNode(_component_Calendar, {
							modelValue: $data.reminder_date,
							"onUpdate:modelValue": ($event) => $data.reminder_date = $event,
							placeholder: "Date",
							dateFormat: "dd/mm/yy"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						createVNode("div", { class: "col" }, [createVNode(_component_FileUpload, {
							mode: "basic",
							auto: false,
							customUpload: "",
							onSelect: ($event) => $options.uploadReminder($event)
						}, null, 8, ["onSelect"])]),
						createVNode("div", { class: "col" }, [createVNode("a", {
							href: $data.offerFileLink,
							ref: "cloudReminder"
						}, null, 8, ["href"]), createVNode(_component_Button, {
							onClick: ($event) => _ctx.$refs.cloudReminder.click(),
							disabled: !$props.model.Teklif_Cloud,
							severity: "success",
							class: "h-100"
						}, {
							default: withCtx(() => [createVNode("i", { class: "pi pi-download" })]),
							_: 1
						}, 8, ["onClick", "disabled"])])
					])]),
					_: 1
				}),
				createVNode(_component_TabPanel, { header: "Sample Invoice" }, {
					default: withCtx(() => [createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_Button, {
						severity: "primary",
						label: "Proforma",
						onClick: ($event) => $data.proforma_dialog_form = true
					}, null, 8, ["onClick"]), createVNode(_component_Dialog, {
						visible: $data.proforma_dialog_form,
						"onUpdate:visible": ($event) => $data.proforma_dialog_form = $event,
						header: "Proforma",
						modal: ""
					}, {
						default: withCtx(() => [createVNode(_component_OfferProforma, {
							id: $props.id,
							model: $props.model
						}, null, 8, ["id", "model"])]),
						_: 1
					}, 8, ["visible", "onUpdate:visible"])]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
						severity: "secondary",
						label: "Sample",
						onClick: ($event) => $data.sample_dialog_form = true
					}, null, 8, ["onClick"]), createVNode(_component_Dialog, {
						visible: $data.sample_dialog_form,
						"onUpdate:visible": ($event) => $data.sample_dialog_form = $event,
						header: "Sample",
						modal: ""
					}, {
						default: withCtx(() => [createVNode(_component_OfferSample, {
							id: $props.id,
							model: $props.model
						}, null, 8, ["id", "model"])]),
						_: 1
					}, 8, ["visible", "onUpdate:visible"])])])]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div><div class="row"><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Calendar, {
					modelValue: $data.offerProductDate,
					"onUpdate:modelValue": ($event) => $data.offerProductDate = $event,
					inputId: "offer_product_date",
					onDateSelect: ($event) => $options.offerProductDateSelected($event),
					disabled: $props.id == 0,
					style: { "z-index": "99" },
					dateFormat: "dd/mm/yy"
				}, null, _parent, _scopeId));
				_push(`<label for="offer_product_date"${_scopeId}>Date of Quote</label>`);
			} else return [createVNode(_component_Calendar, {
				modelValue: $data.offerProductDate,
				"onUpdate:modelValue": ($event) => $data.offerProductDate = $event,
				inputId: "offer_product_date",
				onDateSelect: ($event) => $options.offerProductDateSelected($event),
				disabled: $props.id == 0,
				style: { "z-index": "99" },
				dateFormat: "dd/mm/yy"
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"onDateSelect",
				"disabled"
			]), createVNode("label", { for: "offer_product_date" }, "Date of Quote")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedCategory,
					"onUpdate:modelValue": [($event) => $data.selectedCategory = $event, ($event) => $options.inputCategory($event)],
					inputId: "category",
					suggestions: $data.filteredCategoryList,
					onComplete: ($event) => $options.searchCategory($event),
					optionLabel: "KategoriAdi",
					onItemSelect: ($event) => $options.categoryListSelected($event),
					disabled: $props.id == 0
				}, null, _parent, _scopeId));
				_push(`<label for="category"${_scopeId}>Category</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedCategory,
				"onUpdate:modelValue": [($event) => $data.selectedCategory = $event, ($event) => $options.inputCategory($event)],
				inputId: "category",
				suggestions: $data.filteredCategoryList,
				onComplete: ($event) => $options.searchCategory($event),
				optionLabel: "KategoriAdi",
				onItemSelect: ($event) => $options.categoryListSelected($event),
				disabled: $props.id == 0
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect",
				"disabled"
			]), createVNode("label", { for: "category" }, "Category")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedProduct,
					"onUpdate:modelValue": [($event) => $data.selectedProduct = $event, ($event) => $options.inputProduct($event)],
					inputId: "product",
					suggestions: $data.filteredProductList,
					onComplete: ($event) => $options.searchProduct($event),
					optionLabel: "UrunAdi",
					onItemSelect: ($event) => $options.productListSelected($event),
					disabled: $props.id == 0
				}, null, _parent, _scopeId));
				_push(`<label for="product"${_scopeId}>Product</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedProduct,
				"onUpdate:modelValue": [($event) => $data.selectedProduct = $event, ($event) => $options.inputProduct($event)],
				inputId: "product",
				suggestions: $data.filteredProductList,
				onComplete: ($event) => $options.searchProduct($event),
				optionLabel: "UrunAdi",
				onItemSelect: ($event) => $options.productListSelected($event),
				disabled: $props.id == 0
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect",
				"disabled"
			]), createVNode("label", { for: "product" }, "Product")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedSize,
					"onUpdate:modelValue": [($event) => $data.selectedSize = $event, ($event) => $options.inputSize($event)],
					inputId: "size",
					suggestions: $data.filteredSizeList,
					onComplete: ($event) => $options.searchSize($event),
					optionLabel: "EnBoy",
					onItemSelect: ($event) => $options.sizeListSelected($event),
					disabled: $props.id == 0
				}, null, _parent, _scopeId));
				_push(`<label for="size"${_scopeId}>Width x Lenght</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedSize,
				"onUpdate:modelValue": [($event) => $data.selectedSize = $event, ($event) => $options.inputSize($event)],
				inputId: "size",
				suggestions: $data.filteredSizeList,
				onComplete: ($event) => $options.searchSize($event),
				optionLabel: "EnBoy",
				onItemSelect: ($event) => $options.sizeListSelected($event),
				disabled: $props.id == 0
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect",
				"disabled"
			]), createVNode("label", { for: "size" }, "Width x Lenght")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row mt-4"><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedThickness,
					"onUpdate:modelValue": [($event) => $data.selectedThickness = $event, ($event) => $options.inputThickness($event)],
					inputId: "thickness",
					suggestions: $data.filteredThicknessList,
					onComplete: ($event) => $options.searchThickness($event),
					optionLabel: "Kalinlik",
					onItemSelect: ($event) => $options.thicknessListSelected($event),
					disabled: $props.id == 0
				}, null, _parent, _scopeId));
				_push(`<label for="thickness"${_scopeId}>Thickness</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedThickness,
				"onUpdate:modelValue": [($event) => $data.selectedThickness = $event, ($event) => $options.inputThickness($event)],
				inputId: "thickness",
				suggestions: $data.filteredThicknessList,
				onComplete: ($event) => $options.searchThickness($event),
				optionLabel: "Kalinlik",
				onItemSelect: ($event) => $options.thicknessListSelected($event),
				disabled: $props.id == 0
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect",
				"disabled"
			]), createVNode("label", { for: "thickness" }, "Thickness")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedSurface,
					"onUpdate:modelValue": [($event) => $data.selectedSurface = $event, ($event) => $options.inputSurface($event)],
					inputId: "surface",
					suggestions: $data.filteredSurfaceList,
					onComplete: ($event) => $options.searchSurface($event),
					optionLabel: "IslemAdi",
					onItemSelect: ($event) => $options.surfaceListSelected($event),
					disabled: $props.id == 0
				}, null, _parent, _scopeId));
				_push(`<label for="surface"${_scopeId}>Surface</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedSurface,
				"onUpdate:modelValue": [($event) => $data.selectedSurface = $event, ($event) => $options.inputSurface($event)],
				inputId: "surface",
				suggestions: $data.filteredSurfaceList,
				onComplete: ($event) => $options.searchSurface($event),
				optionLabel: "IslemAdi",
				onItemSelect: ($event) => $options.surfaceListSelected($event),
				disabled: $props.id == 0
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect",
				"disabled"
			]), createVNode("label", { for: "surface" }, "Surface")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Dropdown, {
					modelValue: $data.selectedUnit,
					"onUpdate:modelValue": ($event) => $data.selectedUnit = $event,
					inputId: "unit",
					options: $props.unit,
					optionLabel: "Birim",
					onChange: ($event) => $options.unitSelected($event),
					disabled: $props.id == 0
				}, null, _parent, _scopeId));
				_push(`<label for="unit"${_scopeId}>Select a Unit</label>`);
			} else return [createVNode(_component_Dropdown, {
				modelValue: $data.selectedUnit,
				"onUpdate:modelValue": ($event) => $data.selectedUnit = $event,
				inputId: "unit",
				options: $props.unit,
				optionLabel: "Birim",
				onChange: ($event) => $options.unitSelected($event),
				disabled: $props.id == 0
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"options",
				"onChange",
				"disabled"
			]), createVNode("label", { for: "unit" }, "Select a Unit")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row mt-4"><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $props.modelProduct.FobFiyat,
		text: "Fob",
		onOnInput: ($event) => $props.modelProduct.FobFiyat = $event,
		disabled: $props.id == 0
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $props.modelProduct.FcaFiyat,
		text: "Fca",
		onOnInput: ($event) => $props.modelProduct.FcaFiyat = $event,
		disabled: $props.id == 0
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $props.modelProduct.CFiyat,
		text: "C",
		onOnInput: ($event) => $props.modelProduct.CFiyat = $event,
		disabled: $props.id == 0
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $props.modelProduct.DFiyat,
		text: "D",
		onOnInput: ($event) => $props.modelProduct.DFiyat = $event,
		disabled: $props.id == 0
	}, null, _parent));
	_push(`</div></div><div class="row mt-3"><div class="col">`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "success",
		class: "w-100",
		label: "Add",
		onClick: $options.addProduct,
		disabled: $props.id == 0
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "warn",
		class: "w-100",
		label: "Update",
		onClick: $options.updateProduct,
		disabled: $props.id == 0
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "danger",
		class: "w-100",
		label: "Delete",
		onClick: $options.deleteProduct,
		disabled: $props.id == 0
	}, null, _parent));
	_push(`</div></div><div class="row mt-3"><div class="col">`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $props.productsList,
		selection: $data.selectedProductsList,
		"onUpdate:selection": ($event) => $data.selectedProductsList = $event,
		selectionMode: "single",
		onRowClick: ($event) => $options.productsListSelected($event),
		dataKey: "Id"
	}, {
		empty: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(` No products found. `);
			else return [createTextVNode(" No products found. ")];
		}),
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, { headerStyle: "width: 3rem" }, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_Checkbox, {
							modelValue: slotProps.data.selected,
							"onUpdate:modelValue": ($event) => slotProps.data.selected = $event,
							inputId: `cb_${slotProps.data.Id}`,
							binary: "",
							onChange: ($event) => $options.productsCheckbox(slotProps.data)
						}, null, _parent, _scopeId));
						else return [createVNode(_component_Checkbox, {
							modelValue: slotProps.data.selected,
							"onUpdate:modelValue": ($event) => slotProps.data.selected = $event,
							inputId: `cb_${slotProps.data.Id}`,
							binary: "",
							onChange: ($event) => $options.productsCheckbox(slotProps.data)
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"inputId",
							"onChange"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
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
					field: "KategoriAdi",
					header: "Category"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "UrunAdi",
					header: "Product"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "IslemAdi",
					header: "Surface"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "EnBoy",
					header: "Size"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Kalinlik",
					header: "Thickness"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Birim",
					header: "Unit"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "FobFiyat",
					header: "Fob"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.FobFiyat))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.FobFiyat)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "FcaFiyat",
					header: "Fca"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.FcaFiyat))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.FcaFiyat)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "CFiyat",
					header: "C"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.CFiyat))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.CFiyat)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "DFiyat",
					header: "D"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DFiyat))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DFiyat)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, { headerStyle: "width: 3rem" }, {
					body: withCtx((slotProps) => [createVNode(_component_Checkbox, {
						modelValue: slotProps.data.selected,
						"onUpdate:modelValue": ($event) => slotProps.data.selected = $event,
						inputId: `cb_${slotProps.data.Id}`,
						binary: "",
						onChange: ($event) => $options.productsCheckbox(slotProps.data)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"inputId",
						"onChange"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Tarih",
					header: "Date"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "KategoriAdi",
					header: "Category"
				}),
				createVNode(_component_Column, {
					field: "UrunAdi",
					header: "Product"
				}),
				createVNode(_component_Column, {
					field: "IslemAdi",
					header: "Surface"
				}),
				createVNode(_component_Column, {
					field: "EnBoy",
					header: "Size"
				}),
				createVNode(_component_Column, {
					field: "Kalinlik",
					header: "Thickness"
				}),
				createVNode(_component_Column, {
					field: "Birim",
					header: "Unit"
				}),
				createVNode(_component_Column, {
					field: "FobFiyat",
					header: "Fob"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.FobFiyat)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "FcaFiyat",
					header: "Fca"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.FcaFiyat)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "CFiyat",
					header: "C"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.CFiyat)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "DFiyat",
					header: "D"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DFiyat)), 1)]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div></div></div></div><div class="col-3"><div class=""><div class="row"><div class="col">`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "success",
		class: "w-100 mb-4",
		label: "Save",
		onClick: $options.process,
		disabled: $props.disabled_button_status
	}, null, _parent));
	_push(`</div>`);
	if (!$props.status) {
		_push(`<div class="col">`);
		_push(ssrRenderComponent(_component_Button, {
			type: "button",
			severity: "danger",
			class: "w-100",
			label: "Delete",
			onClick: $options.deleteProcess
		}, null, _parent));
		_push(`</div>`);
	} else _push(`<!---->`);
	_push(`</div><div class="flex flex-wrap justify-content-center gap-3 mb-4"><div class="flex align-items-center">`);
	_push(ssrRenderComponent(_component_Checkbox, {
		modelValue: $data.follow_it,
		"onUpdate:modelValue": ($event) => $data.follow_it = $event,
		inputId: "follow",
		binary: ""
	}, null, _parent));
	_push(`<label for="follow" class="ml-2"> Track </label></div><div class="flex align-items-center">`);
	_push(ssrRenderComponent(_component_Checkbox, {
		modelValue: $props.model.BList,
		"onUpdate:modelValue": ($event) => $props.model.BList = $event,
		inputId: "b_list",
		binary: ""
	}, null, _parent));
	_push(`<label for="b_list" class="ml-2"> B List </label></div></div>`);
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Calendar, {
					modelValue: $data.offerDate,
					"onUpdate:modelValue": ($event) => $data.offerDate = $event,
					inputId: "offer_date",
					style: { "width": "100%" },
					onDateSelect: ($event) => $options.offerDateSelected($event),
					dateFormat: "dd/mm/yy"
				}, null, _parent, _scopeId));
				_push(`<label for="offer_date"${_scopeId}>Date</label>`);
			} else return [createVNode(_component_Calendar, {
				modelValue: $data.offerDate,
				"onUpdate:modelValue": ($event) => $data.offerDate = $event,
				inputId: "offer_date",
				style: { "width": "100%" },
				onDateSelect: ($event) => $options.offerDateSelected($event),
				dateFormat: "dd/mm/yy"
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"onDateSelect"
			]), createVNode("label", { for: "offer_date" }, "Date")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedCustomer,
					"onUpdate:modelValue": [($event) => $data.selectedCustomer = $event, ($event) => $options.customerInput($event)],
					inputId: "customer",
					suggestions: $data.filteredCustomer,
					onComplete: ($event) => $options.searchCustomer($event),
					optionLabel: "MusteriAdi",
					onItemSelect: ($event) => $options.customerSelected($event),
					disabled: $data.offer_customer_disabled
				}, null, _parent, _scopeId));
				_push(`<label for="customer"${_scopeId}>Customer</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedCustomer,
				"onUpdate:modelValue": [($event) => $data.selectedCustomer = $event, ($event) => $options.customerInput($event)],
				inputId: "customer",
				suggestions: $data.filteredCustomer,
				onComplete: ($event) => $options.searchCustomer($event),
				optionLabel: "MusteriAdi",
				onItemSelect: ($event) => $options.customerSelected($event),
				disabled: $data.offer_customer_disabled
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect",
				"disabled"
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
					onComplete: ($event) => $options.searchCountry($event),
					optionLabel: "UlkeAdi",
					onItemSelect: ($event) => $options.countrySelected($event),
					disabled: $data.offer_customer_disabled
				}, null, _parent, _scopeId));
				_push(`<label for="country"${_scopeId}>Country</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedCountry,
				"onUpdate:modelValue": ($event) => $data.selectedCountry = $event,
				inputId: "country",
				suggestions: $data.filteredCountry,
				onComplete: ($event) => $options.searchCountry($event),
				optionLabel: "UlkeAdi",
				onItemSelect: ($event) => $options.countrySelected($event),
				disabled: $data.offer_customer_disabled
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect",
				"disabled"
			]), createVNode("label", { for: "country" }, "Country")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "company",
					modelValue: $props.customerModel.Company,
					"onUpdate:modelValue": ($event) => $props.customerModel.Company = $event
				}, null, _parent, _scopeId));
				_push(`<label for="company"${_scopeId}>Company</label>`);
			} else return [createVNode(_component_InputText, {
				id: "company",
				modelValue: $props.customerModel.Company,
				"onUpdate:modelValue": ($event) => $props.customerModel.Company = $event
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "company" }, "Company")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "mail",
					modelValue: $props.customerModel.Mail,
					"onUpdate:modelValue": ($event) => $props.customerModel.Mail = $event
				}, null, _parent, _scopeId));
				_push(`<label for="mail"${_scopeId}>Mail</label>`);
			} else return [createVNode(_component_InputText, {
				id: "mail",
				modelValue: $props.customerModel.Mail,
				"onUpdate:modelValue": ($event) => $props.customerModel.Mail = $event
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "mail" }, "Mail")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "phone",
					modelValue: $props.customerModel.Phone,
					"onUpdate:modelValue": ($event) => $props.customerModel.Phone = $event
				}, null, _parent, _scopeId));
				_push(`<label for="phone"${_scopeId}>Phone</label>`);
			} else return [createVNode(_component_InputText, {
				id: "phone",
				modelValue: $props.customerModel.Phone,
				"onUpdate:modelValue": ($event) => $props.customerModel.Phone = $event
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "phone" }, "Phone")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "adress",
					modelValue: $props.customerModel.Adress,
					"onUpdate:modelValue": ($event) => $props.customerModel.Adress = $event
				}, null, _parent, _scopeId));
				_push(`<label for="adress"${_scopeId}>Address</label>`);
			} else return [createVNode(_component_InputText, {
				id: "adress",
				modelValue: $props.customerModel.Adress,
				"onUpdate:modelValue": ($event) => $props.customerModel.Adress = $event
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "adress" }, "Address")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Textarea, {
					id: "description",
					modelValue: $props.customerModel.Description,
					"onUpdate:modelValue": ($event) => $props.customerModel.Description = $event,
					rows: "5",
					class: "w-100"
				}, null, _parent, _scopeId));
				_push(`<label for="description"${_scopeId}>Description</label>`);
			} else return [createVNode(_component_Textarea, {
				id: "description",
				modelValue: $props.customerModel.Description,
				"onUpdate:modelValue": ($event) => $props.customerModel.Description = $event,
				rows: "5",
				class: "w-100"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "description" }, "Description")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/offer/Form.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Form_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "OfferForm" });

export { Form_default as F, useOfferStore as u };
//# sourceMappingURL=Form-C3stPlZH.mjs.map
