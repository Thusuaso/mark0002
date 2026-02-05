import https from "https";
import axios from "axios";

export default function (context, inject) {
  // --- KRİTİK SSL AYARI ---
  // Python sunucusunun (excel-server-mark0002) sertifikasını
  // Node.js tarafında kabul ettirmek için:
  const agent = new https.Agent({
    rejectUnauthorized: false, // Sertifika hatasını görmezden gel
  });

  // Python Sunucusu İçin Özel Axios Oluşturuyoruz
  const excelApi = axios.create({
    baseURL: "https://excel-server-mark0002.mekmar.com",
    httpsAgent: agent, // Agent'ı buraya ekledik (SSR Hatasını çözer)
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Client tarafında (Tarayıcıda) çalışırken CORS hatası almamak için
  // Tarayıcı otomatik olarak httpsAgent'ı yok sayar, bu normaldir.

  // Plugin'i sisteme enjekte et: this.$excelApi olarak kullanılabilir
  inject("excelApi", excelApi);
}
