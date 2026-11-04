/*
 * socket.io olayina abone olmanin guvenli yolu.
 *
 * NEDEN VAR: Nuxt 2'de her cagri yeri yasam dongusunu kendi eliyle
 * kuruyordu ve dordunun hepsi ayni sekilde yanlisti:
 *
 *     mounted() {
 *       this.$store.dispatch("setConnection")
 *       this.$store.getters.getSocket.on("card_list_update_on", () => {...})
 *     },
 *     beforeDestroy() {
 *       if (this.socket) { this.$store.dispatch("setDisconnect") }
 *     }
 *
 * Buradaki uc hata: (a) dinleyici hic kaldirilmiyor, (b) `this.socket`
 * hicbir zaman atanmadigi icin kosul daima false ve disconnect
 * cagrilmiyor, (c) getSocket SSR'da null oldugu icin `.on` zincirlemesi
 * sunucuda patlar.
 *
 * Bu composable ucunu de ortadan kaldirir: client'ta baglanir, olayi
 * dinler, kapsam yok olurken dinleyiciyi kaldirir ve baglantiyi birakir.
 * Cagri yerinde geriye tek satir kalir:
 *
 *     useRealtime("card_list_update_on", () => cards.setCardList())
 */
export function useRealtime(event: string, handler: (...args: unknown[]) => void) {
  const store = useSocketStore()

  onMounted(() => {
    store.connect()
    store.getSocket?.on(event, handler)
  })

  onBeforeUnmount(() => {
    store.getSocket?.off(event, handler)
    store.disconnect()
  })

  return {
    emit: (name: string, ...args: unknown[]) => store.emit(name, ...args),
  }
}
