export default function(context){
    if(!process.isClient){
        context.store.dispatch('sessionControl',context.req);
    } else {
        context.store.dispatch('sessionControl');
    }
}