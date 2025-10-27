<template>
  <div class="container">
    <Button
      type="button"
      class="p-button-success w-100"
      @click="newForm"
      label="New"
    />
    <productCards @cards_selected_emit="cardsSelected($event)" />
    <Dialog :visible.sync="cards_form_dialog" header="" modal>
      <cardsForm
        @card_dialog_form_emit="cards_form_dialog = $event"
        :status="getCardsButtonStatus"
        :model="model"
        :categories="getCardCategoryList"
        :products="getCardProductsList"
        :surfaces="getCardSurfacesList"
        :sizes="getCardSizesList"
        :orders="getCardsOrderList"
        @card_dialog_update_values_emit="card_dialog_update_values_emit"
      />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cards_form_dialog: false,
      model: null,
    };
  },
  computed: {
    ...mapGetters([
      "getCardCategoryList",
      "getCardProductsList",
      "getCardSurfacesList",
      "getCardSizesList",
      "getCardsButtonStatus",
      "getCardsOrderList",
    ]),
  },
  methods: {
    card_dialog_update_values_emit() {
      this.$store.dispatch("setCardCategoryList");
      this.$store.dispatch("setCardProductsList");
      this.$store.dispatch("setCardSurfacesList");
      this.$store.dispatch("setCardSizesList");
      this.$store.dispatch("setOrderAllList");
      this.$store.dispatch("setSelectionSurfaces");
    },
    newForm() {
      this.$store.dispatch("setCardsButtonStatus", true);
      this.$store.commit("setCardsOrderList", []);
      this.model = {};
      this.cards_form_dialog = true;
    },
    cardsSelected(event) {
      this.model = event;
      this.cards_form_dialog = true;
      this.$store.dispatch("setCardsButtonStatus", false);
      this.$store.dispatch("setCardsOrderList", event.ID);
    },
  },
};
</script>
