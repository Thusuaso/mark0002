import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { u as useApi } from './useApi-CGFzrxZs.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';

//#region app/components/upload/MissingPanel.vue
var _sfc_main = {
	props: { po: {
		type: String,
		required: false,
		default: null
	} },
	data() {
		return {
			list: [],
			checked: false
		};
	},
	watch: { po: {
		immediate: true,
		handler() {
			this.refresh();
		}
	} },
	methods: { async refresh() {
		this.checked = false;
		this.list = [];
		if (!this.po) return;
		try {
			const res = await useApi()(`/upload/document/missing/${this.po}`);
			if (res?.kapsamDisi) {
				this.list = [];
				this.checked = false;
				return;
			}
			this.list = res?.list ?? [];
			this.checked = true;
		} catch (err) {
			console.error("eksik evrak uyarisi alinamadi:", err);
			this.list = [];
			this.checked = false;
		}
	} }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	if ($props.po) {
		_push(`<div${ssrRenderAttrs(_attrs)} data-v-431deaef>`);
		if ($data.checked && $data.list.length > 0) {
			_push(`<div class="missing-box mb-3" data-v-431deaef><div class="missing-head" data-v-431deaef><i class="pi pi-exclamation-triangle" data-v-431deaef></i><span data-v-431deaef>Eksik Zorunlu Evrak</span><span class="missing-count" data-v-431deaef>${ssrInterpolate($data.list.length)}</span></div><div class="missing-chips" data-v-431deaef><!--[-->`);
			ssrRenderList($data.list, (document) => {
				_push(`<span class="missing-chip" data-v-431deaef>${ssrInterpolate(document.EvrakAdi)}</span>`);
			});
			_push(`<!--]--></div></div>`);
		} else if ($data.checked) _push(`<div class="missing-ok mb-3" data-v-431deaef><i class="pi pi-check-circle" data-v-431deaef></i><span data-v-431deaef>Zorunlu evrakların tamamı yüklenmiş</span></div>`);
		else _push(`<!---->`);
		_push(`</div>`);
	} else _push(`<!---->`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/upload/MissingPanel.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var MissingPanel_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-431deaef"]]), { __name: "UploadMissingPanel" });

export { MissingPanel_default as M };
//# sourceMappingURL=MissingPanel-BhvEJsLp.mjs.map
