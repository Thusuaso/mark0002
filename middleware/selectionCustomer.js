export default function(context){
    if(context.req){
        let cookie = context.req.headers.cookie;
        let userId = cookie.split(';').find(x=>x.trim().startsWith('userId='));
        if(userId) userId = userId.split('=')[1];
        context.store.dispatch('setSelectionCustomerList',userId);
    }else{
        context.store.dispatch('setSelectionCustomerList',context.$cookie.get('userId'));


    }


}