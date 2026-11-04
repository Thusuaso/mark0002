// plugins/axios.js
export default function ({ $axios, app }) {
  $axios.onRequest((config) => {
    let token = null;

    if (process.server && app.context.req.headers.cookie) {
      const found = app.context.req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("token="));
      if (found) token = found.split("=")[1];
    } else if (process.client) {
      const found = document.cookie
        .split(";")
        .find((c) => c.trim().startsWith("token="));
      if (found) token = found.split("=")[1];
    }

    if (token) {
      config.headers.common["Authorization"] = `Bearer ${token}`;
    }
  });

  $axios.onError((error) => {
    /* Store eylemlerinin neredeyse hicbirinde .catch yok; istek hata ile
       dondugunde setEndLoadingAction calismiyor ve tam ekran (100vw/100vh,
       z-index 99) yukleme ortusu acik kalip butun ekrani tikliyordu.
       Burada her hatada ortuyu kapatiyoruz. */
    if (process.client && app.store) {
      app.store.dispatch("setEndLoadingAction");
      app.store.dispatch("setEndLoadingDatatableAction");
    }

    const code = parseInt(error.response && error.response.status);
    if (code === 401 || code === 403) {
      console.warn("Yetkisiz işlem veya token süresi doldu!");

      if (process.client && app.$toast) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          "Bu işlem için yetkiniz bulunmamaktadır.";
        app.$toast.error(message);
      }
    }
  });
}
