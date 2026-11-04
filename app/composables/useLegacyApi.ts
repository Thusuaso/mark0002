/*
 * @nuxtjs/axios ($axios) icin uyumluluk katmani.
 *
 * NEDEN VAR:
 * Vuex store'larinda 338 adet `this.$axios.get/post/put/delete` cagrisi
 * var ve hepsi axios sozlesmesine gore yazilmis:
 *
 *     this.$axios.post("/x", body).then((response) => {
 *       if (response.data.status) { ... }        // <-- .data
 *     })
 *
 * $fetch ise govdeyi DOGRUDAN dondurur, `.data` sarmalayicisi yoktur.
 * Duz bir arama-degistirme ile gecilse 338 yerde `response.data.x` ->
 * `response.x` ANLAMSAL donusumu gerekirdi; bunlardan birini kacirmak
 * derleme hatasi vermez, calisma aninda undefined uretir ve sessizce
 * yanlis davranir (orn. `if (response.data.status)` daima false olur,
 * kullanici "kaydetme basarisiz" toast'i gorur ama kayit aslinda olmus).
 *
 * Bu katman $fetch'i axios'un sozlesmesiyle sarmalayarak o riski tamamen
 * ortadan kaldiriyor: store kodundaki tek degisiklik `this.$axios` ->
 * `legacyApi` olmak uzere mekanik kaliyor.
 *
 * useApi() uzerine kuruludur, yani baseURL "/api" ve Authorization
 * basligi (api/index.js token'i cerezden degil basliktan okuyor) otomatik
 * geliyor.
 *
 * GECICIDIR: yeni kod dogrudan useApi() kullanmali. Bu katman yalnizca
 * tasinan Vuex store'larinin davranisini birebir korumak icin var.
 */

export interface LegacyResponse<T = any> {
  data: T
  status: number
}

function wrap<T>(data: T, status = 200): LegacyResponse<T> {
  return { data, status }
}

export function useLegacyApi() {
  const api = useApi()

  async function request<T>(
    url: string,
    opts: Record<string, unknown> = {},
  ): Promise<LegacyResponse<T>> {
    /*
     * axios HTTP hata kodlarinda reject eder, $fetch de eder -- bu yuzden
     * davranis ayni. Ancak store kodlarinin cogu .catch() KULLANMIYOR
     * (orijinalde de kullanmiyordu), bu yuzden reject'ler burada
     * yutulmuyor; cagiran taraf ne yapiyorsa aynisi oluyor.
     */
    const data = await api<T>(url, opts as any)
    return wrap(data)
  }

  return {
    get: <T = any>(url: string, opts?: Record<string, unknown>) =>
      request<T>(url, { ...opts, method: "GET" }),

    post: <T = any>(url: string, body?: unknown, opts?: Record<string, unknown>) =>
      request<T>(url, { ...opts, method: "POST", body }),

    put: <T = any>(url: string, body?: unknown, opts?: Record<string, unknown>) =>
      request<T>(url, { ...opts, method: "PUT", body }),

    delete: <T = any>(url: string, opts?: Record<string, unknown>) =>
      request<T>(url, { ...opts, method: "DELETE" }),
  }
}
