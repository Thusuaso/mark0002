import { d as defineEventHandler, z as getRouterParam, c as createError, A as dbAll, D as dbQuery, E as sqlDate } from '../../../_/nitro.mjs';
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

function num(value) {
  if (value === null || value === void 0) return 0;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}
const SQL_PO = `
select
  s.SiparisNo,
  m.FirmaAdi,
  sum(su.SatisToplam) as SiparisToplam,
  st.TeslimTur,
  s.SiparisTarihi
from SiparislerTB s
  inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
  inner join MusterilerTB m on m.ID = s.MusteriID
  inner join SiparisTeslimTurTB st on st.ID = s.TeslimTurID
where YEAR(s.SiparisTarihi) = @year and m.Marketing = 'Mekmar'
group by s.SiparisNo, m.FirmaAdi, st.TeslimTur, s.SiparisTarihi
order by sum(su.SatisToplam) desc
`;
const SQL_PO_NAVLUN = `
select
  s.SiparisNo,
  m.FirmaAdi,
  s.NavlunSatis + s.DetayTutar_1 + s.DetayTutar_2 + s.DetayTutar_3 + s.DetayTutar_4 as GelenTotal
from SiparislerTB s
  inner join MusterilerTB m on m.ID = s.MusteriID
where YEAR(s.SiparisTarihi) = @year and m.Marketing = 'Mekmar'
`;
async function byPo(year) {
  const [rows, navlun] = await dbAll([
    dbQuery(SQL_PO, { year }),
    dbQuery(SQL_PO_NAVLUN, { year })
  ]);
  const navlunByPo = /* @__PURE__ */ new Map();
  for (const n of navlun) if (!navlunByPo.has(n.SiparisNo)) navlunByPo.set(n.SiparisNo, n.GelenTotal);
  return rows.map((item) => {
    const fob = num(item.SiparisToplam);
    return {
      po: item.SiparisNo,
      fob,
      ddp: fob + num(navlunByPo.get(item.SiparisNo)),
      teslim: item.TeslimTur,
      firma: item.FirmaAdi,
      /*
       * Python "YYYY-MM-DD" donduruyor (olculdu: "2026-09-30").
       * Ham Date'i JSON'a vermek tam ISO ("2026-09-30T00:00:00.000Z")
       * uretiyordu -- 35 satirda fark cikti, duzeltildi.
       * UTC okuyucu: gerekcesi monthly-orders rotasinda.
       */
      tarih: sqlDate(item.SiparisTarihi)
    };
  });
}
const SQL_CUSTOMER = `
select
  m.ID as MusteriId,
  m.FirmaAdi as MusteriAdi,
  m.Marketing,
  (select yu.UlkeAdi from YeniTeklif_UlkeTB yu where yu.Id = m.UlkeId) as Ulke,
  (select sum(SatisToplam) from SiparislerTB s, SiparisUrunTB u
     where s.SiparisNo = u.SiparisNo and s.SiparisDurumID = 2
       and s.MusteriID = m.ID and YEAR(s.SiparisTarihi) = @year) as FOB,
  (select sum(s.NavlunSatis) + sum(DetayTutar_1) + sum(DetayTutar_2) + sum(DetayTutar_3) + sum(DetayTutar_4)
     from SiparislerTB s
     where s.SiparisDurumID = 2 and s.MusteriID = m.ID and YEAR(s.SiparisTarihi) = @year) as CustPaid
from MusterilerTB m
`;
async function byCustomer(year) {
  const rows = await dbQuery(SQL_CUSTOMER, { year });
  const out = [];
  for (const item of rows) {
    if (item.FOB === null && item.CustPaid === null) continue;
    out.push({
      musteriAdi: item.MusteriAdi,
      /* Python'da HARDCODED: 37 numarali musteri Marketing kolonundan
       * bagimsiz "Imperial Homes" gorunuyor (reports.py:85). */
      marketing: item.MusteriId === 37 ? "Imperial Homes" : item.Marketing,
      ulkeAdi: item.Ulke,
      /* HAM deger -- Python burada __getNoneType KULLANMIYOR, yani
       * FOB null ise null gidiyor (toplamCfr'de ise 0 sayiliyor). */
      toplam: item.FOB,
      toplamCfr: num(item.FOB) + num(item.CustPaid)
    });
  }
  return out;
}
const SQL_MARKETING = `
select
  sum(su.SatisToplam) as Toplam,
  m.Marketing as Marketing
from MusterilerTB m
  inner join SiparislerTB s on s.MusteriID = m.ID
  inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
where s.SiparisDurumID = 2 and YEAR(s.SiparisTarihi) = @year
group by m.Marketing
`;
const SQL_MARKETING_NAVLUN = `
select
  sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) + sum(s.DetayTutar_4) as Navlun,
  m.Marketing as Marketing
from MusterilerTB m
  inner join SiparislerTB s on s.MusteriID = m.ID
where s.SiparisDurumID = 2 and YEAR(s.SiparisTarihi) = @year
group by m.Marketing
`;
async function byMarketing(year) {
  const [rows, navlun] = await dbAll([
    dbQuery(SQL_MARKETING, { year }),
    dbQuery(SQL_MARKETING_NAVLUN, { year })
  ]);
  const navlunByMk = /* @__PURE__ */ new Map();
  for (const n of navlun) if (!navlunByMk.has(n.Marketing)) navlunByMk.set(n.Marketing, n.Navlun);
  return rows.map((item) => {
    const toplam = num(item.Toplam);
    return {
      /*
       * Bu uc byCustomer ile AYNI semayi (MusteriBazindaUretimSchema)
       * kullaniyor ama musteriAdi/ulkeAdi'yi HIC ATAMIYOR; marshmallow
       * onlari model varsayilani "" ile dokuyordu. Olcumde 2+2 alanda
       * fark cikti, eklendi.
       */
      musteriAdi: "",
      ulkeAdi: "",
      marketing: item.Marketing,
      toplam,
      toplamCfr: toplam + num(navlunByMk.get(item.Marketing))
    };
  });
}
const SQL_MK_YUKLEME = `
select
  sum(su.SatisToplam) as Toplam,
  m.Marketing as Marketing
from MusterilerTB m
  inner join SiparislerTB s on s.MusteriID = m.ID
  inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
where YEAR(s.YuklemeTarihi) = @year and s.SiparisDurumID = 3
group by m.Marketing
`;
const SQL_MK_YUKLEME_NAVLUN = `
select
  sum(s.NavlunSatis) as Navlun,
  sum(s.DetayTutar_1) as DetayTutar1,
  sum(s.DetayTutar_2) as DetayTutar2,
  sum(s.DetayTutar_3) as DetayTutar3,
  sum(s.DetayTutar_4) as DetayTutar4,
  m.Marketing as Marketing
from MusterilerTB m
  inner join SiparislerTB s on s.MusteriID = m.ID
where YEAR(s.YuklemeTarihi) = @year and s.SiparisDurumID = 3
group by m.Marketing
`;
async function byMarketingYukleme(year) {
  const [rows, navlun] = await dbAll([
    dbQuery(SQL_MK_YUKLEME, { year }),
    dbQuery(SQL_MK_YUKLEME_NAVLUN, { year })
  ]);
  const navlunByMk = /* @__PURE__ */ new Map();
  for (const n of navlun) {
    if (navlunByMk.has(n.Marketing)) continue;
    navlunByMk.set(n.Marketing, num(n.Navlun) + num(n.DetayTutar1) + num(n.DetayTutar2) + num(n.DetayTutar3) + num(n.DetayTutar4));
  }
  return rows.map((item) => {
    var _a;
    return {
      marketing: item.Marketing,
      /* HAM -- Python da burada donusturmuyor. */
      fobToplam: item.Toplam,
      cfrToplam: num(item.Toplam) + ((_a = navlunByMk.get(item.Marketing)) != null ? _a : 0)
    };
  });
}
const SQL_MK_DETAIL = `
select
  m.ID as MusteriId,
  m.FirmaAdi as MusteriAdi,
  m.Marketing,
  (select yu.UlkeAdi from YeniTeklif_UlkeTB yu where yu.Id = m.UlkeId) as Ulke,
  (select sum(u.SatisToplam) from SiparislerTB s, SiparisUrunTB u
     where s.SiparisNo = u.SiparisNo and s.SiparisDurumID = 3
       and s.MusteriID = m.ID and YEAR(s.YuklemeTarihi) = @year) as Toplam
from MusterilerTB m
`;
const SQL_MK_DETAIL_NAVLUN = `
select
  m.ID as MusteriId,
  (select sum(s.NavlunSatis) from SiparislerTB s
     where s.SiparisDurumID = 3 and s.MusteriID = m.ID and YEAR(s.YuklemeTarihi) = @year) +
  (select sum(s.DetayTutar_1) from SiparislerTB s
     where s.SiparisDurumID = 3 and s.MusteriID = m.ID and YEAR(s.YuklemeTarihi) = @year) +
  (select sum(s.DetayTutar_2) from SiparislerTB s
     where s.SiparisDurumID = 3 and s.MusteriID = m.ID and YEAR(s.YuklemeTarihi) = @year) +
  (select sum(s.DetayTutar_3) from SiparislerTB s
     where s.SiparisDurumID = 3 and s.MusteriID = m.ID and YEAR(s.YuklemeTarihi) = @year) +
  (select sum(s.DetayTutar_4) from SiparislerTB s
     where s.SiparisDurumID = 3 and s.MusteriID = m.ID and YEAR(s.YuklemeTarihi) = @year) as Masraflar
from MusterilerTB m
`;
async function byMarketingDetail(year) {
  var _a;
  const [rows, navlun] = await dbAll([
    dbQuery(SQL_MK_DETAIL, { year }),
    dbQuery(SQL_MK_DETAIL_NAVLUN, { year })
  ]);
  const masrafById = /* @__PURE__ */ new Map();
  for (const n of navlun) if (!masrafById.has(n.MusteriId)) masrafById.set(n.MusteriId, num(n.Masraflar));
  const out = [];
  for (const item of rows) {
    if (item.Toplam === null) continue;
    out.push({
      musteri: item.MusteriAdi,
      marketing: item.Marketing,
      toplamFob: item.Toplam,
      toplamCfr: num(item.Toplam) + ((_a = masrafById.get(item.MusteriId)) != null ? _a : 0)
    });
  }
  return out;
}
const YEAR_FIELDS = [
  ["GecenYil", "GecenYilCiro"],
  ["OncekiYil", "OncekiYilCiro"],
  ["OnDokuzYili", "OndokuzYilCiro"],
  ["OnSekizYili", "OnSekizYilCiro"],
  ["OnYediYili", "OnYediYilCiro"],
  ["OnAltiYili", "OnAltiYilCiro"],
  ["OnBesYili", "OnBesYilCiro"],
  ["OnDortYili", "OnDortYilCiro"],
  ["OnUcYili", "OnUcYilCiro"]
];
const MERGE = [
  { hedef: 3446, kaynaklar: [6, 34] },
  { hedef: 169, kaynaklar: [32] },
  { hedef: 269, kaynaklar: [260, 217, 198, 191] },
  { hedef: 63, kaynaklar: [120, 67], yeniAd: "Di\u011Fer Ghana" },
  { hedef: 23, kaynaklar: [15, 205, 61, 12], yeniAd: "Eski Depo", uretimSevkiyatiEzer: true }
];
const SADECE_ATILAN = [255, 236];
const IC_PIYASA = "\u0130\xE7 Piyasa";
async function byCustomerOrder() {
  var _a;
  const rows = await dbQuery("exec musteri_bazinda_tum_genel_ciro_son_7");
  const byId = /* @__PURE__ */ new Map();
  for (const r of rows) if (!byId.has(r.MusteriId)) byId.set(r.MusteriId, r);
  const atilan = new Set(SADECE_ATILAN);
  for (const g of MERGE) for (const k of g.kaynaklar) atilan.add(k);
  const hedefler = new Map(MERGE.map((g) => [g.hedef, g]));
  const out = [];
  for (const item of rows) {
    if (atilan.has(item.MusteriId)) continue;
    if (item.Marketing === IC_PIYASA) continue;
    const base = {
      musteri_id: item.MusteriId,
      musteri: item.MusteriAdi,
      ulkeAdi: item.UlkeAdi,
      logo: item.UlkeLogo,
      temsilci: item.Temsilci,
      marketing: item.Marketing,
      oncelik: item.MusteriOncelik,
      /*
       * KullaniciSchema'da var ama getGenelMusteriSiparis onu HIC
       * atamiyor; marshmallow model varsayilani "" ile dokuyordu.
       * Olcumde 481 satirin hepsinde fark cikti, eklendi.
       */
      sonSiparisTarihi: ""
    };
    const group = hedefler.get(item.MusteriId);
    if (!group) {
      out.push({
        ...base,
        BuYilUretim: item.BuYilUretim,
        BuYilSevkiyat: item.BuYilSevkiyat,
        BuYil: item.BuYilCiro,
        GecenYil: item.GecenYilCiro,
        OncekiYil: item.OncekiYilCiro,
        OnDokuzYili: item.OndokuzYilCiro,
        OnSekizYili: item.OnSekizYilCiro,
        OnYediYili: item.OnYediYilCiro,
        OnAltiYili: item.OnAltiYilCiro,
        OnBesYili: item.OnBesYilCiro,
        OnDortYili: item.OnDortYilCiro,
        OnUcYili: item.OnUcYilCiro,
        OnUcYiliOncesi: num(item.OnUcYilOncesiCiro) + num(item.RealOnUcCiro),
        Toplam: num(item.GenelCiro) - num(item.BuYilCiro) + num(item.OnUcYilOncesiCiro)
      });
      continue;
    }
    const acc = {};
    for (const [out_, src] of YEAR_FIELDS) acc[out_] = num(item[src]);
    let buYilUretim = item.BuYilUretim;
    let buYilSevkiyat = item.BuYilSevkiyat;
    let toplam = num(item.GenelCiro) - num(item.BuYilCiro) + num(item.OnUcYilOncesiCiro);
    const onUcOncesi = num(item.OnUcYilOncesiCiro) + num(item.RealOnUcCiro);
    const kaynaklar = group.kaynaklar.map((id) => byId.get(id)).filter((r) => Boolean(r));
    for (const src of kaynaklar) {
      for (const [out_, col] of YEAR_FIELDS) acc[out_] += num(src[col]);
      toplam += num(src.GenelCiro);
      if (group.uretimSevkiyatiEzer) {
        buYilUretim = num(src.BuYilUretim);
        buYilSevkiyat = num(src.BuYilSevkiyat);
      }
    }
    out.push({
      ...base,
      musteri: (_a = group.yeniAd) != null ? _a : item.MusteriAdi,
      BuYilUretim: buYilUretim,
      BuYilSevkiyat: buYilSevkiyat,
      BuYil: item.BuYilCiro,
      GecenYil: acc.GecenYil,
      OncekiYil: acc.OncekiYil,
      OnDokuzYili: acc.OnDokuzYili,
      OnSekizYili: acc.OnSekizYili,
      OnYediYili: acc.OnYediYili,
      OnAltiYili: acc.OnAltiYili,
      OnBesYili: acc.OnBesYili,
      OnDortYili: acc.OnDortYili,
      OnUcYili: acc.OnUcYili,
      OnUcYiliOncesi: onUcOncesi,
      Toplam: toplam
    });
  }
  return out;
}
const SQL_MK_SEVK_SIP = `
select
  m.FirmaAdi as FirmaAdi,
  (
    select sum(su.SatisToplam)
    from SiparislerTB s
      inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
    where s.MusteriID = m.ID and YEAR(s.SiparisTarihi) = @year
  ) as BuYilSiparisler,
  (
    select sum(su.SatisToplam)
    from SiparislerTB s
      inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
    where s.MusteriID = m.ID and YEAR(s.YuklemeTarihi) = @year
  ) as BuYilYuklenenler
from MusterilerTB m
where m.Marketing = 'Mekmar'
`;
const SQL_MK_SEVK_SIP_MASRAF = `
select
  m.FirmaAdi as FirmaAdi,
  sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) as NavlunvDiger
from SiparislerTB s
  inner join MusterilerTB m on m.ID = s.MusteriID
where YEAR(s.YuklemeTarihi) = @year and m.Marketing = 'Mekmar'
group by s.MusteriID, m.FirmaAdi
`;
async function byYuklemevSiparisler(year) {
  const [rows, masraf] = await dbAll([
    dbQuery(SQL_MK_SEVK_SIP, { year }),
    dbQuery(
      SQL_MK_SEVK_SIP_MASRAF,
      { year }
    )
  ]);
  const masrafByFirma = /* @__PURE__ */ new Map();
  for (const item of masraf) {
    if (masrafByFirma.has(item.FirmaAdi)) continue;
    masrafByFirma.set(item.FirmaAdi, num(item.NavlunvDiger));
  }
  return rows.filter(
    (item) => !(item.BuYilSiparisler === null && item.BuYilYuklenenler === null)
  ).map((item) => {
    var _a;
    const yuklenenfob = num(item.BuYilYuklenenler);
    return {
      musteriadi: item.FirmaAdi,
      siparisfob: num(item.BuYilSiparisler),
      yuklenenfob,
      yuklenenddp: yuklenenfob + ((_a = masrafByFirma.get(item.FirmaAdi)) != null ? _a : 0)
    };
  });
}
const _year__get = defineEventHandler(async (event) => {
  const year = Number(getRouterParam(event, "year"));
  if (!Number.isInteger(year) || year < 1990 || year > 2200) {
    throw createError({
      statusCode: 400,
      statusMessage: `Gecersiz yil: ${getRouterParam(event, "year")}`
    });
  }
  const [
    po,
    customer,
    marketing,
    marketingYukleme,
    marketingDetail,
    customerOrder,
    sevkSip
  ] = await dbAll([
    byPo(year),
    byCustomer(year),
    byMarketing(year),
    byMarketingYukleme(year),
    byMarketingDetail(year),
    byCustomerOrder(),
    byYuklemevSiparisler(year)
  ]);
  return {
    byPo: po,
    byCustomer: customer,
    byMarketing: marketing,
    byMarketingYukleme: marketingYukleme,
    byMarketingDetayYukleme: marketingDetail,
    byCustomerOrder: customerOrder,
    byYuklemevSiparisler: sevkSip
  };
});

export { _year__get as default };
//# sourceMappingURL=_year_.get.mjs.map
