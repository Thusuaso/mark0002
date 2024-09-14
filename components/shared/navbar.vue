<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" style="font-size: 100%" data-bs-theme="blue"
   >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">GOZ</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">

          <li class="nav-item" v-if="getAuthorityStatus">
            <nuxt-link to="/selection/input" tag="a" class="nav-link">SELECTION</nuxt-link>
          </li>
          <li class="nav-item" v-if="getAuthorityStatus">
            <nuxt-link to="/operation/cards" tag="a" class="nav-link">PRODUCT CARDS</nuxt-link>
          </li>

          <li class="nav-item" v-if="!getAuthorityStatus">
            <nuxt-link to="/" tag="a" class="nav-link">HOME</nuxt-link>
          </li>
          <li class="nav-item dropdown" v-if="!getAuthorityStatus">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              ORDERS
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/orders/production" class="dropdown-item" tag="a">Production</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/orders/shipped" class="dropdown-item" tag="a">Shipped</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/orders/waiting" class="dropdown-item" tag="a">On Hold</nuxt-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown" v-if="!getAuthorityStatus">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              SALES
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/sales/maintodo" class="dropdown-item" tag="a">Main To Do</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/sales/todo" class="dropdown-item" tag="a">To Do</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/sales/representative" class="dropdown-item" tag="a">Sales & Operation</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/sales/follow" class="dropdown-item" tag="a">Customer Notes</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/sales/bgp" class="dropdown-item" tag="a">BGP Projects</nuxt-link>
              </li>

              <li>
                <nuxt-link to="/sales/consider" class="dropdown-item" tag="a">Points to Consider</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/passwords" class="dropdown-item" tag="a">Passwords</nuxt-link>
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown" v-if="!getAuthorityStatus">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              SELECTION
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/selection/input" class="dropdown-item" tag="a">Entry</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/selection/size" class="dropdown-item" tag="a">Crate Size</nuxt-link>
              </li>
            </ul>
          </li>
          <li class="nav-item" v-if="!getAuthorityStatus">
            <nuxt-link to="/finance" tag="a" class="nav-link">FINANCE</nuxt-link>
          </li>
          <li class="nav-item dropdown" v-if="!getAuthorityStatus">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              OPERATION
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/operation/cards" class="dropdown-item" tag="a">Product Data</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/operation/supplier" class="dropdown-item" tag="a">Suppliers</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/operation/shipment" class="dropdown-item" tag="a">Dispatch</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/operation/uploadform" class="dropdown-item" tag="a">Shipment Form</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/operation/follow" class="dropdown-item" tag="a">Container Tracking</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/operation/unfollow" class="dropdown-item" tag="a">Shipped Containers</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/operation/transport" class="dropdown-item" tag="a">Shipment Costs</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/operation/transportlist" class="dropdown-item" tag="a">Shipment Invoices</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/operation/container" class="dropdown-item" tag="a">FOB Costs</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/operation/containerlist" class="dropdown-item" tag="a">FOB Invoices</nuxt-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown" v-if="!getAuthorityStatus">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              CUSTOMERS
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/customer/mekmar" class="dropdown-item" tag="a">Sale Customers</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/customer/offer" class="dropdown-item" tag="a">Quote Customers</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/customer/bgp" class="dropdown-item" tag="a">BGP Customer</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/customer/fair" class="dropdown-item" tag="a">Expo Customers</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/customer/selection" class="dropdown-item" tag="a">Selection</nuxt-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              MEKMER
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/reports/mekmer/production" class="dropdown-item" tag="a">Production Crates</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/reports/mekmer/stock" class="dropdown-item" tag="a">Stock Report</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/reports/mekmer/mine" class="dropdown-item" tag="a">Quarry Info</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/reports/mekmer/atlanta" class="dropdown-item" tag="a">ATL</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/reports/mekmer/productions" class="dropdown-item" tag="a">Production</nuxt-link>
              </li>

              <li>
                <nuxt-link to="/reports/mekmer/shipped" class="dropdown-item" tag="a">Shipped</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/reports/mekmer/onhold" class="dropdown-item" tag="a">On Hold</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/reports/mekmer/finance" class="dropdown-item" tag="a">Finance</nuxt-link>
              </li>

              <li v-if="getAuthorityStatus">
                <nuxt-link to="/reports/mekmar/forwarding" class="dropdown-item" tag="a">Shipped Crates</nuxt-link>
              </li>
              <li v-if="getAuthorityStatus">
                <nuxt-link to="/reports/mekmer/strips" class="dropdown-item" tag="a">Stripler</nuxt-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown" v-if="!getAuthorityStatus">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              MEKMAR REPORTS
            </a>
            <ul class="dropdown-menu">
              <li v-if="userId == 10 || userId == 47 || userId == 9">
                <nuxt-link to="/reports/mekmar/ayo" class="dropdown-item" tag="a">AYO</nuxt-link>
              </li>
              <li v-if="userId == 10 || userId == 47 || userId == 9">
                <nuxt-link to="/reports/mekmar/ayo-compare" class="dropdown-item" tag="a">AYO Compare</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/reports/mekmar/loading" class="dropdown-item" tag="a">List of Shipments</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/reports/mekmar/forwarding" class="dropdown-item" tag="a">Shipped Crates</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/reports/mekmar/summary" class="dropdown-item" tag="a">Order Summary</nuxt-link>
              </li>
              <li v-if="userId == 10 || userId == 47 || userId == 13">
                <nuxt-link to="/reports/mekmar/mk" class="dropdown-item" tag="a">MK Reports</nuxt-link>
              </li>
              <li v-if="userId == 10 || userId == 47 || userId == 13">
                <nuxt-link to="/reports/mekmar/gu" class="dropdown-item" tag="a">GU Reports</nuxt-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown" v-if="!getAuthorityStatus">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              SAMPLE
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/sample/sample" class="dropdown-item" tag="a">Sample List</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/sample/finance" class="dropdown-item" tag="a">Sample Finance</nuxt-link>
              </li>
            </ul>
          </li>
          <li class="nav-item" v-if="!getAuthorityStatus">
            <nuxt-link to="/offers" tag="a" class="nav-link">QUOTES</nuxt-link>
          </li>
          <li class="nav-item dropdown" v-if="!getAuthorityStatus">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              W. PANEL
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/panel/products/published" class="dropdown-item" tag="a">Products (Published)</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/panel/products/notpublished" class="dropdown-item" tag="a">Products
                  (Unpublished)</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/panel/project" class="dropdown-item" tag="a">Projects</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/panel/products/queue" class="dropdown-item" tag="a">Product Queue</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/panel/users" class="dropdown-item" tag="a">Users</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/panel/usa" class="dropdown-item" tag="a">USA Panel</nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="d-flex" v-show="!getAuthorityStatus">
        <div><Button clas="p-button-danger mr-5" label="Logout" @click="logout" /></div>
        <i v-badge.danger="parseInt(getToDoMainListByUsernameLenght)" class="pi pi-calendar"
          style="font-size: 2rem; cursor: pointer" @click="visibleRight = true" />

        <Sidebar :visible.sync="visibleRight" header="Right Sidebar" position="right"
          class="w-50 md:w-20rem lg:w-30rem">
          <Button type="button" class="p-button-success w-100" label="New" @click="newForm" />
          <todoByUsernameList :list="getToDoMainListByUsername" @to_do_list_selected_emit="toDoListSelected($event)"
            @todo_done_emit="todoDone($event)" />
        </Sidebar>
        <Dialog :visible.sync="to_do_form" header="" modal>
          <todoByUsernameForm :model="model" :users="getUserList" :status="getTodoMainListByUsernameButtonStatus"
            @process="process($event)" @deleteProcess="deleteProcess($event)" />
        </Dialog>
      </div>
    </div>
  </nav>



</template>
<script>
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
import date from "../../plugins/date";
import Menubar from 'primevue/menubar';

export default {
  components:{
    Menubar
  },
  computed: {
    ...mapGetters([
      "getToDoMainListByUsername",
      "getToDoMainListByUsernameLenght",
      "getTodoModel",
      "getUserList",
      "getTodoMainListByUsernameButtonStatus",
      "getAuthorityStatus",
      "isAuthenticated"
    ]),
  },
  data() {
    return {
      visibleRight: false,
      to_do_form: false,
      model: {},
      items: [],
      userId:null,
    };
  },

  created() {
    this.$store.dispatch("setToDoListByUsername", Cookies.get("username"));
    this.userId = Cookies.get("userId");





  },

  methods: {
    logout(){
      if (confirm("Are you sure you want to log out?")) {
        Cookies.remove('mail');
        Cookies.remove('token');
        Cookies.remove('userId');
        Cookies.remove('username');
        localStorage.removeItem('mail');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        this.$router.push('/auth');



      }
    },
    __stringCharacterChange(event) {
      const data = event.split("'");
      let value = "";

      data.forEach((x) => {
        value += x + "''";
      });
      const value2 = value.substring(0, value.length - 2);
      return value2;
    },
    todoDone(event) {
      event.YapildiTarihi = date.dateToString(new Date());
      this.$store.dispatch("setTodoDone", event);
    },
    deleteProcess(event) {
      this.$store.dispatch("setTodoDelete", event.ID);
      this.to_do_form = false;
    },
    toDoListSelected(event) {
      this.$store.dispatch("setTodoMainListByUsernameButtonStatus", false);
      this.model = event.data;
      this.to_do_form = true;
    },
    update(event) {
      event.CustomYapilacak = this.__stringCharacterChange(event.Yapilacak);
      this.$store.dispatch("setTodoUpdate", event);
      this.to_do_form = false;
    },
    save(event) {
      event.GorevVerenID = Cookies.get("userId");
      event.GorevVerenAdi = Cookies.get("username");
      event.GirisTarihi = date.dateToString(new Date());
      event.CustomYapilacak = this.__stringCharacterChange(event.Yapilacak);

      this.$store.dispatch("setTodoSave", event);
      this.to_do_form = false;
    },
    process(event) {
      if (this.getTodoMainListByUsernameButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    newForm() {
      this.$store.dispatch("setTodoMainListByUsernameButtonStatus", true);
      this.$store.dispatch("setToDoModel");
      this.model = this.getTodoModel;
      this.to_do_form = true;
    },
  },
  watch: {

  }
};
</script>
<style scoped>
.navbar-brand {
  color: #108dcf;
  animation: color 5s linear 0s infinite alternate;
  font-weight: bold;
}
@keyframes color {
  10% {
    color: #108dcf;
  }
  20% {
    color: #64b22f;
  }
  30% {
    color: #108dcf;
  }
  40% {
    color: #64b22f;
  }
  50% {
    color: #108dcf;
  }
  60% {
    color: #64b22f;
  }
  70% {
    color: #108dcf;
  }
  80% {
    color: #64b22f;
  }
  90% {
    color: #108dcf;
  }
  100% {
    color: #64b22f;
  }
}
.nav-link {
  font-size: 15px;
  font-weight: bold;
}
.dropdown-item {
  font-size: 13px;
}

@media (min-width: 576px) {
}

@media (min-width: 768px) {
  .nav-link {
    font-size: 9px;
  }
  .dropdown-item {
    font-size: 7px;
  }
}

@media (min-width: 992px) {
  .nav-link {
    font-size: 11px;
  }
  .dropdown-item {
    font-size: 9px;
  }
}

@media (min-width: 1200px) {
  .nav-link {
    font-size: 13px;
  }
  .dropdown-item {
    font-size: 11px;
  }
}

@media (min-width: 1400px) {
  .nav-link {
    font-size: 15px;
  }
  .dropdown-item {
    font-size: 13px;
  }
}
</style>
