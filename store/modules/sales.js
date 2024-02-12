const state = {
    followList:[],
    followDetail:[],
    followDetailData:{},
    followDetailNewButton:false,
};
const actions = {
    setFollowList(vuexContext){
        this.$axios.get('/sales/follow')
        .then(response=>{
            vuexContext.commit('setFollowList',response.data.data);
        });
    },
    setFollowDetail(vuexContext,customer){
        this.$axios.get(`/sales/follow/detail/${customer}`)
        .then(response=>{
            vuexContext.commit('setFollowDetail',response.data.data);
        });
    },
    setFollowDetailData(vuexContext,detailData){
        vuexContext.commit('setFollowDetailData',detailData);
    },
    setFollowDetailNewButton(vuexContext,newButton){
        vuexContext.commit('setFollowDetailNewButton',newButton);
    },
    setFollowDetailSave(vuexContext,saveData){
        this.$axios.post('/sales/follow/detail/save',saveData)
        .then(response=>{
            if(response.data.status){
                vuexContext.commit('setFollowDetailSave',response.data.data);
                this.$toast.success('Başarıyla Kaydedildi.');
            }else{
                this.$toast.error('Kaydetme Başarısız');
            }
        });
        
    },
    setFollowDetailUpdate(vuexContext,updateData){
        this.$axios.put('/sales/follow/detail/update',updateData)
        .then(response=>{
            if(response.data.status){
                this.$toast.success('Başarıyla Güncellendi.');
                vuexContext.commit('setFollowDetailUpdate',response.data.data);
            }else{
                this.$toast.error('Güncelleme Başarısız');
            }
        });
    },
    setFollowDetailDelete(vuexContext,id){
        this.$axios.delete(`/sales/follow/detail/delete/${id}`)
        .then(response=>{
            if(response.data.status){
                vuexContext.commit('setFollowDetailDelete',id);
                this.$toast.success('Silme Başarılı')
            }else{
                this.$toast.error('Silme Başarısız');
            }
        });
    }
};
const mutations = {
    setFollowList(state,payload){
        state.followList = payload;
    },
    setFollowDetail(state,payload){
        state.followDetail = payload;
    },
    setFollowDetailData(state,payload){
        state.followDetailData = payload;
    },
    setFollowDetailNewButton(state,payload){
        state.followDetailNewButton = payload;
    },
    setFollowDetailSave(state,payload){
        state.followDetail.push(payload);
    },
    setFollowDetailUpdate(state,payload){
        const index = state.followDetail.findIndex(x=>x.ID == payload.ID);
        state.followDetail[index] = payload;
    },
    setFollowDetailDelete(state,payload){
        const index = state.followDetail.findIndex(x=>x.ID == payload);
        state.followDetail.splice(index,1);
    }
};
const getters = {
    getFollowList(state){
        return state.followList;
    },
    getFollowDetail(state){
        return state.followDetail;
    },
    getFollowDetailData(state){
        return state.followDetailData;
    },
    getFollowDetailNewButton(state){
        return state.followDetailNewButton;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}