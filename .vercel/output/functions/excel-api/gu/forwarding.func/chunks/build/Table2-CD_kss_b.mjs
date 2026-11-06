import { _ as _plugin_vue_export_helper_default, c as dateToString, f as formatDecimal, e as formatPriceUsd, u as useCookie, F as FilterMatchMode } from '../virtual/entry.mjs';
import { n as script$1 } from './column-CT6GXkG2.mjs';
import { n as script } from './datatable-D6ou7HZJ.mjs';
import { n as script$2 } from './inputtext-s6cxdqDx.mjs';
import { u as useOrderStore } from './order-C0FMsqTx.mjs';
import { withCtx, createTextVNode, toDisplayString, createVNode, withKeys, unref, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';

//#region app/components/order/Table2.vue
var _sfc_main = {
	emits: ["production_selected_emit"],
	computed: { orderStore() {
		return useOrderStore();
	} },
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
		}
	},
	data() {
		return {
			totals: 0,
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
				amount: ""
			}
		};
	},
	created() {
		this.totals = 0;
		this.list.forEach((x) => {
			this.totals += this.__noneControl(x.AlisFiyati) * this.__noneControl(x.Miktar);
		});
	},
	methods: {
		__amountControl(val) {
			if (val == 0 || val == void 0 || val == "" || val == " " || val == null) return 0;
			else return +val.toFixed(2);
		},
		__noneControl(val) {
			if (val == null || val == void 0 || val == "") return 0;
			else return val;
		},
		ordersFilter(event) {
			this.orderStore.setOrderProductionTotal(event.filteredValue);
			let totals = 0;
			event.filteredValue.forEach((x) => {
				totals += this.__noneControl(x.AlisFiyati) * this.__noneControl(x.Miktar);
			});
			this.totals = totals;
		},
		rowClass2(event) {
			const userId = useCookie("userId").value;
			if (event.SiparisSahibi == userId || event.Operasyon == userId) return "row-accessories";
			return "row-accessories-border";
		},
		globalSearchFilterInput(event) {
			if (!event) this.orderStore.setOrderShippedList();
		},
		globalSearchFilter(event) {
			if (event.target._value) this.orderStore.setFilterShipmentGlobal(event.target._value);
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
	_push(`<div${ssrRenderAttrs(_attrs)} data-v-b4c7408f><div class="card" data-v-b4c7408f>`);
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
		class: "p-datatable-sm",
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
		responsiveLayout: "scroll"
	}, {
		header: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(`<div class="flex justify-content-between" data-v-b4c7408f${_scopeId}><span class="p-input-icon-left" data-v-b4c7408f${_scopeId}><i class="pi pi-search" data-v-b4c7408f${_scopeId}></i>`);
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
					headerStyle: "width:3rem;font-size:16px;"
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
							if (slotProps.data.EvrakDurum > 0) _push(`<div data-v-b4c7408f${_scopeId}><a${ssrRenderAttr("href", "https://file-service.mekmar.com/file/download/2/" + slotProps.data.SiparisNo)} data-v-b4c7408f${_scopeId}><i class="pi pi-download" data-v-b4c7408f${_scopeId}></i></a></div>`);
							else _push(`<div data-v-b4c7408f${_scopeId}><a data-v-b4c7408f${_scopeId}><i class="pi pi-download" data-v-b4c7408f${_scopeId}></i></a></div>`);
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
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.order))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.order)), 1)];
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
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.ton)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SatisFiyati",
					header: "Price (Selling)",
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
					header: "Total (Selling)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati * slotProps.data.Miktar))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati * slotProps.data.Miktar)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.totals))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.totals)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "AlisFiyati",
					header: "Price (Puchase)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					header: "Total (Puchase)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati * slotProps.data.Miktar))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati * slotProps.data.Miktar)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.totals))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.totals)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					header: "#",
					headerStyle: "width:3rem;font-size:16px;"
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
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.order)), 1)]),
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
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.ton)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SatisFiyati",
					header: "Price (Selling)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					header: "Total (Selling)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati * slotProps.data.Miktar)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.totals)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "AlisFiyati",
					header: "Price (Puchase)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					header: "Total (Puchase)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati * slotProps.data.Miktar)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.totals)), 1)]),
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
		showGridlines: "",
		responsiveLayout: "scroll",
		sortField: "SiparisTarihi",
		sortOrder: -1
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					header: "#",
					headerStyle: "width:3rem",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
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
					headerClass: "tableHeader",
					bodyClass: "tableBody"
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
							if (slotProps.data.EvrakDurum > 0) _push(`<div data-v-b4c7408f${_scopeId}><a${ssrRenderAttr("href", "https://file-service.mekmar.com/file/download/2/" + slotProps.data.SiparisNo)} data-v-b4c7408f${_scopeId}><i class="pi pi-download" data-v-b4c7408f${_scopeId}></i></a></div>`);
							else _push(`<div data-v-b4c7408f${_scopeId}><a data-v-b4c7408f${_scopeId}><i class="pi pi-download" data-v-b4c7408f${_scopeId}></i></a></div>`);
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
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`<div style="${ssrRenderStyle({ backgroundColor: slotProps.data.AlisFiyati == null || slotProps.data.AlisFiyati == 0 ? "#81fca0" : "" })}" data-v-b4c7408f${_scopeId}>${ssrInterpolate(slotProps.data.UrunAdi)}</div>`);
						else return [createVNode("div", { style: { backgroundColor: slotProps.data.AlisFiyati == null || slotProps.data.AlisFiyati == 0 ? "#81fca0" : "" } }, toDisplayString(slotProps.data.UrunAdi), 5)];
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
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (slotProps.data.TedarikciID == 1 || slotProps.data.TedarikciID == 123) _push(`<div data-v-b4c7408f${_scopeId}>${ssrInterpolate(slotProps.data.UrunFirmaAdi)}</div>`);
							else if (slotProps.data.TedarikciID == 32) _push(`<div style="${ssrRenderStyle([{ "background-color": "#ffff05" }, { color: slotProps.data.Isf ? "" : "red" }])}" data-v-b4c7408f${_scopeId}>${ssrInterpolate(slotProps.data.UrunFirmaAdi)}</div>`);
							else _push(`<div style="${ssrRenderStyle({ color: slotProps.data.Isf ? "" : "red" })}" data-v-b4c7408f${_scopeId}>${ssrInterpolate(slotProps.data.UrunFirmaAdi)}</div>`);
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
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.order))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.order)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "BirimAdi",
					header: "Unit",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Uretim",
					header: "Produced",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if ($options.__amountControl(slotProps.data.Uretim) == $options.__amountControl(slotProps.data.Miktar)) _push(`<div style="${ssrRenderStyle({
								"background-color": "green",
								"color": "white"
							})}" data-v-b4c7408f${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim))}</div>`);
							else if ($options.__amountControl(slotProps.data.Uretim) > $options.__amountControl(slotProps.data.Miktar)) _push(`<div style="${ssrRenderStyle({
								"background-color": "black",
								"color": "white"
							})}" data-v-b4c7408f${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim))}</div>`);
							else if ($options.__amountControl(slotProps.data.Uretim) < $options.__amountControl(slotProps.data.Miktar)) _push(`<div style="${ssrRenderStyle({
								"background-color": "yellow",
								"color": "black"
							})}" data-v-b4c7408f${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim))}</div>`);
							else _push(`<div data-v-b4c7408f${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim))}</div>`);
						} else return [$options.__amountControl(slotProps.data.Uretim) == $options.__amountControl(slotProps.data.Miktar) ? (openBlock(), createBlock("div", {
							key: 0,
							style: {
								"background-color": "green",
								"color": "white"
							}
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim)), 1)) : $options.__amountControl(slotProps.data.Uretim) > $options.__amountControl(slotProps.data.Miktar) ? (openBlock(), createBlock("div", {
							key: 1,
							style: {
								"background-color": "black",
								"color": "white"
							}
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim)), 1)) : $options.__amountControl(slotProps.data.Uretim) < $options.__amountControl(slotProps.data.Miktar) ? (openBlock(), createBlock("div", {
							key: 2,
							style: {
								"background-color": "yellow",
								"color": "black"
							}
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim)), 1)) : (openBlock(), createBlock("div", { key: 3 }, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim)), 1))];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.production))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.production)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Kalan",
					header: "Remainder",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if ($options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim) == 0) _push(`<div style="${ssrRenderStyle({
								"background-color": "yellow",
								"color": "black"
							})}" data-v-b4c7408f${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim)))}</div>`);
							else if ($options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim) > 0) _push(`<div style="${ssrRenderStyle({
								"background-color": "blue",
								"color": "white"
							})}" data-v-b4c7408f${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim)))}</div>`);
							else if ($options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim) < 0) _push(`<div style="${ssrRenderStyle({
								"background-color": "black",
								"color": "white"
							})}" data-v-b4c7408f${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim)))}</div>`);
							else _push(`<!---->`);
						} else return [$options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim) == 0 ? (openBlock(), createBlock("div", {
							key: 0,
							style: {
								"background-color": "yellow",
								"color": "black"
							}
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim))), 1)) : $options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim) > 0 ? (openBlock(), createBlock("div", {
							key: 1,
							style: {
								"background-color": "blue",
								"color": "white"
							}
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim))), 1)) : $options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim) < 0 ? (openBlock(), createBlock("div", {
							key: 2,
							style: {
								"background-color": "black",
								"color": "white"
							}
						}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim))), 1)) : createCommentVNode("", true)];
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
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.ton)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SatisFiyati",
					header: "Price (Selling)",
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
					header: "Total (Selling)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati * slotProps.data.Miktar))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati * slotProps.data.Miktar)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.totals))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.totals)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "AlisFiyati",
					header: "Price (Puchase)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					header: "Total (Puchase)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati * slotProps.data.Miktar))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati * slotProps.data.Miktar)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.totals))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.totals)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					header: "#",
					headerStyle: "width:3rem",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.index + 1), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SiparisTarihi",
					header: "Order Date",
					showFilterMenu: false,
					showClearButton: false,
					headerClass: "tableHeader",
					bodyClass: "tableBody"
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
					body: withCtx((slotProps) => [createVNode("div", { style: { backgroundColor: slotProps.data.AlisFiyati == null || slotProps.data.AlisFiyati == 0 ? "#81fca0" : "" } }, toDisplayString(slotProps.data.UrunAdi), 5)]),
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
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.order)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "BirimAdi",
					header: "Unit",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "Uretim",
					header: "Produced",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [$options.__amountControl(slotProps.data.Uretim) == $options.__amountControl(slotProps.data.Miktar) ? (openBlock(), createBlock("div", {
						key: 0,
						style: {
							"background-color": "green",
							"color": "white"
						}
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim)), 1)) : $options.__amountControl(slotProps.data.Uretim) > $options.__amountControl(slotProps.data.Miktar) ? (openBlock(), createBlock("div", {
						key: 1,
						style: {
							"background-color": "black",
							"color": "white"
						}
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim)), 1)) : $options.__amountControl(slotProps.data.Uretim) < $options.__amountControl(slotProps.data.Miktar) ? (openBlock(), createBlock("div", {
						key: 2,
						style: {
							"background-color": "yellow",
							"color": "black"
						}
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim)), 1)) : (openBlock(), createBlock("div", { key: 3 }, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Uretim)), 1))]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.production)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Kalan",
					header: "Remainder",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [$options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim) == 0 ? (openBlock(), createBlock("div", {
						key: 0,
						style: {
							"background-color": "yellow",
							"color": "black"
						}
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim))), 1)) : $options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim) > 0 ? (openBlock(), createBlock("div", {
						key: 1,
						style: {
							"background-color": "blue",
							"color": "white"
						}
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim))), 1)) : $options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim) < 0 ? (openBlock(), createBlock("div", {
						key: 2,
						style: {
							"background-color": "black",
							"color": "white"
						}
					}, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($options.__amountControl(slotProps.data.Miktar) - $options.__amountControl(slotProps.data.Uretim))), 1)) : createCommentVNode("", true)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Ton",
					header: "Ton",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.ton)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SatisFiyati",
					header: "Price (Selling)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					header: "Total (Selling)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati * slotProps.data.Miktar)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.totals)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "AlisFiyati",
					header: "Price (Puchase)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					header: "Total (Puchase)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati * slotProps.data.Miktar)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.totals)), 1)]),
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
		sortField: "YuklemeTarihi",
		sortOrder: -1,
		rowClass: $options.rowClass2,
		columnResizeMode: "fit",
		showGridlines: "",
		responsiveLayout: "scroll"
	}, {
		header: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(`<div class="flex justify-content-between" data-v-b4c7408f${_scopeId}><span class="p-input-icon-left" data-v-b4c7408f${_scopeId}><i class="pi pi-search" data-v-b4c7408f${_scopeId}></i>`);
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
					headerStyle: "width:3rem;font-size:16px;"
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
							if (slotProps.data.EvrakDurum > 0) _push(`<div data-v-b4c7408f${_scopeId}><a${ssrRenderAttr("href", "https://file-service.mekmar.com/file/download/2/" + slotProps.data.SiparisNo)} data-v-b4c7408f${_scopeId}><i class="pi pi-download" data-v-b4c7408f${_scopeId}></i></a></div>`);
							else _push(`<div data-v-b4c7408f${_scopeId}><a data-v-b4c7408f${_scopeId}><i class="pi pi-download" data-v-b4c7408f${_scopeId}></i></a></div>`);
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
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.order))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.order)), 1)];
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
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.ton)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SatisFiyati",
					header: "Price (Selling)",
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
					header: "Total (Selling)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati * slotProps.data.Miktar))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati * slotProps.data.Miktar)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.totals))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.totals)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "AlisFiyati",
					header: "Price (Puchase)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					header: "Total (Puchase)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati * slotProps.data.Miktar))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati * slotProps.data.Miktar)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.totals))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.totals)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					header: "#",
					headerStyle: "width:3rem;font-size:16px;"
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
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.order)), 1)]),
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
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($props.total.ton)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SatisFiyati",
					header: "Price (Selling)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					header: "Total (Selling)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.SatisFiyati * slotProps.data.Miktar)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.totals)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "AlisFiyati",
					header: "Price (Puchase)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					header: "Total (Puchase)",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati * slotProps.data.Miktar)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.totals)), 1)]),
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/order/Table2.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Table2_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-b4c7408f"]]), { __name: "OrderTable2" });

export { Table2_default as T };
//# sourceMappingURL=Table2-CD_kss_b.mjs.map
