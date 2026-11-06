import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { n as script$1 } from './inputtext-s6cxdqDx.mjs';
import { n as script } from './floatlabel-BDqo8RCT.mjs';
import { mergeProps, withCtx, createVNode, toDisplayString, useId, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';

//#region app/components/CustomInput.vue
var _sfc_main = {
	props: {
		value: {
			type: Number,
			required: false
		},
		text: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		}
	},
	emits: ["onInput", "change"],
	setup() {
		return { inputId: useId() };
	},
	data() {
		return { isInputActive: false };
	},
	computed: { newValueData: {
		get() {
			const num = Number(this.value) || 0;
			return this.isInputActive ? String(num) : num.toFixed(2);
		},
		set(modifiedValue) {
			let newValue = parseFloat(String(modifiedValue).replace(",", "."));
			if (isNaN(newValue)) newValue = 0;
			this.$emit("onInput", newValue);
		}
	} },
	methods: { change(event) {
		this.$emit("change", event);
	} }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_FloatLabel = script;
	const _component_InputText = script$1;
	_push(ssrRenderComponent(_component_FloatLabel, mergeProps({ class: "w-100" }, _attrs), {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: $setup.inputId,
					modelValue: $options.newValueData,
					"onUpdate:modelValue": ($event) => $options.newValueData = $event,
					disabled: $props.disabled,
					class: "w-100",
					onInput: ($event) => $options.change($event),
					onBlur: ($event) => $data.isInputActive = false,
					onFocus: ($event) => $data.isInputActive = true
				}, null, _parent, _scopeId));
				_push(`<label${ssrRenderAttr("for", $setup.inputId)}${_scopeId}>${ssrInterpolate($props.text)}</label>`);
			} else return [createVNode(_component_InputText, {
				id: $setup.inputId,
				modelValue: $options.newValueData,
				"onUpdate:modelValue": ($event) => $options.newValueData = $event,
				disabled: $props.disabled,
				class: "w-100",
				onInput: ($event) => $options.change($event),
				onBlur: ($event) => $data.isInputActive = false,
				onFocus: ($event) => $data.isInputActive = true
			}, null, 8, [
				"id",
				"modelValue",
				"onUpdate:modelValue",
				"disabled",
				"onInput",
				"onBlur",
				"onFocus"
			]), createVNode("label", { for: $setup.inputId }, toDisplayString($props.text), 9, ["for"])];
		}),
		_: 1
	}, _parent));
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CustomInput.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var CustomInput_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "CustomInput" });

export { CustomInput_default as C };
//# sourceMappingURL=CustomInput-B9GfGXia.mjs.map
