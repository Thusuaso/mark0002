/* ==========================================================================
   UretimTBKasaGrup - ortak (tek fiziksel) kasa gruplari
   --------------------------------------------------------------------------
   Tek seferde calistirilir, tekrar calistirmak zararsizdir:

     node api/sql/run.cjs api/sql/UretimTBKasaGrup.sql

   Calistirildiktan sonra iki pm2 surecini de yeniden baslatmak gerekir
   (NuxtAppName ve MekmarSocket); aksi halde ozellik sessizce kapali kalir.

   Script calistirilmazsa uygulama hata vermez: seleksiyon formundaki
   "Ortak Kasalar" alani gorunmez, check listesi ve ceki Excel'i eskisi
   gibi her satiri ayri kasa sayar (bkz. api/index.js kasaGrupReady).

   Tasarim notlari
     - Bir fiziksel kasanin icine birden fazla urun girdiginde her urun
       seleksiyonda ayri satir (ayri KasaNo) olarak kaydediliyor. KasaGrupNo
       bu satirlari tek kasa olarak baglar.
     - KasaGrupNo, grubun en kucuk kasa numarasidir ve grubun TUM satirlarina
       ayni deger yazilir. Boylece "ilk bastaki numara" tek bir yerden gelir,
       sorgular ek birlestirme yapmadan gruplayabilir.
     - null = tek basina duran kasa. Gruplari ayri bir tabloda tutmak yerine
       tek kolon secildi: check listesi ve ceki Excel'i UretimTB'yi tek
       sorguda okuyor, ek join maliyeti olmuyor.
     - Grup bozuldugunda (tek uye kalirsa) kolon tekrar null'a dondurulur;
       boylece "grup" her zaman en az iki satir demektir.
   ========================================================================== */

if not exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[UretimTB]')
     and type = N'U'
)
begin
  raiserror('UretimTB bulunamadi. Yanlis veritabani olabilir.', 16, 1);
end
go

/* --------------------------------------------------------------------------
   Grup alani
   --------------------------------------------------------------------------
   KasaNo nvarchar oldugu icin grup numarasi da nvarchar tutulur; ayni
   bicimde karsilastirilabilsin diye uzunluk KasaNo ile ayni secildi. */

if not exists (
  select 1 from sys.columns
   where object_id = object_id(N'[dbo].[UretimTB]')
     and name = N'KasaGrupNo'
)
begin
  alter table [dbo].[UretimTB] add
    [KasaGrupNo] nvarchar(50) null;  -- grubun en kucuk KasaNo'su, tek ise null
  print 'UretimTB.KasaGrupNo eklendi.';
end
else
begin
  print 'UretimTB.KasaGrupNo zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   Grup indeksi
   --------------------------------------------------------------------------
   Grup uyeleri hem seleksiyonda (ortaklik kurma/bozma) hem check listesinde
   KasaGrupNo uzerinden toplaniyor. Gruplu satirlar azinlikta oldugu icin
   filtrelenmis indeks yeterli. */

if not exists (
  select 1 from sys.indexes
   where object_id = object_id(N'[dbo].[UretimTB]')
     and name = N'IX_UretimTB_KasaGrupNo'
)
begin
  create nonclustered index [IX_UretimTB_KasaGrupNo]
    on [dbo].[UretimTB] ([KasaGrupNo])
    include ([KasaNo], [SiparisAciklama])
    where [KasaGrupNo] is not null;
  print 'IX_UretimTB_KasaGrupNo olusturuldu.';
end
else
begin
  print 'IX_UretimTB_KasaGrupNo zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   Kurulum ozeti
   -------------------------------------------------------------------------- */

declare @gruplu bigint = (
  select count(*) from [dbo].[UretimTB] where [KasaGrupNo] is not null
);
declare @grup bigint = (
  select count(distinct [KasaGrupNo]) from [dbo].[UretimTB]
   where [KasaGrupNo] is not null
);
print concat('Gruplu satir: ', @gruplu, ' / grup sayisi: ', @grup);
go
