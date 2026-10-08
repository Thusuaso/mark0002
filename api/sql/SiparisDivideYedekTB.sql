/* ==========================================================================
   SiparisDivideYedekTB
   --------------------------------------------------------------------------
   Divide (siparis bolme) islemi oncesindeki durumun yedegi.

   Her bolme isleminde, veriye dokunulmadan once bir satir yazilir:
     - SiparisJson : SiparislerTB'deki baslik satirinin tamami
     - UrunlerJson : SiparisUrunTB'deki urun satirlarinin tamami
     - FinansJson  : o musteriye ait finans tablosunun o andaki hali

   Yedek, bolme ile ayni transaction icinde yazilir. Bolme geri alinirsa
   yedek satiri da geri alinir (zaten veri degismemis olur).

   Bolme islemi finans tablolarini DEGISTIRMEZ; FinansJson geri yukleme
   icin degil, "bolmeden once musterinin tablosu neydi" karsilastirmasi
   icindir.

   Bu script'i bir kez calistirmak gerekir. Tablo yoksa bolme islemi
   bastan reddedilir, yani yedeksiz bolme yapilmaz.
   ========================================================================== */

if not exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[SiparisDivideYedekTB]')
     and type = N'U'
)
begin
  create table [dbo].[SiparisDivideYedekTB] (
    [ID]          int identity(1, 1) not null,
    [SiparisNo]   nvarchar(100)  not null,  -- bolunen siparis
    [GidenPo]     nvarchar(100)  null,      -- bolme sonucu giden numara
    [KalanPo]     nvarchar(100)  null,      -- bolme sonucu kalan numara
    [MusteriID]   int            null,
    [Tarih]       datetime       not null constraint [DF_SiparisDivideYedekTB_Tarih] default (getdate()),
    [KullaniciID] int            null,      -- bolmeyi yapan kullanici
    [SiparisJson] nvarchar(max)  null,
    [UrunlerJson] nvarchar(max)  null,
    [FinansJson]  nvarchar(max)  null,
    constraint [PK_SiparisDivideYedekTB] primary key clustered ([ID] asc)
  );

  create index [IX_SiparisDivideYedekTB_SiparisNo]
    on [dbo].[SiparisDivideYedekTB] ([SiparisNo] asc, [Tarih] desc);

  print 'SiparisDivideYedekTB olusturuldu.';
end
else
begin
  print 'SiparisDivideYedekTB zaten var, degisiklik yapilmadi.';
end
