<template>
  <section class="sm-kart">
    <header class="sm-head">
      <h2 class="sm-baslik">{{ year }} {{ status }}</h2>
      <span class="sm-toplam">{{ formatPriceUsd(genelToplam) }}</span>
    </header>

    <!--
      Ay satirlari. Masaustunde bu bir DataTable (Month / FOB / DDP) ve
      bilesen `<div class="col">` kokuyle yan yana diziliyor -- yil
      sayisi kadar kolon. Telefonda yan yana yer yok; her yil kendi
      karti, aylar da kart icinde duz satirlar.

      DataTable kullanilmadi: uc kolonluk sabit bir izgara icin tablo
      makinesi (filtre, siralama, sayfalama) gereksiz agirlik ve
      telefonda kendi yatay kaydirmasini aciyordu.
    -->
    <div class="sm-satirlar">
      <div class="sm-ust">
        <span>Ay</span>
        <span class="sm-r">FOB</span>
        <span class="sm-r">DDP</span>
      </div>

      <button
        v-for="(r, i) in list || []"
        :key="i"
        type="button"
        class="sm-satir"
        @click="$emit('order_selected_list_emit', r)"
      >
        <span class="sm-ay">{{ monthToString(r.Month) }}</span>
        <span class="sm-r sm-para">{{ formatPriceUsd(r.FOB) }}</span>
        <span class="sm-r sm-para">{{ formatPriceUsd(r.DDP) }}</span>
      </button>

      <div v-if="!(list || []).length" class="sm-bos">Kayıt yok.</div>

      <div v-else class="sm-alt">
        <span>Toplam</span>
        <span class="sm-r sm-para">{{ formatPriceUsd(total?.fob) }}</span>
        <span class="sm-r sm-para">{{ formatPriceUsd(total?.ddp) }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
/*
 * components/reports/mekmar/SummaryCards.vue
 *   --  <ReportsMekmarSummaryCards>
 *
 * Order Summary'nin TELEFON gorunumu. Masaustundeki
 * ReportsMekmarSummaryList ile AYNI proplari ve AYNI olayi kullaniyor,
 * yani sayfada biri digerinin yerine geciyor.
 *
 * Sayfa bu bileseni v-for ile UC KEZ basiyor (Order / Seller /
 * Shipment) ve her biri yil sayisi kadar tekrarliyor. Masaustunde
 * hepsi yan yana kolonlara giriyor; telefonda alt alta kartlar.
 *
 * Satira dokunmak masaustundeki @row-click ile ayni olayi atiyor ve
 * ayni detay diyalogunu aciyor.
 */
const props = defineProps({
  list: { type: Array, default: () => [] },
  year: { type: Number, default: null },
  total: { type: Object, default: () => ({}) },
  status: { type: String, default: "" },
})

defineEmits(["order_selected_list_emit"])

/*
 * Kart basligindaki tek sayi: FOB + DDP. Masaustunde iki ayri alt
 * toplam var ve ikisi de kartin icinde duruyor; baslikta "bu yil ne
 * kadar" sorusunun tek cevabi olmasi daha hizli okunuyor.
 */
const genelToplam = computed(() => {
  const f = parseFloat(props.total?.fob) || 0
  const d = parseFloat(props.total?.ddp) || 0
  return f + d
})
</script>

<style scoped>
.sm-kart {
  margin-bottom: 12px;
  background: #ffffff;
  border: 1px solid #e2e5ea;
  border-radius: 12px;
  overflow: hidden;
}

.sm-head {
  display: flex;
  gap: 12px;
  align-items: baseline;

  padding: 12px 14px;

  background: #fbfcfd;
  border-bottom: 1px solid #e8ebef;
}

.sm-baslik {
  flex-grow: 1;
  margin: 0;
  font-size: 14px;
  font-weight: 650;
  color: #111827;
}

.sm-toplam {
  font-size: 14px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #1d4ed8;
}

.sm-satirlar {
  display: flex;
  flex-direction: column;
}

/* Uc kolonluk sabit izgara: ay solda, iki para degeri sagda hizali. */
.sm-ust,
.sm-satir,
.sm-alt {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: center;
  padding: 0 14px;
}

.sm-ust {
  min-height: 32px;

  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #6b7280;

  border-bottom: 1px solid #f0f2f5;
}

.sm-satir {
  /* 44px dokunma hedefi; satir detay diyalogunu aciyor. */
  min-height: 44px;

  font-family: inherit;
  font-size: 13px;
  color: #374151;
  text-align: left;

  background: none;
  border: none;
  border-bottom: 1px solid #f0f2f5;
  cursor: pointer;
}

.sm-satir:active {
  background: #f2f5f9;
}

.sm-ay {
  font-weight: 600;
  color: #111827;
}

.sm-r {
  text-align: right;
  /* Iki para sutunu ayni genislikte olsun ki rakamlar alt alta
     hizalansin; icerige gore kayarsa karsilastirmak zorlasiyor. */
  min-width: 92px;
}

.sm-para {
  font-variant-numeric: tabular-nums;
}

.sm-alt {
  min-height: 42px;
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  background: #fbfcfd;
}

.sm-bos {
  padding: 18px 14px;
  font-size: 13px;
  color: #6b7280;
  text-align: center;
}
</style>
