import https from "https";
import axios from "axios";

export default function (context, inject) {
  const agent = new https.Agent({
    rejectUnauthorized: false, //
  });

  const excelApi = axios.create({
    // baseURL: "https://excel-server-mark0002.mekmar.com",
    baseURL: "http://localhost:5000",
    httpsAgent: agent,
    headers: {
      "Content-Type": "application/json",
    },
  });

  inject("excelApi", excelApi);
}
