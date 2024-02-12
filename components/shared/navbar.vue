<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Goz</a>
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
      <div class="collapse navbar-collapse" id="navbarNav">
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
              Satışçı
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/sales/follow" class="dropdown-item" tag="a"
                  >Takip</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/sales/bgp" class="dropdown-item" tag="a"
                  >Bgp Network</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/sales/todo" class="dropdown-item" tag="a"
                  >Yapılacaklar</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/sales/representative" class="dropdown-item" tag="a"
                  >Satışçı ve Operasyon</nuxt-link
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
              Siparişler
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/orders/production" class="dropdown-item" tag="a"
                  >Üretim</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/orders/shipped" class="dropdown-item" tag="a"
                  >Sevkiyat</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/orders/waiting" class="dropdown-item" tag="a"
                  >Bekleyen</nuxt-link
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
              Seleksiyon
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/selection/input" class="dropdown-item" tag="a"
                  >Seleksiyon Giriş</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/selection/size" class="dropdown-item" tag="a"
                  >Kasa Ölçüleri</nuxt-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <nuxt-link to="/finance" tag="a" class="nav-link">Finans</nuxt-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Operasyon
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/operation/cards" class="dropdown-item" tag="a"
                  >Ürün Kartları</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/supplier" class="dropdown-item" tag="a"
                  >Tedarikçi</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/shipment" class="dropdown-item" tag="a"
                  >Sevkiyat</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/uploadform" class="dropdown-item" tag="a"
                  >Yükleme Formu</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/follow" class="dropdown-item" tag="a"
                  >Konteynır Takip</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/unfollow" class="dropdown-item" tag="a"
                  >Konteynır Takipten Düşenler</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/transport" class="dropdown-item" tag="a"
                  >Nakliye Giriş</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/transportlist" class="dropdown-item" tag="a"
                  >Nakliye Listesi</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/container" class="dropdown-item" tag="a"
                  >Konteynır Giriş</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/operation/containerlist" class="dropdown-item" tag="a"
                  >Konteynır Listesi</nuxt-link
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
              Müşteriler
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/customer/mekmar" class="dropdown-item" tag="a"
                  >Mekmar</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/customer/offer" class="dropdown-item" tag="a"
                  >Teklif</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/customer/bgp" class="dropdown-item" tag="a"
                  >Bgp</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/customer/fair" class="dropdown-item" tag="a"
                  >Fuar Ziyaret</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/customer/selection" class="dropdown-item" tag="a"
                  >Seleksiyon</nuxt-link
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
              Mekmer Raporları
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/reports/mekmer/production" class="dropdown-item" tag="a"
                  >Üretim</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/reports/mekmer/stock" class="dropdown-item" tag="a"
                  >Stok</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/reports/mekmer/mine" class="dropdown-item" tag="a"
                  >Ocak</nuxt-link
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
              Mekmar Raporları
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/reports/mekmar/ayo" class="dropdown-item" tag="a"
                  >Ayo</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/reports/mekmar/loading" class="dropdown-item" tag="a"
                  >Yükleme</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/reports/mekmar/forwarding" class="dropdown-item" tag="a"
                  >Sevkiyat</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/reports/mekmar/summary" class="dropdown-item" tag="a"
                  >Sipariş Özet</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/reports/mekmar/mk" class="dropdown-item" tag="a"
                  >Mk Raporları</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/reports/mekmar/gu" class="dropdown-item" tag="a"
                  >GU Raporları</nuxt-link
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
              Numuneler
            </a>
            <ul class="dropdown-menu">
              <li>
                <nuxt-link to="/sample/sample" class="dropdown-item" tag="a"
                  >Liste</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/sample/finance" class="dropdown-item" tag="a"
                  >Finans</nuxt-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <nuxt-link to="/offers" tag="a" class="nav-link">Teklifler</nuxt-link>
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
                  >Yayınlı</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/panel/products/notpublished" class="dropdown-item" tag="a"
                  >Yayında Olmayan</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/panel/project" class="dropdown-item" tag="a"
                  >Projeler</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/panel/products/queue" class="dropdown-item" tag="a"
                  >Sıra Değiştir</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/panel/users" class="dropdown-item" tag="a"
                  >Kullanıcı</nuxt-link
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
