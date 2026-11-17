<template>
  <div>
    <MobileList
      :items="allStatus ? allList || [] : list || []"
      :search-keys="['customer_name']"
      search-placeholder="Müşteri ara…"
      item-key="customer_name"
      :on-select="sec"
    >
      <template #totals>
        <div class="fc-total">
          <span class="fc-total__k">Bakiye</span>
          <span class="fc-total__v">{{ formatPriceUsd(total?.balance) }}</span>
        </div>
      </template>

      <template #default="{ item }">
        <!--
          BAKIYE BASLIKTA, cunku bu ekranin tek sorusu o. Tabloda sekiz
          sayi esit agirliktaydi ve "bu musteri bize ne kadar borclu"
          sorusu yedi kolonun arasinda kayboluyordu.
        -->
        <div class="fc-head">
          <p class="fc-musteri">{{ item.customer_name || "—" }}</p>
          <span class="fc-bakiye" :class="bakiyeSinifi(item.balanced)">
            {{ formatPriceUsd(item.balanced) }}
          </span>
        </div>

        <!--
          Kalan yedi sayi ikincil: iki sutunlu bir doku halinde, etiket
          ustte deger altta. Para birimi hizasi icin hepsi tabular.
        -->
        <dl class="fc-kirilim">
          <div class="fc-kalem">
            <dt>Toplam sipariş</dt>
            <dd>{{ formatPriceUsd(item.total_order_amount) }}</dd>
          </div>
          <div class="fc-kalem">
            <dt>Üretimde</dt>
            <dd>{{ formatPriceUsd(item.production) }}</dd>
          </div>
          <div class="fc-kalem">
            <dt>Sevk edilen</dt>
            <dd>{{ formatPriceUsd(item.forwarding) }}</dd>
          </div>
          <div class="fc-kalem">
            <dt>Ön ödeme</dt>
            <dd>{{ formatPriceUsd(item.advanced_payment) }}</dd>
          </div>
          <div class="fc-kalem">
            <dt>Ödenen</dt>
            <dd class="fc-odenen">{{ formatPriceUsd(item.paid) }}</dd>
          </div>
          <div class="fc-kalem">
            <dt>Bakiye (üretim hariç)</dt>
            <dd>{{ formatPriceUsd(item.total) }}</dd>
          </div>
        </dl>
      </template>
    </MobileList>

    <!--
      VADE LISTESI. Masaustunde sag sutunda duran ayri bir tablo; dar
      ekranda yan yana yer yok, bu yuzden ana listenin ALTINDA kendi
      bolumu olarak duruyor. Kapali basliyor: gunluk soru "kim ne kadar
      borclu", vade ikincil.
    -->
    <section v-if="status && (expiry || []).length" class="fc-vade">
      <button
        type="button"
        class="fc-vade__ac"
        :aria-expanded="String(vadeAcik)"
        @click="vadeAcik = !vadeAcik"
      >
        <i
          class="pi"
          :class="vadeAcik ? 'pi-chevron-down' : 'pi-chevron-right'"
          aria-hidden="true"
        />
        <span>Vadeler</span>
        <span class="fc-vade__sayi">{{ (expiry || []).length }}</span>
        <span class="fc-vade__toplam">{{ formatPriceUsd(expiryTotal) }}</span>
      </button>

      <ul v-show="vadeAcik" class="fc-vade__liste">
        <li v-for="(v, i) in expiry" :key="i" class="fc-vade__satir">
          <div class="fc-vade__sol">
            <span class="fc-vade__firma">{{ v.firmaAdi }}</span>
            <span class="fc-vade__po">
              PO {{ v.siparis_no }}
              <template v-if="v.vade_tarih">
                · {{ dateToString(v.vade_tarih) }}
              </template>
            </span>
          </div>
          <span class="fc-vade__tutar">{{ formatPriceUsd(v.tutar) }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
/*
 * components/finance/Cards.vue  --  <FinanceCards>
 *
 * Finance'in TELEFON gorunumu; masaustundeki FinanceList ile ayni
 * veriyi, ayni proplari ve ayni olayi kullaniyor.
 *
 * [!] allStatus PROPU ANLAMLI: sayfadaki "All / Unpaid Po" dugmesi
 * hangi listenin gosterilecegini belirliyor (list vs allList).
 * Masaustu tablosu `:value="allStatus ? allList : list"` yaziyor;
 * burada da ayni kosul var, yoksa dugme telefonda hicbir sey yapmaz.
 *
 * Tabloda sekiz sayi esit agirliktaydi. Telefonda hepsini ayni anda
 * okutmaya calismak yerine BAKIYE basliga alindi -- ekranin tek sorusu
 * o -- ve kalan yedi sayi ikincil bir dokuya indi.
 */
defineProps({
  list: { type: Array, default: () => [] },
  total: { type: Object, default: () => ({}) },
  expiry: { type: Array, default: () => [] },
  allStatus: { type: Boolean, default: false },
  allList: { type: Array, default: () => [] },
  status: { type: Boolean, default: false },
  expiryTotal: { type: [Number, String], default: 0 },
})

const emit = defineEmits(["finance_list_selected_emit"])

const vadeAcik = ref(false)

/* Masaustu tablosu @row-click kullaniyor, yani olay `{ data }`
   seklinde geliyor ve sayfa onu oyle bekliyor. */
function sec(item) {
  emit("finance_list_selected_emit", { data: item })
}

/*
 * Bakiye rengi: borc ve alacak YALNIZCA renkle ayrilmiyor -- isaret
 * zaten rakamda. Renk ikincil bir ipucu, tek basina tasiyici degil.
 */
function bakiyeSinifi(v) {
  const n = parseFloat(v)
  if (isNaN(n) || n === 0) return "fc-bakiye--sifir"
  return n > 0 ? "fc-bakiye--borc" : "fc-bakiye--alacak"
}
</script>

<style scoped>
.fc-total {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.fc-total__k {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #4b5563;
}

.fc-total__v {
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.fc-head {
  display: flex;
  gap: 12px;
  align-items: baseline;
}

.fc-musteri {
  flex-grow: 1;
  min-width: 0;
  margin: 0;

  font-size: 15px;
  font-weight: 650;
  line-height: 1.3;
  color: #111827;
}

.fc-bakiye {
  flex: none;
  font-size: 16px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.fc-bakiye--borc {
  color: #b45309;
}

.fc-bakiye--alacak {
  color: #0f766e;
}

.fc-bakiye--sifir {
  color: #6b7280;
}

/* Kirilim: iki sutun, etiket ustte deger altta. */
.fc-kirilim {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px 14px;

  padding-top: 11px;
  margin: 11px 0 0;

  border-top: 1px solid #f0f2f5;
}

.fc-kalem dt {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #6b7280;
}

.fc-kalem dd {
  margin: 1px 0 0;
  font-size: 13.5px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #374151;
}

.fc-odenen {
  color: #0f766e;
}

/* ---------- vade bolumu ---------- */

.fc-vade {
  margin: 4px 12px 32px;
  background: #ffffff;
  border: 1px solid #e2e5ea;
  border-radius: 12px;
  overflow: hidden;
}

.fc-vade__ac {
  display: flex;
  gap: 9px;
  align-items: center;

  width: 100%;
  min-height: 48px;
  padding: 0 14px;

  font-family: inherit;
  font-size: 14px;
  font-weight: 650;
  color: #111827;

  background: #fbfcfd;
  border: none;
  cursor: pointer;
}

.fc-vade__sayi {
  padding: 1px 8px;
  font-size: 11px;
  font-weight: 700;
  color: #374151;
  background: #eef1f5;
  border-radius: 999px;
}

.fc-vade__toplam {
  margin-left: auto;
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #b45309;
}

.fc-vade__liste {
  margin: 0;
  padding: 0;
  list-style: none;
}

.fc-vade__satir {
  display: flex;
  gap: 12px;
  align-items: center;

  padding: 10px 14px;
  border-top: 1px solid #f0f2f5;
}

.fc-vade__sol {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 2px;
  min-width: 0;
}

.fc-vade__firma {
  font-size: 13.5px;
  font-weight: 600;
  color: #111827;
}

.fc-vade__po {
  font-size: 11.5px;
  font-variant-numeric: tabular-nums;
  color: #6b7280;
}

.fc-vade__tutar {
  flex: none;
  font-size: 13.5px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #374151;
}
</style>
