<template>
  <MobileList
    :items="products || []"
    :search-keys="[
      'KasaNo',
      'UrunAdi',
      'KategoriAdi',
      'OcakAdi',
      'SiparisAciklama',
    ]"
    search-placeholder="Kasa no, ürün, ocak veya PO ara…"
    item-key="KasaNo"
    :on-select="sec"
  >
    <template #totals>
      <div class="si-total">
        <span class="si-total__k">Kasa</span>
        <span class="si-total__v">{{ total?.kasaadedi ?? 0 }}</span>
      </div>
      <div class="si-total">
        <span class="si-total__k">Miktar</span>
        <span class="si-total__v">{{ formatDecimal2(total?.miktar) }}</span>
      </div>
    </template>

    <template #default="{ item }">
      <!--
        KIMLIK KASA NUMARASI. Tabloda ilk kolondu ve digerleriyle ayni
        agirliktaydi; bu ekranda kayitlar kasa kasa konusuluyor, bu
        yuzden kartin basligi o.
      -->
      <div class="si-head">
        <span class="si-kasa">{{ item.KasaNo || "—" }}</span>
        <span v-if="item.Tarih" class="si-tarih">{{ dateToString(item.Tarih) }}</span>
      </div>

      <p class="si-urun">{{ item.UrunAdi || "—" }}</p>
      <p v-if="altBilgi(item)" class="si-alt">{{ altBilgi(item) }}</p>

      <div class="si-olcu-satir">
        <span v-if="olcu(item)" class="si-olcu">{{ olcu(item) }}</span>
        <span v-if="item.OcakAdi" class="si-ocak">{{ item.OcakAdi }}</span>
      </div>

      <!--
        Uc sayi kolonu (Amount / Box Amount / Pcs in Box) yan yana.
        Tabloda ayri kolonlardi ve aralarindaki iliski gorunmuyordu;
        burada tek serit halinde, miktar one cikmis durumda.
      -->
      <div class="si-sayilar">
        <span class="si-sayi si-sayi--ana">
          <span class="si-sayi__v">{{ formatDecimal2(item.Miktar) }}</span>
          <span class="si-sayi__k">Miktar</span>
        </span>
        <span class="si-sayi">
          <span class="si-sayi__v">{{ formatDecimal2(item.KutuAdet) }}</span>
          <span class="si-sayi__k">Kutu</span>
        </span>
        <span class="si-sayi">
          <span class="si-sayi__v">{{ formatDecimal2(item.Adet) }}</span>
          <span class="si-sayi__k">Kutuda</span>
        </span>
      </div>

      <div v-if="item.Kutu || item.Bagli || item.SiparisAciklama" class="si-rozetler">
        <!-- Tabloda bu iki kolon her satirda ✓/x basiyordu; kartta
             yalnizca DOGRU olanlar gorunuyor. -->
        <span v-if="item.Kutu" class="si-rozet">Kutulu</span>
        <span v-if="item.Bagli" class="si-rozet si-rozet--bagli">Bağlı</span>
        <span v-if="item.SiparisAciklama" class="si-po">
          PO {{ item.SiparisAciklama }}
        </span>
      </div>

      <p v-if="item.Aciklama" class="si-aciklama">{{ item.Aciklama }}</p>
    </template>
  </MobileList>
</template>

<script setup>
/*
 * components/selection/input/Cards.vue  --  <SelectionInputCards>
 *
 * Selection > Entry'nin TELEFON gorunumu. Masaustundeki
 * SelectionInputList (16 kolonlu DataTable) ile ayni veriyi ve ayni
 * olayi kullaniyor.
 *
 * [!] OLAY BICIMI KORUNDU: masaustu tablosu @row-select kullandigi
 * icin olay `{ data, index, ... }` seklinde geliyor ve sayfa
 * `event.data`yi modele yaziyor. Duz nesne gonderilseydi diyalog
 * BOS acilirdi.
 *
 * 16 kolon telefonda yan yana okunmuyor; kart dort kata ayrildi --
 * kimlik (kasa no + tarih), urun (ad, kategori, yuzey), fiziksel
 * (olcu, ocak) ve sayilar (miktar, kutu, kutuda). Isaret kolonlari
 * (Kutu / Bagli) rozete dondu: tabloda yerin yarisi "x" yaziyordu.
 */
const props = defineProps({
  products: { type: Array, default: () => [] },
  total: { type: Object, default: () => ({}) },
})

const emit = defineEmits(["product_selected_emit"])

function sec(item) {
  emit("product_selected_emit", { data: item })
}

function altBilgi(item) {
  return [item.KategoriAdi, item.YuzeyIslemAdi].filter(Boolean).join(" · ")
}

/* En × Boy × Kenar -- bos olanlar atlaniyor. */
function olcu(item) {
  return [item.En, item.Boy, item.Kenar]
    .filter((v) => v != null && v !== "" && v !== 0 && v !== "0")
    .join(" × ")
}
</script>

<style scoped>
.si-total {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.si-total__k {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #4b5563;
}

.si-total__v {
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.si-head {
  display: flex;
  gap: 10px;
  align-items: baseline;
}

.si-kasa {
  font-size: 15px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #111827;
}

.si-tarih {
  margin-left: auto;
  font-size: 11.5px;
  font-variant-numeric: tabular-nums;
  color: #6b7280;
}

.si-urun {
  margin: 6px 0 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  color: #111827;
}

.si-alt {
  margin: 2px 0 0;
  font-size: 12.5px;
  color: #4b5563;
}

.si-olcu-satir {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-top: 8px;
}

.si-olcu {
  padding: 2px 8px;

  font-size: 11.5px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #374151;

  background: #eef1f5;
  border-radius: 5px;
}

.si-ocak {
  font-size: 12px;
  color: #6b7280;
}

/* Sayi seridi: miktar baskin, digerleri yanında ikincil. */
.si-sayilar {
  display: flex;
  gap: 18px;
  align-items: flex-end;

  padding-top: 10px;
  margin-top: 10px;

  border-top: 1px solid #f0f2f5;
}

.si-sayi {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.si-sayi__v {
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #374151;
}

.si-sayi__k {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #6b7280;
}

.si-sayi--ana .si-sayi__v {
  font-size: 17px;
  font-weight: 700;
  color: #111827;
}

.si-rozetler {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.si-rozet {
  padding: 3px 9px;
  font-size: 11px;
  font-weight: 700;
  color: #0f766e;
  background: #e3f2ef;
  border-radius: 999px;
}

.si-rozet--bagli {
  color: #1d4ed8;
  background: #e7edfb;
}

.si-po {
  padding: 3px 9px;

  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #374151;

  background: #eef1f5;
  border-radius: 999px;
}

.si-aciklama {
  margin: 9px 0 0;
  font-size: 12.5px;
  line-height: 1.45;
  color: #6b7280;
}
</style>
