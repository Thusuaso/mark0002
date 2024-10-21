<template>
    <div style="width:55rem;">
        <div class="row m-auto text-center mt-4">
        <div class="col-sm-6">
            <span class="p-float-label">
                <Textarea id="description" v-model="model.Description" :autoResize="true" rows="5" cols="30" class="w-100"/>
                <label for="description">Description</label>
            </span>

        </div>
        <div class="col-sm-6">
            <span class="p-float-label">
                <InputText id="link" type="text" v-model="model.Link" class="w-100"/>
                <label for="link">Link</label>
            </span>

        </div>

    </div>
    <div class="row m-auto text-center mt-4">
        <div :class="status?'col-sm-12':'col-sm-6'">
            <Button :class="status?'p-button-success w-100':'p-button-warning w-100'" :label="status?'Save':'Update'" @click="process"/>
        </div>
        <div class="col-sm-6" v-show="!status">
            <Button class="p-button-danger w-100" label="Delete" @click="deleted" />
        </div>
    </div>
    </div>


</template>
<script>
import Cookies from 'js-cookie';
export default {
    props:{
        status:{
            type:Boolean,
            required:true
        },
        model:{
            type:Object,
            required:true
        }
    },
    data(){
        return{

        }
    },
    methods:{
        process(){
            if(this.status){
                this.save(this.model);
            }else{
                this.update(this.model);
            }
        },
        save(model){
            this.$store.dispatch('setImportantLinkListSaveAction',model);
            this.$emit('set_status_button');
        },
        update(model){
            this.model.SaveDate = new Date();
            this.model.UpdatedUserID = Cookies.get('userId');
            this.model.Username = Cookies.get('username');
            this.$store.dispatch('setImportantLinkListUpdateAction',model);
            this.$emit('set_status_button');


        },
        deleted(){
            this.$store.dispatch('setImportantLinkListDeleteAction',this.model.ID);
            this.$emit('set_status_button');

        }
    },
    created(){

    }
}
</script>