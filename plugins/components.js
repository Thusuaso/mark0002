import Vue from 'vue';
import JsonExcel from 'vue-json-excel'
/*Client Components */
import navbar from '~/components/shared/navbar';
import authForm from '~/components/auth/authForm';
import home from '~/components/home/home';
import followList from '~/components/sales/follow/list';
import followForm from '~/components/sales/follow/form';
import followFormDetail from '~/components/sales/follow/formDetail';
import bgpNewForm from '~/components/sales/bgp/newForm';
import bgpLists from '~/components/sales/bgp/lists';
import bgpList from '~/components/sales/bgp/list';
import bgpDetailList from '~/components/sales/bgp/detailList';
import bgpDetailForm from '~/components/sales/bgp/detailForm';
import todos from '~/components/sales/todo/todos';
import todo from '~/components/sales/todo/todo';
import todoForm from '~/components/sales/todo/form';
import representativeList from '~/components/sales/representative/list';
import representativeForm from '~/components/sales/representative/form';
import selectionList from '~/components/selection/input/list';
import selection from '~/components/selection/input/selection';
import selectionForm from '~/components/selection/input/form';
import productCards from '~/components/cards/list';
import cardsForm from '~/components/cards/form';
import crateList from '~/components/selection/cratesize/list';
import crateForm from '~/components/selection/cratesize/form';
import supplierList from '~/components/supplier/list';
import supplierForm from '~/components/supplier/form';
import shipmentForm from '~/components/shipment/form';
import uploadForm from '~/components/upload/form';
import uploadList from '~/components/upload/list';
import containerFollowList from '~/components/container/follow/list';
import transportInput from '~/components/transport/input';
import transportCompanyForm from '~/components/transport/company';
import transportList from '~/components/transport/list';
import containerInputForm from '~/components/container/input/form';
import containerInputList from '~/components/container/input/list';
import customerMekmarList from '~/components/customer/mekmar/list';
import customerMekmarForm from '~/components/customer/mekmar/form';
import customerMekmarOrdersPoForm from '~/components/customer/mekmar/orderlist';
import customerMekmarOrdersPoProductsForm from '~/components/customer/mekmar/orderproductlist';
import customerOfferList from '~/components/customer/offer/list';
import customerOfferForm from '~/components/customer/offer/form';
import customerBgpList from '~/components/customer/bgp/list';
import customerBgpForm from '~/components/customer/bgp/form';
import customerFairList from '~/components/customer/fair/list';
import customerFairForm from '~/components/customer/fair/form';
import customerSelectionList from '~/components/customer/selection/list';
import customerSelectionForm from '~/components/customer/selection/form';
import reportsMekmerProductionList from '~/components/reports/mekmer/production/list';
import reportsMekmerStockList from '~/components/reports/mekmer/stock/list';
import reportsMekmerStockForm from '~/components/reports/mekmer/stock/form';
import reportsMekmerMineList from '~/components/reports/mekmer/mine/list';
import reportsMekmarAyoList from '~/components/reports/mekmar/ayo/list';
import reportsMekmarLoadingList from '~/components/reports/mekmar/loading/list';
import reportsMekmarForwardingList from '~/components/reports/mekmar/forwarding/list';
import reportsMekmarSummaryList from '~/components/reports/mekmar/summary/list';
import reportsMekmarSummaryDetailList from '~/components/reports/mekmar/summary/detail';
import reportsMekmarMkYearByPoOrdersList from '~/components/reports/mekmar/mk/yearByPoOrders';
import reportsMekmarMkYearByMarketingOrdersList from '~/components/reports/mekmar/mk/yearByMarketingOrders';
import reportsMekmarMkYearByMarketingForwardingList from '~/components/reports/mekmar/mk/yearByMarketingForwarding';
import reportsMekmarMkByCustomerList from '~/components/reports/mekmar/mk/byCustomer';
import reportsMekmarGuContList from '~/components/reports/mekmar/gu/cont';
import reportsMekmarGuMekusList from '~/components/reports/mekmar/gu/mekus';
import reportsMekmarGuLogsList from '~/components/reports/mekmar/gu/logs';
import reportsMekmarGuForwardingList from '~/components/reports/mekmar/gu/forwarding';
import sampleList from '~/components/sample/list/list';
import sampleForm from '~/components/sample/list/form';
import sampleFinanceList from '~/components/sample/finance/list';
import sampleFinanceForm from '~/components/sample/finance/form';
import offerList from '~/components/offers/list';
import offerDetail from '~/components/offers/detail';
import offerForm from '~/components/offers/form';
import offerProforma from '~/components/offers/proforma';
import offerSample from '~/components/offers/sample';
import offerOld from '~/components/offers/old';


import panelPublishedList from '~/components/panel/published/list';
import panelProductForm from '~/components/panel/form';
import panelProjectList from '~/components/panel/project/list';
import panelProjectForm from '~/components/panel/project/form';
import panelUsersList from '~/components/panel/users/list';
import panelUsersForm from '~/components/panel/users/form';
import todoByUsernameList from '~/components/todo/list';
import todoByUsernameForm from '~/components/todo/form';
import financeList from '~/components/finance/lists/list';
import financeCollectionList from '~/components/finance/lists/collection';
import financeAdvancedPaymentForm from '~/components/finance/forms/advancepayment';
import financePoList from '~/components/finance/lists/po';
import financePoForm from '~/components/finance/forms/po';
import FinancePaidList from '~/components/finance/lists/paid';
import orderList from '~/components/orders/lists/list';
import orderDetailForm from '~/components/orders/forms/detail';
import orderDetailOrderForm from '~/components/orders/forms/order';
import orderDetailProformaForm from '~/components/orders/forms/proforma';
import orderDetailCostForm from '~/components/orders/forms/cost';
import orderDetailSupplierForm from '~/components/orders/forms/supplier';
import orderDetailDocumentForm from '~/components/orders/forms/document';
import orderDetailCheckForm from '~/components/orders/forms/check';
import orderDetailWorkermanForm from '~/components/orders/forms/workerman';
import reportsMekmerAtlantaList from '~/components/reports/mekmer/atlanta/list';
import panelUsaStockList from '~/components/panel/usa/list';
import panelUsaStockForm from '~/components/panel/usa/form';
import salesConsiderForm from '~/components/sales/consider/form';
import salesConsiderList from '~/components/sales/consider/list';
import todoMainList from '~/components/todo/main/list';
import accountsList from '~/components/accounts/list';
import accountsForm from '~/components/accounts/form';
import docform from '~/components/upload/docform';
import isfform from '~/components/upload/isfform';
import supplierform from '~/components/upload/supplierform';
import orderShippedList from '~/components/orders/lists/shipped';
import orderList2 from '~/components/orders/lists/list2';
import orderDetailForm2 from '~/components/orders/forms/detail2';
import orderDetailOrderForm2 from '~/components/orders/forms/order2';


import financeListMekmer from '~/components/reports/mekmer/finance/lists/list';
import financeCollectionListMekmer from '~/components/reports/mekmer/finance/lists/collection';
import financeAdvancedPaymentFormMekmer from '~/components/reports/mekmer/finance/forms/advancepayment';
import financePoListMekmer from '~/components/reports/mekmer/finance/lists/po';
import financePoFormMekmer from '~/components/reports/mekmer/finance/forms/po';
import FinancePaidListMekmer from '~/components/reports/mekmer/finance/lists/paid';
import loadingSpinner from '~/components/shared/loading';

import ordererOperation from '~/components/reports/mekmar/gu/ordererOperation';
import shippedOperation from '~/components/reports/mekmar/gu/shippedOperation';


import creditCardForm from '~/components/reports/mekmar/ayo/formc';
import quarterAyoForm from '~/components/reports/mekmar/ayo/formq';
import formCurrency from '~/components/reports/mekmar/ayo/formcurrency';

import profitGu from '~/components/reports/mekmar/gu/profit';

import importantLinksForm from '~/components/sales/important-links/form';
import importantLinksList from '~/components/sales/important-links/list';


Vue.component('importantLinksForm',importantLinksForm);
Vue.component('importantLinksList',importantLinksList);


Vue.component('profitGu',profitGu);

Vue.component('formCurrency',formCurrency);


Vue.component('quarterAyoForm',quarterAyoForm);

Vue.component('creditCardForm',creditCardForm);

Vue.component('shippedOperation',shippedOperation);

Vue.component('ordererOperation',ordererOperation);

Vue.component('loadingSpinner',loadingSpinner);

Vue.component('financeListMekmer',financeListMekmer);
Vue.component('financeCollectionListMekmer',financeCollectionListMekmer);
Vue.component('financeAdvancedPaymentFormMekmer',financeAdvancedPaymentFormMekmer);
Vue.component('financePoListMekmer',financePoListMekmer);
Vue.component('financePoFormMekmer',financePoFormMekmer);
Vue.component('FinancePaidListMekmer',FinancePaidListMekmer);




Vue.component('orderDetailOrderForm2',orderDetailOrderForm2);

Vue.component('orderDetailForm2',orderDetailForm2);


Vue.component('orderList2',orderList2);

Vue.component('supplierform',supplierform);
Vue.component('orderShippedList',orderShippedList);


Vue.component('isfform',isfform);

Vue.component('docform',docform);

Vue.component('accountsList',accountsList);
Vue.component('accountsForm',accountsForm);

Vue.component('offerOld',offerOld);

Vue.component('offerSample',offerSample);
Vue.component('offerProforma',offerProforma);
Vue.component('navbar', navbar);
Vue.component('authForm', authForm);
Vue.component('home',home);
Vue.component('followList', followList);
Vue.component('followForm', followForm);
Vue.component('followFormDetail',followFormDetail);
Vue.component('bgpNewForm',bgpNewForm);
Vue.component('bgpLists',bgpLists);
Vue.component('bgpList',bgpList);
Vue.component('bgpDetailList',bgpDetailList);
Vue.component('bgpDetailForm',bgpDetailForm);
Vue.component('todos',todos);
Vue.component('todo',todo);
Vue.component('todoForm',todoForm);
Vue.component('representativeList',representativeList);
Vue.component('representativeForm',representativeForm);
Vue.component('selectionList',selectionList);
Vue.component('selectionForm',selectionForm);
Vue.component('selection',selection);
Vue.component('productCards',productCards);
Vue.component('cardsForm',cardsForm);
Vue.component('crateList',crateList);
Vue.component('crateForm',crateForm);
Vue.component('supplierList',supplierList);
Vue.component('supplierForm',supplierForm);
Vue.component('shipmentForm',shipmentForm);
Vue.component('uploadForm',uploadForm);
Vue.component('uploadList',uploadList);
Vue.component('containerFollowList',containerFollowList);
Vue.component('transportInput',transportInput);
Vue.component('transportCompanyForm',transportCompanyForm);
Vue.component('transportList',transportList);
Vue.component('containerInputForm',containerInputForm);
Vue.component('containerInputList',containerInputList);
Vue.component('customerMekmarList',customerMekmarList);
Vue.component('customerMekmarForm',customerMekmarForm);
Vue.component('customerMekmarOrdersPoForm',customerMekmarOrdersPoForm);
Vue.component('customerMekmarOrdersPoProductsForm',customerMekmarOrdersPoProductsForm);
Vue.component('customerOfferList',customerOfferList);
Vue.component('customerOfferForm',customerOfferForm);
Vue.component('customerBgpList',customerBgpList);
Vue.component('customerBgpForm',customerBgpForm);
Vue.component('customerFairList',customerFairList);
Vue.component('customerFairForm', customerFairForm);
Vue.component('customerSelectionList', customerSelectionList);
Vue.component('customerSelectionForm', customerSelectionForm);
Vue.component('reportsMekmerProductionList', reportsMekmerProductionList);
Vue.component('reportsMekmerStockList', reportsMekmerStockList);
Vue.component('reportsMekmerStockForm', reportsMekmerStockForm);
Vue.component('reportsMekmerMineList', reportsMekmerMineList);
Vue.component('reportsMekmerAtlantaList', reportsMekmerAtlantaList);
Vue.component('reportsMekmarAyoList', reportsMekmarAyoList);
Vue.component('reportsMekmarLoadingList', reportsMekmarLoadingList);
Vue.component('reportsMekmarForwardingList', reportsMekmarForwardingList);
Vue.component('reportsMekmarSummaryList', reportsMekmarSummaryList);
Vue.component('reportsMekmarSummaryDetailList', reportsMekmarSummaryDetailList);
Vue.component('reportsMekmarMkYearByPoOrdersList', reportsMekmarMkYearByPoOrdersList);
Vue.component('reportsMekmarMkYearByMarketingOrdersList', reportsMekmarMkYearByMarketingOrdersList);
Vue.component('reportsMekmarMkYearByMarketingForwardingList', reportsMekmarMkYearByMarketingForwardingList);
Vue.component('reportsMekmarMkByCustomerList', reportsMekmarMkByCustomerList);
Vue.component('reportsMekmarGuContList', reportsMekmarGuContList);
Vue.component('reportsMekmarGuMekusList', reportsMekmarGuMekusList);
Vue.component('reportsMekmarGuLogsList', reportsMekmarGuLogsList);
Vue.component('reportsMekmarGuForwardingList', reportsMekmarGuForwardingList);
Vue.component('sampleList', sampleList);
Vue.component('sampleForm', sampleForm);
Vue.component('sampleFinanceList', sampleFinanceList);
Vue.component('sampleFinanceForm', sampleFinanceForm);
Vue.component('offerList', offerList);
Vue.component('offerDetail', offerDetail);
Vue.component('offerForm', offerForm);
Vue.component('panelPublishedList', panelPublishedList);
Vue.component('panelProductForm', panelProductForm);
Vue.component('panelProjectList', panelProjectList);
Vue.component('panelProjectForm', panelProjectForm);
Vue.component('panelUsersList', panelUsersList);
Vue.component('panelUsersForm', panelUsersForm);
Vue.component('panelUsaStockList', panelUsaStockList);
Vue.component('panelUsaStockForm', panelUsaStockForm);
Vue.component('todoByUsernameList', todoByUsernameList);
Vue.component('todoByUsernameForm', todoByUsernameForm);
Vue.component('financeList', financeList);
Vue.component('financeCollectionList', financeCollectionList);
Vue.component('financeAdvancedPaymentForm', financeAdvancedPaymentForm);
Vue.component('financePoList', financePoList);
Vue.component('financePoForm', financePoForm);
Vue.component('FinancePaidList', FinancePaidList);
Vue.component('orderList', orderList);
Vue.component('orderDetailForm', orderDetailForm);
Vue.component('orderDetailOrderForm', orderDetailOrderForm);
Vue.component('orderDetailProformaForm', orderDetailProformaForm);
Vue.component('orderDetailCostForm', orderDetailCostForm);
Vue.component('orderDetailSupplierForm', orderDetailSupplierForm);
Vue.component('orderDetailDocumentForm', orderDetailDocumentForm);
Vue.component('orderDetailCheckForm', orderDetailCheckForm);
Vue.component('orderDetailWorkermanForm', orderDetailWorkermanForm);
Vue.component('salesConsiderForm', salesConsiderForm);
Vue.component('salesConsiderList', salesConsiderList);
Vue.component('todoMainList', todoMainList);



/*Maz Ui */
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

Vue.component('vue-phone-number-input', VuePhoneNumberInput);

/*Components Template */
Vue.component('JsonExcel',JsonExcel);


/*Prime Vue Components */
import Button from 'primevue/button';
import Chart from 'primevue/chart';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Textarea from 'primevue/textarea';
import AutoComplete from 'primevue/autocomplete';
import RadioButton from 'primevue/radiobutton';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import FileUpload from 'primevue/fileupload';
import InputNumber from 'primevue/inputnumber';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Card from 'primevue/card';
import PickList from 'primevue/picklist';
import OverlayPanel from 'primevue/overlaypanel';
import Sidebar from 'primevue/sidebar';
import Chips from 'primevue/chips';



Vue.component('Button', Button);
Vue.component('Chart', Chart);
Vue.component('Dialog', Dialog);
Vue.component('DataTable', DataTable);
Vue.component('Column', Column);
Vue.component('ColumnGroup', ColumnGroup);
Vue.component('Row', Row);
Vue.component('InputText', InputText);
Vue.component('Calendar', Calendar);
Vue.component('Textarea', Textarea);
Vue.component('AutoComplete', AutoComplete);
Vue.component('RadioButton', RadioButton);
Vue.component('Dropdown', Dropdown);
Vue.component('Checkbox', Checkbox);
Vue.component('FileUpload', FileUpload);
Vue.component('InputNumber', InputNumber);
Vue.component('TabView', TabView);
Vue.component('TabPanel', TabPanel);
Vue.component('Card', Card);
Vue.component('PickList', PickList);
Vue.component('OverlayPanel', OverlayPanel);
Vue.component('Sidebar', Sidebar);
Vue.component('Chips', Chips);




/*Custome Input */
import CustomInput from '../components/shared/customeInput/custominput.vue';
Vue.component('CustomInput', CustomInput)





/*Filters */
Vue.filter('formatPriceUsd',(value)=>{
    if(value == null || value == undefined){
        return '$0.00';
    }else{
        const val = (value / 1).toFixed(2).replace(".", ",");
        return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

});

Vue.filter('formatPriceEuro',(value)=>{
    if(value == null || value == undefined){
        return '€0.00';
    }else{
        const val = (value / 1).toFixed(2).replace(".", ",");
        return "€" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

});
Vue.filter('formatPriceTl',(value)=>{
    if(value == null || value == undefined){
        return '₺0.00';
    }else{
        const val = (value / 1).toFixed(2).replace(".", ",");
        return "₺" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

});

Vue.filter('formatDecimal', (value) => {
    if (value == 'null' || value == null || value == ' ') {
        return 0.00;
    } else {
        const val = (value / 1).toFixed(2).replace('.',',');
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

});
Vue.filter('formatPriceTl',(value)=>{
    const val = (value / 1).toFixed(2).replace(".", ",");
    return "₺" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
});
Vue.filter('formatPriceEuro',(value)=>{
    const val = (value / 1).toFixed(2).replace(".", ",");
    return "€" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
});

Vue.filter('formatDecimal2', (value) => {
    if (value == 'null' || value == null || value == ' ') {
        return 0.00;
    } else {
        const val = (value / 1).toFixed(2).replace('.',',');
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

});



Vue.filter('dateToString', (value) => {
    if(value == null || value == NaN-NaN-NaN || value == 'NaN-NaN-NaN' || value == undefined || value == ""){
        return "";
    } else{
        let date = new Date(value);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month.toString().length == 1) {
            month = '0' + month;
        };
        if (day.toString().length == 1) {
            day = '0' + day;
        }

        return day + "-" + month + "-" + year;
    }

});
Vue.filter('stringToDate', (value) => {
    if (value == null || value == NaN-NaN-NaN || value == 'NaN-NaN-NaN' || value == undefined || value == "") {
        return "";
    } else {
          const date = value.split('-');
    const day = date[2];
    const month = date[1];
    const year = date[0];
    return new Date(year,month,day);  
    }

});

Vue.filter('monthToString', (value) => {
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    return months[value - 1];
});

Vue.filter('dateToTime',(value)=>{
    if(value == null || value == NaN-NaN-NaN || value == 'NaN-NaN-NaN' || value == undefined || value == ""){
        return "";
    } else{
        let date = new Date(value);
        let seconds = date.getSeconds();
        let minutes = date.getMinutes();
        let hours = date.getHours();


        return hours + ":" + minutes + ":" + seconds;
    }

});




