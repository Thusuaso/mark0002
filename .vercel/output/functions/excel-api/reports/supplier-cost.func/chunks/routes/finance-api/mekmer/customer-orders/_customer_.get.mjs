import { d as defineEventHandler, z as getRouterParam, c as createError, A as dbAll, D as dbQuery, E as sqlDate, F as sqlDateTr } from '../../../../_/nitro.mjs';
import 'node:https';
import 'node:crypto';
import 'node:module';
import 'node:http';
import 'node:events';
import 'node:buffer';
import '@primevue/core/base/style';
import '@primevue/core/basecomponent/style';
import '@primeuix/styles/autocomplete';
import '@primeuix/utils/object';
import '@primeuix/styles/cascadeselect';
import '@primeuix/styles/checkbox';
import '@primeuix/styles/checkboxgroup';
import '@primeuix/styles/colorpicker';
import '@primeuix/styles/datepicker';
import '@primeuix/styles/floatlabel';
import '@primeuix/styles/iconfield';
import '@primeuix/styles/iftalabel';
import '@primeuix/styles/inputchips';
import '@primeuix/styles/inputgroup';
import '@primeuix/styles/inputnumber';
import '@primeuix/styles/inputotp';
import '@primeuix/styles/inputtext';
import '@primeuix/styles/knob';
import '@primeuix/styles/listbox';
import '@primeuix/styles/multiselect';
import '@primeuix/styles/password';
import '@primeuix/styles/radiobutton';
import '@primeuix/styles/radiobuttongroup';
import '@primeuix/styles/rating';
import '@primeuix/styles/select';
import '@primeuix/styles/selectbutton';
import '@primeuix/styles/slider';
import '@primeuix/styles/textarea';
import '@primeuix/styles/togglebutton';
import '@primeuix/styles/toggleswitch';
import '@primeuix/styles/treeselect';
import '@primeuix/styles/button';
import '@primeuix/styles/buttongroup';
import '@primeuix/styles/speeddial';
import '@primeuix/styles/splitbutton';
import '@primeuix/styles/datatable';
import '@primeuix/styles/dataview';
import '@primeuix/styles/orderlist';
import '@primeuix/styles/organizationchart';
import '@primeuix/styles/paginator';
import '@primeuix/styles/picklist';
import '@primeuix/styles/tree';
import '@primeuix/styles/treetable';
import '@primeuix/styles/timeline';
import '@primeuix/styles/virtualscroller';
import '@primeuix/styles/accordion';
import '@primeuix/styles/card';
import '@primeuix/styles/divider';
import '@primeuix/styles/fieldset';
import '@primeuix/styles/panel';
import '@primeuix/styles/scrollpanel';
import '@primeuix/styles/splitter';
import '@primeuix/styles/stepper';
import '@primeuix/styles/tabview';
import '@primeuix/styles/tabs';
import '@primeuix/styles/toolbar';
import '@primeuix/styles/confirmdialog';
import '@primeuix/styles/confirmpopup';
import '@primeuix/styles/dialog';
import '@primeuix/styles/drawer';
import '@primeuix/styles/popover';
import '@primeuix/styles/fileupload';
import '@primeuix/styles/breadcrumb';
import '@primeuix/styles/contextmenu';
import '@primeuix/styles/dock';
import '@primeuix/styles/menu';
import '@primeuix/styles/menubar';
import '@primeuix/styles/megamenu';
import '@primeuix/styles/panelmenu';
import '@primeuix/styles/steps';
import '@primeuix/styles/tabmenu';
import '@primeuix/styles/tieredmenu';
import '@primeuix/styles/message';
import '@primeuix/styles/inlinemessage';
import '@primeuix/styles/toast';
import '@primeuix/styles/carousel';
import '@primeuix/styles/galleria';
import '@primeuix/styles/image';
import '@primeuix/styles/imagecompare';
import '@primeuix/styles/avatar';
import '@primeuix/styles/badge';
import '@primeuix/styles/blockui';
import '@primeuix/styles/chip';
import '@primeuix/styles/inplace';
import '@primeuix/styles/metergroup';
import '@primeuix/styles/overlaybadge';
import '@primeuix/styles/scrolltop';
import '@primeuix/styles/skeleton';
import '@primeuix/styles/progressbar';
import '@primeuix/styles/progressspinner';
import '@primeuix/styles/tag';
import '@primeuix/styles/terminal';
import '@primevue/forms/form/style';
import '@primevue/forms/formfield/style';
import '@primeuix/styles/tooltip';
import '@primeuix/styles/ripple';
import '@primeuix/styled';
import 'socket.io';
import 'jsonwebtoken';
import 'mssql';
import 'aws-sdk';
import 'body-parser';
import 'express';
import 'nodemailer';
import 'axios';
import 'xml2js';
import 'crypto';
import 'cookie-parser';
import 'node:fs';
import 'node:path';

function noneControl(value) {
  if (value === null || value === void 0) return 0;
  if (value === "" || value === "undefined" || value === "null") return 0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}
function floatControlDecimal(value) {
  return value >= -8 && value <= 8 ? 0 : value;
}
const SELECT = `
select
  s.ID,
  s.SiparisNo,
  s.YuklemeTarihi,
  s.Vade,
  s.TahminiEtaTarihi,
  m.FirmaAdi,
  s.MusteriID,
  s.NavlunSatis,
  s.DetayTutar_1,
  s.DetayTutar_2,
  s.DetayTutar_3,
  s.sigorta_tutar_satis,
  s.Pesinat,
  (select sum(o.Tutar) from Odemeler_MekmerTB o
     where o.SiparisNo = s.SiparisNo and s.MusteriID = m.ID) as Odeme,
  (select sum(u.AlisFiyati * u.Miktar) from SiparisUrunTB u
     where u.SiparisNo = s.SiparisNo and u.TedarikciID in (1,123,1407)) as UrunBedeli,
  (select sum(seg.Tutar) from SiparisEkstraGiderlerTB seg
     where seg.SiparisNo = s.SiparisNo and seg.TedarikciID in (1,123,1407)
       and YEAR(seg.Tarih) >= YEAR(GETDATE())) as Iscilik
from SiparislerTB s, MusterilerTB m
where s.MusteriID = m.ID
  and m.ID = @customer
`;
const SQL_URETILENLER = `${SELECT} and s.SiparisDurumID in (1,2)`;
const SQL_YUKLENENLER = `${SELECT} and s.SiparisDurumID = 3 order by s.YuklemeTarihi desc`;
function base(item) {
  var _a, _b;
  return {
    id: item.ID,
    musteriadi: (_a = item.FirmaAdi) != null ? _a : "",
    musteri_id: item.MusteriID,
    siparisno: (_b = item.SiparisNo) != null ? _b : "",
    yuklemetarihi: sqlDate(item.YuklemeTarihi),
    vade: sqlDateTr(item.Vade)
  };
}
function mapYukleme(item) {
  var _a, _b;
  const urunBedeli = (_a = item.UrunBedeli) != null ? _a : 0;
  const odeme = (_b = item.Odeme) != null ? _b : 0;
  const iscilik = noneControl(item.Iscilik);
  const toplam = urunBedeli + iscilik + noneControl(item.NavlunSatis) + noneControl(item.DetayTutar_1) + noneControl(item.DetayTutar_2) + noneControl(item.DetayTutar_3);
  return {
    ...base(item),
    tip: "Y\xFCkleme",
    /* Python: model.pesinat = item.Pesinat -- null KONTROLU YOK, yani
     * null oldugu gibi gidiyor (Üretim listesinde 0'a cevriliyor). */
    pesinat: item.Pesinat,
    tahmini_eta: sqlDate(item.TahminiEtaTarihi),
    toplam,
    siparis_total: toplam,
    kalan: floatControlDecimal(toplam - odeme),
    kalan2: toplam - odeme,
    odenen_tutar: odeme,
    iscilik
  };
}
function mapUretim(item) {
  var _a, _b, _c;
  const urunBedeli = (_a = item.UrunBedeli) != null ? _a : 0;
  const odeme = (_b = item.Odeme) != null ? _b : 0;
  const iscilik = noneControl(item.Iscilik);
  return {
    ...base(item),
    tip: "\xDCretim",
    pesinat: (_c = item.Pesinat) != null ? _c : 0,
    /* Yükleme listesinde "YYYY-MM-DD", burada "DD-MM-YYYY" -- tutarsiz
     * ama Python'daki hali bu. */
    tahmini_eta: sqlDateTr(item.TahminiEtaTarihi),
    /* siparis_total SADECE urun bedeli; toplam iscilikle birlikte. */
    siparis_total: urunBedeli,
    toplam: urunBedeli + iscilik,
    /* kalan -8..8 SUZGECINDEN GECMIYOR (Yükleme'de geciyor),
     * kalan2 odemeyi DUSMUYOR (Yükleme'de dusuyor). */
    kalan: urunBedeli + iscilik - odeme,
    kalan2: urunBedeli,
    odenen_tutar: odeme,
    iscilik
  };
}
const SQL_ODEME = `
select
  o.Tarih,
  sum(o.Tutar) as Tutar
from Odemeler_MekmerTB o
where o.MusteriID = @customer
  and o.SiparisNo in (
    select s.SiparisNo from SiparislerTB s
    where s.SiparisNo = o.SiparisNo and s.MusteriID = @customer
  )
group by o.Tarih
order by o.Tarih desc
`;
const _customer__get = defineEventHandler(async (event) => {
  const customer = Number(getRouterParam(event, "customer"));
  if (!Number.isInteger(customer) || customer <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: `Gecersiz musteri id: ${getRouterParam(event, "customer")}`
    });
  }
  const [uretilenler, yuklenenler, odemeler] = await dbAll([
    dbQuery(SQL_URETILENLER, { customer }),
    dbQuery(SQL_YUKLENENLER, { customer }),
    dbQuery(SQL_ODEME, { customer })
  ]);
  const ayrinti_list = [
    ...uretilenler.map(mapUretim),
    ...yuklenenler.map(mapYukleme)
  ];
  const odeme_liste = odemeler.map((item, i) => ({
    id: i + 1,
    tarih: sqlDate(item.Tarih),
    tutar: item.Tutar
  }));
  return { ayrinti_list, odeme_liste };
});

export { _customer__get as default };
//# sourceMappingURL=_customer_.get.mjs.map
