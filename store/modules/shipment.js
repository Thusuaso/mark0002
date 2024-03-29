const state = {
    shipmentAmount:{
        'order':0,
        'production':0,
        'remainder':0,
    },
    shipmentProductionList:[],
    shipmentSendProductionList:[],
    shipmentSendProductionTotal:{
        'crate':0,
        'total':0,
        'amount':0
    }
};
const actions = {
    setShipmentSendProductionList(vuexContext){
      vuexContext.commit('setShipmentSendProductionList')  
    },

    setShipmentAmount(vuexContext,product){
        this.$axios.get(`/shipment/product/amount/${product.SiparisNo}/${product.ID}/${product.UrunKartId}`)
        .then(response=>{
            vuexContext.commit('setShipmentAmount',response.data);
            vuexContext.commit('setShipmentProductionList',response.data.productionList);
        });
    },
    setShipmentSendingProduction(vuexContext,products){
        vuexContext.commit('setShipmentSendingProduction',products);
    },
    setShipmentProductionDeleteList(vuexContext){
        vuexContext.commit('setShipmentProductionDeleteList');
    },
    setShipmentSave(vuexContext,products){
        return new Promise((resolve,reject)=>{
            this.$axios.post('/shipment/products/save',products)
            .then(response=>{
                if(response.data.status){
                    this.$axios.post('/shipment/products/save/mail',products).then(res=>{
                        if(res.data.status){
                            this.$toast.success('Mail Gönderildi');
                            resolve(res.data.status);
                        } else{
                            this.$toast.error('Mail Gönderme Başarısız');
                            resolve(res.data.status);
                        }
                    });
                } else{
                    resolve(response.data.status);
                }
                

            });
        })

    }
};
const mutations = {
    setShipmentSendProductionList(state){
      state.shipmentSendProductionList = [];  
    },
    setShipmentAmount(state,shipmentAmount){
        state.shipmentAmount.order = shipmentAmount.order.toFixed(2);
        state.shipmentAmount.production = shipmentAmount.production.toFixed(2);
        state.shipmentAmount.remainder = shipmentAmount.remainder.toFixed(2);
    },
    setShipmentProductionList(state,productionList){
        state.shipmentProductionList = productionList;
    },
    setShipmentProductionDeleteList(state){
        state.shipmentProductionList = [];
    },
    setShipmentSendingProduction(state,products){

        for(const item of products){
            state.shipmentSendProductionTotal.total += item.TotalProduct;
            state.shipmentSendProductionTotal.amount += item.Miktar;
            state.shipmentSendProductionList.push(item);
        }
        state.shipmentSendProductionTotal.crate += products.length;
    }

};
const getters = {
    getShipmentAmount(state){
        return state.shipmentAmount;
    },
    getShipmentProductionList(state){
        return state.shipmentProductionList;
    },
    getShipmentSendProductionList(state){
        return state.shipmentSendProductionList;
    },
    getShipmentSendProductionTotal(state){
        return state.shipmentSendProductionTotal;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};