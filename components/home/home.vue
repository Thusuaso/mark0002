<template>
  <div class="container-fluid">
    <div class="row" v-show="userId != 48">
      <!-- Earnings (Monthly) Card Example -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-primary mb-1">Monthly Order (FOB)</div>
                <div class="h6 mb-0 text-gray-800">
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
                <div class="text-primary mb-1">Annual Order (FOB)</div>
                <div class="h6 mb-0 text-gray-800">
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
                <div class="text-primary mb-1">Monthly Average (FOB)</div>
                <div class="h6 mb-0 text-gray-800">
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
                <div class="text-primary mb-1">Annual Forecast (FOB)</div>
                <div class="h6 mb-0 text-gray-800">
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
                <div class="text-primary mb-1">Monthly Shipment (DDP)</div>
                <div class="h6 mb-0 text-gray-800">
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
                <div class="text-primary mb-1">Annual Shipment (DDP)</div>
                <div class="h6 mb-0 text-gray-800">
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
                <div class="text-primary mb-1">Shipment Average Monthly (DDP)</div>
                <div class="h6 mb-0 text-gray-800">
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
                <div class="text-primary mb-1">Annual Shipment Forecast (DDP)</div>
                <div class="h6 mb-0 text-gray-800">
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
    <div class="row m-auto text-center" v-show="userId != 48">
      <div class="col">
        <Card>
          <template #header>
            <h3>Monthly Shipped Report</h3>
            
          </template>

          <template #content>
            <Chart type="bar" :data="home.chartOne" :options="chartOptions" style="height:550px;width: 100%;" />
          </template>

      </Card>




      </div>
      <div class="col">
        <Card>
          <template #header>
            <h3>Shipped by Marketing Report</h3>
            
          </template>

          <template #content>
            <Chart type="doughnut" :data="home.chartCustomerShipped" :options="chartOptionsTwo" style="height:550px;width: 100%;" />
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
            <Chart type="bar" :data="home.chartProducts" :options="chartOptionsThree" style="height:550px;width: 100%;" />
          </template>

      </Card>

      </div>
      <div class="col" v-show="userId != 48">
        <Card>
          <template #header>
            <h3>Monthly Offers Report</h3>
            
          </template>

          <template #content>
            <Chart type="bar" :data="home.chartOffers" :options="chartOptions" style="height:550px;width: 100%;" />
          </template>

      </Card>
      </div>

    </div>
    <div class="row text-center m-auto">
      <div class="col-sm-6">
        <Card>
          <template #header>
            <h3>{{ new Date().getFullYear() }} Supplier Cost</h3>
            
          </template>

          <template #content>
            <DataTable :value="home.supplierCostList" scrollable scrollHeight="500px">

<Column field="FirmaAdi" header="Supplier"></Column>
<Column field="Total" header="Total">
  <template #body="slotProps">
    {{ slotProps.data.Total | formatPriceUsd }}
  </template>
  <template #footer>  
      {{ totalSupplier | formatPriceUsd }}
    </template>
</Column>

</DataTable>
          </template>

      </Card>

      </div>
      <div class="col-sm-6"></div>

    </div>




  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import Cookies from "js-cookie";

export default {
  computed: {
    ...mapGetters(['getUserId'])
  },
  data() {
    return {
      totalSupplier:0,
      userId:null,
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
                weight: 100,
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
      chartOptionsTwo:{
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: 'grey'
                }
            }
        }
      },
      chartOptionsThree:{
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            legend: {
                labels: {
                    color: 'grey'
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: 'grey'
                },
                grid: {
                    color: 'grey'
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: 'grey'
                },
                grid: {
                    color: 'grey'
                }
            }
        }
      }
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
  created(){
    this.userId = Cookies.get('userId');


  },
  mounted(){
    
  },
  watch: {
    home(){
      this.home.supplierCostList.forEach(x=>{
          this.totalSupplier += x.Total;
        });
    }
  }
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
