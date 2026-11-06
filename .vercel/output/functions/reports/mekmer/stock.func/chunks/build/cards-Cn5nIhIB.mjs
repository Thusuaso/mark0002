import { b as useAsyncData, _ as _plugin_vue_export_helper_default, a as useAppToast, u as useCookie, e as formatPriceUsd, f as formatDecimal } from '../virtual/entry.mjs';
import { n as script } from './button-C8Z7Yc79.mjs';
import { n as script$5 } from './column-CT6GXkG2.mjs';
import { n as script$4 } from './datatable-D6ou7HZJ.mjs';
import { n as script$3 } from './autocomplete-5Wwvp4c8.mjs';
import { n as script$2 } from './floatlabel-BDqo8RCT.mjs';
import { n as script$1 } from './dialog-BB6no0wu.mjs';
import { u as useApi } from './useApi-CGFzrxZs.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { u as useSocketStore } from './socket-AbqLYDWT.mjs';
import { C as Cards_default } from './Cards-D_Ydl_4N.mjs';
import { withAsyncContext, mergeProps, withCtx, unref, openBlock, createBlock, createCommentVNode, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { defineStore } from 'pinia';
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
import './chip--BHyxaU9.mjs';
import './timescircle-0itGCn-i.mjs';
import './utils-9fKJJYP7.mjs';
import './useLegacyApi-B5zRc7ig.mjs';

//#region app/stores/cards.ts
var useCardsStore = defineStore("cards", {
	state: () => ({
		cardsButtonStatus: false,
		cardsOrderList: []
	}),
	getters: {
		getCardsButtonStatus: (state) => state.cardsButtonStatus,
		getCardsOrderList: (state) => state.cardsOrderList
	},
	actions: {
		setCardsButtonStatus(status) {
			this.cardsButtonStatus = status;
		},
		async setCardsSave(card) {
			const toast = useAppToast();
			try {
				if ((await useApi()("/card/save", {
					method: "POST",
					body: card
				})).status) {
					const shared = useSharedStore();
					shared.setCardSizesList();
					shared.setCardCategoryList();
					shared.setCardProductsList();
					shared.setCardSurfacesList();
					shared.setCardList();
					toast.success("Başarıyla Kaydedildi.");
				} else toast.error("Kaydetme Başarısız.");
			} catch (err) {
				console.error("setCardsSave basarisiz:", err);
				toast.error("Kaydetme Başarısız.");
			}
		},
		async setCardsDelete(cardId) {
			const toast = useAppToast();
			try {
				if ((await useApi()(`/card/delete/${cardId}`, { method: "DELETE" })).status) {
					useSharedStore().setCardList();
					toast.success("Başarıyla Silindi.");
				} else toast.error("Silme Başarısız");
			} catch (err) {
				console.error("setCardsDelete basarisiz:", err);
				toast.error("Silme Başarısız");
			}
		},
		async setCardsUpdate(card) {
			const toast = useAppToast();
			try {
				if ((await useApi()("/card/update", {
					method: "PUT",
					body: card
				})).status) {
					const shared = useSharedStore();
					shared.setCardSizesList();
					shared.setCardList();
					toast.success("Başarıyla Güncellendi.");
				} else toast.error("Güncelleme Başarısız");
			} catch (err) {
				console.error("setCardsUpdate basarisiz:", err);
				toast.error("Güncelleme Başarısız");
			}
		},
		async setCardsOrderList(cardId) {
			try {
				const res = await useApi()(`/card/order/list/${cardId}`);
				this.cardsOrderList = res?.list ?? [];
			} catch (err) {
				console.error("setCardsOrderList basarisiz:", err);
				this.cardsOrderList = [];
			}
		},
		MUT_setCardsOrderList(payload) {
			this.cardsOrderList = payload;
		}
	}
});
//#endregion
//#region app/components/cards/Form.vue
var _sfc_main$1 = /*@__PURE__*/ Object.assign({
	props: {
		status: {
			type: Boolean,
			required: false,
			default: false
		},
		model: {
			type: Object,
			required: true
		},
		categories: {
			type: Array,
			required: true
		},
		products: {
			type: Array,
			required: true
		},
		surfaces: {
			type: Array,
			required: true
		},
		sizes: {
			type: Array,
			required: true
		},
		orders: {
			type: Array,
			required: false,
			default: () => []
		}
	},
	computed: {
		cardsStore() {
			return useCardsStore();
		},
		socketStore() {
			return useSocketStore();
		}
	},
	data() {
		return {
			selectedCategory: null,
			filteredCategory: null,
			selectedProduct: null,
			filteredProduct: null,
			selectedSurface: null,
			filteredSurface: null,
			selectedWidth: null,
			filteredWidth: null,
			selectedHeight: null,
			filteredHeight: null,
			selectedEdge: null,
			filteredEdge: null
		};
	},
	created() {
		if (!this.status) this.createdProcess();
	},
	methods: {
		capitalizeFirstLetter(val) {
			return String(val).charAt(0).toUpperCase() + String(val).slice(1);
		},
		reset() {
			this.selectedCategory = null;
			this.selectedProduct = null;
			this.selectedSurface = null;
			this.selectedWidth = null;
			this.selectedHeight = null;
			this.selectedEdge = null;
		},
		async deleteForm() {
			await this.cardsStore.setCardsDelete(this.model.ID);
			this.socketStore.emit("card_list_update_emit");
			this.$emit("card_dialog_form_emit", false);
		},
		async update() {
			this.model.userId = useCookie("userId").value;
			this.model.date = /* @__PURE__ */ new Date();
			await this.cardsStore.setCardsUpdate(this.model);
			this.socketStore.emit("card_list_update_emit");
			this.$emit("card_dialog_form_emit", false);
			this.$emit("card_dialog_update_values_emit");
			this.reset();
		},
		async save() {
			this.model.userId = useCookie("userId").value;
			this.model.date = /* @__PURE__ */ new Date();
			await this.cardsStore.setCardsSave(this.model);
			this.socketStore.emit("card_list_update_emit");
			this.$emit("card_dialog_update_values_emit");
			this.reset();
		},
		saveProcess() {
			if (this.status) this.save();
			else this.update();
		},
		createdProcess() {
			this.selectedCategory = this.categories.find((x) => x.ID == this.model.KategoriId);
			this.selectedProduct = this.products.find((x) => x.ID == this.model.UrunId);
			this.selectedSurface = this.surfaces.find((x) => x.ID == this.model.YuzeyId);
			this.selectedWidth = this.sizes.find((x) => x.ID == this.model.OlcuId);
			this.selectedHeight = this.sizes.find((x) => x.ID == this.model.OlcuId);
			this.selectedEdge = this.sizes.find((x) => x.ID == this.model.OlcuId);
		},
		edgeChange(event) {
			if (typeof event == "string") {
				this.model.OlcuId = null;
				this.model.Kenar = this.capitalizeFirstLetter(event).replace(".", ",");
				this.selectedEdge = this.model.Kenar;
			}
		},
		heightChange(event) {
			if (typeof event == "string") {
				this.model.OlcuId = null;
				this.model.Boy = this.capitalizeFirstLetter(event).replace(".", ",");
				this.selectedHeight = this.model.Boy;
			}
		},
		widthChange(event) {
			if (typeof event == "string") {
				this.model.OlcuId = null;
				this.model.En = this.capitalizeFirstLetter(event).replace(".", ",");
				this.selectedWidth = this.model.En;
			}
		},
		surfaceChange(event) {
			if (typeof event === "string") {
				this.model.YuzeyId = null;
				this.model.YuzeyIslemAdi = this.capitalizeFirstLetter(event);
				this.selectedSurface = this.model.YuzeyIslemAdi;
			} else if (event) {
				this.model.YuzeyId = event.ID;
				this.model.YuzeyIslemAdi = event.YuzeyIslemAdi;
				this.selectedSurface = event;
			}
		},
		productChange(event) {
			if (typeof event === "string") {
				this.model.UrunId = null;
				this.model.UrunAdi = this.capitalizeFirstLetter(event);
				this.selectedProduct = this.model.UrunAdi;
			} else if (event) {
				this.model.UrunId = event.ID;
				this.model.UrunAdi = event.UrunAdi;
				this.selectedProduct = event;
			}
		},
		categoryChange(event) {
			if (typeof event === "string") {
				this.model.KategoriId = null;
				this.model.KategoriAdi = this.capitalizeFirstLetter(event);
				this.selectedCategory = this.model.KategoriAdi;
			} else if (event) {
				this.model.KategoriId = event.ID;
				this.model.KategoriAdi = event.KategoriAdi;
				this.selectedCategory = event;
			}
		},
		edgeSelected(event) {
			this.model.OlcuId = event.value.ID;
			this.model.Kenar = event.value.Kenar;
		},
		heightSelected(event) {
			this.model.OlcuId = event.value.ID;
			this.model.Boy = event.value.Boy;
		},
		widthSelected(event) {
			this.model.OlcuId = event.value.ID;
			this.model.En = event.value.En;
		},
		surfaceSelected(event) {
			this.model.YuzeyId = event.value.ID;
			this.model.YuzeyIslemAdi = event.value.YuzeyIslemAdi;
		},
		productSelected(event) {
			this.model.UrunId = event.value.ID;
			this.model.UrunAdi = event.value.UrunAdi;
		},
		categorySelected(event) {
			this.model.KategoriId = event.value.ID;
			this.model.KategoriAdi = event.value.KategoriAdi;
		},
		searchEdge(event) {
			this.filteredEdge = event.query.length == 0 ? this.sizes : this.sizes.filter((edge) => edge.Kenar.toLowerCase().startsWith(event.query.toLowerCase()));
		},
		searchHeight(event) {
			this.filteredHeight = event.query.length == 0 ? this.sizes : this.sizes.filter((height) => height.Boy.toLowerCase().startsWith(event.query.toLowerCase()));
		},
		searchWidth(event) {
			this.filteredWidth = event.query.length == 0 ? this.sizes : this.sizes.filter((width) => width.En.toLowerCase().startsWith(event.query.toLowerCase()));
		},
		searchSurface(event) {
			this.filteredSurface = event.query.length == 0 ? this.surfaces : this.surfaces.filter((surface) => surface.YuzeyIslemAdi.toLowerCase().startsWith(event.query.toLowerCase()));
		},
		searchProduct(event) {
			this.filteredProduct = event.query.length == 0 ? this.products : this.products.filter((product) => product.UrunAdi.toLowerCase().startsWith(event.query.toLowerCase()));
		},
		searchCategory(event) {
			this.filteredCategory = event.query.length == 0 ? this.categories : this.categories.filter((category) => category.KategoriAdi.toLowerCase().startsWith(event.query.toLowerCase()));
		}
	}
}, {
	__name: "CardsForm",
	__ssrInlineRender: true,
	setup(__props) {
		useSocketStore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_FloatLabel = script$2;
			const _component_AutoComplete = script$3;
			const _component_Button = script;
			const _component_DataTable = script$4;
			const _component_Column = script$5;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "container mt-3" }, _attrs))} data-v-a39b11c9><div class="row m-auto mb-3" data-v-a39b11c9><div class="col" data-v-a39b11c9>`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_AutoComplete, {
							modelValue: _ctx.selectedCategory,
							"onUpdate:modelValue": [($event) => _ctx.selectedCategory = $event, ($event) => _ctx.categoryChange($event)],
							inputId: "category",
							suggestions: _ctx.filteredCategory,
							onComplete: ($event) => _ctx.searchCategory($event),
							optionLabel: "KategoriAdi",
							onItemSelect: ($event) => _ctx.categorySelected($event)
						}, null, _parent, _scopeId));
						_push(`<label for="category" data-v-a39b11c9${_scopeId}>Category</label>`);
					} else return [createVNode(_component_AutoComplete, {
						modelValue: _ctx.selectedCategory,
						"onUpdate:modelValue": [($event) => _ctx.selectedCategory = $event, ($event) => _ctx.categoryChange($event)],
						inputId: "category",
						suggestions: _ctx.filteredCategory,
						onComplete: ($event) => _ctx.searchCategory($event),
						optionLabel: "KategoriAdi",
						onItemSelect: ($event) => _ctx.categorySelected($event)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"suggestions",
						"onComplete",
						"onItemSelect"
					]), createVNode("label", { for: "category" }, "Category")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col" data-v-a39b11c9>`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_AutoComplete, {
							modelValue: _ctx.selectedProduct,
							"onUpdate:modelValue": [($event) => _ctx.selectedProduct = $event, ($event) => _ctx.productChange($event)],
							inputId: "product",
							suggestions: _ctx.filteredProduct,
							onComplete: ($event) => _ctx.searchProduct($event),
							optionLabel: "UrunAdi",
							onItemSelect: ($event) => _ctx.productSelected($event)
						}, null, _parent, _scopeId));
						_push(`<label for="product" data-v-a39b11c9${_scopeId}>Product</label>`);
					} else return [createVNode(_component_AutoComplete, {
						modelValue: _ctx.selectedProduct,
						"onUpdate:modelValue": [($event) => _ctx.selectedProduct = $event, ($event) => _ctx.productChange($event)],
						inputId: "product",
						suggestions: _ctx.filteredProduct,
						onComplete: ($event) => _ctx.searchProduct($event),
						optionLabel: "UrunAdi",
						onItemSelect: ($event) => _ctx.productSelected($event)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"suggestions",
						"onComplete",
						"onItemSelect"
					]), createVNode("label", { for: "product" }, "Product")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col" data-v-a39b11c9>`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_AutoComplete, {
							modelValue: _ctx.selectedSurface,
							"onUpdate:modelValue": [($event) => _ctx.selectedSurface = $event, ($event) => _ctx.surfaceChange($event)],
							inputId: "surface",
							suggestions: _ctx.filteredSurface,
							onComplete: ($event) => _ctx.searchSurface($event),
							optionLabel: "YuzeyIslemAdi",
							onItemSelect: ($event) => _ctx.surfaceSelected($event)
						}, null, _parent, _scopeId));
						_push(`<label for="surface" data-v-a39b11c9${_scopeId}>Surface</label>`);
					} else return [createVNode(_component_AutoComplete, {
						modelValue: _ctx.selectedSurface,
						"onUpdate:modelValue": [($event) => _ctx.selectedSurface = $event, ($event) => _ctx.surfaceChange($event)],
						inputId: "surface",
						suggestions: _ctx.filteredSurface,
						onComplete: ($event) => _ctx.searchSurface($event),
						optionLabel: "YuzeyIslemAdi",
						onItemSelect: ($event) => _ctx.surfaceSelected($event)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"suggestions",
						"onComplete",
						"onItemSelect"
					]), createVNode("label", { for: "surface" }, "Surface")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="row m-auto mb-5" data-v-a39b11c9><div class="col" data-v-a39b11c9>`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_AutoComplete, {
							modelValue: _ctx.selectedWidth,
							"onUpdate:modelValue": [($event) => _ctx.selectedWidth = $event, ($event) => _ctx.widthChange($event)],
							inputId: "width",
							suggestions: _ctx.filteredWidth,
							onComplete: ($event) => _ctx.searchWidth($event),
							optionLabel: "En",
							onItemSelect: ($event) => _ctx.widthSelected($event)
						}, null, _parent, _scopeId));
						_push(`<label for="width" data-v-a39b11c9${_scopeId}>Width</label>`);
					} else return [createVNode(_component_AutoComplete, {
						modelValue: _ctx.selectedWidth,
						"onUpdate:modelValue": [($event) => _ctx.selectedWidth = $event, ($event) => _ctx.widthChange($event)],
						inputId: "width",
						suggestions: _ctx.filteredWidth,
						onComplete: ($event) => _ctx.searchWidth($event),
						optionLabel: "En",
						onItemSelect: ($event) => _ctx.widthSelected($event)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"suggestions",
						"onComplete",
						"onItemSelect"
					]), createVNode("label", { for: "width" }, "Width")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col" data-v-a39b11c9>`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_AutoComplete, {
							modelValue: _ctx.selectedHeight,
							"onUpdate:modelValue": [($event) => _ctx.selectedHeight = $event, ($event) => _ctx.heightChange($event)],
							inputId: "height",
							suggestions: _ctx.filteredHeight,
							onComplete: ($event) => _ctx.searchHeight($event),
							optionLabel: "Boy",
							onItemSelect: ($event) => _ctx.heightSelected($event)
						}, null, _parent, _scopeId));
						_push(`<label for="height" data-v-a39b11c9${_scopeId}>Height</label>`);
					} else return [createVNode(_component_AutoComplete, {
						modelValue: _ctx.selectedHeight,
						"onUpdate:modelValue": [($event) => _ctx.selectedHeight = $event, ($event) => _ctx.heightChange($event)],
						inputId: "height",
						suggestions: _ctx.filteredHeight,
						onComplete: ($event) => _ctx.searchHeight($event),
						optionLabel: "Boy",
						onItemSelect: ($event) => _ctx.heightSelected($event)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"suggestions",
						"onComplete",
						"onItemSelect"
					]), createVNode("label", { for: "height" }, "Height")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col" data-v-a39b11c9>`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_AutoComplete, {
							modelValue: _ctx.selectedEdge,
							"onUpdate:modelValue": [($event) => _ctx.selectedEdge = $event, ($event) => _ctx.edgeChange($event)],
							inputId: "edge",
							suggestions: _ctx.filteredEdge,
							onComplete: ($event) => _ctx.searchEdge($event),
							optionLabel: "Kenar",
							onItemSelect: ($event) => _ctx.edgeSelected($event)
						}, null, _parent, _scopeId));
						_push(`<label for="edge" data-v-a39b11c9${_scopeId}>Thickness</label>`);
					} else return [createVNode(_component_AutoComplete, {
						modelValue: _ctx.selectedEdge,
						"onUpdate:modelValue": [($event) => _ctx.selectedEdge = $event, ($event) => _ctx.edgeChange($event)],
						inputId: "edge",
						suggestions: _ctx.filteredEdge,
						onComplete: ($event) => _ctx.searchEdge($event),
						optionLabel: "Kenar",
						onItemSelect: ($event) => _ctx.edgeSelected($event)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"suggestions",
						"onComplete",
						"onItemSelect"
					]), createVNode("label", { for: "edge" }, "Thickness")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="row m-auto mb-5" data-v-a39b11c9><div class="col" data-v-a39b11c9>`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				severity: "success",
				class: "w-100",
				label: "Save",
				onClick: _ctx.saveProcess
			}, null, _parent));
			_push(`</div>`);
			if (!__props.status) {
				_push(`<div class="col" data-v-a39b11c9>`);
				_push(ssrRenderComponent(_component_Button, {
					type: "button",
					severity: "danger",
					class: "w-100",
					label: "Delete",
					onClick: _ctx.deleteForm
				}, null, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
			_push(ssrRenderComponent(_component_DataTable, { value: __props.orders }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_Column, {
							field: "FirmaAdi",
							header: "Customer"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "SiparisNo",
							header: "Po"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "SatisFiyati",
							header: "Price"
						}, {
							body: withCtx((slotProps, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati))}`);
								else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "Miktar",
							header: "Amount"
						}, {
							body: withCtx((slotProps, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar))}`);
								else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "BirimAdi",
							header: "Unit"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "Toplam",
							header: "Total"
						}, {
							body: withCtx((slotProps, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati))}`);
								else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [
						createVNode(_component_Column, {
							field: "FirmaAdi",
							header: "Customer"
						}),
						createVNode(_component_Column, {
							field: "SiparisNo",
							header: "Po"
						}),
						createVNode(_component_Column, {
							field: "SatisFiyati",
							header: "Price"
						}, {
							body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "Miktar",
							header: "Amount"
						}, {
							body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 1)]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "BirimAdi",
							header: "Unit"
						}),
						createVNode(_component_Column, {
							field: "Toplam",
							header: "Total"
						}, {
							body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)]),
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
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cards/Form.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Form_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["__scopeId", "data-v-a39b11c9"]]);
//#endregion
//#region app/pages/operation/cards.vue
var _sfc_main = /*@__PURE__*/ Object.assign({
	computed: {
		cardsStore() {
			return useCardsStore();
		},
		sharedStore() {
			return useSharedStore();
		}
	},
	data() {
		return {
			cards_form_dialog: false,
			model: null
		};
	},
	methods: {
		cardDialogUpdateValues() {
			this.sharedStore.setCardCategoryList();
			this.sharedStore.setCardProductsList();
			this.sharedStore.setCardSurfacesList();
			this.sharedStore.setCardSizesList();
			this.sharedStore.setOrderAllList();
			this.sharedStore.setSelectionSurfaces();
		},
		newForm() {
			this.cardsStore.setCardsButtonStatus(true);
			this.cardsStore.MUT_setCardsOrderList([]);
			this.model = {};
			this.cards_form_dialog = true;
		},
		cardsSelected(event) {
			this.model = event;
			this.cards_form_dialog = true;
			this.cardsStore.setCardsButtonStatus(false);
			this.cardsStore.setCardsOrderList(event.ID);
		}
	}
}, {
	__name: "cards",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const sharedStore = useSharedStore();
		[__temp, __restore] = withAsyncContext(() => useAsyncData("operation-cards", async () => {
			sharedStore.setCardList();
			sharedStore.setCardCategoryList();
			sharedStore.setCardProductsList();
			sharedStore.setCardSurfacesList();
			sharedStore.setCardSizesList();
			sharedStore.setOrderAllList();
			return true;
		}, { server: false })), await __temp, __restore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Button = script;
			const _component_ProductCards = Cards_default;
			const _component_Dialog = script$1;
			const _component_CardsForm = Form_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				severity: "success",
				class: "w-100",
				label: "New",
				onClick: _ctx.newForm
			}, null, _parent));
			_push(ssrRenderComponent(_component_ProductCards, { onCards_selected_emit: ($event) => _ctx.cardsSelected($event) }, null, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.cards_form_dialog,
				"onUpdate:visible": ($event) => _ctx.cards_form_dialog = $event,
				header: "",
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (_ctx.model) _push(ssrRenderComponent(_component_CardsForm, {
							status: _ctx.cardsStore.getCardsButtonStatus,
							model: _ctx.model,
							categories: unref(sharedStore).getCardCategoryList,
							products: unref(sharedStore).getCardProductsList,
							surfaces: unref(sharedStore).getCardSurfacesList,
							sizes: unref(sharedStore).getCardSizesList,
							orders: _ctx.cardsStore.getCardsOrderList,
							onCard_dialog_form_emit: ($event) => _ctx.cards_form_dialog = $event,
							onCard_dialog_update_values_emit: _ctx.cardDialogUpdateValues
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
					} else return [_ctx.model ? (openBlock(), createBlock(_component_CardsForm, {
						key: 0,
						status: _ctx.cardsStore.getCardsButtonStatus,
						model: _ctx.model,
						categories: unref(sharedStore).getCardCategoryList,
						products: unref(sharedStore).getCardProductsList,
						surfaces: unref(sharedStore).getCardSurfacesList,
						sizes: unref(sharedStore).getCardSizesList,
						orders: _ctx.cardsStore.getCardsOrderList,
						onCard_dialog_form_emit: ($event) => _ctx.cards_form_dialog = $event,
						onCard_dialog_update_values_emit: _ctx.cardDialogUpdateValues
					}, null, 8, [
						"status",
						"model",
						"categories",
						"products",
						"surfaces",
						"sizes",
						"orders",
						"onCard_dialog_form_emit",
						"onCard_dialog_update_values_emit"
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/operation/cards.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cards-Cn5nIhIB.mjs.map
