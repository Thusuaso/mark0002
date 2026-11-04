<template>
  <div class="container">
    <div class="row">
      <SalesFollowCard
        v-for="item of salesStore.getFollowList"
        :key="item.FirmaAdi"
        :follow="item"
        @followDetail="followDetail($event)"
      />
    </div>

    <Dialog v-model:visible="follow_dialog" modal :header="customer">
      <div class="row container">
        <div class="col">
          <Button
            type="button"
            severity="success"
            outlined
            class="w-100"
            label="New"
            :disabled="!salesStore.getFollowDetail.length"
            @click="newForm"
          />
        </div>
        <div class="col">
          <!--
            "Unfollow" dugmesinin Nuxt 2'de de @click HANDLER'I YOKTU --
            tiklaninca hicbir sey olmuyordu. Islevi hic yazilmamis.
            Bir handler UYDURMAK var olmayan davranis icat etmek olurdu,
            bu yuzden dugme oldugu gibi birakildi ama :disabled ile
            durumu ACIK hale getirildi: artik tiklanabilir gorunup
            sessizce hicbir sey yapmiyor.
          -->
          <Button
            type="button"
            severity="primary"
            outlined
            class="w-100"
            label="Unfollow"
            disabled
          />
        </div>
      </div>

      <SalesFollowDetailList
        :detailFollow="salesStore.getFollowDetail"
        @follow_detail_data="followDetailData($event)"
      />
    </Dialog>

    <Dialog
      v-model:visible="follow_form_detail_dialog"
      :header="follow_form_detail_header"
      modal
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <SalesFollowDetailForm
        v-if="activeFollowDetail"
        :followDetail="activeFollowDetail"
        @closed_follow_dialog="follow_form_detail_dialog = false"
      />
    </Dialog>
  </div>
</template>

<script>
import { useSalesStore } from "~/stores/sales"

function emptyFollowModel() {
  return {
    MusteriAdi: null,
    Aciklama: null,
    Baslik: null,
    Hatirlatma_Notu: null,
    Tarih: null,
    Hatirlatma_Tarih: null,
  }
}

export default {
  computed: {
    salesStore() {
      return useSalesStore()
    },

    /*
     * Nuxt 2'de bu ifade SABLONUN ICINDE duruyordu:
     *
     *   :followDetail="!getFollowDetailNewButton
     *                    ? getFollowDetailData : followFormModel"
     *
     * Anlami: "yeni" kipindeyse bos yerel model, degilse secilen satir.
     * Okunabilirlik icin computed'e alindi; mantik AYNI.
     */
    activeFollowDetail() {
      return this.salesStore.getFollowDetailNewButton
        ? this.followFormModel
        : this.salesStore.getFollowDetailData
    },
  },

  data() {
    return {
      follow_dialog: false,
      customer: null,
      follow_form_detail_dialog: false,
      follow_form_detail_header: null,
      followFormModel: emptyFollowModel(),
    }
  },

  /*
   * [x] created() KALDIRILDI -- veri cekimi asagidaki <script setup>
   * blogunda useAsyncData ile. Gerekcesi orada.
   */

  methods: {
    /*
     * DUZELTILDI -- BOS LISTEDE PATLIYORDU.
     *
     * Nuxt 2'deki hali:
     *
     *   this.followFormModel.MusteriAdi = this.getFollowDetail[0].MusteriAdi
     *   this.followFormModel.MusteriId  = this.getFollowDetail[0].ID
     *
     * getFollowDetail BOS olabilir: henuz hic takip kaydi olmayan bir
     * musterinin "Detail" dialogunu acip "New"e basmak tam bu durum. O
     * zaman [0] undefined olur ve
     *     TypeError: Cannot read properties of undefined (reading 'MusteriAdi')
     * firlatilir -- yeni kayit ekranı hic acilmaz, hicbir mesaj da
     * gorunmez.
     *
     * Iki katmanli koruma: dugme bos listede PASIF (sablonda :disabled)
     * ve metot yine de kontrol ediyor.
     */
    newForm() {
      const first = this.salesStore.getFollowDetail[0]
      if (!first) {
        console.warn(
          "sales/follow newForm(): bu musterinin takip kaydi yok, " +
            "yeni kayit formu icin musteri bilgisi alinamadi.",
        )
        return
      }

      this.followFormModel = {
        ...emptyFollowModel(),
        MusteriAdi: first.MusteriAdi,
        MusteriId: first.ID,
      }

      this.salesStore.setFollowDetailNewButton(true)
      this.follow_form_detail_dialog = true
      this.follow_form_detail_header = "Yeni"
    },

    followDetailData(event) {
      this.follow_form_detail_dialog = true
      this.follow_form_detail_header = event.MusteriAdi
    },

    followDetail(event) {
      this.salesStore.setFollowDetail(event.FirmaAdi)
      this.customer = event.FirmaAdi
      this.follow_dialog = true
    },
  },
}
</script>

<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde cagrilabilir ->
 * Options API sayfalarinda ikinci bir script blogu gerekiyor. Options
 * API'deki `middleware: [...]` anahtari Nuxt 3+'ta YOK SAYILIR
 * (bkz. commit 5fc77edb1).
 *
 * Veri cekimi NEDEN created() icinde degil: SSR created() icindeki async
 * isi BEKLEMEZ -- liste bos serialize edilir, client hydration onu
 * devralir ve created() bir daha calismadigi icin kartlar hic gorunmez.
 *
 * server: false ZORUNLU -- legacy Express API'si SSR'in IC fetch yolunda
 * calismiyor (bkz. server/middleware/1.legacy-api.ts).
 */
const salesStore = useSalesStore()

definePageMeta({ middleware: ["authority"] })

await useAsyncData("sales-follow", () => salesStore.setFollowList(), {
  server: false,
})
</script>

<!--
  pages/sales/follow.vue

  Navbar bu yola link veriyordu ama sayfa pilotta YOKTU.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] middleware: ["authority"] -> definePageMeta (gerekcesi yukarida)

  [x] mapGetters([...4 getter]) -> salesStore
  [x] Uc dispatch -> salesStore.* ; store pilota BU COMMIT'TE eklendi.

  [x] <followList>       -> <SalesFollowCard>
      <followForm>       -> <SalesFollowDetailList>
      <followFormDetail> -> <SalesFollowDetailForm>
      Nuxt 2'deki adlar plugins/components.js'te ELLE kayitliydi ve
      yaptiklari isi yansitmiyordu (followList tek bir KART,
      followForm ise bir LISTE). Auto-import adlari zaten dosya yolundan
      geleceginden adlar duzeltildi; gerekcesi ilgili bilesenlerin
      sonundaki notlarda.

  [x] :visible + @update:visible -> v-model:visible  (iki Dialog)

  [x] Ham Bootstrap dugmeleri -> PrimeVue Button + outlined
      btn btn-outline-success -> severity="success" outlined
      btn btn-outline-primary -> severity="primary" outlined
      Bootstrap 5.3.2 vendor'landigi icin eski siniflar CALISIYORDU;
      bu bir hata duzeltmesi DEGIL, ekranin geri kalaniyla tutarlilik.
      GORUNUM DEGISIR (Bootstrap renkleri -> PrimeVue tema renkleri).

  [x] created() -> <script setup> + useAsyncData({ server: false })

  [x] Sablondaki uclu ifade -> `activeFollowDetail` computed'i
      (mantik ayni; gerekcesi computed'in basinda)

  DUZELTILDI -- NUXT 2'DE SESSIZCE PATLIYORDU / OLUYDU:

  [x] newForm() bos listede TypeError firlatiyordu (gerekcesi metodun
      basinda). Artik dugme bos listede pasif + metot kontrol ediyor.

  [x] "Unfollow" dugmesinin @click HANDLER'I YOKTU -- tiklaninca hicbir
      sey olmuyordu, ama tiklanabilir gorunuyordu. Islevi hic
      yazilmamis; uydurmak yerine dugme `disabled` yapildi, boylece
      durumu ekranda ACIK.

  [x] SalesFollowDetailForm'a v-if="activeFollowDetail" eklendi: form
      created() icinde followDetail.Tarih okuyor, nesne bos/undefined
      olursa patlar.
-->
