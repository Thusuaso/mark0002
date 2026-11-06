import { F as FilterMatchMode, b as useAsyncData, e as formatPriceUsd, f as formatDecimal, a as useAppToast } from '../virtual/entry.mjs';
import { n as script$1 } from './button-C8Z7Yc79.mjs';
import { n as script$3 } from './column-CT6GXkG2.mjs';
import { n as script$2 } from './datatable-D6ou7HZJ.mjs';
import { n as script$4 } from './inputtext-s6cxdqDx.mjs';
import { t as script } from './select-T8LIeBQG.mjs';
import { u as useLegacyApi } from './useLegacyApi-B5zRc7ig.mjs';
import { ref, withAsyncContext, unref, isRef, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
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
import './utils-DLTV_uUI.mjs';
import './paginator-Xy7ujKDP.mjs';
import './angleleft-D6vOFyjM.mjs';
import './inputnumber-DEH2bm5F.mjs';
import './times-CPhkDIFg.mjs';
import './baseinput-SDS7K395.mjs';
import './baseeditableholder-y-Ph8z9F.mjs';
import './angledown-DbnE05CF.mjs';
import './angleup-Bp9xicZh.mjs';
import './angleright-DC6YOV01.mjs';
import './blank-BQmA3nuA.mjs';
import './check-CR3Cx6NX.mjs';
import './chevrondown-C7RD7jv8.mjs';
import './search-fCMh6s0Y.mjs';
import './iconfield-D2ODE-2Z.mjs';
import './inputicon-DEvfAPpy.mjs';
import './overlayeventbus-CNwdnFrZ.mjs';
import './portal-DQKNPUee.mjs';
import './virtualscroller-CALiPpRg.mjs';
import '@primeuix/utils/zindex';
import './chevronright-DpreV3r3.mjs';
import './bars-DE1IUcnH.mjs';
import './checkbox-wtvrQjx7.mjs';
import './minus-C71kU5yE.mjs';
import './radiobutton-C-685P7O.mjs';
import './plus-CA09jZgn.mjs';
import './focustrap-kXXT0pga.mjs';
import './sortamountupalt-MmmjHcOR.mjs';
import './useApi-CGFzrxZs.mjs';

//#region app/pages/reports/mekmer/by-buying-production.vue
var _sfc_main = {
	__name: "by-buying-production",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const EXCEL_COLUMNS = [
			["Month", "Month"],
			["OcakAdi", "OcakAdi"],
			["KasaNo", "KasaNo"],
			["FirmaAdi", "FirmaAdi"],
			["SiparisAciklama", "SiparisAciklama"],
			["UrunAdi", "UrunAdi"],
			["BirimAdi", "BirimAdi"],
			["AlisFiyati", "AlisFiyati"],
			["Miktar", "Miktar"],
			["AlisToplam", "AlisToplam"]
		];
		const list = ref([]);
		const listTotal = ref({
			alisToplam: 0,
			miktar: 0
		});
		const excelLoading = ref(false);
		const thisYear = (/* @__PURE__ */ new Date()).getFullYear();
		const years = ref(Array.from({ length: thisYear - 2020 + 1 }, (_, i) => ({ year: 2020 + i })));
		const selectedYear = ref({ year: thisYear });
		const filters1 = ref({
			Month: {
				value: null,
				matchMode: FilterMatchMode.STARTS_WITH
			},
			OcakAdi: {
				value: null,
				matchMode: FilterMatchMode.STARTS_WITH
			},
			KasaNo: {
				value: null,
				matchMode: FilterMatchMode.STARTS_WITH
			},
			FirmaAdi: {
				value: null,
				matchMode: FilterMatchMode.STARTS_WITH
			},
			SiparisAciklama: {
				value: null,
				matchMode: FilterMatchMode.STARTS_WITH
			},
			UrunAdi: {
				value: null,
				matchMode: FilterMatchMode.STARTS_WITH
			},
			BirimAdi: {
				value: null,
				matchMode: FilterMatchMode.STARTS_WITH
			}
		});
		function recalcTotal(rows) {
			const total = {
				alisToplam: 0,
				miktar: 0
			};
			rows.forEach((x) => {
				total.alisToplam += x.AlisToplam;
				total.miktar += x.Miktar;
			});
			listTotal.value = total;
		}
		function yearSelected(event) {
			useLegacyApi().get(`/production/buying/price/list/yearly/${event.value.year}`).then((res) => {
				list.value = res.data.list;
				recalcTotal(res.data.list);
			});
		}
		function filterSelected(event) {
			recalcTotal(event.filteredValue);
		}
		async function excelOutput() {
			if (!list.value.length) {
				useAppToast().warn("Aktarılacak kayıt bulunamadı.");
				return;
			}
			excelLoading.value = true;
			try {
				const XLSX = await import('../_/xlsx.mjs').then(function (n) { return n.x; });
				const headers = EXCEL_COLUMNS.map(([header]) => header);
				const rows = list.value.map((row) => EXCEL_COLUMNS.map(([, field]) => row[field]));
				const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
				const wb = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(wb, ws, "Çeki");
				XLSX.writeFile(wb, "Uretim.xlsx");
				useAppToast().success(`${rows.length} kayıt Excel'e aktarıldı.`);
			} catch (e) {
				console.error("excelOutput", e);
				useAppToast().error("Excel oluşturulurken hata oluştu.");
			} finally {
				excelLoading.value = false;
			}
		}
		[__temp, __restore] = withAsyncContext(async () => useAsyncData("reports-mekmer-by-buying-production", async () => {
			const res = await useLegacyApi().get("/production/buying/price/list");
			list.value = res.data.list;
			recalcTotal(res.data.list);
			return true;
		}, { server: false })), await __temp, __restore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Select = script;
			const _component_Button = script$1;
			const _component_DataTable = script$2;
			const _component_Column = script$3;
			const _component_InputText = script$4;
			_push(`<div${ssrRenderAttrs(_attrs)}><div class="row m-auto text-center"><div class="col-sm-6">`);
			_push(ssrRenderComponent(_component_Select, {
				modelValue: unref(selectedYear),
				"onUpdate:modelValue": ($event) => isRef(selectedYear) ? selectedYear.value = $event : null,
				options: unref(years),
				optionLabel: "year",
				placeholder: "Select a Year",
				onChange: ($event) => yearSelected($event),
				class: "w-100"
			}, null, _parent));
			_push(`</div><div class="col-sm-6">`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				severity: "info",
				class: "w-100",
				icon: "pi pi-file-excel",
				label: "Excel",
				loading: unref(excelLoading),
				onClick: excelOutput
			}, null, _parent));
			_push(`</div></div>`);
			_push(ssrRenderComponent(_component_DataTable, {
				value: unref(list),
				responsiveLayout: "scroll",
				class: "p-datatable-sm",
				paginator: true,
				rows: 15,
				filters: unref(filters1),
				"onUpdate:filters": ($event) => isRef(filters1) ? filters1.value = $event : null,
				filterDisplay: "menu",
				onFilter: ($event) => filterSelected($event)
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_Column, {
							field: "Month",
							header: "Ay"
						}, {
							filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									class: "p-column-filter"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									class: "p-column-filter"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "OcakAdi",
							header: "Ocak"
						}, {
							filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									class: "p-column-filter"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									class: "p-column-filter"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "KasaNo",
							header: "Kasa"
						}, {
							filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									class: "p-column-filter"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									class: "p-column-filter"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "FirmaAdi",
							header: "Firma"
						}, {
							filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									class: "p-column-filter"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									class: "p-column-filter"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "SiparisAciklama",
							header: "Po"
						}, {
							filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									class: "p-column-filter"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									class: "p-column-filter"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "UrunAdi",
							header: "Ürün"
						}, {
							filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									class: "p-column-filter"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									class: "p-column-filter"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "BirimAdi",
							header: "Birim"
						}, {
							filter: withCtx(({ filterModel }, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									class: "p-column-filter"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									class: "p-column-filter"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "AlisFiyati",
							header: "Alış Fiyatı"
						}, {
							body: withCtx((slotProps, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati))}`);
								else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati)), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "Miktar",
							header: "Miktar"
						}, {
							body: withCtx((slotProps, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar))}`);
								else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 1)];
							}),
							footer: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(unref(listTotal).miktar))}`);
								else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(unref(listTotal).miktar)), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_Column, {
							field: "AlisToplam",
							header: "Alış Toplam"
						}, {
							body: withCtx((slotProps, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisToplam))}`);
								else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisToplam)), 1)];
							}),
							footer: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(unref(listTotal).alisToplam))}`);
								else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(unref(listTotal).alisToplam)), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [
						createVNode(_component_Column, {
							field: "Month",
							header: "Ay"
						}, {
							filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
								type: "text",
								modelValue: filterModel.value,
								"onUpdate:modelValue": ($event) => filterModel.value = $event,
								class: "p-column-filter"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "OcakAdi",
							header: "Ocak"
						}, {
							filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
								type: "text",
								modelValue: filterModel.value,
								"onUpdate:modelValue": ($event) => filterModel.value = $event,
								class: "p-column-filter"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "KasaNo",
							header: "Kasa"
						}, {
							filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
								type: "text",
								modelValue: filterModel.value,
								"onUpdate:modelValue": ($event) => filterModel.value = $event,
								class: "p-column-filter"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "FirmaAdi",
							header: "Firma"
						}, {
							filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
								type: "text",
								modelValue: filterModel.value,
								"onUpdate:modelValue": ($event) => filterModel.value = $event,
								class: "p-column-filter"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "SiparisAciklama",
							header: "Po"
						}, {
							filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
								type: "text",
								modelValue: filterModel.value,
								"onUpdate:modelValue": ($event) => filterModel.value = $event,
								class: "p-column-filter"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "UrunAdi",
							header: "Ürün"
						}, {
							filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
								type: "text",
								modelValue: filterModel.value,
								"onUpdate:modelValue": ($event) => filterModel.value = $event,
								class: "p-column-filter"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "BirimAdi",
							header: "Birim"
						}, {
							filter: withCtx(({ filterModel }) => [createVNode(_component_InputText, {
								type: "text",
								modelValue: filterModel.value,
								"onUpdate:modelValue": ($event) => filterModel.value = $event,
								class: "p-column-filter"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "AlisFiyati",
							header: "Alış Fiyatı"
						}, {
							body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisFiyati)), 1)]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "Miktar",
							header: "Miktar"
						}, {
							body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 1)]),
							footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(unref(listTotal).miktar)), 1)]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "AlisToplam",
							header: "Alış Toplam"
						}, {
							body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.AlisToplam)), 1)]),
							footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(unref(listTotal).alisToplam)), 1)]),
							_: 1
						})
					];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reports/mekmer/by-buying-production.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=by-buying-production-BErAYY2T.mjs.map
