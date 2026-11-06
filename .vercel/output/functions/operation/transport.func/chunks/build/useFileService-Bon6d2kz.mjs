import { i as useRuntimeConfig, $ as $fetch$2 } from '../virtual/entry.mjs';

//#region app/composables/useFileService.ts
function isFilenameValid(file) {
	if (file.name.split(".").length > 2) {
		alert("Lütfen Dosya İsmini Düzeltiniz.Dosya İsminde '.' karakteri olamaz.");
		return false;
	}
	return true;
}
function useFileService() {
	const baseURL = useRuntimeConfig().public.fileServiceBase.replace(/\/+$/, "");
	async function uploadFile(file, pathname, dosyaAdi) {
		if (!isFilenameValid(file)) return void 0;
		const formData = new FormData();
		formData.append("file", file);
		return {
			...await $fetch$2(`/${pathname.replace(/^\/+/, "")}`, {
				baseURL,
				method: "POST",
				body: formData
			}),
			dosyaAdi
		};
	}
	return {
		sendIsf(file, id, po) {
			return uploadFile(file, `file/upload/${id}/${po}`, po);
		},
		sendProforma(file, teklifId, siparisno) {
			return uploadFile(file, `file/upload/${teklifId}/${siparisno}`, siparisno);
		},
		sendDrawing(file, po, id, name) {
			return uploadFile(file, `file/upload/drawing/${po}/${id}/${name}`, name);
		},
		sendInvoiceShipping(file, id, invoiceName) {
			return uploadFile(file, `file/customer/upload/${id}/${invoiceName}`, invoiceName);
		},
		sendTransport(file, id, invoiceName) {
			const dosya = `${invoiceName}.pdf`;
			return uploadFile(file, `file/customer/upload/${id}/${dosya}`, dosya);
		},
		sendInvoice(file, id, siparisno) {
			return uploadFile(file, `file/upload/${id}/${siparisno}`, siparisno);
		},
		sendSupplier(file, po, document) {
			return uploadFile(file, `file/tedarikci/upload/30/${po}/${document}`, po);
		},
		sendSample(file, numuneId) {
			return uploadFile(file, `file/upload/numune/numuneDosya/${numuneId}/${file.name}`, file.name);
		},
		offerFile(file, teklifId) {
			return uploadFile(file, `file/upload/teklif/teklifDosya/${teklifId}/${file.name}`, file.name);
		},
		sendOfferProforma(file, offerId) {
			return uploadFile(file, `file/upload/teklif/proforma/${offerId}/${file.name}`, file.name);
		},
		sendSampleFile(file, offerId) {
			return uploadFile(file, `file/upload/teklif/teklifNumune/${offerId}/${file.name}`, file.name);
		}
	};
}

export { useFileService as u };
//# sourceMappingURL=useFileService-Bon6d2kz.mjs.map
