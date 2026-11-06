import { _ as _plugin_vue_export_helper_default, f as formatDecimal, e as formatPriceUsd, u as useCookie, a as useAppToast } from '../virtual/entry.mjs';
import { n as script$3 } from './button-C8Z7Yc79.mjs';
import { n as script$5 } from './column-CT6GXkG2.mjs';
import { n as script$4 } from './datatable-D6ou7HZJ.mjs';
import { t as script$2 } from './select-T8LIeBQG.mjs';
import { t as toIsoDate } from './dates-C-BBx50j.mjs';
import { n as script } from './dialog-BB6no0wu.mjs';
import { u as useApi } from './useApi-CGFzrxZs.mjs';
import { n as script$6 } from './message-DvSNQ9wF.mjs';
import { C as CustomInput_default } from './CustomInput-B9GfGXia.mjs';
import { u as useOrderStore } from './order-C0FMsqTx.mjs';
import { t as script$1 } from './tag-CObxgYIW.mjs';
import { mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';

//#region app/components/order/DivideDialog.vue
var MONEY_FIELDS = [
	{
		label: "Prepayment",
		source: "Pesinat",
		giden: "gidenPesinat",
		kalan: "kalanPesinat"
	},
	{
		label: "Goods Amount",
		source: "MalBedeli",
		giden: "gidenMalBedeli",
		kalan: "kalanMalBedeli"
	},
	{
		label: "Freight Selling",
		source: "NavlunSatis",
		giden: "gidenNavlunSatis",
		kalan: "kalanNavlunSatis"
	},
	{
		label: "Freight Buying",
		source: "NavlunAlis",
		giden: "gidenNavlunAlis",
		kalan: "kalanNavlunAlis"
	},
	{
		label: "Detail 1 Selling",
		source: "DetayTutar_1",
		giden: "gidenDetaySatis_1",
		kalan: "kalanDetaySatis_1"
	},
	{
		label: "Detail 1 Buying",
		source: "DetayAlis_1",
		giden: "gidenDetayAlis_1",
		kalan: "kalanDetayAlis_1"
	},
	{
		label: "Detail 2 Selling",
		source: "DetayTutar_2",
		giden: "gidenDetaySatis_2",
		kalan: "kalanDetaySatis_2"
	},
	{
		label: "Detail 2 Buying",
		source: "DetayAlis_2",
		giden: "gidenDetayAlis_2",
		kalan: "kalanDetayAlis_2"
	},
	{
		label: "Detail 3 Selling",
		source: "DetayTutar_3",
		giden: "gidenDetaySatis_3",
		kalan: "kalanDetaySatis_3"
	},
	{
		label: "Detail 3 Buying",
		source: "DetayAlis_3",
		giden: "gidenDetayAlis_3",
		kalan: "kalanDetayAlis_3"
	}
];
var EPSILON = .001;
var UNIT_LABELS = {
	1: "sqm",
	2: "pcs",
	3: "mt"
};
var emptyProductRow = () => ({
	id: 0,
	urunAdi: "",
	siparisno: "",
	tedarikciId: 0,
	urunKartId: 0,
	urunBirimId: 0,
	miktar: 0,
	gonderilen: 0,
	kalan: 0,
	satisFiyat: 0,
	alisFiyati: 0,
	uretimAciklama: "",
	musteriAciklama: "",
	siraNo: 0,
	ton: 0,
	adet: 0
});
var _sfc_main = {
	props: {
		visible: {
			type: Boolean,
			required: true
		},
		productionModel: {
			type: Object,
			required: true
		}
	},
	emits: ["update:visible", "divided"],
	data() {
		return {
			MONEY_FIELDS,
			selectedProduct: null,
			selectedDivideRow: null,
			productRow: emptyProductRow(),
			editingExistingRow: false,
			divideRows: [],
			shares: {},
			poPreview: {
				giden: "",
				kalan: ""
			},
			saving: false,
			failure: null
		};
	},
	computed: {
		orderStore() {
			return useOrderStore();
		},
		productRowDifference() {
			return Number(this.productRow.gonderilen) + Number(this.productRow.kalan) - Number(this.productRow.miktar);
		},
		productRowBalanced() {
			return Math.abs(this.productRowDifference) < EPSILON;
		},
		untouchedProducts() {
			const handled = new Set(this.divideRows.map((row) => row.id));
			return this.orderStore.getOrderProductionDivideList.filter((product) => !handled.has(product.UrunId));
		},
		allBalanced() {
			const everyAmount = MONEY_FIELDS.every((field) => this.amountBalanced(field));
			const everyRow = this.divideRows.every((row) => Math.abs(Number(row.gonderilen) + Number(row.kalan) - Number(row.miktar)) < EPSILON);
			return everyAmount && everyRow;
		}
	},
	watch: { visible(isOpen) {
		if (isOpen) this.reset();
	} },
	methods: {
		unitLabel(id) {
			return UNIT_LABELS[id] || "";
		},
		originalAmount(field) {
			return Number(this.productionModel[field.source]) || 0;
		},
		amountDifference(field) {
			return Number(this.shares[field.giden] || 0) + Number(this.shares[field.kalan] || 0) - this.originalAmount(field);
		},
		amountBalanced(field) {
			return Math.abs(this.amountDifference(field)) < EPSILON;
		},
		setShare(field, side, value) {
			const other = side === "giden" ? field.kalan : field.giden;
			const key = side === "giden" ? field.giden : field.kalan;
			this.shares[key] = value;
			this.shares[other] = Number((this.originalAmount(field) - value).toFixed(2));
		},
		setGonderilen(value) {
			this.productRow.gonderilen = value;
			this.productRow.kalan = Number((Number(this.productRow.miktar) - value).toFixed(4));
		},
		setKalan(value) {
			this.productRow.kalan = value;
			this.productRow.gonderilen = Number((Number(this.productRow.miktar) - value).toFixed(4));
		},
		reset() {
			this.selectedProduct = null;
			this.selectedDivideRow = null;
			this.productRow = emptyProductRow();
			this.editingExistingRow = false;
			this.divideRows = [];
			this.saving = false;
			this.failure = null;
			const shares = {};
			for (const field of MONEY_FIELDS) {
				shares[field.giden] = this.originalAmount(field);
				shares[field.kalan] = 0;
			}
			this.shares = shares;
			this.loadPoPreview();
			this.loadProducts();
		},
		loadPoPreview() {
			this.poPreview = {
				giden: "",
				kalan: ""
			};
			useApi()(`/order/divide/po-preview/${this.productionModel.SiparisNo}`).then((res) => {
				if (res.status) this.poPreview = {
					giden: res.giden,
					kalan: res.kalan
				};
				else useAppToast().error("PO numarası hesaplanamadı.");
			}).catch((err) => {
				console.error("po-preview basarisiz:", err);
				useAppToast().error("PO numarası hesaplanamadı.");
			});
		},
		loadProducts() {
			this.orderStore.setOrdersProductsDivideList(this.productionModel.SiparisNo);
		},
		changeSelectedProduct(event) {
			const product = event.value;
			this.editingExistingRow = this.divideRows.some((row) => row.id === product.UrunId);
			const existing = this.divideRows.find((row) => row.id === product.UrunId);
			if (existing) {
				this.productRow = { ...existing };
				return;
			}
			this.productRow = {
				id: product.UrunId,
				urunAdi: product.Urun,
				siparisno: product.SiparisNo,
				tedarikciId: product.TedarikciID,
				urunKartId: product.UrunKartID,
				urunBirimId: product.UrunBirimID,
				miktar: Number(product.Miktar) || 0,
				gonderilen: Number(product.Miktar) || 0,
				kalan: 0,
				satisFiyat: Number(product.SatisFiyati) || 0,
				alisFiyati: Number(product.AlisFiyati) || 0,
				uretimAciklama: product.UretimAciklama,
				musteriAciklama: product.MusteriAciklama,
				siraNo: product.SiraNo,
				ton: product.Ton,
				adet: product.Adet
			};
		},
		saveProductRow() {
			if (!this.productRowBalanced) return;
			const row = { ...this.productRow };
			const index = this.divideRows.findIndex((item) => item.id === row.id);
			if (index === -1) this.divideRows.push(row);
			else this.divideRows.splice(index, 1, row);
			this.clearProductRow();
		},
		clearProductRow() {
			this.selectedProduct = null;
			this.selectedDivideRow = null;
			this.productRow = emptyProductRow();
			this.editingExistingRow = false;
		},
		removeProductRow(row) {
			const index = this.divideRows.findIndex((item) => item.id === row.id);
			if (index !== -1) this.divideRows.splice(index, 1);
			this.clearProductRow();
		},
		divideRowSelected(event) {
			this.productRow = { ...event.data };
			this.editingExistingRow = true;
			this.selectedProduct = this.orderStore.getOrderProductionDivideList.find((product) => product.UrunId === event.data.id) || null;
		},
		showFailure(res) {
			this.failure = {
				step: res && res.step || "",
				satir: res && res.satir,
				urun: res && res.urun,
				message: res && res.message || "Bölme başarısız.",
				geriAlindi: !res || res.geriAlindi !== false
			};
			useAppToast().error(this.failure.message);
		},
		divideProduct() {
			if (!this.allBalanced) return;
			this.saving = true;
			this.failure = null;
			const model = this.productionModel;
			const order = {
				siparisno: model.SiparisNo,
				siparisTarihi: toIsoDate(model.SiparisTarihi),
				odemeTurId: model.OdemeTurID,
				teslimTurId: model.TeslimTurID,
				musteriId: model.MusteriID,
				navlunFirma: model.NavlunFirma,
				kayitTarihi: (/* @__PURE__ */ new Date()).toISOString(),
				kullaniciId: useCookie("userId").value,
				siparisDurumId: model.SiparisDurumID,
				uretimAciklama: model.UretimAciklama,
				sevkiyatAciklama: model.SevkiyatAciklama,
				finansAciklama: model.FinansAciklama,
				odemeAciklama: model.OdemeAciklama,
				TahminiYuklemeTarihi: toIsoDate(model.TahminiYuklemeTarihi),
				vade: model.Vade ? toIsoDate(model.Vade) : "",
				ulke: model.UlkeAdi,
				komisyon: model.Komisyon,
				detayAciklama_1: model.DetayAciklama_1,
				detayMekmarNot_1: model.DetayMekmarNot_1,
				detayAciklama_2: model.DetayAciklama_2,
				detayMekmarNot_2: model.DetayMekmarNot_2,
				detayAciklama_3: model.DetayAciklama_3,
				detayMekmarNot_3: model.DetayMekmarNot_3,
				siparisSahibi: model.SiparisSahibi,
				evrakGideri: model.EvrakGideri,
				konteynerAyrinti: model.KonteynerAyrinti,
				ulkeId: model.UlkeId,
				faturaKesimTurId: model.FaturaKesimTurID,
				depo_yukleme: model.depo_yukleme,
				operasyon: model.Operasyon,
				finansman: model.Finansman,
				iade: model.Iade,
				sigortaTutar: model.sigorta_Tutar,
				sigortaTutarSatis: model.sigorta_tutar_satis,
				...this.shares
			};
			this.orderStore.setDivide({
				order,
				product: this.divideRows
			}).then((res) => {
				this.saving = false;
				if (!res || !res.status) {
					this.showFailure(res);
					return;
				}
				useAppToast().success(`Bölündü: ${res.siparisno_giden} (gönderilen) + ${res.siparisno_kalan} (kalan)`);
				if (res.kalanaTasinanListeDisiUrun > 0) useAppToast().warn(`${res.kalanaTasinanListeDisiUrun} ürün listede yoktu, tamamı ${res.siparisno_kalan} siparişine taşındı.`);
				this.$emit("update:visible", false);
				this.$emit("divided", res);
			}).catch((err) => {
				this.saving = false;
				console.error("divide basarisiz:", err);
				if (err && err.data && (err.data.message || err.data.step)) {
					this.showFailure(err.data);
					return;
				}
				const kod = err && err.statusCode || 0;
				this.failure = {
					step: "sunucuya ulasma",
					message: kod === 403 ? "İstek pilotun salt-okunur kilidi tarafından durduruldu (403). Bölme veritabanına yazdığı için kilit açılmadan çalışmaz." : `Sunucuya ulaşılamadı${kod ? ` (HTTP ${kod})` : ""}: ${err && err.message || "bilinmeyen hata"}`,
					geriAlindi: true
				};
				useAppToast().error(this.failure.message);
			});
		}
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_Dialog = script;
	const _component_Tag = script$1;
	const _component_Select = script$2;
	const _component_CustomInput = CustomInput_default;
	const _component_Button = script$3;
	const _component_DataTable = script$4;
	const _component_Column = script$5;
	const _component_Message = script$6;
	_push(ssrRenderComponent(_component_Dialog, mergeProps({
		visible: $props.visible,
		"onUpdate:visible": ($event) => _ctx.$emit("update:visible", $event),
		header: "Divide",
		modal: "",
		style: { width: "95%" },
		breakpoints: {
			"1199px": "95vw",
			"575px": "98vw"
		}
	}, _attrs), {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(`<div class="row mb-3"${_scopeId}><div class="col"${_scopeId}><div class="p-3 border-round surface-100"${_scopeId}><span class="font-bold"${_scopeId}>${ssrInterpolate($props.productionModel.SiparisNo)}</span><span class="mx-2"${_scopeId}>→</span>`);
				_push(ssrRenderComponent(_component_Tag, {
					severity: "success",
					value: $data.poPreview.giden || "...",
					class: "mr-2"
				}, null, _parent, _scopeId));
				_push(`<span class="mr-2"${_scopeId}>(gönderilen)</span>`);
				_push(ssrRenderComponent(_component_Tag, {
					severity: "warn",
					value: $data.poPreview.kalan || "...",
					class: "mr-2"
				}, null, _parent, _scopeId));
				_push(`<span${_scopeId}>(kalan)</span></div></div></div><h3 class="text-center m-auto"${_scopeId}>Products</h3><div class="row mb-3"${_scopeId}><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_Select, {
					modelValue: $data.selectedProduct,
					"onUpdate:modelValue": ($event) => $data.selectedProduct = $event,
					options: $options.orderStore.getOrderProductionDivideList,
					optionLabel: "Urun",
					placeholder: "Select a Product",
					onChange: ($event) => $options.changeSelectedProduct($event)
				}, null, _parent, _scopeId));
				_push(`</div></div>`);
				if ($data.selectedProduct) _push(`<div class="row"${_scopeId}><div class="col"${_scopeId}><table class="table"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th scope="col"${_scopeId}>Supplier</th><th scope="col"${_scopeId}>Category</th><th scope="col"${_scopeId}>Product</th><th scope="col"${_scopeId}>Surface</th><th scope="col"${_scopeId}>Width</th><th scope="col"${_scopeId}>Height</th><th scope="col"${_scopeId}>Thickness</th><th scope="col"${_scopeId}>Unit</th><th scope="col"${_scopeId}>Amount</th></tr></thead><tbody${_scopeId}><tr${_scopeId}><th scope="row"${_scopeId}>${ssrInterpolate($data.selectedProduct.FirmaAdi)}</th><td${_scopeId}>${ssrInterpolate($data.selectedProduct.KategoriAdi)}</td><td${_scopeId}>${ssrInterpolate($data.selectedProduct.UrunAdi)}</td><td${_scopeId}>${ssrInterpolate($data.selectedProduct.YuzeyIslemAdi)}</td><td${_scopeId}>${ssrInterpolate($data.selectedProduct.En)}</td><td${_scopeId}>${ssrInterpolate($data.selectedProduct.Boy)}</td><td${_scopeId}>${ssrInterpolate($data.selectedProduct.Kenar)}</td><td${_scopeId}>${ssrInterpolate($data.selectedProduct.BirimAdi)}</td><td${_scopeId}>${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.selectedProduct.Miktar))}</td></tr></tbody></table></div></div>`);
				else _push(`<!---->`);
				if ($data.selectedProduct) {
					_push(`<div class="row"${_scopeId}><div class="col"${_scopeId}>`);
					_push(ssrRenderComponent(_component_CustomInput, {
						value: $data.productRow.gonderilen,
						text: "Outgoing",
						onOnInput: ($event) => $options.setGonderilen($event)
					}, null, _parent, _scopeId));
					_push(`</div><div class="col"${_scopeId}>`);
					_push(ssrRenderComponent(_component_CustomInput, {
						value: $data.productRow.kalan,
						text: "Remainder",
						onOnInput: ($event) => $options.setKalan($event)
					}, null, _parent, _scopeId));
					_push(`</div><div class="col flex align-items-center"${_scopeId}>`);
					if ($options.productRowBalanced) _push(ssrRenderComponent(_component_Tag, {
						severity: "success",
						value: "✓ miktar tam"
					}, null, _parent, _scopeId));
					else _push(ssrRenderComponent(_component_Tag, {
						severity: "danger",
						value: `fark: ${("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($options.productRowDifference)}`
					}, null, _parent, _scopeId));
					_push(`</div></div>`);
				} else _push(`<!---->`);
				if ($data.selectedProduct) {
					_push(`<div class="row mt-2"${_scopeId}><div class="col"${_scopeId}>`);
					_push(ssrRenderComponent(_component_Button, {
						type: "button",
						severity: "success",
						class: "w-100",
						label: $data.editingExistingRow ? "Update" : "Add",
						disabled: !$options.productRowBalanced,
						onClick: $options.saveProductRow
					}, null, _parent, _scopeId));
					_push(`</div><div class="col"${_scopeId}>`);
					_push(ssrRenderComponent(_component_Button, {
						type: "button",
						severity: "secondary",
						class: "w-100",
						label: "Clear",
						onClick: $options.clearProductRow
					}, null, _parent, _scopeId));
					_push(`</div></div>`);
				} else _push(`<!---->`);
				_push(`<div class="row mt-3"${_scopeId}><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_DataTable, {
					value: $data.divideRows,
					responsiveLayout: "scroll",
					selection: $data.selectedDivideRow,
					"onUpdate:selection": ($event) => $data.selectedDivideRow = $event,
					selectionMode: "single",
					onRowClick: ($event) => $options.divideRowSelected($event)
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_Column, {
								field: "urunAdi",
								header: "Product"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "musteriAciklama",
								header: "Desc."
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "urunBirimId",
								header: "Unit"
							}, {
								body: withCtx((slotProps, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate($options.unitLabel(slotProps.data.urunBirimId))}`);
									else return [createTextVNode(toDisplayString($options.unitLabel(slotProps.data.urunBirimId)), 1)];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "miktar",
								header: "Total"
							}, {
								body: withCtx((slotProps, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.miktar))}`);
									else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.miktar)), 1)];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "gonderilen",
								header: "Outgoing"
							}, {
								body: withCtx((slotProps, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.gonderilen))}`);
									else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.gonderilen)), 1)];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, {
								field: "kalan",
								header: "Remainder"
							}, {
								body: withCtx((slotProps, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.kalan))}`);
									else return [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.kalan)), 1)];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_Column, { header: "" }, {
								body: withCtx((slotProps, _push, _parent, _scopeId) => {
									if (_push) _push(ssrRenderComponent(_component_Button, {
										type: "button",
										severity: "danger",
										text: "",
										label: "Remove",
										onClick: ($event) => $options.removeProductRow(slotProps.data)
									}, null, _parent, _scopeId));
									else return [createVNode(_component_Button, {
										type: "button",
										severity: "danger",
										text: "",
										label: "Remove",
										onClick: ($event) => $options.removeProductRow(slotProps.data)
									}, null, 8, ["onClick"])];
								}),
								_: 1
							}, _parent, _scopeId));
						} else return [
							createVNode(_component_Column, {
								field: "urunAdi",
								header: "Product"
							}),
							createVNode(_component_Column, {
								field: "musteriAciklama",
								header: "Desc."
							}),
							createVNode(_component_Column, {
								field: "urunBirimId",
								header: "Unit"
							}, {
								body: withCtx((slotProps) => [createTextVNode(toDisplayString($options.unitLabel(slotProps.data.urunBirimId)), 1)]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "miktar",
								header: "Total"
							}, {
								body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.miktar)), 1)]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "gonderilen",
								header: "Outgoing"
							}, {
								body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.gonderilen)), 1)]),
								_: 1
							}),
							createVNode(_component_Column, {
								field: "kalan",
								header: "Remainder"
							}, {
								body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.kalan)), 1)]),
								_: 1
							}),
							createVNode(_component_Column, { header: "" }, {
								body: withCtx((slotProps) => [createVNode(_component_Button, {
									type: "button",
									severity: "danger",
									text: "",
									label: "Remove",
									onClick: ($event) => $options.removeProductRow(slotProps.data)
								}, null, 8, ["onClick"])]),
								_: 1
							})
						];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div></div>`);
				if ($options.untouchedProducts.length) {
					_push(`<div class="row mt-2"${_scopeId}><div class="col"${_scopeId}>`);
					_push(ssrRenderComponent(_component_Message, {
						severity: "info",
						closable: false
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(` Listeye eklenmeyen ${ssrInterpolate($options.untouchedProducts.length)} ürün tamamen <b${_scopeId}>${ssrInterpolate($data.poPreview.kalan || "kalan")}</b> siparişine taşınacak: ${ssrInterpolate($options.untouchedProducts.map((x) => x.Urun).join(", "))}`);
							else return [
								createTextVNode(" Listeye eklenmeyen " + toDisplayString($options.untouchedProducts.length) + " ürün tamamen ", 1),
								createVNode("b", null, toDisplayString($data.poPreview.kalan || "kalan"), 1),
								createTextVNode(" siparişine taşınacak: " + toDisplayString($options.untouchedProducts.map((x) => x.Urun).join(", ")), 1)
							];
						}),
						_: 1
					}, _parent, _scopeId));
					_push(`</div></div>`);
				} else _push(`<!---->`);
				_push(`<hr${_scopeId}><h3 class="text-center m-auto"${_scopeId}>Order</h3><!--[-->`);
				ssrRenderList($data.MONEY_FIELDS, (field) => {
					_push(`<div class="row"${_scopeId}><div class="col-12 col-md-3 flex align-items-center"${_scopeId}><span class="font-bold"${_scopeId}>${ssrInterpolate(field.label)}</span><span class="ml-2"${_scopeId}>${ssrInterpolate(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($options.originalAmount(field)))}</span></div><div class="col"${_scopeId}>`);
					_push(ssrRenderComponent(_component_CustomInput, {
						value: $data.shares[field.giden],
						text: "Outgoing",
						onOnInput: ($event) => $options.setShare(field, "giden", $event)
					}, null, _parent, _scopeId));
					_push(`</div><div class="col"${_scopeId}>`);
					_push(ssrRenderComponent(_component_CustomInput, {
						value: $data.shares[field.kalan],
						text: "Remainder",
						onOnInput: ($event) => $options.setShare(field, "kalan", $event)
					}, null, _parent, _scopeId));
					_push(`</div><div class="col-12 col-md-2 flex align-items-center"${_scopeId}>`);
					if ($options.amountBalanced(field)) _push(ssrRenderComponent(_component_Tag, {
						severity: "success",
						value: "✓"
					}, null, _parent, _scopeId));
					else _push(ssrRenderComponent(_component_Tag, {
						severity: "danger",
						value: `fark: ${("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($options.amountDifference(field))}`
					}, null, _parent, _scopeId));
					_push(`</div></div>`);
				});
				_push(`<!--]--><br${_scopeId}>`);
				if (!$options.allBalanced) {
					_push(`<div class="row"${_scopeId}><div class="col"${_scopeId}>`);
					_push(ssrRenderComponent(_component_Message, {
						severity: "warn",
						closable: false
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(` Bölme için her satırın gönderilen + kalan toplamı orijinal değere eşit olmalı. Dengelenmeyen satırlar kırmızı işaretli. `);
							else return [createTextVNode(" Bölme için her satırın gönderilen + kalan toplamı orijinal değere eşit olmalı. Dengelenmeyen satırlar kırmızı işaretli. ")];
						}),
						_: 1
					}, _parent, _scopeId));
					_push(`</div></div>`);
				} else _push(`<!---->`);
				if ($data.failure) {
					_push(`<div class="row"${_scopeId}><div class="col"${_scopeId}>`);
					_push(ssrRenderComponent(_component_Message, {
						severity: "error",
						closable: false
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								if ($data.failure.step) _push(`<div${_scopeId}><b${_scopeId}>Hata adımı:</b> ${ssrInterpolate($data.failure.step)}</div>`);
								else _push(`<!---->`);
								if ($data.failure.satir) {
									_push(`<div${_scopeId}><b${_scopeId}>Satır:</b> ${ssrInterpolate($data.failure.satir)} `);
									if ($data.failure.urun) _push(`<span${_scopeId}>— ${ssrInterpolate($data.failure.urun)}</span>`);
									else _push(`<!---->`);
									_push(`</div>`);
								} else _push(`<!---->`);
								_push(`<div${_scopeId}>${ssrInterpolate($data.failure.message)}</div>`);
								if ($data.failure.geriAlindi) _push(`<div class="mt-2"${_scopeId}> İşlem geri alındı: veritabanında <b${_scopeId}>hiçbir değişiklik olmadı</b>, sipariş bölünmemiş durumda. Düzeltip yeniden deneyebilirsiniz. </div>`);
								else _push(`<!---->`);
							} else return [
								$data.failure.step ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("b", null, "Hata adımı:"), createTextVNode(" " + toDisplayString($data.failure.step), 1)])) : createCommentVNode("", true),
								$data.failure.satir ? (openBlock(), createBlock("div", { key: 1 }, [
									createVNode("b", null, "Satır:"),
									createTextVNode(" " + toDisplayString($data.failure.satir) + " ", 1),
									$data.failure.urun ? (openBlock(), createBlock("span", { key: 0 }, "— " + toDisplayString($data.failure.urun), 1)) : createCommentVNode("", true)
								])) : createCommentVNode("", true),
								createVNode("div", null, toDisplayString($data.failure.message), 1),
								$data.failure.geriAlindi ? (openBlock(), createBlock("div", {
									key: 2,
									class: "mt-2"
								}, [
									createTextVNode(" İşlem geri alındı: veritabanında "),
									createVNode("b", null, "hiçbir değişiklik olmadı"),
									createTextVNode(", sipariş bölünmemiş durumda. Düzeltip yeniden deneyebilirsiniz. ")
								])) : createCommentVNode("", true)
							];
						}),
						_: 1
					}, _parent, _scopeId));
					_push(`</div></div>`);
				} else _push(`<!---->`);
				_push(`<div class="row"${_scopeId}><div class="col"${_scopeId}>`);
				_push(ssrRenderComponent(_component_Button, {
					type: "button",
					severity: "success",
					class: "w-100",
					label: "Divide",
					loading: $data.saving,
					disabled: !$options.allBalanced || $data.saving,
					onClick: $options.divideProduct
				}, null, _parent, _scopeId));
				_push(`</div></div>`);
			} else return [
				createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode("div", { class: "p-3 border-round surface-100" }, [
					createVNode("span", { class: "font-bold" }, toDisplayString($props.productionModel.SiparisNo), 1),
					createVNode("span", { class: "mx-2" }, "→"),
					createVNode(_component_Tag, {
						severity: "success",
						value: $data.poPreview.giden || "...",
						class: "mr-2"
					}, null, 8, ["value"]),
					createVNode("span", { class: "mr-2" }, "(gönderilen)"),
					createVNode(_component_Tag, {
						severity: "warn",
						value: $data.poPreview.kalan || "...",
						class: "mr-2"
					}, null, 8, ["value"]),
					createVNode("span", null, "(kalan)")
				])])]),
				createVNode("h3", { class: "text-center m-auto" }, "Products"),
				createVNode("div", { class: "row mb-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_Select, {
					modelValue: $data.selectedProduct,
					"onUpdate:modelValue": ($event) => $data.selectedProduct = $event,
					options: $options.orderStore.getOrderProductionDivideList,
					optionLabel: "Urun",
					placeholder: "Select a Product",
					onChange: ($event) => $options.changeSelectedProduct($event)
				}, null, 8, [
					"modelValue",
					"onUpdate:modelValue",
					"options",
					"onChange"
				])])]),
				$data.selectedProduct ? (openBlock(), createBlock("div", {
					key: 0,
					class: "row"
				}, [createVNode("div", { class: "col" }, [createVNode("table", { class: "table" }, [createVNode("thead", null, [createVNode("tr", null, [
					createVNode("th", { scope: "col" }, "Supplier"),
					createVNode("th", { scope: "col" }, "Category"),
					createVNode("th", { scope: "col" }, "Product"),
					createVNode("th", { scope: "col" }, "Surface"),
					createVNode("th", { scope: "col" }, "Width"),
					createVNode("th", { scope: "col" }, "Height"),
					createVNode("th", { scope: "col" }, "Thickness"),
					createVNode("th", { scope: "col" }, "Unit"),
					createVNode("th", { scope: "col" }, "Amount")
				])]), createVNode("tbody", null, [createVNode("tr", null, [
					createVNode("th", { scope: "row" }, toDisplayString($data.selectedProduct.FirmaAdi), 1),
					createVNode("td", null, toDisplayString($data.selectedProduct.KategoriAdi), 1),
					createVNode("td", null, toDisplayString($data.selectedProduct.UrunAdi), 1),
					createVNode("td", null, toDisplayString($data.selectedProduct.YuzeyIslemAdi), 1),
					createVNode("td", null, toDisplayString($data.selectedProduct.En), 1),
					createVNode("td", null, toDisplayString($data.selectedProduct.Boy), 1),
					createVNode("td", null, toDisplayString($data.selectedProduct.Kenar), 1),
					createVNode("td", null, toDisplayString($data.selectedProduct.BirimAdi), 1),
					createVNode("td", null, toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($data.selectedProduct.Miktar)), 1)
				])])])])])) : createCommentVNode("", true),
				$data.selectedProduct ? (openBlock(), createBlock("div", {
					key: 1,
					class: "row"
				}, [
					createVNode("div", { class: "col" }, [createVNode(_component_CustomInput, {
						value: $data.productRow.gonderilen,
						text: "Outgoing",
						onOnInput: ($event) => $options.setGonderilen($event)
					}, null, 8, ["value", "onOnInput"])]),
					createVNode("div", { class: "col" }, [createVNode(_component_CustomInput, {
						value: $data.productRow.kalan,
						text: "Remainder",
						onOnInput: ($event) => $options.setKalan($event)
					}, null, 8, ["value", "onOnInput"])]),
					createVNode("div", { class: "col flex align-items-center" }, [$options.productRowBalanced ? (openBlock(), createBlock(_component_Tag, {
						key: 0,
						severity: "success",
						value: "✓ miktar tam"
					})) : (openBlock(), createBlock(_component_Tag, {
						key: 1,
						severity: "danger",
						value: `fark: ${("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))($options.productRowDifference)}`
					}, null, 8, ["value"]))])
				])) : createCommentVNode("", true),
				$data.selectedProduct ? (openBlock(), createBlock("div", {
					key: 2,
					class: "row mt-2"
				}, [createVNode("div", { class: "col" }, [createVNode(_component_Button, {
					type: "button",
					severity: "success",
					class: "w-100",
					label: $data.editingExistingRow ? "Update" : "Add",
					disabled: !$options.productRowBalanced,
					onClick: $options.saveProductRow
				}, null, 8, [
					"label",
					"disabled",
					"onClick"
				])]), createVNode("div", { class: "col" }, [createVNode(_component_Button, {
					type: "button",
					severity: "secondary",
					class: "w-100",
					label: "Clear",
					onClick: $options.clearProductRow
				}, null, 8, ["onClick"])])])) : createCommentVNode("", true),
				createVNode("div", { class: "row mt-3" }, [createVNode("div", { class: "col" }, [createVNode(_component_DataTable, {
					value: $data.divideRows,
					responsiveLayout: "scroll",
					selection: $data.selectedDivideRow,
					"onUpdate:selection": ($event) => $data.selectedDivideRow = $event,
					selectionMode: "single",
					onRowClick: ($event) => $options.divideRowSelected($event)
				}, {
					default: withCtx(() => [
						createVNode(_component_Column, {
							field: "urunAdi",
							header: "Product"
						}),
						createVNode(_component_Column, {
							field: "musteriAciklama",
							header: "Desc."
						}),
						createVNode(_component_Column, {
							field: "urunBirimId",
							header: "Unit"
						}, {
							body: withCtx((slotProps) => [createTextVNode(toDisplayString($options.unitLabel(slotProps.data.urunBirimId)), 1)]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "miktar",
							header: "Total"
						}, {
							body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.miktar)), 1)]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "gonderilen",
							header: "Outgoing"
						}, {
							body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.gonderilen)), 1)]),
							_: 1
						}),
						createVNode(_component_Column, {
							field: "kalan",
							header: "Remainder"
						}, {
							body: withCtx((slotProps) => [createTextVNode(toDisplayString(("formatDecimal" in _ctx ? _ctx.formatDecimal : unref(formatDecimal))(slotProps.data.kalan)), 1)]),
							_: 1
						}),
						createVNode(_component_Column, { header: "" }, {
							body: withCtx((slotProps) => [createVNode(_component_Button, {
								type: "button",
								severity: "danger",
								text: "",
								label: "Remove",
								onClick: ($event) => $options.removeProductRow(slotProps.data)
							}, null, 8, ["onClick"])]),
							_: 1
						})
					]),
					_: 1
				}, 8, [
					"value",
					"selection",
					"onUpdate:selection",
					"onRowClick"
				])])]),
				$options.untouchedProducts.length ? (openBlock(), createBlock("div", {
					key: 3,
					class: "row mt-2"
				}, [createVNode("div", { class: "col" }, [createVNode(_component_Message, {
					severity: "info",
					closable: false
				}, {
					default: withCtx(() => [
						createTextVNode(" Listeye eklenmeyen " + toDisplayString($options.untouchedProducts.length) + " ürün tamamen ", 1),
						createVNode("b", null, toDisplayString($data.poPreview.kalan || "kalan"), 1),
						createTextVNode(" siparişine taşınacak: " + toDisplayString($options.untouchedProducts.map((x) => x.Urun).join(", ")), 1)
					]),
					_: 1
				})])])) : createCommentVNode("", true),
				createVNode("hr"),
				createVNode("h3", { class: "text-center m-auto" }, "Order"),
				(openBlock(true), createBlock(Fragment, null, renderList($data.MONEY_FIELDS, (field) => {
					return openBlock(), createBlock("div", {
						class: "row",
						key: field.source
					}, [
						createVNode("div", { class: "col-12 col-md-3 flex align-items-center" }, [createVNode("span", { class: "font-bold" }, toDisplayString(field.label), 1), createVNode("span", { class: "ml-2" }, toDisplayString(("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($options.originalAmount(field))), 1)]),
						createVNode("div", { class: "col" }, [createVNode(_component_CustomInput, {
							value: $data.shares[field.giden],
							text: "Outgoing",
							onOnInput: ($event) => $options.setShare(field, "giden", $event)
						}, null, 8, ["value", "onOnInput"])]),
						createVNode("div", { class: "col" }, [createVNode(_component_CustomInput, {
							value: $data.shares[field.kalan],
							text: "Remainder",
							onOnInput: ($event) => $options.setShare(field, "kalan", $event)
						}, null, 8, ["value", "onOnInput"])]),
						createVNode("div", { class: "col-12 col-md-2 flex align-items-center" }, [$options.amountBalanced(field) ? (openBlock(), createBlock(_component_Tag, {
							key: 0,
							severity: "success",
							value: "✓"
						})) : (openBlock(), createBlock(_component_Tag, {
							key: 1,
							severity: "danger",
							value: `fark: ${("formatPriceUsd" in _ctx ? _ctx.formatPriceUsd : unref(formatPriceUsd))($options.amountDifference(field))}`
						}, null, 8, ["value"]))])
					]);
				}), 128)),
				createVNode("br"),
				!$options.allBalanced ? (openBlock(), createBlock("div", {
					key: 4,
					class: "row"
				}, [createVNode("div", { class: "col" }, [createVNode(_component_Message, {
					severity: "warn",
					closable: false
				}, {
					default: withCtx(() => [createTextVNode(" Bölme için her satırın gönderilen + kalan toplamı orijinal değere eşit olmalı. Dengelenmeyen satırlar kırmızı işaretli. ")]),
					_: 1
				})])])) : createCommentVNode("", true),
				$data.failure ? (openBlock(), createBlock("div", {
					key: 5,
					class: "row"
				}, [createVNode("div", { class: "col" }, [createVNode(_component_Message, {
					severity: "error",
					closable: false
				}, {
					default: withCtx(() => [
						$data.failure.step ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("b", null, "Hata adımı:"), createTextVNode(" " + toDisplayString($data.failure.step), 1)])) : createCommentVNode("", true),
						$data.failure.satir ? (openBlock(), createBlock("div", { key: 1 }, [
							createVNode("b", null, "Satır:"),
							createTextVNode(" " + toDisplayString($data.failure.satir) + " ", 1),
							$data.failure.urun ? (openBlock(), createBlock("span", { key: 0 }, "— " + toDisplayString($data.failure.urun), 1)) : createCommentVNode("", true)
						])) : createCommentVNode("", true),
						createVNode("div", null, toDisplayString($data.failure.message), 1),
						$data.failure.geriAlindi ? (openBlock(), createBlock("div", {
							key: 2,
							class: "mt-2"
						}, [
							createTextVNode(" İşlem geri alındı: veritabanında "),
							createVNode("b", null, "hiçbir değişiklik olmadı"),
							createTextVNode(", sipariş bölünmemiş durumda. Düzeltip yeniden deneyebilirsiniz. ")
						])) : createCommentVNode("", true)
					]),
					_: 1
				})])])) : createCommentVNode("", true),
				createVNode("div", { class: "row" }, [createVNode("div", { class: "col" }, [createVNode(_component_Button, {
					type: "button",
					severity: "success",
					class: "w-100",
					label: "Divide",
					loading: $data.saving,
					disabled: !$options.allBalanced || $data.saving,
					onClick: $options.divideProduct
				}, null, 8, [
					"loading",
					"disabled",
					"onClick"
				])])])
			];
		}),
		_: 1
	}, _parent));
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/order/DivideDialog.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var DivideDialog_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "OrderDivideDialog" });

export { DivideDialog_default as D };
//# sourceMappingURL=DivideDialog-CmyUrlOr.mjs.map
