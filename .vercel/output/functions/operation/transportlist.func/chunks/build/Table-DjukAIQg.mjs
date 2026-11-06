import { _ as _plugin_vue_export_helper_default, c as dateToString, j as formatDecimal2, f as formatDecimal, e as formatPriceUsd, u as useCookie, F as FilterMatchMode } from '../virtual/entry.mjs';
import { n as script$1 } from './column-CT6GXkG2.mjs';
import { n as script } from './datatable-D6ou7HZJ.mjs';
import { n as script$2 } from './inputtext-s6cxdqDx.mjs';
import { u as useOrderStore } from './order-C0FMsqTx.mjs';
import { withCtx, createTextVNode, toDisplayString, createVNode, withKeys, unref, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';

//#region app/components/order/Table.vue
var _sfc_main = {
	emits: ["production_selected_emit"],
	props: {
		list: {
			type: Array,
			required: false
		},
		status: {
			type: String,
			required: true
		},
		total: {
			type: Object,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		}
	},
	computed: { orderStore() {
		return useOrderStore();
	} },
	data() {
		return {
			filtersShipped: {
				YuklemeTarihi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				FirmaAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				SiparisNo: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				UrunAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				En: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				Boy: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				Kenar: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				UrunFirmaAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				Miktar: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				BirimAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				}
			},
			globalSearch: null,
			selectedProduction: null,
			filtersOrders: {
				SiparisTarihi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				YuklemeTarihi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				FirmaAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				SiparisNo: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				UrunAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				En: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				Boy: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				Kenar: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				UrunFirmaAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				Miktar: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				BirimAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				}
			},
			filterModel: {
				loaddate: "",
				company: "",
				po: "",
				product: "",
				width: "",
				height: "",
				edge: "",
				supplier: "",
				amount: "",
				unit: ""
			}
		};
	},
	methods: {
		__amountControl(val) {
			if (val == 0 || val == void 0 || val == "" || val == " " || val == null) return 0;
			else return parseFloat(val).toFixed(2);
		},
		ordersFilter(event) {
			this.orderStore.setOrderProductionTotal(event.filteredValue);
		},
		rowClass2(event) {
			const userId = useCookie("userId").value;
			if (event.SiparisSahibi == userId || event.Operasyon == userId) return "row-accessories";
			return "row-accessories-border";
		},
		globalSearchFilterInput(event) {
			if (!event) this.orderStore.setOrderShippedList();
		},
		globalSearchFilter() {
			if (this.globalSearch) this.orderStore.setFilterShipmentGlobal(this.globalSearch);
			else this.orderStore.setOrderShippedList();
		},
		filterSet(field, value) {
			if (!value) {
				this.filterModel[field] = "";
				return;
			}
			if (field === "product") {
				this.filterModel.product = String(value).split(" ").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ").trim();
				return;
			}
			this.filterModel[field] = value;
		},
		filterApply(field, value) {
			this.filterSet(field, value);
			if (this.isFilterEmpty()) this.orderStore.setOrderShippedList();
			else this.orderStore.filterShipment(this.filterModel);
		},
		isFilterEmpty() {
			return Object.values(this.filterModel).every((v) => v === "");
		}
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_DataTable = script;
	const _component_InputText = script$2;
	const _component_Column = script$1;
	_push(`<div${ssrRenderAttrs(_attrs)} data-v-52f7d7ab><div class="card" data-v-52f7d7ab>`);
	if ($props.status == "Shipped") _push(ssrRenderComponent(_component_DataTable, {
		value: $props.list,
		rowGroupMode: "rowspan",
		groupRowsBy: [
			"YuklemeTarihi",
			"SiparisNo",
			"FirmaAdi",
			"PI"
		],
		selection: $data.selectedProduction,
		"onUpdate:selection": ($event) => $data.selectedProduction = $event,
		selectionMode: "multiple",
		onRowClick: ($event) => _ctx.$emit("production_selected_emit", $event.data),
		class: "p-datatable-sm customShipped",
		paginator: true,
		rows: 25,
		style: {
			"font-size": "70%",
			"border": "2px solid gray"
		},
		filterDisplay: "row",
		filters: $data.filtersOrders,
		"onUpdate:filters": ($event) => $data.filtersOrders = $event,
		sortField: "YuklemeTarihi",
		sortOrder: -1,
		rowClass: $options.rowClass2,
		columnResizeMode: "fit",
		showGridlines: "",
		loading: $props.loading
	}, {
		header: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(`<div class="flex justify-content-between" data-v-52f7d7ab${_scopeId}><span class="p-input-icon-left" data-v-52f7d7ab${_scopeId}><i class="pi pi-search" data-v-52f7d7ab${_scopeId}></i>`);
				_push(ssrRenderComponent(_component_InputText, {
					modelValue: $data.globalSearch,
					"onUpdate:modelValue": ($event) => $data.globalSearch = $event,
					placeholder: "Keyword Search",
					onKeyup: ($event) => $options.globalSearchFilter($event),
					onInput: ($event) => $options.globalSearchFilterInput($event)
				}, null, _parent, _scopeId));
				_push(`</span></div>`);
			} else return [createVNode("div", { class: "flex justify-content-between" }, [createVNode("span", { class: "p-input-icon-left" }, [createVNode("i", { class: "pi pi-search" }), createVNode(_component_InputText, {
				modelValue: $data.globalSearch,
				"onUpdate:modelValue": ($event) => $data.globalSearch = $event,
				placeholder: "Keyword Search",
				onKeyup: withKeys(($event) => $options.globalSearchFilter($event), ["enter"]),
				onInput: ($event) => $options.globalSearchFilterInput($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"onKeyup",
				"onInput"
			])])])];
		}),
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					header: "#",
					headerClass: "col-rowno",
					filterHeaderClass: "col-rowno",
					bodyClass: "col-rowno"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.index + 1)}`);
						else return [createTextVNode(toDisplayString(slotProps.index + 1), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "YuklemeTarihi",
					header: "Load Date",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.YuklemeTarihi))}`);
						else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.YuklemeTarihi)), 1)];
					}),
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("loaddate", filterModel.value),
							onInput: ($event) => $options.filterSet("loaddate", filterModel.value),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("loaddate", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("loaddate", filterModel.value),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "FirmaAdi",
					header: "Customer",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("company", filterModel.value),
							onInput: ($event) => $options.filterSet("company", filterModel.value),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("company", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("company", filterModel.value),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SiparisNo",
					header: "Po",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("po", filterModel.value),
							onInput: ($event) => $options.filterSet("po", filterModel.value),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("po", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("po", filterModel.value),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "PI",
					header: "PI",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (slotProps.data.EvrakDurum > 0) _push(`<div data-v-52f7d7ab${_scopeId}><a${ssrRenderAttr("href", "https://file-service.mekmar.com/file/download/2/" + slotProps.data.SiparisNo)} data-v-52f7d7ab${_scopeId}><i class="pi pi-download" data-v-52f7d7ab${_scopeId}></i></a></div>`);
							else _push(`<div data-v-52f7d7ab${_scopeId}><a data-v-52f7d7ab${_scopeId}><i class="pi pi-download" data-v-52f7d7ab${_scopeId}></i></a></div>`);
						} else return [slotProps.data.EvrakDurum > 0 ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("a", { href: "https://file-service.mekmar.com/file/download/2/" + slotProps.data.SiparisNo }, [createVNode("i", { class: "pi pi-download" })], 8, ["href"])])) : (openBlock(), createBlock("div", { key: 1 }, [createVNode("a", null, [createVNode("i", { class: "pi pi-download" })])]))];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "UrunAdi",
					header: "Product",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("product", filterModel.value),
							onInput: ($event) => $options.filterSet("product", filterModel.value),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("product", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("product", filterModel.value),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "UrunUretimAciklama",
					header: "Details",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "En",
					header: "Width",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("width", filterModel.value),
							onInput: ($event) => $options.filterSet("width", filterModel.value),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("width", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("width", filterModel.value),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Boy",
					header: "Height",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("height", filterModel.value),
							onInput: ($event) => $options.filterSet("height", filterModel.value),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("height", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("height", filterModel.value),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Kenar",
					header: "Thickness",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("edge", filterModel.value),
							onInput: ($event) => $options.filterSet("edge", filterModel.value),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("edge", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("edge", filterModel.value),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "UrunFirmaAdi",
					header: "Supplier",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("supplier", filterModel.value),
							onInput: ($event) => $options.filterSet("supplier", filterModel.value),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("supplier", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("supplier", filterModel.value),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Miktar",
					header: "Amount",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 1)];
					}),
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("amount", filterModel.value),
							onInput: ($event) => $options.filterSet("amount", filterModel.value),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("amount", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("amount", filterModel.value),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput"
						])];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.order))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.order)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "BirimAdi",
					header: "Unit",
					headerClass: "tableHeader",
					bodyClass: "tableBody",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.BirimAdi)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.BirimAdi), 1)];
					}),
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("unit", filterModel.value),
							onInput: ($event) => $options.filterSet("unit", filterModel.value),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("unit", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("unit", filterModel.value),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Ton",
					header: "Ton",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.ton)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SatisFiyati",
					header: "Price",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SatisToplam",
					header: "Total",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisToplam))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisToplam)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.price))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.price)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					header: "#",
					headerClass: "col-rowno",
					filterHeaderClass: "col-rowno",
					bodyClass: "col-rowno"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.index + 1), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "YuklemeTarihi",
					header: "Load Date",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.YuklemeTarihi)), 1)]),
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("loaddate", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("loaddate", filterModel.value),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "FirmaAdi",
					header: "Customer",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("company", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("company", filterModel.value),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SiparisNo",
					header: "Po",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("po", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("po", filterModel.value),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "PI",
					header: "PI",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [slotProps.data.EvrakDurum > 0 ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("a", { href: "https://file-service.mekmar.com/file/download/2/" + slotProps.data.SiparisNo }, [createVNode("i", { class: "pi pi-download" })], 8, ["href"])])) : (openBlock(), createBlock("div", { key: 1 }, [createVNode("a", null, [createVNode("i", { class: "pi pi-download" })])]))]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "UrunAdi",
					header: "Product",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("product", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("product", filterModel.value),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "UrunUretimAciklama",
					header: "Details",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "En",
					header: "Width",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("width", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("width", filterModel.value),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Boy",
					header: "Height",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("height", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("height", filterModel.value),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Kenar",
					header: "Thickness",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("edge", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("edge", filterModel.value),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "UrunFirmaAdi",
					header: "Supplier",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("supplier", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("supplier", filterModel.value),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Miktar",
					header: "Amount",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 1)]),
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("amount", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("amount", filterModel.value),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput"
					])]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.order)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "BirimAdi",
					header: "Unit",
					headerClass: "tableHeader",
					bodyClass: "tableBody",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.BirimAdi), 1)]),
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("unit", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("unit", filterModel.value),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Ton",
					header: "Ton",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.ton)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SatisFiyati",
					header: "Price",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SatisToplam",
					header: "Total",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisToplam)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.price)), 1)]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	else _push(`<!---->`);
	if ($props.status == "Shipped") _push(ssrRenderComponent(_component_DataTable, {
		value: $props.list,
		rowGroupMode: "rowspan",
		groupRowsBy: [
			"YuklemeTarihi",
			"SiparisNo",
			"FirmaAdi",
			"PI"
		],
		selection: $data.selectedProduction,
		"onUpdate:selection": ($event) => $data.selectedProduction = $event,
		selectionMode: "multiple",
		onRowClick: ($event) => _ctx.$emit("production_selected_emit", $event.data),
		class: "p-datatable-sm customShipped2",
		paginator: true,
		rows: 25,
		style: {
			"font-size": "70%",
			"border": "2px solid gray"
		},
		filterDisplay: "row",
		filters: $data.filtersOrders,
		"onUpdate:filters": ($event) => $data.filtersOrders = $event,
		sortField: "YuklemeTarihi",
		sortOrder: -1,
		rowClass: $options.rowClass2,
		columnResizeMode: "fit",
		showGridlines: "",
		loading: $props.loading
	}, {
		header: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(`<div class="flex justify-content-between" data-v-52f7d7ab${_scopeId}><span class="p-input-icon-left" data-v-52f7d7ab${_scopeId}><i class="pi pi-search" data-v-52f7d7ab${_scopeId}></i>`);
				_push(ssrRenderComponent(_component_InputText, {
					modelValue: $data.globalSearch,
					"onUpdate:modelValue": ($event) => $data.globalSearch = $event,
					placeholder: "Keyword Search",
					onKeyup: ($event) => $options.globalSearchFilter($event),
					onInput: ($event) => $options.globalSearchFilterInput($event)
				}, null, _parent, _scopeId));
				_push(`</span></div>`);
			} else return [createVNode("div", { class: "flex justify-content-between" }, [createVNode("span", { class: "p-input-icon-left" }, [createVNode("i", { class: "pi pi-search" }), createVNode(_component_InputText, {
				modelValue: $data.globalSearch,
				"onUpdate:modelValue": ($event) => $data.globalSearch = $event,
				placeholder: "Keyword Search",
				onKeyup: withKeys(($event) => $options.globalSearchFilter($event), ["enter"]),
				onInput: ($event) => $options.globalSearchFilterInput($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"onKeyup",
				"onInput"
			])])])];
		}),
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "YuklemeTarihi",
					header: "Load Date",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.YuklemeTarihi))}`);
						else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.YuklemeTarihi)), 1)];
					}),
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("loaddate", filterModel.value),
							onInput: ($event) => $options.filterSet("loaddate", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("loaddate", filterModel.value)
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("loaddate", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("loaddate", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("loaddate", filterModel.value)
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput",
							"onBlur"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "FirmaAdi",
					header: "Customer",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("company", filterModel.value),
							onInput: ($event) => $options.filterSet("company", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("company", filterModel.value)
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("company", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("company", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("company", filterModel.value)
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput",
							"onBlur"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SiparisNo",
					header: "Po",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("po", filterModel.value),
							onInput: ($event) => $options.filterSet("po", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("po", filterModel.value)
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("po", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("po", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("po", filterModel.value)
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput",
							"onBlur"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "PI",
					header: "PI",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (slotProps.data.EvrakDurum > 0) _push(`<div data-v-52f7d7ab${_scopeId}><a${ssrRenderAttr("href", "https://file-service.mekmar.com/file/download/2/" + slotProps.data.SiparisNo)} data-v-52f7d7ab${_scopeId}><i class="pi pi-download" data-v-52f7d7ab${_scopeId}></i></a></div>`);
							else _push(`<div data-v-52f7d7ab${_scopeId}><a data-v-52f7d7ab${_scopeId}><i class="pi pi-download" data-v-52f7d7ab${_scopeId}></i></a></div>`);
						} else return [slotProps.data.EvrakDurum > 0 ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("a", { href: "https://file-service.mekmar.com/file/download/2/" + slotProps.data.SiparisNo }, [createVNode("i", { class: "pi pi-download" })], 8, ["href"])])) : (openBlock(), createBlock("div", { key: 1 }, [createVNode("a", null, [createVNode("i", { class: "pi pi-download" })])]))];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "UrunAdi",
					header: "Product",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("product", filterModel.value),
							onInput: ($event) => $options.filterSet("product", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("product", filterModel.value)
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("product", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("product", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("product", filterModel.value)
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput",
							"onBlur"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "UrunUretimAciklama",
					header: "Details",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "En",
					header: "Width",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("width", filterModel.value),
							onInput: ($event) => $options.filterSet("width", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("width", filterModel.value)
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("width", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("width", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("width", filterModel.value)
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput",
							"onBlur"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Boy",
					header: "Height",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("height", filterModel.value),
							onInput: ($event) => $options.filterSet("height", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("height", filterModel.value)
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("height", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("height", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("height", filterModel.value)
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput",
							"onBlur"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Kenar",
					header: "Thickness",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("edge", filterModel.value),
							onInput: ($event) => $options.filterSet("edge", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("edge", filterModel.value)
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("edge", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("edge", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("edge", filterModel.value)
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput",
							"onBlur"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "UrunFirmaAdi",
					header: "Supplier",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("supplier", filterModel.value),
							onInput: ($event) => $options.filterSet("supplier", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("supplier", filterModel.value)
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("supplier", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("supplier", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("supplier", filterModel.value)
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput",
							"onBlur"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Miktar",
					header: "Amount",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 1)];
					}),
					filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: ($event) => $options.filterApply("amount", filterModel.value),
							onInput: ($event) => $options.filterSet("amount", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("amount", filterModel.value)
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onKeyup: withKeys(($event) => $options.filterApply("amount", filterModel.value), ["enter"]),
							onInput: ($event) => $options.filterSet("amount", filterModel.value),
							class: "p-column-filter",
							onBlur: ($event) => $options.filterApply("amount", filterModel.value)
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onKeyup",
							"onInput",
							"onBlur"
						])];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.order))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.order)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "BirimAdi",
					header: "Unit",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.BirimAdi)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.BirimAdi), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Ton",
					header: "Ton",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.ton)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SatisFiyati",
					header: "Price",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SatisToplam",
					header: "Total",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisToplam))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisToplam)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.price))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.price)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "YuklemeTarihi",
					header: "Load Date",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.YuklemeTarihi)), 1)]),
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("loaddate", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("loaddate", filterModel.value),
						class: "p-column-filter",
						onBlur: ($event) => $options.filterApply("loaddate", filterModel.value)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput",
						"onBlur"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "FirmaAdi",
					header: "Customer",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("company", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("company", filterModel.value),
						class: "p-column-filter",
						onBlur: ($event) => $options.filterApply("company", filterModel.value)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput",
						"onBlur"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SiparisNo",
					header: "Po",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("po", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("po", filterModel.value),
						class: "p-column-filter",
						onBlur: ($event) => $options.filterApply("po", filterModel.value)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput",
						"onBlur"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "PI",
					header: "PI",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [slotProps.data.EvrakDurum > 0 ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("a", { href: "https://file-service.mekmar.com/file/download/2/" + slotProps.data.SiparisNo }, [createVNode("i", { class: "pi pi-download" })], 8, ["href"])])) : (openBlock(), createBlock("div", { key: 1 }, [createVNode("a", null, [createVNode("i", { class: "pi pi-download" })])]))]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "UrunAdi",
					header: "Product",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("product", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("product", filterModel.value),
						class: "p-column-filter",
						onBlur: ($event) => $options.filterApply("product", filterModel.value)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput",
						"onBlur"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "UrunUretimAciklama",
					header: "Details",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "En",
					header: "Width",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("width", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("width", filterModel.value),
						class: "p-column-filter",
						onBlur: ($event) => $options.filterApply("width", filterModel.value)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput",
						"onBlur"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Boy",
					header: "Height",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("height", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("height", filterModel.value),
						class: "p-column-filter",
						onBlur: ($event) => $options.filterApply("height", filterModel.value)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput",
						"onBlur"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Kenar",
					header: "Thickness",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("edge", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("edge", filterModel.value),
						class: "p-column-filter",
						onBlur: ($event) => $options.filterApply("edge", filterModel.value)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput",
						"onBlur"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "UrunFirmaAdi",
					header: "Supplier",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("supplier", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("supplier", filterModel.value),
						class: "p-column-filter",
						onBlur: ($event) => $options.filterApply("supplier", filterModel.value)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput",
						"onBlur"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Miktar",
					header: "Amount",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 1)]),
					filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onKeyup: withKeys(($event) => $options.filterApply("amount", filterModel.value), ["enter"]),
						onInput: ($event) => $options.filterSet("amount", filterModel.value),
						class: "p-column-filter",
						onBlur: ($event) => $options.filterApply("amount", filterModel.value)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onKeyup",
						"onInput",
						"onBlur"
					])]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.order)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "BirimAdi",
					header: "Unit",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.BirimAdi), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Ton",
					header: "Ton",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.ton)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SatisFiyati",
					header: "Price",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SatisToplam",
					header: "Total",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisToplam)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.price)), 1)]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	else _push(ssrRenderComponent(_component_DataTable, {
		value: $props.list,
		rowGroupMode: "rowspan",
		groupRowsBy: [
			"SiparisTarihi",
			"SiparisNo",
			"FirmaAdi",
			"PI"
		],
		selection: $data.selectedProduction,
		"onUpdate:selection": ($event) => $data.selectedProduction = $event,
		selectionMode: "multiple",
		onRowClick: ($event) => _ctx.$emit("production_selected_emit", $event.data),
		class: "p-datatable-sm table-fit-compact",
		filterDisplay: "row",
		filters: $data.filtersOrders,
		"onUpdate:filters": ($event) => $data.filtersOrders = $event,
		rowClass: $options.rowClass2,
		onFilter: ($event) => $options.ordersFilter($event),
		columnResizeMode: "fit",
		showGridlines: ""
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					header: "#",
					headerClass: "col-rowno",
					filterHeaderClass: "col-rowno",
					bodyClass: "col-rowno"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.index + 1)}`);
						else return [createTextVNode(toDisplayString(slotProps.index + 1), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SiparisTarihi",
					header: "Order Date",
					showFilterMenu: false,
					showClearButton: false,
					style: { "width": "3%" }
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.SiparisTarihi))}`);
						else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.SiparisTarihi)), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "FirmaAdi",
					header: "Customer",
					showFilterMenu: false,
					showClearButton: false,
					style: { "width": "5%" }
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "SiparisNo",
					header: "Po",
					showFilterMenu: false,
					showClearButton: false,
					style: { "width": "5%" }
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "PI",
					header: "PI",
					style: { "width": "5%" }
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (slotProps.data.EvrakDurum > 0) _push(`<div data-v-52f7d7ab${_scopeId}><a${ssrRenderAttr("href", "https://file-service.mekmar.com/file/download/2/" + slotProps.data.SiparisNo)} data-v-52f7d7ab${_scopeId}><i class="pi pi-download" data-v-52f7d7ab${_scopeId}></i></a></div>`);
							else _push(`<div data-v-52f7d7ab${_scopeId}><a data-v-52f7d7ab${_scopeId}><i class="pi pi-download" data-v-52f7d7ab${_scopeId}></i></a></div>`);
						} else return [slotProps.data.EvrakDurum > 0 ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("a", { href: "https://file-service.mekmar.com/file/download/2/" + slotProps.data.SiparisNo }, [createVNode("i", { class: "pi pi-download" })], 8, ["href"])])) : (openBlock(), createBlock("div", { key: 1 }, [createVNode("a", null, [createVNode("i", { class: "pi pi-download" })])]))];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "UrunAdi",
					header: "Product",
					showFilterMenu: false,
					showClearButton: false,
					style: { "width": "5%" }
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`<div style="${ssrRenderStyle({ backgroundColor: slotProps.data.AlisFiyati == null || slotProps.data.AlisFiyati == 0 ? "#81fca0" : "" })}" data-v-52f7d7ab${_scopeId}>${ssrInterpolate(slotProps.data.UrunAdi)}</div>`);
						else return [createVNode("div", { style: { backgroundColor: slotProps.data.AlisFiyati == null || slotProps.data.AlisFiyati == 0 ? "#81fca0" : "" } }, toDisplayString(slotProps.data.UrunAdi), 5)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "UrunUretimAciklama",
					header: "Details",
					style: { "width": "5%" }
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "En",
					header: "Width",
					showFilterMenu: false,
					showClearButton: false,
					style: { "width": "5%" }
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "Boy",
					header: "Height",
					showFilterMenu: false,
					showClearButton: false,
					style: { "width": "5%" }
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "Kenar",
					header: "Thickness",
					showFilterMenu: false,
					showClearButton: false,
					style: { "width": "5%" }
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "UrunFirmaAdi",
					header: "Supplier",
					showFilterMenu: false,
					showClearButton: false,
					style: { "width": "5%" }
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (slotProps.data.TedarikciID == 1 || slotProps.data.TedarikciID == 123) _push(`<div data-v-52f7d7ab${_scopeId}>${ssrInterpolate(slotProps.data.UrunFirmaAdi)}</div>`);
							else if (slotProps.data.TedarikciID == 32) _push(`<div style="${ssrRenderStyle([{ "background-color": "#ffff05" }, { color: slotProps.data.Isf ? "" : "red" }])}" data-v-52f7d7ab${_scopeId}>${ssrInterpolate(slotProps.data.UrunFirmaAdi)}</div>`);
							else _push(`<div style="${ssrRenderStyle({ color: slotProps.data.Isf ? "" : "red" })}" data-v-52f7d7ab${_scopeId}>${ssrInterpolate(slotProps.data.UrunFirmaAdi)}</div>`);
						} else return [slotProps.data.TedarikciID == 1 || slotProps.data.TedarikciID == 123 ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(slotProps.data.UrunFirmaAdi), 1)) : slotProps.data.TedarikciID == 32 ? (openBlock(), createBlock("div", {
							key: 1,
							style: [{ "background-color": "#ffff05" }, { color: slotProps.data.Isf ? "" : "red" }]
						}, toDisplayString(slotProps.data.UrunFirmaAdi), 5)) : (openBlock(), createBlock("div", {
							key: 2,
							style: { color: slotProps.data.Isf ? "" : "red" }
						}, toDisplayString(slotProps.data.UrunFirmaAdi), 5))];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "Miktar",
					header: "Amount",
					showClearButton: false,
					showFilterMenu: false,
					style: { "width": "5%" }
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.order))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.order)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "BirimAdi",
					header: "Unit",
					style: { "width": "5%" },
					showFilterMenu: false,
					showClearButton: false
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "Uretim",
					header: "Produced",
					style: { "width": "5%" }
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (($options.__amountControl(slotProps.data.Out) && $options.__amountControl(slotProps.data.Uretim)) == $options.__amountControl(slotProps.data.Miktar)) _push(`<div style="${ssrRenderStyle({
								"background-color": "blue",
								"color": "white"
							})}" data-v-52f7d7ab${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim))}</div>`);
							else _push(`<div style="${ssrRenderStyle(slotProps.data.style)}" data-v-52f7d7ab${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim))}</div>`);
						} else return [($options.__amountControl(slotProps.data.Out) && $options.__amountControl(slotProps.data.Uretim)) == $options.__amountControl(slotProps.data.Miktar) ? (openBlock(), createBlock("div", {
							key: 0,
							style: {
								"background-color": "blue",
								"color": "white"
							}
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim)), 1)) : (openBlock(), createBlock("div", {
							key: 1,
							style: slotProps.data.style
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim)), 5))];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.production))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.production)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Ton",
					header: "Ton",
					style: { "width": "5%" }
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.ton)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SatisFiyati",
					header: "Price",
					style: { "width": "5%" }
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SatisToplam",
					header: "Total",
					style: { "width": "5%" }
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisToplam))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisToplam)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.price))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.price)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					header: "#",
					headerClass: "col-rowno",
					filterHeaderClass: "col-rowno",
					bodyClass: "col-rowno"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.index + 1), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SiparisTarihi",
					header: "Order Date",
					showFilterMenu: false,
					showClearButton: false,
					style: { "width": "3%" }
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.SiparisTarihi)), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "FirmaAdi",
					header: "Customer",
					showFilterMenu: false,
					showClearButton: false,
					style: { "width": "5%" }
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "SiparisNo",
					header: "Po",
					showFilterMenu: false,
					showClearButton: false,
					style: { "width": "5%" }
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "PI",
					header: "PI",
					style: { "width": "5%" }
				}, {
					body: withCtx((slotProps) => [slotProps.data.EvrakDurum > 0 ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("a", { href: "https://file-service.mekmar.com/file/download/2/" + slotProps.data.SiparisNo }, [createVNode("i", { class: "pi pi-download" })], 8, ["href"])])) : (openBlock(), createBlock("div", { key: 1 }, [createVNode("a", null, [createVNode("i", { class: "pi pi-download" })])]))]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "UrunAdi",
					header: "Product",
					showFilterMenu: false,
					showClearButton: false,
					style: { "width": "5%" }
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					body: withCtx((slotProps) => [createVNode("div", { style: { backgroundColor: slotProps.data.AlisFiyati == null || slotProps.data.AlisFiyati == 0 ? "#81fca0" : "" } }, toDisplayString(slotProps.data.UrunAdi), 5)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "UrunUretimAciklama",
					header: "Details",
					style: { "width": "5%" }
				}),
				createVNode(_component_Column, {
					field: "En",
					header: "Width",
					showFilterMenu: false,
					showClearButton: false,
					style: { "width": "5%" }
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "Boy",
					header: "Height",
					showFilterMenu: false,
					showClearButton: false,
					style: { "width": "5%" }
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "Kenar",
					header: "Thickness",
					showFilterMenu: false,
					showClearButton: false,
					style: { "width": "5%" }
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "UrunFirmaAdi",
					header: "Supplier",
					showFilterMenu: false,
					showClearButton: false,
					style: { "width": "5%" }
				}, {
					body: withCtx((slotProps) => [slotProps.data.TedarikciID == 1 || slotProps.data.TedarikciID == 123 ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(slotProps.data.UrunFirmaAdi), 1)) : slotProps.data.TedarikciID == 32 ? (openBlock(), createBlock("div", {
						key: 1,
						style: [{ "background-color": "#ffff05" }, { color: slotProps.data.Isf ? "" : "red" }]
					}, toDisplayString(slotProps.data.UrunFirmaAdi), 5)) : (openBlock(), createBlock("div", {
						key: 2,
						style: { color: slotProps.data.Isf ? "" : "red" }
					}, toDisplayString(slotProps.data.UrunFirmaAdi), 5))]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "Miktar",
					header: "Amount",
					showClearButton: false,
					showFilterMenu: false,
					style: { "width": "5%" }
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.order)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "BirimAdi",
					header: "Unit",
					style: { "width": "5%" },
					showFilterMenu: false,
					showClearButton: false
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "Uretim",
					header: "Produced",
					style: { "width": "5%" }
				}, {
					body: withCtx((slotProps) => [($options.__amountControl(slotProps.data.Out) && $options.__amountControl(slotProps.data.Uretim)) == $options.__amountControl(slotProps.data.Miktar) ? (openBlock(), createBlock("div", {
						key: 0,
						style: {
							"background-color": "blue",
							"color": "white"
						}
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim)), 1)) : (openBlock(), createBlock("div", {
						key: 1,
						style: slotProps.data.style
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim)), 5))]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.production)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Ton",
					header: "Ton",
					style: { "width": "5%" }
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.ton)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SatisFiyati",
					header: "Price",
					style: { "width": "5%" }
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SatisToplam",
					header: "Total",
					style: { "width": "5%" }
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisToplam)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.price)), 1)]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div>`);
	if ($props.status == "Shipped 2") _push(ssrRenderComponent(_component_DataTable, {
		value: $props.list,
		rowGroupMode: "rowspan",
		groupRowsBy: [
			"YuklemeTarihi",
			"SiparisNo",
			"FirmaAdi",
			"PI"
		],
		selection: $data.selectedProduction,
		"onUpdate:selection": ($event) => $data.selectedProduction = $event,
		selectionMode: "multiple",
		onRowClick: ($event) => _ctx.$emit("production_selected_emit", $event.data),
		class: "p-datatable-sm",
		paginator: true,
		rows: 25,
		style: {
			"font-size": "70%",
			"border": "2px solid gray"
		},
		filterDisplay: "row",
		filters: $data.filtersShipped,
		"onUpdate:filters": ($event) => $data.filtersShipped = $event,
		z: "",
		sortField: "YuklemeTarihi",
		sortOrder: -1,
		rowClass: $options.rowClass2,
		columnResizeMode: "fit",
		showGridlines: ""
	}, {
		header: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(`<div class="flex justify-content-between" data-v-52f7d7ab${_scopeId}><span class="p-input-icon-left" data-v-52f7d7ab${_scopeId}><i class="pi pi-search" data-v-52f7d7ab${_scopeId}></i>`);
				_push(ssrRenderComponent(_component_InputText, {
					modelValue: $data.globalSearch,
					"onUpdate:modelValue": ($event) => $data.globalSearch = $event,
					placeholder: "Keyword Search",
					onKeyup: ($event) => $options.globalSearchFilter($event),
					onInput: ($event) => $options.globalSearchFilterInput($event)
				}, null, _parent, _scopeId));
				_push(`</span></div>`);
			} else return [createVNode("div", { class: "flex justify-content-between" }, [createVNode("span", { class: "p-input-icon-left" }, [createVNode("i", { class: "pi pi-search" }), createVNode(_component_InputText, {
				modelValue: $data.globalSearch,
				"onUpdate:modelValue": ($event) => $data.globalSearch = $event,
				placeholder: "Keyword Search",
				onKeyup: withKeys(($event) => $options.globalSearchFilter($event), ["enter"]),
				onInput: ($event) => $options.globalSearchFilterInput($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"onKeyup",
				"onInput"
			])])])];
		}),
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					header: "#",
					headerClass: "col-rowno",
					filterHeaderClass: "col-rowno",
					bodyClass: "col-rowno"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.index + 1)}`);
						else return [createTextVNode(toDisplayString(slotProps.index + 1), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "YuklemeTarihi",
					header: "Load Date",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.YuklemeTarihi))}`);
						else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.YuklemeTarihi)), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "FirmaAdi",
					header: "Customer",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "SiparisNo",
					header: "Po",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "PI",
					header: "PI",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (slotProps.data.EvrakDurum > 0) _push(`<div data-v-52f7d7ab${_scopeId}><a${ssrRenderAttr("href", "https://file-service.mekmar.com/file/download/2/" + slotProps.data.SiparisNo)} data-v-52f7d7ab${_scopeId}><i class="pi pi-download" data-v-52f7d7ab${_scopeId}></i></a></div>`);
							else _push(`<div data-v-52f7d7ab${_scopeId}><a data-v-52f7d7ab${_scopeId}><i class="pi pi-download" data-v-52f7d7ab${_scopeId}></i></a></div>`);
						} else return [slotProps.data.EvrakDurum > 0 ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("a", { href: "https://file-service.mekmar.com/file/download/2/" + slotProps.data.SiparisNo }, [createVNode("i", { class: "pi pi-download" })], 8, ["href"])])) : (openBlock(), createBlock("div", { key: 1 }, [createVNode("a", null, [createVNode("i", { class: "pi pi-download" })])]))];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "UrunAdi",
					header: "Product",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "UrunUretimAciklama",
					header: "Details",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "En",
					header: "Width",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "Boy",
					header: "Height",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "Kenar",
					header: "Thickness",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "UrunFirmaAdi",
					header: "Supplier",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
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
					field: "Miktar",
					header: "Amount",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.order))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.order)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "BirimAdi",
					header: "Unit",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.BirimAdi)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.BirimAdi), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Ton",
					header: "Ton",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.ton)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SatisFiyati",
					header: "Price",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SatisToplam",
					header: "Total",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisToplam))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisToplam)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.price))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.price)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					header: "#",
					headerClass: "col-rowno",
					filterHeaderClass: "col-rowno",
					bodyClass: "col-rowno"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.index + 1), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "YuklemeTarihi",
					header: "Load Date",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.YuklemeTarihi)), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "FirmaAdi",
					header: "Customer",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "SiparisNo",
					header: "Po",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "PI",
					header: "PI",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [slotProps.data.EvrakDurum > 0 ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("a", { href: "https://file-service.mekmar.com/file/download/2/" + slotProps.data.SiparisNo }, [createVNode("i", { class: "pi pi-download" })], 8, ["href"])])) : (openBlock(), createBlock("div", { key: 1 }, [createVNode("a", null, [createVNode("i", { class: "pi pi-download" })])]))]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "UrunAdi",
					header: "Product",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "UrunUretimAciklama",
					header: "Details",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "En",
					header: "Width",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "Boy",
					header: "Height",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "Kenar",
					header: "Thickness",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "UrunFirmaAdi",
					header: "Supplier",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
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
					field: "Miktar",
					header: "Amount",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.order)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "BirimAdi",
					header: "Unit",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.BirimAdi), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Ton",
					header: "Ton",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.ton)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SatisFiyati",
					header: "Price",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SatisToplam",
					header: "Total",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisToplam)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.total.price)), 1)]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	else _push(`<!---->`);
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/order/Table.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Table_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-52f7d7ab"]]), { __name: "OrderTable" });

export { Table_default as T };
//# sourceMappingURL=Table-DjukAIQg.mjs.map
