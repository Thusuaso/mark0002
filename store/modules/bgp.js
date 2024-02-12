const state = {
    bgpLists:[],
    bgpDetailList:[],
    bgpDetailButtonStatus:false,
};
const actions = {
    setBgpList(vuexContext){
        this.$axios.get('/sales/bgp/list')
        .then(response=>{
            vuexContext.commit('setBgpList',response.data.data);
        })
    },
    setBgpSave(vuexContext,bgp){
        this.$axios.post('/sales/bgp/save',bgp)
        .then(response=>{
            if(response.data.status){
                const username = vuexContext.getters.getUserList.find(x=>x.ID == bgp.Temsilci).KullaniciAdi;
                response.data.data.Temsilci = username
                vuexContext.commit('setBgpSave',response.data.data);
                this.$toast.success('Başarıyla Kaydedildi.');
            }else{
                this.$toast.error('Kaydetme Başarısız');
            }

        });
    },
    setBgpDelete(vuexContext,id){
        this.$axios.delete(`/sales/bgp/delete/${id}`)
        .then(response=>{
            if(response.data.status){
                vuexContext.commit('setBgpDelete',response.data.id);
                this.$toast.success('Başarıyla Silindi.');
            } else{
                this.$toast.error('Silme Başarısız');
            }
        });
    },
    setBgpDetailList(vuexContext,projectName){
        this.$axios.get(`/sales/bgp/detail/${projectName}`)
        .then(response=>{ 
            vuexContext.commit('setBgpDetailList',response.data.data);
        });
    },
    setBgpDetailButton(vuexContext,status){
        vuexContext.commit('setBgpDetailButton',status);
    },
    setBgpDetailDelete(vuexContext,id){
        this.$axios.delete(`/sales/bgp/detail/delete/${id}`)
        .then(response=>{
            if(response.data.status){
                vuexContext.commit('setBgpDetailDelete',response.data.id); 
                this.$toast.success('Başarıyla Silindi');
            }else{
                this.$toast.error('Silme Başarısız');
            }
        });
        

    },
    setBgpDetailSave(vuexContext,bgp){
        this.$axios.post('/sales/bgp/detail/save',bgp)
        .then(response=>{
            if(response.data.status){
                vuexContext.commit('setBgpDetailSave',response.data.data);
                this.$toast.success('Kaydetme Başarılı');
            }else{
                this.$toast.error('Kaydetme Başarısız');
            }
        })
    },
    setBgpDetailUpdate(vuexContext,bgp){
        this.$axios.put('/sales/bgp/detail/update',bgp)
        .then(response=>{
            if(response.data.status){
                vuexContext.commit('setBgpDetailUpdate',response.data.data);
                this.$toast.success('Güncelleme Başarılı');
            }else{
                this.$toast.error('Güncelleme Başarısız');
            }
        });
    }
};
const mutations = {
    setBgpList(state,bgp){
        state.bgpLists = bgp;
    },
    setBgpSave(state,bgp){
        state.bgpLists.push(bgp);
    },
    setBgpDelete(state,id){
        const index = state.bgpLists.findIndex(item=>item.ID===id);
        state.bgpLists.splice(index,1);
    },
    setBgpDetailList(state,bgpDetail){
        state.bgpDetailList = bgpDetail;
    },
    setBgpDetailButton(state,status){
        state.bgpDetailButtonStatus = status;
    },
    setBgpDetailDelete(state,id){
        const index = state.bgpDetailList.findIndex(item=>item.ID===id);
        state.bgpDetailList.splice(index,1);
    },
    setBgpDetailSave(state,bgp){
        state.bgpDetailList.push(bgp);
    },
    setBgpDetailUpdate(state,bgp){
        const index = state.bgpDetailList.findIndex(item=>item.ID===bgp.ID);
        state.bgpDetailList[index] = bgp;
    }
};
const getters = {
    getBgpLists(state){
        return state.bgpLists;
    },
    getBgpDetailList(state){
        return state.bgpDetailList;
    },
    getBgpDetailButtonStatus(state){
        return state.bgpDetailButtonStatus;
    }
};

export default{
    state,
    actions,
    mutations,
    getters
}