<template>
  <MobileList
    :items="list || []"
    :search-keys="['UrunAdi', 'KategoriAdi', 'YuzeyIslemAdi']"
    search-placeholder="Ürün, kategori veya yüzey ara…"
    :on-select="(item) => $emit('reports_mekmer_stock_list_selected_emit', { data: item })"
  >
    <template #totals>
      <div class="sc-total">
        <span class="sc-total__k">Toplam m²</span>
        <span class="sc-total__v">{{ formatDecimal2(total?.amount) }}</span>
      </div>
      <div class="sc-total">
        <span class="sc-total__k">Kasa</span>
        <span class="sc-total__v">{{ formatDecimal2(total?.crate) }}</span>
      </div>
    </template>

    <template #default="{ item }">
      <!--
        Kartin omurgasi: SOLDA kimlik, SAGDA miktar.
        Tabloda bu sekiz kolon esit agirliktaydi; telefonda hepsini ayni
        anda okutmaya calismak yerine once "hangi urun", sonra "ne kadar"
        sorusu cevaplaniyor.
      -->
      <div class="sc-row">
        <div class="sc-id">
          <p class="sc-name">{{ item.UrunAdi || "—" }}</p>
          <p class="sc-sub">
            <span v-if="item.KategoriAdi">{{ item.KategoriAdi }}</span>
            <span v-if="item.KategoriAdi && item.YuzeyIslemAdi" aria-hidden="true"> · </span>
            <span v-if="item.YuzeyIslemAdi">{{ item.YuzeyIslemAdi }}</span>
          </p>
          <p v-if="olcu(item)" class="sc-size">{{ olcu(item) }}</p>
        </div>

        <div class="sc-qty">
          <span class="sc-amount">{{ formatDecimal2(item.Toplam) }}</span>
          <span class="sc-unit">m²</span>
          <span class="sc-crate">{{ item.KasaSayisi || 0 }} kasa</span>
        </div>
      </div>
    </template>
  </MobileList>
</template>

<script setup>
/*
 * components/reports/mekmer/StockCards.vue  --  <ReportsMekmerStockCards>
 *
 * Stock Report'un TELEFON gorunumu. Masaustundeki
 * ReportsMekmerStockList (8 kolonlu DataTable) ile ayni veriyi ve ayni
 * olayi kullaniyor, yani sayfada biri digerinin yerine geciyor.
 *
 * [!] MASAUSTUNUN KUCULTULMUSU DEGIL. Sekiz kolon telefonda yan yana
 * okunmuyor; kart iki bolgeye ayrildi -- solda kimlik (urun, kategori,
 * yuzey, olcu), sagda miktar (m2 ve kasa). Olcu uc ayri kolondu
 * (En/Boy/Kenar), burada tek satirda birlesiyor: ayri ayri hicbir
 * anlami yok, birlikte "hangi ebat" demek.
 *
 * Kolon bazli filtre ve siralama YOK -- karsiligi tek arama kutusu.
 * Ihtiyac duyulursa tam tablo masaustunde duruyor.
 */
defineProps({
  list: { type: Array, default: () => [] },
  total: { type: Object, default: () => ({}) },
})

defineEmits(["reports_mekmer_stock_list_selected_emit"])

/* En × Boy × Kenar -- bos olanlar atlaniyor, yoksa "× ×" kaliyor. */
function olcu(item) {
  return [item.En, item.Boy, item.Kenar]
    .filter((v) => v != null && v !== "" && v !== 0 && v !== "0")
    .join(" × ")
}
</script>

<style scoped>
.sc-total {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.sc-total__k {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #4b5563;
}

.sc-total__v {
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.sc-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.sc-id {
  flex-grow: 1;
  min-width: 0;
}

.sc-name {
  margin: 0;
  font-size: 15px;
  font-weight: 650;
  line-height: 1.3;
  color: #111827;
}

.sc-sub {
  margin: 3px 0 0;
  font-size: 12.5px;
  line-height: 1.35;
  color: #4b5563;
}

.sc-size {
  display: inline-block;
  margin: 6px 0 0;
  padding: 2px 8px;

  font-size: 11.5px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #374151;

  background: #eef1f5;
  border-radius: 5px;
}

/* Miktar bolgesi: sagda, sabit hizada, rakamlar alt alta okunsun. */
.sc-qty {
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: flex-end;
  gap: 1px;

  min-width: 84px;
}

.sc-amount {
  font-size: 17px;
  font-weight: 700;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
  color: #111827;
}

.sc-unit {
  font-size: 11px;
  font-weight: 600;
  color: #4b5563;
}

.sc-crate {
  margin-top: 5px;
  font-size: 11.5px;
  font-variant-numeric: tabular-nums;
  color: #0f766e;
}
</style>
