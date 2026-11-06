import { d as defineEventHandler, r as requireObject, e as readBody, f as fillTemplate, s as sendXlsxBuffer, n as nc, T as THIN, C as CENTER } from '../../../_/nitro.mjs';
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

const FONT_BOLD_11 = {
  name: "Calibri",
  size: 11,
  bold: true,
  italic: false,
  underline: false,
  strike: false,
  color: { argb: "FF000000" }
};
const ARIAL_10 = { name: "Arial", size: 10 };
const setStyle = (cell, patch = {}) => {
  cell.style = { border: THIN, font: ARIAL_10, ...patch };
};
const round2 = (n) => Math.round(n * 100) / 100;
const checkList_post = defineEventHandler(async (event) => {
  var _a;
  const body = requireObject(await readBody(event));
  const items = (_a = body.list) != null ? _a : [];
  const buffer = await fillTemplate(
    { template: "ceki_listesi.xlsx", sheetName: "Sheet" },
    (sheet) => {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
      sheet.getCell(6, 1).value = `${(_a2 = body.po) != null ? _a2 : ""} Packing List`;
      const crates = [];
      for (const item of items) {
        const key = item.Sira;
        const last = crates[crates.length - 1];
        if (key != null && last && last.key === key) last.rows.push(item);
        else crates.push({ key, rows: [item] });
      }
      let satir = 11;
      let index = 1;
      let totalM2 = 0;
      let totalPiece = 0;
      let totalMt = 0;
      let totalNet = 0;
      let totalGross = 0;
      let crateCount = 0;
      for (const crate of crates) {
        const crateFirstRow = satir;
        for (const item of crate.rows) {
          const siraNo = "Sira" in item ? item.Sira == null ? "" : item.Sira : index;
          const cells = [
            [1, siraNo],
            [2, (_b = item.KasaNo) != null ? _b : null],
            [3, (_c = item.KategoriAdi) != null ? _c : null],
            [4, (_d = item.YuzeyIslem) != null ? _d : null],
            [5, (_e = item.UrunAdi) != null ? _e : null],
            [6, (_f = item.Kenar) != null ? _f : null],
            [7, (_g = item.En) != null ? _g : null],
            [8, (_h = item.Boy) != null ? _h : null],
            [9, (_i = item.KutuAdet) != null ? _i : null],
            [10, (_j = item.Adet) != null ? _j : null],
            [16, (_k = item.KasaOlcusu) != null ? _k : null]
          ];
          for (const [col, value] of cells) {
            const cell = sheet.getCell(satir, col);
            cell.value = value;
            setStyle(cell);
          }
          const birim = item.BirimAdi;
          const kutu = Math.trunc(nc(item.KutuAdet));
          let m2 = 0;
          let pcs = 0;
          let mt = 0;
          if (birim === "Sqm") {
            if (item.En === "ANT" && item.Boy === "PAT") m2 = round2(0.74338688 * kutu);
            else if (item.En === "20,3" && item.Boy === "SET") m2 = round2(0.494914 * kutu);
            else m2 = nc(item.Miktar);
          } else if (birim === "Pcs") {
            pcs = nc(item.Miktar);
          } else if (birim === "Mt") {
            mt = nc(item.Miktar);
          }
          const quantity = [
            [11, birim === "Sqm", m2],
            [12, birim === "Pcs", pcs],
            [13, birim === "Mt", mt]
          ];
          for (const [col, active, value] of quantity) {
            const cell = sheet.getCell(satir, col);
            cell.value = active ? value : "";
            setStyle(cell);
          }
          if (birim === "Sqm") totalM2 += m2;
          else if (birim === "Pcs") totalPiece += pcs;
          else if (birim === "Mt") totalMt += mt;
          const groupFirst = (_l = item.KasaGrupIlk) != null ? _l : true;
          const net = (_m = item.GrupTon) != null ? _m : item.Ton;
          const netCell = sheet.getCell(satir, 14);
          const grossCell = sheet.getCell(satir, 15);
          if (!groupFirst) {
            netCell.value = "";
            grossCell.value = "";
          } else if (net == null || net === "None" || net === "undefined") {
            crateCount += 1;
            netCell.value = 0;
            grossCell.value = 0;
          } else {
            const netKg = Math.trunc(nc(net));
            crateCount += 1;
            totalNet += netKg;
            totalGross += netKg + 30;
            netCell.value = netKg;
            grossCell.value = netKg + 30;
          }
          setStyle(netCell);
          setStyle(grossCell);
          satir += 1;
          index += 1;
        }
        if (crate.rows.length > 1) {
          const crateLastRow = satir - 1;
          for (const col of [1, 14, 15]) {
            sheet.mergeCells(crateFirstRow, col, crateLastRow, col);
            setStyle(sheet.getCell(crateFirstRow, col), { alignment: CENTER });
          }
        }
      }
      const totals = [
        [11, totalM2],
        [12, totalPiece],
        [13, totalMt],
        [14, Math.trunc(totalNet)],
        [15, Math.trunc(totalGross)]
      ];
      for (const [col, value] of totals) {
        const cell = sheet.getCell(satir, col);
        cell.value = value;
        setStyle(cell, { font: FONT_BOLD_11 });
      }
      const labelPair = (row, label, value) => {
        sheet.mergeCells(row, 1, row, 2);
        const l = sheet.getCell(row, 1);
        l.value = label;
        setStyle(l, { font: FONT_BOLD_11, alignment: CENTER });
        setStyle(sheet.getCell(row, 2));
        sheet.mergeCells(row, 3, row, 4);
        const v = sheet.getCell(row, 3);
        v.value = value;
        setStyle(v, { font: FONT_BOLD_11, alignment: CENTER });
        setStyle(sheet.getCell(row, 4));
      };
      satir += 2;
      labelPair(satir, "TOTAL CASES", `${crateCount} W.CASES`);
      satir += 2;
      labelPair(satir, "TOTAL NET KG", `${totalNet} kgs`);
      satir += 2;
      labelPair(satir, "TOTAL GROSS KG ", `${totalGross} kgs`);
      const textBlock = (row, firstCol, lastCol, title) => {
        sheet.mergeCells(row, firstCol, row, lastCol);
        const head = sheet.getCell(row, firstCol);
        head.value = title;
        setStyle(head, { font: FONT_BOLD_11, alignment: CENTER });
        for (let col = firstCol + 1; col <= lastCol; col++) {
          setStyle(sheet.getCell(row, col));
        }
        sheet.mergeCells(row + 1, firstCol, row + 3, lastCol);
        for (let rr = row + 1; rr <= row + 3; rr++) {
          for (let col = firstCol; col <= lastCol; col++) {
            setStyle(sheet.getCell(rr, col));
          }
        }
      };
      satir += 2;
      textBlock(satir, 1, 4, "EK A\xC7IKLAMALAR");
      textBlock(satir, 5, 15, "KASA \xD6L\xC7\xDCLER\u0130");
      satir += 5;
      textBlock(satir, 1, 4, "KONTEYNER \u0130\xC7\u0130 DA\u011EILIM");
      textBlock(satir, 5, 15, "Y\xDCKLEME TOPLANTISI NOTLARI");
    }
  );
  return sendXlsxBuffer(event, buffer, "ceki_listesi.xlsx");
});

export { checkList_post as default };
//# sourceMappingURL=check-list.post.mjs.map
