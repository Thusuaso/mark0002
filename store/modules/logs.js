const state = {

}

const actions = {
    setLogs(vuexContext,payload){

        this.$axios.post('/logs/save',{...payload,'username':this.$cookie.get('username'),'date':new Date()})
        .then(response=>{
            if(response.data.status){
                this.$toast.success('Loglara Eklendi.');
            }else{
                this.$toast.error('Loglara Eklenemedi.');
                
            }
        });
    }
}

const mutations = {

}

const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}