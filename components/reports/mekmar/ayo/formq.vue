<template>
        <div class="row mt-3">
        <div class="col">{{ quarter }}</div>
        <div class="col">
            <CustomInput
                :value="tl"
                text="Tl"
                @onInput="tl = $event"
                :disabled="false"
          />
        </div>
        <div class="col">
            <CustomInput
                :value="currency"
                text="Currency"
                @onInput="currency = $event"
                :disabled="false"
          />
        </div>
        <div class="col">
            <CustomInput
                :value="usd"
                text="Usd"
                @onInput="usd = $event"
                :disabled="false"
          />
        </div>
        <div class="col">
            <Button class="p-button-success w-100" label="Save" @click="save" :disabled="save_button_disabled"/>
        </div>
        <div class="col">
            <Button class="p-button-warning w-100" label="Update" @click="update" :disabled="update_button_disabled"/>
        </div>
        <hr/>

    </div>
</template>
<script>
    export default {
        data(){
            return {
                save_button_disabled:false,
                update_button_disabled:true
            }
        },
        props:{
            tl:{
                type:Number,
                required:true
            },
            currency:{
                type:Number,
                required:true
            },
            usd:{
                type:Number,
                required:true
            },
            quarter:{
                type:Number,
                required:true
            },
            quarter_id:{
                type:Number,
                required:true
            },
            year:{
                type:Number,
                required:true
            },
            id:{
                type:Number,
                required:true
            }
        },
        created(){
            if(this.tl == 0 || this.tl == null || this.tl == undefined || this.tl == ''){
                this.save_button_disabled = false;
                this.update_button_disabled = true;
            }else{
                this.save_button_disabled = true;
                this.update_button_disabled = false;
            };
        },
        methods:{
            save(){
                const data = {
                    'quarter_id':this.quarter_id,
                    'usd':this.usd,
                    'tl':this.tl,
                    'currency':this.currency,
                    'year':this.year
                }
               this.$emit('quarter_save_emit',data);
            },
            update(){
                const data = {
                    'quarter_id':this.quarter_id,
                    'usd':this.usd,
                    'tl':this.tl,
                    'currency':this.currency,
                    'year':this.year,
                    'id':this.id
                    
                }
               this.$emit('quarter_update_emit',data);
            }
        },
        watch:{
            currency(){
            this.usd = this.tl / this.currency;
        },
        tl(){
            this.usd = this.tl / this.currency;
        }
        }
    }
</script>