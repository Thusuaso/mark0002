const API_BASE = "/api";

function getToken() {
  if (typeof document === "undefined") return null;
  const found = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("token="));
  return found ? found.split("=")[1] : null;
}

function extOf(name) {
  const parts = String(name || "").split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
}

async function postJson(path, payload) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(API_BASE + path, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("Spaces API hatasi:", res.status);
    return null;
  }
  return res.json();
}

async function uploadTo(prefix, file, contentType) {
  try {
    const type = contentType || file.type || "application/octet-stream";
    const key = prefix + file.name;
    const cacheControl = "public,max-age=1,s-max-age=500,must-revalidate";

    const signed = await postJson("/spaces/sign-upload", {
      key,
      contentType: type,
    });
    if (!signed || !signed.status || !signed.url) return false;

    // Bu basliklar imzaya dahil — birebir ayni gonderilmeli, yoksa 403 gelir.
    const put = await fetch(signed.url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": type,
        "x-amz-acl": "public-read",
        "Cache-Control": cacheControl,
      },
    });

    return put.ok;
  } catch (err) {
    console.error("Spaces yukleme hatasi:", err.message);
    return false;
  }
}

const oceanservice = {
  panelUsaProductUploadPhoto(file) {
    return uploadTo("usa-products/", file, "image/" + extOf(file.name));
  },

  panelProductSendPhoto(file) {
    return uploadTo("products/", file, "image/" + extOf(file.name));
  },

  async panelProductPhotoDelete(filename) {
    try {
      const r = await postJson("/spaces/delete", {
        key: "products/" + filename,
      });
      return !!(r && r.status);
    } catch (err) {
      console.error("Spaces silme hatasi:", err.message);
      return false;
    }
  },

  panelProductSendTestReport(file) {
    return uploadTo("test-reports/", file);
  },

  panelProjectProductSendPhoto(file) {
    return uploadTo("galleria-project_photos/photos/", file);
  },

  panelProjectSendPhoto(file) {
    return uploadTo("galleria-project_photos/", file);
  },
};

export default oceanservice;
