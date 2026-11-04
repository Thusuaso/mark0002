<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Select
          v-model="selectedCategory"
          :options="panelStore.getPanelCategoryList"
          optionLabel="kategoriadi_en"
          class="w-100"
          @change="categorySelected($event)"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          class="w-100"
          severity="info"
          label="Change Queue"
          @click="changeQueue"
          :disabled="change_queue_button_status"
        />
      </div>
    </div>

    <DataTable
      scrollable
      scrollHeight="var(--app-table-height)"
      :value="panelStore.getPanelPublishedList"
      class="p-datatable-sm"
      :reorderableColumns="true"
      @row-reorder="reOrderPanelPublishedList($event)"
      :sortOrder="1"
      sortField="sira"
    >
      <Column
        :rowReorder="true"
        headerClass="col-rowno"
        bodyClass="col-rowno"
        :reorderableColumn="false"
      />
      <Column field="sira" header="Queue" />
      <Column field="urunid" header="Product Id" />
      <Column field="urunkod" header="Product Code" />
      <Column field="urunadi_en" header="Product Name" />
      <Column field="Image" header="#">
        <template #body="slotProps">
          <img lazyload :src="slotProps.data.Image" width="100" height="100" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { usePanelStore } from "~/stores/panel"
import { useSharedStore } from "~/stores/shared"

export default {
  computed: {
    panelStore() {
      return usePanelStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },

  data() {
    return {
      selectedCategory: null,
      change_queue_button_status: false,
    }
  },

  watch: {
    /*
     * Kategori listesi URUN LISTESIYLE AYNI yanittan geliyor
     * (MUT_setPanelPublishedList hem payload.list hem payload.category
     * yaziyor), yani ayri bir istek yok. Liste dolunca ilk kategori
     * secili hale getiriliyor.
     */
    "panelStore.getPanelCategoryList"() {
      this.selectedCategory = this.panelStore.getPanelCategoryList[0]
    },
  },

  methods: {
    categorySelected(event) {
      this.panelStore.setPanelPublishedListCategory(event.value.Id)
    },

    /*
     * Surukle-birak ile yeni sira. Liste yerinde yeniden numaralandirilip
     * state'e yaziliyor; sunucuya yazma "Change Queue" dugmesinde.
     *
     * MUT_ ZORUNLU: Nuxt 2'de bu satir
     *     this.$store.commit("setPanelPublishedChangedList", event.value)
     * yani MUTATION'i cagiriyordu. Duz bir cevrim ayni adli ACTION'a
     * baglardi -- ki o yok; sessizce hicbir sey olmazdi.
     */
    reOrderPanelPublishedList(event) {
      let queue = 0
      event.value.forEach((x) => {
        queue++
        x.sira = queue
      })
      this.panelStore.MUT_setPanelPublishedChangedList(event.value)
    },

    /*
     * ---------------------------------------------------------------
     * [SIRA-1] DUZELTILDI -- TAMAMLANMA MANTIGI BOZUKTU
     * ---------------------------------------------------------------
     * Kaynak (pages/panel/products/queue.vue:70-86):
     *
     *     let index = 0
     *     while (index < list.length) {
     *       dispatch("setPanelProductQueue", list[index])
     *       index++
     *       if (index + 1 == list.length) {      // <-- hatali kosul
     *         toast.success(...); endLoading(); button = false
     *       }
     *     }
     *
     * `index` zaten artirilmis oldugu icin kosul SONDAN BIR ONCEKI
     * adimda saglaniyor. Olculen davranis:
     *
     *   3 kayit -> bildirim IKINCI kayittan sonra cikiyor, ucuncu istek
     *              hala yolda; "Basariyla Degistirildi" yalan
     *   1 kayit -> kosul HIC saglanmiyor (1+1 == 1 yanlis): yukleme
     *              gostergesi KALICI acik kaliyor ve dugme sonsuza
     *              kadar PASIF -- kullanici sayfayi yenilemek zorunda
     *   0 kayit -> beginLoading cagriliyor, endLoading hic cagrilmiyor;
     *              ayni takilma
     *
     * Ayrica istekler BEKLENMIYORDU (dispatch hicbir sey dondurmuyordu,
     * bu yuzden beklemek MUMKUN DEGILDI -- app/stores/panel.ts'te
     * setPanelProductQueue artik soz donduruyor).
     *
     * Yeni hali: bos listede hic baslamiyor, tum istekler bekleniyor,
     * bildirim/gosterge/dugme try-finally ile TEK yerde ve HER durumda
     * dogru kapaniyor.
     */
    async changeQueue() {
      const liste = this.panelStore.getPanelPublishedList
      if (!liste.length) return

      this.change_queue_button_status = true
      this.sharedStore.beginLoading()
      try {
        await Promise.all(
          liste.map((urun) => this.panelStore.setPanelProductQueue(urun)),
        )
        useAppToast().success("Başarıyla Değiştirildi.")
      } catch (err) {
        console.error("sira degistirme basarisiz:", err)
        useAppToast().error("Değiştirme Başarısız.")
      } finally {
        this.sharedStore.endLoading()
        this.change_queue_button_status = false
      }
    },
  },
}
</script>

<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde cagrilabilir -> Options
 * API sayfalarinda ikinci bir script blogu gerekiyor. Options API'deki
 * `middleware: [...]` anahtari Nuxt 3+'ta YOK SAYILIR (bkz. commit
 * 5fc77edb1).
 *
 * server: false ZORUNLU -- liste legacy Express API'sinden geliyor ve o,
 * SSR'in IC fetch yolunda calismiyor (bkz. server/middleware/1.legacy-api.ts).
 */
const panelStore = usePanelStore()

definePageMeta({ middleware: ["authority"] })

await useAsyncData(
  "panel-products-queue",
  () => panelStore.setPanelPublishedList(),
  { server: false },
)
</script>

<!--
  pages/panel/products/queue.vue

  Panel urun sirasi (surukle-birak). Navbar bu yola link veriyordu ama
  sayfa pilotta YOKTU.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] middleware: ["authority"] -> definePageMeta (gerekcesi yukarida)
  [x] mapGetters([...]) -> panelStore
      panel store'u pilota BU COMMIT'TE eklendi (app/stores/panel.ts).
  [x] created() -> <script setup> + useAsyncData({ server: false })
  [x] <Dropdown> -> <Select>                     (PrimeVue 4)
  [x] responsiveLayout="scroll" KALDIRILDI       (PrimeVue 4'te yok)
      + scrollable / scrollHeight eklendi (proje geneli kural)
  [x] class="p-button-info" -> severity="info"
  [x] :headerStyle="{ width: '3rem' }" -> headerClass/bodyClass="col-rowno"
      Satir numarasi kolonu icin TEK AYAR NOKTASI app.css'te
      (--app-table-rowno-width). Sabit 3rem gomulu kalmasi, tablolar
      artik `table-layout: fixed` oldugu icin gereginden genis bir kolon
      biraktiriyordu.
  [x] this.$store.commit(...) -> MUT_ (gerekcesi reOrderPanelPublishedList)
  [x] setBeginLoadingAction / setEndLoadingAction
         -> sharedStore.beginLoading() / endLoading()
      Nuxt 2'de bunlar `loading` Vuex modulundeydi; pilotta shared
      store'un parcasi.
  [x] this.$toast -> useAppToast()

  DUZELTILDI -- NUXT 2'DE SESSIZCE BOZUKTU:

  [x] changeQueue tamamlanma mantigi (gerekcesi metodun icinde [SIRA-1]).
      Tek kayitli listede yukleme gostergesi ve dugme KALICI kilitli
      kaliyordu.
-->
