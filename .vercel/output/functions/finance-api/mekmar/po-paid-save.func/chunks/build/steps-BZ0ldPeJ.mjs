import { B as BaseStyle } from '../virtual/entry.mjs';
import { s as script$1 } from './basecomponent-CEvq-Ypu.mjs';
import { mergeProps, openBlock, createElementBlock, createElementVNode, Fragment, renderList, toDisplayString, createBlock, resolveDynamicComponent, createCommentVNode } from 'vue';
import { find, findSingle } from '@primeuix/utils/dom';
import { style } from '@primeuix/styles/steps';
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
import '@primeuix/utils';
import '@primeuix/styles/base';

//#region node_modules/primevue/steps/style/index.mjs
var StepsStyle = BaseStyle.extend({
	name: "steps",
	style,
	classes: {
		root: function root(_ref) {
			return ["p-steps p-component", { "p-readonly": _ref.props.readonly }];
		},
		list: "p-steps-list",
		item: function item(_ref2) {
			var instance = _ref2.instance, _item = _ref2.item, index = _ref2.index;
			return ["p-steps-item", {
				"p-steps-item-active": instance.isActive(index),
				"p-disabled": instance.isItemDisabled(_item, index)
			}];
		},
		itemLink: "p-steps-item-link",
		itemNumber: "p-steps-item-number",
		itemLabel: "p-steps-item-label"
	}
});
//#endregion
//#region node_modules/primevue/steps/index.mjs
var script = {
	name: "Steps",
	"extends": {
		name: "BaseSteps",
		"extends": script$1,
		props: {
			id: { type: String },
			model: {
				type: Array,
				"default": null
			},
			readonly: {
				type: Boolean,
				"default": true
			},
			activeStep: {
				type: Number,
				"default": 0
			}
		},
		style: StepsStyle,
		provide: function provide() {
			return {
				$pcSteps: this,
				$parentInstance: this
			};
		}
	},
	inheritAttrs: false,
	emits: ["update:activeStep", "step-change"],
	data: function data() {
		return { d_activeStep: this.activeStep };
	},
	watch: { activeStep: function activeStep(newValue) {
		this.d_activeStep = newValue;
	} },
	mounted: function mounted() {
		var firstItem = this.findFirstItem();
		firstItem && (firstItem.tabIndex = "0");
	},
	methods: {
		getPTOptions: function getPTOptions(key, item, index) {
			return this.ptm(key, { context: {
				item,
				index,
				active: this.isActive(index),
				disabled: this.isItemDisabled(item, index)
			} });
		},
		onItemClick: function onItemClick(event, item, index) {
			if (this.disabled(item) || this.readonly) {
				event.preventDefault();
				return;
			}
			if (item.command) item.command({
				originalEvent: event,
				item
			});
			if (index !== this.d_activeStep) {
				this.d_activeStep = index;
				this.$emit("update:activeStep", this.d_activeStep);
			}
			this.$emit("step-change", {
				originalEvent: event,
				index
			});
		},
		onItemKeydown: function onItemKeydown(event, item) {
			switch (event.code) {
				case "ArrowRight":
					this.navigateToNextItem(event.target);
					event.preventDefault();
					break;
				case "ArrowLeft":
					this.navigateToPrevItem(event.target);
					event.preventDefault();
					break;
				case "Home":
					this.navigateToFirstItem(event.target);
					event.preventDefault();
					break;
				case "End":
					this.navigateToLastItem(event.target);
					event.preventDefault();
					break;
				case "Tab": break;
				case "Enter":
				case "NumpadEnter":
				case "Space":
					this.onItemClick(event, item);
					event.preventDefault();
			}
		},
		navigateToNextItem: function navigateToNextItem(target) {
			var nextItem = this.findNextItem(target);
			nextItem && this.setFocusToMenuitem(target, nextItem);
		},
		navigateToPrevItem: function navigateToPrevItem(target) {
			var prevItem = this.findPrevItem(target);
			prevItem && this.setFocusToMenuitem(target, prevItem);
		},
		navigateToFirstItem: function navigateToFirstItem(target) {
			var firstItem = this.findFirstItem(target);
			firstItem && this.setFocusToMenuitem(target, firstItem);
		},
		navigateToLastItem: function navigateToLastItem(target) {
			var lastItem = this.findLastItem(target);
			lastItem && this.setFocusToMenuitem(target, lastItem);
		},
		findNextItem: function findNextItem(item) {
			var nextItem = item.parentElement.nextElementSibling;
			return nextItem ? nextItem.children[0] : null;
		},
		findPrevItem: function findPrevItem(item) {
			var prevItem = item.parentElement.previousElementSibling;
			return prevItem ? prevItem.children[0] : null;
		},
		findFirstItem: function findFirstItem() {
			var firstSibling = findSingle(this.$refs.list, "[data-pc-section=\"item\"]");
			return firstSibling ? firstSibling.children[0] : null;
		},
		findLastItem: function findLastItem() {
			var siblings = find(this.$refs.list, "[data-pc-section=\"item\"]");
			return siblings ? siblings[siblings.length - 1].children[0] : null;
		},
		setFocusToMenuitem: function setFocusToMenuitem(target, focusableItem) {
			target.tabIndex = "-1";
			focusableItem.tabIndex = "0";
			focusableItem.focus();
		},
		isActive: function isActive(index) {
			return index === this.d_activeStep;
		},
		isItemDisabled: function isItemDisabled(item, index) {
			return this.disabled(item) || this.readonly && !this.isActive(index);
		},
		visible: function visible(item) {
			return typeof item.visible === "function" ? item.visible() : item.visible !== false;
		},
		disabled: function disabled(item) {
			return typeof item.disabled === "function" ? item.disabled() : item.disabled;
		},
		label: function label(item) {
			return typeof item.label === "function" ? item.label() : item.label;
		},
		getMenuItemProps: function getMenuItemProps(item, index) {
			var _this = this;
			return {
				action: mergeProps({
					"class": this.cx("itemLink"),
					onClick: function onClick($event) {
						return _this.onItemClick($event, item);
					},
					onKeyDown: function onKeyDown($event) {
						return _this.onItemKeydown($event, item);
					}
				}, this.getPTOptions("itemLink", item, index)),
				step: mergeProps({ "class": this.cx("itemNumber") }, this.getPTOptions("itemNumber", item, index)),
				label: mergeProps({ "class": this.cx("itemLabel") }, this.getPTOptions("itemLabel", item, index))
			};
		}
	}
};
var _hoisted_1 = ["id"];
var _hoisted_2 = [
	"aria-current",
	"onClick",
	"onKeydown",
	"data-p-active",
	"data-p-disabled"
];
function render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("nav", mergeProps({
		id: _ctx.id,
		"class": _ctx.cx("root")
	}, _ctx.ptmi("root")), [createElementVNode("ol", mergeProps({
		ref: "list",
		"class": _ctx.cx("list")
	}, _ctx.ptm("list")), [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.model, function(item, index) {
		return openBlock(), createElementBlock(Fragment, { key: $options.label(item) + "_" + index.toString() }, [$options.visible(item) ? (openBlock(), createElementBlock("li", mergeProps({
			key: 0,
			"class": [_ctx.cx("item", {
				item,
				index
			}), item["class"]],
			style: item.style,
			"aria-current": $options.isActive(index) ? "step" : void 0,
			onClick: function onClick($event) {
				return $options.onItemClick($event, item, index);
			},
			onKeydown: function onKeydown($event) {
				return $options.onItemKeydown($event, item, index);
			}
		}, { ref_for: true }, $options.getPTOptions("item", item, index), {
			"data-p-active": $options.isActive(index),
			"data-p-disabled": $options.isItemDisabled(item, index)
		}), [!_ctx.$slots.item ? (openBlock(), createElementBlock("span", mergeProps({
			key: 0,
			"class": _ctx.cx("itemLink")
		}, { ref_for: true }, $options.getPTOptions("itemLink", item, index)), [createElementVNode("span", mergeProps({ "class": _ctx.cx("itemNumber") }, { ref_for: true }, $options.getPTOptions("itemNumber", item, index)), toDisplayString(index + 1), 17), createElementVNode("span", mergeProps({ "class": _ctx.cx("itemLabel") }, { ref_for: true }, $options.getPTOptions("itemLabel", item, index)), toDisplayString($options.label(item)), 17)], 16)) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.item), {
			key: 1,
			item,
			index,
			active: index === $data.d_activeStep,
			label: $options.label(item),
			props: $options.getMenuItemProps(item, index)
		}, null, 8, [
			"item",
			"index",
			"active",
			"label",
			"props"
		]))], 16, _hoisted_2)) : createCommentVNode("", true)], 64);
	}), 128))], 16)], 16, _hoisted_1);
}
script.render = render;

export { script as default };
//# sourceMappingURL=steps-BZ0ldPeJ.mjs.map
