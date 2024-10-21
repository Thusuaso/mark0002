<template>
    <div>
        <DataTable :value="list" responsiveLayout="scroll"
            :selection.sync="selectedLinkList"
            selectionMode="single"
            @row-click="linkListSelected($event)"
        >
            <Column field="ID" header="ID"></Column>
            <Column field="Description" header="Desc."></Column>
            <Column field="Link" header="Link"></Column>
            <Column field="SaveDate" header="Date">
                <template #body="slotProps">
                    {{ slotProps.data.SaveDate | dateToString }}
                </template>
            </Column>

            <Column field="Username" header="User"></Column>

        </DataTable>
    </div>
</template>
<script >
 export default {
    props:{
        list:{
            type:Array,
            required:true
        }
    },
    data(){
        return{
            selectedLinkList:null
        }
    },
    methods:{
        linkListSelected(event){
            this.$emit('link_list_selected_emit',event);
        }
    }
 }
</script>