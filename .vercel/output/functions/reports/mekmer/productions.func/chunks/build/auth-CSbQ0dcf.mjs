import { q as useAuthStore, r as useRouter } from '../virtual/entry.mjs';
import { n as script$3 } from './button-C8Z7Yc79.mjs';
import { n as script$1 } from './inputtext-s6cxdqDx.mjs';
import { u as useTodoStore } from './todo-CBOtxBPz.mjs';
import { n as script$2 } from './message-DvSNQ9wF.mjs';
import { n as script } from './card-D9W2BIHg.mjs';
import { ref, computed, mergeProps, withCtx, unref, createTextVNode, toDisplayString, isRef, openBlock, createBlock, withModifiers, createVNode, createCommentVNode, useSSRContext } from 'vue';
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
import './times-CPhkDIFg.mjs';

//#region app/pages/auth.vue
var _sfc_main = {
	__name: "auth",
	__ssrInlineRender: true,
	setup(__props) {
		const auth = useAuthStore();
		const todo = useTodoStore();
		const router = useRouter();
		const step = ref(1);
		const otpCode = ref("");
		const user = ref({
			username: "",
			password: ""
		});
		const nextStepLoading = ref(false);
		const step2Loading = ref(false);
		const errorMessage = ref("");
		const canSubmitStep1 = computed(() => user.value.username.trim() !== "" && user.value.password !== "");
		function backToStep1() {
			step.value = 1;
			otpCode.value = "";
			errorMessage.value = "";
		}
		async function onSubmit() {
			errorMessage.value = "";
			try {
				if (step.value === 1) {
					nextStepLoading.value = true;
					const res = await auth.requestOtp({
						username: user.value.username,
						password: user.value.password
					});
					nextStepLoading.value = false;
					if (res.status && res.step === "otp_sent") step.value = 2;
					else errorMessage.value = res.message || "Giriş bilgileri hatalı veya sunucu reddetti.";
					return;
				}
				step2Loading.value = true;
				const res = await auth.verifyOtp({
					username: user.value.username,
					code: otpCode.value
				});
				step2Loading.value = false;
				if (res.status) {
					todo.setToDoListByUsername(res.username);
					await router.push("/");
				} else errorMessage.value = res.message || "Kod hatalı veya süresi dolmuş.";
			} catch (error) {
				nextStepLoading.value = false;
				step2Loading.value = false;
				errorMessage.value = "Sunucuyla iletişim kurulurken bir hata oluştu.";
				console.error("Giriş hatası:", error);
			}
		}
		function goToForgotPassword() {
			return router.push("/auth/change-password");
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Card = script;
			const _component_InputText = script$1;
			const _component_Message = script$2;
			const _component_Button = script$3;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-5" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_Card, { style: {
				"width": "25rem",
				"margin": "0px auto"
			} }, {
				title: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<div class="text-center"${_scopeId}>${ssrInterpolate(unref(step) === 1 ? "Login" : "E-posta Doğrulama")}</div>`);
					else return [createVNode("div", { class: "text-center" }, toDisplayString(unref(step) === 1 ? "Login" : "E-posta Doğrulama"), 1)];
				}),
				content: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (unref(step) === 1) {
							_push(`<form${_scopeId}><div class="flex flex-column gap-3"${_scopeId}><div class="field"${_scopeId}><label for="username"${_scopeId}>Username</label>`);
							_push(ssrRenderComponent(_component_InputText, {
								id: "username",
								modelValue: unref(user).username,
								"onUpdate:modelValue": ($event) => unref(user).username = $event,
								class: "w-full"
							}, null, _parent, _scopeId));
							_push(`</div><div class="field"${_scopeId}><label for="password"${_scopeId}>Password</label>`);
							_push(ssrRenderComponent(_component_InputText, {
								id: "password",
								modelValue: unref(user).password,
								"onUpdate:modelValue": ($event) => unref(user).password = $event,
								class: "w-full",
								type: "password"
							}, null, _parent, _scopeId));
							_push(`</div>`);
							if (unref(errorMessage)) _push(ssrRenderComponent(_component_Message, {
								severity: "error",
								closable: false
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(unref(errorMessage))}`);
									else return [createTextVNode(toDisplayString(unref(errorMessage)), 1)];
								}),
								_: 1
							}, _parent, _scopeId));
							else _push(`<!---->`);
							_push(ssrRenderComponent(_component_Button, {
								type: "submit",
								label: "İlerle",
								class: "mt-3",
								disabled: !unref(canSubmitStep1) || unref(nextStepLoading),
								loading: unref(nextStepLoading)
							}, null, _parent, _scopeId));
							_push(`<div class="flex justify-content-end mt-1"${_scopeId}>`);
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								label: "Şifremi Unuttum?",
								variant: "link",
								class: "p-0 text-sm",
								onClick: goToForgotPassword
							}, null, _parent, _scopeId));
							_push(`</div></div></form>`);
						} else {
							_push(`<form${_scopeId}><div class="flex flex-column gap-3 text-center"${_scopeId}><p class="text-sm italic"${_scopeId}> Lütfen mail adresinize gönderilen 6 haneli kodu girin. </p><div class="field"${_scopeId}>`);
							_push(ssrRenderComponent(_component_InputText, {
								id: "otp",
								modelValue: unref(otpCode),
								"onUpdate:modelValue": ($event) => isRef(otpCode) ? otpCode.value = $event : null,
								class: "w-full text-center",
								placeholder: "000000",
								maxlength: "6",
								autofocus: ""
							}, null, _parent, _scopeId));
							_push(`</div>`);
							if (unref(errorMessage)) _push(ssrRenderComponent(_component_Message, {
								severity: "error",
								closable: false
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(unref(errorMessage))}`);
									else return [createTextVNode(toDisplayString(unref(errorMessage)), 1)];
								}),
								_: 1
							}, _parent, _scopeId));
							else _push(`<!---->`);
							_push(ssrRenderComponent(_component_Button, {
								type: "submit",
								label: "Giriş Yap",
								severity: "success",
								class: "mt-3",
								disabled: unref(step2Loading),
								loading: unref(step2Loading)
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Button, {
								type: "button",
								label: "Geri Dön",
								variant: "text",
								class: "text-sm",
								onClick: backToStep1
							}, null, _parent, _scopeId));
							_push(`</div></form>`);
						}
					} else return [unref(step) === 1 ? (openBlock(), createBlock("form", {
						key: 0,
						onSubmit: withModifiers(onSubmit, ["prevent"])
					}, [createVNode("div", { class: "flex flex-column gap-3" }, [
						createVNode("div", { class: "field" }, [createVNode("label", { for: "username" }, "Username"), createVNode(_component_InputText, {
							id: "username",
							modelValue: unref(user).username,
							"onUpdate:modelValue": ($event) => unref(user).username = $event,
							class: "w-full"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						createVNode("div", { class: "field" }, [createVNode("label", { for: "password" }, "Password"), createVNode(_component_InputText, {
							id: "password",
							modelValue: unref(user).password,
							"onUpdate:modelValue": ($event) => unref(user).password = $event,
							class: "w-full",
							type: "password"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						unref(errorMessage) ? (openBlock(), createBlock(_component_Message, {
							key: 0,
							severity: "error",
							closable: false
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(errorMessage)), 1)]),
							_: 1
						})) : createCommentVNode("", true),
						createVNode(_component_Button, {
							type: "submit",
							label: "İlerle",
							class: "mt-3",
							disabled: !unref(canSubmitStep1) || unref(nextStepLoading),
							loading: unref(nextStepLoading)
						}, null, 8, ["disabled", "loading"]),
						createVNode("div", { class: "flex justify-content-end mt-1" }, [createVNode(_component_Button, {
							type: "button",
							label: "Şifremi Unuttum?",
							variant: "link",
							class: "p-0 text-sm",
							onClick: goToForgotPassword
						})])
					])], 32)) : (openBlock(), createBlock("form", {
						key: 1,
						onSubmit: withModifiers(onSubmit, ["prevent"])
					}, [createVNode("div", { class: "flex flex-column gap-3 text-center" }, [
						createVNode("p", { class: "text-sm italic" }, " Lütfen mail adresinize gönderilen 6 haneli kodu girin. "),
						createVNode("div", { class: "field" }, [createVNode(_component_InputText, {
							id: "otp",
							modelValue: unref(otpCode),
							"onUpdate:modelValue": ($event) => isRef(otpCode) ? otpCode.value = $event : null,
							class: "w-full text-center",
							placeholder: "000000",
							maxlength: "6",
							autofocus: ""
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						unref(errorMessage) ? (openBlock(), createBlock(_component_Message, {
							key: 0,
							severity: "error",
							closable: false
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(errorMessage)), 1)]),
							_: 1
						})) : createCommentVNode("", true),
						createVNode(_component_Button, {
							type: "submit",
							label: "Giriş Yap",
							severity: "success",
							class: "mt-3",
							disabled: unref(step2Loading),
							loading: unref(step2Loading)
						}, null, 8, ["disabled", "loading"]),
						createVNode(_component_Button, {
							type: "button",
							label: "Geri Dön",
							variant: "text",
							class: "text-sm",
							onClick: backToStep1
						})
					])], 32))];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=auth-CSbQ0dcf.mjs.map
