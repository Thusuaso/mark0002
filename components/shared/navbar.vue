<template>
  <nav class=" navbar navbar-expand-lg bg-body-tertiary " >
    <div class="container-fluid container" >
      <a class="navbar-brand" href="#">GOZ</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav" >
        <ul class="navbar-nav">
          <li class="nav-item">
            <nuxt-link to="/" tag="a" class="nav-link">Home</nuxt-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sales
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/sales/follow" class="dropdown-item" tag="a"
                  >Follow</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/sales/bgp" class="dropdown-item" tag="a"
                  >Bgp Network</nuxt-link
                >
              </li>

              
              <li>
                <nuxt-link to="/sales/consider" class="dropdown-item" tag="a"
                  >Points to Consider</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/sales/representative" class="dropdown-item" tag="a"
                  >Sales & Operation</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/sales/todo" class="dropdown-item" tag="a"
                  >To Do</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/sales/maintodo" class="dropdown-item" tag="a"
                  >Main To Do</nuxt-link
                >
              </li>

            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Orders
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/orders/production" class="dropdown-item" tag="a"
                  >Production</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/orders/shipped" class="dropdown-item" tag="a"
                  >Shipped</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/orders/waiting" class="dropdown-item" tag="a"
                  >Waiting</nuxt-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Selection
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/selection/input" class="dropdown-item" tag="a"
                  >Input</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/selection/size" class="dropdown-item" tag="a"
                  >Crate Size</nuxt-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <nuxt-link to="/finance" tag="a" class="nav-link">Finance</nuxt-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Operation
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/operation/cards" class="dropdown-item" tag="a"
                  >Product Card</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/supplier" class="dropdown-item" tag="a"
                  >Supplier</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/shipment" class="dropdown-item" tag="a"
                  >Shipment</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/uploadform" class="dropdown-item" tag="a"
                  >Upload Form</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/follow" class="dropdown-item" tag="a"
                  >Container Follow List</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/unfollow" class="dropdown-item" tag="a"
                  >Container Out of Traking</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/transport" class="dropdown-item" tag="a"
                  >Shipping Introduction</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/transportlist" class="dropdown-item" tag="a"
                  >Shipping List</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/container" class="dropdown-item" tag="a"
                  >Container Introduction</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/containerlist" class="dropdown-item" tag="a"
                  >Container List</nuxt-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Customer
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/customer/mekmar" class="dropdown-item" tag="a"
                  >Order</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/customer/offer" class="dropdown-item" tag="a"
                  >Offer</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/customer/bgp" class="dropdown-item" tag="a"
                  >Bgp</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/customer/fair" class="dropdown-item" tag="a"
                  >Fair & Visit</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/customer/selection" class="dropdown-item" tag="a"
                  >Selection</nuxt-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Mekmer Reports
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/reports/mekmer/production" class="dropdown-item" tag="a"
                  >Product</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/reports/mekmer/stock" class="dropdown-item" tag="a"
                  >Stock</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/reports/mekmer/mine" class="dropdown-item" tag="a"
                  >Mine</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/reports/mekmer/atlanta" class="dropdown-item" tag="a"
                  >Atlanta</nuxt-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Mekmar Reports
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/reports/mekmar/ayo" class="dropdown-item" tag="a"
                  >Ayo</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/reports/mekmar/loading" class="dropdown-item" tag="a"
                  >Loading List</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/reports/mekmar/forwarding" class="dropdown-item" tag="a"
                  >Forwarding List</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/reports/mekmar/summary" class="dropdown-item" tag="a"
                  >Order Summary</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/reports/mekmar/mk" class="dropdown-item" tag="a"
                  >MK Reports</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/reports/mekmar/gu" class="dropdown-item" tag="a"
                  >GU Reports</nuxt-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sample
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/sample/sample" class="dropdown-item" tag="a"
                  >List</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/sample/finance" class="dropdown-item" tag="a"
                  >Finance</nuxt-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <nuxt-link to="/offers" tag="a" class="nav-link">Offers</nuxt-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Panel
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/panel/products/published" class="dropdown-item" tag="a"
                  >Published</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/panel/products/notpublished" class="dropdown-item" tag="a"
                  >Not Published</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/panel/project" class="dropdown-item" tag="a"
                  >Projects</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/panel/products/queue" class="dropdown-item" tag="a"
                  >Change Queue</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/panel/users" class="dropdown-item" tag="a"
                  >Users</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/panel/usa" class="dropdown-item" tag="a"
                  >Usa Stock</nuxt-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="d-flex">
        <Button
          type="button"
          label="To Do"
          icon="pi pi-calendar"
          severity="secondary"
          :badge="parseInt(getToDoMainListByUsernameLenght)"
          badgeSeverity="info"
          @click="visibleRight = true"
        />
        <Sidebar
          :visible.sync="visibleRight"
          header="Right Sidebar"
          position="right"
          class="w-50 md:w-20rem lg:w-30rem"
        >
          <Button
            type="button"
            class="p-button-success w-100"
            label="Yeni"
            @click="newForm"
          />
          <todoByUsernameList
            :list="getToDoMainListByUsername"
            @to_do_list_selected_emit="toDoListSelected($event)"
            @todo_done_emit="todoDone($event)"
          />
        </Sidebar>
        <Dialog :visible.sync="to_do_form" header="" modal>
          <todoByUsernameForm
            :model="model"
            :users="getUserList"
            :status="getTodoMainListByUsernameButtonStatus"
            @process="process($event)"
            @deleteProcess="deleteProcess($event)"
          />
        </Dialog>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
import Cookies from "js-cookie";
import date from "../../plugins/date";

export default {
  computed: {
    ...mapGetters([
      "getToDoMainListByUsername",
      "getToDoMainListByUsernameLenght",
      "getTodoModel",
      "getUserList",
      "getTodoMainListByUsernameButtonStatus",
    ]),
  },
  data() {
    return {
      visibleRight: false,
      to_do_form: false,
      model: {},
    };
  },

  created() {
    this.$store.dispatch("setToDoListByUsername", Cookies.get("username"));
  },
  methods: {
    todoDone(event) {
      event.YapildiTarihi = date.dateToString(new Date());
      this.$store.dispatch("setTodoDone", event);
    },
    deleteProcess(event) {
      this.$store.dispatch("setTodoDelete", event);
      this.to_do_form = false;
    },
    toDoListSelected(event) {
      this.$store.dispatch("setTodoMainListByUsernameButtonStatus", false);
      this.model = event.data;
      this.to_do_form = true;
    },
    update(event) {
      this.$store.dispatch("setTodoUpdate", event);
      this.to_do_form = false;
    },
    save(event) {
      event.GorevVerenID = Cookies.get("userId");
      event.GorevVerenAdi = Cookies.get("username");
      event.GirisTarihi = date.dateToString(new Date());
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
};
</script>
