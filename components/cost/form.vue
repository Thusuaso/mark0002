<template>
  <div class="container">
    {{ supplierChecked }}
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Freight</th>
          <th scope="col">Logistic</th>
          <th scope="col">Custom</th>
          <th scope="col">Fumigation</th>
          <th scope="col">Port</th>
          <th scope="col">Insurance</th>
          <th scope="col">Lashing</th>
          <th scope="col">Spanzlet</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <span class="p-float-label mb-4 w-100">
              <AutoComplete
                v-model="selectedPo"
                inputId="po"
                :suggestions="filteredPo"
                @complete="searchPo($event)"
                @item-select="poSelected($event)"
                field="SiparisNo"
                class="w-100"
              />
              <label for="po">PO</label>
            </span>
          </th>
          <td>
            <Checkbox v-model="getMekmarCostModel.Freight" :binary="true" />
          </td>
          <td>
            <Checkbox v-model="getMekmarCostModel.Logistic" :binary="true" />
          </td>
          <td>
            <Checkbox v-model="getMekmarCostModel.Custom" :binary="true" />
          </td>
          <td>
            <Checkbox v-model="getMekmarCostModel.Fumigation" :binary="true" />
          </td>
          <td>
            <Checkbox v-model="getMekmarCostModel.Port" :binary="true" />
          </td>
          <td>
            <Checkbox v-model="getMekmarCostModel.Insurance" :binary="true" />
          </td>

          <td>
            <Checkbox v-model="getMekmarCostModel.Lashing" :binary="true" />
          </td>
          <td>
            <Checkbox v-model="getMekmarCostModel.Spanzlet" :binary="true" />
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-show="productList.length > 0">
      <thead>
        <tr>
          <th scope="col">Supplier</th>
          <th scope="col">Invoice</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in productList" :key="index">
          <th scope="row">
            {{ item.FirmaAdi }}
          </th>
          <td>
            <Checkbox
              v-model="item.Invoice"
              :binary="true"
              @change="changeSupplierChecked(item)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="col">
        <Button
          type="button"
          :class="status ? 'p-button-success' : 'p-button-warning'"
          :label="status ? 'Save' : 'Update'"
          @click="process"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    status: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      "getMekmarCostModel",
      "getMekmarPoList",
      "getMekmarProductList",
    ]),
  },
  data() {
    return {
      selectedPo: null,
      filteredPo: null,
      productList: [],
      supplierChecked: [],
    };
  },
  methods: {
    save() {},
    update() {},
    process() {
      if (this.status) {
        this.save();
      } else {
        this.update();
      }
    },
    searchPo(event) {
      if (event.query.length == 0) {
        this.filteredPo = this.getMekmarPoList;
        return;
      } else {
        this.filteredPo = this.getMekmarPoList.filter((po) => {
          return po.SiparisNo.toLowerCase().startsWith(
            event.query.toLowerCase()
          );
        });
      }
    },
    async poSelected(event) {
      this.getMekmarCostModel.Po = event.value.SiparisNo;
      this.productList = await this.getMekmarProductList.filter((x) => {
        return x.SiparisNo === event.value.SiparisNo;
      });
      let index = 1;
      let customProductList = [];
      this.productList.forEach((x) => {
        const customInvoiceName = "Invoice " + index;
        customProductList.push({ ...x, customInvoiceName: false });
        index++;
      });
      this.supplierChecked = [];
      const model = {
        ID: 0,
        Po: "",
        Logistic: false,
        Custom: false,
        Fumigation: false,
        Port: false,
        Insurance: false,
        Lashing: false,
        Spanzlet: false,
        Freight: false,
      };
      this.$store.dispatch("setMekmarCostModel", model);
      this.productList = customProductList;
    },
    changeSupplierChecked(event) {
      if (event.Invoice) {
        this.supplierChecked.push(event);
      } else {
        const index = this.supplierChecked.indexOf((x) => {
          return x.TedarikciID === event.TedarikciID;
        });
        this.supplierChecked.splice(index, 1);
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
