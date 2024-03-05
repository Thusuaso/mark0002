const state = {
    cardsButtonStatus:false,
    cardsOrderList:[]
};
const actions = {
    setCardsButtonStatus(vuexContext,status){
        vuexContext.commit('setCardsButtonStatus',status);
    },
    setCardsSave(vuexContext,card){
        this.$axios.post('/card/save',card)
        .then(response=>{
            if(response.data.status){
                vuexContext.dispatch('setCardSizesList');
                vuexContext.dispatch('setCardCategoryList');
                vuexContext.dispatch('setCardProductsList');
                vuexContext.dispatch('setCardSurfacesList');


                vuexContext.dispatch('setCardList');
                this.$toast.success('Başarıyla Kaydedildi.');
            }else{
                this.$toast.error('Kaydetme Başarısız.');
            }
        });
    },
    setCardsDelete(vuexContext,cardId){
        this.$axios.delete(`/card/delete/${cardId}`)
        .then(response=>{
            if(response.data.status){
                vuexContext.dispatch('setCardList');
                this.$toast.success('Başarıyla Silindi.');
            } else{
                this.$toast.error('Silme Başarısız');
            };
        })
    },
    setCardsUpdate(vuexContext,card){
        this.$axios.put('/card/update',card)
        .then(response=>{
            if(response.data.status){
                vuexContext.dispatch('setCardSizesList');
                vuexContext.dispatch('setCardList');
                this.$toast.success('Başarıyla Güncellendi.');
            } else{
                this.$toast.error('Güncelleme Başarısız');
            }
        });
    },
    setCardsOrderList(vuexContext,cardId){
        this.$axios.get('/card/order/list',cardId).then(response=>{
           vuexContext.commit("setCardsOrderList",response.data.list); 
        });
    }
};
const mutations = {
    setCardsButtonStatus(state,status){
        state.cardsButtonStatus = status;
    },
    setCardsOrderList(state,payload){
        state.cardsOrderList = payload;
    }

};
const getters = {
    getCardsButtonStatus(state){
        return state.cardsButtonStatus;
    },
    getCardsOrderList(state){
        return state.cardsOrderList;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}