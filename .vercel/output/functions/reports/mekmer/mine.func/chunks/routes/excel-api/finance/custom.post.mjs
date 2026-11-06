import { d as defineEventHandler, r as requireObject, e as readBody, f as fillTemplate, s as sendXlsxBuffer, h as dateConvert, i as formatControl, j as borderOnly, c as createError, T as THIN } from '../../../_/nitro.mjs';
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

const PO_HEADERS = [
  "Po",
  "Order Date",
  "Shipped Date",
  "Status",
  "Order Total",
  "Payment Received",
  "Balanced",
  "Prepayment"
];
const PAID_HEADERS = ["Date", "Paid"];
const BOLD = { bold: true };
function writeHeaders(sheet, headers) {
  headers.forEach((text, i) => {
    const cell = sheet.getCell(1, i + 1);
    cell.value = text;
    cell.style = { border: THIN, font: BOLD };
  });
}
const custom_post = defineEventHandler(async (event) => {
  const body = requireObject(await readBody(event));
  const buffer = await fillTemplate(
    { template: "finance_detail_custom.xlsx", sheetName: "Sayfa1" },
    (sheet, book) => {
      var _a, _b, _c, _d;
      writeHeaders(sheet, PO_HEADERS);
      let satir = 2;
      for (const po of (_a = body.po) != null ? _a : []) {
        const values = [
          (_b = po.SiparisNo) != null ? _b : null,
          dateConvert(po.SiparisTarihi),
          dateConvert(po.YuklemeTarihi),
          (_c = po.Durum) != null ? _c : null,
          formatControl(po.OrderTotal),
          formatControl(po.Paid),
          formatControl(po.Balanced),
          formatControl(po.Pesinat)
        ];
        values.forEach((v, i) => {
          const cell = sheet.getCell(satir, i + 1);
          cell.value = v;
          borderOnly(cell);
        });
        satir += 1;
      }
      const sheet2 = book.getWorksheet("Sayfa2");
      if (!sheet2) {
        throw createError({
          statusCode: 500,
          statusMessage: "Sablonda 'Sayfa2' yok: finance_detail_custom.xlsx"
        });
      }
      writeHeaders(sheet2, PAID_HEADERS);
      let satir2 = 2;
      for (const paid of (_d = body.paid) != null ? _d : []) {
        const date = sheet2.getCell(satir2, 1);
        date.value = dateConvert(paid.Tarih);
        borderOnly(date);
        const amount = sheet2.getCell(satir2, 2);
        amount.value = formatControl(paid.Paid);
        borderOnly(amount);
        satir2 += 1;
      }
    }
  );
  return sendXlsxBuffer(event, buffer, "finance_detail_custom.xlsx");
});

export { custom_post as default };
//# sourceMappingURL=custom.post.mjs.map
