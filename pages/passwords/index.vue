<template>
  <div>
    <div class="row">
      <div class="col">
        <Button
          type="button"
          class="p-button-success w-100"
          label="New"
          @click="newForm"
        />
      </div>
      <div class="col">
        <Button
          type="button"
          class="p-button-info w-100"
          label="Show Password"
          @click="show_password = !show_password"
        />
      </div>
    </div>

    <accountsList
      :list="getAccountsList"
      @accounts_selected_emit="accountsSelected($event)"
      :passwordStatus="show_password"
    />
    <Dialog :visible.sync="accounts_new_form" header="New" modal>
      <accountsForm
        :model="model"
        @process="process($event)"
        :status="getAccountsButtonStatus"
        @accounts_deleted_emit="accountsDeleted($event)"
      />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
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
    ...mapGetters(["getAccountsList", "getAccountsModel", "getAccountsButtonStatus"]),
  },
  created() {
    this.$store.dispatch("setAccountsList");
  },
  methods: {
    accountsDeleted(event) {
      this.$store.dispatch("setAccountsDeleted", event);
      this.accounts_new_form = false;
    },
    accountsSelected(event) {
      this.model = event.data;
      this.accounts_new_form = true;
      this.$store.dispatch("setAccountsButtonStatus", false);
    },
    process(event) {
      if (this.getAccountsButtonStatus) {
        this.$store.dispatch("setAccountsSave", event);
        this.accounts_new_form = false;
      } else {
        this.$store.dispatch("setAccountsUpdate", event);
        this.accounts_new_form = false;
      }
    },
    newForm() {
      this.$store.dispatch("setAccountsModel");
      this.$store.dispatch("setAccountsButtonStatus", true);
      this.accounts_new_form = true;
      this.model = this.getAccountsModel;
    },
  },
};
</script>
<style scoped></style>
