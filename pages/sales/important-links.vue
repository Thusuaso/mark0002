<template>
    <div>
        <Button class="p-button-success w-100" label="Add" @click="newForm"/>
        <importantLinksList :list="getImportantLinkList" @link_list_selected_emit="linkListSelected($event)"/>

        <Dialog :visible.sync="important_link_dialog" :header="header" modal >
            <importantLinksForm :status="status" :model="model" @set_status_button="setStatusButton"/>
        </Dialog>


    </div>
</template>
<script>
import Cookies from 'js-cookie';

import {mapGetters} from 'vuex';
export default {
    computed:{
        ...mapGetters(['getImportantLinkList'])
    },

    data(){
        return{
            important_link_dialog:false,
            header:'',
            status:false,
            model:{
                ID:0,
                Description:'',
                Link:'',
                SaveDate: new Date(),
                UpdatedUserID:Cookies.get('userId'),
                Username:Cookies.get('username')
            }
        }
    },
    methods:{
        setStatusButton(){
            this.status = false;
            this.important_link_dialog = false;
        },
        newForm(){
            this.important_link_dialog = true;
            this.header = 'Add New Important Link';
            this.status = true;
            this.model = {
                ID:0,
                Description:'',
                Link:'',
                SaveDate: new Date(),
                UpdatedUserID:Cookies.get('userId'),
                Username:Cookies.get('username')
            }
        },
        linkListSelected(event){
            this.important_link_dialog = true;
            this.header = 'Update Important Link';
            this.status = false;
            this.model = event.data;
        }
    },
    created(){
        this.$store.dispatch('setImportantLinkListAction');
    }
}
</script>