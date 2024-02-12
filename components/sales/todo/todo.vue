<template>
    <div>
        <DataTable 
            :value="todoList"
            :filters.sync="filters2" 
            filterDisplay="row"
            :selection="selectedTodo"
            selectionMode="single"
            @row-click="todoSelected($event)"

        >
            <Column field="OrtakGorev" header="Görev Sahipleri">
                <template #filter="{filterModel,filterCallback}">
                <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
            </template>
            </Column>
            <Column field="Yapilacak" header="Görev">
                <template #filter="{filterModel,filterCallback}">
                <InputText type="text" v-model="filterModel.value" @input="filterCallback()" class="p-column-filter" />
            </template>
            </Column>
            <Column >
                <template #body="slotProps">
                    <Button type="button" class="p-button-primary" label="Yapıldı" @click="isTodoChange(slotProps.data.ID)"/>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
<script>
import { FilterMatchMode } from 'primevue/api';
export default {
    data(){
        return {
            filters2:{
                OrtakGorev: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                Yapilacak: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            selectedTodo:null
        }   
    },
    props:{
        todoList:{
        }
    },
    methods:{
        todoSelected(event){
          this.$emit('todo_form_detail_dialog',event.data);
          this.$store.dispatch('setTodoButtonStatus',false);
        },
        isTodoChange(id){
            this.$store.dispatch('setTodoStatusChange',id);
        }
    }
}
</script>