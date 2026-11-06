<template>
  <div class="row">
    <div class="col-4">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Producer</th>
            <th scope="col">Month (SQM)</th>
            <th scope="col">Month (PCS)</th>
            <th scope="col">Month (MT)</th>

            <th scope="col">Year (SQM)</th>
            <th scope="col">Year (PCS)</th>
            <th scope="col">Year (MT)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Mekmer</th>
            <td>{{ formatDecimal(productionTotal.mekmerMonthSqm) }}</td>
            <td>{{ formatDecimal(productionTotal.mekmerMonthPcs) }}</td>
            <td>{{ formatDecimal(productionTotal.mekmerMonthMt) }}</td>

            <td>{{ formatDecimal(productionTotal.mekmerYearSqm) }}</td>
            <td>{{ formatDecimal(productionTotal.mekmerYearPcs) }}</td>
            <td>{{ formatDecimal(productionTotal.mekmerYearMt) }}</td>
          </tr>
          <tr>
            <th>Mekmoz</th>
            <td>{{ formatDecimal(productionTotal.mekmozMonthSqm) }}</td>
            <td>{{ formatDecimal(productionTotal.mekmozMonthPcs) }}</td>
            <td>{{ formatDecimal(productionTotal.mekmozMonthMt) }}</td>

            <td>{{ formatDecimal(productionTotal.mekmozYearSqm) }}</td>
            <td>{{ formatDecimal(productionTotal.mekmozYearPcs) }}</td>
            <td>{{ formatDecimal(productionTotal.mekmozYearMt) }}</td>
          </tr>
          <tr>
            <th>External Crates</th>
            <td>{{ formatDecimal(productionTotal.disMonthSqm) }}</td>
            <td>{{ formatDecimal(productionTotal.disMonthPcs) }}</td>
            <td>{{ formatDecimal(productionTotal.disMonthMt) }}</td>
            <td>{{ formatDecimal(productionTotal.disYearSqm) }}</td>
            <td>{{ formatDecimal(productionTotal.disYearPcs) }}</td>
            <td>{{ formatDecimal(productionTotal.disYearMt) }}</td>
          </tr>
          <tr>
            <th>Total</th>

            <td>
              <b>{{ formatDecimal(productionTotal.monthTotalSqm) }}</b>
            </td>
            <td>
              <b>{{ formatDecimal(productionTotal.monthTotalPcs) }}</b>
            </td>
            <td>
              <b>{{ formatDecimal(productionTotal.monthTotalMt) }}</b>
            </td>
            <td>
              <b>{{ formatDecimal(productionTotal.yearTotalSqm) }}</b>
            </td>
            <td>
              <b>{{ formatDecimal(productionTotal.yearTotalPcs) }}</b>
            </td>
            <td>
              <b>{{ formatDecimal(productionTotal.yearTotalMt) }}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-1">
      <Button
        type="button"
        severity="success"
        class="w-100 mb-2"
        label="New"
        @click="newForm"
      />
      <Button
        type="button"
        severity="secondary"
        class="w-100"
        label="Bulk Edit"
        @click="add_bulk_crate_dialog_status = !add_bulk_crate_dialog_status"
      />
    </div>
    <div class="col-1">
      <Button
        type="button"
        severity="primary"
        class="w-100 mb-2"
        label="Mekmer"
        @click="$emit('products_status_selected', 1)"
      />
      <Button
        type="button"
        severity="secondary"
        class="w-100 mb-2"
        label="External Crates"
        @click="$emit('products_status_selected', 2)"
      />
      <Button
        type="button"
        severity="warn"
        class="w-100 mb-2"
        label="Ext. Crates in Mekmer"
        @click="$emit('products_status_selected', 3)"
      />
      <Button
        type="button"
        severity="danger"
        class="w-100"
        label="Not Found"
        @click="$emit('products_status_selected', 4)"
      />
    </div>
    <div class="col-1">
      <Button
        severity="secondary"
        type="button"
        label="Selection Excel"
        @click="selection_click_excel"
        :disabled="selection_orders_disabled"
      />

      <br />

      <Dropdown
        class="mt-1"
        v-model="selectedEfeTicket"
        :options="efeTickets"
        optionLabel="name"
        placeholder="EFE Labels"
        @change="downloadEfeTicket($event)"
      />

      <a
        :href="ticketLink"
        download
        type="button"
        class="btn btn-secondary"
        v-if="!isEfeTicketForm"
        >Download</a
      >
    </div>
    <div class="col-1">
      <Button
        severity="secondary"
        type="button"
        label="Orders Excel"
        @click="orders_click_excel"
        :disabled="selection_orders_disabled"
      />
    </div>
    <div class="col-1">
      <Button
        severity="secondary"
        type="button"
        label="Ticket"
        @click="ticket_click_excel"
      />
    </div>
    <div class="col-3">
      <div class="row">
        <div class="col-6">
          <Dropdown
            v-model="selectedVeikBox"
            :options="etiketlerVeikKutu"
            optionLabel="urun"
            placeholder="VEIK Box Labels"
            class="w-100 mb-2"
            @change="isDropDownChange($event)"
          />
        </div>
        <div class="col-6">
          <Dropdown
            v-model="selectedVeikCrate"
            :options="etiketlerVeikKasa"
            optionLabel="urun"
            placeholder="Veik Crate Labels"
            class="w-100 mb-2"
            @change="isDropDownChange($event)"
          />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <a
            :href="boxCrateTicket"
            download
            type="button"
            class="btn btn-secondary w-100"
            >Download</a
          >
        </div>
      </div>
    </div>
    <Dialog
      v-model:visible="add_bulk_crate_dialog_status"
      modal
      header="Bulk Edit"
    >
      <div class="row mt-3">
        <div class="col-4">
          <FloatLabel>
            <AutoComplete
              v-model="selectedPo"
              inputId="po"
              :suggestions="filteredOrdersPo"
              optionLabel="SiparisNo"
              @complete="searchOrdersPo"
              @item-select="ordersPoSelected($event)"
            />
            <label for="po">Po</label>
          </FloatLabel>
        </div>
        <div class="col-4">
          <FloatLabel>
            <Dropdown
              v-model="selectedProduct"
              :options="product_list"
              optionLabel="Aciklama"
              placeholder="Products"
              class="mb-4"
              style="width: 300px"
              @change="productSelected($event)"
            />
            <label for="products">Products</label>
          </FloatLabel>
        </div>
        <div class="col-4">
          <Button
            type="button"
            label="Change"
            severity="success"
            class="w-100"
            @click="update"
            :disabled="bulk_edit_update_button_status"
          />
        </div>
      </div>

      <DataTable
        v-model:selection="selectedBulkProducts"
        :value="selectionStore.getProductList"
        dataKey="KasaNo"
        tableStyle="min-width: 50rem"
        v-model:filters="filters2"
        filterDisplay="row"
        columnResizeMode="fit"
        showGridlines
        paginator
        :rows="10"
      >
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column
          field="KasaNo"
          header="Crate No"
          :showFilterMenu="false"
          :showClearButton="false"
          sortable
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 50px"
            />
          </template>
        </Column>
        <Column
          field="Tarih"
          header="Date"
          :showFilterMenu="false"
          :showClearButton="false"
          sortable
          headerClass="tableHeader"
          bodyClass="tableBody"
        >
          <template #body="slotProps">
            {{ dateToString(slotProps.data.Tarih) }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column
          field="KategoriAdi"
          header="Category"
          :showFilterMenu="false"
          :showClearButton="false"
          sortable
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column
          field="OcakAdi"
          header="Quarry"
          :showFilterMenu="false"
          :showClearButton="false"
          sortable
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column
          field="UrunAdi"
          header="Product"
          :showClearButton="false"
          sortable
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column
          field="YuzeyIslemAdi"
          header="Surface"
          :showFilterMenu="false"
          :showClearButton="false"
          sortable
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column
          field="En"
          header="Width"
          :showFilterMenu="false"
          :showClearButton="false"
          sortable
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 50px"
            />
          </template>
        </Column>
        <Column
          field="Boy"
          header="Height"
          :showFilterMenu="false"
          :showClearButton="false"
          sortable
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 50px"
            />
          </template>
        </Column>
        <Column
          field="Kenar"
          header="Thickness"
          :showFilterMenu="false"
          :showClearButton="false"
          sortable
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 50px"
            />
          </template>
        </Column>
        <Column
          field="Adet"
          header="Pcs in Box"
          :showFilterMenu="false"
          :showClearButton="false"
          sortable
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 50px"
            />
          </template>
        </Column>
        <Column
          field="KutuAdet"
          header="Box Amount"
          :showFilterMenu="false"
          :showClearButton="false"
          sortable
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 50px"
            />
          </template>
        </Column>
        <Column
          field="Miktar"
          header="Amount"
          :showFilterMenu="false"
          :showClearButton="false"
          sortable
        >
          <template #body="slotProps">
            {{ formatDecimal(slotProps.data.Miktar) }}
          </template>

          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 50px"
            />
          </template>
        </Column>

        <Column
          field="SiparisAciklama"
          header="Po"
          :showFilterMenu="false"
          :showClearButton="false"
          sortable
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
        <Column
          field="Aciklama"
          header="Expl."
          :showFilterMenu="false"
          :showClearButton="false"
          sortable
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @input="filterCallback()"
              class="p-column-filter"
              style="width: 80px"
            />
          </template>
        </Column>
      </DataTable>
    </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "@primevue/core/api"
import { useSelectionStore } from "~/stores/selection"
import { useOrderStore } from "~/stores/order"

export default {
  computed: {
    selectionStore() {
      return useSelectionStore()
    },
    orderStore() {
      return useOrderStore()
    },
  },
  props: {
    productionTotal: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedProduct: {},
      product_list: [],
      bulk_edit_update_button_status: true,
      filteredOrdersPo: null,
      selectedPo: null,
      ordersPo: [],
      filters2: {
        KasaNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KategoriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        OcakAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        UrunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        YuzeyIslemAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        En: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        SiparisAciklama: {
          value: null,
          matchMode: FilterMatchMode.STARTS_WITH,
        },
        Aciklama: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

        Adet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        KutuAdet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        Miktar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      selectedBulkProducts: [],
      add_bulk_crate_dialog_status: false,
      selection_orders_disabled: true,
      boxCrateTicket: null,
      code: null,
      etiketlerVeikKutu: [
        {
          code: "SNS01",
          urun: "MINA RUSTIC KENARI KIRIK (SNS01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SNS01.doc",
        },
        {
          code: "SNS02",
          urun: "MINA RUSTIC DÜZ KENAR (SNS02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SNS02.doc",
        },
        {
          code: "SBR01",
          urun: "SILVER RUSTIC KENARI KIRIK (SBR01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBR01.doc",
        },
        {
          code: "SBR02",
          urun: "SILVER RUSTIC DÜZ KENAR (SBR02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBR02.doc",
        },
        {
          code: "SBY01",
          urun: "ELA KENARI KIRIK (SBY01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBY01.doc",
        },
        {
          code: "SBY02",
          urun: "ELA DÜZ KENAR (SBY02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBY02.doc",
        },
        {
          code: "SBS01",
          urun: "PICASSO KENARI KIRIK (SBS01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBS01.doc",
        },
        {
          code: "SBS02",
          urun: "PICASSO DÜZ KENAR (SBS02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBS02.doc",
        },
        {
          code: "VKGD-SNS",
          urun: "CLASSIC VEIN CUT DÜZ KENAR (VKGD-SNS)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SNS01.doc",
        },
        {
          code: "VKCS-FM01",
          urun: "GOLD (VKCS-FM01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SNS01.doc",
        },
        {
          code: "VKCS-FM02",
          urun: "SILVER (VKCS-FM02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SNS01.doc",
        },
        {
          code: "STS01",
          urun: "IVORY RUSTİC (STS01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SNS01.doc",
        },
      ],
      etiketlerNovaKutu: [
        { code: "FP-01", urun: "SCABOS KENARI KIRIK (FP-01)" },
        { code: "FP-02", urun: "PICASSO KENARI KIRIK (FP-02)" },
        { code: "FP-03", urun: "IVORY RUSTIC KENARI KIRIK (FP-03)" },
        { code: "FP-04", urun: "CLASSIC MINA KENARI KIRIK (FP-04)" },
        { code: "FP-05", urun: "GOLDEN INK KENARI KIRIK (FP-05)" },
        { code: "FP-06", urun: "BAOMIX KENARI KIRIK (FP-06)" },
        { code: "FP-07", urun: "MINA RUSTIC KENARI KIRIK (FP-07)" },
        { code: "FP-08", urun: "VANILLA BEIGE KENARI KIRIK (FP-08)" },
        { code: "FP-09", urun: "ELA KENARI KIRIK (FP-09)" },
        { code: "FP-10", urun: "SILVER RUSTIC KENARI KIRIK (FP-10)" },
      ],
      etiketlerVeikKasa: [
        {
          code: "SNS-01-K",
          urun: "MINA RUSTIC KENARI KIRIK (SNS01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SNS-01-K.doc",
        },
        {
          code: "SNS-02-K",
          urun: "MINA RUSTIC DÜZ KENAR (SNS02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SNS-02-K.doc",
        },
        {
          code: "SBR-01-K",
          urun: "SILVER RUSTIC KENARI KIRIK (SBR01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBR-01-K.doc",
        },
        {
          code: "SBR-02-K",
          urun: "SILVER RUSTIC DÜZ KENAR (SBR02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBR-02-K.doc",
        },
        {
          code: "SBY-01-K",
          urun: "ELA KENARI KIRIK (SBY01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBY-01-K.doc",
        },
        {
          code: "SBY-02-K",
          urun: "ELA DÜZ KENAR (SBY02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBY-02-K.doc",
        },
        {
          code: "SBS-01-K",
          urun: "PICASSO KENARI KIRIK (SBS01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBS-01-K.doc",
        },
        {
          code: "SBS-02-K",
          urun: "PICASSO DÜZ KENAR (SBS02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SBS-02-K.doc",
        },
        {
          code: "ST-450-K",
          urun: "MINA RUSTIC DÜZ KENAR (ST-450)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/ST-450-K.doc",
        },
        {
          code: "ST-448-K",
          urun: "SILVER RUSTIC DÜZ KENAR (ST-448)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/ST-448-K.doc",
        },
        {
          code: "VKGD-SNS-K",
          urun: "CLASSIC VEIN CUT DÜZ KENAR (VKGD-SNS)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/VKGD-SNS-K.doc",
        },
        {
          code: "VKCS-FM01-K",
          urun: "GOLD (VKCS-FM01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/VKCS-FM01-K.doc",
        },
        {
          code: "VKCS-FM02-K",
          urun: "SILVER (VKCS-FM02)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/VKCS-FM02-K.doc",
        },
        {
          code: "STS-01-K",
          urun: "IVORY RUSTIC (STS01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/STS-01-K.doc",
        },
        {
          code: "SAS01",
          urun: "ELA MOSAIC (SAS01)",
          link: "https://file-service.mekmar.com/file/download/etiket/1/SAS01.doc",
        },
        {
          code: "SBR-01-1",
          urun: "SILVER MINI PATTERN (SBR-01-1)",
          link: "https://cdn.mekmarimage.com/etiket/SBR-01-1.doc",
        },
        {
          code: "SBY-02-1",
          urun: "ELA MINI PATTERN (SBY-02-1)",
          link: "https://cdn.mekmarimage.com/etiket/SBY-02-1.doc",
        },
        {
          code: "ST448-1",
          urun: "Silver 15,25x30,5 Unfilled Brushed (ST448-1)",
          link: "https://cdn.mekmarimage.com/etiket/ST448-1.doc",
        },
        {
          code: "ST450-1",
          urun: "Mina Rustic 15,25x30,5 Unfilled Brushed (ST450-1)",
          link: "https://cdn.mekmarimage.com/etiket/ST450-1.doc",
        },
      ],
      etiketlerNovaKasa: [
        { code: "FP-01-K", urun: "SCABOS KENARI KIRIK (FP-01)" },
        { code: "FP-02-K", urun: "PICASSO KENARI KIRIK (FP-02)" },
        { code: "FP-03-K", urun: "IVORY RUSTIC KENARI KIRIK (FP-03)" },
        { code: "FP-04-K", urun: "CLASSIC MINA KENARI KIRIK (FP-04)" },
        { code: "FP-05-K", urun: "GOLDEN INK KENARI KIRIK (FP-05)" },
        { code: "FP-06-K", urun: "BAOMIX KENARI KIRIK (FP-06)" },
        { code: "FP-07-K", urun: "MINA RUSTIC KENARI KIRIK (FP-07)" },
        { code: "FP-08-K", urun: "VANILLA BEIGE KENARI KIRIK (FP-08)" },
        { code: "FP-09-K", urun: "ELA KENARI KIRIK (FP-09)" },
        { code: "FP-10-K", urun: "SILVER RUSTIC KENARI KIRIK (FP-10)" },
      ],
      /*
       * YINELENEN ANAHTARLAR TEMIZLENDI -- bkz. alt nottaki [2].
       * Kaynakta bu dordu IKI KEZ yaziliydi (once {} sonra null);
       * JS nesne literalinde SON kazanir, yani etkin deger null'di.
       * {} olanlar olu koddu.
       */
      selectedVeikBox: null,
      selectedVeikCrate: null,
      selectedNovaBox: null,
      selectedNovaCrate: null,
      isEfeTicketForm: true,
      ticketLink: null,
      selectedEfeTicket: null,
      efeTickets: [
        {
          name: "12x24",
          link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2012x24.docx",
        },
        {
          name: "16x16",
          link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2016x16.docx",
        },
        {
          name: "16x24",
          link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2016x24.docx",
        },
        {
          name: "18x18",
          link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2018x18.docx",
        },
        {
          name: "Pattern Set",
          link: "https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%20set.docx",
        },
      ],
      excelColumnsField: [
        {
          label: "Kasa No",
          field: "KasaNo",
        },
        {
          label: "Ocak Adı",
          field: "OcakAdi",
        },
        {
          label: "Firma Adı",
          field: "FirmaAdi",
        },
        {
          label: "Kategori",
          field: "KategoriAdi",
        },
        {
          label: "Urun",
          field: "UrunAdi",
        },
        {
          label: "Yuzey",
          field: "YuzeyIslemAdi",
        },
        {
          label: "En",
          field: "En",
        },
        {
          label: "Boy",
          field: "Boy",
        },
        {
          label: "Kenar",
          field: "Kenar",
        },
        {
          label: "Kutu Adet",
          field: "KutuAdet",
        },
        {
          label: "Kutu Ici Adet",
          field: "KutuIciAdet",
        },
        {
          label: "Adet",
          field: "Adet",
        },

        {
          label: "Miktar",
          field: "Miktar",
          dataFormat: this.formatDecimal,
        },
        {
          label: "Ürün Birim",
          field: "UrunBirimAdi",
        },
        {
          label: "Po",
          field: "SiparisAciklama",
        },
        {
          label: "Açıklama",
          field: "Aciklama",
        },
      ],
      ticketDate: new Date(),
      selectedCity: null,
      cities: [],
      selectionListExcelFields: {
        "Kasa No": "KasaNo",
        "Ocak Adı": "OcakAdi",
        "Firma Adı": "FirmaAdi",
        Kategori: "KategoriAdi",
        Urun: "UrunAdi",
        Yuzey: "YuzeyIslemAdi",
        En: "En",
        Boy: "Boy",
        Kenar: "Kenar",
        "Kutu Adet": "KutuAdet",
        "Kutu Ici Adet": "KutuIciAdet",
        Adet: "Adet",
        Miktar: "Miktar",
        "Ürün Birim": "UrunBirimAdi",

        Po: "SiparisAciklama",
        Açıklama: "Aciklama",
      },

      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
  /*
   * created() -> mounted(): created() SSR'da da calisir, icindeki async
   * is BEKLENMEZ ve liste BOS serialize edilir (bkz. commit 2afc877e3).
   * mounted() sunucuda hic calismaz.
   */
  async mounted() {
    this.orderStore.setOrderProductionMekmerList().then((res) => {
      if (res) {
        this.selection_orders_disabled = false
      }
    })

    try {
      const api = useLegacyApi()
      this.ordersPo = (await api.get("/orders")).data.orders ?? []
    } catch (err) {
      /* Kaynakta .catch YOKTU: istek patlarsa islenmemis ret dusuyordu. */
      console.error("/orders cekilemedi:", err)
    }
  },
  methods: {
    /* async ve event GEREKSIZ: govde tek bir bayrak atamasi. */
    productSelected() {
      this.bulk_edit_update_button_status = false
    },
    async ordersPoSelected(event) {
      try {
        const api = useLegacyApi()
        const product = await api.get(
          `/order/products/normal/${event.value.SiparisNo}`,
        )
        this.product_list = product.data.products ?? []
      } catch (err) {
        console.error("ordersPoSelected basarisiz:", err)
      }
    },
    searchOrdersPo(event) {
      const query = event.query?.toLowerCase();

      this.filteredOrdersPo = !query
        ? [...this.ordersPo]
        : this.ordersPo.filter((order) =>
            order.SiparisNo.toLowerCase().includes(query)
          );
    },
    async update() {
      if (confirm("Are you sure you want to update the selected crates?")) {
        const data = {
          po: this.selectedPo.SiparisNo,
          crates: this.selectedBulkProducts,
          product_id: this.selectedProduct.UrunKartId,
        };
        const toast = useAppToast()
        try {
          const api = useLegacyApi()
          await api.put("/selection/input/bulk/edit", data)
          this.selectedBulkProducts = []
          this.add_bulk_crate_dialog_status = false
          this.orderStore.setOrderProductionMekmerList()
          toast.success("Success")
        } catch (err) {
          console.error("bulk edit basarisiz:", err)
          toast.error("Error")
        }
      }
    },
    /*
     * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
     *   eski: POST + GET {excelServerBase}/seleksiyon/etiket/excel
     *   yeni: POST /excel-api/selection/labels   (tek istek)
     *         server/routes/excel-api/selection/labels.post.ts
     *
     * Cikti uretimdekiyle KARSILASTIRILDI: deger, sayi bicimi, hucre
     * stili, 9 birlestirme, satir yuksekligi ve sutun genisligi
     * farki 0.
     *
     * [!] Python bu ucta BOS BIR METIN ALANINDA (orn. KategoriAdi)
     *     dizge birlestirmesi yuzunden TypeError firlatip tum raporu
     *     dusuruyordu; bos SAYI alanlari ise etikete LITERAL "None"
     *     olarak basiliyordu. Nitro tarafinda ikisi de bos dizge.
     *
     * `if (res.status)` DUSTU: HTTP durumunu (daima 200) okuyordu,
     * govdedeki {"status": false}'u DEGIL.
     */
    async ticket_click_excel() {
      try {
        await exportExcel(
          "/excel-api/selection/labels",
          this.selectionStore.getFilteredSelectionList,
          "seleksiyon_etiket.xlsx",
        )
      } catch (err) {
        console.error("seleksiyon etiket ciktisi basarisiz:", err)
        useAppToast().error("Excel olusturulamadi.")
      }
    },
    /*
     * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
     *   eski: POST + GET
     *         {excelServerBase}/siparisler/dosyalar/seleksiyon/excel/output
     *   yeni: POST /excel-api/selection/output   (tek istek)
     *         server/routes/excel-api/selection/output.post.ts
     *
     * Cikti uretimdekiyle KARSILASTIRILDI: deger, sayi bicimi, hucre
     * stili ve sutun genisligi farki 0.
     *
     * `if (response.status)` DUSTU: HTTP durumunu (daima 200)
     * okuyordu, govdedeki {"status": false}'u DEGIL.
     */
    async selection_click_excel() {
      try {
        await exportExcel(
          "/excel-api/selection/output",
          this.selectionStore.getProductList,
          "selection.xlsx",
        )
      } catch (err) {
        console.error("seleksiyon excel ciktisi basarisiz:", err)
        useAppToast().error("Excel olusturulamadi.")
      }
    },

    async orders_click_excel() {
      /*
       * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
       *   eski: POST + GET
       *         {excelServerBase}/siparisler/dosyalar/uretimExcelCikti
       *   yeni: POST /excel-api/orders/uretim   (tek istek)
       *         server/routes/excel-api/orders/uretim.post.ts
       *
       * Ayni uc alti yerden cagriliyor; govde tek yerde
       * (server/utils/uretim-excel.ts) ve gercek veriyle uretimle
       * karsilastirildi: fark 0.
       *
       * `if (response.status)` DUSTU -- HTTP durumunu (daima 200)
       * okuyordu, govdedeki {"status": false}'u DEGIL.
       */
      try {
        await exportExcel(
          "/excel-api/orders/uretim",
          this.orderStore.getOrderList,
          "Uretim_list.xlsx",
        )
      } catch (err) {
        console.error("uretim listesi ciktisi basarisiz:", err)
        useAppToast().error("Excel olusturulamadi.")
      }
    },
    isDropDownChange(event) {
      this.code = event.value.code;
      this.boxCrateTicket = event.value.link;
    },
    downloadEfeTicket(event) {
      this.isEfeTicketForm = false;
      this.ticketLink = event.value.link;
    },
    newForm() {
      this.selectionStore.setSelectionProductionButtonStatus(true)
      this.$emit("selection_production_dialog", true)
    },
    /*
     * NULL KORUMASI EKLENDI -- bkz. alt nottaki [3].
     * Kaynakta govde dogrudan `value.toString()` cagiriyordu ve
     * productionTotal {} ile basladigi icin ILK RENDER'DA patliyordu.
     *
     * BICIM KORUNDU: global utils/formatters.js icindeki ayni adli
     * fonksiyon binlik ayrac + 2 ondalik uretiyor ("1.234,56"); bu
     * yerel surum yalnizca noktayi virgulle degistiriyor. Yereli
     * silip global auto-import tarafina birakmak GORUNUR bir bicim
     * degisikligi olurdu, bu yuzden yerel metot korundu (Options
     * API'de methods, auto-import tarafindan once gelir).
     */
    /*
     * Virgulden sonra IKI HANE (kullanici istegi, 2026-10-16).
     *
     * Kaynak `value.toString()` yaziyordu, yani yuvarlama YOKTU:
     * uretim toplamlari "1234,5678901" gibi uzun ondaliklarla
     * gorunuyordu. Artik toFixed(2).
     *
     * BINLIK AYRAC EKLENMEDI: global utils/formatters.js icindeki ayni
     * adli fonksiyon ayrica gruplama yapiyor ("1.234,56"). Burada
     * yalnizca ondalik hane istendigi icin gruplama BILEREK disarida
     * birakildi -- gorunum "1234,56".
     *
     * Bos deger "" donuyor (0 DEGIL): productionTotal store'da {} ile
     * basliyor ve veri gelene kadar hucrelerin bos kalmasi korunuyor.
     */
    formatDecimal(value) {
      if (value === null || value === undefined || value === "") return ""

      const n = Number(value)
      if (Number.isNaN(n)) return ""

      return n.toFixed(2).replace(".", ",")
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 576px) {
  .row {
    clear: both;
    display: block;
    width: 100%;
  }
  .col-3 {
    clear: both;
    display: block;
    width: 100%;
  }
  .col-2 {
    clear: both;
    display: block;
    width: 100%;
  }
  .col-1 {
    clear: both;
    display: block;
    width: 100%;
  }
}
</style>

<!--
  components/selection/input/selection.vue
     -> app/components/selection/input/Panel.vue

  DOSYA ADI: Nuxt 2'de bu bileşen `selection` adiyla ELLE global
  kaydediliyordu (plugins/components.js:243) -- TEK KELIME, otomatik ice
  alma icin kullanilamaz bir ad. Icerigi uretim ozet tablosu + dort
  durum butonu + uc excel cikisi + toplu kasa duzenleme diyalogu, yani
  bir PANEL; pilotta chat/Panel.vue ve upload/MissingPanel.vue ile ayni
  adlandirma. Otomatik ice alma adi `SelectionInputPanel`.

  ============================================================
  [1] OLU VE KIRIK UC METOT KALDIRILDI
  ============================================================
  Ucu de sablondan HIC cagrilmiyordu (sablondaki tum @click/@change
  isleyicileri tarandi):

  [x] downloadPoTicket() -- `selectionService.getPoTicketDownload(...)`
      cagiriyordu ama `selectionService` BU DOSYADA (ve kod tabaninda
      BASKA HIC BIR YERDE) tanimli/import edilmis DEGIL. Cagrilsaydi
      "ReferenceError: selectionService is not defined" verirdi.
      Erisilemez oldugu icin canli bir hata degildi -- olu ve kirik kod.
  [x] download() -- `this.$refs.download.exportTable(...)` cagiriyordu
      ama sablonda `ref="download"` diye bir oge YOK; cagrilsaydi
      TypeError verirdi. (Muhtemelen kaldirilmis bir vue-json-excel
      bileşeninden arta kalma.)
  [x] ticketDateSelect() -- govdesi year/month/day hesaplayip HICBIR
      SEY yapmiyordu.

  Bunun yan etkisi: `code` data alani artik yalnizca YAZILIYOR
  (isDropDownChange onu set ediyor), okuyan tek yer silinen
  downloadPoTicket'ti. Alan BIRAKILDI cunku isDropDownChange ayni anda
  `boxCrateTicket`i de yaziyor ve o sablonda KULLANILIYOR; yalnizca
  `code`u ayiklamak icin o metodu degistirmek gerekirdi.

  ============================================================
  [2] data() ICINDE YINELENEN DORT ANAHTAR
  ============================================================
  Kaynakta sunlar IKI KEZ yaziliydi:
      selectedVeikBox: {},   ... sonra ...  selectedVeikBox: null,
      selectedVeikCrate: {},               selectedVeikCrate: null,
      selectedNovaBox: {},                 selectedNovaBox: null,
      selectedNovaCrate: {},               selectedNovaCrate: null,

  JS nesne literalinde SON kazanir, yani etkin baslangic degeri `null`
  idi ve `{}` olanlar tamamen olu koddu. Hata vermez, sessizce yok
  sayilir. Tek kopya (null) birakildi.

  (Ayni hata sinifi Vuex'in models.js'inde de vardi ve verify-stores
  denetcisine ayri bir kontrol olarak eklenmisti -- "UCUNCU KONTROL:
  ayni blokta YINELENEN anahtar".)

  ============================================================
  [3] formatDecimal ILK RENDER'DA PATLIYORDU
  ============================================================
  Kaynak:
      formatDecimal(value) {
        const data = value.toString().replace(".", ",")
        return data
      }

  Sablon bunu 24 yerde `formatDecimal(productionTotal.mekmerMonthSqm)`
  gibi cagiriyor. `productionTotal` store'da `{}` ile basliyor, yani o
  alanlar veri gelene kadar `undefined`:
      undefined.toString()  ->  TypeError
  Yani bileşen, uretim toplami istegi donene kadar RENDER EDILEMIYORDU.

  `value === null || value === undefined` korumasi eklendi (bos dizge
  donuyor).

  YEREL METOT SILINMEDI: pilotta global bir `formatDecimal` var
  (app/utils/formatters.js) ve o ayrica BINLIK AYRAC koyuyor
  ("1.234,56"). Options API'de `methods` auto-import tarafindan once geldigi
  icin yerel metot korunarak gruplama disarida tutuluyor.

  SONRADAN DEGISTI (2026-10-16, kullanici istegi): tasima sirasinda
  kaynaktaki bicim BIREBIR korunmustu, yani `value.toString()` ile
  YUVARLAMA YOKTU ve uretim toplamlari "1234,5678901" gibi uzun
  ondaliklarla gorunuyordu. Artik `toFixed(2)` -> "1234,56".
  Bu, kaynaktan BILINCLI bir sapma; binlik ayrac yine EKLENMEDI cunku
  istenen yalnizca ondalik hane sayisiydi.

  NOT -- AYNI EKRANDA GRUPLAMA FARKI: List.vue'daki Miktar kolonu ve uc
  footer toplami GLOBAL formatlayicilari kullaniyor (formatDecimal /
  formatDecimal2), yani onlar "1.234,56" seklinde GRUPLU gorunuyor;
  buradaki uretim ozeti ise "1234,56". Ekran icinde tam tutarlilik
  istenirse bu yerel metodu silmek yeterli (global auto-import devralir)
  -- ama o zaman bos hucreler "" yerine "0" gosterir.

  == PRIMEVUE 4 / VUE 3 ZORUNLU DEGISIKLIKLERI ==

  [x] import { FilterMatchMode } from "primevue/api"
         -> "@primevue/core/api"      (alt paket v4'te TAMAMEN kaldirildi)
  [x] <span class="p-float-label"> -> <FloatLabel>   (iki yer; sinif
      v4'te YOK -- etiket input'un uzerine yuzmek yerine yanina duser)
  [x] p-button-success/secondary/primary/warning/danger -> :severity
      (on buton; "warning" severity'sinin v4'teki adi "warn").
      Yanlarindaki duzen siniflari (w-100, mb-2) `class`ta BIRAKILDI.
  [x] AutoComplete `field="SiparisNo"` -> `optionLabel="SiparisNo"`
      (v4'te field prop'u YOK; yoksa oneri listesi [object Object])
  [x] :visible/:selection/:filters + @update:X -> v-model:X
  [x] responsiveLayout="scroll" KALDIRILDI (prop v4'te YOK)
  [x] mapGetters(4 getter) -> selection / order store'lari.
      `getLocalUrl` mapGetters'dan KALKTI -- asagidaki excel notuna bak.
  [x] created() -> mounted() (async fetch SSR'da beklenmez)
  [x] this.$axios -> useLegacyApi() / this.$toast -> useAppToast()
  [x] this.$store.dispatch(...) -> ilgili store action'lari
  [x] `:value="getProductList"` -> `selectionStore.getProductList`
      (sablonda CIPLAK getter adi kalmisti; check-orphan-getters
      yakaladi)
  [x] productSelected(event) -> productSelected(): `async` ve `event`
      gereksizdi, govde tek bir bayrak atamasi.

  == UC EXCEL CIKISI: $excelApi + ELLE <a> -> useExcelApi + yardimci ==
  Ucu de ayni kalibi tekrar ediyordu: excel sunucusuna POST, sonra elle
  <a> olusturup getLocalUrl ile birlestirip click. downloadFromExcelServer()
  yardimcisina verildi; o yol normalize ediyor (getLocalUrl sonda egik
  cizgiyle bittigi icin elle birlestirmede CIFT EGIK CIZGI olusabiliyordu)
  ve olusturdugu <a>'yi DOM'dan KALDIRIYOR -- kaynak kaldirmiyordu, her
  indirmede body'ye bir olu link daha ekleniyordu.
  `if (res.status)` KORUNDU: sarmalayici axios sozlesmesini taklit
  ettigi icin `status` HTTP kodu (200), yani kosul kaynaktaki gibi
  pratikte daima dogru.

  == EKLENEN HATA YAKALAMA ==
  mounted()'daki `/orders` istegi ve ordersPoSelected()'deki urun
  istegi kaynakta `.catch`SIZ `await` idi; patlarsa ISLENMEMIS RET
  dusuyordu. try/catch + console.error eklendi, kullaniciya gosterilen
  bir sey DEGISMEDI.

  == KORUNAN DAVRANISLAR (bilincli) ==

  1) `Dropdown` ADI KORUNDU (dort yer). PrimeVue 4'te Dropdown,
     Select'i extend eden bir uyumluluk sarmalayicisi ve her mount'ta
     "Deprecated since v4" uyarisi basiyor. BU DOSYADA STIL BLOGU
     `.p-dropdown` HEDEFLEMIYOR, yani container.vue'daki gibi gorunur
     bir kirilma YOK (orada :deep(.p-dropdown) kurali vardi ve o yuzden
     Select'e gecildi). Pilotun 19 dosyasi da Dropdown kullandigi icin
     tutarlilik adina korundu; tek maliyeti konsol gurultusu.

  2) Etiket (etiket/doc) indirme baglantilari SABIT ADRESLERLE
     birakildi. Uc AYRI host var: file-service.mekmar.com,
     cdn.mekmarimage.com ve trackit-dosyalama.fra1.digitaloceanspaces.com.
     Bunlar ortam bazli bir API tabani degil, urun basina SABIT DOKUMAN
     baglantilari (veri). runtimeConfig'de yalnizca fileServiceBase var;
     yalnizca onun gectigi yerleri cevirmek tutarsiz olurdu ve diger
     iki host icin yapilandirma girdisi UYDURMAK gerekirdi.

  3) `selection_orders_disabled` yalnizca setOrderProductionMekmerList
     cozunurse false oluyor; action bir deger DONDURMEZSE buton kalici
     devre disi kalir. Kaynaktaki hali.
-->
