<template>
  <div class="container-fluid pp">
    <header class="pp-head">
      <div>
        <p class="pp-eyebrow">Operation</p>
        <h1 class="pp-title">Palet Takibi</h1>
      </div>

      <Button
        severity="success"
        icon="pi pi-plus"
        label="Yeni Palet"
        @click="yeniForm"
      />
    </header>

    <!--
      TUMU / KULLANILAN / KULLANILMAYAN.

      Suzgec SUNUCUDA uygulaniyor (api/index.js /palet/list?durum=...):
      istemcide suzmek her seferinde TUM paletleri indirmek demekti.
      Sayilar her istekte govdeyle geliyor, yani rozetteki sayi suzulen
      listeden degil tablonun tamamindan -- "Kullanilan"a bakarken
      "Kullanilmayan (37)" yazisi dogru kaliyor.

      SelectButton DEGIL kendi dugmelerim: sayilari rozet olarak
      gostermek ve aktif olani renkle AYIRMAK gerekiyordu; SelectButton
      secenek icine serbest icerik almiyor.
    -->
    <div class="pp-suzgec" role="group" aria-label="Palet durumu">
      <button
        v-for="s in secenekler"
        :key="s.deger"
        type="button"
        class="pp-sec"
        :class="{ 'pp-sec--aktif': durum === s.deger }"
        :aria-pressed="String(durum === s.deger)"
        @click="durumSec(s.deger)"
      >
        {{ s.ad }}
        <span class="pp-sayi">{{ sayim[s.deger] ?? 0 }}</span>
      </button>

      <p class="pp-ozet">
        <span>{{ paletStore.getPaletAdetToplam }} adet</span>
        <span aria-hidden="true">·</span>
        <span>{{ formatDecimal(paletStore.getPaletM2Toplam) }} m²</span>
      </p>
    </div>

    <PaletList
      :list="paletStore.getPaletList"
      :loading="paletStore.yukleniyor"
      :durum="durum"
      :m2-toplam="paletStore.getPaletM2Toplam"
      :adet-toplam="paletStore.getPaletAdetToplam"
      @palet_selected_emit="paletSecildi($event)"
      @palet_used_emit="kullanildiDegistir($event)"
      @palet_delete_emit="paletSil($event)"
    />

    <Dialog
      v-model:visible="formGorunur"
      :header="secilenKayit.ID ? `Palet ${secilenKayit.PaletNo}` : 'Yeni Palet'"
      modal
      blockScroll
      :style="{ width: '60rem' }"
      :breakpoints="{ '991px': '92vw' }"
    >
      <PaletForm
        :kayit="secilenKayit"
        :lookups="paletStore.getPaletLookups"
        @palet_form_close_emit="formGorunur = false"
        @palet_saved_emit="formGorunur = false"
      />
    </Dialog>
  </div>
</template>

<script>
import { usePaletStore } from "~/stores/palet"

export default {
  computed: {
    paletStore() {
      return usePaletStore()
    },

    sayim() {
      return this.paletStore.getPaletSayim
    },
  },

  data() {
    return {
      durum: "tumu",
      formGorunur: false,
      secilenKayit: {},

      secenekler: [
        { deger: "tumu", ad: "Tümü" },
        { deger: "kullanilan", ad: "Kullanılan" },
        { deger: "kullanilmayan", ad: "Kullanılmayan" },
      ],
    }
  },

  methods: {
    async durumSec(deger) {
      if (this.durum === deger) return
      this.durum = deger
      await this.paletStore.setPaletList(deger)
    },

    yeniForm() {
      /* Bos nesne: formun watch'i bunu gorup alanlari sifirliyor. */
      this.secilenKayit = {}
      this.formGorunur = true
    },

    paletSecildi(kayit) {
      this.secilenKayit = { ...kayit }
      this.formGorunur = true
    },

    kullanildiDegistir(kayit) {
      /* Tersine cevir -- tek tiklamayla isaretle/isareti kaldir. */
      this.paletStore.setPaletUsed(kayit.ID, !kayit.Kullanildi)
    },

    paletSil(kayit) {
      /* Yikici islem -- onay. Metin: app/utils/confirm.ts */
      if (!confirmAction()) return
      this.paletStore.setPaletDelete(kayit.ID)
    },
  },
}
</script>

<script setup>
/*
 * Veri cekimi NEDEN created() icinde degil: SSR created() icindeki async
 * isi BEKLEMEZ -- liste BOS serialize edilir, client hydration onu
 * devralir ve created() bir daha calismadigi icin tablo bos kalir.
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 */
const paletStore = usePaletStore()

await useAsyncData(
  "operation-palet",
  async () => {
    await Promise.all([
      paletStore.setPaletList("tumu"),
      /* AutoComplete listeleri form ACILMADAN once hazir olmali:
         dialog acildiginda istek beklenirse alanlar bir an bos ve
         onerisiz kalir, kullanici da mevcut bir degeri "yeni" sanip
         yeniden yazar. */
      paletStore.setPaletLookups(),
    ])
    return true
  },
  { server: false },
)
</script>

<style scoped>
.pp {
  padding: 1rem 0.75rem 2rem;
}

.pp-head {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.pp-eyebrow {
  margin: 0;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6b7280;
}

.pp-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}

.pp-suzgec {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;

  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;

  border-bottom: 1px solid #e5e7eb;
}

/* 40px dokunma hedefi -- mobilde de kullanilabilir. */
.pp-sec {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;

  min-height: 40px;
  padding: 0 0.9rem;

  font: inherit;
  font-weight: 600;
  color: #374151;

  background: #f1f3f6;
  border: 1px solid transparent;
  border-radius: 999px;
  cursor: pointer;
}

.pp-sec:hover {
  background: #e8ebf0;
}

/*
 * Aktif secenek: renk + kenarlik + kalinlik. Renk TEK BASINA tasiyici
 * degil -- aria-pressed de dogru deger tasiyor ve kenarlik gorsel
 * olarak ikinci bir ipucu.
 */
.pp-sec--aktif {
  color: #0f3f78;
  background: #e5efff;
  border-color: #9cc3f5;
}

.pp-sayi {
  padding: 0.05rem 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  background: rgb(255 255 255 / 70%);
  border-radius: 999px;
}

.pp-ozet {
  display: flex;
  gap: 0.4rem;
  margin: 0 0 0 auto;
  font-size: 0.85rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #4b5563;
}
</style>

<!--
  pages/operation/palet.vue

  YENI EKRAN -- Nuxt 2'de karsiligi YOK.

  Tablolar : api/sql/PaletTB.sql   (tasarim kararlari orada)
  Uclar    : api/index.js, "PALET TAKIBI" blogu
  Store    : app/stores/palet.ts
  Bilesenler: components/palet/List.vue, components/palet/Form.vue

  ISTEKTEN GELEN KURALLAR VE NEREDE KARSILANDIGI:
    - Tarih                          -> Form, DatePicker
    - Firma AutoComplete, "varsa uyari / yoksa kaydet"
                                     -> Form (uyari) + paletListeId (kayit)
    - Palet No P0001'den otomatik    -> PaletTB.PaletNo hesaplanan kolon
    - En / Boy / Kalinlik AYRI AYRI AutoComplete, ayni mantik
                                     -> Form ALANLAR tanimi + bes liste tablosu
    - Urun bilgisi AutoComplete      -> ayni
    - Adet                           -> Form
    - M2 otomatik (adet, en, boy)    -> Form m2Hesapla (anlik) + paletM2 (kayitli)
    - Yeni palet HER ZAMAN "kullanilmadi" girer
                                     -> PaletTB DEFAULT 0; /palet/save o kolonu
                                        hic yazmiyor, formda da kutu YOK
    - Kullanildi / Kullanilmadi yazisi, tiklanarak degisiyor
                                     -> List "Durum" kolonu (yazi + kutu tek
                                        dugmede) -> /palet/used, durumu
                                        degistiren TEK yol
    - Ust kisimda Tumu / Kullanilan / Kullanilmayan
                                     -> bu sayfa, .pp-suzgec (suzme SUNUCUDA)
-->
