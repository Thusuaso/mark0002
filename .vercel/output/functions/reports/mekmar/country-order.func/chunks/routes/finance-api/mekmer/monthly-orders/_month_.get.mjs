import { d as defineEventHandler, z as getRouterParam, c as createError, D as dbQuery, E as sqlDate } from '../../../../_/nitro.mjs';
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
const SQL = `
select
  (select sum(su.AlisFiyati * su.Miktar) from SiparisUrunTB su
     where su.SiparisNo = s.SiparisNo and su.TedarikciID in (1,123)) as UrunBedeli,
  m.FirmaAdi,
  s.SiparisNo,
  (select sum(om.Tutar) from Odemeler_MekmerTB om
     where om.SiparisNo = s.SiparisNo) as Odeme,
  (select sum(seg.Tutar) from SiparisEkstraGiderlerTB seg
     where seg.SiparisNo = s.SiparisNo and seg.TedarikciID in (1,123)) as Iscilik,
  s.SiparisTarihi,
  s.YuklemeTarihi,
  m.ID as MusteriID
from SiparislerTB s
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisUrunTB sipu on sipu.SiparisNo = s.SiparisNo
where m.Marketing = 'Mekmar'
  and YEAR(s.YuklemeTarihi) = YEAR(GETDATE())
  and MONTH(s.YuklemeTarihi) = @month
  and sipu.TedarikciID in (1,123)
group by s.SiparisNo, m.FirmaAdi, s.SiparisTarihi, s.YuklemeTarihi, m.ID
order by s.YuklemeTarihi desc
`;
const _month__get = defineEventHandler(async (event) => {
  const month = Number(getRouterParam(event, "month"));
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw createError({
      statusCode: 400,
      statusMessage: `Gecersiz ay: ${getRouterParam(event, "month")}`
    });
  }
  const rows = await dbQuery(SQL, { month });
  const list = rows.map((item) => {
    var _a, _b, _c, _d;
    const urunBedeli = (_a = item.UrunBedeli) != null ? _a : 0;
    const odeme = (_b = item.Odeme) != null ? _b : 0;
    const iscilik = noneControl(item.Iscilik);
    const toplam = urunBedeli + iscilik;
    return {
      musteriadi: (_c = item.FirmaAdi) != null ? _c : "",
      musteri_id: item.MusteriID,
      siparisno: (_d = item.SiparisNo) != null ? _d : "",
      yuklemetarihi: sqlDate(item.YuklemeTarihi),
      toplam,
      /* Python'da ikisi AYNI deger; ayri alan olarak duruyor cunku
       * kardes uc (customer-orders) ayni semayi kullaniyor ve orada
       * farklilasiyor. */
      siparis_total: toplam,
      /* kalan -8..8 suzgecinden gecer, kalan2 GECMEZ -- Python'da da oyle. */
      kalan: floatControlDecimal(toplam - odeme),
      kalan2: toplam - odeme,
      odenen_tutar: odeme,
      iscilik
    };
  });
  return { list };
});

export { _month__get as default };
//# sourceMappingURL=_month_.get.mjs.map
