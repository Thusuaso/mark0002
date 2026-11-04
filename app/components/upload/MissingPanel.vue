<template>
  <div v-if="po">
    <div v-if="checked && list.length > 0" class="missing-box mb-3">
      <div class="missing-head">
        <i class="pi pi-exclamation-triangle"></i>
        <span>Eksik Zorunlu Evrak</span>
        <span class="missing-count">{{ list.length }}</span>
      </div>
      <div class="missing-chips">
        <span
          v-for="document in list"
          :key="document.ID"
          class="missing-chip"
          >{{ document.EvrakAdi }}</span
        >
      </div>
    </div>
    <div v-else-if="checked" class="missing-ok mb-3">
      <i class="pi pi-check-circle"></i>
      <span>Zorunlu evrakların tamamı yüklenmiş</span>
    </div>
  </div>
</template>
<script>
/*
 * components/upload/missingPanel.vue karsiligi.
 *
 * Secili PO icin eksik zorunlu evrak uyarisi. Uc yerden kullaniliyor:
 *   upload/Form.vue            PO secildiginde (ve yukleme sonrasi)
 *   shipment/Form.vue          secili siparis icin
 *   pages/orders/shipped.vue   Shipped dialogunda
 *
 * `checked` UCUNCU BIR DURUM: "henuz sorulmadi". Bu yuzden
 * `list.length === 0` tek basina "tamami yuklenmis" demek DEGIL --
 * istek daha donmemis de olabilir. Uc hal:
 *   checked=false            -> hicbir sey gosterilmez
 *   checked=true, list>0     -> kirmizi uyari
 *   checked=true, list=0     -> yesil "tamami yuklenmis"
 *
 * KAPSAM DISI PO'DA HIC GOSTERILMEZ: Ic Piyasa musterileri ihracat
 * evraki uretmedigi icin sunucu `kapsamDisi:true` donuyor; o durumda
 * `checked` false BIRAKILIYOR, yoksa yesil "tamami yuklenmis" yazardi
 * ki yanlis olurdu.
 */
export default {
  props: {
    po: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      list: [],
      checked: false,
    }
  },
  watch: {
    po: {
      immediate: true,
      handler() {
        this.refresh()
      },
    },
  },
  methods: {
    /*
     * Yukleme sonrasi EBEVEYN bu metodu ref ile cagirarak uyariyi
     * tazeler (upload/Form.vue). Bu yuzden metot adi degistirilmemeli.
     */
    async refresh() {
      this.checked = false
      this.list = []
      if (!this.po) return

      try {
        const api = useApi()
        const res = await api(`/upload/document/missing/${this.po}`)

        /* Kapsam disi siparislerde uyari hic gosterilmez (gerekcesi
         * dosya basindaki notta). */
        if (res?.kapsamDisi) {
          this.list = []
          this.checked = false
          return
        }

        this.list = res?.list ?? []
        this.checked = true
      } catch (err) {
        console.error("eksik evrak uyarisi alinamadi:", err)
        this.list = []
        this.checked = false
      }
    },
  },
}
</script>
<style scoped>
.missing-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: rgb(253, 243, 243);
  border: 1px solid rgb(240, 204, 204);
  border-left: 4px solid rgb(198, 40, 40);
}
.missing-head {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  white-space: nowrap;
  color: rgb(183, 28, 28);
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
}
.missing-head .pi {
  font-size: 13px;
}
.missing-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 18px;
  padding: 0 6px;
  border-radius: 9px;
  background-color: rgb(198, 40, 40);
  color: white;
  font-size: 11px;
}
.missing-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.missing-chip {
  display: inline-block;
  padding: 1px 10px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid rgb(226, 169, 169);
  color: rgb(142, 32, 32);
  font-size: 11px;
  line-height: 18px;
  white-space: nowrap;
}
.missing-ok {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  background-color: rgb(240, 250, 240);
  border: 1px solid rgb(200, 230, 200);
  border-left: 4px solid rgb(46, 125, 50);
  color: rgb(27, 94, 32);
  font-size: 12px;
}
@media screen and (max-width: 576px) {
  .missing-box {
    flex-direction: column;
    gap: 6px;
  }
}
</style>
