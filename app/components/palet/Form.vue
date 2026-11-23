<template>
  <div class="pf">
    <div class="row g-3">
      <div class="col-12 col-md-4">
        <FloatLabel>
          <DatePicker
            :inputId="ids.tarih"
            v-model="tarih"
            dateFormat="dd/mm/yy"
            :manualInput="false"
            showIcon
          />
          <label :for="ids.tarih">Tarih</label>
        </FloatLabel>
      </div>

      <!--
        PALET NO: YENI KAYITTA OTOMATIK, DUZENLEMEDE ELLE DEGISTIRILEBILIR.
        (istek: "ilk basta normal sekilde otomatik atayacak ama sonra
        update yapacagim zaman o alani guncelleyebilmek istiyorum")

        Yeni kayitta kutu KAPALI ve BOS: numara ID'den uretildigi icin
        kayit tamamlanmadan daha belli degil, yani gosterilecek bir deger
        yok. ("kayıtta verilecek" yazisi istek uzerine kaldirildi;
        ustundeki FloatLabel etiketi alanin ne oldugunu soyluyor.)

        Duzenlemede kutu ACIK -- yazilan deger /palet/update ile
        kaydediliyor. Benzersizligi sunucu kontrol ediyor; cakisirsa
        "baska bir palette kullaniliyor" mesaji donuyor.
      -->
      <div class="col-12 col-md-4">
        <FloatLabel>
          <InputText
            :id="ids.paletNo"
            v-model="model.PaletNo"
            :disabled="!model.ID"
            maxlength="20"
          />
          <label :for="ids.paletNo">Palet No</label>
        </FloatLabel>
      </div>

      <div class="col-12 col-md-4">
        <FloatLabel>
          <InputNumber
            :inputId="ids.adet"
            v-model="model.Adet"
            :min="1"
            :useGrouping="false"
            @update:modelValue="m2Hesapla"
          />
          <label :for="ids.adet">Adet</label>
        </FloatLabel>
      </div>

      <div class="col-12 col-md-6">
        <FloatLabel>
          <AutoComplete
            v-model="secili.firma"
            :inputId="ids.firma"
            :suggestions="oneriler.firma"
            optionLabel="etiket"
            dropdown
            @complete="ara('firma', $event)"
            @item-select="secildi('firma', $event)"
            @input="yazildi('firma', $event)"
          />
          <label :for="ids.firma">Firma</label>
        </FloatLabel>
        <small v-if="uyari.firma" class="pf-uyari">
          <i class="pi pi-info-circle" aria-hidden="true" />
          Bu firma sistemde zaten var — listeden seçebilirsin.
        </small>
        <small v-else-if="yeni.firma" class="pf-yeni">
          <i class="pi pi-plus-circle" aria-hidden="true" />
          Yeni firma olarak kaydedilecek.
        </small>
      </div>

      <div class="col-12 col-md-6">
        <FloatLabel>
          <AutoComplete
            v-model="secili.urun"
            :inputId="ids.urun"
            :suggestions="oneriler.urun"
            optionLabel="etiket"
            dropdown
            @complete="ara('urun', $event)"
            @item-select="secildi('urun', $event)"
            @input="yazildi('urun', $event)"
          />
          <label :for="ids.urun">Ürün Bilgisi</label>
        </FloatLabel>
        <small v-if="uyari.urun" class="pf-uyari">
          <i class="pi pi-info-circle" aria-hidden="true" />
          Bu ürün bilgisi sistemde zaten var — listeden seçebilirsin.
        </small>
        <small v-else-if="yeni.urun" class="pf-yeni">
          <i class="pi pi-plus-circle" aria-hidden="true" />
          Yeni ürün bilgisi olarak kaydedilecek.
        </small>
      </div>

      <!--
        EN / BOY / KALINLIK -- UCU DE AYRI AutoComplete, ayri liste
        tablosu (istek: "ayri ayri"). En ve Boy degisince M2 yeniden
        hesaplaniyor; Kalinlik hesaba GIRMIYOR (m2 bir alan olcusu).
      -->
      <div class="col-12 col-md-4">
        <FloatLabel>
          <AutoComplete
            v-model="secili.en"
            :inputId="ids.en"
            :suggestions="oneriler.en"
            optionLabel="etiket"
            dropdown
            @complete="ara('en', $event)"
            @item-select="secildi('en', $event)"
            @input="yazildi('en', $event)"
          />
          <label :for="ids.en">En (cm)</label>
        </FloatLabel>
        <small v-if="okunan.en" class="pf-uyari">
          <i class="pi pi-info-circle" aria-hidden="true" />
          <strong>{{ okunan.en }}</strong> olarak okunacak
        </small>
        <small v-else-if="uyari.en" class="pf-uyari">Bu en değeri zaten var.</small>
        <small v-else-if="yeni.en" class="pf-yeni">Yeni en değeri kaydedilecek.</small>
      </div>

      <div class="col-12 col-md-4">
        <FloatLabel>
          <AutoComplete
            v-model="secili.boy"
            :inputId="ids.boy"
            :suggestions="oneriler.boy"
            optionLabel="etiket"
            dropdown
            @complete="ara('boy', $event)"
            @item-select="secildi('boy', $event)"
            @input="yazildi('boy', $event)"
          />
          <label :for="ids.boy">Boy (cm)</label>
        </FloatLabel>
        <small v-if="okunan.boy" class="pf-uyari">
          <i class="pi pi-info-circle" aria-hidden="true" />
          <strong>{{ okunan.boy }}</strong> olarak okunacak
        </small>
        <small v-else-if="uyari.boy" class="pf-uyari">Bu boy değeri zaten var.</small>
        <small v-else-if="yeni.boy" class="pf-yeni">Yeni boy değeri kaydedilecek.</small>
      </div>

      <div class="col-12 col-md-4">
        <FloatLabel>
          <AutoComplete
            v-model="secili.kalinlik"
            :inputId="ids.kalinlik"
            :suggestions="oneriler.kalinlik"
            optionLabel="etiket"
            dropdown
            @complete="ara('kalinlik', $event)"
            @item-select="secildi('kalinlik', $event)"
            @input="yazildi('kalinlik', $event)"
          />
          <label :for="ids.kalinlik">Kalınlık (cm)</label>
        </FloatLabel>
        <small v-if="okunan.kalinlik" class="pf-uyari">
          <i class="pi pi-info-circle" aria-hidden="true" />
          <strong>{{ okunan.kalinlik }}</strong> olarak okunacak
        </small>
        <small v-else-if="uyari.kalinlik" class="pf-uyari">Bu kalınlık zaten var.</small>
        <small v-else-if="yeni.kalinlik" class="pf-yeni">
          Yeni kalınlık kaydedilecek.
        </small>
        <small v-else class="pf-not">İsteğe bağlı.</small>
      </div>

      <!--
        M2 OTOMATIK, salt okunur.
        Istek: "m2 adet, en ve boy girilince otomatik hesaplanacak".
        Elle degistirilebilir olsaydi kayitli deger olculerle
        ayrisabilirdi; ustelik sunucu zaten kendi hesabini yaziyor
        (api/index.js paletM2), yani elle girilen deger kaybolurdu --
        alan o yuzden kapali.
      -->
      <div class="col-12 col-md-4">
        <FloatLabel>
          <InputNumber
            :inputId="ids.m2"
            v-model="model.M2"
            :minFractionDigits="2"
            :maxFractionDigits="2"
            disabled
            class="pf-hesaplanan"
          />
          <label :for="ids.m2">M2 (otomatik)</label>
        </FloatLabel>
        <small class="pf-not">Adet × En × Boy ÷ 10.000</small>
      </div>

      <!--
        [x] KULLANILDI KUTUSU FORMDAN KALDIRILDI.

        Kural: sifirdan girilen palet HER ZAMAN "kullanilmadi" baslar;
        durum yalnizca LISTEDEKI "Durum" kolonuna tiklayarak degisir.
        Formda bir kutu daha olmasi iki yerde iki ayri yol demekti --
        ustelik yeni kayitta isaretlenebiliyor olmasi "sifirdan
        girildiginde kullanilmadi" kuralini bozuyordu.

        Yeni kayitta durum yaziyor (degistirilemez), duzenlemede mevcut
        durum + nereden degistirilecegi.
      -->
      <div class="col-12 col-md-8 d-flex align-items-center">
        <p class="pf-durum">
          <i
            class="pi"
            :class="model.Kullanildi ? 'pi-check-square' : 'pi-stop'"
            aria-hidden="true"
          />
          <span class="pf-durum__ad">
            {{ model.Kullanildi ? "Kullanıldı" : "Kullanılmadı" }}
          </span>
          <span class="pf-durum__not">
            {{
              model.ID
                ? "— değiştirmek için listedeki Durum kolonuna tıkla"
                : "— yeni palet kullanılmadı olarak girilir"
            }}
          </span>
        </p>
      </div>
    </div>

    <div class="pf-dugmeler">
      <Button
        label="Vazgeç"
        icon="pi pi-times"
        text
        severity="secondary"
        @click="$emit('palet_form_close_emit')"
      />
      <Button
        :label="model.ID ? 'Güncelle' : 'Kaydet'"
        icon="pi pi-check"
        :loading="kaydediyor"
        :disabled="kaydediyor"
        @click="kaydet"
      />
    </div>
  </div>
</template>

<script>
/*
 * components/palet/Form.vue  --  <PaletForm>
 *
 * Palet giris/duzenleme formu.
 *
 * BES AutoComplete AYNI KURALI PAYLASIYOR (istek: "Firma daki mantikla
 * ayni"):
 *   - listede olan degerler oneriliyor,
 *   - YAZILAN deger listede VARSA uyari cikiyor ("zaten var"),
 *   - yoksa kayitta SQL'e ekleniyor (sunucu tarafi: paletListeId).
 * Bes kopya yazmak yerine alan adi uzerinden tek kod yolu var
 * (ara/yazildi/secildi + ALANLAR tanimi).
 *
 * [!] AutoComplete'in @input'u PrimeVue 4'te NATIVE InputEvent veriyor,
 * duz metin DEGIL -- bu projede birebir bu hata yasandi
 * (CalculatingCostForm.vue'daki typedText notu: modele bir InputEvent
 * NESNESI yaziliyordu). Bu yuzden her yerde metin() ile indirgeniyor.
 */

/* Alanin hangi listeye ve hangi etiket alanina bagli oldugu. */
const ALANLAR = {
  firma: { etiketAlani: "FirmaAdi", sayisal: false, idAlani: "FirmaId", metinAlani: "FirmaAdi" },
  urun: { etiketAlani: "UrunBilgisi", sayisal: false, idAlani: "UrunId", metinAlani: "UrunBilgisi" },
  en: { etiketAlani: "Deger", sayisal: true, idAlani: "EnId", metinAlani: "En" },
  boy: { etiketAlani: "Deger", sayisal: true, idAlani: "BoyId", metinAlani: "Boy" },
  kalinlik: { etiketAlani: "Deger", sayisal: true, idAlani: "KalinlikId", metinAlani: "Kalinlik" },
}

export default {
  props: {
    /* Duzenlenen kayit; yeni kayitta bos nesne. */
    kayit: { type: Object, default: () => ({}) },
    lookups: {
      type: Object,
      default: () => ({ firma: [], en: [], boy: [], kalinlik: [], urun: [] }),
    },
  },

  emits: ["palet_form_close_emit", "palet_saved_emit"],

  setup() {
    /* Sabit id yerine useId(): ayni sayfada iki form olursa <label for>
       ilk ornege baglanirdi (CustomInput.vue'da birebir bu hata vardi). */
    const base = useId()
    return {
      ids: {
        tarih: `${base}-tarih`,
        paletNo: `${base}-paletNo`,
        adet: `${base}-adet`,
        firma: `${base}-firma`,
        urun: `${base}-urun`,
        en: `${base}-en`,
        boy: `${base}-boy`,
        kalinlik: `${base}-kalinlik`,
        m2: `${base}-m2`,
        kullanildi: `${base}-kullanildi`,
      },
    }
  },

  data() {
    return {
      tarih: new Date(),
      model: {
        ID: 0,
        PaletNo: "",
        FirmaId: null,
        FirmaAdi: "",
        EnId: null,
        En: "",
        BoyId: null,
        Boy: "",
        KalinlikId: null,
        Kalinlik: "",
        UrunId: null,
        UrunBilgisi: "",
        Adet: null,
        M2: null,
        Kullanildi: false,
      },

      /* AutoComplete'lerin v-model'i: ya {ID, etiket} nesnesi (secildi)
         ya da duz metin (yazildi). PrimeVue ikisini de kabul ediyor. */
      secili: { firma: null, urun: null, en: null, boy: null, kalinlik: null },
      oneriler: { firma: [], urun: [], en: [], boy: [], kalinlik: [] },

      /* "Zaten var" ve "yeni kaydedilecek" ipuclari alan basina. */
      uyari: { firma: false, urun: false, en: false, boy: false, kalinlik: false },
      /*
       * SAYISAL ALANDA "NE ANLADIM" GERI BILDIRIMI.
       *
       * En/Boy/Kalinlik serbest metin kutusu; ondalik ayirici olarak
       * nokta da virgul de kabul ediliyor (ikisi ayni: sayi() virgulu
       * noktaya ceviriyor). Sorun BINLIK ayiricida: "1.250" ile "1,25"
       * ayni sayiya cozuluyor ve hangisinin kastedildigi KURALLA
       * ANLASILAMAZ -- tek ayirici var, ikisi de gecerli bir yazim.
       * Tahmin etmek yanlis: 1,250 mm kalinlik da gercek bir deger.
       *
       * Bu yuzden reddetmek ya da tahmin etmek yerine ANLADIGI DEGER
       * aninda gosteriliyor: "1.250" yazan kullanici altinda
       * "1,25 olarak okunacak" gorup hatayi fark ediyor. Sessiz veri
       * bozulmasini onleyen sey bu -- kural degil, gorunurluk.
       *
       * Yalnizca yazilan metinle okunan deger AYRISTIGINDA doluyor,
       * yani dogru yazimda hic gorunmuyor.
       */
      okunan: { en: "", boy: "", kalinlik: "" },
      yeni: { firma: false, urun: false, en: false, boy: false, kalinlik: false },

      kaydediyor: false,
    }
  },

  /*
   * created() DEGIL mounted(): yalnizca mevcut kaydi forma yerlestiriyor,
   * sunucuda calismasina gerek yok. (Form her zaman bir <Dialog> icinde,
   * yani SSR'da hic mount edilmiyor; yine de dogru kanca bu.)
   */
  mounted() {
    this.formuDoldur()
  },

  watch: {
    /* Dialog ayni bilesen ornegiyle yeniden aciliyorsa (duzenle -> yeni)
       form icerigi de degismeli. */
    kayit() {
      this.formuDoldur()
    },
  },

  methods: {
    /* PrimeVue 4 AutoComplete @input -> InputEvent; metne indirge. */
    metin(event) {
      if (typeof event === "string") return event
      return (event && event.target && event.target.value) || ""
    },

    /*
     * Yazilan metin ile okunan sayi ayrisiyorsa ipucunu doldur.
     *
     * Karsilastirma AYIRICI FARKINI YOK SAYIYOR: once virgul noktaya
     * cevriliyor, sonra okunan sayinin metni ile kiyaslaniyor. Boylece
     * nokta/virgul tercihi ipucu URETMIYOR ("20.3" ve "20,3" ikisi de
     * sessiz), ama anlam degistiren her sey uretiyor:
     *     "1.250" -> 1,25      (binlik ayirici sanilan sey)
     *     "1.234,5" -> 1,234   (iki ayirici, ikincisi atiliyor)
     *     "20cm" -> 20         (parseFloat sondaki metni yok sayiyor)
     */
    okunanGuncelle(alan, yazi) {
      const ham = String(yazi ?? "").trim()
      if (!ham) {
        this.okunan[alan] = ""
        return
      }

      const n = this.sayi(ham)
      if (n === null) {
        this.okunan[alan] = ""
        return
      }

      const hamNokta = ham.replace(",", ".")
      this.okunan[alan] = hamNokta === String(n) ? "" : this.sayiBicimle(n)
    },

    /* Ekranda virgullu gosteriliyor -- form genelindeki yazim bu. */
    sayiBicimle(n) {
      return String(n).replace(".", ",")
    },

    /*
     * IKI AYIRICI = CELISKILI GIRDI.
     * "1.234,5" ya da "1,234,5" gibi girdilerde ikinci ayirici ve
     * sonrasi sessizce ATILIYOR (parseFloat). Burada tespit edilip
     * reddediliyor; tek ayiricili "1.250" ise kuralla anlasilamadigi
     * icin reddedilmiyor, okunan deger gosteriliyor (bkz. `okunan`).
     */
    belirsizMi(yazi) {
      const ham = String(yazi ?? "").trim()
      return (ham.match(/[.,]/g) || []).length > 1
    },

    sayi(deger) {
      if (deger === null || deger === undefined || deger === "") return null
      const n = parseFloat(String(deger).replace(",", "."))
      return Number.isFinite(n) ? n : null
    },

    /* Liste kayitlarini AutoComplete'in anlayacagi {ID, etiket} bicimine
       ceviriyor; sayisal listelerde etiket de metin olmak zorunda, yoksa
       optionLabel bos gorunur. */
    secenekler(alan) {
      const tanim = ALANLAR[alan]
      return (this.lookups[alan] || []).map((x) => ({
        ID: x.ID,
        deger: x[tanim.etiketAlani],
        etiket: tanim.sayisal
          ? formatDecimal(x[tanim.etiketAlani])
          : String(x[tanim.etiketAlani] ?? ""),
      }))
    },

    ara(alan, event) {
      const q = (event.query || "").toLocaleLowerCase("tr-TR")
      const hepsi = this.secenekler(alan)
      this.oneriler[alan] = q
        ? hepsi.filter((x) => x.etiket.toLocaleLowerCase("tr-TR").includes(q))
        : hepsi
    },

    secildi(alan, event) {
      const tanim = ALANLAR[alan]
      this.model[tanim.idAlani] = event.value.ID
      this.model[tanim.metinAlani] = event.value.deger
      this.uyari[alan] = false
      this.yeni[alan] = false
      /* Listeden secilen degerde yazim belirsizligi YOK. */
      if (tanim.sayisal) this.okunan[alan] = ""
      if (alan === "en" || alan === "boy") this.m2Hesapla()
    },

    /*
     * ELLE YAZILDI.
     *
     * Id SIFIRLANIYOR: kullanici secilmis bir degerin uzerine yazmaya
     * basladiginda eski id hala duruyorsa, kayit yazilan yeni metni
     * DEGIL o eski kaydi kullanirdi -- sessiz yanlis veri.
     *
     * Karsilastirma SAYISAL alanlarda SAYI uzerinden: "20,3" ile "20.30"
     * ayni deger ama metin olarak farkli; metin karsilastirmasi "zaten
     * var" uyarisini kacirirdi.
     */
    yazildi(alan, event) {
      const tanim = ALANLAR[alan]
      const yazi = this.metin(event)

      this.model[tanim.idAlani] = null
      this.model[tanim.metinAlani] = yazi

      if (tanim.sayisal) this.okunanGuncelle(alan, yazi)

      if (!yazi.trim()) {
        this.uyari[alan] = false
        this.yeni[alan] = false
        if (alan === "en" || alan === "boy") this.m2Hesapla()
        return
      }

      const liste = this.lookups[alan] || []
      let varMi
      if (tanim.sayisal) {
        const n = this.sayi(yazi)
        varMi = n !== null && liste.some((x) => this.sayi(x[tanim.etiketAlani]) === n)
      } else {
        const k = yazi.trim().toLocaleLowerCase("tr-TR")
        varMi = liste.some(
          (x) => String(x[tanim.etiketAlani] ?? "").trim().toLocaleLowerCase("tr-TR") === k,
        )
      }

      this.uyari[alan] = varMi
      this.yeni[alan] = !varMi

      if (alan === "en" || alan === "boy") this.m2Hesapla()
    },

    /*
     * M2 = Adet x En x Boy / 10000  (cm x cm -> m2)
     *
     * Parcalardan biri sayi degilse SIFIR yaziyor, NaN degil -- bu
     * projede bir NaN hatasi birebir yasandi (selection/input/Form.vue:
     * alan temizlenince kutuda "NaN" goruluyordu).
     *
     * En/Boy degeri once SECILI nesneden, yoksa yazilan metinden
     * okunuyor: kullanici listeden secmis de olabilir, yeni deger
     * yaziyor da olabilir.
     */
    m2Hesapla() {
      const en = this.sayi(this.model.En)
      const boy = this.sayi(this.model.Boy)
      const adet = this.sayi(this.model.Adet)

      this.model.M2 =
        en === null || boy === null || adet === null
          ? 0
          : Number(((en * boy * adet) / 10000).toFixed(2))
    },

    formuDoldur() {
      const k = this.kayit || {}

      /* Kayit forma yerlesirken eski ipuclari kalmasin. */
      this.okunan = { en: "", boy: "", kalinlik: "" }

      this.model = {
        ID: k.ID || 0,
        PaletNo: k.PaletNo || "",
        FirmaId: k.FirmaId ?? null,
        FirmaAdi: k.FirmaAdi || "",
        EnId: k.EnId ?? null,
        En: k.En ?? "",
        BoyId: k.BoyId ?? null,
        Boy: k.Boy ?? "",
        KalinlikId: k.KalinlikId ?? null,
        Kalinlik: k.Kalinlik ?? "",
        UrunId: k.UrunId ?? null,
        UrunBilgisi: k.UrunBilgisi || "",
        Adet: k.Adet ?? null,
        M2: k.M2 ?? null,
        Kullanildi: !!k.Kullanildi,
      }

      this.tarih = k.Tarih ? new Date(k.Tarih) : new Date()

      /* AutoComplete'lere {ID, etiket} verilince alanda etiket gorunur;
         duzenlemede alanlarin dolu acilmasi icin gerekli. */
      for (const alan of Object.keys(ALANLAR)) {
        const tanim = ALANLAR[alan]
        const id = this.model[tanim.idAlani]
        const deger = this.model[tanim.metinAlani]

        this.secili[alan] =
          id && (deger ?? "") !== ""
            ? {
                ID: id,
                deger,
                etiket: tanim.sayisal ? formatDecimal(deger) : String(deger),
              }
            : null

        this.uyari[alan] = false
        this.yeni[alan] = false
      }
    },

    async kaydet() {
      /*
       * ZORUNLU ALANLAR ISTEMCIDE DE KONTROL EDILIYOR.
       * Sunucu da kontrol ediyor (paletGovdeCoz) -- son soz onun, ama
       * kullaniciya hatayi istek gidip gelmeden soylemek daha hizli ve
       * hangi alanin eksik oldugu burada belli.
       */
      const eksik = []
      /*
       * Palet No yalnizca DUZENLEMEDE kontrol ediliyor: yeni kayitta
       * numarayi sunucu veriyor, yani forma bos gelmesi normal.
       */
      if (this.model.ID && !String(this.model.PaletNo || "").trim()) {
        eksik.push("Palet No")
      }
      /*
       * CELISKILI SAYI YAZIMI -- iki ayirici.
       * "1.234,5" gibi girdilerde ikinci ayirici ve sonrasi sessizce
       * atilirdi. Sunucu da ayni kontrolu yapiyor (son soz onun), ama
       * burada yakalamak hangi alanin sorunlu oldugunu soyluyor.
       */
      const celiskili = [
        ["En", this.model.En, this.model.EnId],
        ["Boy", this.model.Boy, this.model.BoyId],
        ["Kalınlık", this.model.Kalinlik, this.model.KalinlikId],
      ]
        .filter(([, yazi, id]) => !id && this.belirsizMi(yazi))
        .map(([ad]) => ad)

      if (celiskili.length) {
        useAppToast().warn(
          `${celiskili.join(", ")} alanında iki ayırıcı var. ` +
            `Ondalık için tek nokta ya da virgül kullanın, binlik ayırıcı kullanmayın.`,
        )
        return
      }

      if (!this.model.FirmaAdi && !this.model.FirmaId) eksik.push("Firma")
      if (!this.model.UrunBilgisi && !this.model.UrunId) eksik.push("Ürün bilgisi")
      if (this.sayi(this.model.En) === null) eksik.push("En")
      if (this.sayi(this.model.Boy) === null) eksik.push("Boy")
      if (this.sayi(this.model.Adet) === null || this.sayi(this.model.Adet) <= 0) {
        eksik.push("Adet")
      }

      if (eksik.length) {
        useAppToast().warn(`Eksik alan(lar): ${eksik.join(", ")}`)
        return
      }

      this.kaydediyor = true
      try {
        const paletStore = usePaletStore()

        const basarili = await paletStore.setPaletSave({
          ...this.model,
          Tarih: toIsoDate(this.tarih),
          KullaniciID: useCookie("userId").value,
        })

        if (basarili) this.$emit("palet_saved_emit")
      } finally {
        this.kaydediyor = false
      }
    },
  },
}
</script>

<style scoped>
/*
 * USTTEN BOSLUK -- FloatLabel ETIKETI KIRPILMASIN.
 *
 * Belirti: "Adet" kutusuna gelince ustundeki yazi kayboluyordu.
 * Sebebi FloatLabel'in calisma bicimi: etiket odaklanmadan once kutunun
 * ICINDE duruyor, odaklanildiginda (ya da deger girildiginde) kutunun
 * USTUNE cikiyor -- yani negatif konuma, kendi satirinin disina. Form
 * Dialog govdesinin en ustunde basladigi icin ilk satirin etiketleri
 * govdenin ust kenarinin disina tasiyor ve kirpiliyordu.
 *
 * Bosluk Dialog'a DEGIL forma veriliyor: Dialog paylasilan bir bilesen,
 * ona dokunmak palet disindaki butun diyaloglari etkilerdi. Burada
 * durmasi ayni zamanda dogru yer -- kirpilmanin sebebi formun ilk
 * satirindaki FloatLabel'lar.
 *
 * 0.75rem: etiket kucultulmus haliyle yaklasik 0.65rem yukseklikte
 * (PrimeVue etiketi 0.85 oraninda kuculttup -0.9rem kaydiriyor), yani
 * bu bosluk tasma payini tam kapatiyor ve formda gereksiz bir aralik
 * birakmiyor.
 */
.pf {
  padding-top: 0.75rem;
}

/*
 * Girdiler sutunu DOLDURUYOR.
 * `p-fluid` KULLANILMIYOR: o sinif PrimeVue 3'un kendi CSS'indeydi ve
 * PrimeVue 4'te kaldirildi (PrimeFlex'te hic yok) -- sablonda durmasi
 * yanlis bir guven verirdi. Sarmalayicilar da gerekli: AutoComplete,
 * InputNumber ve DatePicker girdinin etrafina kendi kabini koyuyor.
 */
.pf :deep(.p-floatlabel),
.pf :deep(.p-autocomplete),
.pf :deep(.p-inputnumber),
.pf :deep(.p-datepicker),
.pf :deep(.p-inputtext) {
  width: 100%;
}

.pf-uyari,
.pf-yeni,
.pf-not {
  display: inline-flex;
  gap: 0.25rem;
  align-items: center;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  line-height: 1.3;
}

/* "Zaten var" bir HATA DEGIL, bilgi: kullanici ayni degeri tekrar
   yaziyor, kayit da calisiyor (mevcut kayda baglaniyor). O yuzden
   kirmizi degil amber. */
.pf-uyari {
  color: #92400e;
  font-weight: 600;
}

.pf-yeni {
  color: #0f766e;
  font-weight: 600;
}

.pf-not {
  color: #6b7280;
}

/* Durum: salt BILGI (eylem listede). O yuzden dugme gibi degil, yazi
   gibi duruyor -- tiklanabilir izlenimi vermesin. */
.pf-durum {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;

  min-height: 42px;
  margin: 0;

  font-size: 0.9rem;
  color: #374151;
}

.pf-durum__ad {
  font-weight: 700;
}

.pf-durum__not {
  font-size: 0.78rem;
  color: #6b7280;
}

/* Hesaplanan alan: kapali oldugu belli olsun ama "bozuk" gorunmesin. */
.pf-hesaplanan :deep(.p-inputtext) {
  font-weight: 700;
  color: #2c3e50;
  background-color: #f8f9fa;
}

.pf-dugmeler {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1.25rem;
}
</style>
