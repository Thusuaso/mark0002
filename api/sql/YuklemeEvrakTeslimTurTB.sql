/* ==========================================================================
   YuklemeEvrakTeslimTurTB
   --------------------------------------------------------------------------
   Teslim turu (SiparisTeslimTurTB) basina hangi yukleme evraklarinin zorunlu
   oldugunu tutar. Eksik evrak bildirimi once buraya bakar.

   Kural:
     - Bir teslim turu icin bu tabloda EN AZ BIR satir varsa, o teslim
       turundeki siparislerde yalnizca o satirlardaki evraklar zorunludur.
     - Teslim turu icin hic satir yoksa, yedek olarak
       YeniYuklemeEvraklarTB.Zorunlu kolonu kullanilir
       (bkz. api/sql/YeniYuklemeEvraklarTB_Zorunlu.sql).

   Bu sayede tanimlanmayan teslim turlerinde davranis degismez; sadece
   ayarlamak istediginiz turler icin satir girmeniz yeterlidir.

   Ornek: CFR (8) icin Gcb Beyannamesi beklenmesin
     delete from YuklemeEvrakTeslimTurTB where TeslimTurID = 8 and YuklemeEvrakID = 12

   Ornek: DDP (12) icin kume tanimla (bos ise once hepsi eklenir)
     insert into YuklemeEvrakTeslimTurTB(TeslimTurID, YuklemeEvrakID)
     values (12,16),(12,17)

   NOT: Bir teslim turunun TUM satirlarini silmek, o turu yedege
   (Zorunlu kolonuna) geri dondurur.
   ========================================================================== */

if not exists (
  select 1 from sys.objects
   where object_id = object_id(N'[dbo].[YuklemeEvrakTeslimTurTB]')
     and type = N'U'
)
begin
  create table [dbo].[YuklemeEvrakTeslimTurTB] (
    [ID]             int identity(1, 1) not null,
    [TeslimTurID]    int not null,  -- SiparisTeslimTurTB.ID
    [YuklemeEvrakID] int not null,  -- YeniYuklemeEvraklarTB.ID (trim edilmis sayisal hali)
    [KayitTarihi]    datetime not null constraint DF_YuklemeEvrakTeslimTurTB_KayitTarihi default (getdate()),
    constraint PK_YuklemeEvrakTeslimTurTB primary key clustered ([ID]),
    constraint UQ_YuklemeEvrakTeslimTurTB unique ([TeslimTurID], [YuklemeEvrakID])
  );

  print 'YuklemeEvrakTeslimTurTB tablosu olusturuldu.';
end
else
begin
  print 'YuklemeEvrakTeslimTurTB tablosu zaten mevcut.';
end
go

/* --------------------------------------------------------------------------
   EXW (TeslimTurID = 5) - zorunlu kumenin tamami (14 evrak)
   --------------------------------------------------------------------------
   Bu blok DECLARATIF'tir: asagidaki liste EXW'nin kumesinin tamamidir,
   listede olmayan EXW satirlari silinir. Baska teslim turlerinin satirlarina
   dokunulmaz.

   EXW siparislerinin buyuk bolumu Ic Piyasa musterisidir ve bildirim
   kapsami disindadir (bkz. api/index.js, MISSING_DOC_SCOPE_CLAUSE); bu kume
   Ic Piyasa olmayan EXW siparisleri icin gecerlidir.
   -------------------------------------------------------------------------- */

declare @exwKume table ([YuklemeEvrakID] int primary key);
insert into @exwKume ([YuklemeEvrakID])
values (5), (7), (9), (10), (12), (13), (16), (17),
       (20), (50), (72), (73), (74), (76);

delete z
  from [dbo].[YuklemeEvrakTeslimTurTB] z
 where z.TeslimTurID = 5
   and not exists (select 1 from @exwKume k where k.YuklemeEvrakID = z.YuklemeEvrakID);

insert into [dbo].[YuklemeEvrakTeslimTurTB] ([TeslimTurID], [YuklemeEvrakID])
select 5, k.YuklemeEvrakID
  from @exwKume k
 where not exists (
   select 1 from [dbo].[YuklemeEvrakTeslimTurTB] z
    where z.TeslimTurID = 5 and z.YuklemeEvrakID = k.YuklemeEvrakID
 );
go

select
    z.TeslimTurID,
    isnull(t.Aciklama, t.TeslimTur) as TeslimTur,
    z.YuklemeEvrakID,
    e.EvrakAdi
  from [dbo].[YuklemeEvrakTeslimTurTB] z
  left join [dbo].[SiparisTeslimTurTB] t on t.ID = z.TeslimTurID
  left join [dbo].[YeniYuklemeEvraklarTB] e
         on try_cast(ltrim(rtrim(e.ID)) as int) = z.YuklemeEvrakID
 order by z.TeslimTurID, z.YuklemeEvrakID;
go
