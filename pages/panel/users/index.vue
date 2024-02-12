<template>
  <div class="container">
    <Button type="button" class="p-button-success w-100" label="Yeni" @click="newForm" />
    <panelUsersList :list="getPanelUsersList" @panel_user_list_selected_emit="panelUserListSelected($event)"/>

    <Dialog :visible.sync="panel_user_form" header="" modal>
      <panelUsersForm
        :model="model"
        :status="getPanelUsersButtonStatus"
        @process="process($event)"
        @deleteForm="deleteForm($event)"
      />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "getPanelUsersList",
      "getPanelUsersModel",
      "getPanelUsersButtonStatus",
    ]),
  },
  data() {
    return {
      panel_user_form: false,
      model: {},
    };
  },
  created() {
    this.$store.dispatch("setPanelUsersList");
  },
    methods: {
        deleteForm(event) {
            this.$store.dispatch('setPanelUserDelete', event);
                  this.panel_user_form = false;

        },
        panelUserListSelected(event) {
                  this.$store.dispatch("setPanelUsersButtonStatus", false);

                  this.model = event.data;
            this.panel_user_form = true;  
        },
        save(event) {
            this.$store.dispatch('setPanelUsersSave', event);
                              this.panel_user_form = false;

        },
        update(event) {
            this.$store.dispatch('setPanelUserUpdate', event);
            this.panel_user_form = false;
        },
    process(event) {
        if (this.getPanelUsersButtonStatus) {
            this.save(event);
        } else {
            this.update(event);
        }
    },
    newForm() {
      this.$store.dispatch("setPanelUsersButtonStatus", true);
      this.$store.dispatch("setPanelUsersModel");
      this.model = this.getPanelUsersModel;
      this.panel_user_form = true;
    },
  },
};
</script>
</script>
