import { defineStore } from "pinia"
import { useModelsStore } from "~/stores/models"

/*
 * store/modules/accounts.js -> Pinia
 *
 * Bu dosya tools/codemods/vuex-to-pinia.mjs ile URETILDI, sonra elle
 * gozden gecirildi.
 *
 * Donusumler:
 *   vuexContext.commit("X", p)   -> this.MUT_X(p)
 *   vuexContext.dispatch("Y", p) -> this.Y(p)
 *   vuexContext.state.x          -> this.x
 *   this.$axios                  -> useLegacyApi()   (axios sozlesmesini
 *                                   taklit eder, response.data KORUNUR)
 *   this.$toast                  -> useAppToast()
 *   mutation'lar                 -> MUT_ onekli action
 *
 * MUT_ oneki neden var: Vuex'te action ve mutation ayri isim
 * uzaylarindadir; bu projede 324 mutation'in 298'i bir action'la ayni ada
 * sahip. Pinia'da ikisi de action oldugu icin cakisirlar.
 *
 * Istatistik: 5 action, 2 mutation, 2 getter
 */
/*
 * ---------------------------------------------------------------------
 * ELLE YAPILAN IKI DUZELTME
 * ---------------------------------------------------------------------
 * 1) `this.$store.dispatch("setAccountsModel")` -> useModelsStore().
 *
 *    Kaynak modul UC yerde `this.$store` uzerinden BASKA BIR MODULE
 *    dispatch ediyordu (`setAccountsModel` models modulunde).
 *    vuex-to-pinia.mjs `vuexContext.dispatch` kalibini cevirir ama
 *    `this.$store` yazimini taniyamaz; verify-stores.mjs bunu
 *    "cozulemeyen this.X referansi: this.$store" olarak yakaladi.
 *
 *    Birakilsaydi derleme GECER, hata ancak kaydet/guncelle/sil
 *    calistirildiginda "Cannot read properties of undefined" olarak
 *    cikardi -- yani kullanici kaydederken.
 *
 * 2) BASARISIZLIK MESAJLARI YESIL BILDIRIMLE GOSTERILIYORDU.
 *
 *    Uc action'in da hata dalinda `$toast.success(...)` cagriliyordu:
 *        'Save Failed' / 'Updated Failed' / 'Deleted Failed'
 *    yani kayit basarisiz oldugunda kullanici BASARI renginde bir
 *    bildirim goruyordu. error'a cevrildi.
 *
 *    Ayni hata panel/usa/StockForm.vue'da da vardi (commit b4b4d2342).
 */
export const useAccountsStore = defineStore("accounts", {
  state: () => ({
    accountsList:[],
    accountsButtonStatus:false
}),

  getters: {
    getAccountsList: (state) => state.accountsList,
    getAccountsButtonStatus: (state) => state.accountsButtonStatus,
  },

  actions: {
    setAccountsList() {
      const legacyApi = useLegacyApi()

              legacyApi.get('/accounts/list')
              .then(response=>{
                  this.MUT_setAccountsList(response.data.list);
              });
    },
    setAccountsButtonStatus(payload) {

              this.MUT_setAccountsButtonStatus(payload);
    },
    setAccountsSave(model) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.post('/accounts/save',model)
              .then(response=>{
                  if(response.data.status){
                      this.setAccountsList();
                      toast.success('Saved Successfully'); 
                      useModelsStore().setAccountsModel();

                  }else{
                      toast.error('Save Failed');
                  }

              });
    },
    setAccountsUpdate(model) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.put('/accounts/update',model)
              .then(response=>{
                  if(response.data.status){
                      this.setAccountsList();
                      toast.success('Updated Successfully'); 
                      useModelsStore().setAccountsModel();

                  }else{
                      toast.error('Updated Failed');
                  }
              });
    },
    setAccountsDeleted(id) {
      const legacyApi = useLegacyApi()
      const toast = useAppToast()

              legacyApi.delete('/accounts/delete/'+id)
              .then(response=>{
                  if(response.data.status){
                      this.setAccountsList();
                      toast.success('Deleted Successfully'); 
                      useModelsStore().setAccountsModel();
                  } else{
                      toast.error('Deleted Failed'); 
                  }
              })
    },

    /* ---------- mutation'lar (MUT_ onekli) ---------- */
    MUT_setAccountsList(payload) {

              this.accountsList = payload;
    },
    MUT_setAccountsButtonStatus(payload) {

              this.accountsButtonStatus = payload;
    },
  },
})
