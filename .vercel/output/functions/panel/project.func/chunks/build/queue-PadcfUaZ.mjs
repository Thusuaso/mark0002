import { a as useAppToast, b as useAsyncData } from '../virtual/entry.mjs';
import { n as script$1 } from './button-C8Z7Yc79.mjs';
import { n as script$3 } from './column-CT6GXkG2.mjs';
import { n as script$2 } from './datatable-D6ou7HZJ.mjs';
import { t as script } from './select-T8LIeBQG.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { u as usePanelStore } from './panel-Cy-zQdGW.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
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
import './checkbox-wtvrQjx7.mjs';
import './minus-C71kU5yE.mjs';
import './radiobutton-C-685P7O.mjs';
import './plus-CA09jZgn.mjs';
import './focustrap-kXXT0pga.mjs';
import './sortamountupalt-MmmjHcOR.mjs';
import './useApi-CGFzrxZs.mjs';
import './useLegacyApi-B5zRc7ig.mjs';
import './models-CeLtEMS4.mjs';

//#region app/pages/panel/products/queue.vue
var _sfc_main = /*@__PURE__*/ Object.assign({
	computed: {
		panelStore() {
			return usePanelStore();
		},
		sharedStore() {
			return useSharedStore();
		}
	},
	data() {
		return {
			selectedCategory: null,
			change_queue_button_status: false
		};
	},
	watch: { "panelStore.getPanelCategoryList": {
		immediate: true,
		handler() {
			this.selectedCategory = this.panelStore.getPanelCategoryList[0] ?? null;
		}
	} },
	methods: {
		categorySelected(event) {
			this.panelStore.setPanelPublishedListCategory(event.value.Id);
		},
		reOrderPanelPublishedList(event) {
			let queue = 0;
			event.value.forEach((x) => {
				queue++;
				x.sira = queue;
			});
			this.panelStore.MUT_setPanelPublishedChangedList(event.value);
		},
		async changeQueue() {
			const liste = this.panelStore.getPanelPublishedList;
			if (!liste.length) return;
			this.change_queue_button_status = true;
			this.sharedStore.beginLoading();
			try {
				await Promise.all(liste.map((urun) => this.panelStore.setPanelProductQueue(urun)));
				useAppToast().success("Başarıyla Değiştirildi.");
			} catch (err) {
				console.error("sira degistirme basarisiz:", err);
				useAppToast().error("Değiştirme Başarısız.");
			} finally {
				this.sharedStore.endLoading();
				this.change_queue_button_status = false;
			}
		}
	}
}, {
	__name: "queue",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const panelStore = usePanelStore();
		[__temp, __restore] = withAsyncContext(() => useAsyncData("panel-products-queue", () => panelStore.setPanelPublishedList(), { server: false })), await __temp, __restore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Select = script;
			const _component_Button = script$1;
			const _component_DataTable = script$2;
			const _component_Column = script$3;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><div class="row"><div class="col">`);
			_push(ssrRenderComponent(_component_Select, {
				modelValue: _ctx.selectedCategory,
				"onUpdate:modelValue": ($event) => _ctx.selectedCategory = $event,
				options: unref(panelStore).getPanelCategoryList,
				optionLabel: "kategoriadi_en",
				class: "w-100",
				onChange: ($event) => _ctx.categorySelected($event)
			}, null, _parent));
			_push(`</div><div class="col">`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				class: "w-100",
				severity: "info",
				label: "Change Queue",
				onClick: _ctx.changeQueue,
				disabled: _ctx.change_queue_button_status
			}, null, _parent));
			_push(`</div></div>`);
			_push(ssrRenderComponent(_component_DataTable, {
				scrollable: "",
				scrollHeight: "var(--app-table-height)",
				value: unref(panelStore).getPanelPublishedList,
				class: "p-datatable-sm",
				reorderableColumns: true,
				onRowReorder: ($event) => _ctx.reOrderPanelPublishedList($event),
				sortOrder: 1,
				sortField: "sira"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_Column, {
							rowReorder: true,
							headerClass: "col-rowno",
							bodyClass: "col-rowno",
							reorderableColumn: false
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "sira",
							header: "Queue"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "urunid",
							header: "Product Id"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "urunkod",
							header: "Product Code"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "urunadi_en",
							header: "Product Name"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "Image",
							header: "#"
						}, {
							body: withCtx((slotProps, _push, _parent, _scopeId) => {
								if (_push) _push(`<img lazyload${ssrRenderAttr("src", slotProps.data.Image)} width="100" height="100"${_scopeId}>`);
								else return [createVNode("img", {
									lazyload: "",
									src: slotProps.data.Image,
									width: "100",
									height: "100"
								}, null, 8, ["src"])];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [
						createVNode(_component_Column, {
							rowReorder: true,
							headerClass: "col-rowno",
							bodyClass: "col-rowno",
							reorderableColumn: false
						}),
						createVNode(_component_Column, {
							field: "sira",
							header: "Queue"
						}),
						createVNode(_component_Column, {
							field: "urunid",
							header: "Product Id"
						}),
						createVNode(_component_Column, {
							field: "urunkod",
							header: "Product Code"
						}),
						createVNode(_component_Column, {
							field: "urunadi_en",
							header: "Product Name"
						}),
						createVNode(_component_Column, {
							field: "Image",
							header: "#"
						}, {
							body: withCtx((slotProps) => [createVNode("img", {
								lazyload: "",
								src: slotProps.data.Image,
								width: "100",
								height: "100"
							}, null, 8, ["src"])]),
							_: 1
						})
					];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/panel/products/queue.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=queue-PadcfUaZ.mjs.map
