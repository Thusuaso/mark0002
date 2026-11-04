<template>
  <div>
    <PanelUsaStockList
      :list="panelStore.getPanelUsaStockList"
      @usa_list_selected_emit="usaListSelected($event)"
    />
    <Dialog v-model:visible="panel_usa_stock_dialog" header="" modal>
      <PanelUsaStockForm
        :model="model"
        :photos="panelStore.getPanelUsaStockPhotosList"
        @panel_usa_process_emit="process($event)"
        @usa_stock_upload_photos="uploadPhotos($event)"
        @usa_stock_photos_change_queue="photosChangeQueue($event)"
        @usa_stock_select_photos="selectedPhotos($event)"
      />
    </Dialog>
  </div>
</template>
<script>
import { usePanelStore } from "~/stores/panel"
export default {
  middleware: ["authority"],
  computed: {
    panelStore() {
      return usePanelStore()
    },
  },
  data() {
    return {
      model: {},
      panel_usa_stock_dialog: false,
      photoFiles:[]
    };
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir; hydration onu devralir,
   * created() bir daha calismadigi icin tablo bos kalir (bkz. commit
   * 2afc877e3). mounted() sunucuda hic calismaz.
   */
  mounted() {
    this.panelStore.setPanelUsaStockList();
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
      this.panelStore.setUsaStockPhotosChangeQueue(event);

      // event.forEach((x) => {
      //   this.panelStore.setUsaStockPhotosChangeQueue(x);
      // });
    },
    uploadPhotos(event) {
      event.files.forEach((x) => {
        useSpacesService().panelUsaProductUploadPhoto(x);
      });
      this.panelStore.setPanelUsaStockPhotoUpload(this.photoFiles);
      this.photoFiles = [];

    },
    update(event) {
      this.panelStore.setPanelUsaStockUpdate(event);
    },
    process(event) {
      if (this.panelStore.getPanelUsaStockButtonStatus) {
        this.save(event);
      } else {
        this.update(event);
      }
    },
    usaListSelected(event) {
      this.panelStore.setpanelUsaStockPhotosList(event.data.UrunId);
      this.panelStore.setPanelUsaStockButtonStatus(false);
      this.model = event.data;
      this.panel_usa_stock_dialog = true;
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
 * (bkz. commit 5fc77edb1). Yukaridaki Options blogunda duran anahtar
 * belge olarak birakildi, isi yapan BU satir.
 */
definePageMeta({ middleware: ["authority"] })
</script>
<style scoped></style>
