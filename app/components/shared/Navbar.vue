<template>
  <div v-if="isLoggedIn">
    <nav
      class="navbar navbar-expand-lg bg-body-tertiary"
      style="font-size: 100%"
      data-bs-theme="blue"
      v-if="!getAuthorityStatus"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="/">GOZ</a>
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
            <li class="nav-item" v-show="getAuthorityStatus">
              <NuxtLink to="/selection/input" class="nav-link"
                >SELECTION</NuxtLink
              >
            </li>

            <li class="nav-item" v-show="!getAuthorityStatus">
              <NuxtLink to="/" class="nav-link">HOME</NuxtLink>
            </li>
            <li class="nav-item dropdown" v-show="!getAuthorityStatus">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                ORDERS
              </a>
              <ul class="dropdown-menu">
                <li>
                  <NuxtLink
                    to="/orders/production"
                    class="dropdown-item"
                    >Production</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/orders/shipped" class="dropdown-item"
                    >Shipped</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/orders/waiting" class="dropdown-item"
                    >On Hold</NuxtLink
                  >
                </li>
              </ul>
            </li>

            <li class="nav-item dropdown" v-show="!getAuthorityStatus">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                SALES
              </a>
              <ul class="dropdown-menu">
                <!-- <li>
                  <NuxtLink to="/sales/maintodo" class="dropdown-item"
                    >Main To Do</NuxtLink
                  >
                </li> -->
                <li>
                  <NuxtLink to="/sales/todo" class="dropdown-item"
                    >To Do</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/sales/representative"
                    class="dropdown-item"
                    >Sales & Operation</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/sales/follow" class="dropdown-item"
                    >Customer Notes</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/sales/bgp" class="dropdown-item"
                    >BGP Projects</NuxtLink
                  >
                </li>

                <li>
                  <NuxtLink to="/sales/consider" class="dropdown-item"
                    >Points to Consider</NuxtLink
                  >
                </li>
                <li v-if="canSeePasswords">
                  <NuxtLink to="/passwords" class="dropdown-item"
                    >Passwords</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/sales/important-links"
                    class="dropdown-item"
                    >Important Links</NuxtLink
                  >
                </li>
              </ul>
            </li>

            <li class="nav-item dropdown" v-show="!getAuthorityStatus">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                SELECTION
              </a>
              <ul class="dropdown-menu">
                <li>
                  <NuxtLink to="/selection/input" class="dropdown-item"
                    >Entry</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/selection/size" class="dropdown-item"
                    >Crate Size</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/container" class="dropdown-item"
                    >Container Calculator</NuxtLink
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item" v-show="!getAuthorityStatus">
              <NuxtLink to="/finance" class="nav-link"
                >FINANCE</NuxtLink
              >
            </li>
            <li class="nav-item dropdown" v-show="!getAuthorityStatus">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                OPERATION
              </a>
              <ul class="dropdown-menu">
                <li>
                  <NuxtLink to="/operation/cards" class="dropdown-item"
                    >Product Data</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/operation/supplier"
                    class="dropdown-item"
                    >Suppliers</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/operation/shipment"
                    class="dropdown-item"
                    >Dispatch</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/operation/uploadform"
                    class="dropdown-item"
                    >Shipment Form</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/operation/follow"
                    class="dropdown-item"
                    >Container Tracking</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/operation/unfollow"
                    class="dropdown-item"
                    >Shipped Containers</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/operation/transport"
                    class="dropdown-item"
                    >Shipment Costs</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/operation/transportlist"
                    class="dropdown-item"
                    >Shipment Invoices</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/operation/container"
                    class="dropdown-item"
                    >FOB Costs</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/operation/containerlist"
                    class="dropdown-item"
                    >FOB Invoices</NuxtLink
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown" v-show="!getAuthorityStatus">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                CUSTOMERS
              </a>
              <ul class="dropdown-menu">
                <li>
                  <NuxtLink to="/customer/mekmar" class="dropdown-item"
                    >Sale Customers</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/customer/offer" class="dropdown-item"
                    >Quote Customers</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/customer/bgp" class="dropdown-item"
                    >BGP Customer</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/customer/fair" class="dropdown-item"
                    >Expo Customers</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/customer/selection"
                    class="dropdown-item"
                    >Selection</NuxtLink
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
                MEKMER
              </a>
              <ul class="dropdown-menu">
                <li>
                  <NuxtLink
                    to="/reports/mekmer/production"
                    class="dropdown-item"
                    >Production Crates</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/reports/mekmer/stock"
                    class="dropdown-item"
                    >Stock Report</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/reports/mekmer/mine"
                    class="dropdown-item"
                    >Quarry Info</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/reports/mekmer/productions"
                    class="dropdown-item"
                    >Production</NuxtLink
                  >
                </li>

                <li>
                  <NuxtLink
                    to="/reports/mekmer/shipped"
                    class="dropdown-item"
                    >Shipped</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/reports/mekmer/onhold"
                    class="dropdown-item"
                    >On Hold</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/reports/mekmer/finance"
                    class="dropdown-item"
                    >Finance</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/reports/mekmer/new-mekmer-finance"
                    class="dropdown-item"
                    >Mekmer Alış Finans</NuxtLink
                  >
                </li>
                <li v-show="getAuthorityStatus">
                  <NuxtLink
                    to="/reports/mekmer/by-buying-production"
                    class="dropdown-item"
                    >Product Purchase</NuxtLink
                  >
                </li>

                <li v-show="getAuthorityStatus">
                  <NuxtLink
                    to="/reports/mekmar/forwarding"
                    class="dropdown-item"
                    >Shipped Crates</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/reports/mekmer/strips"
                    class="dropdown-item"
                    >Stripler</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/reports/mekmer/calculating-cost"
                    class="dropdown-item"
                    >Muhasebe</NuxtLink
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown" v-show="!getAuthorityStatus">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                MEKMAR REPORTS
              </a>
              <ul class="dropdown-menu">
                <li v-show="getAyoStatus">
                  <NuxtLink
                    to="/reports/mekmar/ayo"
                    class="dropdown-item"
                    >AYO</NuxtLink
                  >
                </li>

                <li>
                  <NuxtLink
                    to="/reports/mekmar/loading"
                    class="dropdown-item"
                    >List of Shipments</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/reports/mekmar/forwarding"
                    class="dropdown-item"
                    >Shipped Crates</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/reports/mekmar/summary"
                    class="dropdown-item"
                    >Order Summary</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/reports/mekmar/mk"
                    class="dropdown-item"
                    >MK Reports</NuxtLink
                  >
                </li>
                <li v-show="getAyoStatus">
                  <NuxtLink
                    to="/reports/mekmar/gu"
                    class="dropdown-item"
                    >Reports</NuxtLink
                  >
                </li>
                <li v-show="getAyoStatus">
                  <NuxtLink
                    to="/reports/mekmar/filter-finance"
                    class="dropdown-item"
                    >Finance</NuxtLink
                  >
                </li>
                <li v-show="getAyoStatus">
                  <NuxtLink
                    to="/reports/mekmar/country-order"
                    class="dropdown-item"
                    >Country Orders</NuxtLink
                  >
                </li>
                <li v-show="getAyoStatus">
                  <NuxtLink
                    to="/reports/mekmar/supplier-cost"
                    class="dropdown-item"
                    >Supplier Cost</NuxtLink
                  >
                </li>
                <li v-show="getAyoStatus">
                  <NuxtLink
                    to="/reports/mekmar/continent-order"
                    class="dropdown-item"
                    >Continent Orders</NuxtLink
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown" v-show="!getAuthorityStatus">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                SAMPLE
              </a>
              <ul class="dropdown-menu">
                <li>
                  <NuxtLink to="/sample/sample" class="dropdown-item"
                    >Sample List</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/sample/finance" class="dropdown-item"
                    >Sample Finance</NuxtLink
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item" v-show="!getAuthorityStatus">
              <NuxtLink to="/offers" class="nav-link"
                >QUOTES</NuxtLink
              >
            </li>
            <li class="nav-item dropdown" v-show="!getAuthorityStatus">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                W. PANEL
              </a>
              <ul class="dropdown-menu">
                <li>
                  <NuxtLink
                    to="/panel/products/published"
                    class="dropdown-item"
                    >Products (Published)</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/panel/products/notpublished"
                    class="dropdown-item"
                    >Products (Unpublished)</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/panel/project" class="dropdown-item"
                    >Projects</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/panel/products/queue"
                    class="dropdown-item"
                    >Product Queue</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/panel/usa" class="dropdown-item"
                    >USA Panel</NuxtLink
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="d-flex" v-show="!getAuthorityStatus">
          <div>
            <Button
              severity="danger" class="mr-5"
              label="Logout"
              @click="logout"
            />
          </div>
          <i
            v-badge.danger="parseInt(getToDoMainListByUsernameLenght)"
            class="pi pi-calendar"
            style="font-size: 2rem; cursor: pointer"
            @click="visibleRight = true"
          />

          <Drawer
            :visible="visibleRight" @update:visible="visibleRight = $event"
            header="Right Sidebar"
            position="right"
            class="w-50 md:w-20rem lg:w-30rem"
          >
            <Button
              type="button"
              class="w-100" severity="success"
              label="New"
              @click="newForm"
            />
            <todoByUsernameList
              :list="getToDoMainListByUsername"
              @to_do_list_selected_emit="toDoListSelected($event)"
              @todo_done_emit="todoDone($event)"
            />
          </Drawer>
          <Dialog :visible="to_do_form" @update:visible="to_do_form = $event" header="" modal>
            <todoByUsernameForm
              :model="model"
              :users="getUserList"
              :status="getTodoMainListByUsernameButtonStatus"
              @process="process($event)"
              @deleteProcess="deleteProcess($event)"
            />
          </Dialog>

          <!--
            Eksik zorunlu yukleme evraklari.

            Badge yalnizca SAYIYI gosteriyor (hafif /missing/count ucu);
            tam liste ancak panel acildiginda cekiliyor
            (missingDocumentOpen). Karta tiklanmasi
            /operation/uploadform?po=... adresine gidiyor.
          -->
          <i
            v-badge.danger="parseInt(getMissingDocumentOrderCount)"
            class="pi pi-file-excel ml-4"
            style="font-size: 2rem; cursor: pointer"
            title="Eksik Yükleme Evrakları"
            @click="missingDocumentOpen"
          />
          <Drawer
            :visible="missing_document_visible"
            @update:visible="missing_document_visible = $event"
            header="Eksik Yükleme Evrakları"
            position="right"
            class="w-50 md:w-20rem lg:w-30rem"
          >
            <uploadMissingList
              :list="getMissingDocumentList"
              @missing_document_selected_emit="missingDocumentSelected($event)"
            />
          </Drawer>
        </div>
      </div>
    </nav>

    <nav
      class="navbar navbar-expand-lg bg-body-tertiary"
      style="font-size: 100%"
      data-bs-theme="blue"
      v-else
    >
      <div class="container-fluid" v-if="getUserId == 62">
        <a class="navbar-brand" href="/">GOZ</a>
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
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Yükleme
              </a>
              <ul class="dropdown-menu">
                <li>
                  <NuxtLink
                    to="/reports/mekmer/shipped"
                    class="dropdown-item"
                    >Yüklenen</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/reports/mekmar/forwarding"
                    class="dropdown-item"
                    >Yükleme Raporu</NuxtLink
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="container-fluid" v-else>
        <a class="navbar-brand" href="/">GOZ</a>
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
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Mekmar Siparişler
              </a>
              <ul class="dropdown-menu">
                <li>
                  <NuxtLink
                    to="/orders/production"
                    class="dropdown-item"
                    >Production</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/orders/shipped" class="dropdown-item"
                    >Shipped</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink to="/orders/waiting" class="dropdown-item"
                    >On Hold</NuxtLink
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <NuxtLink
                to="/reports/mekmer/productions"
                class="nav-link"
                >Siparişler</NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink
                to="/reports/mekmer/production"
                class="nav-link"
                >Üretim Raporu</NuxtLink
              >
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
                  <NuxtLink to="/selection/input" class="dropdown-item"
                    >Stok</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/reports/mekmer/stock"
                    class="dropdown-item"
                    >Stok Raporu</NuxtLink
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
                Yükleme
              </a>
              <ul class="dropdown-menu">
                <li>
                  <NuxtLink
                    to="/reports/mekmer/shipped"
                    class="dropdown-item"
                    >Yüklenen</NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/reports/mekmar/forwarding"
                    class="dropdown-item"
                    >Yükleme Raporu</NuxtLink
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <NuxtLink to="/reports/mekmer/finance" class="nav-link"
                >Cari (Finans)</NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink
                to="/reports/mekmer/by-buying-production"
                class="nav-link"
                >Kasa Satış Fiyatı</NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink
                to="/reports/mekmer/calculating-cost"
                class="nav-link"
                >Muhasebe</NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink to="/reports/mekmer/strips" class="nav-link"
                >Strip & Moloz</NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink to="/operation/shipment" class="nav-link"
                >Sevk Et</NuxtLink
              >
            </li>

            <li class="nav-item">
              <NuxtLink
                to="/reports/mekmer/new-mekmer-finance"
                class="nav-link"
                >Mekmer Finans</NuxtLink
              >
            </li>

            <li class="nav-item">
              <NuxtLink to="/operation/cards" class="nav-link"
                >Product Data</NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink to="/customer/mekmar" class="nav-link"
                >Sale Customers</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { useAuthStore } from "~/stores/auth"
import { useAuthorityStore } from "~/stores/authority"
import { useSharedStore } from "~/stores/shared"
import { useTodoStore } from "~/stores/todo"
import { useUploadStore } from "~/stores/upload"

export default {
  /*
   * components/shared/navbar.vue -> app/components/shared/Navbar.vue
   *
   * Options API KORUNDU: 807 satirlik sablonu ve davranisini birebir
   * tasimak icin, yeniden yazim degil cevirim yapildi.
   *
   * SABLONDA YAPILAN ZORUNLU DEGISIKLIKLER (scriptle, tools/codemods):
   *   83x  tag="a" kaldirildi   -- Vue Router 4'te `tag` prop'u yok;
   *        NuxtLink zaten <a> uretiyor, kalsa ham attribute olarak DOM'a duser
   *   83x  <nuxt-link> -> <NuxtLink>
   *    1x  <Sidebar> -> <Drawer>  (PrimeVue 4'te yeniden adlandirildi)
   *    1x  class="p-button-success" -> severity="success"
   *    1x  clas="p-button-danger" -> severity="danger"
   *        ^ ORIJINALDE YAZIM HATASI (class degil clas): o buton hicbir
   *          zaman kirmizi gorunmemis. Duzeltilerek tasindi.
   *
   * SCRIPTTE:
   *   mapGetters           -> Pinia store'lari (4 store: auth, authority,
   *                           shared, todo)
   *   Cookies (js-cookie)  -> useCookie
   *   this.$cookie         -> useCookie (plugins/cookies.js gereksiz kaldi)
   *   plugins/date.js      -> utils/dates.ts -> toIsoDate
   *
   * DIKKAT -- SESSIZ VERI BOZULMASI RISKI:
   *   date.dateToString(new Date()) "2026-10-02" (yil-ay-gun) uretiyor ve
   *   bu deger API'ye YAZILIYOR (GirisTarihi / YapildiTarihi).
   *   utils/formatters'taki AYNI ISIMLI dateToString ise "02-10-2026"
   *   (gun-ay-yil) uretiyor ve yalnizca gosterim icindir. Karistirilirsa
   *   derleme hatasi vermez, tarihleri ters formatta kaydeder.
   *   Bu yuzden burada toIsoDate kullaniliyor.
   *
   * KALDIRILAN OLU KOD:
   *   import Menubar from "primevue/menubar" -- sablonda <Menubar> yok
   *   data.items: []                        -- hicbir yerde kullanilmiyor
   *   watch: {}                             -- bos
   *
   * TASINMAYAN:
   *   localStorage.removeItem(...) cagrilari. Orijinal hem cerez hem
   *   localStorage tutuyordu, ama okuma artik yalnizca cerezden yapiliyor
   *   (useCookie). localStorage kopyasi kullanilmadigi icin yazilmiyor da.
   */
  computed: {
    auth() {
      return useAuthStore()
    },
    authority() {
      return useAuthorityStore()
    },
    shared() {
      return useSharedStore()
    },
    todo() {
      return useTodoStore()
    },
    upload() {
      return useUploadStore()
    },

    // --- eski mapGetters karsiliklari (sablon bunlari kullaniyor) ---
    getToDoMainListByUsername() {
      return this.todo.getToDoMainListByUsername
    },
    getToDoMainListByUsernameLenght() {
      return this.todo.getToDoMainListByUsernameLenght
    },
    getTodoModel() {
      return this.todo.getTodoModel
    },
    getTodoMainListByUsernameButtonStatus() {
      return this.todo.getTodoMainListByUsernameButtonStatus
    },
    getUserList() {
      return this.shared.getUserList
    },
    getAuthorityStatus() {
      return this.authority.getAuthorityStatus
    },
    isAuthenticated() {
      return this.auth.isAuthenticated
    },
    getUserId() {
      return this.auth.getUserId
    },
    getAyoStatus() {
      return this.auth.getAyoStatus
    },
    getMissingDocumentList() {
      return this.upload.getMissingDocumentList
    },
    getMissingDocumentOrderCount() {
      return this.upload.getMissingDocumentOrderCount
    },

    isLoggedIn() {
      const storeAuth =
        this.isAuthenticated !== undefined ? this.isAuthenticated : false
      return storeAuth || !!this.userId
    },

    canSeePasswords() {
      const id = parseInt(this.getUserId ?? this.userId, 10)
      return [19, 47].includes(id)
    },
  },

  data() {
    return {
      userId: null,
      visibleRight: false,
      missing_document_visible: false,
      to_do_form: false,
      model: {},
    }
  },

  created() {
    this.userId = useCookie("userId").value || null
  },

  mounted() {
    /*
     * Todo listesi SSR'DA DEGIL, yalnizca client'ta cekiliyor.
     *
     * Orijinalde bu cagri created() icindeydi. mounted()'a tasindi cunku
     * legacy Express API'si SSR'in IC fetch yolunda calismiyor:
     * event.node.res gercek bir ServerResponse olmadigi icin Express'in
     * res.json() -> res.get("content-type") cagrisi patliyor veya yanit
     * hic sonlanmadigi icin istek asili kaliyor.
     * (Ayrintili aciklama: server/middleware/1.legacy-api.ts)
     *
     * Davranis kaybi yok: Nuxt 2'de de created() icindeki async is SSR
     * tarafindan beklenmiyordu, yani bu liste zaten SSR'da gelmiyordu.
     */
    this.userId = useCookie("userId").value || null

    this.loadTodoList()
    this.loadMissingDocumentCount()
  },

  /*
   * Liste YALNIZCA mounted()'a birakilamaz.
   *
   * Navbar layout icinde v-show ile gizleniyor (v-if DEGIL), yani giris
   * yapilmamisken de MOUNT EDILMIS durumda. Oturum durumu sonradan true
   * olursa mounted() bir daha CALISMAZ ve liste bos kalir -- hic hata da
   * vermez, cunku kullanici adi bos oldugunda store sessizce geri donuyor
   * (app/stores/todo.ts: `if (!user) return`).
   *
   * Bu izleyici, giris durumu false -> true dondugu her an listeyi
   * cekiyor. Giris sayfasi da kendi tarafinda cagiriyor (app/pages/auth.vue);
   * ikisi birbirinin yedegi, mukerrer cagri zararsiz.
   */
  watch: {
    isLoggedIn(loggedIn) {
      if (!loggedIn) return
      this.loadTodoList()
      this.loadMissingDocumentCount()
    },
  },

  methods: {
    /* Kullanici adi cerezi okunabiliyorsa todo listesini ceker. */
    loadTodoList() {
      if (!this.isLoggedIn) return
      this.todo.setToDoListByUsername()
    },

    /*
     * Badge icin yalnizca SAYI. Tam liste cekilmiyor -- o, panel
     * acildiginda bir kez (missingDocumentOpen).
     *
     * loadTodoList ile AYNI iki yerden cagriliyor (mounted + isLoggedIn
     * izleyicisi): navbar layout icinde v-show ile gizlendigi icin giris
     * yapilmamisken de mount edilmis durumda, yani mounted() tek basina
     * yetmez. Gerekcenin tamami izleyicinin ustundeki notta.
     */
    loadMissingDocumentCount() {
      if (!this.isLoggedIn) return
      this.upload.setMissingDocumentOrderCount()
    },

    /*
     * Panel acilirken tam liste cekiliyor. Liste ucu sayaci da
     * guncelliyor (bkz. app/stores/upload.ts), yani badge panelle ayni
     * sayiyi gosteriyor.
     */
    missingDocumentOpen() {
      this.upload.setMissingDocumentList()
      this.missing_document_visible = true
    },

    /*
     * Eksik evrak kartina tiklanmasi -> yukleme ekrani, PO onsecili.
     *
     * Nuxt 2'de burada `.catch(() => {})` vardi: Vue Router 3 AYNI yola
     * tekrar gidince "NavigationDuplicated" HATASI firlatiyordu. Vue
     * Router 4'te ayni gezinme artik hata DEGIL, sessizce cozulur --
     * yani yutucu catch gereksiz kaldi ve gercek hatalari da
     * saklayacagi icin tasinmadi.
     */
    missingDocumentSelected(event) {
      this.missing_document_visible = false
      return navigateTo({
        path: "/operation/uploadform",
        query: { po: event.SiparisNo },
      })
    },

    async logout() {
      if (!confirm("Are you sure you want to log out?")) return

      this.auth.logout()
      this.userId = null
      this.authority.setAuthorityNavbarStatus(false)

      await navigateTo("/auth")
    },

    __stringCharacterChange(event) {
      const data = String(event ?? "").split("'")
      let value = ""

      data.forEach((x) => {
        value += x + "''"
      })

      return value.substring(0, value.length - 2)
    },

    todoDone(event) {
      event.YapildiTarihi = toIsoDate(new Date())
      this.todo.setTodoDone(event)
    },

    deleteProcess(event) {
      this.todo.setTodoDelete(event.ID)
      this.to_do_form = false
    },

    toDoListSelected(event) {
      this.todo.setTodoMainListByUsernameButtonStatus(false)
      this.model = event.data
      this.to_do_form = true
    },

    update(event) {
      event.CustomYapilacak = this.__stringCharacterChange(event.Yapilacak)
      this.todo.setTodoUpdate(event)
      this.to_do_form = false
    },

    save(event) {
      event.GorevVerenID = useCookie("userId").value
      event.GorevVerenAdi = useCookie("username").value
      event.GirisTarihi = toIsoDate(new Date())
      event.CustomYapilacak = this.__stringCharacterChange(event.Yapilacak)

      this.todo.setTodoSave(event)
      this.to_do_form = false
    },

    process(event) {
      if (this.getTodoMainListByUsernameButtonStatus) {
        this.save(event)
      } else {
        this.update(event)
      }
    },

    newForm() {
      this.todo.setTodoMainListByUsernameButtonStatus(true)
      this.todo.setToDoModel()
      this.model = this.getTodoModel
      this.to_do_form = true
    },
  },
}
</script>

<style scoped>
.navbar-brand {
  color: #108dcf;
  animation: color 5s linear 0s infinite alternate;
  font-weight: bold;
}

@keyframes color {
  10% { color: #108dcf; }
  20% { color: #64b22f; }
  30% { color: #108dcf; }
  40% { color: #64b22f; }
  50% { color: #108dcf; }
  60% { color: #64b22f; }
  70% { color: #108dcf; }
  80% { color: #64b22f; }
  90% { color: #108dcf; }
  100% { color: #64b22f; }
}

.nav-link {
  font-size: 15px;
  font-weight: bold;
}

.dropdown-item {
  font-size: 13px;
}

/*
 * Orijinaldeki bos "@media (min-width: 576px) {}" blogu kaldirildi.
 * Kalan kademeler aynen korundu.
 */
@media (min-width: 768px) {
  .nav-link { font-size: 9px; }
  .dropdown-item { font-size: 7px; }
}

@media (min-width: 992px) {
  .nav-link { font-size: 11px; }
  .dropdown-item { font-size: 9px; }
}

@media (min-width: 1200px) {
  .nav-link { font-size: 13px; }
  .dropdown-item { font-size: 11px; }
}

@media (min-width: 1400px) {
  .nav-link { font-size: 15px; }
  .dropdown-item { font-size: 13px; }
}
</style>
