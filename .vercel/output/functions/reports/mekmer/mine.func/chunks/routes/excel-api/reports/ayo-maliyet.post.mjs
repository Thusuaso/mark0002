import { d as defineEventHandler, k as requireList, e as readBody, f as fillTemplate, s as sendXlsxBuffer } from '../../../_/nitro.mjs';
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

function profitRatio(value) {
  if (value == null || value === 0 || value === "" || value === " ") return 0;
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.trunc(n) / 100;
}
const ayoMaliyet_post = defineEventHandler(async (event) => {
  const rows = requireList(await readBody(event));
  const buffer = await fillTemplate(
    { template: "ayo_maliyet_listesi.xlsx", sheetName: "Sheet" },
    (_sheet, _book, write) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C;
      let satir = 2;
      for (const item of rows) {
        const values = [
          (_a = item.siparisci) != null ? _a : null,
          (_b = item.operasyon) != null ? _b : null,
          (_c = item.siparis_no) != null ? _c : null,
          (_d = item.marketing) != null ? _d : null,
          (_e = item.faturatur) != null ? _e : null,
          (_f = item.siparis_tarihi) != null ? _f : null,
          (_g = item.yukleme_tarihi) != null ? _g : null,
          (_h = item.musteri_adi) != null ? _h : null,
          (_i = item.ulke_adi) != null ? _i : null,
          (_j = item.teslim_sekli) != null ? _j : null,
          (_k = item.toplam_bedel) != null ? _k : null,
          (_l = item.mekmar_alim) != null ? _l : null,
          (_m = item.dis_alim) != null ? _m : null,
          (_n = item.nakliye) != null ? _n : null,
          (_o = item.gumruk) != null ? _o : null,
          (_p = item.ilaclama) != null ? _p : null,
          (_q = item.liman) != null ? _q : null,
          (_r = item.sigorta) != null ? _r : null,
          (_s = item.navlun) != null ? _s : null,
          (_t = item.detay_1) != null ? _t : null,
          (_u = item.detay_2) != null ? _u : null,
          (_v = item.detay_3) != null ? _v : null,
          (_w = item.ozel_iscilik) != null ? _w : null,
          (_x = item.banka_masrafi) != null ? _x : null,
          (_y = item.kurye_masrafi) != null ? _y : null,
          (_z = item.masraf_toplam) != null ? _z : null,
          (_A = item.kar_zarar) != null ? _A : null,
          (_B = item.kar_zarar_tl) != null ? _B : null,
          profitRatio(item.kar_zarar_tl_yuzdesi),
          (_C = item.dosya_kapanma_date) != null ? _C : null
        ];
        values.forEach((v, i) => write(satir, i + 1, v));
        satir += 1;
      }
    }
  );
  return sendXlsxBuffer(event, buffer, "ayo_maliyet_listesi.xlsx");
});

export { ayoMaliyet_post as default };
//# sourceMappingURL=ayo-maliyet.post.mjs.map
