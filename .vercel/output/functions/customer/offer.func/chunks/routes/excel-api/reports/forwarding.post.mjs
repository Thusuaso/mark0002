import { d as defineEventHandler, k as requireList, e as readBody, f as fillTemplate, s as sendXlsxBuffer, h as dateConvert, j as borderOnly, n as nc, o as totalCell } from '../../../_/nitro.mjs';
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

const forwarding_post = defineEventHandler(async (event) => {
  const rows = requireList(await readBody(event));
  const buffer = await fillTemplate(
    { template: "forwarding_excel.xlsx", sheetName: "Sayfa1" },
    (sheet) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
      let satir = 2;
      let boxInCrate = 0;
      let pieceInCrate = 0;
      let amount = 0;
      let totalPrice = 0;
      for (const item of rows) {
        const values = [
          dateConvert(item.Tarih),
          (_a = item.FirmaAdi) != null ? _a : null,
          (_b = item.TedarikciAdi) != null ? _b : null,
          (_c = item.UrunKartId) != null ? _c : null,
          (_d = item.KasaNo) != null ? _d : null,
          (_e = item.OcakAdi) != null ? _e : null,
          (_f = item.KategoriAdi) != null ? _f : null,
          (_g = item.UrunAdi) != null ? _g : null,
          (_h = item.YuzeyIslemAdi) != null ? _h : null,
          (_i = item.En) != null ? _i : null,
          (_j = item.Boy) != null ? _j : null,
          (_k = item.Kenar) != null ? _k : null,
          (_l = item.KutuAdet) != null ? _l : null,
          (_m = item.Adet) != null ? _m : null,
          (_n = item.Miktar) != null ? _n : null,
          (_o = item.BirimAdi) != null ? _o : null,
          (_p = item.SiparisAciklama) != null ? _p : null,
          (_q = item.Aciklama) != null ? _q : null,
          (_r = item.BirimFiyat) != null ? _r : null,
          (_s = item.Toplam) != null ? _s : null,
          /* Python: `if(item['Fason'] == True)` -- sadece gercek True */
          item.Fason === true ? "Fason" : "Fason De\u011Fil",
          item.Kutulama === true ? "Kutulama" : "Kutulama De\u011Fil"
        ];
        values.forEach((v, i) => {
          const cell = sheet.getCell(satir, i + 1);
          cell.value = v;
          borderOnly(cell);
        });
        boxInCrate += nc(item.KutuAdet);
        pieceInCrate += nc(item.Adet);
        amount += nc(item.Miktar);
        totalPrice += nc(item.Toplam);
        satir += 1;
      }
      sheet.mergeCells(satir, 1, satir, 12);
      totalCell(sheet.getCell(satir, 1), { center: true }).value = "Total";
      totalCell(sheet.getCell(satir, 13)).value = boxInCrate;
      totalCell(sheet.getCell(satir, 14)).value = pieceInCrate;
      totalCell(sheet.getCell(satir, 15)).value = amount;
      totalCell(sheet.getCell(satir, 20)).value = totalPrice;
    }
  );
  return sendXlsxBuffer(event, buffer, "mekamer_forwarding_excel.xlsx");
});

export { forwarding_post as default };
//# sourceMappingURL=forwarding.post.mjs.map
