/* ==========================================================================
   utils/chatDosya.js - sohbet goruntu eki yardimcilari (yalnizca istemci)
   --------------------------------------------------------------------------
   Buradaki kontroller KOLAYLIK icindir, guvenlik degil: son soz sunucudadir
   (api/index.js /chat/upload-url ve api/server.js dosyaEkiDogrula). Amac
   kullaniciya hatayi yuklemeden once soylemek ve gereksiz trafigi onlemek.
   ========================================================================== */

export const DOSYA_MAX_BAYT = 5 * 1024 * 1024;
export const IZIN_TURLERI = ["image/png", "image/jpeg", "image/webp"];
/* Ekran goruntuleri 2560px veya daha genis gelebiliyor. 1600px sohbet
   penceresinde okunakli kalir, dosyayi birkac kat kuculturur. */
const EN_BUYUK_KENAR = 1600;
/* PNG kayipsizdir, ekran goruntulerinde yazilar net kalsin diye tercih
   edilir; ama fotograf yapistirildiginda PNG cok buyur. Bu esigi gecerse
   JPEG'e cevrilir. */
const PNG_JPEG_ESIGI = 1.5 * 1024 * 1024;
const JPEG_KALITE = 0.9;

export function turIzinli(tur) {
  return IZIN_TURLERI.indexOf(String(tur || "").toLowerCase()) !== -1;
}

export function boyutYazisi(bayt) {
  const n = Number(bayt) || 0;
  if (n < 1024) return n + " B";
  if (n < 1024 * 1024) return Math.round(n / 1024) + " KB";
  return (n / (1024 * 1024)).toFixed(1) + " MB";
}

/* Panoya alinmis goruntuyu paste olayindan cikarir.
   Win+Shift+S (Windows ekran kesme araci) sonrasi Ctrl+V bu yoldan gelir.
   Goruntu yoksa null doner ve yapistirma normal metin olarak isler. */
export function panodanDosya(event) {
  const pano = event && (event.clipboardData || window.clipboardData);
  if (!pano || !pano.items) {
    return null;
  }
  for (const parca of pano.items) {
    if (parca.kind === "file" && String(parca.type || "").startsWith("image/")) {
      const dosya = parca.getAsFile();
      if (dosya) {
        return dosya;
      }
    }
  }
  return null;
}

function gorseliYukle(blob) {
  return new Promise((resolve, reject) => {
    const adres = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(adres);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(adres);
      reject(new Error("Görüntü okunamadı."));
    };
    img.src = adres;
  });
}

function tuvalden(tuval, tur) {
  return new Promise((resolve, reject) => {
    tuval.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Dönüştürülemedi."))),
      tur,
      tur === "image/jpeg" ? JPEG_KALITE : undefined
    );
  });
}

function uzantiyaGore(tur) {
  if (tur === "image/jpeg") return "jpg";
  if (tur === "image/webp") return "webp";
  return "png";
}

/* Gonderime hazir hale getirir: izin verilen ture cevirir, gerekiyorsa
   kucultur. Doner: { blob, tur, ad, genislik, yukseklik }
   Hata durumunda { hata: "..." } doner; cagiran yer toast gosterir. */
export async function resimHazirla(dosya, adOnEki) {
  if (!dosya) {
    return { hata: "Görüntü seçilmedi." };
  }
  let tur = String(dosya.type || "").toLowerCase();
  /* GIF/BMP gibi turler de yapistirilabiliyor; kucultme sirasinda zaten
     PNG'ye cevrilecegi icin reddetmek yerine donusturulur. Animasyon
     kaybolur, bu kabul edilebilir: sohbet eki ekran goruntusu icin. */
  const cevrilecek = !turIzinli(tur);
  if (!String(dosya.type || "").startsWith("image/")) {
    return { hata: "Yalnızca görüntü gönderilebilir." };
  }
  try {
    const img = await gorseliYukle(dosya);
    const oran = Math.min(
      1,
      EN_BUYUK_KENAR / Math.max(img.naturalWidth, img.naturalHeight)
    );
    const kucultulecek = oran < 1;
    const pngBuyuk = tur === "image/png" && dosya.size > PNG_JPEG_ESIGI;

    /* Hicbir sey yapmak gerekmiyorsa dosya oldugu gibi gonderilir:
       yeniden kodlama kalite kaybi ve bosa CPU olurdu. */
    if (!kucultulecek && !cevrilecek && !pngBuyuk) {
      return {
        blob: dosya,
        tur: tur,
        ad: dosya.name || `${adOnEki || "goruntu"}.${uzantiyaGore(tur)}`,
        genislik: img.naturalWidth,
        yukseklik: img.naturalHeight,
      };
    }

    if (cevrilecek || pngBuyuk) {
      tur = pngBuyuk ? "image/jpeg" : "image/png";
    }
    const g = Math.max(1, Math.round(img.naturalWidth * oran));
    const y = Math.max(1, Math.round(img.naturalHeight * oran));
    const tuval = document.createElement("canvas");
    tuval.width = g;
    tuval.height = y;
    const ctx = tuval.getContext("2d");
    /* JPEG'de saydam alanlar siyah cikar; beyaz zemin daha dogru gorunur. */
    if (tur === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, g, y);
    }
    ctx.drawImage(img, 0, 0, g, y);
    const blob = await tuvalden(tuval, tur);
    if (blob.size > DOSYA_MAX_BAYT) {
      return { hata: `Görüntü en fazla ${boyutYazisi(DOSYA_MAX_BAYT)} olabilir.` };
    }
    return {
      blob: blob,
      tur: tur,
      ad: `${adOnEki || "goruntu"}.${uzantiyaGore(tur)}`,
      genislik: g,
      yukseklik: y,
    };
  } catch (err) {
    return { hata: err.message || "Görüntü hazırlanamadı." };
  }
}

/* Ekran paylasimindan tek kare alir (getDisplayMedia).
   Tarayici kendi "ekranini/pencereni paylas" secicisini gosterir; kullanici
   iptal ederse { hata: null } doner, cagiran yer sessizce vazgecer.
   Secici bolge sectirmez, bu yuzden kirpma bizim arayuzumuzde yapilir. */
export async function ekranKaresiAl() {
  const cihazlar = navigator.mediaDevices;
  if (!cihazlar || !cihazlar.getDisplayMedia) {
    return { hata: "Tarayıcınız ekran görüntüsünü desteklemiyor." };
  }
  let akis = null;
  try {
    akis = await cihazlar.getDisplayMedia({
      video: { cursor: "never" },
      audio: false,
    });
    const video = document.createElement("video");
    video.srcObject = akis;
    video.muted = true;
    await video.play();
    /* Ilk kare bos gelebiliyor; bir cizim cercevesi beklenir. */
    await new Promise((r) => requestAnimationFrame(() => r()));
    const g = video.videoWidth;
    const y = video.videoHeight;
    if (!g || !y) {
      return { hata: "Ekran görüntüsü alınamadı." };
    }
    const tuval = document.createElement("canvas");
    tuval.width = g;
    tuval.height = y;
    tuval.getContext("2d").drawImage(video, 0, 0, g, y);
    const blob = await tuvalden(tuval, "image/png");
    return { blob: blob, tur: "image/png", genislik: g, yukseklik: y };
  } catch (err) {
    /* Kullanici "iptal" derse tarayici NotAllowedError atar: hata degil. */
    if (err && (err.name === "NotAllowedError" || err.name === "AbortError")) {
      return { hata: null };
    }
    return { hata: err.message || "Ekran görüntüsü alınamadı." };
  } finally {
    if (akis) {
      akis.getTracks().forEach((t) => t.stop());
    }
  }
}

/* Kirpma sonucu: secilen dikdortgeni yeni bir PNG'ye cevirir.
   alan: { x, y, g, y2 } goruntunun GERCEK olcusunde piksel degerleri. */
export async function resmiKirp(blob, alan) {
  try {
    const img = await gorseliYukle(blob);
    const g = Math.max(1, Math.round(alan.g));
    const y = Math.max(1, Math.round(alan.y2));
    const tuval = document.createElement("canvas");
    tuval.width = g;
    tuval.height = y;
    tuval
      .getContext("2d")
      .drawImage(img, Math.round(alan.x), Math.round(alan.y), g, y, 0, 0, g, y);
    const yeni = await tuvalden(tuval, "image/png");
    return { blob: yeni, tur: "image/png", genislik: g, yukseklik: y };
  } catch (err) {
    return { hata: err.message || "Kırpılamadı." };
  }
}
