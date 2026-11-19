<template>
  <div class="poc">
    <!-- Arac cubugu: arama + toplamlar + hepsini ac/kapat -->
    <div class="poc-bar">
      <div class="poc-search">
        <label for="poc-search" class="poc-sr">PO, musteri veya urun ara</label>
        <i class="pi pi-search poc-search__icon" aria-hidden="true" />
        <input
          id="poc-search"
          v-model="query"
          type="search"
          class="poc-search__input"
          placeholder="PO, müşteri veya ürün ara…"
        />
      </div>

      <span class="poc-count">{{ groups.length }} PO · {{ lineCount }} satır</span>

      <!--
        TOPLAMLAR. Tabloda kolon altlarindaydi; kartlarda kolon alti diye
        bir yer yok, bu yuzden arac cubuguna alindi. Kaynak AYNI: store'daki
        `total` prop'u, yani iki gorunum ayni sayiyi gosteriyor.
      -->
      <dl class="poc-totals">
        <div class="poc-total">
          <dt>Amount</dt>
          <dd>{{ formatDecimal2(total.order) }}</dd>
        </div>
        <div v-if="!shipped" class="poc-total">
          <dt>Produced</dt>
          <dd>{{ formatDecimal2(total.production) }}</dd>
        </div>
        <div class="poc-total">
          <dt>Ton</dt>
          <dd>{{ formatDecimal2(total.ton) }}</dd>
        </div>
        <div class="poc-total">
          <dt>Total</dt>
          <dd>{{ formatPriceUsd(total.price) }}</dd>
        </div>
      </dl>

      <button type="button" class="poc-btn" @click="toggleAll">
        {{ allClosed ? "Hepsini aç" : "Hepsini kapat" }}
      </button>
    </div>

    <div v-if="loading" class="poc-empty">Yükleniyor…</div>

    <p v-else-if="!groups.length" class="poc-empty">
      {{ query ? "Aramayla eşleşen PO yok." : "Gösterilecek kayıt yok." }}
    </p>

    <template v-else>
      <section
        v-for="po in pageGroups"
        :key="po.key"
        class="poc-card"
        :class="{ 'poc-card--mine': po.mine }"
      >
        <!-- PO basligi: tabloda rowspan ile gruplanan dort alan burada -->
        <div class="poc-head">
          <button
            type="button"
            class="poc-toggle"
            :aria-expanded="String(!closed[po.key])"
            @click="toggle(po.key)"
          >
            <i
              class="pi poc-caret"
              :class="closed[po.key] ? 'pi-chevron-right' : 'pi-chevron-down'"
              aria-hidden="true"
            />
            <span class="poc-no">{{ po.no }}</span>
          </button>

          <span class="poc-customer">{{ po.customer }}</span>
          <!--
            PI = EVRAK INDIRME, metin degil. Tablolarda bu kolon hicbir
            zaman PI degerini yazmaz, yalnizca EvrakDurum > 0 iken bir
            indirme ikonu gosterir. Kartlarin ilk surumunde yanlislikla
            metin rozetine cevrilmisti; tablodaki davranisa donduruldu.

            Indirme kendi vekil ucumuzden geciyor ve adresi kisa omurlu
            bir bilet tasiyor -- gerekcesi app/composables/usePiDownload.ts
            icinde (ozetle: gezinme Authorization basligi gonderemez ve
            Android kabugunda cerez de gitmez).
          -->
          <a
            v-if="po.hasPi"
            class="poc-pi"
            href="#"
            :title="'PI evrakini indir -- ' + po.no"
            @click.stop.prevent="piDownload(po.no)"
          >
            <i class="pi pi-download" aria-hidden="true" />
            <span>PI</span>
          </a>
          <span class="poc-date">{{ dateLabel }} {{ dateToString(po.date) }}</span>

          <span v-if="po.behind" class="poc-flag">
            <span class="poc-flag__dot" aria-hidden="true" />
            Üretim geride
          </span>

          <div class="poc-rollup">
            <div class="poc-stat">
              <span class="poc-stat__k">Amount</span>
              <span class="poc-stat__v">{{ formatDecimal2(po.amount) }}</span>
            </div>
            <div class="poc-stat">
              <span class="poc-stat__k">Ton</span>
              <span class="poc-stat__v">{{ formatDecimal2(po.ton) }}</span>
            </div>
            <div class="poc-stat">
              <span class="poc-stat__k">{{ mekmer ? "Total (S)" : "Total" }}</span>
              <span class="poc-stat__v">{{ formatPriceUsd(po.total) }}</span>
            </div>
            <div v-if="mekmer" class="poc-stat">
              <span class="poc-stat__k">Total (P)</span>
              <span class="poc-stat__v">{{ formatPriceUsd(po.purchase) }}</span>
            </div>
            <div v-if="!shipped" class="poc-prog">
              <div class="poc-prog__top">
                <span class="poc-stat__k">Produced</span>
                <span class="poc-prog__pct">{{ po.pct }}%</span>
              </div>
              <div class="poc-prog__rail">
                <div
                  class="poc-prog__fill"
                  :class="{ 'poc-prog__fill--done': po.pct >= 100 }"
                  :style="{ width: Math.min(po.pct, 100) + '%' }"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Urun satirlari -->
        <div v-show="!closed[po.key]" class="poc-scroll">
          <table class="poc-table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Size</th>
                <th scope="col">Supplier</th>
                <th scope="col" class="poc-r">Amount</th>
                <th v-if="!shipped" scope="col">Produced</th>
                <th v-if="mekmer && !shipped" scope="col" class="poc-r">Remainder</th>
                <th scope="col" class="poc-r">Ton</th>
                <th scope="col" class="poc-r">{{ mekmer ? "Price (S)" : "Price" }}</th>
                <th scope="col" class="poc-r">{{ mekmer ? "Total (S)" : "Total" }}</th>
                <th v-if="mekmer" scope="col" class="poc-r">Price (P)</th>
                <th v-if="mekmer" scope="col" class="poc-r">Total (P)</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(ln, i) in po.lines"
                :key="po.key + '-' + i"
                class="poc-row"
                @click="$emit('production_selected_emit', ln.raw)"
              >
                <td>
                  <span class="poc-prod">{{ ln.raw.UrunAdi }}</span>
                  <span v-if="ln.raw.UrunUretimAciklama" class="poc-detail">
                    {{ ln.raw.UrunUretimAciklama }}
                  </span>
                </td>
                <td class="poc-mono poc-nowrap">{{ ln.size }}</td>
                <td>{{ ln.raw.UrunFirmaAdi }}</td>
                <td class="poc-mono poc-r poc-nowrap">
                  {{ formatDecimal2(ln.amount) }} {{ ln.raw.BirimAdi }}
                </td>
                <td v-if="!shipped">
                  <div class="poc-lineprog">
                    <div class="poc-prog__rail">
                      <div
                        class="poc-prog__fill"
                        :class="{ 'poc-prog__fill--done': ln.pct >= 100 }"
                        :style="{ width: Math.min(ln.pct, 100) + '%' }"
                      />
                    </div>
                    <span class="poc-mono poc-lineprog__pct">{{ ln.pct }}%</span>
                  </div>
                </td>
                <!--
                  Remainder = Miktar - Uretim. Table2'de bu fark SIFIR
                  oldugunda hucre sari boyaniyordu ("bitti" isareti);
                  burada ayni bilgi zaten ilerleme cubugunda %100 olarak
                  duruyor, bu yuzden sari yerine sade bir "bitti" tonu.
                -->
                <td
                  v-if="mekmer && !shipped"
                  class="poc-mono poc-r"
                  :class="{ 'poc-done': ln.remainder === 0 }"
                >
                  {{ formatDecimal2(ln.remainder) }}
                </td>
                <td class="poc-mono poc-r">{{ formatDecimal2(ln.raw.Ton) }}</td>
                <td class="poc-mono poc-r">
                  {{ formatPriceUsd(ln.raw.SatisFiyati) }}
                </td>
                <td class="poc-mono poc-r poc-strong">
                  {{ formatPriceUsd(ln.raw.SatisToplam) }}
                </td>
                <td v-if="mekmer" class="poc-mono poc-r">
                  {{ formatPriceUsd(ln.raw.AlisFiyati) }}
                </td>
                <td v-if="mekmer" class="poc-mono poc-r">
                  {{ formatPriceUsd(ln.purchaseTotal) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!--
        SAYFALAMA PO BASINA, SATIR BASINA DEGIL. Tabloda `:rows="25"` 25
        SATIR demekti ve bir PO sayfanin ortasindan ikiye bolunebiliyordu;
        kartlarda bolunme mumkun degil, bu yuzden sayfa 25 PO tutuyor.
      -->
      <div v-if="pageCount > 1" class="poc-pager">
        <button
          type="button"
          class="poc-btn"
          :disabled="page === 0"
          @click="page--"
        >
          Önceki
        </button>
        <span class="poc-count">{{ page + 1 }} / {{ pageCount }}</span>
        <button
          type="button"
          class="poc-btn"
          :disabled="page >= pageCount - 1"
          @click="page++"
        >
          Sonraki
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { useOrderStore } from "~/stores/order"

/*
 * components/order/PoCards.vue   --  etiket adi <OrderPoCards>
 *
 * order/Table.vue ve order/Table2.vue ile AYNI SOZLESME:
 *   props  : list, status, total, loading
 *   emit   : production_selected_emit
 * yani cagri yerinde <OrderTable> yerine birebir gecebiliyor.
 *
 * NEDEN VAR: o tablolar rowGroupMode="rowspan" ile calisiyor, yani bir PO
 * urun sayisi kadar satir tutuyor. 17 kolonun DORDU (Order/Load Date, Po,
 * Customer, PI) PO duzeyinde, geri kalan 12'si urun duzeyinde -- tek
 * izgaraya sikistirilan iki ayri sey. Sonucu kullanici soyle tarif etti:
 * "ayirmasi zor oluyor hangi po hangisi diye". Burada PO bir KART; sinir
 * bir cizgiye degil yapiya bagli.
 *
 * TABLOYU SILMIYOR: sayfa iki gorunum arasinda gecis yapiyor (bkz.
 * pages/orders/production.vue). Kolon bazli filtreler yalnizca tabloda
 * var; kartlarda tek bir arama kutusu (PO / musteri / urun) duruyor.
 */
export default {
  /* PI indirme: cerez yerine kisa omurlu bilet (bkz. usePiDownload.ts). */
  setup() {
    return { piDownload: usePiDownload() }
  },

  props: {
    list: { type: Array, required: false, default: () => [] },
    status: { type: String, required: true },
    total: { type: Object, required: true },
    loading: { type: Boolean, default: false },
    /*
     * "mekmer" surumu UC KOLON DAHA gosteriyor: Remainder, Price
     * (Purchase) ve Total (Purchase). order/Table2.vue (Mekmer ekranlari)
     * bu kolonlari tasiyor, order/Table.vue (siparis ekranlari) tasimiyor;
     * ayrim oradaki ile birebir.
     */
    variant: {
      type: String,
      default: "default",
      validator: (v) => ["default", "mekmer"].includes(v),
    },
  },

  emits: ["production_selected_emit"],

  data() {
    return {
      query: "",
      /* key -> true  (yalnizca KAPALI olanlar tutuluyor: varsayilan acik) */
      closed: {},
      allClosed: false,
      page: 0,
    }
  },

  computed: {
    orderStore() {
      return useOrderStore()
    },

    /*
     * Tarih alani duruma gore DEGISIYOR -- tablolardaki groupRowsBy ile
     * birebir ayni kural: sevk edilmislerde yukleme tarihi, digerlerinde
     * siparis tarihi.
     */
    dateField() {
      return this.status === "Shipped" || this.status === "Shipped 2"
        ? "YuklemeTarihi"
        : "SiparisTarihi"
    },

    dateLabel() {
      return this.dateField === "YuklemeTarihi" ? "Load" : "Order"
    },

    mekmer() {
      return this.variant === "mekmer"
    },

    /*
     * Sevk edilmis listelerde URETIM SUTUNU YOK -- tablolarda da yoktu
     * (Table.vue'nun Shipped tablolari ve ShippedList yalnizca Amount /
     * Ton / Price / Total gosteriyor). Mal cikmissa uretim ilerlemesi
     * soylenecek bir sey degil; %100 dolu bir cubuk sutun israfi olurdu.
     */
    shipped() {
      return this.status === "Shipped" || this.status === "Shipped 2"
    },

    userId() {
      return useCookie("userId").value
    },

    filtered() {
      const q = this.query.trim().toLocaleLowerCase("tr-TR")
      if (!q) return this.list || []
      return (this.list || []).filter((x) =>
        [x.SiparisNo, x.FirmaAdi, x.UrunAdi, x.PI].some(
          (v) => v != null && String(v).toLocaleLowerCase("tr-TR").includes(q)
        )
      )
    },

    /*
     * Duz urun satirlarini PO'lara topluyor, sonra TARIHE gore siraliyor
     * (gerekcesi asagida, out.sort'un basinda).
     *
     * PO ICINDEKI satirlarin sirasi gelen sira: sunucu su.SiraNo'ya gore
     * veriyor, tabloda da o gecerliydi.
     */
    groups() {
      const map = new Map()
      for (const raw of this.filtered) {
        const key = String(raw.SiparisNo)
        let po = map.get(key)
        if (!po) {
          po = {
            key,
            no: raw.SiparisNo,
            customer: raw.FirmaAdi,
            pi: raw.PI,
            /* Tablodaki kosulun aynisi: evrak yoksa indirilecek bir sey
               de yok, link hic gosterilmiyor (tabloda olu bir <a> vardi). */
            hasPi: this.num(raw.EvrakDurum) > 0,
            date: raw[this.dateField],
            mine:
              raw.SiparisSahibi == this.userId || raw.Operasyon == this.userId,
            amount: 0,
            produced: 0,
            ton: 0,
            total: 0,
            purchase: 0,
            lines: [],
          }
          map.set(key, po)
        }
        const amount = this.num(raw.Miktar)
        const produced = this.num(raw.Uretim)
        po.amount += amount
        po.produced += produced
        po.ton += this.num(raw.Ton)
        po.total += this.num(raw.SatisToplam)
        /* Table2 alis toplamini satirda carpiyor; kolon yok, ayni carpim. */
        const purchaseTotal = this.num(raw.AlisFiyati) * amount
        po.purchase += purchaseTotal
        po.lines.push({
          raw,
          amount,
          purchaseTotal,
          remainder: amount - produced,
          size: this.size(raw),
          pct: this.pct(produced, amount),
        })
      }

      const out = []
      for (const po of map.values()) {
        po.pct = this.pct(po.produced, po.amount)
        /*
         * "Uretim geride": yarisindan azi uretilmis PO. Tabloda bunu gormek
         * icin Amount ve Produced kolonlarini satir satir karsilastirmak
         * gerekiyordu. Sevk edilmis listede anlamsiz, orada gosterilmiyor.
         */
        po.behind = this.dateField === "SiparisTarihi" && po.pct < 50
        out.push(po)
      }

      /*
       * TARIHE GORE SIRALA -- sunucudan gelen sira YETMIYOR.
       *
       * /order/shipped/mekmer2/list IKI sorgunun ARDI ARDINA EKLENMIS
       * halini donduruyor: once Mekmer, sonra Mekmar
       * (api/index.js, `resultList.concat`). Her blok kendi icinde
       * tarihe gore sirali ama liste GENELINDE degil. Sayfa basina 25
       * PO oldugu icin Mekmar siparisleri arka sayfalara dusuyor ve
       * ekranda "yalnizca Mekmer var" gibi goruluyordu.
       *
       * Tablo gorunumunde bu sorun HIC OLMADI, cunku DataTable gelen
       * siraya bakmiyor, kendi siralamasini uyguluyor ve iki blogu
       * birbirine karistiriyor (ShippedList.vue ve Table2.vue:
       * sortField="YuklemeTarihi" | "SiparisTarihi", :sortOrder="-1").
       * Kartlar ayni kurali uyguluyor; iki gorunum artik ayni sirada.
       *
       * Tarihi olmayan PO EN SONA: "bilinmiyor", "en yeni" demek degil.
       */
      const zaman = (po) => {
        const t = po.date ? new Date(po.date).getTime() : NaN
        return Number.isFinite(t) ? t : -Infinity
      }
      out.sort((a, b) => {
        const ta = zaman(a)
        const tb = zaman(b)
        /* Ikisi de tarihsizse 0: NaN donduren bir karsilastirma
           siralamayi tanimsiz hale getirirdi (tb - ta = Inf - Inf). */
        return ta === tb ? 0 : tb - ta
      })

      return out
    },

    lineCount() {
      return this.filtered.length
    },

    pageCount() {
      return Math.max(1, Math.ceil(this.groups.length / this.perPage))
    },

    pageGroups() {
      const start = this.page * this.perPage
      return this.groups.slice(start, start + this.perPage)
    },
  },

  created() {
    this.perPage = 25
  },

  watch: {
    /*
     * Arama sonucu degisince toplamlar da degismeli -- tabloda bunu
     * DataTable'in @filter olayi yapiyordu (ordersFilter -> store).
     * Kartlarda o olay yok, bu yuzden ayni cagri buradan.
     *
     * Sayfa da basa doner: uc sayfada gezerken arama yapinca bos sayfada
     * kalmak kullaniciya "sonuc yok" gibi gorunurdu.
     */
    filtered(val) {
      this.page = 0
      this.orderStore.setOrderProductionTotal(val)
    },
  },

  methods: {
    num(v) {
      const n = parseFloat(v)
      return isNaN(n) ? 0 : n
    },

    pct(produced, amount) {
      if (!amount) return 0
      return Math.round((produced / amount) * 100)
    },

    /* En x Boy x Kenar -- bos olanlar atlaniyor, yoksa "x x" kaliyor. */
    size(raw) {
      return [raw.En, raw.Boy, raw.Kenar]
        .filter((v) => v != null && v !== "" && v !== 0 && v !== "0")
        .join(" × ")
    },

    toggle(key) {
      const closed = Object.assign({}, this.closed)
      if (closed[key]) {
        delete closed[key]
      } else {
        closed[key] = true
      }
      this.closed = closed
      this.allClosed = false
    },

    toggleAll() {
      if (this.allClosed) {
        this.closed = {}
        this.allClosed = false
      } else {
        const closed = {}
        for (const po of this.groups) closed[po.key] = true
        this.closed = closed
        this.allClosed = true
      }
    },
  },
}
</script>

<style scoped>
/*
 * Renkler ve olculer BU DOSYADA, global app.css'te degil: kart gorunumu
 * yalnizca bu bilesende kullaniliyor ve tablolarin global kurallariyla
 * (.table-dense, .po-anchor) karismamasi gerekiyor.
 */
.poc {
  --poc-ink: #111827;
  --poc-muted: #4b5563;
  --poc-line: #e2e5ea;
  --poc-hair: #f0f2f5;
  --poc-surface: #ffffff;
  --poc-ground: #f6f7f9;
  --poc-accent: #1d4ed8;
  --poc-done: #0f766e;

  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px 0 32px;
  color: var(--poc-ink);
}

/* ---------- arac cubugu ---------- */

.poc-bar {
  position: sticky;
  top: 0;
  z-index: 3;

  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;

  padding: 10px 14px;

  background: var(--poc-surface);
  border: 1px solid var(--poc-line);
  border-radius: 10px;
}

.poc-search {
  position: relative;
  flex-grow: 1;
  min-width: 200px;
  max-width: 320px;
}

.poc-search__icon {
  position: absolute;
  top: 50%;
  left: 10px;
  font-size: 12px;
  color: var(--poc-muted);
  transform: translateY(-50%);
}

.poc-search__input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px 8px 30px;

  font-family: inherit;
  font-size: 13px;
  color: var(--poc-ink);

  background: var(--poc-surface);
  border: 1px solid #d6dae1;
  border-radius: 8px;
}

/* Ekran okuyucuya kalan, gozle gorunmeyen etiket. */
.poc-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}

.poc-count {
  font-size: 12px;
  color: var(--poc-muted);
}

.poc-totals {
  display: flex;
  gap: 18px;
  margin: 0 0 0 auto;
}

.poc-total {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.poc-total dt {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--poc-muted);
}

.poc-total dd {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.poc-btn {
  padding: 7px 12px;

  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--poc-ink);

  background: var(--poc-surface);
  border: 1px solid #d6dae1;
  border-radius: 8px;
  cursor: pointer;
}

.poc-btn:disabled {
  color: #9aa2ae;
  cursor: default;
}

/* ---------- PO karti ---------- */

.poc-card {
  background: var(--poc-surface);
  border: 1px solid var(--poc-line);
  border-radius: 12px;
  box-shadow: 0 1px 2px rgb(17 24 39 / 5%);
  overflow: hidden;
}

/*
 * Kullanicinin kendi PO'su. Tabloda bu bilgi SATIR ARKA PLANINI yesile
 * boyuyordu (.row-accessories); kartta arka plani boyamak basligi da
 * icerigi de bozuyor, bu yuzden yalnizca ust kenar isaretleniyor.
 */
.poc-card--mine {
  border-top: 3px solid var(--poc-done);
}

.poc-head {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;

  padding: 10px 14px;

  background: #fbfcfd;
  border-bottom: 1px solid #e8ebef;
}

.poc-toggle {
  display: flex;
  gap: 8px;
  align-items: center;

  padding: 2px;

  font-family: inherit;
  text-align: left;

  background: none;
  border: none;
  cursor: pointer;
}

.poc-caret {
  font-size: 11px;
  color: var(--poc-muted);
}

.poc-no {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
  color: var(--poc-ink);
}

.poc-customer {
  font-size: 13px;
  font-weight: 600;
}

.poc-pi {
  display: inline-flex;
  gap: 5px;
  align-items: center;

  padding: 2px 8px;

  font-size: 11px;
  font-weight: 600;
  color: #1d4ed8;
  text-decoration: none;

  background: #eef1f5;
  border-radius: 5px;
}

.poc-pi:hover {
  color: #1e3a8a;
  background: #e2e7ef;
}

.poc-pi .pi {
  font-size: 11px;
}

.poc-date {
  font-size: 12px;
  color: var(--poc-muted);
}

.poc-flag {
  display: inline-flex;
  gap: 6px;
  align-items: center;

  padding: 2px 9px;

  font-size: 11px;
  font-weight: 700;
  color: #7c2d12;

  background: #fef0e2;
  border: 1px solid #f6c89a;
  border-radius: 999px;
}

.poc-flag__dot {
  width: 6px;
  height: 6px;
  background: #b45309;
  border-radius: 50%;
}

.poc-rollup {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  align-items: center;
  margin-left: auto;
}

.poc-stat {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 64px;
}

.poc-stat__k {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--poc-muted);
}

.poc-stat__v {
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.poc-prog {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 140px;
}

.poc-prog__top {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.poc-prog__pct {
  font-size: 11px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.poc-prog__rail {
  height: 6px;
  background: #e8ebef;
  border-radius: 999px;
  overflow: hidden;
}

.poc-prog__fill {
  height: 100%;
  background: var(--poc-accent);
  border-radius: 999px;
}

.poc-prog__fill--done {
  background: var(--poc-done);
}

/* ---------- urun satirlari ---------- */

/* Dar ekranda kolonlar okunamayacak kadar daralmasin, kutu kaysin. */
.poc-scroll {
  overflow-x: auto;
}

.poc-table {
  width: 100%;
  min-width: 860px;
  border-collapse: collapse;
  font-size: 12.5px;
}

.poc-table th {
  padding: 7px 12px;

  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--poc-muted);
  text-align: left;

  border-bottom: 1px solid #e8ebef;
}

.poc-table td {
  padding: 7px 12px;
  border-bottom: 1px solid var(--poc-hair);
}

.poc-table tbody tr:last-child td {
  border-bottom: none;
}

.poc-row {
  cursor: pointer;
}

.poc-row:hover {
  background: #f7f9fc;
}

.poc-prod {
  font-weight: 600;
}

.poc-detail {
  display: block;
  margin-top: 2px;
  font-size: 11px;
  color: var(--poc-muted);
}

.poc-mono {
  font-variant-numeric: tabular-nums;
}

.poc-r {
  text-align: right;
}

.poc-nowrap {
  white-space: nowrap;
}

.poc-strong {
  font-weight: 600;
}

/* Remainder sifir: Table2'de sari zemindi, burada sade bir bitti tonu. */
.poc-done {
  font-weight: 600;
  color: var(--poc-done);
}

.poc-lineprog {
  display: flex;
  gap: 8px;
  align-items: center;
  min-width: 118px;
}

.poc-lineprog .poc-prog__rail {
  flex-grow: 1;
  height: 5px;
}

.poc-lineprog__pct {
  font-size: 11px;
  color: #374151;
  white-space: nowrap;
}

/* ---------- bos durum / sayfalama ---------- */

.poc-empty {
  padding: 28px;
  font-size: 13px;
  color: var(--poc-muted);
  text-align: center;
  background: var(--poc-surface);
  border: 1px solid var(--poc-line);
  border-radius: 12px;
}

.poc-pager {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  padding-top: 4px;
}

@media (max-width: 767.98px) {
  .poc-totals {
    margin-left: 0;
  }

  .poc-rollup {
    margin-left: 0;
  }
}
</style>
