/* ==========================================================================
   SohbetMesajTB - sirket ici birebir mesajlasma
   --------------------------------------------------------------------------
   Tek seferde calistirilir, tekrar calistirmak zararsizdir:

     node api/sql/run.cjs api/sql/SohbetMesajTB.sql

   Script calistirilmazsa uygulama hata vermez: sohbet paneli "sohbet
   kurulmamis" durumunda acilir, mesaj gonderilemez, online gostergesi
   yine calisir (bkz. api/index.js chatReady, api/server.js).

   Tasarim notlari
     - Yalnizca birebir yazisma. Grup/kanal yok, bu yuzden ayri bir sohbet
       tablosu tutulmuyor: taraflar GonderenID + AliciID ile belirlenir.
     - OkunduTarihi null ise mesaj okunmamistir. Birebir oldugu icin okuyan
       her zaman AliciID'dir, ayri bir okundu tablosu gerekmez.
     - Mesajlar SOHBET_SAKLAMA_GUN (90) gunden sonra temizlenir; temizligi
       api/index.js icindeki gunluk is yapar.
   ========================================================================== */

if not exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[SohbetMesajTB]')
     and type = N'U'
)
begin
  create table [dbo].[SohbetMesajTB] (
    [ID]             bigint identity(1, 1) not null,
    [GonderenID]     int not null,            -- KullaniciTB.ID
    [AliciID]        int not null,            -- KullaniciTB.ID
    [Mesaj]          nvarchar(4000) not null,
    [GonderimTarihi] datetime not null
      constraint DF_SohbetMesajTB_GonderimTarihi default (getdate()),
    [OkunduTarihi]   datetime null,           -- null = okunmadi
    constraint PK_SohbetMesajTB primary key clustered ([ID])
  );

  print 'SohbetMesajTB tablosu olusturuldu.';
end
else
begin
  print 'SohbetMesajTB tablosu zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   Indeksler
   --------------------------------------------------------------------------
   1) Okunmamis sayaci: navbar her acilista "bana gelen okunmamislar"i sorar.
   2) Yazisma gecmisi: iki kisi arasindaki mesajlar tarihe gore.
   3) Temizlik: 90 gunden eski kayitlarin taranmasi.
   -------------------------------------------------------------------------- */

if not exists (
  select 1 from sys.indexes
   where object_id = object_id(N'[dbo].[SohbetMesajTB]')
     and name = N'IX_SohbetMesajTB_Okunmamis'
)
begin
  create nonclustered index [IX_SohbetMesajTB_Okunmamis]
    on [dbo].[SohbetMesajTB] ([AliciID], [OkunduTarihi])
    include ([GonderenID], [GonderimTarihi]);
  print 'IX_SohbetMesajTB_Okunmamis olusturuldu.';
end
else
begin
  print 'IX_SohbetMesajTB_Okunmamis zaten mevcut.';
end
go

if not exists (
  select 1 from sys.indexes
   where object_id = object_id(N'[dbo].[SohbetMesajTB]')
     and name = N'IX_SohbetMesajTB_Yazisma'
)
begin
  create nonclustered index [IX_SohbetMesajTB_Yazisma]
    on [dbo].[SohbetMesajTB] ([GonderenID], [AliciID], [GonderimTarihi]);
  print 'IX_SohbetMesajTB_Yazisma olusturuldu.';
end
else
begin
  print 'IX_SohbetMesajTB_Yazisma zaten mevcut.';
end
go

if not exists (
  select 1 from sys.indexes
   where object_id = object_id(N'[dbo].[SohbetMesajTB]')
     and name = N'IX_SohbetMesajTB_GonderimTarihi'
)
begin
  create nonclustered index [IX_SohbetMesajTB_GonderimTarihi]
    on [dbo].[SohbetMesajTB] ([GonderimTarihi]);
  print 'IX_SohbetMesajTB_GonderimTarihi olusturuldu.';
end
else
begin
  print 'IX_SohbetMesajTB_GonderimTarihi zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   Kurulum ozeti
   -------------------------------------------------------------------------- */

declare @mesaj bigint = (select count(*) from [dbo].[SohbetMesajTB]);
declare @indeks int = (
  select count(*) from sys.indexes
   where object_id = object_id(N'[dbo].[SohbetMesajTB]')
     and name like N'IX_SohbetMesajTB%'
);
print concat('SohbetMesajTB mesaj sayisi: ', @mesaj, ' / indeks: ', @indeks);
go
