<template>
    <div class="container" style="height:400px;">
        <div class="row">
            <div class="col">
                <Textarea v-model="todo.Yapilacak" class="w-100" rows="5"/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <Dropdown v-model="selectedRepresentative" :options="representative" optionLabel="name" placeholder="Görev Sahibi" />
            </div>
            <div class="col">
                <Dropdown v-model="selectedPriority" :options="priorities" optionLabel="oncelik" placeholder="Öncelik" />
            </div>
            <div class="col">
                <Checkbox v-model="todo.Acil" :binary="true" /> Acil
            </div>
        </div>
        <div class="row">
            <div class="col"><Button type="button" class="p-button-success w-100" label="Kaydet" @click="saveProcess"/></div>
            <div class="col" v-if="!getTodoButtonStatus"><Button type="button" class="p-button-delete w-100" label="Sil" @click="deleteForm" /></div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    props:{
        todoDetail:{
            type:Object,
            required:false,
        }  
    },
    computed:{
      ...mapGetters(['getTodoButtonStatus']),
      todo(){
            return this.todoDetail;
        }  
    },
    data(){
        return{
            selectedRepresentative:null,
            representative:[
                {'id':10,'name':'Gizem'},
                {'id':19,'name':'Ozlem'},
                {'id':44,'name':'Hakan'},
                {'id':47,'name':'Semih'},

            ],
            selectedPriority:null,
            priorities:[
                {'oncelik':'A'},
                {'oncelik':'B'},
                {'oncelik':'C'},

            ]
        }
    },
    created(){
      if(!this.getTodoButtonStatus){
            this.createdProcess();
        }  
    },
    methods:{
        createdProcess(){
            this.selectedRepresentative = this.representative.find(x=>x.name == this.todo.OrtakGorev);
            this.selectedPriority = this.priorities.find(x=>x.oncelik == this.todo.YapilacakOncelik);

        },
        save(){
            
        },
        update(){
            this.todo.OrtakGorev = this.selectedRepresentative.name;
            this.todo.YapilacakOncelik = this.selectedPriority.oncelik;
            this.$store.dispatch('setTodoUpdate',this.todo);
        },
        saveProcess(){
            if(this.getTodoButtonStatus){
                this.save();
            }else{
                this.update();
            }
        },
        deleteForm(){
            this.$store.dispatch('setTodoDelete',this.todo.ID);
            this.$emit('todo_form_dialog',false);
        }
    }
}
</script>
