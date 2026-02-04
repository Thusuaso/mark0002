import axios from "axios";
import https from "https"; // <-- 1. YENİ: Https modülünü çağır

export default function (context, inject) {
  // 2. YENİ: SSL hatalarını yok sayan bir ajan (agent) oluştur
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const api = axios.create({
    baseURL: "https://excel-server-mark0002.mekmar.com",
    // 3. YENİ: Oluşturduğumuz ajanı buraya ekle
    httpsAgent: agent,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });

  inject("excelApi", api);
}
