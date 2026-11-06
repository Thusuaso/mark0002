import { i as useRuntimeConfig, u as useCookie, a as useAppToast } from '../virtual/entry.mjs';

//#region app/composables/useSpacesService.ts
function extOf(name) {
	const parts = String(name ?? "").split(".");
	return parts.length > 1 ? parts.pop().toLowerCase() : "";
}
function useSpacesService() {
	const apiBase = useRuntimeConfig().public.apiBase;
	async function postJson(path, payload) {
		const headers = { "Content-Type": "application/json" };
		const token = useCookie("token").value;
		if (token) headers.Authorization = `Bearer ${token}`;
		const res = await fetch(apiBase + path, {
			method: "POST",
			headers,
			body: JSON.stringify(payload)
		});
		if (!res.ok) {
			console.error("Spaces API hatasi:", res.status);
			if (res.status === 401 || res.status === 403) {
				let message = "Bu işlem için yetkiniz bulunmamaktadır.";
				try {
					const body = await res.json();
					if (body?.message) message = body.message;
				} catch {}
				useAppToast().error(message);
			}
			return null;
		}
		return await res.json();
	}
	async function uploadTo(prefix, file, contentType) {
		try {
			const type = contentType || file.type || "application/octet-stream";
			const key = prefix + file.name;
			const cacheControl = "public,max-age=1,s-max-age=500,must-revalidate";
			const signed = await postJson("/spaces/sign-upload", {
				key,
				contentType: type
			});
			if (!signed?.status || !signed.url) return false;
			return (await fetch(signed.url, {
				method: "PUT",
				body: file,
				headers: {
					"Content-Type": type,
					"x-amz-acl": "public-read",
					"Cache-Control": cacheControl
				}
			})).ok;
		} catch (err) {
			console.error("Spaces yukleme hatasi:", err);
			return false;
		}
	}
	return {
		panelUsaProductUploadPhoto(file) {
			return uploadTo("usa-products/", file, "image/" + extOf(file.name));
		},
		panelProductSendPhoto(file) {
			return uploadTo("products/", file, "image/" + extOf(file.name));
		},
		async panelProductPhotoDelete(filename) {
			try {
				return !!(await postJson("/spaces/delete", { key: "products/" + filename }))?.status;
			} catch (err) {
				console.error("Spaces silme hatasi:", err);
				return false;
			}
		},
		panelProductSendTestReport(file) {
			return uploadTo("test-reports/", file);
		},
		panelProjectProductSendPhoto(file) {
			return uploadTo("galleria-project_photos/photos/", file);
		},
		panelProjectSendPhoto(file) {
			return uploadTo("galleria-project_photos/", file);
		}
	};
}

export { useSpacesService as u };
//# sourceMappingURL=useSpacesService-BLTjaYTm.mjs.map
