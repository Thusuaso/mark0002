/* ==========================================================================
   SiparislerTB.GemiKalkisTarihi - geminin limandan kalkis tarihi
   --------------------------------------------------------------------------
   Tek seferde calistirilir, tekrar calistirmak zararsizdir.

   Container Follow ekranina (operation/follow) "Departure Date" alanini
   ekler: listede bir kolon, duzenleme formunda bir takvim.

   NOT: uretim veritabaninda kolon ZATEN VARDI (eski sistemden kalma);
   bu betik orada "zaten mevcut" deyip gecer. Sifirdan kurulan bir
   veritabani icin ve kolonun ne ise yaradigini kayit altina almak
   icin duruyor.

   [!] Liste sorgusu kolonu DOGRUDAN seciyor (acente alanindaki gibi
   bir "var mi" kontrolu YOK, cunku bu kolon opsiyonel bir ozellik
   degil ekranin parcasi). Kolon olmayan bir veritabaninda Container
   Follow listesi 500 doner -- yeni kurulumda betik once calistirilir.

   Calistirma: SSMS'te ya da
     sqlcmd -S <sunucu> -d <veritabani> -U <kullanici> -P <sifre> \
            -i api/sql/SiparislerTB_GemiKalkisTarihi.sql

   Tasarim notlari
     - Tip `date`, `datetime` DEGIL: girilen sey bir gun, saat bilgisi
       yok. Ayni ekrandaki Eta de date; ikisi karsilastirildiginda saat
       farkinin bir gun kaydirmamasi icin tip ayni tutuldu
       (bkz. api/index.js etaKalanGun).
     - null birakilabilir: tarih henuz belli olmayan siparisler var ve
       "bilinmiyor" ile "bugun" ayrilmali.
     - Eta'daki 1900-01-01 yer tutucusu BURADA YOK. O, eski formlardan
       kalma bir aliskanlik ve uygulama onu her yerde ozel olarak bos
       saymak zorunda kaliyor (ETA_PLACEHOLDER). Yeni kolon bastan
       null kullaniyor.
   ========================================================================== */

if not exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[SiparislerTB]')
     and type = N'U'
)
begin
  raiserror('SiparislerTB bulunamadi. Yanlis veritabani olabilir.', 16, 1);
end
go

if not exists (
  select 1 from sys.columns
   where object_id = object_id(N'[dbo].[SiparislerTB]')
     and name = N'GemiKalkisTarihi'
)
begin
  alter table [dbo].[SiparislerTB] add
    [GemiKalkisTarihi] date null;  -- geminin limandan kalkis gunu
  print 'SiparislerTB.GemiKalkisTarihi eklendi.';
end
else
begin
  print 'SiparislerTB.GemiKalkisTarihi zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   Kurulum ozeti
   -------------------------------------------------------------------------- */

declare @dolu bigint = (
  select count(*) from [dbo].[SiparislerTB] where [GemiKalkisTarihi] is not null
);
print concat('GemiKalkisTarihi dolu satir: ', @dolu);
go
