import { defineStore } from "pinia"

/*
 * store/modules/models.js -> Pinia
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
 * Istatistik: 32 action, 32 mutation, 32 getter
 */
export const useModelsStore = defineStore("models", {
  state: () => ({
  customerModel: {
    FirmaAdi: "",
    Unvan: "",
    Adres: "",
    Ulke: "",
    UlkeId: 0,
    Marketing: "",
    Etiket: "",
    Aktif: 0,
    Sira: 0,
    Mt_No: 0,
    MusteriTemsilciId: 0,
    KullaniciID: 0,
    MailAdresi: "",
    Telefon: "",
    Devir: 0,
    Ozel: 0,
    MusteriOncelik: "",
    Satisci: "",
    Takip: 0,
    Notlar: "",
    SonKullanici: 0,
    KayitTarihi: "",
    UlkeAdi: "",
    Png_Flags: "",
    Temsilci: "",
    TemsilciId: 0,
    SatisciAdi: "",
    SatisciId: 0,
  },
  bgpCustomerModel: {
    Customer: "",
    Company: "",
    Email: "",
    Phone: "",
    Adress: "",
    Kullanici: "",
    Ulke: "",
    UlkeId: "",
    Satisci: "",
    KullaniciId: "",
  },
  fairCustomerModel: {
    Customer: "",
    Company: "",
    Email: "",
    Phone: "",
    Country: "",
    Adress: "",
    Orderer: "",
    Kullanici: "",
    Fuar: "",
    Ziyaret: "",
    UlkeAdi: "",
    UlkeId: "",
  },
  selectionCustomerModel: {
    FirstName: "",
    LastName: "",
    Adress: "",
    City: "",
    Email: "",
    Phone: "",
    SurfaceId: "",
    Surface: "",
    UserId: "",
  },
  sampleModel: {
    DhlTarihi: "",
    NumuneNo: "",
    NumuneTarihi: "",
    NumuneTemsilci: 0,
    MusteriID: 0,
    Ulke: 0,
    Adres: "",
    TrackingNo: "",
    Parite: 0,
    Aciklama: "",
    YuklemeTarihi: "",
    KuryeAlis: 0,
    KuryeSatis: 0,
    GonderiTipi: 0,
    BankaSecim: 0,
    KategoriID: 0,
    UrunBirimi: 0,
    Miktar: 0,
    Numune_Cloud: 0,
    Numune_Cloud_Dosya: "",
    Numune_Cloud2: 0,
    Numune_Cloud_Dosya2: "",
    TL_Alis: 0,
    TL_Satis: 0,
    Euro_Alis: 0,
    Euro_Satis: 0,
  },
  offerProductModel: {
    Id: 0,
    Tarih: "",
    TeklifId: 0,
    KategoriId: 0,
    UrunId: 0,
    EnBoyId: 0,
    YuzeyIslemId: 0,
    KalinlikId: 0,
    FobFiyat: 0,
    TeklifFiyat: 0,
    Birim: "",
    FcaFiyat: 0,
    CFiyat: 0,
    DFiyat: 0,
    KategoriAdi: "",
    UrunAdi: "",
    EnBoy: "",
    IslemAdi: "",
    Kalinlik: "",
  },
  offerCustomerModel: {
    Id: 0,
    MusteriAdi: "",
    UlkeId: 0,
    Company: null,
    Mail: null,
    Phone: null,
    Adress: null,
    Description: null,
    Kullanici: 0,
  },
  offerModel: {
    Id: 0,
    Tarih: "",
    MusteriId: 0,
    Aciklama: 0,
    KullaniciId: 0,
    TakipEt: false,
    KaynakYeri: "",
    TeklifYeri: "",
    TeklifOncelik: "",
    Sira: 0,
    BList: false,
  },
  panelProductModel: {
    Id: 0,
    urunid: null,
    kategori_id: 0,
    urunadi_en: "",
    aciklama_en: "",
    anahtarlar_en: "",
    urunadi_fr: "",
    aciklama_fr: "",
    anahtarlar_fr: "",
    urunadi_es: "",
    aciklama_es: "",
    anahtarlar_es: "",
    yayinla: false,
    birim: "",
    urunkod: "",
    testrapor: "",
    sira: 0,
    stonetype: 0,
    keywords_en: "",
    keywords_fr: "",
    keywords_es: "",
    urunadi_ru: "",
    aciklama_ru: "",
    anahtarlar_ru: "",
    keywords_ru: "",
    urunadi_ar: "",
    aciklama_ar: "",
    anahtarlar_ar: "",
    keywords_ar: "",
  },
  panelProductSizeModel: {
    ebat: null,
    fiyat: 0,
    urunid: 0,
  },
  panelProductColorModel: {
    ID: 0,
    RenkId: 0,
    UrunId: 0,
    renk_en: "",
    renk_fr: "",
    renk_es: "",
    renk_ru: "",
  },
  panelProductFinishModel: {
    Id: 0,
    urunid: 0,
    finish_en: "",
    finish_fr: "",
    finish_es: "",
    finish_ru: "",
  },
  panelProductAreaModel: {
    ID: 0,
    UrunId: 0,
    AreaId: 0,
    Areas: "",
    Areas_fr: "",
    Areas_es: "",
    Areas_ru: "",
    Link: "",
  },
  panelProductTypeModel: {
    ID: 0,
    UrunId: 0,
    TurId: 0,
    KategoriId: 0,
    TurEn: "",
    TurFr: "",
    TurEs: "",
    TurRu: "",
    TurLink: "",
  },
  panelProductStyleModel: {
    ID: 0,
    UrunId: 0,
    StilId: 0,
    KategoriId: 0,
    StilEn: "",
    StilFr: "",
    StilEs: "",
    StilRu: "",
  },
  panelProductMaterialModel: {
    ID: 0,
    KategoriId: 0,
    MateryalId: 0,
    UrunId: 0,
    MateryalEn: "",
    MateryalFr: "",
    MateryalEs: "",
    MateryalRu: "",
  },
  panelProductEdgeModel: {
    ID: 0,
    KategoriId: 0,
    KenarId: 0,
    UrunId: 0,
    KenarEn: "",
    KenarFr: "",
    KenarEs: "",
    KenarRu: "",
  },
  panelProductProjectModel: {
    ID: 0,
    ProjectName: "",
    ProjectName_Fr: "",
    ProjectName_Es: "",
    ProjectName_Ru: "",
    ProjectName_Ar: "",

    CountryId: 0,
    CountryName: "",
    CountryName_Fr: "",
    CountryName_Es: "",
    CountryName_Ru: "",
    CountryName_Ar: "",

    Image: "",
    Queue: 0,
  },
  panelProductProjectInformationModel: {
    ID: 0,
    ProjectId: 0,
    ProjectInformation: "",
    ProjectInformation_Fr: "",
    ProjectInformation_Es: "",
    ProjectInformation_Ru: "",
    ProjectInformation_Ar: "",
  },
  panelUsersModel: {
    id: 0,
    adi: "",
    kullaniciadi: "",
    mailadres: "",
    telefon: "",
  },
  todoModel: {
    ID: 0,
    Yapilacak: "",
    Yapildi: 0,
    GorevVerenID: "",
    GorevVerenAdi: "",
    GirisTarihi: "",
    YapildiTarihi: "",
    YapilacakOncelik: "",
    Acil: 0,
    Sira: 0,
    OrtakGorev: "",
  },
  financePaymentModel: {
    Tarih: "",
    MusteriID: "",
    FirmaAdi: "",
    SiparisNo: "",
    FinansOdemeTurID: 0,
    Aciklama: "",
    Tutar: 0,
    Masraf: 0,
    KullaniciID: 0,
    KullaniciAdi: "",
    Kur: 0,
    BugunTarih: "",
  },
  financePoModel: {
    ID: 0,

    Tarih: "",
    MusteriID: "",
    FirmaAdi: "",
    SiparisNo: "",
    FinansOdemeTurID: 0,
    Aciklama: "",
    Tutar: 0,
    Masraf: 0,
    KullaniciID: 0,
    KullaniciAdi: "",
    Kur: 0,
    BugunTarih: "",
  },
  orderProductionModel: {
    ID: 0,
    SiparisNo: "",
    SiparisTarihi: "",
    OdemeTurID: 0,
    OdemeTur: "",
    TeslimTurID: 0,
    TeslimTur: "",
    MusteriID: 0,
    MusteriAdi: "",
    SiparisSahibiAdi: "",
    OperasyonAdi: "",
    FinansmanAdi: "",
    Pesinat: 0,
    NavlunFirma: "",
    NavlunAlis: 0,
    NavlunSatis: 0,
    KayitTarihi: "",
    KullaniciID: 0,
    SiparisDurumID: 0,
    UretimAciklama: "",
    SevkiyatAciklama: "",
    FinansAciklama: "",
    OdemeAciklama: "",
    TahminiYuklemeTarihi: "",
    YuklemeTarihi: "",
    Ulke: "",
    Komisyon: 0,
    DetayAciklama_1: "",
    DetayMekmarNot_1: "",
    DetayTutar_1: 0,
    DetayAlis_1: 0,
    DetayAciklama_2: "",
    DetayMekmarNot_2: "",
    DetayTutar_2: 0,
    DetayAlis_2: 0,
    DetayAciklama_3: "",
    DetayMekmarNot_3: "",
    DetayTutar_3: 0,
    DetayAlis_3: 0,
    SiparisSahibi: 0,
    EvrakGideri: 0,
    Eta: "",
    KonteynerAyrinti: "",
    KonteynerNo: "",
    UlkeId: 0,
    depo_yukleme: 0,
    DetayTutar_4: 0,
    DetayAciklama_4: "",
    sigorta_id: 0,
    sigorta_Tutar: 0,
    Operasyon: 0,
    Finansman: 0,
    Iade: 0,
    MalBedeli: 0,
    sigorta_tutar_satis: 0,
    Vade: "",
    operationMail: "",
    representativeMail: "",
    FaturaKesimTurID: 0,
    SiparisKontrol: false,
    SiparisKontrolEden: 0,
    FaturaKesimTurAdi: "",
    KaynakturuID: 0,
    KaynakTuru: "",
  },
  orderProductModel: {
    ID: 0,
    SiparisNo: "",
    TedarikciID: 0,
    TedarikciAdi: "",
    UrunKartID: 0,
    UrunBirimID: 0,
    Miktar: 0,
    OzelMiktar: 0,
    KasaAdet: 0,
    SatisFiyati: 0,
    SatisToplam: 0,
    UretimAciklama: "",
    MusteriAciklama: "",
    AlisFiyati: 0,
    SiraNo: 0,
    Ton: 0,
    musteriID: 0,
    Adet: 0,
    KasaOlcusu: "",
  },
  orderProductWorkermanModel: {
    ID: 0,
    Tarih: "",
    SiparisNo: "",
    UrunKartId: 0,
    InvoiceNo: 0,
    TedarikciID: 0,
    TedarikciAdi: "",
    SiparisEkstraGiderTurID: 0,
    Aciklama: "",
    Tutar: 0,
  },
  salesPointOfConsiderModel: {
    ID: null,
    Hata: "",
  },
  accountsModel: {
    ID: 0,
    LoginName: "",
    LoginPassword: "",
    Platform: "",
  },
  financePoModelMekmer: {
    id: 0,
    tarih: "",
    musteri_id: "",
    musteriadi: "",
    siparisno: "",
    FinansOdemeTurID: 0,
    aciklama: "",
    tutar: 0,
    masraf: 0,
    KullaniciID: 0,
    KullaniciAdi: "",
    kur: 0,
    BugunTarih: "",
  },
  divideProductionProductModel: {
    giden_po: "",
    kalan_po: "",
    id: 0,
    gonderilen: 0,
    kalan: 0,
    siparisno: "",
    tedarikciId: 0,
    urunKartId: 0,
    urunBirimId: 0,
    miktar: 0,
    ozelMiktar: 0,
    satisFiyat: 0,
    satisToplam: 0,
    uretimAciklama: "",
    musteriAciklama: "",
    kullaniciId: 0,
    alisFiyati: 0,
    siraNo: 0,
    ton: 0,
    musteriId: 0,
    adet: 0,
    kalanToplam: 0,
    gidenToplam: 0,
  },
  divideProductionModel: {
    id: 0,
    siparisno: "",
    siparisno_giden: "",
    siparisno_kalan: "",
    siparisTarihi: "",
    odemeTurId: 0,
    teslimTurId: 0,
    musteriId: 0,
    pesinat: 0,
    navlunFirma: "",
    navlunAlis: 0,
    navlunSatis: 0,
    kayitTarihi: "",
    kullaniciId: 0,
    siparisDurumId: 0,
    uretimAciklama: "",
    sevkiyatAciklama: "",
    finansAciklama: "",
    odemeAciklama: "",
    TahminiYuklemeTarihi: "",
    vade: "",
    ulke: "",
    komisyon: 0,
    detayAciklama: "",
    detayMekmarNot_1: "",
    detayTutar_1: 0,
    detayAlis_1: 0,
    detayAciklama_2: "",
    detayMekmarNot_2: "",
    detayTutar_2: 0,
    detayAlis_2: 0,
    detayAciklama_3: "",
    detayMekmarNot_3: "",
    detayTutar_3: 0,
    detayAlis_3: 0,
    siparisSahibi: 0,
    kayitKapali: 1,
    evrakGideri: 0,
    konteynerAyrinti: "",
    ulkeId: 0,
    faturaKesimTurId: 0,
    depo_yukleme: 0,
    detayTutar_4: 0,
    detayAciklama_4: "",
    sigortaTutar: 0,
    operasyon: 0,
    finansman: 0,
    iade: 0,
    malBedeli: 0,
    sigortaTutarSatis: 0,
    kalanPesinat: 0,
    gidenPesinat: 0,
    kalanNavlunSatis: 0,
    gidenNavlunSatis: 0,
    kalanNavlunAlis: 0,
    gidenNavlunAlis: 0,
    kalanDetaySatis_1: 0,
    gidenDetaySatis_1: 0,
    kalanDetaySatis_2: 0,
    gidenDetaySatis_2: 0,
    kalanDetaySatis_3: 0,
    gidenDetaySatis_3: 0,
    kalanDetaySatis_4: 0,
    gidenDetaySatis_4: 0,
    kalanDetayAlis_1: 0,
    gidenDetayAlis_1: 0,
    kalanDetayAlis_2: 0,
    gidenDetayAlis_2: 0,
    kalanDetayAlis_3: 0,
    gidenDetayAlis_3: 0,
    kalanMalBedeli: 0,
    gidenMalBedeli: 0,
  },
}),

  getters: {
    getDivideProductionProductModel: (state) => state.divideProductionProductModel,
    getDivideProductionModel: (state) => state.divideProductionModel,
    getFinancePoModelMekmer: (state) => state.financePoModelMekmer,
    getAccountsModel: (state) => state.accountsModel,
    getCustomerModel: (state) => state.customerModel,
    getBgpCustomerModel: (state) => state.bgpCustomerModel,
    getFairCustomerModel: (state) => state.fairCustomerModel,
    getSelectionCustomerModel: (state) => state.selectionCustomerModel,
    getSampleModel: (state) => state.sampleModel,
    getOfferProductModel: (state) => state.offerProductModel,
    getOfferCustomerModel: (state) => state.offerCustomerModel,
    getOfferModel: (state) => state.offerModel,
    getPanelProductModel: (state) => state.panelProductModel,
    getPanelProductSizeModel: (state) => state.panelProductSizeModel,
    getPanelProductColorModel: (state) => state.panelProductColorModel,
    getPanelProductFinishModel: (state) => state.panelProductFinishModel,
    getPanelProductAreaModel: (state) => state.panelProductAreaModel,
    getPanelProductTypeModel: (state) => state.panelProductTypeModel,
    getPanelProductStyleModel: (state) => state.panelProductStyleModel,
    getPanelProductMaterialModel: (state) => state.panelProductMaterialModel,
    getPanelProductEdgeModel: (state) => state.panelProductEdgeModel,
    getPanelProductProjectModel: (state) => state.panelProductProjectModel,
    getPanelProductProjectInformationModel: (state) => state.panelProductProjectInformationModel,
    getPanelUsersModel: (state) => state.panelUsersModel,
    getTodoModel: (state) => state.todoModel,
    getFinancePaymentModel: (state) => state.financePaymentModel,
    getFinancePoModel: (state) => state.financePoModel,
    getOrderProductionModel: (state) => state.orderProductionModel,
    getOrderProductModel: (state) => state.orderProductModel,
    getOrderProductWorkermanModel: (state) => state.orderProductWorkermanModel,
    getSalesPointOfConsiderModel: (state) => state.salesPointOfConsiderModel,
  },

  actions: {
    setAccountsModel() {

          const accountsModel = {
            ID: 0,
            LoginName: "",
            LoginPassword: "",
            Platform: "",
          };
          this.MUT_setAccountsModel(accountsModel);
    },
    setCustomerModel() {

          const payload = {
            FirmaAdi: "",
            Unvan: "",
            Adres: "",
            Ulke: "",
            UlkeId: 0,
            Marketing: "",
            Etiket: "",
            Aktif: 0,
            Sira: 0,
            Mt_No: 0,
            MusteriTemsilciId: 0,
            KullaniciID: 0,
            MailAdresi: "",
            Telefon: "",
            Devir: 0,
            Ozel: 0,
            MusteriOncelik: "",
            Satisci: "",
            Takip: 0,
            Notlar: "",
            SonKullanici: 0,
            KayitTarihi: "",
            UlkeAdi: "",
            Png_Flags: "",
            Temsilci: "",
            TemsilciId: 0,
            SatisciAdi: "",
            SatisciId: 0,
          };
          this.MUT_setCustomerModel(payload);
    },
    setBgpCustomerModel() {

          const payload = {
            Customer: "",
            Company: "",
            Email: "",
            Phone: "",
            Adress: "",
            Kullanici: "",
            Ulke: "",
            UlkeId: "",
            Satisci: "",
            KullaniciId: "",
          };
          this.MUT_setBgpCustomerModel(payload);
    },
    setFairCustomerModel() {

          const payload = {
            Customer: "",
            Company: "",
            Email: "",
            Phone: "",
            Country: "",
            Adress: "",
            Orderer: "",
            Kullanici: "",
            Fuar: "",
            Ziyaret: "",
            UlkeAdi: "",
            UlkeId: "",
          };
          this.MUT_setFairCustomerModel(payload);
    },
    setSelectionCustomerModel() {

          const payload = {
            FirstName: "",
            LastName: "",
            Adress: "",
            City: "",
            Email: "",
            Phone: "",
            SurfaceId: "",
            Surface: "",
            UserId: "",
          };
          this.MUT_setSelectionCustomerModel(payload);
    },
    setSampleModel() {

          const payload = {
            DhlTarihi: "",
            NumuneNo: "",
            NumuneTarihi: "",
            NumuneTemsilci: 0,
            MusteriID: 0,
            Ulke: 0,
            Adres: "",
            TrackingNo: "",
            Parite: 0,
            Aciklama: "",
            YuklemeTarihi: "",
            KuryeAlis: 0,
            KuryeSatis: 0,
            GonderiTipi: 0,
            BankaSecim: 0,
            KategoriID: 0,
            UrunBirimi: 0,
            Miktar: 0,
            Numune_Cloud: 0,
            Numune_Cloud_Dosya: "",
            Numune_Cloud2: 0,
            Numune_Cloud_Dosya2: "",
            TL_Alis: 0,
            TL_Satis: 0,
            Euro_Alis: 0,
            Euro_Satis: 0,
          };
          this.MUT_setSampleModel(payload);
    },
    setOfferModel() {

          const offerModel = {
            Id: 0,
            Tarih: "",
            MusteriId: 0,
            Aciklama: "",
            KullaniciId: 0,
            TakipEt: false,
            KaynakYeri: "",
            TeklifYeri: "",
            TeklifOncelik: "",
            Sira: 0,
            BList: false,
          };
          this.MUT_setOfferModel(offerModel);
    },
    setOfferProductModel() {

          const offerProductModel = {
            Id: 0,
            Tarih: "",
            TeklifId: 0,
            KategoriId: 0,
            UrunId: 0,
            EnBoyId: 0,
            YuzeyIslemId: 0,
            KalinlikId: 0,
            FobFiyat: 0,
            TeklifFiyat: 0,
            Birim: "",
            FcaFiyat: 0,
            CFiyat: 0,
            DFiyat: 0,
            KategoriAdi: "",
            UrunAdi: "",
            EnBoy: "",
            IslemAdi: "",
            Kalinlik: "",
          };
          this.MUT_setOfferProductModel(offerProductModel);
    },
    setOfferCustomerModel() {

          const offerCustomerModel = {
            Id: 0,
            MusteriAdi: "",
            UlkeId: 0,
            Company: null,
            Mail: null,
            Phone: null,
            Adress: null,
            Description: null,
            Kullanici: 0,
          };
          this.MUT_setOfferCustomerModel(offerCustomerModel);
    },
    setPanelProductModel() {

          const panelProductModel = {
            Id: 0,
            urunid: null,
            kategori_id: 0,
            urunadi_en: "",
            aciklama_en: "",
            anahtarlar_en: "",
            urunadi_fr: "",
            aciklama_fr: "",
            anahtarlar_fr: "",
            urunadi_es: "",
            aciklama_es: "",
            anahtarlar_es: "",
            yayinla: false,
            birim: "",
            urunkod: "",
            testrapor: "",
            sira: 0,
            stonetype: 0,
            keywords_en: "",
            keywords_fr: "",
            keywords_es: "",
            urunadi_ru: "",
            aciklama_ru: "",
            anahtarlar_ru: "",
            keywords_ru: "",
            urunadi_ar: "",
            aciklama_ar: "",
            anahtarlar_ar: "",
            keywords_ar: "",
          };
          this.MUT_setPanelProductModel(panelProductModel);
    },
    setPanelProductSizeModel() {

          const panelProductSizeModel = {
            Id: 0,
            ebat: null,
            fiyat: 0,
            urunid: 0,
          };
          this.MUT_setPanelProductSizeModel(panelProductSizeModel);
    },
    setPanelProductColorModel() {

          const panelProductColorModel = {
            ID: 0,
            RenkId: 0,
            UrunId: 0,
            renk_en: "",
            renk_fr: "",
            renk_es: "",
            renk_ru: "",
          };
          this.MUT_setPanelProductColorModel(panelProductColorModel);
    },
    setPanelProductFinishModel() {

          const panelProductFinishModel = {
            Id: 0,
            urunid: 0,
            finish_en: "",
            finish_fr: "",
            finish_es: "",
            finish_ru: "",
          };
          this.MUT_setPanelProductFinishModel(panelProductFinishModel);
    },
    setPanelProductAreaModel() {

          const panelProductAreaModel = {
            ID: 0,
            UrunId: 0,
            AreaId: 0,
            Areas: "",
            Areas_fr: "",
            Areas_es: "",
            Areas_ru: "",
            Link: "",
          };
          this.MUT_setPanelProductAreaModel(panelProductAreaModel);
    },
    setPanelProductTypeModel() {

          const panelProductTypeModel = {
            ID: 0,
            UrunId: 0,
            TurId: 0,
            KategoriId: 0,
            TurEn: "",
            TurFr: "",
            TurEs: "",
            TurRu: "",
            TurLink: "",
          };
          this.MUT_setPanelProductTypeModel(panelProductTypeModel);
    },
    setPanelProductStyleModel() {

          const panelProductStyleModel = {
            ID: 0,
            UrunId: 0,
            StilId: 0,
            KategoriId: 0,
            StilEn: "",
            StilFr: "",
            StilEs: "",
            StilRu: "",
          };
          this.MUT_setPanelProductStyleModel(panelProductStyleModel);
    },
    setPanelProductMaterialModel() {

          const panelProductMaterialModel = {
            ID: 0,
            KategoriId: 0,
            MateryalId: 0,
            UrunId: 0,
            MateryalEn: "",
            MateryalFr: "",
            MateryalEs: "",
            MateryalRu: "",
          };
          this.MUT_setPanelProductMaterialModel(panelProductMaterialModel
          );
    },
    setPanelProductEdgeModel() {

          const panelProductEdgeModel = {
            ID: 0,
            KategoriId: 0,
            KenarId: 0,
            UrunId: 0,
            KenarEn: "",
            KenarFr: "",
            KenarEs: "",
            KenarRu: "",
          };
          this.MUT_setPanelProductEdgeModel(panelProductEdgeModel);
    },
    setPanelProjectModel() {

          const panelProductProjectModel = {
            ID: 0,
            ProjectName: "",
            ProjectName_Fr: "",
            ProjectName_Es: "",
            ProjectName_Ru: "",
            ProjectName_Ar: "",

            CountryId: 0,
            CountryName: "",
            CountryName_Fr: "",
            CountryName_Es: "",
            CountryName_Ru: "",
            CountryName_Ar: "",
            Image: "",
            Queue: 0,
          };
          this.MUT_setPanelProjectModel(panelProductProjectModel);
    },
    setPanelProjectInformationModel() {

          const panelProductProjectInformationModel = {
            ID: 0,
            ProjectId: 0,
            ProjectInformation: "",
            ProjectInformation_Fr: "",
            ProjectInformation_Es: "",
            ProjectInformation_Ru: "",
            ProjectInformation_Ar: "",
          };
          this.MUT_setPanelProjectInformationModel(panelProductProjectInformationModel
          );
    },
    setPanelUsersModel() {

          const panelUsersModel = {
            id: 0,
            adi: "",
            kullaniciadi: "",
            mailadres: "",
            telefon: "",
          };
          this.MUT_setPanelUsersModel(panelUsersModel);
    },
    setToDoModel() {

          const todoModel = {
            ID: 0,
            Yapilacak: "",
            Yapildi: 0,
            GorevVerenID: "",
            GorevVerenAdi: "",
            GirisTarihi: "",
            YapildiTarihi: "",
            YapilacakOncelik: "",
            Acil: 0,
            Sira: 0,
            OrtakGorev: "",
          };
          this.MUT_setToDoModel(todoModel);
    },
    setFinancePaymentModel() {

          const financePaymentModel = {
            Tarih: "",
            MusteriID: "",
            FirmaAdi: "",
            SiparisNo: "",
            FinansOdemeTurID: 0,
            Aciklama: "",
            Tutar: 0,
            Masraf: 0,
            KullaniciID: 0,
            KullaniciAdi: "",
            Kur: 0,
            BugunTarih: "",
          };
          this.MUT_setFinancePaymentModel(financePaymentModel);
    },
    setFinancePoModel() {

          const financePoModel = {
            ID: 0,
            Tarih: "",
            MusteriID: "",
            FirmaAdi: "",
            SiparisNo: "",
            FinansOdemeTurID: 0,
            Aciklama: "",
            Tutar: 0,
            Masraf: 0,
            KullaniciID: 0,
            KullaniciAdi: "",
            Kur: 0,
            BugunTarih: "",
          };
          this.MUT_setFinancePoModel(financePoModel);
    },
    setFinancePoModelMekmer() {

          const financePoModel = {
            id: 0,
            tarih: "",
            musteri_id: "",
            musteriadi: "",
            siparisno: "",
            FinansOdemeTurID: 0,
            aciklama: "",
            tutar: 0,
            masraf: 0,
            KullaniciID: 0,
            KullaniciAdi: "",
            kur: 0,
            BugunTarih: "",
          };
          this.MUT_setFinancePoModelMekmer(financePoModel);
    },
    setOrderProductionModel() {

          const orderProductionModel = {
            ID: 0,
            SiparisNo: "",
            SiparisTarihi: "",
            OdemeTurID: 0,
            OdemeTur: "",
            TeslimTurID: 0,
            TeslimTur: "",
            MusteriID: 0,
            MusteriAdi: "",
            SiparisSahibiAdi: "",
            OperasyonAdi: "",
            FinansmanAdi: "",
            Pesinat: 0,
            NavlunFirma: "",
            NavlunAlis: 0,
            NavlunSatis: 0,
            KayitTarihi: "",
            KullaniciID: 0,
            SiparisDurumID: 0,
            UretimAciklama: "",
            SevkiyatAciklama: "",
            FinansAciklama: "",
            OdemeAciklama: "",
            TahminiYuklemeTarihi: "",
            YuklemeTarihi: "",
            Ulke: "",
            Komisyon: 0,
            DetayAciklama_1: "",
            DetayMekmarNot_1: "",
            DetayTutar_1: 0,
            DetayAlis_1: 0,
            DetayAciklama_2: "",
            DetayMekmarNot_2: "",
            DetayTutar_2: 0,
            DetayAlis_2: 0,
            DetayAciklama_3: "",
            DetayMekmarNot_3: "",
            DetayTutar_3: 0,
            DetayAlis_3: 0,
            SiparisSahibi: 0,
            EvrakGideri: 0,
            Eta: "",
            KonteynerAyrinti: "",
            KonteynerNo: "",
            UlkeId: 0,
            depo_yukleme: 0,
            DetayTutar_4: 0,
            DetayAciklama_4: "",
            sigorta_id: 0,
            sigorta_Tutar: 0,
            Operasyon: 0,
            Finansman: 0,
            Iade: 0,
            MalBedeli: 0,
            sigorta_tutar_satis: 0,
            Vade: "",
            operationMail: "",
            representativeMail: "",
            SiparisKontrol: false,
            SiparisKontrolEden: 0,
            FaturaKesimTurAdi: "",
          };
          this.MUT_setOrderProductionModel(orderProductionModel);
    },
    setOrderProductModel() {

          const orderProductModel = {
            ID: 0,
            SiparisNo: "",
            TedarikciID: 0,
            TedarikciAdi: "",
            UrunKartID: null,
            UrunBirimID: 0,
            Miktar: 0,
            OzelMiktar: 0,
            KasaAdet: 0,
            SatisFiyati: 0,
            SatisToplam: 0,
            UretimAciklama: "",
            MusteriAciklama: "",
            AlisFiyati: 0,
            SiraNo: 0,
            Ton: 0,
            musteriID: 0,
            Adet: 0,
          };
          this.MUT_setOrderProductModel(orderProductModel);
    },
    setOrderProductWorkermanModel() {

          const orderProductWorkermanModel = {
            ID: 0,
            Tarih: "",
            SiparisNo: "",
            UrunKartId: 0,
            InvoiceNo: 0,
            TedarikciID: 0,
            SiparisEkstraGiderTurID: 0,
            Aciklama: "",
            Tutar: 0,
          };

          this.MUT_setOrderProductWorkermanModel(orderProductWorkermanModel
          );
    },
    setSalesPointsOfConsiderModel() {

          const salesPointOfConsiderModel = {
            ID: null,
            Hata: "",
          };
          this.MUT_setSalesPointsOfConsiderModel(salesPointOfConsiderModel
          );
    },
    setDivideProductionsModel() {

          const divideProductionModel = {
            id: 0,
            siparisno: "",
            siparisno_giden: "",
            siparisno_kalan: "",
            siparisTarihi: "",
            odemeTurId: 0,
            teslimTurId: 0,
            musteriId: 0,
            pesinat: 0,
            navlunFirma: "",
            navlunAlis: 0,
            navlunSatis: 0,
            kayitTarihi: "",
            kullaniciId: 0,
            siparisDurumId: 0,
            uretimAciklama: "",
            sevkiyatAciklama: "",
            finansAciklama: "",
            odemeAciklama: "",
            TahminiYuklemeTarihi: "",
            vade: "",
            ulke: "",
            komisyon: 0,
            detayAciklama_1: "",
            detayMekmarNot_1: "",
            detayTutar_1: 0,
            detayAlis_1: 0,
            detayAciklama_2: "",
            detayMekmarNot_2: "",
            detayTutar_2: 0,
            detayAlis_2: 0,
            detayAciklama_3: "",
            detayMekmarNot_3: "",
            detayTutar_3: 0,
            detayAlis_3: 0,
            siparisSahibi: 0,
            kayitKapali: 1,
            evrakGideri: 0,
            konteynerAyrinti: "",
            ulkeId: 0,
            faturaKesimTurId: 0,
            depo_yukleme: 0,
            detayTutar_4: 0,
            detayAciklama_4: "",
            sigortaTutar: 0,
            operasyon: 0,
            finansman: 0,
            iade: 0,
            malBedeli: 0,
            sigortaTutarSatis: 0,
            kalanPesinat: 0,
            gidenPesinat: 0,
            kalanNavlunSatis: 0,
            gidenNavlunSatis: 0,
            kalanNavlunAlis: 0,
            gidenNavlunAlis: 0,
            kalanDetaySatis_1: 0,
            gidenDetaySatis_1: 0,
            kalanDetaySatis_2: 0,
            gidenDetaySatis_2: 0,
            kalanDetaySatis_3: 0,
            gidenDetaySatis_3: 0,
            kalanDetaySatis_4: 0,
            gidenDetaySatis_4: 0,
            kalanDetayAlis_1: 0,
            gidenDetayAlis_1: 0,
            kalanDetayAlis_2: 0,
            gidenDetayAlis_2: 0,
            kalanDetayAlis_3: 0,
            gidenDetayAlis_3: 0,
            kalanMalBedeli: 0,
            gidenMalBedeli: 0,
          };
          this.MUT_setDivideProductionsModel(divideProductionModel);
    },
    setDivideProductionsProductModel() {

          const divideProductionProductModel = {
            giden_po: "",
            kalan_po: "",
            id: 0,
            gonderilen: 0,
            kalan: 0,
            siparisno: "",
            tedarikciId: 0,
            urunKartId: 0,
            urunBirimId: 0,
            miktar: 0,
            ozelMiktar: 0,
            satisFiyat: 0,
            satisToplam: 0,
            uretimAciklama: "",
            musteriAciklama: "",
            kullaniciId: 0,
            alisFiyati: 0,
            siraNo: 0,
            ton: 0,
            musteriId: 0,
            adet: 0,
            kalanToplam: 0,
            gidenToplam: 0,
          };
          this.MUT_setDivideProductionsProductModel(divideProductionProductModel
          );
    },

    /* ---------- mutation'lar (MUT_ onekli) ---------- */
    MUT_setDivideProductionsProductModel(payload) {

          this.divideProductionProductModel = payload;
    },
    MUT_setDivideProductionsModel(payload) {

          this.divideProductionModel = payload;
    },
    MUT_setFinancePoModelMekmer(payload) {

          this.financePoModelMekmer = payload;
    },
    MUT_setAccountsModel(payload) {

          this.accountsModel = payload;
    },
    MUT_setCustomerModel(payload) {

          this.customerModel = payload;
    },
    MUT_setBgpCustomerModel(payload) {

          this.bgpCustomerModel = payload;
    },
    MUT_setFairCustomerModel(payload) {

          this.fairCustomerModel = payload;
    },
    MUT_setSelectionCustomerModel(payload) {

          this.selectionCustomerModel = payload;
    },
    MUT_setSampleModel(payload) {

          this.sampleModel = payload;
    },
    MUT_setOfferProductModel(payload) {

          this.offerProductModel = payload;
    },
    MUT_setOfferCustomerModel(payload) {

          this.offerCustomerModel = payload;
    },
    MUT_setOfferModel(payload) {

          this.offerModel = payload;
    },
    MUT_setPanelProductModel(payload) {

          this.panelProductModel = payload;
    },
    MUT_setPanelProductSizeModel(payload) {

          this.panelProductSizeModel = payload;
    },
    MUT_setPanelProductColorModel(payload) {

          this.panelProductColorModel = payload;
    },
    MUT_setPanelProductFinishModel(payload) {

          this.panelProductFinishModel = payload;
    },
    MUT_setPanelProductAreaModel(payload) {

          this.panelProductAreaModel = payload;
    },
    MUT_setPanelProductTypeModel(payload) {

          this.panelProductTypeModel = payload;
    },
    MUT_setPanelProductStyleModel(payload) {

          this.panelProductStyleModel = payload;
    },
    MUT_setPanelProductMaterialModel(payload) {

          this.panelProductMaterialModel = payload;
    },
    MUT_setPanelProductEdgeModel(payload) {

          this.panelProductEdgeModel = payload;
    },
    MUT_setPanelProjectModel(payload) {

          this.panelProductProjectModel = payload;
    },
    MUT_setPanelProjectInformationModel(payload) {

          this.panelProductProjectInformationModel = payload;
    },
    MUT_setPanelUsersModel(payload) {

          this.panelUsersModel = payload;
    },
    MUT_setToDoModel(payload) {

          this.todoModel = payload;
    },
    MUT_setFinancePaymentModel(payload) {

          this.financePaymentModel = payload;
    },
    MUT_setFinancePoModel(payload) {

          this.financePoModel = payload;
    },
    MUT_setOrderProductionModel(payload) {

          this.orderProductionModel = payload;
    },
    MUT_setOrderProductModel(payload) {

          this.orderProductModel = payload;
    },
    MUT_setOrderProductWorkermanModel(payload) {

          this.orderProductWorkermanModel = payload;
    },
    MUT_setSalesPointsOfConsiderModel(payload) {

          this.salesPointOfConsiderModel = payload;
    },
  },
})
