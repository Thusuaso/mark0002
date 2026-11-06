import { _ as _plugin_vue_export_helper_default, c as dateToString, f as formatDecimal, k as formatPriceTl, e as formatPriceUsd, a as useAppToast, F as FilterMatchMode } from '../virtual/entry.mjs';
import { n as script } from './button-C8Z7Yc79.mjs';
import { n as script$4 } from './column-CT6GXkG2.mjs';
import { n as script$3 } from './datatable-D6ou7HZJ.mjs';
import { n as script$5 } from './inputtext-s6cxdqDx.mjs';
import { t as script$2 } from './select-T8LIeBQG.mjs';
import { n as script$8 } from './inputnumber-DEH2bm5F.mjs';
import { n as script$7 } from './autocomplete-5Wwvp4c8.mjs';
import { n as script$1 } from './floatlabel-BDqo8RCT.mjs';
import { t as toIsoDate, f as fromIsoDate } from './dates-C-BBx50j.mjs';
import { n as script$6 } from './dialog-BB6no0wu.mjs';
import { u as useLegacyApi } from './useLegacyApi-B5zRc7ig.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { e as exportExcel } from './useExcelExport-B-DCkvaR.mjs';
import { C as CustomInput_default } from './CustomInput-B9GfGXia.mjs';
import { u as useTcmb } from './useTcmb-B8gDruVs.mjs';
import { C as Currency_default } from './Currency-KtOU2lzT.mjs';
import { mergeProps, withCtx, createVNode, unref, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
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
import './angleright-DC6YOV01.mjs';
import './blank-BQmA3nuA.mjs';
import './check-CR3Cx6NX.mjs';
import './chevrondown-C7RD7jv8.mjs';
import './search-fCMh6s0Y.mjs';
import './times-CPhkDIFg.mjs';
import './iconfield-D2ODE-2Z.mjs';
import './inputicon-DEvfAPpy.mjs';
import './baseinput-SDS7K395.mjs';
import './baseeditableholder-y-Ph8z9F.mjs';
import './overlayeventbus-CNwdnFrZ.mjs';
import './portal-DQKNPUee.mjs';
import './virtualscroller-CALiPpRg.mjs';
import '@primeuix/utils/zindex';
import './angledown-DbnE05CF.mjs';
import './angleup-Bp9xicZh.mjs';
import './chevronright-DpreV3r3.mjs';
import './bars-DE1IUcnH.mjs';
import './checkbox-wtvrQjx7.mjs';
import './minus-C71kU5yE.mjs';
import './radiobutton-C-685P7O.mjs';
import './plus-CA09jZgn.mjs';
import './focustrap-kXXT0pga.mjs';
import './sortamountupalt-MmmjHcOR.mjs';
import './chip--BHyxaU9.mjs';
import './timescircle-0itGCn-i.mjs';
import './utils-9fKJJYP7.mjs';
import './useApi-CGFzrxZs.mjs';
import './datepicker-BGpmmzow.mjs';
import './chevronleft-Dy82Mung.mjs';
import './chevronup-CFGDy7zv.mjs';

//#region app/pages/reports/mekmer/strips.vue
var _sfc_main = {
	computed: { sharedStore() {
		return useSharedStore();
	} },
	data() {
		return {
			selectedNakliye: null,
			nakliye_delete_button_loading: false,
			nakliyeTotal: {
				ton: 0,
				total_tl: 0,
				total_usd: 0
			},
			nakliye_save_button_loading: false,
			filteredNakliyeKimden: null,
			selectedNakliyeKimden: null,
			nakliyeFirmaList: [],
			nakliyeKimdenList: [],
			filteredNakliyeFirma: null,
			selectedNakliyeFirma: null,
			filteredMoloz: {
				Date: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				İrsaliyeNo: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				SupplierName: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				QuarryName: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				FaturaNo: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				StripName: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				}
			},
			filteredStrips: {
				Date: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				DocumentNo: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				SupplierName: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				QuarryName: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				Invoice: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				}
			},
			filteredNakliye: {
				Tarih: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				PlakaNo: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				İrsaliyeNo: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				FaturaNo: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				FirmaAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				KimdenAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				}
			},
			moloz_list: [],
			selectedMolozData: {},
			total_moloz: {
				ton: 0,
				total: 0,
				total_usd: 0
			},
			tl_disabled: true,
			usd_disabled: true,
			disabled_calendar_moloz: true,
			selectedCurrencyStatus: null,
			dialog_header_moloz: "",
			cost_supplier_dialog_moloz: false,
			dialog_header: "",
			selectedStripData: {},
			button_disabled_2: true,
			years: [{ year: (/* @__PURE__ */ new Date()).getFullYear() }, { year: (/* @__PURE__ */ new Date()).getFullYear() - 1 }],
			selectedYear: { year: (/* @__PURE__ */ new Date()).getFullYear() },
			months: [],
			selectedMonth: null,
			suppliers: [],
			list: [],
			strips: [],
			quarries: [],
			cost_supplier_dialog: false,
			selectedSupplier: null,
			filteredSupplier: null,
			model: {
				quarryName: null,
				quarryId: null,
				supplierName: null,
				supplierId: null,
				stripId: null,
				stripName: null,
				stripPrice: 0,
				stripM2: 0,
				date: null,
				stripCost: 0,
				stripCostUsd: 0,
				stripWidth: 0,
				stripHeight: 0,
				stripThickness: 0,
				stripPiece: 0,
				invoice: "",
				currency: 0,
				irsaliye_no: ""
			},
			modelNakliye: {
				id: 0,
				date: null,
				plate_no: "",
				document_no: "",
				invoice_no: "",
				company_name: "",
				company_id: "",
				supplier_name: "",
				supplier_id: "",
				ton: 0,
				price_tl: 0,
				price_usd: 0,
				total_tl: 0,
				total_usd: 0,
				currency: 0
			},
			selectedQuarry: null,
			filteredQuarry: null,
			selectedStrip: null,
			filteredStrip: null,
			selectedDate: null,
			new_button_status: false,
			disabled_1: false,
			disabled_2: false,
			disabled_3: false,
			disabled_4: false,
			disabled_5: false,
			disabled_6: false,
			button_disabled: false,
			total: {
				m2: 0,
				cost: 0,
				piece: 0,
				costUsd: 0
			},
			moloz_model: {
				id: 0,
				date: null,
				quarryId: null,
				quarryName: null,
				supplierId: null,
				supplierName: null,
				stripId: null,
				stripName: null,
				ton: 0,
				price_tl: 0,
				price_usd: 0,
				total: 0,
				total_usd: 0,
				currency: 0,
				irsaliye_no: "",
				fatura_no: ""
			},
			new_button_status_moloz: false,
			currency_status: [{
				id: 1,
				currency: "USD"
			}, {
				id: 2,
				currency: "TL"
			}],
			new_button_status_nakliye: false,
			nakliye_dialog_header: "",
			nakliye_dialog_visible: false,
			nakliyeList: []
		};
	},
	mounted() {
		const month = (/* @__PURE__ */ new Date()).getMonth();
		let _months = [];
		for (let i = 0; i <= month; i++) _months.push({
			month_id: i,
			month_name: ""
		});
		const _months_name = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];
		_months = _months.map((item) => {
			const new_item = {};
			new_item.month_name = _months_name[item.month_id];
			new_item.month_id = item.month_id + 1;
			return new_item;
		});
		this.months = _months;
		this.selectedMonth = {
			month_id: _months.length,
			month_name: _months_name[_months.length - 1]
		};
		this.sharedStore.beginLoading();
		useLegacyApi().get(`/reports/mekmer/quarries/supplier/${this.selectedYear.year}/${this.selectedMonth.month_id}`).then((res) => {
			this.suppliers = res.data.suppliers;
			this.list = res.data.list;
			this.strips = res.data.strips;
			this.quarries = res.data.quarries;
			this.totalStrips(res.data.list);
			useLegacyApi().get(`/reports/mekmer/moloz/list/${this.selectedYear.year}/${this.selectedMonth.month_id}`).then((res) => {
				this.moloz_list = res.data.list;
				this.suppliers = res.data.suppliers;
				this.strips = res.data.strips;
				this.quarries = res.data.quarries;
				this.__molozSumTotal(res.data.list);
				this.sharedStore.endLoading();
			});
		}).catch((err) => {
			console.error("strips raporu istegi basarisiz:", err);
			this.sharedStore.endLoading();
		});
		this.nakliyeCalculate();
	},
	methods: {
		nakliyeFiltered(event) {
			this.nakliyeTotal = {
				ton: 0,
				total_tl: 0,
				total_usd: 0
			};
			event.filteredValue.forEach((x) => {
				this.nakliyeTotal.ton += x.Ton;
				this.nakliyeTotal.total_tl += x.ToplamTl;
				this.nakliyeTotal.total_usd += x.ToplamDolar;
			});
		},
		async calculateNakliyeUsdTl() {
			this.modelNakliye.total_tl = await parseFloat(this.modelNakliye.ton * this.modelNakliye.price_tl);
			this.modelNakliye.price_usd = await parseFloat(this.modelNakliye.price_tl / this.modelNakliye.currency);
			this.modelNakliye.total_usd = await parseFloat(this.modelNakliye.ton * this.modelNakliye.price_usd);
		},
		deleteNakliye() {
			this.nakliye_delete_button_loading = true;
			useLegacyApi().get(`/reports/mekmer/nakliye/deleted/${this.modelNakliye.id}`).then((res) => {
				if (res.data.status) {
					this.nakliye_delete_button_loading = false;
					this.nakliye_dialog_visible = false;
					useAppToast().success("Silme Başarılı.");
					this.nakliyeReset();
				} else useAppToast().error("Silme Başarısız.");
			});
		},
		nakliyeDatatableSelected(event) {
			this.new_button_status_nakliye = false;
			this.nakliye_dialog_header = "Nakliye Düzenle";
			this.nakliye_dialog_visible = true;
			this.modelNakliye.id = event.data.ID;
			this.modelNakliye.date = event.data.Tarih;
			this.modelNakliye.plate_no = event.data.PlakaNo;
			this.modelNakliye.document_no = event.data.İrsaliyeNo;
			this.modelNakliye.invoice_no = event.data.FaturaNo;
			this.modelNakliye.company_name = event.data.FirmaAdi;
			this.modelNakliye.company_id = event.data.FirmaID;
			this.modelNakliye.supplier_name = event.data.KimdenAdi;
			this.modelNakliye.supplier_id = event.data.KimdenID;
			this.modelNakliye.ton = event.data.Ton;
			this.modelNakliye.price_tl = event.data.BirimFiyatTL;
			this.modelNakliye.price_usd = event.data.BirimFiyatDolar;
			this.modelNakliye.total_tl = event.data.ToplamTl;
			this.modelNakliye.total_usd = event.data.ToplamDolar;
			this.modelNakliye.currency = event.data.Kur;
			this.selectedNakliyeFirma = this.nakliyeFirmaList.find((x) => x.ID === event.data.FirmaID);
			this.selectedNakliyeKimden = this.nakliyeKimdenList.find((x) => x.ID === event.data.KimdenID);
		},
		async nakliyeCalculate() {
			await useLegacyApi().get(`/reports/mekmer/nakliye/listesi/${this.selectedYear.year}/${this.selectedMonth.month_id}`).then(async (res) => {
				this.nakliyeList = await res.data.list;
				this.nakliyeTotal = {
					ton: 0,
					total_tl: 0,
					total_usd: 0
				};
				res.data.list.forEach((x) => {
					this.nakliyeTotal.ton += x.Ton;
					this.nakliyeTotal.total_tl += x.ToplamTl;
					this.nakliyeTotal.total_usd += x.ToplamDolar;
				});
			});
			useLegacyApi().get("/reports/mekmer/nakliye/firma/list").then((res) => {
				this.nakliyeFirmaList = res.data.list;
			});
			useLegacyApi().get("/reports/mekmer/nakliye/kimden/list").then((res) => {
				this.nakliyeKimdenList = res.data.list;
			});
		},
		async processNakliye() {
			if (this.new_button_status_nakliye) {
				this.nakliye_save_button_loading = true;
				await useLegacyApi().post("/reports/mekmer/nakliye/save", this.modelNakliye).then((res) => {
					if (res.data.status) {
						this.nakliye_save_button_loading = false;
						useAppToast().success("Kayıt Başarılı.");
						this.nakliyeReset();
					} else useAppToast().error("Kayıt Başarısız.");
				});
			} else {
				this.nakliye_save_button_loading = true;
				await this.calculateNakliyeUsdTl();
				await useLegacyApi().put("/reports/mekmer/nakliye/update", this.modelNakliye).then((res) => {
					if (res.data.status) {
						this.nakliye_save_button_loading = false;
						useAppToast().success("Güncelleme Başarılı.");
						this.nakliyeCalculate();
					} else useAppToast().error("Güncelleme Başarısız.");
				});
			}
		},
		nakliyeReset() {
			this.modelNakliye = {
				id: null,
				date: null,
				plate_no: "",
				document_no: "",
				invoice_no: "",
				company_name: "",
				company_id: "",
				supplier_name: "",
				supplier_id: "",
				ton: 0,
				price_tl: 0,
				price_usd: 0,
				total_tl: 0,
				total_usd: 0,
				currency: 0
			};
			this.selectedNakliyeFirma = null;
			this.selectedNakliyeKimden = null;
			this.nakliyeCalculate();
		},
		supllierInputKimden(event) {
			this.modelNakliye.supplier_id = null;
			this.modelNakliye.supplier_name = event;
		},
		nakliyeSelectedKimden(event) {
			this.modelNakliye.supplier_id = event.value.ID;
			this.modelNakliye.supplier_name = event.value.KimdenAdi;
		},
		searchNakliyeKimden(event) {
			let results;
			if (event.query.length == 0) results = this.nakliyeKimdenList;
			else results = this.nakliyeKimdenList.filter((x) => {
				return x.KimdenAdi.toUpperCase().startsWith(event.query.toUpperCase());
			}).slice(0, 15);
			this.filteredNakliyeKimden = results;
		},
		searchNakliyeFirma(event) {
			let results;
			if (event.query.length == 0) results = this.nakliyeFirmaList;
			else results = this.nakliyeFirmaList.filter((x) => {
				return x.FirmaAdi.toUpperCase().startsWith(event.query.toUpperCase());
			}).slice(0, 15);
			this.filteredNakliyeFirma = results;
		},
		nakliyeSelectedFirma(event) {
			this.modelNakliye.company_id = event.value.ID;
			this.modelNakliye.company_name = event.value.FirmaAdi;
		},
		supplierInputFirma(event) {
			this.modelNakliye.company_id = null;
			this.modelNakliye.company_name = event;
		},
		rateFetchedNakliye(event) {
			this.modelNakliye.currency = event.rate;
		},
		dateNakliyeSelected(event) {
			this.modelNakliye.date = toIsoDate(event);
		},
		async excel_strip_output_nakliye() {
			try {
				await exportExcel("/excel-api/mekmer/nakliye", this.nakliyeList, "reports_mekmer_nakliye.xlsx");
			} catch (err) {
				console.error("nakliye excel ciktisi basarisiz:", err);
				useAppToast().error("Excel olusturulamadi.");
			}
		},
		newFormNakliye() {
			this.nakliyeReset();
			this.new_button_status_nakliye = true;
			this.nakliye_dialog_header = "Yeni Nakliye";
			this.nakliye_dialog_visible = true;
		},
		molozFiltered(event) {
			this.__molozSumTotal(event.filteredValue);
		},
		stripsFiltered(event) {
			this.totalStrips(event.filteredValue);
		},
		dateMolozSelected(event) {
			this.moloz_model.date = toIsoDate(event);
		},
		rateFetchedMoloz(event) {
			this.moloz_model.currency = event.rate;
		},
		rateFetched(event) {
			this.model.currency = event.rate;
		},
		molozTonInput(event) {
			this.moloz_model.total = parseFloat(this.moloz_model.price_tl * event);
			this.moloz_model.total_usd = parseFloat(this.moloz_model.price_usd * event);
		},
		molozDatatableSelected(event) {
			this.new_button_status_moloz = false;
			this.moloz_model.id = event.data.ID;
			this.moloz_model.date = event.data.Date;
			this.moloz_model.supplierId = event.data.Supplier;
			this.moloz_model.quarryId = event.data.Quarry;
			this.moloz_model.stripId = event.data.Strip;
			this.moloz_model.ton = event.data.Ton;
			this.moloz_model.price_tl = event.data.PriceTl;
			this.moloz_model.price_usd = event.data.PriceUsd;
			this.moloz_model.currency = event.data.Currency;
			this.moloz_model.total = event.data.Total;
			this.moloz_model.irsaliye_no = event.data.İrsaliyeNo;
			this.moloz_model.fatura_no = event.data.FaturaNo;
			this.selectedDate = fromIsoDate(event.data.Date);
			this.selectedSupplier = this.suppliers.find((x) => {
				return x.ID == event.data.Supplier;
			});
			this.selectedQuarry = this.quarries.find((x) => {
				return x.ID == event.data.Quarry;
			});
			this.selectedStrip = this.strips.find((x) => {
				return x.ID == event.data.Strip;
			});
			this.dialog_header_moloz = [this.selectedQuarry?.OcakAdi, this.selectedStrip?.Strips].filter(Boolean).join(" - ");
			this.cost_supplier_dialog_moloz = true;
		},
		isInvalidNumber(value) {
			return !value || value === "" || isNaN(value);
		},
		__molozSumTotal(data) {
			this.total_moloz = {
				ton: 0,
				total: 0,
				total_usd: 0
			};
			data.forEach((x) => {
				this.total_moloz.ton += x.Ton;
				this.total_moloz.total += x.Total;
				this.total_moloz.total_usd += x.TotalUsd;
			});
		},
		molozTlInput(event) {
			if (event == 0 || event == null || event == void 0 || event == "" || isNaN(event)) {
				this.moloz_model.price_tl = 0;
				this.moloz_model.price_usd = 0;
				this.moloz_model.total = 0;
				this.moloz_model.total_usd = 0;
			}
			this.moloz_model.price_usd = event / this.moloz_model.currency;
			this.moloz_model.total = event * this.moloz_model.ton;
			this.moloz_model.total_usd = this.moloz_model.price_usd * this.moloz_model.ton;
		},
		molozUsdInput(event) {
			if (event == 0 || event == null || event == void 0 || event == "" || isNaN(event)) {
				this.moloz_model.price_tl = 0;
				this.moloz_model.price_usd = 0;
				this.moloz_model.total = 0;
				this.moloz_model.total_usd = 0;
			}
			this.moloz_model.price_tl = event * this.moloz_model.currency;
			this.moloz_model.total = this.moloz_model.price_tl * this.moloz_model.ton;
			this.moloz_model.total_usd = event * this.moloz_model.ton;
		},
		molozPriceStatusSelected(event) {
			this.disabled_calendar_moloz = false;
			if (event.value.id == 1) {
				this.usd_disabled = false;
				this.tl_disabled = true;
			} else if (event.value.id == 2) {
				this.usd_disabled = true;
				this.tl_disabled = false;
			}
		},
		updateMoloz() {
			this.sharedStore.beginLoading();
			useLegacyApi().put("/reports/mekmer/moloz/update", this.moloz_model).then((res) => {
				if (res.status) {
					this.__created();
					useAppToast().success("Güncelleme Başarılı.");
				} else useAppToast().error("Güncelleme Başarısız.");
			}).catch((err) => {
				console.error("updateMoloz basarisiz:", err);
				useAppToast().error("Güncelleme Başarısız.");
			}).finally(() => {
				this.sharedStore.endLoading();
			});
		},
		saveMoloz() {
			useLegacyApi().post("/reports/mekmer/moloz/save", this.moloz_model).then((res) => {
				if (res.status) {
					this.__created();
					this.reset();
					this.new_button_status_moloz = true;
					useAppToast().success("Kayıt Başarılı.");
				} else useAppToast().error("Kayıt Başarısız.");
			});
		},
		deleteProcessMoloz() {
			useLegacyApi().delete(`/reports/mekmer/moloz/delete/${this.moloz_model.id}`).then((res) => {
				if (res.status) {
					useAppToast().success("Silme İşlemi Başarılı");
					this.__created();
					this.cost_supplier_dialog_moloz = false;
					this.reset();
				} else useAppToast().error("Silme İşlemi Başarısız");
			});
		},
		processMoloz() {
			if (this.new_button_status_moloz) this.saveMoloz();
			else this.updateMoloz();
		},
		calculateMoloz() {
			this.moloz_model.total = parseFloat(this.moloz_model.ton) * parseFloat(this.moloz_model.price);
			this.button_disabled_2 = false;
		},
		stripInputMoloz(event) {
			this.moloz_model.stripId = null;
			this.moloz_model.stripName = event;
			this.disabled_4 = false;
		},
		stripSelectedMoloz(event) {
			this.moloz_model.stripId = event.value.ID;
			this.moloz_model.stripName = event.value.Strips;
		},
		quarryInputMoloz(event) {
			this.moloz_model.quarryId = null;
			this.moloz_model.quarryName = event;
			this.disabled_3 = false;
		},
		quarrySelectedMoloz(event) {
			this.moloz_model.quarryId = event.value.ID;
			this.moloz_model.quarryName = event.value.OcakAdi;
		},
		dateSelectedMoloz(event) {
			this.moloz_model.date = toIsoDate(event);
			this.disabled_1 = false;
			useTcmb().getUSDRate(event, "banknote").then(({ rate }) => {
				this.moloz_model.currency = parseFloat(rate);
			}).catch((err) => {
				console.error("kur alinamadi:", err);
				useAppToast().error("Döviz kuru alınamadı.");
			});
		},
		supplierInputMoloz(event) {
			this.moloz_model.supplierId = null;
			this.moloz_model.supplierName = event;
			this.disabled_2 = false;
		},
		supplierSelectedMoloz(event) {
			this.moloz_model.supplierId = event.value.ID;
			this.moloz_model.supplierName = event.value.FirmaAdi;
		},
		newFormMoloz() {
			this.dialog_header_moloz = "Yeni Moloz Ekle";
			this.cost_supplier_dialog_moloz = true;
			this.reset();
			this.new_button_status_moloz = true;
		},
		async excel_strip_output_moloz() {
			try {
				await exportExcel("/excel-api/mekmer/moloz", this.moloz_list, "reports_mekmer_moloz.xlsx");
			} catch (err) {
				console.error("moloz excel ciktisi basarisiz:", err);
				useAppToast().error("Excel olusturulamadi.");
			}
		},
		deleteProcess() {
			useLegacyApi().delete(`/reports/mekmer/quarries/supplier/strips/delete/${this.model.Id}`).then((res) => {
				if (res.status) {
					this.cost_supplier_dialog = false;
					useAppToast().success("Başarıyla Silindi");
					this.__created();
				} else useAppToast().error("Silme Başarısız");
			});
		},
		totalStrips(payload) {
			this.total = {
				m2: 0,
				cost: 0,
				piece: 0,
				costUsd: 0
			};
			payload.forEach((x) => {
				this.total.m2 += x.StripM2;
				this.total.cost += x.StripCost;
				this.total.costUsd += x.StripCostUsd;
				this.total.piece += x.StripPiece;
			});
		},
		async excel_strip_output() {
			try {
				await exportExcel("/excel-api/mekmer/strips", this.list, "reports_mekmer_strips.xlsx");
			} catch (err) {
				console.error("strips excel ciktisi basarisiz:", err);
				useAppToast().error("Excel olusturulamadi.");
			}
		},
		stripDataSelected(event) {
			this.new_button_status = false;
			this.cost_supplier_dialog = true;
			this.button_disabled_2 = true;
			this.model.Id = event.data.ID;
			this.model.date = event.data.Date;
			this.model.supplierId = event.data.Supplier;
			this.model.quarryId = event.data.Quarry;
			this.model.stripCost = event.data.StripCost;
			this.model.stripCostUsd = event.data.StripCostUsd;
			this.model.stripId = event.data.Strip;
			this.model.stripPrice = event.data.StripPrice;
			this.model.currency = event.data.Currency;
			this.model.stripM2 = event.data.StripM2;
			this.model.stripWidth = event.data.StripWidth;
			this.model.stripHeight = event.data.StripHeight;
			this.model.stripThickness = event.data.StripThickness;
			this.model.stripPiece = event.data.StripPiece;
			this.model.invoice = event.data.Invoice;
			this.model.irsaliye_no = event.data.DocumentNo;
			this.selectedDate = fromIsoDate(event.data.Date);
			this.selectedSupplier = this.suppliers.find((x) => {
				return x.ID == event.data.Supplier;
			});
			this.selectedQuarry = this.quarries.find((x) => {
				return x.ID == event.data.Quarry;
			});
			this.selectedStrip = this.strips.find((x) => {
				return x.ID == event.data.Strip;
			});
			this.dialog_header = this.selectedQuarry.OcakAdi + " - " + this.selectedStrip.Strips;
		},
		dateSelected(event) {
			this.model.date = toIsoDate(event);
			this.disabled_1 = false;
		},
		calculate() {
			this.model.stripCost = parseFloat(this.model.stripM2) * parseFloat(this.model.stripPrice);
			if (isNaN(this.model.stripCost) || !isFinite(this.model.stripCost)) this.model.stripCost = 0;
			this.model.stripPiece = Math.ceil(parseFloat(this.model.stripM2) / (parseFloat(this.model.stripWidth) / 100) / (parseFloat(this.model.stripHeight) / 100));
			if (isNaN(this.model.stripPiece) || !isFinite(this.model.stripPiece)) this.model.stripPiece = 0;
			this.model.stripCostUsd = parseFloat(this.model.stripM2) * (parseFloat(this.model.stripPrice) / this.model.currency);
			if (this.model.stripCostUsd == NaN || !isFinite(this.model.stripCostUsd)) this.model.stripCostUsd = 0;
			this.button_disabled_2 = false;
		},
		__created() {
			this.sharedStore.beginLoading();
			useLegacyApi().get(`/reports/mekmer/quarries/supplier/${this.selectedYear.year}/${this.selectedMonth.month_id}`).then((res) => {
				this.suppliers = res.data.suppliers;
				this.list = res.data.list;
				this.strips = res.data.strips;
				this.quarries = res.data.quarries;
				this.totalStrips(res.data.list);
				useLegacyApi().get(`/reports/mekmer/moloz/list/${this.selectedYear.year}/${this.selectedMonth.month_id}`).then((res) => {
					this.moloz_list = res.data.list;
					this.suppliers = res.data.suppliers;
					this.strips = res.data.strips;
					this.quarries = res.data.quarries;
					this.__molozSumTotal(res.data.list);
					this.sharedStore.endLoading();
				});
			}).catch((err) => {
				console.error("strips raporu istegi basarisiz:", err);
				this.sharedStore.endLoading();
			});
		},
		yearSelected(event) {},
		monthSelected(event) {
			useLegacyApi().get(`/reports/mekmer/quarries/supplier/${this.selectedYear.year}/${this.selectedMonth.month_id}`).then((res) => {
				this.suppliers = res.data.suppliers;
				this.list = res.data.list;
				this.strips = res.data.strips;
				this.quarries = res.data.quarries;
				this.totalStrips(res.data.list);
			}).catch((err) => {
				console.error("strips raporu istegi basarisiz:", err);
			});
			useLegacyApi().get(`/reports/mekmer/moloz/list/${this.selectedYear.year}/${this.selectedMonth.month_id}`).then((res) => {
				this.moloz_list = res.data.list;
				this.suppliers = res.data.suppliers;
				this.strips = res.data.strips;
				this.quarries = res.data.quarries;
				this.__molozSumTotal(res.data.list);
			}).catch((err) => {
				console.error("moloz listesi alinamadi:", err);
				this.moloz_list = [];
				useAppToast().error("Moloz listesi alınamadı.");
			});
			this.nakliyeCalculate();
		},
		searchSupplier(event) {
			let results;
			if (event.query.length == 0) results = this.suppliers;
			else results = this.suppliers.filter((x) => {
				return x.FirmaAdi.toUpperCase().startsWith(event.query.toUpperCase());
			}).slice(0, 15);
			this.filteredSupplier = results;
		},
		supplierSelected(event) {
			this.model.supplierId = event.value.ID;
			this.model.supplierName = event.value.FirmaAdi;
		},
		supplierInput(event) {
			this.model.supplierId = null;
			this.model.supplierName = event;
			this.disabled_2 = false;
		},
		searchQuarry(event) {
			let results;
			if (event.query.length == 0) results = this.quarries;
			else results = this.quarries.filter((x) => {
				return x.OcakAdi.toUpperCase().startsWith(event.query.toUpperCase());
			}).slice(0, 15);
			this.filteredQuarry = results;
		},
		quarrySelected(event) {
			this.model.quarryId = event.value.ID;
			this.model.quarryName = event.value.OcakAdi;
		},
		quarryInput(event) {
			this.model.quarryId = null;
			this.model.quarryName = event;
			this.disabled_3 = false;
		},
		searchStrip(event) {
			let results;
			if (event.query.length == 0) results = this.strips;
			else results = this.strips.filter((x) => {
				return x.Strips.toUpperCase().startsWith(event.query.toUpperCase());
			}).slice(0, 15);
			this.filteredStrip = results;
		},
		stripSelected(event) {
			this.model.stripId = event.value.ID;
			this.model.stripName = event.value.Strips;
		},
		stripInput(event) {
			this.model.stripId = null;
			this.model.stripName = event;
			this.disabled_4 = false;
		},
		newForm() {
			this.dialog_header = "New Form";
			this.new_button_status = true;
			this.cost_supplier_dialog = true;
			this.reset();
		},
		reset() {
			this.selectedSupplier = null;
			this.model = {
				quarryName: null,
				quarryId: null,
				supplierName: null,
				supplierId: null,
				stripId: null,
				stripName: null,
				stripPrice: 0,
				stripM2: 0,
				date: null,
				stripCost: 0,
				stripCostUsd: 0,
				stripWidth: 0,
				stripHeight: 0,
				stripThickness: 0,
				stripPiece: 0,
				invoice: "",
				currency: 0
			}, this.selectedQuarry = null;
			this.selectedStrip = null;
			this.selectedDate = null;
			this.disabled_1 = false;
			this.disabled_2 = false;
			this.disabled_3 = false;
			this.disabled_4 = false;
			this.disabled_5 = false;
			this.disabled_6 = false;
			this.moloz_model = {
				id: 0,
				date: null,
				quarryId: null,
				quarryName: null,
				supplierId: null,
				supplierName: null,
				stripId: null,
				stripName: null,
				ton: 0,
				price_tl: 0,
				price_usd: 0,
				total: 0,
				total_usd: 0,
				currency: 0,
				irsaliye_no: "",
				fatura_no: ""
			};
		},
		process() {
			if (this.new_button_status) this.save();
			else this.update();
		},
		save() {
			this.sharedStore.beginLoading();
			useLegacyApi().post("/reports/mekmer/quarries/supplier/strips/save", this.model).then((status) => {
				if (status) {
					useAppToast().success("Başarıyla Kaydedildi.");
					this.sharedStore.endLoading();
					this.__created();
					this.reset();
				}
			}).catch((err) => {
				useAppToast().error("Kaydetme başarısız...");
				this.sharedStore.endLoading();
			});
		},
		update() {
			useLegacyApi().put("/reports/mekmer/quarries/supplier/strips/update", this.model).then((res) => {
				if (res.status) {
					useAppToast().success("Başarıyla Güncellendi.");
					this.__created();
				} else useAppToast().error("Güncelleme başarısız...");
			});
		},
		__controlModel(val) {
			if (val == null || val == "" || val == "" || val == void 0 || val == 0) return false;
			else return true;
		},
		_getSupplierName(_id) {
			let name = this.suppliers.find((x) => {
				return x.ID == _id;
			}).FirmaAdi;
			return this._nullControl(name);
		},
		_getQuarryName(_id) {
			let name = this.quarries.find((x) => {
				return x.ID == _id;
			}).OcakAdi;
			return this._nullControl(name);
		},
		_getStripName(_id) {
			let name = this.strips.find((x) => {
				return x.ID == _id;
			}).Strips;
			return this._nullControl(name);
		},
		_nullControl(_value) {
			if (_value == null || _value == "null" || _value == void 0) return "";
			else return _value;
		}
	},
	watch: {}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_Button = script;
	const _component_FloatLabel = script$1;
	const _component_Select = script$2;
	const _component_DataTable = script$3;
	const _component_Column = script$4;
	const _component_InputText = script$5;
	const _component_Dialog = script$6;
	const _component_TcmbCurrency = Currency_default;
	const _component_AutoComplete = script$7;
	const _component_CustomInput = CustomInput_default;
	const _component_InputNumber = script$8;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "row mt-4 m-auto ml-2 mr-2" }, _attrs))}><div class="row m-auto text-center"><div class="col-sm-3">`);
	_push(ssrRenderComponent(_component_Button, {
		severity: "success",
		class: "w-100 mb-5",
		type: "button",
		label: "Yeni Strip",
		onClick: $options.newForm
	}, null, _parent));
	_push(`</div><div class="col-sm-1">`);
	_push(ssrRenderComponent(_component_Button, {
		severity: "info",
		class: "mb-5 pi pi-file-excel",
		type: "button",
		onClick: $options.excel_strip_output
	}, null, _parent));
	_push(`</div><div class="col-sm-3">`);
	_push(ssrRenderComponent(_component_Button, {
		severity: "success",
		class: "w-100 mb-5",
		type: "button",
		label: "Yeni Moloz",
		onClick: $options.newFormMoloz
	}, null, _parent));
	_push(`</div><div class="col-sm-1">`);
	_push(ssrRenderComponent(_component_Button, {
		severity: "info",
		class: "pi pi-file-excel mb-5",
		type: "button",
		onClick: $options.excel_strip_output_moloz
	}, null, _parent));
	_push(`</div><div class="col-sm-3">`);
	_push(ssrRenderComponent(_component_Button, {
		severity: "success",
		class: "w-100 mb-5",
		type: "button",
		label: "Yeni Nakliye",
		onClick: $options.newFormNakliye
	}, null, _parent));
	_push(`</div><div class="col-sm-1">`);
	_push(ssrRenderComponent(_component_Button, {
		severity: "info",
		class: "pi pi-file-excel mb-5",
		type: "button",
		onClick: $options.excel_strip_output_nakliye
	}, null, _parent));
	_push(`</div></div><div class="col-sm-6">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Select, {
					class: "w-100",
					id: "year",
					modelValue: $data.selectedYear,
					"onUpdate:modelValue": ($event) => $data.selectedYear = $event,
					options: $data.years,
					optionLabel: "year",
					onChange: ($event) => $options.yearSelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="year"${_scopeId}>Year</label>`);
			} else return [createVNode(_component_Select, {
				class: "w-100",
				id: "year",
				modelValue: $data.selectedYear,
				"onUpdate:modelValue": ($event) => $data.selectedYear = $event,
				options: $data.years,
				optionLabel: "year",
				onChange: ($event) => $options.yearSelected($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"options",
				"onChange"
			]), createVNode("label", { for: "year" }, "Year")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col-sm-6">`);
	_push(ssrRenderComponent(_component_FloatLabel, null, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Select, {
					class: "w-100",
					id: "month",
					modelValue: $data.selectedMonth,
					"onUpdate:modelValue": ($event) => $data.selectedMonth = $event,
					options: $data.months,
					optionLabel: "month_name",
					onChange: ($event) => $options.monthSelected($event)
				}, null, _parent, _scopeId));
				_push(`<label for="month"${_scopeId}>Month</label>`);
			} else return [createVNode(_component_Select, {
				class: "w-100",
				id: "month",
				modelValue: $data.selectedMonth,
				"onUpdate:modelValue": ($event) => $data.selectedMonth = $event,
				options: $data.months,
				optionLabel: "month_name",
				onChange: ($event) => $options.monthSelected($event)
			}, null, 8, [
				"modelValue",
				"onUpdate:modelValue",
				"options",
				"onChange"
			]), createVNode("label", { for: "month" }, "Month")];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="row m-auto text-center"><div class="col-12 col-lg-4">`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $data.list,
		class: "p-datatable-sm table-scroll-x",
		resizableColumns: true,
		columnResizeMode: "fit",
		showGridlines: "",
		selection: $data.selectedStripData,
		"onUpdate:selection": ($event) => $data.selectedStripData = $event,
		selectionMode: "single",
		onRowClick: ($event) => $options.stripDataSelected($event),
		filters: $data.filteredStrips,
		"onUpdate:filters": ($event) => $data.filteredStrips = $event,
		filterDisplay: "row",
		onFilter: ($event) => $options.stripsFiltered($event),
		scrollable: "",
		scrollHeight: "500px"
	}, {
		header: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(`STRIPLER`);
			else return [createTextVNode("STRIPLER")];
		}),
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "Date",
					header: "Tarih",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Date))}`);
						else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Date)), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "DocumentNo",
					header: "İrsaliye No",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.DocumentNo)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.DocumentNo), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SupplierName",
					header: "Tedarikçi Adı",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.SupplierName)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.SupplierName), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "QuarryName",
					header: "Ocak Adı",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.QuarryName)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.QuarryName), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "StripName",
					header: "Strip Adı"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.StripName)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.StripName), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Invoice",
					header: "Fatura No",
					showFilterMenu: false,
					showClearButton: false
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "StripM2",
					header: "Strip (M2)"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.StripM2))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.StripM2)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.total.m2))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.total.m2)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "StripPrice",
					header: "Strip (₺)"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.StripPrice))}`);
						else return [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.StripPrice)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "StripCost",
					header: "Strip Toplam (₺)"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.StripCost))}`);
						else return [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.StripCost)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))($data.total.cost))}`);
						else return [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))($data.total.cost)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "StripCostUsd",
					header: "Strip Toplam ($)"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.StripCostUsd))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.StripCostUsd)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.total.costUsd))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.total.costUsd)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "StripWidth",
					header: "En"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.StripWidth)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.StripWidth), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "StripHeight",
					header: "Boy"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.StripHeight)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.StripHeight), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "StripThickness",
					header: "Kalınlık"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.StripThickness)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.StripThickness), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "StripPiece",
					header: "Adet"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.StripPiece)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.StripPiece), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate($data.total.piece)}`);
						else return [createTextVNode(toDisplayString($data.total.piece), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "Date",
					header: "Tarih",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Date)), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "DocumentNo",
					header: "İrsaliye No",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.DocumentNo), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SupplierName",
					header: "Tedarikçi Adı",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.SupplierName), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "QuarryName",
					header: "Ocak Adı",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.QuarryName), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "StripName",
					header: "Strip Adı"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.StripName), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Invoice",
					header: "Fatura No",
					showFilterMenu: false,
					showClearButton: false
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "StripM2",
					header: "Strip (M2)"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.StripM2)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.total.m2)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "StripPrice",
					header: "Strip (₺)"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.StripPrice)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "StripCost",
					header: "Strip Toplam (₺)"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.StripCost)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))($data.total.cost)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "StripCostUsd",
					header: "Strip Toplam ($)"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.StripCostUsd)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.total.costUsd)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "StripWidth",
					header: "En"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.StripWidth), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "StripHeight",
					header: "Boy"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.StripHeight), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "StripThickness",
					header: "Kalınlık"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.StripThickness), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "StripPiece",
					header: "Adet"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.StripPiece), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString($data.total.piece), 1)]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col-12 col-lg-4">`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $data.moloz_list,
		class: "p-datatable-sm table-scroll-x",
		resizableColumns: true,
		columnResizeMode: "fit",
		showGridlines: "",
		selection: $data.selectedMolozData,
		"onUpdate:selection": ($event) => $data.selectedMolozData = $event,
		selectionMode: "single",
		onRowClick: ($event) => $options.molozDatatableSelected($event),
		filters: $data.filteredMoloz,
		"onUpdate:filters": ($event) => $data.filteredMoloz = $event,
		filterDisplay: "row",
		onFilter: ($event) => $options.molozFiltered($event),
		scrollable: "",
		scrollHeight: "500px"
	}, {
		header: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(`MOLOZLAR`);
			else return [createTextVNode("MOLOZLAR")];
		}),
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "Date",
					header: "Tarih",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Date))}`);
						else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Date)), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "İrsaliyeNo",
					header: "İrsaliye No",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.İrsaliyeNo)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.İrsaliyeNo), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SupplierName",
					header: "Tedarikçi Adı",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.SupplierName)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.SupplierName), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "FaturaNo",
					header: "Fatura No",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.FaturaNo)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.FaturaNo), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "QuarryName",
					header: "Ocak Adı",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.QuarryName)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.QuarryName), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "StripName",
					header: "Ürün Adı",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.StripName)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.StripName), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Ton",
					header: "Ton"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.total_moloz.ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.total_moloz.ton)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "PriceTl",
					header: "Fiyat (TL)"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.PriceTl))}`);
						else return [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.PriceTl)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "PriceUsd",
					header: "Fiyat ($)"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.PriceUsd))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.PriceUsd)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Currency",
					header: "Kur"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Currency))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Currency)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Total",
					header: "Toplam (₺)"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.Total))}`);
						else return [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.Total)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))($data.total_moloz.total))}`);
						else return [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))($data.total_moloz.total)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Total",
					header: "Toplam ($)"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.TotalUsd))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.TotalUsd)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.total_moloz.total_usd))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.total_moloz.total_usd)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "Date",
					header: "Tarih",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Date)), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "İrsaliyeNo",
					header: "İrsaliye No",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.İrsaliyeNo), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SupplierName",
					header: "Tedarikçi Adı",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.SupplierName), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "FaturaNo",
					header: "Fatura No",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.FaturaNo), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "QuarryName",
					header: "Ocak Adı",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.QuarryName), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "StripName",
					header: "Ürün Adı",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.StripName), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Ton",
					header: "Ton"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.total_moloz.ton)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "PriceTl",
					header: "Fiyat (TL)"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.PriceTl)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "PriceUsd",
					header: "Fiyat ($)"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.PriceUsd)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Currency",
					header: "Kur"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Currency)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Total",
					header: "Toplam (₺)"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.Total)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))($data.total_moloz.total)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Total",
					header: "Toplam ($)"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.TotalUsd)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.total_moloz.total_usd)), 1)]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div><div class="col-12 col-lg-4">`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $data.nakliyeList,
		class: "p-datatable-sm table-scroll-x",
		resizableColumns: true,
		columnResizeMode: "fit",
		showGridlines: "",
		selection: $data.selectedNakliye,
		"onUpdate:selection": ($event) => $data.selectedNakliye = $event,
		selectionMode: "single",
		onRowClick: ($event) => $options.nakliyeDatatableSelected($event),
		filters: $data.filteredNakliye,
		"onUpdate:filters": ($event) => $data.filteredNakliye = $event,
		filterDisplay: "row",
		onFilter: ($event) => $options.nakliyeFiltered($event),
		scrollable: "",
		scrollHeight: "500px"
	}, {
		header: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(`Nakliye`);
			else return [createTextVNode("Nakliye")];
		}),
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "Tarih",
					header: "Tarih",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih))}`);
						else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih)), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "PlakaNo",
					header: "Plaka No",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.PlakaNo)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.PlakaNo), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "İrsaliyeNo",
					header: "İrsaliye No",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.İrsaliyeNo)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.İrsaliyeNo), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "FaturaNo",
					header: "Fatura No",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.FaturaNo)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.FaturaNo), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "FirmaAdi",
					header: "Firma Adı",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.FirmaAdi)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.FirmaAdi), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "KimdenAdi",
					header: "Kimden",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(slotProps.data.KimdenAdi)}`);
						else return [createTextVNode(toDisplayString(slotProps.data.KimdenAdi), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							type: "text",
							onInput: ($event) => filterCallback(),
							class: "p-column-filter"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Ton",
					header: "Ton"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.nakliyeTotal.ton))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.nakliyeTotal.ton)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "BirimFiyatTL",
					header: "Fiyat (TL)"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.BirimFiyatTL))}`);
						else return [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.BirimFiyatTL)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "BirimFiyatDolar",
					header: "Fiyat ($)"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.BirimFiyatDolar))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.BirimFiyatDolar)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Currency",
					header: "Kur"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Kur))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Kur)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "ToplamTl",
					header: "Toplam (₺)"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.ToplamTl))}`);
						else return [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.ToplamTl)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))($data.nakliyeTotal.total_tl))}`);
						else return [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))($data.nakliyeTotal.total_tl)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "ToplamDolar",
					header: "Toplam ($)"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.ToplamDolar))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.ToplamDolar)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.nakliyeTotal.total_usd))}`);
						else return [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.nakliyeTotal.total_usd)), 1)];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "Tarih",
					header: "Tarih",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih)), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "PlakaNo",
					header: "Plaka No",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.PlakaNo), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "İrsaliyeNo",
					header: "İrsaliye No",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.İrsaliyeNo), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "FaturaNo",
					header: "Fatura No",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.FaturaNo), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "FirmaAdi",
					header: "Firma Adı",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.FirmaAdi), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "KimdenAdi",
					header: "Kimden",
					showFilterMenu: false,
					showClearButton: false
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(slotProps.data.KimdenAdi), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						type: "text",
						onInput: ($event) => filterCallback(),
						class: "p-column-filter"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Ton",
					header: "Ton"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Ton)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.nakliyeTotal.ton)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "BirimFiyatTL",
					header: "Fiyat (TL)"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.BirimFiyatTL)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "BirimFiyatDolar",
					header: "Fiyat ($)"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.BirimFiyatDolar)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Currency",
					header: "Kur"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.Kur)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "ToplamTl",
					header: "Toplam (₺)"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))(slotProps.data.ToplamTl)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceTl" in _ctx ? _ctx.formatPriceTl : unref(formatPriceTl))($data.nakliyeTotal.total_tl)), 1)]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "ToplamDolar",
					header: "Toplam ($)"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))(slotProps.data.ToplamDolar)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($data.nakliyeTotal.total_usd)), 1)]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div></div>`);
	_push(ssrRenderComponent(_component_Dialog, {
		header: $data.dialog_header,
		visible: $data.cost_supplier_dialog,
		"onUpdate:visible": ($event) => $data.cost_supplier_dialog = $event,
		modal: "",
		style: { "width": "100%" }
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(`<div class="row mt-5"${_scopeId}><div class="col-4"${_scopeId}>`);
				_push(ssrRenderComponent(_component_TcmbCurrency, {
					onDateSelectedEmit: ($event) => $options.dateSelected($event),
					onRateFetchedEmit: ($event) => $options.rateFetched($event)
				}, null, _parent, _scopeId));
				_push(`</div><div class="col-8"${_scopeId}><div class="row mt-5"${_scopeId}><div class="col-3"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_AutoComplete, {
								id: "supplier",
								modelValue: $data.selectedSupplier,
								"onUpdate:modelValue": ($event) => $data.selectedSupplier = $event,
								suggestions: $data.filteredSupplier,
								onComplete: ($event) => $options.searchSupplier($event),
								optionLabel: "FirmaAdi",
								onItemSelect: ($event) => $options.supplierSelected($event),
								onInput: ($event) => $options.supplierInput($event),
								disabled: !$data.model.currency
							}, null, _parent, _scopeId));
							_push(`<label for="supplier"${_scopeId}>Tedarikçi</label>`);
						} else return [createVNode(_component_AutoComplete, {
							id: "supplier",
							modelValue: $data.selectedSupplier,
							"onUpdate:modelValue": ($event) => $data.selectedSupplier = $event,
							suggestions: $data.filteredSupplier,
							onComplete: ($event) => $options.searchSupplier($event),
							optionLabel: "FirmaAdi",
							onItemSelect: ($event) => $options.supplierSelected($event),
							onInput: ($event) => $options.supplierInput($event),
							disabled: !$data.model.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"suggestions",
							"onComplete",
							"onItemSelect",
							"onInput",
							"disabled"
						]), createVNode("label", { for: "supplier" }, "Tedarikçi")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col-3"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_AutoComplete, {
								disabled: !$data.model.currency,
								id: "quarry",
								modelValue: $data.selectedQuarry,
								"onUpdate:modelValue": ($event) => $data.selectedQuarry = $event,
								suggestions: $data.filteredQuarry,
								onComplete: ($event) => $options.searchQuarry($event),
								optionLabel: "OcakAdi",
								onItemSelect: ($event) => $options.quarrySelected($event),
								onInput: ($event) => $options.quarryInput($event)
							}, null, _parent, _scopeId));
							_push(`<label for="quarry"${_scopeId}>Ocaklar</label>`);
						} else return [createVNode(_component_AutoComplete, {
							disabled: !$data.model.currency,
							id: "quarry",
							modelValue: $data.selectedQuarry,
							"onUpdate:modelValue": ($event) => $data.selectedQuarry = $event,
							suggestions: $data.filteredQuarry,
							onComplete: ($event) => $options.searchQuarry($event),
							optionLabel: "OcakAdi",
							onItemSelect: ($event) => $options.quarrySelected($event),
							onInput: ($event) => $options.quarryInput($event)
						}, null, 8, [
							"disabled",
							"modelValue",
							"onUpdate:modelValue",
							"suggestions",
							"onComplete",
							"onItemSelect",
							"onInput"
						]), createVNode("label", { for: "quarry" }, "Ocaklar")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col-3"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_AutoComplete, {
								disabled: !$data.model.currency,
								id: "strip",
								modelValue: $data.selectedStrip,
								"onUpdate:modelValue": ($event) => $data.selectedStrip = $event,
								suggestions: $data.filteredStrip,
								onComplete: ($event) => $options.searchStrip($event),
								optionLabel: "Strips",
								onItemSelect: ($event) => $options.stripSelected($event),
								onInput: ($event) => $options.stripInput($event)
							}, null, _parent, _scopeId));
							_push(`<label for="strip"${_scopeId}>Stripler</label>`);
						} else return [createVNode(_component_AutoComplete, {
							disabled: !$data.model.currency,
							id: "strip",
							modelValue: $data.selectedStrip,
							"onUpdate:modelValue": ($event) => $data.selectedStrip = $event,
							suggestions: $data.filteredStrip,
							onComplete: ($event) => $options.searchStrip($event),
							optionLabel: "Strips",
							onItemSelect: ($event) => $options.stripSelected($event),
							onInput: ($event) => $options.stripInput($event)
						}, null, 8, [
							"disabled",
							"modelValue",
							"onUpdate:modelValue",
							"suggestions",
							"onComplete",
							"onItemSelect",
							"onInput"
						]), createVNode("label", { for: "strip" }, "Stripler")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col-3"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_FloatLabel, null, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_InputText, {
										id: "irsaliye",
										type: "text",
										modelValue: $data.model.irsaliye_no,
										"onUpdate:modelValue": ($event) => $data.model.irsaliye_no = $event,
										disabled: !$data.model.currency
									}, null, _parent, _scopeId));
									_push(`<label for="irsaliye"${_scopeId}>İrsaliye</label>`);
								} else return [createVNode(_component_InputText, {
									id: "irsaliye",
									type: "text",
									modelValue: $data.model.irsaliye_no,
									"onUpdate:modelValue": ($event) => $data.model.irsaliye_no = $event,
									disabled: !$data.model.currency
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"disabled"
								]), createVNode("label", { for: "irsaliye" }, "İrsaliye")];
							}),
							_: 1
						}, _parent, _scopeId));
						else return [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_InputText, {
								id: "irsaliye",
								type: "text",
								modelValue: $data.model.irsaliye_no,
								"onUpdate:modelValue": ($event) => $data.model.irsaliye_no = $event,
								disabled: !$data.model.currency
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"disabled"
							]), createVNode("label", { for: "irsaliye" }, "İrsaliye")]),
							_: 1
						})];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col-3"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_InputText, {
								id: "fatura",
								type: "text",
								modelValue: $data.model.invoice,
								"onUpdate:modelValue": ($event) => $data.model.invoice = $event,
								disabled: !$data.model.currency
							}, null, _parent, _scopeId));
							_push(`<label for="fatura"${_scopeId}>Fatura No</label>`);
						} else return [createVNode(_component_InputText, {
							id: "fatura",
							type: "text",
							modelValue: $data.model.invoice,
							"onUpdate:modelValue": ($event) => $data.model.invoice = $event,
							disabled: !$data.model.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"disabled"
						]), createVNode("label", { for: "fatura" }, "Fatura No")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div></div><div class="row mt-5"${_scopeId}><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_CustomInput, {
					value: $data.model.stripM2,
					text: "Strip M2",
					onOnInput: ($event) => $data.model.stripM2 = $event,
					disabled: !$data.model.currency
				}, null, _parent, _scopeId));
				_push(`</div><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_CustomInput, {
					value: $data.model.stripPrice,
					text: "Strip Kesim Fiyatı",
					onOnInput: ($event) => $data.model.stripPrice = $event,
					disabled: !$data.model.currency
				}, null, _parent, _scopeId));
				_push(`</div><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_CustomInput, {
					value: $data.model.stripCost,
					text: "Strip Maliyet Toplam (₺)",
					onOnInput: ($event) => $data.model.stripCost = $event,
					disabled: true
				}, null, _parent, _scopeId));
				_push(`</div><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_CustomInput, {
					value: $data.model.stripCostUsd,
					text: "Strip Maliyet Toplam($)",
					onOnInput: ($event) => $data.model.stripCostUsd = $event,
					disabled: true
				}, null, _parent, _scopeId));
				_push(`</div></div><div class="row mt-5"${_scopeId}><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_CustomInput, {
					value: $data.model.stripWidth,
					text: "Strip En",
					onOnInput: ($event) => $data.model.stripWidth = $event,
					disabled: !$data.model.currency
				}, null, _parent, _scopeId));
				_push(`</div><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_CustomInput, {
					value: $data.model.stripHeight,
					text: "Strip Boy",
					onOnInput: ($event) => $data.model.stripHeight = $event,
					disabled: !$data.model.currency
				}, null, _parent, _scopeId));
				_push(`</div><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_CustomInput, {
					value: $data.model.stripThickness,
					text: "Strip Kalınlık",
					onOnInput: ($event) => $data.model.stripThickness = $event,
					disabled: !$data.model.currency
				}, null, _parent, _scopeId));
				_push(`</div><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_CustomInput, {
					value: $data.model.stripPiece,
					text: "Strip Adet",
					onOnInput: ($event) => $data.model.stripPiece = $event,
					disabled: true
				}, null, _parent, _scopeId));
				_push(`</div></div></div></div><div class="row mt-4"${_scopeId}><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_Button, {
					type: "button",
					severity: "info",
					class: "w-100",
					label: "Hesapla",
					onClick: $options.calculate
				}, null, _parent, _scopeId));
				_push(`</div><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_Button, {
					class: "w-100",
					type: "button",
					label: "Kaydet",
					disabled: $data.button_disabled_2,
					onClick: $options.process
				}, null, _parent, _scopeId));
				_push(`</div>`);
				if (!$data.new_button_status) {
					_push(`<div class="col"${_scopeId}>`);
					_push(ssrRenderComponent(_component_Button, {
						severity: "danger",
						class: "w-100",
						type: "button",
						label: "Sil",
						onClick: $options.deleteProcess
					}, null, _parent, _scopeId));
					_push(`</div>`);
				} else _push(`<!---->`);
				_push(`</div>`);
			} else return [createVNode("div", { class: "row mt-5" }, [createVNode("div", { class: "col-4" }, [createVNode(_component_TcmbCurrency, {
				onDateSelectedEmit: ($event) => $options.dateSelected($event),
				onRateFetchedEmit: ($event) => $options.rateFetched($event)
			}, null, 8, ["onDateSelectedEmit", "onRateFetchedEmit"])]), createVNode("div", { class: "col-8" }, [
				createVNode("div", { class: "row mt-5" }, [
					createVNode("div", { class: "col-3" }, [createVNode(_component_FloatLabel, null, {
						default: withCtx(() => [createVNode(_component_AutoComplete, {
							id: "supplier",
							modelValue: $data.selectedSupplier,
							"onUpdate:modelValue": ($event) => $data.selectedSupplier = $event,
							suggestions: $data.filteredSupplier,
							onComplete: ($event) => $options.searchSupplier($event),
							optionLabel: "FirmaAdi",
							onItemSelect: ($event) => $options.supplierSelected($event),
							onInput: ($event) => $options.supplierInput($event),
							disabled: !$data.model.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"suggestions",
							"onComplete",
							"onItemSelect",
							"onInput",
							"disabled"
						]), createVNode("label", { for: "supplier" }, "Tedarikçi")]),
						_: 1
					})]),
					createVNode("div", { class: "col-3" }, [createVNode(_component_FloatLabel, null, {
						default: withCtx(() => [createVNode(_component_AutoComplete, {
							disabled: !$data.model.currency,
							id: "quarry",
							modelValue: $data.selectedQuarry,
							"onUpdate:modelValue": ($event) => $data.selectedQuarry = $event,
							suggestions: $data.filteredQuarry,
							onComplete: ($event) => $options.searchQuarry($event),
							optionLabel: "OcakAdi",
							onItemSelect: ($event) => $options.quarrySelected($event),
							onInput: ($event) => $options.quarryInput($event)
						}, null, 8, [
							"disabled",
							"modelValue",
							"onUpdate:modelValue",
							"suggestions",
							"onComplete",
							"onItemSelect",
							"onInput"
						]), createVNode("label", { for: "quarry" }, "Ocaklar")]),
						_: 1
					})]),
					createVNode("div", { class: "col-3" }, [createVNode(_component_FloatLabel, null, {
						default: withCtx(() => [createVNode(_component_AutoComplete, {
							disabled: !$data.model.currency,
							id: "strip",
							modelValue: $data.selectedStrip,
							"onUpdate:modelValue": ($event) => $data.selectedStrip = $event,
							suggestions: $data.filteredStrip,
							onComplete: ($event) => $options.searchStrip($event),
							optionLabel: "Strips",
							onItemSelect: ($event) => $options.stripSelected($event),
							onInput: ($event) => $options.stripInput($event)
						}, null, 8, [
							"disabled",
							"modelValue",
							"onUpdate:modelValue",
							"suggestions",
							"onComplete",
							"onItemSelect",
							"onInput"
						]), createVNode("label", { for: "strip" }, "Stripler")]),
						_: 1
					})]),
					createVNode("div", { class: "col-3" }, [createVNode(_component_FloatLabel, null, {
						default: withCtx(() => [createVNode(_component_FloatLabel, null, {
							default: withCtx(() => [createVNode(_component_InputText, {
								id: "irsaliye",
								type: "text",
								modelValue: $data.model.irsaliye_no,
								"onUpdate:modelValue": ($event) => $data.model.irsaliye_no = $event,
								disabled: !$data.model.currency
							}, null, 8, [
								"modelValue",
								"onUpdate:modelValue",
								"disabled"
							]), createVNode("label", { for: "irsaliye" }, "İrsaliye")]),
							_: 1
						})]),
						_: 1
					})]),
					createVNode("div", { class: "col-3" }, [createVNode(_component_FloatLabel, null, {
						default: withCtx(() => [createVNode(_component_InputText, {
							id: "fatura",
							type: "text",
							modelValue: $data.model.invoice,
							"onUpdate:modelValue": ($event) => $data.model.invoice = $event,
							disabled: !$data.model.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"disabled"
						]), createVNode("label", { for: "fatura" }, "Fatura No")]),
						_: 1
					})])
				]),
				createVNode("div", { class: "row mt-5" }, [
					createVNode("div", { class: "col" }, [createVNode(_component_CustomInput, {
						value: $data.model.stripM2,
						text: "Strip M2",
						onOnInput: ($event) => $data.model.stripM2 = $event,
						disabled: !$data.model.currency
					}, null, 8, [
						"value",
						"onOnInput",
						"disabled"
					])]),
					createVNode("div", { class: "col" }, [createVNode(_component_CustomInput, {
						value: $data.model.stripPrice,
						text: "Strip Kesim Fiyatı",
						onOnInput: ($event) => $data.model.stripPrice = $event,
						disabled: !$data.model.currency
					}, null, 8, [
						"value",
						"onOnInput",
						"disabled"
					])]),
					createVNode("div", { class: "col" }, [createVNode(_component_CustomInput, {
						value: $data.model.stripCost,
						text: "Strip Maliyet Toplam (₺)",
						onOnInput: ($event) => $data.model.stripCost = $event,
						disabled: true
					}, null, 8, ["value", "onOnInput"])]),
					createVNode("div", { class: "col" }, [createVNode(_component_CustomInput, {
						value: $data.model.stripCostUsd,
						text: "Strip Maliyet Toplam($)",
						onOnInput: ($event) => $data.model.stripCostUsd = $event,
						disabled: true
					}, null, 8, ["value", "onOnInput"])])
				]),
				createVNode("div", { class: "row mt-5" }, [
					createVNode("div", { class: "col" }, [createVNode(_component_CustomInput, {
						value: $data.model.stripWidth,
						text: "Strip En",
						onOnInput: ($event) => $data.model.stripWidth = $event,
						disabled: !$data.model.currency
					}, null, 8, [
						"value",
						"onOnInput",
						"disabled"
					])]),
					createVNode("div", { class: "col" }, [createVNode(_component_CustomInput, {
						value: $data.model.stripHeight,
						text: "Strip Boy",
						onOnInput: ($event) => $data.model.stripHeight = $event,
						disabled: !$data.model.currency
					}, null, 8, [
						"value",
						"onOnInput",
						"disabled"
					])]),
					createVNode("div", { class: "col" }, [createVNode(_component_CustomInput, {
						value: $data.model.stripThickness,
						text: "Strip Kalınlık",
						onOnInput: ($event) => $data.model.stripThickness = $event,
						disabled: !$data.model.currency
					}, null, 8, [
						"value",
						"onOnInput",
						"disabled"
					])]),
					createVNode("div", { class: "col" }, [createVNode(_component_CustomInput, {
						value: $data.model.stripPiece,
						text: "Strip Adet",
						onOnInput: ($event) => $data.model.stripPiece = $event,
						disabled: true
					}, null, 8, ["value", "onOnInput"])])
				])
			])]), createVNode("div", { class: "row mt-4" }, [
				createVNode("div", { class: "col" }, [createVNode(_component_Button, {
					type: "button",
					severity: "info",
					class: "w-100",
					label: "Hesapla",
					onClick: $options.calculate
				}, null, 8, ["onClick"])]),
				createVNode("div", { class: "col" }, [createVNode(_component_Button, {
					class: "w-100",
					type: "button",
					label: "Kaydet",
					disabled: $data.button_disabled_2,
					onClick: $options.process
				}, null, 8, ["disabled", "onClick"])]),
				!$data.new_button_status ? (openBlock(), createBlock("div", {
					key: 0,
					class: "col"
				}, [createVNode(_component_Button, {
					severity: "danger",
					class: "w-100",
					type: "button",
					label: "Sil",
					onClick: $options.deleteProcess
				}, null, 8, ["onClick"])])) : createCommentVNode("", true)
			])];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_Dialog, {
		header: $data.dialog_header_moloz,
		visible: $data.cost_supplier_dialog_moloz,
		"onUpdate:visible": ($event) => $data.cost_supplier_dialog_moloz = $event,
		modal: "",
		style: { "width": "100%" }
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(`<div class="row mt-5"${_scopeId}><div class="col-4"${_scopeId}>`);
				_push(ssrRenderComponent(_component_TcmbCurrency, {
					onDateSelectedEmit: ($event) => $options.dateMolozSelected($event),
					onRateFetchedEmit: ($event) => $options.rateFetchedMoloz($event)
				}, null, _parent, _scopeId));
				_push(`</div><div class="col-8"${_scopeId}><div class="row mt-5"${_scopeId}><div class="col-4"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_AutoComplete, {
								id: "supplier",
								modelValue: $data.selectedSupplier,
								"onUpdate:modelValue": ($event) => $data.selectedSupplier = $event,
								suggestions: $data.filteredSupplier,
								onComplete: ($event) => $options.searchSupplier($event),
								optionLabel: "FirmaAdi",
								onItemSelect: ($event) => $options.supplierSelectedMoloz($event),
								onInput: ($event) => $options.supplierInputMoloz($event),
								disabled: !$data.moloz_model.currency
							}, null, _parent, _scopeId));
							_push(`<label for="supplier"${_scopeId}>Tedarikçi</label>`);
						} else return [createVNode(_component_AutoComplete, {
							id: "supplier",
							modelValue: $data.selectedSupplier,
							"onUpdate:modelValue": ($event) => $data.selectedSupplier = $event,
							suggestions: $data.filteredSupplier,
							onComplete: ($event) => $options.searchSupplier($event),
							optionLabel: "FirmaAdi",
							onItemSelect: ($event) => $options.supplierSelectedMoloz($event),
							onInput: ($event) => $options.supplierInputMoloz($event),
							disabled: !$data.moloz_model.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"suggestions",
							"onComplete",
							"onItemSelect",
							"onInput",
							"disabled"
						]), createVNode("label", { for: "supplier" }, "Tedarikçi")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col-4"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_AutoComplete, {
								disabled: !$data.moloz_model.currency,
								id: "quarry",
								modelValue: $data.selectedQuarry,
								"onUpdate:modelValue": ($event) => $data.selectedQuarry = $event,
								suggestions: $data.filteredQuarry,
								onComplete: ($event) => $options.searchQuarry($event),
								optionLabel: "OcakAdi",
								onItemSelect: ($event) => $options.quarrySelectedMoloz($event),
								onInput: ($event) => $options.quarryInputMoloz($event)
							}, null, _parent, _scopeId));
							_push(`<label for="quarry"${_scopeId}>Ocaklar</label>`);
						} else return [createVNode(_component_AutoComplete, {
							disabled: !$data.moloz_model.currency,
							id: "quarry",
							modelValue: $data.selectedQuarry,
							"onUpdate:modelValue": ($event) => $data.selectedQuarry = $event,
							suggestions: $data.filteredQuarry,
							onComplete: ($event) => $options.searchQuarry($event),
							optionLabel: "OcakAdi",
							onItemSelect: ($event) => $options.quarrySelectedMoloz($event),
							onInput: ($event) => $options.quarryInputMoloz($event)
						}, null, 8, [
							"disabled",
							"modelValue",
							"onUpdate:modelValue",
							"suggestions",
							"onComplete",
							"onItemSelect",
							"onInput"
						]), createVNode("label", { for: "quarry" }, "Ocaklar")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col-4"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_AutoComplete, {
								disabled: !$data.moloz_model.currency,
								id: "strip",
								modelValue: $data.selectedStrip,
								"onUpdate:modelValue": ($event) => $data.selectedStrip = $event,
								suggestions: $data.filteredStrip,
								onComplete: ($event) => $options.searchStrip($event),
								optionLabel: "Strips",
								onItemSelect: ($event) => $options.stripSelectedMoloz($event),
								onInput: ($event) => $options.stripInputMoloz($event)
							}, null, _parent, _scopeId));
							_push(`<label for="strip"${_scopeId}>Ürün Adı</label>`);
						} else return [createVNode(_component_AutoComplete, {
							disabled: !$data.moloz_model.currency,
							id: "strip",
							modelValue: $data.selectedStrip,
							"onUpdate:modelValue": ($event) => $data.selectedStrip = $event,
							suggestions: $data.filteredStrip,
							onComplete: ($event) => $options.searchStrip($event),
							optionLabel: "Strips",
							onItemSelect: ($event) => $options.stripSelectedMoloz($event),
							onInput: ($event) => $options.stripInputMoloz($event)
						}, null, 8, [
							"disabled",
							"modelValue",
							"onUpdate:modelValue",
							"suggestions",
							"onComplete",
							"onItemSelect",
							"onInput"
						]), createVNode("label", { for: "strip" }, "Ürün Adı")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div></div><div class="row mt-5"${_scopeId}><div class="col-4"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_InputText, {
								id: "fatura_no",
								modelValue: $data.moloz_model.fatura_no,
								"onUpdate:modelValue": ($event) => $data.moloz_model.fatura_no = $event,
								disabled: !$data.moloz_model.currency
							}, null, _parent, _scopeId));
							_push(`<label for="fatura_no"${_scopeId}>Fatura No</label>`);
						} else return [createVNode(_component_InputText, {
							id: "fatura_no",
							modelValue: $data.moloz_model.fatura_no,
							"onUpdate:modelValue": ($event) => $data.moloz_model.fatura_no = $event,
							disabled: !$data.moloz_model.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"disabled"
						]), createVNode("label", { for: "fatura_no" }, "Fatura No")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col-4"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_InputText, {
								id: "irsaliye_no",
								modelValue: $data.moloz_model.irsaliye_no,
								"onUpdate:modelValue": ($event) => $data.moloz_model.irsaliye_no = $event,
								disabled: !$data.moloz_model.currency
							}, null, _parent, _scopeId));
							_push(`<label for="irsaliye_no"${_scopeId}>İrsaliye No</label>`);
						} else return [createVNode(_component_InputText, {
							id: "irsaliye_no",
							modelValue: $data.moloz_model.irsaliye_no,
							"onUpdate:modelValue": ($event) => $data.moloz_model.irsaliye_no = $event,
							disabled: !$data.moloz_model.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"disabled"
						]), createVNode("label", { for: "irsaliye_no" }, "İrsaliye No")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div></div><div class="row mt-5"${_scopeId}><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_InputNumber, {
								modelValue: $data.moloz_model.ton,
								"onUpdate:modelValue": ($event) => $data.moloz_model.ton = $event,
								mode: "decimal",
								minFractionDigits: 2,
								maxFracionDigits: 2,
								onInput: ($event) => $options.molozTonInput($event),
								disabled: !$data.moloz_model.currency
							}, null, _parent, _scopeId));
							_push(`<label for="username"${_scopeId}>Ton</label>`);
						} else return [createVNode(_component_InputNumber, {
							modelValue: $data.moloz_model.ton,
							"onUpdate:modelValue": ($event) => $data.moloz_model.ton = $event,
							mode: "decimal",
							minFractionDigits: 2,
							maxFracionDigits: 2,
							onInput: ($event) => $options.molozTonInput($event),
							disabled: !$data.moloz_model.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput",
							"disabled"
						]), createVNode("label", { for: "username" }, "Ton")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_InputNumber, {
								id: "usd-input",
								modelValue: $data.moloz_model.price_tl,
								"onUpdate:modelValue": ($event) => $data.moloz_model.price_tl = $event,
								mode: "currency",
								currency: "TRY",
								locale: "tr-TR",
								minFractionDigits: 2,
								onInput: ($event) => $options.molozTlInput($event),
								disabled: !$data.moloz_model.currency
							}, null, _parent, _scopeId));
							_push(`<label for="username"${_scopeId}>TL</label>`);
						} else return [createVNode(_component_InputNumber, {
							id: "usd-input",
							modelValue: $data.moloz_model.price_tl,
							"onUpdate:modelValue": ($event) => $data.moloz_model.price_tl = $event,
							mode: "currency",
							currency: "TRY",
							locale: "tr-TR",
							minFractionDigits: 2,
							onInput: ($event) => $options.molozTlInput($event),
							disabled: !$data.moloz_model.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput",
							"disabled"
						]), createVNode("label", { for: "username" }, "TL")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_InputNumber, {
								id: "usd-input",
								modelValue: $data.moloz_model.price_usd,
								"onUpdate:modelValue": ($event) => $data.moloz_model.price_usd = $event,
								mode: "currency",
								minFractionDigits: 2,
								onInput: ($event) => $options.molozUsdInput($event),
								disabled: !$data.moloz_model.currency,
								currency: "USD",
								locale: "en-US"
							}, null, _parent, _scopeId));
							_push(`<label for="username"${_scopeId}>USD</label>`);
						} else return [createVNode(_component_InputNumber, {
							id: "usd-input",
							modelValue: $data.moloz_model.price_usd,
							"onUpdate:modelValue": ($event) => $data.moloz_model.price_usd = $event,
							mode: "currency",
							minFractionDigits: 2,
							onInput: ($event) => $options.molozUsdInput($event),
							disabled: !$data.moloz_model.currency,
							currency: "USD",
							locale: "en-US"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput",
							"disabled"
						]), createVNode("label", { for: "username" }, "USD")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_CustomInput, {
					value: $data.moloz_model.total,
					text: "Toplam (₺)",
					onOnInput: ($event) => $data.moloz_model.total = $event,
					disabled: true
				}, null, _parent, _scopeId));
				_push(`</div><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_CustomInput, {
					value: $data.moloz_model.total_usd,
					text: "Toplam ($)",
					onOnInput: ($event) => $data.moloz_model.total_usd = $event,
					disabled: true
				}, null, _parent, _scopeId));
				_push(`</div></div></div></div><div class="row mt-4"${_scopeId}><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_Button, {
					class: "w-100",
					type: "button",
					label: "Kaydet",
					disabled: !$data.moloz_model.currency,
					onClick: $options.processMoloz
				}, null, _parent, _scopeId));
				_push(`</div>`);
				if (!$data.new_button_status_moloz) {
					_push(`<div class="col"${_scopeId}>`);
					_push(ssrRenderComponent(_component_Button, {
						severity: "danger",
						class: "w-100",
						type: "button",
						label: "Sil",
						onClick: $options.deleteProcessMoloz
					}, null, _parent, _scopeId));
					_push(`</div>`);
				} else _push(`<!---->`);
				_push(`</div>`);
			} else return [createVNode("div", { class: "row mt-5" }, [createVNode("div", { class: "col-4" }, [createVNode(_component_TcmbCurrency, {
				onDateSelectedEmit: ($event) => $options.dateMolozSelected($event),
				onRateFetchedEmit: ($event) => $options.rateFetchedMoloz($event)
			}, null, 8, ["onDateSelectedEmit", "onRateFetchedEmit"])]), createVNode("div", { class: "col-8" }, [
				createVNode("div", { class: "row mt-5" }, [
					createVNode("div", { class: "col-4" }, [createVNode(_component_FloatLabel, null, {
						default: withCtx(() => [createVNode(_component_AutoComplete, {
							id: "supplier",
							modelValue: $data.selectedSupplier,
							"onUpdate:modelValue": ($event) => $data.selectedSupplier = $event,
							suggestions: $data.filteredSupplier,
							onComplete: ($event) => $options.searchSupplier($event),
							optionLabel: "FirmaAdi",
							onItemSelect: ($event) => $options.supplierSelectedMoloz($event),
							onInput: ($event) => $options.supplierInputMoloz($event),
							disabled: !$data.moloz_model.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"suggestions",
							"onComplete",
							"onItemSelect",
							"onInput",
							"disabled"
						]), createVNode("label", { for: "supplier" }, "Tedarikçi")]),
						_: 1
					})]),
					createVNode("div", { class: "col-4" }, [createVNode(_component_FloatLabel, null, {
						default: withCtx(() => [createVNode(_component_AutoComplete, {
							disabled: !$data.moloz_model.currency,
							id: "quarry",
							modelValue: $data.selectedQuarry,
							"onUpdate:modelValue": ($event) => $data.selectedQuarry = $event,
							suggestions: $data.filteredQuarry,
							onComplete: ($event) => $options.searchQuarry($event),
							optionLabel: "OcakAdi",
							onItemSelect: ($event) => $options.quarrySelectedMoloz($event),
							onInput: ($event) => $options.quarryInputMoloz($event)
						}, null, 8, [
							"disabled",
							"modelValue",
							"onUpdate:modelValue",
							"suggestions",
							"onComplete",
							"onItemSelect",
							"onInput"
						]), createVNode("label", { for: "quarry" }, "Ocaklar")]),
						_: 1
					})]),
					createVNode("div", { class: "col-4" }, [createVNode(_component_FloatLabel, null, {
						default: withCtx(() => [createVNode(_component_AutoComplete, {
							disabled: !$data.moloz_model.currency,
							id: "strip",
							modelValue: $data.selectedStrip,
							"onUpdate:modelValue": ($event) => $data.selectedStrip = $event,
							suggestions: $data.filteredStrip,
							onComplete: ($event) => $options.searchStrip($event),
							optionLabel: "Strips",
							onItemSelect: ($event) => $options.stripSelectedMoloz($event),
							onInput: ($event) => $options.stripInputMoloz($event)
						}, null, 8, [
							"disabled",
							"modelValue",
							"onUpdate:modelValue",
							"suggestions",
							"onComplete",
							"onItemSelect",
							"onInput"
						]), createVNode("label", { for: "strip" }, "Ürün Adı")]),
						_: 1
					})])
				]),
				createVNode("div", { class: "row mt-5" }, [createVNode("div", { class: "col-4" }, [createVNode(_component_FloatLabel, null, {
					default: withCtx(() => [createVNode(_component_InputText, {
						id: "fatura_no",
						modelValue: $data.moloz_model.fatura_no,
						"onUpdate:modelValue": ($event) => $data.moloz_model.fatura_no = $event,
						disabled: !$data.moloz_model.currency
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"disabled"
					]), createVNode("label", { for: "fatura_no" }, "Fatura No")]),
					_: 1
				})]), createVNode("div", { class: "col-4" }, [createVNode(_component_FloatLabel, null, {
					default: withCtx(() => [createVNode(_component_InputText, {
						id: "irsaliye_no",
						modelValue: $data.moloz_model.irsaliye_no,
						"onUpdate:modelValue": ($event) => $data.moloz_model.irsaliye_no = $event,
						disabled: !$data.moloz_model.currency
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"disabled"
					]), createVNode("label", { for: "irsaliye_no" }, "İrsaliye No")]),
					_: 1
				})])]),
				createVNode("div", { class: "row mt-5" }, [
					createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
						default: withCtx(() => [createVNode(_component_InputNumber, {
							modelValue: $data.moloz_model.ton,
							"onUpdate:modelValue": ($event) => $data.moloz_model.ton = $event,
							mode: "decimal",
							minFractionDigits: 2,
							maxFracionDigits: 2,
							onInput: ($event) => $options.molozTonInput($event),
							disabled: !$data.moloz_model.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput",
							"disabled"
						]), createVNode("label", { for: "username" }, "Ton")]),
						_: 1
					})]),
					createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
						default: withCtx(() => [createVNode(_component_InputNumber, {
							id: "usd-input",
							modelValue: $data.moloz_model.price_tl,
							"onUpdate:modelValue": ($event) => $data.moloz_model.price_tl = $event,
							mode: "currency",
							currency: "TRY",
							locale: "tr-TR",
							minFractionDigits: 2,
							onInput: ($event) => $options.molozTlInput($event),
							disabled: !$data.moloz_model.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput",
							"disabled"
						]), createVNode("label", { for: "username" }, "TL")]),
						_: 1
					})]),
					createVNode("div", { class: "col" }, [createVNode(_component_FloatLabel, null, {
						default: withCtx(() => [createVNode(_component_InputNumber, {
							id: "usd-input",
							modelValue: $data.moloz_model.price_usd,
							"onUpdate:modelValue": ($event) => $data.moloz_model.price_usd = $event,
							mode: "currency",
							minFractionDigits: 2,
							onInput: ($event) => $options.molozUsdInput($event),
							disabled: !$data.moloz_model.currency,
							currency: "USD",
							locale: "en-US"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput",
							"disabled"
						]), createVNode("label", { for: "username" }, "USD")]),
						_: 1
					})]),
					createVNode("div", { class: "col" }, [createVNode(_component_CustomInput, {
						value: $data.moloz_model.total,
						text: "Toplam (₺)",
						onOnInput: ($event) => $data.moloz_model.total = $event,
						disabled: true
					}, null, 8, ["value", "onOnInput"])]),
					createVNode("div", { class: "col" }, [createVNode(_component_CustomInput, {
						value: $data.moloz_model.total_usd,
						text: "Toplam ($)",
						onOnInput: ($event) => $data.moloz_model.total_usd = $event,
						disabled: true
					}, null, 8, ["value", "onOnInput"])])
				])
			])]), createVNode("div", { class: "row mt-4" }, [createVNode("div", { class: "col" }, [createVNode(_component_Button, {
				class: "w-100",
				type: "button",
				label: "Kaydet",
				disabled: !$data.moloz_model.currency,
				onClick: $options.processMoloz
			}, null, 8, ["disabled", "onClick"])]), !$data.new_button_status_moloz ? (openBlock(), createBlock("div", {
				key: 0,
				class: "col"
			}, [createVNode(_component_Button, {
				severity: "danger",
				class: "w-100",
				type: "button",
				label: "Sil",
				onClick: $options.deleteProcessMoloz
			}, null, 8, ["onClick"])])) : createCommentVNode("", true)])];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_Dialog, {
		visible: $data.nakliye_dialog_visible,
		"onUpdate:visible": ($event) => $data.nakliye_dialog_visible = $event,
		header: $data.nakliye_dialog_header,
		modal: ""
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(`<div class="row mt-1" style="${ssrRenderStyle({ "height": "400px" })}"${_scopeId}><div class="col-3"${_scopeId}>`);
				_push(ssrRenderComponent(_component_TcmbCurrency, {
					onDateSelectedEmit: ($event) => $options.dateNakliyeSelected($event),
					onRateFetchedEmit: ($event) => $options.rateFetchedNakliye($event)
				}, null, _parent, _scopeId));
				_push(`</div><div class="col-9"${_scopeId}><div class="row gap-1"${_scopeId}><div class="col-3"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_InputText, {
								class: "w-100",
								id: "plate_no",
								modelValue: $data.modelNakliye.plate_no,
								"onUpdate:modelValue": ($event) => $data.modelNakliye.plate_no = $event,
								disabled: !$data.modelNakliye.currency
							}, null, _parent, _scopeId));
							_push(`<label for="plate_no"${_scopeId}>Plaka No</label>`);
						} else return [createVNode(_component_InputText, {
							class: "w-100",
							id: "plate_no",
							modelValue: $data.modelNakliye.plate_no,
							"onUpdate:modelValue": ($event) => $data.modelNakliye.plate_no = $event,
							disabled: !$data.modelNakliye.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"disabled"
						]), createVNode("label", { for: "plate_no" }, "Plaka No")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col-3"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_InputText, {
								class: "w-100",
								id: "document_no",
								modelValue: $data.modelNakliye.document_no,
								"onUpdate:modelValue": ($event) => $data.modelNakliye.document_no = $event,
								disabled: !$data.modelNakliye.currency
							}, null, _parent, _scopeId));
							_push(`<label for="document_no"${_scopeId}>İrsaliye No</label>`);
						} else return [createVNode(_component_InputText, {
							class: "w-100",
							id: "document_no",
							modelValue: $data.modelNakliye.document_no,
							"onUpdate:modelValue": ($event) => $data.modelNakliye.document_no = $event,
							disabled: !$data.modelNakliye.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"disabled"
						]), createVNode("label", { for: "document_no" }, "İrsaliye No")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col-3"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_InputText, {
								class: "w-100",
								id: "invoice_no",
								modelValue: $data.modelNakliye.invoice_no,
								"onUpdate:modelValue": ($event) => $data.modelNakliye.invoice_no = $event,
								disabled: !$data.modelNakliye.currency
							}, null, _parent, _scopeId));
							_push(`<label for="invoice_no"${_scopeId}>Fatura No</label>`);
						} else return [createVNode(_component_InputText, {
							class: "w-100",
							id: "invoice_no",
							modelValue: $data.modelNakliye.invoice_no,
							"onUpdate:modelValue": ($event) => $data.modelNakliye.invoice_no = $event,
							disabled: !$data.modelNakliye.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"disabled"
						]), createVNode("label", { for: "invoice_no" }, "Fatura No")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col-3"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_AutoComplete, {
								id: "supplier",
								modelValue: $data.selectedNakliyeFirma,
								"onUpdate:modelValue": ($event) => $data.selectedNakliyeFirma = $event,
								suggestions: $data.filteredNakliyeFirma,
								onComplete: ($event) => $options.searchNakliyeFirma($event),
								optionLabel: "FirmaAdi",
								onItemSelect: ($event) => $options.nakliyeSelectedFirma($event),
								onInput: ($event) => $options.supplierInputFirma($event),
								disabled: !$data.modelNakliye.currency
							}, null, _parent, _scopeId));
							_push(`<label for="supplier"${_scopeId}>Firma</label>`);
						} else return [createVNode(_component_AutoComplete, {
							id: "supplier",
							modelValue: $data.selectedNakliyeFirma,
							"onUpdate:modelValue": ($event) => $data.selectedNakliyeFirma = $event,
							suggestions: $data.filteredNakliyeFirma,
							onComplete: ($event) => $options.searchNakliyeFirma($event),
							optionLabel: "FirmaAdi",
							onItemSelect: ($event) => $options.nakliyeSelectedFirma($event),
							onInput: ($event) => $options.supplierInputFirma($event),
							disabled: !$data.modelNakliye.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"suggestions",
							"onComplete",
							"onItemSelect",
							"onInput",
							"disabled"
						]), createVNode("label", { for: "supplier" }, "Firma")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col-3"${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_AutoComplete, {
								id: "supplier",
								modelValue: $data.selectedNakliyeKimden,
								"onUpdate:modelValue": ($event) => $data.selectedNakliyeKimden = $event,
								suggestions: $data.filteredNakliyeKimden,
								onComplete: ($event) => $options.searchNakliyeKimden($event),
								optionLabel: "KimdenAdi",
								onItemSelect: ($event) => $options.nakliyeSelectedKimden($event),
								onInput: ($event) => $options.supllierInputKimden($event),
								disabled: !$data.modelNakliye.currency
							}, null, _parent, _scopeId));
							_push(`<label for="supplier"${_scopeId}>Kimden</label>`);
						} else return [createVNode(_component_AutoComplete, {
							id: "supplier",
							modelValue: $data.selectedNakliyeKimden,
							"onUpdate:modelValue": ($event) => $data.selectedNakliyeKimden = $event,
							suggestions: $data.filteredNakliyeKimden,
							onComplete: ($event) => $options.searchNakliyeKimden($event),
							optionLabel: "KimdenAdi",
							onItemSelect: ($event) => $options.nakliyeSelectedKimden($event),
							onInput: ($event) => $options.supllierInputKimden($event),
							disabled: !$data.modelNakliye.currency
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"suggestions",
							"onComplete",
							"onItemSelect",
							"onInput",
							"disabled"
						]), createVNode("label", { for: "supplier" }, "Kimden")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col-3"${_scopeId}>`);
				_push(ssrRenderComponent(_component_CustomInput, {
					value: $data.modelNakliye.ton,
					text: "Ton",
					onOnInput: ($event) => $data.modelNakliye.ton = $event,
					disabled: !$data.modelNakliye.currency
				}, null, _parent, _scopeId));
				_push(`</div><div class="col-3"${_scopeId}>`);
				_push(ssrRenderComponent(_component_CustomInput, {
					value: $data.modelNakliye.price_tl,
					text: "Fiyat (₺)",
					onOnInput: ($event) => $data.modelNakliye.price_tl = $event,
					disabled: !$data.modelNakliye.currency
				}, null, _parent, _scopeId));
				_push(`</div><div class="col-3"${_scopeId}>`);
				_push(ssrRenderComponent(_component_CustomInput, {
					value: $data.modelNakliye.price_usd,
					text: "Fiyat ($)",
					onOnInput: ($event) => $data.modelNakliye.price_usd = $event,
					disabled: true
				}, null, _parent, _scopeId));
				_push(`</div><div class="col-3"${_scopeId}>`);
				_push(ssrRenderComponent(_component_CustomInput, {
					value: $data.modelNakliye.total_tl,
					text: "Toplam (₺)",
					onOnInput: ($event) => $data.modelNakliye.total_tl = $event,
					disabled: true
				}, null, _parent, _scopeId));
				_push(`</div><div class="col-3"${_scopeId}>`);
				_push(ssrRenderComponent(_component_CustomInput, {
					value: $data.modelNakliye.total_usd,
					text: "Toplam ($)",
					onOnInput: ($event) => $data.modelNakliye.total_usd = $event,
					disabled: true
				}, null, _parent, _scopeId));
				_push(`</div></div><div class="row"${_scopeId}><div class="col-4"${_scopeId}>`);
				_push(ssrRenderComponent(_component_Button, {
					severity: "secondary",
					class: "w-100",
					type: "button",
					label: "Hesapla",
					onClick: $options.calculateNakliyeUsdTl,
					disabled: !$data.modelNakliye.currency
				}, null, _parent, _scopeId));
				_push(`</div><div class="${ssrRenderClass($data.new_button_status_nakliye ? "col-6" : "col-4")}"${_scopeId}>`);
				_push(ssrRenderComponent(_component_Button, {
					class: "w-100",
					severity: $data.new_button_status_nakliye ? "success" : "warn",
					type: "button",
					label: $data.new_button_status_nakliye ? "Kaydet" : "Güncelle",
					disabled: !$data.modelNakliye.currency,
					onClick: $options.processNakliye,
					loading: $data.nakliye_save_button_loading
				}, null, _parent, _scopeId));
				_push(`</div>`);
				if (!$data.new_button_status_nakliye) {
					_push(`<div class="col-4"${_scopeId}>`);
					_push(ssrRenderComponent(_component_Button, {
						severity: "danger",
						class: "w-100",
						type: "button",
						label: "Sil",
						onClick: $options.deleteNakliye,
						loading: $data.nakliye_delete_button_loading
					}, null, _parent, _scopeId));
					_push(`</div>`);
				} else _push(`<!---->`);
				_push(`</div></div></div>`);
			} else return [createVNode("div", {
				class: "row mt-1",
				style: { "height": "400px" }
			}, [createVNode("div", { class: "col-3" }, [createVNode(_component_TcmbCurrency, {
				onDateSelectedEmit: ($event) => $options.dateNakliyeSelected($event),
				onRateFetchedEmit: ($event) => $options.rateFetchedNakliye($event)
			}, null, 8, ["onDateSelectedEmit", "onRateFetchedEmit"])]), createVNode("div", { class: "col-9" }, [createVNode("div", { class: "row gap-1" }, [
				createVNode("div", { class: "col-3" }, [createVNode(_component_FloatLabel, null, {
					default: withCtx(() => [createVNode(_component_InputText, {
						class: "w-100",
						id: "plate_no",
						modelValue: $data.modelNakliye.plate_no,
						"onUpdate:modelValue": ($event) => $data.modelNakliye.plate_no = $event,
						disabled: !$data.modelNakliye.currency
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"disabled"
					]), createVNode("label", { for: "plate_no" }, "Plaka No")]),
					_: 1
				})]),
				createVNode("div", { class: "col-3" }, [createVNode(_component_FloatLabel, null, {
					default: withCtx(() => [createVNode(_component_InputText, {
						class: "w-100",
						id: "document_no",
						modelValue: $data.modelNakliye.document_no,
						"onUpdate:modelValue": ($event) => $data.modelNakliye.document_no = $event,
						disabled: !$data.modelNakliye.currency
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"disabled"
					]), createVNode("label", { for: "document_no" }, "İrsaliye No")]),
					_: 1
				})]),
				createVNode("div", { class: "col-3" }, [createVNode(_component_FloatLabel, null, {
					default: withCtx(() => [createVNode(_component_InputText, {
						class: "w-100",
						id: "invoice_no",
						modelValue: $data.modelNakliye.invoice_no,
						"onUpdate:modelValue": ($event) => $data.modelNakliye.invoice_no = $event,
						disabled: !$data.modelNakliye.currency
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"disabled"
					]), createVNode("label", { for: "invoice_no" }, "Fatura No")]),
					_: 1
				})]),
				createVNode("div", { class: "col-3" }, [createVNode(_component_FloatLabel, null, {
					default: withCtx(() => [createVNode(_component_AutoComplete, {
						id: "supplier",
						modelValue: $data.selectedNakliyeFirma,
						"onUpdate:modelValue": ($event) => $data.selectedNakliyeFirma = $event,
						suggestions: $data.filteredNakliyeFirma,
						onComplete: ($event) => $options.searchNakliyeFirma($event),
						optionLabel: "FirmaAdi",
						onItemSelect: ($event) => $options.nakliyeSelectedFirma($event),
						onInput: ($event) => $options.supplierInputFirma($event),
						disabled: !$data.modelNakliye.currency
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"suggestions",
						"onComplete",
						"onItemSelect",
						"onInput",
						"disabled"
					]), createVNode("label", { for: "supplier" }, "Firma")]),
					_: 1
				})]),
				createVNode("div", { class: "col-3" }, [createVNode(_component_FloatLabel, null, {
					default: withCtx(() => [createVNode(_component_AutoComplete, {
						id: "supplier",
						modelValue: $data.selectedNakliyeKimden,
						"onUpdate:modelValue": ($event) => $data.selectedNakliyeKimden = $event,
						suggestions: $data.filteredNakliyeKimden,
						onComplete: ($event) => $options.searchNakliyeKimden($event),
						optionLabel: "KimdenAdi",
						onItemSelect: ($event) => $options.nakliyeSelectedKimden($event),
						onInput: ($event) => $options.supllierInputKimden($event),
						disabled: !$data.modelNakliye.currency
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"suggestions",
						"onComplete",
						"onItemSelect",
						"onInput",
						"disabled"
					]), createVNode("label", { for: "supplier" }, "Kimden")]),
					_: 1
				})]),
				createVNode("div", { class: "col-3" }, [createVNode(_component_CustomInput, {
					value: $data.modelNakliye.ton,
					text: "Ton",
					onOnInput: ($event) => $data.modelNakliye.ton = $event,
					disabled: !$data.modelNakliye.currency
				}, null, 8, [
					"value",
					"onOnInput",
					"disabled"
				])]),
				createVNode("div", { class: "col-3" }, [createVNode(_component_CustomInput, {
					value: $data.modelNakliye.price_tl,
					text: "Fiyat (₺)",
					onOnInput: ($event) => $data.modelNakliye.price_tl = $event,
					disabled: !$data.modelNakliye.currency
				}, null, 8, [
					"value",
					"onOnInput",
					"disabled"
				])]),
				createVNode("div", { class: "col-3" }, [createVNode(_component_CustomInput, {
					value: $data.modelNakliye.price_usd,
					text: "Fiyat ($)",
					onOnInput: ($event) => $data.modelNakliye.price_usd = $event,
					disabled: true
				}, null, 8, ["value", "onOnInput"])]),
				createVNode("div", { class: "col-3" }, [createVNode(_component_CustomInput, {
					value: $data.modelNakliye.total_tl,
					text: "Toplam (₺)",
					onOnInput: ($event) => $data.modelNakliye.total_tl = $event,
					disabled: true
				}, null, 8, ["value", "onOnInput"])]),
				createVNode("div", { class: "col-3" }, [createVNode(_component_CustomInput, {
					value: $data.modelNakliye.total_usd,
					text: "Toplam ($)",
					onOnInput: ($event) => $data.modelNakliye.total_usd = $event,
					disabled: true
				}, null, 8, ["value", "onOnInput"])])
			]), createVNode("div", { class: "row" }, [
				createVNode("div", { class: "col-4" }, [createVNode(_component_Button, {
					severity: "secondary",
					class: "w-100",
					type: "button",
					label: "Hesapla",
					onClick: $options.calculateNakliyeUsdTl,
					disabled: !$data.modelNakliye.currency
				}, null, 8, ["onClick", "disabled"])]),
				createVNode("div", { class: $data.new_button_status_nakliye ? "col-6" : "col-4" }, [createVNode(_component_Button, {
					class: "w-100",
					severity: $data.new_button_status_nakliye ? "success" : "warn",
					type: "button",
					label: $data.new_button_status_nakliye ? "Kaydet" : "Güncelle",
					disabled: !$data.modelNakliye.currency,
					onClick: $options.processNakliye,
					loading: $data.nakliye_save_button_loading
				}, null, 8, [
					"severity",
					"label",
					"disabled",
					"onClick",
					"loading"
				])], 2),
				!$data.new_button_status_nakliye ? (openBlock(), createBlock("div", {
					key: 0,
					class: "col-4"
				}, [createVNode(_component_Button, {
					severity: "danger",
					class: "w-100",
					type: "button",
					label: "Sil",
					onClick: $options.deleteNakliye,
					loading: $data.nakliye_delete_button_loading
				}, null, 8, ["onClick", "loading"])])) : createCommentVNode("", true)
			])])])];
		}),
		_: 1
	}, _parent));
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reports/mekmer/strips.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var strips_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { strips_default as default };
//# sourceMappingURL=strips-BMLfRXZf.mjs.map
