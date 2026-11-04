import { defineStore } from "pinia"

/*
 * Vuex store/modules/authority.js karsiligi.
 *
 * Orijinalde setAuthorityErrorMessage bir MUTATION icinde toast
 * gosteriyordu (state'e hic dokunmadan) -- Vuex'te mutation'larin yan
 * etkisiz olmasi beklenir, bu bir anti-pattern'di. Burada duz bir
 * action olarak duruyor.
 */
export const useAuthorityStore = defineStore("authority", {
  state: () => ({
    authorityStatus: false,
  }),

  getters: {
    getAuthorityStatus: (state) => state.authorityStatus,
  },

  actions: {
    setAuthorityNavbarStatus(status: boolean) {
      this.authorityStatus = status
    },

    setAuthorityErrorMessage() {
      useAppToast().error("Unauthorized login detected.")
    },
  },
})
