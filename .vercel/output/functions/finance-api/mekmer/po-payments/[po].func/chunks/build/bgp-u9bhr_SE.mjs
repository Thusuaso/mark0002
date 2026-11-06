import { b as useAsyncData, _ as _plugin_vue_export_helper_default, a as useAppToast, u as useCookie, c as dateToString } from '../virtual/entry.mjs';
import { n as script } from './button-C8Z7Yc79.mjs';
import { n as script$5 } from './column-CT6GXkG2.mjs';
import { n as script$4 } from './datatable-D6ou7HZJ.mjs';
import { n as script$2 } from './inputtext-s6cxdqDx.mjs';
import { n as script$6 } from './radiobutton-C-685P7O.mjs';
import { n as script$3 } from './autocomplete-5Wwvp4c8.mjs';
import { t as script$9 } from './textarea-DHWHHqLi.mjs';
import { n as script$8 } from './floatlabel-BDqo8RCT.mjs';
import { t as toIsoDate, f as fromIsoDate } from './dates-C-BBx50j.mjs';
import { n as script$1 } from './dialog-BB6no0wu.mjs';
import { u as useApi } from './useApi-CGFzrxZs.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { n as script$7 } from './datepicker-BGpmmzow.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { defineStore } from 'pinia';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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
import './plus-CA09jZgn.mjs';
import './focustrap-kXXT0pga.mjs';
import './sortamountupalt-MmmjHcOR.mjs';
import './chip--BHyxaU9.mjs';
import './timescircle-0itGCn-i.mjs';
import './utils-9fKJJYP7.mjs';
import './useLegacyApi-B5zRc7ig.mjs';
import './chevronleft-Dy82Mung.mjs';
import './chevronup-CFGDy7zv.mjs';

//#region app/stores/bgp.ts
var useBgpStore = defineStore("bgp", {
	state: () => ({
		bgpLists: [],
		bgpDetailList: [],
		bgpDetailButtonStatus: false
	}),
	getters: {
		getBgpLists: (state) => state.bgpLists,
		getBgpDetailList: (state) => state.bgpDetailList,
		getBgpDetailButtonStatus: (state) => state.bgpDetailButtonStatus
	},
	actions: {
		async setBgpList() {
			try {
				const res = await useApi()("/sales/bgp/list");
				this.bgpLists = res?.data ?? [];
			} catch (err) {
				console.error("setBgpList basarisiz:", err);
				this.bgpLists = [];
			}
		},
		async setBgpSave(bgp) {
			const toast = useAppToast();
			try {
				const res = await useApi()("/sales/bgp/save", {
					method: "POST",
					body: bgp
				});
				if (res.status) {
					const user = useSharedStore().getUserList.find((x) => x.ID == bgp.Temsilci);
					if (user) res.data.Temsilci = user.KullaniciAdi;
					else console.warn("setBgpSave: Temsilci kullanici listesinde bulunamadi, sunucudan gelen deger korundu. Temsilci:", bgp.Temsilci);
					this.bgpLists.push(res.data);
					toast.success("Başarıyla Kaydedildi.");
				} else toast.error("Kaydetme Başarısız");
			} catch (err) {
				console.error("setBgpSave basarisiz:", err);
				toast.error("Kaydetme Başarısız");
			}
		},
		async setBgpDelete(id) {
			const toast = useAppToast();
			try {
				const res = await useApi()(`/sales/bgp/delete/${id}`, { method: "DELETE" });
				if (res.status) {
					const index = this.bgpLists.findIndex((item) => item.ID === res.id);
					if (index > -1) this.bgpLists.splice(index, 1);
					else console.warn("setBgpDelete: silinen kayit listede yok, liste degistirilmedi. ID:", res.id);
					toast.success("Başarıyla Silindi.");
				} else toast.error("Silme Başarısız");
			} catch (err) {
				console.error("setBgpDelete basarisiz:", err);
				toast.error("Silme Başarısız");
			}
		},
		async setBgpDetailList(projectName) {
			try {
				const res = await useApi()(`/sales/bgp/detail/${projectName}`);
				this.bgpDetailList = res?.data ?? [];
			} catch (err) {
				console.error("setBgpDetailList basarisiz:", err);
				this.bgpDetailList = [];
			}
		},
		setBgpDetailButton(status) {
			this.bgpDetailButtonStatus = status;
		},
		async setBgpDetailDelete(id) {
			const toast = useAppToast();
			try {
				const res = await useApi()(`/sales/bgp/detail/delete/${id}`, { method: "DELETE" });
				if (res.status) {
					const index = this.bgpDetailList.findIndex((item) => item.ID === res.id);
					if (index > -1) this.bgpDetailList.splice(index, 1);
					else console.warn("setBgpDetailDelete: silinen kayit listede yok, liste degistirilmedi. ID:", res.id);
					toast.success("Başarıyla Silindi");
				} else toast.error("Silme Başarısız");
			} catch (err) {
				console.error("setBgpDetailDelete basarisiz:", err);
				toast.error("Silme Başarısız");
			}
		},
		async setBgpDetailSave(bgp) {
			const toast = useAppToast();
			try {
				const res = await useApi()("/sales/bgp/detail/save", {
					method: "POST",
					body: bgp
				});
				if (res.status) {
					this.bgpDetailList.push(res.data);
					toast.success("Kaydetme Başarılı");
				} else toast.error("Kaydetme Başarısız");
			} catch (err) {
				console.error("setBgpDetailSave basarisiz:", err);
				toast.error("Kaydetme Başarısız");
			}
		},
		async setBgpDetailUpdate(bgp) {
			const toast = useAppToast();
			try {
				const res = await useApi()("/sales/bgp/detail/update", {
					method: "PUT",
					body: bgp
				});
				if (res.status) {
					const index = this.bgpDetailList.findIndex((item) => item.ID === res.data.ID);
					if (index > -1) this.bgpDetailList.splice(index, 1, res.data);
					else console.warn("setBgpDetailUpdate: guncellenen kayit listede yok, liste degistirilmedi. ID:", res.data?.ID);
					toast.success("Güncelleme Başarılı");
				} else toast.error("Güncelleme Başarısız");
			} catch (err) {
				console.error("setBgpDetailUpdate basarisiz:", err);
				toast.error("Güncelleme Başarısız");
			}
		}
	}
});
//#endregion
//#region app/components/sales/BgpCard.vue
var _sfc_main$5 = {
	props: { bgp: {
		type: Object,
		required: true
	} },
	computed: { bgpStore() {
		return useBgpStore();
	} },
	methods: {
		detail() {
			this.$emit("bgp_detail_dialog_form", this.bgp);
		},
		deleteForm() {
			if (confirm("Are you sure you want to perform this action?")) this.bgpStore.setBgpDelete(this.bgp.ID);
		}
	}
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_Button = script;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "col-4" }, _attrs))}><div class="card w-100 h-100"><div class="card-header"><div class="row m-auto"><div class="col text-center">${ssrInterpolate($props.bgp.Temsilci)}</div><div class="col text-center">${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))($props.bgp.DateofRegistiration))}</div></div></div><div class="card-body"><p class="card-text text-center">${ssrInterpolate($props.bgp.ProjectName)}</p></div><div class="card-footer text-body-secondary"><div class="row"><div class="col">`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		class: "w-100",
		label: "Detail",
		onClick: $options.detail
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "danger",
		class: "w-100",
		label: "Delete",
		onClick: $options.deleteForm
	}, null, _parent));
	_push(`</div></div></div></div></div>`);
}
var _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sales/BgpCard.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var BgpCard_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$5, [["ssrRender", _sfc_ssrRender$4]]), { __name: "SalesBgpCard" });
//#endregion
//#region app/components/sales/BgpCardGroup.vue
var _sfc_main$4 = {
	props: { bgpLists: {
		type: Array,
		required: false,
		default: () => []
	} },
	methods: { bgpDetailForm(event) {
		this.$emit("bgp_detail_dialog_form", event);
	} }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_SalesBgpCard = BgpCard_default;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "row m-auto" }, _attrs))}><!--[-->`);
	ssrRenderList($props.bgpLists, (bgp) => {
		_push(ssrRenderComponent(_component_SalesBgpCard, {
			key: bgp.ID,
			bgp,
			onBgp_detail_dialog_form: ($event) => $options.bgpDetailForm($event)
		}, null, _parent));
	});
	_push(`<!--]--></div>`);
}
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sales/BgpCardGroup.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var BgpCardGroup_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3]]), { __name: "SalesBgpCardGroup" });
//#endregion
//#region app/components/sales/BgpNewForm.vue
var _sfc_main$3 = {
	props: { countryList: {
		type: Array,
		required: true
	} },
	computed: { bgpStore() {
		return useBgpStore();
	} },
	data() {
		return {
			bgp: {
				ProjectName: null,
				Temsilci: null,
				UlkeAdi: null,
				UlkeLogo: null,
				DateofRegistiration: null
			},
			selectedCountry: null,
			filteredCountryList: null
		};
	},
	methods: {
		countrySelected(event) {
			this.bgp.UlkeAdi = event.value.UlkeAdi;
			this.bgp.UlkeLogo = event.value.Png_Flags;
		},
		searchCountry(event) {
			if (event.query.length == 0) {
				this.filteredCountryList = this.countryList;
				return;
			}
			this.filteredCountryList = this.countryList.filter((x) => x.UlkeAdi.toLowerCase().startsWith(event.query.toLowerCase()));
		},
		save() {
			this.bgp.DateofRegistiration = toIsoDate(/* @__PURE__ */ new Date());
			this.bgp.Temsilci = useCookie("userId").value;
			this.bgpStore.setBgpSave(this.bgp);
			this.$emit("closed_bgp_dialog");
		}
	}
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_InputText = script$2;
	const _component_AutoComplete = script$3;
	const _component_Button = script;
	_push(`<div${ssrRenderAttrs(_attrs)}><div class="row m-auto mt-4" style="${ssrRenderStyle({
		"max-width": "1000px",
		"width": "100%",
		"min-height": "150px"
	})}"><div class="col"><div class="flex flex-column gap-2"><label for="projectname">Project Name</label>`);
	_push(ssrRenderComponent(_component_InputText, {
		id: "projectname",
		modelValue: $data.bgp.ProjectName,
		"onUpdate:modelValue": ($event) => $data.bgp.ProjectName = $event
	}, null, _parent));
	_push(`</div></div><div class="col"><div class="flex flex-column gap-2"><label for="country">Country</label>`);
	_push(ssrRenderComponent(_component_AutoComplete, {
		inputId: "country",
		modelValue: $data.selectedCountry,
		"onUpdate:modelValue": ($event) => $data.selectedCountry = $event,
		suggestions: $data.filteredCountryList,
		optionLabel: "UlkeAdi",
		onComplete: ($event) => $options.searchCountry($event),
		onItemSelect: ($event) => $options.countrySelected($event)
	}, {
		option: withCtx((slotProps, _push, _parent, _scopeId) => {
			if (_push) _push(`<div${_scopeId}>${ssrInterpolate(slotProps.option.UlkeAdi)}</div>`);
			else return [createVNode("div", null, toDisplayString(slotProps.option.UlkeAdi), 1)];
		}),
		_: 1
	}, _parent));
	_push(`</div></div></div>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "success",
		class: "w-100",
		label: "Save",
		onClick: $options.save
	}, null, _parent));
	_push(`</div>`);
}
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sales/BgpNewForm.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var BgpNewForm_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]), { __name: "SalesBgpNewForm" });
//#endregion
//#region app/components/sales/BgpDetailList.vue
function emptyBgpDetail() {
	return {
		FirmaAdi: null,
		Email: null,
		PhoneNumber: null,
		Aciklama: null,
		Baslik: null,
		HatirlatmaAciklama: null
	};
}
var _sfc_main$2 = {
	computed: { bgpStore() {
		return useBgpStore();
	} },
	data() {
		return { selectedBgpDetail: null };
	},
	methods: {
		bgpDetailSelected(event) {
			this.bgpStore.setBgpDetailButton(false);
			this.$emit("bgp_detail_form_dialog", event.data);
		},
		newForm() {
			this.bgpStore.setBgpDetailButton(true);
			this.$emit("bgp_detail_form_dialog", emptyBgpDetail());
		}
	}
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_Button = script;
	const _component_DataTable = script$4;
	const _component_Column = script$5;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "success",
		label: "New",
		onClick: $options.newForm
	}, null, _parent));
	_push(ssrRenderComponent(_component_DataTable, {
		value: $options.bgpStore.getBgpDetailList,
		selection: $data.selectedBgpDetail,
		"onUpdate:selection": ($event) => $data.selectedBgpDetail = $event,
		selectionMode: "single",
		onRowClick: ($event) => $options.bgpDetailSelected($event)
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "FirmaAdi",
					header: "Customer",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "KayitTarihi",
					header: "Date",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.KayitTarihi))}`);
						else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.KayitTarihi)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Baslik",
					header: "Title",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Aciklama",
					header: "Explanation",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "HatirlatmaTarihi",
					header: "Reminder Time",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.HatirlatmaTarihi))}`);
						else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.HatirlatmaTarihi)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "HatirlatmaAciklama",
					header: "Reminder",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Email",
					header: "Mail",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Unvan",
					header: "Degree",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "FirmaAdi",
					header: "Customer",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "KayitTarihi",
					header: "Date",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.KayitTarihi)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Baslik",
					header: "Title",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "Aciklama",
					header: "Explanation",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "HatirlatmaTarihi",
					header: "Reminder Time",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.HatirlatmaTarihi)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "HatirlatmaAciklama",
					header: "Reminder",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "Email",
					header: "Mail",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "Unvan",
					header: "Degree",
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sales/BgpDetailList.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var BgpDetailList_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]), { __name: "SalesBgpDetailList" });
//#endregion
//#region app/components/sales/BgpDetailForm.vue
var CALL_RESULTS = [
	{
		value: "WrongNumber",
		field: "WrongNumber",
		label: "Wrong Number"
	},
	{
		value: "NotResponse",
		field: "NotResponse",
		label: "No Answer"
	},
	{
		value: "Interested",
		field: "Interested",
		label: "Interested"
	},
	{
		value: "NotInterested",
		field: "NotInterested",
		label: "Not Interested"
	}
];
var CUSTOMER_DEGREES = [{
	value: "Contractor",
	unvan: "contractor",
	label: "Contractor"
}, {
	value: "Architech",
	unvan: "architect",
	label: "Architech"
}];
var _sfc_main$1 = {
	props: {
		formData: {
			type: Object,
			required: true
		},
		projectName: {
			type: String,
			required: false,
			default: null
		}
	},
	computed: { bgpStore() {
		return useBgpStore();
	} },
	data() {
		return {
			CALL_RESULTS,
			CUSTOMER_DEGREES,
			ingredient: null,
			customerDegree: null,
			reminderdate: null
		};
	},
	created() {
		if (!this.bgpStore.getBgpDetailButtonStatus) this.createdProcess();
	},
	methods: {
		applyCallResult() {
			if (!this.ingredient) return;
			for (const opt of CALL_RESULTS) this.formData[opt.field] = opt.value === this.ingredient;
		},
		applyCustomerDegree() {
			const match = CUSTOMER_DEGREES.find((x) => x.value === this.customerDegree);
			if (match) this.formData.Unvan = match.unvan;
		},
		saveProcess() {
			if (this.bgpStore.getBgpDetailButtonStatus) this.save();
			else this.update();
		},
		save() {
			this.applyCallResult();
			this.applyCustomerDegree();
			this.formData.HatirlatmaTarihi = toIsoDate(this.reminderdate);
			this.formData.KayitTarihi = toIsoDate(/* @__PURE__ */ new Date());
			this.formData.ProjectName = this.projectName;
			this.formData.Temsilci = useCookie("userId").value;
			this.bgpStore.setBgpDetailSave(this.formData);
			this.$emit("bgp_detail_form_dialog_closed");
		},
		update() {
			this.applyCallResult();
			this.applyCustomerDegree();
			this.formData.HatirlatmaTarihi = toIsoDate(this.reminderdate);
			this.bgpStore.setBgpDetailUpdate(this.formData);
		},
		deleteForm() {
			if (confirm("Are you sure you want to perform this action?")) {
				this.bgpStore.setBgpDetailDelete(this.formData.ID);
				this.$emit("bgp_detail_form_dialog_closed");
			}
		},
		createdProcess() {
			const result = CALL_RESULTS.find((opt) => this.formData[opt.field] === true);
			this.ingredient = result ? result.value : null;
			const degree = CUSTOMER_DEGREES.find((x) => x.unvan === this.formData.Unvan);
			this.customerDegree = degree ? degree.value : null;
			this.reminderdate = fromIsoDate(this.formData.HatirlatmaTarihi);
		}
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_InputText = script$2;
	const _component_RadioButton = script$6;
	const _component_DatePicker = script$7;
	const _component_FloatLabel = script$8;
	const _component_Textarea = script$9;
	const _component_Button = script;
	_push(`<div${ssrRenderAttrs(mergeProps({
		class: "container",
		style: { "padding": "100px" }
	}, _attrs))}><div class="row"><div class="col"><div class="flex flex-column gap-2"><label for="customer">Customer</label>`);
	_push(ssrRenderComponent(_component_InputText, {
		id: "customer",
		modelValue: $props.formData.FirmaAdi,
		"onUpdate:modelValue": ($event) => $props.formData.FirmaAdi = $event
	}, null, _parent));
	_push(`</div></div><div class="col"><div class="flex flex-column gap-2"><label for="email">Mail</label>`);
	_push(ssrRenderComponent(_component_InputText, {
		id: "email",
		modelValue: $props.formData.Email,
		"onUpdate:modelValue": ($event) => $props.formData.Email = $event
	}, null, _parent));
	_push(`</div></div><div class="col"><div class="flex flex-column gap-2"><label for="phone">Phone</label>`);
	_push(ssrRenderComponent(_component_InputText, {
		id: "phone",
		modelValue: $props.formData.PhoneNumber,
		"onUpdate:modelValue": ($event) => $props.formData.PhoneNumber = $event
	}, null, _parent));
	_push(`</div></div></div><div class="flex flex-wrap gap-3 m-auto"><!--[-->`);
	ssrRenderList($data.CALL_RESULTS, (opt) => {
		_push(`<div class="flex align-items-center">`);
		_push(ssrRenderComponent(_component_RadioButton, {
			modelValue: $data.ingredient,
			"onUpdate:modelValue": ($event) => $data.ingredient = $event,
			inputId: `callResult_${opt.value}`,
			value: opt.value
		}, null, _parent));
		_push(`<label${ssrRenderAttr("for", `callResult_${opt.value}`)} class="ml-2">${ssrInterpolate(opt.label)}</label></div>`);
	});
	_push(`<!--]--></div><div class="flex flex-wrap gap-3 m-auto"><!--[-->`);
	ssrRenderList($data.CUSTOMER_DEGREES, (opt) => {
		_push(`<div class="flex align-items-center">`);
		_push(ssrRenderComponent(_component_RadioButton, {
			modelValue: $data.customerDegree,
			"onUpdate:modelValue": ($event) => $data.customerDegree = $event,
			inputId: `degree_${opt.value}`,
			value: opt.value
		}, null, _parent));
		_push(`<label${ssrRenderAttr("for", `degree_${opt.value}`)} class="ml-2">${ssrInterpolate(opt.label)}</label></div>`);
	});
	_push(`<!--]--></div><div class="row"><div class="col"><div class="flex flex-column gap-2"><label for="title">Title</label>`);
	_push(ssrRenderComponent(_component_InputText, {
		id: "title",
		modelValue: $props.formData.Baslik,
		"onUpdate:modelValue": ($event) => $props.formData.Baslik = $event
	}, null, _parent));
	_push(`</div></div><div class="col"><div class="flex flex-column gap-2"><label for="reminderdate">Reminder Time</label>`);
	_push(ssrRenderComponent(_component_DatePicker, {
		inputId: "reminderdate",
		modelValue: $data.reminderdate,
		"onUpdate:modelValue": ($event) => $data.reminderdate = $event,
		dateFormat: "dd/mm/yy"
	}, null, _parent));
	_push(`</div></div></div><div class="row mt-2"><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Textarea, {
					id: "explanation",
					modelValue: $props.formData.Aciklama,
					"onUpdate:modelValue": ($event) => $props.formData.Aciklama = $event,
					class: "w-100 h-75",
					rows: "5"
				}, null, _parent, _scopeId));
				_push(`<label for="explanation"${_scopeId}>Explanation</label>`);
			} else return [createVNode(_component_Textarea, {
				id: "explanation",
				modelValue: $props.formData.Aciklama,
				"onUpdate:modelValue": ($event) => $props.formData.Aciklama = $event,
				class: "w-100 h-75",
				rows: "5"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "explanation" }, "Explanation")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Textarea, {
					id: "reminder",
					modelValue: $props.formData.HatirlatmaAciklama,
					"onUpdate:modelValue": ($event) => $props.formData.HatirlatmaAciklama = $event,
					class: "w-100 h-75",
					rows: "5"
				}, null, _parent, _scopeId));
				_push(`<label for="reminder"${_scopeId}>Reminder</label>`);
			} else return [createVNode(_component_Textarea, {
				id: "reminder",
				modelValue: $props.formData.HatirlatmaAciklama,
				"onUpdate:modelValue": ($event) => $props.formData.HatirlatmaAciklama = $event,
				class: "w-100 h-75",
				rows: "5"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "reminder" }, "Reminder")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row"><div class="col">`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "success",
		class: "w-100",
		label: "Save",
		onClick: $options.saveProcess
	}, null, _parent));
	_push(`</div>`);
	if (!$options.bgpStore.getBgpDetailButtonStatus) {
		_push(`<div class="col">`);
		_push(ssrRenderComponent(_component_Button, {
			type: "button",
			severity: "danger",
			class: "w-100",
			label: "Delete",
			onClick: $options.deleteForm
		}, null, _parent));
		_push(`</div>`);
	} else _push(`<!---->`);
	_push(`</div></div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sales/BgpDetailForm.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var BgpDetailForm_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]), { __name: "SalesBgpDetailForm" });
//#endregion
//#region app/pages/sales/bgp.vue
var _sfc_main = /*@__PURE__*/ Object.assign({
	computed: {
		bgpStore() {
			return useBgpStore();
		},
		sharedStore() {
			return useSharedStore();
		}
	},
	data() {
		return {
			bgp_new_dialog: false,
			bgp_detail_list_dialog: false,
			bgp_project_name: null,
			bgp_detail_form_dialog_vis: false,
			bgpDetailFormData: null
		};
	},
	methods: {
		bgpDetailForm(event) {
			this.bgpDetailFormData = event;
			this.bgp_detail_form_dialog_vis = true;
		},
		bgpDetailList(event) {
			this.bgp_project_name = event.ProjectName;
			this.bgp_detail_list_dialog = true;
			this.bgpStore.setBgpDetailList(event.ProjectName);
		},
		newForm() {
			this.bgp_new_dialog = true;
			this.sharedStore.setCountryList();
		}
	}
}, {
	__name: "bgp",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const bgpStore = useBgpStore();
		[__temp, __restore] = withAsyncContext(() => useAsyncData("sales-bgp", () => bgpStore.setBgpList(), { server: false })), await __temp, __restore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Button = script;
			const _component_SalesBgpCardGroup = BgpCardGroup_default;
			const _component_Dialog = script$1;
			const _component_SalesBgpNewForm = BgpNewForm_default;
			const _component_SalesBgpDetailList = BgpDetailList_default;
			const _component_SalesBgpDetailForm = BgpDetailForm_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				severity: "success",
				class: "w-100",
				label: "New",
				onClick: _ctx.newForm
			}, null, _parent));
			_push(ssrRenderComponent(_component_SalesBgpCardGroup, {
				bgpLists: unref(bgpStore).getBgpLists,
				onBgp_detail_dialog_form: ($event) => _ctx.bgpDetailList($event)
			}, null, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.bgp_new_dialog,
				"onUpdate:visible": ($event) => _ctx.bgp_new_dialog = $event,
				modal: "",
				header: "New Bgp",
				contentStyle: { overflow: "visible" }
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_SalesBgpNewForm, {
						countryList: _ctx.sharedStore.getCountryList,
						onClosed_bgp_dialog: ($event) => _ctx.bgp_new_dialog = false
					}, null, _parent, _scopeId));
					else return [createVNode(_component_SalesBgpNewForm, {
						countryList: _ctx.sharedStore.getCountryList,
						onClosed_bgp_dialog: ($event) => _ctx.bgp_new_dialog = false
					}, null, 8, ["countryList", "onClosed_bgp_dialog"])];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.bgp_detail_list_dialog,
				"onUpdate:visible": ($event) => _ctx.bgp_detail_list_dialog = $event,
				modal: "",
				header: _ctx.bgp_project_name
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_SalesBgpDetailList, { onBgp_detail_form_dialog: ($event) => _ctx.bgpDetailForm($event) }, null, _parent, _scopeId));
					else return [createVNode(_component_SalesBgpDetailList, { onBgp_detail_form_dialog: ($event) => _ctx.bgpDetailForm($event) }, null, 8, ["onBgp_detail_form_dialog"])];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.bgp_detail_form_dialog_vis,
				"onUpdate:visible": ($event) => _ctx.bgp_detail_form_dialog_vis = $event,
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (_ctx.bgpDetailFormData) _push(ssrRenderComponent(_component_SalesBgpDetailForm, {
							formData: _ctx.bgpDetailFormData,
							projectName: _ctx.bgp_project_name,
							onBgp_detail_form_dialog_closed: ($event) => _ctx.bgp_detail_form_dialog_vis = false
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
					} else return [_ctx.bgpDetailFormData ? (openBlock(), createBlock(_component_SalesBgpDetailForm, {
						key: 0,
						formData: _ctx.bgpDetailFormData,
						projectName: _ctx.bgp_project_name,
						onBgp_detail_form_dialog_closed: ($event) => _ctx.bgp_detail_form_dialog_vis = false
					}, null, 8, [
						"formData",
						"projectName",
						"onBgp_detail_form_dialog_closed"
					])) : createCommentVNode("", true)];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sales/bgp.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=bgp-u9bhr_SE.mjs.map
