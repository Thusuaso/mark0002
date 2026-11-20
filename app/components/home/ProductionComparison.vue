<template>
  <DataTable
    :value="rows"
    class="p-datatable-sm table-dense pc-table"
    showGridlines
  >
    <!--
      IKI KATLI BASLIK. Birinci kat birimi (M2 / Piece / Mt), ikinci kat
      yili soyluyor. Tek katli olsaydi basliklar "M2 2025", "M2 2026",
      "Piece 2025"... diye alti kez tekrar ederdi ve hangi iki kolonun
      birbiriyle karsilastirildigi ancak okunarak anlasilirdi.
    -->
    <ColumnGroup type="header">
      <Row>
        <Column header="Month" :rowspan="2" headerClass="pc-month" />
        <Column header="M2" :colspan="2" headerClass="pc-grup" />
        <Column header="Piece" :colspan="2" headerClass="pc-grup" />
        <Column header="Mt" :colspan="2" headerClass="pc-grup" />
      </Row>
      <Row>
        <Column :header="yilBasligi(previousYear)" headerClass="pc-yil" />
        <Column :header="yilBasligi(currentYear)" headerClass="pc-yil pc-yil--bu" />
        <Column :header="yilBasligi(previousYear)" headerClass="pc-yil" />
        <Column :header="yilBasligi(currentYear)" headerClass="pc-yil pc-yil--bu" />
        <Column :header="yilBasligi(previousYear)" headerClass="pc-yil" />
        <Column :header="yilBasligi(currentYear)" headerClass="pc-yil pc-yil--bu" />
      </Row>
    </ColumnGroup>

    <Column field="ay" header="Month" bodyClass="pc-month">
      <template #body="{ data }">{{ data.adi }}</template>
    </Column>

    <!--
      Alti hucre tek bir dongude uretilmiyor: PrimeVue Column'lari
      ColumnGroup'taki basliklarla SIRAYA gore eslestiriyor, yani
      kolon sayisi ve sirasi sabit kalmali. Tekrari azaltmak icin
      hucre icerigi ortak bir sablona (pc-cell) degil, ortak bir
      bicimlendiriciye (sayi / fark) baglandi.
    -->
    <template v-for="birim in BIRIMLER" :key="birim.alan">
      <Column bodyClass="pc-num">
        <template #body="{ data }">
          {{ sayi(data.gecen[birim.alan]) }}
        </template>
      </Column>

      <!--
        BU YILIN HUCRESI AYNI ZAMANDA KARSILASTIRMA.
        Ayri bir "fark" kolonu eklemek tabloyu alti yerine dokuz veri
        kolonuna cikariyordu; fark, degerin yanindaki kucuk bir okla
        ayni hucrede duruyor.

        RENK TEK BASINA TASIYICI DEGIL: ok yonu (yukari/asagi) ve
        yuzde yazisi da orada, yani renk gormeyen biri icin de bilgi
        tam.
      -->
      <Column bodyClass="pc-num pc-num--bu">
        <template #body="{ data }">
          <span class="pc-deger">{{ sayi(data.bu[birim.alan]) }}</span>
          <span
            v-if="farkVar(data, birim.alan)"
            class="pc-fark"
            :class="farkSinifi(data, birim.alan)"
          >
            <i
              class="pi"
              :class="fark(data, birim.alan) > 0 ? 'pi-arrow-up' : 'pi-arrow-down'"
              aria-hidden="true"
            />
            {{ yuzde(data, birim.alan) }}
          </span>
        </template>
      </Column>
    </template>

    <ColumnGroup type="footer">
      <Row>
        <Column footer="Total" footerClass="pc-month" />
        <Column :footer="sayi(toplam.gecen.M2)" footerClass="pc-num" />
        <Column :footer="sayi(toplam.bu.M2)" footerClass="pc-num pc-num--bu" />
        <Column :footer="sayi(toplam.gecen.Piece)" footerClass="pc-num" />
        <Column :footer="sayi(toplam.bu.Piece)" footerClass="pc-num pc-num--bu" />
        <Column :footer="sayi(toplam.gecen.Mt)" footerClass="pc-num" />
        <Column :footer="sayi(toplam.bu.Mt)" footerClass="pc-num pc-num--bu" />
      </Row>
    </ColumnGroup>
  </DataTable>
</template>

<script>
/*
 * components/home/ProductionComparison.vue  --  <HomeProductionComparison>
 *
 * Ana sayfanin userId 48 panelinde: aylik uretim, BU YIL ve GECEN YIL
 * yan yana, uc birimde (m2 / piece / mt).
 *
 * [!] BIRIM KOLONU `UrunBirimID`, `UretimTurID` DEGIL -- ikisinin
 * ayrimi veriyi ureten ucun basinda yaziyor
 * (api/index.js, /home/production/year-comparison).
 *
 * ON ikI SATIR HER ZAMAN BASILIYOR (sunucudan gelmeyen ay = sifir):
 * uretim olmayan ay tablodan DUSSEYDI aylar kayar ve iki yilin ayni
 * satirda hizalandigi izlenimi bozulurdu -- ustelik "o ay uretim
 * olmadi" ile "o ay listede yok" ayirt edilemezdi.
 */
export default {
  props: {
    /* Govde api/index.js /home/production/year-comparison ucundan. */
    data: {
      type: Object,
      default: () => ({ list: [], currentYear: 0, previousYear: 0 }),
    },
  },

  data() {
    return {
      /* Kolon sirasi BU DIZIDEN geliyor; ColumnGroup basliklarinin
         sirasi da ayni olmak zorunda (bkz. sablondaki not). */
      BIRIMLER: [
        { alan: "M2", ad: "M2" },
        { alan: "Piece", ad: "Piece" },
        { alan: "Mt", ad: "Mt" },
      ],

      AY_ADLARI: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    }
  },

  computed: {
    currentYear() {
      return Number(this.data?.currentYear) || 0
    },

    previousYear() {
      return Number(this.data?.previousYear) || 0
    },

    /*
     * Duz (yil, ay) satirlarini 12 ayrik satira ceviriyor.
     * Sunucudan gelmeyen her hucre sifir kaliyor.
     */
    rows() {
      const bos = () => ({ M2: 0, Piece: 0, Mt: 0 })

      const aylar = this.AY_ADLARI.map((adi, i) => ({
        ay: i + 1,
        adi,
        bu: bos(),
        gecen: bos(),
      }))

      for (const satir of this.data?.list || []) {
        const ay = aylar[Number(satir.Ay) - 1]
        if (!ay) continue

        const yil = Number(satir.Yil)
        const hedef =
          yil === this.currentYear
            ? ay.bu
            : yil === this.previousYear
              ? ay.gecen
              : null
        if (!hedef) continue

        for (const birim of this.BIRIMLER) {
          hedef[birim.alan] = this.num(satir[birim.alan])
        }
      }

      return aylar
    },

    toplam() {
      const t = { bu: { M2: 0, Piece: 0, Mt: 0 }, gecen: { M2: 0, Piece: 0, Mt: 0 } }
      for (const satir of this.rows) {
        for (const birim of this.BIRIMLER) {
          t.bu[birim.alan] += satir.bu[birim.alan]
          t.gecen[birim.alan] += satir.gecen[birim.alan]
        }
      }
      return t
    },
  },

  methods: {
    num(value) {
      const n = Number(value)
      return Number.isFinite(n) ? n : 0
    },

    /* 0 degerler BOS gosteriliyor: 12 ayin yarisi "0,00" ile dolu bir
       tablo okunmuyor, dolu aylar one ciksin. */
    sayi(value) {
      return this.num(value) ? formatDecimal(value) : "—"
    },

    /* Yil 0 iken (veri gelmeden) baslik bos: tahmini bir yil yazip
       sonra duzeltmek bir an icin YANLIS yil gostermek olurdu. */
    yilBasligi(yil) {
      return yil ? String(yil) : ""
    },

    fark(satir, alan) {
      return satir.bu[alan] - satir.gecen[alan]
    },

    /*
     * Fark yalnizca IKI YIL DA DOLUYSA gosteriliyor.
     *
     * Gecen yil 0 iken yuzde TANIMSIZ (sifira bolme) ve "%∞" ya da
     * "%100 artis" demek yanlis olurdu -- karsilastirilacak bir taban
     * yok. O durumda yalnizca bu yilin degeri yaziyor.
     *
     * Bu yil 0 ise de ok gosterilmiyor: o ay henuz gelmemis olabilir
     * (Kasim'da Aralik satiri bos) ve "%100 dusus" diye okunmasi
     * yanlis olurdu.
     */
    farkVar(satir, alan) {
      return satir.gecen[alan] > 0 && satir.bu[alan] > 0
    },

    yuzde(satir, alan) {
      const oran = (this.fark(satir, alan) / satir.gecen[alan]) * 100
      const isaret = oran > 0 ? "+" : ""
      return `${isaret}${oran.toFixed(0)}%`
    },

    farkSinifi(satir, alan) {
      return this.fark(satir, alan) > 0 ? "pc-fark--arti" : "pc-fark--eksi"
    },
  },
}
</script>

<style scoped>
.pc-table :deep(th),
.pc-table :deep(td) {
  text-align: center;
}

.pc-table :deep(.pc-month) {
  text-align: left;
  font-weight: 600;
  white-space: nowrap;
}

/* Birim basligi (ust kat) -- iki yili kapsayan baslik. */
.pc-table :deep(.pc-grup) {
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.pc-table :deep(.pc-yil) {
  font-size: 0.78rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #6b7280;
}

/* Bu yil: hem baslikta hem hucrede hafif zemin. Iki yil yan yana
   duruyor ve hangisinin "simdi" oldugu bir bakista belli olmali. */
.pc-table :deep(.pc-yil--bu) {
  color: #111827;
  background: #f1f5f9;
}

.pc-table :deep(.pc-num) {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.pc-table :deep(.pc-num--bu) {
  background: #f8fafc;
}

.pc-deger {
  font-weight: 600;
}

/* Fark rozeti: degerin ALTINDA degil YANINDA ve kucuk -- satir
   yuksekligini artirmasin. */
.pc-fark {
  display: inline-flex;
  gap: 0.15rem;
  align-items: center;

  margin-inline-start: 0.35rem;

  font-size: 0.7rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.pc-fark .pi {
  font-size: 0.6rem;
}

.pc-fark--arti {
  color: #0f766e;
}

.pc-fark--eksi {
  color: #b91c1c;
}
</style>
