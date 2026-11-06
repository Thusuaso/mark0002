<template>
    <div class="col">
        <!--
          `table-scroll-x` -- DAR KOLONDA SAYILAR BOLUNUYORDU.

          Bu bilesen `v-for` ile bir `<div class="row">` icine
          tekrar tekrar basiliyor ve koku `<div class="col">`; yani
          kac ogе varsa o kadar kolon yan yana diziliyor ve her
          birine genisligin 1/N'i dusuyor.

          O dar kolonda varsayilan kural (app.css: table-layout fixed
          + overflow-wrap anywhere) para degerlerini bosluk olmadigi
          icin rakam ortasindan kiriyor; satir yuksekligi artinca tek
          satirlik komsu hucreler "asagi kaymis" goruluyor.

          Ayni kok neden ve ayni cozum: GuContinentOrders.vue,
          MkByCustomerList.vue, SummaryDetailList.vue.
        -->
        <DataTable
            :value="list.data"
            class="table-scroll-x"
            scrollable
            scrollHeight="500px"
        >
            <template #header >
                <div class="text-center">
                    {{ list.year }}
                </div>
            </template>
            <Column field="FirmaAdi" header="Supplier"></Column>
            <Column field="Total" header="Total">
                <template #body="slotProps">
                    {{ formatPriceUsd(slotProps.data.Total) }}
                </template>
                <template #footer>
                    {{ formatPriceUsd(list.total) }}
                </template>
            </Column>
        </DataTable>

    </div>
</template>
<script>
export default {
    props:{
        list:{
            type:Array,
            required:true
        }
    },

}
</script>