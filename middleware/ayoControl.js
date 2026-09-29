const AYO_USER_IDS = [13, 19, 47, 51, 57, 58, 59];

export default function (context) {
  let userId = null;

  if (context.req) {
    const cookieStr = context.req.headers.cookie;
    if (cookieStr) {
      const found = cookieStr
        .split(";")
        .find((x) => x.trim().startsWith("userId="));
      if (found) userId = found.split("=")[1];
    }
  } else {
    userId = context.$cookie.get("userId");
  }

  context.store.dispatch(
    "setAyoControlStatus",
    AYO_USER_IDS.includes(parseInt(userId, 10))
  );
}
