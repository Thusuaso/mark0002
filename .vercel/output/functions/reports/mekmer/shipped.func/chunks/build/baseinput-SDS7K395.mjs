import { s as script$1 } from './baseeditableholder-y-Ph8z9F.mjs';

//#region node_modules/@primevue/core/baseinput/index.mjs
var script = {
	name: "BaseInput",
	"extends": script$1,
	props: {
		size: {
			type: String,
			"default": null
		},
		fluid: {
			type: Boolean,
			"default": null
		},
		variant: {
			type: String,
			"default": null
		}
	},
	inject: {
		$parentInstance: { "default": void 0 },
		$pcFluid: { "default": void 0 }
	},
	computed: {
		$variant: function $variant() {
			var _this$variant;
			return (_this$variant = this.variant) !== null && _this$variant !== void 0 ? _this$variant : this.$primevue.config.inputStyle || this.$primevue.config.inputVariant;
		},
		$fluid: function $fluid() {
			var _this$fluid;
			return (_this$fluid = this.fluid) !== null && _this$fluid !== void 0 ? _this$fluid : !!this.$pcFluid;
		},
		hasFluid: function hasFluid() {
			return this.$fluid;
		}
	}
};

export { script as s };
//# sourceMappingURL=baseinput-SDS7K395.mjs.map
