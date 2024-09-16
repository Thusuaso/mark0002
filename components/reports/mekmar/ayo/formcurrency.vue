<template>
    <div class="row mt-3">
        <div class="col">{{ month }}</div>

        <div class="col">
            <CustomInput
                :value="currency"
                text="Currency"
                @onInput="currency = $event"
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
    props:{
        id:{
            type:Number,
            required:true
        },
        month:{
            type:String,
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
            save_button_disabled:true,
            update_button_disabled:true
        }
    },
    created(){
        if(this.currency == 0 || this.currency == null || this.currency == undefined || this.currency == ''){
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
                'currency':this.currency,
                'year':this.year

            }
            this.$emit('cost_save_emit',data);
            this.save_button_disabled = true;
            this.update_button_disabled = false;
        },
        update(){
            const data = {
                'id':this.id,
                'month':this.month_id,
                'currency':this.currency,
                'year':this.year

            }
            this.$emit('cost_update_emit',data);
        }
    },
    watch:{
    }
}
</script>