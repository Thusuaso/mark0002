<template>
  <div class="container">
    <Button
      type="button"
      class="w-100"
      severity="success"
      label="New User"
      @click="newForm"
    />

    <panelUsersList
      :list="panelStore.getPanelUsersList"
      @panel_user_list_selected_emit="panelUserListSelected($event)"
    />

    <Dialog v-model:visible="panel_user_form" header="" modal>
      <!--
        v-if ZORUNLU: Form `model` prop'unu required Object olarak
        bekliyor ve burada {} ile baslatiliyor -- bos nesneyle acilsa
        alanlar bos string yerine undefined baglanirdi. Dialog `modal`
        ama v-if DEGIL, yani icerik her zaman kurulu.
      -->
      <panelUsersForm
        v-if="panel_user_form"
        :model="model"
        :status="panelStore.getPanelUsersButtonStatus"
        @process="process($event)"
        @deleteForm="deleteForm($event)"
      />
    </Dialog>
  </div>
</template>

<script>
import { usePanelStore } from "~/stores/panel"
import { useModelsStore } from "~/stores/models"

export default {
  computed: {
    panelStore() {
      return usePanelStore()
    },
    /*
     * BOS MODEL BASKA STORE'DA: `setPanelUsersModel` ve
     * `getPanelUsersModel` panel modulunde DEGIL, models modulunde
     * (Nuxt 2: store/modules/models.js:918,1394). Vuex modulleri
     * namespaced olmadigi icin sayfa farki hic gormuyordu; Pinia'da
     * iki ayri store oldugu icin ikisi de aliniyor.
     */
    modelsStore() {
      return useModelsStore()
    },
  },

  data() {
    return {
      panel_user_form: false,
      model: {},
    }
  },

  methods: {
    panelUserListSelected(event) {
      this.panelStore.setPanelUsersButtonStatus(false)
      this.model = event.data
      this.panel_user_form = true
    },

    newForm() {
      this.panelStore.setPanelUsersButtonStatus(true)
      this.modelsStore.setPanelUsersModel()
      this.model = this.modelsStore.getPanelUsersModel
      this.panel_user_form = true
    },

    /*
     * `getPanelUsersButtonStatus` = "yeni kayit mi". true ise kaydet,
     * false ise guncelle. Ad yaniltici (bir dugme durumu gibi duruyor)
     * ama store ve bilesen ayni adi kullaniyor, korundu.
     */
    process(event) {
      if (this.panelStore.getPanelUsersButtonStatus) {
        this.panelStore.setPanelUsersSave(event)
      } else {
        this.panelStore.setPanelUserUpdate(event)
      }
      this.panel_user_form = false
    },

    deleteForm(event) {
      this.panelStore.setPanelUserDelete(event)
      this.panel_user_form = false
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
 * server: false ZORUNLU -- liste legacy Express API'sinden geliyor ve o,
 * SSR'in IC fetch yolunda calismiyor (bkz. server/middleware/1.legacy-api.ts).
 */
const panelStore = usePanelStore()

definePageMeta({ middleware: ["authority"] })

await useAsyncData("panel-users", () => panelStore.setPanelUsersList(), {
  server: false,
})
</script>

<!--
  pages/panel/users/index.vue

  Panel kullanicilari. Navbar bu yola link veriyordu ama sayfa pilotta
  YOKTU.

  === KAYNAKTA SOZDIZIMI HATASI VARDI ===

  Nuxt 2 surumu IKI KEZ `</script>` ile bitiyordu:

      };
      </script>
      </script>

  Vue 2'nin SFC ayristiricisi fazladan kapanis etiketini blok DISI metin
  sayip sessizce yutuyordu. Vite/Vue 3 bunu tolere etmez. Tekrar
  kaldirildi.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] middleware: ["authority"] -> definePageMeta (gerekcesi yukarida)
  [x] mapGetters([...]) -> panelStore / modelsStore
      panel store'u pilota BU COMMIT'TE eklendi (app/stores/panel.ts).
  [x] created() -> <script setup> + useAsyncData({ server: false })
  [x] :visible.sync -> v-model:visible
  [x] class="p-button-success" -> severity="success"
  [x] Form'a v-if eklendi (gerekcesi sablonda)

  DUZELTILDI -- DIYALOG HER DURUMDA KAPANIYOR:

  Kaynakta `save()` ve `update()` ayri metotlardi ve her biri diyalogu
  kendi iciinde kapatiyordu; `process()` hangisini cagirdigina gore
  kapatma iki ayri yerde tekrarliyordu. Tek yere alindi -- davranis ayni,
  ama bir dalda unutulma riski kalkti.

  KALDIRILDI -- OLU KOD:

  [x] mapGetters icindeki `getPanelUsersModel` sayfada dogrudan
      okunuyordu; artik modelsStore uzerinden, mapGetters yok.
  [x] `save()` / `update()` tek satirlik sarmalayicilardi, process()
      icine alindi.
-->
