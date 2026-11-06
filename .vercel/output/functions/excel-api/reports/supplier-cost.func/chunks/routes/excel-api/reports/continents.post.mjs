import { d as defineEventHandler, k as requireList, e as readBody, f as fillTemplate, s as sendXlsxBuffer, m as TOTAL_FILL, C as CENTER, B as BOLD_13, T as THIN, j as borderOnly, n as nc, o as totalCell } from '../../../_/nitro.mjs';
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

const continents_post = defineEventHandler(async (event) => {
  const blocks = requireList(await readBody(event));
  const buffer = await fillTemplate(
    { template: "continents.xlsx", sheetName: "Sayfa1" },
    (sheet) => {
      var _a, _b, _c, _d, _e;
      let column = 1;
      for (const block of blocks) {
        let satir = 1;
        const header = sheet.getCell(satir, column);
        header.value = (_a = block.year) != null ? _a : null;
        header.style = {
          border: THIN,
          font: BOLD_13,
          alignment: CENTER,
          fill: TOTAL_FILL
        };
        satir += 1;
        for (const [offset, text] of [
          [0, "Continents"],
          [1, "Fob"],
          [2, "Ddp"]
        ]) {
          const cell = sheet.getCell(satir, column + offset);
          cell.value = text;
          cell.style = { border: THIN, font: BOLD_13, alignment: CENTER };
        }
        satir += 1;
        let fob = 0;
        let ddp = 0;
        for (const item of (_b = block.data) != null ? _b : []) {
          const values = [(_c = item.Continent) != null ? _c : null, (_d = item.Fob) != null ? _d : null, (_e = item.Ddp) != null ? _e : null];
          values.forEach((v, offset) => {
            const cell = sheet.getCell(satir, column + offset);
            cell.value = v;
            borderOnly(cell);
          });
          fob += nc(item.Fob);
          ddp += nc(item.Ddp);
          satir += 1;
        }
        totalCell(sheet.getCell(satir, column), { center: true }).value = "Total";
        totalCell(sheet.getCell(satir, column + 1)).value = fob;
        totalCell(sheet.getCell(satir, column + 2)).value = ddp;
        column += 4;
      }
    }
  );
  return sendXlsxBuffer(event, buffer, "continents.xlsx");
});

export { continents_post as default };
//# sourceMappingURL=continents.post.mjs.map
