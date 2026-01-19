export default function (context) {
  if (context.req) {
    let cookie = context.req.headers.cookie;
    let userId = cookie.split(";").find((x) => x.trim().startsWith("userId="));
    if (userId) userId = userId.split("=")[1];
    if (userId == 48 || userId == 54 || userId == 56) {
      context.store.dispatch("setAuthorityErrorMessage");

      context.redirect("/");
    }
  } else {
    if (
      context.$cookie.get("userId") == 48 ||
      context.$cookie.get("userId") == 54 ||
      context.$cookie.get("userId") == 56
    ) {
      context.store.dispatch("setAuthorityErrorMessage");

      context.redirect("/");
    }
  }
}
