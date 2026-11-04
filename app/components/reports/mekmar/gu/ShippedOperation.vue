<template>
  <div class="container">
    <Dropdown
      v-model="reportsStore.getMekmarGuSelectedUser"
      :options="users"
      optionLabel="username"
      placeholder="Select a User"
      style="width: 50%"
      @change="userSelected($event)"
    />
    <Button
      type="button"
      severity="primary"
      @click="excel_output"
      label="Excel"
    />

    <!-- <div class="row">
            <div class="col">
                <DataTable :value="reportsStore.getReportsMekmarGuOrdererThisYear" size="small"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="thisYearOrdererSelected($event)" :loading="loading">
                    <template #header>
                        {{ new Date().getFullYear() }} Seller Order
                    </template>
                    <Column field="Month" header="MONTH">
                        <template #body="slotProps">
                            {{ getMonthName(slotProps.data.Month) }}
                        </template>
                    </Column>
                    <Column field="FOB" header="FOB">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.FOB) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOrdererThisYearTotal.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOrdererThisYearTotal.ddp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="reportsStore.getReportsMekmarGuOrdererPreviousYear" size="small"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="previousYearOrdererSelected($event)" :loading="loading">

                    <template #header>
                        {{ new Date().getFullYear() - 1 }} Seller Order
                    </template>
                    <Column field="Month" header="MONTH">
                        <template #body="slotProps">
                            {{ getMonthName(slotProps.data.Month) }}
                        </template>
                    </Column>
                    <Column field="FOB" header="FOB">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.FOB) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOrdererPreviousYearTotal.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOrdererPreviousYearTotal.ddp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="reportsStore.getReportsMekmarGuOrdererTwoYearAgo" size="small"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="twoYearAgoOrdererSelected($event)" :loading="loading">

                    <template #header>
                        {{ new Date().getFullYear() - 2 }} Seller Order
                    </template>
                    <Column field="Month" header="MONTH">
                        <template #body="slotProps">
                            {{ getMonthName(slotProps.data.Month) }}
                        </template>
                    </Column>
                    <Column field="FOB" header="FOB">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.FOB) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOrdererTwoYearAgoTotal.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOrdererTwoYearAgoTotal.ddp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <DataTable :value="reportsStore.getReportsMekmarGuOperationThisYear" size="small"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="thisYearAgoOperationSelected($event)" :loading="loading">
                    >
                    <template #header>
                        {{ new Date().getFullYear() }} Operation Order
                    </template>
                    <Column field="Month" header="MONTH">
                        <template #body="slotProps">
                            {{ getMonthName(slotProps.data.Month) }}
                        </template>
                    </Column>
                    <Column field="FOB" header="FOB">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.FOB) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOperationThisYearTotal.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOperationThisYearTotal.ddp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="reportsStore.getReportsMekmarGuOperationPreviousYear" size="small"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="previousYearAgoOperationSelected($event)" :loading="loading">
                    <template #header>
                        {{ new Date().getFullYear() - 1 }} Operation Order
                    </template>
                    <Column field="Month" header="MONTH">
                        <template #body="slotProps">
                            {{ getMonthName(slotProps.data.Month) }}
                        </template>
                    </Column>
                    <Column field="FOB" header="FOB">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.FOB) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOperationPreviousYearTotal.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOperationPreviousYearTotal.ddp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="reportsStore.getReportsMekmarGuOperationTwoYearAgo" size="small"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="twoYearAgoOperationSelected($event)" :loading="loading">
                    <template #header>
                        {{ new Date().getFullYear() - 2 }} Operation Order
                    </template>
                    <Column field="Month" header="MONTH">
                        <template #body="slotProps">
                            {{ getMonthName(slotProps.data.Month) }}
                        </template>
                    </Column>
                    <Column field="FOB" header="FOB">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.FOB) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOperationTwoYearAgoTotal.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOperationTwoYearAgoTotal.ddp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div> -->

    <div class="row">
      <div class="col">
        <DataTable
          :value="
            reportsStore.getReportsMekmarGuOrdererThisYearForw.filter((x) => x.Month <= 6)
          "
          size="small"
          :selection="selectedForw"
          selectionMode="single"
          @row-select="thisYearOrdererSelectedForw($event)"
          :loading="loading"
        >
          <template #header>
            {{ new Date().getFullYear() }} Seller Shipped (First 6 Months)
          </template>
          <Column field="Month" header="MONTH">
            <template #body="slotProps">
              {{ getMonthName(slotProps.data.Month) }}
            </template>
          </Column>
          <Column field="FOB" header="FOB">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.FOB) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(total_1_half_one.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(total_1_half_one.ddp) }}
            </template>
          </Column>
        </DataTable>
        <DataTable
          :value="
            reportsStore.getReportsMekmarGuOrdererThisYearForw.filter((x) => x.Month > 6)
          "
          size="small"
          :selection="selectedForw"
          selectionMode="single"
          @row-select="thisYearOrdererSelectedForw($event)"
          :loading="loading"
        >
          <template #header>
            {{ new Date().getFullYear() }} Seller Shipped (Second 6 Months)
          </template>
          <Column field="Month" header="MONTH">
            <template #body="slotProps">
              {{ getMonthName(slotProps.data.Month) }}
            </template>
          </Column>
          <Column field="FOB" header="FOB">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.FOB) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(total_1_half_two.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(total_1_half_two.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col">
        <DataTable
          :value="
            reportsStore.getReportsMekmarGuOrdererPreviousYearForw.filter(
              (x) => x.Month <= 6
            )
          "
          size="small"
          :selection="selectedForw"
          selectionMode="single"
          @row-select="previousYearOrdererSelectedForw($event)"
          :loading="loading"
        >
          <template #header>
            {{ new Date().getFullYear() - 1 }} Seller Shipped (First 6 Months)
          </template>
          <Column field="Month" header="MONTH">
            <template #body="slotProps">
              {{ getMonthName(slotProps.data.Month) }}
            </template>
          </Column>
          <Column field="FOB" header="FOB">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.FOB) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(total_2_half_one.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(total_2_half_one.ddp) }}
            </template>
          </Column>
        </DataTable>
        <DataTable
          :value="
            reportsStore.getReportsMekmarGuOrdererPreviousYearForw.filter((x) => x.Month > 6)
          "
          size="small"
          :selection="selectedForw"
          selectionMode="single"
          @row-select="previousYearOrdererSelectedForw($event)"
          :loading="loading"
        >
          <template #header>
            {{ new Date().getFullYear() - 1 }} Seller Shipped (Second Six
            Months)
          </template>
          <Column field="Month" header="MONTH">
            <template #body="slotProps">
              {{ getMonthName(slotProps.data.Month) }}
            </template>
          </Column>
          <Column field="FOB" header="FOB">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.FOB) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(total_2_half_two.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(total_2_half_two.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col">
        <DataTable
          :value="
            reportsStore.getReportsMekmarGuOrdererTwoYearAgoForw.filter((x) => x.Month <= 6)
          "
          size="small"
          :selection="selectedForw"
          selectionMode="single"
          @row-select="twoYearAgoOrdererSelectedForw($event)"
          :loading="loading"
        >
          <template #header>
            {{ new Date().getFullYear() - 2 }} Seller Shipped (First 6 Months)
          </template>
          <Column field="Month" header="MONTH">
            <template #body="slotProps">
              {{ getMonthName(slotProps.data.Month) }}
            </template>
          </Column>
          <Column field="FOB" header="FOB">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.FOB) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(total_3_half_one.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(total_3_half_one.ddp) }}
            </template>
          </Column>
        </DataTable>
        <DataTable
          :value="
            reportsStore.getReportsMekmarGuOrdererTwoYearAgoForw.filter((x) => x.Month > 6)
          "
          size="small"
          :selection="selectedForw"
          selectionMode="single"
          @row-select="twoYearAgoOrdererSelectedForw($event)"
          :loading="loading"
        >
          <template #header>
            {{ new Date().getFullYear() - 2 }} Seller Shipped (Second 6 Months)
          </template>
          <Column field="Month" header="MONTH">
            <template #body="slotProps">
              {{ getMonthName(slotProps.data.Month) }}
            </template>
          </Column>
          <Column field="FOB" header="FOB">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.FOB) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(total_3_half_two.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(total_3_half_two.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <!-- <div class="row">
            <div class="col">
                <DataTable :value="reportsStore.getreportsMekmarGuOperationThisYearForw.filter(x=>x.Month <=6)" size="small"
                    :selection="selectedForw" selectionMode="single" @row-select="thisYearOperationSelectedForw($event)"
                    :loading="loading">
                    <template #header>
                        {{ new Date().getFullYear() }} Operation Shipped (First 6 Months)
                    </template>
                    <Column field="Month" header="MONTH">
                        <template #body="slotProps">
                            {{ getMonthName(slotProps.data.Month) }}
                        </template>
                    </Column>
                    <Column field="FOB" header="FOB">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.FOB) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(total_4_half_one.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(total_4_half_one.ddp) }}
                        </template>
                    </Column>
                </DataTable>
                <DataTable :value="reportsStore.getreportsMekmarGuOperationThisYearForw.filter(x=>x.Month >6)" size="small"
                    :selection="selectedForw" selectionMode="single" @row-select="thisYearOperationSelectedForw($event)"
                    :loading="loading">
                    <template #header>
                        {{ new Date().getFullYear() }} Operation Shipped (Second 6 Months)
                    </template>
                    <Column field="Month" header="MONTH">
                        <template #body="slotProps">
                            {{ getMonthName(slotProps.data.Month) }}
                        </template>
                    </Column>
                    <Column field="FOB" header="FOB">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.FOB) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(total_4_half_two.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(total_4_half_two.ddp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="reportsStore.getReportsMekmarGuOperationPreviousYearForw.filter(x=>x.Month <=6)" size="small"
                    :selection="selectedForw" selectionMode="single"
                    @row-select="previousYearOperationSelectedForw($event)" :loading="loading">

                    <template #header>
                        {{ new Date().getFullYear() - 1 }} Operation Shipped (First 6 Months)
                    </template>
                    <Column field="Month" header="MONTH">
                        <template #body="slotProps">
                            {{ getMonthName(slotProps.data.Month) }}
                        </template>
                    </Column>
                    <Column field="FOB" header="FOB">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.FOB) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(total_5_half_one.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(total_5_half_one.ddp) }}
                        </template>
                    </Column>
                </DataTable>
                <DataTable :value="reportsStore.getReportsMekmarGuOperationPreviousYearForw.filter(x=>x.Month >6)" size="small"
                    :selection="selectedForw" selectionMode="single"
                    @row-select="previousYearOperationSelectedForw($event)" :loading="loading">

                    <template #header>
                        {{ new Date().getFullYear() - 1 }} Operation Shipped (Second 6 Months)
                    </template>
                    <Column field="Month" header="MONTH">
                        <template #body="slotProps">
                            {{ getMonthName(slotProps.data.Month) }}
                        </template>
                    </Column>
                    <Column field="FOB" header="FOB">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.FOB) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(total_5_half_two.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(total_5_half_two.ddp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="reportsStore.getReportsMekmarGuOperationTwoYearAgoForw.filter(x=>x.Month <=6)" size="small"
                    :selection="selectedForw" selectionMode="single"
                    @row-select="twoYearAgoOperationSelectedForw($event)" :loading="loading">

                    <template #header>
                        {{ new Date().getFullYear() - 2 }} Seller Shipped (First 6 Months)
                    </template>
                    <Column field="Month" header="MONTH">
                        <template #body="slotProps">
                            {{ getMonthName(slotProps.data.Month) }}
                        </template>
                    </Column>
                    <Column field="FOB" header="FOB">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.FOB) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(total_6_half_one.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(total_6_half_one.ddp) }}
                        </template>
                    </Column>
                </DataTable>
                <DataTable :value="reportsStore.getReportsMekmarGuOperationTwoYearAgoForw.filter(x=>x.Month >6)" size="small"
                    :selection="selectedForw" selectionMode="single"
                    @row-select="twoYearAgoOperationSelectedForw($event)" :loading="loading">

                    <template #header>
                        {{ new Date().getFullYear() - 2 }} Seller Shipped (Second 6 Months)
                    </template>
                    <Column field="Month" header="MONTH">
                        <template #body="slotProps">
                            {{ getMonthName(slotProps.data.Month) }}
                        </template>
                    </Column>
                    <Column field="FOB" header="FOB">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.FOB) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(total_6_half_two.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(total_6_half_two.ddp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div> -->
    <Dialog :visible="detail_dialog_form" @update:visible="detail_dialog_form = $event" header="" modal>
      <DataTable
        :value="reportsStore.getMekmarGuSellerOrderDetailList"
      >
        <Column field="SiparisNo" header="Po"></Column>
        <Column field="FOB" header="Fob">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.FOB) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getMekmarGuSellerOrderDetailListTotal.fob) }}
          </template>
        </Column>
        <Column field="Navlun" header="Freight">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Navlun) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getMekmarGuSellerOrderDetailListTotal.navlun) }}
          </template>
        </Column>
        <Column field="Detay1" header="Detail 1">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Detay1) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getMekmarGuSellerOrderDetailListTotal.detail1) }}
          </template>
        </Column>
        <Column field="Detay2" header="Detail 2">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Detay2) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getMekmarGuSellerOrderDetailListTotal.detail2) }}
          </template>
        </Column>
        <Column field="Detay3" header="Detail 3">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Detay3) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getMekmarGuSellerOrderDetailListTotal.detail3) }}
          </template>
        </Column>
        <Column field="Detay4" header="Detail 4">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.Detay4) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getMekmarGuSellerOrderDetailListTotal.detail4) }}
          </template>
        </Column>

        <Column field="DDP" header="Ddp">
          <template #body="slotProps">
            {{ formatPriceUsd(slotProps.data.DDP) }}
          </template>
          <template #footer>
            {{ formatPriceUsd(reportsStore.getMekmarGuSellerOrderDetailListTotal.ddp) }}
          </template>
        </Column>
      </DataTable>
    </Dialog>
  </div>
</template>
<script>
import { useReportsStore } from "~/stores/reports"
import { useLocalStore } from "~/stores/local"
import { useSharedStore } from "~/stores/shared"
export default {
  computed: {
    /*
     * Kaynakta 28 getter mapGetters ile geliyordu. Hepsi reports
     * store'unda; TEK ISTISNA localStore.getLocalUrl (local store).
     * Sablondaki ciplak getter adlari reportsStore.getX bicimine
     * cevrildi -- check-orphan-getters bunu zorunlu kiliyor.
     */
    reportsStore() {
      return useReportsStore()
    },
    localStore() {
      return useLocalStore()
    },
    sharedStore() {
      return useSharedStore()
    },
  },
  data() {
    return {
      users: [
        { id: 13, username: "Mehmet" },

        { id: 44, username: "Hakan" },
        { id: 19, username: "Özlem" },
        { id: 10, username: "Gizem" },
      ],
      selectedUser: null,
      selectedThisYearOrderer: null,
      detail_dialog_form: false,
      loading: false,
      selectedForw: null,
      total_1_half_one: {
        fob: 0,
        ddp: 0,
      },
      total_1_half_two: {
        fob: 0,
        ddp: 0,
      },
      total_2_half_one: {
        fob: 0,
        ddp: 0,
      },
      total_2_half_two: {
        fob: 0,
        ddp: 0,
      },
      total_3_half_one: {
        fob: 0,
        ddp: 0,
      },
      total_3_half_two: {
        fob: 0,
        ddp: 0,
      },
      total_4_half_one: {
        fob: 0,
        ddp: 0,
      },
      total_4_half_two: {
        fob: 0,
        ddp: 0,
      },
      total_5_half_one: {
        fob: 0,
        ddp: 0,
      },
      total_5_half_two: {
        fob: 0,
        ddp: 0,
      },
      total_6_half_one: {
        fob: 0,
        ddp: 0,
      },
      total_6_half_two: {
        fob: 0,
        ddp: 0,
      },
    };
  },
  methods: {
    excel_output(event) {
      const data = {
        thisYearSeller: this.reportsStore.getReportsMekmarGuOrdererThisYearForw,
        previousYearSeller: this.reportsStore.getReportsMekmarGuOrdererPreviousYearForw,
        twoYearAgoYearSeller: this.reportsStore.getReportsMekmarGuOrdererTwoYearAgoForw,
        thisYearOperation: this.reportsStore.getreportsMekmarGuOperationThisYearForw,
        previousYearOperation: this.reportsStore.getReportsMekmarGuOperationPreviousYearForw,
        twoYearAgoOperation: this.reportsStore.getReportsMekmarGuOperationTwoYearAgoForw,
      };
      useExcelApi()
        .post("/gu/reports/seller/operation/forwarding", data)
        .then((response) => {
          if (response.status) {
            /*
             * Elle <a> kurmak yerine downloadFromExcelServer(): yardimci
             * yolu NORMALIZE ediyor (localStore.getLocalUrl sonda egik cizgiyle
             * bittigi ve bu dosyadaki yol bastan egik cizgiyle basladigi
             * icin elle birlestirmede CIFT EGIK CIZGI olusuyordu) ve
             * olusturdugu <a>'yi DOM'dan KALDIRIYOR -- kaynak
             * kaldirmiyordu, her indirmede body'ye bir olu link daha
             * ekleniyordu.
             */
            downloadFromExcelServer(
              "/gu/reports/seller/operation/forwarding",
              "gu_reports_summary.xlsx"
            )
            this.sharedStore.endLoading()
          }
        });
    },
    twoYearAgoOperationSelectedForw(event) {
      const payload = {
        month: event.data.Month,
        year: new Date().getFullYear() - 2,
        userId: this.reportsStore.getMekmarGuSelectedUser.id,
      };
      this.reportsStore.setMekmarGuOperationForwardingDetail(payload)
        .then((res) => {
          if (res) {
            this.detail_dialog_form = true;
          }
        });
    },
    previousYearOperationSelectedForw(event) {
      const payload = {
        month: event.data.Month,
        year: new Date().getFullYear() - 1,
        userId: this.reportsStore.getMekmarGuSelectedUser.id,
      };
      this.reportsStore.setMekmarGuOperationForwardingDetail(payload)
        .then((res) => {
          if (res) {
            this.detail_dialog_form = true;
          }
        });
    },

    thisYearOperationSelectedForw(event) {
      const payload = {
        month: event.data.Month,
        year: new Date().getFullYear(),
        userId: this.reportsStore.getMekmarGuSelectedUser.id,
      };
      this.reportsStore.setMekmarGuOperationForwardingDetail(payload)
        .then((res) => {
          if (res) {
            this.detail_dialog_form = true;
          }
        });
    },

    twoYearAgoOrdererSelectedForw(event) {
      const payload = {
        month: event.data.Month,
        year: new Date().getFullYear() - 2,
        userId: this.reportsStore.getMekmarGuSelectedUser.id,
      };
      this.reportsStore.setMekmarGuSellerForwardingDetail(payload)
        .then((res) => {
          if (res) {
            this.detail_dialog_form = true;
          }
        });
    },
    previousYearOrdererSelectedForw(event) {
      const payload = {
        month: event.data.Month,
        year: new Date().getFullYear() - 1,
        userId: this.reportsStore.getMekmarGuSelectedUser.id,
      };
      this.reportsStore.setMekmarGuSellerForwardingDetail(payload)
        .then((res) => {
          if (res) {
            this.detail_dialog_form = true;
          }
        });
    },

    thisYearOrdererSelectedForw(event) {
      const payload = {
        month: event.data.Month,
        year: new Date().getFullYear(),
        userId: this.reportsStore.getMekmarGuSelectedUser.id,
      };
      this.reportsStore.setMekmarGuSellerForwardingDetail(payload)
        .then((res) => {
          if (res) {
            this.detail_dialog_form = true;
          }
        });
    },

    twoYearAgoOperationSelected(event) {
      const payload = {
        month: event.data.Month,
        year: new Date().getFullYear() - 2,
        userId: this.reportsStore.getMekmarGuSelectedUser.id,
      };
      this.reportsStore.setMekmarGuOperationOrderDetail(payload)
        .then((res) => {
          if (res) {
            this.detail_dialog_form = true;
          }
        });
    },
    previousYearAgoOperationSelected(event) {
      const payload = {
        month: event.data.Month,
        year: new Date().getFullYear() - 1,
        userId: this.reportsStore.getMekmarGuSelectedUser.id,
      };
      this.reportsStore.setMekmarGuOperationOrderDetail(payload)
        .then((res) => {
          if (res) {
            this.detail_dialog_form = true;
          }
        });
    },
    thisYearAgoOperationSelected(event) {
      const payload = {
        month: event.data.Month,
        year: new Date().getFullYear(),
        userId: this.reportsStore.getMekmarGuSelectedUser.id,
      };
      this.reportsStore.setMekmarGuOperationOrderDetail(payload)
        .then((res) => {
          if (res) {
            this.detail_dialog_form = true;
          }
        });
    },
    twoYearAgoOrdererSelected(event) {
      const payload = {
        month: event.data.Month,
        year: new Date().getFullYear() - 2,
        userId: this.reportsStore.getMekmarGuSelectedUser.id,
      };
      this.reportsStore.setMekmarGuSellerOrderDetail(payload)
        .then((res) => {
          if (res) {
            this.detail_dialog_form = true;
          }
        });
    },
    previousYearOrdererSelected(event) {
      const payload = {
        month: event.data.Month,
        year: new Date().getFullYear() - 1,
        userId: this.reportsStore.getMekmarGuSelectedUser.id,
      };
      this.reportsStore.setMekmarGuSellerOrderDetail(payload)
        .then((res) => {
          if (res) {
            this.detail_dialog_form = true;
          }
        });
    },
    thisYearOrdererSelected(event) {
      const payload = {
        month: event.data.Month,
        year: new Date().getFullYear(),
        userId: this.reportsStore.getMekmarGuSelectedUser.id,
      };
      this.reportsStore.setMekmarGuSellerOrderDetail(payload)
        .then((res) => {
          if (res) {
            this.detail_dialog_form = true;
          }
        });
    },
    userSelected(event) {
      this.reportsStore.setMekmarGuSelectedUser(event.value);

      this.loading = true;
      this.reportsStore.setMekmarGuOrdererOperationList(this.reportsStore.getMekmarGuSelectedUser.id)
        .then((res) => {
          if (res) {
            this.loading = false;
          } else {
            this.loading = false;
          }
        });
    },
    getMonthName(value) {
      const data = [
        { id: 1, name: "January" },
        { id: 2, name: "February" },
        { id: 3, name: "March" },
        { id: 4, name: "April" },
        { id: 5, name: "May" },
        { id: 6, name: "June" },
        { id: 7, name: "July" },
        { id: 8, name: "August" },
        { id: 9, name: "September" },
        { id: 10, name: "October" },
        { id: 11, name: "November" },
        { id: 12, name: "December" },
      ];
      return data.find((item) => item.id === value).name;
    },
  },
  watch: {
    "reportsStore.getReportsMekmarGuOrdererThisYearForw"() {
      this.total_1_half_one = {
        fob: 0,
        ddp: 0,
      };
      this.total_1_half_two = {
        fob: 0,
        ddp: 0,
      };

      this.reportsStore.getReportsMekmarGuOrdererThisYearForw
        .filter((x) => x.Month <= 6)
        .forEach((x) => {
          this.total_1_half_one.fob += x.FOB;
          this.total_1_half_one.ddp += x.DDP;
        });

      this.reportsStore.getReportsMekmarGuOrdererThisYearForw
        .filter((x) => x.Month > 6)
        .forEach((x) => {
          this.total_1_half_two.fob += x.FOB;
          this.total_1_half_two.ddp += x.DDP;
        });
    },
    "reportsStore.getReportsMekmarGuOrdererPreviousYearForw"() {
      this.total_2_half_one = {
        fob: 0,
        ddp: 0,
      };
      this.total_2_half_two = {
        fob: 0,
        ddp: 0,
      };
      this.reportsStore.getReportsMekmarGuOrdererPreviousYearForw
        .filter((x) => x.Month <= 6)
        .forEach((x) => {
          this.total_2_half_one.fob += x.FOB;
          this.total_2_half_one.ddp += x.DDP;
        });
      this.reportsStore.getReportsMekmarGuOrdererPreviousYearForw
        .filter((x) => x.Month > 6)
        .forEach((x) => {
          this.total_2_half_two.fob += x.FOB;
          this.total_2_half_two.ddp += x.DDP;
        });
    },
    "reportsStore.getReportsMekmarGuOrdererTwoYearAgoForw"() {
      this.total_3_half_one = {
        fob: 0,
        ddp: 0,
      };
      this.total_3_half_two = {
        fob: 0,
        ddp: 0,
      };
      this.reportsStore.getReportsMekmarGuOrdererTwoYearAgoForw
        .filter((x) => x.Month <= 6)
        .forEach((x) => {
          this.total_3_half_one.fob += x.FOB;
          this.total_3_half_one.ddp += x.DDP;
        });
      this.reportsStore.getReportsMekmarGuOrdererTwoYearAgoForw
        .filter((x) => x.Month > 6)
        .forEach((x) => {
          this.total_3_half_two.fob += x.FOB;
          this.total_3_half_two.ddp += x.DDP;
        });
    },
    "reportsStore.getreportsMekmarGuOperationThisYearForw"() {
      this.total_4_half_one = {
        fob: 0,
        ddp: 0,
      };
      this.total_4_half_two = {
        fob: 0,
        ddp: 0,
      };
      this.reportsStore.getreportsMekmarGuOperationThisYearForw
        .filter((x) => x.Month <= 6)
        .forEach((x) => {
          this.total_4_half_one.fob += x.FOB;
          this.total_4_half_one.ddp += x.DDP;
        });
      this.reportsStore.getreportsMekmarGuOperationThisYearForw
        .filter((x) => x.Month > 6)
        .forEach((x) => {
          this.total_4_half_two.fob += x.FOB;
          this.total_4_half_two.ddp += x.DDP;
        });
    },
    "reportsStore.getReportsMekmarGuOperationPreviousYearForw"() {
      this.total_5_half_one = {
        fob: 0,
        ddp: 0,
      };
      this.total_5_half_two = {
        fob: 0,
        ddp: 0,
      };
      this.reportsStore.getReportsMekmarGuOperationPreviousYearForw
        .filter((x) => x.Month <= 6)
        .forEach((x) => {
          this.total_5_half_one.fob += x.FOB;
          this.total_5_half_one.ddp += x.DDP;
        });
      this.reportsStore.getReportsMekmarGuOperationPreviousYearForw
        .filter((x) => x.Month > 6)
        .forEach((x) => {
          this.total_5_half_two.fob += x.FOB;
          this.total_5_half_two.ddp += x.DDP;
        });
    },
    "reportsStore.getReportsMekmarGuOperationTwoYearAgoForw"() {
      this.total_6_half_one = {
        fob: 0,
        ddp: 0,
      };
      this.total_6_half_two = {
        fob: 0,
        ddp: 0,
      };
      this.reportsStore.getReportsMekmarGuOperationTwoYearAgoForw
        .filter((x) => x.Month <= 6)
        .forEach((x) => {
          this.total_6_half_one.fob += x.FOB;
          this.total_6_half_one.ddp += x.DDP;
        });
      this.reportsStore.getReportsMekmarGuOperationTwoYearAgoForw
        .filter((x) => x.Month > 6)
        .forEach((x) => {
          this.total_6_half_two.fob += x.FOB;
          this.total_6_half_two.ddp += x.DDP;
        });
    },
  },
};
</script>
