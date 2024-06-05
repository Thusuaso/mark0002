export default function(context){
    if(context.req){
        let cookie = context.req.headers.cookie;
        let userId = cookie.split(';').find(x=>x.trim().startsWith('userId='));
        if(userId) userId = userId.split('=')[1];
        if(userId == 48 ){
            context.store.dispatch('setAuthorityNavbarStatus',true);
            if(context.req.url == '/'){
                context.redirect('/mekmer/products/production');

            }
        }else{
            context.store.dispatch('setAuthorityNavbarStatus',false);
        }
    }else{
        if(context.$cookie.get('userId') == 48){
            context.store.dispatch('setAuthorityNavbarStatus',true);


        }else{
            context.store.dispatch('setAuthorityNavbarStatus',false);

        }

    }


}