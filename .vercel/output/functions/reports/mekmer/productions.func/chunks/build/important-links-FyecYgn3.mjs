import { b as useAsyncData, u as useCookie, _ as _plugin_vue_export_helper_default, a as useAppToast, c as dateToString } from '../virtual/entry.mjs';
import { n as script } from './button-C8Z7Yc79.mjs';
import { n as script$3 } from './column-CT6GXkG2.mjs';
import { n as script$2 } from './datatable-D6ou7HZJ.mjs';
import { n as script$6 } from './inputtext-s6cxdqDx.mjs';
import { t as script$5 } from './textarea-DHWHHqLi.mjs';
import { n as script$4 } from './floatlabel-BDqo8RCT.mjs';
import { n as script$1 } from './dialog-BB6no0wu.mjs';
import { u as useApi } from './useApi-CGFzrxZs.mjs';
import { withAsyncContext, unref, withCtx, createVNode, createTextVNode, toDisplayString, mergeProps, useSSRContext } from 'vue';
import { defineStore } from 'pinia';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
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
import './radiobutton-C-685P7O.mjs';
import './plus-CA09jZgn.mjs';
import './focustrap-kXXT0pga.mjs';
import './sortamountupalt-MmmjHcOR.mjs';
import './utils-9fKJJYP7.mjs';

//#region app/components/sales/ImportantLinksList.vue
var _sfc_main$2 = {
	props: { list: {
		type: Array,
		required: true
	} },
	data() {
		return { selectedLinkList: null };
	},
	methods: { linkListSelected(event) {
		this.$emit("link_list_selected_emit", event);
	} }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_DataTable = script$2;
	const _component_Column = script$3;
	_push(`<div${ssrRenderAttrs(_attrs)}>`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $props.list,
		selection: $data.selectedLinkList,
		"onUpdate:selection": ($event) => $data.selectedLinkList = $event,
		selectionMode: "single",
		onRowClick: ($event) => $options.linkListSelected($event)
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "ID",
					header: "ID"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Description",
					header: "Desc."
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Link",
					header: "Link"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`<a${ssrRenderAttr("href", slotProps.data.Link)} target="_blank" rel="noopener"${_scopeId}>Link</a>`);
						else return [createVNode("a", {
							href: slotProps.data.Link,
							target: "_blank",
							rel: "noopener"
						}, "Link", 8, ["href"])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SaveDate",
					header: "Date"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.SaveDate))}`);
						else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.SaveDate)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Username",
					header: "User"
				}, null, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "ID",
					header: "ID"
				}),
				createVNode(_component_Column, {
					field: "Description",
					header: "Desc."
				}),
				createVNode(_component_Column, {
					field: "Link",
					header: "Link"
				}, {
					body: withCtx((slotProps) => [createVNode("a", {
						href: slotProps.data.Link,
						target: "_blank",
						rel: "noopener"
					}, "Link", 8, ["href"])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SaveDate",
					header: "Date"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.SaveDate)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Username",
					header: "User"
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sales/ImportantLinksList.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var ImportantLinksList_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]), { __name: "SalesImportantLinksList" });
//#endregion
//#region app/stores/importantLink.ts
var useImportantLinkStore = defineStore("importantLink", {
	state: () => ({ list: [] }),
	getters: { getImportantLinkList: (state) => state.list },
	actions: {
		async setImportantLinkListAction() {
			try {
				const res = await useApi()("/important/link/list");
				this.list = res?.list ?? [];
			} catch (err) {
				console.error("setImportantLinkListAction basarisiz:", err);
				this.list = [];
			}
		},
		async setImportantLinkListSaveAction(payload) {
			const toast = useAppToast();
			try {
				const res = await useApi()("/important/link/save", {
					method: "POST",
					body: payload
				});
				if (res.status) {
					this.list.push({
						...payload,
						ID: res.id
					});
					toast.success("Başarıyla Kaydedildi.");
				} else toast.error("Kaydetme Başarısız");
			} catch (err) {
				console.error("setImportantLinkListSaveAction basarisiz:", err);
				toast.error("Kaydetme Başarısız");
			}
		},
		async setImportantLinkListUpdateAction(payload) {
			const toast = useAppToast();
			try {
				if ((await useApi()("/important/link/update", {
					method: "PUT",
					body: payload
				})).status) {
					const index = this.list.findIndex((x) => x.ID === payload.ID);
					if (index > -1) this.list.splice(index, 1, payload);
					toast.success("Başarıyla Kaydedildi.");
				} else toast.error("Kaydetme Başarısız");
			} catch (err) {
				console.error("setImportantLinkListUpdateAction basarisiz:", err);
				toast.error("Kaydetme Başarısız");
			}
		},
		async setImportantLinkListDeleteAction(id) {
			const toast = useAppToast();
			try {
				if ((await useApi()(`/important/link/delete/${id}`, { method: "DELETE" })).status) {
					const index = this.list.findIndex((x) => x.ID === id);
					if (index > -1) this.list.splice(index, 1);
					toast.success("Başarıyla Silindi.");
				} else toast.error("Silme Başarısız");
			} catch (err) {
				console.error("setImportantLinkListDeleteAction basarisiz:", err);
				toast.error("Silme Başarısız");
			}
		}
	}
});
//#endregion
//#region app/components/sales/ImportantLinksForm.vue
var _sfc_main$1 = {
	props: {
		status: {
			type: Boolean,
			required: true
		},
		model: {
			type: Object,
			required: true
		}
	},
	computed: { importantLinkStore() {
		return useImportantLinkStore();
	} },
	methods: {
		process() {
			if (this.status) this.save(this.model);
			else this.update(this.model);
		},
		save(model) {
			this.importantLinkStore.setImportantLinkListSaveAction(model);
			this.$emit("set_status_button");
		},
		update(model) {
			this.model.SaveDate = /* @__PURE__ */ new Date();
			this.model.UpdatedUserID = useCookie("userId").value;
			this.model.Username = useCookie("username").value;
			this.importantLinkStore.setImportantLinkListUpdateAction(model);
			this.$emit("set_status_button");
		},
		deleted() {
			this.importantLinkStore.setImportantLinkListDeleteAction(this.model.ID);
			this.$emit("set_status_button");
		}
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_FloatLabel = script$4;
	const _component_Textarea = script$5;
	const _component_InputText = script$6;
	const _component_Button = script;
	_push(`<div${ssrRenderAttrs(mergeProps({ style: { "width": "55rem" } }, _attrs))}><div class="row m-auto text-center mt-4"><div class="col-sm-6">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Textarea, {
					id: "description",
					modelValue: $props.model.Description,
					"onUpdate:modelValue": ($event) => $props.model.Description = $event,
					autoResize: true,
					rows: "5",
					cols: "30",
					class: "w-100"
				}, null, _parent, _scopeId));
				_push(`<label for="description"${_scopeId}>Description</label>`);
			} else return [createVNode(_component_Textarea, {
				id: "description",
				modelValue: $props.model.Description,
				"onUpdate:modelValue": ($event) => $props.model.Description = $event,
				autoResize: true,
				rows: "5",
				cols: "30",
				class: "w-100"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "description" }, "Description")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col-sm-6">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "link",
					type: "text",
					modelValue: $props.model.Link,
					"onUpdate:modelValue": ($event) => $props.model.Link = $event,
					class: "w-100"
				}, null, _parent, _scopeId));
				_push(`<label for="link"${_scopeId}>Link</label>`);
			} else return [createVNode(_component_InputText, {
				id: "link",
				type: "text",
				modelValue: $props.model.Link,
				"onUpdate:modelValue": ($event) => $props.model.Link = $event,
				class: "w-100"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "link" }, "Link")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row m-auto text-center mt-4"><div class="${ssrRenderClass($props.status ? "col-sm-12" : "col-sm-6")}">`);
	_push(ssrRenderComponent(_component_Button, {
		severity: $props.status ? "success" : "warn",
		class: "w-100",
		label: $props.status ? "Save" : "Update",
		onClick: $options.process
	}, null, _parent));
	_push(`</div><div class="col-sm-6" style="${ssrRenderStyle(!$props.status ? null : { display: "none" })}">`);
	_push(ssrRenderComponent(_component_Button, {
		severity: "danger",
		class: "w-100",
		label: "Delete",
		onClick: $options.deleted
	}, null, _parent));
	_push(`</div></div></div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sales/ImportantLinksForm.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ImportantLinksForm_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]), { __name: "SalesImportantLinksForm" });
//#endregion
//#region app/pages/sales/important-links.vue
function emptyLink() {
	return {
		ID: 0,
		Description: "",
		Link: "",
		SaveDate: /* @__PURE__ */ new Date(),
		UpdatedUserID: useCookie("userId").value,
		Username: useCookie("username").value
	};
}
var _sfc_main = /*@__PURE__*/ Object.assign({
	computed: { importantLinkStore() {
		return useImportantLinkStore();
	} },
	data() {
		return {
			important_link_dialog: false,
			header: "",
			status: false,
			model: emptyLink()
		};
	},
	methods: {
		setStatusButton() {
			this.status = false;
			this.important_link_dialog = false;
		},
		newForm() {
			this.important_link_dialog = true;
			this.header = "Add New Important Link";
			this.status = true;
			this.model = emptyLink();
		},
		linkListSelected(event) {
			this.important_link_dialog = true;
			this.header = "Update Important Link";
			this.status = false;
			this.model = event.data;
		}
	}
}, {
	__name: "important-links",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const importantLinkStore = useImportantLinkStore();
		[__temp, __restore] = withAsyncContext(() => useAsyncData("sales-important-links", () => importantLinkStore.setImportantLinkListAction(), { server: false })), await __temp, __restore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Button = script;
			const _component_SalesImportantLinksList = ImportantLinksList_default;
			const _component_Dialog = script$1;
			const _component_SalesImportantLinksForm = ImportantLinksForm_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_Button, {
				severity: "success",
				class: "w-100",
				label: "Add",
				onClick: _ctx.newForm
			}, null, _parent));
			_push(ssrRenderComponent(_component_SalesImportantLinksList, {
				list: unref(importantLinkStore).getImportantLinkList,
				onLink_list_selected_emit: ($event) => _ctx.linkListSelected($event)
			}, null, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.important_link_dialog,
				"onUpdate:visible": ($event) => _ctx.important_link_dialog = $event,
				header: _ctx.header,
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_SalesImportantLinksForm, {
						status: _ctx.status,
						model: _ctx.model,
						onSet_status_button: _ctx.setStatusButton
					}, null, _parent, _scopeId));
					else return [createVNode(_component_SalesImportantLinksForm, {
						status: _ctx.status,
						model: _ctx.model,
						onSet_status_button: _ctx.setStatusButton
					}, null, 8, [
						"status",
						"model",
						"onSet_status_button"
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sales/important-links.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=important-links-FyecYgn3.mjs.map
