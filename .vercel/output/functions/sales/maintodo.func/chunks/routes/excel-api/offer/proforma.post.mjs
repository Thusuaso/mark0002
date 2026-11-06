import { d as defineEventHandler, r as requireObject, e as readBody, f as fillTemplate, s as sendXlsxBuffer } from '../../../_/nitro.mjs';
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

function pyStr(value) {
  if (value === null || value === void 0) return "None";
  if (value === true) return "True";
  if (value === false) return "False";
  return String(value);
}
const SHIPPED_TYPES = {
  1: {
    field: "FobFiyat",
    total: "TOTAL FOB Factory",
    grandTotal: "GRAND TOTAL FOB Factory"
  },
  2: {
    field: "FcaFiyat",
    total: "TOTAL FCA Factory",
    grandTotal: "GRAND TOTAL FCA Factory"
  },
  3: {
    field: "CFiyat",
    total: "TOTAL C Factory",
    grandTotal: "GRAND TOTAL C Factory"
  },
  4: {
    field: "DFiyat",
    total: "TOTAL D Factory",
    grandTotal: "GRAND TOTAL D Factory"
  }
};
const UNIT_COLUMNS = {
  Sqm: "I",
  Pcs: "G",
  Lmt: "H"
};
const SELLER_SURNAMES = {
  Ozlem: "OKUT",
  Hakan: "KAN"
};
const proforma_post = defineEventHandler(async (event) => {
  const body = requireObject(await readBody(event));
  const buffer = await fillTemplate(
    { template: "proforma_invoice.xlsx", sheetName: "Sayfa1" },
    (_sheet, book, write) => {
      var _a, _b, _c, _d, _e;
      book.calcProperties.fullCalcOnLoad = true;
      const customer = (_a = body.customer) != null ? _a : {};
      const model = (_b = body.model) != null ? _b : {};
      write(
        2,
        1,
        "Company: " + pyStr(customer.Company) + " \nVat No: \nContact Person: " + pyStr(customer.MusteriAdi) + "\nCountry: " + pyStr(model.UlkeAdi) + "\nPhone: " + pyStr(customer.Phone) + "\nMail: " + pyStr(customer.Mail)
      );
      const shippedId = (_c = body.shipped) == null ? void 0 : _c.id;
      const shipped = typeof shippedId === "number" ? SHIPPED_TYPES[shippedId] : void 0;
      let satir = 18;
      let index = 1;
      let labelsWritten = false;
      for (const item of (_d = body.data) != null ? _d : []) {
        write(
          satir,
          1,
          `${index}-${pyStr(item.KategoriAdi)} ${pyStr(item.UrunAdi)} ${pyStr(
            item.IslemAdi
          )} ${pyStr(item.EnBoy)}x${pyStr(item.Kalinlik)}`
        );
        if (shipped) {
          write(satir, 13, (_e = item[shipped.field]) != null ? _e : null);
          labelsWritten = true;
        }
        write(satir, 10, item.Birim);
        const left = UNIT_COLUMNS[String(item.Birim)];
        if (left) {
          const cell = write(satir, 14, null);
          cell.value = { formula: `${left}${satir}*M${satir}` };
        }
        index += 1;
        satir += 1;
      }
      if (shipped && labelsWritten) {
        write(46, 6, shipped.total);
        write(73, 6, shipped.grandTotal);
      }
      const kullanici = model.KullaniciAdi;
      const surname = typeof kullanici === "string" ? SELLER_SURNAMES[kullanici] : void 0;
      if (surname) write(85, 2, `${kullanici} ${surname}`);
    }
  );
  return sendXlsxBuffer(event, buffer, "proforma_invoice.xlsx");
});

export { proforma_post as default };
//# sourceMappingURL=proforma.post.mjs.map
