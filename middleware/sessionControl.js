export default function (context) {
    console.log(process.client)
    if(!process.client){
        context.store.dispatch('sessionControl',context.req);
    } else {
        context.store.dispatch('sessionControl');
    }
}