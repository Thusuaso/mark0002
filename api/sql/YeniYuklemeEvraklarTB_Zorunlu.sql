/* ==========================================================================
   YeniYuklemeEvraklarTB.Zorunlu
   --------------------------------------------------------------------------
   Shipment Form (uploadform) ekranindaki evrak turlerinden hangilerinin
   bir PO icin zorunlu oldugunu belirler.

   Eksik evrak bildirimi (navbar badge + sidebar, Shipment Form / Shipped /
   Dispatch uyarilari) yalnizca Zorunlu = 1 olan evraklara bakar.
   Zorunlu = 0 olan evraklar listede gri gorunmeye devam eder ama bildirim
   uretmez.

   Bu script DECLARATIF'tir: asagidaki ID listesi zorunlu kumenin tamamidir.
   Listede olmayan her evrak Zorunlu = 0 yapilir. Kumeyi degistirmek icin
   listeyi duzenleyip script'i tekrar calistirmak yeterlidir.

   NOT: ID kolonu nchar oldugu icin sagi bosluk ile dolu gelir, bu yuzden
   her karsilastirmada ltrim(rtrim(ID)) kullanilir.

   Teslim turune gore farklilastirma icin bkz:
     api/sql/YuklemeEvrakTeslimTurTB.sql
   ========================================================================== */

if not exists (
  select 1 from sys.columns
   where object_id = object_id(N'[dbo].[YeniYuklemeEvraklarTB]')
     and name = N'Zorunlu'
)
begin
  alter table [dbo].[YeniYuklemeEvraklarTB]
    add [Zorunlu] bit not null constraint DF_YeniYuklemeEvraklarTB_Zorunlu default (0);

  print 'YeniYuklemeEvraklarTB.Zorunlu kolonu eklendi.';
end
else
begin
  print 'YeniYuklemeEvraklarTB.Zorunlu kolonu zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   Zorunlu kume (14 evrak)
   --------------------------------------------------------------------------
      5  Yükleme Notası                      20  Booking
      7  Gümrük Notası                       50  Denizcilik Faturaları
      9  Konşimento                          72  Fotolar
     10  İlaçlama Belgesi                    73  Gümrük ve İlaçlama Faturaları
     12  Gçb Beyannamesi                     74  Certificate of Origin
     13  Nakliye Faturaları                  76  Dispatch Note
     16  Commer Invoice
     17  Packing List

   Kume disinda tutulanlar (bildirim uretmez):
      4  Çeki Listesi            14  Packing Declarition
      8  ISF vb Formlar          30  Tedarikçi Faturaları
     71  İlaçlama Notası
   -------------------------------------------------------------------------- */

update [dbo].[YeniYuklemeEvraklarTB]
   set [Zorunlu] = case
         when ltrim(rtrim([ID])) in (
           '5', '7', '9', '10', '12', '13', '16', '17',
           '20', '50', '72', '73', '74', '76'
         ) then 1
         else 0
       end;
go

select ltrim(rtrim([ID])) as ID, [EvrakAdi], [Zorunlu]
  from [dbo].[YeniYuklemeEvraklarTB]
 order by [Zorunlu] desc, len(ltrim(rtrim([ID]))), ltrim(rtrim([ID]));
go
