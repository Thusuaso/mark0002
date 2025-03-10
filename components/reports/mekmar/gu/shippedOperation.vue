<template>
    <div class="container">
        <Dropdown v-model="getMekmarGuSelectedUser" :options="users" optionLabel="username" placeholder="Select a User"
            style="width:50%;" @change="userSelected($event)" />
        <Button type="button" class="p-button-primary" @click="excel_output" label="Excel"/>

        <!-- <div class="row">
            <div class="col">
                <DataTable :value="getReportsMekmarGuOrdererThisYear" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOrdererThisYearTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOrdererThisYearTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="getReportsMekmarGuOrdererPreviousYear" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOrdererPreviousYearTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOrdererPreviousYearTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="getReportsMekmarGuOrdererTwoYearAgo" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOrdererTwoYearAgoTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOrdererTwoYearAgoTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <DataTable :value="getReportsMekmarGuOperationThisYear" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOperationThisYearTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOperationThisYearTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="getReportsMekmarGuOperationPreviousYear" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOperationPreviousYearTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOperationPreviousYearTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="getReportsMekmarGuOperationTwoYearAgo" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOperationTwoYearAgoTotal.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ getReportsMekmarGuOperationTwoYearAgoTotal.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div> -->


        <div class="row">
            <div class="col">
                <DataTable :value="getReportsMekmarGuOrdererThisYearForw.filter(x=>x.Month <= 6)" class="p-datatable-sm"
                    :selection="selectedForw" selectionMode="single" @row-select="thisYearOrdererSelectedForw($event)"
                    :loading="loading">
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_1_half_one.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_1_half_one.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
                <DataTable :value="getReportsMekmarGuOrdererThisYearForw.filter(x=>x.Month >6)" class="p-datatable-sm"
                    :selection="selectedForw" selectionMode="single" @row-select="thisYearOrdererSelectedForw($event)"
                    :loading="loading">
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_1_half_two.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_1_half_two.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="getReportsMekmarGuOrdererPreviousYearForw.filter(x=>x.Month <=6)" class="p-datatable-sm"
                    :selection="selectedForw" selectionMode="single"
                    @row-select="previousYearOrdererSelectedForw($event)" :loading="loading">

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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_2_half_one.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_2_half_one.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
                <DataTable :value="getReportsMekmarGuOrdererPreviousYearForw.filter(x=>x.Month >6)" class="p-datatable-sm"
                    :selection="selectedForw" selectionMode="single"
                    @row-select="previousYearOrdererSelectedForw($event)" :loading="loading">

                    <template #header>
                        {{ new Date().getFullYear() - 1 }} Seller Shipped (Second Six Months)
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
                            {{ total_2_half_two.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_2_half_two.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="getReportsMekmarGuOrdererTwoYearAgoForw.filter(x=>x.Month <=6)" class="p-datatable-sm"
                    :selection="selectedForw" selectionMode="single" @row-select="twoYearAgoOrdererSelectedForw($event)"
                    :loading="loading">

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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_3_half_one.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_3_half_one.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
                <DataTable :value="getReportsMekmarGuOrdererTwoYearAgoForw.filter(x=>x.Month >6)" class="p-datatable-sm"
                    :selection="selectedForw" selectionMode="single" @row-select="twoYearAgoOrdererSelectedForw($event)"
                    :loading="loading">

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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_3_half_two.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_3_half_two.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>


        <div class="row">
            <div class="col">
                <DataTable :value="getreportsMekmarGuOperationThisYearForw.filter(x=>x.Month <=6)" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_4_half_one.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_4_half_one.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
                <DataTable :value="getreportsMekmarGuOperationThisYearForw.filter(x=>x.Month >6)" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_4_half_two.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_4_half_two.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="getReportsMekmarGuOperationPreviousYearForw.filter(x=>x.Month <=6)" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_5_half_one.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_5_half_one.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
                <DataTable :value="getReportsMekmarGuOperationPreviousYearForw.filter(x=>x.Month >6)" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_5_half_two.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_5_half_two.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col">
                <DataTable :value="getReportsMekmarGuOperationTwoYearAgoForw.filter(x=>x.Month <=6)" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_6_half_one.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_6_half_one.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
                <DataTable :value="getReportsMekmarGuOperationTwoYearAgoForw.filter(x=>x.Month >6)" class="p-datatable-sm"
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
                            {{ slotProps.data.FOB | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_6_half_two.fob | formatPriceUsd }}
                        </template>
                    </Column>
                    <Column field="DDP" header="DDP">
                        <template #body="slotProps">
                            {{ slotProps.data.DDP | formatPriceUsd }}
                        </template>
                        <template #footer>
                            {{ total_6_half_two.ddp | formatPriceUsd }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
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
import api from '../../../../plugins/excel.server';

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
            'getReportsMekmarGuOperationTwoYearAgoTotalForw'
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
            selectedThisYearOrderer: null,
            detail_dialog_form: false,
            loading: false,
            selectedForw: null,
            total_1_half_one:{
                fob:0,
                ddp:0
            },
            total_1_half_two:{
                fob:0,
                ddp:0
            },
            total_2_half_one:{
                fob:0,
                ddp:0
            },
            total_2_half_two:{
                fob:0,
                ddp:0
            },
            total_3_half_one:{
                fob:0,
                ddp:0
            },
            total_3_half_two:{
                fob:0,
                ddp:0
            },
            total_4_half_one:{
                fob:0,
                ddp:0
            },
            total_4_half_two:{
                fob:0,
                ddp:0
            },
            total_5_half_one:{
                fob:0,
                ddp:0
            },
            total_5_half_two:{
                fob:0,
                ddp:0
            },
            total_6_half_one:{
                fob:0,
                ddp:0
            },
            total_6_half_two:{
                fob:0,
                ddp:0
            }

        }
    },
    methods: {
        excel_output(event) {
            const data = {
                'thisYearSeller': this.getReportsMekmarGuOrdererThisYearForw,
                'previousYearSeller': this.getReportsMekmarGuOrdererPreviousYearForw,
                'twoYearAgoYearSeller': this.getReportsMekmarGuOrdererTwoYearAgoForw,
                'thisYearOperation': this.getreportsMekmarGuOperationThisYearForw,
                'previousYearOperation': this.getReportsMekmarGuOperationPreviousYearForw,
                'twoYearAgoOperation': this.getReportsMekmarGuOperationTwoYearAgoForw
            };
            api.post('/gu/reports/seller/operation/forwarding', data)
                .then(response => {
                    if (response.status) {
                        const link = document.createElement("a");
                        link.href = this.getLocalUrl + "/gu/reports/seller/operation/forwarding";
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
            this.$store.dispatch('setMekmarGuOrdererOperationList', this.getMekmarGuSelectedUser.id).then(res => {
                if (res) {
                    this.loading = false;
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
    },
    watch:{
        getReportsMekmarGuOrdererThisYearForw(){
            this.total_1_half_one = {
                fob:0,
                ddp:0
            };
            this.total_1_half_two = {
                fob:0,
                ddp:0
            };

            this.getReportsMekmarGuOrdererThisYearForw.filter(x=>x.Month <= 6).forEach(x=>{
                this.total_1_half_one.fob += x.FOB;
                this.total_1_half_one.ddp += x.DDP; 
            });
            
            this.getReportsMekmarGuOrdererThisYearForw.filter(x=>x.Month > 6).forEach(x=>{
                this.total_1_half_two.fob += x.FOB;
                this.total_1_half_two.ddp += x.DDP; 
            })

        },
        getReportsMekmarGuOrdererPreviousYearForw(){
            this.total_2_half_one = {
                fob:0,
                ddp:0
            };
            this.total_2_half_two = {
                fob:0,
                ddp:0
            };
            this.getReportsMekmarGuOrdererPreviousYearForw.filter(x=>x.Month <= 6).forEach(x=>{
                this.total_2_half_one.fob += x.FOB;
                this.total_2_half_one.ddp += x.DDP; 
            });
            this.getReportsMekmarGuOrdererPreviousYearForw.filter(x=>x.Month > 6).forEach(x=>{
                this.total_2_half_two.fob += x.FOB;
                this.total_2_half_two.ddp += x.DDP; 
            })
        },
        getReportsMekmarGuOrdererTwoYearAgoForw(){
            this.total_3_half_one = {
                fob:0,
                ddp:0
            };
            this.total_3_half_two = {
                fob:0,
                ddp:0
            };
            this.getReportsMekmarGuOrdererTwoYearAgoForw.filter(x=>x.Month <= 6).forEach(x=>{
                this.total_3_half_one.fob += x.FOB;
                this.total_3_half_one.ddp += x.DDP; 
            });
            this.getReportsMekmarGuOrdererTwoYearAgoForw.filter(x=>x.Month > 6).forEach(x=>{
                this.total_3_half_two.fob += x.FOB;
                this.total_3_half_two.ddp += x.DDP; 
            })
        },
        getreportsMekmarGuOperationThisYearForw(){
            this.total_4_half_one = {
                fob:0,
                ddp:0
            };
            this.total_4_half_two = {
                fob:0,
                ddp:0
            };
            this.getreportsMekmarGuOperationThisYearForw.filter(x=>x.Month <= 6).forEach(x=>{
                this.total_4_half_one.fob += x.FOB;
                this.total_4_half_one.ddp += x.DDP; 
            });
            this.getreportsMekmarGuOperationThisYearForw.filter(x=>x.Month > 6).forEach(x=>{
                this.total_4_half_two.fob += x.FOB;
                this.total_4_half_two.ddp += x.DDP; 
            })
        },
        getReportsMekmarGuOperationPreviousYearForw(){
            this.total_5_half_one = {
                fob:0,
                ddp:0
            };
            this.total_5_half_two = {
                fob:0,
                ddp:0
            };
            this.getReportsMekmarGuOperationPreviousYearForw.filter(x=>x.Month <= 6).forEach(x=>{
                this.total_5_half_one.fob += x.FOB;
                this.total_5_half_one.ddp += x.DDP; 
            });
            this.getReportsMekmarGuOperationPreviousYearForw.filter(x=>x.Month > 6).forEach(x=>{
                this.total_5_half_two.fob += x.FOB;
                this.total_5_half_two.ddp += x.DDP; 
            })

        },
        getReportsMekmarGuOperationTwoYearAgoForw(){
            this.total_6_half_one = {
                fob:0,
                ddp:0
            };
            this.total_6_half_two = {
                fob:0,
                ddp:0
            };
            this.getReportsMekmarGuOperationTwoYearAgoForw.filter(x=>x.Month <= 6).forEach(x=>{
                this.total_6_half_one.fob += x.FOB;
                this.total_6_half_one.ddp += x.DDP; 
            });
            this.getReportsMekmarGuOperationTwoYearAgoForw.filter(x=>x.Month > 6).forEach(x=>{
                this.total_6_half_two.fob += x.FOB;
                this.total_6_half_two.ddp += x.DDP; 
            })
        }
    }

}
</script>