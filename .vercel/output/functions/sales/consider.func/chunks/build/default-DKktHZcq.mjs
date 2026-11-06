import { _ as _plugin_vue_export_helper_default, q as useAuthStore, s as useNuxtApp, b as useAsyncData, t as ClientOnly, a as useAppToast, N as NuxtLink, u as useCookie, n as navigateTo, l as useAuthorityStore, v as appDiagnostics, c as dateToString, B as BaseStyle } from '../virtual/entry.mjs';
import { B as BaseDirective } from './basedirective-00hguNen.mjs';
import { n as script$1 } from './button-C8Z7Yc79.mjs';
import { n as script$5 } from './column-CT6GXkG2.mjs';
import { n as script$4 } from './datatable-D6ou7HZJ.mjs';
import { t as script$9 } from './select-T8LIeBQG.mjs';
import { n as script$a } from './checkbox-wtvrQjx7.mjs';
import { n as script$8 } from './autocomplete-5Wwvp4c8.mjs';
import { t as script$7 } from './textarea-DHWHHqLi.mjs';
import { n as script$6 } from './floatlabel-BDqo8RCT.mjs';
import { t as toIsoDate } from './dates-C-BBx50j.mjs';
import { n as script$3 } from './dialog-BB6no0wu.mjs';
import { n as script$2 } from './drawer-68lFoiBk.mjs';
import { u as useApi } from './useApi-CGFzrxZs.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { u as useTodoStore } from './todo-CBOtxBPz.mjs';
import { u as useUploadStore } from './upload-CC_Yki8S.mjs';
import { u as useSocketStore } from './socket-AbqLYDWT.mjs';
import script from './toast-CvGuq8HY.mjs';
import { ref, withAsyncContext, unref, withCtx, createTextVNode, mergeProps, createVNode, toDisplayString, useSSRContext } from 'vue';
import { defineStore } from 'pinia';
import { addClass, hasClass, removeClass, createElement } from '@primeuix/utils/dom';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderStyle, ssrGetDirectiveProps, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { uuid } from '@primeuix/utils/uuid';
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
import './basecomponent-CEvq-Ypu.mjs';
import './rolldown-runtime-D7D4PA-g.mjs';
import './spinner-Bg9uPPDs.mjs';
import './baseicon-COIgioD1.mjs';
import './badge-Djy3ODAc.mjs';
import './ripple-BAuDWuPF.mjs';
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
import './chip--BHyxaU9.mjs';
import './timescircle-0itGCn-i.mjs';
import './utils-9fKJJYP7.mjs';
import './useLegacyApi-B5zRc7ig.mjs';
import './infocircle-BE1cxcAU.mjs';

//#region app/components/todoByUsername/List.vue
var _sfc_main$5 = {
	props: { list: {
		type: Array,
		required: false
	} },
	emits: ["to_do_list_selected_emit", "todo_done_emit"],
	data() {
		return { selectedTodo: null };
	},
	methods: { rowClass(event) {
		return event.Acil ? "red-row" : "";
	} }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_DataTable = script$4;
	const _component_Column = script$5;
	const _component_Button = script$1;
	_push(`<div${ssrRenderAttrs(_attrs)} data-v-a5023581>`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $props.list,
		scrollable: "",
		scrollHeight: "var(--app-table-height)",
		selection: $data.selectedTodo,
		"onUpdate:selection": ($event) => $data.selectedTodo = $event,
		selectionMode: "single",
		onRowClick: ($event) => _ctx.$emit("to_do_list_selected_emit", $event),
		sortField: "Acil",
		sortOrder: -1,
		rowClass: $options.rowClass
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "Yapilacak",
					header: "Assignment",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "GirisTarihi",
					header: "Date",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.GirisTarihi))}`);
						else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.GirisTarihi)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "YapilacakOncelik",
					header: "Priority",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_Button, {
							type: "button",
							severity: "info",
							label: "Done",
							onClick: ($event) => _ctx.$emit("todo_done_emit", slotProps.data)
						}, null, _parent, _scopeId));
						else return [createVNode(_component_Button, {
							type: "button",
							severity: "info",
							label: "Done",
							onClick: ($event) => _ctx.$emit("todo_done_emit", slotProps.data)
						}, null, 8, ["onClick"])];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "Yapilacak",
					header: "Assignment",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "GirisTarihi",
					header: "Date",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.GirisTarihi)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "YapilacakOncelik",
					header: "Priority",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createVNode(_component_Button, {
						type: "button",
						severity: "info",
						label: "Done",
						onClick: ($event) => _ctx.$emit("todo_done_emit", slotProps.data)
					}, null, 8, ["onClick"])]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div>`);
}
var _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/todoByUsername/List.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var List_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$5, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-a5023581"]]), { __name: "TodoByUsernameList" });
//#endregion
//#region app/components/todoByUsername/Form.vue
var _sfc_main$4 = {
	props: {
		model: {
			type: Object,
			required: true
		},
		users: {
			type: Array,
			required: true
		},
		status: {
			type: Boolean,
			required: true
		}
	},
	emits: ["process", "deleteProcess"],
	data() {
		return {
			selectedUsers: [],
			filteredUsers: null,
			priorities: [
				{ priority: "A" },
				{ priority: "B" },
				{ priority: "C" }
			],
			selectedPriority: null
		};
	},
	created() {
		if (!this.status) this.createdProcess();
	},
	methods: {
		confirmedDelete() {
			this.$emit("deleteProcess", this.model);
		},
		createdProcess() {
			this.selectedPriority = this.priorities.find((x) => x.priority == this.model.YapilacakOncelik);
			const names = String(this.model.OrtakGorev ?? "").split(",").filter(Boolean);
			for (const name of names) {
				const user = this.users.find((y) => y.KullaniciAdi == name);
				if (user) this.selectedUsers.push(user);
			}
		},
		__stringCharacterChange(event) {
			const data = String(event ?? "").split("'");
			let value = "";
			data.forEach((x) => {
				value += x + "''";
			});
			return value.substring(0, value.length - 2);
		},
		process() {
			this.model.OrtakGorev = this.selectedUsers.filter(Boolean).map((u) => u.KullaniciAdi).join(",");
			this.model.CustomYapilacak = this.__stringCharacterChange(this.model.Yapilacak);
			this.$emit("process", this.model);
		},
		priorityChanged(event) {
			this.model.YapilacakOncelik = event.value.priority;
		},
		searchUsers(event) {
			const query = event.query ?? "";
			this.filteredUsers = query.length === 0 ? this.users : this.users.filter((x) => x.KullaniciAdi.toLowerCase().startsWith(query.toLowerCase()));
		}
	}
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_FloatLabel = script$6;
	const _component_Textarea = script$7;
	const _component_AutoComplete = script$8;
	const _component_Select = script$9;
	const _component_Checkbox = script$a;
	const _component_Button = script$1;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-4" }, _attrs))}>`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Textarea, {
					modelValue: $props.model.Yapilacak,
					"onUpdate:modelValue": ($event) => $props.model.Yapilacak = $event,
					rows: "5",
					class: "w-full"
				}, null, _parent, _scopeId));
				_push(`<label${_scopeId}>Assignment</label>`);
			} else return [createVNode(_component_Textarea, {
				modelValue: $props.model.Yapilacak,
				"onUpdate:modelValue": ($event) => $props.model.Yapilacak = $event,
				rows: "5",
				class: "w-full"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Assignment")];
		}),
		_: 1
	}, _parent));
	_push(`<div class="row mt-3"><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedUsers,
					"onUpdate:modelValue": ($event) => $data.selectedUsers = $event,
					inputId: "users",
					suggestions: $data.filteredUsers,
					onComplete: ($event) => $options.searchUsers($event),
					optionLabel: "KullaniciAdi",
					multiple: true
				}, null, _parent, _scopeId));
				_push(`<label for="users"${_scopeId}>Assignee</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedUsers,
				"onUpdate:modelValue": ($event) => $data.selectedUsers = $event,
				inputId: "users",
				suggestions: $data.filteredUsers,
				onComplete: ($event) => $options.searchUsers($event),
				optionLabel: "KullaniciAdi",
				multiple: true
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete"
			]), createVNode("label", { for: "users" }, "Assignee")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Select, {
					modelValue: $data.selectedPriority,
					"onUpdate:modelValue": ($event) => $data.selectedPriority = $event,
					inputId: "priority",
					options: $data.priorities,
					optionLabel: "priority",
					class: "w-full md:w-14rem",
					onChange: ($event) => $options.priorityChanged($event)
				}, null, _parent, _scopeId));
				_push(`<label for="priority"${_scopeId}>Priority</label>`);
			} else return [createVNode(_component_Select, {
				modelValue: $data.selectedPriority,
				"onUpdate:modelValue": ($event) => $data.selectedPriority = $event,
				inputId: "priority",
				options: $data.priorities,
				optionLabel: "priority",
				class: "w-full md:w-14rem",
				onChange: ($event) => $options.priorityChanged($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"options",
				"onChange"
			]), createVNode("label", { for: "priority" }, "Priority")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col"><div class="flex align-items-center">`);
	_push(ssrRenderComponent(_component_Checkbox, {
		modelValue: $props.model.Acil,
		"onUpdate:modelValue": ($event) => $props.model.Acil = $event,
		inputId: "urgent",
		binary: true
	}, null, _parent));
	_push(`<label for="urgent" class="ml-2"> Urgent </label></div></div></div><div class="row mt-3"><div class="col">`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "success",
		class: "w-full",
		label: "Save",
		onClick: $options.process
	}, null, _parent));
	_push(`</div>`);
	if (!$props.status) {
		_push(`<div class="col">`);
		_push(ssrRenderComponent(_component_Button, {
			type: "button",
			severity: "danger",
			class: "w-full",
			label: "Delete",
			onClick: $options.confirmedDelete
		}, null, _parent));
		_push(`</div>`);
	} else _push(`<!---->`);
	_push(`</div></div>`);
}
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/todoByUsername/Form.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var Form_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3]]), { __name: "TodoByUsernameForm" });
//#endregion
//#region app/components/upload/MissingList.vue
var _sfc_main$3 = {
	props: { list: {
		type: Array,
		required: false,
		default: () => []
	} },
	emits: ["missing_document_selected_emit"]
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(_attrs)} data-v-1fdd1628>`);
	if ($props.list.length == 0) _push(`<div class="missing-empty" data-v-1fdd1628><i class="pi pi-check-circle" data-v-1fdd1628></i><span data-v-1fdd1628>Eksik zorunlu evrak yok.</span></div>`);
	else {
		_push(`<div data-v-1fdd1628><!--[-->`);
		ssrRenderList($props.list, (order) => {
			_push(`<div class="missing-card" data-v-1fdd1628><div class="missing-card-top" data-v-1fdd1628><span class="missing-po" data-v-1fdd1628>${ssrInterpolate(order.SiparisNo)}</span>`);
			if (order.TeslimTur) _push(`<span class="missing-tag" data-v-1fdd1628>${ssrInterpolate(order.TeslimTur)}</span>`);
			else _push(`<!---->`);
			_push(`<span class="missing-count" data-v-1fdd1628>${ssrInterpolate(order.EksikSayi)}</span></div><div class="missing-customer" data-v-1fdd1628>${ssrInterpolate(order.MusteriAdi)}</div><div class="missing-meta" data-v-1fdd1628>${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(order.YuklemeTarihi))} `);
			if (order.Sorumlu) _push(`<!--[--> · ${ssrInterpolate(order.Sorumlu)}<!--]-->`);
			else _push(`<!---->`);
			_push(`</div><div class="missing-chips" data-v-1fdd1628><!--[-->`);
			ssrRenderList(order.EksikEvraklar, (document) => {
				_push(`<span class="missing-chip" data-v-1fdd1628>${ssrInterpolate(document.EvrakAdi)}</span>`);
			});
			_push(`<!--]--></div></div>`);
		});
		_push(`<!--]--></div>`);
	}
	_push(`</div>`);
}
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/upload/MissingList.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var MissingList_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-1fdd1628"]]), { __name: "UploadMissingList" });
//#endregion
//#region node_modules/primevue/badgedirective/style/index.mjs
var BadgeDirectiveStyle = BaseStyle.extend({
	name: "badge-directive",
	classes: { root: "p-badge p-component" }
});
//#endregion
//#region node_modules/primevue/badgedirective/index.mjs
var BaseBadgeDirective = BaseDirective.extend({ style: BadgeDirectiveStyle });
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), true).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: true,
		configurable: true,
		writable: true
	}) : e[r] = t, e;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r);
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var BadgeDirective = BaseBadgeDirective.extend("badge", {
	mounted: function mounted(el, binding) {
		console.warn("Deprecated since v4. Use OverlayBadge component instead.");
		var id = uuid("pv_id") + "_badge";
		var badge = createElement("span", _defineProperty(_defineProperty({
			id,
			"class": !this.isUnstyled() && this.cx("root")
		}, this.$attrSelector, ""), "p-bind", this.ptm("root", { context: _objectSpread(_objectSpread({}, binding.modifiers), {}, {
			nogutter: String(binding.value).length === 1,
			dot: binding.value == null
		}) })));
		el.$_pbadgeId = badge.getAttribute("id");
		for (var modifier in binding.modifiers) !this.isUnstyled() && addClass(badge, "p-badge-" + modifier);
		if (binding.value != null) {
			if (_typeof(binding.value) === "object") el.$_badgeValue = binding.value.value;
			else el.$_badgeValue = binding.value;
			badge.appendChild((void 0).createTextNode(el.$_badgeValue));
			if (String(el.$_badgeValue).length === 1 && !this.isUnstyled()) !this.isUnstyled() && addClass(badge, "p-badge-circle");
		} else !this.isUnstyled() && addClass(badge, "p-badge-dot");
		el.setAttribute("data-pd-badge", true);
		!this.isUnstyled() && addClass(el, "p-overlay-badge");
		el.setAttribute("data-p-overlay-badge", "true");
		el.appendChild(badge);
		this.$el = badge;
	},
	updated: function updated(el, binding) {
		!this.isUnstyled() && addClass(el, "p-overlay-badge");
		el.setAttribute("data-p-overlay-badge", "true");
		if (binding.oldValue !== binding.value) {
			var badge = (void 0).getElementById(el.$_pbadgeId);
			if (_typeof(binding.value) === "object") el.$_badgeValue = binding.value.value;
			else el.$_badgeValue = binding.value;
			if (!this.isUnstyled()) {
				if (el.$_badgeValue) {
					if (hasClass(badge, "p-badge-dot")) removeClass(badge, "p-badge-dot");
					if (el.$_badgeValue.length === 1) addClass(badge, "p-badge-circle");
					else removeClass(badge, "p-badge-circle");
				} else if (!el.$_badgeValue && !hasClass(badge, "p-badge-dot")) addClass(badge, "p-badge-dot");
			}
			badge.innerHTML = "";
			badge.appendChild((void 0).createTextNode(el.$_badgeValue));
		}
	}
});
//#endregion
//#region app/components/shared/Navbar.vue
var _sfc_main$2 = {
	computed: {
		auth() {
			return useAuthStore();
		},
		authority() {
			return useAuthorityStore();
		},
		shared() {
			return useSharedStore();
		},
		todo() {
			return useTodoStore();
		},
		upload() {
			return useUploadStore();
		},
		getToDoMainListByUsername() {
			return this.todo.getToDoMainListByUsername;
		},
		getToDoMainListByUsernameLenght() {
			return this.todo.getToDoMainListByUsernameLenght;
		},
		getTodoModel() {
			return this.todo.getTodoModel;
		},
		getTodoMainListByUsernameButtonStatus() {
			return this.todo.getTodoMainListByUsernameButtonStatus;
		},
		getUserList() {
			return this.shared.getUserList;
		},
		getAuthorityStatus() {
			return this.authority.getAuthorityStatus;
		},
		isAuthenticated() {
			return this.auth.isAuthenticated;
		},
		getUserId() {
			return this.auth.getUserId;
		},
		getAyoStatus() {
			return this.auth.getAyoStatus;
		},
		getMissingDocumentList() {
			return this.upload.getMissingDocumentList;
		},
		getMissingDocumentOrderCount() {
			return this.upload.getMissingDocumentOrderCount;
		},
		isLoggedIn() {
			return (this.isAuthenticated !== void 0 ? this.isAuthenticated : false) || !!this.userId;
		},
		canSeePasswords() {
			const id = parseInt(this.getUserId ?? this.userId, 10);
			return [19, 47].includes(id);
		}
	},
	data() {
		return {
			userId: null,
			visibleRight: false,
			missing_document_visible: false,
			to_do_form: false,
			model: {}
		};
	},
	created() {
		this.userId = useCookie("userId").value || null;
	},
	mounted() {
		this.userId = useCookie("userId").value || null;
		this.loadTodoList();
		this.loadMissingDocumentCount();
	},
	watch: { isLoggedIn(loggedIn) {
		if (!loggedIn) return;
		this.loadTodoList();
		this.loadMissingDocumentCount();
	} },
	methods: {
		loadTodoList() {
			if (!this.isLoggedIn) return;
			this.todo.setToDoListByUsername();
		},
		loadMissingDocumentCount() {
			if (!this.isLoggedIn) return;
			this.upload.setMissingDocumentOrderCount();
		},
		missingDocumentOpen() {
			this.upload.setMissingDocumentList();
			this.missing_document_visible = true;
		},
		missingDocumentSelected(event) {
			this.missing_document_visible = false;
			return navigateTo({
				path: "/operation/uploadform",
				query: { po: event.SiparisNo }
			});
		},
		async logout() {
			if (!confirm("Are you sure you want to log out?")) return;
			this.auth.logout();
			this.userId = null;
			this.authority.setAuthorityNavbarStatus(false);
			await navigateTo("/auth");
		},
		__stringCharacterChange(event) {
			const data = String(event ?? "").split("'");
			let value = "";
			data.forEach((x) => {
				value += x + "''";
			});
			return value.substring(0, value.length - 2);
		},
		todoDone(event) {
			event.YapildiTarihi = toIsoDate(/* @__PURE__ */ new Date());
			this.todo.setTodoDone(event);
		},
		deleteProcess(event) {
			this.todo.setTodoDelete(event.ID);
			this.to_do_form = false;
		},
		toDoListSelected(event) {
			this.todo.setTodoMainListByUsernameButtonStatus(false);
			this.model = event.data;
			this.to_do_form = true;
		},
		update(event) {
			event.CustomYapilacak = this.__stringCharacterChange(event.Yapilacak);
			this.todo.setTodoUpdate(event);
			this.to_do_form = false;
		},
		save(event) {
			event.GorevVerenID = useCookie("userId").value;
			event.GorevVerenAdi = useCookie("username").value;
			event.GirisTarihi = toIsoDate(/* @__PURE__ */ new Date());
			event.CustomYapilacak = this.__stringCharacterChange(event.Yapilacak);
			this.todo.setTodoSave(event);
			this.to_do_form = false;
		},
		process(event) {
			if (this.getTodoMainListByUsernameButtonStatus) this.save(event);
			else this.update(event);
		},
		newForm() {
			this.todo.setTodoMainListByUsernameButtonStatus(true);
			this.todo.setToDoModel();
			this.model = this.getTodoModel;
			this.to_do_form = true;
		}
	}
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_NuxtLink = NuxtLink;
	const _component_Button = script$1;
	const _component_Drawer = script$2;
	const _component_todoByUsernameList = List_default;
	const _component_Dialog = script$3;
	const _component_todoByUsernameForm = Form_default;
	const _component_uploadMissingList = MissingList_default;
	const _directive_badge = BadgeDirective;
	let _temp0, _temp1;
	if ($options.isLoggedIn) {
		_push(`<div${ssrRenderAttrs(_attrs)} data-v-118f3a76>`);
		if (!$options.getAuthorityStatus) {
			_push(`<nav class="navbar navbar-expand-lg bg-body-tertiary" style="${ssrRenderStyle({ "font-size": "100%" })}" data-bs-theme="blue" data-v-118f3a76><div class="container-fluid" data-v-118f3a76><a class="navbar-brand" href="/" data-v-118f3a76>GOZ</a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" data-v-118f3a76><span class="navbar-toggler-icon" data-v-118f3a76></span></button><div class="collapse navbar-collapse" id="navbarNav" data-v-118f3a76><ul class="navbar-nav" data-v-118f3a76><li class="nav-item" style="${ssrRenderStyle($options.getAuthorityStatus ? null : { display: "none" })}" data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/selection/input",
				class: "nav-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`SELECTION`);
					else return [createTextVNode("SELECTION")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li class="nav-item" style="${ssrRenderStyle(!$options.getAuthorityStatus ? null : { display: "none" })}" data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "nav-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`HOME`);
					else return [createTextVNode("HOME")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li class="nav-item dropdown" style="${ssrRenderStyle(!$options.getAuthorityStatus ? null : { display: "none" })}" data-v-118f3a76><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-118f3a76> ORDERS </a><ul class="dropdown-menu" data-v-118f3a76><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/orders/production",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Production`);
					else return [createTextVNode("Production")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/orders/shipped",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Shipped`);
					else return [createTextVNode("Shipped")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/orders/waiting",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`On Hold`);
					else return [createTextVNode("On Hold")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul></li><li class="nav-item dropdown" style="${ssrRenderStyle(!$options.getAuthorityStatus ? null : { display: "none" })}" data-v-118f3a76><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-118f3a76> SALES </a><ul class="dropdown-menu" data-v-118f3a76><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/sales/todo",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`To Do`);
					else return [createTextVNode("To Do")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/sales/representative",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Sales &amp; Operation`);
					else return [createTextVNode("Sales & Operation")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/sales/follow",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Customer Notes`);
					else return [createTextVNode("Customer Notes")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/sales/bgp",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`BGP Projects`);
					else return [createTextVNode("BGP Projects")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/sales/consider",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Points to Consider`);
					else return [createTextVNode("Points to Consider")];
				}),
				_: 1
			}, _parent));
			_push(`</li>`);
			if ($options.canSeePasswords) {
				_push(`<li data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/passwords",
					class: "dropdown-item"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Passwords`);
						else return [createTextVNode("Passwords")];
					}),
					_: 1
				}, _parent));
				_push(`</li>`);
			} else _push(`<!---->`);
			_push(`<li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/sales/important-links",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Important Links`);
					else return [createTextVNode("Important Links")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul></li><li class="nav-item dropdown" style="${ssrRenderStyle(!$options.getAuthorityStatus ? null : { display: "none" })}" data-v-118f3a76><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-118f3a76> SELECTION </a><ul class="dropdown-menu" data-v-118f3a76><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/selection/input",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Entry`);
					else return [createTextVNode("Entry")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/selection/size",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Crate Size`);
					else return [createTextVNode("Crate Size")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/container",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Container Calculator`);
					else return [createTextVNode("Container Calculator")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul></li><li class="nav-item" style="${ssrRenderStyle(!$options.getAuthorityStatus ? null : { display: "none" })}" data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/finance",
				class: "nav-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`FINANCE`);
					else return [createTextVNode("FINANCE")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li class="nav-item dropdown" style="${ssrRenderStyle(!$options.getAuthorityStatus ? null : { display: "none" })}" data-v-118f3a76><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-118f3a76> OPERATION </a><ul class="dropdown-menu" data-v-118f3a76><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/operation/cards",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Product Data`);
					else return [createTextVNode("Product Data")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/operation/supplier",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Suppliers`);
					else return [createTextVNode("Suppliers")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/operation/shipment",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Dispatch`);
					else return [createTextVNode("Dispatch")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/operation/uploadform",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Shipment Form`);
					else return [createTextVNode("Shipment Form")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/operation/follow",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Container Tracking`);
					else return [createTextVNode("Container Tracking")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/operation/unfollow",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Shipped Containers`);
					else return [createTextVNode("Shipped Containers")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/operation/transport",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Shipment Costs`);
					else return [createTextVNode("Shipment Costs")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/operation/transportlist",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Shipment Invoices`);
					else return [createTextVNode("Shipment Invoices")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/operation/container",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`FOB Costs`);
					else return [createTextVNode("FOB Costs")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/operation/containerlist",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`FOB Invoices`);
					else return [createTextVNode("FOB Invoices")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul></li><li class="nav-item dropdown" style="${ssrRenderStyle(!$options.getAuthorityStatus ? null : { display: "none" })}" data-v-118f3a76><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-118f3a76> CUSTOMERS </a><ul class="dropdown-menu" data-v-118f3a76><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/customer/mekmar",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Sale Customers`);
					else return [createTextVNode("Sale Customers")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/customer/offer",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Quote Customers`);
					else return [createTextVNode("Quote Customers")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/customer/bgp",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`BGP Customer`);
					else return [createTextVNode("BGP Customer")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/customer/fair",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Expo Customers`);
					else return [createTextVNode("Expo Customers")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/customer/selection",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Selection`);
					else return [createTextVNode("Selection")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul></li><li class="nav-item dropdown" data-v-118f3a76><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-118f3a76> MEKMER </a><ul class="dropdown-menu" data-v-118f3a76><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmer/production",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Production Crates`);
					else return [createTextVNode("Production Crates")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmer/stock",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Stock Report`);
					else return [createTextVNode("Stock Report")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmer/mine",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Quarry Info`);
					else return [createTextVNode("Quarry Info")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmer/productions",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Production`);
					else return [createTextVNode("Production")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmer/shipped",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Shipped`);
					else return [createTextVNode("Shipped")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmer/onhold",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`On Hold`);
					else return [createTextVNode("On Hold")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmer/finance",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Finance`);
					else return [createTextVNode("Finance")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmer/new-mekmer-finance",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Mekmer Alış Finans`);
					else return [createTextVNode("Mekmer Alış Finans")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li style="${ssrRenderStyle($options.getAuthorityStatus ? null : { display: "none" })}" data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmer/by-buying-production",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Product Purchase`);
					else return [createTextVNode("Product Purchase")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li style="${ssrRenderStyle($options.getAuthorityStatus ? null : { display: "none" })}" data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmar/forwarding",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Shipped Crates`);
					else return [createTextVNode("Shipped Crates")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmer/strips",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Stripler`);
					else return [createTextVNode("Stripler")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmer/calculating-cost",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Muhasebe`);
					else return [createTextVNode("Muhasebe")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul></li><li class="nav-item dropdown" style="${ssrRenderStyle(!$options.getAuthorityStatus ? null : { display: "none" })}" data-v-118f3a76><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-118f3a76> MEKMAR REPORTS </a><ul class="dropdown-menu" data-v-118f3a76><li style="${ssrRenderStyle($options.getAyoStatus ? null : { display: "none" })}" data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmar/ayo",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`AYO`);
					else return [createTextVNode("AYO")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmar/loading",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`List of Shipments`);
					else return [createTextVNode("List of Shipments")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmar/forwarding",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Shipped Crates`);
					else return [createTextVNode("Shipped Crates")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmar/summary",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Order Summary`);
					else return [createTextVNode("Order Summary")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmar/mk",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`MK Reports`);
					else return [createTextVNode("MK Reports")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li style="${ssrRenderStyle($options.getAyoStatus ? null : { display: "none" })}" data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmar/gu",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Reports`);
					else return [createTextVNode("Reports")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li style="${ssrRenderStyle($options.getAyoStatus ? null : { display: "none" })}" data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmar/filter-finance",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Finance`);
					else return [createTextVNode("Finance")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li style="${ssrRenderStyle($options.getAyoStatus ? null : { display: "none" })}" data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmar/country-order",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Country Orders`);
					else return [createTextVNode("Country Orders")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li style="${ssrRenderStyle($options.getAyoStatus ? null : { display: "none" })}" data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmar/supplier-cost",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Supplier Cost`);
					else return [createTextVNode("Supplier Cost")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li style="${ssrRenderStyle($options.getAyoStatus ? null : { display: "none" })}" data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reports/mekmar/continent-order",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Continent Orders`);
					else return [createTextVNode("Continent Orders")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul></li><li class="nav-item dropdown" style="${ssrRenderStyle(!$options.getAuthorityStatus ? null : { display: "none" })}" data-v-118f3a76><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-118f3a76> SAMPLE </a><ul class="dropdown-menu" data-v-118f3a76><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/sample/sample",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Sample List`);
					else return [createTextVNode("Sample List")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/sample/finance",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Sample Finance`);
					else return [createTextVNode("Sample Finance")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul></li><li class="nav-item" style="${ssrRenderStyle(!$options.getAuthorityStatus ? null : { display: "none" })}" data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/offers",
				class: "nav-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`QUOTES`);
					else return [createTextVNode("QUOTES")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li class="nav-item dropdown" style="${ssrRenderStyle(!$options.getAuthorityStatus ? null : { display: "none" })}" data-v-118f3a76><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-118f3a76> W. PANEL </a><ul class="dropdown-menu" data-v-118f3a76><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/panel/products/published",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Products (Published)`);
					else return [createTextVNode("Products (Published)")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/panel/products/notpublished",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Products (Unpublished)`);
					else return [createTextVNode("Products (Unpublished)")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/panel/project",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Projects`);
					else return [createTextVNode("Projects")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/panel/products/queue",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Product Queue`);
					else return [createTextVNode("Product Queue")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/panel/usa",
				class: "dropdown-item"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`USA Panel`);
					else return [createTextVNode("USA Panel")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul></li></ul></div><div class="d-flex" style="${ssrRenderStyle(!$options.getAuthorityStatus ? null : { display: "none" })}" data-v-118f3a76><div data-v-118f3a76>`);
			_push(ssrRenderComponent(_component_Button, {
				severity: "danger",
				class: "mr-5",
				label: "Logout",
				onClick: $options.logout
			}, null, _parent));
			_push(`</div><i${ssrRenderAttrs(_temp0 = mergeProps({
				class: "pi pi-calendar",
				style: {
					"font-size": "2rem",
					"cursor": "pointer"
				}
			}, ssrGetDirectiveProps(_ctx, _directive_badge, parseInt($options.getToDoMainListByUsernameLenght), void 0, { danger: true })))} data-v-118f3a76>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : _temp0.innerHTML ?? ""}</i>`);
			_push(ssrRenderComponent(_component_Drawer, {
				visible: $data.visibleRight,
				"onUpdate:visible": ($event) => $data.visibleRight = $event,
				header: "Right Sidebar",
				position: "right",
				class: "w-50 md:w-20rem lg:w-30rem"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_Button, {
							type: "button",
							class: "w-100",
							severity: "success",
							label: "New",
							onClick: $options.newForm
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_todoByUsernameList, {
							list: $options.getToDoMainListByUsername,
							onTo_do_list_selected_emit: ($event) => $options.toDoListSelected($event),
							onTodo_done_emit: ($event) => $options.todoDone($event)
						}, null, _parent, _scopeId));
					} else return [createVNode(_component_Button, {
						type: "button",
						class: "w-100",
						severity: "success",
						label: "New",
						onClick: $options.newForm
					}, null, 8, ["onClick"]), createVNode(_component_todoByUsernameList, {
						list: $options.getToDoMainListByUsername,
						onTo_do_list_selected_emit: ($event) => $options.toDoListSelected($event),
						onTodo_done_emit: ($event) => $options.todoDone($event)
					}, null, 8, [
						"list",
						"onTo_do_list_selected_emit",
						"onTodo_done_emit"
					])];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: $data.to_do_form,
				"onUpdate:visible": ($event) => $data.to_do_form = $event,
				header: "",
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_todoByUsernameForm, {
						model: $data.model,
						users: $options.getUserList,
						status: $options.getTodoMainListByUsernameButtonStatus,
						onProcess: ($event) => $options.process($event),
						onDeleteProcess: ($event) => $options.deleteProcess($event)
					}, null, _parent, _scopeId));
					else return [createVNode(_component_todoByUsernameForm, {
						model: $data.model,
						users: $options.getUserList,
						status: $options.getTodoMainListByUsernameButtonStatus,
						onProcess: ($event) => $options.process($event),
						onDeleteProcess: ($event) => $options.deleteProcess($event)
					}, null, 8, [
						"model",
						"users",
						"status",
						"onProcess",
						"onDeleteProcess"
					])];
				}),
				_: 1
			}, _parent));
			_push(`<i${ssrRenderAttrs(_temp1 = mergeProps({
				class: "pi pi-file-excel ml-4",
				style: {
					"font-size": "2rem",
					"cursor": "pointer"
				},
				title: "Eksik Yükleme Evrakları"
			}, ssrGetDirectiveProps(_ctx, _directive_badge, parseInt($options.getMissingDocumentOrderCount), void 0, { danger: true })))} data-v-118f3a76>${"textContent" in _temp1 ? ssrInterpolate(_temp1.textContent) : _temp1.innerHTML ?? ""}</i>`);
			_push(ssrRenderComponent(_component_Drawer, {
				visible: $data.missing_document_visible,
				"onUpdate:visible": ($event) => $data.missing_document_visible = $event,
				header: "Eksik Yükleme Evrakları",
				position: "right",
				class: "w-50 md:w-20rem lg:w-30rem"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_uploadMissingList, {
						list: $options.getMissingDocumentList,
						onMissing_document_selected_emit: ($event) => $options.missingDocumentSelected($event)
					}, null, _parent, _scopeId));
					else return [createVNode(_component_uploadMissingList, {
						list: $options.getMissingDocumentList,
						onMissing_document_selected_emit: ($event) => $options.missingDocumentSelected($event)
					}, null, 8, ["list", "onMissing_document_selected_emit"])];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></nav>`);
		} else {
			_push(`<nav class="navbar navbar-expand-lg bg-body-tertiary" style="${ssrRenderStyle({ "font-size": "100%" })}" data-bs-theme="blue" data-v-118f3a76>`);
			if ($options.getUserId == 62) {
				_push(`<div class="container-fluid" data-v-118f3a76><a class="navbar-brand" href="/" data-v-118f3a76>GOZ</a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" data-v-118f3a76><span class="navbar-toggler-icon" data-v-118f3a76></span></button><div class="collapse navbar-collapse" id="navbarNav" data-v-118f3a76><ul class="navbar-nav" data-v-118f3a76><li class="nav-item dropdown" data-v-118f3a76><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-118f3a76> Yükleme </a><ul class="dropdown-menu" data-v-118f3a76><li data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/reports/mekmer/shipped",
					class: "dropdown-item"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Yüklenen`);
						else return [createTextVNode("Yüklenen")];
					}),
					_: 1
				}, _parent));
				_push(`</li><li data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/reports/mekmar/forwarding",
					class: "dropdown-item"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Yükleme Raporu`);
						else return [createTextVNode("Yükleme Raporu")];
					}),
					_: 1
				}, _parent));
				_push(`</li></ul></li></ul></div></div>`);
			} else {
				_push(`<div class="container-fluid" data-v-118f3a76><a class="navbar-brand" href="/" data-v-118f3a76>GOZ</a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" data-v-118f3a76><span class="navbar-toggler-icon" data-v-118f3a76></span></button><div class="collapse navbar-collapse" id="navbarNav" data-v-118f3a76><ul class="navbar-nav" data-v-118f3a76><li class="nav-item dropdown" data-v-118f3a76><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-118f3a76> Mekmar Siparişler </a><ul class="dropdown-menu" data-v-118f3a76><li data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/orders/production",
					class: "dropdown-item"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Production`);
						else return [createTextVNode("Production")];
					}),
					_: 1
				}, _parent));
				_push(`</li><li data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/orders/shipped",
					class: "dropdown-item"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Shipped`);
						else return [createTextVNode("Shipped")];
					}),
					_: 1
				}, _parent));
				_push(`</li><li data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/orders/waiting",
					class: "dropdown-item"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`On Hold`);
						else return [createTextVNode("On Hold")];
					}),
					_: 1
				}, _parent));
				_push(`</li></ul></li><li class="nav-item" data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/reports/mekmer/productions",
					class: "nav-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Siparişler`);
						else return [createTextVNode("Siparişler")];
					}),
					_: 1
				}, _parent));
				_push(`</li><li class="nav-item" data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/reports/mekmer/production",
					class: "nav-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Üretim Raporu`);
						else return [createTextVNode("Üretim Raporu")];
					}),
					_: 1
				}, _parent));
				_push(`</li><li class="nav-item dropdown" data-v-118f3a76><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-118f3a76> Seleksiyon </a><ul class="dropdown-menu" data-v-118f3a76><li data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/selection/input",
					class: "dropdown-item"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Stok`);
						else return [createTextVNode("Stok")];
					}),
					_: 1
				}, _parent));
				_push(`</li><li data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/reports/mekmer/stock",
					class: "dropdown-item"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Stok Raporu`);
						else return [createTextVNode("Stok Raporu")];
					}),
					_: 1
				}, _parent));
				_push(`</li></ul></li><li class="nav-item dropdown" data-v-118f3a76><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-v-118f3a76> Yükleme </a><ul class="dropdown-menu" data-v-118f3a76><li data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/reports/mekmer/shipped",
					class: "dropdown-item"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Yüklenen`);
						else return [createTextVNode("Yüklenen")];
					}),
					_: 1
				}, _parent));
				_push(`</li><li data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/reports/mekmar/forwarding",
					class: "dropdown-item"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Yükleme Raporu`);
						else return [createTextVNode("Yükleme Raporu")];
					}),
					_: 1
				}, _parent));
				_push(`</li></ul></li><li class="nav-item" data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/reports/mekmer/finance",
					class: "nav-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Cari (Finans)`);
						else return [createTextVNode("Cari (Finans)")];
					}),
					_: 1
				}, _parent));
				_push(`</li><li class="nav-item" data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/reports/mekmer/by-buying-production",
					class: "nav-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Kasa Satış Fiyatı`);
						else return [createTextVNode("Kasa Satış Fiyatı")];
					}),
					_: 1
				}, _parent));
				_push(`</li><li class="nav-item" data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/reports/mekmer/calculating-cost",
					class: "nav-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Muhasebe`);
						else return [createTextVNode("Muhasebe")];
					}),
					_: 1
				}, _parent));
				_push(`</li><li class="nav-item" data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/reports/mekmer/strips",
					class: "nav-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Strip &amp; Moloz`);
						else return [createTextVNode("Strip & Moloz")];
					}),
					_: 1
				}, _parent));
				_push(`</li><li class="nav-item" data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/operation/shipment",
					class: "nav-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Sevk Et`);
						else return [createTextVNode("Sevk Et")];
					}),
					_: 1
				}, _parent));
				_push(`</li><li class="nav-item" data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/reports/mekmer/new-mekmer-finance",
					class: "nav-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Mekmer Finans`);
						else return [createTextVNode("Mekmer Finans")];
					}),
					_: 1
				}, _parent));
				_push(`</li><li class="nav-item" data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/operation/cards",
					class: "nav-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Product Data`);
						else return [createTextVNode("Product Data")];
					}),
					_: 1
				}, _parent));
				_push(`</li><li class="nav-item" data-v-118f3a76>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/customer/mekmar",
					class: "nav-link"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Sale Customers`);
						else return [createTextVNode("Sale Customers")];
					}),
					_: 1
				}, _parent));
				_push(`</li></ul></div></div>`);
			}
			_push(`</nav>`);
		}
		_push(`</div>`);
	} else _push(`<!---->`);
}
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/Navbar.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var Navbar_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-118f3a76"]]), { __name: "SharedNavbar" });
//#endregion
//#region node_modules/nuxt/dist/app/compat/interval.js
var setInterval = (() => {
	appDiagnostics.NUXT_E1004();
});
//#endregion
//#region app/stores/chat.ts
var BILDIRIM_BEKLEME_MS = 3e5;
var sonBildirim = /* @__PURE__ */ new Map();
var useChatStore = defineStore("chat", {
	state: () => ({
		users: [],
		online: [],
		aktiflik: {},
		activeUserId: null,
		messages: [],
		loadingHistory: false,
		dahaVar: false,
		ready: true,
		dosyaReady: false,
		panelOpen: false,
		baglandi: false
	}),
	getters: {
		getChatUsers: (state) => state.users,
		getChatOnline: (state) => state.online,
		getChatAktiflik: (state) => state.aktiflik,
		getChatActiveUserId: (state) => state.activeUserId,
		getChatMessages: (state) => state.messages,
		getChatLoadingHistory: (state) => state.loadingHistory,
		getChatDahaVar: (state) => state.dahaVar,
		getChatReady: (state) => state.ready,
		getChatDosyaReady: (state) => state.dosyaReady,
		getChatPanelOpen: (state) => state.panelOpen,
		getChatUnreadTotal: (state) => state.users.reduce((acc, u) => acc + (Number(u.Okunmamis) || 0), 0),
		getChatOnlineCount: (state) => state.users.filter((u) => state.online.includes(Number(u.ID))).length
	},
	actions: {
		setChatConnection() {},
		setChatDisconnect() {},
		async setChatUserList() {
			try {
				const res = await useApi()("/chat/users");
				this.users = res?.list ?? [];
				this.ready = res?.ready !== false;
				this.dosyaReady = res?.dosya === true;
			} catch (err) {
				console.error("setChatUserList basarisiz:", err);
				this.users = [];
			}
		},
		async setChatActiveUser(userId) {
			this.activeUserId = userId ? Number(userId) : null;
			this.messages = [];
			if (!userId) return;
			this.loadingHistory = true;
			try {
				const res = await useApi()(`/chat/history/${userId}`);
				this.messages = res?.list ?? [];
				this.dahaVar = !!res?.dahaVar;
				this.ready = res?.ready !== false;
				await this.setChatRead(Number(userId));
			} catch (err) {
				console.error("sohbet gecmisi alinamadi:", err);
				this.messages = [];
			} finally {
				this.loadingHistory = false;
			}
		},
		async setChatOlderMessages() {
			const { activeUserId, messages, dahaVar, loadingHistory } = this;
			if (!activeUserId || !dahaVar || loadingHistory || messages.length === 0) return;
			this.loadingHistory = true;
			const enEski = messages[0]?.ID;
			try {
				const res = await useApi()(`/chat/history/${activeUserId}?beforeId=${enEski}`);
				const mevcut = new Set(this.messages.map((m) => String(m.ID)));
				const yeni = (res?.list ?? []).filter((m) => !mevcut.has(String(m.ID)));
				this.messages = yeni.concat(this.messages);
				this.dahaVar = !!res?.dahaVar;
			} catch (err) {
				console.error("eski mesajlar alinamadi:", err);
			} finally {
				this.loadingHistory = false;
			}
		},
		async setChatDosyaYukle(dosya, ilerleme) {
			const toast = useAppToast();
			if (!dosya?.blob) return null;
			try {
				const res = await useApi()("/chat/upload-url", {
					method: "POST",
					body: {
						contentType: dosya.tur,
						boyut: dosya.blob.size
					}
				});
				if (!res?.status || !res.url || !res.key) {
					toast.error(res?.message || "Görüntü yüklenemedi.");
					return null;
				}
				const url = res.url;
				const key = res.key;
				return await new Promise((resolve) => {
					const istek = new (void 0)();
					istek.open("PUT", url, true);
					istek.setRequestHeader("Content-Type", dosya.tur);
					if (typeof ilerleme === "function") istek.upload.onprogress = (olay) => {
						if (olay.lengthComputable) ilerleme(Math.round(olay.loaded / olay.total * 100));
					};
					istek.onload = () => {
						const tamam = istek.status >= 200 && istek.status < 300;
						if (!tamam) {
							console.error("sohbet goruntu yukleme hatasi:", istek.status);
							toast.error("Görüntü yüklenemedi.");
						}
						resolve(tamam ? key : null);
					};
					istek.onerror = () => {
						toast.error("Görüntü yüklenemedi.");
						resolve(null);
					};
					istek.send(dosya.blob);
				});
			} catch (err) {
				console.error("sohbet goruntu yukleme hatasi:", err);
				toast.error("Görüntü yüklenemedi.");
				return null;
			}
		},
		async setChatSend(girdi) {
			const toast = useAppToast();
			const metin = String(girdi?.mesaj ?? "").trim();
			const dosya = girdi?.dosya ?? null;
			if (!metin && !dosya || !this.activeUserId) return { status: false };
			const socket = useSocketStore().getSocket;
			if (!socket || !socket.connected) {
				toast.error("Sohbet sunucusuna bağlanılamadı.");
				return { status: false };
			}
			let dosyaKey = null;
			if (dosya) {
				dosyaKey = await this.setChatDosyaYukle(dosya, girdi.ilerleme);
				if (!dosyaKey) return { status: false };
			}
			return await new Promise((resolve) => {
				socket.emit("chat:send", {
					aliciId: this.activeUserId,
					mesaj: metin,
					dosyaKey,
					dosyaAd: dosya ? dosya.ad : null
				}, (sonuc) => {
					if (!sonuc?.status) toast.error(String(sonuc?.message || "Mesaj gönderilemedi."));
					resolve(sonuc || { status: false });
				});
			});
		},
		async setChatRead(userId) {
			this.users = this.users.map((u) => Number(u.ID) === Number(userId) ? {
				...u,
				Okunmamis: 0
			} : u);
			const socket = useSocketStore().getSocket;
			if (socket?.connected) {
				socket.emit("chat:read", { karsiId: userId });
				return;
			}
			try {
				await useApi()("/chat/read", {
					method: "POST",
					body: { karsiId: userId }
				});
			} catch (err) {
				console.error("okundu isaretlenemedi:", err);
			}
		},
		chatIncoming(mesaj) {
			const benId = Number(useAuthStore().getUserId);
			const gonderen = Number(mesaj.GonderenID);
			const alici = Number(mesaj.AliciID);
			const karsiId = gonderen === benId ? alici : gonderen;
			const aktif = Number(this.activeUserId);
			this.users = this.users.map((u) => Number(u.ID) === karsiId ? {
				...u,
				SonMesaj: mesaj.Mesaj,
				SonMesajTarihi: mesaj.GonderimTarihi
			} : u);
			if (karsiId === aktif) {
				if (!this.messages.some((m) => String(m.ID) === String(mesaj.ID))) this.messages = this.messages.concat([mesaj]);
				if (gonderen !== benId) this.setChatRead(karsiId);
				return;
			}
			if (gonderen === benId) return;
			if (!this.users.some((u) => Number(u.ID) === karsiId)) {
				this.setChatUserList();
				return;
			}
			this.users = this.users.map((u) => Number(u.ID) === karsiId ? {
				...u,
				Okunmamis: (Number(u.Okunmamis) || 0) + 1
			} : u);
		},
		chatOnlineBildirimi(veri) {
			const id = Number(veri.userId);
			const kisi = this.users.find((u) => Number(u.ID) === id);
			if (!kisi) return;
			const simdi = Date.now();
			if (simdi - (sonBildirim.get(id) ?? 0) < BILDIRIM_BEKLEME_MS) return;
			sonBildirim.set(id, simdi);
			const ad = kisi.KullaniciAdi || veri.username;
			useAppToast().info(`${ad} is now online`);
		},
		setChatPanelOpen(acik) {
			this.panelOpen = !!acik;
		},
		applyPresence(veri) {
			if (!veri) return;
			const id = Number(veri.userId);
			if (veri.sonAktif) this.aktiflik = {
				...this.aktiflik,
				[id]: veri.sonAktif
			};
			if (typeof veri.online !== "boolean") return;
			const varMi = this.online.includes(id);
			if (veri.online && !varMi) this.online = this.online.concat([id]);
			else if (!veri.online && varMi) this.online = this.online.filter((x) => x !== id);
		},
		markOwnRead() {
			const simdi = (/* @__PURE__ */ new Date()).toISOString();
			this.messages = this.messages.map((m) => m.OkunduTarihi ? m : {
				...m,
				OkunduTarihi: simdi
			});
		}
	}
});
//#endregion
//#region app/utils/chatDosya.js
var DOSYA_MAX_BAYT = 5242880;
var IZIN_TURLERI = [
	"image/png",
	"image/jpeg",
	"image/webp"
];
var EN_BUYUK_KENAR = 1600;
var PNG_JPEG_ESIGI = 1572864;
var JPEG_KALITE = .9;
function turIzinli(tur) {
	return IZIN_TURLERI.indexOf(String(tur || "").toLowerCase()) !== -1;
}
function boyutYazisi(bayt) {
	const n = Number(bayt) || 0;
	if (n < 1024) return n + " B";
	if (n < 1048576) return Math.round(n / 1024) + " KB";
	return (n / 1048576).toFixed(1) + " MB";
}
function panodanDosya(event) {
	const pano = event && (event.clipboardData || (void 0).clipboardData);
	if (!pano || !pano.items) return null;
	for (const parca of pano.items) if (parca.kind === "file" && String(parca.type || "").startsWith("image/")) {
		const dosya = parca.getAsFile();
		if (dosya) return dosya;
	}
	return null;
}
function gorseliYukle(blob) {
	return new Promise((resolve, reject) => {
		const adres = URL.createObjectURL(blob);
		const img = new Image();
		img.onload = () => {
			URL.revokeObjectURL(adres);
			resolve(img);
		};
		img.onerror = () => {
			URL.revokeObjectURL(adres);
			reject(/* @__PURE__ */ new Error("Görüntü okunamadı."));
		};
		img.src = adres;
	});
}
function tuvalden(tuval, tur) {
	return new Promise((resolve, reject) => {
		tuval.toBlob((blob) => blob ? resolve(blob) : reject(/* @__PURE__ */ new Error("Dönüştürülemedi.")), tur, tur === "image/jpeg" ? JPEG_KALITE : void 0);
	});
}
function uzantiyaGore(tur) {
	if (tur === "image/jpeg") return "jpg";
	if (tur === "image/webp") return "webp";
	return "png";
}
async function resimHazirla(dosya, adOnEki) {
	if (!dosya) return { hata: "Görüntü seçilmedi." };
	let tur = String(dosya.type || "").toLowerCase();
	const cevrilecek = !turIzinli(tur);
	if (!String(dosya.type || "").startsWith("image/")) return { hata: "Yalnızca görüntü gönderilebilir." };
	try {
		const img = await gorseliYukle(dosya);
		const oran = Math.min(1, EN_BUYUK_KENAR / Math.max(img.naturalWidth, img.naturalHeight));
		const kucultulecek = oran < 1;
		const pngBuyuk = tur === "image/png" && dosya.size > PNG_JPEG_ESIGI;
		if (!kucultulecek && !cevrilecek && !pngBuyuk) return {
			blob: dosya,
			tur,
			ad: dosya.name || `${adOnEki || "goruntu"}.${uzantiyaGore(tur)}`,
			genislik: img.naturalWidth,
			yukseklik: img.naturalHeight
		};
		if (cevrilecek || pngBuyuk) tur = pngBuyuk ? "image/jpeg" : "image/png";
		const g = Math.max(1, Math.round(img.naturalWidth * oran));
		const y = Math.max(1, Math.round(img.naturalHeight * oran));
		const tuval = (void 0).createElement("canvas");
		tuval.width = g;
		tuval.height = y;
		const ctx = tuval.getContext("2d");
		if (tur === "image/jpeg") {
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, g, y);
		}
		ctx.drawImage(img, 0, 0, g, y);
		const blob = await tuvalden(tuval, tur);
		if (blob.size > 5242880) return { hata: `Görüntü en fazla ${boyutYazisi(DOSYA_MAX_BAYT)} olabilir.` };
		return {
			blob,
			tur,
			ad: `${adOnEki || "goruntu"}.${uzantiyaGore(tur)}`,
			genislik: g,
			yukseklik: y
		};
	} catch (err) {
		return { hata: err.message || "Görüntü hazırlanamadı." };
	}
}
async function ekranKaresiAl() {
	const cihazlar = (void 0).mediaDevices;
	if (!cihazlar || !cihazlar.getDisplayMedia) return { hata: "Tarayıcınız ekran görüntüsünü desteklemiyor." };
	let akis = null;
	try {
		akis = await cihazlar.getDisplayMedia({
			video: { cursor: "never" },
			audio: false
		});
		const video = (void 0).createElement("video");
		video.srcObject = akis;
		video.muted = true;
		await video.play();
		await new Promise((r) => requestAnimationFrame(() => r()));
		const g = video.videoWidth;
		const y = video.videoHeight;
		if (!g || !y) return { hata: "Ekran görüntüsü alınamadı." };
		const tuval = (void 0).createElement("canvas");
		tuval.width = g;
		tuval.height = y;
		tuval.getContext("2d").drawImage(video, 0, 0, g, y);
		return {
			blob: await tuvalden(tuval, "image/png"),
			tur: "image/png",
			genislik: g,
			yukseklik: y
		};
	} catch (err) {
		if (err && (err.name === "NotAllowedError" || err.name === "AbortError")) return { hata: null };
		return { hata: err.message || "Ekran görüntüsü alınamadı." };
	} finally {
		if (akis) akis.getTracks().forEach((t) => t.stop());
	}
}
async function resmiKirp(blob, alan) {
	try {
		const img = await gorseliYukle(blob);
		const g = Math.max(1, Math.round(alan.g));
		const y = Math.max(1, Math.round(alan.y2));
		const tuval = (void 0).createElement("canvas");
		tuval.width = g;
		tuval.height = y;
		tuval.getContext("2d").drawImage(img, Math.round(alan.x), Math.round(alan.y), g, y, 0, 0, g, y);
		return {
			blob: await tuvalden(tuval, "image/png"),
			tur: "image/png",
			genislik: g,
			yukseklik: y
		};
	} catch (err) {
		return { hata: err.message || "Kırpılamadı." };
	}
}
//#endregion
//#region app/components/chat/Panel.vue
var MESAJ_MAX = 4e3;
var BOSTA_ESIK_MS = 3e5;
var _sfc_main$1 = {
	name: "ChatPanel",
	data() {
		return {
			metin: "",
			arama: "",
			gonderiliyor: false,
			MESAJ_MAX,
			simdi: Date.now(),
			sayacZamanlayici: null,
			ek: null,
			ekOnizleme: null,
			yukleniyor: false,
			yuzde: 0,
			surukleniyor: false,
			buyukResim: null,
			kirpma: null,
			secim: null,
			kirpBaslangic: null
		};
	},
	computed: {
		chat() {
			return useChatStore();
		},
		auth() {
			return useAuthStore();
		},
		kisiler() {
			return this.chat.getChatUsers;
		},
		online() {
			return this.chat.getChatOnline;
		},
		activeUserId() {
			return this.chat.getChatActiveUserId;
		},
		messages() {
			return this.chat.getChatMessages;
		},
		loadingHistory() {
			return this.chat.getChatLoadingHistory;
		},
		dahaVar() {
			return this.chat.getChatDahaVar;
		},
		chatReady() {
			return this.chat.getChatReady;
		},
		panelOpen() {
			return this.chat.getChatPanelOpen;
		},
		unreadTotal() {
			return this.chat.getChatUnreadTotal;
		},
		onlineCount() {
			return this.chat.getChatOnlineCount;
		},
		aktiflik() {
			return this.chat.getChatAktiflik;
		},
		dosyaReady() {
			return this.chat.getChatDosyaReady;
		},
		benId() {
			return this.auth.getUserId;
		},
		ekranDestekli() {
			return false;
		},
		gonderilebilir() {
			return !!this.metin.trim() || !!this.ek;
		},
		ekBoyut() {
			return this.ek ? boyutYazisi(this.ek.blob.size) : "";
		},
		secimStil() {
			if (!this.secim) return {};
			return {
				left: this.secim.x + "px",
				top: this.secim.y + "px",
				width: this.secim.g + "px",
				height: this.secim.y2 + "px"
			};
		},
		activeUser() {
			if (!this.activeUserId) return null;
			return this.kisiler.find((x) => Number(x.ID) === Number(this.activeUserId)) || null;
		},
		filtrelenmisKisiler() {
			const q = this.arama.trim().toLocaleLowerCase("tr");
			if (!q) return this.kisiler;
			return this.kisiler.filter((x) => String(x.KullaniciAdi || "").toLocaleLowerCase("tr").includes(q));
		}
	},
	watch: { messages() {
		this.$nextTick(this.enAltaIn);
	} },
	mounted() {
		this.sayacZamanlayici = setInterval();
	},
	beforeUnmount() {
		if (this.sayacZamanlayici) clearInterval(this.sayacZamanlayici);
		this.ekKaldir();
		this.kirpmayiKapat();
	},
	methods: {
		togglePanel() {
			const yeni = !this.panelOpen;
			this.chat.setChatPanelOpen(yeni);
			if (yeni) this.chat.setChatUserList();
		},
		isOnline(id) {
			return this.online.indexOf(Number(id)) !== -1;
		},
		sonAktifZamani(kisi) {
			const kaynak = this.aktiflik[Number(kisi.ID)] || kisi.SonAktif;
			if (!kaynak) return null;
			const t = new Date(kaynak).getTime();
			return isNaN(t) ? null : t;
		},
		bostaMi(kisi) {
			const t = this.sonAktifZamani(kisi);
			if (t == null) return true;
			return this.simdi - t > BOSTA_ESIK_MS;
		},
		durumSinifi(kisi) {
			if (!this.isOnline(kisi.ID)) return {};
			return this.bostaMi(kisi) ? { idle: true } : { on: true };
		},
		durumYazisi(kisi) {
			const t = this.sonAktifZamani(kisi);
			if (this.isOnline(kisi.ID)) {
				if (!this.bostaMi(kisi)) return "Çevrimiçi";
				return this.goreliZaman(t) + " aktif";
			}
			if (t == null) return "Çevrimdışı";
			return "Son görülme: " + this.goreliZaman(t);
		},
		goreliZaman(t) {
			if (t == null) return "";
			const fark = Math.max(0, this.simdi - t);
			const dk = Math.floor(fark / 6e4);
			if (dk < 1) return "az önce";
			if (dk < 60) return dk + " dk önce";
			const saat = Math.floor(dk / 60);
			if (saat < 24) return saat + " saat önce";
			const gun = Math.floor(saat / 24);
			if (gun < 7) return gun + " gün önce";
			const d = new Date(t);
			const iki = (n) => n < 10 ? "0" + n : String(n);
			return `${iki(d.getDate())}.${iki(d.getMonth() + 1)}.${d.getFullYear()}`;
		},
		benimMi(mesaj) {
			return Number(mesaj.GonderenID) === Number(this.benId);
		},
		saat(tarih) {
			if (!tarih) return "";
			const d = new Date(tarih);
			if (isNaN(d.getTime())) return "";
			const iki = (n) => n < 10 ? "0" + n : String(n);
			const bugun = /* @__PURE__ */ new Date();
			const ayniGun = d.getFullYear() === bugun.getFullYear() && d.getMonth() === bugun.getMonth() && d.getDate() === bugun.getDate();
			const saat = `${iki(d.getHours())}:${iki(d.getMinutes())}`;
			return ayniGun ? saat : `${iki(d.getDate())}.${iki(d.getMonth() + 1)} ${saat}`;
		},
		openThread(kisi) {
			this.chat.setChatActiveUser(kisi.ID).then(() => {
				this.$nextTick(() => {
					this.enAltaIn();
					if (this.$refs.giris) this.$refs.giris.focus();
				});
			});
		},
		closeThread() {
			this.chat.setChatActiveUser(null);
			this.metin = "";
		},
		enAltaIn() {
			const el = this.$refs.akis;
			if (el) el.scrollTop = el.scrollHeight;
		},
		akisKaydirildi(e) {
			if (e.target.scrollTop <= 4 && this.dahaVar && !this.loadingHistory) this.chat.setChatOlderMessages();
		},
		gonder() {
			const metin = this.metin.trim();
			if (!metin && !this.ek || this.gonderiliyor) return;
			this.gonderiliyor = true;
			this.yuzde = 0;
			this.yukleniyor = !!this.ek;
			this.chat.setChatSend({
				mesaj: metin,
				dosya: this.ek,
				ilerleme: (yuzde) => {
					this.yuzde = yuzde;
				}
			}).then((sonuc) => {
				this.gonderiliyor = false;
				this.yukleniyor = false;
				if (sonuc && sonuc.status) {
					this.metin = "";
					this.ekKaldir();
					this.$nextTick(this.enAltaIn);
				}
			});
		},
		dosyaSec() {
			if (this.$refs.dosyaGirisi) this.$refs.dosyaGirisi.click();
		},
		dosyaSecildi(olay) {
			const dosya = olay.target.files && olay.target.files[0];
			olay.target.value = "";
			if (dosya) this.ekAyarla(dosya, "goruntu");
		},
		yapistir(olay) {
			if (!this.dosyaReady) return;
			const dosya = panodanDosya(olay);
			if (!dosya) return;
			olay.preventDefault();
			this.ekAyarla(dosya, "ekran-goruntusu");
		},
		surukleGirdi() {
			if (this.dosyaReady && this.activeUser) this.surukleniyor = true;
		},
		surukleCikti() {
			this.surukleniyor = false;
		},
		birakildi(olay) {
			this.surukleniyor = false;
			if (!this.dosyaReady || !this.activeUser) return;
			const dosya = olay.dataTransfer && olay.dataTransfer.files && olay.dataTransfer.files[0];
			if (dosya) this.ekAyarla(dosya, "goruntu");
		},
		async ekAyarla(dosya, adOnEki) {
			const sonuc = await resimHazirla(dosya, adOnEki);
			if (sonuc.hata) {
				useAppToast().error(sonuc.hata);
				return;
			}
			this.ekKaldir();
			this.ek = sonuc;
			this.ekOnizleme = URL.createObjectURL(sonuc.blob);
			this.$nextTick(() => {
				if (this.$refs.giris) this.$refs.giris.focus();
			});
		},
		ekKaldir() {
			if (this.ekOnizleme) URL.revokeObjectURL(this.ekOnizleme);
			this.ekOnizleme = null;
			this.ek = null;
			this.yuzde = 0;
			this.yukleniyor = false;
		},
		resmiAc(mesaj) {
			if (mesaj && mesaj.Dosya) this.buyukResim = mesaj.Dosya.Url;
		},
		async ekranAl() {
			const sonuc = await ekranKaresiAl();
			if (sonuc.hata) {
				useAppToast().error(sonuc.hata);
				return;
			}
			if (!sonuc.blob) return;
			this.kirpma = {
				blob: sonuc.blob,
				url: URL.createObjectURL(sonuc.blob),
				genislik: sonuc.genislik,
				yukseklik: sonuc.yukseklik
			};
			this.secim = null;
		},
		kirpmayiKapat() {
			if (this.kirpma && this.kirpma.url) URL.revokeObjectURL(this.kirpma.url);
			this.kirpma = null;
			this.secim = null;
			this.kirpBaslangic = null;
		},
		kirpIptal() {
			this.kirpmayiKapat();
		},
		kirpNoktasi(olay) {
			const kutu = this.$refs.kirpResim.getBoundingClientRect();
			return {
				x: Math.min(Math.max(olay.clientX - kutu.left, 0), kutu.width),
				y: Math.min(Math.max(olay.clientY - kutu.top, 0), kutu.height)
			};
		},
		kirpBasla(olay) {
			if (!this.$refs.kirpResim) return;
			olay.preventDefault();
			this.kirpBaslangic = this.kirpNoktasi(olay);
			this.secim = null;
		},
		kirpSurukle(olay) {
			if (!this.kirpBaslangic) return;
			const nokta = this.kirpNoktasi(olay);
			this.secim = {
				x: Math.min(this.kirpBaslangic.x, nokta.x),
				y: Math.min(this.kirpBaslangic.y, nokta.y),
				g: Math.abs(nokta.x - this.kirpBaslangic.x),
				y2: Math.abs(nokta.y - this.kirpBaslangic.y)
			};
		},
		kirpBitir() {
			this.kirpBaslangic = null;
			if (this.secim && (this.secim.g < 8 || this.secim.y2 < 8)) this.secim = null;
		},
		async kirpOnayla() {
			const kirpma = this.kirpma;
			if (!kirpma) return;
			let kaynak = kirpma.blob;
			if (this.secim && this.$refs.kirpResim) {
				const kutu = this.$refs.kirpResim.getBoundingClientRect();
				const oran = kirpma.genislik / (kutu.width || kirpma.genislik);
				const sonuc = await resmiKirp(kirpma.blob, {
					x: this.secim.x * oran,
					y: this.secim.y * oran,
					g: this.secim.g * oran,
					y2: this.secim.y2 * oran
				});
				if (sonuc.hata) {
					useAppToast().error(sonuc.hata);
					return;
				}
				kaynak = sonuc.blob;
			}
			this.kirpmayiKapat();
			await this.ekAyarla(kaynak, "ekran-goruntusu");
		}
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "chat-root" }, _attrs))} data-v-808433ab><button class="${ssrRenderClass([{ "is-open": $options.panelOpen }, "chat-launcher"])}"${ssrRenderAttr("title", $options.panelOpen ? "Sohbeti kapat" : "Sohbet")} data-v-808433ab><i class="${ssrRenderClass($options.panelOpen ? "pi pi-times" : "pi pi-comments")}" data-v-808433ab></i>`);
	if (!$options.panelOpen && $options.unreadTotal > 0) _push(`<span class="chat-badge" data-v-808433ab>${ssrInterpolate($options.unreadTotal > 99 ? "99+" : $options.unreadTotal)}</span>`);
	else _push(`<!---->`);
	_push(`</button><div class="${ssrRenderClass([{ "is-drag": $data.surukleniyor }, "chat-panel"])}" style="${ssrRenderStyle($options.panelOpen ? null : { display: "none" })}" data-v-808433ab><div class="chat-head" data-v-808433ab>`);
	if ($options.activeUser) _push(`<div class="chat-head-user" data-v-808433ab><button class="chat-back" title="Listeye dön" data-v-808433ab><i class="pi pi-arrow-left" data-v-808433ab></i></button><span class="${ssrRenderClass([$options.durumSinifi($options.activeUser), "chat-dot"])}" data-v-808433ab></span><div class="chat-head-text" data-v-808433ab><strong data-v-808433ab>${ssrInterpolate($options.activeUser.KullaniciAdi)}</strong><small data-v-808433ab>${ssrInterpolate($options.durumYazisi($options.activeUser))}</small></div></div>`);
	else _push(`<div class="chat-head-text" data-v-808433ab><strong data-v-808433ab>Sohbet</strong><small data-v-808433ab>${ssrInterpolate($options.onlineCount)} kişi çevrimiçi</small></div>`);
	_push(`</div>`);
	if (!$options.chatReady) _push(`<div class="chat-empty" data-v-808433ab><i class="pi pi-exclamation-triangle" data-v-808433ab></i><p data-v-808433ab>Sohbet veritabanı kurulumu tamamlanmamış.</p><small data-v-808433ab>api/sql/SohbetMesajTB.sql çalıştırılmalı.</small></div>`);
	else if (!$options.activeUser) {
		_push(`<div class="chat-list" data-v-808433ab><div class="chat-search" data-v-808433ab><i class="pi pi-search" data-v-808433ab></i><input${ssrRenderAttr("value", $data.arama)} type="text" placeholder="Kişi ara" data-v-808433ab></div>`);
		if ($options.filtrelenmisKisiler.length === 0) _push(`<div class="chat-empty" data-v-808433ab><p data-v-808433ab>Kişi bulunamadı.</p></div>`);
		else _push(`<!---->`);
		_push(`<!--[-->`);
		ssrRenderList($options.filtrelenmisKisiler, (kisi) => {
			_push(`<div class="chat-row" data-v-808433ab><button class="chat-row-main" data-v-808433ab><span class="${ssrRenderClass([$options.durumSinifi(kisi), "chat-dot"])}" data-v-808433ab></span><span class="chat-row-text" data-v-808433ab><strong data-v-808433ab>${ssrInterpolate(kisi.KullaniciAdi)}</strong><small data-v-808433ab>${ssrInterpolate($options.durumYazisi(kisi))}</small></span>`);
			if (kisi.Okunmamis > 0) _push(`<span class="chat-count" data-v-808433ab>${ssrInterpolate(kisi.Okunmamis)}</span>`);
			else _push(`<!---->`);
			_push(`</button></div>`);
		});
		_push(`<!--]--></div>`);
	} else {
		_push(`<!--[--><div class="chat-thread" data-v-808433ab>`);
		if ($options.loadingHistory) _push(`<div class="chat-info" data-v-808433ab>Yükleniyor…</div>`);
		else if ($options.dahaVar) _push(`<button class="chat-more" data-v-808433ab> Daha eski mesajlar </button>`);
		else _push(`<!---->`);
		if ($options.messages.length === 0 && !$options.loadingHistory) _push(`<div class="chat-empty" data-v-808433ab><p data-v-808433ab>Henüz mesaj yok.</p></div>`);
		else _push(`<!---->`);
		_push(`<!--[-->`);
		ssrRenderList($options.messages, (mesaj) => {
			_push(`<div class="${ssrRenderClass([$options.benimMi(mesaj) ? "mine" : "theirs", "chat-msg"])}" data-v-808433ab><div class="chat-bubble" data-v-808433ab>`);
			if (mesaj.Dosya) _push(`<img class="chat-img"${ssrRenderAttr("src", mesaj.Dosya.Url)}${ssrRenderAttr("alt", mesaj.Dosya.Ad || "görüntü")} data-v-808433ab>`);
			else _push(`<!---->`);
			if (mesaj.Mesaj) _push(`<span class="chat-text" data-v-808433ab>${ssrInterpolate(mesaj.Mesaj)}</span>`);
			else _push(`<!---->`);
			_push(`<span class="chat-meta" data-v-808433ab>${ssrInterpolate($options.saat(mesaj.GonderimTarihi))} `);
			if ($options.benimMi(mesaj)) _push(`<i class="${ssrRenderClass(mesaj.OkunduTarihi ? "pi pi-check-circle" : "pi pi-check")}"${ssrRenderAttr("title", mesaj.OkunduTarihi ? "Okundu" : "Gönderildi")} data-v-808433ab></i>`);
			else _push(`<!---->`);
			_push(`</span></div></div>`);
		});
		_push(`<!--]--></div>`);
		if ($data.ek) {
			_push(`<div class="chat-ek" data-v-808433ab><img${ssrRenderAttr("src", $data.ekOnizleme)} alt="" data-v-808433ab><div class="chat-ek-bilgi" data-v-808433ab><strong data-v-808433ab>${ssrInterpolate($data.ek.genislik)}×${ssrInterpolate($data.ek.yukseklik)}</strong><small data-v-808433ab>${ssrInterpolate($options.ekBoyut)}</small>`);
			if ($data.yukleniyor) _push(`<div class="chat-ek-bar" data-v-808433ab><span style="${ssrRenderStyle({ width: $data.yuzde + "%" })}" data-v-808433ab></span></div>`);
			else _push(`<!---->`);
			_push(`</div><button type="button" class="chat-ek-sil" title="Kaldır"${ssrIncludeBooleanAttr($data.gonderiliyor) ? " disabled" : ""} data-v-808433ab><i class="pi pi-times" data-v-808433ab></i></button></div>`);
		} else _push(`<!---->`);
		_push(`<form class="chat-form" data-v-808433ab><input type="file" accept="image/*" class="chat-gizli" data-v-808433ab>`);
		if ($options.dosyaReady) _push(`<button type="button" class="chat-ikincil" title="Görüntü ekle (Ctrl+V ile de yapıştırabilirsiniz)"${ssrIncludeBooleanAttr($data.gonderiliyor) ? " disabled" : ""} data-v-808433ab><i class="pi pi-paperclip" data-v-808433ab></i></button>`);
		else _push(`<!---->`);
		if ($options.dosyaReady && $options.ekranDestekli) _push(`<button type="button" class="chat-ikincil" title="Ekran görüntüsü al"${ssrIncludeBooleanAttr($data.gonderiliyor) ? " disabled" : ""} data-v-808433ab><i class="pi pi-desktop" data-v-808433ab></i></button>`);
		else _push(`<!---->`);
		_push(`<textarea rows="1"${ssrRenderAttr("placeholder", $data.ek ? "Alt yazı (isteğe bağlı)…" : "Mesaj yazın…")}${ssrRenderAttr("maxlength", $data.MESAJ_MAX)} data-v-808433ab>${ssrInterpolate($data.metin)}</textarea><button type="submit"${ssrIncludeBooleanAttr(!$options.gonderilebilir || $data.gonderiliyor) ? " disabled" : ""} data-v-808433ab><i class="pi pi-send" data-v-808433ab></i></button></form><!--]-->`);
	}
	_push(`</div>`);
	if ($data.buyukResim) _push(`<div class="chat-lightbox" data-v-808433ab><img${ssrRenderAttr("src", $data.buyukResim)} alt="" data-v-808433ab><a class="chat-lightbox-link"${ssrRenderAttr("href", $data.buyukResim)} target="_blank" rel="noopener" data-v-808433ab>Yeni sekmede aç</a></div>`);
	else _push(`<!---->`);
	if ($data.kirpma) {
		_push(`<div class="chat-kirp" data-v-808433ab><div class="chat-kirp-ic" data-v-808433ab><p class="chat-kirp-bilgi" data-v-808433ab> Fare ile göndermek istediğiniz alanı seçin. Seçim yapmazsanız görüntünün tamamı gönderilir. </p><div class="chat-kirp-tuval" data-v-808433ab><img${ssrRenderAttr("src", $data.kirpma.url)} alt="" draggable="false" data-v-808433ab>`);
		if ($data.secim) _push(`<div class="chat-kirp-secim" style="${ssrRenderStyle($options.secimStil)}" data-v-808433ab></div>`);
		else _push(`<!---->`);
		_push(`</div><div class="chat-kirp-dugmeler" data-v-808433ab><button type="button" data-v-808433ab>İptal</button>`);
		if ($data.secim) _push(`<button type="button" data-v-808433ab> Seçimi temizle </button>`);
		else _push(`<!---->`);
		_push(`<button type="button" class="ana" data-v-808433ab>Ekle</button></div></div></div>`);
	} else _push(`<!---->`);
	_push(`</div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat/Panel.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Panel_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-808433ab"]]), { __name: "ChatPanel" });
//#endregion
//#region app/layouts/default.vue
var _sfc_main = {
	__name: "default",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const shared = useSharedStore();
		const auth = useAuthStore();
		const navigating = ref(false);
		const nuxtApp = useNuxtApp();
		nuxtApp.hook("page:loading:start", () => {
			navigating.value = true;
		});
		nuxtApp.hook("page:loading:end", () => {
			navigating.value = false;
		});
		if (auth.isAuthenticated) [__temp, __restore] = withAsyncContext(() => useAsyncData("layout-user-list", () => shared.setUserList(), { server: false })), await __temp, __restore();
		useChatStore();
		useSocketStore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ClientOnly = ClientOnly;
			const _component_Toast = script;
			const _component_SharedNavbar = Navbar_default;
			const _component_ChatPanel = Panel_default;
			_push(`<div${ssrRenderAttrs(_attrs)} data-v-a2b34910>`);
			_push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
			_push(ssrRenderComponent(_component_Toast, null, null, _parent));
			_push(ssrRenderComponent(_component_SharedNavbar, { style: [unref(auth).isAuthenticated ? null : { display: "none" }, { "margin-bottom": "5px" }] }, null, _parent));
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			if (unref(auth).isAuthenticated) _push(ssrRenderComponent(_component_ChatPanel, null, null, _parent));
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var default_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-a2b34910"]]);

export { default_default as default };
//# sourceMappingURL=default-DKktHZcq.mjs.map
