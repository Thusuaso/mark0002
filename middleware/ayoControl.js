export default function (context) {
  if (context.req) {
    let cookie = context.req.headers.cookie;
    let userId = cookie.split(";").find((x) => x.trim().startsWith("userId="));
    if (userId) userId = userId.split("=")[1];
    if (userId == 10 || userId == 47 || userId == 13 || userId == 19) {
      context.store.dispatch("setAyoControlStatus", true);
    } else {
      context.store.dispatch("setAyoControlStatus", false);
    }
  } else {
    if (
      context.$cookie.get("userId") == 10 ||
      context.$cookie.get("userId") == 47 ||
      context.$cookie.get("userId") == 13
    ) {
      context.store.dispatch("setAyoControlStatus", true);
    } else {
      context.store.dispatch("setAyoControlStatus", false);
    }
  }
}
