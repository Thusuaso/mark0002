import axios from "axios";
import xml2js, { parseString } from "xml2js";

const api = axios.create({
  baseURL: "https://www.tcmb.gov.tr/kurlar/",
  /*
   * `"Content-Type": "application/json"` KALDIRILDI -- bu anahtar burada
   * IKI KEZ tanimliydi. Nesne literalinde ikinci tanim geceri sayilir,
   * yani gecerli deger ZATEN asagidaki x-www-form-urlencoded'di; silinen
   * satir olu koddu. Davranis acisindan no-op, ama derleme her seferinde
   *     [esbuild] Duplicate key "Content-Type" in object literal
   * uyarisi basiyordu.
   *
   * Geri kalan basliklara DOKUNULMADI, hepsi anlamsiz olsa da: bunlar
   * govdesi olmayan bir GET istegi (Content-Type yok sayilir), yanit XML
   * oldugu halde Accept json istiyor, ve Access-Control-* basliklari
   * YANITA ait olup istege konulmasi hicbir sey yapmiyor. Hicbiri zarar
   * vermiyor; temizlemek ayri bir is.
   */
  headers: {
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
  mode: "no-cors",
  withCredentials: true,
  credentials: "same-origin",
  crossdomain: true,
});

function xmlToJson(xml) {
  return new Promise(function (resolve, reject) {
    xml2js.Parser().parseString(xml, function (err, res) {
      resolve(res.Tarih_Date.Currency);
    });
  });
}
const currency = {
  getDateCurrency(year, month, day) {
    return new Promise(async (resolve, reject) => {
      if (day.toString().length == 1) {
        day = "0" + day;
      }
      if (month.toString().length == 1) {
        month = "0" + month;
      }
      const link = "/" + year + "" + month + "/" + day + month + year + ".xml";
      await api.get(link).then(async (response) => {
        await xmlToJson(response.data).then(async (data) => {
          await resolve(parseFloat(data[0].BanknoteSelling[0]));
        });
      });
    });
  },
};
export default currency;
