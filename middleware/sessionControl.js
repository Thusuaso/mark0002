export default function (context) {

    if(!process.client){
        context.store.dispatch('sessionControl',context.req);
    } else {
        context.store.dispatch('sessionControl');
    };
}