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
    const code = parseInt(error.response && error.response.status);
    if (code === 401 || code === 403) {
      console.warn("Yetkisiz işlem veya token süresi doldu!");
    }
  });
}
