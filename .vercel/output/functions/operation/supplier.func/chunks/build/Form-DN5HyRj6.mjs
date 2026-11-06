import { _ as _plugin_vue_export_helper_default, e as formatPriceUsd, u as useCookie, a as useAppToast, f as formatDecimal } from '../virtual/entry.mjs';
import { n as script$2 } from './button-C8Z7Yc79.mjs';
import { n as script$a } from './column-CT6GXkG2.mjs';
import { n as script$9 } from './datatable-D6ou7HZJ.mjs';
import { n as script$5 } from './inputtext-s6cxdqDx.mjs';
import { n as script$3 } from './checkbox-wtvrQjx7.mjs';
import { n as script$7 } from './autocomplete-5Wwvp4c8.mjs';
import { t as script$8 } from './textarea-DHWHHqLi.mjs';
import { n as script$4 } from './floatlabel-BDqo8RCT.mjs';
import { f as fromIsoDate, t as toIsoDate } from './dates-C-BBx50j.mjs';
import { n as script$b } from './dialog-BB6no0wu.mjs';
import { u as useLegacyApi } from './useLegacyApi-B5zRc7ig.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { u as useModelsStore } from './models-CeLtEMS4.mjs';
import { C as CustomInput_default } from './CustomInput-B9GfGXia.mjs';
import { n as script$6 } from './datepicker-BGpmmzow.mjs';
import { t as script$1 } from './tabpanel-DPLeP9v3.mjs';
import { t as script } from './tabview-BysloIbG.mjs';
import { u as useOrderStore } from './order-C0FMsqTx.mjs';
import { C as Cards_default } from './Cards-D_Ydl_4N.mjs';
import { P as ProformaForm_default, C as CostForm_default, S as SupplierForm_default, D as DocumentForm_default, a as CheckForm_default, b as useCostStore } from './useOrderReferenceData-C-Aooz5D.mjs';
import { mergeProps, withCtx, createVNode, openBlock, createBlock, createCommentVNode, unref, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';

//#region app/components/orderDetail/OrderForm.vue
var _sfc_main$1 = {
	computed: {
		orderStore() {
			return useOrderStore();
		},
		modelsStore() {
			return useModelsStore();
		},
		sharedStore() {
			return useSharedStore();
		}
	},
	props: {
		sourceModel: {
			type: Object,
			required: true
		},
		products: {
			type: Array,
			required: false
		},
		supplier: {
			type: Array,
			required: true
		},
		unit: {
			type: Array,
			required: true
		},
		po: {
			type: String,
			required: false
		},
		detailProductTotal: {
			type: Object,
			required: false
		},
		status: {
			type: Boolean,
			required: false
		}
	},
	data() {
		return {
			model: { ...this.sourceModel ?? {} },
			amount_disabled: false,
			width: 0,
			height: 0,
			thickness: 0,
			product_cards_form_dialog: false,
			categoryName: null,
			productName: null,
			surfaceName: null,
			sizeName: null,
			selectedSupplier: null,
			filteredSupplier: null,
			selectedUnit: null,
			filteredUnit: null,
			selectedOrderProducts: null,
			new_button_disabled: false,
			cancel_button_disabled: true,
			add_button_disabled: true,
			update_button_disabled: true,
			delete_button_disabled: true,
			product_form_disabled: true,
			workerman_button_disabled: true
		};
	},
	watch: { sourceModel(next) {
		this.model = { ...next ?? {} };
	} },
	methods: {
		tonajChange2(event) {
			if (event == 0) {
				this.model.Ton = 0;
				return;
			}
			let coefficient = this.productCoefficient(this.categoryName.split(" ")[0]);
			if (this.thickness == "VAR" || this.thickness == "Various" || this.thickness == "SLAB" || this.thickness == "Slab") this.model.Ton = 0;
			else if (this.selectedUnit.ID == 1) this.model.Ton = coefficient * 10 * this.__typeFloatControl(event) * parseFloat(this.thickness.replace(",", ".")) / 1e3;
			else this.model.Ton = coefficient * 10 * this.__typeFloatControl(event) * parseFloat(this.thickness.replace(",", ".")) / 1e3;
		},
		rowClass(event) {
			if (event == 0 || event == null || event == void 0) return true;
			else return false;
		},
		tonajChange(event) {
			if (event == 0) {
				this.model.Ton = 0;
				this.model.OzelMiktar = 0;
				this.model.Adet = 0;
				return;
			}
			if (this.height == "Free" || this.height == "FREE" || this.height == "VAR" || this.height == "Var" || this.heiht == "Various" || this.height == "SLAB" || this.height == "Slab" || this.height == "PAT" || this.height == "Pat" || this.height == "SET" || this.height == "SINK" || this.width == "Ant" || this.width == "ANT" || this.width == "FRENCH" || this.width == "MINI" || this.thickness == "Other" || this.width == "özel" || this.width == "1 LT") {
				if (this.selectedUnit.ID == 1) this.model.OzelMiktar = this.model.Miktar;
				else if (this.selectedUnit.ID == 2) this.model.Adet = this.model.Miktar;
				else this.model.OzelMiktar = 0;
			} else if (this.selectedUnit.ID == 1) {
				this.model.OzelMiktar = this.model.Miktar;
				this.model.Adet = Math.round(this.__typeFloatControl(event) / (this.__typeFloatControl(this.width) / 100) / (this.__typeFloatControl(this.height) / 100));
			} else if (this.selectedUnit.ID == 2) {
				this.model.OzelMiktar = this.__typeFloatControl(this.width) * this.__typeFloatControl(this.height) * this.__typeFloatControl(event) / 1e4;
				this.model.Adet = this.model.Miktar;
			} else if (this.selectedUnit.ID == 3) {
				if (this.height == "Free" || this.height == "FREE" || this.height == "VAR" || this.height == "Var" || this.heiht == "Various" || this.height == "SLAB" || this.height == "Slab" || this.height == "PAT" || this.height == "Pat" || this.height == "SET" || this.height == "SINK" || this.width == "Ant" || this.width == "ANT" || this.width == "FRENCH" || this.width == "MINI" || this.thickness == "Other" || this.width == "özel" || this.width == "1 LT") {
					this.model.OzelMiktar = 0;
					this.model.Adet = 0;
					this.model.Ton = 0;
				} else {
					this.model.OzelMiktar = this.__typeFloatControl(event) * this.__typeFloatControl(this.width) / 100;
					this.model.Adet = Math.round(this.__typeFloatControl(this.model.OzelMiktar) / (this.__typeFloatControl(this.width) / 100) / (this.__typeFloatControl(this.height) / 100));
				}
			}
			let coefficient = this.productCoefficient(this.categoryName.split(" ")[0]);
			if (this.thickness == "VAR" || this.thickness == "Various" || this.thickness == "SLAB" || this.thickness == "Slab") this.model.Ton = 0;
			else if (this.selectedUnit.ID == 1) this.model.Ton = coefficient * 10 * this.__typeFloatControl(event) * parseFloat(this.thickness.replace(",", ".")) / 1e3;
			else this.model.Ton = coefficient * 10 * this.__typeFloatControl(this.model.OzelMiktar) * parseFloat(this.thickness.replace(",", ".")) / 1e3;
		},
		__typeFloatControl(payload) {
			if (payload.toString().indexOf(",") == -1) return parseFloat(payload);
			else return parseFloat(payload.replace(",", "."));
		},
		oM2Change(en, boy, miktar, birim) {
			if (birim == 1) return miktar;
			else if (birim == 2) {
				if (en == "FR" || en == "FRENCH" || en == "VAR" || en == "Various" || en == "ANT" || en == "SLAB" || en == "1 LT" || en == "Crazy" || en == "Other" || en == "SET" || en == "MINI" || boy == "SET" || boy == "Free" || boy == "FREE") return 0;
				else return (parseFloat(en.replace(",", ".")) / 100 * (parseFloat(boy.replace(",", ".")) / 100) * miktar).toFixed(4);
			} else if (birim == 3) {
				if (en == "FR" || en == "FRENCH" || en == "VAR" || en == "Various" || en == "ANT" || en == "SLAB" || en == "1 LT" || en == "Crazy" || en == "Other" || en == "SET" || en == "MINI" || boy == "SET") return 0;
				else if (boy == "Free" || boy == "FREE") return (miktar * (parseFloat(en.replace(",", ".")) / 100)).toFixed(4);
				else return (miktar / (parseFloat(boy.replace(",", ".")) / 100) * (parseFloat(boy.replace(",", ".")) / 100) * (parseFloat(en.replace(",", ".")) / 100)).toFixed(4);
			} else return 0;
		},
		productCoefficient(event) {
			if (event == "Travertine") return 2.4;
			else if (event == "Marble") return 2.82;
			else if (event == "Limestone") return 2.6;
			else if (event == "Quarts") return 2.5;
			else return 0;
		},
		__nullControl(value) {
			if (value == null || value == "" || value == void 0) return 0;
			else return value;
		},
		deleteItem() {
			if (!confirm("The crates for this product will be returned to stock. Continue?")) return;
			const log = {
				description: this.po + " siparişinden " + this.model.MusteriAciklama + " (" + this.model.Miktar + ") " + this.selectedUnit.BirimAdi + " kalemi silindi.",
				po: this.po,
				color: "#ffec31"
			};
			this.$logs.save(log);
			this.categoryName = null;
			this.productName = null;
			this.surfaceName = null;
			this.sizeName = null;
			this.selectedSupplier = null;
			this.selectedUnit = null;
			this.selectedOrderProducts = null;
			this.product_form_disabled = true;
			this.new_button_disabled = false;
			this.cancel_button_disabled = true;
			this.add_button_disabled = true;
			this.update_button_disabled = true;
			this.delete_button_disabled = true;
			this.workerman_button_disabled = true;
			this.orderStore.setOrderProductDeleted(this.model);
		},
		add() {
			if (this.selectedSupplier === null || this.selectedSupplier === void 0 || this.selectedSupplier === "") {
				useAppToast().error("Please select a supplier.");
				return;
			}
			if (this.selectedUnit === null || this.selectedUnit === void 0 || this.selectedUnit === "") {
				useAppToast().error("Please select a unit.");
				return;
			}
			const log = {
				description: this.po + " siparişine " + this.model.MusteriAciklama + " (" + this.model.Miktar + ") " + this.selectedUnit.BirimAdi + " yeni kalem eklendi.",
				po: this.po,
				color: "#ffec31"
			};
			this.$logs.save(log);
			this.categoryName = null;
			this.productName = null;
			this.surfaceName = null;
			this.sizeName = null;
			this.selectedSupplier = null;
			this.selectedUnit = null;
			this.selectedOrderProducts = null;
			this.product_form_disabled = true;
			this.new_button_disabled = false;
			this.cancel_button_disabled = true;
			this.add_button_disabled = true;
			this.update_button_disabled = true;
			this.delete_button_disabled = true;
			this.model.SatisToplam = this.model.SatisFiyati * this.model.Miktar;
			this.model.SiparisNo = this.po;
			this.workerman_button_disabled = true;
			this.model.Adet = this.__nullControl(this.model.Adet);
			this.orderStore.setOrderProductAdded(this.model);
		},
		update() {
			const log = {
				description: this.po + " siparişinde " + this.model.MusteriAciklama + " (" + this.model.Miktar + ") " + this.selectedUnit.BirimAdi + " kalemi güncellendi.",
				po: this.po,
				color: "#ffec31"
			};
			this.$logs.save(log);
			this.categoryName = null;
			this.productName = null;
			this.surfaceName = null;
			this.sizeName = null;
			this.selectedSupplier = null;
			this.selectedUnit = null;
			this.selectedOrderProducts = null;
			this.product_form_disabled = true;
			this.new_button_disabled = false;
			this.cancel_button_disabled = true;
			this.add_button_disabled = true;
			this.update_button_disabled = true;
			this.delete_button_disabled = true;
			this.model.SatisToplam = this.model.SatisFiyati * this.model.Miktar;
			this.model.SiparisNo = this.po;
			this.workerman_button_disabled = true;
			this.model.Adet = this.__nullControl(this.model.Adet);
			this.orderStore.setOrderProductUpdated(this.model);
		},
		cancelForm() {
			this.new_button_disabled = false;
			this.cancel_button_disabled = true;
			this.add_button_disabled = true;
			this.update_button_disabled = true;
			this.delete_button_disabled = true;
			this.categoryName = null;
			this.productName = null;
			this.surfaceName = null;
			this.sizeName = null;
			this.selectedSupplier = null;
			this.selectedUnit = null;
			this.selectedOrderProducts = null;
			this.product_form_disabled = true;
			this.workerman_button_disabled = true;
			this.modelsStore.setOrderProductModel();
		},
		newForm() {
			this.new_button_disabled = true;
			this.cancel_button_disabled = false;
			this.add_button_disabled = false;
			this.product_form_disabled = false;
			this.model.SiraNo = this.products.length + 1;
			this.amount_disabled = true;
		},
		orderProductsSelected(event) {
			this.product_form_disabled = false;
			this.new_button_disabled = true;
			this.cancel_button_disabled = false;
			this.add_button_disabled = true;
			this.update_button_disabled = false;
			this.delete_button_disabled = false;
			this.workerman_button_disabled = false;
			this.model = event.data;
			this.selectedUnit = this.unit.find((x) => x.ID == event.data.UrunBirimID);
			this.selectedSupplier = this.supplier.find((x) => x.ID == event.data.TedarikciID);
			this.categoryName = event.data.KategoriAdi;
			this.productName = event.data.UrunAdi;
			this.surfaceName = event.data.YuzeyIslemAdi;
			this.sizeName = event.data.En + "x" + event.data.Boy + "x" + event.data.Kenar;
			this.width = event.data.En;
			this.height = event.data.Boy;
			this.thickness = event.data.Kenar;
			this.amount_disabled = false;
			const data = {
				SiparisNo: event.data.SiparisNo,
				FirmaAdi: event.data.FirmaAdi,
				KategoriAdi: event.data.KategoriAdi,
				UrunAdi: event.data.UrunAdi,
				YuzeyIslemAdi: event.data.YuzeyIslemAdi,
				En: event.data.En,
				Boy: event.data.Boy,
				Kenar: event.data.Kenar,
				UretimAciklama: event.data.UretimAciklama,
				Miktar: event.data.Miktar,
				AlisFiyati: event.data.AlisFiyati,
				SatisFiyati: event.data.SatisFiyati,
				ID: event.data.ID
			};
			this.orderStore.setOrderProductionProductDetailNotChangeList(data);
		},
		unitSelected(event) {
			this.model.UrunBirimID = event.value.ID;
			this.amount_disabled = false;
		},
		searchUnit(event) {
			let results;
			if (event.query.length === 0) results = this.unit;
			else results = this.unit.filter((x) => {
				return x.BirimAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredUnit = results;
		},
		supplierSelected(event) {
			this.model.TedarikciID = event.value.ID;
			this.model.FirmaAdi = event.value.FirmaAdi;
		},
		searchSupplier(event) {
			let results;
			if (event.query.length === 0) results = this.supplier;
			else results = this.supplier.filter((x) => {
				return x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredSupplier = results;
		},
		card_selected_list() {
			this.sharedStore.setCardList();
			this.product_cards_form_dialog = true;
		},
		productCardsSelected(event) {
			this.product_cards_form_dialog = false;
			this.model.UrunKartID = event.ID;
			this.categoryName = event.KategoriAdi;
			this.productName = event.UrunAdi;
			this.surfaceName = event.YuzeyIslemAdi;
			this.sizeName = event.En + "x" + event.Boy + "x" + event.Kenar;
			this.width = event.En;
			this.height = event.Boy;
			this.thickness = event.Kenar;
			this.model.MusteriAciklama = event.KategoriAdi + "-" + event.UrunAdi + "-" + event.YuzeyIslemAdi + "-" + event.En + "x" + event.Boy + "x" + event.Kenar;
			this.model.UrunAdi = event.UrunAdi;
			this.model.YuzeyIslemAdi = event.YuzeyIslemAdi;
			this.model.En = event.En;
			this.model.Boy = event.Boy;
			this.model.Kenar = event.Kenar;
			this.model.KategoriAdi = event.KategoriAdi;
		}
	}
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_FloatLabel = script$4;
	const _component_InputText = script$5;
	const _component_Button = script$2;
	const _component_AutoComplete = script$7;
	const _component_CustomInput = CustomInput_default;
	const _component_Textarea = script$8;
	const _component_DataTable = script$9;
	const _component_Column = script$a;
	const _component_Dialog = script$b;
	const _component_ProductCards = Cards_default;
	_push(`<div${ssrRenderAttrs(_attrs)} data-v-dc634401><div class="row mt-3" data-v-dc634401><div class="col-4" data-v-dc634401><div class="row mb-4" data-v-dc634401><div class="col-9" data-v-dc634401>`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					class: "w-100",
					id: "productId",
					modelValue: $data.model.UrunKartID,
					"onUpdate:modelValue": ($event) => $data.model.UrunKartID = $event,
					disabled: ""
				}, null, _parent, _scopeId));
				_push(`<label for="productId" data-v-dc634401${_scopeId}>Product Card Id</label>`);
			} else return [createVNode(_component_InputText, {
				class: "w-100",
				id: "productId",
				modelValue: $data.model.UrunKartID,
				"onUpdate:modelValue": ($event) => $data.model.UrunKartID = $event,
				disabled: ""
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productId" }, "Product Card Id")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col" data-v-dc634401>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "secondary",
		label: "@",
		onClick: $options.card_selected_list,
		disabled: $data.product_form_disabled
	}, null, _parent));
	_push(`</div></div>`);
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					class: "w-100",
					id: "category",
					modelValue: $data.categoryName,
					"onUpdate:modelValue": ($event) => $data.categoryName = $event,
					disabled: ""
				}, null, _parent, _scopeId));
				_push(`<label for="category" data-v-dc634401${_scopeId}>Category</label>`);
			} else return [createVNode(_component_InputText, {
				class: "w-100",
				id: "category",
				modelValue: $data.categoryName,
				"onUpdate:modelValue": ($event) => $data.categoryName = $event,
				disabled: ""
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "category" }, "Category")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					class: "w-100",
					id: "product",
					modelValue: $data.productName,
					"onUpdate:modelValue": ($event) => $data.productName = $event,
					disabled: ""
				}, null, _parent, _scopeId));
				_push(`<label for="product" data-v-dc634401${_scopeId}>Product</label>`);
			} else return [createVNode(_component_InputText, {
				class: "w-100",
				id: "product",
				modelValue: $data.productName,
				"onUpdate:modelValue": ($event) => $data.productName = $event,
				disabled: ""
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "product" }, "Product")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					class: "w-100",
					id: "surface",
					modelValue: $data.surfaceName,
					"onUpdate:modelValue": ($event) => $data.surfaceName = $event,
					disabled: ""
				}, null, _parent, _scopeId));
				_push(`<label for="surface" data-v-dc634401${_scopeId}>Surface</label>`);
			} else return [createVNode(_component_InputText, {
				class: "w-100",
				id: "surface",
				modelValue: $data.surfaceName,
				"onUpdate:modelValue": ($event) => $data.surfaceName = $event,
				disabled: ""
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "surface" }, "Surface")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					class: "w-100",
					id: "size",
					modelValue: $data.sizeName,
					"onUpdate:modelValue": ($event) => $data.sizeName = $event,
					disabled: ""
				}, null, _parent, _scopeId));
				_push(`<label for="size" data-v-dc634401${_scopeId}>Size</label>`);
			} else return [createVNode(_component_InputText, {
				class: "w-100",
				id: "size",
				modelValue: $data.sizeName,
				"onUpdate:modelValue": ($event) => $data.sizeName = $event,
				disabled: ""
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "size" }, "Size")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4 w-100" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedSupplier,
					"onUpdate:modelValue": ($event) => $data.selectedSupplier = $event,
					inputId: "supplier",
					suggestions: $data.filteredSupplier,
					onComplete: ($event) => $options.searchSupplier($event),
					onItemSelect: ($event) => $options.supplierSelected($event),
					optionLabel: "FirmaAdi",
					class: "w-100",
					disabled: $data.product_form_disabled
				}, null, _parent, _scopeId));
				_push(`<label for="supplier" data-v-dc634401${_scopeId}>Supplier</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedSupplier,
				"onUpdate:modelValue": ($event) => $data.selectedSupplier = $event,
				inputId: "supplier",
				suggestions: $data.filteredSupplier,
				onComplete: ($event) => $options.searchSupplier($event),
				onItemSelect: ($event) => $options.supplierSelected($event),
				optionLabel: "FirmaAdi",
				class: "w-100",
				disabled: $data.product_form_disabled
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect",
				"disabled"
			]), createVNode("label", { for: "supplier" }, "Supplier")];
		}),
		_: 1
	}, _parent));
	_push(`<div class="row mb-4" data-v-dc634401><div class="col" data-v-dc634401>`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.model.AlisFiyati,
		text: "Purchase Price",
		onOnInput: ($event) => $data.model.AlisFiyati = $event,
		disabled: $data.product_form_disabled
	}, null, _parent));
	_push(`</div><div class="col" data-v-dc634401>`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.model.SatisFiyati,
		text: "Sale Price",
		onOnInput: ($event) => $data.model.SatisFiyati = $event,
		disabled: $data.product_form_disabled
	}, null, _parent));
	_push(`</div></div><div class="row mb-4" data-v-dc634401><div class="col" data-v-dc634401>`);
	_push(ssrRenderComponent(_component_FloatLabel, { class: "w-100" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedUnit,
					"onUpdate:modelValue": ($event) => $data.selectedUnit = $event,
					inputId: "unit",
					suggestions: $data.filteredUnit,
					onComplete: ($event) => $options.searchUnit($event),
					onItemSelect: ($event) => $options.unitSelected($event),
					optionLabel: "BirimAdi",
					class: "w-100",
					disabled: $data.product_form_disabled
				}, null, _parent, _scopeId));
				_push(`<label for="unit" data-v-dc634401${_scopeId}>Unit</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedUnit,
				"onUpdate:modelValue": ($event) => $data.selectedUnit = $event,
				inputId: "unit",
				suggestions: $data.filteredUnit,
				onComplete: ($event) => $options.searchUnit($event),
				onItemSelect: ($event) => $options.unitSelected($event),
				optionLabel: "BirimAdi",
				class: "w-100",
				disabled: $data.product_form_disabled
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect",
				"disabled"
			]), createVNode("label", { for: "unit" }, "Unit")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col" data-v-dc634401>`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.model.Miktar,
		text: "Amount",
		onOnInput: ($event) => $data.model.Miktar = $event,
		disabled: $data.product_form_disabled || $data.amount_disabled,
		onChange: ($event) => $options.tonajChange($event),
		style: { "border": "1px solid red" }
	}, null, _parent));
	_push(`</div><div class="col" data-v-dc634401>`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.model.Adet,
		text: "Piece",
		onOnInput: ($event) => $data.model.Adet = $event,
		disabled: $data.product_form_disabled || $data.amount_disabled
	}, null, _parent));
	_push(`</div></div><div class="row mb-4" data-v-dc634401><div class="col" data-v-dc634401>`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					class: "w-100",
					id: "queue",
					modelValue: $data.model.SiraNo,
					"onUpdate:modelValue": ($event) => $data.model.SiraNo = $event,
					disabled: $data.product_form_disabled
				}, null, _parent, _scopeId));
				_push(`<label for="queue" data-v-dc634401${_scopeId}>#</label>`);
			} else return [createVNode(_component_InputText, {
				class: "w-100",
				id: "queue",
				modelValue: $data.model.SiraNo,
				"onUpdate:modelValue": ($event) => $data.model.SiraNo = $event,
				disabled: $data.product_form_disabled
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"disabled"
			]), createVNode("label", { for: "queue" }, "#")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col" data-v-dc634401>`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.model.OzelMiktar,
		text: "M2",
		onOnInput: ($event) => $data.model.OzelMiktar = $event,
		disabled: $data.product_form_disabled || $data.amount_disabled,
		onChange: ($event) => $options.tonajChange2($event)
	}, null, _parent));
	_push(`</div><div class="col" data-v-dc634401>`);
	_push(ssrRenderComponent(_component_CustomInput, {
		value: $data.model.Ton,
		text: "Ton",
		onOnInput: ($event) => $data.model.Ton = $event,
		disabled: $data.product_form_disabled
	}, null, _parent));
	_push(`</div><div class="col" data-v-dc634401>`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					class: "w-100",
					id: "crate_size",
					modelValue: $data.model.KasaOlcusu,
					"onUpdate:modelValue": ($event) => $data.model.KasaOlcusu = $event,
					disabled: $data.product_form_disabled
				}, null, _parent, _scopeId));
				_push(`<label for="crate_size" data-v-dc634401${_scopeId}>C.Size</label>`);
			} else return [createVNode(_component_InputText, {
				class: "w-100",
				id: "crate_size",
				modelValue: $data.model.KasaOlcusu,
				"onUpdate:modelValue": ($event) => $data.model.KasaOlcusu = $event,
				disabled: $data.product_form_disabled
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"disabled"
			]), createVNode("label", { for: "crate_size" }, "C.Size")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div><div class="row mb-4" data-v-dc634401><div class="col" data-v-dc634401>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "info",
		class: "w-100",
		label: "Labour Cost",
		onClick: ($event) => _ctx.$emit("workerman_selected_emit", $data.model.UrunKartID),
		disabled: $data.workerman_button_disabled
	}, null, _parent));
	_push(`</div></div></div><div class="col-8" data-v-dc634401>`);
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Textarea, {
					modelValue: $data.model.MusteriAciklama,
					"onUpdate:modelValue": ($event) => $data.model.MusteriAciklama = $event,
					rows: "10",
					class: "w-100",
					disabled: $data.product_form_disabled
				}, null, _parent, _scopeId));
				_push(`<label data-v-dc634401${_scopeId}>Explanation(EN)</label>`);
			} else return [createVNode(_component_Textarea, {
				modelValue: $data.model.MusteriAciklama,
				"onUpdate:modelValue": ($event) => $data.model.MusteriAciklama = $event,
				rows: "10",
				class: "w-100",
				disabled: $data.product_form_disabled
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"disabled"
			]), createVNode("label", null, "Explanation(EN)")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Textarea, {
					modelValue: $data.model.UretimAciklama,
					"onUpdate:modelValue": ($event) => $data.model.UretimAciklama = $event,
					rows: "10",
					class: "w-100",
					disabled: $data.product_form_disabled
				}, null, _parent, _scopeId));
				_push(`<label data-v-dc634401${_scopeId}>Explanation(TR)</label>`);
			} else return [createVNode(_component_Textarea, {
				modelValue: $data.model.UretimAciklama,
				"onUpdate:modelValue": ($event) => $data.model.UretimAciklama = $event,
				rows: "10",
				class: "w-100",
				disabled: $data.product_form_disabled
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"disabled"
			]), createVNode("label", null, "Explanation(TR)")];
		}),
		_: 1
	}, _parent));
	if ($props.po) {
		_push(`<div class="row mt-4" data-v-dc634401><div class="col" data-v-dc634401>`);
		_push(ssrRenderComponent(_component_Button, {
			type: "button",
			class: "p-button-primary w-100",
			label: "New Product",
			disabled: $data.new_button_disabled,
			onClick: $options.newForm
		}, null, _parent));
		_push(`</div><div class="col" data-v-dc634401>`);
		_push(ssrRenderComponent(_component_Button, {
			type: "button",
			severity: "secondary",
			class: "w-100",
			label: "Cancel",
			disabled: $data.cancel_button_disabled,
			onClick: $options.cancelForm
		}, null, _parent));
		_push(`</div><div class="col" data-v-dc634401>`);
		_push(ssrRenderComponent(_component_Button, {
			type: "button",
			severity: "success",
			class: "w-100",
			label: "Add",
			disabled: $data.add_button_disabled,
			onClick: $options.add
		}, null, _parent));
		_push(`</div><div class="col" data-v-dc634401>`);
		_push(ssrRenderComponent(_component_Button, {
			type: "button",
			severity: "warn",
			class: "w-100",
			label: "Update",
			disabled: $data.update_button_disabled,
			onClick: $options.update
		}, null, _parent));
		_push(`</div><div class="col" data-v-dc634401>`);
		_push(ssrRenderComponent(_component_Button, {
			type: "button",
			severity: "danger",
			class: "w-100",
			label: "Delete",
			disabled: $data.delete_button_disabled,
			onClick: $options.deleteItem
		}, null, _parent));
		_push(`</div></div>`);
	} else _push(`<!---->`);
	_push(`</div></div><div class="row m-auto text-center" data-v-dc634401><div class="col-1" style="${ssrRenderStyle({
		"background-color": "#4287f5",
		"width": "25px",
		"height": "25px"
	})}" data-v-dc634401></div><div class="col-1" data-v-dc634401>İşçilik Var</div><div class="col-1" style="${ssrRenderStyle({
		"background-color": "#81fca0",
		"width": "25px",
		"height": "25px"
	})}" data-v-dc634401></div><div class="col-1" data-v-dc634401>Alış Fiyatı Eksik</div></div>`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $props.products,
		selection: $data.selectedOrderProducts,
		"onUpdate:selection": ($event) => $data.selectedOrderProducts = $event,
		selectionMode: "single",
		onRowClick: ($event) => $options.orderProductsSelected($event),
		sortField: "SiraNo",
		sortOrder: 1
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "SiraNo",
					header: "#"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`<div style="${ssrRenderStyle({ backgroundColor: slotProps.data.Iscilik > 0 ? "#4287f5" : "" })}" data-v-dc634401${_scopeId}>${ssrInterpolate(slotProps.data.SiraNo)}</div>`);
						else return [createVNode("div", { style: { backgroundColor: slotProps.data.Iscilik > 0 ? "#4287f5" : "" } }, toDisplayString(slotProps.data.SiraNo), 5)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "FirmaAdi",
					header: "Supplier"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`<div style="${ssrRenderStyle({ backgroundColor: $options.rowClass(slotProps.data.AlisFiyati) ? "#81fca0" : "#fff" })}" data-v-dc634401${_scopeId}>${ssrInterpolate(slotProps.data.FirmaAdi)}</div>`);
						else return [createVNode("div", { style: { backgroundColor: $options.rowClass(slotProps.data.AlisFiyati) ? "#81fca0" : "#fff" } }, toDisplayString(slotProps.data.FirmaAdi), 5)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "UrunAdi",
					header: "Product"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "YuzeyIslemAdi",
					header: "Surface"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "En",
					header: "Width"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Boy",
					header: "Height"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Kenar",
					header: "Thickness"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, { header: "M2" }, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (slotProps.data.UrunBirimID == 1) _push(`<div style="${ssrRenderStyle({ backgroundColor: slotProps.data.UrunBirimID == 1 ? "red" : "" })}" data-v-dc634401${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar))}</div>`);
							else _push(`<div style="${ssrRenderStyle({ backgroundColor: slotProps.data.UrunBirimID == 1 ? "red" : "" })}" data-v-dc634401${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.OzelMiktar))}</div>`);
						} else return [slotProps.data.UrunBirimID == 1 ? (openBlock(), createBlock("div", {
							key: 0,
							style: { backgroundColor: slotProps.data.UrunBirimID == 1 ? "red" : "" }
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 5)) : (openBlock(), createBlock("div", {
							key: 1,
							style: { backgroundColor: slotProps.data.UrunBirimID == 1 ? "red" : "" }
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.OzelMiktar)), 5))];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.m2))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.m2)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, { header: "Piece" }, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (slotProps.data.UrunBirimID == 2) _push(`<div style="${ssrRenderStyle({ backgroundColor: slotProps.data.UrunBirimID == 2 ? "red" : "" })}" data-v-dc634401${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar))}</div>`);
							else _push(`<div style="${ssrRenderStyle({ backgroundColor: slotProps.data.UrunBirimID == 2 ? "red" : "" })}" data-v-dc634401${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Adet))}</div>`);
						} else return [slotProps.data.UrunBirimID == 2 ? (openBlock(), createBlock("div", {
							key: 0,
							style: { backgroundColor: slotProps.data.UrunBirimID == 2 ? "red" : "" }
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 5)) : (openBlock(), createBlock("div", {
							key: 1,
							style: { backgroundColor: slotProps.data.UrunBirimID == 2 ? "red" : "" }
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Adet)), 5))];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.piece))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.piece)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, { header: "MT" }, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (slotProps.data.UrunBirimID == 3) _push(`<div style="${ssrRenderStyle({ backgroundColor: slotProps.data.UrunBirimID == 3 ? "red" : "" })}" data-v-dc634401${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar))}</div>`);
							else _push(`<div style="${ssrRenderStyle({ backgroundColor: slotProps.data.UrunBirimID == 3 ? "red" : "" })}" data-v-dc634401${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(0))}</div>`);
						} else return [slotProps.data.UrunBirimID == 3 ? (openBlock(), createBlock("div", {
							key: 0,
							style: { backgroundColor: slotProps.data.UrunBirimID == 3 ? "red" : "" }
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 5)) : (openBlock(), createBlock("div", {
							key: 1,
							style: { backgroundColor: slotProps.data.UrunBirimID == 3 ? "red" : "" }
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(0)), 5))];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.mt))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.mt)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Ton",
					header: "Ton"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.ton)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "OzelMiktar",
					header: "Ö.M"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.OzelMiktar))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.OzelMiktar)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
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
				_push(ssrRenderComponent(_component_Column, { header: "Total" }, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Miktar * slotProps.data.SatisFiyati))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Miktar * slotProps.data.SatisFiyati)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductTotal.total))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductTotal.total)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "SiraNo",
					header: "#"
				}, {
					body: withCtx((slotProps) => [createVNode("div", { style: { backgroundColor: slotProps.data.Iscilik > 0 ? "#4287f5" : "" } }, toDisplayString(slotProps.data.SiraNo), 5)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "FirmaAdi",
					header: "Supplier"
				}, {
					body: withCtx((slotProps) => [createVNode("div", { style: { backgroundColor: $options.rowClass(slotProps.data.AlisFiyati) ? "#81fca0" : "#fff" } }, toDisplayString(slotProps.data.FirmaAdi), 5)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "UrunAdi",
					header: "Product"
				}),
				createVNode(_component_Column, {
					field: "YuzeyIslemAdi",
					header: "Surface"
				}),
				createVNode(_component_Column, {
					field: "En",
					header: "Width"
				}),
				createVNode(_component_Column, {
					field: "Boy",
					header: "Height"
				}),
				createVNode(_component_Column, {
					field: "Kenar",
					header: "Thickness"
				}),
				createVNode(_component_Column, { header: "M2" }, {
					body: withCtx((slotProps) => [slotProps.data.UrunBirimID == 1 ? (openBlock(), createBlock("div", {
						key: 0,
						style: { backgroundColor: slotProps.data.UrunBirimID == 1 ? "red" : "" }
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 5)) : (openBlock(), createBlock("div", {
						key: 1,
						style: { backgroundColor: slotProps.data.UrunBirimID == 1 ? "red" : "" }
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.OzelMiktar)), 5))]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.m2)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, { header: "Piece" }, {
					body: withCtx((slotProps) => [slotProps.data.UrunBirimID == 2 ? (openBlock(), createBlock("div", {
						key: 0,
						style: { backgroundColor: slotProps.data.UrunBirimID == 2 ? "red" : "" }
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 5)) : (openBlock(), createBlock("div", {
						key: 1,
						style: { backgroundColor: slotProps.data.UrunBirimID == 2 ? "red" : "" }
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Adet)), 5))]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.piece)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, { header: "MT" }, {
					body: withCtx((slotProps) => [slotProps.data.UrunBirimID == 3 ? (openBlock(), createBlock("div", {
						key: 0,
						style: { backgroundColor: slotProps.data.UrunBirimID == 3 ? "red" : "" }
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 5)) : (openBlock(), createBlock("div", {
						key: 1,
						style: { backgroundColor: slotProps.data.UrunBirimID == 3 ? "red" : "" }
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(0)), 5))]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.mt)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Ton",
					header: "Ton"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.detailProductTotal.ton)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "OzelMiktar",
					header: "Ö.M"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.OzelMiktar)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SatisFiyati",
					header: "Price"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, { header: "Total" }, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Miktar * slotProps.data.SatisFiyati)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductTotal.total)), 1)]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_Dialog, {
		visible: $data.product_cards_form_dialog,
		"onUpdate:visible": ($event) => $data.product_cards_form_dialog = $event,
		header: "Product Data",
		modal: ""
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(ssrRenderComponent(_component_ProductCards, { onCards_selected_emit: ($event) => $options.productCardsSelected($event) }, null, _parent, _scopeId));
			else return [createVNode(_component_ProductCards, { onCards_selected_emit: ($event) => $options.productCardsSelected($event) }, null, 8, ["onCards_selected_emit"])];
		}),
		_: 1
	}, _parent));
	_push(`</div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/orderDetail/OrderForm.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var OrderForm_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-dc634401"]]), { __name: "OrderDetailOrderForm" });
//#endregion
//#region app/components/orderDetail/Form.vue
var _sfc_main = {
	computed: {
		sharedStore() {
			return useSharedStore();
		},
		costStore() {
			return useCostStore();
		}
	},
	props: {
		modelProduction: {
			type: Object,
			required: true
		},
		modelProduct: {
			type: Object,
			required: true
		},
		status: {
			type: Boolean,
			required: true
		},
		customer: {
			type: Array,
			required: true
		},
		user: {
			type: Array,
			required: true
		},
		productsList: {
			type: Array,
			required: false
		},
		supplier: {
			type: Array,
			required: false
		},
		unit: {
			type: Array,
			required: false
		},
		po: {
			type: String,
			required: false
		},
		delivery: {
			type: Array,
			required: true
		},
		payment: {
			type: Array,
			required: true
		},
		country: {
			type: Array,
			required: true
		},
		invoice: {
			type: Array,
			required: true
		},
		cost: {
			type: Array,
			required: false
		},
		costTotal: {
			type: Number,
			required: false
		},
		supplierDelivery: {
			type: Array,
			required: true
		},
		productSupplier: {
			type: Array,
			required: true
		},
		supplierProduct: {
			type: Array,
			required: false
		},
		document: {
			type: Array,
			required: false
		},
		check: {
			type: Array,
			required: false
		},
		checkTotal: {
			type: Object,
			required: false
		},
		productCalculation: {
			type: Number,
			required: false
		},
		freightCalculation: {
			type: Number,
			required: false
		},
		detailCalculation: {
			type: Number,
			required: false
		},
		detailProductTotal: {
			type: Object,
			required: false
		},
		detailProductCost: {
			type: Object,
			required: false
		},
		saveButtonStatus: {
			type: Boolean,
			required: false
		},
		proformaUploadButtonStatus: {
			type: Boolean,
			required: false
		},
		statusAlfa: {
			type: Boolean,
			required: false
		},
		insuranceCalculation: {
			type: Number,
			required: true
		},
		source: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			selectedControlBoolean: false,
			prepaymentDisabledForm: true,
			guess_loading_date: null,
			order_date: null,
			filteredCustomer: null,
			selectedCustomer: null,
			selectedOrderer: null,
			filteredOrderer: null,
			selectedOperation: null,
			filteredOperation: null,
			selectedFinanceman: null,
			filteredFinanceman: null,
			load_date: null,
			eta_date: null
		};
	},
	created() {
		if (!this.status) this.createdProcess();
	},
	methods: {
		controlBooleanSelected(event) {
			this.modelProduction.SiparisKontrol = this.selectedControlBoolean;
			if (this.selectedControlBoolean) {
				const date = /* @__PURE__ */ new Date();
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				const hour = date.getHours();
				const minutes = date.getMinutes();
				const payload = {
					po: this.modelProduction.SiparisNo,
					kontrol_eden: useCookie("username").value,
					date: year + "/" + month + "/" + day + "/ " + hour + ":" + minutes
				};
				useLegacyApi().post("/mail/product/control/send", payload).then((response) => {
					if (response.data.status) useAppToast().success("Mail gönderildi. Kaydetmeyi unutmayınız.");
					else useAppToast().error("Mail gönderilemedi.");
				});
			}
		},
		inputPo(event) {
			this.modelProduction.SiparisNo = event.toUpperCase();
			if (this.sharedStore.getOrdersAllList.find((x) => x.SiparisNo == event)) useAppToast().warn("Bu po ya ait sipariş bulunmakta.");
		},
		__nullControl(value) {
			if (value == null || value == "null" || value == void 0 || value == "") return 0;
			else return parseFloat(value);
		},
		prePaymentIsActivated(event) {
			let prepayment = 0;
			this.productsList.forEach((product) => {
				prepayment += product.SatisToplam;
			});
			prepayment += this.__nullControl(this.modelProduction.NavlunSatis);
			prepayment += this.__nullControl(this.modelProduction.DetayTutar_1);
			prepayment += this.__nullControl(this.modelProduction.DetayTutar_2);
			prepayment += this.__nullControl(this.modelProduction.DetayTutar_3);
			if (event == 1) {
				this.prepaymentDisabledForm = true;
				this.modelProduction.Pesinat = prepayment;
			} else if (event == 2) {
				this.prepaymentDisabledForm = false;
				this.modelProduction.Pesinat = 0;
			} else {
				this.prepaymentDisabledForm = true;
				this.modelProduction.Pesinat = 0;
			}
		},
		guessLoadingDateSelected(event) {
			this.modelProduction.TahminiYuklemeTarihi = toIsoDate(event);
		},
		orderDateSelected(event) {
			this.modelProduction.SiparisTarihi = toIsoDate(event);
		},
		financemanSelected(event) {
			this.modelProduction.Finansman = event.value.ID;
			this.modelProduction.FinansmanAdi = event.value.KullaniciAdi;
		},
		searchFinanceman(event) {
			let results;
			if (event.query.length == 0) results = this.user;
			else results = this.user.filter((x) => {
				return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredFinanceman = results;
		},
		operationSelected(event) {
			this.modelProduction.Operasyon = event.value.ID;
			this.modelProduction.operationMail = event.value.MailAdres;
			this.modelProduction.OperasyonAdi = event.value.KullaniciAdi;
		},
		searchOperation(event) {
			let results;
			if (event.query.length == 0) results = this.user;
			else results = this.user.filter((x) => {
				return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredOperation = results;
		},
		searchOrderer(event) {
			let results;
			if (event.query.length == 0) results = this.user;
			else results = this.user.filter((x) => {
				return x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredOrderer = results;
		},
		ordererSelected(event) {
			this.modelProduction.SiparisSahibi = event.value.ID;
			this.modelProduction.SiparisSahibiAdi = event.value.KullaniciAdi;
			this.modelProduction.representativeMail = event.value.MailAdres;
		},
		customerSelected(event) {
			this.modelProduction.MusteriID = event.value.ID;
			this.modelProduction.MusteriAdi = event.value.FirmaAdi;
		},
		searchCustomer(event) {
			let results;
			if (event.query.length == 0) results = this.customer;
			else results = this.customer.filter((x) => {
				return x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredCustomer = results;
		},
		createdProcess() {
			this.guess_loading_date = fromIsoDate(this.modelProduction.TahminiYuklemeTarihi);
			this.order_date = fromIsoDate(this.modelProduction.SiparisTarihi);
			this.selectedCustomer = this.customer.find((x) => x.ID == this.modelProduction.MusteriID);
			this.selectedOrderer = this.user.find((x) => x.ID == this.modelProduction.SiparisSahibi);
			this.selectedOperation = this.user.find((x) => x.ID == this.modelProduction.Operasyon);
			this.selectedFinanceman = this.user.find((x) => x.ID == this.modelProduction.Finansman);
			this.load_date = fromIsoDate(this.modelProduction.YuklemeTarihi);
			this.eta_date = fromIsoDate(this.modelProduction.Eta);
			this.modelProduction.SiparisKontrolEden = useCookie("userId").value;
			if (this.modelProduction.SiparisKontrol == null || this.modelProduction.SiparisKontrol == "" || this.modelProduction.SiparisKontrol == "null" || this.modelProduction.SiparisKontrol == void 0 || this.modelProduction.SiparisKontrol == false) {
				this.selectedControlBoolean = false;
				this.modelProduction.SiparisKontrol = false;
			} else {
				this.selectedControlBoolean = true;
				this.modelProduction.SiparisKontrol = true;
			}
		}
	},
	watch: {},
	mounted() {}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_TabView = script;
	const _component_TabPanel = script$1;
	const _component_OrderDetailOrderForm = OrderForm_default;
	const _component_OrderDetailProformaForm = ProformaForm_default;
	const _component_OrderDetailCostForm = CostForm_default;
	const _component_OrderDetailSupplierForm = SupplierForm_default;
	const _component_OrderDetailDocumentForm = DocumentForm_default;
	const _component_OrderDetailCheckForm = CheckForm_default;
	const _component_Button = script$2;
	const _component_Checkbox = script$3;
	const _component_FloatLabel = script$4;
	const _component_InputText = script$5;
	const _component_DatePicker = script$6;
	const _component_AutoComplete = script$7;
	const _component_CustomInput = CustomInput_default;
	_push(`<div${ssrRenderAttrs(mergeProps({
		class: "row mt-3",
		style: { "padding": "0px 50px" }
	}, _attrs))} data-v-8022a425><div class="col-10" data-v-8022a425>`);
	_push(ssrRenderComponent(_component_TabView, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_TabPanel, { header: "Order" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_OrderDetailOrderForm, {
							sourceModel: $props.modelProduct,
							products: $props.productsList,
							supplier: $props.supplier,
							unit: $props.unit,
							po: $props.po,
							detailProductTotal: $props.detailProductTotal,
							status: $props.status,
							saveButtonStatus: $props.saveButtonStatus,
							onWorkerman_selected_emit: ($event) => _ctx.$emit("workerman_selected_emit", $event)
						}, null, _parent, _scopeId));
						else return [createVNode(_component_OrderDetailOrderForm, {
							sourceModel: $props.modelProduct,
							products: $props.productsList,
							supplier: $props.supplier,
							unit: $props.unit,
							po: $props.po,
							detailProductTotal: $props.detailProductTotal,
							status: $props.status,
							saveButtonStatus: $props.saveButtonStatus,
							onWorkerman_selected_emit: ($event) => _ctx.$emit("workerman_selected_emit", $event)
						}, null, 8, [
							"sourceModel",
							"products",
							"supplier",
							"unit",
							"po",
							"detailProductTotal",
							"status",
							"saveButtonStatus",
							"onWorkerman_selected_emit"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_TabPanel, { header: "Proforma" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_OrderDetailProformaForm, {
							model: $props.modelProduction,
							delivery: $props.delivery,
							payment: $props.payment,
							status: $props.status,
							country: $props.country,
							invoice: $props.invoice,
							po: $props.po,
							proformaUploadButtonStatus: $props.proformaUploadButtonStatus,
							onPrepayment_is_activated_emit: ($event) => $options.prePaymentIsActivated($event),
							source: $props.source
						}, null, _parent, _scopeId));
						else return [createVNode(_component_OrderDetailProformaForm, {
							model: $props.modelProduction,
							delivery: $props.delivery,
							payment: $props.payment,
							status: $props.status,
							country: $props.country,
							invoice: $props.invoice,
							po: $props.po,
							proformaUploadButtonStatus: $props.proformaUploadButtonStatus,
							onPrepayment_is_activated_emit: ($event) => $options.prePaymentIsActivated($event),
							source: $props.source
						}, null, 8, [
							"model",
							"delivery",
							"payment",
							"status",
							"country",
							"invoice",
							"po",
							"proformaUploadButtonStatus",
							"onPrepayment_is_activated_emit",
							"source"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				if (!$props.statusAlfa) _push(ssrRenderComponent(_component_TabPanel, { header: "Cost" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_OrderDetailCostForm, {
							cost: $props.cost,
							total: $props.costTotal
						}, null, _parent, _scopeId));
						else return [createVNode(_component_OrderDetailCostForm, {
							cost: $props.cost,
							total: $props.costTotal
						}, null, 8, ["cost", "total"])];
					}),
					_: 1
				}, _parent, _scopeId));
				else _push(`<!---->`);
				if (!$props.statusAlfa) _push(ssrRenderComponent(_component_TabPanel, { header: "Supplier" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_OrderDetailSupplierForm, {
							modelProduction: $props.modelProduction,
							productSupplier: $props.productSupplier,
							invoice: $props.invoice,
							supplierDelivery: $props.supplierDelivery,
							po: $props.po,
							supplierProduct: $props.supplierProduct
						}, null, _parent, _scopeId));
						else return [createVNode(_component_OrderDetailSupplierForm, {
							modelProduction: $props.modelProduction,
							productSupplier: $props.productSupplier,
							invoice: $props.invoice,
							supplierDelivery: $props.supplierDelivery,
							po: $props.po,
							supplierProduct: $props.supplierProduct
						}, null, 8, [
							"modelProduction",
							"productSupplier",
							"invoice",
							"supplierDelivery",
							"po",
							"supplierProduct"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				else _push(`<!---->`);
				if (!$props.statusAlfa) _push(ssrRenderComponent(_component_TabPanel, { header: "Document" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_OrderDetailDocumentForm, {
							list: $props.document,
							onProforma_delete_emit: ($event) => _ctx.$emit("proforma_delete_emit", $event),
							onIsf_delete_emit: ($event) => _ctx.$emit("isf_delete_emit", $event),
							onDrawing_delete_emit: ($event) => _ctx.$emit("drawing_delete_emit", $event)
						}, null, _parent, _scopeId));
						else return [createVNode(_component_OrderDetailDocumentForm, {
							list: $props.document,
							onProforma_delete_emit: ($event) => _ctx.$emit("proforma_delete_emit", $event),
							onIsf_delete_emit: ($event) => _ctx.$emit("isf_delete_emit", $event),
							onDrawing_delete_emit: ($event) => _ctx.$emit("drawing_delete_emit", $event)
						}, null, 8, [
							"list",
							"onProforma_delete_emit",
							"onIsf_delete_emit",
							"onDrawing_delete_emit"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				else _push(`<!---->`);
				_push(ssrRenderComponent(_component_TabPanel, { header: "Check" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_OrderDetailCheckForm, {
							list: $props.check,
							total: $props.checkTotal
						}, null, _parent, _scopeId));
						else return [createVNode(_component_OrderDetailCheckForm, {
							list: $props.check,
							total: $props.checkTotal
						}, null, 8, ["list", "total"])];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_TabPanel, { header: "Order" }, {
					default: withCtx(() => [createVNode(_component_OrderDetailOrderForm, {
						sourceModel: $props.modelProduct,
						products: $props.productsList,
						supplier: $props.supplier,
						unit: $props.unit,
						po: $props.po,
						detailProductTotal: $props.detailProductTotal,
						status: $props.status,
						saveButtonStatus: $props.saveButtonStatus,
						onWorkerman_selected_emit: ($event) => _ctx.$emit("workerman_selected_emit", $event)
					}, null, 8, [
						"sourceModel",
						"products",
						"supplier",
						"unit",
						"po",
						"detailProductTotal",
						"status",
						"saveButtonStatus",
						"onWorkerman_selected_emit"
					])]),
					_: 1
				}),
				createVNode(_component_TabPanel, { header: "Proforma" }, {
					default: withCtx(() => [createVNode(_component_OrderDetailProformaForm, {
						model: $props.modelProduction,
						delivery: $props.delivery,
						payment: $props.payment,
						status: $props.status,
						country: $props.country,
						invoice: $props.invoice,
						po: $props.po,
						proformaUploadButtonStatus: $props.proformaUploadButtonStatus,
						onPrepayment_is_activated_emit: ($event) => $options.prePaymentIsActivated($event),
						source: $props.source
					}, null, 8, [
						"model",
						"delivery",
						"payment",
						"status",
						"country",
						"invoice",
						"po",
						"proformaUploadButtonStatus",
						"onPrepayment_is_activated_emit",
						"source"
					])]),
					_: 1
				}),
				!$props.statusAlfa ? (openBlock(), createBlock(_component_TabPanel, {
					key: 0,
					header: "Cost"
				}, {
					default: withCtx(() => [createVNode(_component_OrderDetailCostForm, {
						cost: $props.cost,
						total: $props.costTotal
					}, null, 8, ["cost", "total"])]),
					_: 1
				})) : createCommentVNode("", true),
				!$props.statusAlfa ? (openBlock(), createBlock(_component_TabPanel, {
					key: 1,
					header: "Supplier"
				}, {
					default: withCtx(() => [createVNode(_component_OrderDetailSupplierForm, {
						modelProduction: $props.modelProduction,
						productSupplier: $props.productSupplier,
						invoice: $props.invoice,
						supplierDelivery: $props.supplierDelivery,
						po: $props.po,
						supplierProduct: $props.supplierProduct
					}, null, 8, [
						"modelProduction",
						"productSupplier",
						"invoice",
						"supplierDelivery",
						"po",
						"supplierProduct"
					])]),
					_: 1
				})) : createCommentVNode("", true),
				!$props.statusAlfa ? (openBlock(), createBlock(_component_TabPanel, {
					key: 2,
					header: "Document"
				}, {
					default: withCtx(() => [createVNode(_component_OrderDetailDocumentForm, {
						list: $props.document,
						onProforma_delete_emit: ($event) => _ctx.$emit("proforma_delete_emit", $event),
						onIsf_delete_emit: ($event) => _ctx.$emit("isf_delete_emit", $event),
						onDrawing_delete_emit: ($event) => _ctx.$emit("drawing_delete_emit", $event)
					}, null, 8, [
						"list",
						"onProforma_delete_emit",
						"onIsf_delete_emit",
						"onDrawing_delete_emit"
					])]),
					_: 1
				})) : createCommentVNode("", true),
				createVNode(_component_TabPanel, { header: "Check" }, {
					default: withCtx(() => [createVNode(_component_OrderDetailCheckForm, {
						list: $props.check,
						total: $props.checkTotal
					}, null, 8, ["list", "total"])]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col-2" data-v-8022a425>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "success",
		class: "w-100 mb-3",
		label: "Save",
		onClick: ($event) => _ctx.$emit("process"),
		disabled: $props.saveButtonStatus
	}, null, _parent));
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "danger",
		class: "w-100 mb-4",
		label: "Exit",
		onClick: ($event) => _ctx.$emit("close_production_form_emit")
	}, null, _parent));
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "secondary",
		class: "w-100 mb-4",
		label: "Divide",
		onClick: ($event) => _ctx.$emit("divide")
	}, null, _parent));
	_push(`<div class="flex flex-wrap justify-content-center gap-3 mb-4" data-v-8022a425><div class="flex align-items-center" data-v-8022a425>`);
	_push(ssrRenderComponent(_component_Checkbox, {
		modelValue: $data.selectedControlBoolean,
		"onUpdate:modelValue": ($event) => $data.selectedControlBoolean = $event,
		inputId: "ingredient1",
		binary: "",
		onChange: ($event) => $options.controlBooleanSelected($event)
	}, null, _parent));
	_push(`<label for="ingredient1" class="ml-2" data-v-8022a425> Control </label></div></div>`);
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "po",
					modelValue: $props.modelProduction.SiparisNo,
					"onUpdate:modelValue": ($event) => $props.modelProduction.SiparisNo = $event,
					class: "w-100",
					disabled: !$props.status,
					onInput: ($event) => $options.inputPo($event)
				}, null, _parent, _scopeId));
				_push(`<label for="po" data-v-8022a425${_scopeId}>Po</label>`);
			} else return [createVNode(_component_InputText, {
				id: "po",
				modelValue: $props.modelProduction.SiparisNo,
				"onUpdate:modelValue": ($event) => $props.modelProduction.SiparisNo = $event,
				class: "w-100",
				disabled: !$props.status,
				onInput: ($event) => $options.inputPo($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"disabled",
				"onInput"
			]), createVNode("label", { for: "po" }, "Po")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_DatePicker, {
					modelValue: $data.order_date,
					"onUpdate:modelValue": ($event) => $data.order_date = $event,
					inputId: "order_date",
					class: "w-100",
					onDateSelect: ($event) => $options.orderDateSelected($event),
					disabled: !$props.status,
					dateFormat: "dd/mm/yy"
				}, null, _parent, _scopeId));
				_push(`<label for="order_date" data-v-8022a425${_scopeId}>Date</label>`);
			} else return [createVNode(_component_DatePicker, {
				modelValue: $data.order_date,
				"onUpdate:modelValue": ($event) => $data.order_date = $event,
				inputId: "order_date",
				class: "w-100",
				onDateSelect: ($event) => $options.orderDateSelected($event),
				disabled: !$props.status,
				dateFormat: "dd/mm/yy"
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"onDateSelect",
				"disabled"
			]), createVNode("label", { for: "order_date" }, "Date")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_DatePicker, {
					modelValue: $data.guess_loading_date,
					"onUpdate:modelValue": ($event) => $data.guess_loading_date = $event,
					inputId: "guess_loading_date",
					class: "w-100",
					onDateSelect: ($event) => $options.guessLoadingDateSelected($event),
					disabled: !$props.status,
					dateFormat: "dd/mm/yy"
				}, null, _parent, _scopeId));
				_push(`<label for="guess_loading_date" data-v-8022a425${_scopeId}>Estimated Shipment Date</label>`);
			} else return [createVNode(_component_DatePicker, {
				modelValue: $data.guess_loading_date,
				"onUpdate:modelValue": ($event) => $data.guess_loading_date = $event,
				inputId: "guess_loading_date",
				class: "w-100",
				onDateSelect: ($event) => $options.guessLoadingDateSelected($event),
				disabled: !$props.status,
				dateFormat: "dd/mm/yy"
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"onDateSelect",
				"disabled"
			]), createVNode("label", { for: "guess_loading_date" }, "Estimated Shipment Date")];
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
					suggestions: $data.filteredCustomer,
					onComplete: ($event) => $options.searchCustomer($event),
					optionLabel: "FirmaAdi",
					onItemSelect: ($event) => $options.customerSelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="customer" data-v-8022a425${_scopeId}>Customer</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedCustomer,
				"onUpdate:modelValue": ($event) => $data.selectedCustomer = $event,
				inputId: "customer",
				suggestions: $data.filteredCustomer,
				onComplete: ($event) => $options.searchCustomer($event),
				optionLabel: "FirmaAdi",
				onItemSelect: ($event) => $options.customerSelected($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect"
			]), createVNode("label", { for: "customer" }, "Customer")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedOrderer,
					"onUpdate:modelValue": ($event) => $data.selectedOrderer = $event,
					inputId: "user",
					suggestions: $data.filteredOrderer,
					onComplete: ($event) => $options.searchOrderer($event),
					optionLabel: "KullaniciAdi",
					onItemSelect: ($event) => $options.ordererSelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="user" data-v-8022a425${_scopeId}>Seller</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedOrderer,
				"onUpdate:modelValue": ($event) => $data.selectedOrderer = $event,
				inputId: "user",
				suggestions: $data.filteredOrderer,
				onComplete: ($event) => $options.searchOrderer($event),
				optionLabel: "KullaniciAdi",
				onItemSelect: ($event) => $options.ordererSelected($event)
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
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedOperation,
					"onUpdate:modelValue": ($event) => $data.selectedOperation = $event,
					inputId: "operation",
					suggestions: $data.filteredOperation,
					onComplete: ($event) => $options.searchOperation($event),
					optionLabel: "KullaniciAdi",
					onItemSelect: ($event) => $options.operationSelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="operation" data-v-8022a425${_scopeId}>Operation</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedOperation,
				"onUpdate:modelValue": ($event) => $data.selectedOperation = $event,
				inputId: "operation",
				suggestions: $data.filteredOperation,
				onComplete: ($event) => $options.searchOperation($event),
				optionLabel: "KullaniciAdi",
				onItemSelect: ($event) => $options.operationSelected($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect"
			]), createVNode("label", { for: "operation" }, "Operation")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedFinanceman,
					"onUpdate:modelValue": ($event) => $data.selectedFinanceman = $event,
					inputId: "financeman",
					suggestions: $data.filteredFinanceman,
					onComplete: ($event) => $options.searchFinanceman($event),
					optionLabel: "KullaniciAdi",
					onItemSelect: ($event) => $options.financemanSelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="financeman" data-v-8022a425${_scopeId}>Finance</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedFinanceman,
				"onUpdate:modelValue": ($event) => $data.selectedFinanceman = $event,
				inputId: "financeman",
				suggestions: $data.filteredFinanceman,
				onComplete: ($event) => $options.searchFinanceman($event),
				optionLabel: "KullaniciAdi",
				onItemSelect: ($event) => $options.financemanSelected($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete",
				"onItemSelect"
			]), createVNode("label", { for: "financeman" }, "Finance")];
		}),
		_: 1
	}, _parent));
	if (!$props.statusAlfa) _push(ssrRenderComponent(_component_CustomInput, {
		value: $props.modelProduction.Pesinat,
		text: "Prepayment",
		onOnInput: ($event) => $props.modelProduction.Pesinat = $event,
		disabled: $data.prepaymentDisabledForm
	}, null, _parent));
	else _push(`<!---->`);
	_push(`<table class="table mb-4" data-v-8022a425><thead data-v-8022a425><tr data-v-8022a425><th scope="col" data-v-8022a425></th></tr></thead><tbody data-v-8022a425><tr data-v-8022a425><th scope="row" data-v-8022a425>Total</th><td data-v-8022a425>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.productCalculation))}</td></tr><tr data-v-8022a425><th scope="row" data-v-8022a425>Freight Cost</th><td data-v-8022a425>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.freightCalculation))}</td></tr><tr data-v-8022a425><th scope="row" data-v-8022a425>Insurance Cost</th><td data-v-8022a425>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.insuranceCalculation))}</td></tr><tr data-v-8022a425><th scope="row" data-v-8022a425>Total (Other)</th><td data-v-8022a425>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailCalculation))}</td></tr><tr data-v-8022a425><th scope="row" data-v-8022a425>G.Total</th><td data-v-8022a425>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.productCalculation + $props.freightCalculation + $props.detailCalculation + $props.insuranceCalculation))}</td></tr></tbody></table>`);
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_DatePicker, {
					modelValue: $data.load_date,
					"onUpdate:modelValue": ($event) => $data.load_date = $event,
					inputId: "load_date",
					class: "w-100",
					disabled: "",
					dateFormat: "dd/mm/yy"
				}, null, _parent, _scopeId));
				_push(`<label for="load_date" data-v-8022a425${_scopeId}>Shipment Date</label>`);
			} else return [createVNode(_component_DatePicker, {
				modelValue: $data.load_date,
				"onUpdate:modelValue": ($event) => $data.load_date = $event,
				inputId: "load_date",
				class: "w-100",
				disabled: "",
				dateFormat: "dd/mm/yy"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "load_date" }, "Shipment Date")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_DatePicker, {
					modelValue: $data.eta_date,
					"onUpdate:modelValue": ($event) => $data.eta_date = $event,
					inputId: "eta_date",
					class: "w-100",
					disabled: "",
					dateFormat: "dd/mm/yy"
				}, null, _parent, _scopeId));
				_push(`<label for="eta_date" data-v-8022a425${_scopeId}>ETA</label>`);
			} else return [createVNode(_component_DatePicker, {
				modelValue: $data.eta_date,
				"onUpdate:modelValue": ($event) => $data.eta_date = $event,
				inputId: "eta_date",
				class: "w-100",
				disabled: "",
				dateFormat: "dd/mm/yy"
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "eta_date" }, "ETA")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "container",
					modelValue: $props.modelProduction.KonteynerNo,
					"onUpdate:modelValue": ($event) => $props.modelProduction.KonteynerNo = $event,
					class: "w-100",
					disabled: ""
				}, null, _parent, _scopeId));
				_push(`<label for="container" data-v-8022a425${_scopeId}>Container No</label>`);
			} else return [createVNode(_component_InputText, {
				id: "container",
				modelValue: $props.modelProduction.KonteynerNo,
				"onUpdate:modelValue": ($event) => $props.modelProduction.KonteynerNo = $event,
				class: "w-100",
				disabled: ""
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "container" }, "Container No")];
		}),
		_: 1
	}, _parent));
	_push(`<table class="table mb-4" data-v-8022a425><thead data-v-8022a425><tr data-v-8022a425><th scope="col" data-v-8022a425></th></tr></thead><tbody data-v-8022a425><tr data-v-8022a425><th scope="row" data-v-8022a425>Producer</th><td data-v-8022a425>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductCost.supplier))}</td></tr><tr data-v-8022a425><th scope="row" data-v-8022a425>Labour Cost</th><td data-v-8022a425>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductCost.workerman))}</td></tr><tr data-v-8022a425><th scope="row" data-v-8022a425>Freight Quote</th><td data-v-8022a425>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductCost.freight))}</td></tr><tr data-v-8022a425><th scope="row" data-v-8022a425>Other (Cost)</th><td data-v-8022a425>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductCost.detail))}</td></tr><tr data-v-8022a425><th scope="row" data-v-8022a425>Commission</th><td data-v-8022a425>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductCost.brokerage))}</td></tr><tr data-v-8022a425><th scope="row" data-v-8022a425>Fob</th><td data-v-8022a425>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductCost.fob))}</td></tr><tr data-v-8022a425><th scope="row" data-v-8022a425>G. Total</th><td data-v-8022a425>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.detailProductCost.supplier + $props.detailProductCost.workerman + $props.detailProductCost.freight + $props.detailProductCost.detail + $props.detailProductCost.brokerage + $props.detailProductCost.fob))}</td></tr><tr data-v-8022a425><th scope="row" data-v-8022a425>Profit</th><td data-v-8022a425>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.productCalculation + $props.freightCalculation + $props.detailCalculation - ($props.detailProductCost.supplier + $props.detailProductCost.workerman + $props.detailProductCost.freight + $props.detailProductCost.detail + $props.detailProductCost.brokerage + $props.detailProductCost.fob)))}</td></tr></tbody></table></div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/orderDetail/Form.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Form_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-8022a425"]]), { __name: "OrderDetailForm" });

export { Form_default as F };
//# sourceMappingURL=Form-DN5HyRj6.mjs.map
