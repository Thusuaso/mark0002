<template>
  <div class="table-wrapper">
    <div class="cursor-tooltip" :style="tooltipStyle" v-if="isTooltipVisible">
      <span class="label">PO:</span>
      <span class="value">{{ activeTooltipText }}</span>
    </div>
    <div class="header-section">
      <h3>AYO LIST</h3>
      <span class="subtitle"
        >{{ filteredOrders.length }} kayıt listeleniyor</span
      >
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr class="header-row">
            <th class="text-center" style="max-width: 100px">Seller</th>
            <th class="text-center" style="max-width: 100px">Customer</th>
            <th class="text-center" style="max-width: 100px">Po</th>
            <th class="text-center">O. Date</th>
            <th class="text-center">F. Date</th>
            <th class="text-center" style="max-width: 100px">Country</th>
            <th class="text-center">Term</th>
            <th class="text-center">Proforma</th>
            <th class="text-center">Profit / USD</th>
            <th class="text-center">Profit / TRY</th>
            <th class="text-center">Profit %</th>
            <th class="text-center">Prod. (Mekmer)</th>
            <th class="text-center">Prod. (Others)</th>
            <th class="text-center">Logistics</th>
            <th class="text-center">Custom</th>
            <th class="text-center">Fumigation</th>
            <th class="text-center">Port</th>
            <th class="text-center">Insurance</th>
            <th class="text-center">Freight</th>
            <th class="text-center">Lashing</th>
            <th class="text-center">Spanzlet</th>
            <th class="text-center">Detail(SUM)</th>
            <th class="text-center">M.Labour Cost</th>
            <th class="text-center">Office Cost</th>
            <th class="text-center">Total</th>
            <th class="text-center">Date of Closure</th>
          </tr>

          <tr class="filter-row">
            <th>
              <input
                v-model="filters.siparisci"
                placeholder="Ara..."
                style="max-width: 100px"
              />
            </th>
            <th>
              <input
                v-model="filters.musteri_adi"
                placeholder="Ara..."
                style="max-width: 100px"
              />
            </th>
            <th>
              <input
                v-model="filters.siparis_no"
                placeholder="Ara..."
                style="max-width: 100px"
              />
            </th>
            <th>
              <input
                v-model="filters.siparis_tarihi"
                placeholder="Tarih"
                class="text-center"
              />
            </th>
            <th>
              <input
                v-model="filters.yukleme_tarihi"
                placeholder="Tarih"
                class="text-center"
              />
            </th>
            <th><input v-model="filters.ulke_adi" placeholder="Ülke" /></th>
            <th>
              <input
                v-model="filters.teslim_sekli"
                placeholder="Term"
                class="text-center"
              />
            </th>
            <th colspan="19" class="empty-filter"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in filteredOrders"
            :key="item.id"
            @click="mekmarAyoSelected(item)"
            class="hover_datatable"
            @mouseenter="showTooltip($event, item.siparis_no)"
            @mousemove="moveTooltip($event)"
            @mouseleave="hideTooltip"
          >
            <td style="max-width: 100px">{{ item.siparisci }}</td>
            <td class="font-medium wrap-text">
              {{ item.musteri_adi }}
            </td>
            <td style="max-width: 100px">
              <span
                class="badge badge-po"
                :style="{
                  backgroundColor:
                    item.dosya_kapanma_date == '-' ? '#fae8b3' : '',
                }"
                >{{ item.siparis_no }}</span
              >
            </td>
            <td class="text-center text-sm text-gray-500 wrap-text">
              {{ item.siparis_tarihi }}
            </td>
            <td class="text-center text-sm text-gray-500 wrap-text">
              {{ item.yukleme_tarihi }}
            </td>
            <td class="wrap-text">{{ item.ulke_adi }}</td>
            <td class="text-center">
              <span class="badge badge-term">{{ item.teslim_sekli }}</span>
            </td>

            <td class="text-center font-bold">
              {{ formatCurrency(item.toplam_bedel) }}
            </td>

            <td class="text-center">
              <span>
                <span
                  :class="item.profitUsd < 0 ? 'text-danger' : 'text-success'"
                >
                  {{ formatCurrency(item.kar_zarar) }}
                </span>
              </span>
            </td>

            <td class="text-center">
              <span>
                {{ formatCurrency(item.kar_zarar_tl, "TRY") }}
              </span>
            </td>
            <td class="text-center text-sm">
              <span> %{{ item.kar_zarar_tl_yuzdesi }} </span>
            </td>

            <td class="text-center">
              <span
                v-if="item.mekmar_alim > 0"
                :class="
                  item.mekmer_alim_alis_kontrol > 0 ? 'highlight-box' : ''
                "
              >
                {{ formatCurrency(item.mekmar_alim) }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>

            <td class="text-center">
              <span
                v-if="item.dis_alim > 0"
                :class="item.dis_alim_alis_kontrol > 0 ? 'highlight-box' : ''"
              >
                {{ formatCurrency(item.dis_alim) }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>

            <td class="text-center">
              <span
                v-if="item.nakliye > 0"
                :class="
                  item.nakliye_evrak.length == 0 && item.nakliye > 0
                    ? 'highlight-box'
                    : ''
                "
              >
                {{ formatCurrency(item.nakliye) }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="text-center">
              <span
                v-if="item.gumruk > 0"
                :class="
                  item.gumruk_evrak.length == 0 && item.gumruk > 0
                    ? 'highlight-box'
                    : ''
                "
              >
                {{ formatCurrency(item.gumruk) }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="text-center">
              <span
                v-if="item.ilaclama > 0"
                :class="
                  item.ilaclama.length == 0 && item.ilaclama > 0
                    ? 'highlight-box'
                    : ''
                "
              >
                {{ formatCurrency(item.ilaclama) }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="text-center">
              <span
                v-if="item.liman > 0"
                :class="
                  item.liman.length == 0 && item.liman > 0
                    ? 'highlight-box'
                    : ''
                "
              >
                {{ formatCurrency(item.liman) }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="text-center">
              <span
                v-if="item.sigorta > 0"
                :class="
                  item.sigorta_id == 1 && item.sigorta == 0
                    ? 'highlight-box'
                    : ''
                "
              >
                {{ formatCurrency(item.sigorta) }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>

            <td class="text-center">
              <span
                v-if="item.navlun > 0"
                :class="
                  item.navlun > 0 && item.navlun_evrak.length <= 0
                    ? 'highlight-box'
                    : ''
                "
              >
                {{ formatCurrency(item.navlun) }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="text-center">
              <span
                v-if="item.lashing > 0"
                :class="
                  item.lashing > 0 && item.lashing_evrak.length <= 0
                    ? 'highlight-box'
                    : ''
                "
              >
                {{ formatCurrency(item.lashing) }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="text-center">
              <span
                v-if="item.spazlet > 0"
                :class="
                  item.spazlet > 0 && item.spazlet_evrak.length <= 0
                    ? 'highlight-box'
                    : ''
                "
              >
                {{ formatCurrency(item.spazlet) }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="text-center">
              <span v-if="item.detay_1 + item.detay_2 + item.detay_3 > 0">
                {{ formatCurrency(item.detay_1 + item.detay_2 + item.detay_3) }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="text-center">
              <span
                v-if="item.ozel_iscilik > 0"
                :class="
                  item.ozel_iscilik > 0 && item.ozel_iscilik_evrak.length <= 0
                    ? 'highlight-box'
                    : ''
                "
              >
                {{ formatCurrency(item.ozel_iscilik) }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="text-center">
              <span v-if="item.banka_masrafi + item.kurye_masrafi > 0">
                {{ formatCurrency(item.banka_masrafi + item.kurye_masrafi) }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="text-center">
              <span v-if="item.masraf_toplam > 0">
                {{ formatCurrency(item.masraf_toplam) }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="text-center">
              {{ item.dosya_kapanma_date }}
              <!-- <span v-if="item.dosya_kapanma_date > 0">
                {{ item.dosya_kapanma_date }}
              </span>
              <span v-else class="text-muted">-</span> -->
            </td>
          </tr>

          <tr v-if="filteredOrders.length === 0">
            <td colspan="16" class="no-data">Kayıt bulunamadı.</td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td colspan="7" class="footer-label">Genel Toplamlar:</td>
            <td class="text-right">
              {{ formatCurrency(totals.toplam_bedel) }}
            </td>
            <td class="text-right">{{ formatCurrency(totals.kar_zarar) }}</td>
            <td class="text-right">
              {{ formatCurrency(totals.kar_zarar_tl, "TRY") }}
            </td>
            <td></td>
            <td class="text-right">{{ formatCurrency(totals.mekmar_alim) }}</td>
            <td class="text-right">{{ formatCurrency(totals.dis_alim) }}</td>
            <td class="text-right">{{ formatCurrency(totals.nakliye) }}</td>
            <td class="text-right">{{ formatCurrency(totals.gumruk) }}</td>
            <td class="text-right">{{ formatCurrency(totals.ilaclama) }}</td>
            <td class="text-right">{{ formatCurrency(totals.liman) }}</td>
            <td class="text-right">{{ formatCurrency(totals.sigorta) }}</td>

            <td class="text-right">{{ formatCurrency(totals.navlun) }}</td>
            <td class="text-right">{{ formatCurrency(totals.lashing) }}</td>
            <td class="text-right">{{ formatCurrency(totals.spazlet) }}</td>
            <td class="text-right">{{ formatCurrency(totals.detail) }}</td>
            <td class="text-right">
              {{ formatCurrency(totals.ozel_iscilik) }}
            </td>
            <td class="text-right">{{ formatCurrency(totals.office_cost) }}</td>
            <td class="text-right">
              {{ formatCurrency(totals.masraf_toplam) }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomOrderTable",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isTooltipVisible: false,
      activeTooltipText: "",
      tooltipX: 0,
      tooltipY: 0,
      filters: {
        siparisci: "",
        musteri_adi: "",
        siparis_no: "",
        ulke_adi: "",
        fDate: "",
        country: "",
        deliveryTerm: "",
      },
    };
  },
  computed: {
    tooltipStyle() {
      return {
        top: `${this.tooltipY + 15}px`, // Mouse'un 15px altı
        left: `${this.tooltipX + 15}px`, // Mouse'un 15px sağı
      };
    },
    // Filtreleme Mantığı
    filteredOrders() {
      return this.list.filter((item) => {
        const f = this.filters;
        return (
          (!f.siparisci ||
            item.siparisci.toLowerCase().includes(f.siparisci.toLowerCase())) &&
          (!f.musteri_adi ||
            item.musteri_adi
              .toLowerCase()
              .includes(f.musteri_adi.toLowerCase())) &&
          (!f.siparis_no ||
            item.siparis_no
              .toLowerCase()
              .includes(f.siparis_no.toLowerCase())) &&
          (!f.ulke_adi ||
            item.ulke_adi.toLowerCase().includes(f.ulke_adi.toLowerCase())) &&
          (!f.teslim_sekli ||
            item.teslim_sekli
              .toLowerCase()
              .includes(f.teslim_sekli.toLowerCase())) &&
          // Tarihler için string match yapıyoruz, gerekirse tarih objesine çevrilip karşılaştırılabilir
          (!f.siparis_tarihi ||
            item.siparis_tarihi.includes(f.siparis_tarihi)) &&
          (!f.yukleme_tarihi || item.yukleme_tarihi.includes(f.yukleme_tarihi))
        );
      });
    },
    // Toplam Hesaplama Mantığı
    totals() {
      const t = {
        toplam_bedel: 0,
        kar_zarar: 0,
        kar_zarar_tl: 0,
        mekmar_alim: 0,
        dis_alim: 0,
        nakliye: 0,
        gumruk: 0,
        ilaclama: 0,
        liman: 0,
        sigorta: 0,
        navlun: 0,
        lashing: 0,
        spazlet: 0,
        detail: 0,
        ozel_iscilik: 0,
        office_cost: 0,
        masraf_toplam: 0,
      };

      this.filteredOrders.forEach((o) => {
        t.toplam_bedel += o.toplam_bedel;
        t.kar_zarar += o.kar_zarar;
        t.kar_zarar_tl += o.kar_zarar_tl;
        t.mekmar_alim += o.mekmar_alim;
        t.dis_alim += o.dis_alim;
        t.nakliye += o.nakliye;
        t.gumruk += o.gumruk;
        t.ilaclama += o.ilaclama;
        t.liman += o.liman;
        t.sigorta += o.sigorta;

        t.navlun += o.navlun;
        t.lashing += o.lashing;
        t.spazlet += o.spazlet;
        t.detail += o.detay_1 + o.detay_2 + o.detay_3;
        t.ozel_iscilik += o.ozel_iscilik;
        t.office_cost += o.banka_masrafi + o.kurye_masrafi;
        t.masraf_toplam += o.masraf_toplam;
      });
      return t;
    },
  },
  methods: {
    showTooltip(e, text) {
      this.activeTooltipText = text;
      this.isTooltipVisible = true;
      this.moveTooltip(e); // İlk pozisyonu hemen ayarla
    },
    moveTooltip(e) {
      // Mouse koordinatlarını al
      this.tooltipX = e.clientX;
      this.tooltipY = e.clientY;
    },
    hideTooltip() {
      this.isTooltipVisible = false;
    },
    mekmarAyoSelected(event) {
      this.$emit("mekmar_ayo_selected_emit", event);
    },
    formatCurrency(val, currency = "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(val);
    },
  },
};
</script>

<style scoped>
/* --- Temel Düzen --- */
.table-wrapper {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  font-family: "Inter", system-ui, sans-serif;
  margin: 20px;
}

.header-section {
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-section h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #1e293b;
  font-weight: 700;
}

.subtitle {
  font-size: 0.875rem;
  color: #64748b;
}

/* --- Tablo Yapısı --- */
.table-container {
  overflow-x: auto;
  max-height: 70vh;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  white-space: nowrap;
}

/* --- Header Stilleri --- */
thead {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #f8fafc;
}

th {
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}

/* Filtre Satırı */
.filter-row th {
  padding: 4px 8px 10px 8px;
  background: #f8fafc;
}

.filter-row input {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.75rem;
  outline: none;
  transition: all 0.2s;
  /* Kutu boyutu ayarı, input taşmalarını engellemek için */
  box-sizing: border-box;
}

.filter-row input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

/* --- Body Stilleri --- */
tbody tr {
  border-bottom: 1px solid #9fa19f;
  transition: background-color 0.15s;
}

tbody tr:hover {
  background-color: #f8fafc;
}

tbody td {
  padding: 12px;
  color: #334155;
  vertical-align: middle;
}

/* --- Footer Stilleri --- */
tfoot {
  position: sticky;
  bottom: 0;
  background-color: #f1f5f9;
  z-index: 10;
  font-weight: bold;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

tfoot td {
  padding: 12px;
  color: #0f172a;
  border-top: 2px solid #cbd5e1;
  background-color: #f1f5f9;
}

.footer-label {
  text-align: right;
  padding-right: 20px;
  font-style: italic;
  color: #64748b;
}

/* --- Yardımcı Sınıflar --- */
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.font-bold {
  font-weight: 700;
}
.font-medium {
  font-weight: 500;
}
.text-sm {
  font-size: 0.75rem;
}
.text-muted {
  color: #94a3b8;
}

.text-danger {
  color: #ef4444;
}
.text-success {
  color: #10b981;
}

/* Badge (Etiket) Stilleri */
.badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-block;
}

.badge-po {
  background-color: #eff6ff;
  color: #2563eb;
  border: 1px solid #dbeafe;
}

.badge-term {
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #e5e7eb;
}

/* Kırmızı Highlight Alanı */
.highlight-box {
  background-color: #fef2f2;
  color: #b91c1c;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 700;
  border: 1px solid #fecaca;
  display: inline-block;
}

.no-data {
  text-align: center;
  padding: 2rem;
  color: #64748b;
  font-style: italic;
}
.hover_datatable {
}
.hover_datatable:hover {
  cursor: pointer;
}

.cursor-tooltip {
  position: fixed; /* Ekrana göre sabitlenir, scroll'dan etkilenmez */
  z-index: 9999; /* Her şeyin en üstünde */
  background-color: rgba(15, 23, 42, 0.95); /* Koyu Lacivert, hafif saydam */
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.8rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  pointer-events: none; /* Mouse tıklamalarını engellemesin diye */
  white-space: nowrap;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: opacity 0.1s ease; /* Yumuşak görünme */
}

.cursor-tooltip .label {
  color: #94a3b8;
  font-weight: 400;
  margin-right: 6px;
}

.cursor-tooltip .value {
  color: #38bdf8; /* Açık mavi vurgu */
  font-weight: 700;
  letter-spacing: 0.5px;
}
.wrap-text {
  white-space: normal !important; /* Standart metin akışı (alt satıra iner) */
  word-wrap: break-word; /* Çok uzun kelime varsa onu da böl */
  max-width: 200px; /* Sütun bu genişliği geçerse alt satıra at */
  line-height: 1.4; /* Satır aralığını biraz açalım ki okunsun */
}
</style>
