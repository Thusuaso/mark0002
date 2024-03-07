import socket from '../../plugins/socket.io';
const state = {
    productsList:[],
    productList:[],
    productionTotal:{},
    productionSumTotal:{
        'miktar':0,
        'kutu':0,
        'kutuiciadet':0,
        'kasaadedi':0,
    },
    productionButtonStatus:false,
    productionProductsList:[],
    productionNewButtonStatus:false,
    productionCrateNo:null,
    productionMekmerButtonStatus:false,
    productionDisButtonStatus:false,
    productionDisMekmerButtonStatus:false,
    productionBulunamadiButtonStatus:false,
    productionCrateSizeList:[],
    productionCrateSizeButtonStatus:false,
};
const actions = {
    setSelectionProductsList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/selection/production/list')
            .then(response => {
                if (response.data) {
                    vuexContext.commit('setSelectionProductsList',response.data.data);
                    vuexContext.commit('setSelectionProductList',response.data.data.mekmerList);
                    vuexContext.commit('setSelectionProductTotalList', response.data.data.mekmerList);
                    vuexContext.commit('setEndLoadingAction');
                }

        });
    },
    setSelectionProductionTotal(vuexContext){
        this.$axios.get('/selection/production/total')
        .then(response=>{
            vuexContext.commit('setSelectionProductionTotal',response.data.data);
        });
    },
    setSelectionProductionMekmerButton(vuexContext){
        vuexContext.commit('setSelectionProductList',vuexContext.state.productsList.mekmerList);
        vuexContext.commit('setSelectionProductTotalList',vuexContext.state.productsList.mekmerList);

    },
    setSelectionProductionDisButton(vuexContext){
        vuexContext.commit('setSelectionProductList',vuexContext.state.productsList.disList);
        vuexContext.commit('setSelectionProductTotalList',vuexContext.state.productsList.disList);

    },
    setSelectionProductionMekmerDisButton(vuexContext){
        vuexContext.commit('setSelectionProductList',vuexContext.state.productsList.mekmerDisList);
        vuexContext.commit('setSelectionProductTotalList',vuexContext.state.productsList.mekmerDisList);

    },
    setSelectionProductionBulunamadiButton(vuexContext){
        vuexContext.commit('setSelectionProductList',vuexContext.state.productsList.bulunamadiList);
        vuexContext.commit('setSelectionProductTotalList',vuexContext.state.productsList.bulunamadiList);

    },
    setSelectionProductionButtonStatus(vuexContext,status){
        vuexContext.commit('setSelectionProductionButtonStatus',status);
    },
    setSelectionProductionProductsList(vuexContext,po){
        this.$axios.get(`/order/products/${po}`)
        .then(response=>{
            vuexContext.commit('setSelectionProductionProductsList',response.data.products);
        });
    },
    setSelectionProductionProductDelete(vuexContext,id){
      vuexContext.commit('setSelectionProductionProductDelete',id)  
    },
    setSelectionProductionCrateNoIn(vuexContext){
        this.$axios.get('/selection/production/crateno/in')
        .then(response=>{
            vuexContext.commit('setSelectionProductionCrateNo',response.data.no);
        });
    },
    setSelectionProductionCrateNoOut(vuexContext){
        this.$axios.get('/selection/production/crateno/out')
        .then(response=>{
            vuexContext.commit('setSelectionProductionCrateNo',response.data.no);
        });
    },
    setSelectionProductionSave(vuexContext,product){
        this.$axios.post('/selection/production/save',product)
        .then(response=>{
            if(response.data.status){
                vuexContext.dispatch('setSelectionProductionUpdateList');
                this.$socket.socketIO.emit('production_update_emit');
                this.$toast.success('Başarıyla Kaydedildi.')
                
            }
        });
    },
    setSelectionProductionMekmerButtonStatus(vuexContext){
      vuexContext.commit('setSelectionProductionMekmerButtonStatus');
    },
    setSelectionProductionDisButtonStatus(vuexContext){
        vuexContext.commit('setSelectionProductionDisButtonStatus');
    },
    setSelectionProductionMekmerDisButtonStatus(vuexContext){
        vuexContext.commit('setSelectionProductionMekmerDisButtonStatus');
    },
    setSelectionProductionBulunamadiButtonStatus(vuexContext){
        vuexContext.commit('setSelectionProductionBulunamadiButtonStatus');
    },
    setSelectionProductionDelete(vuexContext,crateno){
        this.$axios.delete(`/selection/production/delete/${crateno}`)
        .then(response=>{
           if(response.data.status){
                 vuexContext.dispatch('setSelectionProductionUpdateList');
                 this.$socket.socketIO.emit('production_update_emit');

                 this.$toast.success('Başarıyla Silindi.');
            } else{
                this.$toast.error('Silme Başarısız.');
            }
        });
    },
    setSelectionProductionUpdateList(vuexContext){
        this.$axios.get('/selection/production/list')
            .then(response=>{
                vuexContext.commit('setSelectionProductsList',response.data.data);
                if(vuexContext.state.productionMekmerButtonStatus){
                    vuexContext.dispatch('setSelectionProductionMekmerButton');
                }else if (vuexContext.state.productionDisButtonStatus){
                    vuexContext.dispatch('setSelectionProductionDisButton');
                }else if (vuexContext.state.productionDisMekmerButtonStatus){
                    vuexContext.dispatch('setSelectionProductionMekmerDisButton');
                }else if (vuexContext.state.productionBulunamadiButtonStatus){
                    vuexContext.dispatch('setSelectionProductionBulunamadiButton');
                }
            });
    },
    setSelectionProductionUpdate(vuexContext,product){
        this.$axios.put('/selection/production/update',product)
        .then(response=>{
            if(response.data.status){
                vuexContext.dispatch('setSelectionProductionUpdateList');
                this.$socket.socketIO.emit('production_update_emit');

                this.$toast.success('Başarıyla Güncellendi.');
            }else{
                this.$toast.error('Güncelleme Başarısız.');
            }
        });
    },
    setSelectionProductionCrateSizeList(vuexContext) {
        vuexContext.dispatch('setBeginLoadingAction');
        this.$axios.get('/selection/production/cratesize')
        .then(response=>{
            vuexContext.commit('setSelectionProductionCrateSizeList', response.data.cratesize);
            vuexContext.dispatch('setEndLoadingAction');
        });
    },
    setSelectionProductionCrateSizeButtonStatus(vuexContext,status){
        vuexContext.commit('setSelectionProductionCrateSizeButtonStatus',status);
    },
    setSelectionProductionCrateSizeSave(vuexContext,cratesize){
        this.$axios.post('/selection/production/cratesize/save',cratesize)
        .then(response=>{
            if(response.data.status){
                vuexContext.commit('setSelectionProductionCrateSizeSave',response.data.cratesize);
                this.$toast.success('Başarıyla Kaydedildi.');
            }else{
                this.$toast.error('Kaydetme Başarısız.');
            }
        });
        
    },
    setSelectionProductionCrateSizeUpdate(vuexContext,cratesize){
        console.log(cratesize);
        this.$axios.put('/selection/production/cratesize/update',cratesize)
        .then(response=>{
            if(response.data.status){
                vuexContext.commit('setSelectionProductionCrateSizeUpdate',cratesize);
                this.$toast.success('Başarıyla Güncellendi.');
            }else{
                this.$toast.error('Güncelleme Başarısız.');
            }
        });
        
    },
    setSelectionProductionCrateSizeDelete(vuexContext,id){
        this.$axios.delete(`/selection/production/cratesize/delete/${id}`)
        .then(response=>{
            if(response.data.status){
                vuexContext.commit('setSelectionProductionCrateSizeDelete',response.data.id);
                this.$toast.success('Başarıyla Silindi.');
            }else{
                this.$toast.error('Silme Başarısız.');
            }
        });
        
    },

};
const mutations = {
    setSelectionProductionCrateSizeDelete(state,cratesize){
        const index = state.productionCrateSizeList.findIndex(x => x.Id === cratesize.Id);
        state.productionCrateSizeList.splice(index,1);
    },
    setSelectionProductionCrateSizeUpdate(state,cratesize){
        const index = state.productionCrateSizeList.findIndex(x => x.Id === cratesize.Id);
        state.productionCrateSizeList[index] = cratesize;
    },
    setSelectionProductionCrateSizeSave(state,cratesize){
        state.productionCrateSizeList.push(cratesize);

    },
    setSelectionProductionCrateSizeList(state,cratesizelist){
      state.productionCrateSizeList = cratesizelist;
    },
    setSelectionProductionTotal(state,productionTotal){
        state.productionTotal = productionTotal;
    },
    setSelectionProductsList(state,productsList){
        state.productsList = productsList;

    },
    setSelectionProductList(state,productsList){
        state.productList = productsList;
    },
    setSelectionProductTotalList(state,payload){
        state.productionSumTotal = {
            'miktar':0,
            'kutu':0,
            'kutuiciadet':0,
            'kasaadedi':0,
        };
        payload.forEach(x => {
            state.productionSumTotal.miktar += x.Miktar;
            state.productionSumTotal.kutu += x.KutuAdet;
            state.productionSumTotal.kutuiciadet += x.Adet;
        });
        state.productionSumTotal.kasaadedi = payload.length;
    },
    setSelectionProductionButtonStatus(state,status){
        state.productionButtonStatus = status;
    },
    setSelectionProductionProductsList(state,productList){
        state.productionProductsList = productList;
    },
    setSelectionProductionProductDelete(state,id){
      const index = state.productionProductsList.findIndex(x => x.ID === id);
      state.productionProductsList.splice(index,1);
    },
    setSelectionProductionCrateNo(state,no){
        state.productionCrateNo = no;
    },
    setSelectionProductionMekmerButtonStatus(state){
        state.productionMekmerButtonStatus = true;
        state.productionDisButtonStatus = false;
        state.productionDisMekmerButtonStatus = false;
        state.productionBulunamadiButtonStatus = false;
    },
    setSelectionProductionDisButtonStatus(state){
        state.productionMekmerButtonStatus = false;
        state.productionDisButtonStatus = true;
        state.productionDisMekmerButtonStatus = false;
        state.productionBulunamadiButtonStatus = false;
    },
    setSelectionProductionMekmerDisButtonStatus(state){
        state.productionMekmerButtonStatus = false;
        state.productionDisButtonStatus = false;
        state.productionDisMekmerButtonStatus = true;
        state.productionBulunamadiButtonStatus = false;
    },
    setSelectionProductionBulunamadiButtonStatus(state){
        state.productionMekmerButtonStatus = false;
        state.productionDisButtonStatus = false;
        state.productionDisMekmerButtonStatus = false;
        state.productionBulunamadiButtonStatus = true;
    },
    setSelectionProductionCrateSizeButtonStatus(state,status){
        state.productionCrateSizeButtonStatus = status;
    },

};
const getters = {
    getProductionTotal(state){
        return state.productionTotal;
    },
    getProductsList(state){
        return state.productsList
    },
    getProductList(state){
        return state.productList;
    },
    getProductionSumTotal(state){
        return state.productionSumTotal;
    },
    getProductionButtonStatus(state){
        return state.productionButtonStatus;
    },
    getProductionProductsList(state){
        return state.productionProductsList;
    },
    getProductionCrateNo(state){
        return state.productionCrateNo;
    },
    getProductionCrateSizeList(state){
        return state.productionCrateSizeList;
    },
    getProductionCrateSizeButtonStatus(state){
        return state.productionCrateSizeButtonStatus;
    }


};

export default {
    state,
    actions,
    mutations,
    getters
}