import { d as defineEventHandler, k as requireList, e as readBody, v as buildHeaderedTable, s as sendXlsxBuffer, h as dateConvert } from '../../../_/nitro.mjs';
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

const strips_post = defineEventHandler(async (event) => {
  const rows = requireList(await readBody(event));
  const buffer = await buildHeaderedTable({
    template: "reports_mekmer_strips.xlsx",
    rows,
    columns: [
      { header: "Tarih", value: (r) => dateConvert(r.Date) },
      { header: "\u0130rsaliye No", value: (r) => {
        var _a;
        return (_a = r.DocumentNo) != null ? _a : null;
      } },
      { header: "Tedarik\xE7i Ad\u0131", value: (r) => {
        var _a;
        return (_a = r.SupplierName) != null ? _a : null;
      } },
      { header: "Ocak Ad\u0131", value: (r) => {
        var _a;
        return (_a = r.QuarryName) != null ? _a : null;
      } },
      { header: "Strip Ad\u0131", value: (r) => {
        var _a;
        return (_a = r.StripName) != null ? _a : null;
      } },
      { header: "Fatura No", value: (r) => {
        var _a;
        return (_a = r.Invoice) != null ? _a : null;
      } },
      { header: "Strip (M2)", value: (r) => {
        var _a;
        return (_a = r.StripM2) != null ? _a : null;
      } },
      { header: "Strip (\u20BA)", value: (r) => {
        var _a;
        return (_a = r.StripPrice) != null ? _a : null;
      } },
      { header: "Strip Toplam (\u20BA)", value: (r) => {
        var _a;
        return (_a = r.StripCost) != null ? _a : null;
      } },
      { header: "Strip Toplam ($)", value: (r) => {
        var _a;
        return (_a = r.StripCostUsd) != null ? _a : null;
      } },
      { header: "Kur (\u20BA)", value: (r) => {
        var _a;
        return (_a = r.Currency) != null ? _a : null;
      } },
      { header: "En", value: (r) => {
        var _a;
        return (_a = r.StripWidth) != null ? _a : null;
      } },
      { header: "Boy", value: (r) => {
        var _a;
        return (_a = r.StripHeight) != null ? _a : null;
      } },
      { header: "Kal\u0131nl\u0131k", value: (r) => {
        var _a;
        return (_a = r.StripThickness) != null ? _a : null;
      } },
      { header: "Adet", value: (r) => {
        var _a;
        return (_a = r.StripPiece) != null ? _a : null;
      } }
    ]
  });
  return sendXlsxBuffer(event, buffer, "reports_mekmer_strips.xlsx");
});

export { strips_post as default };
//# sourceMappingURL=strips.post.mjs.map
