import { d as defineEventHandler, r as requireObject, e as readBody, f as fillTemplate, s as sendXlsxBuffer, n as nc } from '../../../_/nitro.mjs';
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

function shortDateC(now) {
  const pad = (n) => String(n).padStart(2, "0");
  return [
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getFullYear() % 100)
  ].join("/");
}
const MARKETING_GROUPS = [
  "Mekmar",
  "\u0130\xE7 Piyasa",
  "Mekmer",
  "Imperial Homes"
];
const GROUP_TITLES = {
  Mekmar: "Mekmar",
  "\u0130\xE7 Piyasa": "\u0130\xE7 Piyasa",
  Mekmer: "Mekmer",
  "Imperial Homes": "\u0130mperial Homes"
};
function groupBy(rows) {
  const out = {
    Mekmar: [],
    "\u0130\xE7 Piyasa": [],
    Mekmer: [],
    "Imperial Homes": []
  };
  for (const item of rows) {
    const key = MARKETING_GROUPS.find((g) => item.marketing === g);
    if (key) out[key].push(item);
  }
  return out;
}
const mk_post = defineEventHandler(async (event) => {
  const body = requireObject(await readBody(event));
  const now = /* @__PURE__ */ new Date();
  const yil = String(now.getFullYear());
  const kisaTarih = shortDateC(now);
  const buffer = await fillTemplate(
    /* Birincil sayfa yalnizca dogrulama icin; yazim writerFor ile. */
    { template: "mkRaporlari.xlsx", sheetName: "Sayfa1" },
    async (_sheet, _book, write1, writerFor) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K;
      write1(
        1,
        1,
        `${yil} YILI BA\u015EINDAN \u0130T\u0130BAREN ALINAN S\u0130PAR\u0130\u015ELER`
      );
      let satir = 3;
      let poFob = 0;
      let poDdp = 0;
      for (const item of (_a = body.byPo) != null ? _a : []) {
        write1(satir, 1, (_b = item.tarih) != null ? _b : null);
        write1(satir, 2, (_c = item.firma) != null ? _c : null);
        write1(satir, 3, (_d = item.po) != null ? _d : null);
        write1(satir, 4, (_e = item.teslim) != null ? _e : null);
        write1(satir, 5, (_f = item.fob) != null ? _f : null);
        write1(satir, 6, (_g = item.ddp) != null ? _g : null);
        poFob += nc(item.fob);
        poDdp += nc(item.ddp);
        satir += 1;
      }
      write1(satir, 1, "Toplam");
      write1(satir, 5, poFob);
      write1(satir, 6, poDdp);
      const write2 = await writerFor("Sayfa2");
      write2(1, 1, `${yil} TAR\u0130H\u0130 \u0130T\u0130BAR\u0130YLE S\u0130PAR\u0130\u015ELER`);
      let satir2 = 3;
      let mkFob = 0;
      let mkDdp = 0;
      for (const item of (_h = body.byMarketing) != null ? _h : []) {
        write2(satir2, 1, (_i = item.marketing) != null ? _i : null);
        write2(satir2, 2, (_j = item.toplam) != null ? _j : null);
        write2(satir2, 3, (_k = item.toplamCfr) != null ? _k : null);
        mkFob += nc(item.toplam);
        mkDdp += nc(item.toplamCfr);
        satir2 += 1;
      }
      write2(satir2, 1, "Toplam");
      write2(satir2, 2, mkFob);
      write2(satir2, 3, mkDdp);
      write2(1, 5, `${kisaTarih} TAR\u0130H\u0130 \u0130T\u0130BAR\u0130YLE S\u0130PAR\u0130\u015ELER DETAY`);
      const byCustomer = (_l = body.byCustomer) != null ? _l : [];
      let satir3 = 3;
      let custFob = 0;
      let custDdp = 0;
      for (const item of byCustomer) {
        write2(satir3, 5, (_m = item.musteriAdi) != null ? _m : null);
        write2(satir3, 6, (_n = item.marketing) != null ? _n : null);
        write2(satir3, 7, (_o = item.ulkeAdi) != null ? _o : null);
        write2(satir3, 8, (_p = item.toplam) != null ? _p : null);
        write2(satir3, 9, (_q = item.toplamCfr) != null ? _q : null);
        custFob += nc(item.toplam);
        custDdp += nc(item.toplamCfr);
        satir3 += 1;
      }
      write2(satir3, 5, "Toplam");
      write2(satir3, 8, custFob);
      write2(satir3, 9, custDdp);
      const siparisGroups = groupBy(byCustomer);
      const SIPARIS_BLOCKS = [
        ["Mekmar", 11],
        ["\u0130\xE7 Piyasa", 16],
        ["Mekmer", 21],
        ["Imperial Homes", 26]
      ];
      for (const [group, col] of SIPARIS_BLOCKS) {
        write2(1, col, GROUP_TITLES[group]);
        let r = 3;
        let fob = 0;
        let ddp = 0;
        for (const item of siparisGroups[group]) {
          write2(r, col, (_r = item.musteriAdi) != null ? _r : null);
          write2(r, col + 1, (_s = item.ulkeAdi) != null ? _s : null);
          write2(r, col + 2, (_t = item.toplam) != null ? _t : null);
          write2(r, col + 3, (_u = item.toplamCfr) != null ? _u : null);
          fob += nc(item.toplam);
          ddp += nc(item.toplamCfr);
          r += 1;
        }
        write2(r, col, "Toplam");
        write2(r, col + 2, fob);
        write2(r, col + 3, ddp);
      }
      const write3 = await writerFor("Sayfa3");
      write3(1, 1, `1-1-2024 ${kisaTarih} ARASI Y\xDCKLEMELER`);
      let satir8 = 3;
      let yukFob = 0;
      let yukDdp = 0;
      for (const item of (_v = body.byMarketingYukleme) != null ? _v : []) {
        write3(satir8, 1, (_w = item.marketing) != null ? _w : null);
        write3(satir8, 2, (_x = item.fobToplam) != null ? _x : null);
        write3(satir8, 3, (_y = item.cfrToplam) != null ? _y : null);
        yukFob += nc(item.fobToplam);
        yukDdp += nc(item.cfrToplam);
        satir8 += 1;
      }
      write3(satir8, 1, "Toplam");
      write3(satir8, 2, yukFob);
      write3(satir8, 3, yukDdp);
      const yuklemeGroups = groupBy((_z = body.byMarketingDetayYukleme) != null ? _z : []);
      const YUKLEME_BLOCKS = [
        ["Mekmar", 5],
        ["\u0130\xE7 Piyasa", 9],
        ["Mekmer", 13],
        ["Imperial Homes", 17]
      ];
      for (const [group, col] of YUKLEME_BLOCKS) {
        write3(1, col, GROUP_TITLES[group]);
        let r = 3;
        let fob = 0;
        let ddp = 0;
        for (const item of yuklemeGroups[group]) {
          write3(r, col, (_A = item.musteri) != null ? _A : null);
          write3(r, col + 1, (_B = item.toplamFob) != null ? _B : null);
          write3(r, col + 2, (_C = item.toplamCfr) != null ? _C : null);
          fob += nc(item.toplamFob);
          ddp += nc(item.toplamCfr);
          r += 1;
        }
        write3(r, col, "Toplam");
        write3(r, col + 1, fob);
        write3(r, col + 2, ddp);
      }
      const write4 = await writerFor("Sayfa4");
      let satir13 = 2;
      for (const item of (_D = body.byCustomerOrder) != null ? _D : []) {
        write4(satir13, 1, (_E = item.musteri) != null ? _E : null);
        write4(satir13, 2, (_F = item.ulkeAdi) != null ? _F : null);
        write4(satir13, 3, (_G = item.temsilci) != null ? _G : null);
        const yillar = [
          item.Toplam,
          item.BuYilUretim,
          item.BuYilSevkiyat,
          item.GecenYil,
          item.OncekiYil,
          item.OnDokuzYili,
          item.OnSekizYili,
          item.OnYediYili,
          item.OnAltiYili,
          item.OnBesYili,
          item.OnDortYili,
          item.OnUcYili,
          item.OnUcYiliOncesi
        ];
        yillar.forEach((v, i) => write4(satir13, 4 + i, v != null ? v : 0));
        satir13 += 1;
      }
      const write5 = await writerFor("Sayfa5");
      let satir15 = 2;
      for (const item of (_H = body.byYuklemevSiparisler) != null ? _H : []) {
        write5(satir15, 1, (_I = item.musteriadi) != null ? _I : null);
        write5(satir15, 2, (_J = item.siparisfob) != null ? _J : null);
        write5(satir15, 3, (_K = item.yuklenenddp) != null ? _K : null);
        satir15 += 1;
      }
    }
  );
  return sendXlsxBuffer(event, buffer, "mkRaporlari.xlsx");
});

export { mk_post as default };
//# sourceMappingURL=mk.post.mjs.map
