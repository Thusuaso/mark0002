<template>
    <div class="col">
        <!--
          `table-scroll-x` ZORUNLU -- SAYILAR RAKAM ORTASINDAN
          BOLUNUYORDU.

          Bu bilesen her YIL icin bir kez basiliyor ve koku
          `<div class="col">`; sayfa da hepsini tek bir `<div class="row">`
          icine koyuyor (continent-order.vue). Yani yil sayisi kadar
          kolon yan yana diziliyor ve her birine genisligin ancak
          1/N'i dusuyor.

          O dar kolonda varsayilan kural (app.css: table-layout fixed
          + overflow-wrap anywhere) para degerlerini bosluk olmadigi
          icin RAKAM ORTASINDAN kiriyor. Bir hucre iki satira cikinca
          satir yuksekligi artiyor, tek satirlik komsu hucreler
          dikeyde ortalandigi icin "asagi kaymis" goruluyor --
          bildirilen belirti bu.

          Kolon sayisi (3) degil, KOLON GENISLIGI sorun; o yuzden
          cozum MkByCustomerList/SummaryDetailList ile ayni: tablo
          dogal genisligine cikip kendi kabinda yatay kayiyor.
        -->
        <DataTable :value="values.data" class="table-scroll-x">
            <template #header>
                <div class="text-center">
                    {{ values.year }}
                </div>
            </template>
            <Column field="Continent" header="Continent"></Column>
            <Column field="Fob" header="Fob">
                <template #body="slotProps">
                    {{ formatPriceUsd(slotProps.data.Fob) }}
                </template>
                <template #footer> 
                    {{ formatPriceUsd(total.fob) }}
                </template>
            </Column>
            <Column field="Ddp" header="Ddp">
                <template #body="slotProps">
                    {{ formatPriceUsd(slotProps.data.Ddp) }}
                </template>
                <template #footer> 
                    {{ formatPriceUsd(total.ddp) }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
    export default {
        props:{
            values:{
                type:Object,
                required:true
            }
        },
        data(){
            return{
                total:{
                    fob:0,
                    ddp:0
                }
            }
        },
        created(){
            this.values.data.forEach(x=>{
                this.total.fob += x.Fob;
                this.total.ddp += x.Ddp;

            });
        }
    }
</script>