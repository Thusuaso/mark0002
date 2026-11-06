import { _ as _plugin_vue_export_helper_default, l as useAuthorityStore } from '../virtual/entry.mjs';
import { n as script$2 } from './button-C8Z7Yc79.mjs';
import { n as script$1 } from './inputtext-s6cxdqDx.mjs';
import { u as useLegacyApi } from './useLegacyApi-B5zRc7ig.mjs';
import { n as script } from './card-D9W2BIHg.mjs';
import { mergeProps, withCtx, openBlock, createBlock, withModifiers, createVNode, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
import 'pinia';
import '@primeuix/utils';
import '@primeuix/styles/base';
import '@primeuix/utils/dom';
import './rolldown-runtime-D7D4PA-g.mjs';
import './basecomponent-CEvq-Ypu.mjs';
import './spinner-Bg9uPPDs.mjs';
import './baseicon-COIgioD1.mjs';
import './badge-Djy3ODAc.mjs';
import './ripple-BAuDWuPF.mjs';
import './basedirective-00hguNen.mjs';
import '@primeuix/utils/uuid';
import './baseinput-SDS7K395.mjs';
import './baseeditableholder-y-Ph8z9F.mjs';
import './useApi-CGFzrxZs.mjs';

//#region app/components/ChangePasswordForm.vue
var _sfc_main$1 = {
	data() {
		return {
			step: 1,
			email: "",
			code: "",
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
			step_1_loading_button: false,
			step_2_loading_button: false
		};
	},
	computed: {
		authorityStore() {
			return useAuthorityStore();
		},
		passwordErrors() {
			const errors = [];
			if (!/.{6,}/.test(this.newPassword)) errors.push("En az 6 karakter olmalı.");
			if (!/[A-Z]/.test(this.newPassword)) errors.push("En az 1 büyük harf içermeli.");
			if (!/[a-z]/.test(this.newPassword)) errors.push("En az 1 küçük harf içermeli.");
			if (!/\d/.test(this.newPassword)) errors.push("En az 1 sayı içermeli.");
			if (!/[!@#$%^&*(),.?":{}|<>_+\-]/.test(this.newPassword)) errors.push("En az 1 özel sembol içermeli.");
			return errors;
		},
		isPasswordValid() {
			return this.newPassword.length > 0 && this.passwordErrors.length === 0;
		},
		doPasswordsMatch() {
			return this.newPassword === this.confirmPassword;
		},
		canSubmit() {
			return this.code.length === 6 && this.oldPassword.length > 0 && this.isPasswordValid && this.doPasswordsMatch;
		}
	},
	methods: {
		async goBack() {
			this.$router.push("/auth");
		},
		async sendMailCode() {
			this.step_1_loading_button = true;
			try {
				const response = await useLegacyApi().$post("/forgot-password-init", { email: this.email });
				if (response.status) {
					alert("Mailinize doğrulama kodu gönderildi.");
					this.step = 2;
					this.step_1_loading_button = false;
				} else {
					alert(response.message || "Bu mail adresine ait aktif bir hesap bulunamadı.");
					this.step_1_loading_button = false;
				}
			} catch (error) {
				alert("Sunucuyla iletişim kurulamadı.");
				this.step_1_loading_button = false;
			}
		},
		async changePassword() {
			this.step_2_loading_button = true;
			try {
				const response = await useLegacyApi().$post("/change-password", {
					email: this.email,
					code: this.code,
					oldPassword: this.oldPassword,
					newPassword: this.newPassword
				});
				if (response.status) {
					alert("Şifreniz başarıyla değiştirildi! Yeni şifrenizle giriş yapabilirsiniz.");
					this.step_2_loading_button = false;
					this.$router.push("/auth");
				} else {
					alert(response.message || "İşlem başarısız. Bilgilerinizi kontrol edin.");
					this.step_2_loading_button = false;
				}
			} catch (error) {
				alert("Sunucu hatası oluştu.");
				this.step_2_loading_button = false;
			}
		},
		async cancel() {
			await this.$cookie.remove("userId");
			await this.authorityStore.setAuthorityNavbarStatus(false);
			this.$router.push("/auth");
		}
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_Card = script;
	const _component_InputText = script$1;
	const _component_Button = script$2;
	_push(ssrRenderComponent(_component_Card, mergeProps({ style: {
		"width": "25rem",
		"margin": "0px auto"
	} }, _attrs), {
		title: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(`<div class="text-center"${_scopeId}>Şifre Değiştirme</div>`);
			else return [createVNode("div", { class: "text-center" }, "Şifre Değiştirme")];
		}),
		content: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				if ($data.step === 1) {
					_push(`<form${_scopeId}><div class="flex flex-column gap-3"${_scopeId}><p class="text-sm text-center"${_scopeId}> Şifrenizi değiştirmek için sistemde kayıtlı mail adresinizi girin. </p><div class="field"${_scopeId}><label for="email"${_scopeId}>Mail Adresi</label>`);
					_push(ssrRenderComponent(_component_InputText, {
						id: "email",
						modelValue: $data.email,
						"onUpdate:modelValue": ($event) => $data.email = $event,
						class: "w-full",
						type: "email",
						required: ""
					}, null, _parent, _scopeId));
					_push(`</div>`);
					_push(ssrRenderComponent(_component_Button, {
						type: "submit",
						label: "Kod Gönder",
						class: "mt-3",
						disabled: !$data.email || $data.step_1_loading_button,
						loading: $data.step_1_loading_button
					}, null, _parent, _scopeId));
					_push(ssrRenderComponent(_component_Button, {
						type: "button",
						label: "Geri",
						onClick: $options.goBack,
						class: "p-button-primary"
					}, null, _parent, _scopeId));
					_push(`</div></form>`);
				} else {
					_push(`<form${_scopeId}><div class="flex flex-column gap-3"${_scopeId}><p class="text-sm text-green-600 text-center font-bold"${_scopeId}> Mailinize gelen kodu ve şifre bilgilerinizi girin. </p><div class="field"${_scopeId}><label${_scopeId}>Mail Doğrulama Kodu</label>`);
					_push(ssrRenderComponent(_component_InputText, {
						modelValue: $data.code,
						"onUpdate:modelValue": ($event) => $data.code = $event,
						class: "w-full text-center",
						placeholder: "000000",
						maxlength: "6",
						required: ""
					}, null, _parent, _scopeId));
					_push(`</div><div class="field"${_scopeId}><label${_scopeId}>Eski Şifreniz</label>`);
					_push(ssrRenderComponent(_component_InputText, {
						modelValue: $data.oldPassword,
						"onUpdate:modelValue": ($event) => $data.oldPassword = $event,
						class: "w-full",
						type: "password",
						required: ""
					}, null, _parent, _scopeId));
					_push(`</div><div class="field"${_scopeId}><label${_scopeId}>Yeni Şifre</label>`);
					_push(ssrRenderComponent(_component_InputText, {
						modelValue: $data.newPassword,
						"onUpdate:modelValue": ($event) => $data.newPassword = $event,
						class: "w-full",
						type: "password",
						required: ""
					}, null, _parent, _scopeId));
					if ($data.newPassword.length > 0 && $options.passwordErrors.length > 0) {
						_push(`<div class="mt-2 p-2 bg-red-100 border-round text-xs text-red-600"${_scopeId}><!--[-->`);
						ssrRenderList($options.passwordErrors, (error, index) => {
							_push(`<div${_scopeId}> • ${ssrInterpolate(error)}</div>`);
						});
						_push(`<!--]--></div>`);
					} else _push(`<!---->`);
					_push(`</div><div class="field"${_scopeId}><label${_scopeId}>Yeni Şifre (Tekrar)</label>`);
					_push(ssrRenderComponent(_component_InputText, {
						modelValue: $data.confirmPassword,
						"onUpdate:modelValue": ($event) => $data.confirmPassword = $event,
						class: "w-full",
						type: "password",
						required: ""
					}, null, _parent, _scopeId));
					if ($data.confirmPassword && !$options.doPasswordsMatch) _push(`<small class="p-error block mt-1"${_scopeId}>Şifreler birbiriyle eşleşmiyor.</small>`);
					else _push(`<!---->`);
					_push(`</div>`);
					_push(ssrRenderComponent(_component_Button, {
						type: "submit",
						label: "Şifremi Değiştir",
						severity: "success",
						class: "mt-3",
						disabled: !$options.canSubmit || $data.step_2_loading_button,
						loading: $data.step_2_loading_button
					}, null, _parent, _scopeId));
					_push(ssrRenderComponent(_component_Button, {
						type: "button",
						label: "İptal",
						class: "p-button-text text-sm",
						onClick: $options.cancel
					}, null, _parent, _scopeId));
					_push(`</div></form>`);
				}
			} else return [$data.step === 1 ? (openBlock(), createBlock("form", {
				key: 0,
				onSubmit: withModifiers($options.sendMailCode, ["prevent"])
			}, [createVNode("div", { class: "flex flex-column gap-3" }, [
				createVNode("p", { class: "text-sm text-center" }, " Şifrenizi değiştirmek için sistemde kayıtlı mail adresinizi girin. "),
				createVNode("div", { class: "field" }, [createVNode("label", { for: "email" }, "Mail Adresi"), createVNode(_component_InputText, {
					id: "email",
					modelValue: $data.email,
					"onUpdate:modelValue": ($event) => $data.email = $event,
					class: "w-full",
					type: "email",
					required: ""
				}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
				createVNode(_component_Button, {
					type: "submit",
					label: "Kod Gönder",
					class: "mt-3",
					disabled: !$data.email || $data.step_1_loading_button,
					loading: $data.step_1_loading_button
				}, null, 8, ["disabled", "loading"]),
				createVNode(_component_Button, {
					type: "button",
					label: "Geri",
					onClick: $options.goBack,
					class: "p-button-primary"
				}, null, 8, ["onClick"])
			])], 40, ["onSubmit"])) : (openBlock(), createBlock("form", {
				key: 1,
				onSubmit: withModifiers($options.changePassword, ["prevent"])
			}, [createVNode("div", { class: "flex flex-column gap-3" }, [
				createVNode("p", { class: "text-sm text-green-600 text-center font-bold" }, " Mailinize gelen kodu ve şifre bilgilerinizi girin. "),
				createVNode("div", { class: "field" }, [createVNode("label", null, "Mail Doğrulama Kodu"), createVNode(_component_InputText, {
					modelValue: $data.code,
					"onUpdate:modelValue": ($event) => $data.code = $event,
					class: "w-full text-center",
					placeholder: "000000",
					maxlength: "6",
					required: ""
				}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
				createVNode("div", { class: "field" }, [createVNode("label", null, "Eski Şifreniz"), createVNode(_component_InputText, {
					modelValue: $data.oldPassword,
					"onUpdate:modelValue": ($event) => $data.oldPassword = $event,
					class: "w-full",
					type: "password",
					required: ""
				}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
				createVNode("div", { class: "field" }, [
					createVNode("label", null, "Yeni Şifre"),
					createVNode(_component_InputText, {
						modelValue: $data.newPassword,
						"onUpdate:modelValue": ($event) => $data.newPassword = $event,
						class: "w-full",
						type: "password",
						required: ""
					}, null, 8, ["modelValue", "onUpdate:modelValue"]),
					$data.newPassword.length > 0 && $options.passwordErrors.length > 0 ? (openBlock(), createBlock("div", {
						key: 0,
						class: "mt-2 p-2 bg-red-100 border-round text-xs text-red-600"
					}, [(openBlock(true), createBlock(Fragment, null, renderList($options.passwordErrors, (error, index) => {
						return openBlock(), createBlock("div", { key: index }, " • " + toDisplayString(error), 1);
					}), 128))])) : createCommentVNode("", true)
				]),
				createVNode("div", { class: "field" }, [
					createVNode("label", null, "Yeni Şifre (Tekrar)"),
					createVNode(_component_InputText, {
						modelValue: $data.confirmPassword,
						"onUpdate:modelValue": ($event) => $data.confirmPassword = $event,
						class: "w-full",
						type: "password",
						required: ""
					}, null, 8, ["modelValue", "onUpdate:modelValue"]),
					$data.confirmPassword && !$options.doPasswordsMatch ? (openBlock(), createBlock("small", {
						key: 0,
						class: "p-error block mt-1"
					}, "Şifreler birbiriyle eşleşmiyor.")) : createCommentVNode("", true)
				]),
				createVNode(_component_Button, {
					type: "submit",
					label: "Şifremi Değiştir",
					severity: "success",
					class: "mt-3",
					disabled: !$options.canSubmit || $data.step_2_loading_button,
					loading: $data.step_2_loading_button
				}, null, 8, ["disabled", "loading"]),
				createVNode(_component_Button, {
					type: "button",
					label: "İptal",
					class: "p-button-text text-sm",
					onClick: $options.cancel
				}, null, 8, ["onClick"])
			])], 40, ["onSubmit"]))];
		}),
		_: 1
	}, _parent));
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ChangePasswordForm.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ChangePasswordForm_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]), { __name: "ChangePasswordForm" });
//#endregion
//#region app/pages/auth/change-password.vue
var _sfc_main = {
	__name: "change-password",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(ChangePasswordForm_default, _attrs, null, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/change-password.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=change-password-BnuCgZWs.mjs.map
