import { _ as _plugin_vue_export_helper_default, u as useCookie, c as dateToString, a as useAppToast, F as FilterMatchMode, j as formatDecimal2, f as formatDecimal } from '../virtual/entry.mjs';
import { n as script$5 } from './button-C8Z7Yc79.mjs';
import { n as script$b } from './column-CT6GXkG2.mjs';
import { n as script$a } from './datatable-D6ou7HZJ.mjs';
import { n as script$4 } from './inputtext-s6cxdqDx.mjs';
import { n as script$8 } from './checkbox-wtvrQjx7.mjs';
import { n as script$7 } from './radiobutton-C-685P7O.mjs';
import { n as script$3 } from './autocomplete-5Wwvp4c8.mjs';
import { t as script$9 } from './textarea-DHWHHqLi.mjs';
import { n as script$2 } from './floatlabel-BDqo8RCT.mjs';
import { f as fromIsoDate, t as toIsoDate } from './dates-C-BBx50j.mjs';
import { n as script } from './dialog-BB6no0wu.mjs';
import { u as useLegacyApi } from './useLegacyApi-B5zRc7ig.mjs';
import { u as useSharedStore } from './shared-D6MCKVW0.mjs';
import { u as useSocketStore } from './socket-AbqLYDWT.mjs';
import { u as useReferenceData } from './useReferenceData-DTHP3Dno.mjs';
import { e as exportExcel } from './useExcelExport-B-DCkvaR.mjs';
import { n as script$6 } from './calendar-CGZX0OKk.mjs';
import { n as script$1 } from './dropdown-GGCf3ofb.mjs';
import { u as useOrderStore } from './order-C0FMsqTx.mjs';
import { u as useRealtime, C as Cards_default } from './Cards-D_Ydl_4N.mjs';
import { u as useSelectionStore } from './selection-DbHVNc2X.mjs';
import { withAsyncContext, mergeProps, withCtx, createVNode, toDisplayString, unref, createTextVNode, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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
import './select-T8LIeBQG.mjs';
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
import './inputnumber-DEH2bm5F.mjs';
import './angledown-DbnE05CF.mjs';
import './angleup-Bp9xicZh.mjs';
import './angleright-DC6YOV01.mjs';
import './chevronright-DpreV3r3.mjs';
import './bars-DE1IUcnH.mjs';
import './plus-CA09jZgn.mjs';
import './focustrap-kXXT0pga.mjs';
import './sortamountupalt-MmmjHcOR.mjs';
import './minus-C71kU5yE.mjs';
import './chip--BHyxaU9.mjs';
import './timescircle-0itGCn-i.mjs';
import './utils-9fKJJYP7.mjs';
import './useApi-CGFzrxZs.mjs';
import './datepicker-BGpmmzow.mjs';
import './chevronleft-Dy82Mung.mjs';
import './chevronup-CFGDy7zv.mjs';
import './models-CeLtEMS4.mjs';

//#region app/components/selection/input/Panel.vue
var _sfc_main$3 = {
	computed: {
		selectionStore() {
			return useSelectionStore();
		},
		orderStore() {
			return useOrderStore();
		}
	},
	props: { productionTotal: {
		type: Object,
		required: true
	} },
	data() {
		return {
			selectedProduct: {},
			product_list: [],
			bulk_edit_update_button_status: true,
			filteredOrdersPo: null,
			selectedPo: null,
			ordersPo: [],
			filters2: {
				KasaNo: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				Tarih: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				KategoriAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				OcakAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				UrunAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				YuzeyIslemAdi: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				En: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				Boy: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				Kenar: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				SiparisAciklama: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				Aciklama: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				Adet: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				KutuAdet: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				},
				Miktar: {
					value: null,
					matchMode: FilterMatchMode.STARTS_WITH
				}
			},
			selectedBulkProducts: [],
			add_bulk_crate_dialog_status: false,
			selection_orders_disabled: true,
			boxCrateTicket: null,
			code: null,
			etiketlerVeikKutu: [
				{
					code: "SNS01",
					urun: "MINA RUSTIC KENARI KIRIK (SNS01)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SNS01.doc"
				},
				{
					code: "SNS02",
					urun: "MINA RUSTIC DÜZ KENAR (SNS02)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SNS02.doc"
				},
				{
					code: "SBR01",
					urun: "SILVER RUSTIC KENARI KIRIK (SBR01)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SBR01.doc"
				},
				{
					code: "SBR02",
					urun: "SILVER RUSTIC DÜZ KENAR (SBR02)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SBR02.doc"
				},
				{
					code: "SBY01",
					urun: "ELA KENARI KIRIK (SBY01)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SBY01.doc"
				},
				{
					code: "SBY02",
					urun: "ELA DÜZ KENAR (SBY02)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SBY02.doc"
				},
				{
					code: "SBS01",
					urun: "PICASSO KENARI KIRIK (SBS01)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SBS01.doc"
				},
				{
					code: "SBS02",
					urun: "PICASSO DÜZ KENAR (SBS02)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SBS02.doc"
				},
				{
					code: "VKGD-SNS",
					urun: "CLASSIC VEIN CUT DÜZ KENAR (VKGD-SNS)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SNS01.doc"
				},
				{
					code: "VKCS-FM01",
					urun: "GOLD (VKCS-FM01)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SNS01.doc"
				},
				{
					code: "VKCS-FM02",
					urun: "SILVER (VKCS-FM02)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SNS01.doc"
				},
				{
					code: "STS01",
					urun: "IVORY RUSTİC (STS01)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SNS01.doc"
				}
			],
			etiketlerNovaKutu: [
				{
					code: "FP-01",
					urun: "SCABOS KENARI KIRIK (FP-01)"
				},
				{
					code: "FP-02",
					urun: "PICASSO KENARI KIRIK (FP-02)"
				},
				{
					code: "FP-03",
					urun: "IVORY RUSTIC KENARI KIRIK (FP-03)"
				},
				{
					code: "FP-04",
					urun: "CLASSIC MINA KENARI KIRIK (FP-04)"
				},
				{
					code: "FP-05",
					urun: "GOLDEN INK KENARI KIRIK (FP-05)"
				},
				{
					code: "FP-06",
					urun: "BAOMIX KENARI KIRIK (FP-06)"
				},
				{
					code: "FP-07",
					urun: "MINA RUSTIC KENARI KIRIK (FP-07)"
				},
				{
					code: "FP-08",
					urun: "VANILLA BEIGE KENARI KIRIK (FP-08)"
				},
				{
					code: "FP-09",
					urun: "ELA KENARI KIRIK (FP-09)"
				},
				{
					code: "FP-10",
					urun: "SILVER RUSTIC KENARI KIRIK (FP-10)"
				}
			],
			etiketlerVeikKasa: [
				{
					code: "SNS-01-K",
					urun: "MINA RUSTIC KENARI KIRIK (SNS01)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SNS-01-K.doc"
				},
				{
					code: "SNS-02-K",
					urun: "MINA RUSTIC DÜZ KENAR (SNS02)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SNS-02-K.doc"
				},
				{
					code: "SBR-01-K",
					urun: "SILVER RUSTIC KENARI KIRIK (SBR01)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SBR-01-K.doc"
				},
				{
					code: "SBR-02-K",
					urun: "SILVER RUSTIC DÜZ KENAR (SBR02)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SBR-02-K.doc"
				},
				{
					code: "SBY-01-K",
					urun: "ELA KENARI KIRIK (SBY01)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SBY-01-K.doc"
				},
				{
					code: "SBY-02-K",
					urun: "ELA DÜZ KENAR (SBY02)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SBY-02-K.doc"
				},
				{
					code: "SBS-01-K",
					urun: "PICASSO KENARI KIRIK (SBS01)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SBS-01-K.doc"
				},
				{
					code: "SBS-02-K",
					urun: "PICASSO DÜZ KENAR (SBS02)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SBS-02-K.doc"
				},
				{
					code: "ST-450-K",
					urun: "MINA RUSTIC DÜZ KENAR (ST-450)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/ST-450-K.doc"
				},
				{
					code: "ST-448-K",
					urun: "SILVER RUSTIC DÜZ KENAR (ST-448)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/ST-448-K.doc"
				},
				{
					code: "VKGD-SNS-K",
					urun: "CLASSIC VEIN CUT DÜZ KENAR (VKGD-SNS)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/VKGD-SNS-K.doc"
				},
				{
					code: "VKCS-FM01-K",
					urun: "GOLD (VKCS-FM01)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/VKCS-FM01-K.doc"
				},
				{
					code: "VKCS-FM02-K",
					urun: "SILVER (VKCS-FM02)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/VKCS-FM02-K.doc"
				},
				{
					code: "STS-01-K",
					urun: "IVORY RUSTIC (STS01)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/STS-01-K.doc"
				},
				{
					code: "SAS01",
					urun: "ELA MOSAIC (SAS01)",
					link: "https://file-service.mekmar.com/file/download/etiket/1/SAS01.doc"
				},
				{
					code: "SBR-01-1",
					urun: "SILVER MINI PATTERN (SBR-01-1)",
					link: "https://cdn.mekmarimage.com/etiket/SBR-01-1.doc"
				},
				{
					code: "SBY-02-1",
					urun: "ELA MINI PATTERN (SBY-02-1)",
					link: "https://cdn.mekmarimage.com/etiket/SBY-02-1.doc"
				},
				{
					code: "ST448-1",
					urun: "Silver 15,25x30,5 Unfilled Brushed (ST448-1)",
					link: "https://cdn.mekmarimage.com/etiket/ST448-1.doc"
				},
				{
					code: "ST450-1",
					urun: "Mina Rustic 15,25x30,5 Unfilled Brushed (ST450-1)",
					link: "https://cdn.mekmarimage.com/etiket/ST450-1.doc"
				}
			],
			etiketlerNovaKasa: [
				{
					code: "FP-01-K",
					urun: "SCABOS KENARI KIRIK (FP-01)"
				},
				{
					code: "FP-02-K",
					urun: "PICASSO KENARI KIRIK (FP-02)"
				},
				{
					code: "FP-03-K",
					urun: "IVORY RUSTIC KENARI KIRIK (FP-03)"
				},
				{
					code: "FP-04-K",
					urun: "CLASSIC MINA KENARI KIRIK (FP-04)"
				},
				{
					code: "FP-05-K",
					urun: "GOLDEN INK KENARI KIRIK (FP-05)"
				},
				{
					code: "FP-06-K",
					urun: "BAOMIX KENARI KIRIK (FP-06)"
				},
				{
					code: "FP-07-K",
					urun: "MINA RUSTIC KENARI KIRIK (FP-07)"
				},
				{
					code: "FP-08-K",
					urun: "VANILLA BEIGE KENARI KIRIK (FP-08)"
				},
				{
					code: "FP-09-K",
					urun: "ELA KENARI KIRIK (FP-09)"
				},
				{
					code: "FP-10-K",
					urun: "SILVER RUSTIC KENARI KIRIK (FP-10)"
				}
			],
			selectedVeikBox: null,
			selectedVeikCrate: null,
			selectedNovaBox: null,
			selectedNovaCrate: null,
			isEfeTicketForm: true,
			ticketLink: null,
			selectedEfeTicket: null,
			efeTickets: [
				{
					name: "12x24",
					link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2012x24.docx"
				},
				{
					name: "16x16",
					link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2016x16.docx"
				},
				{
					name: "16x24",
					link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2016x24.docx"
				},
				{
					name: "18x18",
					link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2018x18.docx"
				},
				{
					name: "Pattern Set",
					link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%20set.docx"
				}
			],
			excelColumnsField: [
				{
					label: "Kasa No",
					field: "KasaNo"
				},
				{
					label: "Ocak Adı",
					field: "OcakAdi"
				},
				{
					label: "Firma Adı",
					field: "FirmaAdi"
				},
				{
					label: "Kategori",
					field: "KategoriAdi"
				},
				{
					label: "Urun",
					field: "UrunAdi"
				},
				{
					label: "Yuzey",
					field: "YuzeyIslemAdi"
				},
				{
					label: "En",
					field: "En"
				},
				{
					label: "Boy",
					field: "Boy"
				},
				{
					label: "Kenar",
					field: "Kenar"
				},
				{
					label: "Kutu Adet",
					field: "KutuAdet"
				},
				{
					label: "Kutu Ici Adet",
					field: "KutuIciAdet"
				},
				{
					label: "Adet",
					field: "Adet"
				},
				{
					label: "Miktar",
					field: "Miktar",
					dataFormat: this.formatDecimal
				},
				{
					label: "Ürün Birim",
					field: "UrunBirimAdi"
				},
				{
					label: "Po",
					field: "SiparisAciklama"
				},
				{
					label: "Açıklama",
					field: "Aciklama"
				}
			],
			ticketDate: /* @__PURE__ */ new Date(),
			selectedCity: null,
			cities: [],
			selectionListExcelFields: {
				"Kasa No": "KasaNo",
				"Ocak Adı": "OcakAdi",
				"Firma Adı": "FirmaAdi",
				Kategori: "KategoriAdi",
				Urun: "UrunAdi",
				Yuzey: "YuzeyIslemAdi",
				En: "En",
				Boy: "Boy",
				Kenar: "Kenar",
				"Kutu Adet": "KutuAdet",
				"Kutu Ici Adet": "KutuIciAdet",
				Adet: "Adet",
				Miktar: "Miktar",
				"Ürün Birim": "UrunBirimAdi",
				Po: "SiparisAciklama",
				Açıklama: "Aciklama"
			},
			json_meta: [[{
				key: "charset",
				value: "utf-8"
			}]]
		};
	},
	async mounted() {
		this.orderStore.setOrderProductionMekmerList().then((res) => {
			if (res) this.selection_orders_disabled = false;
		});
		try {
			const api = useLegacyApi();
			this.ordersPo = (await api.get("/orders")).data.orders ?? [];
		} catch (err) {
			console.error("/orders cekilemedi:", err);
		}
	},
	methods: {
		productSelected() {
			this.bulk_edit_update_button_status = false;
		},
		async ordersPoSelected(event) {
			try {
				const product = await useLegacyApi().get(`/order/products/normal/${event.value.SiparisNo}`);
				this.product_list = product.data.products ?? [];
			} catch (err) {
				console.error("ordersPoSelected basarisiz:", err);
			}
		},
		searchOrdersPo(event) {
			const query = event.query?.toLowerCase();
			this.filteredOrdersPo = !query ? [...this.ordersPo] : this.ordersPo.filter((order) => order.SiparisNo.toLowerCase().includes(query));
		},
		async update() {
			if (confirm("Are you sure you want to update the selected crates?")) {
				const data = {
					po: this.selectedPo.SiparisNo,
					crates: this.selectedBulkProducts,
					product_id: this.selectedProduct.UrunKartId
				};
				const toast = useAppToast();
				try {
					await useLegacyApi().put("/selection/input/bulk/edit", data);
					this.selectedBulkProducts = [];
					this.add_bulk_crate_dialog_status = false;
					this.orderStore.setOrderProductionMekmerList();
					toast.success("Success");
				} catch (err) {
					console.error("bulk edit basarisiz:", err);
					toast.error("Error");
				}
			}
		},
		async ticket_click_excel() {
			try {
				await exportExcel("/excel-api/selection/labels", this.selectionStore.getFilteredSelectionList, "seleksiyon_etiket.xlsx");
			} catch (err) {
				console.error("seleksiyon etiket ciktisi basarisiz:", err);
				useAppToast().error("Excel olusturulamadi.");
			}
		},
		async selection_click_excel() {
			try {
				await exportExcel("/excel-api/selection/output", this.selectionStore.getProductList, "selection.xlsx");
			} catch (err) {
				console.error("seleksiyon excel ciktisi basarisiz:", err);
				useAppToast().error("Excel olusturulamadi.");
			}
		},
		async orders_click_excel() {
			try {
				await exportExcel("/excel-api/orders/uretim", this.orderStore.getOrderList, "Uretim_list.xlsx");
			} catch (err) {
				console.error("uretim listesi ciktisi basarisiz:", err);
				useAppToast().error("Excel olusturulamadi.");
			}
		},
		isDropDownChange(event) {
			this.code = event.value.code;
			this.boxCrateTicket = event.value.link;
		},
		downloadEfeTicket(event) {
			this.isEfeTicketForm = false;
			this.ticketLink = event.value.link;
		},
		newForm() {
			this.selectionStore.setSelectionProductionButtonStatus(true);
			this.$emit("selection_production_dialog", true);
		},
		formatDecimal(value) {
			if (value === null || value === void 0 || value === "") return "";
			const n = Number(value);
			if (Number.isNaN(n)) return "";
			return n.toFixed(2).replace(".", ",");
		}
	}
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_Button = script$5;
	const _component_Dropdown = script$1;
	const _component_Dialog = script;
	const _component_FloatLabel = script$2;
	const _component_AutoComplete = script$3;
	const _component_DataTable = script$a;
	const _component_Column = script$b;
	const _component_InputText = script$4;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "row" }, _attrs))} data-v-1c7deef4><div class="col-4" data-v-1c7deef4><table class="table" data-v-1c7deef4><thead data-v-1c7deef4><tr data-v-1c7deef4><th scope="col" data-v-1c7deef4>Producer</th><th scope="col" data-v-1c7deef4>Month (SQM)</th><th scope="col" data-v-1c7deef4>Month (PCS)</th><th scope="col" data-v-1c7deef4>Month (MT)</th><th scope="col" data-v-1c7deef4>Year (SQM)</th><th scope="col" data-v-1c7deef4>Year (PCS)</th><th scope="col" data-v-1c7deef4>Year (MT)</th></tr></thead><tbody data-v-1c7deef4><tr data-v-1c7deef4><th data-v-1c7deef4>Mekmer</th><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.mekmerMonthSqm))}</td><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.mekmerMonthPcs))}</td><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.mekmerMonthMt))}</td><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.mekmerYearSqm))}</td><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.mekmerYearPcs))}</td><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.mekmerYearMt))}</td></tr><tr data-v-1c7deef4><th data-v-1c7deef4>Mekmoz</th><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.mekmozMonthSqm))}</td><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.mekmozMonthPcs))}</td><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.mekmozMonthMt))}</td><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.mekmozYearSqm))}</td><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.mekmozYearPcs))}</td><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.mekmozYearMt))}</td></tr><tr data-v-1c7deef4><th data-v-1c7deef4>External Crates</th><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.disMonthSqm))}</td><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.disMonthPcs))}</td><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.disMonthMt))}</td><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.disYearSqm))}</td><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.disYearPcs))}</td><td data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.disYearMt))}</td></tr><tr data-v-1c7deef4><th data-v-1c7deef4>Total</th><td data-v-1c7deef4><b data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.monthTotalSqm))}</b></td><td data-v-1c7deef4><b data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.monthTotalPcs))}</b></td><td data-v-1c7deef4><b data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.monthTotalMt))}</b></td><td data-v-1c7deef4><b data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.yearTotalSqm))}</b></td><td data-v-1c7deef4><b data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.yearTotalPcs))}</b></td><td data-v-1c7deef4><b data-v-1c7deef4>${ssrInterpolate($options.formatDecimal($props.productionTotal.yearTotalMt))}</b></td></tr></tbody></table></div><div class="col-1" data-v-1c7deef4>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "success",
		class: "w-100 mb-2",
		label: "New",
		onClick: $options.newForm
	}, null, _parent));
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "secondary",
		class: "w-100",
		label: "Bulk Edit",
		onClick: ($event) => $data.add_bulk_crate_dialog_status = !$data.add_bulk_crate_dialog_status
	}, null, _parent));
	_push(`</div><div class="col-1" data-v-1c7deef4>`);
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "primary",
		class: "w-100 mb-2",
		label: "Mekmer",
		onClick: ($event) => _ctx.$emit("products_status_selected", 1)
	}, null, _parent));
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "secondary",
		class: "w-100 mb-2",
		label: "External Crates",
		onClick: ($event) => _ctx.$emit("products_status_selected", 2)
	}, null, _parent));
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "warn",
		class: "w-100 mb-2",
		label: "Ext. Crates in Mekmer",
		onClick: ($event) => _ctx.$emit("products_status_selected", 3)
	}, null, _parent));
	_push(ssrRenderComponent(_component_Button, {
		type: "button",
		severity: "danger",
		class: "w-100",
		label: "Not Found",
		onClick: ($event) => _ctx.$emit("products_status_selected", 4)
	}, null, _parent));
	_push(`</div><div class="col-1" data-v-1c7deef4>`);
	_push(ssrRenderComponent(_component_Button, {
		severity: "secondary",
		type: "button",
		label: "Selection Excel",
		onClick: $options.selection_click_excel,
		disabled: $data.selection_orders_disabled
	}, null, _parent));
	_push(`<br data-v-1c7deef4>`);
	_push(ssrRenderComponent(_component_Dropdown, {
		class: "mt-1",
		modelValue: $data.selectedEfeTicket,
		"onUpdate:modelValue": ($event) => $data.selectedEfeTicket = $event,
		options: $data.efeTickets,
		optionLabel: "name",
		placeholder: "EFE Labels",
		onChange: ($event) => $options.downloadEfeTicket($event)
	}, null, _parent));
	if (!$data.isEfeTicketForm) _push(`<a${ssrRenderAttr("href", $data.ticketLink)} download type="button" class="btn btn-secondary" data-v-1c7deef4>Download</a>`);
	else _push(`<!---->`);
	_push(`</div><div class="col-1" data-v-1c7deef4>`);
	_push(ssrRenderComponent(_component_Button, {
		severity: "secondary",
		type: "button",
		label: "Orders Excel",
		onClick: $options.orders_click_excel,
		disabled: $data.selection_orders_disabled
	}, null, _parent));
	_push(`</div><div class="col-1" data-v-1c7deef4>`);
	_push(ssrRenderComponent(_component_Button, {
		severity: "secondary",
		type: "button",
		label: "Ticket",
		onClick: $options.ticket_click_excel
	}, null, _parent));
	_push(`</div><div class="col-3" data-v-1c7deef4><div class="row" data-v-1c7deef4><div class="col-6" data-v-1c7deef4>`);
	_push(ssrRenderComponent(_component_Dropdown, {
		modelValue: $data.selectedVeikBox,
		"onUpdate:modelValue": ($event) => $data.selectedVeikBox = $event,
		options: $data.etiketlerVeikKutu,
		optionLabel: "urun",
		placeholder: "VEIK Box Labels",
		class: "w-100 mb-2",
		onChange: ($event) => $options.isDropDownChange($event)
	}, null, _parent));
	_push(`</div><div class="col-6" data-v-1c7deef4>`);
	_push(ssrRenderComponent(_component_Dropdown, {
		modelValue: $data.selectedVeikCrate,
		"onUpdate:modelValue": ($event) => $data.selectedVeikCrate = $event,
		options: $data.etiketlerVeikKasa,
		optionLabel: "urun",
		placeholder: "Veik Crate Labels",
		class: "w-100 mb-2",
		onChange: ($event) => $options.isDropDownChange($event)
	}, null, _parent));
	_push(`</div></div><div class="row" data-v-1c7deef4><div class="col" data-v-1c7deef4><a${ssrRenderAttr("href", $data.boxCrateTicket)} download type="button" class="btn btn-secondary w-100" data-v-1c7deef4>Download</a></div></div></div>`);
	_push(ssrRenderComponent(_component_Dialog, {
		visible: $data.add_bulk_crate_dialog_status,
		"onUpdate:visible": ($event) => $data.add_bulk_crate_dialog_status = $event,
		modal: "",
		header: "Bulk Edit"
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(`<div class="row mt-3" data-v-1c7deef4${_scopeId}><div class="col-4" data-v-1c7deef4${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_AutoComplete, {
								modelValue: $data.selectedPo,
								"onUpdate:modelValue": ($event) => $data.selectedPo = $event,
								inputId: "po",
								suggestions: $data.filteredOrdersPo,
								optionLabel: "SiparisNo",
								onComplete: $options.searchOrdersPo,
								onItemSelect: ($event) => $options.ordersPoSelected($event)
							}, null, _parent, _scopeId));
							_push(`<label for="po" data-v-1c7deef4${_scopeId}>Po</label>`);
						} else return [createVNode(_component_AutoComplete, {
							modelValue: $data.selectedPo,
							"onUpdate:modelValue": ($event) => $data.selectedPo = $event,
							inputId: "po",
							suggestions: $data.filteredOrdersPo,
							optionLabel: "SiparisNo",
							onComplete: $options.searchOrdersPo,
							onItemSelect: ($event) => $options.ordersPoSelected($event)
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"suggestions",
							"onComplete",
							"onItemSelect"
						]), createVNode("label", { for: "po" }, "Po")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col-4" data-v-1c7deef4${_scopeId}>`);
				_push(ssrRenderComponent(_component_FloatLabel, null, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_Dropdown, {
								modelValue: $data.selectedProduct,
								"onUpdate:modelValue": ($event) => $data.selectedProduct = $event,
								options: $data.product_list,
								optionLabel: "Aciklama",
								placeholder: "Products",
								class: "mb-4",
								style: { "width": "300px" },
								onChange: ($event) => $options.productSelected($event)
							}, null, _parent, _scopeId));
							_push(`<label for="products" data-v-1c7deef4${_scopeId}>Products</label>`);
						} else return [createVNode(_component_Dropdown, {
							modelValue: $data.selectedProduct,
							"onUpdate:modelValue": ($event) => $data.selectedProduct = $event,
							options: $data.product_list,
							optionLabel: "Aciklama",
							placeholder: "Products",
							class: "mb-4",
							style: { "width": "300px" },
							onChange: ($event) => $options.productSelected($event)
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"options",
							"onChange"
						]), createVNode("label", { for: "products" }, "Products")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><div class="col-4" data-v-1c7deef4${_scopeId}>`);
				_push(ssrRenderComponent(_component_Button, {
					type: "button",
					label: "Change",
					severity: "success",
					class: "w-100",
					onClick: $options.update,
					disabled: $data.bulk_edit_update_button_status
				}, null, _parent, _scopeId));
				_push(`</div></div>`);
				_push(ssrRenderComponent(_component_DataTable, {
					selection: $data.selectedBulkProducts,
					"onUpdate:selection": ($event) => $data.selectedBulkProducts = $event,
					value: $options.selectionStore.getProductList,
					dataKey: "KasaNo",
					tableStyle: "min-width: 50rem",
					filters: $data.filters2,
					"onUpdate:filters": ($event) => $data.filters2 = $event,
					filterDisplay: "row",
					columnResizeMode: "fit",
					showGridlines: "",
					paginator: "",
					rows: 10
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_Column, {
								selectionMode: "multiple",
								headerStyle: "width: 3rem"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "KasaNo",
								header: "Crate No",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "50px" }
									}, null, _parent, _scopeId));
									else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "50px" }
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "Tarih",
								header: "Date",
								showFilterMenu: false,
								showClearButton: false,
								sortable: "",
								headerClass: "tableHeader",
								bodyClass: "tableBody"
							}, {
								body: withCtx((slotProps, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih))}`);
									else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih)), 1)];
								}),
								filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "80px" }
									}, null, _parent, _scopeId));
									else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "80px" }
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "KategoriAdi",
								header: "Category",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "80px" }
									}, null, _parent, _scopeId));
									else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "80px" }
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "OcakAdi",
								header: "Quarry",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "80px" }
									}, null, _parent, _scopeId));
									else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "80px" }
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "UrunAdi",
								header: "Product",
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "80px" }
									}, null, _parent, _scopeId));
									else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "80px" }
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "YuzeyIslemAdi",
								header: "Surface",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "80px" }
									}, null, _parent, _scopeId));
									else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "80px" }
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "En",
								header: "Width",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "50px" }
									}, null, _parent, _scopeId));
									else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "50px" }
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "Boy",
								header: "Height",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "50px" }
									}, null, _parent, _scopeId));
									else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "50px" }
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "Kenar",
								header: "Thickness",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "50px" }
									}, null, _parent, _scopeId));
									else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "50px" }
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "Adet",
								header: "Pcs in Box",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "50px" }
									}, null, _parent, _scopeId));
									else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "50px" }
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "KutuAdet",
								header: "Box Amount",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "50px" }
									}, null, _parent, _scopeId));
									else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "50px" }
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "Miktar",
								header: "Amount",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								body: withCtx((slotProps, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate($options.formatDecimal(slotProps.data.Miktar))}`);
									else return [createTextVNode(toDisplayString($options.formatDecimal(slotProps.data.Miktar)), 1)];
								}),
								filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "50px" }
									}, null, _parent, _scopeId));
									else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "50px" }
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "SiparisAciklama",
								header: "Po",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "80px" }
									}, null, _parent, _scopeId));
									else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "80px" }
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "Aciklama",
								header: "Expl.",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "80px" }
									}, null, _parent, _scopeId));
									else return [createVNode(_component_InputText, {
										type: "text",
										modelValue: filterModel.value,
										"onUpdate:modelValue": ($event) => filterModel.value = $event,
										onInput: ($event) => filterCallback(),
										class: "p-column-filter",
										style: { "width": "80px" }
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"onInput"
									])];
								}),
								_: 1
							}, _parent, _scopeId));
						} else return [
							createVNode(_component_Column, {
								selectionMode: "multiple",
								headerStyle: "width: 3rem"
							}),
							createVNode(_component_Column, {
								field: "KasaNo",
								header: "Crate No",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									onInput: ($event) => filterCallback(),
									class: "p-column-filter",
									style: { "width": "50px" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								])]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "Tarih",
								header: "Date",
								showFilterMenu: false,
								showClearButton: false,
								sortable: "",
								headerClass: "tableHeader",
								bodyClass: "tableBody"
							}, {
								body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih)), 1)]),
								filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									onInput: ($event) => filterCallback(),
									class: "p-column-filter",
									style: { "width": "80px" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								])]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "KategoriAdi",
								header: "Category",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									onInput: ($event) => filterCallback(),
									class: "p-column-filter",
									style: { "width": "80px" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								])]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "OcakAdi",
								header: "Quarry",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									onInput: ($event) => filterCallback(),
									class: "p-column-filter",
									style: { "width": "80px" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								])]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "UrunAdi",
								header: "Product",
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									onInput: ($event) => filterCallback(),
									class: "p-column-filter",
									style: { "width": "80px" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								])]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "YuzeyIslemAdi",
								header: "Surface",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									onInput: ($event) => filterCallback(),
									class: "p-column-filter",
									style: { "width": "80px" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								])]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "En",
								header: "Width",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									onInput: ($event) => filterCallback(),
									class: "p-column-filter",
									style: { "width": "50px" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								])]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "Boy",
								header: "Height",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									onInput: ($event) => filterCallback(),
									class: "p-column-filter",
									style: { "width": "50px" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								])]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "Kenar",
								header: "Thickness",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									onInput: ($event) => filterCallback(),
									class: "p-column-filter",
									style: { "width": "50px" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								])]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "Adet",
								header: "Pcs in Box",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									onInput: ($event) => filterCallback(),
									class: "p-column-filter",
									style: { "width": "50px" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								])]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "KutuAdet",
								header: "Box Amount",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									onInput: ($event) => filterCallback(),
									class: "p-column-filter",
									style: { "width": "50px" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								])]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "Miktar",
								header: "Amount",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								body: withCtx((slotProps) => [createTextVNode(toDisplayString($options.formatDecimal(slotProps.data.Miktar)), 1)]),
								filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									onInput: ($event) => filterCallback(),
									class: "p-column-filter",
									style: { "width": "50px" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								])]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "SiparisAciklama",
								header: "Po",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									onInput: ($event) => filterCallback(),
									class: "p-column-filter",
									style: { "width": "80px" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								])]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "Aciklama",
								header: "Expl.",
								showFilterMenu: false,
								showClearButton: false,
								sortable: ""
							}, {
								filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
									type: "text",
									modelValue: filterModel.value,
									"onUpdate:modelValue": ($event) => filterModel.value = $event,
									onInput: ($event) => filterCallback(),
									class: "p-column-filter",
									style: { "width": "80px" }
								}, null, 8, [
									"modelValue",
									"onUpdate:modelValue",
									"onInput"
								])]),
								_: 1
							})
						];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [createVNode("div", { class: "row mt-3" }, [
				createVNode("div", { class: "col-4" }, [createVNode(_component_FloatLabel, null, {
					default: withCtx(() => [createVNode(_component_AutoComplete, {
						modelValue: $data.selectedPo,
						"onUpdate:modelValue": ($event) => $data.selectedPo = $event,
						inputId: "po",
						suggestions: $data.filteredOrdersPo,
						optionLabel: "SiparisNo",
						onComplete: $options.searchOrdersPo,
						onItemSelect: ($event) => $options.ordersPoSelected($event)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"suggestions",
						"onComplete",
						"onItemSelect"
					]), createVNode("label", { for: "po" }, "Po")]),
					_: 1
				})]),
				createVNode("div", { class: "col-4" }, [createVNode(_component_FloatLabel, null, {
					default: withCtx(() => [createVNode(_component_Dropdown, {
						modelValue: $data.selectedProduct,
						"onUpdate:modelValue": ($event) => $data.selectedProduct = $event,
						options: $data.product_list,
						optionLabel: "Aciklama",
						placeholder: "Products",
						class: "mb-4",
						style: { "width": "300px" },
						onChange: ($event) => $options.productSelected($event)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"options",
						"onChange"
					]), createVNode("label", { for: "products" }, "Products")]),
					_: 1
				})]),
				createVNode("div", { class: "col-4" }, [createVNode(_component_Button, {
					type: "button",
					label: "Change",
					severity: "success",
					class: "w-100",
					onClick: $options.update,
					disabled: $data.bulk_edit_update_button_status
				}, null, 8, ["onClick", "disabled"])])
			]), createVNode(_component_DataTable, {
				selection: $data.selectedBulkProducts,
				"onUpdate:selection": ($event) => $data.selectedBulkProducts = $event,
				value: $options.selectionStore.getProductList,
				dataKey: "KasaNo",
				tableStyle: "min-width: 50rem",
				filters: $data.filters2,
				"onUpdate:filters": ($event) => $data.filters2 = $event,
				filterDisplay: "row",
				columnResizeMode: "fit",
				showGridlines: "",
				paginator: "",
				rows: 10
			}, {
				default: withCtx(() => [
					createVNode(_component_Column, {
						selectionMode: "multiple",
						headerStyle: "width: 3rem"
					}),
					createVNode(_component_Column, {
						field: "KasaNo",
						header: "Crate No",
						showFilterMenu: false,
						showClearButton: false,
						sortable: ""
					}, {
						filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])]),
						_: 1
					}),
					createVNode(_component_Column, {
						field: "Tarih",
						header: "Date",
						showFilterMenu: false,
						showClearButton: false,
						sortable: "",
						headerClass: "tableHeader",
						bodyClass: "tableBody"
					}, {
						body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih)), 1)]),
						filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])]),
						_: 1
					}),
					createVNode(_component_Column, {
						field: "KategoriAdi",
						header: "Category",
						showFilterMenu: false,
						showClearButton: false,
						sortable: ""
					}, {
						filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])]),
						_: 1
					}),
					createVNode(_component_Column, {
						field: "OcakAdi",
						header: "Quarry",
						showFilterMenu: false,
						showClearButton: false,
						sortable: ""
					}, {
						filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])]),
						_: 1
					}),
					createVNode(_component_Column, {
						field: "UrunAdi",
						header: "Product",
						showClearButton: false,
						sortable: ""
					}, {
						filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])]),
						_: 1
					}),
					createVNode(_component_Column, {
						field: "YuzeyIslemAdi",
						header: "Surface",
						showFilterMenu: false,
						showClearButton: false,
						sortable: ""
					}, {
						filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])]),
						_: 1
					}),
					createVNode(_component_Column, {
						field: "En",
						header: "Width",
						showFilterMenu: false,
						showClearButton: false,
						sortable: ""
					}, {
						filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])]),
						_: 1
					}),
					createVNode(_component_Column, {
						field: "Boy",
						header: "Height",
						showFilterMenu: false,
						showClearButton: false,
						sortable: ""
					}, {
						filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])]),
						_: 1
					}),
					createVNode(_component_Column, {
						field: "Kenar",
						header: "Thickness",
						showFilterMenu: false,
						showClearButton: false,
						sortable: ""
					}, {
						filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])]),
						_: 1
					}),
					createVNode(_component_Column, {
						field: "Adet",
						header: "Pcs in Box",
						showFilterMenu: false,
						showClearButton: false,
						sortable: ""
					}, {
						filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])]),
						_: 1
					}),
					createVNode(_component_Column, {
						field: "KutuAdet",
						header: "Box Amount",
						showFilterMenu: false,
						showClearButton: false,
						sortable: ""
					}, {
						filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])]),
						_: 1
					}),
					createVNode(_component_Column, {
						field: "Miktar",
						header: "Amount",
						showFilterMenu: false,
						showClearButton: false,
						sortable: ""
					}, {
						body: withCtx((slotProps) => [createTextVNode(toDisplayString($options.formatDecimal(slotProps.data.Miktar)), 1)]),
						filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])]),
						_: 1
					}),
					createVNode(_component_Column, {
						field: "SiparisAciklama",
						header: "Po",
						showFilterMenu: false,
						showClearButton: false,
						sortable: ""
					}, {
						filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])]),
						_: 1
					}),
					createVNode(_component_Column, {
						field: "Aciklama",
						header: "Expl.",
						showFilterMenu: false,
						showClearButton: false,
						sortable: ""
					}, {
						filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])]),
						_: 1
					})
				]),
				_: 1
			}, 8, [
				"selection",
				"onUpdate:selection",
				"value",
				"filters",
				"onUpdate:filters"
			])];
		}),
		_: 1
	}, _parent));
	_push(`</div>`);
}
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/selection/input/Panel.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var Panel_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-1c7deef4"]]), { __name: "SelectionInputPanel" });
//#endregion
//#region app/components/selection/input/List.vue
var makeFilters = () => ({
	KasaNo: {
		value: null,
		matchMode: FilterMatchMode.STARTS_WITH
	},
	Tarih: {
		value: null,
		matchMode: FilterMatchMode.STARTS_WITH
	},
	KategoriAdi: {
		value: null,
		matchMode: FilterMatchMode.STARTS_WITH
	},
	OcakAdi: {
		value: null,
		matchMode: FilterMatchMode.STARTS_WITH
	},
	UrunAdi: {
		value: null,
		matchMode: FilterMatchMode.STARTS_WITH
	},
	YuzeyIslemAdi: {
		value: null,
		matchMode: FilterMatchMode.STARTS_WITH
	},
	En: {
		value: null,
		matchMode: FilterMatchMode.STARTS_WITH
	},
	Boy: {
		value: null,
		matchMode: FilterMatchMode.STARTS_WITH
	},
	Kenar: {
		value: null,
		matchMode: FilterMatchMode.STARTS_WITH
	},
	SiparisAciklama: {
		value: null,
		matchMode: FilterMatchMode.STARTS_WITH
	},
	Aciklama: {
		value: null,
		matchMode: FilterMatchMode.STARTS_WITH
	},
	Adet: {
		value: null,
		matchMode: FilterMatchMode.STARTS_WITH
	},
	KutuAdet: {
		value: null,
		matchMode: FilterMatchMode.STARTS_WITH
	},
	Miktar: {
		value: null,
		matchMode: FilterMatchMode.STARTS_WITH
	}
});
var _sfc_main$2 = {
	props: {
		products: {
			type: Array,
			required: false,
			default: () => []
		},
		total: {
			type: Object,
			required: false,
			default: () => ({
				miktar: 0,
				kutu: 0,
				kutuiciadet: 0,
				kasaadedi: 0
			})
		}
	},
	emits: ["product_selected_emit"],
	computed: { selectionStore() {
		return useSelectionStore();
	} },
	data() {
		return {
			selectedProduct: null,
			filters1: makeFilters()
		};
	},
	methods: {
		clearFilter() {
			this.filters1 = makeFilters();
		},
		filteredProductsList(event) {
			this.selectionStore.MUT_setSelectionProductTotalList(event.filteredValue);
			this.selectionStore.setSelectionProductFilteredList(event.filteredValue);
		}
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_DataTable = script$a;
	const _component_Button = script$5;
	const _component_Column = script$b;
	const _component_InputText = script$4;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))} data-v-0474a513><div class="row" data-v-0474a513><div class="col" data-v-0474a513>`);
	_push(ssrRenderComponent(_component_DataTable, {
		value: $props.products,
		size: "small",
		paginator: "",
		rows: 10,
		selection: $data.selectedProduct,
		selectionMode: "single",
		onRowSelect: ($event) => _ctx.$emit("product_selected_emit", $event),
		filters: $data.filters1,
		"onUpdate:filters": ($event) => $data.filters1 = $event,
		filterDisplay: "row",
		onFilter: ($event) => $options.filteredProductsList($event),
		columnResizeMode: "fit",
		showGridlines: ""
	}, {
		header: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(ssrRenderComponent(_component_Button, {
				type: "button",
				icon: "pi pi-filter-slash",
				label: "Filtreleri Temizle",
				outlined: "",
				onClick: ($event) => $options.clearFilter()
			}, null, _parent, _scopeId));
			else return [createVNode(_component_Button, {
				type: "button",
				icon: "pi pi-filter-slash",
				label: "Filtreleri Temizle",
				outlined: "",
				onClick: ($event) => $options.clearFilter()
			}, null, 8, ["onClick"])];
		}),
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_Column, {
					field: "KasaNo",
					header: "Crate No",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Tarih",
					header: "Date",
					showFilterMenu: false,
					showClearButton: false,
					sortable: "",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih))}`);
						else return [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih)), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "KategoriAdi",
					header: "Category",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "OcakAdi",
					header: "Quarry",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "UrunAdi",
					header: "Product",
					showClearButton: false,
					sortable: ""
				}, {
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate($props.total.kasaadedi)}`);
						else return [createTextVNode(toDisplayString($props.total.kasaadedi), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "YuzeyIslemAdi",
					header: "Surface",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "En",
					header: "Width",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Boy",
					header: "Height",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Kenar",
					header: "Thickness",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Adet",
					header: "Pcs in Box",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.kutuiciadet))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.kutuiciadet)), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "KutuAdet",
					header: "Box Amount",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.kutu))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.kutu)), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Miktar",
					header: "Amount",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 1)];
					}),
					footer: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.miktar))}`);
						else return [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.miktar)), 1)];
					}),
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "50px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Kutu",
					header: "Box",
					sortable: ""
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (slotProps.data.Kutu == true) _push(`<div data-v-0474a513${_scopeId}>✓</div>`);
							else _push(`<div data-v-0474a513${_scopeId}>x</div>`);
						} else return [slotProps.data.Kutu == true ? (openBlock(), createBlock("div", { key: 0 }, "✓")) : (openBlock(), createBlock("div", { key: 1 }, "x"))];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Bagli",
					header: "Binded",
					sortable: ""
				}, {
					body: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) {
							if (slotProps.data.Bagli == true) _push(`<div data-v-0474a513${_scopeId}>✓</div>`);
							else _push(`<div data-v-0474a513${_scopeId}>x</div>`);
						} else return [slotProps.data.Bagli == true ? (openBlock(), createBlock("div", { key: 0 }, "✓")) : (openBlock(), createBlock("div", { key: 1 }, "x"))];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "SiparisAciklama",
					header: "Po",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_Column, {
					field: "Aciklama",
					header: "Expl.",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, _parent, _scopeId));
						else return [createVNode(_component_InputText, {
							type: "text",
							modelValue: filterModel.value,
							"onUpdate:modelValue": ($event) => filterModel.value = $event,
							onInput: ($event) => filterCallback(),
							class: "p-column-filter",
							style: { "width": "80px" }
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"onInput"
						])];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_Column, {
					field: "KasaNo",
					header: "Crate No",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter",
						style: { "width": "50px" }
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Tarih",
					header: "Date",
					showFilterMenu: false,
					showClearButton: false,
					sortable: "",
					headerClass: "tableHeader",
					bodyClass: "tableBody"
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("dateToString" in _ctx ? _ctx.dateToString : unref(dateToString))(slotProps.data.Tarih)), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter",
						style: { "width": "80px" }
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "KategoriAdi",
					header: "Category",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter",
						style: { "width": "80px" }
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "OcakAdi",
					header: "Quarry",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter",
						style: { "width": "80px" }
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "UrunAdi",
					header: "Product",
					showClearButton: false,
					sortable: ""
				}, {
					footer: withCtx(() => [createTextVNode(toDisplayString($props.total.kasaadedi), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter",
						style: { "width": "80px" }
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "YuzeyIslemAdi",
					header: "Surface",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter",
						style: { "width": "80px" }
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "En",
					header: "Width",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter",
						style: { "width": "50px" }
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Boy",
					header: "Height",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter",
						style: { "width": "50px" }
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Kenar",
					header: "Thickness",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter",
						style: { "width": "50px" }
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Adet",
					header: "Pcs in Box",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.kutuiciadet)), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter",
						style: { "width": "50px" }
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "KutuAdet",
					header: "Box Amount",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.kutu)), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter",
						style: { "width": "50px" }
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Miktar",
					header: "Amount",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.Miktar)), 1)]),
					footer: withCtx(() => [createTextVNode(toDisplayString(("formatDecimal2" in _ctx ? _ctx.formatDecimal2 : unref(formatDecimal2))($props.total.miktar)), 1)]),
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter",
						style: { "width": "50px" }
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Kutu",
					header: "Box",
					sortable: ""
				}, {
					body: withCtx((slotProps) => [slotProps.data.Kutu == true ? (openBlock(), createBlock("div", { key: 0 }, "✓")) : (openBlock(), createBlock("div", { key: 1 }, "x"))]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Bagli",
					header: "Binded",
					sortable: ""
				}, {
					body: withCtx((slotProps) => [slotProps.data.Bagli == true ? (openBlock(), createBlock("div", { key: 0 }, "✓")) : (openBlock(), createBlock("div", { key: 1 }, "x"))]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "SiparisAciklama",
					header: "Po",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter",
						style: { "width": "80px" }
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				}),
				createVNode(_component_Column, {
					field: "Aciklama",
					header: "Expl.",
					showFilterMenu: false,
					showClearButton: false,
					sortable: ""
				}, {
					filter: withCtx(({ filterModel, filterCallback }) => [createVNode(_component_InputText, {
						type: "text",
						modelValue: filterModel.value,
						"onUpdate:modelValue": ($event) => filterModel.value = $event,
						onInput: ($event) => filterCallback(),
						class: "p-column-filter",
						style: { "width": "80px" }
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					])]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</div></div></div>`);
}
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/selection/input/List.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var List_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0474a513"]]), { __name: "SelectionInputList" });
//#endregion
//#region app/components/selection/input/Form.vue
var _sfc_main$1 = /*@__PURE__*/ Object.assign({
	computed: {
		selectionStore() {
			return useSelectionStore();
		},
		socketStore() {
			return useSocketStore();
		},
		getProductionCrateNo() {
			return this.selectionStore.getProductionCrateNo;
		},
		commonCrateNo() {
			const numaralar = [this.getProductionCrateNo, ...this.commonCrates.map((x) => x.KasaNo)].map((x) => String(x == null ? "" : x).trim()).filter((x) => x.length > 0);
			if (!numaralar.length) return null;
			if (numaralar.every((x) => /^[0-9]+$/.test(x))) return numaralar.reduce((a, b) => parseInt(b, 10) < parseInt(a, 10) ? b : a);
			return numaralar.slice().sort()[0];
		}
	},
	props: {
		suppliers: {
			type: Array,
			required: true
		},
		orders: {
			type: Array,
			required: false
		},
		products: {
			type: Array,
			required: false
		},
		mines: {
			type: Array,
			required: true
		},
		model: {
			type: Object,
			required: true
		},
		buttonStatus: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			socket: null,
			kutulamaStatus: false,
			fasonStatus: false,
			width: null,
			height: null,
			description: null,
			notFindStatus: false,
			outStatus: false,
			stringStatus: false,
			boxStatus: false,
			crateAmount: 1,
			speacialAmount: 0,
			amount: 0,
			totalamount: 0,
			boxinamount: 0,
			boxamount: 0,
			organizer: "Muhsin",
			crateman: null,
			filteredMineList: null,
			selectedMine: null,
			createNo: null,
			categoryName: null,
			productName: null,
			surfaceName: null,
			sizeName: null,
			orderProductCardDesc: null,
			selectedAmountStatus: "Sqm",
			selectedSaveKind: null,
			kinds: [{
				id: 1,
				status: "Stok"
			}, {
				id: 2,
				status: "Sipariş"
			}],
			selectedSupplier: null,
			items: [],
			filteredSuppliers: null,
			selectedPo: null,
			filteredPo: null,
			selectedDate: /* @__PURE__ */ new Date(),
			selectedProducts: null,
			amountStatus: [
				{
					id: 1,
					status: "Sqm"
				},
				{
					id: 2,
					status: "Pcs"
				},
				{
					id: 3,
					status: "Mt"
				},
				{
					id: 4,
					status: "Ton"
				}
			],
			productCardId: null,
			disabledOrders: true,
			product_cards_form_dialog: false,
			commonCrates: [],
			filteredCrateOptions: []
		};
	},
	async created() {
		await this.selectionStore.setSelectionProductionCrateOptions();
		if (!this.buttonStatus) this.createdProcess();
		else this.selectionStore.MUT_setSelectionProductionCrateNo(null);
	},
	methods: {
		amountInput(event) {
			this.amount = event.replace(",", ".");
			if (this.selectedAmountStatus == "Sqm") this.speacialAmount = this.amount;
			else this.speacialAmount = 0;
		},
		__nullNoneTrueFalseControl(value) {
			if (value == null || value == void 0 || value == "" || value == " ") return false;
			else return value;
		},
		calculateTotalAmountM2(event) {
			if (this.selectedAmountStatus === "Sqm") {
				if (this.width == "ANT" || this.height == "Free" || this.width == "Ant" || this.height == "FREE" || this.width == "Mini" || this.width == "MINI" || this.width == "Other" || this.width == "OTHER") return 0;
				else if (this.width === "VAR" || this.width === "Various" || this.width === "Slab" || this.width === "SLAB") this.amount = 0;
				else if (this.selectedAmountStatus == "Sqm") {
					const width = parseFloat(this.width.replace(",", "."));
					const height = parseFloat(this.height.replace(",", "."));
					this.amount = (width * height * parseInt(event.replace(",", ".")) / 1e4).toFixed(2);
					this.speacialAmount = this.amount;
				} else {
					const width = parseFloat(this.width.replace(",", "."));
					const height = parseFloat(this.height.replace(",", "."));
					this.speacialAmount = (width * height * parseInt(event.replace(",", ".")) / 1e4).toFixed(2);
					this.amount = event;
				}
			} else if (this.selectedAmountStatus === "Pcs") {
				if (this.width == "ANT" || this.height == "Free" || this.width == "Ant" || this.height == "FREE" || this.width == "Mini" || this.width == "MINI" || this.width == "Other" || this.width == "OTHER") return 0;
				else if (this.width === "VAR" || this.width === "Various" || this.width === "Slab" || this.width === "SLAB") this.amount = event;
				else if (this.selectedAmountStatus == "Sqm") {
					const width = parseFloat(this.width.replace(",", "."));
					const height = parseFloat(this.height.replace(",", "."));
					this.amount = (width * height * parseInt(event.replace(",", ".")) / 1e4).toFixed(2);
					this.speacialAmount = this.amount;
				} else {
					const width = parseFloat(this.width.replace(",", "."));
					const height = parseFloat(this.height.replace(",", "."));
					this.speacialAmount = (width * height * parseInt(event.replace(",", ".")) / 1e4).toFixed(2);
					this.amount = event;
				}
			}
		},
		calculateTotalAmount(event) {
			if (this.boxamount) this.totalamount = +event * +this.boxamount;
		},
		calculateM2Box(event) {
			let boxM2 = .74346;
			let setM2 = .494875;
			if (event) {
				if ((this.height == "Set" || this.height == "SET") && this.width == "20,3") {
					this.amount = (setM2 * event).toFixed(2);
					this.speacialAmount = this.amount;
				} else {
					this.amount = (boxM2 * event).toFixed(2);
					this.speacialAmount = this.amount;
				}
			}
		},
		async deleteForm() {
			await this.selectionStore.setSelectionProductionDelete(this.model.KasaNo);
			this.socketStore.emit("update_production_emit");
			this.$emit("selection_production_dialog_form", false);
			this.selectionStore.setSelectionProductionTotal();
		},
		supplierSelected(event) {
			if (this.buttonStatus) {
				if (event.value.ID != 1 || event.value.ID != 123) this.selectionStore.setSelectionProductionCrateNoOut();
			}
		},
		saveProcess() {
			if (this.buttonStatus) this.save();
			else this.update();
		},
		async save() {
			let sipAciklama;
			if (this.selectedSaveKind.id == 1) sipAciklama = "Stok";
			else sipAciklama = this.selectedProducts.SiparisNo;
			let birimId;
			if (this.selectedAmountStatus == "Sqm") birimId = 1;
			else if (this.selectedAmountStatus == "Pcs") birimId = 2;
			else if (this.selectedAmountStatus == "Mt") birimId = 3;
			else if (this.selectedAmountStatus == "Ton") birimId = 4;
			const data = {
				Tarih: toIsoDate(this.selectedDate),
				KasaNo: this.getProductionCrateNo,
				UrunKartID: this.productCardId,
				TedarikciID: this.selectedSupplier.ID,
				UrunBirimID: birimId,
				UrunOcakID: this.selectedMine.ID,
				Adet: this.totalamount,
				KutuAdet: this.boxamount,
				Miktar: this.amount,
				Aciklama: this.description,
				UretimTurID: this.selectedSaveKind.id,
				UrunDurumID: 1,
				SiparisAciklama: sipAciklama,
				Kutu: this.boxStatus,
				Duzenleyen: this.organizer,
				Kasalayan: this.crateman,
				Disarda: this.outStatus,
				KutuIciAdet: this.boxinamount,
				SqmMiktar: this.speacialAmount,
				Bagli: this.stringStatus,
				Bulunamadi: this.notFindStatus,
				KasaKayıtAdedi: this.crateAmount,
				Fason: this.fasonStatus,
				Kutulama: this.kutulamaStatus,
				KullaniciID: useCookie("userId").value,
				OrtakKasalar: this.commonCrates.map((x) => x.KasaNo)
			};
			await this.selectionStore.setSelectionProductionSave(data);
			this.selectionStore.setSelectionProductionCrateOptions();
			this.socketStore.emit("update_production_emit");
			this.selectionStore.setSelectionProductionTotal();
			this.reset();
		},
		async update() {
			let sipAciklama;
			if (this.selectedSaveKind.id == 1) sipAciklama = "Stok";
			else sipAciklama = this.selectedPo.SiparisNo;
			let birimId;
			if (this.selectedAmountStatus == "Sqm") birimId = 1;
			else if (this.selectedAmountStatus == "Pcs") birimId = 2;
			else if (this.selectedAmountStatus == "Mt") birimId = 3;
			else if (this.selectedAmountStatus == "Ton") birimId = 4;
			const data = {
				ID: this.model.ID,
				Tarih: toIsoDate(this.selectedDate),
				KasaNo: this.getProductionCrateNo,
				UrunKartID: this.productCardId,
				TedarikciID: this.selectedSupplier.ID,
				UrunBirimID: birimId,
				UrunOcakID: this.selectedMine.ID,
				Adet: this.totalamount,
				KutuAdet: this.boxamount,
				Miktar: this.amount,
				Aciklama: this.description,
				UretimTurID: this.selectedSaveKind.id,
				UrunDurumID: 1,
				SiparisAciklama: sipAciklama,
				Kutu: this.boxStatus,
				Duzenleyen: this.organizer,
				Kasalayan: this.crateman,
				Disarda: this.outStatus,
				KutuIciAdet: this.boxinamount,
				SqmMiktar: this.speacialAmount,
				Bagli: this.stringStatus,
				Bulunamadi: this.notFindStatus,
				KasaKayıtAdedi: this.crateAmount,
				Fason: this.fasonStatus,
				Kutulama: this.kutulamaStatus,
				OrtakKasalar: this.commonCrates.map((x) => x.KasaNo)
			};
			await this.selectionStore.setSelectionProductionUpdate(data);
			this.selectionStore.setSelectionProductionCrateOptions();
			this.socketStore.emit("update_production_emit");
			this.$emit("selection_production_dialog_form", false);
		},
		reset() {
			this.productCardId = null;
			this.selectedProducts = null;
			this.selectedDate = /* @__PURE__ */ new Date();
			this.selectedProducts = null;
			this.selectedPo = null;
			this.description = null;
			this.notFindStatus = false;
			this.outStatus = false;
			this.stringStatus = false;
			this.boxStatus = false;
			this.crateAmount = 1;
			this.speacialAmount = 0;
			this.amount = 0;
			this.totalamount = 0;
			this.boxinamount = 0;
			this.boxamount = 0;
			this.organizer = "Muhsin";
			this.crateman = null;
			this.filteredMineList = null;
			this.selectedMine = null;
			this.createNo = null;
			this.categoryName = null;
			this.productName = null;
			this.surfaceName = null;
			this.sizeName = null;
			this.orderProductCardDesc = null;
			this.selectedAmountStatus = "Sqm";
			this.selectedSaveKind = null;
			this.selectedSupplier = null;
			this.fasonStatus = false;
			this.kutulamaStatus = false;
			this.commonCrates = [];
			this.filteredCrateOptions = [];
			this.selectionStore.MUT_setSelectionProductionCrateNo(null);
		},
		createdProcess() {
			this.selectedSaveKind = this.kinds.find((x) => x.id == this.model.UretimTurID);
			this.selectedPo = this.orders.find((x) => x.SiparisNo == this.model.SiparisAciklama);
			this.selectedSupplier = this.suppliers.find((x) => x.FirmaAdi == this.model.FirmaAdi);
			this.selectedDate = fromIsoDate(this.model.Tarih);
			this.selectedAmountStatus = this.model.UrunBirimAdi;
			this.productCardId = this.model.UrunKartId;
			this.categoryName = this.model.KategoriAdi;
			this.productName = this.model.UrunAdi;
			this.surfaceName = this.model.YuzeyIslemAdi;
			this.sizeName = this.model.En + "x" + this.model.Boy + "x" + this.model.Kenar;
			this.orderProductCardDesc = this.model.FirmaAdi + "/" + this.model.KategoriAdi + "/" + this.model.UrunAdi + "/" + this.model.YuzeyIslemAdi + "/" + this.model.En + "x" + this.model.Boy + "x" + this.model.Kenar;
			this.selectionStore.MUT_setSelectionProductionCrateNo(this.model.KasaNo);
			this.commonCratesLoad();
			this.selectedMine = this.mines.find((x) => x.ID == this.model.OcakId);
			this.crateman = this.model.Kasalayan;
			this.organizer = this.model.Duzenleyen;
			this.boxamount = this.model.KutuAdet;
			this.boxinamount = this.model.KutuIciAdet;
			this.totalamount = this.model.Adet;
			this.amount = this.model.Miktar;
			this.width = this.model.En;
			this.height = this.model.Boy;
			if (this.model.SqmMiktar == null) this.speacialAmount = 0;
			else this.speacialAmount = this.model.SqmMiktar;
			this.fasonStatus = this.model.Fason;
			this.kutulamaStatus = this.model.Kutulama;
			this.description = this.model.Aciklama;
			this.notFindStatus = this.__nullNoneTrueFalseControl(this.model.Bulunamadi);
			this.outStatus = this.__nullNoneTrueFalseControl(this.model.Disarda);
			this.stringStatus = this.__nullNoneTrueFalseControl(this.model.Bagli);
			this.boxStatus = this.__nullNoneTrueFalseControl(this.model.Kutu);
		},
		searchCrateOptions(event) {
			const aranan = (event.query || "").toString().trim().toLowerCase();
			const kendi = String(this.getProductionCrateNo == null ? "" : this.getProductionCrateNo).trim();
			const secili = this.commonCrates.map((x) => String(x.KasaNo).trim());
			this.filteredCrateOptions = this.selectionStore.getProductionCrateOptions.filter((x) => {
				const no = String(x.KasaNo == null ? "" : x.KasaNo).trim();
				if (!no || no === kendi || secili.includes(no)) return false;
				return !aranan || no.toLowerCase().startsWith(aranan);
			}).slice(0, 30);
		},
		commonCratesLoad() {
			const grup = String(this.model.KasaGrupNo == null ? "" : this.model.KasaGrupNo).trim();
			if (!grup) {
				this.commonCrates = [];
				return;
			}
			const kendi = String(this.model.KasaNo == null ? "" : this.model.KasaNo).trim();
			this.commonCrates = this.selectionStore.getProductionCrateOptions.filter((x) => {
				const no = String(x.KasaNo == null ? "" : x.KasaNo).trim();
				return String(x.KasaGrupNo == null ? "" : x.KasaGrupNo).trim() === grup && no !== kendi;
			});
		},
		searchMine(event) {
			let results;
			if (event.query.lenght == 0) results = this.mines;
			else results = this.mines.filter((x) => {
				return x.OcakAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredMineList = results;
		},
		productCardsSelected(event) {
			this.product_cards_form_dialog = false;
			this.productCardId = event.ID;
			this.orderProductCardDesc = event.KategoriAdi + "/" + event.UrunAdi + "/" + event.YuzeyIslemAdi + "/" + event.En + "x" + event.Boy + "x" + event.Kenar;
			this.categoryName = event.KategoriAdi;
			this.productName = event.UrunAdi;
			this.surfaceName = event.YuzeyIslemAdi;
			this.sizeName = event.En + "x" + event.Boy + "x" + event.Kenar;
			this.width = event.En;
			this.height = event.Boy;
		},
		saveKindSelected(event) {
			if (!this.buttonStatus) {
				if (this.selectedSupplier.ID == 1) {
					if (event.value.id == 1) {
						this.disabledOrders = true;
						this.selectedSupplier = {
							ID: 1,
							FirmaAdi: "Mekmer"
						};
						if (this.buttonStatus) this.selectionStore.setSelectionProductionCrateNoIn();
						this.description = "Stok";
					} else {
						if (this.buttonStatus) this.selectionStore.setSelectionProductionCrateNoIn();
						this.disabledOrders = false;
					}
				} else if (event.value.id == 1) {
					this.disabledOrders = true;
					if (this.buttonStatus) this.selectionStore.setSelectionProductionCrateNoIn();
					this.description = "Stok";
				} else {
					if (this.buttonStatus) this.selectionStore.setSelectionProductionCrateNoIn();
					this.disabledOrders = false;
				}
			} else if (event.value.id == 1) {
				this.disabledOrders = true;
				this.selectedSupplier = {
					ID: 1,
					FirmaAdi: "Mekmer"
				};
				if (this.buttonStatus) this.selectionStore.setSelectionProductionCrateNoIn();
				this.description = "Stok";
			} else {
				if (this.buttonStatus) this.selectionStore.setSelectionProductionCrateNoIn();
				this.disabledOrders = false;
			}
		},
		productsSelected(event) {
			if (!this.buttonStatus) {
				if (this.model.UrunKartId != event.value.UrunKartId) {
					if (confirm("Ürün kartı değiştirilecek. Devam etmek istiyor musunuz?")) {
						this.selectedSupplier = this.suppliers.find((x) => x.ID == event.value.TedarikciID);
						this.selectedAmountStatus = this.amountStatus.find((x) => x.id == event.value.UrunBirimID).status;
						this.orderProductCardDesc = event.value.Aciklama;
						this.productCardId = event.value.UrunKartId;
						this.categoryName = event.value.KategoriAdi;
						this.productName = event.value.UrunAdi;
						this.surfaceName = event.value.YuzeyIslemAdi;
						this.sizeName = event.value.En + "x" + event.value.Boy + "x" + event.value.Kenar;
						this.width = event.value.En;
						this.height = event.value.Boy;
						if (event.value.TedarikciID == 1 || event.value.TedarikciID == 123) {
							if (this.buttonStatus) this.selectionStore.setSelectionProductionCrateNoIn();
							this.selectedMine = null;
							this.organizer = null;
							this.crateman = null;
						} else {
							if (this.buttonStatus) this.selectionStore.setSelectionProductionCrateNoOut();
							this.selectedMine = this.mines.find((x) => x.ID === 28);
							this.organizer = this.$cookie.get("username");
							this.crateman = this.$cookie.get("username");
						}
					} else this.$emit("selection_production_dialog_form", false);
				}
			} else {
				this.selectedSupplier = this.suppliers.find((x) => x.ID == event.value.TedarikciID);
				this.selectedAmountStatus = this.amountStatus.find((x) => x.id == event.value.UrunBirimID).status;
				this.orderProductCardDesc = event.value.Aciklama;
				this.productCardId = event.value.UrunKartId;
				this.categoryName = event.value.KategoriAdi;
				this.productName = event.value.UrunAdi;
				this.surfaceName = event.value.YuzeyIslemAdi;
				this.sizeName = event.value.En + "x" + event.value.Boy + "x" + event.value.Kenar;
				this.width = event.value.En;
				this.height = event.value.Boy;
				if (event.value.TedarikciID == 1 || event.value.TedarikciID == 123) {
					if (this.buttonStatus) this.selectionStore.setSelectionProductionCrateNoIn();
					this.selectedMine = null;
					this.organizer = "Muhsin";
					this.crateman = "Muhsin";
				} else {
					if (this.buttonStatus) this.selectionStore.setSelectionProductionCrateNoOut();
					this.selectedMine = this.mines.find((x) => x.ID === 28);
					this.organizer = this.$cookie.get("username");
					this.crateman = this.$cookie.get("username");
				}
			}
		},
		poSelected(event) {
			this.selectionStore.setSelectionProductionProductsList(event.value.SiparisNo);
			this.description = event.value.SiparisNo;
		},
		searchPo(event) {
			let results;
			if (event.query.length == 0) results = this.orders;
			else results = this.orders.filter((x) => {
				return x.SiparisNo.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredPo = results;
		},
		searchSupplier(event) {
			let results;
			if (event.query.length == 0) results = this.suppliers;
			else results = this.suppliers.filter((x) => {
				return x.FirmaAdi.toLowerCase().startsWith(event.query.toLowerCase());
			});
			this.filteredSuppliers = results;
		}
	}
}, {
	__name: "SelectionInputForm",
	__ssrInlineRender: true,
	setup(__props) {
		useSocketStore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Dropdown = script$1;
			const _component_FloatLabel = script$2;
			const _component_AutoComplete = script$3;
			const _component_InputText = script$4;
			const _component_Button = script$5;
			const _component_Calendar = script$6;
			const _component_RadioButton = script$7;
			const _component_Checkbox = script$8;
			const _component_Textarea = script$9;
			const _component_Dialog = script;
			const _component_productCards = Cards_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><div class="row mt-3"><div class="col">`);
			_push(ssrRenderComponent(_component_Dropdown, {
				modelValue: _ctx.selectedSaveKind,
				"onUpdate:modelValue": ($event) => _ctx.selectedSaveKind = $event,
				options: _ctx.kinds,
				optionLabel: "status",
				placeholder: "Kind of Save",
				class: "mb-4",
				style: { "width": "300px" },
				onChange: ($event) => _ctx.saveKindSelected($event)
			}, null, _parent));
			_push(ssrRenderComponent(_component_FloatLabel, {
				class: "mb-4",
				style: { "width": "250px" }
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_AutoComplete, {
							disabled: _ctx.disabledOrders,
							style: { "width": "250px" },
							modelValue: _ctx.selectedPo,
							"onUpdate:modelValue": ($event) => _ctx.selectedPo = $event,
							inputId: "ac",
							suggestions: _ctx.filteredPo,
							optionLabel: "SiparisNo",
							onComplete: ($event) => _ctx.searchPo($event),
							onItemSelect: ($event) => _ctx.poSelected($event)
						}, null, _parent, _scopeId));
						_push(`<label for="ac"${_scopeId}>Po</label>`);
					} else return [createVNode(_component_AutoComplete, {
						disabled: _ctx.disabledOrders,
						style: { "width": "250px" },
						modelValue: _ctx.selectedPo,
						"onUpdate:modelValue": ($event) => _ctx.selectedPo = $event,
						inputId: "ac",
						suggestions: _ctx.filteredPo,
						optionLabel: "SiparisNo",
						onComplete: ($event) => _ctx.searchPo($event),
						onItemSelect: ($event) => _ctx.poSelected($event)
					}, null, 8, [
						"disabled",
						"modelValue",
						"onUpdate:modelValue",
						"suggestions",
						"onComplete",
						"onItemSelect"
					]), createVNode("label", { for: "ac" }, "Po")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_Dropdown, {
				class: "mb-4",
				disabled: _ctx.disabledOrders,
				modelValue: _ctx.selectedProducts,
				"onUpdate:modelValue": ($event) => _ctx.selectedProducts = $event,
				options: __props.products,
				optionLabel: "Aciklama",
				placeholder: "Select a Product",
				style: { "width": "300px" },
				onChange: ($event) => _ctx.productsSelected($event)
			}, null, _parent));
			_push(ssrRenderComponent(_component_InputText, {
				class: "mb-4",
				style: { "width": "300px" },
				type: "text",
				modelValue: _ctx.orderProductCardDesc,
				"onUpdate:modelValue": ($event) => _ctx.orderProductCardDesc = $event,
				disabled: "",
				placeholder: "Order Product Card"
			}, null, _parent));
			_push(`<div class="row mb-4"><div class="col-9">`);
			_push(ssrRenderComponent(_component_InputText, {
				type: "text",
				class: "w-100",
				modelValue: _ctx.productCardId,
				"onUpdate:modelValue": ($event) => _ctx.productCardId = $event,
				disabled: ""
			}, null, _parent));
			_push(`</div><div class="col">`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				severity: "secondary",
				label: "@",
				onClick: ($event) => _ctx.product_cards_form_dialog = true,
				disabled: !_ctx.disabledOrders
			}, null, _parent));
			_push(`</div></div><div class="row mb-4"><div class="col-6">`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_InputText, {
							id: "create",
							type: "text",
							modelValue: _ctx.getProductionCrateNo,
							"onUpdate:modelValue": ($event) => _ctx.getProductionCrateNo = $event
						}, null, _parent, _scopeId));
						_push(`<label for="create"${_scopeId}>Crate No</label>`);
					} else return [createVNode(_component_InputText, {
						id: "create",
						type: "text",
						modelValue: _ctx.getProductionCrateNo,
						"onUpdate:modelValue": ($event) => _ctx.getProductionCrateNo = $event
					}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "create" }, "Crate No")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col-6">`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_AutoComplete, {
							id: "mine",
							modelValue: _ctx.selectedMine,
							"onUpdate:modelValue": ($event) => _ctx.selectedMine = $event,
							suggestions: _ctx.filteredMineList,
							onComplete: ($event) => _ctx.searchMine($event),
							optionLabel: "OcakAdi"
						}, null, _parent, _scopeId));
						_push(`<label for="mine"${_scopeId}>Quarry</label>`);
					} else return [createVNode(_component_AutoComplete, {
						id: "mine",
						modelValue: _ctx.selectedMine,
						"onUpdate:modelValue": ($event) => _ctx.selectedMine = $event,
						suggestions: _ctx.filteredMineList,
						onComplete: ($event) => _ctx.searchMine($event),
						optionLabel: "OcakAdi"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"suggestions",
						"onComplete"
					]), createVNode("label", { for: "mine" }, "Quarry")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="row mb-4"><div class="col-6">`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_InputText, {
							id: "organizer",
							type: "text",
							modelValue: _ctx.organizer,
							"onUpdate:modelValue": ($event) => _ctx.organizer = $event
						}, null, _parent, _scopeId));
						_push(`<label for="organizer"${_scopeId}>Controled by</label>`);
					} else return [createVNode(_component_InputText, {
						id: "organizer",
						type: "text",
						modelValue: _ctx.organizer,
						"onUpdate:modelValue": ($event) => _ctx.organizer = $event
					}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "organizer" }, "Controled by")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col-6">`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_InputText, {
							id: "crateMan",
							type: "text",
							modelValue: _ctx.crateman,
							"onUpdate:modelValue": ($event) => _ctx.crateman = $event
						}, null, _parent, _scopeId));
						_push(`<label for="crateMan"${_scopeId}>Crated by</label>`);
					} else return [createVNode(_component_InputText, {
						id: "crateMan",
						type: "text",
						modelValue: _ctx.crateman,
						"onUpdate:modelValue": ($event) => _ctx.crateman = $event
					}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "crateMan" }, "Crated by")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div>`);
			if (_ctx.selectionStore.getProductionCrateGroupReady) {
				_push(`<div class="row mb-4"><div class="col-12"><label for="common" class="d-block mb-1">Ortak Kasalar</label>`);
				_push(ssrRenderComponent(_component_AutoComplete, {
					id: "common",
					class: "w-100",
					modelValue: _ctx.commonCrates,
					"onUpdate:modelValue": ($event) => _ctx.commonCrates = $event,
					suggestions: _ctx.filteredCrateOptions,
					onComplete: ($event) => _ctx.searchCrateOptions($event),
					optionLabel: "KasaNo",
					multiple: "",
					forceSelection: ""
				}, {
					option: withCtx((slotProps, _push, _parent, _scopeId) => {
						if (_push) _push(`<span${_scopeId}>${ssrInterpolate(slotProps.option.KasaNo)}</span><small class="text-muted ms-2"${_scopeId}>${ssrInterpolate(slotProps.option.TedarikciAdi)} / ${ssrInterpolate(slotProps.option.KategoriAdi)} / ${ssrInterpolate(slotProps.option.UrunAdi)} / ${ssrInterpolate(slotProps.option.SiparisAciklama)}</small>`);
						else return [createVNode("span", null, toDisplayString(slotProps.option.KasaNo), 1), createVNode("small", { class: "text-muted ms-2" }, toDisplayString(slotProps.option.TedarikciAdi) + " / " + toDisplayString(slotProps.option.KategoriAdi) + " / " + toDisplayString(slotProps.option.UrunAdi) + " / " + toDisplayString(slotProps.option.SiparisAciklama), 1)];
					}),
					_: 1
				}, _parent));
				if (_ctx.commonCrates.length) _push(`<small class="text-muted"> Ceki listesinde ortak kasa no: ${ssrInterpolate(_ctx.commonCrateNo)}</small>`);
				else _push(`<!---->`);
				_push(`</div></div>`);
			} else _push(`<!---->`);
			_push(`</div><div class="col">`);
			_push(ssrRenderComponent(_component_FloatLabel, { class: "mb-3" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_AutoComplete, {
							modelValue: _ctx.selectedSupplier,
							"onUpdate:modelValue": ($event) => _ctx.selectedSupplier = $event,
							inputId: "ac",
							suggestions: _ctx.filteredSuppliers,
							optionLabel: "FirmaAdi",
							onComplete: ($event) => _ctx.searchSupplier($event),
							onItemSelect: ($event) => _ctx.supplierSelected($event)
						}, null, _parent, _scopeId));
						_push(`<label for="ac"${_scopeId}>Supplier</label>`);
					} else return [createVNode(_component_AutoComplete, {
						modelValue: _ctx.selectedSupplier,
						"onUpdate:modelValue": ($event) => _ctx.selectedSupplier = $event,
						inputId: "ac",
						suggestions: _ctx.filteredSuppliers,
						optionLabel: "FirmaAdi",
						onComplete: ($event) => _ctx.searchSupplier($event),
						onItemSelect: ($event) => _ctx.supplierSelected($event)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"suggestions",
						"onComplete",
						"onItemSelect"
					]), createVNode("label", { for: "ac" }, "Supplier")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_Calendar, {
				modelValue: _ctx.selectedDate,
				"onUpdate:modelValue": ($event) => _ctx.selectedDate = $event,
				dateFormat: "dd/mm/yy",
				class: "w-100 mb-3"
			}, null, _parent));
			_push(`<div class="row mb-3"><!--[-->`);
			ssrRenderList(_ctx.amountStatus, (item, index) => {
				_push(`<div class="col-3">`);
				_push(ssrRenderComponent(_component_RadioButton, {
					modelValue: _ctx.selectedAmountStatus,
					"onUpdate:modelValue": ($event) => _ctx.selectedAmountStatus = $event,
					inputId: index,
					name: "dynamic",
					value: item.status
				}, null, _parent));
				_push(`<label${ssrRenderAttr("for", index)} class="ml-2">${ssrInterpolate(item.status)}</label></div>`);
			});
			_push(`<!--]--></div><div class="row g-3 mb-3"><div class="col-4">`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_InputText, {
							id: "boxamount",
							type: "text",
							modelValue: _ctx.boxamount,
							"onUpdate:modelValue": ($event) => _ctx.boxamount = $event,
							class: "w-100",
							onInput: ($event) => _ctx.calculateM2Box($event)
						}, null, _parent, _scopeId));
						_push(`<label for="boxamount"${_scopeId}>Box Amount</label>`);
					} else return [createVNode(_component_InputText, {
						id: "boxamount",
						type: "text",
						modelValue: _ctx.boxamount,
						"onUpdate:modelValue": ($event) => _ctx.boxamount = $event,
						class: "w-100",
						onInput: ($event) => _ctx.calculateM2Box($event)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					]), createVNode("label", { for: "boxamount" }, "Box Amount")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col-4">`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_InputText, {
							id: "boxinamount",
							type: "text",
							modelValue: _ctx.boxinamount,
							"onUpdate:modelValue": ($event) => _ctx.boxinamount = $event,
							class: "w-100",
							onInput: ($event) => _ctx.calculateTotalAmount($event)
						}, null, _parent, _scopeId));
						_push(`<label for="boxinamount"${_scopeId}>Pcs in Box</label>`);
					} else return [createVNode(_component_InputText, {
						id: "boxinamount",
						type: "text",
						modelValue: _ctx.boxinamount,
						"onUpdate:modelValue": ($event) => _ctx.boxinamount = $event,
						class: "w-100",
						onInput: ($event) => _ctx.calculateTotalAmount($event)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					]), createVNode("label", { for: "boxinamount" }, "Pcs in Box")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col-4">`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_InputText, {
							id: "totalamount",
							type: "text",
							modelValue: _ctx.totalamount,
							"onUpdate:modelValue": ($event) => _ctx.totalamount = $event,
							class: "w-100",
							onInput: ($event) => _ctx.calculateTotalAmountM2($event)
						}, null, _parent, _scopeId));
						_push(`<label for="totalamount"${_scopeId}>Total Pieces</label>`);
					} else return [createVNode(_component_InputText, {
						id: "totalamount",
						type: "text",
						modelValue: _ctx.totalamount,
						"onUpdate:modelValue": ($event) => _ctx.totalamount = $event,
						class: "w-100",
						onInput: ($event) => _ctx.calculateTotalAmountM2($event)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					]), createVNode("label", { for: "totalamount" }, "Total Pieces")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="row g-3"><div class="col-4">`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_InputText, {
							id: "amount",
							type: "text",
							modelValue: _ctx.amount,
							"onUpdate:modelValue": ($event) => _ctx.amount = $event,
							class: "w-100",
							onInput: ($event) => _ctx.amountInput($event)
						}, null, _parent, _scopeId));
						_push(`<label for="amount"${_scopeId}>Amount</label>`);
					} else return [createVNode(_component_InputText, {
						id: "amount",
						type: "text",
						modelValue: _ctx.amount,
						"onUpdate:modelValue": ($event) => _ctx.amount = $event,
						class: "w-100",
						onInput: ($event) => _ctx.amountInput($event)
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					]), createVNode("label", { for: "amount" }, "Amount")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col-4">`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_InputText, {
							id: "speacialamount",
							type: "text",
							modelValue: _ctx.speacialAmount,
							"onUpdate:modelValue": ($event) => _ctx.speacialAmount = $event,
							onInput: ($event) => _ctx.speacialAmount = $event.replace(",", "."),
							class: "w-100"
						}, null, _parent, _scopeId));
						_push(`<label for="speacialamount"${_scopeId}>Sqm</label>`);
					} else return [createVNode(_component_InputText, {
						id: "speacialamount",
						type: "text",
						modelValue: _ctx.speacialAmount,
						"onUpdate:modelValue": ($event) => _ctx.speacialAmount = $event,
						onInput: ($event) => _ctx.speacialAmount = $event.replace(",", "."),
						class: "w-100"
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"onInput"
					]), createVNode("label", { for: "speacialamount" }, "Sqm")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col-4">`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_InputText, {
							id: "crateamount",
							type: "text",
							modelValue: _ctx.crateAmount,
							"onUpdate:modelValue": ($event) => _ctx.crateAmount = $event,
							class: "w-100"
						}, null, _parent, _scopeId));
						_push(`<label for="crateamount"${_scopeId}>Crate Amount</label>`);
					} else return [createVNode(_component_InputText, {
						id: "crateamount",
						type: "text",
						modelValue: _ctx.crateAmount,
						"onUpdate:modelValue": ($event) => _ctx.crateAmount = $event,
						class: "w-100"
					}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "crateamount" }, "Crate Amount")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="row g-3 mb-3"><div class="col"><div class="flex align-items-center">`);
			_push(ssrRenderComponent(_component_Checkbox, {
				modelValue: _ctx.boxStatus,
				"onUpdate:modelValue": ($event) => _ctx.boxStatus = $event,
				inputId: "box",
				binary: true
			}, null, _parent));
			_push(`<label for="box" class="ml-2"> Box </label></div></div><div class="col"><div class="flex align-items-center">`);
			_push(ssrRenderComponent(_component_Checkbox, {
				modelValue: _ctx.stringStatus,
				"onUpdate:modelValue": ($event) => _ctx.stringStatus = $event,
				inputId: "string",
				binary: true
			}, null, _parent));
			_push(`<label for="string" class="ml-2"> Binded </label></div></div><div class="col"><div class="flex align-items-center">`);
			_push(ssrRenderComponent(_component_Checkbox, {
				modelValue: _ctx.outStatus,
				"onUpdate:modelValue": ($event) => _ctx.outStatus = $event,
				inputId: "out",
				binary: true
			}, null, _parent));
			_push(`<label for="out" class="ml-2"> Out </label></div></div><div class="col"><div class="flex align-items-center">`);
			_push(ssrRenderComponent(_component_Checkbox, {
				modelValue: _ctx.notFindStatus,
				"onUpdate:modelValue": ($event) => _ctx.notFindStatus = $event,
				inputId: "notFind",
				binary: true
			}, null, _parent));
			_push(`<label for="notFind" class="ml-2"> N.Found </label></div></div><div class="col"><div class="flex align-items-center">`);
			_push(ssrRenderComponent(_component_Checkbox, {
				modelValue: _ctx.fasonStatus,
				"onUpdate:modelValue": ($event) => _ctx.fasonStatus = $event,
				inputId: "fason_status",
				binary: true
			}, null, _parent));
			_push(`<label for="fason_status" class="ml-2"> Fason </label></div></div><div class="col"><div class="flex align-items-center">`);
			_push(ssrRenderComponent(_component_Checkbox, {
				modelValue: _ctx.kutulamaStatus,
				"onUpdate:modelValue": ($event) => _ctx.kutulamaStatus = $event,
				inputId: "kutulama_status",
				binary: true
			}, null, _parent));
			_push(`<label for="kutulama_status" class="ml-2"> Kutulama </label></div></div></div><div class="row g-3">`);
			_push(ssrRenderComponent(_component_Textarea, {
				modelValue: _ctx.description,
				"onUpdate:modelValue": ($event) => _ctx.description = $event,
				rows: "5",
				cols: "25"
			}, null, _parent));
			_push(`</div></div><div class="col"><div class="row"><div class="col-6 mb-2">`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_InputText, {
							id: "category",
							type: "text",
							modelValue: _ctx.categoryName,
							"onUpdate:modelValue": ($event) => _ctx.categoryName = $event,
							disabled: ""
						}, null, _parent, _scopeId));
						_push(`<label for="category"${_scopeId}>Category</label>`);
					} else return [createVNode(_component_InputText, {
						id: "category",
						type: "text",
						modelValue: _ctx.categoryName,
						"onUpdate:modelValue": ($event) => _ctx.categoryName = $event,
						disabled: ""
					}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "category" }, "Category")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col-6">`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_InputText, {
							id: "product",
							type: "text",
							modelValue: _ctx.productName,
							"onUpdate:modelValue": ($event) => _ctx.productName = $event,
							disabled: ""
						}, null, _parent, _scopeId));
						_push(`<label for="product"${_scopeId}>Product</label>`);
					} else return [createVNode(_component_InputText, {
						id: "product",
						type: "text",
						modelValue: _ctx.productName,
						"onUpdate:modelValue": ($event) => _ctx.productName = $event,
						disabled: ""
					}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "product" }, "Product")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="row"><div class="col-6">`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_InputText, {
							id: "surface",
							type: "text",
							modelValue: _ctx.surfaceName,
							"onUpdate:modelValue": ($event) => _ctx.surfaceName = $event,
							disabled: ""
						}, null, _parent, _scopeId));
						_push(`<label for="surface"${_scopeId}>Surface</label>`);
					} else return [createVNode(_component_InputText, {
						id: "surface",
						type: "text",
						modelValue: _ctx.surfaceName,
						"onUpdate:modelValue": ($event) => _ctx.surfaceName = $event,
						disabled: ""
					}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "surface" }, "Surface")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="col-6">`);
			_push(ssrRenderComponent(_component_FloatLabel, null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_InputText, {
							id: "size",
							type: "text",
							modelValue: _ctx.sizeName,
							"onUpdate:modelValue": ($event) => _ctx.sizeName = $event,
							disabled: ""
						}, null, _parent, _scopeId));
						_push(`<label for="size"${_scopeId}>Size</label>`);
					} else return [createVNode(_component_InputText, {
						id: "size",
						type: "text",
						modelValue: _ctx.sizeName,
						"onUpdate:modelValue": ($event) => _ctx.sizeName = $event,
						disabled: ""
					}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("label", { for: "size" }, "Size")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></div><div class="container"><div class="row m-auto text-center"><div class="col">`);
			_push(ssrRenderComponent(_component_Button, {
				type: "button",
				severity: "success",
				class: "w-100",
				label: "Save",
				onClick: _ctx.saveProcess
			}, null, _parent));
			_push(`</div>`);
			if (!__props.buttonStatus) {
				_push(`<div class="col">`);
				_push(ssrRenderComponent(_component_Button, {
					type: "button",
					severity: "danger",
					class: "w-100",
					label: "Delete",
					onClick: _ctx.deleteForm
				}, null, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div></div>`);
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.product_cards_form_dialog,
				"onUpdate:visible": ($event) => _ctx.product_cards_form_dialog = $event,
				header: "Ürün Kartları",
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_productCards, { onCards_selected_emit: ($event) => _ctx.productCardsSelected($event) }, null, _parent, _scopeId));
					else return [createVNode(_component_productCards, { onCards_selected_emit: ($event) => _ctx.productCardsSelected($event) }, null, 8, ["onCards_selected_emit"])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/selection/input/Form.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region app/pages/selection/input.vue
var _sfc_main = /*@__PURE__*/ Object.assign({
	computed: {
		selectionStore() {
			return useSelectionStore();
		},
		sharedStore() {
			return useSharedStore();
		},
		orderStore() {
			return useOrderStore();
		}
	},
	data() {
		return {
			productsButtonStatus: 1,
			selection_production_dialog_form: false,
			model: {}
		};
	},
	mounted() {
		this.fetchProductionList();
		this.selectionStore.setSelectionProductionTotal();
		this.selectionStore.setSelectionProductsList();
		this.selectionStore.setSelectionProductionMekmerButtonStatus();
	},
	methods: {
		fetchProductionList() {
			this.orderStore.setOrderProductionList();
			this.sharedStore.setOrderProductionList();
		},
		productsStatusSelected(event) {
			this.productsButtonStatus = event;
			if (event == 1) {
				this.selectionStore.setSelectionProductionMekmerButton();
				this.selectionStore.setSelectionProductionMekmerButtonStatus();
			} else if (event == 2) {
				this.selectionStore.setSelectionProductionDisButton();
				this.selectionStore.setSelectionProductionDisButtonStatus();
			} else if (event == 3) {
				this.selectionStore.setSelectionProductionMekmerDisButton();
				this.selectionStore.setSelectionProductionMekmerDisButtonStatus();
			} else if (event == 4) {
				this.selectionStore.setSelectionProductionBulunamadiButton();
				this.selectionStore.setSelectionProductionBulunamadiButtonStatus();
			}
		},
		productSelectedEmit(event) {
			this.sharedStore.setCardList();
			this.selection_production_dialog_form = true;
			this.model = event.data;
			this.selectionStore.setSelectionProductionButtonStatus(false);
		}
	}
}, {
	__name: "input",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useOrderStore();
		const selectionSharedStore = useSharedStore();
		useRealtime();
		[__temp, __restore] = withAsyncContext(() => useReferenceData("selection-input", [["supplierList", () => selectionSharedStore.setSupplierList()], ["mineList", () => selectionSharedStore.setMineList()]])), await __temp, __restore();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_SelectionInputPanel = Panel_default;
			const _component_SelectionInputList = List_default;
			const _component_Dialog = script;
			const _component_SelectionInputForm = _sfc_main$1;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}>`);
			_push(ssrRenderComponent(_component_SelectionInputPanel, {
				productionTotal: _ctx.selectionStore.getProductionTotal,
				onProducts_status_selected: ($event) => _ctx.productsStatusSelected($event),
				onSelection_production_dialog: ($event) => _ctx.selection_production_dialog_form = true
			}, null, _parent));
			_push(ssrRenderComponent(_component_SelectionInputList, {
				products: _ctx.selectionStore.getProductList,
				total: _ctx.selectionStore.getProductionSumTotal,
				onProduct_selected_emit: ($event) => _ctx.productSelectedEmit($event)
			}, null, _parent));
			_push(ssrRenderComponent(_component_Dialog, {
				visible: _ctx.selection_production_dialog_form,
				"onUpdate:visible": ($event) => _ctx.selection_production_dialog_form = $event,
				header: "",
				modal: ""
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_SelectionInputForm, {
						suppliers: _ctx.sharedStore.getSupplierList,
						orders: _ctx.sharedStore.getOrderProductionList,
						products: _ctx.selectionStore.getProductionProductsList,
						mines: _ctx.sharedStore.getMineList,
						model: _ctx.model,
						buttonStatus: _ctx.selectionStore.getProductionButtonStatus,
						onSelection_production_dialog_form: ($event) => _ctx.selection_production_dialog_form = $event
					}, null, _parent, _scopeId));
					else return [createVNode(_component_SelectionInputForm, {
						suppliers: _ctx.sharedStore.getSupplierList,
						orders: _ctx.sharedStore.getOrderProductionList,
						products: _ctx.selectionStore.getProductionProductsList,
						mines: _ctx.sharedStore.getMineList,
						model: _ctx.model,
						buttonStatus: _ctx.selectionStore.getProductionButtonStatus,
						onSelection_production_dialog_form: ($event) => _ctx.selection_production_dialog_form = $event
					}, null, 8, [
						"suppliers",
						"orders",
						"products",
						"mines",
						"model",
						"buttonStatus",
						"onSelection_production_dialog_form"
					])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/selection/input.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=input-Cfs66fh4.mjs.map
