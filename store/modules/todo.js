const state = {
    todos:[],
    todoButtonStatus: false,
        toDoMainListByUsername: [],
    toDoMainListByUsernameLenght: 0,
    todoMainListByUsernameButtonStatus:false,

};
const actions = {
    setTodos(vuexContext){
        this.$axios.get('/sales/todos/list')
        .then(response=>{
            vuexContext.commit('setTodos',response.data);
        });
    },
    setTodoStatusChange(vuexContext,id){
        this.$axios.put(`/sales/todos/change/status/${id}`)
        .then(response=>{
            if(response.data.status){
                vuexContext.dispatch('setTodos');
                
                this.$toast.success('Başarıyla Güncellendi');
            }else{
                this.$toast.error('Güncelleme Başarısız');
            }
        });
    },
    setTodoButtonStatus(vuexContext,status){
        vuexContext.commit('setTodoButtonStatus',status);
    },
    setTodoUpdate(vuexContext,todo){
        this.$axios.put('/sales/todos/update',todo)
        .then(response=>{
            if(response.data.status){
                vuexContext.dispatch('setTodos');
                this.$toast.success('Başarıyla Güncellendi');
            }else{
                this.$toast.error('Güncelleme Başarısız');
            }
        });
    },
    setTodoDelete(vuexContext,id){
        this.$axios.delete(`/sales/todos/delete/${id}`)
        .then(response=>{
           if(response.data.status){
            vuexContext.dispatch('setTodos');
            this.$toast.success('Başarıyla Silindi');
           }else{
                this.$toast.error('Silme Başarısız');
            }

        });
    },
        setToDoListByUsername(vuexContext, username) {
        this.$axios.get(`/todo/main/list/by/username/${username}`)
            .then(response => {
                vuexContext.commit('setToDoListByUsername', response.data.list); 
                
            });
    },
    setTodoMainListByUsernameButtonStatus(vuexContext,status) {
        vuexContext.commit('setTodoMainListByUsernameButtonStatus', status);
    },
    setTodoSave(vuexContext, todo) {
        this.$axios.post('/todo/by/username/save', todo)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Yeni Görev Hayırlı Olsun.');
                    vuexContext.dispatch('setToDoListByUsername', todo.GorevVerenAdi);
                } else {
                    this.$toast.error('Bi Görevi Bile Ekleyemiyor musun?');
                }
            });
    },
    setTodoUpdate(vuexContext, todo) {
        this.$axios.put('/todo/by/username/update', todo)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Görev Başarıyla Güncellendi.');
                    vuexContext.dispatch('setToDoListByUsername', todo.GorevVerenAdi);
                } else {
                    this.$toast.error('Görev Güncellenemedi.');
                }
            });
    },
    setTodoDelete(vuexContext, todo) {
        this.$axios.delete(`/todo/by/username/delete/${todo.ID}`)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Görev Başarıyla Silindi.');
                    vuexContext.dispatch('setToDoListByUsername', todo.GorevVerenAdi);
                } else {
                    this.$toast.error('Görev Silinemedi.');
                }
            });
    },
    setTodoDone(vuexContext,todo){
        this.$axios.post(`/todo/by/username/done`,todo)
            .then(response => {
                if (response.data.status) {
                    this.$toast.success('Görev Tamamlandı.');
                                        vuexContext.dispatch('setToDoListByUsername', todo.GorevVerenAdi);

                } else {
                    this.$toast.error('Görev Tamamlanamadı.');
                }
            });
    }
};
const mutations = {
    setTodos(state,todos){
        state.todos = todos;
    },
    setTodoButtonStatus(state,status){
        state.todoButtonStatus = status;
    },
        setToDoListByUsername(state,payload){
        state.toDoMainListByUsername = payload;
        state.toDoMainListByUsernameLenght = parseInt(payload.length);
    },
    setTodoMainListByUsernameButtonStatus(state, payload) {
        state.todoMainListByUsernameButtonStatus = payload;
    }
};
const getters = {
    getTodos(state){
        return state.todos;
    },
    getTodoButtonStatus(state){
        return state.todoButtonStatus;
    },
        getToDoMainListByUsername(state) {
        return state.toDoMainListByUsername;
    },
    getToDoMainListByUsernameLenght(state) {
        return state.toDoMainListByUsernameLenght;
    },
    getTodoMainListByUsernameButtonStatus(state) {
        return state.todoMainListByUsernameButtonStatus;
    }
};
export default {
    state,
    actions,
    mutations,
    getters
}