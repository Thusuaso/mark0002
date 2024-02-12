const state = {
    containerFollowList:[],
    containerUnollowList:[],
    containerResults : null,
    containerInputList:[],
};
const actions = {
    setContainerFollowList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/container/follow/list')
        .then(response=>{
            vuexContext.commit('setContainerFollowList', response.data.follow);
            vuexContext.dispatch('setEndLoadingAction');
        });
    },
    setContainerUnfollowList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/container/unfollow/list')
        .then(response=>{
            vuexContext.commit('setContainerUnfollowList', response.data.unfollow);
            vuexContext.dispatch('setEndLoadingAction');
        })
    },
    setContainerFollowSave(vuexContext,follow){
        this.$axios.post('/container/follow/save',follow)
        .then(response=>{
            if(response.data.status){
                vuexContext.dispatch('setContainerFollowList');
                vuexContext.dispatch('setContainerUnfollowList');

                this.$toast.success('Başarıyla Kaydedildi.');
            } else{
                this.$toast.error('Kaydetme Başarışız.');
            }
        });
    },
    setContainerInputSave(vuexContext,container){
      this.$axios.post('/container/input/save',container).then(response=>{
            if(response.data.status){
                this.$toast.success('Başarıyla Kaydedildi.');
                vuexContext.commit('setContainerInputSave',response.data.containerResults);
            }else{
                this.$toast.error('Kaydetme Başarışız.');
            };
        });  
    },
    setContainerInputFileSave(vuexContext,container){
        this.$axios.post('/container/input/file/save',container)
        .then(response=>{
            if(response.data.status){
                this.$toast.success('Başarıyla Kaydedildi.');
            }else{
                this.$toast.error('Kaydetme Başarışız.');
            }
        });
    },
    setContainerInputList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/container/input/list')
        .then(response=>{
            vuexContext.commit('setContainerInputList', response.data.list);
            vuexContext.dispatch('setEndLoadingAction');
            
        });
    }
};
const mutations = {
    setContainerFollowList(state,containerFollowList){
        state.containerFollowList = containerFollowList;
    },
    setContainerUnfollowList(state,containerUnfollowList){
        state.containerUnollowList = containerUnfollowList;
    },
    setContainerInputSave(state,containerResults){
        state.containerResults = containerResults;
    },
    setContainerInputList(state,containerList){
        state.containerInputList = containerList;
    }
};
const getters = {
    getContainerFollowList(state){
        return state.containerFollowList;
    },
    getContainerUnfollowList(state){
        return state.containerUnollowList;
    },
    getContainerResults(state){
        return state.containerResults;
    },
    getContainerInputList(state){
        return state.containerInputList;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}