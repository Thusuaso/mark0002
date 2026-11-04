<template>
  <div class="row mt-3">
    <div class="col" style="width: 100%; height: 100px">
      <Select
        v-model="selectedSupplier"
        :options="supplier"
        optionLabel="TedarikciAdi"
        placeholder="Select a Supplier"
        @change="supplierChange"
      />
    </div>
    <div class="col">
      <Button icon="pi pi-download" class="p-button" @click="download" />
      <a :href="link" ref="link_id" />
    </div>
    <div class="col">
      <FloatLabel>
        <InputText id="invoice" type="text" v-model="invoiceno" />
        <label for="invoice">Invoice No</label>
      </FloatLabel>
    </div>

    <div class="col">
      <FileUpload
        mode="advanced"
        accept=".pdf"
        :maxFileSize="1000000"
        :multiple="true"
        :auto="true"
        chooseLabel="Upload Document"
        @select="onUpload($event)"
      />
    </div>
  </div>
</template>
<script>
import { useUploadStore } from "~/stores/upload"

/*
 * components/upload/supplierform.vue karsiligi.
 *
 * "Tedarikci Faturalari" evraki: tedarikci secilir, fatura no girilir,
 * PDF yuklenir; dosya file-service'e, kayit veritabanina gider.
 *
 * TASIMA DEGISIKLIKLERI
 *   <Dropdown>                  -> <Select>              (PrimeVue 4)
 *   <span class="p-float-label">-> <FloatLabel>          (PrimeVue 4'te
 *                                  o sinif TAMAMEN kaldirildi, bkz.
 *                                  tools/codemods/codemod-float-label.mjs)
 *   plugins/upload fileService  -> useFileService()
 *   plugins/date convertDate    -> toIsoDate()  (API'ye YAZILAN bicim;
 *                                  gosterim bicimi olan
 *                                  formatters.dateToString ILE
 *                                  KARISTIRILMAMALI -- ciktilari ters)
 *   Cookies.get("userId")       -> useCookie("userId").value
 *   this.$store.dispatch(...)   -> uploadStore.setDocumentSupplierSave
 *
 *   @upload DUSURULDU: kaynakta hem @upload hem @select ayni metoda
 *   bagliydi. `url` verilmedigi icin PrimeVue gercek bir XHR yapamaz,
 *   yani @upload HIC tetiklenmiyordu -- tek calisan @select'ti. PrimeVue
 *   4'te ikisini birden birakmak onUpload'un iki kez cagrilmasi riskini
 *   tasiyordu. Ayni secim container/InputForm.vue'da da yapildi.
 *
 * KORUNAN TUHAFLIK -- `size == 1000000`: kaynak dosya boyutunu ESITLIKLE
 * kontrol ediyor, `>` ile degil. maxFileSize zaten 1 MB'tan BUYUK
 * dosyalari eliyor, dolayisiyla bu dal yalnizca tam 1.000.000 baytlik
 * dosyada calisir. Anlamsiz ama zararsiz; davranis degistirilmedi.
 */
export default {
  props: {
    supplier: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      selectedSupplier: null,
      invoiceno: null,
      link: null,
    }
  },
  computed: {
    uploadStore() {
      return useUploadStore()
    },
  },
  methods: {
    supplierLink() {
      return (
        "https://file-service.mekmar.com/file/tedarikci/download/30/" +
        `${this.selectedSupplier.SiparisNo}/${this.selectedSupplier.TedarikciAdi}.pdf`
      )
    },
    supplierChange() {
      this.link = this.supplierLink()
    },
    download() {
      this.$refs.link_id?.click()
    },
    async onUpload(event) {
      if (event.files[0].size == 1000000) {
        alert("Dosya boyutu 1MB dan büyük olamaz")
        return
      }

      const data = {
        FaturaNo: this.invoiceno,
        tedarikci_id: this.selectedSupplier.TedarikciID,
        tedarikci: this.selectedSupplier.TedarikciAdi,
        evrak: `${this.selectedSupplier.TedarikciAdi}.pdf`,
        siparisno: this.selectedSupplier.SiparisNo,
        kullaniciAdi: useCookie("userId").value,
        date: toIsoDate(new Date()),
      }

      const response = await useFileService().sendSupplier(
        event.files[0],
        this.selectedSupplier.SiparisNo,
        `${this.selectedSupplier.TedarikciAdi}.pdf`,
      )

      /* Kayit YALNIZCA dosya yuklemesi basarili olursa dusuyor --
       * kaynaktaki `if(response.Status)` sarti birebir korundu. */
      if (response?.Status) {
        await this.uploadStore.setDocumentSupplierSave(data)
        this.link = this.supplierLink()
      }
    },
  },
}
</script>
