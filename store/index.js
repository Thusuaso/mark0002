import Vuex from 'vuex';
import auth from './modules/auth';
import home from './modules/home';
import sales from './modules/sales';
import bgp from './modules/bgp';
import shared from './modules/shared';
import todo from './modules/todo';
import representative from './modules/representative';
import selection from './modules/selection';
import cards from './modules/cards';
import supplier from './modules/supplier';
import shipment from './modules/shipment';
import upload from './modules/upload';
import container from './modules/container';
import transport from './modules/transport';
import customer from './modules/customer';
import models from './modules/models';
import reports from './modules/reports';
import sample from './modules/sample';
import offer from './modules/offer';
import panel from './modules/panel';
import finance from './modules/finance';
import order from './modules/order';
import loading from './modules/loading';
import logs from './modules/logs';
import local from './modules/local';
import authority from './modules/authority';
import accounts from './modules/accounts';
const createStore = ()=>{
    return new Vuex.Store({
       state:{
        },
       actions:{

        },
       mutations:{},
       getters:{},
       modules:[
            auth,
            home,
            sales,
            bgp,
            shared,
            todo,
            representative,
            selection,
            cards,
            supplier,
            shipment,
            upload,
            container,
            transport,
            customer,
           models,
           reports,
           sample,
           offer,
           panel,
           finance,
           order,
            loading,
            logs,
            local,
            authority,
            accounts
        ],

    });
};

export default createStore;