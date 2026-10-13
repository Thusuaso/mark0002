/* ==========================================================================
   SohbetMesajEk - sohbet mesajlarina goruntu eki alanlari
   --------------------------------------------------------------------------
   Tek seferde calistirilir, tekrar calistirmak zararsizdir:

     node api/sql/run.cjs api/sql/SohbetMesajEk.sql

   Once api/sql/SohbetMesajTB.sql calistirilmis olmalidir.

   Script calistirilmazsa uygulama hata vermez: ek gonderme dugmeleri
   gorunmez, metin sohbeti aynen calisir (bkz. api/index.js chatDosyaReady,
   api/server.js dosyaKolonuVar).

   Tasarim notlari
     - Dosyanin kendisi veritabaninda DEGIL, DigitalOcean Spaces'te durur;
       burada yalnizca nesne anahtari (DosyaKey) tutulur. Anahtar istemciye
       hic verilmez: goruntu /api/chat/file/<mesajID> ucundan, yalnizca
       gonderen ve alici icin acilan 5 dakikalik imzali baglanti ile gelir.
     - Anahtar bicimi: chat/<gonderenID>/<zaman>-<rastgele>.<uzanti>
       Isim sunucuda uretilir; istemci kendi dosya adini dayatamaz, boylece
       ayni adli goruntuler birbirini ezmez.
     - Mesaj artik null olabilir: tek basina goruntu gonderilebilir. Metin ve
       goruntu birlikte de gonderilebilir (goruntu + alt yazi).
     - 90 gunluk temizlik (api/index.js sohbetTemizle) satiri silerken
       Spaces'teki nesneyi de siler; aksi halde mesaj gider, goruntu depoda
       sonsuza kadar kalirdi.
   ========================================================================== */

if not exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[SohbetMesajTB]')
     and type = N'U'
)
begin
  raiserror(
    'SohbetMesajTB yok. Once api/sql/SohbetMesajTB.sql calistirilmali.',
    16, 1
  );
end
go

/* --------------------------------------------------------------------------
   Ek alanlari
   -------------------------------------------------------------------------- */

if not exists (
  select 1 from sys.columns
   where object_id = object_id(N'[dbo].[SohbetMesajTB]')
     and name = N'DosyaKey'
)
begin
  alter table [dbo].[SohbetMesajTB] add
    [DosyaKey]   nvarchar(400) null,  -- Spaces nesne anahtari
    [DosyaTur]   nvarchar(100) null,  -- image/png, image/jpeg, image/webp
    [DosyaAd]    nvarchar(255) null,  -- kullaniciya gosterilen ad
    [DosyaBoyut] int null;            -- bayt
  print 'SohbetMesajTB dosya alanlari eklendi.';
end
else
begin
  print 'SohbetMesajTB dosya alanlari zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   Mesaj artik zorunlu degil
   --------------------------------------------------------------------------
   Tek basina goruntu gonderilebilmesi icin kolon null kabul eder. Mevcut
   satirlar etkilenmez; uzunluk ve karakter kumesi aynen korunur. */

if exists (
  select 1 from sys.columns
   where object_id = object_id(N'[dbo].[SohbetMesajTB]')
     and name = N'Mesaj'
     and is_nullable = 0
)
begin
  alter table [dbo].[SohbetMesajTB] alter column [Mesaj] nvarchar(4000) null;
  print 'SohbetMesajTB.Mesaj artik null kabul ediyor.';
end
else
begin
  print 'SohbetMesajTB.Mesaj zaten null kabul ediyor.';
end
go

/* --------------------------------------------------------------------------
   Temizlik indeksi
   --------------------------------------------------------------------------
   Gunluk temizlik, silinen satirlarin Spaces anahtarlarini toplar. Eki olan
   satirlar azinlikta oldugu icin filtrelenmis indeks yeterli ve ucuzdur. */

if not exists (
  select 1 from sys.indexes
   where object_id = object_id(N'[dbo].[SohbetMesajTB]')
     and name = N'IX_SohbetMesajTB_Dosya'
)
begin
  create nonclustered index [IX_SohbetMesajTB_Dosya]
    on [dbo].[SohbetMesajTB] ([GonderimTarihi])
    include ([DosyaKey])
    where [DosyaKey] is not null;
  print 'IX_SohbetMesajTB_Dosya olusturuldu.';
end
else
begin
  print 'IX_SohbetMesajTB_Dosya zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   Kurulum ozeti
   -------------------------------------------------------------------------- */

declare @kolon int = (
  select count(*) from sys.columns
   where object_id = object_id(N'[dbo].[SohbetMesajTB]')
     and name in (N'DosyaKey', N'DosyaTur', N'DosyaAd', N'DosyaBoyut')
);
declare @ekli bigint = (
  select count(*) from [dbo].[SohbetMesajTB] where [DosyaKey] is not null
);
print concat('Dosya alani sayisi: ', @kolon, ' / eki olan mesaj: ', @ekli);
go
