/* ==========================================================================
   AcenteTB + SiparislerTB.AcenteID + SiparisEtaHatirlatmaTB
   --------------------------------------------------------------------------
   Container Follow ekranindaki "Agency" alanini ve Eta hatirlatma maillerini
   besler. Tek seferde calistirilir, tekrar calistirmak zararsizdir:

     node api/sql/run.cjs api/sql/AcenteTB.sql

   Script calistirilmazsa uygulama hata vermez; Agency dropdown'i bos gelir
   ve hatirlatma maili gonderilmez (bkz. api/index.js, acenteTakipReady).

   1) AcenteTB          -> acente adi + konteyner takip sitesi adresi
   2) SiparislerTB.AcenteID -> siparisin hangi acenteden yuklendigi
   3) SiparisEtaHatirlatmaTB -> gonderilen hatirlatma maillerinin kaydi
                                (ayni PO/esik icin ikinci mail atilmaz)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1) AcenteTB
   --------------------------------------------------------------------------
   TakipUrl, konteyner numarasiyla sorgulama yapilan sayfanin adresidir.
   Icinde {KONTEYNER} gecerse uygulama bu yeri konteyner numarasiyla
   degistirir; gecmezse adres oldugu gibi yeni sekmede acilir.
   -------------------------------------------------------------------------- */

if not exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[AcenteTB]')
     and type = N'U'
)
begin
  create table [dbo].[AcenteTB] (
    [ID]          int identity(1, 1) not null,
    [AcenteAdi]   nvarchar(150) not null,
    [TakipUrl]    nvarchar(500) null,
    [Aktif]       bit not null constraint DF_AcenteTB_Aktif default (1),
    [KayitTarihi] datetime not null constraint DF_AcenteTB_KayitTarihi default (getdate()),
    constraint PK_AcenteTB primary key clustered ([ID]),
    constraint UQ_AcenteTB_AcenteAdi unique ([AcenteAdi])
  );

  print 'AcenteTB tablosu olusturuldu.';
end
else
begin
  print 'AcenteTB tablosu zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   Baslangic listesi
   --------------------------------------------------------------------------
   Bu blok EKLEMELIDIR, silmez: listede olmayan satirlariniza dokunmaz,
   elle degistirdiginiz TakipUrl degerlerini de ezmez. Boylece script tekrar
   calistirildiginda kendi duzenlemeleriniz korunur.

   Yeni acente eklemek:
     insert into AcenteTB (AcenteAdi, TakipUrl)
     values (N'Ornek Acente', N'https://ornek.com/track?container={KONTEYNER}')

   Takip adresini degistirmek:
     update AcenteTB set TakipUrl = N'https://...' where AcenteAdi = N'Arkas Line'

   Listeden kaldirmak (gecmis siparislerin kaydi bozulmasin diye silmeyin):
     update AcenteTB set Aktif = 0 where AcenteAdi = N'Arkas Line'
   -------------------------------------------------------------------------- */

declare @acente table (
  [AcenteAdi] nvarchar(150) primary key,
  [TakipUrl]  nvarchar(500)
);
insert into @acente ([AcenteAdi], [TakipUrl])
values
  (N'Maersk',        N'https://www.maersk.com/tracking/{KONTEYNER}'),
  (N'MSC',           N'https://www.msc.com/en/track-a-shipment?agencyPath=msc&trackingNumber={KONTEYNER}'),
  (N'CMA CGM',       N'https://www.cma-cgm.com/ebusiness/tracking/search?SearchBy=Container&Reference={KONTEYNER}'),
  (N'Hapag-Lloyd',   N'https://www.hapag-lloyd.com/en/online-business/track/track-by-container-solution.html?container={KONTEYNER}'),
  (N'Arkas Line',    N'https://www.arkasline.com.tr/en/online-services/cargo-tracking'),
  (N'Evergreen',     N'https://ct.shipmentlink.com/servlet/TDB1_CargoTracking.do?TYPE=CT&CNTR_NO={KONTEYNER}'),
  (N'ONE',           N'https://ecomm.one-line.com/one-ecom/manage-shipment/cargo-tracking?dcFlag=CONTAINER&dcValue={KONTEYNER}'),
  (N'COSCO',         N'https://elines.coscoshipping.com/ebusiness/cargoTracking?trackingType=CONTAINER&number={KONTEYNER}'),
  (N'Hyundai (HMM)', N'https://www.hmm21.com/company.do?sessionLocale=en'),
  (N'Yang Ming',     N'https://www.yangming.com/e-service/Track_Trace/track_trace_cargo_tracking.aspx'),
  (N'ZIM',           N'https://www.zim.com/tools/track-a-shipment?consnumber={KONTEYNER}'),
  (N'Turkon Line',   N'https://www.turkon.com/en/tracking'),
  (N'Medkon Lines',  N'https://www.medkonlines.com/en/cargo-tracking'),
  (N'Admiral Denizcilik', null),
  (N'Diger',         null);

insert into [dbo].[AcenteTB] ([AcenteAdi], [TakipUrl])
select a.AcenteAdi, a.TakipUrl
  from @acente a
 where not exists (
   select 1 from [dbo].[AcenteTB] t where t.AcenteAdi = a.AcenteAdi
 );

declare @satir int = (select count(*) from [dbo].[AcenteTB]);
print concat('AcenteTB satir sayisi: ', @satir);
go

/* --------------------------------------------------------------------------
   2) SiparislerTB.AcenteID
   --------------------------------------------------------------------------
   Yabanci anahtar bilerek eklenmedi: gecmis veride temizlenmemis kayitlar
   olabilir ve AcenteTB satiri pasife alindiginda update bloklanmamali.
   Uygulama tarafinda left join ile okunur, bos olmasi normaldir.
   -------------------------------------------------------------------------- */

if not exists (
  select 1 from sys.columns
   where object_id = object_id(N'[dbo].[SiparislerTB]')
     and name = N'AcenteID'
)
begin
  alter table [dbo].[SiparislerTB] add [AcenteID] int null;
  print 'SiparislerTB.AcenteID kolonu eklendi.';
end
else
begin
  print 'SiparislerTB.AcenteID kolonu zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   3) SiparisEtaHatirlatmaTB
   --------------------------------------------------------------------------
   Eta'ya 10 / 5 / 3 / 1 gun kalinca gonderilen maillerin kaydi. Benzersiz
   kisit (SiparisNo, Esik, Eta) uzerindedir:
     - Ayni PO icin ayni esikte ikinci mail gitmez (sunucu yeniden baslasa,
       PM2 birden fazla worker calistirsa veya kontrol gun icinde birkac kez
       tekrarlansa bile).
     - Eta degistirilirse anahtar da degisir, yeni tarih icin hatirlatmalar
       bastan isler. Istenen davranis budur.
   -------------------------------------------------------------------------- */

if not exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[SiparisEtaHatirlatmaTB]')
     and type = N'U'
)
begin
  create table [dbo].[SiparisEtaHatirlatmaTB] (
    [ID]              int identity(1, 1) not null,
    [SiparisNo]       nvarchar(150) not null,
    [Esik]            int not null,   -- 10 / 5 / 3 / 1 (Eta'ya kalan gun)
    [Eta]             date not null,
    [GonderimTarihi]  datetime not null constraint DF_SiparisEtaHatirlatmaTB_Gonderim default (getdate()),
    constraint PK_SiparisEtaHatirlatmaTB primary key clustered ([ID]),
    constraint UQ_SiparisEtaHatirlatmaTB unique ([SiparisNo], [Esik], [Eta])
  );

  print 'SiparisEtaHatirlatmaTB tablosu olusturuldu.';
end
else
begin
  print 'SiparisEtaHatirlatmaTB tablosu zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   Kurulum ozeti
   -------------------------------------------------------------------------- */

select
    (select count(*) from [dbo].[AcenteTB]) as AcenteSayisi,
    (select count(*) from [dbo].[AcenteTB] where Aktif = 1) as AktifAcente,
    (select count(*) from sys.columns
      where object_id = object_id(N'[dbo].[SiparislerTB]')
        and name = N'AcenteID') as AcenteID_Kolonu,
    (select count(*) from [dbo].[SiparisEtaHatirlatmaTB]) as HatirlatmaKaydi;
go

select ID, AcenteAdi, TakipUrl, Aktif from [dbo].[AcenteTB] order by AcenteAdi;
go
