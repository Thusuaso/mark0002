/* ==========================================================================
   YeniYuklemeEvraklarTB - evrak listesi guncellemesi
   --------------------------------------------------------------------------
   1) Yeni evrak turleri:
        78  Telex Release
        79  Turkce Fatura
   2) 75 numarali evragin adi "ATR (Dolasim Belgesi)" olarak guncellenir.

   11 numarali "Dolasim Belgeleri (Eski)" KAYIT olarak silinmez; eski
   siparislerin Document sekmesinde gorunmeye devam etmesi gerekir. Yalnizca
   Shipment Form (operation/uploadform) listesinde gizlenir, bu filtre
   api/index.js icindeki UPLOAD_FORM_HIDDEN_DOCS sabitindedir.

   Yeni evraklar zorunlu kumeye GIRMEZ (Zorunlu = 0). Zorunlu kume icin bkz:
     api/sql/YeniYuklemeEvraklarTB_Zorunlu.sql

   NOT: ID kolonu nchar oldugu icin karsilastirmalarda ltrim(rtrim(ID))
   kullanilir. Script idempotent'tir, tekrar calistirmak guvenlidir.
   ========================================================================== */

if not exists (
  select 1 from [dbo].[YeniYuklemeEvraklarTB]
   where ltrim(rtrim([ID])) = '78'
)
begin
  insert into [dbo].[YeniYuklemeEvraklarTB] ([ID], [EvrakAdi])
  values ('78', N'Telex Release');

  print '78 Telex Release eklendi.';
end
else
begin
  print '78 Telex Release zaten mevcut.';
end
go

if not exists (
  select 1 from [dbo].[YeniYuklemeEvraklarTB]
   where ltrim(rtrim([ID])) = '79'
)
begin
  insert into [dbo].[YeniYuklemeEvraklarTB] ([ID], [EvrakAdi])
  values ('79', N'Türkçe Fatura');

  print '79 Türkçe Fatura eklendi.';
end
else
begin
  print '79 Türkçe Fatura zaten mevcut.';
end
go

update [dbo].[YeniYuklemeEvraklarTB]
   set [EvrakAdi] = N'ATR (Dolaşım Belgesi)'
 where ltrim(rtrim([ID])) = '75'
   and [EvrakAdi] <> N'ATR (Dolaşım Belgesi)';
go

select ltrim(rtrim([ID])) as ID, [EvrakAdi], [Zorunlu]
  from [dbo].[YeniYuklemeEvraklarTB]
 where ltrim(rtrim([ID])) in ('11', '75', '78', '79');
go
