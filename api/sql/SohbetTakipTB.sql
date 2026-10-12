/* ==========================================================================
   SohbetTakipTB - "online olunca haber ver" listesi
   --------------------------------------------------------------------------
   Tek seferde calistirilir, tekrar calistirmak zararsizdir:

     node api/sql/run.cjs api/sql/SohbetTakipTB.sql

   Her kullanici, sohbet listesindeki yildiz dugmesiyle istedigi kisileri
   takibe alir. Takip edilen kisi cevrimdisiyken cevrimiciye gectiginde
   ekranin sag ustunde toast bildirimi cikar.

   Liste veritabaninda tutulur (tarayici hafizasinda degil), boylece baska
   bir bilgisayardan girildiginde de gecerlidir.

   Script calistirilmazsa uygulama hata vermez: yildiz dugmesi gorunmez,
   bildirim cikmaz, sohbetin kalani calismaya devam eder
   (bkz. api/index.js chatTakipReady).
   ========================================================================== */

if not exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[SohbetTakipTB]')
     and type = N'U'
)
begin
  create table [dbo].[SohbetTakipTB] (
    [KullaniciID]    int not null,   -- takibi yapan (KullaniciTB.ID)
    [TakipEdilenID]  int not null,   -- online olunca haber verilecek kisi
    [KayitTarihi]    datetime not null
      constraint DF_SohbetTakipTB_KayitTarihi default (getutcdate()),
    constraint PK_SohbetTakipTB primary key clustered
      ([KullaniciID], [TakipEdilenID])
  );

  print 'SohbetTakipTB tablosu olusturuldu.';
end
else
begin
  print 'SohbetTakipTB tablosu zaten mevcut.';
end
go

declare @satir int = (select count(*) from [dbo].[SohbetTakipTB]);
print concat('SohbetTakipTB kayit sayisi: ', @satir);
go
