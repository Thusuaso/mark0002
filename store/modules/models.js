const state = {
    customerModel:{
        'FirmaAdi':"",
        'Unvan':"",
        'Adres':"",
        'Ulke':"",
        'UlkeId':0,
        'Marketing':"",
        'Etiket':"",
        'Aktif':0,
        'Sira':0,
        'Mt_No':0,
        'MusteriTemsilciId':0,
        'KullaniciID':0,
        'MailAdresi':"",
        'Telefon':"",
        'Devir':0,
        'Ozel':0,
        'MusteriOncelik':"",
        'Satisci':"",
        'Takip':0,
        'Notlar':"",
        'SonKullanici':0,
        'KayitTarihi':"",
        'UlkeAdi':"",
        'Png_Flags':"",
        'Temsilci':"",
        'TemsilciId':0,
        'SatisciAdi':"",
        'SatisciId':0,
    },
    offerCustomerModel:{
        'MusteriAdi':"",
        'Company':"",
        'Mail':"",
        'Phone':"",
        'Adress':"",
        'UlkeAdi':"",
        'UlkeId':"",
        'KullaniciAdi':"",
        'Kullanici':"",
    },
    bgpCustomerModel:{
        'Customer':"",
        'Company':"",
        'Email':"",
        'Phone':"",
        'Adress':"",
        'Kullanici':"",
        'Ulke':"",
        'UlkeId':"",
        'Satisci':"",
        'Kullanici':"",
        'KullaniciId':"",
    },
    fairCustomerModel: {
        'Customer': "",
        'Company': "",
        'Email': "",
        'Phone': "",
        'Country': "",
        'Adress': "",
        'Orderer': "",
        'Kullanici': "",
        'Fuar': "",
        'Ziyaret': "",
        'UlkeAdi': "",
        'UlkeId':""
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
        UserId:"",
    },
    sampleModel: {
        'NumuneNo': '',
        'NumuneTarihi': '',
        'NumuneTemsilci': 0,
        'MusteriID': 0,
        'Ulke': 0,
        'Adres': '',
        'TrackingNo': '',
        'Parite': 0,
        'Aciklama': '',
        'YuklemeTarihi': '',
        'KuryeAlis': 0,
        'KuryeSatis': 0,
        'GonderiTipi': 0,
        'BankaSecim': 0,
        'KategoriID': 0,
        'UrunBirimi': 0,
        'Miktar': 0,
        'Numune_Cloud': 0,
        'Numune_Cloud_Dosya': '',
        'Numune_Cloud2': 0,
        'Numune_Cloud_Dosya2': '',
        'TL_Alis': 0,
        'TL_Satis': 0,
        'Euro_Alis': 0,
        'Euro_Satis':0,
        
    },
    offerProductModel: {
        Id: 0,
        Tarih: '',
        TeklifId: 0,
        KategoriId: 0,
        UrunId: 0,
        EnBoyId: 0,
        YuzeyIslemId: 0,
        KalinlikId: 0,
        FobFiyat: 0,
        TeklifFiyat: 0,
        Birim: '',
        FcaFiyat: 0,
        CFiyat: 0,
        DFiyat: 0,
        KategoriAdi: '',
        UrunAdi: '',
        EnBoy: '',
        IslemAdi: '',
        Kalinlik: ''
    },
    offerCustomerModel: {
        Id: 0,
        MusteriAdi: '',
        UlkeId: 0,
        Company: null,
        Mail: null,
        Phone: null,
        Adress: null,
        Description: null,
        Kullanici:0,        
    },
    offerModel: {
        Id: 0,
        Tarih: '',
        MusteriId: 0,
        Aciklama: 0,
        KullaniciId: 0,
        TakipEt: false,
        KaynakYeri: '',
        TeklifYeri: '',
        TeklifOncelik: '',
        Sira: 0,
        BList: false,
        
    },
    panelProductModel: {
    Id:0,
    urunid:null,
    kategori_id:0,
    urunadi_en:"",
    aciklama_en:"",
    anahtarlar_en:"",
    urunadi_fr:"",
    aciklama_fr:"",
    anahtarlar_fr:"",
    urunadi_es:"",
    aciklama_es:"",
    anahtarlar_es:"",
    yayinla:false,
    birim:"",
    urunkod:"",
    testrapor:"",
    sira:0,
    stonetype:0,
    keywords_en:"",
    keywords_fr:"",
    keywords_es:"",
    urunadi_ru:"",
    aciklama_ru:"",
    anahtarlar_ru:"",
    keywords_ru:"",
    urunadi_ar:"",
    aciklama_ar:"",
    anahtarlar_ar:"",
    keywords_ar:"",

    },
    panelProductSizeModel: {
        'ebat': null,
        'fiyat': 0,
        'urunid':0,
    },
    panelProductColorModel: {
        ID: 0,
        RenkId: 0,
        UrunId: 0,
        renk_en: '',
        renk_fr: '',
        renk_es: '',
        renk_ru:'',
    },
    panelProductFinishModel: {
        Id: 0,
        urunid: 0,
        finish_en: '',
        finish_fr: '',
        finish_es: '',
        finish_ru:''
    },
    panelProductAreaModel: {
        ID: 0,
        UrunId:0,
        AreaId: 0,
        Areas: '',
        Areas_fr: '',
        Areas_es: '',
        Areas_ru: '',
        Link:'',
    },
    panelProductTypeModel: {
        ID: 0,
        UrunId: 0,
        TurId: 0,
        KategoriId: 0,
        TurEn: '',
        TurFr: '',
        TurEs: '',
        TurRu: '',
        TurLink:'',
        
    },
    panelProductStyleModel: {
        ID: 0,
        UrunId: 0,
        StilId: 0,
        KategoriId: 0,
        StilEn: '',
        StilFr: '',
        StilEs: '',
        StilRu:''
    },
    panelProductMaterialModel: {
        ID:0,
	    KategoriId:0,
	    MateryalId:0,
	    UrunId:0,
	    MateryalEn:'',
	    MateryalFr:'',
	    MateryalEs:'',
	    MateryalRu:'',
    },
    panelProductEdgeModel:{
        ID:0,
	    KategoriId:0,
	    KenarId:0,
	    UrunId:0,
	    KenarEn:'',
	    KenarFr:'',
	    KenarEs:'',
	    KenarRu:'',
    },
    panelProductProjectModel: {
        ID: 0,
        ProjectName: '',
        ProjectName_Fr: '',
        ProjectName_Es: '',
        ProjectName_Ru: '',
        CountryId: 0,
        CountryName: '',
        Image: '',
        Queue:0
    },
    panelProductProjectInformationModel: {
        ID: 0,
        ProjectId: 0,
        ProjectInformation: '',
        ProjectInformation_Fr: '',
        ProjectInformation_Es: '',
        ProjectInformation_Ru:''
    },
    panelUsersModel: {
        id: 0,
        adi: '',
        kullaniciadi: '',
        mailadres: '',
        telefon:''
    },
    todoModel: {
        ID:0,
        Yapilacak:'',
        Yapildi:0,
        GorevVerenID:'',
        GorevVerenAdi:'',
        GirisTarihi:'',
        YapildiTarihi:'',
        YapilacakOncelik:'',
        Acil:0,
        Sira:0,
        OrtakGorev:''
    },
    financePaymentModel: {
        Tarih: "",
        MusteriID: "",
        FirmaAdi:"",
        SiparisNo: "",
        FinansOdemeTurID: 0,
        Aciklama: "",
        Tutar: 0,
        Masraf: 0,
        KullaniciID: 0,
            KullaniciAdi:'',
        Kur: 0,
        BugunTarih:""
    },
    financePoModel: {
                    ID:0,

                Tarih: "",
        MusteriID: "",
        FirmaAdi:"",
        SiparisNo: "",
        FinansOdemeTurID: 0,
        Aciklama: "",
        Tutar: 0,
        Masraf: 0,
        KullaniciID: 0,
            KullaniciAdi:'',
        Kur: 0,
        BugunTarih:""
    },
    orderProductionModel: {
        ID: 0,
        SiparisNo: '',
        SiparisTarihi: '',
        OdemeTurID: 0,
        TeslimTurID: 0,
        MusteriID: 0,
        Pesinat: 0,
        NavlunFirma: '',
        NavlunAlis: 0,
        NavlunSatis: 0,
        KayitTarihi: '',
        KullaniciID: 0,
        SiparisDurumID: 0,
        UretimAciklama: '',
        SevkiyatAciklama: '',
        FinansAciklama: '',
        OdemeAciklama: '',
        TahminiYuklemeTarihi: '',
        YuklemeTarihi: '',
        Ulke: '',
        Komisyon: 0,
        DetayAciklama_1: '',
        DetayMekmarNot_1: '',
        DetayTutar_1: 0,
        DetayAlis_1: 0,
        DetayAciklama_2: '',
        DetayMekmarNot_2: '',
        DetayTutar_2: 0,
        DetayAlis_2: 0,
        DetayAciklama_3: '',
        DetayMekmarNot_3: '',
        DetayTutar_3: 0,
        DetayAlis_3: 0,
        SiparisSahibi: 0,
        EvrakGideri: 0,
        Eta: '',
        KonteynerAyrinti: '',
        KonteynerNo: '',
        UlkeId: 0,
        depo_yukleme: 0,
        DetayTutar_4: 0,
        DetayAciklama_4: '',
        sigorta_id: 0,
        sigorta_Tutar: 0,
        Operasyon: 0,
        Finansman:0,
        Iade: 0,
        MalBedeli: 0,
        sigorta_tutar_satis: 0,
        Vade: '',
        operationMail:'',
        representativeMail:''
    },
    orderProductModel: {
        ID: 0,
        SiparisNo: '',
        TedarikciID: 0,
        TedarikciAdi:'',
        UrunKartID: 0,
        UrunBirimID: 0,
        Miktar: 0,
        OzelMiktar: 0,
        KasaAdet: 0,
        SatisFiyati: 0,
        SatisToplam: 0,
        UretimAciklama: '',
        MusteriAciklama: '',
        AlisFiyati: 0,
        SiraNo: 0,
        Ton: 0,
        musteriID: 0,
        Adet:0
    },
    orderProductWorkermanModel: {
        ID: 0,
        Tarih: '',
        SiparisNo: '',
        UrunKartId: 0,
        InvoiceNo: 0,
        TedarikciID: 0,
        TedarikciAdi:'',
        SiparisEkstraGiderTurID: 0,
        Aciklama: '',
        Tutar:0
    },
    salesPointOfConsiderModel:{
        ID:null,
        Hata:''
    }

};
const actions = {
    setCustomerModel(vuexContext) {
        const payload = {
            'FirmaAdi': "",
            'Unvan': "",
            'Adres': "",
            'Ulke': "",
            'UlkeId': 0,
            'Marketing': "",
            'Etiket': "",
            'Aktif': 0,
            'Sira': 0,
            'Mt_No': 0,
            'MusteriTemsilciId': 0,
            'KullaniciID': 0,
            'MailAdresi': "",
            'Telefon': "",
            'Devir': 0,
            'Ozel': 0,
            'MusteriOncelik': "",
            'Satisci': "",
            'Takip': 0,
            'Notlar': "",
            'SonKullanici': 0,
            'KayitTarihi': "",
            'UlkeAdi': "",
            'Png_Flags': "",
            'Temsilci': "",
            'TemsilciId': 0,
            'SatisciAdi': "",
            'SatisciId': 0,
        };
        vuexContext.commit('setCustomerModel', payload);
    },
    setOfferCustomerModel(vuexContext) {
        const payload = {
            'MusteriAdi': "",
            'Company': "",
            'Mail': "",
            'Phone': "",
            'Adress': "",
            'UlkeAdi': "",
            'UlkeId': "",
            'KullaniciAdi': "",
            'Kullanici': "",
        };
        vuexContext.commit('setOfferCustomerModel', payload);
    },
    setBgpCustomerModel(vuexContext) {
        const payload = {
        'Customer':"",
        'Company':"",
        'Email':"",
        'Phone':"",
        'Adress':"",
        'Kullanici':"",
        'Ulke':"",
        'UlkeId':"",
        'Satisci':"",
        'Kullanici':"",
        'KullaniciId':"",
        }
        vuexContext.commit('setBgpCustomerModel', payload);
    },
    setFairCustomerModel(vuexContext) {
        const payload = {
            'Customer': "",
            'Company': "",
            'Email': "",
            'Phone': "",
            'Country': "",
            'Adress': "",
            'Orderer': "",
            'Kullanici': "",
            'Fuar': "",
            'Ziyaret': "",
            'UlkeAdi': "",
            'UlkeId': ""
        };
        vuexContext.commit('setFairCustomerModel', payload);
    },
    setSelectionCustomerModel(vuexContext) {
        const payload =  {
        FirstName: "",
        LastName: "",
        Adress: "",
        City: "",
        Email: "",
        Phone: "",
        SurfaceId: "",
        Surface: "",
        UserId:"",
        }
        vuexContext.commit('setSelectionCustomerModel', payload);
    },
    setSampleModel(vuexContext) {
        const payload = {
            'NumuneNo': '',
            'NumuneTarihi': '',
            'NumuneTemsilci': 0,
            'MusteriID': 0,
            'Ulke': 0,
            'Adres': '',
            'TrackingNo': '',
            'Parite': 0,
            'Aciklama': '',
            'YuklemeTarihi': '',
            'KuryeAlis': 0,
            'KuryeSatis': 0,
            'GonderiTipi': 0,
            'BankaSecim': 0,
            'KategoriID': 0,
            'UrunBirimi': 0,
            'Miktar': 0,
            'Numune_Cloud': 0,
            'Numune_Cloud_Dosya': '',
            'Numune_Cloud2': 0,
            'Numune_Cloud_Dosya2': '',
            'TL_Alis': 0,
            'TL_Satis': 0,
            'Euro_Alis': 0,
            'Euro_Satis': 0,
        
        };
        vuexContext.commit('setSampleModel', payload);
    },
    setOfferModel(vuexContext) {
        const  offerModel = {
            Id: 0,
            Tarih: '',
            MusteriId: 0,
            Aciklama: '',
            KullaniciId: 0,
            TakipEt: false,
            KaynakYeri: '',
            TeklifYeri: '',
            TeklifOncelik: '',
            Sira: 0,
            BList: false,
        
        };
        vuexContext.commit('setOfferModel', offerModel);
    },
    setOfferProductModel(vuexContext) {
        const offerProductModel = {
            Id: 0,
            Tarih: '',
            TeklifId: 0,
            KategoriId: 0,
            UrunId: 0,
            EnBoyId: 0,
            YuzeyIslemId: 0,
            KalinlikId: 0,
            FobFiyat: 0,
            TeklifFiyat: 0,
            Birim: '',
            FcaFiyat: 0,
            CFiyat: 0,
            DFiyat: 0,
            KategoriAdi: '',
            UrunAdi: '',
            EnBoy: '',
            IslemAdi: '',
            Kalinlik: ''
        };
        vuexContext.commit('setOfferProductModel', offerProductModel);
    },
    setOfferCustomerModel(vuexContext) {
        const offerCustomerModel = {
                    Id: 0,
                MusteriAdi: '',
                UlkeId: 0,
                Company: null,
                Mail: null,
                Phone: null,
                Adress: null,
                Description: null,
                Kullanici:0,   
        };
        vuexContext.commit('setOfferCustomerModel',offerCustomerModel)
    },
    setPanelProductModel(vuexContext) {
        const panelProductModel = {
            Id:0,
            urunid:null,
            kategori_id:0,
            urunadi_en:"",
            aciklama_en:"",
            anahtarlar_en:"",
            urunadi_fr:"",
            aciklama_fr:"",
            anahtarlar_fr:"",
            urunadi_es:"",
            aciklama_es:"",
            anahtarlar_es:"",
            yayinla:false,
            birim:"",
            urunkod:"",
            testrapor:"",
            sira:0,
            stonetype:0,
            keywords_en:"",
            keywords_fr:"",
            keywords_es:"",
            urunadi_ru:"",
            aciklama_ru:"",
            anahtarlar_ru:"",
            keywords_ru:"",
            urunadi_ar:"",
            aciklama_ar:"",
            anahtarlar_ar:"",
            keywords_ar:"",
        };
        vuexContext.commit('setPanelProductModel',panelProductModel)
    },
    setPanelProductSizeModel(vuexContext) {
        const panelProductSizeModel = {
            'Id':0,
            'ebat': null,
            'fiyat': 0,
            'urunid': 0,
        };
      vuexContext.commit('setPanelProductSizeModel',panelProductSizeModel)  
    },
    setPanelProductColorModel(vuexContext) {
        const panelProductColorModel = {
            ID: 0,
            RenkId: 0,
            UrunId: 0,
            renk_en: '',
            renk_fr: '',
            renk_es: '',
            renk_ru: '',
        };
        vuexContext.commit('setPanelProductColorModel', panelProductColorModel);
    },
    setPanelProductFinishModel(vuexContext) {
        const panelProductFinishModel = {
            Id: 0,
            urunid: 0,
            finish_en: '',
            finish_fr: '',
            finish_es: '',
            finish_ru: ''
        };
        vuexContext.commit('setPanelProductFinishModel', panelProductFinishModel);
    },
    setPanelProductAreaModel(vuexContext) {
        const panelProductAreaModel = {
            ID: 0,
            UrunId: 0,
            AreaId: 0,
            Areas: '',
            Areas_fr: '',
            Areas_es: '',
            Areas_ru: '',
            Link: '',
        };
        vuexContext.commit('setPanelProductAreaModel', panelProductAreaModel);
    },
    setPanelProductTypeModel(vuexContext) {
        const panelProductTypeModel = {
            ID: 0,
            UrunId: 0,
            TurId: 0,
            KategoriId: 0,
            TurEn: '',
            TurFr: '',
            TurEs: '',
            TurRu: '',
            TurLink: '',
        
        };
        vuexContext.commit('setPanelProductTypeModel', panelProductTypeModel);
    },
    setPanelProductStyleModel(vuexContext) {
        const panelProductStyleModel = {
            ID: 0,
            UrunId: 0,
            StilId: 0,
            KategoriId: 0,
            StilEn: '',
            StilFr: '',
            StilEs: '',
            StilRu: ''
        };
        vuexContext.commit('setPanelProductStyleModel', panelProductStyleModel);
    },
    setPanelProductMaterialModel(vuexContext) {
        const panelProductMaterialModel = {
            ID: 0,
            KategoriId: 0,
            MateryalId: 0,
            UrunId: 0,
            MateryalEn: '',
            MateryalFr: '',
            MateryalEs: '',
            MateryalRu: '',
        };
        vuexContext.commit('setPanelProductMaterialModel', panelProductMaterialModel);
    },
    setPanelProductEdgeModel(vuexContext){
        const  panelProductEdgeModel ={
            ID:0,
            KategoriId:0,
            KenarId:0,
            UrunId:0,
            KenarEn:'',
            KenarFr:'',
            KenarEs:'',
            KenarRu:'',
        };
        vuexContext.commit('setPanelProductEdgeModel', panelProductEdgeModel);

    },
    setPanelProjectModel(vuexContext) {
        const panelProductProjectModel = {
            ID: 0,
            ProjectName: '',
            ProjectName_Fr: '',
            ProjectName_Es: '',
            ProjectName_Ru: '',
            CountryId: 0,
            CountryName: '',
            Image: '',
            Queue: 0
        };
        vuexContext.commit('setPanelProjectModel', panelProductProjectModel);
    },
    setPanelProjectInformationModel(vuexContext) {
        const panelProductProjectInformationModel = {
            ID: 0,
            ProjectId: 0,
            ProjectInformation: '',
            ProjectInformation_Fr: '',
            ProjectInformation_Es: '',
            ProjectInformation_Ru: ''
        };
        vuexContext.commit('setPanelProjectInformationModel', panelProductProjectInformationModel);
    },
    setPanelUsersModel(vuexContext) {
        const panelUsersModel = {
            id: 0,
            adi: '',
            kullaniciadi: '',
            mailadres: '',
            telefon: ''
        };
        vuexContext.commit('setPanelUsersModel', panelUsersModel);
    },
    setToDoModel(vuexContext) {
        const todoModel = {
            ID: 0,
            Yapilacak: '',
            Yapildi: 0,
            GorevVerenID: '',
            GorevVerenAdi: '',
            GirisTarihi: '',
            YapildiTarihi: '',
            YapilacakOncelik: '',
            Acil: 0,
            Sira: 0,
            OrtakGorev: ''
        };
        vuexContext.commit('setToDoModel', todoModel);
    },
    setFinancePaymentModel(vuexContext) {
        const financePaymentModel = {
            Tarih: "",
            MusteriID: "",
            FirmaAdi:"",
            SiparisNo: "",
            FinansOdemeTurID: 0,
            Aciklama: "",
            Tutar: 0,
            Masraf: 0,
            KullaniciID: 0,
            KullaniciAdi:'',
            Kur: 0,
            BugunTarih:""
        };
        vuexContext.commit('setFinancePaymentModel', financePaymentModel);
    },
    setFinancePoModel(vuexContext) {
        const financePoModel = {
            ID:0,
            Tarih: "",
            MusteriID: "",
            FirmaAdi: "",
            SiparisNo: "",
            FinansOdemeTurID: 0,
            Aciklama: "",
            Tutar: 0,
            Masraf: 0,
            KullaniciID: 0,
            KullaniciAdi: '',
            Kur: 0,
            BugunTarih: ""
        };
        vuexContext.commit('setFinancePoModel', financePoModel);
    },
    setOrderProductionModel(vuexContext){
        const orderProductionModel = {
            ID: 0,
            SiparisNo: '',
            SiparisTarihi: '',
            OdemeTurID: 0,
            TeslimTurID: 0,
            MusteriID: 0,
            Pesinat: 0,
            NavlunFirma: '',
            NavlunAlis: 0,
            NavlunSatis: 0,
            KayitTarihi: '',
            KullaniciID: 0,
            SiparisDurumID: 0,
            UretimAciklama: '',
            SevkiyatAciklama: '',
            FinansAciklama: '',
            OdemeAciklama: '',
            TahminiYuklemeTarihi: '',
            YuklemeTarihi: '',
            Ulke: '',
            Komisyon: 0,
            DetayAciklama_1: '',
            DetayMekmarNot_1: '',
            DetayTutar_1: 0,
            DetayAlis_1: 0,
            DetayAciklama_2: '',
            DetayMekmarNot_2: '',
            DetayTutar_2: 0,
            DetayAlis_2: 0,
            DetayAciklama_3: '',
            DetayMekmarNot_3: '',
            DetayTutar_3: 0,
            DetayAlis_3: 0,
            SiparisSahibi: 0,
            EvrakGideri: 0,
            Eta: '',
            KonteynerAyrinti: '',
            KonteynerNo: '',
            UlkeId: 0,
            depo_yukleme: 0,
            DetayTutar_4: 0,
            DetayAciklama_4: '',
            sigorta_id: 0,
            sigorta_Tutar: 0,
            Operasyon: 0,
            Finansman: 0,
            Iade: 0,
            MalBedeli: 0,
            sigorta_tutar_satis: 0,
            Vade: '',
            operationMail:'',
            representativeMail:''
        };
        vuexContext.commit('setOrderProductionModel',orderProductionModel)
    },
    setOrderProductModel(vuexContext) {
        const orderProductModel = {
            ID: 0,
            SiparisNo: '',
            TedarikciID: 0,
            TedarikciAdi:'',
            UrunKartID: null,
            UrunBirimID: 0,
            Miktar: 0,
            OzelMiktar: 0,
            KasaAdet: 0,
            SatisFiyati: 0,
            SatisToplam: 0,
            UretimAciklama: '',
            MusteriAciklama: '',
            AlisFiyati: 0,
            SiraNo: 0,
            Ton: 0,
            musteriID: 0,
            Adet: 0
        };
        vuexContext.commit('setOrderProductModel',orderProductModel)
    },
    setOrderProductWorkermanModel(vuexContext) {
        const orderProductWorkermanModel = {
            ID: 0,
            Tarih: '',
            SiparisNo: '',
            UrunKartId: 0,
            InvoiceNo: 0,
            TedarikciID: 0,
            SiparisEkstraGiderTurID: 0,
            Aciklama: '',
            Tutar: 0
        };

        vuexContext.commit('setOrderProductWorkermanModel',orderProductWorkermanModel)
    },
    setSalesPointsOfConsiderModel(vuexContext){
        const salesPointOfConsiderModel= {
            ID:null,
            Hata:''
        };
        vuexContext.commit('setSalesPointsOfConsiderModel',salesPointOfConsiderModel)

    }


}
const mutations = {
    setCustomerModel(state,payload) {
        state.customerModel = payload
    },
    setOfferCustomerModel(state, payload) {
        state.offerCustomerModel = payload;
    },
    setBgpCustomerModel(state, payload) {
    state.bgpCustomerModel = payload;
    },
    setFairCustomerModel(state, payload) {
        state.fairCustomerModel = payload;
    },
    setSelectionCustomerModel(state, payload) {
        state.selectionCustomerModel = payload;
    },
    setSampleModel(state, payload) {
        state.sampleModel = payload;
    },
    setOfferProductModel(state, payload) {
        state.offerProductModel = payload;
    },
    setOfferCustomerModel(state, payload) {
        state.offerCustomerModel = payload;
    },
    setOfferModel(state, payload) {
    state.offerModel = payload;
    },
    setPanelProductModel(state, payload) {
        state.panelProductModel = payload;
    },
    setPanelProductSizeModel(state, payload) {
        state.panelProductSizeModel = payload;
    },
    setPanelProductColorModel(state, payload) {
        state.panelProductColorModel = payload;
    },
    setPanelProductFinishModel(state, payload) {
        state.panelProductFinishModel = payload;
    },
    setPanelProductAreaModel(state, payload) {
        state.panelProductAreaModel = payload;
    },
    setPanelProductTypeModel(state, payload) {
        state.panelProductTypeModel = payload;
    },
    setPanelProductStyleModel(state, payload) {
        state.panelProductStyleModel = payload;
    },
    setPanelProductMaterialModel(state, payload) {
        state.panelProductMaterialModel = payload;
    },
    setPanelProductEdgeModel(state,payload){
        state.panelProductEdgeModel = payload;

    },
    setPanelProjectModel(state, payload) {
        state.panelProductProjectModel = payload;
    },
    setPanelProjectInformationModel(state, payload) {
        state.panelProductProjectInformationModel = payload;
    },
    setPanelUsersModel(state, payload) {
        state.panelUsersModel = payload;
    },
    setToDoModel(state, payload) {
        state.todoModel = payload;
    },
    setFinancePaymentModel(state, payload) {
        state.financePaymentModel = payload;
    },
    setFinancePoModel(state, payload) {
        state.financePoModel = payload;
    },
    setOrderProductionModel(state, payload) {
        state.orderProductionModel = payload;
    },
    setOrderProductModel(state, payload) {
        state.orderProductModel = payload;
    },
    setOrderProductWorkermanModel(state, payload) {
        state.orderProductWorkermanModel = payload;
    },
    setSalesPointsOfConsiderModel(state,payload){
        state.salesPointOfConsiderModel = payload;
    }



}
const getters = {
    getCustomerModel(state){
        return state.customerModel;
    },
    getOfferCustomerModel(state){
        return state.offerCustomerModel;
    },
    getBgpCustomerModel(state){
        return state.bgpCustomerModel;
    },
    getFairCustomerModel(state) {
        return state.fairCustomerModel;
    },
    getSelectionCustomerModel(state) {
        return state.selectionCustomerModel;
    },
    getSampleModel(state) {
        return state.sampleModel;
    },
    getOfferProductModel(state) {
        return state.offerProductModel;
    },
    getOfferCustomerModel(state) {
        return state.offerCustomerModel;
    },
    getOfferModel(state) {
        return state.offerModel;
    },
    getPanelProductModel(state) {
        return state.panelProductModel;
    },
    getPanelProductSizeModel(state) {
        return state.panelProductSizeModel;
    },
    getPanelProductColorModel(state) {
        return state.panelProductColorModel;
    },
    getPanelProductFinishModel(state) {
        return state.panelProductFinishModel;
    },
    getPanelProductAreaModel(state) {
        return state.panelProductAreaModel;
    },
    getPanelProductTypeModel(state) {
        return state.panelProductTypeModel;
    },
    getPanelProductStyleModel(state) {
        return state.panelProductStyleModel;
    },
    getPanelProductMaterialModel(state) {
        return state.panelProductMaterialModel;
    },
    getPanelProductEdgeModel(state) {
        return state.panelProductEdgeModel;
    },
    getPanelProductProjectModel(state) {
        return state.panelProductProjectModel;
    },
    getPanelProductProjectInformationModel(state) {
        return state.panelProductProjectInformationModel;
    },
    getPanelUsersModel(state) {
        return state.panelUsersModel;
    },
    getTodoModel(state) {
        return state.todoModel;
    },
    getFinancePaymentModel(state) {
        return state.financePaymentModel;
    },
    getFinancePoModel(state) {
        return state.financePoModel;
    },
    getOrderProductionModel(state) {
        return state.orderProductionModel;
    },
    getOrderProductModel(state) {
        return state.orderProductModel;
    },
    getOrderProductWorkermanModel(state) {
        return state.orderProductWorkermanModel;
    },
    getSalesPointOfConsiderModel(state){
        return state.salesPointOfConsiderModel;
    }

};

export default {
    actions,
    mutations,
    state,
    getters
}