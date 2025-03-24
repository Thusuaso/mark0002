<template>
  <div class="mt-3">
    <TabView>
      <TabPanel header="Product (En)">
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText id="sku" type="text" v-model="model.SkuNo" />
              <label for="sku">Sku</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="productid" type="text" v-model="model.UrunId" />
              <label for="productid">Product Id</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="mekmar_code" type="text" v-model="model.MekmarKod" />
              <label for="mekmar_code">MekmarKod</label>
            </span>
          </div>
          <div class="col">
            <div class="flex flex-wrap justify-content-center gap-3">
              <div class="flex align-items-center">
                <Checkbox v-model="model.Yayinla" inputId="published" binary />
                <label for="published" class="ml-2"> Publish </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <Textarea
                id="product_title"
                v-model="model.UrunTanim"
                rows="5"
                class="w-100"
              />

              <label for="product_title">Product Title</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <Textarea
                id="product_desc"
                v-model="model.aciklama_en"
                rows="5"
                class="w-100"
              />

              <label for="product_desc">Product Description</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <Textarea
                id="keywords_en"
                v-model="model.Anahtarlar"
                rows="5"
                class="w-100"
              />

              <label for="keywords_en">Keywords</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <Textarea
                id="hashtags"
                v-model="model.hashtags"
                rows="5"
                class="w-100"
                @input="hashtagsInput($event)"
              />

              <label for="hashtags">Hashtags</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText id="category" type="text" v-model="model.Kategori" />
              <label for="category">Category</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="product_name" type="text" v-model="model.UrunAdi" />
              <label for="product_name">Product Name</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="surface" type="text" v-model="model.Surface" />
              <label for="surface">Surface</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="edge" type="text" v-model="model.Edge" />
              <label for="edge">Edge</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="size" type="text" v-model="model.Size" />
              <label for="size">Size</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText id="color" type="text" v-model="model.Renk" />
              <label for="color">Color</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="boxincrate" type="text" v-model="model.KasaKutu" />
              <label for="boxincrate">Box (in Crate)</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="pieceincrate" type="text" v-model="model.KasaAdet" />
              <label for="pieceincrate">Piece (in Crate)</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="amountsqft" type="text" v-model="model.KasaSqft" />
              <label for="amountsqft">Sqft (in Crate)</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="m2" type="text" v-model="model.KasaM2" />
              <label for="m2">M2 (in Crate)</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText id="pieceinbox" type="text" v-model="model.KutuAdet" />
              <label for="pieceinbox">Piece (in Box)</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="sqftinbox" type="text" v-model="model.KutuSqft" />
              <label for="sqftinbox">Sqft (in Box)</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="m2inbox" type="text" v-model="model.KutuM2" />
              <label for="m2inbox">M2 (in Box)</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="maxstock" type="text" v-model="model.MaxStock" />
              <label for="maxstock">Max Stock</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="maxstock" type="text" v-model="model.StokSqft" />
              <label for="maxstock">Sqft (in Stock)</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="maxstock" type="text" v-model="model.StokBox" />
              <label for="maxstock">Box (in Stock)</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <Textarea
                id="box_detail"
                v-model="model.KutuDetay"
                rows="5"
                class="w-100"
              />

              <label for="box_detail">Box Detail</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <Textarea
                id="crate_detail"
                v-model="model.KasaDetay"
                rows="5"
                class="w-100"
              />

              <label for="crate_detail">Crate Detail</label>
            </span>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Product (Fr)">
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <Textarea
                id="product_desc"
                v-model="model.aciklama_fr"
                rows="5"
                class="w-100"
              />

              <label for="product_desc">Product Description</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <Textarea
                id="keywords_en"
                v-model="model.anahtarlar_fr"
                rows="5"
                class="w-100"
              />

              <label for="keywords_en">Keywords</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <Textarea
                id="hashtags"
                v-model="model.hashtags_fr"
                rows="5"
                class="w-100"
                @input="hashtagsInputFr($event)"
              />

              <label for="hashtags">Hashtags Fr</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText id="product_name" type="text" v-model="model.urunadi_fr" />
              <label for="product_name">Product Name</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="surface" type="text" v-model="model.surface_fr" />
              <label for="surface">Surface</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="edge" type="text" v-model="model.edge_fr" />
              <label for="edge">Edge</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="color" type="text" v-model="model.renk_fr" />
              <label for="color">Color</label>
            </span>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <Textarea
                id="box_detail"
                v-model="model.kutudetay_fr"
                rows="5"
                class="w-100"
              />

              <label for="box_detail">Box Detail</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <Textarea
                id="crate_detail"
                v-model="model.kasadetay_fr"
                rows="5"
                class="w-100"
              />

              <label for="crate_detail">Crate Detail</label>
            </span>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Product (Es)">
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <Textarea
                id="product_desc"
                v-model="model.aciklama_es"
                rows="5"
                class="w-100"
              />

              <label for="product_desc">Product Description</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <Textarea
                id="keywords_en"
                v-model="model.anahtarlar_es"
                rows="5"
                class="w-100"
              />

              <label for="keywords_en">Keywords</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <Textarea
                id="hashtags"
                v-model="model.hashtags_es"
                rows="5"
                class="w-100"
                @input="hashtagsInputEs($event)"
              />

              <label for="hashtags">Hashtags Es</label>
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <InputText id="product_name" type="text" v-model="model.urunadi_es" />
              <label for="product_name">Product Name</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="surface" type="text" v-model="model.surface_es" />
              <label for="surface">Surface</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="edge" type="text" v-model="model.edge_es" />
              <label for="edge">Edge</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <InputText id="color" type="text" v-model="model.renk_es" />
              <label for="color">Color</label>
            </span>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col">
            <span class="p-float-label">
              <Textarea
                id="box_detail"
                v-model="model.kutudetay_es"
                rows="5"
                class="w-100"
              />

              <label for="box_detail">Box Detail</label>
            </span>
          </div>
          <div class="col">
            <span class="p-float-label">
              <Textarea
                id="crate_detail"
                v-model="model.kasadetay_es"
                rows="5"
                class="w-100"
              />

              <label for="crate_detail">Crate Detail</label>
            </span>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Photos">
        <FileUpload
          :customUpload="true"
          @uploader="$emit('usa_stock_upload_photos', $event)"
          chooseLabel="Upload Photos"
          :multiple="true"
        />
        <Button
          type="button"
          class="p-button-success w-100 mt-2 mb-2"
          label="Change Queue"
          @click="$emit('usa_stock_photos_change_queue', photos)"
        />
        <DataTable
          :value="photos"
          :reorderableColumns="true"
          @row-reorder="usaReOrder($event)"
        >
          <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="false" />
          <Column field="Id" header="Id"> </Column>
          <Column field="UrunId" header="Product Id"> </Column>
          <Column field="Image" header="Image">
            <template #body="slotProps">
              <img
                :src="'https://cdn.mekmarimage.com/usa-products/' + slotProps.data.Image"
                width="100"
                height="100"
              />
            </template>
          </Column>
          <Column field="Sira" header="Queue"> </Column>
          <Column header="#">
            <template #body="slotProps">
                <Button label="Delete" class="p-button-danger" @click="deletePhotos(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
      </TabPanel>
    </TabView>

    <div class="row">
      <div class="col">
        <Button
          class="p-button-success w-100"
          label="Save"
          type="button"
          @click="$emit('panel_usa_process_emit', model)"
        />
      </div>
      <div class="col">
        <Button class="p-button-danger w-100" label="Delete" type="button" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    model: {
      type: Object,
      required: false,
    },
    photos: {
      type: Array,
      required: false,
    },
  },
  methods: {
    hashtagsInput(event){
      this.model.hashtags = event.trim();
      
    },
    hashtagsInputFr(event){
      this.model.hashtags_fr = event.trim();
      
    },
    hashtagsInputEs(event){
      this.model.hashtags_es = event.trim();
      
    },
    usaReOrder(event) {
      let index = 1;
      let data = [];
      event.value.forEach((x) => {
        x.Sira = index;
        data.push(x);
        index++;
      });
      this.$store.commit("setpanelUsaStockPhotosList", data);
    },
    deletePhotos(event){
      this.$axios.get(`/api/usa/photo/delete/${event.Id}`)
      .then(res=>{
        if(res.data.status){
          this.$toast.success('Resim Başarıyla Silindi.');
          this.$store.dispatch('setpanelUsaStockPhotosList',this.model.UrunId);
        }else{
          this.$toast.success('Resim silme işlemi başarısız.');

        }
      });

    }
  },
};
</script>
<style scoped>
@media screen and (max-width:575px) {
  .row{
  clear: both;
  width:100%;
  display:block;
}
.col{
  clear:both;
  width:100%;
  display:block;
}
}
</style>