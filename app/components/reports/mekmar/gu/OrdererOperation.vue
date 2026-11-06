<template>
  <div class="container">
    <Dropdown
      v-model="selectedUser"
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
      :disabled="disabled"
    />

    <div class="row">
      <div class="col">
        <DataTable
          :value="reportsStore.getReportsMekmarGuOrdererThisYear.filter((x) => x.Month <= 6)"
          size="small"
          :selection="selectedThisYearOrderer"
          selectionMode="single"
          @row-select="thisYearOrdererSelected($event)"
          :loading="loading"
        >
          <template #header>
            {{ new Date().getFullYear() }} Seller Order (First 6 Months)
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
              {{ formatPriceUsd(firstYearHalfOneTotal.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(firstYearHalfOneTotal.ddp) }}
            </template>
          </Column>
        </DataTable>
        <DataTable
          :value="reportsStore.getReportsMekmarGuOrdererThisYear.filter((x) => x.Month > 6)"
          size="small"
          :selection="selectedThisYearOrderer"
          selectionMode="single"
          @row-select="thisYearOrdererSelected($event)"
          :loading="loading"
        >
          <template #header>
            {{ new Date().getFullYear() }} Seller Order (Second 6 Months)
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
              {{ formatPriceUsd(firstYearHalfTwoTotal.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(firstYearHalfTwoTotal.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col">
        <DataTable
          :value="
            reportsStore.getReportsMekmarGuOrdererPreviousYear.filter((x) => x.Month <= 6)
          "
          size="small"
          :selection="selectedThisYearOrderer"
          selectionMode="single"
          @row-select="previousYearOrdererSelected($event)"
          :loading="loading"
        >
          <template #header>
            {{ new Date().getFullYear() - 1 }} Seller Order (First 6 Months)
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
              {{ formatPriceUsd(secondYearHalfOneTotal.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(secondYearHalfOneTotal.ddp) }}
            </template>
          </Column>
        </DataTable>
        <DataTable
          :value="
            reportsStore.getReportsMekmarGuOrdererPreviousYear.filter((x) => x.Month > 6)
          "
          size="small"
          :selection="selectedThisYearOrderer"
          selectionMode="single"
          @row-select="previousYearOrdererSelected($event)"
          :loading="loading"
        >
          <template #header>
            {{ new Date().getFullYear() - 1 }} Seller Order (Second 6 Months)
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
              {{ formatPriceUsd(secondYearHalfTwoTotal.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(secondYearHalfTwoTotal.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col">
        <DataTable
          :value="
            reportsStore.getReportsMekmarGuOrdererTwoYearAgo.filter((x) => x.Month <= 6)
          "
          size="small"
          :selection="selectedThisYearOrderer"
          selectionMode="single"
          @row-select="twoYearAgoOrdererSelected($event)"
          :loading="loading"
        >
          <template #header>
            {{ new Date().getFullYear() - 2 }} Seller Order (First 6 Months)
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
              {{ formatPriceUsd(thirdYearHalfOneTotal.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(thirdYearHalfOneTotal.ddp) }}
            </template>
          </Column>
        </DataTable>
        <DataTable
          :value="
            reportsStore.getReportsMekmarGuOrdererTwoYearAgo.filter((x) => x.Month > 6)
          "
          size="small"
          :selection="selectedThisYearOrderer"
          selectionMode="single"
          @row-select="twoYearAgoOrdererSelected($event)"
          :loading="loading"
        >
          <template #header>
            {{ new Date().getFullYear() - 2 }} Seller Order (Second 6 Months)
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
              {{ formatPriceUsd(thirdYearHalfTwoTotal.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(thirdYearHalfTwoTotal.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col">
        <DataTable
          :value="
            reportsStore.getReportsMekmarGuOperationThisYear.filter((x) => x.Month <= 6)
          "
          size="small"
          :selection="selectedThisYearOrderer"
          selectionMode="single"
          @row-select="thisYearAgoOperationSelected($event)"
          :loading="loading"
        >
          >
          <template #header>
            {{ new Date().getFullYear() }} Operation Order (First 6 Months)
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
              {{ formatPriceUsd(firstYearOperationHalfOneTotal.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(firstYearOperationHalfOneTotal.ddp) }}
            </template>
          </Column>
        </DataTable>
        <DataTable
          :value="
            reportsStore.getReportsMekmarGuOperationThisYear.filter((x) => x.Month > 6)
          "
          size="small"
          :selection="selectedThisYearOrderer"
          selectionMode="single"
          @row-select="thisYearAgoOperationSelected($event)"
          :loading="loading"
        >
          >
          <template #header>
            {{ new Date().getFullYear() }} Operation Order (Second 6 Months)
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
              {{ formatPriceUsd(firstYearOperationHalfTwoTotal.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(firstYearOperationHalfTwoTotal.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col">
        <DataTable
          :value="
            reportsStore.getReportsMekmarGuOperationPreviousYear.filter((x) => x.Month <= 6)
          "
          size="small"
          :selection="selectedThisYearOrderer"
          selectionMode="single"
          @row-select="previousYearAgoOperationSelected($event)"
          :loading="loading"
        >
          <template #header>
            {{ new Date().getFullYear() - 1 }} Operation Order (First 6 Months)
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
              {{ formatPriceUsd(secondYearOperationHalfOneTotal.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(secondYearOperationHalfOneTotal.ddp) }}
            </template>
          </Column>
        </DataTable>
        <DataTable
          :value="
            reportsStore.getReportsMekmarGuOperationPreviousYear.filter((x) => x.Month > 6)
          "
          size="small"
          :selection="selectedThisYearOrderer"
          selectionMode="single"
          @row-select="previousYearAgoOperationSelected($event)"
          :loading="loading"
        >
          <template #header>
            {{ new Date().getFullYear() - 1 }} Operation Order (Second 6 Months)
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
              {{ formatPriceUsd(secondYearOperationHalfTwoTotal.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(secondYearOperationHalfTwoTotal.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col">
        <DataTable
          :value="
            reportsStore.getReportsMekmarGuOperationTwoYearAgo.filter((x) => x.Month <= 6)
          "
          size="small"
          :selection="selectedThisYearOrderer"
          selectionMode="single"
          @row-select="twoYearAgoOperationSelected($event)"
          :loading="loading"
        >
          <template #header>
            {{ new Date().getFullYear() - 2 }} Operation Order (First 6 Months)
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
              {{ formatPriceUsd(thirdYearOperationHalfOneTotal.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(thirdYearOperationHalfOneTotal.ddp) }}
            </template>
          </Column>
        </DataTable>
        <DataTable
          :value="
            reportsStore.getReportsMekmarGuOperationTwoYearAgo.filter((x) => x.Month > 6)
          "
          size="small"
          :selection="selectedThisYearOrderer"
          selectionMode="single"
          @row-select="twoYearAgoOperationSelected($event)"
          :loading="loading"
        >
          <template #header>
            {{ new Date().getFullYear() - 2 }} Operation Order (Second 6 Months)
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
              {{ formatPriceUsd(thirdYearOperationHalfTwoTotal.fob) }}
            </template>
          </Column>
          <Column field="DDP" header="DDP">
            <template #body="slotProps">
              {{ formatPriceUsd(slotProps.data.DDP) }}
            </template>
            <template #footer>
              {{ formatPriceUsd(thirdYearOperationHalfTwoTotal.ddp) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div> -->

    <!-- <div class="row">
            <div class="col">
                <DataTable :value="reportsStore.getReportsMekmarGuOrdererThisYearForw" size="small"
                    :selection="selectedForw" selectionMode="single" @row-select="thisYearOrdererSelectedForw($event)"
                    :loading="loading">
                    <template #header>
                        {{ new Date().getFullYear() }} Seller Shipped
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
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOrdererThisYearTotalForw.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOrdererThisYearTotalForw.ddp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="reportsStore.getReportsMekmarGuOrdererPreviousYearForw" size="small"
                    :selection="selectedForw" selectionMode="single"
                    @row-select="previousYearOrdererSelectedForw($event)" :loading="loading">

                    <template #header>
                        {{ new Date().getFullYear() - 1 }} Seller Shipped
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
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOrdererPreviousYearTotalForw.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOrdererPreviousYearTotalForw.ddp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="reportsStore.getReportsMekmarGuOrdererTwoYearAgoForw" size="small"
                    :selection="selectedForw" selectionMode="single" @row-select="twoYearAgoOrdererSelectedForw($event)"
                    :loading="loading">

                    <template #header>
                        {{ new Date().getFullYear() - 2 }} Seller Shipped
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
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOrdererTwoYearAgoTotalForw.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOrdererTwoYearAgoTotalForw.ddp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>


        <div class="row">
            <div class="col">
                <DataTable :value="reportsStore.getreportsMekmarGuOperationThisYearForw" size="small"
                    :selection="selectedForw" selectionMode="single" @row-select="thisYearOperationSelectedForw($event)"
                    :loading="loading">
                    <template #header>
                        {{ new Date().getFullYear() }} Operation Shipped
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
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOperationThisYearTotalForw.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOperationThisYearTotalForw.ddp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="reportsStore.getReportsMekmarGuOperationPreviousYearForw" size="small"
                    :selection="selectedForw" selectionMode="single"
                    @row-select="previousYearOperationSelectedForw($event)" :loading="loading">

                    <template #header>
                        {{ new Date().getFullYear() - 1 }} Operation Shipped
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
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOperationPreviousYearTotalForw.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOperationPreviousYearTotalForw.ddp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="reportsStore.getReportsMekmarGuOperationTwoYearAgoForw" size="small"
                    :selection="selectedForw" selectionMode="single"
                    @row-select="twoYearAgoOperationSelectedForw($event)" :loading="loading">

                    <template #header>
                        {{ new Date().getFullYear() - 2 }} Seller Shipped
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
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOperationTwoYearAgoTotalForw.fob) }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ formatPriceUsd(slotProps.data.DDP) }}
                        </template>
                        <template #footer>
                            {{ formatPriceUsd(reportsStore.getReportsMekmarGuOperationTwoYearAgoTotalForw.ddp) }}
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
      disabled: true,
      firstYearHalfOneTotal: {
        fob: 0,
        ddp: 0,
      },
      firstYearHalfTwoTotal: {
        fob: 0,
        ddp: 0,
      },

      secondYearHalfOneTotal: {
        fob: 0,
        ddp: 0,
      },
      secondYearHalfTwoTotal: {
        fob: 0,
        ddp: 0,
      },
      thirdYearHalfOneTotal: {
        fob: 0,
        ddp: 0,
      },
      thirdYearHalfTwoTotal: {
        fob: 0,
        ddp: 0,
      },

      firstYearOperationHalfOneTotal: {
        fob: 0,
        ddp: 0,
      },
      firstYearOperationHalfTwoTotal: {
        fob: 0,
        ddp: 0,
      },

      secondYearOperationHalfOneTotal: {
        fob: 0,
        ddp: 0,
      },
      secondYearOperationHalfTwoTotal: {
        fob: 0,
        ddp: 0,
      },
      thirdYearOperationHalfOneTotal: {
        fob: 0,
        ddp: 0,
      },
      thirdYearOperationHalfTwoTotal: {
        fob: 0,
        ddp: 0,
      },
    };
  },
  methods: {
    async excel_output(event) {
      const data = {
        thisYearSeller: this.reportsStore.getReportsMekmarGuOrdererThisYear,
        previousYearSeller: this.reportsStore.getReportsMekmarGuOrdererPreviousYear,
        twoYearAgoYearSeller: this.reportsStore.getReportsMekmarGuOrdererTwoYearAgo,
        thisYearOperation: this.reportsStore.getReportsMekmarGuOperationThisYear,
        previousYearOperation: this.reportsStore.getReportsMekmarGuOperationPreviousYear,
        twoYearAgoOperation: this.reportsStore.getReportsMekmarGuOperationTwoYearAgo,
      };
      /*
       * ARTIK EXCEL SUNUCUSUNDAN DEGIL, NITRO'DAN:
       *   eski: POST + GET {excelServerBase}/gu/reports/seller/operation/orders
       *   yeni: POST /excel-api/gu/operation-orders   (tek istek)
       *         server/routes/excel-api/gu/operation-orders.post.ts
       *
       * Cikti uretimdekiyle KARSILASTIRILDI: deger, sayi bicimi, hucre
       * stili, sutun genisligi ve 6 birlestirme farki 0.
       *
       * UC SORUN DUZELTILDI:
       *  - `if (response.status)` HTTP durumunu (daima 200) okuyordu,
       *    govdedeki {"status": false}'u DEGIL.
       *  - endLoading() O KOSULUN ICINDEYDI: uretim basarisiz oldugunda
       *    yukleme gostergesi HIC KAPANMIYORDU. Artik finally'de.
       *  - Python bu ucta bos bir FOB/DDP degerinde `+=` yuzunden
       *    TypeError firlatip tum raporu dusuruyordu; olculdu --
       *    null'lu govde {"status": false} + GET 200 + 9749 bayt
       *    (= SABLONUN AYNISI, bos dosya). Nitro bos degeri 0 sayiyor.
       */
      try {
        await exportExcel("/excel-api/gu/operation-orders", data, "gu_reports_summary.xlsx")
      } catch (err) {
        console.error("gu ozet excel ciktisi basarisiz:", err)
        useAppToast().error("Excel olusturulamadi.")
      } finally {
        this.sharedStore.endLoading()
      }
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
            this.disabled = false;
            this.firstYearHalfOneTotal = {
              fob: 0,
              ddp: 0,
            };
            this.firstYearHalfTwoTotal = {
              fob: 0,
              ddp: 0,
            };
            this.reportsStore.getReportsMekmarGuOrdererThisYear
              .filter((x) => x.Month <= 6)
              .forEach((x) => {
                this.firstYearHalfOneTotal.fob += x.FOB;
                this.firstYearHalfOneTotal.ddp += x.DDP;
              });
            this.reportsStore.getReportsMekmarGuOrdererThisYear
              .filter((x) => x.Month > 6)
              .forEach((x) => {
                this.firstYearHalfTwoTotal.fob += x.FOB;
                this.firstYearHalfTwoTotal.ddp += x.DDP;
              });

            this.secondYearHalfOneTotal = {
              fob: 0,
              ddp: 0,
            };
            this.secondYearHalfTwoTotal = {
              fob: 0,
              ddp: 0,
            };
            this.reportsStore.getReportsMekmarGuOrdererPreviousYear
              .filter((x) => x.Month <= 6)
              .forEach((x) => {
                this.secondYearHalfOneTotal.fob += x.FOB;
                this.secondYearHalfOneTotal.ddp += x.DDP;
              });
            this.reportsStore.getReportsMekmarGuOrdererPreviousYear
              .filter((x) => x.Month > 6)
              .forEach((x) => {
                this.secondYearHalfTwoTotal.fob += x.FOB;
                this.secondYearHalfTwoTotal.ddp += x.DDP;
              });
            this.thirdYearHalfOneTotal = {
              fob: 0,
              ddp: 0,
            };
            this.thirdYearHalfTwoTotal = {
              fob: 0,
              ddp: 0,
            };
            this.reportsStore.getReportsMekmarGuOrdererTwoYearAgo
              .filter((x) => x.Month <= 6)
              .forEach((x) => {
                this.thirdYearHalfOneTotal.fob += x.FOB;
                this.thirdYearHalfOneTotal.ddp += x.DDP;
              });
            this.reportsStore.getReportsMekmarGuOrdererTwoYearAgo
              .filter((x) => x.Month > 6)
              .forEach((x) => {
                this.thirdYearHalfTwoTotal.fob += x.FOB;
                this.thirdYearHalfTwoTotal.ddp += x.DDP;
              });
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
};
</script>
