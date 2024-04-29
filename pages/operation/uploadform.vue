<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <uploadForm :orders="getOrdersAllList" />
      </div>
      <div class="col">
        <uploadList
          :model="getDocumentModelList"
          @document_form_emit="documentForm($event)"
        />
      </div>
    </div>
    <Dialog :visible.sync="document_form" header="" modal>
      <docform :link="document_link"/>
    </Dialog>
    <Dialog :visible.sync="document_isf_form" header="" modal>
      <isfform :isf="getDocumentSupplierList"/>
    </Dialog>
    <Dialog :visible.sync="document_supplier_form" header="" modal>
      <supplierform :supplier="getDocumentProductSupplierList"/>
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  middleware: ["authority"],
  computed: {
    ...mapGetters(["getOrdersAllList", "getDocumentModelList", "getDocForm","getDocumentSupplierList","getDocumentProductSupplierList"]),
  },
  data() {
    return {
      document_form: false,
      document_link:null,
      document_isf_form:false,
      document_supplier_form:false
    };
  },
  created() {
    this.$store.dispatch("setDocumentModelList");
  },
  methods: {
    documentForm(event) {
      const id = event.ID;
      const po = event.SiparisNo;
      const container = event.KonteynerFirmaID;
      const document = event.EvrakAdi;
      const docName = event.DocName;
      if(event.EvrakAdi == 'Proforma Invoice'){
        this.document_link = `https://file-service.mekmar.com/file/download/2/${po}`;
        this.document_form = true;
      };
      if(event.EvrakAdi == 'Çeki Listesi'){
        this.document_link = `https://file-service.mekmar.com/file/download/4/${po}`;
        this.document_form = true;
      };

      if(event.EvrakAdi == 'Purchase Order'){
        this.document_link = `https://file-service.mekmar.com/file/download/1/${po}`;
        this.document_form = true;
      };
      if(event.EvrakAdi == 'Yükleme Notası'){
        this.document_link = `https://file-service.mekmar.com/file/download/5/${po}`;
        this.document_form = true;
      };
      if(event.EvrakAdi == 'Mekmar-Efes Gümrük Faturası'){
        this.document_link = `https://file-service.mekmar.com/file/download/6/${po}`;
        this.document_form = true;
      };
      if(event.EvrakAdi == 'Gümrük Notası'){
        this.document_link = `https://file-service.mekmar.com/file/download/7/${po}`;
        this.document_form = true;
      };
      if(event.EvrakAdi == 'ISF vb Formlar'){
        this.document_link = `https://file-service.mekmar.com/file/download/8/${po}`;
        this.document_form = true;
      };

      if(event.EvrakAdi == 'Konşimento'){
        this.document_link = `https://file-service.mekmar.com/file/download/9/${po}`;
        this.document_form = true;
      };
      if(event.EvrakAdi == 'İlaçlama Belgesi'){
        this.document_link = `https://file-service.mekmar.com/file/download/10/${po}`;
        this.document_form = true;
      };
      if(event.EvrakAdi == 'Dolaşım Belgeleri'){
        this.document_link = `https://file-service.mekmar.com/file/download/11/${po}`;
        this.document_form = true;
      };
      if(event.EvrakAdi == 'Gçb Beyannamesi'){
        this.document_link = `https://file-service.mekmar.com/file/download/12/${po}`;
        this.document_form = true;
      };
      if(event.EvrakAdi == 'Nakliye Faturaları'){
        this.document_link = `https://file-service.mekmar.com/file/download/13/${po}`;
        this.document_form = true;
      };
      if(event.EvrakAdi == 'Packing Declarition'){
        this.document_link = `https://file-service.mekmar.com/file/download/14/${po}`;
        this.document_form = true;
      };
      if(event.EvrakAdi == 'L-C Metin'){
        this.document_link = `https://file-service.mekmar.com/file/download/15/${po}`;
        this.document_form = true;
      };
      if(event.EvrakAdi == 'Commer Invoice'){
        this.document_link = `https://file-service.mekmar.com/file/download/16/${po}`;
        this.document_form = true;
      };
      if(event.EvrakAdi == 'Packing List'){
        this.document_link = `https://file-service.mekmar.com/file/download/17/${po}`;
        this.document_form = true;
      };
      if(event.EvrakAdi == 'Booking'){
        this.document_link = `https://file-service.mekmar.com/file/download/20/${po}`;
        this.document_form = true;
      };
      if(event.EvrakAdi == "Denizcilik Faturaları"){

        this.document_link = `https://file-service.mekmar.com/file/download/customer/${container}/${docName}`;
        this.document_form = true;
      };
      if(event.EvrakAdi == 'İlaçlama Notası' ){
        this.document_link = `https://file-service.mekmar.com/file/download/71/${po}`;
                this.document_form = true;

            };
      if(event.EvrakAdi == 'Fotolar' ){
        this.document_link = `https://file-service.mekmar.com/file/download/72/${po}`;
          this.document_form = true;

      };

      if(event.EvrakAdi  == 'Draft' ){
        this.document_link = `https://file-service.mekmar.com/file/download/99/${po}`;
                this.document_form = true;

            };





      if(event.EvrakAdi == 'İç Sipariş'){
        this.$store.dispatch('setDocumentSupplierList',po);
        this.document_isf_form = true;
      };
      if(event.EvrakAdi == 'Tedarikçi Faturaları'){
        this.$store.dispatch('setDocumentProductSupplierList',event.SiparisNo);
        this.document_supplier_form = true;
      }

    },
  },
};
</script>
