<template>
    <div class="" style="height:300px;">
        <todo :todoList="todos.listA" header="Yapılacaklar" @todo_form_detail_dialog="todoFormDialog($event)"/>
        <br/>
        <todo :todoList="todos.listMail" header="Mail Listesi" @todo_form_detail_dialog="todoFormDialog($event)"/>
    </div>
</template>
<script>
export default {
    props:{
        todos:{
        }
    },
    methods:{
        todoFormDialog(event){
            this.$emit('todo_form_detail_dialog',event);
        }
    }
}
</script>