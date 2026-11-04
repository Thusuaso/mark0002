<template>
  <div class="container">
    <Button
      type="button"
      severity="success"
      label="New"
      @click="newForm"
    />
    <DataTable
      :value="bgpStore.getBgpDetailList"
      v-model:selection="selectedBgpDetail"
      selectionMode="single"
      @row-click="bgpDetailSelected($event)"
    >
      <Column
        field="FirmaAdi"
        header="Customer"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
      <Column
        field="KayitTarihi"
        header="Date"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ dateToString(slotProps.data.KayitTarihi) }}
        </template>
      </Column>
      <Column
        field="Baslik"
        header="Title"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
      <Column
        field="Aciklama"
        header="Explanation"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
      <Column
        field="HatirlatmaTarihi"
        header="Reminder Time"
        headerClass="tableHeader"
        bodyClass="tableBody"
      >
        <template #body="slotProps">
          {{ dateToString(slotProps.data.HatirlatmaTarihi) }}
        </template>
      </Column>
      <Column
        field="HatirlatmaAciklama"
        header="Reminder"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
      <Column
        field="Email"
        header="Mail"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
      <Column
        field="Unvan"
        header="Degree"
        headerClass="tableHeader"
        bodyClass="tableBody"
      />
    </DataTable>
  </div>
</template>

<script>
import { useBgpStore } from "~/stores/bgp"

/*
 * "Yeni kayit" icin bos model. Nuxt 2'de newForm() icinde satir satir
 * yaziliyordu; tek yerde toplandi.
 *
 * DIKKAT -- ALAN LISTESI BIREBIR KORUNDU: BgpDetailForm bu nesneye
 * sonradan baska alanlar da ekliyor (WrongNumber, Interested, Unvan,
 * KayitTarihi, HatirlatmaTarihi, ProjectName, Temsilci). Buraya
 * onlari da eklemek cazip ama DAVRANIS DEGISTIRIR: form `v-if` ile
 * radyolari `null` baslangicindan okuyor ve kaydetmede yalnizca
 * secileni true yapiyor. Nuxt 2'de olmayan alanlari eklemek sunucuya
 * giden govdeyi degistirir.
 */
function emptyBgpDetail() {
  return {
    FirmaAdi: null,
    Email: null,
    PhoneNumber: null,
    Aciklama: null,
    Baslik: null,
    HatirlatmaAciklama: null,
  }
}

export default {
  computed: {
    bgpStore() {
      return useBgpStore()
    },
  },

  data() {
    return {
      selectedBgpDetail: null,
    }
  },

  methods: {
    bgpDetailSelected(event) {
      this.bgpStore.setBgpDetailButton(false)
      this.$emit("bgp_detail_form_dialog", event.data)
    },

    newForm() {
      this.bgpStore.setBgpDetailButton(true)
      this.$emit("bgp_detail_form_dialog", emptyBgpDetail())
    },
  },
}
</script>

<!--
  components/sales/BgpDetailList.vue
  (Nuxt 2: components/sales/bgp/detailList.vue)

  Etiket adi <SalesBgpDetailList>. Nuxt 2'de ad `bgpDetailList` idi
  (plugins/components.js:234, ELLE kayit).

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] mapGetters(["getBgpDetailList"]) -> bgpStore
      Bu bilesen listeyi PROP olarak ALMIYOR, store'dan kendisi okuyor --
      Nuxt 2'deki tasarim bu, korundu.

  [x] this.$store.dispatch("setBgpDetailButton", ...)
         -> bgpStore.setBgpDetailButton(...)
      Store pilota BU COMMIT'TE eklendi (app/stores/bgp.ts).

  [x] :selection + @update:selection -> v-model:selection
      Nuxt 2'deki hali Vue 2 .sync codemod ciktisiydi.

  [x] class="p-button-success" -> severity="success"
      PrimeVue 4'te p-button-<severity> siniflari KALDIRILDI; sinif
      olarak birakilsa dugme varsayilan (mavi) gorunurde kalirdi.

  [x] <Column ...></Column> -> <Column ... />  (ic icerik olmayanlar)

  [x] newForm() icindeki satir satir model -> emptyBgpDetail()
      (alan listesi degismedi; gerekcesi fonksiyonun basinda)
-->
