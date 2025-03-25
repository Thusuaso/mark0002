<template>
  <div>
    <panelUsaStockList
      :list="getPanelUsaStockList"
      @usa_list_selected_emit="usaListSelected($event)"
    />
    <Dialog :visible.sync="panel_usa_stock_dialog" header="" modal>
      <panelUsaStockForm
        :model="model"
        :photos="getPanelUsaStockPhotosList"
        @panel_usa_process_emit="process($event)"
        @usa_stock_upload_photos="uploadPhotos($event)"
        @usa_stock_photos_change_queue="photosChangeQueue($event)"
        @usa_stock_select_photos="selectedPhotos($event)"
      />
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import oceanservice from "../../../plugins/digitalocean";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters([
      "getPanelUsaStockList",
      "getPanelUsaStockPhotosList",
      "getPanelUsaStockButtonStatus",
    ]),
  },
  data() {
    return {
      model: {},
      panel_usa_stock_dialog: false,
      photoFiles:[]
    };
  },
  created() {
    this.$store.dispatch("setPanelUsaStockList");
  },
  methods: {
    selectedPhotos(event){
      let index = 1;
      event.files.forEach(x=>{
            index++;
            this.photoFiles.push({...x,'UrunId':this.model.UrunId,'Image':x.name,'Webp':x.name,'Sira': index});
      });
      



    },
    photosChangeQueue(event) {
      this.$store.dispatch("setUsaStockPhotosChangeQueue", event);

      // event.forEach((x) => {
      //   this.$store.dispatch("setUsaStockPhotosChangeQueue", x);
      // });
    },
    uploadPhotos(event) {
      event.files.forEach((x) => {
        oceanservice.panelUsaProductUploadPhoto(x);
      });
      this.$store.dispatch("setPanelUsaStockPhotoUpload", this.photoFiles);
      this.photoFiles = [];

    },
    update(event) {
      this.$store.dispatch("setPanelUsaStockUpdate", event);
    },
    process(event) {
      if (this.getPanelUsaStockButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    usaListSelected(event) {
      this.$store.dispatch("setpanelUsaStockPhotosList", event.data.UrunId);
      this.$store.dispatch("setPanelUsaStockButtonStatus", false);
      this.model = event.data;
      this.panel_usa_stock_dialog = true;
    },
  },
};
</script>
<style scoped></style>
