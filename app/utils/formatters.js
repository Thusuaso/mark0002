/*
 * plugins/components.js icindeki Vue.filter tanimlarindan cikarildi.
 * DAVRANIS BIREBIR KORUNDU -- bu dosya mekanik bir tasima, iyilestirme degil.
 *
 * NOT (duzeltilmedi, bilerek): formatPriceTl ve formatPriceEuro
 * components.js'te IKI KEZ tanimliydi. Vue.filter ikinci tanimi gecerli
 * sayar, yani uygulamada BUGUN calisan surum null kontrolu OLMAYAN surum.
 * Asagidaki tanimlar o calisan surumu yansitiyor (undefined -> "₺NaN").
 * Duzeltmek ayri bir karar; codemod davranis degistirmemeli.
 */

const group = (val) => val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export function formatPriceUsd(value) {
  if (value == null || value == undefined) {
    return "$0.00";
  }
  const val = (value / 1).toFixed(2).replace(".", ",");
  return "$" + group(val);
}

// ikinci (gecerli) tanim: null kontrolu yok
export function formatPriceEuro(value) {
  const val = (value / 1).toFixed(2).replace(".", ",");
  return "€" + group(val);
}

// ikinci (gecerli) tanim: null kontrolu yok
export function formatPriceTl(value) {
  const val = (value / 1).toFixed(2).replace(".", ",");
  return "₺" + group(val);
}

export function formatDecimal(value) {
  if (
    value == "null" ||
    value == null ||
    value == " " ||
    value == undefined ||
    value == NaN ||
    value == "NaN"
  ) {
    return 0.0;
  }
  const val = (value / 1).toFixed(2).replace(".", ",");
  return group(val);
}

export function formatDecimal2(value) {
  if (value == "null" || value == null || value == " ") {
    return 0.0;
  }
  const val = (value / 1).toFixed(2).replace(".", ",");
  return group(val);
}

export function dateToString(value) {
  if (
    value == null ||
    value == NaN - NaN - NaN ||
    value == "NaN-NaN-NaN" ||
    value == undefined ||
    value == ""
  ) {
    return "";
  }
  const date = new Date(value);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  if (month.toString().length == 1) month = "0" + month;
  if (day.toString().length == 1) day = "0" + day;
  return day + "-" + month + "-" + year;
}

export function stringToDate(value) {
  if (
    value == null ||
    value == NaN - NaN - NaN ||
    value == "NaN-NaN-NaN" ||
    value == undefined ||
    value == ""
  ) {
    return "";
  }
  const date = value.split("-");
  return new Date(date[0], date[1], date[2]);
}

export function monthToString(value) {
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  return months[value - 1];
}

export function dateToTime(value) {
  if (
    value == null ||
    value == NaN - NaN - NaN ||
    value == "NaN-NaN-NaN" ||
    value == undefined ||
    value == ""
  ) {
    return "";
  }
  const date = new Date(value);
  return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

export const formatters = {
  formatPriceUsd,
  formatPriceEuro,
  formatPriceTl,
  formatDecimal,
  formatDecimal2,
  dateToString,
  stringToDate,
  monthToString,
  dateToTime,
};
