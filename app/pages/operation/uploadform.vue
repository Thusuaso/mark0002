<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <uploadForm
          :orders="sharedStore.getOrdersAllList"
          :preselectedPo="preselectedPo"
        />
      </div>
      <div class="col">
        <uploadList
          :model="uploadStore.getDocumentModelList"
          @document_form_emit="documentForm($event)"
        />
      </div>
    </div>

    <Dialog v-model:visible="document_form" header="" modal>
      <uploadDocForm :link="document_link" />
    </Dialog>
    <Dialog v-model:visible="document_isf_form" header="" modal>
      <uploadIsfForm :isf="uploadStore.getDocumentSupplierList" />
    </Dialog>
    <Dialog v-model:visible="document_supplier_form" header="" modal>
      <uploadSupplierForm
        :supplier="uploadStore.getDocumentProductSupplierList"
      />
    </Dialog>
  </div>
</template>

<script>
import { useUploadStore } from "~/stores/upload"
import { useSharedStore } from "~/stores/shared"

/*
 * EVRAK ADI -> INDIRME KLASORU (file-service yolundaki id).
 *
 * ---------------------------------------------------------------------
 * 24 DALLIK if ZINCIRI -> ESLEME TABLOSU
 * ---------------------------------------------------------------------
 * Kaynakta documentForm 130 satirdi ve govdesi 24 kez TEKRARLAYAN ayni
 * uc satirdan olusuyordu:
 *
 *     if (event.EvrakAdi == '<ad>') {
 *       this.document_link = `.../file/download/<id>/${po}`
 *       this.document_form = true
 *     }
 *
 * Hepsi TAM ESITLIK ve `else if` bile DEGIL -- duz `if`ler. EvrakAdi tek
 * bir deger oldugu icin en fazla biri eslesir, yani tabloya cevirmek
 * DAVRANIS-ESDEGER.
 *
 * DIKKAT -- 'ATR' IKI YAZIMLA: kaynakta
 * `EvrakAdi == 'ATR' || EvrakAdi == 'ATR (Dolaşım Belgesi)'` tek daldaydi.
 * Evrak 75 artik sunucuda "ATR (Dolaşım Belgesi)" olarak adlandiriliyor
 * (api/index.js), ama ESKI KAYITLAR hala "ATR" donebildigi icin iki
 * yazim da tabloda.
 */
const DOCUMENT_LINK_IDS = {
  "Purchase Order": 1,
  "Proforma Invoice": 2,
  "Çeki Listesi": 4,
  "Yükleme Notası": 5,
  "Mekmar-Efes Gümrük Faturası": 6,
  "Gümrük Notası": 7,
  "ISF vb Formlar": 8,
  Konşimento: 9,
  "İlaçlama Belgesi": 10,
  "Gçb Beyannamesi": 12,
  "Nakliye Faturaları": 13,
  "Packing Declarition": 14,
  "L-C Metin": 15,
  "Commer Invoice": 16,
  "Packing List": 17,
  Booking: 20,
  "Certificate of Origin": 74,
  ATR: 75,
  "ATR (Dolaşım Belgesi)": 75,
  "Telex Release": 78,
  "Türkçe Fatura": 79,
  "İlaçlama Notası": 71,
  Fotolar: 72,
  Other: 77,
  Draft: 99,
}

const FILE_BASE = "https://file-service.mekmar.com/file"

export default {
  computed: {
    uploadStore() {
      return useUploadStore()
    },
    sharedStore() {
      return useSharedStore()
    },
    /*
     * Navbar'daki eksik evrak panelinden gelen PO.
     *
     * Nuxt 2'de sablonda dogrudan `$route.query.po || null` yaziliyordu;
     * burada computed'e alindi ki query degisince uploadForm'un
     * `preselectedPo` watch'i tetiklensin (ayni sayfada baska bir PO
     * secilebiliyor).
     */
    preselectedPo() {
      const po = useRoute().query.po
      return typeof po === "string" ? po : null
    },
  },

  data() {
    return {
      document_form: false,
      document_link: null,
      document_isf_form: false,
      document_supplier_form: false,
    }
  },

  methods: {
    documentForm(event) {
      const po = event.SiparisNo

      /* Denizcilik faturalari TEK ISTISNA: link PO'dan degil,
       * konteyner firmasi + evrak adindan kuruluyor. */
      if (event.EvrakAdi == "Denizcilik Faturaları") {
        this.document_link =
          `${FILE_BASE}/download/customer/${event.KonteynerFirmaID}/${event.DocName}`
        this.document_form = true
        return
      }

      /* Bu iki evrak indirme degil, AYRI BIR DIYALOG aciyor: once
       * tedarikci listesi cekiliyor, kullanici secimi orada yapiyor. */
      if (event.EvrakAdi == "İç Sipariş") {
        this.uploadStore.setDocumentSupplierList(po)
        this.document_isf_form = true
        return
      }
      if (event.EvrakAdi == "Tedarikçi Faturaları") {
        this.uploadStore.setDocumentProductSupplierList(po)
        this.document_supplier_form = true
        return
      }

      const id = DOCUMENT_LINK_IDS[event.EvrakAdi]
      /* Tabloda olmayan evrak adinda kaynak da HICBIR SEY yapmiyordu:
       * diyalog acilmiyor, onceki link duruyor. Korundu. */
      if (id === undefined) return

      this.document_link = `${FILE_BASE}/download/${id}/${po}`
      this.document_form = true
    },
  },
}
</script>

<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde cagrilabilir ->
 * Options API sayfalarinda ikinci bir script blogu gerekiyor. Options
 * API'deki `middleware: [...]` anahtari Nuxt 3+'ta YOK SAYILIR: hata
 * vermez, kisitlama sessizce kalkar (bkz. commit 5fc77edb1).
 *
 * server: false ZORUNLU -- iki uc de legacy Express API'sinde ve o,
 * SSR'in IC fetch yolunda calismiyor (bkz. server/middleware/1.legacy-api.ts).
 */
const uploadStore = useUploadStore()
const sharedStore = useSharedStore()

definePageMeta({ middleware: ["authority"] })

/*
 * setOrderAllList EKLENDI -- NUXT 2'DE BU SAYFA CAGIRMIYORDU.
 *
 * uploadForm'un `orders` prop'u bu listeden geliyor ve PO AutoComplete'i
 * de ?po=... onsecimi de ona bagli. Nuxt 2'de listeyi layouts/default.vue
 * dolduruyordu; pilotun layout'u bunu yapmiyor ve her sayfa kendi
 * referans verisini cekiyor (ayni ekleme operation/container.vue,
 * transport.vue ve transportlist.vue'da da yapildi). Cagrilmazsa
 * AutoComplete bos kalir ve eksik evrak panelinden gelen PO HIC
 * secilmez.
 */
await useAsyncData(
  "operation-uploadform",
  () =>
    Promise.all([
      uploadStore.setDocumentModelList(),
      sharedStore.setOrderAllList(),
    ]),
  { server: false },
)
</script>

<!--
  pages/operation/uploadform.vue

  Yukleme evraki ekrani. Pilota BU COMMIT'TE eklendi; navbar'daki eksik
  evrak panelinden ?po=... ile buraya geliniyor.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] middleware: ["authority"] -> definePageMeta (gerekcesi yukarida)
  [x] mapGetters([...]) -> uploadStore / sharedStore
      Store pilota BU COMMIT'TE eklendi (app/stores/upload.ts).
  [x] this.$store.dispatch("setDocumentModelList") -> useAsyncData
      (created() SSR'da beklenmez; gerekcesi <script setup> icinde)
  [x] :visible.sync -> v-model:visible  (uc Dialog)
  [x] <docform> / <isfform> / <supplierform>
         -> <uploadDocForm> / <uploadIsfForm> / <uploadSupplierForm>
      Nuxt 2'de bunlar plugins/components.js'te ONEKSIZ kayitliydi;
      Nuxt 3+ auto-import adi dosya yolundan uretiyor, yani klasor adi
      (upload) one geliyor.
  [x] 24 dallik if zinciri -> DOCUMENT_LINK_IDS tablosu (gerekcesi
      tablonun basinda)
  [x] setOrderAllList eklendi (gerekcesi <script setup> icinde)

  KALDIRILDI -- OLU KOD:

  [x] mapGetters icindeki `getDocForm`: sablonda da script'te de
      OKUYAN YOK. Nuxt 2'de de olu referanstı.
  [x] documentForm icindeki kullanilmayan yerel degiskenler: `id`
      (event.ID) ve `document` (event.EvrakAdi) atanip HIC
      kullanilmiyordu.
-->
