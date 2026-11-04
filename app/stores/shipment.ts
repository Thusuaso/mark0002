import { defineStore } from "pinia"

/*
 * Vuex store/modules/shipment.js karsiligi.
 *
 * MUT_ oneki GEREKMEDI: mutation adlari action adlariyla ayni olsa da
 * mutation'lar YALNIZCA kendi action'larindan commit ediliyordu --
 * hicbir bilesen dogrudan commit() cagirmiyor. Mutation'lar cagiran
 * action'in icine alindi (ayni yaklasim: sales.ts, bgp.ts, container.ts,
 * transport.ts).
 */

export interface ShipmentAmount {
  /* DIKKAT: DIZGE. Gerekcesi setShipmentAmount icinde. */
  order: string | number
  production: string | number
  remainder: string | number
}

export interface ShipmentProduct {
  ID: number
  KasaNo: string | number
  Miktar: number
  BirimAdi: string
  UrunAdi?: string
  YuzeyIslemAdi?: string
  En?: number
  Boy?: number
  Kenar?: number
  TotalProduct?: number
  [key: string]: unknown
}

export interface ShipmentOrderControl {
  TeslimTurID: number
  NavlunSatis: number | string | null
  [key: string]: unknown
}

export const useShipmentStore = defineStore("shipment", {
  state: () => ({
    shipmentAmount: {
      order: 0,
      production: 0,
      remainder: 0,
    } as ShipmentAmount,
    shipmentProductionList: [] as ShipmentProduct[],
    shipmentSendProductionList: [] as ShipmentProduct[],
    shipmentSendProductionTotal: {
      crate: 0,
      total: 0,
      amount: 0,
    },
  }),

  getters: {
    getShipmentAmount: (state) => state.shipmentAmount,
    getShipmentProductionList: (state) => state.shipmentProductionList,
    getShipmentSendProductionList: (state) => state.shipmentSendProductionList,
    getShipmentSendProductionTotal: (state) =>
      state.shipmentSendProductionTotal,
  },

  actions: {
    /*
     * DUZELTILDI -- `new Promise` SARMALAYICISI VE EKSIK .catch().
     *
     * Nuxt 2'deki hali:
     *
     *     return new Promise((resolve, reject) => {
     *       this.$axios.get('/shipment/order/control/' + po)
     *         .then(res => { resolve(res.data.po) })
     *     })          // <-- .catch() YOK
     *
     * Istek hata verirse (403/500) ic promise reddolur, DIS promise ise
     * NE resolve NE reject olur -- sonsuza kadar beklemede kalir.
     * Cagiran taraftaki .then() HIC calismaz, yani "Ship" ve "Send Crate"
     * dugmeleri pasif kalir ve kullanici neden oldugunu anlamaz.
     *
     * Artik duz async; hata durumunda null donuyor ve cagiran taraf bunu
     * kontrol ediyor.
     */
    async setShipmentOrderControl(
      po: string,
    ): Promise<ShipmentOrderControl | null> {
      try {
        const api = useApi()
        const res = await api<{ po: ShipmentOrderControl }>(
          `/shipment/order/control/${po}`,
        )
        return res?.po ?? null
      } catch (err) {
        console.error("setShipmentOrderControl basarisiz:", err)
        return null
      }
    },

    /*
     * ADI YANILTICI AMA KORUNDU: "SendProductionList" adina ragmen bu
     * eylem liste GONDERMIYOR, gonderilecekler listesini SIFIRLIYOR.
     * Nuxt 2'de de boyleydi (mutation govdesi `state.x = []`) ve bilesen
     * onu sifirlama amaciyla cagiriyor. Ad degistirmek cagri yerlerini de
     * degistirmek demek; davranis birebir korundu.
     */
    setShipmentSendProductionList() {
      this.shipmentSendProductionList = []
    },

    /*
     * DIKKAT -- TOPLAMLAR DIZGE OLARAK SAKLANIYOR.
     *
     * Nuxt 2 mutation'i `.toFixed(4)` uyguluyordu:
     *     state.shipmentAmount.order = shipmentAmount.order.toFixed(4)
     * toFixed DIZGE dondurur, yani state'te sayi degil dizge duruyor.
     * Form bu uc degeri yalnizca GOSTERIYOR (disabled input), yani
     * pratikte sorun cikmiyor -- ama uzerinde aritmetik yapilsa
     * "0.0000" + 1 = "0.00001" olurdu.
     *
     * Birebir korundu: davranisi degistirmek gosterimdeki ondalik
     * basamak sayisini da degistirir.
     *
     * KALDIRILDI: Nuxt 2'de bu eylemin basinda `console.log(product)`
     * vardi -- hata ayiklama kalintisi, her urun seciminde konsola
     * basiyordu.
     */
    async setShipmentAmount(product: {
      SiparisNo: string
      ID: number
      UrunKartId: number
      TedarikciID: number
    }) {
      try {
        const api = useApi()
        const res = await api<{
          order: number
          production: number
          remainder: number
          productionList: ShipmentProduct[]
        }>(
          `/shipment/product/amount/${product.SiparisNo}/${product.ID}/${product.UrunKartId}/${product.TedarikciID}`,
        )

        this.shipmentAmount = {
          order: res.order.toFixed(4),
          production: res.production.toFixed(4),
          remainder: res.remainder.toFixed(4),
        }
        this.shipmentProductionList = res.productionList ?? []
      } catch (err) {
        console.error("setShipmentAmount basarisiz:", err)
      }
    },

    /* Secilen kasalari "gonderilecekler" listesine ekler ve toplamlari artirir. */
    setShipmentSendingProduction(products: ShipmentProduct[] | null) {
      /*
       * DUZELTILDI -- null ILE PATLIYORDU.
       *
       * Nuxt 2'de `for (const item of products)` KOSULSUZDU. Bilesen bu
       * eylemi `this.selectedProducts` ile cagiriyor ve o alan null
       * baslatiliyor; "Send Crate" dugmesine hicbir kasa secmeden
       * basmak
       *     TypeError: products is not iterable
       * firlatiyordu. Dugme urun secilince etkin oluyor ama KASA secimi
       * ayri bir adim, yani bu gercekci bir sira hatasi.
       */
      if (!products || !products.length) {
        console.warn(
          "setShipmentSendingProduction: secili kasa yok, liste " +
            "degistirilmedi.",
        )
        return
      }

      for (const item of products) {
        this.shipmentSendProductionTotal.total += item.TotalProduct ?? 0
        this.shipmentSendProductionTotal.amount += item.Miktar
        this.shipmentSendProductionList.push(item)
      }
      this.shipmentSendProductionTotal.crate += products.length
    },

    setShipmentProductionDeleteList() {
      this.shipmentProductionList = []
    },

    /*
     * YENI -- Nuxt 2'de karsiligi YOKTU.
     *
     * Form, uc tutari sifirlamak icin GETTER UZERINDEN state'e yaziyordu:
     *
     *     this.getShipmentAmount.order = 0
     *     this.getShipmentAmount.production = 0
     *     this.getShipmentAmount.remainder = 0
     *
     * Getter state nesnesini REFERANSLA dondurdugu icin bu fiilen
     * calisiyordu, ama store'un disindan state'e yazmak demekti (Vuex'te
     * de Pinia'da da anti-pattern; Vuex strict modda hata verirdi).
     * Ayni isi yapan bir eylem eklendi.
     */
    resetShipmentAmount() {
      this.shipmentAmount = { order: 0, production: 0, remainder: 0 }
    },

    /*
     * DUZELTILDI -- IC ICE ISTEK, `new Promise` VE EKSIK .catch().
     *
     * Nuxt 2'deki hali: urunleri kaydet, BASARILIYSA ikinci bir istekle
     * mail gonder, ve DIS promise'i MAIL'in sonucuyla resolve et.
     * Ikisinin de .catch()'i yoktu, yani herhangi bir istek hata verirse
     * dis promise sonsuza kadar beklemede kaliyor ve cagiran taraftaki
     * .then() hic calismiyordu: ne basari ne hata toast'i, "Ship" dugmesi
     * pasif kaliyordu.
     *
     * DONUS DEGERI ANLAMI KORUNDU: true yalnizca KAYIT VE MAIL birlikte
     * basarili olduysa. Kayit basarili ama mail basarisizsa Nuxt 2 de
     * false donuyordu (ve ayrica mail hatasi toast'i gosteriyordu) --
     * yani kullanici "Sevk Edilemedi" goruyordu, oysa sevk KAYDEDILMISTI.
     * Bu yaniltici ama DAVRANIS OLDUGU ICIN degistirilmedi; mail
     * sonucunun kayit sonucundan ayri raporlanmasi ayri bir karar.
     */
    async setShipmentSave(products: unknown): Promise<boolean> {
      const toast = useAppToast()
      try {
        const api = useApi()
        const saved = await api<{ status: boolean }>("/shipment/products/save", {
          method: "POST",
          body: products,
        })

        if (!saved.status) return false

        const mailed = await api<{ status: boolean }>(
          "/shipment/products/save/mail",
          { method: "POST", body: products },
        )

        if (mailed.status) {
          toast.success("Mail Gönderildi")
        } else {
          toast.error("Mail Gönderme Başarısız")
        }

        return mailed.status
      } catch (err) {
        console.error("setShipmentSave basarisiz:", err)
        toast.error("Mail Gönderme Başarısız")
        return false
      }
    },

    setShipmentSendProductionTotalCrateReset() {
      this.shipmentSendProductionTotal = { crate: 0, total: 0, amount: 0 }
    },
  },
})
