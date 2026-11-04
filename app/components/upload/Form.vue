<template>
  <div>
    <FloatLabel class="w-100 mb-3">
      <AutoComplete
        class="w-100"
        v-model="selectedOrder"
        inputId="order"
        :suggestions="filteredOrders"
        @complete="searchOrders($event)"
        optionLabel="SiparisNo"
        @item-select="orderSelected($event.value.SiparisNo)"
      />
      <label for="order">Po</label>
    </FloatLabel>

    <uploadMissingPanel
      ref="missingPanel"
      :po="selectedOrder ? selectedOrder.SiparisNo : null"
    />

    <FileUpload
      mode="advanced"
      accept=".pdf"
      :maxFileSize="1000000"
      :multiple="true"
      :auto="true"
      :disabled="!selectedOrder"
      chooseLabel="Upload Document"
      @select="onUpload($event)"
    />
  </div>
</template>
<script>
import { useUploadStore } from "~/stores/upload"

/*
 * components/upload/form.vue karsiligi (Shipment Form -- evrak yukleme).
 *
 * ---------------------------------------------------------------------
 * 26 DALLIK if/else ZINCIRI -> ESLEME TABLOSU
 * ---------------------------------------------------------------------
 * Kaynakta onUpload 330 satirdi ve govdesi 26 kez TEKRARLAYAN ayni
 * blogdan olusuyordu:
 *
 *     else if (item.name == "<evrak adi>.pdf") {
 *       this.folderProductInfo = { id:0, siparisno:"", kullaniciId:"",
 *                                  tarih: date.dateToString(new Date()) }
 *       this.folderProductInfo.id = <evrak id>
 *       this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo
 *       this.folderProductInfo.kullaniciId = Cookies.get("userId")
 *       this.sendServer(item, <id>, this.selectedOrder.SiparisNo)
 *       this.sendDatabase(this.folderProductInfo)
 *     }
 *
 * Dallarin TEK farki dosya adi ve evrak ID'si. Tum karsilastirmalar TAM
 * ESITLIK oldugu icin (hicbir dosya adi iki dala uyamaz) zincirin sirasi
 * anlamsiz; tabloya cevirmek DAVRANIS-ESDEGER.
 *
 * `folderProductInfo` ARTIK DATA'DA DEGIL: kaynakta bileşen durumuydu
 * ama her dalda bastan yaziliyor ve yalnizca o dalda okunuyordu -- yani
 * gercekte yerel bir degiskendi. Durumda tutmak coklu dosya yuklemesinde
 * son dosyanin degerini geride birakiyordu (okuyan olmadigi icin
 * zararsizdi).
 *
 * TABLODA 11 YOK -- KASITLI: "Dolasim Belgeleri (Eski)" (11) artik
 * yuklenmiyor, yerine 75 "ATR (Dolasim Belgesi)" kullaniliyor. Sunucu da
 * o evragi listeden gizliyor (api/index.js: UPLOAD_FORM_HIDDEN_DOCS).
 *
 * ---------------------------------------------------------------------
 * TASIMA DEGISIKLIKLERI
 * ---------------------------------------------------------------------
 *   <span class="p-float-label"> -> <FloatLabel>   (PrimeVue 4'te o
 *       sinif TAMAMEN kaldirildi, bkz. codemod-float-label.mjs)
 *   AutoComplete `field`        -> `optionLabel`   (PrimeVue 4'te
 *       `field` kaldirildi; birakilsa oneri listesi "[object Object]"
 *       gosterirdi)
 *   plugins/upload fileService  -> useFileService().sendInvoice
 *   plugins/date                -> toIsoDate()  (API'ye YAZILAN bicim;
 *       gosterim bicimi formatters.dateToString ILE KARISTIRILMAMALI)
 *   Cookies.get("userId")       -> useCookie("userId").value
 *   this.$store.dispatch(...)   -> uploadStore.*
 *
 *   @upload DUSURULDU: kaynak hem @upload hem @select'i ayni metoda
 *   bagliyordu. `url` verilmedigi icin PrimeVue gercek bir XHR
 *   yapamiyor, yani @upload HIC tetiklenmiyordu -- tek calisan
 *   @select'ti. PrimeVue 4'te ikisini birden birakmak onUpload'un iki
 *   kez cagrilmasi riskini tasiyordu.
 *
 * ---------------------------------------------------------------------
 * DUZELTILDI -- PO SECILMEDEN DOSYA BIRAKILIRSA SESSIZCE PATLIYORDU
 * ---------------------------------------------------------------------
 * onUpload, dongunun hemen ardindan `this.selectedOrder.SiparisNo`
 * okuyor. Nuxt 2'de FileUpload her zaman etkindi, yani kullanici PO
 * secmeden bir PDF birakirsa
 *     TypeError: Cannot read properties of null (reading 'SiparisNo')
 * aliyordu -- hicbir mesaj gormeden, dosya da gitmeden.
 *
 * Iki katmanli koruma: FileUpload PO secilene kadar PASIF (sablonda
 * :disabled) ve metot yine de kontrol ediyor. Ayni duzeltme ayni
 * gerekceyle container/InputForm.vue'da da yapilmisti.
 *
 * ---------------------------------------------------------------------
 * KORUNAN TUHAFLIK -- TANINMAYAN DOSYA ADI SESSIZCE YUTULUYOR
 * ---------------------------------------------------------------------
 * Tabloda olmayan bir dosya adi (orn. "fatura.pdf") HICBIR SEY yapmaz:
 * ne yuklenir ne kayit dusser. Buna ragmen "Kayit Basarili." bildirimi
 * cikar, cunku kaynak o bildirimi dongunun SONUCUNU BEKLEMEDEN, kosulsuz
 * gosteriyor. Kullanici dosyanin gittigini sanir.
 *
 * Davranis BILEREK degistirilmedi (bildirim eklemek/yerini kaydirmak
 * kullanicinin gordugu akisi degistirir); duzeltilmesi ayri bir karar.
 */

/* Dosya adi -> YeniYuklemeEvraklarTB.ID. Kaynaktaki 26 dalin birebir
 * karsiligi; sira onemsiz (hepsi tam esitlik). */
const DOCUMENT_IDS = {
  "Purchase Order.pdf": 1,
  "Proforma Invoice.pdf": 2,
  "İç Sipariş.pdf": 3,
  "Çeki Listesi.pdf": 4,
  "Yükleme Notası.pdf": 5,
  "Mekmar-Efes Gümrük Faturası.pdf": 6,
  "Gümrük Notası.pdf": 7,
  "ISF vb Formlar.pdf": 8,
  "Konşimento.pdf": 9,
  "İlaçlama Belgesi.pdf": 10,
  "Gçb Beyannamesi.pdf": 12,
  "Packing Declarition.pdf": 14,
  "L-C Metin.pdf": 15,
  "Commer Invoice.pdf": 16,
  "Packing List.pdf": 17,
  "Booking.pdf": 20,
  "Özel İşçilik Faturaları.pdf": 40,
  "İlaçlama Notası.pdf": 71,
  "Fotolar.pdf": 72,
  "Certificate of Origin.pdf": 74,

  /* Uc ayri yazim da ayni evraga gidiyor -- kaynakta tek dalda
   * `||` ile birlesikti. */
  "ATR.pdf": 75,
  "atr.pdf": 75,
  "ATR (Dolaşım Belgesi).pdf": 75,

  "Dispatch Note.pdf": 76,
  "Other.pdf": 77,
  "Telex Release.pdf": 78,
  "Türkçe Fatura.pdf": 79,
  "Draft.pdf": 99,
}

export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
    /* Navbar'daki eksik evrak listesinden gelen PO (?po=...) */
    preselectedPo: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      selectedOrder: null,
      filteredOrders: null,
    }
  },
  computed: {
    uploadStore() {
      return useUploadStore()
    },
  },
  watch: {
    /* Siparis listesi sayfadan ASENKRON geldigi icin beklenir:
     * ?po=... ile gelindiginde liste henuz bos olabilir. */
    orders: {
      immediate: true,
      handler() {
        this.applyPreselectedPo()
      },
    },
    preselectedPo() {
      this.applyPreselectedPo()
    },
  },
  methods: {
    applyPreselectedPo() {
      if (!this.preselectedPo) return

      /* Sayfa acikken sidebar'dan BASKA bir PO secilebilir; bu yuzden
       * yalnizca AYNI PO tekrar gelirse atlanir. */
      if (
        this.selectedOrder &&
        this.selectedOrder.SiparisNo == this.preselectedPo
      ) {
        return
      }

      const order = this.orders.find((x) => x.SiparisNo == this.preselectedPo)
      if (!order) return

      this.selectedOrder = order
      this.orderSelected(order.SiparisNo)
    },

    orderSelected(po) {
      this.uploadStore.setDocumentList(po)
    },

    searchOrders(event) {
      this.filteredOrders =
        event.query.length == 0
          ? this.orders
          : this.orders.filter((x) =>
              x.SiparisNo.toLowerCase().startsWith(event.query.toLowerCase()),
            )
    },

    async onUpload(event) {
      /* Gerekcesi dosya basindaki "PO SECILMEDEN..." notunda. */
      if (!this.selectedOrder) {
        useAppToast().error("Önce bir PO seçin.")
        return
      }

      const po = this.selectedOrder.SiparisNo
      const userId = useCookie("userId").value
      const tarih = toIsoDate(new Date())
      const pendingSaves = []

      for (const item of event.files) {
        const id = DOCUMENT_IDS[item.name]
        /* Tabloda olmayan dosya adi sessizce atlanir -- gerekcesi
         * dosya basindaki "TANINMAYAN DOSYA ADI" notunda. */
        if (id === undefined) continue

        /* Dosya yuklemesi BEKLENMIYOR: kaynak da beklemiyordu, yani
         * yukleme basarisiz olsa bile veritabanina kayit dusuyor.
         * Siralamayi degistirmek davranis degisikligi olurdu. */
        this.sendServer(item, id, po)

        /* Kayit sozu toplaniyor: eksik evrak uyarisi ANCAK kayitlar
         * dustukten sonra tazelenebilir, yoksa evrak hala "eksik"
         * gorunur. */
        pendingSaves.push(
          this.uploadStore.setSendDatabaseInvoice({
            id,
            siparisno: po,
            kullaniciId: userId,
            tarih,
          }),
        )
      }

      /* Bildirim kaynakta oldugu gibi KOSULSUZ ve BEKLEMEDEN --
       * gerekcesi dosya basindaki nottta. */
      useAppToast().success("Kayıt Başarılı.")

      await Promise.all(pendingSaves)
      await this.uploadStore.setDocumentList(po)
      await this.$refs.missingPanel?.refresh()
    },

    async sendServer(item, id, po) {
      try {
        const response = await useFileService().sendInvoice(item, id, po)
        if (!response) console.error("evrak yuklenemedi:", item.name)
      } catch (err) {
        console.error("evrak yuklenemedi:", item.name, err)
      }
    },
  },
}
</script>
