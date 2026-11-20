/* ==========================================================================
   PALET TAKIBI -- PaletTB + dort yardimci liste tablosu
   --------------------------------------------------------------------------
   Palet giris ekranini (/operation/palet) besler. Tek seferde calistirilir,
   tekrar calistirmak zararsizdir:

     node api/sql/run.cjs api/sql/PaletTB.sql

   Script calistirilmadan ekran ACILMAZ: liste ucu 500 doner.

   Tablolar
     1) PaletFirmaTB     -> firma adlari      (AutoComplete kaynagi)
     2) PaletEnTB        -> en degerleri      (AutoComplete kaynagi)
     3) PaletBoyTB       -> boy degerleri     (AutoComplete kaynagi)
     4) PaletKalinlikTB  -> kalinlik degerleri(AutoComplete kaynagi)
     5) PaletUrunTB      -> urun bilgileri    (AutoComplete kaynagi)
     6) PaletTB          -> paletin kendisi; yukaridakilerin HEPSINE
                            yabanci anahtarla bagli

   ==========================================================================
   TASARIM KARARLARI -- degistirmeden once okuyun
   ==========================================================================

   [1] NEDEN BES AYRI LISTE TABLOSU, TEK "DEGERLER" TABLOSU DEGIL
   Istek "En, Boy, Kalinlik ... AYRI AYRI" dedi ve her biri kendi
   AutoComplete'ini besliyor. Tek tabloda tur kolonuyla toplanabilirdi
   ("tur='en'"), ama o zaman benzersizlik kisiti (ayni deger iki kez
   girilmesin) tur+deger ciftine tasinir ve "sistemde zaten var" kontrolu
   her sorguda tur suzmek zorunda kalir. Bes tablo, bes bagimsiz UNIQUE.

   [2] UNIQUE KISITLARI ISIN KALBI
   Ekranin kurali: "yazdigim firma sistemde varsa UYARI, yoksa KAYDET".
   Bu kontrol istemcide de yapiliyor (anlik uyari icin) ama son soz
   veritabaninda: iki kullanici ayni anda ayni firmayi yazarsa istemci
   kontrolu ikisine de "yok" der. UNIQUE olmasa tabloda iki "Ayhan Mermer"
   olusur ve AutoComplete ayni adi iki kez gosterirdi.

   [3] OLCULER neden decimal(9,2)
   Bu projede olculer virgullu geliyor (20,3 x 40,5 gibi -- bkz.
   selection/input/Form.vue). int olsaydi 20,3 sessizce 20 olurdu.
   Iki ondalik basamak yeterli; 9 hane 1.000.000 cm'ye kadar yer verir.

   [4] M2 neden HESAPLANAN KOLON DEGIL
   Formul  Adet * En * Boy / 10000  ve En/Boy BU TABLODA DEGIL, liste
   tablolarinda (yabanci anahtar). Hesaplanan kolon baska tablodan deger
   okuyamaz. Bu yuzden M2 KAYITLI bir kolon; sunucu her kayit/guncellemede
   onu ISTEMCIDEN GELEN DEGERLE DEGIL, kendisi En/Boy/Adet'ten yeniden
   hesaplayarak yaziyor (api/index.js, /palet/save). Boylece ekranda
   gorunen anlik hesap ile kayitli deger ayrismiyor.
   /10000: cm x cm -> m2. Ayni donusum siparis tarafinda da kullaniliyor.

   [5] PaletNo neden HESAPLANAN KOLON
   Istek: "P0001 ile baslayacak, otomatik artacak". Iki yol vardi:
     (a) kayit sirasinda MAX(PaletNo)+1 okumak -- IKI KULLANICI AYNI
         ANDA kaydederse ikisi de ayni numarayi alir (yaris durumu);
         onlemek icin kilit/transaction gerekir.
     (b) IDENTITY'den TURETMEK -- numara ID'nin ta kendisi, yani
         benzersizligi veritabani garanti ediyor ve yaris durumu
         YAPISAL OLARAK imkansiz.
   (b) secildi. Silinen satirin numarasi tekrar kullanilmaz (P0003
   silinirse bir daha uretilmez) -- bu bir kayip degil, kazanc:
   numara kalici bir kimlik, iki farkli palet asla ayni numarayi
   tasimiyor.

   CASE'in gerekcesi: right('000' + cast(ID as varchar), 4) tek basina
   ID 10000'de '0000' verirdi (sagdan dort karakter). Dort hanenin
   ustune cikildiginda numara dogal olarak uzuyor: P9999 -> P10000.

   FORMAT(ID,'0000') KULLANILMADI: FORMAT kulture bagli oldugu icin
   NON-DETERMINISTIC sayilir ve persisted kolonda kullanilamaz.

   [6] KalinlikId neden NULL olabilir
   Diger dort alan paletin kimligi: firma, urun, en, boy olmadan kayit
   anlamsiz (ustelik M2 en/boy'a bagli). Kalinlik her zaman biliniyor
   olmayabilir; "bilinmiyor" ile 0 ayrilsin diye null.

   [7] Kullanildi neden bit DEFAULT 0
   Yeni girilen palet tanimi geregi kullanilmamistir. Ucuncu bir durum
   ("bilinmiyor") yok -- ekranda Tumu / Kullanilan / Kullanilmayan diye
   UC secenek var ama "Tumu" bir durum degil, suzgecin kapali hali.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1) PaletFirmaTB
   -------------------------------------------------------------------------- */

if not exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[PaletFirmaTB]')
     and type = N'U'
)
begin
  create table [dbo].[PaletFirmaTB] (
    [ID]          int identity(1, 1) not null,
    [FirmaAdi]    nvarchar(200) not null,
    [KayitTarihi] datetime not null
                  constraint DF_PaletFirmaTB_KayitTarihi default (getdate()),
    constraint PK_PaletFirmaTB primary key clustered ([ID]),
    constraint UQ_PaletFirmaTB_FirmaAdi unique ([FirmaAdi])
  );

  print 'PaletFirmaTB olusturuldu.';
end
else
begin
  print 'PaletFirmaTB zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   2) PaletEnTB
   -------------------------------------------------------------------------- */

if not exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[PaletEnTB]')
     and type = N'U'
)
begin
  create table [dbo].[PaletEnTB] (
    [ID]          int identity(1, 1) not null,
    [Deger]       decimal(9, 2) not null,
    [KayitTarihi] datetime not null
                  constraint DF_PaletEnTB_KayitTarihi default (getdate()),
    constraint PK_PaletEnTB primary key clustered ([ID]),
    constraint UQ_PaletEnTB_Deger unique ([Deger])
  );

  print 'PaletEnTB olusturuldu.';
end
else
begin
  print 'PaletEnTB zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   3) PaletBoyTB
   -------------------------------------------------------------------------- */

if not exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[PaletBoyTB]')
     and type = N'U'
)
begin
  create table [dbo].[PaletBoyTB] (
    [ID]          int identity(1, 1) not null,
    [Deger]       decimal(9, 2) not null,
    [KayitTarihi] datetime not null
                  constraint DF_PaletBoyTB_KayitTarihi default (getdate()),
    constraint PK_PaletBoyTB primary key clustered ([ID]),
    constraint UQ_PaletBoyTB_Deger unique ([Deger])
  );

  print 'PaletBoyTB olusturuldu.';
end
else
begin
  print 'PaletBoyTB zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   4) PaletKalinlikTB
   -------------------------------------------------------------------------- */

if not exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[PaletKalinlikTB]')
     and type = N'U'
)
begin
  create table [dbo].[PaletKalinlikTB] (
    [ID]          int identity(1, 1) not null,
    [Deger]       decimal(9, 2) not null,
    [KayitTarihi] datetime not null
                  constraint DF_PaletKalinlikTB_KayitTarihi default (getdate()),
    constraint PK_PaletKalinlikTB primary key clustered ([ID]),
    constraint UQ_PaletKalinlikTB_Deger unique ([Deger])
  );

  print 'PaletKalinlikTB olusturuldu.';
end
else
begin
  print 'PaletKalinlikTB zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   5) PaletUrunTB
   -------------------------------------------------------------------------- */

if not exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[PaletUrunTB]')
     and type = N'U'
)
begin
  create table [dbo].[PaletUrunTB] (
    [ID]          int identity(1, 1) not null,
    [UrunBilgisi] nvarchar(300) not null,
    [KayitTarihi] datetime not null
                  constraint DF_PaletUrunTB_KayitTarihi default (getdate()),
    constraint PK_PaletUrunTB primary key clustered ([ID]),
    constraint UQ_PaletUrunTB_UrunBilgisi unique ([UrunBilgisi])
  );

  print 'PaletUrunTB olusturuldu.';
end
else
begin
  print 'PaletUrunTB zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   6) PaletTB
   --------------------------------------------------------------------------
   Yabanci anahtarlarda ON DELETE/UPDATE YOK (varsayilan NO ACTION):
   kullanilan bir firmayi silmeye calismak HATA verir. Istenen de bu --
   paletleri sessizce sahipsiz (ya da silinmis) hale getirmek yerine
   "bu firma kullaniliyor" demesi dogru.
   -------------------------------------------------------------------------- */

if not exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[PaletTB]')
     and type = N'U'
)
begin
  create table [dbo].[PaletTB] (
    [ID]          int identity(1, 1) not null,

    /* P0001, P0002, ... -- ID'den turetiliyor; gerekcesi basliktaki [5] */
    [PaletNo]     as ('P' + case
                              when [ID] < 10000
                                then right('000' + cast([ID] as varchar(12)), 4)
                              else cast([ID] as varchar(12))
                            end) persisted not null,

    [Tarih]       date not null,

    [FirmaId]     int not null,
    [EnId]        int not null,
    [BoyId]       int not null,
    [KalinlikId]  int null,          -- bilinmiyor olabilir, bkz. [6]
    [UrunId]      int not null,

    [Adet]        int not null,

    /* Sunucu her kayitta En/Boy/Adet'ten YENIDEN hesaplayip yaziyor;
       gerekcesi basliktaki [4]. */
    [M2]          decimal(18, 2) not null
                  constraint DF_PaletTB_M2 default (0),

    [Kullanildi]  bit not null
                  constraint DF_PaletTB_Kullanildi default (0),

    [KayitTarihi] datetime not null
                  constraint DF_PaletTB_KayitTarihi default (getdate()),
    [KullaniciID] int null,

    constraint PK_PaletTB primary key clustered ([ID]),
    constraint UQ_PaletTB_PaletNo unique ([PaletNo]),

    constraint FK_PaletTB_Firma
      foreign key ([FirmaId])    references [dbo].[PaletFirmaTB] ([ID]),
    constraint FK_PaletTB_En
      foreign key ([EnId])       references [dbo].[PaletEnTB] ([ID]),
    constraint FK_PaletTB_Boy
      foreign key ([BoyId])      references [dbo].[PaletBoyTB] ([ID]),
    constraint FK_PaletTB_Kalinlik
      foreign key ([KalinlikId]) references [dbo].[PaletKalinlikTB] ([ID]),
    constraint FK_PaletTB_Urun
      foreign key ([UrunId])     references [dbo].[PaletUrunTB] ([ID]),

    constraint CK_PaletTB_Adet check ([Adet] > 0)
  );

  print 'PaletTB olusturuldu.';
end
else
begin
  print 'PaletTB zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   Indeksler
   --------------------------------------------------------------------------
   Kullanildi: ekranin ust kismindaki Tumu / Kullanilan / Kullanilmayan
   suzgeci dogrudan bu kolonu soruyor.
   Tarih: liste tarihe gore azalan siralaniyor.
   -------------------------------------------------------------------------- */

if not exists (
  select 1 from sys.indexes
   where name = N'IX_PaletTB_Kullanildi'
     and object_id = object_id(N'[dbo].[PaletTB]')
)
begin
  create nonclustered index IX_PaletTB_Kullanildi
    on [dbo].[PaletTB] ([Kullanildi]) include ([Tarih]);
  print 'IX_PaletTB_Kullanildi olusturuldu.';
end
go

if not exists (
  select 1 from sys.indexes
   where name = N'IX_PaletTB_Tarih'
     and object_id = object_id(N'[dbo].[PaletTB]')
)
begin
  create nonclustered index IX_PaletTB_Tarih
    on [dbo].[PaletTB] ([Tarih] desc);
  print 'IX_PaletTB_Tarih olusturuldu.';
end
go

/* --------------------------------------------------------------------------
   Kurulum ozeti
   -------------------------------------------------------------------------- */

/*
 * [!] SAYILAR ONCE DEGISKENE ALINIYOR.
 * `print concat('...', (select count(*) ...))` CALISMIYOR:
 *   "Subqueries are not allowed in this context.
 *    Only scalar expressions are allowed."
 * PRINT yalnizca skaler bir ifade kabul ediyor; alt sorgu -- sonucu tek
 * bir deger olsa bile -- orada gecerli degil. Atama (`set @x = (select
 * ...)`) ise gecerli, bu yuzden sayilar once okunuyor sonra basiliyor.
 */
declare @firma int, @en int, @boy int, @kalinlik int, @urun int, @palet int;

set @firma    = (select count(*) from [dbo].[PaletFirmaTB]);
set @en       = (select count(*) from [dbo].[PaletEnTB]);
set @boy      = (select count(*) from [dbo].[PaletBoyTB]);
set @kalinlik = (select count(*) from [dbo].[PaletKalinlikTB]);
set @urun     = (select count(*) from [dbo].[PaletUrunTB]);
set @palet    = (select count(*) from [dbo].[PaletTB]);

print '--- Palet tablolari ---';
print concat('PaletFirmaTB    : ', @firma,    ' satir');
print concat('PaletEnTB       : ', @en,       ' satir');
print concat('PaletBoyTB      : ', @boy,      ' satir');
print concat('PaletKalinlikTB : ', @kalinlik, ' satir');
print concat('PaletUrunTB     : ', @urun,     ' satir');
print concat('PaletTB         : ', @palet,    ' satir');
go
