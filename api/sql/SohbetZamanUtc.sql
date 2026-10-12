/* ==========================================================================
   Sohbet tablolarinda zamanlari UTC'ye cevirme
   --------------------------------------------------------------------------
     node api/sql/run.cjs api/sql/SohbetZamanUtc.sql

   SORUN
     SQL Server'in getdate() fonksiyonu sunucunun YEREL saatini dondurur
     (bu sunucuda GMT+3). node-mssql ise datetime kolonlarini UTC kabul
     ederek okur. Sonuc: veritabanina 17:13 yazilir, uygulama bunu 17:13 UTC
     sanir ve tarayicida 20:13 olarak gosterir - 3 saat ileri.

     Etkisi: mesaj baloncuklarindaki saat yanlis cikar ve cevrimdisi
     kullanicilarin "son gorulme" zamani gelecekte kaldigi icin her zaman
     "az once" yazar.

   COZUM
     Sohbet tablolari zamanlari getutcdate() ile yazar. Kod tarafi da ayni
     sekilde guncellendi (api/server.js, api/index.js).

   Bu script yalnizca DEFAULT kisitlarini duzeltir; tablo ve veri silmez.
   Tekrar calistirmak zararsizdir.

   NOT: Projenin geri kalani her yerde getdate() kullaniyor. Oradaki kolonlar
   cogunlukla "date" tipinde (saat bilgisi yok) oldugu icin bu kaydirma
   gorunmuyor. Saat gosteren baska bir yer eklenirse ayni tuzak gecerlidir.
   ========================================================================== */

/* Bir kolonun DEFAULT kisitini getutcdate() olacak sekilde degistirir. */
declare @tablo sysname, @kolon sysname, @kisit sysname, @yeniAd sysname;
declare @sql nvarchar(max);

declare duzelt cursor local fast_forward for
  select t.ad, t.kolon, t.kisitAdi
    from (
      values
        (N'SohbetMesajTB',      N'GonderimTarihi', N'DF_SohbetMesajTB_GonderimTarihi'),
        (N'KullaniciAktiflikTB', N'SonAktif',      N'DF_KullaniciAktiflikTB_SonAktif'),
        (N'SohbetTakipTB',      N'KayitTarihi',    N'DF_SohbetTakipTB_KayitTarihi')
    ) as t(ad, kolon, kisitAdi);

open duzelt;
fetch next from duzelt into @tablo, @kolon, @yeniAd;
while @@fetch_status = 0
begin
  if object_id(N'[dbo].[' + @tablo + N']') is null
  begin
    print concat(@tablo, ' tablosu yok, atlandi.');
  end
  else
  begin
    set @kisit = (
      select dc.name
        from sys.default_constraints dc
        join sys.columns c
          on c.object_id = dc.parent_object_id
         and c.column_id = dc.parent_column_id
       where dc.parent_object_id = object_id(N'[dbo].[' + @tablo + N']')
         and c.name = @kolon
         and replace(replace(lower(dc.definition), ' ', ''), '()', '') <> '(getutcdate)'
    );
    if @kisit is null
    begin
      print concat(@tablo, '.', @kolon, ' zaten UTC (veya default yok).');
    end
    else
    begin
      set @sql = N'alter table [dbo].[' + @tablo + N'] drop constraint [' + @kisit + N'];';
      exec sp_executesql @sql;
      set @sql = N'alter table [dbo].[' + @tablo + N'] add constraint [' + @yeniAd
               + N'] default (getutcdate()) for [' + @kolon + N'];';
      exec sp_executesql @sql;
      print concat(@tablo, '.', @kolon, ' UTC olarak guncellendi.');
    end
  end
  fetch next from duzelt into @tablo, @kolon, @yeniAd;
end
close duzelt;
deallocate duzelt;
go

/* Sonuc */
select
    object_name(dc.parent_object_id) as Tablo,
    c.name as Kolon,
    dc.definition as VarsayilanDeger
  from sys.default_constraints dc
  join sys.columns c
    on c.object_id = dc.parent_object_id
   and c.column_id = dc.parent_column_id
 where dc.parent_object_id in (
         object_id(N'[dbo].[SohbetMesajTB]'),
         object_id(N'[dbo].[KullaniciAktiflikTB]'),
         object_id(N'[dbo].[SohbetTakipTB]')
       )
 order by Tablo, Kolon;
go
