// plugins/tcmb-service.js

export default ({ $axios }, inject) => {
  const formatDateForUrl = (dateObj) => {
    const d = new Date(dateObj);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return {
      full: `${day}${month}${year}`,
      yearMonth: `${year}${month}`,
      obj: d,
    };
  };

  const parseXMLandGetUSD = (xmlString) => {
    // HTML kontrolü
    if (
      typeof xmlString === "string" &&
      xmlString.trim().startsWith("<!DOCTYPE html>")
    )
      return null;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    if (xmlDoc.querySelector("parsererror")) return null;

    const currencies = Array.from(xmlDoc.getElementsByTagName("Currency"));
    const usdData = currencies.find((el) => el.getAttribute("Kod") === "USD");

    return usdData
      ? usdData.getElementsByTagName("ForexSelling")[0].textContent
      : null;
  };

  const fetchRate = async (targetDate, maxRetry = 10) => {
    if (maxRetry === 0) return Promise.reject("Kur bulunamadı.");

    const { full, yearMonth, obj } = formatDateForUrl(targetDate);

    // Bugün kontrolü
    const now = new Date();
    const isToday =
      obj.getDate() === now.getDate() &&
      obj.getMonth() === now.getMonth() &&
      obj.getFullYear() === now.getFullYear();

    let url;
    if (isToday) {
      url = `/tcmb-api/kurlar/today.xml`;
    } else {
      url = `/tcmb-api/kurlar/${yearMonth}/${full}.xml`;
    }

    try {
      // --- İŞTE ÇÖZÜM BURADA ---
      const response = await $axios.get(url, {
        baseURL: "/", // <--- BU SATIR EKLENMELİ! (Global /api prefixini iptal eder)
        responseType: "text",
        validateStatus: () => true,
      });

      if (response.status === 200) {
        const rate = parseXMLandGetUSD(response.data);
        const formattedDate = `${full.slice(0, 2)}-${full.slice(
          2,
          4
        )}-${full.slice(4)}`;
        if (rate) {
          return { date: formattedDate, rate: rate };
        }
      }

      // Veri yoksa geri git
      const prevDate = new Date(obj);
      prevDate.setDate(prevDate.getDate() - 1);
      return fetchRate(prevDate, maxRetry - 1);
    } catch (error) {
      const prevDate = new Date(obj);
      prevDate.setDate(prevDate.getDate() - 1);
      return fetchRate(prevDate, maxRetry - 1);
    }
  };

  inject("tcmb", { getUSDRate: fetchRate });
};
