export default function ({ route, req, app, redirect }) {
  if (route.path.startsWith("/auth")) {
    return;
  }

  let token = null;

  if (req) {
    const cookieStr = req.headers.cookie;
    if (cookieStr) {
      const found = cookieStr
        .split(";")
        .find((x) => x.trim().startsWith("token="));
      if (found) token = found.split("=")[1];
    }
  } else {
    if (typeof document !== "undefined") {
      const found = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
      if (found) token = found.split("=")[1];
    }
  }

  if (!token) {
    return redirect("/auth");
  }

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    let payloadString = "";

    if (typeof window === "undefined") {
      payloadString = Buffer.from(base64, "base64").toString("utf-8");
    } else {
      payloadString = window.atob(base64);
    }

    const decodedToken = JSON.parse(payloadString);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      console.log("Token süresi dolmuş, /auth sayfasına yönlendiriliyor...");
      return redirect("/auth");
    }
  } catch (error) {
    return redirect("/auth");
  }
}
