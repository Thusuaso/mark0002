<template>
  <MobileList
    :items="list || []"
    :search-keys="[
      'KasaNo',
      'UrunAdi',
      'FirmaAdi',
      'KategoriAdi',
      'OcakAdi',
      'SiparisAciklama',
    ]"
    search-placeholder="Kasa no, ürün, tedarikçi veya PO ara…"
    @filtered="suzuldu"
  >
    <template #totals>
      <div class="pc-total">
        <span class="pc-total__k">Kasa</span>
        <span class="pc-total__v">{{ formatDecimal(total?.crate) }}</span>
      </div>
      <div class="pc-total">
        <span class="pc-total__k">Miktar</span>
        <span class="pc-total__v">{{ formatDecimal(total?.amount) }}</span>
      </div>
    </template>

    <template #default="{ item }">
      <div class="pc-head">
        <span class="pc-kasa">{{ item.KasaNo || "—" }}</span>
        <span v-if="item.Tarih" class="pc-tarih">
          {{ dateToString(item.Tarih) }}
        </span>
      </div>

      <p class="pc-urun">{{ item.UrunAdi || "—" }}</p>
      <p v-if="altBilgi(item)" class="pc-alt">{{ altBilgi(item) }}</p>

      <div class="pc-serit">
        <span v-if="olcu(item)" class="pc-olcu">{{ olcu(item) }}</span>
        <span v-if="item.FirmaAdi" class="pc-tedarikci">{{ item.FirmaAdi }}</span>
      </div>

      <div class="pc-sayilar">
        <span class="pc-sayi pc-sayi--ana">
          <span class="pc-sayi__v">
            {{ formatDecimal(item.Miktar) }}
            <small v-if="item.BirimAdi">{{ item.BirimAdi }}</small>
          </span>
          <span class="pc-sayi__k">Miktar</span>
        </span>
        <span class="pc-sayi">
          <span class="pc-sayi__v">{{ formatDecimal(item.Adet) }}</span>
          <span class="pc-sayi__k">Adet</span>
        </span>
      </div>

      <!--
        Fason ve Kutulama UC DURUMLU: tabloda true ise "Fason",
        false ise "Fason Değil" yaziyor, null ise hicbir sey. Bilgi
        kaybolmasin diye uc durum da korundu -- "degil" soluk rozetle,
        cunku olumsuz durum goz cekmemeli ama okunabilir kalmali.
      -->
      <div v-if="rozetVar(item)" class="pc-rozetler">
        <span v-if="item.Fason === true" class="pc-rozet">Fason</span>
        <span v-else-if="item.Fason === false" class="pc-rozet pc-rozet--yok">
          Fason değil
        </span>

        <span v-if="item.Kutulama === true" class="pc-rozet pc-rozet--kutu">
          Kutulama
        </span>
        <span
          v-else-if="item.Kutulama === false"
          class="pc-rozet pc-rozet--yok"
        >
          Kutulama değil
        </span>

        <span v-if="item.SiparisAciklama" class="pc-po">
          PO {{ item.SiparisAciklama }}
        </span>
      </div>

      <p v-if="item.Aciklama" class="pc-aciklama">{{ item.Aciklama }}</p>
    </template>
  </MobileList>
</template>

<script setup>
/*
 * components/reports/mekmer/ProductionCards.vue
 *   --  <ReportsMekmerProductionCards>
 *
 * Production Crates'in TELEFON gorunumu.
 *
 * Masaustu bileseni (ReportsMekmerProductionList) IKI DataTable
 * tasiyor -- biri `dates` dolu, oteki bos iken. Ikisinin KOLONLARI
 * AYNI; fark yalnizca hangi filtre nesnesini ve sirayi kullandiklari.
 * Bu yuzden kart tarafinda tek bilesen yetiyor: ayni veriyi ayni
 * sekilde gosteriyor, `dates` ayrimi gorsel bir fark uretmiyordu.
 *
 * [!] FILTRE OLAYLARI KORUNDU. Bu ekranda Excel ciktisi EKRANDA
 * GORUNENI aliyor: sayfa `is_filtered` ve `mekmer_filtered_list`
 * tutuyor, bunlari liste bileseninin olaylarindan besliyor.
 * Kartlarda DataTable'in @filter olayi yok; MobileList'in `filtered`
 * bildirimi ayni iki olaya cevriliyor. Yapilmasaydi telefonda arama
 * yapip Excel alan kullanici TUM listeyi indirir ve bunu ancak
 * dosyayi acinca fark ederdi.
 *
 * Satir tiklamasi YOK -- masaustu tablosunda da yok, bu ekranin
 * detay diyalogu bulunmuyor.
 */
defineProps({
  list: { type: Array, default: () => [] },
  total: { type: Object, default: () => ({}) },
  /* Masaustu bileseniyle sozlesme ayni kalsin diye duruyor; kart
     gorunumu iki tablo ayrimi yapmadigi icin kullanilmiyor. */
  dates: { type: null, default: null },
})

const emit = defineEmits([
  "mekmer_filtered_production_list_emit",
  "mekmer_production_filter_cleared_emit",
])

function suzuldu(liste, aramaVar) {
  if (aramaVar) {
    emit("mekmer_filtered_production_list_emit", liste)
  } else {
    emit("mekmer_production_filter_cleared_emit")
  }
}

function altBilgi(item) {
  return [item.KategoriAdi, item.YuzeyIslemAdi, item.OcakAdi]
    .filter(Boolean)
    .join(" · ")
}

/* En × Boy × Kenar -- bos olanlar atlaniyor. */
function olcu(item) {
  return [item.En, item.Boy, item.Kenar]
    .filter((v) => v != null && v !== "" && v !== 0 && v !== "0")
    .join(" × ")
}

function rozetVar(item) {
  return (
    item.Fason === true ||
    item.Fason === false ||
    item.Kutulama === true ||
    item.Kutulama === false ||
    !!item.SiparisAciklama
  )
}
</script>

<style scoped>
.pc-total {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.pc-total__k {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #4b5563;
}

.pc-total__v {
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.pc-head {
  display: flex;
  gap: 10px;
  align-items: baseline;
}

.pc-kasa {
  font-size: 15px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #111827;
}

.pc-tarih {
  margin-left: auto;
  font-size: 11.5px;
  font-variant-numeric: tabular-nums;
  color: #6b7280;
}

.pc-urun {
  margin: 6px 0 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  color: #111827;
}

.pc-alt {
  margin: 2px 0 0;
  font-size: 12.5px;
  line-height: 1.35;
  color: #4b5563;
}

.pc-serit {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-top: 8px;
}

.pc-olcu {
  padding: 2px 8px;

  font-size: 11.5px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #374151;

  background: #eef1f5;
  border-radius: 5px;
}

.pc-tedarikci {
  font-size: 12px;
  color: #6b7280;
}

.pc-sayilar {
  display: flex;
  gap: 20px;
  align-items: flex-end;

  padding-top: 10px;
  margin-top: 10px;

  border-top: 1px solid #f0f2f5;
}

.pc-sayi {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.pc-sayi__v {
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #374151;
}

.pc-sayi__v small {
  font-size: 10.5px;
  font-weight: 600;
  color: #6b7280;
}

.pc-sayi__k {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #6b7280;
}

.pc-sayi--ana .pc-sayi__v {
  font-size: 17px;
  font-weight: 700;
  color: #111827;
}

.pc-rozetler {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.pc-rozet {
  padding: 3px 9px;
  font-size: 11px;
  font-weight: 700;
  color: #0f766e;
  background: #e3f2ef;
  border-radius: 999px;
}

.pc-rozet--kutu {
  color: #1d4ed8;
  background: #e7edfb;
}

/* Olumsuz durum: okunur ama goz cekmiyor. */
.pc-rozet--yok {
  font-weight: 600;
  color: #6b7280;
  background: #f1f3f6;
}

.pc-po {
  padding: 3px 9px;

  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #374151;

  background: #eef1f5;
  border-radius: 999px;
}

.pc-aciklama {
  margin: 9px 0 0;
  font-size: 12.5px;
  line-height: 1.45;
  color: #6b7280;
}
</style>
