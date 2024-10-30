<template>
  <div>
    <span class="p-float-label w-100 mb-3">
      <AutoComplete
        class="w-100"
        v-model="selectedOrder"
        inputId="order"
        :suggestions="filteredOrders"
        @complete="searchOrders($event)"
        field="SiparisNo"
        @item-select="$store.dispatch('setDocumentList', $event.value.SiparisNo)"
      />
      <label for="order">Po</label>
    </span>
    <FileUpload
      mode="advanced"
      accept=".pdf"
      :maxFileSize="1000000"
      @upload="onUpload"
      :multiple="true"
      :auto="true"
      chooseLabel="Upload Document"
      @select="onUpload($event)"
    />
  </div>
</template>
<script>
import fileService from "../../plugins/upload";
import date from "../../plugins/date";
import Cookies from "js-cookie";

export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedOrder: null,
      filteredOrders: null,
      folderProductInfo: {},
    };
  },
  methods: {
    onUpload(event) {
      for (const item of event.files) {

        if (item.name == "Purchase Order.pdf") {
          this.folderProductInfo = {
            id: 0,
            siparisno: "",
            kullaniciId: "",
            tarih: date.dateToString(new Date()),
          };
          this.folderProductInfo.id = 1;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        
        else if (item.name == "Proforma Invoice.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 2;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "İç Sipariş.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 3;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "Çeki Listesi.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 4;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "Yükleme Notası.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 5;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "Mekmar-Efes Gümrük Faturası.pdf"){
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 6;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
          
        else if (item.name == "Gümrük Notası.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 7;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "ISF vb Formlar.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 8;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "Konşimento.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 9;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "İlaçlama Belgesi.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 10;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }

        else if (item.name == "ATR.pdf"  || item.name == "atr.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 75;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "Gçb Beyannamesi.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 12;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "Packing Declarition.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 14;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "L-C Metin.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 15;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "Commer Invoice.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 16;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "Packing List.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 17;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "Booking.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 20;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "İlaçlama Notası.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 71;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "Fotolar.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 72;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "Draft.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 99;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "Özel İşçilik Faturaları.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 40;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "Certificate of Origin.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 74;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "Dispatch Note.pdf") {
          this.folderProductInfo = {
          id: 0,
          siparisno: "",
          kullaniciId: "",
          tarih: date.dateToString(new Date()),
        };
          this.folderProductInfo.id = 76;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }
        else if (item.name == "Other.pdf") {
          this.folderProductInfo = {
            id: 0,
            siparisno: "",
            kullaniciId: "",
            tarih: date.dateToString(new Date()),
          };
          this.folderProductInfo.id = 77;
          this.folderProductInfo.siparisno = this.selectedOrder.SiparisNo;
          this.folderProductInfo.kullaniciId = Cookies.get("userId");
          this.sendServer(item, this.folderProductInfo.id, this.selectedOrder.SiparisNo);
          this.sendDatabase(this.folderProductInfo);
        }



      };
      this.$store.dispatch("setDocumentList", this.selectedOrder.SiparisNo);
      this.$toast.success("Kayıt Başarılı.");
    },
    searchOrders(event) {
      let result;
      if (event.query.length == 0) {
        result = this.orders;
      } else {
        result = this.orders.filter((x) => {
          return x.SiparisNo.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.filteredOrders = result;
    },
    sendServer(item, id, po) {
      fileService.sendInvoice(item, id, po).then((response) => {
        if (!response) {
          console.log("Hata");
        }
      });
    },
    sendDatabase(event) {
      this.$store.dispatch("setSendDatabaseInvoice", event);
    },
  },
};
</script>
