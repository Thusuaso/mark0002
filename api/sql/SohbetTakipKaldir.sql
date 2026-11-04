/* ==========================================================================
   SohbetTakipKaldir - "online olunca haber ver" tablosunu kaldirir
   --------------------------------------------------------------------------
     node api/sql/run.cjs api/sql/SohbetTakipKaldir.sql

   NEDEN: Cevrimici bildirimi artik sohbet listesindeki HERKES icin cikiyor,
   yildiz dugmesiyle kisi secmeye gerek kalmadi. Dugme ve uclari kaldirildi;
   tablo da kullanilmiyor.

   Calistirmak ZORUNLU DEGIL: tablo kalirsa yalnizca bos yer tutar, uygulama
   ona hic dokunmaz. Veritabanini temiz tutmak icin calistirilabilir.
   Tekrar calistirmak zararsizdir.
   ========================================================================== */

if exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[SohbetTakipTB]')
     and type = N'U'
)
begin
  drop table [dbo].[SohbetTakipTB];
  print 'SohbetTakipTB tablosu kaldirildi.';
end
else
begin
  print 'SohbetTakipTB tablosu zaten yok.';
end
go
