import { _ as _plugin_vue_export_helper_default, F as FilterMatchMode } from '../virtual/entry.mjs';
import { n as script$1 } from './column-CT6GXkG2.mjs';
import { n as script } from './datatable-D6ou7HZJ.mjs';
import { n as script$2 } from './inputtext-s6cxdqDx.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { u as useSocketStore } from './socket-AbqLYDWT.mjs';
import { mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';

//#region app/composables/useRealtime.ts
function useRealtime(event, handler) {
	const store = useSocketStore();
	return { emit: (name, ...args) => store.emit(name, ...args) };
}
//#endregion
//#region app/components/product/Cards.vue
var COLUMNS = [
	{
		field: "ID",
		header: "Product Card Id"
	},
	{
		field: "KategoriAdi",
		header: "Category"
	},
	{
		field: "UrunAdi",
		header: "Product"
	},
	{
		field: "YuzeyIslemAdi",
		header: "Surface"
	},
	{
		field: "En",
		header: "Width"
	},
	{
		field: "Boy",
		header: "Height"
	},
	{
		field: "Kenar",
		header: "Thickness"
	}
];
var _sfc_main = {
	emits: ["cards_selected_emit"],
	setup() {
		useSharedStore();
		useRealtime();
	},
	computed: {
		shared() {
			return useSharedStore();
		},
		columns() {
			return COLUMNS;
		}
	},
	data() {
		return {
			selectedCards: null,
			filters: Object.fromEntries(COLUMNS.map((c) => [c.field, {
				value: null,
				matchMode: FilterMatchMode.STARTS_WITH
			}]))
		};
	},
	methods: { cardsSelected(event) {
		this.$emit("cards_selected_emit", event.data);
	} }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_DataTable = script;
	const _component_Column = script$1;
	const _component_InputText = script$2;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}>`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $options.shared.getCardList,
		paginator: "",
		rows: 15,
		filters: $data.filters,
		"onUpdate:filters": ($event) => $data.filters = $event,
		filterDisplay: "row",
		selection: $data.selectedCards,
		"onUpdate:selection": ($event) => $data.selectedCards = $event,
		selectionMode: "single",
		scrollable: "",
		scrollHeight: "var(--app-table-height)",
		onRowClick: ($event) => $options.cardsSelected($event)
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(`<!--[-->`);
				ssrRenderList($options.columns, (col) => {
					_push(ssrRenderComponent(_component_Column, {
						key: col.field,
						field: col.field,
						header: col.header,
						showFilterMenu: false,
						showClearButton: false,
						headerClass: "tableHeader",
						bodyClass: "tableBody"
					}, {
						filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_InputText, {
								type: "text",
								modelValue: filterModel.value,
								"onUpdate:modelValue": ($event) => filterModel.value = $event,
								class: "p-column-filter",
								onInput: ($event) => filterCallback()
							}, null, _parent, _scopeId));
							else return [createVNode(_component_InputText, {
								type: "text",
								modelValue: filterModel.value,
								"onUpdate:modelValue": ($event) => filterModel.value = $event,
								class: "p-column-filter",
								onInput: ($event) => filterCallback()
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"onInput"
							])];
						}),
						_: 2
					}, _parent, _scopeId));
				});
				_push(`<!--]-->`);
			} else return [(openBlock(true), createBlock(Fragment, null, renderList($options.columns, (col) => {
				return openBlock(), createBlock(_component_Column, {
					key: col.field,
					field: col.field,
					header: col.header,
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						class: "p-column-filter",
						onInput: ($event) => filterCallback()
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}, 8, ["field", "header"]);
			}), 128))];
		}),
		_: 1
	}, _parent));
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/Cards.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Cards_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "ProductCards" });

export { Cards_default as C, useRealtime as u };
//# sourceMappingURL=Cards-D_Ydl_4N.mjs.map
