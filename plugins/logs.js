export default (context, inject) => {
  const logs = {
        save(payload){
          context.store.dispatch('setLogs',payload);
        }
    }
  inject('logs', logs)
  context.$logs = logs;
}