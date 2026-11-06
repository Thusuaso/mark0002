import { _ as _plugin_vue_export_helper_default, F as FilterMatchMode, e as formatPriceUsd, a as useAppToast } from '../virtual/entry.mjs';
import { n as script$9 } from './button-C8Z7Yc79.mjs';
import { n as script$1 } from './column-CT6GXkG2.mjs';
import { n as script } from './datatable-D6ou7HZJ.mjs';
import { n as script$2 } from './inputtext-s6cxdqDx.mjs';
import { t as script$8 } from './select-T8LIeBQG.mjs';
import { n as script$6 } from './checkbox-wtvrQjx7.mjs';
import { n as script$a } from './autocomplete-5Wwvp4c8.mjs';
import { t as script$7 } from './textarea-DHWHHqLi.mjs';
import { n as script$5 } from './floatlabel-BDqo8RCT.mjs';
import { n as script$b } from './fileupload-Q8ndBK5J.mjs';
import { t as script$4 } from './tabpanel-DPLeP9v3.mjs';
import { t as script$3 } from './tabview-BysloIbG.mjs';
import { u as useSpacesService } from './useSpacesService-BLTjaYTm.mjs';
import { n as script$c } from './picklist-eJqsqssh.mjs';
import { u as usePanelStore } from './panel-Cy-zQdGW.mjs';
import { withCtx, createVNode, mergeProps, openBlock, createBlock, createCommentVNode, unref, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';

//#region app/components/panel/published/List.vue
var _sfc_main$1 = {
	props: { list: {
		type: Array,
		required: false,
		default: () => []
	} },
	emits: ["panel_published_list_selected_emit"],
	data() {
		return {
			panelPublishedFilter: {
				sira: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				urunid: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				urunkod: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				urunadi_en: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				}
			},
			selectedPanelPublishedList: null
		};
	}
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_DataTable = script;
	const _component_Column = script$1;
	const _component_InputText = script$2;
	_push(`<div${ssrRenderAttrs(_attrs)}>`);
	_push(ssrRenderComponent(_component_DataTable, {
		scrollable: "",
		scrollHeight: "var(--app-table-height)",
		value: $props.list,
		class: "p-datatable-sm",
		filters: $data.panelPublishedFilter,
		"onUpdate:filters": ($event) => $data.panelPublishedFilter = $event,
		filterDisplay: "row",
		selection: $data.selectedPanelPublishedList,
		"onUpdate:selection": ($event) => $data.selectedPanelPublishedList = $event,
		selectionMode: "single",
		onRowClick: ($event) => _ctx.$emit("panel_published_list_selected_emit", $event.data),
		sortField: "sira",
		sortOrder: 1
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "sira",
					header: "Queue",
					showFilterMenu: false
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
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
					field: "urunid",
					header: "Product Id",
					showFilterMenu: false
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
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
					field: "urunkod",
					header: "Product Code",
					showFilterMenu: false
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
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
					field: "urunadi_en",
					header: "Product Name",
					showFilterMenu: false
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
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
			} else return [
				createVNode(_component_Column, {
					field: "sira",
					header: "Queue",
					showFilterMenu: false
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
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
					field: "urunid",
					header: "Product Id",
					showFilterMenu: false
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
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
					field: "urunkod",
					header: "Product Code",
					showFilterMenu: false
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
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
					field: "urunadi_en",
					header: "Product Name",
					showFilterMenu: false
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/panel/published/List.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var List_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]), { __name: "PanelPublishedList" });
//#endregion
//#region app/components/panel/ProductForm.vue
var _sfc_main = {
	computed: { panelStore() {
		return usePanelStore();
	} },
	props: {
		model: {
			type: Object,
			required: true
		},
		category: {
			type: Array,
			required: true
		},
		status: {
			type: Boolean,
			required: true
		},
		productId: {
			type: Number,
			required: false
		},
		size: {
			type: Array,
			required: true
		},
		finish: {
			type: Array,
			required: true
		},
		color: {
			type: Array,
			required: true
		},
		area: {
			type: Array,
			required: true
		},
		styl: {
			type: Array,
			required: true
		},
		type: {
			type: Array,
			required: true
		},
		material: {
			type: Array,
			required: true
		},
		edge: {
			type: Array,
			required: true
		},
		sizeList: {
			type: Array,
			required: true
		},
		finishList: {
			type: Array,
			required: true
		},
		colorList: {
			type: Array,
			required: true
		},
		areaList: {
			type: Array,
			required: true
		},
		typeList: {
			type: Array,
			required: true
		},
		materialList: {
			type: Array,
			required: true
		},
		edgeList: {
			type: Array,
			required: true
		},
		styleList: {
			type: Array,
			required: true
		},
		photoList: {
			type: Array,
			required: true
		},
		suggestedList: {
			type: Array,
			required: true
		},
		sizeModel: {
			type: Object,
			required: true
		},
		colorModel: {
			type: Object,
			required: true
		},
		finishModel: {
			type: Object,
			required: true
		},
		areaModel: {
			type: Object,
			required: true
		},
		typeModel: {
			type: Object,
			required: true
		},
		styleModel: {
			type: Object,
			required: true
		},
		materialModel: {
			type: Object,
			required: true
		},
		edgeModel: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			photoListLocal: [],
			suggestedListLocal: [],
			selectedCategory: null,
			selectedStoneType: null,
			selectedSize: null,
			filteredSize: null,
			edditingSize: null,
			selectedColor: null,
			selectedFinish: null,
			selectedArea: null,
			selectedType: null,
			selectedStyle: null,
			selectedMaterial: null,
			selectedEdge: null,
			productSaveButtonDisabled: false,
			reOrderPhotoList: [],
			queueChangeButtonDisabled: true
		};
	},
	created() {
		if (!this.status) this.createdProcess();
	},
	watch: {
		photoList: {
			immediate: true,
			handler(yeni) {
				this.photoListLocal = Array.isArray(yeni) ? [...yeni] : [];
			}
		},
		suggestedList: {
			immediate: true,
			handler(yeni) {
				this.suggestedListLocal = Array.isArray(yeni) ? [...yeni] : [];
			}
		}
	},
	methods: {
		publishChange(event) {
			if (event == false) this.model.unpublished = true;
		},
		__noneNullControl(value) {
			if (value == null || value == " " || value == void 0 || value == "null") return "";
			else return value;
		},
		changeKeywordsEn(event) {
			const data = event.replaceAll(/\s/g, "");
			this.model.keywords_en = data;
		},
		changeKeywordsFr(event) {
			const data = event.replaceAll(/\s/g, "");
			this.model.keywords_fr = data;
		},
		changeKeywordsEs(event) {
			const data = event.replaceAll(/\s/g, "");
			this.model.keywords_es = data;
		},
		changeKeywordsRu(event) {
			const data = event.replaceAll(/\s/g, "");
			this.model.keywords_ru = data;
		},
		changeKeywordsAr(event) {
			const data = event.replaceAll(/\s/g, "");
			this.model.keywords_ar = data;
		},
		changeSizeQueue() {
			this.panelStore.setpanelProductsSizeChangeQueue(this.sizeList);
		},
		onRowReorder(event) {
			let data = event.value;
			let index = 1;
			data.forEach((x) => {
				x.sira = index;
				index++;
			});
			this.panelStore.setPanelProductsSizeListUpdate(data);
		},
		panelProductTestReportUpload(event) {
			useSpacesService().panelProductSendTestReport(event.files[0]).then((response) => {
				if (response) {
					this.model.testrapor = "https://cdn.mekmarimage.com/test-reports/" + event.files[0].name;
					const data = {
						urunid: this.model.urunid,
						testrapor: this.model.testrapor
					};
					this.panelStore.setPanelProductTestReport(data);
				} else useAppToast().error("Test Raporu Yüklenemedi.");
			});
		},
		reOrderSuggested(event) {
			let queue = 1;
			event.value[1].forEach((x) => {
				x.sira = queue;
				queue++;
			});
			let index1 = event.value[1].length;
			let index2 = 0;
			event.value[1].forEach((x) => {
				this.panelStore.setPanelProductSuggestedQueueChange(x);
				index2 += 1;
			});
			if (index1 == index2) useAppToast().success("Önerilen Ürün Sıra Değiştirme Başarılı.");
		},
		moveToSourceSuggested(event) {
			if (confirm("Are you sure you want to delete?")) this.panelStore.setPanelProductSuggestedDelete(event.items[0].Id);
		},
		moveToTargetSuggested(event) {
			if (confirm("Eklemek istiyor musunuz?")) {
				if (this.suggestedListLocal[1].length > 4) {
					alert("Zaten 4 adet eklenmiş.");
					return;
				} else this.panelStore.setPanelProductSuggestedAdd({
					...event.items[0],
					urunid: this.productId
				});
			} else return;
		},
		panelProductPhotoUpload(event) {
			event.files.forEach((x) => {
				const index = this.photoListLocal[0].filter((y) => {
					return y.name == x.name;
				});
				if (index.length > 0) alert("bu fotoğraf ismi daha önce kullanılmış " + index[0].name);
				else {
					let photoModel = {
						Id: 0,
						urunid: 0,
						name: "",
						uzanti: "",
						imagePath: "",
						macPath: "",
						sira: 0
					};
					photoModel.urunid = this.productId;
					photoModel.name = x.name;
					photoModel.uzanti = x.name.split(".")[1];
					photoModel.imagePath = "https://cdn.mekmarimage.com/products/" + x.name;
					photoModel.macPath = "https://cdn.mekmarimage.com/products/" + x.name;
					photoModel.sira = this.photoListLocal[0].length += 1;
					useSpacesService().panelProductSendPhoto(x).then((response) => {
						if (response) this.panelStore.setPanelProductPhotoAdd(photoModel);
					});
				}
			});
		},
		reOrderPhotoChangeButton(event) {
			this.panelStore.setPanelProductPhotoQueueChange(this.reOrderPhotoList);
			this.queueChangeButtonDisabled = true;
		},
		reOrderPhoto(event) {
			let queue = 1;
			event.value[0].forEach((x) => {
				x.sira = queue;
				queue++;
			});
			this.queueChangeButtonDisabled = false;
			this.reOrderPhotoList = event.value[0];
		},
		moveToTargetPhotoAll(event) {
			event.items.forEach((x) => {
				useSpacesService().panelProductPhotoDelete(x.name).then((response) => {
				});
			});
			if (confirm("Are you sure you want to delete?")) this.panelStore.setPanelProductPhotoAllDelete(this.productId);
		},
		moveToTargetPhotoOne(event) {
			if (event.items.length == 0) return;
			else if (confirm("Are you sure you want to delete?")) useSpacesService().panelProductPhotoDelete(event.items[0].name).then((response) => {
				if (response) this.panelStore.setPanelProductPhotoOneDelete(event.items[0].Id);
			});
		},
		deleteEdge(id) {
			if (confirm("Are you sure you want to perform this action?")) this.panelStore.setPanelProductEdgeDelete(id);
		},
		addEdge() {
			this.edgeModel.UrunId = this.productId;
			this.edgeModel.KategoriId = this.model.kategori_id;
			this.panelStore.setPanelProductEdgeAdd(this.edgeModel);
		},
		edgeChange(event) {
			this.edgeModel.KenarId = event.value.ID;
			this.edgeModel.KenarEn = event.value.KenarEn;
			this.edgeModel.KenarFr = event.value.KenarFr;
			this.edgeModel.KenarEs = event.value.KenarEs;
			this.edgeModel.KenarRu = event.value.KenarRu;
		},
		deleteMaterial(id) {
			if (confirm("Are you sure you want to perform this action?")) this.panelStore.setPanelProductMaterialDelete(id);
		},
		addMaterial() {
			this.materialModel.UrunId = this.productId;
			this.materialModel.KategoriId = this.model.kategori_id;
			this.panelStore.setPanelProductMaterialAdd(this.materialModel);
		},
		materialChange(event) {
			this.materialModel.MateryalId = event.value.ID;
			this.materialModel.MateryalEn = event.value.MateryalEn;
			this.materialModel.MateryalFr = event.value.MateryalFr;
			this.materialModel.MateryalEs = event.value.MateryalEs;
			this.materialModel.MateryalRu = event.value.MateryalRu;
		},
		deleteStyle(id) {
			if (confirm("Are you sure you want to perform this action?")) this.panelStore.setPanelProductStyleDelete(id);
		},
		addStyle() {
			this.styleModel.UrunId = this.productId;
			this.styleModel.KategoriId = this.model.kategori_id;
			this.panelStore.setPanelProductStyleAdd(this.styleModel);
		},
		styleChange(event) {
			this.styleModel.StilId = event.value.ID;
			this.styleModel.StilEn = event.value.StilEn;
			this.styleModel.StilFr = event.value.StilFr;
			this.styleModel.StilEs = event.value.StilEs;
			this.styleModel.StilRu = event.value.StilRu;
		},
		deleteType(id) {
			if (confirm("Are you sure you want to perform this action?")) this.panelStore.setPanelProductTypeDelete(id);
		},
		addType() {
			this.typeModel.UrunId = this.productId;
			this.typeModel.KategoriId = this.selectedCategory.Id;
			this.panelStore.setPanelProductTypeAdd(this.typeModel);
		},
		typeChange(event) {
			this.typeModel.TurId = event.value.ID;
			this.typeModel.TurEn = event.value.TurEn;
			this.typeModel.TurFr = event.value.TurFr;
			this.typeModel.TurEs = event.value.TurEs;
			this.typeModel.TurRu = event.value.TurRu;
		},
		deleteArea(id) {
			if (confirm("Are you sure you want to perform this action?")) this.panelStore.setPanelProductAreaDelete(id);
		},
		addArea() {
			this.areaModel.UrunId = this.productId;
			this.panelStore.setPanelProductAreaAdd(this.areaModel);
			this.selectedArea = null;
		},
		areaChange(event) {
			this.areaModel.AreaId = event.value.ID;
			this.areaModel.Areas = event.value.Areas;
			this.areaModel.Areas_fr = event.value.Areas_fr;
			this.areaModel.Areas_es = event.value.Areas_es;
			this.areaModel.Areas_ru = event.value.Areas_ru;
		},
		deleteFinish(id) {
			if (confirm("Are you sure you want to perform this action?")) this.panelStore.setPanelProductFinishDelete(id);
		},
		addFinish() {
			this.finishModel.urunid = this.productId;
			this.selectedFinish = null;
			this.panelStore.setPanelProductFinishAdd(this.finishModel);
		},
		finishChange(event) {
			this.finishModel.finish_en = event.value.finish_en;
			this.finishModel.finish_fr = event.value.finish_fr;
			this.finishModel.finish_es = event.value.finish_es;
			this.finishModel.finish_ru = event.value.finish_ru;
		},
		deleteColor(event) {
			if (confirm("Are you sure you want to perform this action?")) this.panelStore.setPanelProductColorDelete(event);
		},
		addColor() {
			this.colorModel.UrunId = this.productId;
			this.panelStore.setPanelProductColorAdd(this.colorModel);
			this.selectedColor = null;
		},
		colorChange(event) {
			this.colorModel.RenkId = event.value.ID;
			this.colorModel.renk_en = event.value.renk_en;
			this.colorModel.renk_fr = event.value.renk_fr;
			this.colorModel.renk_es = event.value.renk_es;
			this.colorModel.renk_ru = event.value.renk_ru;
		},
		sizeEdditing(event) {
			this.panelStore.setPanelProductSizeUpdate(event.newData);
		},
		deleteSize(id) {
			if (confirm("Are you sure you want to perform this action?")) this.panelStore.setPanelProductSizeDelete(id);
		},
		addSize() {
			this.sizeModel.urunid = this.productId;
			this.panelStore.setPanelProductSizeAdd(this.sizeModel);
			this.selectedSize = null;
		},
		sizeSelected(event) {
			this.sizeModel.ebat = event.value.ebat;
		},
		sizeInput(event) {
			this.sizeModel.ebat = event;
		},
		formatPoint(value) {
			if (value == null || value == " ") return 0;
			else return value.replace(",", ".");
		},
		searchSize(event) {
			let results;
			if (event.query.length == 0) results = this.size;
			else results = this.size.filter((x) => {
				return x.ebat.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredSize = results;
		},
		createdProcess() {
			this.selectedCategory = this.category.find((x) => x.Id == this.model.kategori_id);
			this.selectedStoneType = this.category.find((x) => x.Id == this.model.stonetype);
			this.model.urunadi_en = this.__noneNullControl(this.model.urunadi_en);
			this.model.aciklama_en = this.__noneNullControl(this.model.aciklama_en);
			this.model.anahtarlar_en = this.__noneNullControl(this.model.anahtarlar_en);
			this.model.keywords_en = this.__noneNullControl(this.model.keywords_en);
			this.model.birim = this.__noneNullControl(this.model.birim);
			this.model.urunadi_fr = this.__noneNullControl(this.model.urunadi_fr);
			this.model.aciklama_fr = this.__noneNullControl(this.model.aciklama_fr);
			this.model.anahtarlar_fr = this.__noneNullControl(this.model.anahtarlar_fr);
			this.model.keywords_fr = this.__noneNullControl(this.model.keywords_fr);
			this.model.urunadi_es = this.__noneNullControl(this.model.urunadi_es);
			this.model.aciklama_es = this.__noneNullControl(this.model.aciklama_es);
			this.model.anahtarlar_es = this.__noneNullControl(this.model.anahtarlar_es);
			this.model.keywords_es = this.__noneNullControl(this.model.keywords_es);
			this.model.urunadi_ru = this.__noneNullControl(this.model.urunadi_ru);
			this.model.aciklama_ru = this.__noneNullControl(this.model.aciklama_ru);
			this.model.anahtarlar_ru = this.__noneNullControl(this.model.anahtarlar_ru);
			this.model.keywords_ru = this.__noneNullControl(this.model.keywords_ru);
			this.model.urunadi_ar = this.__noneNullControl(this.model.urunadi_ar);
			this.model.aciklama_ar = this.__noneNullControl(this.model.aciklama_ar);
			this.model.anahtarlar_ar = this.__noneNullControl(this.model.anahtarlar_ar);
			this.model.keywords_ar = this.__noneNullControl(this.model.keywords_ar);
		},
		deleteForm() {
			if (confirm("Are you sure you want to perform this action?")) this.$emit("delete_emit", this.model.urunid);
		},
		process() {
			if (this.status) this.productSaveButtonDisabled = false;
			this.$emit("process_emit", this.model);
		},
		stoneTypeSelected(event) {
			this.model.stonetype = event.value.Id;
		},
		categorySelected(event) {
			this.model.kategori_id = event.value.Id;
		}
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_TabView = script$3;
	const _component_TabPanel = script$4;
	const _component_FloatLabel = script$5;
	const _component_InputText = script$2;
	const _component_Checkbox = script$6;
	const _component_Textarea = script$7;
	const _component_Select = script$8;
	const _component_Button = script$9;
	const _component_AutoComplete = script$a;
	const _component_DataTable = script;
	const _component_Column = script$1;
	const _component_FileUpload = script$b;
	const _component_PickList = script$c;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "test" }, _attrs))} data-v-c5993cf9>`);
	_push(ssrRenderComponent(_component_TabView, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_TabPanel, { header: "Product (En)" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="row mt-3 mb-3" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											id: "productname",
											modelValue: $props.model.urunadi_en,
											"onUpdate:modelValue": ($event) => $props.model.urunadi_en = $event,
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label for="productname" data-v-c5993cf9${_scopeId}>Product Name</label>`);
									} else return [createVNode(_component_InputText, {
										id: "productname",
										modelValue: $props.model.urunadi_en,
										"onUpdate:modelValue": ($event) => $props.model.urunadi_en = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productname" }, "Product Name")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											id: "code",
											modelValue: $props.model.urunkod,
											"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label for="code" data-v-c5993cf9${_scopeId}>Code</label>`);
									} else return [createVNode(_component_InputText, {
										id: "code",
										modelValue: $props.model.urunkod,
										"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "code" }, "Code")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}><div class="flex flex-wrap justify-content-center gap-3" data-v-c5993cf9${_scopeId}><div class="flex align-items-center" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_Checkbox, {
								modelValue: $props.model.yayinla,
								"onUpdate:modelValue": ($event) => $props.model.yayinla = $event,
								inputId: "published",
								binary: "",
								onInput: ($event) => $options.publishChange($event)
							}, null, _parent, _scopeId));
							_push(`<label for="published" class="ml-2" data-v-c5993cf9${_scopeId}> Publish </label></div></div></div></div><div class="row mb-3 m-auto" data-v-c5993cf9${_scopeId}><div class="col-6" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Textarea, {
											modelValue: $props.model.aciklama_en,
											"onUpdate:modelValue": ($event) => $props.model.aciklama_en = $event,
											rows: "10",
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label data-v-c5993cf9${_scopeId}>Description</label>`);
									} else return [createVNode(_component_Textarea, {
										modelValue: $props.model.aciklama_en,
										"onUpdate:modelValue": ($event) => $props.model.aciklama_en = $event,
										rows: "10",
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col-6" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											type: "text",
											modelValue: $props.model.anahtarlar_en,
											"onUpdate:modelValue": ($event) => $props.model.anahtarlar_en = $event,
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label data-v-c5993cf9${_scopeId}>Keywords</label>`);
									} else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: $props.model.anahtarlar_en,
										"onUpdate:modelValue": ($event) => $props.model.anahtarlar_en = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Keywords")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Textarea, {
											modelValue: $props.model.keywords_en,
											"onUpdate:modelValue": ($event) => $props.model.keywords_en = $event,
											rows: "7",
											class: "w-100",
											onInput: ($event) => $options.changeKeywordsEn($event)
										}, null, _parent, _scopeId));
										_push(`<label data-v-c5993cf9${_scopeId}>Hashtags</label>`);
									} else return [createVNode(_component_Textarea, {
										modelValue: $props.model.keywords_en,
										"onUpdate:modelValue": ($event) => $props.model.keywords_en = $event,
										rows: "7",
										class: "w-100",
										onInput: ($event) => $options.changeKeywordsEn($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									]), createVNode("label", null, "Hashtags")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div><div class="row mb-3" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											id: "unit",
											modelValue: $props.model.birim,
											"onUpdate:modelValue": ($event) => $props.model.birim = $event,
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label for="unit" data-v-c5993cf9${_scopeId}>Unit</label>`);
									} else return [createVNode(_component_InputText, {
										id: "unit",
										modelValue: $props.model.birim,
										"onUpdate:modelValue": ($event) => $props.model.birim = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "unit" }, "Unit")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Select, {
											modelValue: $data.selectedCategory,
											"onUpdate:modelValue": ($event) => $data.selectedCategory = $event,
											inputId: "category",
											options: $props.category,
											optionLabel: "kategoriadi_en",
											class: "w-100",
											onChange: ($event) => $options.categorySelected($event)
										}, null, _parent, _scopeId));
										_push(`<label for="category" data-v-c5993cf9${_scopeId}>Category</label>`);
									} else return [createVNode(_component_Select, {
										modelValue: $data.selectedCategory,
										"onUpdate:modelValue": ($event) => $data.selectedCategory = $event,
										inputId: "category",
										options: $props.category,
										optionLabel: "kategoriadi_en",
										class: "w-100",
										onChange: ($event) => $options.categorySelected($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"options",
										"onChange"
									]), createVNode("label", { for: "category" }, "Category")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Select, {
											modelValue: $data.selectedStoneType,
											"onUpdate:modelValue": ($event) => $data.selectedStoneType = $event,
											inputId: "stonetype",
											options: $props.category,
											optionLabel: "kategoriadi_en",
											class: "w-100",
											onChange: ($event) => $options.stoneTypeSelected($event)
										}, null, _parent, _scopeId));
										_push(`<label for="stonetype" data-v-c5993cf9${_scopeId}>Kind of Stone</label>`);
									} else return [createVNode(_component_Select, {
										modelValue: $data.selectedStoneType,
										"onUpdate:modelValue": ($event) => $data.selectedStoneType = $event,
										inputId: "stonetype",
										options: $props.category,
										optionLabel: "kategoriadi_en",
										class: "w-100",
										onChange: ($event) => $options.stoneTypeSelected($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"options",
										"onChange"
									]), createVNode("label", { for: "stonetype" }, "Kind of Stone")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div><div class="row mb-3" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Save",
								onClick: $options.process,
								disabled: $data.productSaveButtonDisabled
							}, null, _parent, _scopeId));
							_push(`</div>`);
							if (!$props.status) {
								_push(`<div class="col" data-v-c5993cf9${_scopeId}>`);
								_push(ssrRenderComponent(_component_Button, {
									type: "button",
									severity: "danger",
									class: "w-100",
									label: "Delete",
									onClick: $options.deleteForm
								}, null, _parent, _scopeId));
								_push(`</div>`);
							} else _push(`<!---->`);
							_push(`</div>`);
						} else return [
							createVNode("div", { class: "row mt-3 mb-3" }, [
								createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
									default: withCtx(() => [createVNode(_component_InputText, {
										id: "productname",
										modelValue: $props.model.urunadi_en,
										"onUpdate:modelValue": ($event) => $props.model.urunadi_en = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productname" }, "Product Name")]),
									_: 1
								})]),
								createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
									default: withCtx(() => [createVNode(_component_InputText, {
										id: "code",
										modelValue: $props.model.urunkod,
										"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "code" }, "Code")]),
									_: 1
								})]),
								createVNode("div", { class: "col" }, [createVNode("div", { class: "flex flex-wrap justify-content-center gap-3" }, [createVNode("div", { class: "flex align-items-center" }, [createVNode(_component_Checkbox, {
									modelValue: $props.model.yayinla,
									"onUpdate:modelValue": ($event) => $props.model.yayinla = $event,
									inputId: "published",
									binary: "",
									onInput: ($event) => $options.publishChange($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								]), createVNode("label", {
									for: "published",
									class: "ml-2"
								}, " Publish ")])])])
							]),
							createVNode("div", { class: "row mb-3 m-auto" }, [createVNode("div", { class: "col-6" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Textarea, {
									modelValue: $props.model.aciklama_en,
									"onUpdate:modelValue": ($event) => $props.model.aciklama_en = $event,
									rows: "10",
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")]),
								_: 1
							})]), createVNode("div", { class: "col-6" }, [createVNode(_component_FloatLabel, { class: "mb-4" }, {
								default: withCtx(() => [createVNode(_component_InputText, {
									type: "text",
									modelValue: $props.model.anahtarlar_en,
									"onUpdate:modelValue": ($event) => $props.model.anahtarlar_en = $event,
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Keywords")]),
								_: 1
							}), createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Textarea, {
									modelValue: $props.model.keywords_en,
									"onUpdate:modelValue": ($event) => $props.model.keywords_en = $event,
									rows: "7",
									class: "w-100",
									onInput: ($event) => $options.changeKeywordsEn($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								]), createVNode("label", null, "Hashtags")]),
								_: 1
							})])]),
							createVNode("div", { class: "row mb-3" }, [
								createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
									default: withCtx(() => [createVNode(_component_InputText, {
										id: "unit",
										modelValue: $props.model.birim,
										"onUpdate:modelValue": ($event) => $props.model.birim = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "unit" }, "Unit")]),
									_: 1
								})]),
								createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
									default: withCtx(() => [createVNode(_component_Select, {
										modelValue: $data.selectedCategory,
										"onUpdate:modelValue": ($event) => $data.selectedCategory = $event,
										inputId: "category",
										options: $props.category,
										optionLabel: "kategoriadi_en",
										class: "w-100",
										onChange: ($event) => $options.categorySelected($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"options",
										"onChange"
									]), createVNode("label", { for: "category" }, "Category")]),
									_: 1
								})]),
								createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
									default: withCtx(() => [createVNode(_component_Select, {
										modelValue: $data.selectedStoneType,
										"onUpdate:modelValue": ($event) => $data.selectedStoneType = $event,
										inputId: "stonetype",
										options: $props.category,
										optionLabel: "kategoriadi_en",
										class: "w-100",
										onChange: ($event) => $options.stoneTypeSelected($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"options",
										"onChange"
									]), createVNode("label", { for: "stonetype" }, "Kind of Stone")]),
									_: 1
								})])
							]),
							createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Save",
								onClick: $options.process,
								disabled: $data.productSaveButtonDisabled
							}, null, 8, ["onClick", "disabled"])]), !$props.status ? (openBlock(), createBlock("div", {
								key: 0,
								class: "col"
							}, [createVNode(_component_Button, {
								type: "button",
								severity: "danger",
								class: "w-100",
								label: "Delete",
								onClick: $options.deleteForm
							}, null, 8, ["onClick"])])) : createCommentVNode("", true)])
						];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_TabPanel, { header: "Product (Fr)" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="row mt-3 mb-3" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											id: "productname",
											modelValue: $props.model.urunadi_fr,
											"onUpdate:modelValue": ($event) => $props.model.urunadi_fr = $event,
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label for="productname" data-v-c5993cf9${_scopeId}>Product Name</label>`);
									} else return [createVNode(_component_InputText, {
										id: "productname",
										modelValue: $props.model.urunadi_fr,
										"onUpdate:modelValue": ($event) => $props.model.urunadi_fr = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productname" }, "Product Name")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											id: "code",
											modelValue: $props.model.urunkod,
											"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label for="code" data-v-c5993cf9${_scopeId}>Code</label>`);
									} else return [createVNode(_component_InputText, {
										id: "code",
										modelValue: $props.model.urunkod,
										"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "code" }, "Code")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div><div class="row mb-3" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Textarea, {
											modelValue: $props.model.aciklama_fr,
											"onUpdate:modelValue": ($event) => $props.model.aciklama_fr = $event,
											rows: "10",
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label data-v-c5993cf9${_scopeId}>Description</label>`);
									} else return [createVNode(_component_Textarea, {
										modelValue: $props.model.aciklama_fr,
										"onUpdate:modelValue": ($event) => $props.model.aciklama_fr = $event,
										rows: "10",
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											type: "text",
											modelValue: $props.model.anahtarlar_fr,
											"onUpdate:modelValue": ($event) => $props.model.anahtarlar_fr = $event,
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label data-v-c5993cf9${_scopeId}>Keywords</label>`);
									} else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: $props.model.anahtarlar_fr,
										"onUpdate:modelValue": ($event) => $props.model.anahtarlar_fr = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Keywords")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Textarea, {
											modelValue: $props.model.keywords_fr,
											"onUpdate:modelValue": ($event) => $props.model.keywords_fr = $event,
											rows: "7",
											class: "w-100",
											onInput: ($event) => $options.changeKeywordsFr($event)
										}, null, _parent, _scopeId));
										_push(`<label data-v-c5993cf9${_scopeId}>Hashtags</label>`);
									} else return [createVNode(_component_Textarea, {
										modelValue: $props.model.keywords_fr,
										"onUpdate:modelValue": ($event) => $props.model.keywords_fr = $event,
										rows: "7",
										class: "w-100",
										onInput: ($event) => $options.changeKeywordsFr($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									]), createVNode("label", null, "Hashtags")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div><div class="row mb-3" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Save",
								onClick: $options.process,
								disabled: $data.productSaveButtonDisabled
							}, null, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								severity: "danger",
								class: "w-100",
								label: "Delete",
								onClick: $options.deleteForm
							}, null, _parent, _scopeId));
							_push(`</div></div>`);
						} else return [
							createVNode("div", { class: "row mt-3 mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_InputText, {
									id: "productname",
									modelValue: $props.model.urunadi_fr,
									"onUpdate:modelValue": ($event) => $props.model.urunadi_fr = $event,
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productname" }, "Product Name")]),
								_: 1
							})]), createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_InputText, {
									id: "code",
									modelValue: $props.model.urunkod,
									"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "code" }, "Code")]),
								_: 1
							})])]),
							createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Textarea, {
									modelValue: $props.model.aciklama_fr,
									"onUpdate:modelValue": ($event) => $props.model.aciklama_fr = $event,
									rows: "10",
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")]),
								_: 1
							})]), createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, { class: "mb-4" }, {
								default: withCtx(() => [createVNode(_component_InputText, {
									type: "text",
									modelValue: $props.model.anahtarlar_fr,
									"onUpdate:modelValue": ($event) => $props.model.anahtarlar_fr = $event,
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Keywords")]),
								_: 1
							}), createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Textarea, {
									modelValue: $props.model.keywords_fr,
									"onUpdate:modelValue": ($event) => $props.model.keywords_fr = $event,
									rows: "7",
									class: "w-100",
									onInput: ($event) => $options.changeKeywordsFr($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								]), createVNode("label", null, "Hashtags")]),
								_: 1
							})])]),
							createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Save",
								onClick: $options.process,
								disabled: $data.productSaveButtonDisabled
							}, null, 8, ["onClick", "disabled"])]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "danger",
								class: "w-100",
								label: "Delete",
								onClick: $options.deleteForm
							}, null, 8, ["onClick"])])])
						];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_TabPanel, { header: "Product (Es)" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="row mt-3 mb-3" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											id: "productname",
											modelValue: $props.model.urunadi_es,
											"onUpdate:modelValue": ($event) => $props.model.urunadi_es = $event,
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label for="productname" data-v-c5993cf9${_scopeId}>Product Name</label>`);
									} else return [createVNode(_component_InputText, {
										id: "productname",
										modelValue: $props.model.urunadi_es,
										"onUpdate:modelValue": ($event) => $props.model.urunadi_es = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productname" }, "Product Name")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											id: "code",
											modelValue: $props.model.urunkod,
											"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label for="code" data-v-c5993cf9${_scopeId}>Code</label>`);
									} else return [createVNode(_component_InputText, {
										id: "code",
										modelValue: $props.model.urunkod,
										"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "code" }, "Code")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div><div class="row mb-3" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Textarea, {
											modelValue: $props.model.aciklama_es,
											"onUpdate:modelValue": ($event) => $props.model.aciklama_es = $event,
											rows: "10",
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label data-v-c5993cf9${_scopeId}>Description</label>`);
									} else return [createVNode(_component_Textarea, {
										modelValue: $props.model.aciklama_es,
										"onUpdate:modelValue": ($event) => $props.model.aciklama_es = $event,
										rows: "10",
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											type: "text",
											modelValue: $props.model.anahtarlar_es,
											"onUpdate:modelValue": ($event) => $props.model.anahtarlar_es = $event,
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label data-v-c5993cf9${_scopeId}>Keywords</label>`);
									} else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: $props.model.anahtarlar_es,
										"onUpdate:modelValue": ($event) => $props.model.anahtarlar_es = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Keywords")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Textarea, {
											modelValue: $props.model.keywords_es,
											"onUpdate:modelValue": ($event) => $props.model.keywords_es = $event,
											rows: "7",
											class: "w-100",
											onInput: ($event) => $options.changeKeywordsEs($event)
										}, null, _parent, _scopeId));
										_push(`<label data-v-c5993cf9${_scopeId}>Hastags</label>`);
									} else return [createVNode(_component_Textarea, {
										modelValue: $props.model.keywords_es,
										"onUpdate:modelValue": ($event) => $props.model.keywords_es = $event,
										rows: "7",
										class: "w-100",
										onInput: ($event) => $options.changeKeywordsEs($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									]), createVNode("label", null, "Hastags")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div><div class="row mb-3" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Save",
								onClick: $options.process,
								disabled: $data.productSaveButtonDisabled
							}, null, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								severity: "danger",
								class: "w-100",
								label: "Delete",
								onClick: $options.deleteForm
							}, null, _parent, _scopeId));
							_push(`</div></div>`);
						} else return [
							createVNode("div", { class: "row mt-3 mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_InputText, {
									id: "productname",
									modelValue: $props.model.urunadi_es,
									"onUpdate:modelValue": ($event) => $props.model.urunadi_es = $event,
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productname" }, "Product Name")]),
								_: 1
							})]), createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_InputText, {
									id: "code",
									modelValue: $props.model.urunkod,
									"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "code" }, "Code")]),
								_: 1
							})])]),
							createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Textarea, {
									modelValue: $props.model.aciklama_es,
									"onUpdate:modelValue": ($event) => $props.model.aciklama_es = $event,
									rows: "10",
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")]),
								_: 1
							})]), createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, { class: "mb-4" }, {
								default: withCtx(() => [createVNode(_component_InputText, {
									type: "text",
									modelValue: $props.model.anahtarlar_es,
									"onUpdate:modelValue": ($event) => $props.model.anahtarlar_es = $event,
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Keywords")]),
								_: 1
							}), createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Textarea, {
									modelValue: $props.model.keywords_es,
									"onUpdate:modelValue": ($event) => $props.model.keywords_es = $event,
									rows: "7",
									class: "w-100",
									onInput: ($event) => $options.changeKeywordsEs($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								]), createVNode("label", null, "Hastags")]),
								_: 1
							})])]),
							createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Save",
								onClick: $options.process,
								disabled: $data.productSaveButtonDisabled
							}, null, 8, ["onClick", "disabled"])]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "danger",
								class: "w-100",
								label: "Delete",
								onClick: $options.deleteForm
							}, null, 8, ["onClick"])])])
						];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_TabPanel, { header: "Ürün (Ru)" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="row mt-3 mb-3" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											id: "productname",
											modelValue: $props.model.urunadi_ru,
											"onUpdate:modelValue": ($event) => $props.model.urunadi_ru = $event,
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label for="productname" data-v-c5993cf9${_scopeId}>Product Name</label>`);
									} else return [createVNode(_component_InputText, {
										id: "productname",
										modelValue: $props.model.urunadi_ru,
										"onUpdate:modelValue": ($event) => $props.model.urunadi_ru = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productname" }, "Product Name")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											id: "code",
											modelValue: $props.model.urunkod,
											"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label for="code" data-v-c5993cf9${_scopeId}>Code</label>`);
									} else return [createVNode(_component_InputText, {
										id: "code",
										modelValue: $props.model.urunkod,
										"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "code" }, "Code")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div><div class="row mb-3" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Textarea, {
											modelValue: $props.model.aciklama_ru,
											"onUpdate:modelValue": ($event) => $props.model.aciklama_ru = $event,
											rows: "10",
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label data-v-c5993cf9${_scopeId}>Description</label>`);
									} else return [createVNode(_component_Textarea, {
										modelValue: $props.model.aciklama_ru,
										"onUpdate:modelValue": ($event) => $props.model.aciklama_ru = $event,
										rows: "10",
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											type: "text",
											modelValue: $props.model.anahtarlar_ru,
											"onUpdate:modelValue": ($event) => $props.model.anahtarlar_ru = $event,
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label data-v-c5993cf9${_scopeId}>Keywords</label>`);
									} else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: $props.model.anahtarlar_ru,
										"onUpdate:modelValue": ($event) => $props.model.anahtarlar_ru = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Keywords")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Textarea, {
											modelValue: $props.model.keywords_ru,
											"onUpdate:modelValue": ($event) => $props.model.keywords_ru = $event,
											rows: "7",
											class: "w-100",
											onInput: ($event) => $options.changeKeywordsRu($event)
										}, null, _parent, _scopeId));
										_push(`<label data-v-c5993cf9${_scopeId}>Hashtags</label>`);
									} else return [createVNode(_component_Textarea, {
										modelValue: $props.model.keywords_ru,
										"onUpdate:modelValue": ($event) => $props.model.keywords_ru = $event,
										rows: "7",
										class: "w-100",
										onInput: ($event) => $options.changeKeywordsRu($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									]), createVNode("label", null, "Hashtags")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div><div class="row mb-3" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Save",
								onClick: $options.process,
								disabled: $data.productSaveButtonDisabled
							}, null, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								severity: "danger",
								class: "w-100",
								label: "Delete",
								onClick: $options.deleteForm
							}, null, _parent, _scopeId));
							_push(`</div></div>`);
						} else return [
							createVNode("div", { class: "row mt-3 mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_InputText, {
									id: "productname",
									modelValue: $props.model.urunadi_ru,
									"onUpdate:modelValue": ($event) => $props.model.urunadi_ru = $event,
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productname" }, "Product Name")]),
								_: 1
							})]), createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_InputText, {
									id: "code",
									modelValue: $props.model.urunkod,
									"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "code" }, "Code")]),
								_: 1
							})])]),
							createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Textarea, {
									modelValue: $props.model.aciklama_ru,
									"onUpdate:modelValue": ($event) => $props.model.aciklama_ru = $event,
									rows: "10",
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")]),
								_: 1
							})]), createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, { class: "mb-4" }, {
								default: withCtx(() => [createVNode(_component_InputText, {
									type: "text",
									modelValue: $props.model.anahtarlar_ru,
									"onUpdate:modelValue": ($event) => $props.model.anahtarlar_ru = $event,
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Keywords")]),
								_: 1
							}), createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Textarea, {
									modelValue: $props.model.keywords_ru,
									"onUpdate:modelValue": ($event) => $props.model.keywords_ru = $event,
									rows: "7",
									class: "w-100",
									onInput: ($event) => $options.changeKeywordsRu($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								]), createVNode("label", null, "Hashtags")]),
								_: 1
							})])]),
							createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Save",
								onClick: $options.process,
								disabled: $data.productSaveButtonDisabled
							}, null, 8, ["onClick", "disabled"])]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "danger",
								class: "w-100",
								label: "Delete",
								onClick: $options.deleteForm
							}, null, 8, ["onClick"])])])
						];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_TabPanel, { header: "Ürün (Ar)" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="row mt-3 mb-3" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											id: "productname",
											modelValue: $props.model.urunadi_ar,
											"onUpdate:modelValue": ($event) => $props.model.urunadi_ar = $event,
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label for="productname" data-v-c5993cf9${_scopeId}>Product Name</label>`);
									} else return [createVNode(_component_InputText, {
										id: "productname",
										modelValue: $props.model.urunadi_ar,
										"onUpdate:modelValue": ($event) => $props.model.urunadi_ar = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productname" }, "Product Name")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											id: "code",
											modelValue: $props.model.urunkod,
											"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label for="code" data-v-c5993cf9${_scopeId}>Code</label>`);
									} else return [createVNode(_component_InputText, {
										id: "code",
										modelValue: $props.model.urunkod,
										"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "code" }, "Code")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div><div class="row mb-3" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Textarea, {
											modelValue: $props.model.aciklama_ar,
											"onUpdate:modelValue": ($event) => $props.model.aciklama_ar = $event,
											rows: "10",
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label data-v-c5993cf9${_scopeId}>Description</label>`);
									} else return [createVNode(_component_Textarea, {
										modelValue: $props.model.aciklama_ar,
										"onUpdate:modelValue": ($event) => $props.model.aciklama_ar = $event,
										rows: "10",
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-4" }, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											type: "text",
											modelValue: $props.model.anahtarlar_ar,
											"onUpdate:modelValue": ($event) => $props.model.anahtarlar_ar = $event,
											class: "w-100"
										}, null, _parent, _scopeId));
										_push(`<label data-v-c5993cf9${_scopeId}>Keywords</label>`);
									} else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: $props.model.anahtarlar_ar,
										"onUpdate:modelValue": ($event) => $props.model.anahtarlar_ar = $event,
										class: "w-100"
									}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Keywords")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Textarea, {
											modelValue: $props.model.keywords_ar,
											"onUpdate:modelValue": ($event) => $props.model.keywords_ar = $event,
											rows: "7",
											class: "w-100",
											onInput: ($event) => $options.changeKeywordsAr($event)
										}, null, _parent, _scopeId));
										_push(`<label data-v-c5993cf9${_scopeId}>Hashtags</label>`);
									} else return [createVNode(_component_Textarea, {
										modelValue: $props.model.keywords_ar,
										"onUpdate:modelValue": ($event) => $props.model.keywords_ar = $event,
										rows: "7",
										class: "w-100",
										onInput: ($event) => $options.changeKeywordsAr($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									]), createVNode("label", null, "Hashtags")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div><div class="row mb-3" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Save",
								onClick: $options.process,
								disabled: $data.productSaveButtonDisabled
							}, null, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								severity: "danger",
								class: "w-100",
								label: "Delete",
								onClick: $options.deleteForm
							}, null, _parent, _scopeId));
							_push(`</div></div>`);
						} else return [
							createVNode("div", { class: "row mt-3 mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_InputText, {
									id: "productname",
									modelValue: $props.model.urunadi_ar,
									"onUpdate:modelValue": ($event) => $props.model.urunadi_ar = $event,
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productname" }, "Product Name")]),
								_: 1
							})]), createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_InputText, {
									id: "code",
									modelValue: $props.model.urunkod,
									"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "code" }, "Code")]),
								_: 1
							})])]),
							createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Textarea, {
									modelValue: $props.model.aciklama_ar,
									"onUpdate:modelValue": ($event) => $props.model.aciklama_ar = $event,
									rows: "10",
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")]),
								_: 1
							})]), createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, { class: "mb-4" }, {
								default: withCtx(() => [createVNode(_component_InputText, {
									type: "text",
									modelValue: $props.model.anahtarlar_ar,
									"onUpdate:modelValue": ($event) => $props.model.anahtarlar_ar = $event,
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Keywords")]),
								_: 1
							}), createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Textarea, {
									modelValue: $props.model.keywords_ar,
									"onUpdate:modelValue": ($event) => $props.model.keywords_ar = $event,
									rows: "7",
									class: "w-100",
									onInput: ($event) => $options.changeKeywordsAr($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								]), createVNode("label", null, "Hashtags")]),
								_: 1
							})])]),
							createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Save",
								onClick: $options.process,
								disabled: $data.productSaveButtonDisabled
							}, null, 8, ["onClick", "disabled"])]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "danger",
								class: "w-100",
								label: "Delete",
								onClick: $options.deleteForm
							}, null, 8, ["onClick"])])])
						];
					}),
					_: 1
				}, _parent, _scopeId));
				if ($props.productId != 0) _push(ssrRenderComponent(_component_TabPanel, { header: "Ölçüler" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_AutoComplete, {
											modelValue: $data.selectedSize,
											"onUpdate:modelValue": ($event) => $data.selectedSize = $event,
											inputId: "size",
											suggestions: $data.filteredSize,
											onComplete: ($event) => $options.searchSize($event),
											optionLabel: "ebat",
											onItemSelect: ($event) => $options.sizeSelected($event),
											onInput: ($event) => $options.sizeInput($event)
										}, null, _parent, _scopeId));
										_push(`<label for="size" data-v-c5993cf9${_scopeId}>Sizes</label>`);
									} else return [createVNode(_component_AutoComplete, {
										modelValue: $data.selectedSize,
										"onUpdate:modelValue": ($event) => $data.selectedSize = $event,
										inputId: "size",
										suggestions: $data.filteredSize,
										onComplete: ($event) => $options.searchSize($event),
										optionLabel: "ebat",
										onItemSelect: ($event) => $options.sizeSelected($event),
										onInput: ($event) => $options.sizeInput($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"suggestions",
										"onComplete",
										"onItemSelect",
										"onInput"
									]), createVNode("label", { for: "size" }, "Sizes")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_InputText, {
											id: "price",
											modelValue: $props.sizeModel.fiyat,
											"onUpdate:modelValue": ($event) => $props.sizeModel.fiyat = $event,
											onInput: ($event) => $props.sizeModel.fiyat = $options.formatPoint($event)
										}, null, _parent, _scopeId));
										_push(`<label for="price" data-v-c5993cf9${_scopeId}>Price</label>`);
									} else return [createVNode(_component_InputText, {
										id: "price",
										modelValue: $props.sizeModel.fiyat,
										"onUpdate:modelValue": ($event) => $props.sizeModel.fiyat = $event,
										onInput: ($event) => $props.sizeModel.fiyat = $options.formatPoint($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									]), createVNode("label", { for: "price" }, "Price")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								severity: "success",
								label: "Add",
								onClick: $options.addSize
							}, null, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								class: "p-button-primary",
								label: "Change Queue",
								onClick: $options.changeSizeQueue
							}, null, _parent, _scopeId));
							_push(`</div></div>`);
							_push(ssrRenderComponent(_component_DataTable, {
								value: $props.sizeList,
								editMode: "row",
								editingRows: $data.edditingSize,
								"onUpdate:editingRows": ($event) => $data.edditingSize = $event,
								onRowEditSave: ($event) => $options.sizeEdditing($event),
								reorderableColumns: true,
								onRowReorder: $options.onRowReorder
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Column, {
											rowReorder: true,
											headerStyle: { width: "3rem" },
											reorderableColumn: false
										}, null, _parent, _scopeId));
										_push(ssrRenderComponent(_component_Column, {
											field: "sira",
											header: "#"
										}, null, _parent, _scopeId));
										_push(ssrRenderComponent(_component_Column, {
											field: "ebat",
											header: "Size"
										}, {
											editor: withCtx((slotProps, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_InputText, {
													modelValue: slotProps.data[slotProps.column.field],
													"onUpdate:modelValue": ($event) => slotProps.data[slotProps.column.field] = $event,
													autofocus: ""
												}, null, _parent, _scopeId));
												else return [createVNode(_component_InputText, {
													modelValue: slotProps.data[slotProps.column.field],
													"onUpdate:modelValue": ($event) => slotProps.data[slotProps.column.field] = $event,
													autofocus: ""
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_Column, {
											field: "fiyat",
											header: "Price"
										}, {
											body: withCtx((slotProps, _push, _parent, _scopeId) => {
												if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.fiyat))}`);
												else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.fiyat)), 1)];
											}),
											editor: withCtx((slotProps, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_InputText, {
													modelValue: slotProps.data[slotProps.column.field],
													"onUpdate:modelValue": ($event) => slotProps.data[slotProps.column.field] = $event,
													autofocus: ""
												}, null, _parent, _scopeId));
												else return [createVNode(_component_InputText, {
													modelValue: slotProps.data[slotProps.column.field],
													"onUpdate:modelValue": ($event) => slotProps.data[slotProps.column.field] = $event,
													autofocus: ""
												}, null, 8, ["modelValue", "onUpdate:modelValue"])];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_Column, {
											rowEditor: true,
											styles: {
												width: "10%",
												"min-width": "8rem"
											},
											bodyStyle: { "text-align": "center" }
										}, null, _parent, _scopeId));
										_push(ssrRenderComponent(_component_Column, null, {
											body: withCtx((slotProps, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_Button, {
													type: "button",
													severity: "danger",
													label: "Delete",
													onClick: ($event) => $options.deleteSize(slotProps.data.Id)
												}, null, _parent, _scopeId));
												else return [createVNode(_component_Button, {
													type: "button",
													severity: "danger",
													label: "Delete",
													onClick: ($event) => $options.deleteSize(slotProps.data.Id)
												}, null, 8, ["onClick"])];
											}),
											_: 1
										}, _parent, _scopeId));
									} else return [
										createVNode(_component_Column, {
											rowReorder: true,
											headerStyle: { width: "3rem" },
											reorderableColumn: false
										}),
										createVNode(_component_Column, {
											field: "sira",
											header: "#"
										}),
										createVNode(_component_Column, {
											field: "ebat",
											header: "Size"
										}, {
											editor: withCtx((slotProps) => [createVNode(_component_InputText, {
												modelValue: slotProps.data[slotProps.column.field],
												"onUpdate:modelValue": ($event) => slotProps.data[slotProps.column.field] = $event,
												autofocus: ""
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_Column, {
											field: "fiyat",
											header: "Price"
										}, {
											body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.fiyat)), 1)]),
											editor: withCtx((slotProps) => [createVNode(_component_InputText, {
												modelValue: slotProps.data[slotProps.column.field],
												"onUpdate:modelValue": ($event) => slotProps.data[slotProps.column.field] = $event,
												autofocus: ""
											}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
											_: 1
										}),
										createVNode(_component_Column, {
											rowEditor: true,
											styles: {
												width: "10%",
												"min-width": "8rem"
											},
											bodyStyle: { "text-align": "center" }
										}),
										createVNode(_component_Column, null, {
											body: withCtx((slotProps) => [createVNode(_component_Button, {
												type: "button",
												severity: "danger",
												label: "Delete",
												onClick: ($event) => $options.deleteSize(slotProps.data.Id)
											}, null, 8, ["onClick"])]),
											_: 1
										})
									];
								}),
								_: 1
							}, _parent, _scopeId));
						} else return [createVNode("div", { class: "row" }, [
							createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_AutoComplete, {
									modelValue: $data.selectedSize,
									"onUpdate:modelValue": ($event) => $data.selectedSize = $event,
									inputId: "size",
									suggestions: $data.filteredSize,
									onComplete: ($event) => $options.searchSize($event),
									optionLabel: "ebat",
									onItemSelect: ($event) => $options.sizeSelected($event),
									onInput: ($event) => $options.sizeInput($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"suggestions",
									"onComplete",
									"onItemSelect",
									"onInput"
								]), createVNode("label", { for: "size" }, "Sizes")]),
								_: 1
							})]),
							createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_InputText, {
									id: "price",
									modelValue: $props.sizeModel.fiyat,
									"onUpdate:modelValue": ($event) => $props.sizeModel.fiyat = $event,
									onInput: ($event) => $props.sizeModel.fiyat = $options.formatPoint($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								]), createVNode("label", { for: "price" }, "Price")]),
								_: 1
							})]),
							createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "success",
								label: "Add",
								onClick: $options.addSize
							}, null, 8, ["onClick"])]),
							createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								class: "p-button-primary",
								label: "Change Queue",
								onClick: $options.changeSizeQueue
							}, null, 8, ["onClick"])])
						]), createVNode(_component_DataTable, {
							value: $props.sizeList,
							editMode: "row",
							editingRows: $data.edditingSize,
							"onUpdate:editingRows": ($event) => $data.edditingSize = $event,
							onRowEditSave: ($event) => $options.sizeEdditing($event),
							reorderableColumns: true,
							onRowReorder: $options.onRowReorder
						}, {
							default: withCtx(() => [
								createVNode(_component_Column, {
									rowReorder: true,
									headerStyle: { width: "3rem" },
									reorderableColumn: false
								}),
								createVNode(_component_Column, {
									field: "sira",
									header: "#"
								}),
								createVNode(_component_Column, {
									field: "ebat",
									header: "Size"
								}, {
									editor: withCtx((slotProps) => [createVNode(_component_InputText, {
										modelValue: slotProps.data[slotProps.column.field],
										"onUpdate:modelValue": ($event) => slotProps.data[slotProps.column.field] = $event,
										autofocus: ""
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_Column, {
									field: "fiyat",
									header: "Price"
								}, {
									body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.fiyat)), 1)]),
									editor: withCtx((slotProps) => [createVNode(_component_InputText, {
										modelValue: slotProps.data[slotProps.column.field],
										"onUpdate:modelValue": ($event) => slotProps.data[slotProps.column.field] = $event,
										autofocus: ""
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}),
								createVNode(_component_Column, {
									rowEditor: true,
									styles: {
										width: "10%",
										"min-width": "8rem"
									},
									bodyStyle: { "text-align": "center" }
								}),
								createVNode(_component_Column, null, {
									body: withCtx((slotProps) => [createVNode(_component_Button, {
										type: "button",
										severity: "danger",
										label: "Delete",
										onClick: ($event) => $options.deleteSize(slotProps.data.Id)
									}, null, 8, ["onClick"])]),
									_: 1
								})
							]),
							_: 1
						}, 8, [
							"value",
							"editingRows",
							"onUpdate:editingRows",
							"onRowEditSave",
							"onRowReorder"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				else _push(`<!---->`);
				if ($props.productId != 0) _push(ssrRenderComponent(_component_TabPanel, { header: "Filters" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="container" data-v-c5993cf9${_scopeId}><h3 class="header" data-v-c5993cf9${_scopeId}>Colors</h3><div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Select, {
											modelValue: $data.selectedColor,
											"onUpdate:modelValue": ($event) => $data.selectedColor = $event,
											inputId: "color",
											options: $props.color,
											optionLabel: "renk_en",
											class: "w-100",
											onChange: ($event) => $options.colorChange($event)
										}, null, _parent, _scopeId));
										_push(`<label for="color" data-v-c5993cf9${_scopeId}>Color</label>`);
									} else return [createVNode(_component_Select, {
										modelValue: $data.selectedColor,
										"onUpdate:modelValue": ($event) => $data.selectedColor = $event,
										inputId: "color",
										options: $props.color,
										optionLabel: "renk_en",
										class: "w-100",
										onChange: ($event) => $options.colorChange($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"options",
										"onChange"
									]), createVNode("label", { for: "color" }, "Color")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Add",
								onClick: $options.addColor
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_DataTable, { value: $props.colorList }, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Column, {
											field: "renk_en",
											header: "Color (En)"
										}, null, _parent, _scopeId));
										_push(ssrRenderComponent(_component_Column, {
											field: "renk_fr",
											header: "Color (Fr)"
										}, null, _parent, _scopeId));
										_push(ssrRenderComponent(_component_Column, {
											field: "renk_es",
											header: "Color (Es)"
										}, null, _parent, _scopeId));
										_push(ssrRenderComponent(_component_Column, {
											field: "renk_ru",
											header: "Color (Ru)"
										}, null, _parent, _scopeId));
										_push(ssrRenderComponent(_component_Column, null, {
											body: withCtx((slotProps, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_Button, {
													type: "button",
													severity: "danger",
													class: "w-100",
													label: "Delete",
													onClick: ($event) => $options.deleteColor(slotProps.data.ID)
												}, null, _parent, _scopeId));
												else return [createVNode(_component_Button, {
													type: "button",
													severity: "danger",
													class: "w-100",
													label: "Delete",
													onClick: ($event) => $options.deleteColor(slotProps.data.ID)
												}, null, 8, ["onClick"])];
											}),
											_: 1
										}, _parent, _scopeId));
									} else return [
										createVNode(_component_Column, {
											field: "renk_en",
											header: "Color (En)"
										}),
										createVNode(_component_Column, {
											field: "renk_fr",
											header: "Color (Fr)"
										}),
										createVNode(_component_Column, {
											field: "renk_es",
											header: "Color (Es)"
										}),
										createVNode(_component_Column, {
											field: "renk_ru",
											header: "Color (Ru)"
										}),
										createVNode(_component_Column, null, {
											body: withCtx((slotProps) => [createVNode(_component_Button, {
												type: "button",
												severity: "danger",
												class: "w-100",
												label: "Delete",
												onClick: ($event) => $options.deleteColor(slotProps.data.ID)
											}, null, 8, ["onClick"])]),
											_: 1
										})
									];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div></div>`);
							if ($data.selectedCategory.Id == 2 || $data.selectedCategory.Id == 1 || $data.selectedCategory.Id == 3 || $data.selectedCategory.Id == 4 || $data.selectedCategory.Id == 8) {
								_push(`<div class="container" data-v-c5993cf9${_scopeId}><h3 class="header" data-v-c5993cf9${_scopeId}>Surfaces</h3><div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
								_push(ssrRenderComponent(_component_FloatLabel, null, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(ssrRenderComponent(_component_Select, {
												modelValue: $data.selectedFinish,
												"onUpdate:modelValue": ($event) => $data.selectedFinish = $event,
												inputId: "finish",
												options: $props.finish,
												optionLabel: "finish_en",
												class: "w-100",
												onChange: ($event) => $options.finishChange($event)
											}, null, _parent, _scopeId));
											_push(`<label for="finish" data-v-c5993cf9${_scopeId}>Surface</label>`);
										} else return [createVNode(_component_Select, {
											modelValue: $data.selectedFinish,
											"onUpdate:modelValue": ($event) => $data.selectedFinish = $event,
											inputId: "finish",
											options: $props.finish,
											optionLabel: "finish_en",
											class: "w-100",
											onChange: ($event) => $options.finishChange($event)
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"options",
											"onChange"
										]), createVNode("label", { for: "finish" }, "Surface")];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
								_push(ssrRenderComponent(_component_Button, {
									type: "button",
									severity: "success",
									class: "w-100",
									label: "Add",
									onClick: $options.addFinish
								}, null, _parent, _scopeId));
								_push(`</div></div><div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
								_push(ssrRenderComponent(_component_DataTable, { value: $props.finishList }, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(ssrRenderComponent(_component_Column, {
												field: "finish_en",
												header: "Surface (En)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, {
												field: "finish_fr",
												header: "Surface (Fr)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, {
												field: "finish_es",
												header: "Surface (Es)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, {
												field: "finish_ru",
												header: "Surface (Ru)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, null, {
												body: withCtx((slotProps, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_Button, {
														type: "button",
														severity: "danger",
														class: "w-100",
														label: "Delete",
														onClick: ($event) => $options.deleteFinish(slotProps.data.Id)
													}, null, _parent, _scopeId));
													else return [createVNode(_component_Button, {
														type: "button",
														severity: "danger",
														class: "w-100",
														label: "Delete",
														onClick: ($event) => $options.deleteFinish(slotProps.data.Id)
													}, null, 8, ["onClick"])];
												}),
												_: 1
											}, _parent, _scopeId));
										} else return [
											createVNode(_component_Column, {
												field: "finish_en",
												header: "Surface (En)"
											}),
											createVNode(_component_Column, {
												field: "finish_fr",
												header: "Surface (Fr)"
											}),
											createVNode(_component_Column, {
												field: "finish_es",
												header: "Surface (Es)"
											}),
											createVNode(_component_Column, {
												field: "finish_ru",
												header: "Surface (Ru)"
											}),
											createVNode(_component_Column, null, {
												body: withCtx((slotProps) => [createVNode(_component_Button, {
													type: "button",
													severity: "danger",
													class: "w-100",
													label: "Delete",
													onClick: ($event) => $options.deleteFinish(slotProps.data.Id)
												}, null, 8, ["onClick"])]),
												_: 1
											})
										];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div></div></div>`);
							} else _push(`<!---->`);
							_push(`<div class="container" data-v-c5993cf9${_scopeId}><h3 class="header" data-v-c5993cf9${_scopeId}>Areas</h3><div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FloatLabel, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Select, {
											modelValue: $data.selectedArea,
											"onUpdate:modelValue": ($event) => $data.selectedArea = $event,
											inputId: "area",
											options: $props.area,
											optionLabel: "Areas",
											class: "w-100",
											onChange: ($event) => $options.areaChange($event)
										}, null, _parent, _scopeId));
										_push(`<label for="area" data-v-c5993cf9${_scopeId}>Area</label>`);
									} else return [createVNode(_component_Select, {
										modelValue: $data.selectedArea,
										"onUpdate:modelValue": ($event) => $data.selectedArea = $event,
										inputId: "area",
										options: $props.area,
										optionLabel: "Areas",
										class: "w-100",
										onChange: ($event) => $options.areaChange($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"options",
										"onChange"
									]), createVNode("label", { for: "area" }, "Area")];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Add",
								onClick: $options.addArea
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_DataTable, { value: $props.areaList }, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_Column, {
											field: "Areas",
											header: "Area (En)"
										}, null, _parent, _scopeId));
										_push(ssrRenderComponent(_component_Column, {
											field: "Areas_fr",
											header: "Area (Fr)"
										}, null, _parent, _scopeId));
										_push(ssrRenderComponent(_component_Column, {
											field: "Areas_es",
											header: "Area (Es)"
										}, null, _parent, _scopeId));
										_push(ssrRenderComponent(_component_Column, {
											field: "Areas_ru",
											header: "Area (Ru)"
										}, null, _parent, _scopeId));
										_push(ssrRenderComponent(_component_Column, null, {
											body: withCtx((slotProps, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_Button, {
													type: "button",
													severity: "danger",
													class: "w-100",
													label: "Delete",
													onClick: ($event) => $options.deleteArea(slotProps.data.ID)
												}, null, _parent, _scopeId));
												else return [createVNode(_component_Button, {
													type: "button",
													severity: "danger",
													class: "w-100",
													label: "Delete",
													onClick: ($event) => $options.deleteArea(slotProps.data.ID)
												}, null, 8, ["onClick"])];
											}),
											_: 1
										}, _parent, _scopeId));
									} else return [
										createVNode(_component_Column, {
											field: "Areas",
											header: "Area (En)"
										}),
										createVNode(_component_Column, {
											field: "Areas_fr",
											header: "Area (Fr)"
										}),
										createVNode(_component_Column, {
											field: "Areas_es",
											header: "Area (Es)"
										}),
										createVNode(_component_Column, {
											field: "Areas_ru",
											header: "Area (Ru)"
										}),
										createVNode(_component_Column, null, {
											body: withCtx((slotProps) => [createVNode(_component_Button, {
												type: "button",
												severity: "danger",
												class: "w-100",
												label: "Delete",
												onClick: ($event) => $options.deleteArea(slotProps.data.ID)
											}, null, 8, ["onClick"])]),
											_: 1
										})
									];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div></div>`);
							if ($data.selectedCategory.Id == 5 || $data.selectedCategory.Id == 6 || $data.selectedCategory.Id == 9 || $data.selectedCategory.Id == 11 || $data.selectedCategory.Id == 18) {
								_push(`<div class="container" data-v-c5993cf9${_scopeId}><h3 class="header" data-v-c5993cf9${_scopeId}>Types</h3><div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
								_push(ssrRenderComponent(_component_FloatLabel, null, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(ssrRenderComponent(_component_Select, {
												modelValue: $data.selectedType,
												"onUpdate:modelValue": ($event) => $data.selectedType = $event,
												inputId: "type",
												options: $props.type,
												optionLabel: "TurEn",
												class: "w-100",
												onChange: ($event) => $options.typeChange($event)
											}, null, _parent, _scopeId));
											_push(`<label for="tur" data-v-c5993cf9${_scopeId}>Type</label>`);
										} else return [createVNode(_component_Select, {
											modelValue: $data.selectedType,
											"onUpdate:modelValue": ($event) => $data.selectedType = $event,
											inputId: "type",
											options: $props.type,
											optionLabel: "TurEn",
											class: "w-100",
											onChange: ($event) => $options.typeChange($event)
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"options",
											"onChange"
										]), createVNode("label", { for: "tur" }, "Type")];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
								_push(ssrRenderComponent(_component_Button, {
									type: "button",
									severity: "success",
									class: "w-100",
									label: "Add",
									onClick: $options.addType
								}, null, _parent, _scopeId));
								_push(`</div></div><div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
								_push(ssrRenderComponent(_component_DataTable, { value: $props.typeList }, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(ssrRenderComponent(_component_Column, {
												field: "TurEn",
												header: "Type (En)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, {
												field: "TurFr",
												header: "Type (Fr)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, {
												field: "TurEs",
												header: "Type (Es)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, {
												field: "TurRu",
												header: "Type (Ru)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, null, {
												body: withCtx((slotProps, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_Button, {
														type: "button",
														severity: "danger",
														class: "w-100",
														label: "Delete",
														onClick: ($event) => $options.deleteType(slotProps.data.ID)
													}, null, _parent, _scopeId));
													else return [createVNode(_component_Button, {
														type: "button",
														severity: "danger",
														class: "w-100",
														label: "Delete",
														onClick: ($event) => $options.deleteType(slotProps.data.ID)
													}, null, 8, ["onClick"])];
												}),
												_: 1
											}, _parent, _scopeId));
										} else return [
											createVNode(_component_Column, {
												field: "TurEn",
												header: "Type (En)"
											}),
											createVNode(_component_Column, {
												field: "TurFr",
												header: "Type (Fr)"
											}),
											createVNode(_component_Column, {
												field: "TurEs",
												header: "Type (Es)"
											}),
											createVNode(_component_Column, {
												field: "TurRu",
												header: "Type (Ru)"
											}),
											createVNode(_component_Column, null, {
												body: withCtx((slotProps) => [createVNode(_component_Button, {
													type: "button",
													severity: "danger",
													class: "w-100",
													label: "Delete",
													onClick: ($event) => $options.deleteType(slotProps.data.ID)
												}, null, 8, ["onClick"])]),
												_: 1
											})
										];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div></div></div>`);
							} else _push(`<!---->`);
							if ($data.selectedCategory.Id == 2) {
								_push(`<div class="container" data-v-c5993cf9${_scopeId}><h3 class="header" data-v-c5993cf9${_scopeId}>Styles</h3><div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
								_push(ssrRenderComponent(_component_FloatLabel, null, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(ssrRenderComponent(_component_Select, {
												modelValue: $data.selectedStyle,
												"onUpdate:modelValue": ($event) => $data.selectedStyle = $event,
												inputId: "style",
												options: $props.styl,
												optionLabel: "StilEn",
												class: "w-100",
												onChange: ($event) => $options.styleChange($event)
											}, null, _parent, _scopeId));
											_push(`<label for="style" data-v-c5993cf9${_scopeId}>Style</label>`);
										} else return [createVNode(_component_Select, {
											modelValue: $data.selectedStyle,
											"onUpdate:modelValue": ($event) => $data.selectedStyle = $event,
											inputId: "style",
											options: $props.styl,
											optionLabel: "StilEn",
											class: "w-100",
											onChange: ($event) => $options.styleChange($event)
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"options",
											"onChange"
										]), createVNode("label", { for: "style" }, "Style")];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
								_push(ssrRenderComponent(_component_Button, {
									type: "button",
									severity: "success",
									class: "w-100",
									label: "Add",
									onClick: $options.addStyle
								}, null, _parent, _scopeId));
								_push(`</div></div><div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
								_push(ssrRenderComponent(_component_DataTable, { value: $props.styleList }, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(ssrRenderComponent(_component_Column, {
												field: "StilEn",
												header: "Style (En)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, {
												field: "StilFr",
												header: "Style (Fr)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, {
												field: "StilEs",
												header: "Style (Es)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, {
												field: "StilRu",
												header: "Style (Ru)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, null, {
												body: withCtx((slotProps, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_Button, {
														type: "button",
														severity: "danger",
														class: "w-100",
														label: "Delete",
														onClick: ($event) => $options.deleteStyle(slotProps.data.ID)
													}, null, _parent, _scopeId));
													else return [createVNode(_component_Button, {
														type: "button",
														severity: "danger",
														class: "w-100",
														label: "Delete",
														onClick: ($event) => $options.deleteStyle(slotProps.data.ID)
													}, null, 8, ["onClick"])];
												}),
												_: 1
											}, _parent, _scopeId));
										} else return [
											createVNode(_component_Column, {
												field: "StilEn",
												header: "Style (En)"
											}),
											createVNode(_component_Column, {
												field: "StilFr",
												header: "Style (Fr)"
											}),
											createVNode(_component_Column, {
												field: "StilEs",
												header: "Style (Es)"
											}),
											createVNode(_component_Column, {
												field: "StilRu",
												header: "Style (Ru)"
											}),
											createVNode(_component_Column, null, {
												body: withCtx((slotProps) => [createVNode(_component_Button, {
													type: "button",
													severity: "danger",
													class: "w-100",
													label: "Delete",
													onClick: ($event) => $options.deleteStyle(slotProps.data.ID)
												}, null, 8, ["onClick"])]),
												_: 1
											})
										];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div></div></div>`);
							} else _push(`<!---->`);
							if ($data.selectedCategory.Id == 4 || $data.selectedCategory.Id == 7) {
								_push(`<div class="container" data-v-c5993cf9${_scopeId}><h3 class="header" data-v-c5993cf9${_scopeId}>Materials</h3><div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
								_push(ssrRenderComponent(_component_FloatLabel, null, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(ssrRenderComponent(_component_Select, {
												modelValue: $data.selectedMaterial,
												"onUpdate:modelValue": ($event) => $data.selectedMaterial = $event,
												inputId: "material",
												options: $props.material,
												optionLabel: "MateryalEn",
												class: "w-100",
												onChange: ($event) => $options.materialChange($event)
											}, null, _parent, _scopeId));
											_push(`<label for="material" data-v-c5993cf9${_scopeId}>Material</label>`);
										} else return [createVNode(_component_Select, {
											modelValue: $data.selectedMaterial,
											"onUpdate:modelValue": ($event) => $data.selectedMaterial = $event,
											inputId: "material",
											options: $props.material,
											optionLabel: "MateryalEn",
											class: "w-100",
											onChange: ($event) => $options.materialChange($event)
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"options",
											"onChange"
										]), createVNode("label", { for: "material" }, "Material")];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
								_push(ssrRenderComponent(_component_Button, {
									type: "button",
									severity: "success",
									class: "w-100",
									label: "Add",
									onClick: $options.addMaterial
								}, null, _parent, _scopeId));
								_push(`</div></div><div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
								_push(ssrRenderComponent(_component_DataTable, { value: $props.materialList }, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(ssrRenderComponent(_component_Column, {
												field: "MateryalEn",
												header: "Material (En)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, {
												field: "MateryalFr",
												header: "Material (Fr)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, {
												field: "MateryalEs",
												header: "Material (Es)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, {
												field: "MateryalRu",
												header: "Material (Ru)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, null, {
												body: withCtx((slotProps, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_Button, {
														type: "button",
														severity: "danger",
														class: "w-100",
														label: "Delete",
														onClick: ($event) => $options.deleteMaterial(slotProps.data.ID)
													}, null, _parent, _scopeId));
													else return [createVNode(_component_Button, {
														type: "button",
														severity: "danger",
														class: "w-100",
														label: "Delete",
														onClick: ($event) => $options.deleteMaterial(slotProps.data.ID)
													}, null, 8, ["onClick"])];
												}),
												_: 1
											}, _parent, _scopeId));
										} else return [
											createVNode(_component_Column, {
												field: "MateryalEn",
												header: "Material (En)"
											}),
											createVNode(_component_Column, {
												field: "MateryalFr",
												header: "Material (Fr)"
											}),
											createVNode(_component_Column, {
												field: "MateryalEs",
												header: "Material (Es)"
											}),
											createVNode(_component_Column, {
												field: "MateryalRu",
												header: "Material (Ru)"
											}),
											createVNode(_component_Column, null, {
												body: withCtx((slotProps) => [createVNode(_component_Button, {
													type: "button",
													severity: "danger",
													class: "w-100",
													label: "Delete",
													onClick: ($event) => $options.deleteMaterial(slotProps.data.ID)
												}, null, 8, ["onClick"])]),
												_: 1
											})
										];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div></div></div>`);
							} else _push(`<!---->`);
							if ($data.selectedCategory.Id == 2) {
								_push(`<div class="container" data-v-c5993cf9${_scopeId}><h3 class="header" data-v-c5993cf9${_scopeId}>Edge</h3><div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
								_push(ssrRenderComponent(_component_FloatLabel, null, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(ssrRenderComponent(_component_Select, {
												modelValue: $data.selectedEdge,
												"onUpdate:modelValue": ($event) => $data.selectedEdge = $event,
												inputId: "edge",
												options: $props.edge,
												optionLabel: "KenarEn",
												class: "w-100",
												onChange: ($event) => $options.edgeChange($event)
											}, null, _parent, _scopeId));
											_push(`<label for="edge" data-v-c5993cf9${_scopeId}>Edge</label>`);
										} else return [createVNode(_component_Select, {
											modelValue: $data.selectedEdge,
											"onUpdate:modelValue": ($event) => $data.selectedEdge = $event,
											inputId: "edge",
											options: $props.edge,
											optionLabel: "KenarEn",
											class: "w-100",
											onChange: ($event) => $options.edgeChange($event)
										}, null, 8, [
											"modelValue",
											"onUpdate:modelValue",
											"options",
											"onChange"
										]), createVNode("label", { for: "edge" }, "Edge")];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
								_push(ssrRenderComponent(_component_Button, {
									type: "button",
									severity: "success",
									class: "w-100",
									label: "Add",
									onClick: $options.addEdge
								}, null, _parent, _scopeId));
								_push(`</div></div><div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
								_push(ssrRenderComponent(_component_DataTable, { value: $props.edgeList }, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) {
											_push(ssrRenderComponent(_component_Column, {
												field: "KenarEn",
												header: "Kenar (En)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, {
												field: "KenarFr",
												header: "Kenar (Fr)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, {
												field: "KenarEs",
												header: "Kenar (Es)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, {
												field: "KenarRu",
												header: "Kenar (Ru)"
											}, null, _parent, _scopeId));
											_push(ssrRenderComponent(_component_Column, null, {
												body: withCtx((slotProps, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_Button, {
														type: "button",
														severity: "danger",
														class: "w-100",
														label: "Delete",
														onClick: ($event) => $options.deleteEdge(slotProps.data.ID)
													}, null, _parent, _scopeId));
													else return [createVNode(_component_Button, {
														type: "button",
														severity: "danger",
														class: "w-100",
														label: "Delete",
														onClick: ($event) => $options.deleteEdge(slotProps.data.ID)
													}, null, 8, ["onClick"])];
												}),
												_: 1
											}, _parent, _scopeId));
										} else return [
											createVNode(_component_Column, {
												field: "KenarEn",
												header: "Kenar (En)"
											}),
											createVNode(_component_Column, {
												field: "KenarFr",
												header: "Kenar (Fr)"
											}),
											createVNode(_component_Column, {
												field: "KenarEs",
												header: "Kenar (Es)"
											}),
											createVNode(_component_Column, {
												field: "KenarRu",
												header: "Kenar (Ru)"
											}),
											createVNode(_component_Column, null, {
												body: withCtx((slotProps) => [createVNode(_component_Button, {
													type: "button",
													severity: "danger",
													class: "w-100",
													label: "Delete",
													onClick: ($event) => $options.deleteEdge(slotProps.data.ID)
												}, null, 8, ["onClick"])]),
												_: 1
											})
										];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div></div></div>`);
							} else _push(`<!---->`);
						} else return [
							createVNode("div", { class: "container" }, [
								createVNode("h3", { class: "header" }, "Colors"),
								createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
									default: withCtx(() => [createVNode(_component_Select, {
										modelValue: $data.selectedColor,
										"onUpdate:modelValue": ($event) => $data.selectedColor = $event,
										inputId: "color",
										options: $props.color,
										optionLabel: "renk_en",
										class: "w-100",
										onChange: ($event) => $options.colorChange($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"options",
										"onChange"
									]), createVNode("label", { for: "color" }, "Color")]),
									_: 1
								})]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
									type: "button",
									severity: "success",
									class: "w-100",
									label: "Add",
									onClick: $options.addColor
								}, null, 8, ["onClick"])])]),
								createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_DataTable, { value: $props.colorList }, {
									default: withCtx(() => [
										createVNode(_component_Column, {
											field: "renk_en",
											header: "Color (En)"
										}),
										createVNode(_component_Column, {
											field: "renk_fr",
											header: "Color (Fr)"
										}),
										createVNode(_component_Column, {
											field: "renk_es",
											header: "Color (Es)"
										}),
										createVNode(_component_Column, {
											field: "renk_ru",
											header: "Color (Ru)"
										}),
										createVNode(_component_Column, null, {
											body: withCtx((slotProps) => [createVNode(_component_Button, {
												type: "button",
												severity: "danger",
												class: "w-100",
												label: "Delete",
												onClick: ($event) => $options.deleteColor(slotProps.data.ID)
											}, null, 8, ["onClick"])]),
											_: 1
										})
									]),
									_: 1
								}, 8, ["value"])])])
							]),
							$data.selectedCategory.Id == 2 || $data.selectedCategory.Id == 1 || $data.selectedCategory.Id == 3 || $data.selectedCategory.Id == 4 || $data.selectedCategory.Id == 8 ? (openBlock(), createBlock("div", {
								key: 0,
								class: "container"
							}, [
								createVNode("h3", { class: "header" }, "Surfaces"),
								createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
									default: withCtx(() => [createVNode(_component_Select, {
										modelValue: $data.selectedFinish,
										"onUpdate:modelValue": ($event) => $data.selectedFinish = $event,
										inputId: "finish",
										options: $props.finish,
										optionLabel: "finish_en",
										class: "w-100",
										onChange: ($event) => $options.finishChange($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"options",
										"onChange"
									]), createVNode("label", { for: "finish" }, "Surface")]),
									_: 1
								})]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
									type: "button",
									severity: "success",
									class: "w-100",
									label: "Add",
									onClick: $options.addFinish
								}, null, 8, ["onClick"])])]),
								createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_DataTable, { value: $props.finishList }, {
									default: withCtx(() => [
										createVNode(_component_Column, {
											field: "finish_en",
											header: "Surface (En)"
										}),
										createVNode(_component_Column, {
											field: "finish_fr",
											header: "Surface (Fr)"
										}),
										createVNode(_component_Column, {
											field: "finish_es",
											header: "Surface (Es)"
										}),
										createVNode(_component_Column, {
											field: "finish_ru",
											header: "Surface (Ru)"
										}),
										createVNode(_component_Column, null, {
											body: withCtx((slotProps) => [createVNode(_component_Button, {
												type: "button",
												severity: "danger",
												class: "w-100",
												label: "Delete",
												onClick: ($event) => $options.deleteFinish(slotProps.data.Id)
											}, null, 8, ["onClick"])]),
											_: 1
										})
									]),
									_: 1
								}, 8, ["value"])])])
							])) : createCommentVNode("", true),
							createVNode("div", { class: "container" }, [
								createVNode("h3", { class: "header" }, "Areas"),
								createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
									default: withCtx(() => [createVNode(_component_Select, {
										modelValue: $data.selectedArea,
										"onUpdate:modelValue": ($event) => $data.selectedArea = $event,
										inputId: "area",
										options: $props.area,
										optionLabel: "Areas",
										class: "w-100",
										onChange: ($event) => $options.areaChange($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"options",
										"onChange"
									]), createVNode("label", { for: "area" }, "Area")]),
									_: 1
								})]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
									type: "button",
									severity: "success",
									class: "w-100",
									label: "Add",
									onClick: $options.addArea
								}, null, 8, ["onClick"])])]),
								createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_DataTable, { value: $props.areaList }, {
									default: withCtx(() => [
										createVNode(_component_Column, {
											field: "Areas",
											header: "Area (En)"
										}),
										createVNode(_component_Column, {
											field: "Areas_fr",
											header: "Area (Fr)"
										}),
										createVNode(_component_Column, {
											field: "Areas_es",
											header: "Area (Es)"
										}),
										createVNode(_component_Column, {
											field: "Areas_ru",
											header: "Area (Ru)"
										}),
										createVNode(_component_Column, null, {
											body: withCtx((slotProps) => [createVNode(_component_Button, {
												type: "button",
												severity: "danger",
												class: "w-100",
												label: "Delete",
												onClick: ($event) => $options.deleteArea(slotProps.data.ID)
											}, null, 8, ["onClick"])]),
											_: 1
										})
									]),
									_: 1
								}, 8, ["value"])])])
							]),
							$data.selectedCategory.Id == 5 || $data.selectedCategory.Id == 6 || $data.selectedCategory.Id == 9 || $data.selectedCategory.Id == 11 || $data.selectedCategory.Id == 18 ? (openBlock(), createBlock("div", {
								key: 1,
								class: "container"
							}, [
								createVNode("h3", { class: "header" }, "Types"),
								createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
									default: withCtx(() => [createVNode(_component_Select, {
										modelValue: $data.selectedType,
										"onUpdate:modelValue": ($event) => $data.selectedType = $event,
										inputId: "type",
										options: $props.type,
										optionLabel: "TurEn",
										class: "w-100",
										onChange: ($event) => $options.typeChange($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"options",
										"onChange"
									]), createVNode("label", { for: "tur" }, "Type")]),
									_: 1
								})]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
									type: "button",
									severity: "success",
									class: "w-100",
									label: "Add",
									onClick: $options.addType
								}, null, 8, ["onClick"])])]),
								createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_DataTable, { value: $props.typeList }, {
									default: withCtx(() => [
										createVNode(_component_Column, {
											field: "TurEn",
											header: "Type (En)"
										}),
										createVNode(_component_Column, {
											field: "TurFr",
											header: "Type (Fr)"
										}),
										createVNode(_component_Column, {
											field: "TurEs",
											header: "Type (Es)"
										}),
										createVNode(_component_Column, {
											field: "TurRu",
											header: "Type (Ru)"
										}),
										createVNode(_component_Column, null, {
											body: withCtx((slotProps) => [createVNode(_component_Button, {
												type: "button",
												severity: "danger",
												class: "w-100",
												label: "Delete",
												onClick: ($event) => $options.deleteType(slotProps.data.ID)
											}, null, 8, ["onClick"])]),
											_: 1
										})
									]),
									_: 1
								}, 8, ["value"])])])
							])) : createCommentVNode("", true),
							$data.selectedCategory.Id == 2 ? (openBlock(), createBlock("div", {
								key: 2,
								class: "container"
							}, [
								createVNode("h3", { class: "header" }, "Styles"),
								createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
									default: withCtx(() => [createVNode(_component_Select, {
										modelValue: $data.selectedStyle,
										"onUpdate:modelValue": ($event) => $data.selectedStyle = $event,
										inputId: "style",
										options: $props.styl,
										optionLabel: "StilEn",
										class: "w-100",
										onChange: ($event) => $options.styleChange($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"options",
										"onChange"
									]), createVNode("label", { for: "style" }, "Style")]),
									_: 1
								})]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
									type: "button",
									severity: "success",
									class: "w-100",
									label: "Add",
									onClick: $options.addStyle
								}, null, 8, ["onClick"])])]),
								createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_DataTable, { value: $props.styleList }, {
									default: withCtx(() => [
										createVNode(_component_Column, {
											field: "StilEn",
											header: "Style (En)"
										}),
										createVNode(_component_Column, {
											field: "StilFr",
											header: "Style (Fr)"
										}),
										createVNode(_component_Column, {
											field: "StilEs",
											header: "Style (Es)"
										}),
										createVNode(_component_Column, {
											field: "StilRu",
											header: "Style (Ru)"
										}),
										createVNode(_component_Column, null, {
											body: withCtx((slotProps) => [createVNode(_component_Button, {
												type: "button",
												severity: "danger",
												class: "w-100",
												label: "Delete",
												onClick: ($event) => $options.deleteStyle(slotProps.data.ID)
											}, null, 8, ["onClick"])]),
											_: 1
										})
									]),
									_: 1
								}, 8, ["value"])])])
							])) : createCommentVNode("", true),
							$data.selectedCategory.Id == 4 || $data.selectedCategory.Id == 7 ? (openBlock(), createBlock("div", {
								key: 3,
								class: "container"
							}, [
								createVNode("h3", { class: "header" }, "Materials"),
								createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
									default: withCtx(() => [createVNode(_component_Select, {
										modelValue: $data.selectedMaterial,
										"onUpdate:modelValue": ($event) => $data.selectedMaterial = $event,
										inputId: "material",
										options: $props.material,
										optionLabel: "MateryalEn",
										class: "w-100",
										onChange: ($event) => $options.materialChange($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"options",
										"onChange"
									]), createVNode("label", { for: "material" }, "Material")]),
									_: 1
								})]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
									type: "button",
									severity: "success",
									class: "w-100",
									label: "Add",
									onClick: $options.addMaterial
								}, null, 8, ["onClick"])])]),
								createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_DataTable, { value: $props.materialList }, {
									default: withCtx(() => [
										createVNode(_component_Column, {
											field: "MateryalEn",
											header: "Material (En)"
										}),
										createVNode(_component_Column, {
											field: "MateryalFr",
											header: "Material (Fr)"
										}),
										createVNode(_component_Column, {
											field: "MateryalEs",
											header: "Material (Es)"
										}),
										createVNode(_component_Column, {
											field: "MateryalRu",
											header: "Material (Ru)"
										}),
										createVNode(_component_Column, null, {
											body: withCtx((slotProps) => [createVNode(_component_Button, {
												type: "button",
												severity: "danger",
												class: "w-100",
												label: "Delete",
												onClick: ($event) => $options.deleteMaterial(slotProps.data.ID)
											}, null, 8, ["onClick"])]),
											_: 1
										})
									]),
									_: 1
								}, 8, ["value"])])])
							])) : createCommentVNode("", true),
							$data.selectedCategory.Id == 2 ? (openBlock(), createBlock("div", {
								key: 4,
								class: "container"
							}, [
								createVNode("h3", { class: "header" }, "Edge"),
								createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
									default: withCtx(() => [createVNode(_component_Select, {
										modelValue: $data.selectedEdge,
										"onUpdate:modelValue": ($event) => $data.selectedEdge = $event,
										inputId: "edge",
										options: $props.edge,
										optionLabel: "KenarEn",
										class: "w-100",
										onChange: ($event) => $options.edgeChange($event)
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"options",
										"onChange"
									]), createVNode("label", { for: "edge" }, "Edge")]),
									_: 1
								})]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
									type: "button",
									severity: "success",
									class: "w-100",
									label: "Add",
									onClick: $options.addEdge
								}, null, 8, ["onClick"])])]),
								createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_DataTable, { value: $props.edgeList }, {
									default: withCtx(() => [
										createVNode(_component_Column, {
											field: "KenarEn",
											header: "Kenar (En)"
										}),
										createVNode(_component_Column, {
											field: "KenarFr",
											header: "Kenar (Fr)"
										}),
										createVNode(_component_Column, {
											field: "KenarEs",
											header: "Kenar (Es)"
										}),
										createVNode(_component_Column, {
											field: "KenarRu",
											header: "Kenar (Ru)"
										}),
										createVNode(_component_Column, null, {
											body: withCtx((slotProps) => [createVNode(_component_Button, {
												type: "button",
												severity: "danger",
												class: "w-100",
												label: "Delete",
												onClick: ($event) => $options.deleteEdge(slotProps.data.ID)
											}, null, 8, ["onClick"])]),
											_: 1
										})
									]),
									_: 1
								}, 8, ["value"])])])
							])) : createCommentVNode("", true)
						];
					}),
					_: 1
				}, _parent, _scopeId));
				else _push(`<!---->`);
				if ($props.productId != 0) _push(ssrRenderComponent(_component_TabPanel, { header: "Photos" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FileUpload, {
								name: "demo[]",
								multiple: true,
								customUpload: true,
								accept: "image/*",
								onUploader: ($event) => $options.panelProductPhotoUpload($event)
							}, null, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								severity: "warn",
								class: "w-100",
								label: "Change Queue",
								disabled: $data.queueChangeButtonDisabled,
								onClick: $options.reOrderPhotoChangeButton
							}, null, _parent, _scopeId));
							_push(`</div></div>`);
							_push(ssrRenderComponent(_component_PickList, {
								modelValue: $data.photoListLocal,
								"onUpdate:modelValue": ($event) => $data.photoListLocal = $event,
								listStyle: "height:342px;width:450px;",
								onMoveToTarget: ($event) => $options.moveToTargetPhotoOne($event),
								onMoveAllToTarget: ($event) => $options.moveToTargetPhotoAll($event),
								onReorder: ($event) => $options.reOrderPhoto($event)
							}, {
								sourceheader: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` Available `);
									else return [createTextVNode(" Available ")];
								}),
								targetheader: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(` Selected `);
									else return [createTextVNode(" Selected ")];
								}),
								item: withCtx((slotProps, _push, _parent, _scopeId) => {
									if (_push) _push(`<div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}><img${ssrRenderAttr("src", slotProps.item.macPath)} width="100" height="100" lazyload data-v-c5993cf9${_scopeId}></div><div class="col" data-v-c5993cf9${_scopeId}><h5 class="mb-2" data-v-c5993cf9${_scopeId}>${ssrInterpolate(slotProps.item.name)}</h5></div><div class="col" data-v-c5993cf9${_scopeId}><h6 class="mb-2" data-v-c5993cf9${_scopeId}>${ssrInterpolate(slotProps.item.sira)}</h6></div></div>`);
									else return [createVNode("div", { class: "row" }, [
										createVNode("div", { class: "col" }, [createVNode("img", {
											src: slotProps.item.macPath,
											width: "100",
											height: "100",
											lazyload: ""
										}, null, 8, ["src"])]),
										createVNode("div", { class: "col" }, [createVNode("h5", { class: "mb-2" }, toDisplayString(slotProps.item.name), 1)]),
										createVNode("div", { class: "col" }, [createVNode("h6", { class: "mb-2" }, toDisplayString(slotProps.item.sira), 1)])
									])];
								}),
								_: 1
							}, _parent, _scopeId));
						} else return [createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FileUpload, {
							name: "demo[]",
							multiple: true,
							customUpload: true,
							accept: "image/*",
							onUploader: ($event) => $options.panelProductPhotoUpload($event)
						}, null, 8, ["onUploader"])]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
							type: "button",
							severity: "warn",
							class: "w-100",
							label: "Change Queue",
							disabled: $data.queueChangeButtonDisabled,
							onClick: $options.reOrderPhotoChangeButton
						}, null, 8, ["disabled", "onClick"])])]), createVNode(_component_PickList, {
							modelValue: $data.photoListLocal,
							"onUpdate:modelValue": ($event) => $data.photoListLocal = $event,
							listStyle: "height:342px;width:450px;",
							onMoveToTarget: ($event) => $options.moveToTargetPhotoOne($event),
							onMoveAllToTarget: ($event) => $options.moveToTargetPhotoAll($event),
							onReorder: ($event) => $options.reOrderPhoto($event)
						}, {
							sourceheader: withCtx(() => [createTextVNode(" Available ")]),
							targetheader: withCtx(() => [createTextVNode(" Selected ")]),
							item: withCtx((slotProps) => [createVNode("div", { class: "row" }, [
								createVNode("div", { class: "col" }, [createVNode("img", {
									src: slotProps.item.macPath,
									width: "100",
									height: "100",
									lazyload: ""
								}, null, 8, ["src"])]),
								createVNode("div", { class: "col" }, [createVNode("h5", { class: "mb-2" }, toDisplayString(slotProps.item.name), 1)]),
								createVNode("div", { class: "col" }, [createVNode("h6", { class: "mb-2" }, toDisplayString(slotProps.item.sira), 1)])
							])]),
							_: 1
						}, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onMoveToTarget",
							"onMoveAllToTarget",
							"onReorder"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				else _push(`<!---->`);
				if ($props.productId != 0) _push(ssrRenderComponent(_component_TabPanel, { header: "Suggested" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_PickList, {
							modelValue: $data.suggestedListLocal,
							"onUpdate:modelValue": ($event) => $data.suggestedListLocal = $event,
							listStyle: "height:342px;width:450px;",
							onMoveToTarget: ($event) => $options.moveToTargetSuggested($event),
							onMoveToSource: ($event) => $options.moveToSourceSuggested($event),
							onReorder: ($event) => $options.reOrderSuggested($event)
						}, {
							sourceheader: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Available `);
								else return [createTextVNode(" Available ")];
							}),
							targetheader: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Selected `);
								else return [createTextVNode(" Selected ")];
							}),
							item: withCtx((slotProps, _push, _parent, _scopeId) => {
								if (_push) _push(`<div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}><img${ssrRenderAttr("src", slotProps.item.Image)} width="100" height="100" lazyload data-v-c5993cf9${_scopeId}></div><div class="col" data-v-c5993cf9${_scopeId}><h5 class="mb-2" data-v-c5993cf9${_scopeId}>${ssrInterpolate(slotProps.item.urunadi_en)}</h5></div><div class="col" data-v-c5993cf9${_scopeId}><h6 class="mb-2" data-v-c5993cf9${_scopeId}>${ssrInterpolate(slotProps.item.sira)}</h6></div></div>`);
								else return [createVNode("div", { class: "row" }, [
									createVNode("div", { class: "col" }, [createVNode("img", {
										src: slotProps.item.Image,
										width: "100",
										height: "100",
										lazyload: ""
									}, null, 8, ["src"])]),
									createVNode("div", { class: "col" }, [createVNode("h5", { class: "mb-2" }, toDisplayString(slotProps.item.urunadi_en), 1)]),
									createVNode("div", { class: "col" }, [createVNode("h6", { class: "mb-2" }, toDisplayString(slotProps.item.sira), 1)])
								])];
							}),
							_: 1
						}, _parent, _scopeId));
						else return [createVNode(_component_PickList, {
							modelValue: $data.suggestedListLocal,
							"onUpdate:modelValue": ($event) => $data.suggestedListLocal = $event,
							listStyle: "height:342px;width:450px;",
							onMoveToTarget: ($event) => $options.moveToTargetSuggested($event),
							onMoveToSource: ($event) => $options.moveToSourceSuggested($event),
							onReorder: ($event) => $options.reOrderSuggested($event)
						}, {
							sourceheader: withCtx(() => [createTextVNode(" Available ")]),
							targetheader: withCtx(() => [createTextVNode(" Selected ")]),
							item: withCtx((slotProps) => [createVNode("div", { class: "row" }, [
								createVNode("div", { class: "col" }, [createVNode("img", {
									src: slotProps.item.Image,
									width: "100",
									height: "100",
									lazyload: ""
								}, null, 8, ["src"])]),
								createVNode("div", { class: "col" }, [createVNode("h5", { class: "mb-2" }, toDisplayString(slotProps.item.urunadi_en), 1)]),
								createVNode("div", { class: "col" }, [createVNode("h6", { class: "mb-2" }, toDisplayString(slotProps.item.sira), 1)])
							])]),
							_: 1
						}, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onMoveToTarget",
							"onMoveToSource",
							"onReorder"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				else _push(`<!---->`);
				if ($props.productId != 0) _push(ssrRenderComponent(_component_TabPanel, { header: "Test Report" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="row" data-v-c5993cf9${_scopeId}><div class="col" data-v-c5993cf9${_scopeId}>`);
							_push(ssrRenderComponent(_component_FileUpload, {
								name: "demo[]",
								multiple: true,
								customUpload: true,
								accept: ".pdf",
								onUploader: ($event) => $options.panelProductTestReportUpload($event)
							}, null, _parent, _scopeId));
							_push(`</div><div class="col" data-v-c5993cf9${_scopeId}><a${ssrRenderAttr("href", $props.model.testrapor)} target="_blank" data-v-c5993cf9${_scopeId}></a>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								severity: "success",
								label: "Download",
								onClick: ($event) => _ctx.$refs.testreports.click(),
								disabled: $props.model.testrapor == null || $props.model.testrapor == ""
							}, null, _parent, _scopeId));
							_push(`</div></div>`);
						} else return [createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FileUpload, {
							name: "demo[]",
							multiple: true,
							customUpload: true,
							accept: ".pdf",
							onUploader: ($event) => $options.panelProductTestReportUpload($event)
						}, null, 8, ["onUploader"])]), createVNode("div", { class: "col" }, [createVNode("a", {
							href: $props.model.testrapor,
							ref: "testreports",
							target: "_blank"
						}, null, 8, ["href"]), createVNode(_component_Button, {
							type: "button",
							severity: "success",
							label: "Download",
							onClick: ($event) => _ctx.$refs.testreports.click(),
							disabled: $props.model.testrapor == null || $props.model.testrapor == ""
						}, null, 8, ["onClick", "disabled"])])])];
					}),
					_: 1
				}, _parent, _scopeId));
				else _push(`<!---->`);
			} else return [
				createVNode(_component_TabPanel, { header: "Product (En)" }, {
					default: withCtx(() => [
						createVNode("div", { class: "row mt-3 mb-3" }, [
							createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_InputText, {
									id: "productname",
									modelValue: $props.model.urunadi_en,
									"onUpdate:modelValue": ($event) => $props.model.urunadi_en = $event,
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productname" }, "Product Name")]),
								_: 1
							})]),
							createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_InputText, {
									id: "code",
									modelValue: $props.model.urunkod,
									"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "code" }, "Code")]),
								_: 1
							})]),
							createVNode("div", { class: "col" }, [createVNode("div", { class: "flex flex-wrap justify-content-center gap-3" }, [createVNode("div", { class: "flex align-items-center" }, [createVNode(_component_Checkbox, {
								modelValue: $props.model.yayinla,
								"onUpdate:modelValue": ($event) => $props.model.yayinla = $event,
								inputId: "published",
								binary: "",
								onInput: ($event) => $options.publishChange($event)
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"onInput"
							]), createVNode("label", {
								for: "published",
								class: "ml-2"
							}, " Publish ")])])])
						]),
						createVNode("div", { class: "row mb-3 m-auto" }, [createVNode("div", { class: "col-6" }, [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_Textarea, {
								modelValue: $props.model.aciklama_en,
								"onUpdate:modelValue": ($event) => $props.model.aciklama_en = $event,
								rows: "10",
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")]),
							_: 1
						})]), createVNode("div", { class: "col-6" }, [createVNode(_component_FloatLabel, { class: "mb-4" }, {
							default: withCtx(() => [createVNode(_component_InputText, {
								type: "text",
								modelValue: $props.model.anahtarlar_en,
								"onUpdate:modelValue": ($event) => $props.model.anahtarlar_en = $event,
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Keywords")]),
							_: 1
						}), createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_Textarea, {
								modelValue: $props.model.keywords_en,
								"onUpdate:modelValue": ($event) => $props.model.keywords_en = $event,
								rows: "7",
								class: "w-100",
								onInput: ($event) => $options.changeKeywordsEn($event)
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"onInput"
							]), createVNode("label", null, "Hashtags")]),
							_: 1
						})])]),
						createVNode("div", { class: "row mb-3" }, [
							createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_InputText, {
									id: "unit",
									modelValue: $props.model.birim,
									"onUpdate:modelValue": ($event) => $props.model.birim = $event,
									class: "w-100"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "unit" }, "Unit")]),
								_: 1
							})]),
							createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Select, {
									modelValue: $data.selectedCategory,
									"onUpdate:modelValue": ($event) => $data.selectedCategory = $event,
									inputId: "category",
									options: $props.category,
									optionLabel: "kategoriadi_en",
									class: "w-100",
									onChange: ($event) => $options.categorySelected($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options",
									"onChange"
								]), createVNode("label", { for: "category" }, "Category")]),
								_: 1
							})]),
							createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Select, {
									modelValue: $data.selectedStoneType,
									"onUpdate:modelValue": ($event) => $data.selectedStoneType = $event,
									inputId: "stonetype",
									options: $props.category,
									optionLabel: "kategoriadi_en",
									class: "w-100",
									onChange: ($event) => $options.stoneTypeSelected($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options",
									"onChange"
								]), createVNode("label", { for: "stonetype" }, "Kind of Stone")]),
								_: 1
							})])
						]),
						createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_Button, {
							type: "button",
							severity: "success",
							class: "w-100",
							label: "Save",
							onClick: $options.process,
							disabled: $data.productSaveButtonDisabled
						}, null, 8, ["onClick", "disabled"])]), !$props.status ? (openBlock(), createBlock("div", {
							key: 0,
							class: "col"
						}, [createVNode(_component_Button, {
							type: "button",
							severity: "danger",
							class: "w-100",
							label: "Delete",
							onClick: $options.deleteForm
						}, null, 8, ["onClick"])])) : createCommentVNode("", true)])
					]),
					_: 1
				}),
				createVNode(_component_TabPanel, { header: "Product (Fr)" }, {
					default: withCtx(() => [
						createVNode("div", { class: "row mt-3 mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_InputText, {
								id: "productname",
								modelValue: $props.model.urunadi_fr,
								"onUpdate:modelValue": ($event) => $props.model.urunadi_fr = $event,
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productname" }, "Product Name")]),
							_: 1
						})]), createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_InputText, {
								id: "code",
								modelValue: $props.model.urunkod,
								"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "code" }, "Code")]),
							_: 1
						})])]),
						createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_Textarea, {
								modelValue: $props.model.aciklama_fr,
								"onUpdate:modelValue": ($event) => $props.model.aciklama_fr = $event,
								rows: "10",
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")]),
							_: 1
						})]), createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, { class: "mb-4" }, {
							default: withCtx(() => [createVNode(_component_InputText, {
								type: "text",
								modelValue: $props.model.anahtarlar_fr,
								"onUpdate:modelValue": ($event) => $props.model.anahtarlar_fr = $event,
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Keywords")]),
							_: 1
						}), createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_Textarea, {
								modelValue: $props.model.keywords_fr,
								"onUpdate:modelValue": ($event) => $props.model.keywords_fr = $event,
								rows: "7",
								class: "w-100",
								onInput: ($event) => $options.changeKeywordsFr($event)
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"onInput"
							]), createVNode("label", null, "Hashtags")]),
							_: 1
						})])]),
						createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_Button, {
							type: "button",
							severity: "success",
							class: "w-100",
							label: "Save",
							onClick: $options.process,
							disabled: $data.productSaveButtonDisabled
						}, null, 8, ["onClick", "disabled"])]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
							type: "button",
							severity: "danger",
							class: "w-100",
							label: "Delete",
							onClick: $options.deleteForm
						}, null, 8, ["onClick"])])])
					]),
					_: 1
				}),
				createVNode(_component_TabPanel, { header: "Product (Es)" }, {
					default: withCtx(() => [
						createVNode("div", { class: "row mt-3 mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_InputText, {
								id: "productname",
								modelValue: $props.model.urunadi_es,
								"onUpdate:modelValue": ($event) => $props.model.urunadi_es = $event,
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productname" }, "Product Name")]),
							_: 1
						})]), createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_InputText, {
								id: "code",
								modelValue: $props.model.urunkod,
								"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "code" }, "Code")]),
							_: 1
						})])]),
						createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_Textarea, {
								modelValue: $props.model.aciklama_es,
								"onUpdate:modelValue": ($event) => $props.model.aciklama_es = $event,
								rows: "10",
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")]),
							_: 1
						})]), createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, { class: "mb-4" }, {
							default: withCtx(() => [createVNode(_component_InputText, {
								type: "text",
								modelValue: $props.model.anahtarlar_es,
								"onUpdate:modelValue": ($event) => $props.model.anahtarlar_es = $event,
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Keywords")]),
							_: 1
						}), createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_Textarea, {
								modelValue: $props.model.keywords_es,
								"onUpdate:modelValue": ($event) => $props.model.keywords_es = $event,
								rows: "7",
								class: "w-100",
								onInput: ($event) => $options.changeKeywordsEs($event)
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"onInput"
							]), createVNode("label", null, "Hastags")]),
							_: 1
						})])]),
						createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_Button, {
							type: "button",
							severity: "success",
							class: "w-100",
							label: "Save",
							onClick: $options.process,
							disabled: $data.productSaveButtonDisabled
						}, null, 8, ["onClick", "disabled"])]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
							type: "button",
							severity: "danger",
							class: "w-100",
							label: "Delete",
							onClick: $options.deleteForm
						}, null, 8, ["onClick"])])])
					]),
					_: 1
				}),
				createVNode(_component_TabPanel, { header: "Ürün (Ru)" }, {
					default: withCtx(() => [
						createVNode("div", { class: "row mt-3 mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_InputText, {
								id: "productname",
								modelValue: $props.model.urunadi_ru,
								"onUpdate:modelValue": ($event) => $props.model.urunadi_ru = $event,
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productname" }, "Product Name")]),
							_: 1
						})]), createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_InputText, {
								id: "code",
								modelValue: $props.model.urunkod,
								"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "code" }, "Code")]),
							_: 1
						})])]),
						createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_Textarea, {
								modelValue: $props.model.aciklama_ru,
								"onUpdate:modelValue": ($event) => $props.model.aciklama_ru = $event,
								rows: "10",
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")]),
							_: 1
						})]), createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, { class: "mb-4" }, {
							default: withCtx(() => [createVNode(_component_InputText, {
								type: "text",
								modelValue: $props.model.anahtarlar_ru,
								"onUpdate:modelValue": ($event) => $props.model.anahtarlar_ru = $event,
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Keywords")]),
							_: 1
						}), createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_Textarea, {
								modelValue: $props.model.keywords_ru,
								"onUpdate:modelValue": ($event) => $props.model.keywords_ru = $event,
								rows: "7",
								class: "w-100",
								onInput: ($event) => $options.changeKeywordsRu($event)
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"onInput"
							]), createVNode("label", null, "Hashtags")]),
							_: 1
						})])]),
						createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_Button, {
							type: "button",
							severity: "success",
							class: "w-100",
							label: "Save",
							onClick: $options.process,
							disabled: $data.productSaveButtonDisabled
						}, null, 8, ["onClick", "disabled"])]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
							type: "button",
							severity: "danger",
							class: "w-100",
							label: "Delete",
							onClick: $options.deleteForm
						}, null, 8, ["onClick"])])])
					]),
					_: 1
				}),
				createVNode(_component_TabPanel, { header: "Ürün (Ar)" }, {
					default: withCtx(() => [
						createVNode("div", { class: "row mt-3 mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_InputText, {
								id: "productname",
								modelValue: $props.model.urunadi_ar,
								"onUpdate:modelValue": ($event) => $props.model.urunadi_ar = $event,
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "productname" }, "Product Name")]),
							_: 1
						})]), createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_InputText, {
								id: "code",
								modelValue: $props.model.urunkod,
								"onUpdate:modelValue": ($event) => $props.model.urunkod = $event,
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "code" }, "Code")]),
							_: 1
						})])]),
						createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_Textarea, {
								modelValue: $props.model.aciklama_ar,
								"onUpdate:modelValue": ($event) => $props.model.aciklama_ar = $event,
								rows: "10",
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Description")]),
							_: 1
						})]), createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, { class: "mb-4" }, {
							default: withCtx(() => [createVNode(_component_InputText, {
								type: "text",
								modelValue: $props.model.anahtarlar_ar,
								"onUpdate:modelValue": ($event) => $props.model.anahtarlar_ar = $event,
								class: "w-100"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", null, "Keywords")]),
							_: 1
						}), createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_Textarea, {
								modelValue: $props.model.keywords_ar,
								"onUpdate:modelValue": ($event) => $props.model.keywords_ar = $event,
								rows: "7",
								class: "w-100",
								onInput: ($event) => $options.changeKeywordsAr($event)
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"onInput"
							]), createVNode("label", null, "Hashtags")]),
							_: 1
						})])]),
						createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_Button, {
							type: "button",
							severity: "success",
							class: "w-100",
							label: "Save",
							onClick: $options.process,
							disabled: $data.productSaveButtonDisabled
						}, null, 8, ["onClick", "disabled"])]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
							type: "button",
							severity: "danger",
							class: "w-100",
							label: "Delete",
							onClick: $options.deleteForm
						}, null, 8, ["onClick"])])])
					]),
					_: 1
				}),
				$props.productId != 0 ? (openBlock(), createBlock(_component_TabPanel, {
					key: 0,
					header: "Ölçüler"
				}, {
					default: withCtx(() => [createVNode("div", { class: "row" }, [
						createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_AutoComplete, {
								modelValue: $data.selectedSize,
								"onUpdate:modelValue": ($event) => $data.selectedSize = $event,
								inputId: "size",
								suggestions: $data.filteredSize,
								onComplete: ($event) => $options.searchSize($event),
								optionLabel: "ebat",
								onItemSelect: ($event) => $options.sizeSelected($event),
								onInput: ($event) => $options.sizeInput($event)
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"suggestions",
								"onComplete",
								"onItemSelect",
								"onInput"
							]), createVNode("label", { for: "size" }, "Sizes")]),
							_: 1
						})]),
						createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_InputText, {
								id: "price",
								modelValue: $props.sizeModel.fiyat,
								"onUpdate:modelValue": ($event) => $props.sizeModel.fiyat = $event,
								onInput: ($event) => $props.sizeModel.fiyat = $options.formatPoint($event)
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"onInput"
							]), createVNode("label", { for: "price" }, "Price")]),
							_: 1
						})]),
						createVNode("div", { class: "col" }, [createVNode(_component_Button, {
							type: "button",
							severity: "success",
							label: "Add",
							onClick: $options.addSize
						}, null, 8, ["onClick"])]),
						createVNode("div", { class: "col" }, [createVNode(_component_Button, {
							type: "button",
							class: "p-button-primary",
							label: "Change Queue",
							onClick: $options.changeSizeQueue
						}, null, 8, ["onClick"])])
					]), createVNode(_component_DataTable, {
						value: $props.sizeList,
						editMode: "row",
						editingRows: $data.edditingSize,
						"onUpdate:editingRows": ($event) => $data.edditingSize = $event,
						onRowEditSave: ($event) => $options.sizeEdditing($event),
						reorderableColumns: true,
						onRowReorder: $options.onRowReorder
					}, {
						default: withCtx(() => [
							createVNode(_component_Column, {
								rowReorder: true,
								headerStyle: { width: "3rem" },
								reorderableColumn: false
							}),
							createVNode(_component_Column, {
								field: "sira",
								header: "#"
							}),
							createVNode(_component_Column, {
								field: "ebat",
								header: "Size"
							}, {
								editor: withCtx((slotProps) => [createVNode(_component_InputText, {
									modelValue: slotProps.data[slotProps.column.field],
									"onUpdate:modelValue": ($event) => slotProps.data[slotProps.column.field] = $event,
									autofocus: ""
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "fiyat",
								header: "Price"
							}, {
								body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.fiyat)), 1)]),
								editor: withCtx((slotProps) => [createVNode(_component_InputText, {
									modelValue: slotProps.data[slotProps.column.field],
									"onUpdate:modelValue": ($event) => slotProps.data[slotProps.column.field] = $event,
									autofocus: ""
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							createVNode(_component_Column, {
								rowEditor: true,
								styles: {
									width: "10%",
									"min-width": "8rem"
								},
								bodyStyle: { "text-align": "center" }
							}),
							createVNode(_component_Column, null, {
								body: withCtx((slotProps) => [createVNode(_component_Button, {
									type: "button",
									severity: "danger",
									label: "Delete",
									onClick: ($event) => $options.deleteSize(slotProps.data.Id)
								}, null, 8, ["onClick"])]),
								_: 1
							})
						]),
						_: 1
					}, 8, [
						"value",
						"editingRows",
						"onUpdate:editingRows",
						"onRowEditSave",
						"onRowReorder"
					])]),
					_: 1
				})) : createCommentVNode("", true),
				$props.productId != 0 ? (openBlock(), createBlock(_component_TabPanel, {
					key: 1,
					header: "Filters"
				}, {
					default: withCtx(() => [
						createVNode("div", { class: "container" }, [
							createVNode("h3", { class: "header" }, "Colors"),
							createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Select, {
									modelValue: $data.selectedColor,
									"onUpdate:modelValue": ($event) => $data.selectedColor = $event,
									inputId: "color",
									options: $props.color,
									optionLabel: "renk_en",
									class: "w-100",
									onChange: ($event) => $options.colorChange($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options",
									"onChange"
								]), createVNode("label", { for: "color" }, "Color")]),
								_: 1
							})]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Add",
								onClick: $options.addColor
							}, null, 8, ["onClick"])])]),
							createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_DataTable, { value: $props.colorList }, {
								default: withCtx(() => [
									createVNode(_component_Column, {
										field: "renk_en",
										header: "Color (En)"
									}),
									createVNode(_component_Column, {
										field: "renk_fr",
										header: "Color (Fr)"
									}),
									createVNode(_component_Column, {
										field: "renk_es",
										header: "Color (Es)"
									}),
									createVNode(_component_Column, {
										field: "renk_ru",
										header: "Color (Ru)"
									}),
									createVNode(_component_Column, null, {
										body: withCtx((slotProps) => [createVNode(_component_Button, {
											type: "button",
											severity: "danger",
											class: "w-100",
											label: "Delete",
											onClick: ($event) => $options.deleteColor(slotProps.data.ID)
										}, null, 8, ["onClick"])]),
										_: 1
									})
								]),
								_: 1
							}, 8, ["value"])])])
						]),
						$data.selectedCategory.Id == 2 || $data.selectedCategory.Id == 1 || $data.selectedCategory.Id == 3 || $data.selectedCategory.Id == 4 || $data.selectedCategory.Id == 8 ? (openBlock(), createBlock("div", {
							key: 0,
							class: "container"
						}, [
							createVNode("h3", { class: "header" }, "Surfaces"),
							createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Select, {
									modelValue: $data.selectedFinish,
									"onUpdate:modelValue": ($event) => $data.selectedFinish = $event,
									inputId: "finish",
									options: $props.finish,
									optionLabel: "finish_en",
									class: "w-100",
									onChange: ($event) => $options.finishChange($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options",
									"onChange"
								]), createVNode("label", { for: "finish" }, "Surface")]),
								_: 1
							})]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Add",
								onClick: $options.addFinish
							}, null, 8, ["onClick"])])]),
							createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_DataTable, { value: $props.finishList }, {
								default: withCtx(() => [
									createVNode(_component_Column, {
										field: "finish_en",
										header: "Surface (En)"
									}),
									createVNode(_component_Column, {
										field: "finish_fr",
										header: "Surface (Fr)"
									}),
									createVNode(_component_Column, {
										field: "finish_es",
										header: "Surface (Es)"
									}),
									createVNode(_component_Column, {
										field: "finish_ru",
										header: "Surface (Ru)"
									}),
									createVNode(_component_Column, null, {
										body: withCtx((slotProps) => [createVNode(_component_Button, {
											type: "button",
											severity: "danger",
											class: "w-100",
											label: "Delete",
											onClick: ($event) => $options.deleteFinish(slotProps.data.Id)
										}, null, 8, ["onClick"])]),
										_: 1
									})
								]),
								_: 1
							}, 8, ["value"])])])
						])) : createCommentVNode("", true),
						createVNode("div", { class: "container" }, [
							createVNode("h3", { class: "header" }, "Areas"),
							createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Select, {
									modelValue: $data.selectedArea,
									"onUpdate:modelValue": ($event) => $data.selectedArea = $event,
									inputId: "area",
									options: $props.area,
									optionLabel: "Areas",
									class: "w-100",
									onChange: ($event) => $options.areaChange($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options",
									"onChange"
								]), createVNode("label", { for: "area" }, "Area")]),
								_: 1
							})]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Add",
								onClick: $options.addArea
							}, null, 8, ["onClick"])])]),
							createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_DataTable, { value: $props.areaList }, {
								default: withCtx(() => [
									createVNode(_component_Column, {
										field: "Areas",
										header: "Area (En)"
									}),
									createVNode(_component_Column, {
										field: "Areas_fr",
										header: "Area (Fr)"
									}),
									createVNode(_component_Column, {
										field: "Areas_es",
										header: "Area (Es)"
									}),
									createVNode(_component_Column, {
										field: "Areas_ru",
										header: "Area (Ru)"
									}),
									createVNode(_component_Column, null, {
										body: withCtx((slotProps) => [createVNode(_component_Button, {
											type: "button",
											severity: "danger",
											class: "w-100",
											label: "Delete",
											onClick: ($event) => $options.deleteArea(slotProps.data.ID)
										}, null, 8, ["onClick"])]),
										_: 1
									})
								]),
								_: 1
							}, 8, ["value"])])])
						]),
						$data.selectedCategory.Id == 5 || $data.selectedCategory.Id == 6 || $data.selectedCategory.Id == 9 || $data.selectedCategory.Id == 11 || $data.selectedCategory.Id == 18 ? (openBlock(), createBlock("div", {
							key: 1,
							class: "container"
						}, [
							createVNode("h3", { class: "header" }, "Types"),
							createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Select, {
									modelValue: $data.selectedType,
									"onUpdate:modelValue": ($event) => $data.selectedType = $event,
									inputId: "type",
									options: $props.type,
									optionLabel: "TurEn",
									class: "w-100",
									onChange: ($event) => $options.typeChange($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options",
									"onChange"
								]), createVNode("label", { for: "tur" }, "Type")]),
								_: 1
							})]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Add",
								onClick: $options.addType
							}, null, 8, ["onClick"])])]),
							createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_DataTable, { value: $props.typeList }, {
								default: withCtx(() => [
									createVNode(_component_Column, {
										field: "TurEn",
										header: "Type (En)"
									}),
									createVNode(_component_Column, {
										field: "TurFr",
										header: "Type (Fr)"
									}),
									createVNode(_component_Column, {
										field: "TurEs",
										header: "Type (Es)"
									}),
									createVNode(_component_Column, {
										field: "TurRu",
										header: "Type (Ru)"
									}),
									createVNode(_component_Column, null, {
										body: withCtx((slotProps) => [createVNode(_component_Button, {
											type: "button",
											severity: "danger",
											class: "w-100",
											label: "Delete",
											onClick: ($event) => $options.deleteType(slotProps.data.ID)
										}, null, 8, ["onClick"])]),
										_: 1
									})
								]),
								_: 1
							}, 8, ["value"])])])
						])) : createCommentVNode("", true),
						$data.selectedCategory.Id == 2 ? (openBlock(), createBlock("div", {
							key: 2,
							class: "container"
						}, [
							createVNode("h3", { class: "header" }, "Styles"),
							createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Select, {
									modelValue: $data.selectedStyle,
									"onUpdate:modelValue": ($event) => $data.selectedStyle = $event,
									inputId: "style",
									options: $props.styl,
									optionLabel: "StilEn",
									class: "w-100",
									onChange: ($event) => $options.styleChange($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options",
									"onChange"
								]), createVNode("label", { for: "style" }, "Style")]),
								_: 1
							})]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Add",
								onClick: $options.addStyle
							}, null, 8, ["onClick"])])]),
							createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_DataTable, { value: $props.styleList }, {
								default: withCtx(() => [
									createVNode(_component_Column, {
										field: "StilEn",
										header: "Style (En)"
									}),
									createVNode(_component_Column, {
										field: "StilFr",
										header: "Style (Fr)"
									}),
									createVNode(_component_Column, {
										field: "StilEs",
										header: "Style (Es)"
									}),
									createVNode(_component_Column, {
										field: "StilRu",
										header: "Style (Ru)"
									}),
									createVNode(_component_Column, null, {
										body: withCtx((slotProps) => [createVNode(_component_Button, {
											type: "button",
											severity: "danger",
											class: "w-100",
											label: "Delete",
											onClick: ($event) => $options.deleteStyle(slotProps.data.ID)
										}, null, 8, ["onClick"])]),
										_: 1
									})
								]),
								_: 1
							}, 8, ["value"])])])
						])) : createCommentVNode("", true),
						$data.selectedCategory.Id == 4 || $data.selectedCategory.Id == 7 ? (openBlock(), createBlock("div", {
							key: 3,
							class: "container"
						}, [
							createVNode("h3", { class: "header" }, "Materials"),
							createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Select, {
									modelValue: $data.selectedMaterial,
									"onUpdate:modelValue": ($event) => $data.selectedMaterial = $event,
									inputId: "material",
									options: $props.material,
									optionLabel: "MateryalEn",
									class: "w-100",
									onChange: ($event) => $options.materialChange($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options",
									"onChange"
								]), createVNode("label", { for: "material" }, "Material")]),
								_: 1
							})]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Add",
								onClick: $options.addMaterial
							}, null, 8, ["onClick"])])]),
							createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_DataTable, { value: $props.materialList }, {
								default: withCtx(() => [
									createVNode(_component_Column, {
										field: "MateryalEn",
										header: "Material (En)"
									}),
									createVNode(_component_Column, {
										field: "MateryalFr",
										header: "Material (Fr)"
									}),
									createVNode(_component_Column, {
										field: "MateryalEs",
										header: "Material (Es)"
									}),
									createVNode(_component_Column, {
										field: "MateryalRu",
										header: "Material (Ru)"
									}),
									createVNode(_component_Column, null, {
										body: withCtx((slotProps) => [createVNode(_component_Button, {
											type: "button",
											severity: "danger",
											class: "w-100",
											label: "Delete",
											onClick: ($event) => $options.deleteMaterial(slotProps.data.ID)
										}, null, 8, ["onClick"])]),
										_: 1
									})
								]),
								_: 1
							}, 8, ["value"])])])
						])) : createCommentVNode("", true),
						$data.selectedCategory.Id == 2 ? (openBlock(), createBlock("div", {
							key: 4,
							class: "container"
						}, [
							createVNode("h3", { class: "header" }, "Edge"),
							createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
								default: withCtx(() => [createVNode(_component_Select, {
									modelValue: $data.selectedEdge,
									"onUpdate:modelValue": ($event) => $data.selectedEdge = $event,
									inputId: "edge",
									options: $props.edge,
									optionLabel: "KenarEn",
									class: "w-100",
									onChange: ($event) => $options.edgeChange($event)
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"options",
									"onChange"
								]), createVNode("label", { for: "edge" }, "Edge")]),
								_: 1
							})]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
								type: "button",
								severity: "success",
								class: "w-100",
								label: "Add",
								onClick: $options.addEdge
							}, null, 8, ["onClick"])])]),
							createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_DataTable, { value: $props.edgeList }, {
								default: withCtx(() => [
									createVNode(_component_Column, {
										field: "KenarEn",
										header: "Kenar (En)"
									}),
									createVNode(_component_Column, {
										field: "KenarFr",
										header: "Kenar (Fr)"
									}),
									createVNode(_component_Column, {
										field: "KenarEs",
										header: "Kenar (Es)"
									}),
									createVNode(_component_Column, {
										field: "KenarRu",
										header: "Kenar (Ru)"
									}),
									createVNode(_component_Column, null, {
										body: withCtx((slotProps) => [createVNode(_component_Button, {
											type: "button",
											severity: "danger",
											class: "w-100",
											label: "Delete",
											onClick: ($event) => $options.deleteEdge(slotProps.data.ID)
										}, null, 8, ["onClick"])]),
										_: 1
									})
								]),
								_: 1
							}, 8, ["value"])])])
						])) : createCommentVNode("", true)
					]),
					_: 1
				})) : createCommentVNode("", true),
				$props.productId != 0 ? (openBlock(), createBlock(_component_TabPanel, {
					key: 2,
					header: "Photos"
				}, {
					default: withCtx(() => [createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FileUpload, {
						name: "demo[]",
						multiple: true,
						customUpload: true,
						accept: "image/*",
						onUploader: ($event) => $options.panelProductPhotoUpload($event)
					}, null, 8, ["onUploader"])]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
						type: "button",
						severity: "warn",
						class: "w-100",
						label: "Change Queue",
						disabled: $data.queueChangeButtonDisabled,
						onClick: $options.reOrderPhotoChangeButton
					}, null, 8, ["disabled", "onClick"])])]), createVNode(_component_PickList, {
						modelValue: $data.photoListLocal,
						"onUpdate:modelValue": ($event) => $data.photoListLocal = $event,
						listStyle: "height:342px;width:450px;",
						onMoveToTarget: ($event) => $options.moveToTargetPhotoOne($event),
						onMoveAllToTarget: ($event) => $options.moveToTargetPhotoAll($event),
						onReorder: ($event) => $options.reOrderPhoto($event)
					}, {
						sourceheader: withCtx(() => [createTextVNode(" Available ")]),
						targetheader: withCtx(() => [createTextVNode(" Selected ")]),
						item: withCtx((slotProps) => [createVNode("div", { class: "row" }, [
							createVNode("div", { class: "col" }, [createVNode("img", {
								src: slotProps.item.macPath,
								width: "100",
								height: "100",
								lazyload: ""
							}, null, 8, ["src"])]),
							createVNode("div", { class: "col" }, [createVNode("h5", { class: "mb-2" }, toDisplayString(slotProps.item.name), 1)]),
							createVNode("div", { class: "col" }, [createVNode("h6", { class: "mb-2" }, toDisplayString(slotProps.item.sira), 1)])
						])]),
						_: 1
					}, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onMoveToTarget",
						"onMoveAllToTarget",
						"onReorder"
					])]),
					_: 1
				})) : createCommentVNode("", true),
				$props.productId != 0 ? (openBlock(), createBlock(_component_TabPanel, {
					key: 3,
					header: "Suggested"
				}, {
					default: withCtx(() => [createVNode(_component_PickList, {
						modelValue: $data.suggestedListLocal,
						"onUpdate:modelValue": ($event) => $data.suggestedListLocal = $event,
						listStyle: "height:342px;width:450px;",
						onMoveToTarget: ($event) => $options.moveToTargetSuggested($event),
						onMoveToSource: ($event) => $options.moveToSourceSuggested($event),
						onReorder: ($event) => $options.reOrderSuggested($event)
					}, {
						sourceheader: withCtx(() => [createTextVNode(" Available ")]),
						targetheader: withCtx(() => [createTextVNode(" Selected ")]),
						item: withCtx((slotProps) => [createVNode("div", { class: "row" }, [
							createVNode("div", { class: "col" }, [createVNode("img", {
								src: slotProps.item.Image,
								width: "100",
								height: "100",
								lazyload: ""
							}, null, 8, ["src"])]),
							createVNode("div", { class: "col" }, [createVNode("h5", { class: "mb-2" }, toDisplayString(slotProps.item.urunadi_en), 1)]),
							createVNode("div", { class: "col" }, [createVNode("h6", { class: "mb-2" }, toDisplayString(slotProps.item.sira), 1)])
						])]),
						_: 1
					}, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onMoveToTarget",
						"onMoveToSource",
						"onReorder"
					])]),
					_: 1
				})) : createCommentVNode("", true),
				$props.productId != 0 ? (openBlock(), createBlock(_component_TabPanel, {
					key: 4,
					header: "Test Report"
				}, {
					default: withCtx(() => [createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_FileUpload, {
						name: "demo[]",
						multiple: true,
						customUpload: true,
						accept: ".pdf",
						onUploader: ($event) => $options.panelProductTestReportUpload($event)
					}, null, 8, ["onUploader"])]), createVNode("div", { class: "col" }, [createVNode("a", {
						href: $props.model.testrapor,
						ref: "testreports",
						target: "_blank"
					}, null, 8, ["href"]), createVNode(_component_Button, {
						type: "button",
						severity: "success",
						label: "Download",
						onClick: ($event) => _ctx.$refs.testreports.click(),
						disabled: $props.model.testrapor == null || $props.model.testrapor == ""
					}, null, 8, ["onClick", "disabled"])])])]),
					_: 1
				})) : createCommentVNode("", true)
			];
		}),
		_: 1
	}, _parent));
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/panel/ProductForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProductForm_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-c5993cf9"]]), { __name: "PanelProductForm" });

export { List_default as L, ProductForm_default as P };
//# sourceMappingURL=ProductForm-kg1kyEsq.mjs.map
