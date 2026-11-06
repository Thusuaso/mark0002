import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { n as script$1 } from './button-C8Z7Yc79.mjs';
import { n as script } from './datepicker-BGpmmzow.mjs';
import { u as useTcmb } from './useTcmb-B8gDruVs.mjs';
import { mergeProps, useId, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

//#region app/components/tcmb/Currency.vue
var _sfc_main = {
	emits: ["dateSelectedEmit", "rateFetchedEmit"],
	setup() {
		return { dateInputId: useId() };
	},
	data() {
		return {
			selectedDate: /* @__PURE__ */ new Date(),
			result: null,
			loading: false,
			error: null
		};
	},
	methods: { async fetchCurrency() {
		this.loading = true;
		this.error = null;
		this.result = null;
		try {
			const data = await useTcmb().getUSDRate(this.selectedDate);
			this.result = data;
			this.$emit("dateSelectedEmit", this.selectedDate);
			this.$emit("rateFetchedEmit", data);
		} catch (err) {
			console.error("[TcmbCurrency] kur cekilemedi:", err);
			this.error = `Kur bilgisi çekilemedi: ${err?.message || "bilinmeyen hata"}`;
		} finally {
			this.loading = false;
		}
	} }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_DatePicker = script;
	const _component_Button = script$1;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "tcmb-currency" }, _attrs))} data-v-3a417402><h3 data-v-3a417402>TCMB Dolar Kuru Sorgulama</h3><div class="form-group" data-v-3a417402><label${ssrRenderAttr("for", $setup.dateInputId)} data-v-3a417402>Tarih Seçiniz:</label>`);
	_push(ssrRenderComponent(_component_DatePicker, {
		inputId: $setup.dateInputId,
		modelValue: $data.selectedDate,
		"onUpdate:modelValue": ($event) => $data.selectedDate = $event,
		dateFormat: "dd.mm.yy",
		showIcon: true
	}, null, _parent));
	_push(`</div><div class="actions" data-v-3a417402>`);
	_push(ssrRenderComponent(_component_Button, {
		label: "Kuru Getir",
		icon: "pi pi-search",
		onClick: $options.fetchCurrency,
		loading: $data.loading
	}, null, _parent));
	_push(`</div>`);
	if ($data.result) {
		_push(`<div class="result-box" data-v-3a417402><p data-v-3a417402><strong data-v-3a417402>Bulunan Tarih:</strong> ${ssrInterpolate($data.result.date)}</p><p data-v-3a417402><strong data-v-3a417402>USD Satış Kuru:</strong> ${ssrInterpolate($data.result.rate)} TL</p>`);
		if ($data.result.isFallback) _push(`<p class="warning" data-v-3a417402><small data-v-3a417402> * Seçtiğiniz tarihte (${ssrInterpolate($data.result.requestedDate)}) veri olmadığı için geçmişteki en yakın tarih getirildi. </small></p>`);
		else _push(`<!---->`);
		_push(`</div>`);
	} else _push(`<!---->`);
	if ($data.error) _push(`<div class="error-box" data-v-3a417402>${ssrInterpolate($data.error)}</div>`);
	else _push(`<!---->`);
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tcmb/Currency.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Currency_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-3a417402"]]), { __name: "TcmbCurrency" });

export { Currency_default as C };
//# sourceMappingURL=Currency-KtOU2lzT.mjs.map
