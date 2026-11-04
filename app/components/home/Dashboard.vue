<template>
  <div class="container-fluid" v-if="userId != 48">
    <div class="row">
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card shadow h-100 py-2">
          <div class="card-body">
            <div class="row g-0 align-items-center">
              <div class="col me-2">
                <div class="text-primary mb-1">Monthly Order (FOB)</div>
                <div class="h6 mb-0">
                  {{ formatPriceUsd(home.aylikSiparis) }}
                </div>
              </div>
              <div class="col-auto">
                <i class="pi pi-calendar">
                  {{ monthToString(currentMonth) }}
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card shadow h-100 py-2">
          <div class="card-body">
            <div class="row g-0 align-items-center">
              <div class="col me-2">
                <div class="text-primary mb-1">Annual Order (FOB)</div>
                <div class="h6 mb-0">
                  {{ formatPriceUsd(home.yillikSiparis) }}
                </div>
              </div>
              <div class="col-auto">
                <i class="pi pi-calendar">
                  {{ currentYear }} {{ currentMonth }} / 12
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card shadow h-100 py-2">
          <div class="card-body">
            <div class="row g-0 align-items-center">
              <div class="col me-2">
                <div class="text-primary mb-1">Monthly Average (FOB)</div>
                <div class="h6 mb-0">
                  {{ formatPriceUsd(home.ortalamaSiparis) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card shadow h-100 py-2">
          <div class="card-body">
            <div class="row g-0 align-items-center">
              <div class="col me-2">
                <div class="text-primary mb-1">Annual Forecast (FOB)</div>
                <div class="h6 mb-0">
                  {{ formatPriceUsd(home.tahminiYillikSiparis) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card shadow h-100 py-2">
          <div class="card-body">
            <div class="row g-0 align-items-center">
              <div class="col me-2">
                <div class="text-primary mb-1">Monthly Shipment (DDP)</div>
                <div class="h6 mb-0">
                  {{ formatPriceUsd(home.aylikYukleme) }}
                </div>
              </div>
              <div class="col-auto">
                <i class="pi pi-calendar">
                  {{ monthToString(currentMonth) }}
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card shadow h-100 py-1">
          <div class="card-body">
            <div class="row g-0 align-items-center">
              <div class="col me-2">
                <div class="text-primary mb-1">Annual Shipment (DDP)</div>
                <div class="h6 mb-0">
                  {{ formatPriceUsd(home.yillikYukleme) }}
                </div>
              </div>
              <div class="col-auto">
                <i class="pi pi-calendar">
                  {{ currentYear }} {{ currentMonth }} / 12
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card shadow h-100 py-2">
          <div class="card-body">
            <div class="row g-0 align-items-center">
              <div class="col me-2">
                <div class="text-primary mb-1">
                  Shipment Average Monthly (DDP)
                </div>
                <div class="h6 mb-0">
                  {{ formatPriceUsd(home.ortalamaYukleme) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card shadow h-100 py-2">
          <div class="card-body">
            <div class="row g-0 align-items-center">
              <div class="col me-2">
                <div class="text-primary mb-1">
                  Annual Shipment Forecast (DDP)
                </div>
                <div class="h6 mb-0">
                  {{ formatPriceUsd(home.tahminiYillikYukleme) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row m-auto text-center">
      <div class="col">
        <Card>
          <template #header>
            <h3>Monthly Shipped Report</h3>
          </template>
          <template #content>
            <Chart
              type="bar"
              :data="home.chartOne"
              :options="chartOptions"
              style="height: 550px; width: 100%"
            />
          </template>
        </Card>
      </div>
      <div class="col">
        <Card>
          <template #header>
            <h3>Shipped by Marketing Report</h3>
          </template>
          <template #content>
            <Chart
              type="doughnut"
              :data="home.chartCustomerShipped"
              :options="chartOptionsTwo"
              style="height: 550px; width: 100%"
            />
          </template>
        </Card>
      </div>
    </div>

    <div class="row m-auto text-center">
      <div class="col">
        <Card>
          <template #header>
            <h3>Monthly Production Report</h3>
          </template>
          <template #content>
            <Chart
              type="bar"
              :data="home.chartProducts"
              :options="chartOptionsThree"
              style="height: 550px; width: 100%"
            />
          </template>
        </Card>
      </div>
      <div class="col">
        <Card>
          <template #header>
            <h3>Monthly Offers Report</h3>
          </template>
          <template #content>
            <Chart
              type="bar"
              :data="home.chartOffers"
              :options="chartOptions"
              style="height: 550px; width: 100%"
            />
          </template>
        </Card>
      </div>
    </div>

    <div class="row text-center m-auto">
      <div class="col-sm-4">
        <Card>
          <template #header>
            <h3>{{ currentYear }} Supplier Cost</h3>
          </template>
          <template #content>
            <DataTable
              :value="home.supplierCostList"
              scrollable
              scrollHeight="500px"
            >
              <Column field="FirmaAdi" header="Supplier" />
              <Column field="Total" header="Total">
                <template #body="slotProps">
                  {{ formatPriceUsd(slotProps.data.Total) }}
                </template>
                <template #footer>
                  {{ formatPriceUsd(totalSupplierCost) }}
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
      </div>

      <div class="col-sm-4">
        <Card>
          <template #header>
            <h3>Aylık Üretim</h3>
          </template>
          <template #content>
            <DataTable :value="stocks.monthly_stock">
              <Column field="MONTH" header="Ay" />
              <Column field="SqmMiktar" header="M2">
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.SqmMiktar) }}
                </template>
              </Column>
              <Column field="KasaAdedi" header="Kasa Adedi" />
            </DataTable>
          </template>
        </Card>
      </div>

      <div class="col-sm-4">
        <Card>
          <template #header>
            <h3>Mekmer Anlık Stok</h3>
          </template>
          <template #content>
            <DataTable :value="stocks.current_stock">
              <Column field="Month" header="Ay" />
              <Column field="KasaM2" header="M2">
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.KasaM2) }}
                </template>
              </Column>
              <Column field="KasaAdet" header="Kasa Adedi" />
            </DataTable>
          </template>
        </Card>
      </div>
    </div>
  </div>

  <!--
    userId == 48 icin DAR gorunum: yalnizca uretim tarafi, para birimi
    iceren hicbir kart/grafik yok. Nuxt 2'de de boyleydi; bu bir
    yetkilendirme kisitiydi, bicimsel bir tercih degil -- bu yuzden
    birebir korundu.
  -->
  <div class="container-fluid" v-else-if="userId == 48">
    <div class="row m-auto text-center">
      <div class="col">
        <Card>
          <template #header>
            <h3>Monthly Production Report</h3>
          </template>
          <template #content>
            <Chart
              type="bar"
              :data="home.chartProducts"
              :options="chartOptionsThree"
              style="height: 550px; width: 100%"
            />
          </template>
        </Card>
      </div>
      <div class="col">
        <Card>
          <template #header>
            <h3>Aylık Üretim</h3>
          </template>
          <template #content>
            <DataTable :value="stocks.monthly_stock">
              <Column field="MONTH" header="Ay" />
              <Column field="SqmMiktar" header="M2">
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.SqmMiktar) }}
                </template>
              </Column>
              <Column field="KasaAdedi" header="Kasa Adedi" />
            </DataTable>
          </template>
        </Card>
      </div>
      <div class="col">
        <Card>
          <template #header>
            <h3>Mekmer Aylık Sevk</h3>
          </template>
          <template #content>
            <DataTable :value="stocks.mekmer_shipped">
              <Column field="Month" header="Ay" />
              <Column field="Satis" header="Satış">
                <template #body="slotProps">
                  {{ formatPriceUsd(slotProps.data.Satis) }}
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
      </div>
      <div class="col">
        <Card>
          <template #header>
            <h3>Mekmer Anlık Stok</h3>
          </template>
          <template #content>
            <DataTable :value="stocks.current_stock">
              <Column field="Month" header="Ay" />
              <Column field="KasaM2" header="M2">
                <template #body="slotProps">
                  {{ formatDecimal(slotProps.data.KasaM2) }}
                </template>
              </Column>
              <Column field="KasaAdet" header="Kasa Adedi" />
            </DataTable>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "~/stores/auth"

/*
 * chart.js 4 NOTU -- grid.drawBorder KALDIRILDI.
 *
 * Nuxt 2 projesi chart.js 3.9.1 kullaniyordu ve asagidaki secenekler
 * `grid: { drawBorder: false }` yaziyordu. chart.js 4.0 bu secenegi
 * kaldirdi; yerine ayri bir `border` bolumu geldi:
 *     grid: { drawBorder: false }   ->   border: { display: false }
 * Eski ad 4.x'te SESSIZCE yok sayilir (hata vermez), yani birebir
 * kopyalanmis olsa eksen cizgisi geri gelir ve kimse nedenini anlamaz.
 */
const chartOptions = {
  maintainAspectRatio: false,
  aspectRatio: 0.8,
  plugins: {
    legend: {
      labels: {
        color: "grey",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "black",
        font: {
          weight: 100,
        },
      },
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      ticks: {
        color: "black",
      },
      grid: {
        color: "gray",
      },
      border: {
        display: false,
      },
    },
  },
}

const chartOptionsTwo = {
  maintainAspectRatio: false,
  aspectRatio: 0.8,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        color: "grey",
      },
    },
  },
}

const chartOptionsThree = {
  maintainAspectRatio: false,
  aspectRatio: 1,
  plugins: {
    /*
     * Nuxt 2'de bu blok `plugins: { tooltips: {...} }` idi -- COGUL.
     * chart.js'te secenegin adi TEKIL `tooltip`; `tooltips` adi chart.js
     * 2'den kalma ve 3.x'te zaten kaldirilmisti. Yani bu ayar uretimde
     * HIC UYGULANMIYORDU: bu grafik yigili (stacked) oldugu halde
     * tooltip tek bir cubugu gosteriyordu, ayni ayin ucunu birlikte
     * degil. Dogru adla yazildi.
     */
    tooltip: {
      mode: "index",
      intersect: false,
    },
    legend: {
      labels: {
        color: "grey",
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      ticks: {
        color: "grey",
      },
      grid: {
        color: "grey",
      },
    },
    y: {
      stacked: true,
      ticks: {
        color: "grey",
      },
      grid: {
        color: "grey",
      },
    },
  },
}

export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
    stocks: {
      type: Object,
      required: true,
    },
    totalSupplierCost: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    authStore() {
      return useAuthStore()
    },
    userId() {
      return this.authStore.getUserId
    },

    /*
     * Nuxt 2'de sablon `new Date()` cagrilarini DOGRUDAN iceriyordu --
     * sekiz kartta ve bir baslikta toplam dokuz kez. Her yeniden render
     * yeni bir Date kuruyordu; dogru calisiyordu ama her birini tekrar
     * yazmak gerekiyordu. Tek yerde toplandi.
     */
    currentYear() {
      return new Date().getFullYear()
    },
    currentMonth() {
      return new Date().getMonth() + 1
    },
  },

  data() {
    return {
      chartOptions,
      chartOptionsTwo,
      chartOptionsThree,
    }
  },
}
</script>

<!--
  components/home/Dashboard.vue   (Nuxt 2: components/home/home.vue)

  Etiket adi <HomeDashboard> -- Nuxt auto-import adini DOSYA YOLUNDAN
  uretir. Nuxt 2'deki ad `<home>` idi; components/home/Home.vue olsa
  auto-import adi `HomeHome` olacakti, bu yuzden dosya Dashboard.vue.

  ELLE YAPILAN ZORUNLU DEGISIKLIKLER:

  [x] mapGetters(["getUserId"]) -> computed authStore / userId
      Karsilastirma BILEREK `!=` / `==` kaldi (pilot genelindeki kural;
      bkz. components/order/Table.vue yorumu). auth store'daki userId bir
      CEREZ degeri, yani STRING "48"; `!==` yazilsa kosul her zaman dogru
      olur ve 48 numarali kullanici yetkisi olmayan tum kartlari gorurdu.

  [x] `mekmer_datas` + created() icindeki this.$axios cagrisi KALDIRILDI
      -> `stocks` prop'u, veri stores/home.ts'ten geliyor.
      Gerekcesi: SSR'da created() icindeki async is BEKLENMEZ (bkz.
      pages/index.vue). Ayrica bilesen kendi verisini cekerken sayfa onun
      hazir olup olmadigini bilemiyordu.

  [x] watch: { home() { totalSupplier += ... } } KALDIRILDI
      -> stores/home.ts icindeki getTotalSupplierCost getter'i, prop
      olarak geliyor. Eski kodun iki ayri hatasi ve gerekcesi o
      getter'in basinda yaziyor (birikme + ilk yuklemede hic calismamasi).

  [x] `import Cookies from "js-cookie"` KALDIRILDI -- dosyada hic
      KULLANILMIYORDU (olu import; js-cookie pilota kurulmadi).

  [x] methods.getMonthDate KALDIRILDI -> utils/formatters.ts icindeki
      monthToString. Ikisi ayni seyi yapiyordu (1 -> "Ocak" ... 12 ->
      "Aralık"); getMonthDate 1 tabanli bir nesne, monthToString 0 tabanli
      bir dizi kullaniyor ama 1..12 icin ciktilari AYNI. Zaten global
      olarak kayitli olan kullanildi (bkz. app/plugins/formatters.ts).

  [x] data.userId KALDIRILDI -- hic yazilmiyordu (null kaliyordu) ve hic
      okunmuyordu; sablon mapGetters'tan gelen getUserId'yi kullaniyordu.

  [x] <style scoped> KALDIRILDI -- icindeki tek kural `.customColumn`
      idi ve bu sinif sablonda HIC GECMIYOR.

  [x] grid.drawBorder -> border.display  (chart.js 4; gerekcesi
      chartOptions'in basinda)

  DUZELTILDI -- NUXT 2'DE SESSIZCE BOZUK OLAN:

  [x] chart.js kurulmamisti. PrimeVue Chart, chart.js'i
      `import('chart.js/auto')` ile DINAMIK cagiriyor ve peerDependency
      olarak BILDIRMIYOR. Paket olmasa dort grafik de hic cizilmez, hata
      da vermez -- sadece bos kalir. `chart.js@4.5.1` eklendi.

  [x] plugins.tooltips -> plugins.tooltip  (gerekcesi chartOptionsThree
      icinde)

  [x] Bootstrap 4 sinif adlari -> Bootstrap 5:
          no-gutters -> g-0        mr-2 -> me-2
      Her iki repo da Bootstrap 5.3.2 vendor'luyor (BS5 bu iki adi
      kaldirdi), yani bu siniflar BUGUN de hicbir sey yapmiyor: kartlarin
      ic bosluklari olmasi gerekenden farkli gorunuyor. Dogru adlara
      cevrildi -- yani bu kartlarin GORUNUMU degisecek.

  KALDIRILDI -- HER IKI REPODA DA TANIMSIZ SINIFLAR (SB Admin 2 temasindan
  kalma; iki repoda da o tema YOK, hicbir CSS dosyasinda tanimli degiller):
  [x] border-left-primary   (kartlarin sol kenar rengi -- hic gorunmuyordu)
  [x] text-gray-800 / text-gray-300

  [x] `fas fa-calendar fa-2x` -> `pi pi-calendar`
      Font Awesome IKI REPODA DA yuklu degil, yani bu ikonlar bugune
      kadar hic gorunmedi; <i> yalnizca ay/yil yazisini tutan bir kutu
      olarak calisiyordu. primeicons zaten yuklu oldugu icin esdegeri
      kullanildi. GORUNUR BIR EKLEME: daha once ikon yoktu, artik var.
      Istenmiyorsa bu uc satirdaki class'i silmek yeterli.

  DIKKAT -- KASITLI OLARAK DEGISTIRILMEDI:
      `aspectRatio` secenegi uc secenek setinde de duruyor ama
      `maintainAspectRatio: false` ile birlikte chart.js onu YOK SAYAR;
      yukseklik :style'daki 550px'ten geliyor. Zararsiz oldugu icin
      birakildi -- silmek davranis degistirmez ama bu dosyanin isi degil.
-->
