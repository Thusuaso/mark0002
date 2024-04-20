const state = {
    accountsList:[],
    accountsButtonStatus:false
}
const actions = {
    setAccountsList(vuexContext){
        this.$axios.get('/accounts/list')
        .then(response=>{
            vuexContext.commit('setAccountsList',response.data.list);
        });
    },
    setAccountsButtonStatus(vuexContext,payload){
        vuexContext.commit('setAccountsButtonStatus',payload);
    },
    setAccountsSave(vuexContext,model){
        this.$axios.post('/accounts/save',model)
        .then(response=>{
            if(response.data.status){
                vuexContext.dispatch('setAccountsList');
                this.$toast.success('Saved Successfully'); 
                this.$store.dispatch('setAccountsModel');

            }else{
                this.$toast.success('Save Failed');
            }

        });
    },
    setAccountsUpdate(vuexContext,model){
        this.$axios.put('/accounts/update',model)
        .then(response=>{
            if(response.data.status){
                vuexContext.dispatch('setAccountsList');
                this.$toast.success('Updated Successfully'); 
                this.$store.dispatch('setAccountsModel');

            }else{
                this.$toast.success('Updated Failed');
            }
        });
    },
    setAccountsDeleted(vuexContext,id){
        this.$axios.delete('/accounts/delete/'+id)
        .then(response=>{
            if(response.data.status){
                vuexContext.dispatch('setAccountsList');
                this.$toast.success('Deleted Successfully'); 
                this.$store.dispatch('setAccountsModel');
            } else{
                this.$toast.success('Deleted Failed'); 
            }
        })
    }
}
const mutations = {
    setAccountsList(state,payload){
        state.accountsList = payload;
    },
    setAccountsButtonStatus(state,payload){
        state.accountsButtonStatus = payload;
    }
}
const getters = {
    getAccountsList(state){
        return state.accountsList;
    },
    getAccountsButtonStatus(state){
        return state.accountsButtonStatus;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}