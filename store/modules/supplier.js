const state = {
    supplierButtonStatus:false,
};
const actions = {
    setSupplierButtonStatus(vuexContext,status){
        vuexContext.commit('setSupplierButtonStatus',status);
    },
    setSupplierSave(vuexContext,supplier){
        this.$axios.post('/supplier/save',supplier)
        .then(response=>{
            if(response.data.status){
                vuexContext.dispatch('setSupplierList');
                this.$toast.success('Başarıyla Kaydedildi.');
            } else{
                this.$toast.error('Kaydetme Başarısız.');
            }
        })
    },
    setSupplierUpdate(vuexContext,supplier){
        this.$axios.put('/supplier/update',supplier)
        .then(response=>{
            if(response.data.status){
                vuexContext.dispatch('setSupplierList');
                this.$toast.success('Başarıyla Güncellendi.');
            } else{
                this.$toast.error('Güncelleme Başarısız');
            }
        });
    },
    setSupplierDelete(vuexContext,id){
        this.$axios.delete(`/supplier/delete/${id}`)
        .then(response=>{
           if(response.data.status){
                vuexContext.dispatch('setSupplierList');
                this.$toast.success('Başarıyla Silindi.');
            } else{
                this.$toast.error('Silme Başarısız.');
            }
        });
    }
};
const mutations = {
    setSupplierButtonStatus(state,status){
        state.supplierButtonStatus = status;

    }
};
const getters = {
    getSupplierButtonStatus(state){
        return state.supplierButtonStatus;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}