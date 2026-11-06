<template>
  <!--
    `container-fluid` ZORUNLU -- KOK <div> CIPLAK OLAMAZ.

    Bootstrap'in `.row`'u negatif kenar boslugu tasir
    (margin-inline: calc(-.5 * var(--bs-gutter-x)) = -12px) ve bunun
    `.container` / `.container-fluid` dolgusuyla dengelenmesi gerekir.
    Ciplak bir <div> icinde dengelenmiyordu: satir her iki yana 12px
    tasip SAYFAYA yatay kaydirma cubugu aciyordu.

    Olculdu (503px, mobil): gorunum alani 503px, `div.row` sag kenari
    515px -- tam 12px tasma. Genis ekranda da tasma vardi, yalnizca
    sayfa genis oldugu icin goze carpmiyordu.
  -->
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <Button
          type="button"
          severity="success" class="w-100"
          label="New"
          @click="newForm"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          severity="info" class="w-100"
          label="Show Password"
          @click="show_password = !show_password"
        />
      </div>
    </div>

    <AccountsList
      :list="accountsStore.getAccountsList"
      @accounts_selected_emit="accountsSelected($event)"
      :passwordStatus="show_password"
    />
    <Dialog v-model:visible="accounts_new_form" header="New" modal>
      <AccountsForm
        :model="model"
        @process="process($event)"
        :status="accountsStore.getAccountsButtonStatus"
        @accounts_deleted_emit="accountsDeleted($event)"
      />
    </Dialog>
  </div>
</template>
<script>
import { useModelsStore } from "~/stores/models"
import { useAccountsStore } from "~/stores/accounts"
export default {
  middleware: ["authority"],
  data() {
    return {
      accounts_new_form: false,
      model: null,
      show_password: false,
    };
  },
  computed: {
    accountsStore() {
      return useAccountsStore()
    },
    modelsStore() {
      return useModelsStore()
    },
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    this.accountsStore.setAccountsList();
  },
  methods: {
    accountsDeleted(event) {
      this.accountsStore.setAccountsDeleted(event);
      this.accounts_new_form = false;
    },
    accountsSelected(event) {
      this.model = event.data;
      this.accounts_new_form = true;
      this.accountsStore.setAccountsButtonStatus(false);
    },
    process(event) {
      if (this.accountsStore.getAccountsButtonStatus) {
        this.accountsStore.setAccountsSave(event);
        this.accounts_new_form = false;
      } else {
        this.accountsStore.setAccountsUpdate(event);
        this.accounts_new_form = false;
      }
    },
    newForm() {
      this.modelsStore.setAccountsModel();
      this.accountsStore.setAccountsButtonStatus(true);
      this.accounts_new_form = true;
      this.model = this.modelsStore.getAccountsModel;
    },
  },
};
</script>
<script setup>
/*
 * definePageMeta yalnizca <script setup> icinde cagrilabilir -> Options
 * API sayfalarinda ikinci bir script blogu gerekiyor.
 *
 * ZORUNLU: Options API'deki `middleware: [...]` anahtari Nuxt 3+'ta YOK
 * SAYILIR -- hata vermez, yetki kisitlamasi SESSIZCE kalkar
 * (bkz. commit 5fc77edb1).
 */
definePageMeta({ middleware: ["authority"] })
</script>
<style scoped></style>
