import { defineStore } from "pinia"

/*
 * store/modules/cost.js -> Pinia
 *
 * Elle yazildi (codemod degil): modul 59 satir ve action'larin tamami
 * ayni adli mutation'i cagiran ince sarmalayici, yani MUT_ oneki burada
 * yalnizca gurultu uretirdi. Getter adlari KORUNDU (`getCostList`,
 * `getOldProductionDetail`) -- production.vue ve shipped.vue bunlari
 * mapGetters ile okuyor.
 *
 * KORUNAN DAVRANIS -- updateCost / deleteCost:
 *   Vuex'te bu ikisinin ACTION govdesi BOSTU; gercek is yalnizca ayni
 *   adli mutation'da yaziliydi ve o mutation'i hicbir yer commit
 *   etmiyordu. Yani ikisi de olu kod: `dispatch("updateCost")` cagrisi
 *   hicbir sey yapmiyordu. (Dogrulandi: kod tabaninda bu iki ad hic
 *   dispatch edilmiyor.)
 *   Burada ayni sekilde etkisiz BIRAKILDILAR. Calisir hale getirmek
 *   davranis degisikligi olurdu ve bu gecisin kapsami disinda -- ama
 *   silmek de bilgi kaybi, cunku niyet belli: maliyet satirini
 *   guncelleme/silme ozelligi yarim kalmis.
 *
 * Gercekten kullanilanlar: addCost (production.vue'de 63 cagri),
 * resetCostList (5 cagri), setOldProductionDetail.
 */

export interface CostRow {
  id?: number | string
  [key: string]: unknown
}

export const useCostStore = defineStore("cost", {
  state: () => ({
    cost: [] as CostRow[],
    oldProductionDetail: {} as Record<string, unknown>,
  }),

  getters: {
    getCostList: (state) => state.cost,
    getOldProductionDetail: (state) => state.oldProductionDetail,
  },

  actions: {
    addCost(payload: CostRow) {
      this.cost.push(payload)
    },

    resetCostList() {
      this.cost = []
    },

    setOldProductionDetail(payload: Record<string, unknown>) {
      this.oldProductionDetail = payload
    },

    /*
     * Vuex'te de etkisizdi -- yukaridaki "KORUNAN DAVRANIS" notuna bak.
     * Govdeyi doldurmak, bugune kadar hicbir sey yapmayan bir cagriyi
     * aniden is yapar hale getirir.
     */
    updateCost(_payload: CostRow) {
      // bilincli olarak bos: Vuex action'i da bostu
    },

    deleteCost(_payload: CostRow) {
      // bilincli olarak bos: Vuex action'i da bostu
    },
  },
})
