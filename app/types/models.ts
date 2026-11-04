/*
 * Kullanici -- GET /users'tan gelir.
 *
 * DIKKAT: endpoint YSifre (sifre) alanini da donuyor. Bu tip onu BILEREK
 * icermiyor; stores/shared.ts yaniti filtreliyor ki sifre tarayiciya
 * hic ulasmasin. Ayrintili aciklama orada.
 */
export interface AppUser {
  ID: number
  KullaniciAdi: string
  MailAdres: string | null
}

/* API'nin dondurdugu sekiller. Kaynak: api/index.js GET /suppliers */
export interface Supplier {
  ID: number
  FirmaAdi: string
  Telefon: string | null
  MailAdres: string | null
  Il: string | null
  Notlar: string | null
  ToplamTedarikci: number
}
