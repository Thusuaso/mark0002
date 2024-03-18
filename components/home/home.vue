<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Earnings (Monthly) Card Example -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary mb-1">
                  Monthly Order (FOB)
                </div>
                <div class="h6 mb-0 font-weight-bold text-gray-800">
                  {{ home.aylikSiparis | formatPriceUsd }}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-calendar fa-2x text-gray-300">{{
                  getMonthDate(new Date().getMonth() + 1)
                }}</i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary mb-1">
                  Annual Order (FOB)
                </div>
                <div class="h6 mb-0 font-weight-bold text-gray-800">
                  {{ home.yillikSiparis | formatPriceUsd }}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-calendar fa-2x text-gray-300">
                  {{ new Date().getFullYear() }}
                  {{ new Date().getMonth() + 1 }} / 12
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary mb-1">
                  Monthly Average (FOB)
                </div>
                <div class="h6 mb-0 font-weight-bold text-gray-800">
                  {{ home.ortalamaSiparis | formatPriceUsd }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary mb-1">
                  Annual Forecast (FOB)
                </div>
                <div class="h6 mb-0 font-weight-bold text-gray-800">
                  {{ home.tahminiYillikSiparis | formatPriceUsd }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary mb-1">
                  Monthly Shipment (DDP)
                </div>
                <div class="h6 mb-0 font-weight-bold text-gray-800">
                  {{ home.aylikYukleme | formatPriceUsd }}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-calendar fa-2x text-gray-300">{{
                  getMonthDate(new Date().getMonth() + 1)
                }}</i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-1">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary mb-1">
                  Annual Shipment (DDP)
                </div>
                <div class="h6 mb-0 font-weight-bold text-gray-800">
                  {{ home.yillikYukleme | formatPriceUsd }}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-calendar fa-2x text-gray-300">
                  {{ new Date().getFullYear() }}
                  {{ new Date().getMonth() + 1 }} / 12
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary mb-1">
                  Shipment Average Monthly (DDP)
                </div>
                <div class="h6 mb-0 font-weight-bold text-gray-800">
                  {{ home.ortalamaYukleme | formatPriceUsd }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary mb-1">
                  Annual Shipment Forecast (DDP)
                </div>
                <div class="h6 mb-0 font-weight-bold text-gray-800">
                  {{ home.tahminiYillikYukleme | formatPriceUsd }}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Chart type="bar" :data="home.chartOne" :options="chartOptions" class="h-30rem" />
  </div>
</template>
<script>
export default {
  computed: {},
  data() {
    return {
      chartOptions: {
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
                weight: 500,
              },
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: "black",
            },
            grid: {
              color: "gray",
              drawBorder: false,
            },
          },
        },
      },
    };
  },
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getMonthDate(month) {
      const monthList = {
        1: "Ocak",
        2: "Şubat",
        3: "Mart",
        4: "Nisan",
        5: "Mayıs",
        6: "Haziran",
        7: "Temmuz",
        8: "Ağustos",
        9: "Eylül",
        10: "Ekim",
        11: "Kasım",
        12: "Aralık",
      };
      return monthList[month];
    },
  },
};
</script>
<style scoped>
.customColumn {
  width: 24%;
  height: 100px;
  margin: auto;
  margin-right: 5px;
  padding: 0px;
  vertical-align: center;
  text-align: center;
  text-decoration: none;
  border: 1px solid gray;
  border-radius: 10px;
}
</style>
