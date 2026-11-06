import { u as useCookie, _ as _plugin_vue_export_helper_default, m as monthToString, e as formatPriceUsd, c as dateToString } from '../virtual/entry.mjs';
import { n as script$2 } from './column-CT6GXkG2.mjs';
import { n as script$1 } from './datatable-D6ou7HZJ.mjs';
import { n as script } from './dialog-BB6no0wu.mjs';
import { u as useReportsStore } from './reports-ALTSksCi.mjs';
import { mergeProps, withCtx, createVNode, unref, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
import './baseicon-COIgioD1.mjs';
import './spinner-Bg9uPPDs.mjs';
import './badge-Djy3ODAc.mjs';
import './ripple-BAuDWuPF.mjs';
import './basedirective-00hguNen.mjs';
import '@primeuix/utils/uuid';
import './button-C8Z7Yc79.mjs';
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
import './inputtext-s6cxdqDx.mjs';
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
import './useLegacyApi-B5zRc7ig.mjs';
import './useApi-CGFzrxZs.mjs';
import './shared-D6MCKVW0.mjs';

//#region app/components/reports/mekmar/SummaryList.vue
var _sfc_main$2 = {
	props: {
		list: {
			type: Array,
			required: false
		},
		year: {
			type: Number,
			required: false
		},
		total: {
			type: Object,
			required: false
		},
		status: {
			type: String,
			required: false
		}
	},
	data() {
		return { selectedOrderList: null };
	}
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_DataTable = script$1;
	const _component_Column = script$2;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "col" }, _attrs))}>`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $props.list,
		class: "p-datatable-sm table-scroll-x",
		selection: $data.selectedOrderList,
		"onUpdate:selection": ($event) => $data.selectedOrderList = $event,
		selectionMode: "single",
		onRowClick: ($event) => _ctx.$emit("order_selected_list_emit", $event.data)
	}, {
		header: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(`${ssrInterpolate($props.year)} ${ssrInterpolate($props.status)} Summary`);
			else return [createTextVNode(toDisplayString($props.year) + " " + toDisplayString($props.status) + " Summary", 1)];
		}),
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "Month",
					header: "Month",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("monthToString" in _ctx ? _ctx.monthToString : unref(monthToString))(slotProps.data.Month))}`);
						else return [createTextVNode(toDisplayString(("monthToString" in _ctx ? _ctx.monthToString : unref(monthToString))(slotProps.data.Month)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "FOB",
					header: "FOB",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.FOB))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.FOB)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.fob))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.fob)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "DDP",
					header: "DDP",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DDP))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DDP)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.ddp))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.ddp)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "Month",
					header: "Month",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("monthToString" in _ctx ? _ctx.monthToString : unref(monthToString))(slotProps.data.Month)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "FOB",
					header: "FOB",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.FOB)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.fob)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "DDP",
					header: "DDP",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DDP)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.ddp)), 1)]),
					_: 1
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/reports/mekmar/SummaryList.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var SummaryList_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]), { __name: "ReportsMekmarSummaryList" });
//#endregion
//#region app/components/reports/mekmar/SummaryDetailList.vue
var _sfc_main$1 = { props: {
	list: {
		type: Array,
		required: true
	},
	total: {
		type: Object,
		required: true
	}
} };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_DataTable = script$1;
	const _component_Column = script$2;
	_push(`<div${ssrRenderAttrs(_attrs)}>`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $props.list,
		class: "p-datatable-sm table-scroll-x"
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "SiparisTarihi",
					header: "Date",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.SiparisTarihi))}`);
						else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.SiparisTarihi)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SiparisNo",
					header: "Po",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "FirmaAdi",
					header: "Customer",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "TeslimTur",
					header: "Delivery Term",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Fob",
					header: "Fob",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Fob))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Fob)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.fob))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.fob)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "NavlunSatis",
					header: "Freight",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.NavlunSatis))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.NavlunSatis)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.freight))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.freight)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "DetayTutar_1",
					header: "Detail 1",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DetayTutar_1))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DetayTutar_1)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.detail1))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.detail1)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "DetayTutar_2",
					header: "Detail 2",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DetayTutar_2))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DetayTutar_2)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.detail2))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.detail2)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "DetayTutar_3",
					header: "Detail 3",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DetayTutar_3))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DetayTutar_3)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.detail3))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.detail3)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "DetayTutar_4",
					header: "Detail 4",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DetayTutar_4))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DetayTutar_4)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.detail4))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.detail4)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Ddp",
					header: "Ddp",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Ddp))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Ddp)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.ddp))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.ddp)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "SiparisTarihi",
					header: "Date",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.SiparisTarihi)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SiparisNo",
					header: "Po",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "FirmaAdi",
					header: "Customer",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "TeslimTur",
					header: "Delivery Term",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "Fob",
					header: "Fob",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Fob)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.fob)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "NavlunSatis",
					header: "Freight",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.NavlunSatis)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.freight)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "DetayTutar_1",
					header: "Detail 1",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DetayTutar_1)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.detail1)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "DetayTutar_2",
					header: "Detail 2",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DetayTutar_2)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.detail2)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "DetayTutar_3",
					header: "Detail 3",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DetayTutar_3)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.detail3)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "DetayTutar_4",
					header: "Detail 4",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.DetayTutar_4)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.detail4)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Ddp",
					header: "Ddp",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Ddp)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.ddp)), 1)]),
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/reports/mekmar/SummaryDetailList.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var SummaryDetailList_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]), { __name: "ReportsMekmarSummaryDetailList" });
//#endregion
//#region app/pages/reports/mekmar/summary.vue
var _sfc_main = /*@__PURE__*/ Object.assign({
	computed: { reportsStore() {
		return useReportsStore();
	} },
	data() {
		return {
			reports_mekmar_summary_list_detail_dialog: false,
			userId: null
		};
	},
	methods: {
		orderSelectedListOrderer(event, status) {
			const data = {
				"month": event.Month,
				"year": event.Year,
				"userId": useCookie("userId").value
			};
			this.reportsStore.setReportsMekmarSummaryOrderDetailRepresentative(data);
			this.reports_mekmar_summary_list_detail_dialog = true;
		},
		orderSelectedList(event, status) {
			if (status) {
				this.reportsStore.setReportsMekmarSummaryOrderDetail(event);
				this.reports_mekmar_summary_list_detail_dialog = true;
			} else {
				this.reportsStore.setReportsMekmarSummaryForwardingDetail(event);
				this.reports_mekmar_summary_list_detail_dialog = true;
			}
		}
	},
	watch: { userId() {
		this.reportsStore.setReportsMekmarSummaryOrderListByRepresentative(this.userId);
	} },
	mounted() {
		this.reportsStore.setReportsMekmarSummaryOrderList();
		this.reportsStore.setReportsMekmarSummaryForwardingList();
		this.userId = useCookie("userId").value;
		this.reportsStore.setReportsMekmarSummaryOrderListByRepresentative(this.userId);
	}
}, {
	__name: "summary",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ReportsMekmarSummaryList = SummaryList_default;
			const _component_Dialog = script;
			const _component_ReportsMekmarSummaryDetailList = SummaryDetailList_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><div class="row"><!--[-->`);
			ssrRenderList(_ctx.reportsStore.getReportsMekmarSummaryOrderList, (item, index) => {
				_push(ssrRenderComponent(_component_ReportsMekmarSummaryList, {
					key: item.Month,
					list: item,
					year: (/* @__PURE__ */ new Date()).getFullYear() - index,
					total: _ctx.reportsStore.getReportsMekmarSummaryOrderListTotal[index],
					onOrder_selected_list_emit: ($event) => _ctx.orderSelectedList($event, true),
					status: "Order"
				}, null, _parent));
			});
			_push(`<!--]--><!--[-->`);
			ssrRenderList(_ctx.reportsStore.getReportsMekmarSummaryOrderListByRepresentative, (item, index) => {
				_push(ssrRenderComponent(_component_ReportsMekmarSummaryList, {
					key: item.Month,
					list: item,
					year: (/* @__PURE__ */ new Date()).getFullYear() - index,
					total: _ctx.reportsStore.getReportsMekmarSummaryOrderListByRepresentativeTotal[index],
					onOrder_selected_list_emit: ($event) => _ctx.orderSelectedListOrderer($event, true),
					status: "Seller"
				}, null, _parent));
			});
			_push(`<!--]--></div><div class="row"><!--[-->`);
			ssrRenderList(_ctx.reportsStore.getReportsMekmarSummaryForwardingList, (item, index) => {
				_push(ssrRenderComponent(_component_ReportsMekmarSummaryList, {
					key: item.Month,
					list: item,
					year: (/* @__PURE__ */ new Date()).getFullYear() - index,
					total: _ctx.reportsStore.getReportsMekmarSummaryForwardingListTotal[index],
					onOrder_selected_list_emit: ($event) => _ctx.orderSelectedList($event, false),
					status: "Shipment"
				}, null, _parent));
			});
			_push(`<!--]--></div>`);
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.reports_mekmar_summary_list_detail_dialog,
				"onUpdate:visible": ($event) => _ctx.reports_mekmar_summary_list_detail_dialog = $event,
				header: "",
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_ReportsMekmarSummaryDetailList, {
						list: _ctx.reportsStore.getReportsMekmarSummaryOrderDetail,
						total: _ctx.reportsStore.getReportsMekmarSummaryOrderDetailTotal
					}, null, _parent, _scopeId));
					else return [createVNode(_component_ReportsMekmarSummaryDetailList, {
						list: _ctx.reportsStore.getReportsMekmarSummaryOrderDetail,
						total: _ctx.reportsStore.getReportsMekmarSummaryOrderDetailTotal
					}, null, 8, ["list", "total"])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reports/mekmar/summary.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=summary-Ds0QzhY-.mjs.map
