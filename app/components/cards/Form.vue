<template>
  <div class="container mt-3">
    <div class="row m-auto mb-3">
      <div class="col">
        <FloatLabel>
          <AutoComplete
            v-model="selectedCategory"
            inputId="category"
            :suggestions="filteredCategory"
            @complete="searchCategory($event)"
            optionLabel="KategoriAdi"
            @item-select="categorySelected($event)"
            @update:modelValue="categoryChange($event)"
          />
          <label for="category">Category</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <AutoComplete
            v-model="selectedProduct"
            inputId="product"
            :suggestions="filteredProduct"
            @complete="searchProduct($event)"
            optionLabel="UrunAdi"
            @item-select="productSelected($event)"
            @update:modelValue="productChange($event)"
          />
          <label for="product">Product</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <AutoComplete
            v-model="selectedSurface"
            inputId="surface"
            :suggestions="filteredSurface"
            @complete="searchSurface($event)"
            optionLabel="YuzeyIslemAdi"
            @item-select="surfaceSelected($event)"
            @update:modelValue="surfaceChange($event)"
          />
          <label for="surface">Surface</label>
        </FloatLabel>
      </div>
    </div>

    <div class="row m-auto mb-5">
      <div class="col">
        <FloatLabel>
          <AutoComplete
            v-model="selectedWidth"
            inputId="width"
            :suggestions="filteredWidth"
            @complete="searchWidth($event)"
            optionLabel="En"
            @item-select="widthSelected($event)"
            @update:modelValue="widthChange($event)"
          />
          <label for="width">Width</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <AutoComplete
            v-model="selectedHeight"
            inputId="height"
            :suggestions="filteredHeight"
            @complete="searchHeight($event)"
            optionLabel="Boy"
            @item-select="heightSelected($event)"
            @update:modelValue="heightChange($event)"
          />
          <label for="height">Height</label>
        </FloatLabel>
      </div>
      <div class="col">
        <FloatLabel>
          <AutoComplete
            v-model="selectedEdge"
            inputId="edge"
            :suggestions="filteredEdge"
            @complete="searchEdge($event)"
            optionLabel="Kenar"
            @item-select="edgeSelected($event)"
            @update:modelValue="edgeChange($event)"
          />
          <label for="edge">Thickness</label>
        </FloatLabel>
      </div>
    </div>

    <div class="row m-auto mb-5">
      <div class="col">
        <Button
          type="button"
          severity="success"
          class="w-100"
          label="Save"
          @click="saveProcess"
        />
      </div>
      <div class="col" v-if="!status">
        <Button
          type="button"
          severity="danger"
          class="w-100"
          label="Delete"
          @click="deleteForm"
        />
      </div>
    </div>

    <DataTable :value="orders">
      <Column field="FirmaAdi" header="Customer" />
      <Column field="SiparisNo" header="Po" />
      <Column field="SatisFiyati" header="Price">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.SatisFiyati) }}
        </template>
      </Column>
      <Column field="Miktar" header="Amount">
        <template #body="slotProps">
          {{ formatDecimal(slotProps.data.Miktar) }}
        </template>
      </Column>
      <Column field="BirimAdi" header="Unit" />
      <Column field="Toplam" header="Total">
        <template #body="slotProps">
          {{ formatPriceUsd(slotProps.data.SatisFiyati) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { useCardsStore } from "~/stores/cards"
import { useSocketStore } from "~/stores/socket"

export default {
  props: {
    status: {
      type: Boolean,
      required: false,
      default: false,
    },
    model: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    surfaces: {
      type: Array,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    orders: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  computed: {
    cardsStore() {
      return useCardsStore()
    },
    socketStore() {
      return useSocketStore()
    },
  },

  data() {
    return {
      selectedCategory: null,
      filteredCategory: null,
      selectedProduct: null,
      filteredProduct: null,
      selectedSurface: null,
      filteredSurface: null,
      selectedWidth: null,
      filteredWidth: null,
      selectedHeight: null,
      filteredHeight: null,
      selectedEdge: null,
      filteredEdge: null,
    }
  },

  created() {
    if (!this.status) {
      this.createdProcess()
    }
  },

  methods: {
    capitalizeFirstLetter(val) {
      return String(val).charAt(0).toUpperCase() + String(val).slice(1)
    },

    /*
     * `this.model = {}` KALDIRILDI -- PROP'A ATAMAYDI.
     *
     * Vue 3'te bir prop'a dogrudan atama SESSIZCE BASARISIZ olur ve
     * "Set operation on key 'model' failed: target is readonly" uyarisi
     * basar (Vue 2'de de "Avoid mutating a prop directly" uyarisi
     * veriyordu). Yani bu satir Nuxt 2'de de amacina ulasmiyordu.
     *
     * Davranisa etkisi yok: formu acan taraf
     * (pages/operation/cards.vue newForm/cardsSelected) model'i her
     * acilista kendisi kuruyor.
     *
     * (Ayni kalip components/reports/mekmer/CalculatingCostForm.vue'da
     *  da vardi ve orada da ayni sekilde ele alinmisti.)
     */
    reset() {
      this.selectedCategory = null
      this.selectedProduct = null
      this.selectedSurface = null
      this.selectedWidth = null
      this.selectedHeight = null
      this.selectedEdge = null
    },

    async deleteForm() {
      /* Yikici islem -- onay. Metin: app/utils/confirm.ts */
      if (!confirmAction()) return

      await this.cardsStore.setCardsDelete(this.model.ID)
      this.socketStore.emit("card_list_update_emit")
      this.$emit("card_dialog_form_emit", false)
    },

    async update() {
      this.model.userId = useCookie("userId").value
      this.model.date = new Date()

      await this.cardsStore.setCardsUpdate(this.model)
      this.socketStore.emit("card_list_update_emit")

      this.$emit("card_dialog_form_emit", false)
      this.$emit("card_dialog_update_values_emit")

      this.reset()
    },

    async save() {
      this.model.userId = useCookie("userId").value
      this.model.date = new Date()

      await this.cardsStore.setCardsSave(this.model)
      this.socketStore.emit("card_list_update_emit")

      this.$emit("card_dialog_update_values_emit")
      this.reset()
    },

    saveProcess() {
      if (this.status) {
        this.save()
      } else {
        this.update()
      }
    },

    /*
     * DIKKAT -- UC OLCU ALANI AYNI KAYDI SECIYOR.
     *
     * selectedWidth / selectedHeight / selectedEdge, UCU DE
     * `sizes.find(x => x.ID == model.OlcuId)` ile ayni nesneyi buluyor.
     * Her AutoComplete kendi optionLabel'i ile o nesnenin ilgili alanini
     * (En / Boy / Kenar) gosterdigi icin ekranda dogru gorunuyor.
     * Nuxt 2'deki hali bu; degistirilmedi.
     */
    createdProcess() {
      this.selectedCategory = this.categories.find(
        (x) => x.ID == this.model.KategoriId,
      )
      this.selectedProduct = this.products.find(
        (x) => x.ID == this.model.UrunId,
      )
      this.selectedSurface = this.surfaces.find(
        (x) => x.ID == this.model.YuzeyId,
      )
      this.selectedWidth = this.sizes.find((x) => x.ID == this.model.OlcuId)
      this.selectedHeight = this.sizes.find((x) => x.ID == this.model.OlcuId)
      this.selectedEdge = this.sizes.find((x) => x.ID == this.model.OlcuId)
    },

    /*
     * Asagidaki alti "Change" metodu SERBEST METIN girisini isliyor:
     * kullanici listede olmayan bir deger yazinca yeni kategori/urun/
     * yuzey/olcu olusturulabiliyor.
     *
     * `typeof event === "string"` ayrimi: AutoComplete'in degeri
     * yazilirken DIZGE, listeden secilirken NESNE olur.
     *
     * Olcu uclusu (En/Boy/Kenar) noktayi virgulle degistiriyor --
     * veritabaninda ondalik ayraci virgul.
     */
    edgeChange(event) {
      if (typeof event == "string") {
        this.model.OlcuId = null
        this.model.Kenar = this.capitalizeFirstLetter(event).replace(".", ",")
        this.selectedEdge = this.model.Kenar
      }
    },

    heightChange(event) {
      if (typeof event == "string") {
        this.model.OlcuId = null
        this.model.Boy = this.capitalizeFirstLetter(event).replace(".", ",")
        this.selectedHeight = this.model.Boy
      }
    },

    /*
     * Nuxt 2'de bu metodun adi `widthSurface` idi -- kardeslerinin adi
     * heightChange/edgeChange oldugu halde. Kopyala-yapistir kalintisi
     * (muhtemelen surfaceChange'den); isiyle hicbir ilgisi yok.
     * `widthChange` olarak duzeltildi, sablondaki baglama da guncellendi.
     */
    widthChange(event) {
      if (typeof event == "string") {
        this.model.OlcuId = null
        this.model.En = this.capitalizeFirstLetter(event).replace(".", ",")
        this.selectedWidth = this.model.En
      }
    },

    surfaceChange(event) {
      if (typeof event === "string") {
        this.model.YuzeyId = null
        this.model.YuzeyIslemAdi = this.capitalizeFirstLetter(event)
        this.selectedSurface = this.model.YuzeyIslemAdi
      } else if (event) {
        this.model.YuzeyId = event.ID
        this.model.YuzeyIslemAdi = event.YuzeyIslemAdi
        this.selectedSurface = event
      }
    },

    productChange(event) {
      if (typeof event === "string") {
        this.model.UrunId = null
        this.model.UrunAdi = this.capitalizeFirstLetter(event)
        this.selectedProduct = this.model.UrunAdi
      } else if (event) {
        this.model.UrunId = event.ID
        this.model.UrunAdi = event.UrunAdi
        this.selectedProduct = event
      }
    },

    categoryChange(event) {
      if (typeof event === "string") {
        this.model.KategoriId = null
        this.model.KategoriAdi = this.capitalizeFirstLetter(event)
        this.selectedCategory = this.model.KategoriAdi
      } else if (event) {
        this.model.KategoriId = event.ID
        this.model.KategoriAdi = event.KategoriAdi
        this.selectedCategory = event
      }
    },

    edgeSelected(event) {
      this.model.OlcuId = event.value.ID
      this.model.Kenar = event.value.Kenar
    },

    heightSelected(event) {
      this.model.OlcuId = event.value.ID
      this.model.Boy = event.value.Boy
    },

    widthSelected(event) {
      this.model.OlcuId = event.value.ID
      this.model.En = event.value.En
    },

    surfaceSelected(event) {
      this.model.YuzeyId = event.value.ID
      this.model.YuzeyIslemAdi = event.value.YuzeyIslemAdi
    },

    productSelected(event) {
      this.model.UrunId = event.value.ID
      this.model.UrunAdi = event.value.UrunAdi
    },

    categorySelected(event) {
      this.model.KategoriId = event.value.ID
      this.model.KategoriAdi = event.value.KategoriAdi
    },

    /*
     * Alti arama metodu da ayni kalipta.
     *
     * DUZELTILDI -- `event.query == 0` yaziliyordu.
     * query bir DIZGE; "" == 0 dogru oldugu icin bos sorgu dogru
     * calisiyordu, ama "0" == 0 DA dogru -- yani kullanici "0" yazdiginda
     * filtre uygulanmayip TUM liste geliyordu. Olcu alanlarinda ("0,5"
     * gibi degerler) bu gercekci bir giris. `event.query.length == 0`
     * oldu.
     *
     * DIKKAT -- DEGISTIRILMEDI: filtreler `.toLowerCase()` cagiriyor,
     * yani En/Boy/Kenar alanlari SAYI olarak gelirse TypeError firlar.
     * Veritabaninda dizge olarak tutuluyor gorunuyor (virgullu ondalik),
     * bu yuzden Nuxt 2'de de calisiyordu; tip donusumu eklemek davranis
     * degisikligi olur.
     */
    searchEdge(event) {
      this.filteredEdge =
        event.query.length == 0
          ? this.sizes
          : this.sizes.filter((edge) =>
              edge.Kenar.toLowerCase().startsWith(event.query.toLowerCase()),
            )
    },

    searchHeight(event) {
      this.filteredHeight =
        event.query.length == 0
          ? this.sizes
          : this.sizes.filter((height) =>
              height.Boy.toLowerCase().startsWith(event.query.toLowerCase()),
            )
    },

    searchWidth(event) {
      this.filteredWidth =
        event.query.length == 0
          ? this.sizes
          : this.sizes.filter((width) =>
              width.En.toLowerCase().startsWith(event.query.toLowerCase()),
            )
    },

    searchSurface(event) {
      this.filteredSurface =
        event.query.length == 0
          ? this.surfaces
          : this.surfaces.filter((surface) =>
              surface.YuzeyIslemAdi.toLowerCase().startsWith(
                event.query.toLowerCase(),
              ),
            )
    },

    searchProduct(event) {
      this.filteredProduct =
        event.query.length == 0
          ? this.products
          : this.products.filter((product) =>
              product.UrunAdi.toLowerCase().startsWith(
                event.query.toLowerCase(),
              ),
            )
    },

    searchCategory(event) {
      this.filteredCategory =
        event.query.length == 0
          ? this.categories
          : this.categories.filter((category) =>
              category.KategoriAdi.toLowerCase().startsWith(
                event.query.toLowerCase(),
              ),
            )
    },
  },
}
</script>

<script setup>
/*
 * Bu bilesen socket'e YAYIN yapiyor (kart listesi degisti bildirimi) ama
 * DINLEMIYOR -- dinleyen taraf components/cards/List.vue.
 *
 * Nuxt 2'deki yasam dongusu UC SEKILDE yanlisti (ayni kalip
 * List.vue'da da vardi, ayrinti app/composables/useRealtime.ts
 * basliginda):
 *
 *     mounted()      { this.$store.dispatch("setConnection") }
 *     beforeDestroy() { if (this.socket) { ...setDisconnect } }
 *
 *   (a) `this.socket` HICBIR ZAMAN atanmiyordu -> kosul daima false ->
 *       setDisconnect HIC cagrilmiyordu. Socket store baglantiyi
 *       SAYIYOR (consumers), yani her acilista sayac bir artiyor ve hic
 *       azalmiyordu: baglanti sayfa omru boyunca acik kaliyordu.
 *   (b) beforeDestroy Vue 3'te YOK (adi beforeUnmount oldu), yani birebir
 *       tasinsa kanca hic calismazdi.
 *   (c) Yayin `this.$store.getters.getSocket.emit(...)` ile yapiliyordu;
 *       getSocket null oldugunda (SSR ya da henuz baglanmamisken)
 *       TypeError firlatirdi. Pilotun socket store'undaki emit() null
 *       durumunu kontrol edip uyari basiyor.
 */
const socket = useSocketStore()

onMounted(() => socket.connect())
onBeforeUnmount(() => socket.disconnect())
</script>

<style scoped>
@media screen and (max-width: 575px) {
  .row {
    clear: both;
    display: block;
    width: 100%;
  }
  .col {
    clear: both;
    display: block;
    width: 100%;
  }
}
</style>

<!--
  components/cards/Form.vue   (Nuxt 2: components/cards/form.vue)

  Etiket adi <CardsForm>. Nuxt 2'de ad `cardsForm` idi
  (plugins/components.js:245, ELLE kayit).

  === EN ONEMLI: @input PrimeVue 4'TE YOK ===

  Alti AutoComplete da serbest metin girisini `@input` ile isliyordu:

      @input="categoryChange($event)"

  PrimeVue 4'un AutoComplete'i `input` ADINDA BIR EMIT TANIMLAMIYOR
  (emits listesi: change, focus, blur, item-select, item-unselect,
  option-select, option-unselect, dropdown-click, clear, complete,
  before-show, before-hide, show, hide).

  Bildirilmeyen bir olay adi Vue'da NATIVE DOM dinleyicisine duser, yani
  `@input` ic <input> ogesinin native input olayini yakalardi ve
  handler'a bir DIZGE ya da NESNE degil, bir `Event` nesnesi gelirdi.

  Sonucu: `typeof event === "string"` HICBIR ZAMAN dogru olmaz ve
  `else` dali native Event uzerinde `event.ID` / `event.KategoriAdi`
  okur -> hepsi undefined. Yani SERBEST METINLE YENI KATEGORI / URUN /
  YUZEY / OLCU OLUSTURMA tamamen kirilirdi ve model alanlari undefined
  ile kaydedilirdi. Hata vermez.

  Dogru karsilik `@update:modelValue`: AutoComplete'in degeri yazilirken
  DIZGE, listeden secilirken NESNE olur -- yani handler'larin bekledigi
  tam olarak bu. v-model ile birlikte kullanilmasi sorun degil; Vue iki
  dinleyiciyi birlestirir ve handler zaten selectedX'i kendisi yaziyor.

  Uc "Change" metoduna `else if (event)` korumasi eklendi: AutoComplete
  temizlendiginde modelValue null olur ve eski kod `null.ID` okumaya
  calisirdi.

  DUZELTILDI -- DIGER SESSIZ HATALAR:

  [x] `this.model = {}` (reset icinde) PROP'A ATAMAYDI. Vue 3'te sessizce
      basarisiz olur ve "target is readonly" uyarisi basar; Vue 2'de de
      "Avoid mutating a prop directly" uyariyordu. Kaldirildi -- formu
      acan sayfa model'i her acilista kendisi kuruyor.

  [x] `event.query == 0` -> `event.query.length == 0` (alti yerde).
      query bir DIZGE; "" == 0 dogru oldugu icin bos sorgu calisiyordu
      ama "0" == 0 DA dogru -- kullanici "0" yazdiginda filtre
      uygulanmayip TUM liste geliyordu. Olcu alanlarinda gercekci bir
      giris.

  [x] Socket yasam dongusu ve yayin (gerekcesi <script setup> icinde).

  [x] `widthSurface` -> `widthChange`
      Kardeslerinin adi heightChange/edgeChange oldugu halde bu metodun
      adi `widthSurface` idi -- kopyala-yapistir kalintisi, isiyle
      ilgisi yok.

  DIGER ZORUNLU DONUSUMLER:

  [x] AutoComplete field -> optionLabel  (alti yerde; v4'te `field` YOK,
      secimden sonra input "[object Object]" gosterirdi)
  [x] <span class="p-float-label"> -> <FloatLabel>  (alti yerde)
  [x] p-button-success/danger -> severity
  [x] this.$store.dispatch(...) -> cardsStore.*
  [x] js-cookie Cookies.get -> useCookie
  [x] <Column ...></Column> -> <Column ... />
  [x] props.status -> default: false ; props.orders -> default: () => []

  KALDIRILDI -- OLU KOD:
  [x] `import { io } from "socket.io-client"` -- HIC kullanilmiyordu;
      baglanti socket store'u uzerinden kuruluyor.
  [x] data.socket -- hicbir zaman atanmiyordu; tek kullanimi
      beforeDestroy icindeki daima-false kosuldu.

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:

      "Total" kolonu `field="Toplam"` diyor ama govdesinde
      `formatPriceUsd(slotProps.data.SatisFiyati)` yaziyor -- yani Price
      kolonuyla AYNI degeri gosteriyor, Toplam'i degil. Nuxt 2'de de
      boyleydi; dogru alani yazmak gorunumu degistirir (ve hangi alanin
      dogru oldugu veriye bakmadan belli degil).

      Uc olcu AutoComplete'i (En/Boy/Kenar) createdProcess icinde AYNI
      kaydi seciyor; her biri kendi optionLabel'i ile ilgili alani
      gosterdigi icin ekranda dogru gorunuyor.

      Filtreler `.toLowerCase()` cagiriyor, yani En/Boy/Kenar SAYI
      gelirse TypeError firlar. Veritabaninda dizge tutuluyor gorunuyor
      (virgullu ondalik); tip donusumu eklemek davranis degisikligi olur.
-->
