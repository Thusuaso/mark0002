import { b as useAsyncData, _ as _plugin_vue_export_helper_default, e as formatPriceUsd, f as formatDecimal, q as useAuthStore, B as BaseStyle } from '../virtual/entry.mjs';
import { s as script$2 } from './basecomponent-CEvq-Ypu.mjs';
import { n as script$4 } from './column-CT6GXkG2.mjs';
import { n as script$3 } from './datatable-D6ou7HZJ.mjs';
import { u as useLegacyApi } from './useLegacyApi-B5zRc7ig.mjs';
import { n as script$1 } from './card-D9W2BIHg.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext, openBlock, createElementBlock, createElementVNode } from 'vue';
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
import './useApi-CGFzrxZs.mjs';

//#region app/utils/viz.ts
/** Kategorik slotlar -- SABIT SIRA. Asla dondurulup tekrar kullanilmaz. */
var VIZ_SERIES = {
	blue: "#2a78d6",
	orange: "#eb6834",
	aqua: "#1baf7a",
	violet: "#4a3aa7"
};
/** Iki serili grafikler (gruplu cubuk). */
var VIZ_PAIR = [VIZ_SERIES.blue, VIZ_SERIES.orange];
/** Uc serili YIGILI grafik. */
var VIZ_TRIPLE = [
	VIZ_SERIES.blue,
	VIZ_SERIES.orange,
	VIZ_SERIES.aqua
];
/** Donut: dort dilim, tum ciftler ayni anda gorunur. */
var VIZ_QUAD = [
	VIZ_SERIES.blue,
	VIZ_SERIES.orange,
	VIZ_SERIES.aqua,
	VIZ_SERIES.violet
];
var VIZ_INK = {
	text: "#52514e",
	muted: "#898781",
	grid: "#e1e0d9",
	axis: "#c3c2b7",
	surface: "#ffffff"
};
function withSeriesColors(data, palette, opts = {}) {
	if (!data?.datasets?.length) return data ?? {
		labels: [],
		datasets: []
	};
	return {
		...data,
		datasets: data.datasets.map((ds, i) => {
			const next = { ...ds };
			if (opts.perPoint) {
				next.backgroundColor = [...palette];
				next.hoverBackgroundColor = [...palette];
				next.borderColor = VIZ_INK.surface;
				next.borderWidth = 2;
				next.hoverBorderColor = VIZ_INK.surface;
				return next;
			}
			const color = palette[i % palette.length];
			next.backgroundColor = color;
			next.borderColor = color;
			if (opts.stacked) {
				next.borderColor = VIZ_INK.surface;
				next.borderWidth = 2;
			}
			next.borderRadius = 4;
			next.maxBarThickness = 28;
			return next;
		})
	};
}
var legend = {
	display: true,
	position: "bottom",
	labels: {
		usePointStyle: true,
		boxWidth: 8,
		boxHeight: 8,
		color: VIZ_INK.text,
		padding: 16
	}
};
var tooltip = {
	mode: "index",
	intersect: false,
	backgroundColor: "#0b0b0b",
	padding: 10,
	cornerRadius: 6,
	titleFont: { weight: "600" },
	displayColors: true
};
var xAxis = {
	ticks: {
		color: VIZ_INK.muted,
		font: { size: 11 }
	},
	grid: { display: false },
	border: { color: VIZ_INK.axis }
};
var yAxis = {
	ticks: {
		color: VIZ_INK.muted,
		font: { size: 11 }
	},
	grid: {
		color: VIZ_INK.grid,
		drawTicks: false
	},
	border: { display: false }
};
/** Gruplu cubuk grafigi secenekleri. */
var vizBarOptions = {
	maintainAspectRatio: false,
	interaction: {
		mode: "index",
		intersect: false
	},
	plugins: {
		legend,
		tooltip
	},
	scales: {
		x: xAxis,
		y: yAxis
	}
};
/** Yigili cubuk grafigi secenekleri. */
var vizStackedBarOptions = {
	maintainAspectRatio: false,
	interaction: {
		mode: "index",
		intersect: false
	},
	plugins: {
		legend,
		tooltip
	},
	scales: {
		x: {
			...xAxis,
			stacked: true
		},
		y: {
			...yAxis,
			stacked: true
		}
	}
};
/** Donut secenekleri. */
var vizDoughnutOptions = {
	maintainAspectRatio: false,
	cutout: "58%",
	plugins: {
		legend,
		tooltip: {
			...tooltip,
			mode: "nearest",
			intersect: true
		}
	}
};
//#endregion
//#region node_modules/primevue/chart/style/index.mjs
var ChartStyle = BaseStyle.extend({
	name: "chart",
	classes: { root: "p-chart" },
	inlineStyles: { root: { position: "relative" } }
});
//#endregion
//#region node_modules/primevue/chart/index.mjs
var script = {
	name: "Chart",
	"extends": {
		name: "BaseChart",
		"extends": script$2,
		props: {
			type: String,
			data: null,
			options: null,
			plugins: null,
			width: {
				type: Number,
				"default": 300
			},
			height: {
				type: Number,
				"default": 150
			},
			canvasProps: {
				type: null,
				"default": null
			}
		},
		style: ChartStyle,
		provide: function provide() {
			return {
				$pcChart: this,
				$parentInstance: this
			};
		}
	},
	inheritAttrs: false,
	emits: ["select", "loaded"],
	chart: null,
	watch: {
		data: {
			handler: function handler() {
				this.reinit();
			},
			deep: true
		},
		type: function type() {
			this.reinit();
		},
		options: function options() {
			this.reinit();
		}
	},
	mounted: function mounted() {
		this.initChart();
	},
	beforeUnmount: function beforeUnmount() {
		if (this.chart) {
			this.chart.destroy();
			this.chart = null;
		}
	},
	methods: {
		initChart: function initChart() {
			var _this = this;
			import('chart.js/auto').then(function(module) {
				if (_this.chart) {
					_this.chart.destroy();
					_this.chart = null;
				}
				if (module && module["default"]) _this.chart = new module["default"](_this.$refs.canvas, {
					type: _this.type,
					data: _this.data,
					options: _this.options,
					plugins: _this.plugins
				});
				_this.$emit("loaded", _this.chart);
			});
		},
		getCanvas: function getCanvas() {
			return this.$canvas;
		},
		getChart: function getChart() {
			return this.chart;
		},
		getBase64Image: function getBase64Image() {
			return this.chart.toBase64Image();
		},
		refresh: function refresh() {
			if (this.chart) this.chart.update();
		},
		reinit: function reinit() {
			this.initChart();
		},
		onCanvasClick: function onCanvasClick(event) {
			if (this.chart) {
				var element = this.chart.getElementsAtEventForMode(event, "nearest", { intersect: true }, false);
				var dataset = this.chart.getElementsAtEventForMode(event, "dataset", { intersect: true }, false);
				if (element && element[0] && dataset) this.$emit("select", {
					originalEvent: event,
					element: element[0],
					dataset
				});
			}
		},
		generateLegend: function generateLegend() {
			if (this.chart) return this.chart.generateLegend();
		}
	}
};
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
var _hoisted_1 = ["width", "height"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", mergeProps({
		"class": _ctx.cx("root"),
		style: _ctx.sx("root")
	}, _ctx.ptmi("root")), [createElementVNode("canvas", mergeProps({
		ref: "canvas",
		width: _ctx.width,
		height: _ctx.height,
		onClick: _cache[0] || (_cache[0] = function($event) {
			return $options.onCanvasClick($event);
		})
	}, _objectSpread(_objectSpread({}, _ctx.canvasProps), _ctx.ptm("canvas"))), null, 16, _hoisted_1)], 16);
}
script.render = render;
//#endregion
//#region app/components/home/Dashboard.vue
var _sfc_main$1 = {
	props: {
		home: {
			type: Object,
			required: true
		},
		stocks: {
			type: Object,
			required: true
		},
		totalSupplierCost: {
			type: Number,
			default: 0
		}
	},
	computed: {
		monthNameEn() {
			return [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			][this.currentMonth - 1] ?? "";
		},
		authStore() {
			return useAuthStore();
		},
		userId() {
			return this.authStore.getUserId;
		},
		currentYear() {
			return (/* @__PURE__ */ new Date()).getFullYear();
		},
		currentMonth() {
			return (/* @__PURE__ */ new Date()).getMonth() + 1;
		},
		chartShipped() {
			return withSeriesColors(this.home?.chartOne, VIZ_PAIR);
		},
		chartShippedByMarketing() {
			return withSeriesColors(this.home?.chartCustomerShipped, VIZ_QUAD, { perPoint: true });
		},
		chartProduction() {
			return withSeriesColors(this.home?.chartProducts, VIZ_TRIPLE, { stacked: true });
		},
		chartOffersColored() {
			return withSeriesColors(this.home?.chartOffers, VIZ_PAIR);
		}
	},
	data() {
		return {
			vizBarOptions,
			vizStackedBarOptions,
			vizDoughnutOptions
		};
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_Card = script$1;
	const _component_Chart = script;
	const _component_DataTable = script$3;
	const _component_Column = script$4;
	if ($options.userId != 48) {
		_push(`<div${ssrRenderAttrs(mergeProps({ class: "container-fluid dash" }, _attrs))} data-v-2e27db42><header class="dash-head" data-v-2e27db42><div class="dash-head__id" data-v-2e27db42><span class="dash-head__mark" aria-hidden="true" data-v-2e27db42></span><div data-v-2e27db42><p class="dash-head__eyebrow" data-v-2e27db42>Dashboard</p><h1 class="dash-head__title" data-v-2e27db42>Overview</h1></div></div><p class="dash-head__period" data-v-2e27db42><i class="pi pi-calendar" aria-hidden="true" data-v-2e27db42></i><span data-v-2e27db42>${ssrInterpolate($options.monthNameEn)} ${ssrInterpolate($options.currentYear)}</span></p></header><section class="dash-band" aria-labelledby="dash-band-fob" data-v-2e27db42><h2 id="dash-band-fob" class="dash-band__title" data-v-2e27db42><span class="dash-band__dot" aria-hidden="true" data-v-2e27db42></span> Orders <span class="dash-band__unit" data-v-2e27db42>FOB</span><span class="dash-band__rule" aria-hidden="true" data-v-2e27db42></span></h2><div class="dash-kpis" data-v-2e27db42><article class="dash-kpi" data-v-2e27db42><p class="dash-kpi__label" data-v-2e27db42>Monthly order</p><p class="dash-kpi__value" data-v-2e27db42>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.home.aylikSiparis))}</p><p class="dash-kpi__meta" data-v-2e27db42>${ssrInterpolate($options.monthNameEn)}</p></article><article class="dash-kpi" data-v-2e27db42><p class="dash-kpi__label" data-v-2e27db42>Annual order</p><p class="dash-kpi__value" data-v-2e27db42>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.home.yillikSiparis))}</p><p class="dash-kpi__meta" data-v-2e27db42>${ssrInterpolate($options.currentYear)} · ${ssrInterpolate($options.currentMonth)}/12 months</p></article><article class="dash-kpi" data-v-2e27db42><p class="dash-kpi__label" data-v-2e27db42>Monthly average</p><p class="dash-kpi__value" data-v-2e27db42>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.home.ortalamaSiparis))}</p><p class="dash-kpi__meta" data-v-2e27db42>year to date</p></article><article class="dash-kpi dash-kpi--forecast" data-v-2e27db42><p class="dash-kpi__label" data-v-2e27db42>Annual forecast</p><p class="dash-kpi__value" data-v-2e27db42>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.home.tahminiYillikSiparis))}</p><p class="dash-kpi__meta" data-v-2e27db42>forecast · 12 months</p></article></div></section><section class="dash-band dash-band--ddp" aria-labelledby="dash-band-ddp" data-v-2e27db42><h2 id="dash-band-ddp" class="dash-band__title" data-v-2e27db42><span class="dash-band__dot" aria-hidden="true" data-v-2e27db42></span> Shipments <span class="dash-band__unit" data-v-2e27db42>DDP</span><span class="dash-band__rule" aria-hidden="true" data-v-2e27db42></span></h2><div class="dash-kpis" data-v-2e27db42><article class="dash-kpi" data-v-2e27db42><p class="dash-kpi__label" data-v-2e27db42>Monthly shipment</p><p class="dash-kpi__value" data-v-2e27db42>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.home.aylikYukleme))}</p><p class="dash-kpi__meta" data-v-2e27db42>${ssrInterpolate($options.monthNameEn)}</p></article><article class="dash-kpi" data-v-2e27db42><p class="dash-kpi__label" data-v-2e27db42>Annual shipment</p><p class="dash-kpi__value" data-v-2e27db42>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.home.yillikYukleme))}</p><p class="dash-kpi__meta" data-v-2e27db42>${ssrInterpolate($options.currentYear)} · ${ssrInterpolate($options.currentMonth)}/12 months</p></article><article class="dash-kpi" data-v-2e27db42><p class="dash-kpi__label" data-v-2e27db42>Shipment average monthly</p><p class="dash-kpi__value" data-v-2e27db42>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.home.ortalamaYukleme))}</p><p class="dash-kpi__meta" data-v-2e27db42>year to date</p></article><article class="dash-kpi dash-kpi--forecast" data-v-2e27db42><p class="dash-kpi__label" data-v-2e27db42>Annual shipment forecast</p><p class="dash-kpi__value" data-v-2e27db42>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.home.tahminiYillikYukleme))}</p><p class="dash-kpi__meta" data-v-2e27db42>forecast · 12 months</p></article></div></section><section class="dash-grid dash-grid--2" data-v-2e27db42>`);
		_push(ssrRenderComponent(_component_Card, { class: "dash-card" }, {
			header: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<h2 class="dash-card__title" data-v-2e27db42${_scopeId}>Monthly shipped</h2>`);
				else return [createVNode("h2", { class: "dash-card__title" }, "Monthly shipped")];
			}),
			content: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(ssrRenderComponent(_component_Chart, {
					type: "bar",
					data: $options.chartShipped,
					options: $data.vizBarOptions,
					class: "dash-chart"
				}, null, _parent, _scopeId));
				else return [createVNode(_component_Chart, {
					type: "bar",
					data: $options.chartShipped,
					options: $data.vizBarOptions,
					class: "dash-chart"
				}, null, 8, ["data", "options"])];
			}),
			_: 1
		}, _parent));
		_push(ssrRenderComponent(_component_Card, { class: "dash-card" }, {
			header: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<h2 class="dash-card__title" data-v-2e27db42${_scopeId}>Shipped by marketing</h2>`);
				else return [createVNode("h2", { class: "dash-card__title" }, "Shipped by marketing")];
			}),
			content: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(ssrRenderComponent(_component_Chart, {
					type: "doughnut",
					data: $options.chartShippedByMarketing,
					options: $data.vizDoughnutOptions,
					class: "dash-chart"
				}, null, _parent, _scopeId));
				else return [createVNode(_component_Chart, {
					type: "doughnut",
					data: $options.chartShippedByMarketing,
					options: $data.vizDoughnutOptions,
					class: "dash-chart"
				}, null, 8, ["data", "options"])];
			}),
			_: 1
		}, _parent));
		_push(`</section><section class="dash-grid dash-grid--2" data-v-2e27db42>`);
		_push(ssrRenderComponent(_component_Card, { class: "dash-card" }, {
			header: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<h2 class="dash-card__title" data-v-2e27db42${_scopeId}>Monthly production</h2>`);
				else return [createVNode("h2", { class: "dash-card__title" }, "Monthly production")];
			}),
			content: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(ssrRenderComponent(_component_Chart, {
					type: "bar",
					data: $options.chartProduction,
					options: $data.vizStackedBarOptions,
					class: "dash-chart"
				}, null, _parent, _scopeId));
				else return [createVNode(_component_Chart, {
					type: "bar",
					data: $options.chartProduction,
					options: $data.vizStackedBarOptions,
					class: "dash-chart"
				}, null, 8, ["data", "options"])];
			}),
			_: 1
		}, _parent));
		_push(ssrRenderComponent(_component_Card, { class: "dash-card" }, {
			header: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<h2 class="dash-card__title" data-v-2e27db42${_scopeId}>Monthly offers</h2>`);
				else return [createVNode("h2", { class: "dash-card__title" }, "Monthly offers")];
			}),
			content: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(ssrRenderComponent(_component_Chart, {
					type: "bar",
					data: $options.chartOffersColored,
					options: $data.vizBarOptions,
					class: "dash-chart"
				}, null, _parent, _scopeId));
				else return [createVNode(_component_Chart, {
					type: "bar",
					data: $options.chartOffersColored,
					options: $data.vizBarOptions,
					class: "dash-chart"
				}, null, 8, ["data", "options"])];
			}),
			_: 1
		}, _parent));
		_push(`</section><section class="dash-grid dash-grid--3" data-v-2e27db42>`);
		_push(ssrRenderComponent(_component_Card, { class: "dash-card" }, {
			header: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<h2 class="dash-card__title" data-v-2e27db42${_scopeId}>${ssrInterpolate($options.currentYear)} supplier cost</h2>`);
				else return [createVNode("h2", { class: "dash-card__title" }, toDisplayString($options.currentYear) + " supplier cost", 1)];
			}),
			content: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(ssrRenderComponent(_component_DataTable, {
					value: $props.home.supplierCostList,
					scrollable: "",
					scrollHeight: "500px"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_Column, {
								field: "FirmaAdi",
								header: "Supplier"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "Total",
								header: "Total",
								class: "dash-num"
							}, {
								body: withCtx((slotProps, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Total))}`);
									else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Total)), 1)];
								}),
								footer: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.totalSupplierCost))}`);
									else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.totalSupplierCost)), 1)];
								}),
								_: 1
							}, _parent, _scopeId));
						} else return [createVNode(_component_Column, {
							field: "FirmaAdi",
							header: "Supplier"
						}), createVNode(_component_Column, {
							field: "Total",
							header: "Total",
							class: "dash-num"
						}, {
							body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Total)), 1)]),
							footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.totalSupplierCost)), 1)]),
							_: 1
						})];
					}),
					_: 1
				}, _parent, _scopeId));
				else return [createVNode(_component_DataTable, {
					value: $props.home.supplierCostList,
					scrollable: "",
					scrollHeight: "500px"
				}, {
					default: withCtx(() => [createVNode(_component_Column, {
						field: "FirmaAdi",
						header: "Supplier"
					}), createVNode(_component_Column, {
						field: "Total",
						header: "Total",
						class: "dash-num"
					}, {
						body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Total)), 1)]),
						footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($props.totalSupplierCost)), 1)]),
						_: 1
					})]),
					_: 1
				}, 8, ["value"])];
			}),
			_: 1
		}, _parent));
		_push(ssrRenderComponent(_component_Card, { class: "dash-card" }, {
			header: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<h2 class="dash-card__title" data-v-2e27db42${_scopeId}>Monthly production</h2>`);
				else return [createVNode("h2", { class: "dash-card__title" }, "Monthly production")];
			}),
			content: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(ssrRenderComponent(_component_DataTable, { value: $props.stocks.monthly_stock }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_Column, {
								field: "MONTH",
								header: "Month"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "SqmMiktar",
								header: "M2",
								class: "dash-num"
							}, {
								body: withCtx((slotProps, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.SqmMiktar))}`);
									else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.SqmMiktar)), 1)];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "KasaAdedi",
								header: "Crates",
								class: "dash-num"
							}, null, _parent, _scopeId));
						} else return [
							createVNode(_component_Column, {
								field: "MONTH",
								header: "Month"
							}),
							createVNode(_component_Column, {
								field: "SqmMiktar",
								header: "M2",
								class: "dash-num"
							}, {
								body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.SqmMiktar)), 1)]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "KasaAdedi",
								header: "Crates",
								class: "dash-num"
							})
						];
					}),
					_: 1
				}, _parent, _scopeId));
				else return [createVNode(_component_DataTable, { value: $props.stocks.monthly_stock }, {
					default: withCtx(() => [
						createVNode(_component_Column, {
							field: "MONTH",
							header: "Month"
						}),
						createVNode(_component_Column, {
							field: "SqmMiktar",
							header: "M2",
							class: "dash-num"
						}, {
							body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.SqmMiktar)), 1)]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "KasaAdedi",
							header: "Crates",
							class: "dash-num"
						})
					]),
					_: 1
				}, 8, ["value"])];
			}),
			_: 1
		}, _parent));
		_push(ssrRenderComponent(_component_Card, { class: "dash-card" }, {
			header: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<h2 class="dash-card__title" data-v-2e27db42${_scopeId}>Mekmer current stock</h2>`);
				else return [createVNode("h2", { class: "dash-card__title" }, "Mekmer current stock")];
			}),
			content: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(ssrRenderComponent(_component_DataTable, { value: $props.stocks.current_stock }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_Column, {
								field: "Month",
								header: "Month"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "KasaM2",
								header: "M2",
								class: "dash-num"
							}, {
								body: withCtx((slotProps, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.KasaM2))}`);
									else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.KasaM2)), 1)];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "KasaAdet",
								header: "Crates",
								class: "dash-num"
							}, null, _parent, _scopeId));
						} else return [
							createVNode(_component_Column, {
								field: "Month",
								header: "Month"
							}),
							createVNode(_component_Column, {
								field: "KasaM2",
								header: "M2",
								class: "dash-num"
							}, {
								body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.KasaM2)), 1)]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "KasaAdet",
								header: "Crates",
								class: "dash-num"
							})
						];
					}),
					_: 1
				}, _parent, _scopeId));
				else return [createVNode(_component_DataTable, { value: $props.stocks.current_stock }, {
					default: withCtx(() => [
						createVNode(_component_Column, {
							field: "Month",
							header: "Month"
						}),
						createVNode(_component_Column, {
							field: "KasaM2",
							header: "M2",
							class: "dash-num"
						}, {
							body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.KasaM2)), 1)]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "KasaAdet",
							header: "Crates",
							class: "dash-num"
						})
					]),
					_: 1
				}, 8, ["value"])];
			}),
			_: 1
		}, _parent));
		_push(`</section></div>`);
	} else if ($options.userId == 48) {
		_push(`<div${ssrRenderAttrs(mergeProps({ class: "container-fluid dash" }, _attrs))} data-v-2e27db42><header class="dash-head" data-v-2e27db42><div class="dash-head__id" data-v-2e27db42><span class="dash-head__mark" aria-hidden="true" data-v-2e27db42></span><div data-v-2e27db42><p class="dash-head__eyebrow" data-v-2e27db42>Dashboard</p><h1 class="dash-head__title" data-v-2e27db42>Overview</h1></div></div><p class="dash-head__period" data-v-2e27db42><i class="pi pi-calendar" aria-hidden="true" data-v-2e27db42></i><span data-v-2e27db42>${ssrInterpolate($options.monthNameEn)} ${ssrInterpolate($options.currentYear)}</span></p></header><section class="dash-grid dash-grid--2" data-v-2e27db42>`);
		_push(ssrRenderComponent(_component_Card, { class: "dash-card dash-card--wide" }, {
			header: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<h2 class="dash-card__title" data-v-2e27db42${_scopeId}>Monthly production</h2>`);
				else return [createVNode("h2", { class: "dash-card__title" }, "Monthly production")];
			}),
			content: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(ssrRenderComponent(_component_Chart, {
					type: "bar",
					data: $options.chartProduction,
					options: $data.vizStackedBarOptions,
					class: "dash-chart"
				}, null, _parent, _scopeId));
				else return [createVNode(_component_Chart, {
					type: "bar",
					data: $options.chartProduction,
					options: $data.vizStackedBarOptions,
					class: "dash-chart"
				}, null, 8, ["data", "options"])];
			}),
			_: 1
		}, _parent));
		_push(ssrRenderComponent(_component_Card, { class: "dash-card" }, {
			header: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<h2 class="dash-card__title" data-v-2e27db42${_scopeId}>Monthly production</h2>`);
				else return [createVNode("h2", { class: "dash-card__title" }, "Monthly production")];
			}),
			content: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(ssrRenderComponent(_component_DataTable, { value: $props.stocks.monthly_stock }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_Column, {
								field: "MONTH",
								header: "Month"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "SqmMiktar",
								header: "M2",
								class: "dash-num"
							}, {
								body: withCtx((slotProps, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.SqmMiktar))}`);
									else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.SqmMiktar)), 1)];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "KasaAdedi",
								header: "Crates",
								class: "dash-num"
							}, null, _parent, _scopeId));
						} else return [
							createVNode(_component_Column, {
								field: "MONTH",
								header: "Month"
							}),
							createVNode(_component_Column, {
								field: "SqmMiktar",
								header: "M2",
								class: "dash-num"
							}, {
								body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.SqmMiktar)), 1)]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "KasaAdedi",
								header: "Crates",
								class: "dash-num"
							})
						];
					}),
					_: 1
				}, _parent, _scopeId));
				else return [createVNode(_component_DataTable, { value: $props.stocks.monthly_stock }, {
					default: withCtx(() => [
						createVNode(_component_Column, {
							field: "MONTH",
							header: "Month"
						}),
						createVNode(_component_Column, {
							field: "SqmMiktar",
							header: "M2",
							class: "dash-num"
						}, {
							body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.SqmMiktar)), 1)]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "KasaAdedi",
							header: "Crates",
							class: "dash-num"
						})
					]),
					_: 1
				}, 8, ["value"])];
			}),
			_: 1
		}, _parent));
		_push(ssrRenderComponent(_component_Card, { class: "dash-card" }, {
			header: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<h2 class="dash-card__title" data-v-2e27db42${_scopeId}>Mekmer monthly shipment</h2>`);
				else return [createVNode("h2", { class: "dash-card__title" }, "Mekmer monthly shipment")];
			}),
			content: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(ssrRenderComponent(_component_DataTable, { value: $props.stocks.mekmer_shipped }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_Column, {
								field: "Month",
								header: "Month"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "Satis",
								header: "Sales",
								class: "dash-num"
							}, {
								body: withCtx((slotProps, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Satis))}`);
									else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Satis)), 1)];
								}),
								_: 1
							}, _parent, _scopeId));
						} else return [createVNode(_component_Column, {
							field: "Month",
							header: "Month"
						}), createVNode(_component_Column, {
							field: "Satis",
							header: "Sales",
							class: "dash-num"
						}, {
							body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Satis)), 1)]),
							_: 1
						})];
					}),
					_: 1
				}, _parent, _scopeId));
				else return [createVNode(_component_DataTable, { value: $props.stocks.mekmer_shipped }, {
					default: withCtx(() => [createVNode(_component_Column, {
						field: "Month",
						header: "Month"
					}), createVNode(_component_Column, {
						field: "Satis",
						header: "Sales",
						class: "dash-num"
					}, {
						body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Satis)), 1)]),
						_: 1
					})]),
					_: 1
				}, 8, ["value"])];
			}),
			_: 1
		}, _parent));
		_push(ssrRenderComponent(_component_Card, { class: "dash-card" }, {
			header: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<h2 class="dash-card__title" data-v-2e27db42${_scopeId}>Mekmer current stock</h2>`);
				else return [createVNode("h2", { class: "dash-card__title" }, "Mekmer current stock")];
			}),
			content: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(ssrRenderComponent(_component_DataTable, { value: $props.stocks.current_stock }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_Column, {
								field: "Month",
								header: "Month"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "KasaM2",
								header: "M2",
								class: "dash-num"
							}, {
								body: withCtx((slotProps, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.KasaM2))}`);
									else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.KasaM2)), 1)];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "KasaAdet",
								header: "Crates",
								class: "dash-num"
							}, null, _parent, _scopeId));
						} else return [
							createVNode(_component_Column, {
								field: "Month",
								header: "Month"
							}),
							createVNode(_component_Column, {
								field: "KasaM2",
								header: "M2",
								class: "dash-num"
							}, {
								body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.KasaM2)), 1)]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "KasaAdet",
								header: "Crates",
								class: "dash-num"
							})
						];
					}),
					_: 1
				}, _parent, _scopeId));
				else return [createVNode(_component_DataTable, { value: $props.stocks.current_stock }, {
					default: withCtx(() => [
						createVNode(_component_Column, {
							field: "Month",
							header: "Month"
						}),
						createVNode(_component_Column, {
							field: "KasaM2",
							header: "M2",
							class: "dash-num"
						}, {
							body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.KasaM2)), 1)]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "KasaAdet",
							header: "Crates",
							class: "dash-num"
						})
					]),
					_: 1
				}, 8, ["value"])];
			}),
			_: 1
		}, _parent));
		_push(`</section></div>`);
	} else _push(`<!---->`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/Dashboard.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var Dashboard_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-2e27db42"]]), { __name: "HomeDashboard" });
//#endregion
//#region app/stores/home.ts
function emptyChart() {
	return {
		labels: [],
		datasets: []
	};
}
function emptyHome() {
	return {
		supplierCostList: [],
		aylikSiparis: 0,
		yillikSiparis: 0,
		ortalamaSiparis: 0,
		tahminiYillikSiparis: 0,
		aylikYukleme: 0,
		yillikYukleme: 0,
		ortalamaYukleme: 0,
		tahminiYillikYukleme: 0,
		chartOne: emptyChart(),
		chartCustomerShipped: emptyChart(),
		chartProducts: emptyChart(),
		chartOffers: emptyChart()
	};
}
function emptyStocks() {
	return {
		monthly_stock: [],
		current_stock: [],
		mekmer_shipped: []
	};
}
var useHomeStore = defineStore("home", {
	state: () => ({
		homeList: emptyHome(),
		mekmerStocks: emptyStocks()
	}),
	getters: {
		getHomeList: (state) => state.homeList,
		getMekmerStocks: (state) => state.mekmerStocks,
		getTotalSupplierCost: (state) => state.homeList.supplierCostList.reduce((acc, x) => acc + (x.Total || 0), 0)
	},
	actions: {
		async getHome() {
			const response = await useLegacyApi().get("/home");
			this.homeList = response.data;
		},
		async getMekmerStocksList() {
			const response = await useLegacyApi().get("/reports/mekmer/stocks/list");
			this.mekmerStocks = response.data;
		}
	}
});
//#endregion
//#region app/pages/index.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ computed: { homeStore() {
	return useHomeStore();
} } }, {
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const homeStore = useHomeStore();
		[__temp, __restore] = withAsyncContext(async () => useAsyncData("home", async () => {
			await Promise.all([homeStore.getHome(), homeStore.getMekmerStocksList()]);
			return true;
		}, { server: false })), await __temp, __restore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_HomeDashboard = Dashboard_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_HomeDashboard, {
				home: unref(homeStore).getHomeList,
				stocks: unref(homeStore).getMekmerStocks,
				"total-supplier-cost": unref(homeStore).getTotalSupplierCost
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=pages-CBHm0dny.mjs.map
