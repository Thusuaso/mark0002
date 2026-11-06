import { _ as __exportAll } from './rolldown-runtime-D7D4PA-g.mjs';
import { B as BaseStyle } from '../virtual/entry.mjs';
import { s as script$2 } from './baseinput-SDS7K395.mjs';
import { mergeProps, openBlock, createElementBlock } from 'vue';
import { cn } from '@primeuix/utils';
import { style } from '@primeuix/styles/textarea';
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
import 'vue/server-renderer';
import 'devalue';
import '@primeuix/utils/eventbus';
import 'vue-router';
import '@vue/shared';
import 'pinia';
import '@primeuix/styles/base';
import '@primeuix/utils/dom';
import './baseeditableholder-y-Ph8z9F.mjs';
import './basecomponent-CEvq-Ypu.mjs';

//#region node_modules/primevue/textarea/style/index.mjs
var TextareaStyle = BaseStyle.extend({
	name: "textarea",
	style,
	classes: { root: function root(_ref) {
		var instance = _ref.instance, props = _ref.props;
		return ["p-textarea p-component", {
			"p-filled": instance.$filled,
			"p-textarea-resizable ": props.autoResize,
			"p-textarea-sm p-inputfield-sm": props.size === "small",
			"p-textarea-lg p-inputfield-lg": props.size === "large",
			"p-invalid": instance.$invalid,
			"p-variant-filled": instance.$variant === "filled",
			"p-textarea-fluid": instance.$fluid
		}];
	} }
});
//#endregion
//#region node_modules/primevue/textarea/index.mjs
var textarea_exports = /* @__PURE__ */ __exportAll({ default: () => script });
var script$1 = {
	name: "BaseTextarea",
	"extends": script$2,
	props: { autoResize: Boolean },
	style: TextareaStyle,
	provide: function provide() {
		return {
			$pcTextarea: this,
			$parentInstance: this
		};
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
var script = {
	name: "Textarea",
	"extends": script$1,
	inheritAttrs: false,
	observer: null,
	mounted: function mounted() {
		var _this = this;
		if (this.autoResize) {
			this.observer = new ResizeObserver(function() {
				requestAnimationFrame(function() {
					_this.resize();
				});
			});
			this.observer.observe(this.$el);
		}
	},
	updated: function updated() {
		if (this.autoResize) this.resize();
	},
	beforeUnmount: function beforeUnmount() {
		if (this.observer) this.observer.disconnect();
	},
	methods: {
		resize: function resize() {
			if (!this.$el.offsetParent) return;
			var currentHeight = this.$el.style.height;
			var currentHeightValue = parseInt(currentHeight) || 0;
			var initialScrollHeight = this.$el.scrollHeight;
			var needsExpanding = !currentHeightValue || initialScrollHeight > currentHeightValue;
			if (currentHeightValue && initialScrollHeight < currentHeightValue) {
				this.$el.style.height = "auto";
				this.$el.style.height = "".concat(this.$el.scrollHeight, "px");
			} else if (needsExpanding) this.$el.style.height = "".concat(initialScrollHeight, "px");
		},
		onInput: function onInput(event) {
			if (this.autoResize) this.resize();
			this.writeValue(event.target.value, event);
		}
	},
	computed: {
		attrs: function attrs() {
			return mergeProps(this.ptmi("root", { context: {
				filled: this.$filled,
				disabled: this.disabled
			} }), this.formField);
		},
		dataP: function dataP() {
			return cn(_defineProperty({
				invalid: this.$invalid,
				fluid: this.$fluid,
				filled: this.$variant === "filled"
			}, this.size, this.size));
		}
	}
};
var _hoisted_1 = [
	"value",
	"name",
	"disabled",
	"aria-invalid",
	"data-p"
];
function render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("textarea", mergeProps({
		"class": _ctx.cx("root"),
		value: _ctx.d_value,
		name: _ctx.name,
		disabled: _ctx.disabled,
		"aria-invalid": _ctx.invalid || void 0,
		"data-p": $options.dataP,
		onInput: _cache[0] || (_cache[0] = function() {
			return $options.onInput && $options.onInput.apply($options, arguments);
		})
	}, $options.attrs), null, 16, _hoisted_1);
}
script.render = render;

export { textarea_exports as n, script as t };
//# sourceMappingURL=textarea-DHWHHqLi.mjs.map
