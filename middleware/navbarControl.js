export default function (context) {
  let userId = null;

  // 1. Aşama: Ortama göre userId'yi güvenli bir şekilde al
  if (context.req) {
    // Sunucu Tarafı (SSR)
    const cookieStr = context.req.headers.cookie;

    // Çerez varsa işlem yap, yoksa userId null kalır
    if (cookieStr) {
      const foundCookie = cookieStr
        .split(";")
        .find((x) => x.trim().startsWith("userId="));
      if (foundCookie) {
        userId = foundCookie.split("=")[1];
      }
    }
  } else {
    // İstemci Tarafı (Client)
    userId = context.$cookie.get("userId");
  }

  // 2. Aşama: Alınan userId değerine göre Navbar'ı aç veya kapat
  if (userId == 48 || userId == 54 || userId == 56) {
    context.store.dispatch("setAuthorityNavbarStatus", true);
  } else {
    context.store.dispatch("setAuthorityNavbarStatus", false);
  }
}
