import { $ as $fetch$2 } from '../virtual/entry.mjs';

//#region app/composables/useExcelExport.ts
/**
* Nitro ucundan .xlsx indirir.
*
* @param path   Nitro yolu, orn. "/excel-api/finance/test"
* @param body   POST govdesi -- rapor satirlari
* @param fallbackFilename  Content-Disposition okunamazsa kullanilacak ad
*/
async function exportExcel(path, body, fallbackFilename) {
	let filename = fallbackFilename;
	triggerBlobDownload(await $fetch$2(path, {
		baseURL: "/",
		method: "POST",
		body,
		responseType: "blob",
		onResponse({ response }) {
			const parsed = filenameFromDisposition(response.headers.get("content-disposition"));
			if (parsed) filename = parsed;
		}
	}), filename);
}
function filenameFromDisposition(header) {
	if (!header) return null;
	const utf8 = header.match(/filename\*=UTF-8''([^;]+)/i);
	if (utf8?.[1]) try {
		return decodeURIComponent(utf8[1].trim());
	} catch {}
	return header.match(/filename="?([^";]+)"?/i)?.[1]?.trim() ?? null;
}
function triggerBlobDownload(blob, filename) {
	const url = URL.createObjectURL(blob);
	const link = (void 0).createElement("a");
	link.href = url;
	link.setAttribute("download", filename);
	(void 0).body.appendChild(link);
	link.click();
	link.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1e4);
}

export { exportExcel as e };
//# sourceMappingURL=useExcelExport-B-DCkvaR.mjs.map
