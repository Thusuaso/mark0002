/*
 * Olcum ozeti -- gecici teshis araci (bkz. middleware/0a.perf-timing.ts).
 *
 * Tarayicida ya da curl ile:
 *     http://localhost:3100/__perf
 *     http://localhost:3100/__perf?sort=max&limit=30
 *
 * Donen tablo yol basina toplanmis: istek sayisi, toplam sure, ortalama
 * ve en yavas tek istek (maxPath ile birlikte, boylece hangi parametre
 * yavasladi gorulebiliyor).
 *
 * sort=total (varsayilan) toplam yuku gosterir -- "en cok zamani nerede
 * harciyoruz". sort=max tek seferlik en yavas ucu, sort=avg ortalamayi
 * verir. Optimizasyon icin genellikle `total` dogru siralama: 20 ms'lik
 * ama 500 kez cagrilan bir uc, 2 sn'lik ama tek cagrilandan daha cok
 * zaman yiyor.
 *
 * `?reset=1` sayaclari sifirlar (bir senaryoyu izole olcmek icin).
 *
 * GUVENLIK: olcum kapaliyken (uretimde PERF_LOG=1 verilmediyse) bu uc
 * 404 donuyor, yani yanlislikla aciga cikmiyor.
 */
import { perfStats } from "../middleware/0a.perf-timing"

const ENABLED = import.meta.dev || process.env.PERF_LOG === "1"

export default defineEventHandler((event) => {
  if (!ENABLED) {
    throw createError({ statusCode: 404, statusMessage: "Not Found" })
  }

  const q = getQuery(event)

  if (q.reset) {
    const n = perfStats.size
    perfStats.clear()
    return { reset: true, temizlenen: n }
  }

  const sort = String(q.sort || "total")
  const limit = Number(q.limit || 25)

  const rows = [...perfStats.entries()].map(([key, r]) => ({
    uc: key,
    adet: r.count,
    toplamMs: Math.round(r.total),
    ortMs: Math.round(r.total / r.count),
    maxMs: Math.round(r.max),
    enYavasYol: r.maxPath,
  }))

  const cmp: Record<string, (a: typeof rows[0], b: typeof rows[0]) => number> = {
    total: (a, b) => b.toplamMs - a.toplamMs,
    max: (a, b) => b.maxMs - a.maxMs,
    avg: (a, b) => b.ortMs - a.ortMs,
    count: (a, b) => b.adet - a.adet,
  }

  rows.sort(cmp[sort] ?? cmp.total)

  return {
    siralama: sort,
    toplamUc: rows.length,
    toplamIstek: rows.reduce((s, r) => s + r.adet, 0),
    toplamSureMs: rows.reduce((s, r) => s + r.toplamMs, 0),
    satirlar: rows.slice(0, limit),
  }
})
