<template>
    <div class="row mt-3">
        <div class="col">{{ month }}</div>
        <div class="col">
            <CustomInput
                :value="valueLocal"
                text="Tl"
                @onInput="valueLocal = $event"
                :disabled="false"
          />
        </div>
        <div class="col">
            <CustomInput
                :value="currencyLocal"
                text="Currency"
                @onInput="currencyLocal = $event"
                :disabled="true"
          />
        </div>
        <div class="col">
            <CustomInput
                :value="usdLocal"
                text="Usd"
                @onInput="usdLocal = $event"
                :disabled="false"
          />
        </div>
        <div class="col">
            <Button severity="success" class="w-100" label="Save" @click="save" :disabled="save_button_disabled"/>
        </div>
        <div class="col">
            <Button severity="warn" class="w-100" label="Update" @click="update" :disabled="update_button_disabled"/>
        </div>
        <hr/>

    </div>
</template>
<script>
export default {
    props:{
        id:{
            type:Number,
            required:true
        },
        month:{
            type:String,
            required:true
        },
        value:{
            type:Number,
            required:false
        },
        usd:{
            type:Number,
            required:true
        },
        currency:{
            type:Number,
            required:true
        },
        month_id:{
            type:Number,
            required:true
        },
        year:{
            type:Number,
            required:true
        }
    },
    data(){
        return{
            /*
             * [PROP-1] UC PROP'UN YEREL AYNASI -- DUZELTME.
             *
             * Kaynakta sablon UC prop'a da yaziyordu
             * (@onInput="value = $event" / currency / usd) ve iki
             * watcher da `this.usd = ...` yapiyordu.
             *
             * Vue 3'te prop'lar readonly proxy: her biri calisma aninda
             *     TypeError: proxy set handler returned false
             *                for property "usd"
             * atiyor. DERLEME GECIYOR (bunlar v-model degil, duz olay
             * isleyicisi), yani hata ancak kullanici alana yazinca
             * ortaya cikiyor.
             *
             * AYNI HATAYI KULLANICI KARDES BILESENDE BILDIRMISTI:
             * AyoFormCurrency.vue, commit eaafb9e18 ("ortalama kur
             * alinamadi: TypeError: proxy set handler returned false
             * for property currency"). O commit'te "tum pilot tarandi,
             * baska prop yazmasi YOK" denmisti; tarama SCRIPT
             * atamalarina bakmis, SABLONDAKI @onInput yazmalarini
             * gormemisti. Bu dosya oyle atlanmis ve simdi
             * find-prop-mutations.mjs --pilot ile yakalandi.
             *
             * NOT -- OZELLIK NUXT 2'DE DE BOZUKTU: Vue 2 de prop'a
             * atamayi engelliyordu (yalnizca uyari), yani "Tl" alanina
             * yazmak usd'yi hic guncellemiyordu. Yerel duruma gecirmek
             * ozelligi CALISIR hale getiriyor.
             */
            valueLocal: 0,
            currencyLocal: 0,
            usdLocal: 0,

            save_button_disabled:true,
            update_button_disabled:true
        }
    },
    created(){
        if(this.value == 0 || this.value == null || this.value == undefined || this.value == ''){
            this.save_button_disabled = false;
            this.update_button_disabled = true;
        }else{
            this.save_button_disabled = true;
            this.update_button_disabled = false;
        }
    },
    methods:{
        save(){
            const data = {
                'month':this.month_id,
                'value':this.valueLocal,
                'usd':this.usdLocal,
                'currency':this.currencyLocal,
                'year':this.year

            }
            this.$emit('cost_save_emit',data);
            this.save_button_disabled = true;
            this.update_button_disabled = false;
        },
        update(){
          /* Yikici islem -- onay. Metin: app/utils/confirm.ts */
          if (!confirmAction()) return
          
            const data = {
                'id':this.id,
                'month':this.month_id,
                'value':this.valueLocal,
                'usd':this.usdLocal,
                'currency':this.currencyLocal,
                'year':this.year

            }
            this.$emit('cost_update_emit',data);
        }
    },
    watch:{
        /* Prop degisince ayna esliyor (ebeveyn yeni deger gecirdiginde). */
        value:{ immediate:true, handler(v){ this.valueLocal = v } },
        currency:{ immediate:true, handler(v){ this.currencyLocal = v } },
        usd:{ immediate:true, handler(v){ this.usdLocal = v } },

        /*
         * Usd hesabi artik YEREL degerlerden: kullanici "Tl" alanina
         * yazdiginda yalnizca yerel degisiyor, prop degismiyor -- prop'u
         * izlemek bu durumda hic tetiklenmezdi.
         *
         * Sifira bolme korundu: kaynakta `this.value / this.currency`
         * currency 0 iken Infinity uretiyordu; kosul eklendi.
         */
        valueLocal(){
            this.usdLocal = this.currencyLocal ? this.valueLocal / this.currencyLocal : 0;
        },
        currencyLocal(){
            this.usdLocal = this.currencyLocal ? this.valueLocal / this.currencyLocal : 0;
        }
    }
}
</script>