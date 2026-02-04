<template>
    <div class="container">
        <Dropdown v-model="selectedUser" :options="users" optionLabel="username" placeholder="Select a User"
            style="width:50%;" @change="userSelected($event)" />

        <Button type="button" class="p-button-primary" @click="excel_output" label="Excel" :disabled="disabled" />


        <div class="row">
            <div class="col">
                <DataTable :value="getReportsMekmarGuOrdererThisYear.filter(x=>x.Month <=6)" class="p-datatable-sm"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="thisYearOrdererSelected($event)" :loading="loading">
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ firstYearHalfOneTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ firstYearHalfOneTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
                <DataTable :value="getReportsMekmarGuOrdererThisYear.filter(x=>x.Month >6)" class="p-datatable-sm"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="thisYearOrdererSelected($event)" :loading="loading">
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ firstYearHalfTwoTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ firstYearHalfTwoTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="getReportsMekmarGuOrdererPreviousYear.filter(x=>x.Month <=6)" class="p-datatable-sm"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="previousYearOrdererSelected($event)" :loading="loading">

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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ secondYearHalfOneTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ secondYearHalfOneTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
                <DataTable :value="getReportsMekmarGuOrdererPreviousYear.filter(x=>x.Month >6)" class="p-datatable-sm"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="previousYearOrdererSelected($event)" :loading="loading">

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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ secondYearHalfTwoTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ secondYearHalfTwoTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="getReportsMekmarGuOrdererTwoYearAgo.filter(x=>x.Month <=6)" class="p-datatable-sm"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="twoYearAgoOrdererSelected($event)" :loading="loading">

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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ thirdYearHalfOneTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ thirdYearHalfOneTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
                <DataTable :value="getReportsMekmarGuOrdererTwoYearAgo.filter(x=>x.Month>6)" class="p-datatable-sm"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="twoYearAgoOrdererSelected($event)" :loading="loading">

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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ thirdYearHalfTwoTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ thirdYearHalfTwoTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <hr/>
        <div class="row">
            <div class="col">
                <DataTable :value="getReportsMekmarGuOperationThisYear.filter(x=>x.Month <=6)" class="p-datatable-sm"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="thisYearAgoOperationSelected($event)" :loading="loading">
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ firstYearOperationHalfOneTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ firstYearOperationHalfOneTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
                <DataTable :value="getReportsMekmarGuOperationThisYear.filter(x=>x.Month >6)" class="p-datatable-sm"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="thisYearAgoOperationSelected($event)" :loading="loading">
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ firstYearOperationHalfTwoTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ firstYearOperationHalfTwoTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="getReportsMekmarGuOperationPreviousYear.filter(x=>x.Month <=6)" class="p-datatable-sm"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="previousYearAgoOperationSelected($event)" :loading="loading">
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ secondYearOperationHalfOneTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ secondYearOperationHalfOneTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
                <DataTable :value="getReportsMekmarGuOperationPreviousYear.filter(x=>x.Month >6)" class="p-datatable-sm"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="previousYearAgoOperationSelected($event)" :loading="loading">
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ secondYearOperationHalfTwoTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ secondYearOperationHalfTwoTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="getReportsMekmarGuOperationTwoYearAgo.filter(x=>x.Month <=6)" class="p-datatable-sm"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="twoYearAgoOperationSelected($event)" :loading="loading">
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ thirdYearOperationHalfOneTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ thirdYearOperationHalfOneTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
                <DataTable :value="getReportsMekmarGuOperationTwoYearAgo.filter(x=>x.Month >6)" class="p-datatable-sm"
                    :selection="selectedThisYearOrderer" selectionMode="single"
                    @row-select="twoYearAgoOperationSelected($event)" :loading="loading">
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ thirdYearOperationHalfTwoTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ thirdYearOperationHalfTwoTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>


        <!-- <div class="row">
            <div class="col">
                <DataTable :value="getReportsMekmarGuOrdererThisYearForw" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOrdererThisYearTotalForw.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOrdererThisYearTotalForw.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="getReportsMekmarGuOrdererPreviousYearForw" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOrdererPreviousYearTotalForw.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOrdererPreviousYearTotalForw.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="getReportsMekmarGuOrdererTwoYearAgoForw" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOrdererTwoYearAgoTotalForw.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOrdererTwoYearAgoTotalForw.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>


        <div class="row">
            <div class="col">
                <DataTable :value="getreportsMekmarGuOperationThisYearForw" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOperationThisYearTotalForw.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOperationThisYearTotalForw.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="getReportsMekmarGuOperationPreviousYearForw" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOperationPreviousYearTotalForw.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOperationPreviousYearTotalForw.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="getReportsMekmarGuOperationTwoYearAgoForw" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOperationTwoYearAgoTotalForw.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOperationTwoYearAgoTotalForw.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div> -->




        <Dialog :visible.sync="detail_dialog_form" header="" modal>
            <DataTable :value="getMekmarGuSellerOrderDetailList" responsiveLayout="scroll">
                <Column field="SiparisNo" header="Po"></Column>
                <Column field="FOB" header="Fob">
                    <template #body="slotProps">
                        {{ slotProps.data.FOB | formatPriceUsd }}
                    </template>
                    <template #footer>
                        {{ getMekmarGuSellerOrderDetailListTotal.fob | formatPriceUsd }}
                    </template>
                </Column>
                <Column field="Navlun" header="Freight">
                    <template #body="slotProps">
                        {{ slotProps.data.Navlun | formatPriceUsd }}
                    </template>
                    <template #footer>
                        {{ getMekmarGuSellerOrderDetailListTotal.navlun | formatPriceUsd }}
                    </template>
                </Column>
                <Column field="Detay1" header="Detail 1">
                    <template #body="slotProps">
                        {{ slotProps.data.Detay1 | formatPriceUsd }}
                    </template>
                    <template #footer>
                        {{ getMekmarGuSellerOrderDetailListTotal.detail1 | formatPriceUsd }}
                    </template>
                </Column>
                <Column field="Detay2" header="Detail 2">
                    <template #body="slotProps">
                        {{ slotProps.data.Detay2 | formatPriceUsd }}
                    </template>
                    <template #footer>
                        {{ getMekmarGuSellerOrderDetailListTotal.detail2 | formatPriceUsd }}
                    </template>
                </Column>
                <Column field="Detay3" header="Detail 3">
                    <template #body="slotProps">
                        {{ slotProps.data.Detay3 | formatPriceUsd }}
                    </template>
                    <template #footer>
                        {{ getMekmarGuSellerOrderDetailListTotal.detail3 | formatPriceUsd }}
                    </template>
                </Column>
                <Column field="Detay4" header="Detail 4">
                    <template #body="slotProps">
                        {{ slotProps.data.Detay4 | formatPriceUsd }}
                    </template>
                    <template #footer>
                        {{ getMekmarGuSellerOrderDetailListTotal.detail4 | formatPriceUsd }}
                    </template>
                </Column>

                <Column field="DDP" header="Ddp">
                    <template #body="slotProps">
                        {{ slotProps.data.DDP | formatPriceUsd }}
                    </template>
                    <template #footer>
                        {{ getMekmarGuSellerOrderDetailListTotal.ddp | formatPriceUsd }}
                    </template>
                </Column>


            </DataTable>



        </Dialog>
    </div>

</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters([
        'getLocalUrl',
            'getMekmarGuSelectedUser',
        
            'getReportsMekmarGuOrdererThisYear',
            'getReportsMekmarGuOrdererThisYearTotal',
            'getReportsMekmarGuOrdererPreviousYear',
            'getReportsMekmarGuOrdererPreviousYearTotal',
            'getReportsMekmarGuOrdererTwoYearAgo',
            'getReportsMekmarGuOrdererTwoYearAgoTotal',
            'getReportsMekmarGuOperationThisYear',
            'getReportsMekmarGuOperationThisYearTotal',
            'getReportsMekmarGuOperationPreviousYear',
            'getReportsMekmarGuOperationPreviousYearTotal',
            'getReportsMekmarGuOperationTwoYearAgo',
            'getReportsMekmarGuOperationTwoYearAgoTotal',
            'getMekmarGuSellerOrderDetailList',
            'getMekmarGuSellerOrderDetailListTotal',

            'getReportsMekmarGuOrdererThisYearForw',
            'getReportsMekmarGuOrdererThisYearTotalForw',
            'getReportsMekmarGuOrdererPreviousYearForw',
            'getReportsMekmarGuOrdererPreviousYearTotalForw',
            'getReportsMekmarGuOrdererTwoYearAgoForw',
            'getReportsMekmarGuOrdererTwoYearAgoTotalForw',
            'getreportsMekmarGuOperationThisYearForw',
            'getReportsMekmarGuOperationThisYearTotalForw',
            'getReportsMekmarGuOperationPreviousYearForw',
            'getReportsMekmarGuOperationPreviousYearTotalForw',
            'getReportsMekmarGuOperationTwoYearAgoForw',
            'getReportsMekmarGuOperationTwoYearAgoTotalForw',






        ])  
    },
    beforeCreate() {
    },
    data() {
        return {
            users: [
                { 'id': 13, 'username': 'Mehmet' },

                { 'id': 44, 'username': 'Hakan' },
                { 'id': 19, 'username': 'Özlem' },
                { 'id': 10, 'username': 'Gizem' },
                

            ],
            selectedUser: null,
            selectedThisYearOrderer:null,
            detail_dialog_form: false,
            loading:false,
            selectedForw: null,
            disabled:true,
            firstYearHalfOneTotal:{
                fob:0,
                ddp:0
            },
            firstYearHalfTwoTotal:{
                fob:0,
                ddp:0
            },

            secondYearHalfOneTotal:{
                fob:0,
                ddp:0
            },
            secondYearHalfTwoTotal:{
                fob:0,
                ddp:0
            },
            thirdYearHalfOneTotal:{
                fob:0,
                ddp:0
            },
            thirdYearHalfTwoTotal:{
                fob:0,
                ddp:0
            },




            firstYearOperationHalfOneTotal:{
                fob:0,
                ddp:0
            },
            firstYearOperationHalfTwoTotal:{
                fob:0,
                ddp:0
            },

            secondYearOperationHalfOneTotal:{
                fob:0,
                ddp:0
            },
            secondYearOperationHalfTwoTotal:{
                fob:0,
                ddp:0
            },
            thirdYearOperationHalfOneTotal:{
                fob:0,
                ddp:0
            },
            thirdYearOperationHalfTwoTotal:{
                fob:0,
                ddp:0
            }


        }
    },
    methods: {
        excel_output(event){
            const data = {
                'thisYearSeller': this.getReportsMekmarGuOrdererThisYear,
                'previousYearSeller': this.getReportsMekmarGuOrdererPreviousYear,
                'twoYearAgoYearSeller': this.getReportsMekmarGuOrdererTwoYearAgo,
                'thisYearOperation': this.getReportsMekmarGuOperationThisYear,
                'previousYearOperation': this.getReportsMekmarGuOperationPreviousYear,
                'twoYearAgoOperation': this.getReportsMekmarGuOperationTwoYearAgo
            };
            this.$excelApi.post('/gu/reports/seller/operation/orders', data)
                .then(response => {
                    if (response.status) {
                        const link = document.createElement("a");
                        link.href = this.getLocalUrl + "gu/reports/seller/operation/orders";
                        link.setAttribute("download", "gu_reports_summary.xlsx");
                        document.body.appendChild(link);
                        link.click();
                        this.$store.dispatch("setEndLoadingAction");
                    }
            })


        },
        twoYearAgoOperationSelectedForw(event) {
            const payload = {
                'month': event.data.Month,
                'year': new Date().getFullYear() - 2,
                'userId': this.getMekmarGuSelectedUser.id
            };
            this.$store.dispatch('setMekmarGuOperationForwardingDetail', payload).then(res => {
                if (res) {
                    this.detail_dialog_form = true;
                }
            });
        },
        previousYearOperationSelectedForw(event) {
            const payload = {
                'month': event.data.Month,
                'year': new Date().getFullYear() - 1,
                'userId': this.getMekmarGuSelectedUser.id
            };
            this.$store.dispatch('setMekmarGuOperationForwardingDetail', payload).then(res => {
                if (res) {
                    this.detail_dialog_form = true;
                }
            });
        },

        thisYearOperationSelectedForw(event) {
            const payload = {
                'month': event.data.Month,
                'year': new Date().getFullYear(),
                'userId': this.getMekmarGuSelectedUser.id
            };
            this.$store.dispatch('setMekmarGuOperationForwardingDetail', payload).then(res => {
                if (res) {
                    this.detail_dialog_form = true;
                }
            });
        },
        
        twoYearAgoOrdererSelectedForw(event) {
            const payload = {
                'month': event.data.Month,
                'year': new Date().getFullYear() - 2,
                'userId': this.getMekmarGuSelectedUser.id
            };
            this.$store.dispatch('setMekmarGuSellerForwardingDetail', payload).then(res => {
                if (res) {
                    this.detail_dialog_form = true;
                }
            });
        },
        previousYearOrdererSelectedForw(event) {
            const payload = {
                'month': event.data.Month,
                'year': new Date().getFullYear() - 1,
                'userId': this.getMekmarGuSelectedUser.id
            };
            this.$store.dispatch('setMekmarGuSellerForwardingDetail', payload).then(res => {
                if (res) {
                    this.detail_dialog_form = true;
                }
            });
        },

        thisYearOrdererSelectedForw(event) {
            const payload = {
                'month': event.data.Month,
                'year': new Date().getFullYear(),
                'userId': this.getMekmarGuSelectedUser.id
            };
            this.$store.dispatch('setMekmarGuSellerForwardingDetail', payload).then(res => {
                if (res) {
                    this.detail_dialog_form = true;
                }
            });
        },
        twoYearAgoOperationSelected(event) {
            const payload = {
                'month': event.data.Month,
                'year': new Date().getFullYear() - 2,
                'userId': this.getMekmarGuSelectedUser.id
            };
            this.$store.dispatch('setMekmarGuOperationOrderDetail', payload).then(res => {
                if (res) {
                    this.detail_dialog_form = true;
                }
            });
        },
        previousYearAgoOperationSelected(event) {
            const payload = {
                'month': event.data.Month,
                'year': new Date().getFullYear() - 1,
                'userId': this.getMekmarGuSelectedUser.id
            };
            this.$store.dispatch('setMekmarGuOperationOrderDetail', payload).then(res => {
                if (res) {
                    this.detail_dialog_form = true;
                }
            });
        },
        thisYearAgoOperationSelected(event) {
            const payload = {
                'month': event.data.Month,
                'year': new Date().getFullYear(),
                'userId': this.getMekmarGuSelectedUser.id
            };
            this.$store.dispatch('setMekmarGuOperationOrderDetail', payload).then(res => {
                if (res) {
                    this.detail_dialog_form = true;
                }
            });
        },
        twoYearAgoOrdererSelected(event) {
            const payload = {
                'month': event.data.Month,
                'year': new Date().getFullYear() - 2,
                'userId': this.getMekmarGuSelectedUser.id
            };
            this.$store.dispatch('setMekmarGuSellerOrderDetail', payload).then(res => {
                if (res) {
                    this.detail_dialog_form = true;
                }
            });

        },
        previousYearOrdererSelected(event) {
            const payload = {
                'month': event.data.Month,
                'year': new Date().getFullYear() - 1,
                'userId': this.getMekmarGuSelectedUser.id
            };
            this.$store.dispatch('setMekmarGuSellerOrderDetail', payload).then(res => {
                if (res) {
                    this.detail_dialog_form = true;
                }
            })

        },
        thisYearOrdererSelected(event) {
            const payload = {
                'month': event.data.Month,
                'year': new Date().getFullYear(),
                'userId': this.getMekmarGuSelectedUser.id
            };
            this.$store.dispatch('setMekmarGuSellerOrderDetail', payload).then(res => {
                if (res) {
                    this.detail_dialog_form = true;
                }
            })

        },
        userSelected(event) {
            this.$store.dispatch('setMekmarGuSelectedUser', event.value);
            this.loading = true;
            this.$store.dispatch('setMekmarGuOrdererOperationList', this.getMekmarGuSelectedUser.id).then(res=>{
                if (res) {
                    this.loading = false;
                    this.disabled = false;
                    this.firstYearHalfOneTotal = {
                            fob:0,
                            ddp:0
                        };
                        this.firstYearHalfTwoTotal = {
                            fob:0,
                            ddp:0
                        };
                        this.getReportsMekmarGuOrdererThisYear.filter(x=>x.Month <=6).forEach(x=>{
                            this.firstYearHalfOneTotal.fob += x.FOB;
                            this.firstYearHalfOneTotal.ddp += x.DDP;
                        });
                        this.getReportsMekmarGuOrdererThisYear.filter(x=>x.Month >6).forEach(x=>{
                            this.firstYearHalfTwoTotal.fob += x.FOB;
                            this.firstYearHalfTwoTotal.ddp += x.DDP;
                        });

                        this.secondYearHalfOneTotal = {
                            fob:0,
                            ddp:0
                        };
                        this.secondYearHalfTwoTotal = {
                            fob:0,
                            ddp:0
                        };
                        this.getReportsMekmarGuOrdererPreviousYear.filter(x=>x.Month <=6).forEach(x=>{
                            this.secondYearHalfOneTotal.fob += x.FOB;
                            this.secondYearHalfOneTotal.ddp += x.DDP;
                        });
                        this.getReportsMekmarGuOrdererPreviousYear.filter(x=>x.Month >6).forEach(x=>{
                            this.secondYearHalfTwoTotal.fob += x.FOB;
                            this.secondYearHalfTwoTotal.ddp += x.DDP;
                        });
                        this.thirdYearHalfOneTotal = {
                            fob:0,
                            ddp:0
                        };
                        this.thirdYearHalfTwoTotal = {
                            fob:0,
                            ddp:0
                        };
                        this.getReportsMekmarGuOrdererTwoYearAgo.filter(x=>x.Month <=6).forEach(x=>{
                            this.thirdYearHalfOneTotal.fob += x.FOB;
                            this.thirdYearHalfOneTotal.ddp += x.DDP;
                        });
                        this.getReportsMekmarGuOrdererTwoYearAgo.filter(x=>x.Month >6).forEach(x=>{
                            this.thirdYearHalfTwoTotal.fob += x.FOB;
                            this.thirdYearHalfTwoTotal.ddp += x.DDP;
                        });


                        this.firstYearOperationHalfOneTotal={
                fob:0,
                ddp:0
            };
            this.firstYearOperationHalfTwoTotal = {
                fob:0,
                ddp:0
            };

            this.secondYearOperationHalfOneTotal = {
                fob:0,
                ddp:0
            };
            this.secondYearOperationHalfTwoTotal = {
                fob:0,
                ddp:0
            };
            this.thirdYearOperationHalfOneTotal = {
                fob:0,
                ddp:0
            };
            this.thirdYearOperationHalfTwoTotal = {
                fob:0,
                ddp:0
            };


            this.getReportsMekmarGuOperationThisYear.filter(x=>x.Month <=6).forEach(x=>{
                this.firstYearOperationHalfOneTotal.fob += x.FOB;
                this.firstYearOperationHalfOneTotal.ddp += x.DDP;
            });
            this.getReportsMekmarGuOperationThisYear.filter(x=>x.Month >6).forEach(x=>{
                this.firstYearOperationHalfTwoTotal.fob += x.FOB;
                this.firstYearOperationHalfTwoTotal.ddp += x.DDP;
            });



            this.getReportsMekmarGuOperationPreviousYear.filter(x=>x.Month <=6).forEach(x=>{
                this.secondYearOperationHalfOneTotal.fob += x.FOB;
                this.secondYearOperationHalfOneTotal.ddp += x.DDP;
            });
            this.getReportsMekmarGuOperationPreviousYear.filter(x=>x.Month >6).forEach(x=>{
                this.secondYearOperationHalfTwoTotal.fob += x.FOB;
                this.secondYearOperationHalfTwoTotal.ddp += x.DDP;
            });


            this.getReportsMekmarGuOperationTwoYearAgo.filter(x=>x.Month <=6).forEach(x=>{
                this.thirdYearOperationHalfOneTotal.fob += x.FOB;
                this.thirdYearOperationHalfOneTotal.ddp += x.DDP;
            });
            this.getReportsMekmarGuOperationTwoYearAgo.filter(x=>x.Month >6).forEach(x=>{
                this.thirdYearOperationHalfTwoTotal.fob += x.FOB;
                this.thirdYearOperationHalfTwoTotal.ddp += x.DDP;
            });
















                } else {
                    this.loading = false
                }
            });

        },
        getMonthName(value) {
            const data = [
                { id: 1, name: 'January' },
                { id: 2, name: 'February' },
                { id: 3, name: 'March' },
                { id: 4, name: 'April' },
                { id: 5, name: 'May' },
                { id: 6, name: 'June' },
                { id: 7, name: 'July' },
                { id: 8, name: 'August' },
                { id: 9, name: 'September' },
                { id: 10, name: 'October' },
                { id: 11, name: 'November' },
                { id: 12, name: 'December' },
            ];
            return data.find(item => item.id === value).name;
        }
    }

}
</script>