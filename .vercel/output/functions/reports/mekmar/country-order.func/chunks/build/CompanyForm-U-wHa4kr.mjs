import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { n as script$2 } from './button-C8Z7Yc79.mjs';
import { n as script$4 } from './column-CT6GXkG2.mjs';
import { n as script$3 } from './datatable-D6ou7HZJ.mjs';
import { n as script$1 } from './inputtext-s6cxdqDx.mjs';
import { n as script } from './floatlabel-BDqo8RCT.mjs';
import { u as useTransportStore } from './transport-BGjKDFw3.mjs';
import { withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

//#region app/components/transport/CompanyForm.vue
var _sfc_main = {
	props: { company: {
		type: Array,
		required: true
	} },
	computed: { transportStore() {
		return useTransportStore();
	} },
	data() {
		return { companyData: {
			companyname: null,
			mail: null,
			phone: null,
			description: null
		} };
	},
	methods: { save() {
		this.transportStore.setCompanySave(this.companyData);
	} }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_FloatLabel = script;
	const _component_InputText = script$1;
	const _component_Button = script$2;
	const _component_DataTable = script$3;
	const _component_Column = script$4;
	_push(`<div${ssrRenderAttrs(_attrs)}><div class="row mt-4"><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "company",
					modelValue: $data.companyData.companyname,
					"onUpdate:modelValue": ($event) => $data.companyData.companyname = $event
				}, null, _parent, _scopeId));
				_push(`<label for="company"${_scopeId}>Company</label>`);
			} else return [createVNode(_component_InputText, {
				id: "company",
				modelValue: $data.companyData.companyname,
				"onUpdate:modelValue": ($event) => $data.companyData.companyname = $event
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "company" }, "Company")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "mail",
					modelValue: $data.companyData.mail,
					"onUpdate:modelValue": ($event) => $data.companyData.mail = $event
				}, null, _parent, _scopeId));
				_push(`<label for="mail"${_scopeId}>Mail</label>`);
			} else return [createVNode(_component_InputText, {
				id: "mail",
				modelValue: $data.companyData.mail,
				"onUpdate:modelValue": ($event) => $data.companyData.mail = $event
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "mail" }, "Mail")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "phone",
					modelValue: $data.companyData.phone,
					"onUpdate:modelValue": ($event) => $data.companyData.phone = $event
				}, null, _parent, _scopeId));
				_push(`<label for="phone"${_scopeId}>Phone</label>`);
			} else return [createVNode(_component_InputText, {
				id: "phone",
				modelValue: $data.companyData.phone,
				"onUpdate:modelValue": ($event) => $data.companyData.phone = $event
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "phone" }, "Phone")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_InputText, {
					id: "description",
					modelValue: $data.companyData.description,
					"onUpdate:modelValue": ($event) => $data.companyData.description = $event
				}, null, _parent, _scopeId));
				_push(`<label for="description"${_scopeId}>Description</label>`);
			} else return [createVNode(_component_InputText, {
				id: "description",
				modelValue: $data.companyData.description,
				"onUpdate:modelValue": ($event) => $data.companyData.description = $event
			}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "description" }, "Description")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "success",
		class: "w-100",
		label: "Save",
		onClick: $options.save
	}, null, _parent));
	_push(ssrRenderComponent(_component_DataTable, {
		value: $props.company,
		paginator: "",
		rows: 15
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "ID",
					header: "Id",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "FirmaAdi",
					header: "Company",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Telefon",
					header: "Phone",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "MailAdresi",
					header: "Mail",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Notlar",
					header: "Description",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, null, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "ID",
					header: "Id",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "FirmaAdi",
					header: "Company",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "Telefon",
					header: "Phone",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "MailAdresi",
					header: "Mail",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}),
				createVNode(_component_Column, {
					field: "Notlar",
					header: "Description",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/transport/CompanyForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var CompanyForm_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "TransportCompanyForm" });

export { CompanyForm_default as C };
//# sourceMappingURL=CompanyForm-U-wHa4kr.mjs.map
