import { a as useAppToast } from '../virtual/entry.mjs';
import { u as useApi } from './useApi-CGFzrxZs.mjs';
import { defineStore } from 'pinia';

//#region app/stores/upload.ts
var useUploadStore = defineStore("upload", {
	state: () => ({
		documentModelList: [],
		documentSupplierList: [],
		documentProductSupplierList: [],
		missingDocumentList: [],
		missingDocumentOrderCount: 0
	}),
	getters: {
		getDocumentModelList: (state) => state.documentModelList,
		getDocumentSupplierList: (state) => state.documentSupplierList,
		getDocumentProductSupplierList: (state) => state.documentProductSupplierList,
		getMissingDocumentList: (state) => state.missingDocumentList,
		getMissingDocumentOrderCount: (state) => state.missingDocumentOrderCount
	},
	actions: {
		async setDocumentList(po) {
			try {
				const res = await useApi()(`/upload/document/${po}`);
				this.MUT_setDocumentModelList(res?.model ?? []);
			} catch (err) {
				console.error("setDocumentList basarisiz:", err);
				this.MUT_setDocumentModelList([]);
			}
		},
		async setDocumentModelList() {
			try {
				const res = await useApi()("/upload/model");
				this.MUT_setDocumentModelList(res?.model ?? []);
			} catch (err) {
				console.error("setDocumentModelList basarisiz:", err);
				this.MUT_setDocumentModelList([]);
			}
		},
		async setSendDatabaseInvoice(payload) {
			try {
				await useApi()("/upload/file", {
					method: "POST",
					body: payload
				});
			} catch (err) {
				console.error("setSendDatabaseInvoice basarisiz:", err);
			}
		},
		async setDocumentSupplierList(po) {
			try {
				const res = await useApi()(`/upload/document/supplier/list/${po}`);
				this.MUT_setDocumentSupplierList(res?.list ?? []);
			} catch (err) {
				console.error("setDocumentSupplierList basarisiz:", err);
				this.MUT_setDocumentSupplierList([]);
			}
		},
		async setDocumentProductSupplierList(po) {
			try {
				const res = await useApi()(`/upload/document/product/supplier/list/${po}`);
				this.MUT_setDocumentProductSupplierList(res?.list ?? []);
			} catch (err) {
				console.error("setDocumentProductSupplierList basarisiz:", err);
				this.MUT_setDocumentProductSupplierList([]);
			}
		},
		async setDocumentSupplierSave(payload) {
			const toast = useAppToast();
			try {
				if ((await useApi()("/upload/document/product/supplier/save", {
					method: "POST",
					body: payload
				}))?.status) toast.success("Successfully Saved");
				else toast.error("Error");
			} catch (err) {
				console.error("setDocumentSupplierSave basarisiz:", err);
				toast.error("Error");
			}
		},
		async setMissingDocumentList() {
			try {
				const list = (await useApi()("/upload/document/missing/list"))?.list ?? [];
				this.MUT_setMissingDocumentList(list);
				this.MUT_setMissingDocumentOrderCount(list.length);
			} catch (err) {
				console.error("setMissingDocumentList basarisiz:", err);
				this.MUT_setMissingDocumentList([]);
				this.MUT_setMissingDocumentOrderCount(0);
			}
		},
		async setMissingDocumentOrderCount() {
			try {
				const res = await useApi()("/upload/document/missing/count");
				this.MUT_setMissingDocumentOrderCount(res?.order ?? 0);
			} catch (err) {
				console.error("setMissingDocumentOrderCount basarisiz:", err);
				this.MUT_setMissingDocumentOrderCount(0);
			}
		},
		MUT_setDocumentModelList(payload) {
			this.documentModelList = payload;
		},
		MUT_setDocumentSupplierList(payload) {
			this.documentSupplierList = payload;
		},
		MUT_setDocumentProductSupplierList(payload) {
			this.documentProductSupplierList = payload;
		},
		MUT_setMissingDocumentList(payload) {
			this.missingDocumentList = payload;
		},
		MUT_setMissingDocumentOrderCount(payload) {
			this.missingDocumentOrderCount = payload;
		}
	}
});

export { useUploadStore as u };
//# sourceMappingURL=upload-CC_Yki8S.mjs.map
