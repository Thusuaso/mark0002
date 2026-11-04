<template>
  <div class="container">
    <Button
      type="button"
      severity="success"
      class="w-100"
      label="New"
      @click="newForm"
    />

    <ProductCards @cards_selected_emit="cardsSelected($event)" />

    <Dialog v-model:visible="cards_form_dialog" header="" modal>
      <!--
        v-if ZORUNLU: CardsForm'un `model` prop'u required ve created()
        icinde model.KategoriId okunuyor. Dialog `modal` ama v-if DEGIL,
        yani model null iken de olusabilir.
      -->
      <CardsForm
        v-if="model"
        :status="cardsStore.getCardsButtonStatus"
        :model="model"
        :categories="sharedStore.getCardCategoryList"
        :products="sharedStore.getCardProductsList"
        :surfaces="sharedStore.getCardSurfacesList"
        :sizes="sharedStore.getCardSizesList"
        :orders="cardsStore.getCardsOrderList"
        @card_dialog_form_emit="cards_form_dialog = $event"
        @card_dialog_update_values_emit="cardDialogUpdateValues"
      />
    </Dialog>
  </div>
</template>

<script>
import { useCardsStore } from "~/stores/cards"
import { useSharedStore } from "~/stores/shared"

export default {
  computed: {
    cardsStore() {
      return useCardsStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },

  data() {
    return {
      cards_form_dialog: false,
      model: null,
    }
  },

  methods: {
    /*
     * Kart kaydedildikten/guncellendikten sonra formun besledigi
     * acilir listeleri tazeliyor.
     *
     * DIKKAT -- BU CAGRILAR BEKLENMIYOR, BEKLENEMEZ: shared store'undaki
     * bu eylemler `async` DEGIL ve hicbir sey DONDURMUYOR
     * (bkz. app/stores/shared.ts:242 ve stores/cards.ts icindeki ayni
     * not). Nuxt 2'de de dispatch'ler beklenmiyordu; listeler yuklendikce
     * reaktif olarak yansiyor.
     *
     * Nuxt 2'de metodun adi sablondaki olay adiyla AYNIYDI
     * (`card_dialog_update_values_emit`), yani handler ile olay adi
     * birbirine karisiyordu. Metot adi cardDialogUpdateValues oldu;
     * OLAY ADI degismedi.
     */
    cardDialogUpdateValues() {
      this.sharedStore.setCardCategoryList()
      this.sharedStore.setCardProductsList()
      this.sharedStore.setCardSurfacesList()
      this.sharedStore.setCardSizesList()
      this.sharedStore.setOrderAllList()
      this.sharedStore.setSelectionSurfaces()
    },

    newForm() {
      this.cardsStore.setCardsButtonStatus(true)
      /*
       * MUT_ ZORUNLU: Nuxt 2'de bu satir
       *     this.$store.commit("setCardsOrderList", [])
       * yani MUTATION'i cagiriyordu. Duz bir cevrim ACTION'a baglardi ve
       * action argumani KART ID'si sanip `/card/order/list/` adresine
       * BOS DIZI ile istek atardi (bkz. stores/cards.ts basindaki not).
       */
      this.cardsStore.MUT_setCardsOrderList([])
      this.model = {}
      this.cards_form_dialog = true
    },

    cardsSelected(event) {
      this.model = event
      this.cards_form_dialog = true
      this.cardsStore.setCardsButtonStatus(false)
      this.cardsStore.setCardsOrderList(event.ID)
    },
  },
}
</script>

<script setup>
/*
 * Formun besledigi dort acilir liste (kategori/urun/yuzey/olcu) ve
 * siparis listesi BURADA cekiliyor.
 *
 * NUXT 2'DE HICBIRI CEKILMIYORDU: sayfa bu bes getter'i mapGetters ile
 * OKUYOR ama onlari dolduran eylemleri YALNIZCA
 * card_dialog_update_values_emit icinde, yani BIR KAYIT YAPILDIKTAN
 * SONRA cagiriyordu. Sayfaya ilk girildiginde dort AutoComplete da BOS
 * geliyordu -- yani yeni kart olusturmak icin kategori/urun/yuzey/olcu
 * secilemiyordu. Listeler ancak bir kayit denemesinden sonra doluyordu.
 *
 * (Liste tablosunun kendisi ayri: <ProductCards> getCardList'i okuyor ve
 *  onu kendi icinde useRealtime ile tazeliyor.)
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 *
 * NOT: bu eylemler Promise dondurmedigi icin useAsyncData'nin
 * beklemesi sembolik; cagirmak yeterli, listeler geldikce reaktif
 * olarak yansiyor.
 */
const sharedStore = useSharedStore()

await useAsyncData(
  "operation-cards",
  async () => {
    sharedStore.setCardList()
    sharedStore.setCardCategoryList()
    sharedStore.setCardProductsList()
    sharedStore.setCardSurfacesList()
    sharedStore.setCardSizesList()
    sharedStore.setOrderAllList()
    return true
  },
  { server: false },
)
</script>

<!--
  pages/operation/cards.vue

  Navbar bu yola link veriyordu ama sayfa pilotta YOKTU.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] mapGetters([...6 getter]) -> cardsStore / sharedStore
      DIKKAT: ikiye dagilmis. getCardsButtonStatus ve getCardsOrderList
      cards store'unda (BU COMMIT'TE eklendi); dort acilir liste
      (kategori/urun/yuzey/olcu) shared store'unda. Vuex'te tum moduller
      tek isim uzayini paylastigi icin bu ayrim gorunmuyordu.

  [x] <productCards> -> <ProductCards>
      Nuxt 2'de `productCards` adi components/cards/list.vue dosyasina
      ELLE baglanmisti (plugins/components.js:23 + :244) -- ad ile dosya
      yolu arasinda iliski yoktu. O dosya pilota
      app/components/product/Cards.vue olarak ONCEDEN tasinmis durumda,
      yani bu commit'te YENIDEN yazilmadi.

  [x] <cardsForm> -> <CardsForm>

  [x] this.$store.commit("setCardsOrderList", [])
         -> cardsStore.MUT_setCardsOrderList([])
      COMMIT, yani MUTATION kastediliyor (gerekcesi newForm icinde).

  [x] :visible + @update:visible -> v-model:visible

  [x] class="p-button-success w-100" -> severity="success" class="w-100"

  [x] Metot adi card_dialog_update_values_emit -> cardDialogUpdateValues
      Nuxt 2'de metot adi sablondaki OLAY adiyla aynmiydi, ikisi
      birbirine karisiyordu. Olay adi DEGISMEDI.

  DUZELTILDI -- NUXT 2'DE ACILIR LISTELER BOS GELIYORDU:

  [x] Sayfa dort acilir listeyi (ve siparis listesini) OKUYOR ama onlari
      dolduran eylemleri yalnizca BIR KAYIT YAPILDIKTAN SONRA
      cagiriyordu. Ilk girilisde dort AutoComplete da bostu, yani yeni
      kart olusturulamiyordu. Artik useAsyncData icinde cekiliyorlar
      (gerekcesi <script setup> icinde).

  [x] Form'a v-if="model" eklendi (gerekcesi sablonda).

  DIKKAT -- definePageMeta EKLENMEDI:
      Nuxt 2'de bu sayfada `middleware` satiri HIC YOKTU (kardes
      operation sayfalarinin cogunda var). Eklemek Nuxt 2'de olmayan bir
      kisitlama getirmek olurdu.
-->
