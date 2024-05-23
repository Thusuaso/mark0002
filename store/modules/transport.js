const state = {
    companyList:[],
    transportList:[],
};
const actions = {
    setCompanyList(vuexContext) {
        this.$axios.get('/transport/company/list')
        .then(response=>{
           vuexContext.commit('setCompanyList',response.data.company); 
        });
    },
    setCompanySave(vuexContext,company){
        this.$axios.post('/transport/company/save',company)
        .then(response=>{
           if(response.data.status){
            this.$toast.success('Başarıyla Kaydedildi.');

            vuexContext.dispatch('setCompanyList');
            
           } else{
            this.$toast.success('Kaydetme Başarısız.');
            
           }
        });
    },
    setTransportSave(vuexContext,transport){
      this.$axios.post('/transport/list/save',transport)
      .then(response=>{
            if(response.data.status){
                this.$toast.success('Başarıyla Kaydedildi.');
            }else{
                this.$toast.error('Kaydetme Başarısız');
            };
        });
    },
    setTransportFileSave(vuexContext,transport){
        this.$axios.post('/transport/file/list/save',transport)
        .then(response=>{
           if(response.data.status){
             this.$toast.success('Başarıyla Kaydedildi.');
           } else{
             this.$toast.error('Kaydetme Başarısız');
           }
        });
    },
    setTransportList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/transport/list')
        .then(response=>{
            vuexContext.commit('setTransportList', response.data.transport); 
            vuexContext.dispatch('setEndLoadingAction');
        });
    },
    setUpdateTransport(vuexContext, transport) {
        return new Promise((resolve, reject) => {
            this.$axios.put('/transport/list/update', transport)
                .then(response => {
                    if (response.data.status) {
                        vuexContext.dispatch('setTransportList');
                resolve(true);
                    } else {
                        resolve(false);
               }
           }) 
        });
    },
    setDeleteTransport(vuexContext, transport) {
        return new Promise((resolve, reject) => {
            this.$axios.put('/transport/list/delete', transport)
                .then(res => {
                    if (res.data.status) {
                                                vuexContext.dispatch('setTransportList');

                        resolve(true);
                    } else {
                        reject(false);
                }
            })
        })
    }
};
const mutations = {
    setCompanyList(state,company){
        state.companyList = company;
    },
    setTransportList(state,transport){
        state.transportList = transport;
    }
};
const getters = {
    getCompanyList(state){
        return state.companyList;
    },
    getTransportList(state){
        return state.transportList;
    }
};

export default {
    state,
    actions,
    mutations,
    getters,
}