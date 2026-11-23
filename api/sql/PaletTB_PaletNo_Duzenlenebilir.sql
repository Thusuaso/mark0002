/*
 * PaletNo HESAPLANAN KOLONDAN YAZILABILIR KOLONA
 *
 *   node api/sql/run.cjs api/sql/PaletTB_PaletNo_Duzenlenebilir.sql
 *
 * ------------------------------------------------------------------
 * NEDEN
 * ------------------------------------------------------------------
 * Istek: "ilk basta normal sekilde otomatik atayacak ama sonra update
 * yapacagim zaman o alani guncelleyebilmek istiyorum, sadece yeni alan
 * acma."
 *
 * PaletTB.sql karar [5]'te PaletNo HESAPLANAN (computed persisted) bir
 * kolon olarak tanimlanmisti: 'P' + ID. SQL Server hesaplanan kolona
 * YAZMAYA izin vermiyor, yani duzenlemek yapisal olarak imkansizdi.
 * Yeni kolon acmak istenmedigi icin kolonun KENDISI yazilabilir hale
 * getiriliyor.
 *
 * NUMARALAR DEGISMIYOR: mevcut satirlar ayni formulle (ID'den) geri
 * dolduruluyor, yani P0001 P0001 olarak kaliyor. Donusum numara
 * uretimini degistirmiyor, yalnizca uzerine yazilabilmesini sagliyor.
 *
 * ------------------------------------------------------------------
 * YARIS DURUMU NE OLDU -- karar [5]'in korudugu sey
 * ------------------------------------------------------------------
 * Karar [5] "MAX(PaletNo)+1 oku" yolunu reddetmisti: iki kullanici ayni
 * anda kaydederse ikisi de ayni numarayi alir. O garanti KAYBEDILMIYOR,
 * cunku numara hala IDENTITY'den (ID) turetiliyor -- sadece artik
 * veritabani kolonu degil, /palet/save ucu yaziyor: INSERT -> ID al ->
 * ayni islem (transaction) icinde PaletNo'yu yaz. ID benzersiz oldugu
 * icin ayni anda kaydeden iki kullanici farkli ID, dolayisiyla farkli
 * numara aliyor.
 *
 * ------------------------------------------------------------------
 * KOLON NEDEN NULL OLABILIR HALE GELIYOR
 * ------------------------------------------------------------------
 * INSERT aninda ID henuz BILINMIYOR, yani PaletNo da bilinmiyor; deger
 * ancak INSERT'ten SONRA yazilabiliyor. not null birakilsa INSERT'e bir
 * gecici deger vermek gerekirdi ve ayni anda kaydeden iki kullanici ayni
 * gecici degeri kullanip benzersizlik kisitini ihlal ederdi.
 *
 * Bu yuzden kolon null kabul ediyor ve benzersizlik FILTRELI INDEKSE
 * tasiniyor:
 *     where [PaletNo] is not null
 * Normal unique kisit SQL Server'da YALNIZCA BIR null'a izin veriyor --
 * iki es zamanli INSERT ikinci null'da patlardi. Filtreli indeks
 * null'lari saymaz, dolayisiyla es zamanli INSERT serbest, ama dolu
 * degerlerin benzersizligi aynen korunuyor.
 *
 * Satirin null kaldigi an INSERT ile UPDATE arasindaki an ve ikisi AYNI
 * TRANSACTION icinde; UPDATE basarisiz olursa INSERT de geri aliniyor,
 * yani kalici null bir satir olusmuyor.
 *
 * ------------------------------------------------------------------
 * BETIK TEKRAR CALISTIRILABILIR
 * ------------------------------------------------------------------
 * Her adim kendi kosuluna bakiyor; donusum zaten yapilmissa hicbir sey
 * yapmadan geciyor. GO'lar ZORUNLU: kolon silinip yeniden eklendikten
 * sonraki UPDATE ayni batch'te DERLENEMEZ (derleme aninda yeni kolon
 * henuz yok -> "Invalid column name"). run.cjs satir basindaki GO'lara
 * gore boluyor.
 */

/* ---------------------------------------------------------------- *
 * 1) Hesaplanan kolonu KALDIR, yerine yazilabilir kolon ekle
 * ---------------------------------------------------------------- */
if exists (
  select 1
  from sys.computed_columns
  where object_id = object_id(N'[dbo].[PaletTB]')
    and name = N'PaletNo'
)
begin
  print 'PaletNo hesaplanan kolon -- donusturuluyor';

  /* Benzersizlik kisiti kolona BAGLI; kolon once serbest kalmali. */
  if exists (
    select 1 from sys.key_constraints
    where name = N'UQ_PaletTB_PaletNo'
      and parent_object_id = object_id(N'[dbo].[PaletTB]')
  )
    alter table [dbo].[PaletTB] drop constraint [UQ_PaletTB_PaletNo];

  alter table [dbo].[PaletTB] drop column [PaletNo];

  /*
   * varchar(20): eski formul en fazla 'P' + 12 hane = 13 karakter
   * uretiyordu. Elle girilen numaralar icin bir miktar pay birakildi.
   */
  alter table [dbo].[PaletTB] add [PaletNo] varchar(20) null;
end
else
  print 'PaletNo zaten yazilabilir kolon -- atlandi';
GO

/* ---------------------------------------------------------------- *
 * 2) Mevcut satirlari ESKI FORMULLE geri doldur
 *    (numaralar birebir ayni kaliyor)
 * ---------------------------------------------------------------- */
update [dbo].[PaletTB]
   set [PaletNo] = 'P' + case
                           when [ID] < 10000
                             then right('000' + cast([ID] as varchar(12)), 4)
                           else cast([ID] as varchar(12))
                         end
 where [PaletNo] is null;
GO

/* ---------------------------------------------------------------- *
 * 3) Benzersizligi FILTRELI INDEKSE tasi
 *    (gerekcesi basliktaki "KOLON NEDEN NULL OLABILIR" bolumunde)
 * ---------------------------------------------------------------- */
if not exists (
  select 1 from sys.indexes
  where name = N'UX_PaletTB_PaletNo'
    and object_id = object_id(N'[dbo].[PaletTB]')
)
  create unique index [UX_PaletTB_PaletNo]
    on [dbo].[PaletTB] ([PaletNo])
    where [PaletNo] is not null;
GO
