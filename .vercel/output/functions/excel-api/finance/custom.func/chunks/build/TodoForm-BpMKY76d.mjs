import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { n as script$5 } from './button-C8Z7Yc79.mjs';
import { t as script$3 } from './select-T8LIeBQG.mjs';
import { n as script$4 } from './checkbox-wtvrQjx7.mjs';
import { n as script$2 } from './autocomplete-5Wwvp4c8.mjs';
import { t as script } from './textarea-DHWHHqLi.mjs';
import { n as script$1 } from './floatlabel-BDqo8RCT.mjs';
import { u as useTodoStore } from './todo-CBOtxBPz.mjs';
import { mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

//#region app/components/sales/TodoForm.vue
var _sfc_main = {
	props: {
		todoDetail: {
			type: Object,
			required: false,
			default: null
		},
		users: {
			type: Array,
			required: true
		}
	},
	computed: {
		todoStore() {
			return useTodoStore();
		},
		todo() {
			return this.todoDetail;
		}
	},
	data() {
		return {
			filteredUsers: null,
			selectedUsers: [],
			selectedPriority: null,
			priorities: [
				{ oncelik: "A" },
				{ oncelik: "B" },
				{ oncelik: "C" }
			]
		};
	},
	created() {
		if (!this.todoStore.getTodoButtonStatus) this.createdProcess();
	},
	methods: {
		searchUsers(event) {
			if (event.query.length === 0) {
				this.filteredUsers = this.users;
				return;
			}
			this.filteredUsers = this.users.filter((x) => x.KullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase()));
		},
		createdProcess() {
			this.todo.OrtakGorev.split(",").forEach((x) => {
				const user = this.users.find((y) => y.KullaniciAdi == x);
				this.selectedUsers.push(user);
			});
			this.selectedPriority = this.priorities.find((x) => x.oncelik == this.todo.YapilacakOncelik);
		},
		save() {
			console.warn("SalesTodoForm.save(): bu formda yeni gorev olusturma yolu Nuxt 2'de de uygulanmamisti -- istek gonderilmedi.");
		},
		__stringCharacterChange(event) {
			const data = event.split("'");
			let value = "";
			data.forEach((x) => {
				value += x + "''";
			});
			return value.substring(0, value.length - 2);
		},
		update() {
			this.todo.OrtakGorev = this.selectedUsers.map((x) => x.KullaniciAdi).join(",");
			this.todo.YapilacakOncelik = this.selectedPriority.oncelik;
			this.todo.CustomYapilacak = this.__stringCharacterChange(this.todo.Yapilacak);
			this.todoStore.setTodoUpdate(this.todo);
		},
		saveProcess() {
			if (this.todoStore.getTodoButtonStatus) this.save();
			else this.update();
		},
		deleteForm() {
			this.todoStore.setTodoDelete(this.todo.ID);
			this.$emit("todo_form_dialog", false);
		}
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_Textarea = script;
	const _component_FloatLabel = script$1;
	const _component_AutoComplete = script$2;
	const _component_Select = script$3;
	const _component_Checkbox = script$4;
	const _component_Button = script$5;
	_push(`<div${ssrRenderAttrs(mergeProps({
		class: "container",
		style: { "height": "400px" }
	}, _attrs))}><div class="row"><div class="col">`);
	_push(ssrRenderComponent(_component_Textarea, {
		modelValue: $options.todo.Yapilacak,
		"onUpdate:modelValue": ($event) => $options.todo.Yapilacak = $event,
		class: "w-100",
		rows: "5",
		placeholder: "Assignment"
	}, null, _parent));
	_push(`</div></div><div class="row"><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_AutoComplete, {
					modelValue: $data.selectedUsers,
					"onUpdate:modelValue": ($event) => $data.selectedUsers = $event,
					inputId: "users",
					suggestions: $data.filteredUsers,
					onComplete: ($event) => $options.searchUsers($event),
					optionLabel: "KullaniciAdi",
					multiple: true
				}, null, _parent, _scopeId));
				_push(`<label for="users"${_scopeId}>Assignee</label>`);
			} else return [createVNode(_component_AutoComplete, {
				modelValue: $data.selectedUsers,
				"onUpdate:modelValue": ($event) => $data.selectedUsers = $event,
				inputId: "users",
				suggestions: $data.filteredUsers,
				onComplete: ($event) => $options.searchUsers($event),
				optionLabel: "KullaniciAdi",
				multiple: true
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"suggestions",
				"onComplete"
			]), createVNode("label", { for: "users" }, "Assignee")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_Select, {
		modelValue: $data.selectedPriority,
		"onUpdate:modelValue": ($event) => $data.selectedPriority = $event,
		options: $data.priorities,
		optionLabel: "oncelik",
		placeholder: "Priority"
	}, null, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_Checkbox, {
		modelValue: $options.todo.Acil,
		"onUpdate:modelValue": ($event) => $options.todo.Acil = $event,
		binary: true
	}, null, _parent));
	_push(` Urgent </div></div><div class="row"><div class="col">`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "success",
		class: "w-100",
		label: "Save",
		onClick: $options.saveProcess
	}, null, _parent));
	_push(`</div>`);
	if (!$options.todoStore.getTodoButtonStatus) {
		_push(`<div class="col">`);
		_push(ssrRenderComponent(_component_Button, {
			type: "button",
			severity: "danger",
			class: "w-100",
			label: "Delete",
			onClick: $options.deleteForm
		}, null, _parent));
		_push(`</div>`);
	} else _push(`<!---->`);
	_push(`</div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sales/TodoForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var TodoForm_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "SalesTodoForm" });

export { TodoForm_default as T };
//# sourceMappingURL=TodoForm-BpMKY76d.mjs.map
