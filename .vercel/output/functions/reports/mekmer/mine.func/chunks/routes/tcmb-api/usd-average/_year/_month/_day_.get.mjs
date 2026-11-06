import { d as defineEventHandler, z as getRouterParam, c as createError, D as dbQuery, I as dbExecute, J as fetchTcmbFile, K as parseUsdSelling } from '../../../../../_/nitro.mjs';
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

const CONCURRENCY = 6;
async function rateForDay(year, month, day) {
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  const pathname = `/kurlar/${year}${mm}/${dd}${mm}${year}.xml`;
  try {
    const xml = await fetchTcmbFile(pathname);
    if (!xml) return null;
    const raw = parseUsdSelling(xml, "BanknoteSelling");
    if (!raw) return null;
    const value = Number.parseFloat(raw);
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch (err) {
    console.warn(`[tcmb-api/usd/average] ${pathname} atlandi:`, err);
    return null;
  }
}
const _day__get = defineEventHandler(async (event) => {
  const year = Number(getRouterParam(event, "year"));
  const month = Number(getRouterParam(event, "month"));
  const dayCount = Number(getRouterParam(event, "day"));
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(dayCount) || year < 1996 || month < 1 || month > 12 || dayCount < 1 || dayCount > 31) {
    throw createError({
      statusCode: 400,
      statusMessage: `Gecersiz donem: ${year}-${month}, gun sayisi ${dayCount}`
    });
  }
  const days = Array.from({ length: dayCount }, (_, i) => i + 1);
  const rates = [];
  for (let i = 0; i < days.length; i += CONCURRENCY) {
    const batch = days.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map((day) => rateForDay(year, month, day))
    );
    for (const rate of results) {
      if (rate !== null) rates.push(rate);
    }
  }
  if (rates.length === 0) {
    console.warn(
      `[tcmb-api/usd/average] ${year}-${month}: hicbir gunde kur bulunamadi, AyoCurrency guncellenmedi.`
    );
    return {
      average: 0,
      field: "BanknoteSelling",
      year,
      month,
      dayCountRequested: dayCount,
      dayCountWithData: 0,
      stored: false
    };
  }
  const average = rates.reduce((acc, r) => acc + r, 0) / rates.length;
  const existing = await dbQuery(
    "select CURRENCY from AyoCurrency where YEAR = @year and MONTH = @month",
    { year, month }
  );
  if (existing.length > 0) {
    await dbExecute(
      "update AyoCurrency set CURRENCY = @average where YEAR = @year and MONTH = @month",
      { average, year, month }
    );
  } else {
    await dbExecute(
      "insert into AyoCurrency(YEAR, MONTH, CURRENCY) values(@year, @month, @average)",
      { year, month, average }
    );
  }
  return {
    average,
    field: "BanknoteSelling",
    year,
    month,
    dayCountRequested: dayCount,
    dayCountWithData: rates.length,
    stored: true
  };
});

export { _day__get as default };
//# sourceMappingURL=_day_.get.mjs.map
