/* ==========================================================================
   KullaniciAktiflikTB - kullanicinin en son ne zaman aktif oldugu
   --------------------------------------------------------------------------
   Tek seferde calistirilir, tekrar calistirmak zararsizdir:

     node api/sql/run.cjs api/sql/KullaniciAktiflikTB.sql

   Script calistirilmazsa uygulama hata vermez: online/offline gostergesi
   calismaya devam eder, yalnizca "son gorulme" bilgisi bos gelir
   (bkz. api/index.js chatAktiflikReady, api/server.js aktiflikTablosuVar).

   NEDEN AYRI TABLO: KullaniciTB projenin en merkezi tablosu; sik guncellenen
   bir kolon eklemek yerine aktiflik ayri tutuluyor. Boylece kullanici
   kayitlari dokunulmadan kalir.

   SonAktif, kullanicinin GERCEK etkileşim zamanidir (fare/klavye/sekme
   odagi). Yalnizca baglanti acik olmasi aktiflik saymaz: sekmeyi acik
   birakip giden kullanici "online" degil "X dakika once aktif" gorunur.
   ========================================================================== */

if not exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[KullaniciAktiflikTB]')
     and type = N'U'
)
begin
  create table [dbo].[KullaniciAktiflikTB] (
    [KullaniciID] int not null,          -- KullaniciTB.ID
    [SonAktif]    datetime not null
      constraint DF_KullaniciAktiflikTB_SonAktif default (getutcdate()),
    constraint PK_KullaniciAktiflikTB primary key clustered ([KullaniciID])
  );

  print 'KullaniciAktiflikTB tablosu olusturuldu.';
end
else
begin
  print 'KullaniciAktiflikTB tablosu zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   Kurulum ozeti
   -------------------------------------------------------------------------- */

declare @satir int = (select count(*) from [dbo].[KullaniciAktiflikTB]);
print concat('KullaniciAktiflikTB kayit sayisi: ', @satir);
go

select
    a.KullaniciID,
    k.KullaniciAdi,
    a.SonAktif
  from [dbo].[KullaniciAktiflikTB] a
  left join [dbo].[KullaniciTB] k on k.ID = a.KullaniciID
 order by a.SonAktif desc;
go
