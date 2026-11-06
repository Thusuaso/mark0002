//#region app/utils/dates.ts
function pad(value) {
	return value.toString().length === 1 ? `0${value}` : String(value);
}
/** API'ye yazilan bicim: yil-ay-gun (orn. "2026-10-02") */
function toIsoDate(value) {
	if (value == null) return "";
	const date = new Date(value);
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
/** "2026-10-02" -> Date. Gecersiz/bos giriste "" doner (orijinal davranis). */
function fromIsoDate(value) {
	if (value == null) return "";
	const [year, month, day] = value.split("-");
	return /* @__PURE__ */ new Date(`${year}-${month}-${day}`);
}

export { fromIsoDate as f, toIsoDate as t };
//# sourceMappingURL=dates-C-BBx50j.mjs.map
