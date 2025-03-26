import express from 'express';
import mssql from 'mssql';
import nodemailer from 'nodemailer';
import currency from "../plugins/currency";
import server from '../plugins/excel.server';

const app = express();
const sql = {
    user:'userEC52E044DE',
    password:'POlb33D8PQlo68S',
    database:'Yeni_Mekmar_DB',
    server:'94.73.151.2',
    options: {
        encrypt: false, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
      }
};
mssql.connect(sql);
let transporter = nodemailer.createTransport({
  host: "mail.kurumsaleposta.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "goz@mekmar.com",
    pass: "_bwt64h-3SR_-G2O",
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});
function __noneNullControl(value){
    if(value == null || value == " " || value == undefined || value == 'null' || value == 'NULL' || value == 'Null'){
        return "";
    } else{
        return value;
    }
}
/*Auth*/
app.post('/login',(req,res)=>{
    if(req.body){
        const sql = `select * from KullaniciTB where KullaniciAdi='${req.body.username}' and YSifre='${req.body.password}'`;
        mssql.query(sql,(err,results)=>{
            const user = results.recordset[0];
            if(results.recordset.length == 0){
                res.status(200).json({
                    'status':false
                })
            }else{
                res.status(200).json({
                    'username':user.KullaniciAdi,
                    'userId':user.ID,
                    'mail':user.MailAdres,
                    'token':Math.random().toString(36).slice(2),
                    'status':true
                })
            }

        });
    }else{
        res.status(200).json({
            'status':false
        })
    }
    
    
});

/*Home*/
app.get('/home',(req,res)=>{

    let sqlMonth = "select (select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo = s.SiparisNo) as Total from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where YEAR(s.SiparisTarihi) = YEAR(GETDATE()) and MONTH(s.SiparisTarihi) = MONTH(GETDATE()) and m.Marketing='Mekmar' group by s.SiparisNo";
    let sqlYear = "select (select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo = s.SiparisNo) as Total from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where YEAR(s.SiparisTarihi) = YEAR(GETDATE()) and MONTH(s.SiparisTarihi) <= MONTH(GETDATE()) - 1  and m.Marketing='Mekmar' group by s.SiparisNo";
    let sqlMonthForwarding = "select (select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo = s.SiparisNo) + sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) as Total from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) and MONTH(s.YuklemeTarihi) = MONTH(GETDATE()) and m.Marketing='Mekmar' and s.SiparisDurumID = 3 group by s.SiparisNo";
    let sqlYearForwarding = "select (select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo = s.SiparisNo) + sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) as Total from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) and MONTH(s.YuklemeTarihi) <= MONTH(GETDATE()) - 1  and m.Marketing='Mekmar' and s.SiparisDurumID = 3 group by s.SiparisNo";
    let sqlChartYearOne = "select MONTH(s.YuklemeTarihi) as Ay,s.SiparisNo,(select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo = s.SiparisNo) + sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) as Total from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) and s.SiparisDurumID=3 and m.Marketing ='Mekmar' group by MONTH(s.YuklemeTarihi),s.SiparisNo order by MONTH(s.YuklemeTarihi)";
    let sqlChartYearTwo = "select MONTH(s.YuklemeTarihi) as Ay,s.SiparisNo,(select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo = s.SiparisNo) + sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) as Total from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) - 1 and s.SiparisDurumID=3 and m.Marketing ='Mekmar' group by MONTH(s.YuklemeTarihi),s.SiparisNo order by MONTH(s.YuklemeTarihi)";
    let sqlChartCustomerShipped = `
            select 

                m.Marketing,
                (select sum(su.SatisFiyati * su.Miktar) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo)
                + sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) as total


            from SiparislerTB s
            inner join MusterilerTB m on m.ID = s.MusteriID

            where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) and s.SiparisDurumID=3

            group by m.Marketing, s.SiparisNo
    `;
    let sqlChartProduct = `
    select 

        sum(u.Miktar) as total,
        u.UrunBirimID as BirimId,
        (select ub.BirimAdi from UrunBirimTB ub where ub.ID = u.UrunBirimID) as BirimAdi,
        MONTH(u.Tarih) as month

    from UretimTB u

    where YEAR(u.Tarih) = YEAR(GETDATE()) and u.TedarikciID in (1,123)

    group by u.UrunBirimID,MONTH(u.Tarih)
    order by MONTH(u.Tarih)
    `;
    let sqlChartOffers = `
    select t.KullaniciId as UserId,count(t.Id) as Offer, MONTH(t.Tarih) as Month,
        (select k.KullaniciAdi from KullaniciTB k where k.ID = t.KullaniciId) as Username
    from YeniTeklifTB t

    where YEAR(t.Tarih) = YEAR(GETDATE())

    group by MONTH(t.Tarih),t.KullaniciId
    order by MONTH(t.Tarih)
    `;

    let sqlChartProductSpecial = `
        select YEAR(se.Tarih) as Year,MONTH(se.Tarih) as Month,se.Tarih,se.SiparisNo,su.Miktar,su.UrunBirimID,(select ub.BirimAdi from UrunBirimTB ub where ub.ID = su.UrunBirimID)as BirimAdi from SiparisEkstraGiderlerTB se 
inner join SiparisUrunTB su on su.SiparisNo=se.SiparisNo
where se.TedarikciID=1 and YEAR(se.Tarih) = YEAR(GETDATE())
    `;

    let sqlSupplierCostList = `
select 


            su.TedarikciID,
            sum(su.AlisFiyati * su.Miktar) as Total,
            t.FirmaAdi


        from SiparislerTB s
        inner join SiparisUrunTB su on su.SiparisNo=s.SiparisNo
        inner join TedarikciTB t on t.ID = su.TedarikciID
		inner join MusterilerTB m on m.ID = s.MusteriID
        where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) and m.Marketing='Mekmar'
        group by su.TedarikciID,t.FirmaAdi
        order by sum(su.AlisFiyati * su.Miktar) desc
    `;



    function _forSum(data){
        let sum = 0;
        if(data.length == 0){
            sum = 0;
        }else{
            data.forEach((x)=>{
                sum += x.Total;
            });
        }
        return sum;
    }
    function _chartSum(data){
        let chart = [0,0,0,0,0,0,0,0,0,0,0,0];
        for(const item of data){
            if(item.Ay == 1){
                chart[0] += +item.Total;
            } else if(item.Ay == 2){
                chart[1] += +item.Total;
            }else if(item.Ay == 3){
                chart[2] += +item.Total;
            }else if(item.Ay == 4){
                chart[3] += +item.Total;
            }else if(item.Ay == 5){
                chart[4] += +item.Total;
            }else if(item.Ay == 6){
                chart[5] += +item.Total;
            }else if (item.Ay == 7){
                chart[6] += +item.Total;
            }else if (item.Ay == 8){
                chart[7] += +item.Total;
            }else if (item.Ay == 9){
                chart[8] += +item.Total;
            }else if (item.Ay == 10){
                chart[9] += +item.Total;
            }else if (item.Ay == 11){
                chart[10] += +item.Total;
            }else if (item.Ay == 12){
                chart[11] += +item.Total;
            }


        };
        return chart;
    };
    function _chartCustomerShippedSum(data){
        let chart = [0,0,0,0];
        data.forEach((x)=>{
            if(x.Marketing == 'Mekmar'){
                chart[0] += +x.total;
            }else if(x.Marketing == 'İç Piyasa'){
                chart[1] += +x.total;
            }else if(x.Marketing == 'Imperial Homes'){
                chart[2] += +x.total;
            }else if(x.Marketing == 'Mekmer'){
                chart[3] += +x.total;
            }
        });
        return chart;
    };
    function _chartProductsSum(data,data2){
        const chart_sqm = [0,0,0,0,0,0,0,0,0,0,0,0];
        const chart_piece = [0,0,0,0,0,0,0,0,0,0,0,0];
        const chart_mt = [0,0,0,0,0,0,0,0,0,0,0,0];
        data.forEach((x)=>{
            if(x.BirimId == 1){
                chart_sqm[x.month - 1] += x.total;
            }else if (x.BirimId == 2){
                chart_piece[x.month - 1] += x.total;
            }else if (x.BirimId == 3){
                chart_mt[x.month - 1] += x.total;
            }
        });

        data2.forEach(x=>{
            if(x.UrunBirimID == 1){
                chart_sqm[x.Month - 1] += x.Miktar;
            }else if (x.UrunBirimID == 2){
                chart_piece[x.Month - 1] += x.Miktar;
            }else if (x.UrunBirimID == 3){
                chart_mt[x.Month - 1] += x.Miktar;
            }
        });

        return {
            'sqm':chart_sqm,
            'piece':chart_piece,
            'mt':chart_mt
        }
    };
    function _chartOffersSum(data){
        const chart_h = [0,0,0,0,0,0,0,0,0,0,0,0];
        const chart_o = [0,0,0,0,0,0,0,0,0,0,0,0];
        data.forEach((x)=>{
            if(x.UserId == 19){
                chart_o[x.Month - 1] += x.Offer;
            }else if (x.UserId == 44){
                chart_h[x.Month - 1] += x.Offer;
            };
        });
        return {
            'chart_h':chart_h,
            'chart_o':chart_o
        }
    }
    
    
    mssql.query(sqlMonth,
                (err,monthOrder)=>{
                    let totalMonthOrder = 0;
                    for(const item of monthOrder.recordset){
                        totalMonthOrder += +item.Total;
                    };
                    mssql.query(sqlYear,(err,yearOrder)=>{
                        let totalYearOrder = 0;
                        for(const item of yearOrder.recordset){
                            totalYearOrder += +item.Total;
                        };
                        mssql.query(sqlMonthForwarding,(err,monthForwarding)=>{
                           let totalMonthForwarding = 0;
                           for(const item of monthForwarding.recordset){
                                totalMonthForwarding += +item.Total;
                            };
                            mssql.query(sqlYearForwarding,(err,yearForwarding)=>{
                               let totalYearForwarding = 0;
                               for(const item of yearForwarding.recordset){
                                    totalYearForwarding += +item.Total;
                                };
                                let chartOne = [0,0,0,0,0,0,0,0,0,0,0,0];
                                mssql.query(sqlChartYearOne,(err,chartYearOne)=>{
                                   for(const item of chartYearOne.recordset){
                                        if(item.Ay == 1){
                                            chartOne[0] += +item.Total;
                                        } else if(item.Ay == 2){
                                            chartOne[1] += +item.Total;
                                        }else if(item.Ay == 3){
                                            chartOne[2] += +item.Total;
                                        }else if(item.Ay == 4){
                                            chartOne[3] += +item.Total;
                                        }else if(item.Ay == 5){
                                            chartOne[4] += +item.Total;
                                        }else if(item.Ay == 6){
                                            chartOne[5] += +item.Total;
                                        }else if (item.Ay == 7){
                                            chartOne[6] += +item.Total;
                                        }else if (item.Ay == 8){
                                            chartOne[7] += +item.Total;
                                        }else if (item.Ay == 9){
                                            chartOne[8] += +item.Total;
                                        }else if (item.Ay == 10){
                                            chartOne[9] += +item.Total;
                                        }else if (item.Ay == 11){
                                            chartOne[10] += +item.Total;
                                        }else if (item.Ay == 12){
                                            chartOne[11] += +item.Total;
                                        }


                                    };
                                    let chartTwo = [0,0,0,0,0,0,0,0,0,0,0,0];
                                    mssql.query(sqlChartYearTwo,(err,chartYearTwo)=>{
                                        for(const item of chartYearTwo.recordset){
                                            if(item.Ay == 1){
                                                chartTwo[0] += +item.Total;
                                            } else if(item.Ay == 2){
                                                chartTwo[1] += +item.Total;
                                            }else if(item.Ay == 3){
                                                chartTwo[2] += +item.Total;
                                            }else if(item.Ay == 4){
                                                chartTwo[3] += +item.Total;
                                            }else if(item.Ay == 5){
                                                chartTwo[4] += +item.Total;
                                            }else if(item.Ay == 6){
                                                chartTwo[5] += +item.Total;
                                            }else if (item.Ay == 7){
                                                chartTwo[6] += +item.Total;
                                            }else if (item.Ay == 8){
                                                chartTwo[7] += +item.Total;
                                            }else if (item.Ay == 9){
                                                chartTwo[8] += +item.Total;
                                            }else if (item.Ay == 10){
                                                chartTwo[9] += +item.Total;
                                            }else if (item.Ay == 11){
                                                chartTwo[10] += +item.Total;
                                            }else if (item.Ay == 12){
                                                chartTwo[11] += +item.Total;
                                            }
    
    
                                        };

                                        mssql.query(sqlChartCustomerShipped,(err,chartShippedCustomer)=>{
                                            mssql.query(sqlChartProduct,(err,chartProducts)=>{
                                                mssql.query(sqlChartOffers,(err,chartOffers)=>{
                                                    mssql.query(sqlChartProductSpecial,(err,chartProductsSpecial)=>{
                                                        mssql.query(sqlSupplierCostList,(err,supplierCostList)=>{
                                                            let _productsChartData = _chartProductsSum(chartProducts?.recordset,chartProductsSpecial.recordset);
                                                            let _offeresChartData = _chartOffersSum(chartOffers?.recordset);
                                                            res.status(200).json({
                                                                'supplierCostList':supplierCostList.recordset,
                                                                'aylikSiparis':totalMonthOrder,
                                                                'yillikSiparis':totalYearOrder,
                                                                'ortalamaSiparis':totalYearOrder / (new Date().getMonth() + 1),
                                                                'tahminiYillikSiparis':(totalYearOrder / (new Date().getMonth() + 1)) * 12,
                                                                'aylikYukleme':totalMonthForwarding,
                                                                'yillikYukleme':totalYearForwarding,
                                                                'ortalamaYukleme':totalYearForwarding / (new Date().getMonth() + 1),
                                                                'tahminiYillikYukleme':(totalYearForwarding / (new Date().getMonth() + 1)) * 12,
                                                                'chartOne':{
                                                                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                                                                    datasets: [
                                                                        {
                                                                            label: new Date().getFullYear(),
                                                                            backgroundColor: 'grey',
                                                                            borderColor: 'black',
                                                                            data: chartOne
                                                                        },
                                                                        {
                                                                            label: new Date().getFullYear() - 1,
                                                                            backgroundColor: 'black',
                                                                            borderColor: 'grey',
                                                                            data: chartTwo
                                                                        }
                                                                    ]
                                                                },
                                                                'chartCustomerShipped':{
                                                                    labels: ['Mekmar', 'İç Piyasa', 'Imperial Homes', 'Mekmer'],
                                                                    datasets: [
                                                                        {
                                                                            data: _chartCustomerShippedSum(chartShippedCustomer?.recordset),
                                                                            backgroundColor: ['#aba34f','#ab6e4f','#4fab9f','#ab4f86'],
                                                                            hoverBackgroundColor: ['grey','grey','grey','grey']
                                                                        }
                                                                    ]
                                                                },
                                                                'chartProducts':{
                                                                    labels: ['January', 'February', 'March','April','May','June','July','August','September','October','November','December'],
                                                                    datasets: [
                                                                        {
                                                                            type: 'bar',
                                                                            label: 'SQM',
                                                                            backgroundColor: '#f2bf33',
                                                                            data: _productsChartData.sqm
                                                                        },
                                                                        {
                                                                            type: 'bar',
                                                                            label: 'PIECE',
                                                                            backgroundColor: '#33f2e2',
                                                                            data: _productsChartData.piece
                                                                        },
                                                                        {
                                                                            type: 'bar',
                                                                            label: 'MT',
                                                                            backgroundColor: '#5333f2',
                                                                            data: _productsChartData.mt
                                                                        }
                                                                    ]
                                                                },
                                                                'chartOffers':{
                                                                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                                                                        datasets: [
                                                                            {
                                                                                label: 'Özlem',
                                                                                backgroundColor: '#e86db3',
                                                                                borderColor: 'grey',
                                                                                data: _offeresChartData.chart_o
                                                                            },
                                                                            {
                                                                                label: 'Hakan',
                                                                                backgroundColor: '#6d94e8',
                                                                                borderColor: 'grey',
                                                                                data: _offeresChartData.chart_h
                                                                            }
                                                                        ]
                                                                    }
                                                            });
                                                            });
                                                        });




                                                        });

                                                        
                                                       


                                                    
                                                
                                            });


                                        })

                                    });
                                    
                                });

                                
                            });
                        });

                        
                    })


                    
    });
    
});

/*Sales Follow */
app.get('/sales/follow',(req,res)=>{

    const sqlCustomer = `select
    m.ID,
    m.FirmaAdi,
    m.MusteriOncelik as Oncelik,
   (select top 1  s.Baslik from SatisciAyrintiTB s where s.MusteriAdi = m.FirmaAdi  order by s.Tarih desc ) as baslik,
    k.KullaniciAdi as Temsilci,
    m.Takip as Takip,
    (select yu.UlkeAdi from YeniTeklif_UlkeTB yu where yu.Id = m.UlkeId) as UlkeAdi,
    u.Png_Flags as Flag,
    m.MailAdresi as Mail
   
    from
    MusterilerTB m,YeniTeklif_UlkeTB u,KullaniciTB k
    where u.Id=m.UlkeId and k.ID=m.MusteriTemsilciId  and   m.Marketing ='Mekmar' and ( m.MusteriOncelik  = 'A' or m.MusteriOncelik = 'B' or m.MusteriOncelik = 'C') and m.Takip = 1
    
    order by m.MusteriOncelik`
    const sqlOffer = `select
                        m.MusteriAdi as FirmaAdi,
                        t.TeklifOncelik as Oncelik,
                        (select k.KullaniciAdi from KullaniciTB k where k.ID = t.KullaniciId) as Temsilci,
                        (select top 1  s.Baslik from SatisciAyrintiTB s where s.MusteriAdi = m.MusteriAdi   order by s.Tarih desc) as baslik,
                        (select yu.UlkeAdi from YeniTeklif_UlkeTB yu where yu.Id = m.UlkeId) as UlkeAdi,
                        u.Png_Flags as Flag,
                        (select mt.MailAdresi from MusterilerTB mt where mt.FirmaAdi = m.MusteriAdi) as Mail,
                        t.KaynakYeri as Kaynak,
                        t.Id as ID,
                        t.TakipEt
                        from YeniTeklifTB t , YeniTeklif_MusterilerTB m,YeniTeklif_UlkeTB u
                        where m.Id = t.MusteriId and ( t.TeklifOncelik='A' or  t.TeklifOncelik='B' or t.TeklifOncelik='C') and t.TakipEt=1 and u.Id = m.UlkeId
                        GROUP BY  m.MusteriAdi,t.TeklifOncelik, t.KullaniciId,m.UlkeId,u.Png_Flags,t.KaynakYeri,t.Id,t.TakipEt
                        order by t.TeklifOncelik
                        `
    mssql.query(sqlCustomer,(err,customer)=>{
        mssql.query(sqlOffer,(err,offer)=>{
            res.status(200).json({
                'data':customer.recordset.concat(offer.recordset)
            })
        });

        
    });

});
app.get('/sales/follow/detail/:customer',(req,res)=>{
    const sql = `select k.KullaniciAdi,
                a.ID,
                a.MusteriAdi,
                a.Satisci_Cloud,
                a.Satisci_Cloud_Dosya,
                a.Aciklama,
                a.Baslik,
                a.Hatirlatma_Notu,
                a.Hatirlatma_Tarih,
                a.Tarih
            from SatisciAyrintiTB a , KullaniciTB k where k.ID = a.Temsilci and
            a.MusteriAdi = '${req.params.customer}'`;
    mssql.query(sql,(err,followDetail)=>{
        res.status(200).json({
            'data':followDetail.recordset,
        });
    });

});
app.post('/sales/follow/detail/save',(req,res)=>{
    const sql = `insert into SatisciAyrintiTB(MusteriAdi,Aciklama,Baslik,Tarih,Hatirlatma_Tarih,Hatirlatma_Notu,Temsilci) VALUES('${req.body.MusteriAdi}','${req.body.Aciklama}','${req.body.Baslik}','${req.body.Tarih}','${req.body.Hatirlatma_Tarih}','${req.body.Hatirlatma_Notu}','${req.body.Temsilci}')`;
    const sql2 = 'select top 1 ID from SatisciAyrintiTB order by ID desc';
    mssql.query(sql,(err,followDetail)=>{
       mssql.query(sql2,(err,results)=>{
            if(results.recordset.length == 0){
                res.status(200).json({
                    'status':false
                })
            }else{
                let data = {'ID':results.recordset[0].ID,...req.body};
                res.status(200).json({
                    'data':data,
                    'status':true
                });
                
            }
            
        });
    });
    
});
app.delete('/sales/follow/detail/delete/:id',(req,res)=>{
    const sql = `delete from SatisciAyrintiTB where ID = '${req.params.id}'`;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0] == 1){
            res.status(200).json({
                'data':req.params.id,
                'status':true
            });
        }else{
            
            res.status(200).json({
                'status':false,
            })
        }

    })
});
app.put('/sales/follow/detail/update',(req,res)=>{
    const sql = `update SatisciAyrintiTB SET Aciklama='${req.body.Aciklama}',Baslik='${req.body.Baslik}',Tarih='${req.body.Tarih}',Hatirlatma_Tarih='${req.body.Hatirlatma_Tarih}',Hatirlatma_Notu='${req.body.Hatirlatma_Notu}' where ID='${req.body.ID}'`;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0] == 1){
            res.status(201).json({
                'data':req.body,
                'status':true,
            });
        }else{
            res.status(200).json({
                'status':false,
            });
        };


    });
});

/*Sales Bgp */
app.get('/sales/bgp/list',(req,res)=>{
    const sql = 'select bnp.ID,bnp.ProjectName,bnp.DateofRegistiration,bnp.UlkeAdi,bnp.UlkeLogo,k.KullaniciAdi as Temsilci from BgpNetworkProjects bnp inner join KullaniciTB k on k.ID = bnp.Temsilci';
    mssql.query(sql,(err,bgp)=>{
       res.status(200).json({
            'data':bgp.recordset
        }); 
    });
});
app.post('/sales/bgp/save',(req,res)=>{
    const sql = `insert into BgpNetworkProjects(ProjectName,DateofRegistiration,Temsilci,UlkeAdi,UlkeLogo) VALUES('${req.body.ProjectName}','${req.body.DateofRegistiration}','${req.body.Temsilci}','${req.body.UlkeAdi}','${req.body.UlkeLogo}')`;
    const sql2 = 'select top 1 ID from BgpNetworkProjects order by ID desc';
    mssql.query(sql,(err,bgp)=>{
       mssql.query(sql2,(err,results)=>{
            if(results.rowsAffected == 1){
                res.status(200).json({
                    'data':{'ID':results.recordset[0].ID,...req.body},
                    'status':true
                });
            } else{
                res.status(200).json({
                    'status':false
                })
            }
            
       });
        
    });
});
app.delete('/sales/bgp/delete/:id',(req,res)=>{
    const sql = `delete BgpNetworkProjects where ID='${req.params.id}'`;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0] == 1){
            res.status(201).json({
                'id':req.params.ID,
                'status':true
            })
        }else{
            res.status(201).json({
                'status':false
            })
        }
        
    });
});
app.get('/sales/bgp/detail/:projectName',(req,res)=>{
    const sql = `select bgp.ID,bgp.ProjectName,bgp.FirmaAdi,bgp.Aciklama,bgp.KayitTarihi,bgp.Baslik,bgp.HatirlatmaTarihi,bgp.HatirlatmaAciklama,k.KullaniciAdi,bgp.Email,bgp.Unvan,bgp.PhoneNumber,bgp.WrongNumber,bgp.NotResponse,bgp.NotInterested,bgp.UlkeAdi,bgp.Interested from BgpProjectDetailList bgp inner join KullaniciTB k on k.ID = bgp.Temsilci where bgp.ProjectName = '${req.params.projectName}'`;
    mssql.query(sql,(err,bgpDetail)=>{
        res.status(200).json({
            'data':bgpDetail.recordset,
        });

    });

});
app.post('/sales/bgp/detail/save',(req,res)=>{
    const sql = `insert into BgpProjectDetailList(ProjectName,FirmaAdi,KayitTarihi,Baslik,Aciklama,HatirlatmaTarihi,HatirlatmaAciklama,Temsilci,Email,PhoneNumber,WrongNumber,NotResponse,NotInterested,Interested,Unvan) VALUES('${req.body.ProjectName}','${req.body.FirmaAdi}','${req.body.KayitTarihi}','${req.body.Baslik}','${req.body.Aciklama}','${req.body.HatirlatmaTarihi}','${req.body.HatirlatmaAciklama}','${req.body.Temsilci}','${req.body.Email}','${req.body.PhoneNumber}','${req.body.WrongNumber}','${req.body.NotResponse}','${req.body.NotInterested}','${req.body.Interested}','${req.body.Unvan}')`
    const sqlID = 'select top 1 ID from BgpProjectDetailList order by ID desc';
    mssql.query(sql,(err,results)=>{
        mssql.query(sqlID,(err,results)=>{
           if(results.rowsAffected[0] == 1){
                res.status(200).json({
                    'data':{'ID':results.recordset[0].ID,...req.body},
                    'status':true
                });
            }else{
                res.status(200).json({
                   'status':false 
                });
            }
           
        });
        
    })
    
});
app.delete('/sales/bgp/detail/delete/:id',(req,res)=>{
    const sql = `delete BgpProjectDetailList where ID = '${req.params.id}'`;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0] == 1){
            res.status(200).json({
                'id':req.params.id,
                'status':true
            });
        }else{
            res.status(200).json({
                'status':false
            });
        };
       
    });
});
app.put('/sales/bgp/detail/update',(req,res)=>{
    const sql = `update BgpProjectDetailList SET FirmaAdi='${req.body.FirmaAdi}',Baslik='${req.body.Baslik}',Aciklama='${req.body.Aciklama}',HatirlatmaTarihi='${req.body.HatirlatmaTarihi}',HatirlatmaAciklama='${req.body.HatirlatmaAciklama}',Email='${req.body.Email}',PhoneNumber='${req.body.PhoneNumber}',WrongNumber='${req.body.WrongNumber}',NotResponse='${req.body.NotResponse}',NotInterested='${req.body.NotInterested}',Interested='${req.body.Interested}',Unvan='${req.body.Unvan}' WHERE ID='${req.body.ID}'`;
    mssql.query(sql,(err,results)=>{
       if(results.rowsAffected[0] == 1){
            res.status(200).json({
                'data':req.body,
                'status':true
            });
       }else{
            res.status(200).json({
                'status':false
            });
        };

    });
});

/*Sales Todos */
app.get('/sales/todos/list',(req,res)=>{
    const sql = 'select y.ID,y.Yapilacak,y.Yapildi,y.GirisTarihi,y.YapildiTarihi,y.YapilacakOncelik,y.Acil,y.Sira,y.OrtakGorev from Yapilacaklar y where y.Yapildi=0 order by y.GirisTarihi' ;
    mssql.query(sql,(err,todo)=>{
        const listA = todo.recordset.filter(todo=>todo.YapilacakOncelik == 'A' || todo.YapilacakOncelik == 'B');
        const listMail = todo.recordset.filter(todo=>todo.YapilacakOncelik == 'C');
        res.status(200).json({
            'listA':listA,
            'listMail':listMail
        });
    });

});
app.put('/sales/todos/change/status/:id',(req,res)=>{
    const sql = `update Yapilacaklar SET Yapildi=1 where ID='${req.params.id}'`;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0]==1){
            res.status(200).json({
                'id':req.params.id,
                'status':true,
            });
        } else{
            res.status(200).json({
                'status':false
            })
        }
        
    });
});
app.put('/sales/todos/update',(req,res)=>{
    const sql = `update Yapilacaklar SET Yapilacak='${req.body.CustomYapilacak}',YapilacakOncelik='${req.body.YapilacakOncelik}',OrtakGorev='${req.body.OrtakGorev}',Acil='${req.body.Acil}' WHERE ID='${req.body.ID}'`;
    mssql.query(sql,(err,results)=>{
       if(results.rowsAffected[0] == 1){
            res.status(200).json({
                'todo':req.body,
                'status':true,
            });
       } else{
            res.status(200).json({
               'status':false, 
            });
        }
       
    });
});
app.delete('/sales/todos/delete/:id',(req,res)=>{
    const sql = `delete Yapilacaklar WHERE ID='${req.params.id}'`;
    mssql.query(sql,(err,results)=>{
       if(results.rowsAffected[0] == 1){
        res.status(200).json({
            'id':req.params.id,
            'status':true,
        });
       } else{
            res.status(200).json({
                'status':false,
            })
        }

    });
});
app.get('/sales/todos/main/list/:username',(req,res)=>{
    const sql = `
    select y.ID,y.Yapilacak,y.Yapildi,y.GirisTarihi,y.YapildiTarihi,y.YapilacakOncelik,y.Acil,y.Sira,y.OrtakGorev 
    from Yapilacaklar y 
    where y.Yapildi=0 and y.Goruldu=0 and y.GorevVerenAdi='${req.params.username}'
    
    order by y.Sira 
    `;
    mssql.query(sql,(err,todos)=>{
        res.status(200).json({'list':todos.recordset});
    });
});

app.get('/todo/main/list/change/done/:id',(req,res)=>{
    const sql = `update Yapilacaklar SET Yapildi=1 where ID='${req.params.id}'`;
    mssql.query(sql,(err,todo)=>{
        if(todo.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        } else{
            res.status(200).json({'status':false});
            
        }
    });

});
app.get('/todo/main/list/change/seen/:id',(req,res)=>{
    const sql = `update Yapilacaklar SET Goruldu=1 where ID='${req.params.id}'`;
    mssql.query(sql,(err,todo)=>{
        if(todo.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        } else{
            res.status(200).json({'status':false});
            
        }
    });

});
app.get('/todo/main/list/change/not/seen/:id',(req,res)=>{
    const sql = `update Yapilacaklar SET Goruldu=0 where ID='${req.params.id}'`;
    mssql.query(sql,(err,todo)=>{
        if(todo.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        } else{
            res.status(200).json({'status':false});
            
        }
    });

});




app.post('/todo/main/change/queue',(req,res)=>{
    req.body.forEach(x=>{
        const sql = `update Yapilacaklar SET Sira='${x.Sira}' WHERE ID='${x.ID}'`;
        mssql.query(sql,(err,todos)=>{
            
        });
    });
    res.status(200).json({'status':true});


});




/*Sales Points of Consider */
app.get('/sales/points/of/consider/list',(req,res)=>{
    const sql = `select mh.ID,mh.Hata from MaliyetHatalariTB mh`;
    mssql.query(sql,(err,consider)=>{
        res.status(200).json({'list':consider.recordset});
    });
});
app.post('/sales/points/of/consider/save',(req,res)=>{
    const sql = `insert into MaliyetHatalariTB(Hata) Values('${req.body.Hata}')`;
    mssql.query(sql,(err,consider)=>{
        if(consider.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});
            
        }
    });
});
app.put('/sales/points/of/consider/update',(req,res)=>{
    const sql = `update MaliyetHatalariTB SET Hata='${req.body.Hata}' WHERE ID='${req.body.ID}'`;
    mssql.query(sql,(err,consider)=>{
        if(consider.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});
            
        }
    });
});
app.delete('/sales/points/of/consider/delete/:id',(req,res)=>{
    const sql = `delete MaliyetHatalariTB where ID='${req.params.id}'`;
    mssql.query(sql,(err,consider)=>{
        if(consider.rowsAffected[0]==1){
            res.status(200).json({'status':true});
        } else{
            res.status(200).json({'status':false});
        }
    });

});
/*Representative */
app.get('/sales/representative/list',(req,res)=>{
    const sql = 'select s.SiparisNo,(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibi,(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as Operasyon from SiparislerTB s where s.SiparisDurumID=2 order by s.SiparisTarihi desc';
    const sql2 = "select count(s.SiparisSahibi) as Total,(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibi from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where m.Marketing in ('Mekmar','Imperial Homes') and s.SiparisDurumID=2 group by s.SiparisSahibi order by count(s.SiparisSahibi) desc";
    const sql3 = "select count(s.Operasyon) as Total,(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as Operasyon from SiparislerTB s inner join MusterilerTB m on m.ID = s.MusteriID where m.Marketing in ('Mekmar','Imperial Homes') and s.SiparisDurumID=2 group by s.Operasyon order by count(s.Operasyon) desc";
    mssql.query(sql,(err,results)=>{
        mssql.query(sql2,(err,results2)=>{
            mssql.query(sql3,(err,results3)=>{
                res.status(200).json({
                    'representative':results.recordset,
                    'totalRepresentative':results2.recordset,
                    'totalOperation':results3.recordset,
                });
            });
            
        });
        
    });
});

app.put('/sales/representative/change',(req,res)=>{
    const sql = `update SiparislerTB SET SiparisSahibi='${req.body.siparisSahibiId}', Operasyon='${req.body.operasyonId}' where SiparisNo='${req.body.SiparisNo}'`;
    mssql.query(sql,(err,results)=>{
       if(results.rowsAffected[0] == 1){
        res.status(200).json({
            'data':req.body,
            'status':true
        });
       }else{
            res.status(200).json({
               'status':false 
            });
        }

    });
});

/*Selection*/
app.get('/selection/production/list',(req,res)=>{
    const sql = `select u.OzelMiktar,
    u.Fason,
    u.Duzenleyen,u.Kasalayan,u.UrunKartId,urb.ID as UrunBirimId,urb.BirimAdi as UrunBirimAdi,u.UretimTurID,u.ID,u.Tarih,u.KasaNo,k.KategoriAdi,k.ID as KategoriID,uo.OcakAdi,uo.ID as OcakId,ur.UrunAdi,ur.ID as UrunId,yk.YuzeyIslemAdi,yk.ID as YuzeyId,ol.ID as OlcuId,ol.En,ol.Boy,ol.Kenar,u.KutuAdet,u.KutuIciAdet,u.Miktar,u.Kutu,u.Bagli,u.SiparisAciklama,u.Aciklama,u.TedarikciID,t.FirmaAdi,u.Bulunamadi,u.Disarda,u.Adet from UretimTB u inner join TedarikciTB t on t.ID = u.TedarikciID inner join UrunBirimTB ub on ub.ID = u.UrunBirimID inner join UrunOcakTB uo on uo.ID = u.UrunOcakID inner join UretimTurTB ut on ut.ID = u.UretimTurID inner join UrunKartTB uk on uk.ID = u.UrunKartID inner join KategoriTB k on k.ID = uk.KategoriID inner join UrunlerTB ur on ur.ID = uk.UrunID inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID inner join OlculerTB ol on ol.ID = uk.OlcuID inner join UrunBirimTB urb on urb.ID = u.UrunBirimID where UrunDurumID=1 order by KasaNo desc`;
    
    mssql.query(sql,(err,productions)=>{
        let data = {
            'mekmerList':[],
            'mekmerDisList':[],
            'disList':[],
            'bulunamadiList':[],
        };
        productions.recordset.forEach(x=>{
           if((x.TedarikciID == 1 || x.TedarikciID == 123) && !x.Bulunamadi){
                data.mekmerList.push(x);
            } else if ((x.TedarikciID != 1 || x.TedarikciID != 123) && !x.Bulunamadi && !x.Disarda){
                data.mekmerDisList.push(x);
            } else if ((x.TedarikciID != 1 || x.TedarikciID != 123) && !x.Bulunamadi && x.Disarda){
                data.disList.push(x);
            } else if (x.Bulunamadi){
                data.bulunamadiList.push(x);
            }
        });
        res.status(200).json({
           'data':data, 
        });
    });
});

app.get('/selection/production/total',(req,res)=>{
    const sql = 'select u.UrunBirimID,sum(u.Miktar) as Miktar,(select t.FirmaAdi from TedarikciTB t where t.ID = u.TedarikciID) as TedarikciAdi,u.TedarikciID from UretimTB u where  YEAR(u.Tarih) = YEAR(GETDATE()) and MONTH(u.Tarih) = MONTH(GETDATE()) group by u.TedarikciID,u.UrunBirimID';
    const sql2 = `
        select sum(u.Miktar) as Miktar,(select t.FirmaAdi from TedarikciTB t where 
        t.ID = u.TedarikciID) as TedarikciAdi,u.TedarikciID,u.UrunBirimID from UretimTB u where u.UrunBirimID = 1 and YEAR(u.Tarih) = YEAR(GETDATE()) 
        group by u.TedarikciID,u.UrunBirimID
    `;
    const sql3 = `
    select su.TedarikciID,YEAR(se.Tarih) as Year,MONTH(se.Tarih) as Month,se.Tarih,se.SiparisNo,su.Miktar,su.UrunBirimID,(select ub.BirimAdi from UrunBirimTB ub where ub.ID = su.UrunBirimID)as BirimAdi from SiparisEkstraGiderlerTB se 
    inner join SiparisUrunTB su on su.SiparisNo=se.SiparisNo
    where YEAR(se.Tarih) = YEAR(GETDATE()) and MONTH(se.Tarih) = MONTH(GETDATE())

    `;
    const sql4 = `
            select su.TedarikciID,YEAR(se.Tarih) as Year,MONTH(se.Tarih) as Month,se.Tarih,se.SiparisNo,su.Miktar,su.UrunBirimID,(select ub.BirimAdi from UrunBirimTB ub where ub.ID = su.UrunBirimID)as BirimAdi from SiparisEkstraGiderlerTB se 
    inner join SiparisUrunTB su on su.SiparisNo=se.SiparisNo
    where YEAR(se.Tarih) = YEAR(GETDATE()) 

        
    `;
    
    mssql.query(sql,(err,productMonth)=>{
        mssql.query(sql2,(err,productYear)=>{
            mssql.query(sql3,(err,productSelectionMonth)=>{
                mssql.query(sql4,(err,productSelectionYear)=>{
                    let data = {
                        'mekmerMonthSqm':0,
                        'mekmerMonthPcs':0,
                        'mekmerMonthMt':0,
    
                        'mekmozMonthSqm':0,
                        'mekmozMonthPcs':0,
                        'mekmozMonthMt':0,
    
                        'disMonthSqm':0,
                        'disMonthPcs':0,
                        'disMonthMt':0,
    
                        'mekmerYearSqm':0,
                        'mekmerYearPcs':0,
                        'mekmerYearMt':0,
    
                        'mekmozYearSqm':0,
                        'mekmozYearPcs':0,
                        'mekmozYearMt':0,
    
                        'disYearSqm':0,
                        'disYearPcs':0,
                        'disYearMt':0,
    
                        'monthTotalSqm':0,
                        'monthTotalPcs':0,
                        'monthTotalMt':0,
    
                        'yearTotalSqm':0,
                        'yearTotalPcs':0,
                        'yearTotalMt':0,
    
                    };
                    productMonth.recordset.forEach(x =>{
                        if(x.UrunBirimID == 1){
                            data.monthTotalSqm += x.Miktar;
                        }else if (x.UrunBirimID == 2){
                            data.monthTotalPcs += x.Miktar;
                        }else if (x.UrunBirimID == 3){
                            data.monthTotalMt += x.Miktar;
                        }
                        if(x.TedarikciID == 1){
                            if(x.UrunBirimID == 1){
                                data.mekmerMonthSqm += x.Miktar;
                            }else if (x.UrunBirimID == 2){
                                data.mekmerMonthPcs += x.Miktar;
                            }else if (x.UrunBirimID == 3){
                                data.mekmerMonthMt += x.Miktar;
                            }
                        }else if (x.TedarikciID == 123){
                            if(x.UrunBirimID == 1){
                                data.mekmozMonthSqm += x.Miktar;
                            }else if (x.UrunBirimID == 2){
                                data.mekmozMonthPcs += x.Miktar;
                            }else if (x.UrunBirimID == 3){
                                data.mekmozMonthMt += x.Miktar;
                            }
                        } else {
                            if(x.UrunBirimID == 1){
                                data.disMonthSqm += x.Miktar;
                            }else if (x.UrunBirimID == 2){
                                data.disMonthPcs += x.Miktar;
                            }else if (x.UrunBirimID == 3){
                                data.disMonthMt += x.Miktar;
                            }
                        }
                    });
        
                    productYear.recordset.forEach(x=>{
                        if(x.UrunBirimID == 1){
                            data.yearTotalSqm += x.Miktar;
                        }else if (x.UrunBirimID == 2){
                            data.yearTotalPcs += x.Miktar;
                        }else if (x.UrunBirimID == 3){
                            data.yearTotalMt += x.Miktar;
                        }
                        if(x.TedarikciID == 1){
                            if(x.UrunBirimID == 1){
                                data.mekmerYearSqm += x.Miktar;
                            }else if (x.UrunBirimID == 2){
                                data.mekmerYearPcs += x.Miktar;
                            }else if (x.UrunBirimID == 3){
                                data.mekmerYearMt += x.Miktar;
                            }
                        }else if (x.TedarikciID == 123){
                            if(x.UrunBirimID == 1){
                                data.mekmozYearSqm += x.Miktar;
                            }else if (x.UrunBirimID == 2){
                                data.mekmozYearPcs += x.Miktar;
                            }else if (x.UrunBirimID == 3){
                                data.mekmozYearMt += x.Miktar;
                            }
                        } else {
                            if(x.UrunBirimID == 1){
                                data.disYearSqm += x.Miktar;
                            }else if (x.UrunBirimID == 2){
                                data.disYearPcs += x.Miktar;
                            }else if (x.UrunBirimID == 3){
                                data.disYearMt += x.Miktar;
                            }
                        }
                    });
                    productSelectionMonth.recordset.forEach(x=>{
                        if(x.UrunBirimID == 1){
                            data.monthTotalSqm += x.Miktar;
                        }else if (x.UrunBirimID == 2){
                            data.monthTotalPcs += x.Miktar;
                        }else if (x.UrunBirimID == 3){
                            data.monthTotalMt += x.Miktar;
                        };
                        if(x.TedarikciID == 1){
                            if(x.UrunBirimID == 1){
                                data.mekmerMonthSqm += x.Miktar;
                            }else if (x.UrunBirimID == 2){
                                data.mekmerMonthPcs += x.Miktar;
                            }else if (x.UrunBirimID == 3){
                                data.mekmerMonthMt += x.Miktar;
                            }
                        }else if (x.TedarikciID == 123){
    
                            if(x.UrunBirimID == 1){
                                data.mekmozMonthSqm += x.Miktar;
                            }else if (x.UrunBirimID == 2){
                                data.mekmozMonthPcs += x.Miktar;
                            }else if (x.UrunBirimID == 3){
                                data.mekmozMonthMt += x.Miktar;
                            }
                        }else{
                            if(x.UrunBirimID == 1){
                                data.disMonthSqm += x.Miktar;
                            }else if (x.UrunBirimID == 2){
                                data.disMonthPcs += x.Miktar;
                            }else if (x.UrunBirimID == 3){
                                data.disMonthMt += x.Miktar;
                            }
                        }
                    });
                    productSelectionYear.recordset.forEach(x=>{
                        if(x.UrunBirimID == 1){
                            data.yearTotalSqm += x.Miktar;
                        }else if (x.UrunBirimID == 2){
                            data.yearTotalPcs += x.Miktar;
                        }else if (x.UrunBirimID == 3){
                            data.yearTotalMt += x.Miktar;
                        };
                        if(x.TedarikciID == 1){
                            if(x.UrunBirimID == 1){
                                data.mekmerYearSqm += x.Miktar;
                            }else if (x.UrunBirimID == 2){
                                data.mekmerYearPcs += x.Miktar;
                            }else if (x.UrunBirimID == 3){
                                data.mekmerYearMt += x.Miktar;
                            }
                        }else if (x.TedarikciID == 123){
    
                            if(x.UrunBirimID == 1){
                                data.mekmozYearSqm += x.Miktar;
                            }else if (x.UrunBirimID == 2){
                                data.mekmozYearPcs += x.Miktar;
                            }else if (x.UrunBirimID == 3){
                                data.mekmozYearMt += x.Miktar;
                            }
                        }else{
                            if(x.UrunBirimID == 1){
                                data.disYearSqm += x.Miktar;
                            }else if (x.UrunBirimID == 2){
                                data.disYearPcs += x.Miktar;
                            }else if (x.UrunBirimID == 3){
                                data.disYearMt += x.Miktar;
                            }
                        }
                    });
    
    
    
            
                    res.status(200).json({
                        'data':data,
                    });
                });
            });

        });
        
    });
});

app.get('/selection/production/crateno/in',(req,res)=>{
    const sql = `
        select top 1 u.KasaNo + 1 as KasaNo from UretimTB u where u.TedarikciID in (1,123) and u.Disarda = 0
and LEN(u.KasaNo) != 6
order by u.KasaNo desc

    `;
    mssql.query(sql,(err,no)=>{
        res.status(200).json({
           'no':no.recordset[0].KasaNo,
        });
    });
});
app.get('/selection/production/crateno/out',(req,res)=>{
    const sql = 'select top 1 u.KasaNo + 1 as KasaNo from UretimTB u where u.TedarikciID not in (1,123)  order by u.KasaNo desc';
    mssql.query(sql,(err,no)=>{
        res.status(200).json({
           'no':no.recordset[0].KasaNo, 
        });
    });
});



app.post('/selection/production/save',(req,res)=>{
    let crateNo = req.body.KasaNo;
    for (let i = 1; i <= req.body.KasaKayıtAdedi; i += 1) {
            const sql = `
    insert into UretimTB(
                    Tarih,
                    KasaNo,
                    UrunKartID,
                    TedarikciID,
                    UrunBirimID,
                    UrunOcakID,
                    Adet,
                    KutuAdet,
                    Miktar,
                    Aciklama,
                    UretimTurID,
                    UrunDurumID,
                    SiparisAciklama,
                    Kutu,
                    Duzenleyen,
                    Kasalayan,
                    Disarda,
                    KutuIciAdet,
                    SqmMiktar,
                    Bagli,
                    Bulunamadi,
                    Fason
                    )
                Values('${req.body.Tarih}','${crateNo}',
                '${req.body.UrunKartID}','${req.body.TedarikciID}',
                '${req.body.UrunBirimID}','${req.body.UrunOcakID}',
                '${req.body.Adet}','${req.body.KutuAdet}',
                '${req.body.Miktar}','${__stringCharacterChange(req.body.Aciklama)}',
                '${req.body.UretimTurID}','${req.body.UrunDurumID}',
                '${req.body.SiparisAciklama}','${req.body.Kutu}',
                '${req.body.Duzenleyen}','${req.body.Kasalayan}',
                '${req.body.Disarda}','${req.body.KutuIciAdet}',
                '${req.body.SqmMiktar}','${req.body.Bagli}','${req.body.Bulunamadi}','${req.body.Fason}')
                `;
            mssql.query(sql,(err,product)=>{
             
            });
            crateNo  = parseInt(crateNo) + 1;
      };
      res.status(200).json({
        'status':true, 
      });
    
});
app.put('/selection/production/update',(req,res)=>{
    const sql = `
    update UretimTB SET Tarih='${req.body.Tarih}',
    KutuAdet='${req.body.KutuAdet}',
    KasaNo='${req.body.KasaNo}',
    UrunKartID='${req.body.UrunKartID}',
    TedarikciID='${req.body.TedarikciID}',
    UrunBirimID='${req.body.UrunBirimID}',
    UrunOcakID='${req.body.UrunOcakID}',
    Adet='${req.body.Adet}',
    Miktar='${req.body.Miktar}',
    Aciklama='${__stringCharacterChange(req.body.Aciklama)}',
    UretimTurID='${req.body.UretimTurID}',
    SiparisAciklama='${req.body.SiparisAciklama}',
    Kutu='${req.body.Kutu}',
    Duzenleyen='${req.body.Duzenleyen}',
    Kasalayan='${req.body.Kasalayan}',
    Disarda='${req.body.Disarda}',
    KutuIciAdet='${req.body.KutuIciAdet}',
    SqmMiktar='${req.body.SqmMiktar}',
    Bagli='${req.body.Bagli}',
    Bulunamadi='${req.body.Bulunamadi}',
    Fason='${req.body.Fason}'
    where
    ID='${req.body.ID}'
    `;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0] == 1){
            res.status(200).json({
                'status':true,
            });
        } else{
            res.status(200).json({
                'status':false,
            });
        }

    });
});
app.delete('/selection/production/delete/:crateNo',(req,res)=>{
    const sql = `delete UretimTB where KasaNo ='${req.params.crateNo}'`;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0] == 1){
            res.status(201).json({
                'status':true,
            });
        } else{
            res.status(201).json({
                'status':false,
            });
        };

    })
});
/*Crate Sizes */
app.get('/selection/production/cratesize',(req,res)=>{
    const sql = `
        select 

	kdy.ID,
	kdy.Crate_Width,
	kdy.Crate_Height,
	kdy.Crate_Thickness,
	kdy.Stone_Size,
	kdy.SupplierId,
	kdy.Supplier,
	kdy.Piece

from Kasa_Detaylari_Yeni kdy

    `;
    mssql.query(sql,(err,cratesize)=>{
        res.status(200).json({
            'cratesize':cratesize.recordset
        })
    });
});
app.post('/selection/production/cratesize/save',(req,res)=>{

    const sql = `insert into Kasa_Detaylari_Yeni(Crate_Width,Crate_Height,Crate_Thickness,Stone_Size,SupplierId,Supplier,Piece)
VALUES('${req.body.width}','${req.body.height}','${req.body.thickness}','${req.body.Ebat}','${req.body.TedarikciId}','${req.body.TedarikciAdi}','${req.body.Adet}')`;

    const sql2 = `select top 1 * from Kasa_Detaylari_Yeni order by ID desc`;
    mssql.query(sql,(err,results)=>{
        mssql.query(sql2,(err,cratesize)=>{
           if(cratesize.rowsAffected[0] == 1){
                res.status(200).json({
                    'cratesize':cratesize.recordset[0],
                    'status':true
                });
            }else{
                res.status(200).json({
                    'status':false
                });
            }
           
        });
    });
});
app.put('/selection/production/cratesize/update',(req,res)=>{
    const sql = `
        update Kasa_Detaylari_Yeni SET Crate_Width='${req.body.width}',Crate_Height='${req.body.height}',Crate_Thickness='${req.body.thickness}',Stone_Size='${req.body.Ebat}',SupplierId='${req.body.TedarikciId}',Supplier='${req.body.TedarikciAdi}',Piece='${req.body.Adet}'
WHERE ID='${req.body.ID}'
    `;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0] == 1){
            res.status(200).json({
                'status':true
            });
        } else{
            res.status(200).json({
                'status':false
            })
        }
        
    });
});
app.delete('/selection/production/cratesize/delete/:id',(req,res)=>{
    const sql = `delete Kasa_Detaylari_Yeni where Id='${req.params.id}'`;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0] == 1){
            res.status(200).json({
                'id':req.params.id,
                'status':true,
            });
        } else{
            res.status(200).json({
                'status':false,                
            });
        }

    })
});

/*Cards */
function sizeId (en,boy,kenar,userId,date,cb) {
    const sizeSql = `select top 1 ID from OlculerTB where En='${en}' and Boy ='${boy}' and Kenar='${kenar}'`;
    mssql.query(sizeSql,(err,result)=>{
        if(result.rowsAffected[0] >= 1){
            cb(result.recordset[0].ID);
        } else{
            const sizeSqlInsert = `insert into OlculerTB(En,Boy,Kenar,KullaniciID,KayitTarihi) VALUES('${en}','${boy}','${kenar}','${userId}','${date}')`;
            mssql.query(sizeSqlInsert,(err,result)=>{
               if(result.rowsAffected[0] == 1){
                    const sizeIdSql = `select top 1 ID from OlculerTB order by ID desc`; 
                    mssql.query(sizeIdSql,(err,result)=>{
                       cb(result.recordset[0].ID); 
                    });
                };
            });
        }
    });

}
function categoryId (kategori,id,userId,date,cb){
    if(id){
      cb(id);
    } else{


        const categoryInsertSql = `insert into KategoriTB(KategoriAdi,KullaniciID,KayitTarihi) 
        VALUES('${kategori}','${userId}','${date}')`;
        mssql.query(categoryInsertSql,(err,results) =>{
            if(results.rowsAffected[0] == 1){
                const categoryIdSql = 'select top 1 ID from KategoriTB order by ID desc';
                mssql.query(categoryIdSql,(err,category)=>{
                    cb(category.recordset[0].ID);
                })
            }
        });
    };
};
function surfaceId (surface,id,userId,date,cb){
    if(id){
        cb(id);
    } else{
        const surfaceIdInsertSql = `insert into YuzeyKenarTB(YuzeyIslemAdi,KullaniciID,KayitTarihi) VALUES('${surface}','${userId}','${date}')`;
        mssql.query(surfaceIdInsertSql,(err,results)=>{
           if(results.rowsAffected[0] == 1){
             const surfaceIdSql = `select top 1 ID from YuzeyKenarTB order by ID desc`;
             mssql.query(surfaceIdSql,(err,surface)=>{
                cb(surface.recordset[0].ID);
             });
           } 
        });
    }
};
function productId (product,id,userId,date,cb){
    if(id){
        cb(id);
    } else{
        const productIdInsertSql = `insert into UrunlerTB (UrunAdi,KullaniciID,KayitTarihi)
        VALUES('${product}','${userId}','${date}')`;
        mssql.query(productIdInsertSql,(err,results)=>{
           if(results.rowsAffected[0] == 1){
                const productIdSql = 'select top 1 ID from UrunlerTB order by ID desc';
                mssql.query(productIdSql,(err,product)=>{
                   cb(product.recordset[0].ID); 
                });
            } 
        });
    }
};
app.post('/card/save',(req,res)=>{
    sizeId(req.body.En,req.body.Boy,req.body.Kenar,req.body.userId,req.body.date,function(size){
        if(size){
            categoryId(req.body.KategoriAdi,req.body.KategoriId,req.body.userId,req.body.date,function(category){
                if(category){
                    surfaceId(req.body.YuzeyIslemAdi,req.body.YuzeyId,req.body.userId,req.body.date,function(surface){
                        if(surface){
                            productId(req.body.UrunAdi,req.body.UrunId,req.body.userId,req.body.date,function(product){
                                if(product){
                                    const cardSql = `insert into UrunKartTB(UrunID,YuzeyID,OlcuID,KategoriID,KullaniciID,KayitTarihi)
                                    Values('${product}','${surface}','${size}','${category}','${req.body.userId}','${req.body.date}')`;
                                    mssql.query(cardSql,(err,results)=>{
                                        if(results.rowsAffected[0] == 1){
                                            res.status(200).json({
                                                'status':true,
                                            });
                                        } else{
                                            res.status(200).json({
                                            'status':false, 
                                            });
                                        }
                                    });
                                };
                            });
                        }
                        
                    });


                    
                    
                };
            });
            

        }
    });
});


function sizeIdControl(width, height, thickness, id) {
    return new Promise((resolve, reject) => {
        const controlSql = `select top 1 * from OlculerTB where En='${width}' and Boy='${height}' and Kenar='${thickness}'`;
        mssql.query(controlSql, (err, control) => {
            if (control.recordset.length > 0) {
                resolve(control.recordset[0].ID);
            } else {
                const insertSizeSql = `insert into OlculerTB(En,Boy,Kenar) VALUES('${width}','${height}','${thickness}')`;
                mssql.query(insertSizeSql, (err, insert) => {
                    if (insert.rowsAffected[0] == 1) {
                        const getSizeIdSql = `select top 1 ID from OlculerTB order by ID desc`;
                        mssql.query(getSizeIdSql, (err, getId) => {
                            resolve(getId.recordset[0].ID);
                        })
                    }
                });
           }
        });
    });
}
function productIdControl(productName, productId) {
    return new Promise((resolve, reject) => {
    if (productId == null || productId == undefined || productId == '' || productId == ' ') {
        const productControl = `select top 1 * from UrunlerTB where UrunAdi='${productName}'`;
        mssql.query(productControl, (err, productControlId) => {
            if (productControlId.recordset.length > 0) {
                resolve(productControlId.recordset[0].ID);
            } else {
                const insertProductSql = `insert into UrunlerTB(UrunAdi) VALUES('${productName}')`;
                mssql.query(insertProductSql, (err, insertProduct) => {
                    if (insertProduct.rowsAffected[0] == 1) {
                        const getProductIdSql = `select top 1 ID from UrunlerTB order by ID desc`;
                        mssql.query(getProductIdSql, (err,getProductId) => {
                            resolve(getProductId.recordset[0].ID); 
                        });
                    }
                });
                        }
        });
    } else {
        resolve(productId);
    }
    });


};
function categoryIdControl(categoryName, categoryId) {
    return new Promise((resolve, reject) => {
    if (categoryId == null || categoryId == undefined || categoryId == '' || categoryId == ' ') {
        const controlCategorySql = `select top 1 * from KategoriTB where KategoriAdi='${categoryName}'`;
        mssql.query(controlCategorySql, (err, controlCategory) => {
            if (controlCategory.recordset.length > 0) {
                resolve(controlCategory.recordset[0].ID)
            } else {
                const insertCategorySql = `insert into KategoriTB(KategoriAdi) VALUES('${categoryName}')`;
                mssql.query(insertCategorySql, (err, insertCategory) => {
                    if (insertCategory.rowsAffected[0] == 1) {
                        const getCategoryIdSql = `select top 1 ID from KategoriTB order by ID desc`;
                        mssql.query(getCategoryIdSql, (err, getCategoryId) => {
                            if (getCategoryId.recordset.length > 0) {
                                resolve(getCategoryId.recordset[0].ID);
                            }
                        });
                    }
                })
            }
        });
    } else {
                resolve(categoryId);
    }
    });

};
function surfaceIdControl(surfaceName, surfaceId) {
    return new Promise((resolve, reject) => {
    if (surfaceId == null || surfaceId == undefined || surfaceId == '' || surfaceId == ' ') {
        const controlSurfaceSql = `select top 1 * from YuzeyKenarTB where YuzeyIslemAdi='${surfaceName}'`;
        mssql.query(controlSurfaceSql, (err, controlSurface) => {
            if (controlSurface.recordset.length > 0) {
                resolve(controlSurface.recordset[0].ID)
            } else {
                const insertSurfaceSql = `insert into YuzeyKenarTB(YuzeyIslemAdi) VALUES('${surfaceName}')`;
                mssql.query(insertSurfaceSql, (err, insertSurface) => {
                    if (insertSurface.rowsAffected[0] == 1) {
                        const getSurfaceIdSql = `select top 1 ID from YuzeyKenarTB order by ID desc`;
                        mssql.query(getSurfaceIdSql, (err, getSurfaceId) => {
                            if (getSurfaceId.recordset.length > 0) {
                                resolve(getSurfaceId.recordset[0].ID);
                            }
                        });
                    }
                })
            }
        });
    } else {
                resolve(surfaceId);
    }
    });

};



app.put('/card/update', (req, res) => {
    
    sizeIdControl(req.body.En, req.body.Boy, req.body.Kenar, req.body.OlcuId)
        .then(sizeId => {
            
            if (sizeId) {
                productIdControl(req.body.UrunAdi, req.body.UrunId)
                    .then(productId => {
                        if (productId) {
                            categoryIdControl(req.body.KategoriAdi, req.body.KategoriId)
                                .then(categoryId => {
                                    if (categoryId) {
                                        surfaceIdControl(req.body.YuzeyIslemAdi, req.body.YuzeyId)
                                            .then(surfaceId => {
                                                const updateCardSql = `update UrunKartTB SET UrunID='${productId}', YuzeyID='${surfaceId}',OlcuID='${sizeId}',KategoriID='${categoryId}' where ID='${req.body.ID}'`;
                                                mssql.query(updateCardSql, (err, updateCard) => {
                                                    if (updateCard.rowsAffected[0] == 1) {
                                                        res.status(200).json({ 'status': true });
                                                    } else {
                                                        res.status(200).json({ 'status': false });
                                                        
                                                    }
                                                });
                                            });
                                    }
                                });
                        }
                    });
            }
    })

    // const sizeSql = `select ID from OlculerTB where En='${req.body.En}' and Boy ='${req.body.Boy}' and Kenar='${req.body.Kenar}'`;
    // mssql.query(sizeSql)
    // .then(response=>{
    //    if(response.recordset.length >0){
    //         const sizeId = response.recordset[0].ID;
    //         const cardSql = `update UrunKartTB SET UrunID='${req.body.UrunId}', YuzeyID='${req.body.YuzeyId}',OlcuID='${sizeId}',KategoriID='${req.body.KategoriId}' where ID='${req.body.ID}'`
    //         mssql.query(cardSql)
    //         .then(response=>{
    //             if(response.rowsAffected[0] == 1){
    //                 res.status(200).json({
    //                     'status':true,
    //                 });
    //             } else{
    //                 res.status(200).json({
    //                     'status':false,
    //                 });
    //             };

    //         });
    //     }else{
    //         const sizeSql = `insert into OlculerTB(En,Boy,Kenar,KullaniciID,KayitTarihi) VALUES('${req.body.En}','${req.body.Boy}','${req.body.Kenar}','${req.body.userId}','${req.body.date}')`;
    //         mssql.query(sizeSql).then(response=>{
    //            const sizeIdSql = `select top 1 ID from OlculerTB order by ID desc`;
    //             mssql.query(sizeIdSql).then(id=>{
    //                 const sizeId = id.recordset[0].ID;
    //                 const cardSql = `update UrunKartTB SET UrunID='${req.body.UrunId}', YuzeyID='${req.body.YuzeyId}',OlcuID='${sizeId}',KategoriID='${req.body.KategoriId}' where ID='${req.body.ID}'`

    //                 mssql.query(cardSql)
    //                 .then(response=>{
    //                     if(response.rowsAffected[0] == 1){
    //                         res.status(200).json({
    //                             'status':true,
    //                         });
    //                     } else{
    //                         res.status(200).json({
    //                             'status':false,
    //                         });
    //                     };
    //                 });
    //             });

    //         });
    //     }
    // });
});


app.delete('/card/delete/:id',(req,res)=>{
    const id = req.params.id;
    const sql = `delete UrunKartTB where ID='${id}'`;
    mssql.query(sql).then(response=>{
        if(response.rowsAffected[0] == 1){
            res.status(200).json({
                'status':true
            });
        } else{
            res.status(200).json({
                'status':false
            });
        }

    })

});

app.get('/card/order/list/:id',(req,res)=>{
    const sql = `
    select 

	m.FirmaAdi,
	s.SiparisNo,
	su.SatisFiyati,
	su.Miktar,
	ub.BirimAdi,
	(su.SatisFiyati * su.Miktar) as Toplam

from SiparislerTB s
inner join SiparisUrunTB su on su.SiparisNo= s.SiparisNo
inner join MusterilerTB m on m.ID = s.MusteriID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
where su.UrunKartID=${req.params.id}
    `;
    mssql.query(sql,(err,cardsOrders)=>{
        res.status(200).json({'list':cardsOrders.recordset});
    });

});


/*Supplier*/
app.post('/supplier/save',(req,res)=>{
    const sql = `insert into TedarikciTB(FirmaAdi) VALUES('${req.body.FirmaAdi}')`;
    mssql.query(sql)
    .then(results=>{
       if(results.rowsAffected[0] == 1){
        res.status(200).json({
            'status':true,
        });
       } else{
        res.status(200).json({
            'status':false,
        });
       }

    });
});
app.put('/supplier/update',(req,res)=>{
    const sql = `update TedarikciTB SET FirmaAdi='${req.body.FirmaAdi}' where ID='${req.body.ID}'`;
    mssql.query(sql)
    .then(results=>{
        if(results.rowsAffected[0] == 1){
            res.status(200).json({
                'status':true
            });
        } else{
            res.status(200).json({
                'status':false
            }) 
        }
       
    });
});
app.delete('/supplier/delete/:id',(req,res)=>{
    const sql = `delete TedarikciTB where ID='${req.params.id}'`;
    mssql.query(sql)
    .then(results=>{
        if(results.rowsAffected[0] == 1){
            res.status(200).json({
                'status':true
            })
        } else{
            res.status(200).json({
                'status':false
            })
        }

    })
});

/*Shipment */
app.get(`/shipment/product/amount/:po/:orderId/:cardId/:supplier`,(req,res)=>{
    const orderAmountSql = `select Miktar from SiparisUrunTB where ID='${req.params.orderId}'`;
    const productionAmountSql = `select sum(Miktar) as Miktar from UretimTB where SiparisAciklama='${req.params.po}' and UrunKartID=${req.params.cardId}`;
    const productionListSql = `
        select ur.ID,ur.KasaNo,ur.Miktar,uk.ID as UrunKartId,k.KategoriAdi,urun.UrunAdi,yk.YuzeyIslemAdi,ol.En,ol.Boy,ol.Kenar,ub.BirimAdi,
        (select su.SatisFiyati * ur.Miktar from SiparisUrunTB su where su.SiparisNo = ur.SiparisAciklama and su.UrunKartID = ur.UrunKartID and su.TedarikciID = ur.TedarikciID) as TotalProduct,
        (select su.SatisFiyati from SiparisUrunTB su where su.SiparisNo = ur.SiparisAciklama and su.UrunKartID = ur.UrunKartID and su.TedarikciID=ur.TedarikciID) as SatisFiyati

        from 
            UretimTB ur
            inner join UrunKartTB uk on uk.ID = ur.UrunKartID
            inner join KategoriTB k on k.ID = uk.KategoriID
            inner join UrunlerTB urun on urun.ID = uk.UrunID
            inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
            inner join OlculerTB ol on ol.ID = uk.OlcuID
            inner join UrunBirimTB ub on ub.ID = ur.UrunBirimID
        where 
        ur.SiparisAciklama='${req.params.po}' 
        and ur.UrunKartID='${req.params.cardId}'
        and ur.TedarikciID = '${req.params.supplier}'
    `;
    mssql.query(orderAmountSql)
    .then(orderAmount=>{
        mssql.query(productionAmountSql)
        .then(productionAmount=>{
            const remainder = parseFloat(orderAmount.recordset[0].Miktar) - parseFloat(productionAmount.recordset[0].Miktar);
            mssql.query(productionListSql)
            .then(productionList=>{
                let productionListN = [];
                if(productionList.recordset.length >0){
                    productionListN = productionList.recordset;
                }else{
                    productionListN = [];
                }
                res.status(200).json({
                    'order':orderAmount.recordset[0].Miktar,
                    'production':productionAmount.recordset[0].Miktar,
                    'remainder':remainder,
                    'productionList':productionListN,
                 });
            });
            
        });
        

    });

});
app.post('/shipment/products/save',(req,res)=>{
    
    const updateOrderSql = `update SiparislerTB SET SiparisDurumID=3, YuklemeTarihi='${req.body.YuklemeTarihi}' where SiparisNo='${req.body.SiparisNo}'`;
    for(const item of req.body.data){
        const updateProductionSql = `update UretimTB SET UrunDurumID= 0 where KasaNo='${item.KasaNo}'`;
        const insertSql = `
            insert into SevkiyatTB(Tarih,KasaNo,MusteriID,BirimFiyat,Toplam,CikisNo,RaporDurum,KullaniciID) 
            VALUES('${item.Tarih}','${item.KasaNo}','${item.MusteriId}','${item.SatisFiyati}','${item.TotalProduct}','${item.SiparisNo}','1','${item.KullaniciId}');
        `;
        mssql.query(updateProductionSql)
        .then(response=>{
            mssql.query(insertSql)
            .then(response=>{
                mssql.query(updateOrderSql,(err,results)=>{
                    
                });
            });
        });
    };
        res.status(200).json({
            'status':true,
        })

    
});
app.get('/shipment/order/control/:po',(req,res)=>{
    const sql = `select NavlunSatis,TeslimTurID from SiparislerTB where SiparisNo='${req.params.po}'`;
    mssql.query(sql, (err, po) => {
        res.status(200).json({ 'po': po.recordset[0] }); 
    });

});

/*Upload Document*/
function documentColor(po,doc,cb){
    const sql = `
    select sp.YuklemeEvrakID,sp.SiparisFaturaTurID,sp.EvrakAdi,
    (select nfk.FirmaID from NakliyeFaturaKayitTB nfk where nfk.ID = sp.FaturaKayitID) as NakliyeFirmaID,
    (select (select firma.FirmaAdi from FirmalarTB firma where firma.ID = nfk.FirmaID) from NakliyeFaturaKayitTB nfk where nfk.ID = sp.FaturaKayitID) as NakliyeFirmaAdi,
                            (select (select firma.FirmaAdi  from FirmalarTB firma  where firma.ID=k.FirmaID) as firma from KonteynerDigerFaturalarKayitTB k where k.ID = sp.FaturaKayitID) as KonteynerFirmaAdi,
                (select (select firma.ID  from FirmalarTB firma  where firma.ID=k.FirmaID) as firma from KonteynerDigerFaturalarKayitTB k where k.ID = sp.FaturaKayitID) as KonteynerFirmaID
    from SiparisFaturaKayitTB sp where SiparisNo='${po}'
    `;
    mssql.query(sql,(err,poDocument)=>{
        let docModel = [];
        for(const item of doc){
            const index = poDocument.recordset.findIndex(x=>x.YuklemeEvrakID == item.ID);
            if(index > -1){
                docModel.push({...item,'Color':'yellow','SiparisNo':po,'NakliyeFirmaID':poDocument.recordset[index].NakliyeFirmaID,'KonteynerFirmaID':poDocument.recordset[index].KonteynerFirmaID,'DocName':poDocument.recordset[index].EvrakAdi});
            }else{
                docModel.push({...item,'Color':'gray','SiparisNo':po});
            };
        };
        cb(err,docModel);
        
    });
    
}
app.get('/upload/document/:po',(req,res)=>{
    const sql = 'select ID,EvrakAdi from YeniYuklemeEvraklarTB';
    mssql.query(sql)
    .then(documentsModel=>{
        documentColor(req.params.po,documentsModel.recordset,function(err,data){
            res.status(200).json({
                'model':data
            });
        }); 
    });
});
app.get('/upload/model',(req,res)=>{
    const sql = 'select ID,EvrakAdi from YeniYuklemeEvraklarTB';
    mssql.query(sql)
    .then(model=>{
       const modelData = [];
       model.recordset.forEach(x=>{
            x.Color = 'gray';
            modelData.push(x);
        });
       res.status(200).json({
            'model':modelData
        }) 
    });
});
app.get(`/upload/document/form/:po/:docId`,(req,res)=>{
    const sql = `select ID,SiparisFaturaTurID,SiparisNo,YuklemeEvrakID,EvrakAdi,Evrak_Kontrol from SiparisFaturaKayitTB  where SiparisNo='${req.params.po}' and YuklemeEvrakID = '${req.params.docId}'`;
    mssql.query(sql,(err,doc)=>{
        const data = [];
        doc.recordset.forEach(x=>{
            if(x.YuklemeEvrakID == 2){
              data.push({'Draft':`https://file-service.mekmar.com/file/download/2/${x.SiparisNo}`,...x}) 
            };
        });
        res.status(200).json({
            'doc':data
        })
    });
});
app.post('/upload/file',(req,res)=>{
    const value = req.body;
    const sql = `
                        insert into SiparisFaturaKayitTB 
                                    
                        (  
                        Tarih,
                        FaturaKayitID,
                        SiparisFaturaTurID,
                        SiparisNo,
                        YuklemeEvrakID,
                        YuklemeEvrakDurumID,
                        EvrakAdi,
                        EvrakYuklemeTarihi,KullaniciID)
                        
                    values ('${value.tarih}', '${0}','${0}','${value.siparisno}','${value.id}','${2}','${value.siparisno + '.pdf'}','${value.tarih}','${value.kullaniciId}')
                `;
     mssql.query(sql)
     .then(response=>{
            res.status(200).json({
                'status':true
            })
        })
});

/*Container*/
app.get('/container/follow/list',(req,res)=>{
    const sql = `
                select
                s.ID,
                s.SiparisNo,
                m.FirmaAdi as MusteriAdi,
                s.Pesinat,
                NavlunSatis + DetayTutar_1 + DetayTutar_2 + DetayTutar_3  as Navlun,
                ( Select Sum(o.Tutar) from OdemelerTB o where o.SiparisNo=s.SiparisNo ) as Odemeler,
                (Select Sum(u.SatisToplam) from SiparisUrunTB u where u.SiparisNo=s.SiparisNo) as MalBedeli,
                (select k.KullaniciAdi from KullaniciTB k where k.ID=s.SiparisSahibi ) as Sorumlu,
                s.Eta,
                s.KonteynerNo,
                s.YuklemeTarihi,
                s.KonsimentoDurum,
                s.AktarmaLimanAdi,
                s.Line,
                s.Takip
                from
                SiparislerTB s,MusterilerTB m
                where s.MusteriID=m.ID
                and s.SiparisDurumID=3 and s.Takip=1
                order by s.ID desc
              `;
    mssql.query(sql)
    .then(response=>{
        const data = response.recordset;
        data.forEach(x=>{
            if(x.Eta == null){
                x.Kalan = 0;
            } else{
                const today = new Date();
                const date = new Date(x.Eta);
                const reminderDate = Math.round((date - today) / 86400000);
                if(reminderDate < 0){
                    x.Kalan = 0;
                } else{
                    x.Kalan = reminderDate;
                }

            }
        })
        res.status(200).json({
            'follow':data,
        });
    });
});
app.post('/container/follow/save',(req,res)=>{
    const sql = `update SiparislerTB SET 
    Eta='${req.body.EtaTarihi}',
    KonteynerNo='${req.body.KonteynırNo}',
    KonsimentoDurum='${req.body.KonsimentoDurum}',
    Line='${req.body.Line}',
    Takip='${req.body.Takip}' where 
    SiparisNo='${req.body.SiparisNo}'`;
    mssql.query(sql)
    .then(response=>{
       if(response.rowsAffected[0] == 1){
            res.status(200).json({
                'status':true,
            });
        } else{
            res.status(200).json({
                'status':false,      
            });
        };
    });

});
app.get('/container/unfollow/list',(req,res)=>{
    const sql = `
            select
            s.ID,
            s.SiparisNo,
            m.FirmaAdi as MusteriAdi,
            s.Pesinat,
            NavlunSatis + DetayTutar_1 + DetayTutar_2 + DetayTutar_3  as Navlun,
            ( Select Sum(o.Tutar) from OdemelerTB o where o.SiparisNo=s.SiparisNo ) as Odemeler,
            (Select Sum(u.SatisToplam) from SiparisUrunTB u where u.SiparisNo=s.SiparisNo) as MalBedeli,
            (select k.KullaniciAdi from KullaniciTB k where k.ID=s.SiparisSahibi ) as Sorumlu,
            s.Eta,
            s.KonteynerNo,
            s.YuklemeTarihi,
            s.KonsimentoDurum,
            s.AktarmaLimanAdi,
            s.Line,
            s.Takip
            from
            SiparislerTB s,MusterilerTB m
            where s.MusteriID=m.ID
            and s.SiparisDurumID=3 and s.Takip=0
            order by s.ID desc
        `;
    mssql.query(sql)
    .then(response=>{
        res.status(200).json({
            'unfollow':response.recordset
        })
    })
});

function containerInputResults(po,cb){
    const sql = `select ID,FaturaNo,FirmaID from KonteynerDigerFaturalarKayitTB where FaturaNo='${po}'`;
    mssql.query(sql,(err,results)=>{
        cb(err,results.recordset[0]);
    });
}

app.post('/container/input/save',(req,res)=>{
    const sql = `INSERT INTO KonteynerDigerFaturalarKayitTB (FirmaID, Tarih, FaturaNo,Kur,KayitTarihi,Aciklama,KullaniciID)    values
                ('${req.body.companyid}','${req.body.date}','${req.body.invoiceno}','${req.body.currency}','${req.body.nowDate}','${req.body.description}','${req.body.userId}')`;
    mssql.query(sql)
    .then(response=>{
       if(response.rowsAffected[0] == 1){
        containerInputResults(req.body.invoiceno,function(err,containerResults){
            res.status(200).json({
                'status':true,
                'containerResults':containerResults
            });
        });
       }else{
            res.status(200).json({
                'status':false,
                'containerResults':null,
            });
       }
    });
});

app.post('/container/input/file/save',(req,res)=>{

    const sql = `
                    INSERT INTO SiparisFaturaKayitTB (
                        Tarih,
                        FaturaKayitID,
                        SiparisFaturaTurID, 
                        SiparisNo,
                        Tutar,
                        EvrakDurum,
                        YuklemeEvrakID,
                        YuklemeEvrakDurumID,
                        EvrakYuklemeTarihi,
                        EvrakAdi ,KullaniciID
                        )   
                    VALUES
                    ('${req.body.date}','${req.body.invoiceid}','${req.body.invoicekindid}','${req.body.po}','${req.body.usd}','${1}','${req.body.invoicedocumentid}','${2}','${req.body.nowDate}','${req.body.invoiceno + '.pdf'}','${req.body.userId}')
                `;

    mssql.query(sql)
    .then(response=>{
        if(response.rowsAffected[0] == 1){
            res.status(200).json({
                'status':true
            });
        } else{
            res.status(200).json({
                'status':false,
            });
        }
    });
});

function containerInvoiceKind(x,cb){
    let value = {};
    if(x.SiparisFaturaTurID == 73){
       value.name = 'İlaçlama';
       value.link = `https://file-service.mekmar.com/file/download/customer/${x.FirmaID}/${x.EvrakAdi}`;
    } else if (x.SiparisFaturaTurID == 7 || x.SiparisFaturaTurID == 8){
        value.name = 'Gümrük';
        value.link = `https://file-service.mekmar.com/file/download/customer/${x.FirmaID}/${x.EvrakAdi}`;
    } else if (x.SiparisFaturaTurID == 13 && x.YuklemeEvrakID == 50){
        value.name = 'Navlun';
        value.link = `https://file-service.mekmar.com/file/download/customer/${x.FirmaID}/${x.EvrakAdi}`;
    } else if (x.SiparisFaturaTurID == 100 && x.YuklemeEvrakID == 50){
        value.name = 'Lashing';
        value.link = `https://file-service.mekmar.com/file/download/customer/${x.FirmaID}/${x.EvrakAdi}`;
    } else if (x.SiparisFaturaTurID == 101 && x.YuklemeEvrakID == 50){
        value.name = 'Booking';
        value.link = `https://file-service.mekmar.com/file/download/customer/${x.FirmaID}/${x.EvrakAdi}`;
    } else if (x.SiparisFaturaTurID == 102 && x.YuklemeEvrakID == 50){
        value.name = 'Spanzet';
        value.link = `https://file-service.mekmar.com/file/download/customer/${x.FirmaID}/${x.EvrakAdi}`;
    } else if (x.SiparisFaturaTurID == 15){
        value.name = 'Sigorta';
        value.link = `https://file-service.mekmar.com/file/download/customer/${x.FirmaID}/${x.EvrakAdi}`;
    } else if ((x.SiparisFaturaTurID == 9 || x.SiparisFaturaTurID == 10 ) && x.YuklemeEvrakID == 50){
        value.name = 'Liman';
        value.link = `https://file-service.mekmar.com/file/download/customer/${x.FirmaID}/${x.EvrakAdi}`;
    };
    cb(value);
}
app.get('/container/input/list',(req,res)=>{
    const sql = `
select (select a.FirmaAdi from FirmalarTB a where a.ID=k.FirmaID)  as firma,
                    f.EvrakYuklemeTarihi ,
                    f.SiparisFaturaTurID, 
                    f.SiparisNo ,
                    k.FaturaNo , 
                    f.EvrakAdi, 
                    k.FirmaID,
                    f.YuklemeEvrakID,
                    k.Kur,
                    k.ID,
                    f.Tutar,
                    k.Aciklama
                    from SiparisFaturaKayitTB f , KonteynerDigerFaturalarKayitTB k  
                    where k.ID=f.FaturaKayitID and f.SiparisFaturaTurID !=0 and f.SiparisNo !='' and
					f.SiparisFaturaTurID != 11 and f.YuklemeEvrakID !=13
                    order by f.EvrakYuklemeTarihi desc
                `;
    mssql.query(sql,(err,results)=>{
       let data = [];
        results.recordset.forEach(x=>{
            containerInvoiceKind(x,function(res){
                data.push({'Tur':res.name,'Link':res.link,...x});
            });
        });
       res.status(200).json({
        'list':data,
       }); 
    });

});


/*Transport*/
app.get('/transport/company/list',(req,res)=>{
    const sql = 'select ID,FirmaAdi,Telefon,MailAdresi,Notlar from FirmalarTB order by ID desc';
    mssql.query(sql)
    .then(response=>{
       res.status(200).json({
            'company':response.recordset,
        }); 
    });
});
app.post('/transport/company/save',(req,res)=>{
    const sql = `insert into FirmalarTB(FirmaAdi,Telefon,MailAdresi,Notlar)
    VALUES('${req.body.companyname}','${req.body.phone}','${req.body.mail}','${req.body.description}')`;
    mssql.query(sql)
    .then(response=>{
       if(response.rowsAffected[0] == 1){
        res.status(200).json({
            'status':true,
        });
       }else{
        res.status(200).json({
            'status':false,
        });
       }
       
    });
});
function invoiceIdSave(x){
    const sql = `select count(*) as durum from YeniNakliyeFaturalarıTB where SiparisNo='${x.po}'`;
    mssql.query(sql).then(response=>{
       let id;
       if(response.recordset[0].durum == 0){
            id = 201;
        } else{
            id = 201 + response.recordset[0].durum;
        };
        const sqlIdInsert = `INSERT INTO YeniNakliyeFaturalarıTB (EvrakID, SiparisNo, EvrakAdi)    values
        ('${id}','${x.po}','${x.invoiceno}')`;
        mssql.query(sqlIdInsert);
    });
};
app.post('/transport/list/save',(req,res)=>{
    req.body.forEach(x=>{
        const sql = `
            INSERT INTO NakliyeFaturaKayitTB (FirmaID, Tarih, FaturaNo, Tutar,Kur,KayitTarihi,KullaniciID)    values
            ('${x.companyId}','${x.date}','${x.invoiceno}','${x.tl}','${x.currency}','${x.nowDate}','${x.userId}')
        `;
        mssql.query(sql)
        .then(response=>{
           if(response.rowsAffected[0] == 1){
                invoiceIdSave(x)
            } 
        });
    });
    res.status(200).json({
        'status':true
    })
    
});
function transportProductId(x,cb){
    const sql = `Select ID from NakliyeFaturaKayitTB where  FaturaNo='${x.invoiceno}'`;
    mssql.query(sql,(err,results)=>{
       if(results.recordset.length>0){
            cb(err,results.recordset[0].ID); 
       };
    });

};
function transportInvoiceId(x,cb){
    const sql = `Select count(*) as durum from YeniNakliyeFaturalarıTB where SiparisNo='${x.po}'`;
    mssql.query(sql,(err,results)=>{
       if(results){
        cb(err,(results.recordset[0].durum + 201));
       } 
    });
};
app.post('/transport/file/list/save',(req,res)=>{
    let index = 0;
    req.body.forEach(x=>{
        transportProductId(x,function(err,transportProductId){
            transportInvoiceId(x,function(err,transportInvoiceId){
                const sql = `
                INSERT INTO SiparisFaturaKayitTB (
                    Tarih,
                    FaturaKayitID,
                    SiparisFaturaTurID, 
                    SiparisNo,
                    Tutar,
                    EvrakDurum,
                    YuklemeEvrakID,
                    YeniEvrakID,
                    YuklemeEvrakDurumID,
                    EvrakYuklemeTarihi,
                    EvrakAdi  ,KullaniciID
                )   
                values
                ('${x.date}','${transportProductId}','11','${x.po}','${x.usd}','1','13','${transportInvoiceId}','2','${x.nowDate}','${x.invoiceno}.pdf','${x.userId}')
                `;
                mssql.query(sql);
            });
        });
        index += 1;
        if(index == req.body.length){
            res.status(200).json({
                'status':true,
            });
        };
    });
});
app.get('/transport/list',(req,res)=>{
    const sql = ` select 
                    s.SiparisNo,
                    n.FaturaNo,
                    (select f.FirmaAdi from FirmalarTB f where f.ID=n.FirmaID ) as firma_adi,
                    (select f.ID from FirmalarTB f where f.ID=n.FirmaID ) as firma_id,
                    s.Tutar,
                    n.Kur,
                    s.Tarih,
                    n.ID as NakliyeID,
					s.ID as SiparisFaturaID
                    
                    from SiparisFaturaKayitTB s ,NakliyeFaturaKayitTB n where 
                    s.YuklemeEvrakID=13 and s.SiparisFaturaTurID=11  and Year(s.Tarih) in (2025,2024,2023,2022,2021)  and n.FaturaNo+'.pdf' = s.EvrakAdi and n.ID = s.FaturaKayitID
                
                    group by s.ID ,s.SiparisNo , n.FaturaNo , n.FirmaID ,s.Tutar,n.Kur,s.Tarih,n.ID

                    order by s.Tarih desc`;
    mssql.query(sql)
    .then(response=>{
       const data = [];
       response.recordset.forEach(x=>{
            x.link = `https://file-service.mekmar.com/file/download/customer/${x.firma_id}/${x.FaturaNo}.pdf`;
            data.push(x);
       });
       res.status(200).json({
            'transport':data,
        }) 
    });
});
app.put('/transport/list/update', async (req, res) => {
    const transportSql = `update NakliyeFaturaKayitTB SET Tarih='${req.body.date}',FaturaNo='${req.body.invoice}',Tutar='${req.body.tl}',Kur='${req.body.currency}' where ID='${req.body.transportId}'`;
    const productSql = `update SiparisFaturaKayitTB SET SiparisNo='${req.body.po}',Tutar='${req.body.usd}' where ID='${req.body.productInvoiceId}'`;
    await mssql.query(transportSql, async (err, transport) => {
        if (transport.rowsAffected[0] == 1) {
            await mssql.query(productSql, (err, product) => {
                if (product.rowsAffected[0] == 1) {
                    res.status(200).json({ 'status': true });
                } else {
                    res.status(200).json({ 'status': false });
               }
           })
        } else {
            res.status(200).json({ 'status': false });
       }
    });

});

app.put('/transport/list/delete', async (req, res) => {
    const transportIdDelete = `delete NakliyeFaturaKayitTB where ID='${req.body.transportId}'`;
    const productIdDelete = `delete SiparisFaturaKayitTB where ID='${req.body.productInvoiceId}'`;
    await mssql.query(transportIdDelete, async (err, transport) => {
        if (transport.rowsAffected[0] == 1) {
            await mssql.query(productIdDelete, async (err, product) => {
                if (product.rowsAffected[0] == 1) {
                    res.status(200).json({ 'status': true });
                } else {
                    res.status(200).json({ 'status': false });
                }
            })
        }
    })
})

/*Customer */
app.get('/customer/mekmar/list',(req,res)=>{
    const sql = `
            select
            m.*,
            u.UlkeAdi,
            u.Png_Flags,
            (select ku.KullaniciAdi from KullaniciTB ku where ku.ID = m.MusteriTemsilciId) as Temsilci,
            (select ku.Id from KullaniciTB ku where ku.ID = m.MusteriTemsilciId) as TemsilciId,

            (select ku.KullaniciAdi from KullaniciTB ku where ku.ID = m.Satisci) as SatisciAdi,
            (select ku.Id from KullaniciTB ku where ku.ID = m.Satisci) as SatisciId

            from
            MusterilerTB m,YeniTeklif_UlkeTB u
            where u.Id=m.UlkeId
            order by m.ID
                `;
    mssql.query(sql,(err,results)=>{
        res.status(200).json({
            'list':results.recordset,
        });
    });
});

app.get(`/customer/mekmar/detail/orders/:id`,(req,res)=>{
    const yearsSql = `
                        select YEAR(s.YuklemeTarihi) as Year,s.MusteriID as CustomerId from SiparislerTB s where s.MusteriID = '${req.params.id}' and YEAR(s.YuklemeTarihi) IS NOT NULL
                        group by YEAR(s.YuklemeTarihi),s.MusteriID
                `;
    const orderSql = `
                    select 

                        YEAR(s.YuklemeTarihi) as Year,
                        (select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo = s.SiparisNo) + sum(s.NavlunSatis) +
                        sum(s.DetayTutar_1) +
                        sum(s.DetayTutar_2) +
                        sum(s.DetayTutar_3) as Total

                    from SiparislerTB s 
                    where s.MusteriID = '${req.params.id}' and YEAR(s.YuklemeTarihi) is not null

                    group by YEAR(s.YuklemeTarihi),s.SiparisNo
                    order by YEAR(s.YuklemeTarihi) desc
                `;
    mssql.query(yearsSql,(err,yearResults)=>{
    mssql.query(orderSql,(err,orderResults)=>{
        res.status(200).json({
            'yearList':yearResults.recordset,
            'orderList':orderResults.recordset
        });
    });

    });
});
app.get('/customer/mekmar/detail/orders/po/:customerid/:year',(req,res)=>{
    const sql = `
                select 
                    s.ID,
                    s.SiparisNo,
                    (select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibi,
                    (select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as Operasyon

                from SiparislerTB s 

                where s.MusteriID = '${req.params.customerid}' and YEAR(s.YuklemeTarihi) ='${req.params.year}'
                `;
    mssql.query(sql,(err,results)=>{
       res.status(200).json({
        'poList':results.recordset 
       }) 
    });
});

app.get('/customer/mekmar/detail/orders/products/:po',(req,res)=>{
    const sql = `
                    select 

                        k.KategoriAdi,
                        u.UrunAdi,
                        yk.YuzeyIslemAdi,
                        ol.En,
                        ol.Boy,
                        ol.Kenar,
                        su.Miktar,
                        ub.BirimAdi,
                        su.SatisFiyati,
                        (su.Miktar * su.SatisFiyati) as SatisToplam 


                    from SiparisUrunTB su
                    inner join UrunKartTb ukt on ukt.ID = su.UrunKartID
                    inner join KategoriTB k on k.ID = ukt.KategoriID
                    inner join UrunlerTB u on u.ID = ukt.UrunID
                    inner join YuzeyKenarTB yk on yk.ID = ukt.YuzeyID
                    inner join OlculerTB ol on ol.ID = ukt.OlcuID
                    inner join UrunBirimTB ub on ub.ID = su.UrunBirimId
                    where su.SiparisNo='${req.params.po}'

                `;
    mssql.query(sql,(err,results)=>{
       res.status(200).json({
            'products':results.recordset
        }) 
    });
});

app.post('/customer/mekmar/save',(req,res)=>{
    const sql = `
                    insert into MusterilerTB
                        (FirmaAdi,
                        Unvan,
                        Adres,
                        Ulke,
                        UlkeId,
                        Marketing,
                        Aktif,
                        Sira,
                        Mt_No,
                        MusteriTemsilciId,
                        KullaniciID,
                        MailAdresi,
                        Telefon,
                        Devir,
                        Ozel,
                        MusteriOncelik,
                        Satisci,
                        Takip,
                        Notlar,
                        SonKullanici,
                        KayitTarihi)
                    VALUES(
                    '${req.body.FirmaAdi}',
                    '${req.body.Unvan}',
                    '${req.body.Adres}',
                    '${req.body.Ulke}',
                    '${req.body.UlkeId}',
                    '${req.body.Marketing}',
                    '${req.body.Aktif}',
                    '${req.body.Sira}',
                    '${req.body.Mt_No}',
                    '${req.body.TemsilciId}',
                    '${req.body.KullaniciID}',
                    '${req.body.MailAdresi}',
                    '${req.body.Telefon}',
                    '${req.body.Devir}',
                    '${req.body.Ozel}',
                    '${req.body.MusteriOncelik}',
                    '${req.body.SatisciId}',
                    '${req.body.Takip}',
                    '${req.body.Notlar}',
                    '${req.body.SonKullanici}',
                    '${req.body.KayitTarihi}')
                `;
    mssql.query(sql,(err,results)=>{
       if(results.rowsAffected[0] == 1){
            res.status(200).json({
                'status':true,
            });
       };

    });
});
app.delete('/customer/mekmar/delete/:id',(req,res)=>{
    const sql = `delete MusterilerTB where ID =${req.params.id}`;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0] == 1){
            res.status(200).json({
                'status':true
            })
        }else{
         res.status(200).json({
            'status':false
         })
        }
    });
});
app.put('/customer/mekmar/update',(req,res)=>{
    const sql = `
                    update MusterilerTB 
                    SET
                        FirmaAdi='${req.body.FirmaAdi}',
                        Unvan='${req.body.Unvan}',
                        Adres='${req.body.Adres}',
                        Ulke='${req.body.Ulke}',
                        UlkeId='${req.body.UlkeId}',
                        Marketing='${req.body.Marketing}',
                        MusteriTemsilciId='${req.body.TemsilciId}',
                        MailAdresi='${req.body.MailAdresi}',
                        Telefon='${req.body.Telefon}',
                        Devir='${req.body.Devir}',
                        Ozel='${req.body.Ozel}',
                        MusteriOncelik='${req.body.MusteriOncelik}',
                        Satisci='${req.body.SatisciId}',
                        Takip='${req.body.Takip}',
                        Notlar='${req.body.Notlar}',
                        SonKullanici='${req.body.SonKullanici}'
                    WHERE
                        ID='${req.body.ID}'
                `;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0] == 1){
            res.status(200).json({
                'status':true
            }); 
        }else{
            res.status(200).json({
                'status':false
            })
        }
    })
});
app.get('/customer/offer/list',(req,res)=>{
    const sql = `
                    select 

                        ytm.Id,
                        ytm.MusteriAdi,
                        ytm.UlkeId,
                        ytu.UlkeAdi,
                        ytm.Company,
                        ytm.Mail,
                        ytm.Phone,
                        ytm.Description,
                        ytm.Adress,
                        k.KullaniciAdi,
                        ytm.Kullanici


                    from YeniTeklif_MusterilerTB ytm
                    inner join YeniTeklif_UlkeTB ytu on ytu.Id = ytm.UlkeId
                    inner join KullaniciTB k on k.ID = ytm.Kullanici
                    order by ytm.Id desc
                `;
    mssql.query(sql,(err,results)=>{
        results.recordset?.forEach(x=>{
            x.UlkeAdi = __noneNullControl(x.UlkeAdi);
            x.Company = __noneNullControl(x.Company);
            x.Mail = __noneNullControl(x.Mail);
            x.Phone = __noneNullControl(x.Phone);
            x.Description = __noneNullControl(x.Description);
            x.Adress = __noneNullControl(x.Adress);


        });

        res.status(200).json({
            'list':results.recordset
        })
    })
});
app.post('/customer/offer/save',(req,res)=>{
    const sql = `
                    insert into YeniTeklif_MusterilerTB(MusteriAdi,UlkeId,Company,Mail,Phone,Kullanici,Adress,Description)
                    VALUES(
                        '${req.body.MusteriAdi}',
                        '${req.body.UlkeId}',
                        '${req.body.Company}',
                        '${req.body.Mail}',
                        '${req.body.Phone}',
                        '${req.body.Kullanici}',
                        '${req.body.Adress}',
                        '${req.body.Description}'
                    )
                `;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0] == 1){
            res.status(200).json({
                'status':true
            });
        }else{
            res.status(200).json({
               'status': false
            });
        }
    });
});
app.delete('/customer/offer/delete/:id',(req,res)=>{
    const sql = `
                        delete YeniTeklif_MusterilerTB where Id='${req.params.id}';
                `;
    mssql.query(sql,(err,results)=>{
       if(results.rowsAffected[0] == 1){
            res.status(200).json({
                'status':true
            })
       } else{
        res.status(200).json({
            'status':false
        })  
       }
    });
});
app.put('/customer/offer/update',(req,res)=>{
    const sql = `
                    update YeniTeklif_MusterilerTB SET 
                    MusteriAdi='${req.body.MusteriAdi}',
                    UlkeId='${req.body.UlkeId}',
                    Company='${req.body.Company}',
                    Mail='${req.body.Mail}',
                    Phone='${req.body.Phone}',
                    Adress='${req.body.Adress}',
                    Description='${req.body.Description}' 
                    where Id='${req.body.Id}'

                `;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        } else{
            res.status(200).json({'status':false});
            
        }
    })
});
app.get('/customer/bgp/list',(req,res)=>{
    const sql = `
                    select 
                        bpm.ID,
                        bpm.Customer,
                        bpm.Company,
                        bpm.Email,
                        bpm.Phone,
                        bpm.Adress,
                        bpm.Kullanici,
                        bpm.Ulke,
                        bpm.Satisci,
                        k.KullaniciAdi


                    from BgpProjectMusteriler bpm
                    inner join KullaniciTB k on k.ID = bpm.Kullanici     
                `;
    mssql.query(sql,(err,results)=>{
        res.status(200).json({
            'list':results.recordset
        })
    })
});
app.delete('/customer/bgp/delete/:id',(req,res)=>{
    const sql = `delete BgpProjectMusteriler where ID='${req.params.id}'`;
    mssql.query(sql,(err,results)=>{
       if(results.rowsAffected[0] == 1){
           res.status(200).json({'status':true});
       } else{
        res.status(200).json({'status':false});
       } 
    });
});
app.post('/customer/bgp/save',(req,res)=>{
    const sql = `insert into BgpProjectMusteriler(Customer,Company,Email,Phone,Adress,Kullanici,Ulke)
    VALUES('${req.body.Customer}','${req.body.Company}','${req.body.Email}','${req.body.Phone}','${req.body.Adress}','${req.body.KullaniciId}','${req.body.UlkeAdi}')`;
    mssql.query(sql,(err,results)=>{
       if(results.rowsAffected[0]==1){
            res.status(200).json({'status':true});
        } else{
            res.status(200).json({'status':false});
            
        }
    });
});
app.put('/customer/bgp/update',(req,res)=>{
    const sql = `
                    update BgpProjectMusteriler SET Customer='${req.body.Customer}',Company='${req.body.Company}',Email='${req.body.Email}',Phone='${req.body.Phone}',Adress='${req.body.Adress}',Ulke='${req.body.UlkeAdi}' WHERE ID='${req.body.ID}'

                `;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0]==1){
            res.status(200).json({'status':true});
        } else{
            res.status(200).json({'status':false});
            
        }
    })
});
app.get('/customer/fair/list',(req,res)=>{
    const sql = `select 
                    fm.ID,
                    fm.Customer,
                    fm.Company,
                    fm.Email,
                    fm.Phone,
                    fm.Country,
                    fm.Adress,
                    fm.Orderer,
                    fm.Kullanici,
                    fm.Fuar,
                    fm.Ziyaret,
                    u.UlkeAdi
                from FuarMusterilerTB fm
                inner join YeniTeklif_UlkeTB u on u.Id = fm.Country`;
    mssql.query(sql, (err, results) => {
        results.recordset.forEach(x => {
            if (x.Fuar == null) {
                x.Fuar = false;
            } 
            if(x.Ziyaret == null){
                x.Ziyaret == null;
            }
        })
        res.status(200).json({
            'list':results.recordset
        })
    })
});
app.post('/customer/fair/save', (req, res) => {
    const sql = `
                    insert into FuarMusterilerTB(
                        Customer,
                        Company,
                        Email,
                        Phone,
                        Country,
                        Adress,
                        Orderer,
                        Kullanici,
                        Fuar,
                        Ziyaret
                    ) VALUES('${req.body.Customer}',
                        '${req.body.Company}',
                        '${req.body.Email}',
                        '${req.body.Phone}',
                        '${req.body.Country}',
                        '${req.body.Adress}',
                        '${req.body.Orderer}',
                        '${req.body.Kullanici}',
                        '${req.body.Fuar}',
                        '${req.body.Ziyaret}')
                `;
    mssql.query(sql, (err, results) => {
        if(results.rowsAffected[0] == 1){
            res.status(200).json({ 'status': true });
        } else {
            res.status(200).json({ 'status': false });
        }
    })
});
app.delete('/customer/fair/delete/:id', (req, res) => {
    const sql = ` delete FuarMusterilerTB where ID='${req.params.id}'
                `;
    mssql.query(sql, (err, results) => {
        if (results.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        } else {
            res.status(200).json({ 'status': false });
        } 
    });
});
app.put('/customer/fair/update', (req, res) => {
    const sql = `
                    update FuarMusterilerTB SET 
                    Customer='${req.body.Customer}',
                    Company='${req.body.Company}',
                    Email='${req.body.Email}',
                    Phone='${req.body.Phone}',
                    Country='${req.body.Country}',
                    Adress='${req.body.Adress}',
                    Orderer='${req.body.Orderer}',
                    Fuar='${req.body.Fuar}',
                    Ziyaret='${req.body.Ziyaret}'
                        where ID='${req.body.ID}'
                `;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0]==1){
            res.status(200).json({
                'status':true
            })
        } else{
            res.status(200).json({
                'status':false
            })
        }
    })
});
app.get('/customer/selection/list/:userId', (req, res) => {
    const sql = `
                    select 
                        sc.ID,
                        sc.FirstName,
                        sc.LastName,
                        sc.Adress,
                        sc.City,
                        sc.Email,
                        sc.Phone,
                        sc.SurfaceId,
                        cs.Surface,
                        sc.UserId 

                    from SurfaceCustomersTB sc
                    inner join CustomersSurfaceTB cs on cs.ID = sc.SurfaceId
                    where sc.UserId='${req.params.userId}'
                `;
    const sql2 = `
                   select ID,Surface,UserId from CustomersSurfaceTB
                 `;

    mssql.query(sql, (err, customers) => {
        mssql.query(sql2, (err, surfaces) => {
            let data = [];
         surfaces.recordset.forEach(x=>{
             data.push({ 'surface': x.Surface, 'items': customers.recordset.filter((y) => y.SurfaceId == x.ID) });
         });

            res.status(200).json({ 'list': data });
        });
    })
});
app.post('/customer/selection/save', (req, res) => {
    const sql = `
                    insert into SurfaceCustomersTB(FirstName,Adress,City,Email,Phone,SurfaceId,UserId)
                VALUES('${req.body.FirstName}',
                        '${req.body.Adress}',
                        '${req.body.City}',
                        '${req.body.Email}',
                        '${req.body.Phone}',
                        '${req.body.SurfaceId}',
                        '${req.body.UserId}')
                `;
    console.log(sql);
    mssql.query(sql, (err, results) => {
        if (results.rowsAffected[0] == 1) {
            res.status(200).json({
                'status':true
            })
        } else {
            res.status(200).json({
                'status':false
            })
        }
    });
});
app.delete('/customer/selection/delete/:id', (req, res) => {
    const sql = `delete SurfaceCustomersTB where ID='${req.params.id}'`;

    mssql.query(sql, (err, results) => {
        if (results.rowsAffected[0] == 1) {
            res.status(200).json({
                'status': true
            });
        } else {
            res.status(200).json({
                'status': false,
            })
        }
    })
});
app.put('/customer/selection/update', (req, res) => {
    const sql = `update SurfaceCustomersTB SET 
FirstName='${req.body.FirstName}',
Adress='${req.body.Adress}',
City='${req.body.City}',
Email='${req.body.Email}',
Phone='${req.body.Phone}',
SurfaceId='${req.body.SurfaceId}'
where ID='${req.body.ID}'
                `;
    mssql.query(sql, (err, results) => {
        if (results.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        } else {
            res.status(200).json({ 'status': false });
           
        }
    })
});

/*Reports Mekmer*/
app.get('/reports/mekmer/atlanta/list',(req,res)=>{
    const sql = `
            select  
            k.ID,
        k.SkuNo,
        k.MekmarKod,
        k.UrunTanim,
        k.KasaKutu,
        k.KasaAdet,
        k.KutuAdet,
        k.KasaSqft,
        k.KasaM2,
        k.keys,
        (select top 1  u.OrderNo from YeniDepoGirisUrunlerTB u where u.UrunId=k.ID order by u.Id desc) atl,
        dbo.MekmarUsaYeni_StockSqft(k.SkuNo) as StokSqft,
        dbo.MekmarUsaYeni_StockBox(k.SkuNo) as StokBox,

        k.mekmar_fiyat,
        k.bd_fiyat,
        k.maya_fiyat,
        k.villo_fiyat,
        k.Kategori,
        k.DepoEbat,
        k.DepoUreticiFiyat,
        k.MaxPayload,
        k.DepoTransport
        from
        DepoUrunKartTB k 
        where k.Aktif =  1 and k.MekmarKod !='SPO'
        order by dbo.get_YeniDepoStok(k.ID,k.Devir) * k.KutuM2  desc
    `;
    mssql.query(sql,(err,atlanta)=>{
        res.status(200).json({'list':atlanta.recordset});
    });
});
app.get('/reports/mekmer/production/list', (req, res) => {
    const sql = `
                   select 

	u.Tarih,
	t.FirmaAdi,
	k.KategoriAdi,
	u.KasaNo,
	urun.UrunAdi,
	uo.OcakAdi,
	yk.YuzeyIslemAdi,
	o.En,
	o.Boy,
	o.Kenar,
	u.Miktar,
	u.Adet,
	ub.BirimAdi,
	u.SiparisAciklama,
	u.Aciklama



from UretimTB u
inner join TedarikciTB t on t.ID = u.TedarikciID
inner join UrunKartTB uk on uk.ID = u.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB o on o.ID = uk.OlcuID
inner join UrunBirimTB ub on ub.ID = u.UrunBirimID
inner join UrunOcakTB uo on uo.ID = u.UrunOcakID
where YEAR(u.Tarih) = YEAR(GETDATE())
order by u.Tarih desc, u.KasaNo desc
                `;
    mssql.query(sql, (err, results) => {
      res.status(200).json({'list':results.recordset})
    })
});

app.post('/reports/mekmer/production/filter', (req, res) => {
    const supplier = req.body.supplier.toUpperCase();
    const po = req.body.po.toUpperCase();
    const sql = `
                   select 

	u.Tarih,
	t.FirmaAdi,
	k.KategoriAdi,
	u.KasaNo,
	urun.UrunAdi,
	uo.OcakAdi,
	yk.YuzeyIslemAdi,
	o.En,
	o.Boy,
	o.Kenar,
	u.Miktar,
	u.Adet,
	ub.BirimAdi,
	u.SiparisAciklama,
	u.Aciklama



from UretimTB u
inner join TedarikciTB t on t.ID = u.TedarikciID
inner join UrunKartTB uk on uk.ID = u.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB o on o.ID = uk.OlcuID
inner join UrunBirimTB ub on ub.ID = u.UrunBirimID
inner join UrunOcakTB uo on uo.ID = u.UrunOcakID
where u.Tarih like '${req.body.date}' + '%' and
t.FirmaAdi  like '${supplier}' + '%' and
k.KategoriAdi  like '${req.body.category}' + '%' and
u.KasaNo  like '${req.body.crate}' + '%' and
urun.UrunAdi  like '${req.body.product}' + '%' and
uo.OcakAdi  like '${req.body.mine}' + '%' and
yk.YuzeyIslemAdi  like '${req.body.surface}' + '%' and
o.En  like '${req.body.width}' + '%' and 
o.Boy  like '${req.body.height}' + '%' and 
o.Kenar  like '${req.body.edge}' + '%' and
ub.BirimAdi  like '${req.body.unit}' + '%' and
u.SiparisAciklama  like '${po}' + '%' and
u.Aciklama like '${req.body.description}' + '%' 








order by u.Tarih desc, u.KasaNo desc
                `;
    mssql.query(sql, (err, results) => {
      res.status(200).json({'list':results.recordset})
    })
});
function dateToStringAbd(value){
    if(value == null || value == NaN-NaN-NaN || value == 'NaN-NaN-NaN' || value == undefined || value == ""){
        return "";
    } else{
        let date = new Date(value);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month.toString().length == 1) {
            month = '0' + month;
        };
        if (day.toString().length == 1) {
            day = '0' + day;
        }

        return year + "-" + month + "-" + day;
    }
}
app.post('/reports/mekmer/production/date', (req, res) => {
    const sql = `
                  select 

	u.Tarih,
	t.FirmaAdi,
	k.KategoriAdi,
	u.KasaNo,
	urun.UrunAdi,
	uo.OcakAdi,
	yk.YuzeyIslemAdi,
	o.En,
	o.Boy,
	o.Kenar,
	u.Miktar,
	u.Adet,
	ub.BirimAdi,
	u.SiparisAciklama,
	u.Aciklama



from UretimTB u
inner join TedarikciTB t on t.ID = u.TedarikciID
inner join UrunKartTB uk on uk.ID = u.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB o on o.ID = uk.OlcuID
inner join UrunBirimTB ub on ub.ID = u.UrunBirimID
inner join UrunOcakTB uo on uo.ID = u.UrunOcakID

where u.Tarih between '${req.body.date1}' and '${req.body.date2}'
order by u.Tarih desc, u.KasaNo desc
              `;
    mssql.query(sql, (err, results) => {
       res.status(200).json({'list':results.recordset})
    });
});
app.get('/reports/mekmer/stock/list',(req,res)=>{
    const sql = `
                  select 

	count(k.KategoriAdi) as KasaSayisi,
	k.KategoriAdi,
	ur.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	sum(u.Miktar) as Toplam

from UretimTB u
inner join UrunKartTB uk on uk.ID = u.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB ur on ur.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
where u.UrunDurumID=1 and u.Bulunamadi != 1
group by k.KategoriAdi,ur.UrunAdi,yk.YuzeyIslemAdi,ol.En,ol.Boy,ol.Kenar
order by sum(u.Miktar) desc
              `;

  mssql.query(sql,(err,results)=>{
  res.status(200).json({
        'list':results.recordset,
    });
  });
});
app.get('/reports/mekmer/stock/list/stock', (req, res) => {
    const sql = `
                   select 

	count(k.KategoriAdi) as KasaSayisi,
	k.KategoriAdi,
	ur.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	sum(u.Miktar) as Toplam

from UretimTB u
inner join UrunKartTB uk on uk.ID = u.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB ur on ur.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
where u.UrunDurumID=1 and UretimTurID=1 and u.Disarda != 1 and u.Bulunamadi != 1
group by k.KategoriAdi,ur.UrunAdi,yk.YuzeyIslemAdi,ol.En,ol.Boy,ol.Kenar
order by sum(u.Miktar) desc
              `;

    mssql.query(sql, (err, results) => {
        res.status(200).json({
            'list': results.recordset
        });
    });
});
app.get('/reports/mekmer/stock/list/mekmer', (req, res) => {
    const sql = `
                   select 

                    count(k.KategoriAdi) as KasaSayisi,
                    k.KategoriAdi,
                    ur.UrunAdi,
                    yk.YuzeyIslemAdi,
                    ol.En,
                    ol.Boy,
                    ol.Kenar,
                    sum(u.Miktar) as Toplam

                from UretimTB u
                inner join UrunKartTB uk on uk.ID = u.UrunKartID
                inner join KategoriTB k on k.ID = uk.KategoriID
                inner join UrunlerTB ur on ur.ID = uk.UrunID
                inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
                inner join OlculerTB ol on ol.ID = uk.OlcuID
                where u.UrunDurumID=1 and u.Disarda != 1 and u.Bulunamadi != 1 and (u.TedarikciID) not in (1,123)
                group by k.KategoriAdi,ur.UrunAdi,yk.YuzeyIslemAdi,ol.En,ol.Boy,ol.Kenar
                order by sum(u.Miktar) desc
              `;

    mssql.query(sql, (err, results) => {
        res.status(200).json({
            'list': results.recordset
        });
    });
});
app.get('/reports/mekmer/stock/list/mekmer/in', (req, res) => {
    const sql = `
                   select 

                    count(k.KategoriAdi) as KasaSayisi,
                    k.KategoriAdi,
                    ur.UrunAdi,
                    yk.YuzeyIslemAdi,
                    ol.En,
                    ol.Boy,
                    ol.Kenar,
                    sum(u.Miktar) as Toplam

                from UretimTB u
                inner join UrunKartTB uk on uk.ID = u.UrunKartID
                inner join KategoriTB k on k.ID = uk.KategoriID
                inner join UrunlerTB ur on ur.ID = uk.UrunID
                inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
                inner join OlculerTB ol on ol.ID = uk.OlcuID
                where u.UrunDurumID=1 and u.TedarikciID = 1 and u.Bulunamadi != 1
                group by k.KategoriAdi,ur.UrunAdi,yk.YuzeyIslemAdi,ol.En,ol.Boy,ol.Kenar
                order by sum(u.Miktar) desc
              `;

    mssql.query(sql, (err, results) => {
        res.status(200).json({
            'list': results.recordset
        });
    });
});
app.get('/reports/mekmer/stock/list/mekmoz', (req, res) => {
    const sql = `
                   select 

                    count(k.KategoriAdi) as KasaSayisi,
                    k.KategoriAdi,
                    ur.UrunAdi,
                    yk.YuzeyIslemAdi,
                    ol.En,
                    ol.Boy,
                    ol.Kenar,
                    sum(u.Miktar) as Toplam

                from UretimTB u
                inner join UrunKartTB uk on uk.ID = u.UrunKartID
                inner join KategoriTB k on k.ID = uk.KategoriID
                inner join UrunlerTB ur on ur.ID = uk.UrunID
                inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
                inner join OlculerTB ol on ol.ID = uk.OlcuID
                where u.UrunDurumID=1 and u.TedarikciID = 123 and u.Bulunamadi != 1
                group by k.KategoriAdi,ur.UrunAdi,yk.YuzeyIslemAdi,ol.En,ol.Boy,ol.Kenar
                order by sum(u.Miktar) desc
              `;

    mssql.query(sql, (err, results) => {
        res.status(200).json({
            'list': results.recordset
        });
    });
});

app.get('/reports/mekmer/stock/list/only/mekmer', (req, res) => {
    const sql = `
                   select 

                    count(k.KategoriAdi) as KasaSayisi,
                    k.KategoriAdi,
                    ur.UrunAdi,
                    yk.YuzeyIslemAdi,
                    ol.En,
                    ol.Boy,
                    ol.Kenar,
                    sum(u.Miktar) as Toplam

                from UretimTB u
                inner join UrunKartTB uk on uk.ID = u.UrunKartID
                inner join KategoriTB k on k.ID = uk.KategoriID
                inner join UrunlerTB ur on ur.ID = uk.UrunID
                inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
                inner join OlculerTB ol on ol.ID = uk.OlcuID
                where u.UrunDurumID=1 and u.TedarikciID in (1,123) and u.UretimTurID=1 and u.Bulunamadi != 1
                group by k.KategoriAdi,ur.UrunAdi,yk.YuzeyIslemAdi,ol.En,ol.Boy,ol.Kenar 
                order by sum(u.Miktar) desc



              `;

    mssql.query(sql, (err, results) => {
        res.status(200).json({
            'list': results.recordset
        });
    });
});





app.get('/reports/mekmer/stock/list/outer', (req, res) => {
    const sql = `
                   select 

                    count(k.KategoriAdi) as KasaSayisi,
                    k.KategoriAdi,
                    ur.UrunAdi,
                    yk.YuzeyIslemAdi,
                    ol.En,
                    ol.Boy,
                    ol.Kenar,
                    sum(u.Miktar) as Toplam

                from UretimTB u
                inner join UrunKartTB uk on uk.ID = u.UrunKartID
                inner join KategoriTB k on k.ID = uk.KategoriID
                inner join UrunlerTB ur on ur.ID = uk.UrunID
                inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
                inner join OlculerTB ol on ol.ID = uk.OlcuID
                where u.UrunDurumID=1 and u.Disarda = 1 and u.Bulunamadi != 1
                group by k.KategoriAdi,ur.UrunAdi,yk.YuzeyIslemAdi,ol.En,ol.Boy,ol.Kenar
                order by sum(u.Miktar) desc
              `;

    mssql.query(sql, (err, results) => {
        res.status(200).json({
            'list': results.recordset
        });
    });
});
app.post('/reports/all/stock/detail', (req, res) => {
    const sql = `
                        select 

	u.Tarih,
	u.KasaNo,
	t.FirmaAdi,
	ub.BirimAdi,
	uo.OcakAdi,
	u.Adet,
	u.Miktar,
	u.Aciklama,
	u.SiparisAciklama,
	u.Kutu,
	u.Bagli,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar
	

from UretimTB u
inner join UrunKartTB uk on uk.ID = u.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join TedarikciTB t on t.ID = u.TedarikciID
inner join UrunBirimTB ub on ub.ID = u.UrunBirimID
inner join UrunOcakTB uo on uo.ID = u.UrunOcakID

where u.UrunDurumID = 1 and u.Bulunamadi != 1 and 
k.KategoriAdi='${req.body.KategoriAdi}' 
and urun.UrunAdi ='${req.body.UrunAdi}' 
and yk.YuzeyIslemAdi ='${req.body.YuzeyIslemAdi}' 
and ol.En='${req.body.En}' and 
ol.Boy='${req.body.Boy}' 
and ol.Kenar='${req.body.Kenar}'
                `;
    mssql.query(sql, (err, results) => {
        res.status(200).json({ 'list': results.recordset });
    });
});
app.post('/reports/stock/stock/detail', (req, res) => {
        const sql = `
                        select 

	u.Tarih,
	u.KasaNo,
	t.FirmaAdi,
	ub.BirimAdi,
	uo.OcakAdi,
	u.Adet,
	u.Miktar,
	u.Aciklama,
	u.SiparisAciklama,
	u.Kutu,
	u.Bagli,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar
	

from UretimTB u
inner join UrunKartTB uk on uk.ID = u.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join TedarikciTB t on t.ID = u.TedarikciID
inner join UrunBirimTB ub on ub.ID = u.UrunBirimID
inner join UrunOcakTB uo on uo.ID = u.UrunOcakID

where u.UrunDurumID = 1 and u.UretimTurID = 1 and u.Bulunamadi != 1 and
k.KategoriAdi='${req.body.KategoriAdi}' 
and urun.UrunAdi ='${req.body.UrunAdi}' 
and yk.YuzeyIslemAdi ='${req.body.YuzeyIslemAdi}' 
and ol.En='${req.body.En}' and 
ol.Boy='${req.body.Boy}' 
and ol.Kenar='${req.body.Kenar}'
                `;
    mssql.query(sql, (err, results) => {
        res.status(200).json({ 'list': results.recordset });
    });
});
app.post('/reports/outer/stock/detail', (req, res) => {
        const sql = `
                        select 

	u.Tarih,
	u.KasaNo,
	t.FirmaAdi,
	ub.BirimAdi,
	uo.OcakAdi,
	u.Adet,
	u.Miktar,
	u.Aciklama,
	u.SiparisAciklama,
	u.Kutu,
	u.Bagli,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar
	

from UretimTB u
inner join UrunKartTB uk on uk.ID = u.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join TedarikciTB t on t.ID = u.TedarikciID
inner join UrunBirimTB ub on ub.ID = u.UrunBirimID
inner join UrunOcakTB uo on uo.ID = u.UrunOcakID

where u.UrunDurumID = 1 and u.Disarda = 1 and u.Bulunamadi != 1 and
k.KategoriAdi='${req.body.KategoriAdi}' 
and urun.UrunAdi ='${req.body.UrunAdi}' 
and yk.YuzeyIslemAdi ='${req.body.YuzeyIslemAdi}' 
and ol.En='${req.body.En}' and 
ol.Boy='${req.body.Boy}' 
and ol.Kenar='${req.body.Kenar}'
                `;
    mssql.query(sql, (err, results) => {
        res.status(200).json({ 'list': results.recordset });
    });
});
app.post('/reports/mekmer/stock/detail', (req, res) => {
        const sql = `
                        select 

	u.Tarih,
	u.KasaNo,
	t.FirmaAdi,
	ub.BirimAdi,
	uo.OcakAdi,
	u.Adet,
	u.Miktar,
	u.Aciklama,
	u.SiparisAciklama,
	u.Kutu,
	u.Bagli,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar
	

from UretimTB u
inner join UrunKartTB uk on uk.ID = u.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join TedarikciTB t on t.ID = u.TedarikciID
inner join UrunBirimTB ub on ub.ID = u.UrunBirimID
inner join UrunOcakTB uo on uo.ID = u.UrunOcakID

where u.UrunDurumID = 1 and u.Disarda != 1 and u.Bulunamadi != 1 and
k.KategoriAdi='${req.body.KategoriAdi}' 
and urun.UrunAdi ='${req.body.UrunAdi}' 
and yk.YuzeyIslemAdi ='${req.body.YuzeyIslemAdi}' 
and ol.En='${req.body.En}' and 
ol.Boy='${req.body.Boy}' 
and ol.Kenar='${req.body.Kenar}'
                `;
    mssql.query(sql, (err, results) => {
        res.status(200).json({ 'list': results.recordset });
    });
});

app.post('/reports/mekmer/stock/detail/in', (req, res) => {
    const sql = `
                    select 

u.Tarih,
u.KasaNo,
t.FirmaAdi,
ub.BirimAdi,
uo.OcakAdi,
u.Adet,
u.Miktar,
u.Aciklama,
u.SiparisAciklama,
u.Kutu,
u.Bagli,
k.KategoriAdi,
urun.UrunAdi,
yk.YuzeyIslemAdi,
ol.En,
ol.Boy,
ol.Kenar


from UretimTB u
inner join UrunKartTB uk on uk.ID = u.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join TedarikciTB t on t.ID = u.TedarikciID
inner join UrunBirimTB ub on ub.ID = u.UrunBirimID
inner join UrunOcakTB uo on uo.ID = u.UrunOcakID

where u.UrunDurumID = 1 and u.TedarikciID = 1 and u.Bulunamadi != 1 and
k.KategoriAdi='${req.body.KategoriAdi}' 
and urun.UrunAdi ='${req.body.UrunAdi}' 
and yk.YuzeyIslemAdi ='${req.body.YuzeyIslemAdi}' 
and ol.En='${req.body.En}' and 
ol.Boy='${req.body.Boy}' 
and ol.Kenar='${req.body.Kenar}'
            `;
mssql.query(sql, (err, results) => {
    res.status(200).json({ 'list': results.recordset });
});
});
app.post('/reports/mekmoz/stock/detail', (req, res) => {
    const sql = `
                    select 

u.Tarih,
u.KasaNo,
t.FirmaAdi,
ub.BirimAdi,
uo.OcakAdi,
u.Adet,
u.Miktar,
u.Aciklama,
u.SiparisAciklama,
u.Kutu,
u.Bagli,
k.KategoriAdi,
urun.UrunAdi,
yk.YuzeyIslemAdi,
ol.En,
ol.Boy,
ol.Kenar


from UretimTB u
inner join UrunKartTB uk on uk.ID = u.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join TedarikciTB t on t.ID = u.TedarikciID
inner join UrunBirimTB ub on ub.ID = u.UrunBirimID
inner join UrunOcakTB uo on uo.ID = u.UrunOcakID

where u.UrunDurumID = 1 and u.TedarikciID = 123 and u.Bulunamadi != 1 and 
k.KategoriAdi='${req.body.KategoriAdi}' 
and urun.UrunAdi ='${req.body.UrunAdi}' 
and yk.YuzeyIslemAdi ='${req.body.YuzeyIslemAdi}' 
and ol.En='${req.body.En}' and 
ol.Boy='${req.body.Boy}' 
and ol.Kenar='${req.body.Kenar}'
            `;
mssql.query(sql, (err, results) => {
    res.status(200).json({ 'list': results.recordset });
});
});

app.post('/reports/mekmer/stock/only/stock/mekmer/detail', (req, res) => {
    const sql = `
                    select 

u.Tarih,
u.KasaNo,
t.FirmaAdi,
ub.BirimAdi,
uo.OcakAdi,
u.Adet,
u.Miktar,
u.Aciklama,
u.SiparisAciklama,
u.Kutu,
u.Bagli,
k.KategoriAdi,
urun.UrunAdi,
yk.YuzeyIslemAdi,
ol.En,
ol.Boy,
ol.Kenar


from UretimTB u
inner join UrunKartTB uk on uk.ID = u.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join TedarikciTB t on t.ID = u.TedarikciID
inner join UrunBirimTB ub on ub.ID = u.UrunBirimID
inner join UrunOcakTB uo on uo.ID = u.UrunOcakID

where u.UrunDurumID = 1 and u.TedarikciID in (1,123) and u.UretimTurID=1 and u.Bulunamadi != 1 and 
k.KategoriAdi='${req.body.KategoriAdi}' 
and urun.UrunAdi ='${req.body.UrunAdi}' 
and yk.YuzeyIslemAdi ='${req.body.YuzeyIslemAdi}' 
and ol.En='${req.body.En}' and 
ol.Boy='${req.body.Boy}' 
and ol.Kenar='${req.body.Kenar}'
            `;
mssql.query(sql, (err, results) => {
    res.status(200).json({ 'list': results.recordset });
});
});




app.get('/reports/mekmer/mine/list', (req, res) => {
    const sql = `
                   select 
	uo.OcakAdi,
	(select sum(ut.Miktar) from UretimTB ut where 
	ut.UrunOcakID = uo.ID and ut.UrunBirimID = 1 and ut.UrunDurumID = 1 and ut.Disarda != 1 and uo.OcakAdi !='DIS OCAK'
	) as M2,
	(select sum(ut.Miktar) from UretimTB ut where 
	ut.UrunOcakID = uo.ID and ut.UrunBirimID = 2 and ut.UrunDurumID = 1 and ut.Disarda != 1 and uo.OcakAdi !='DIS OCAK'
	) as MT,
	(select sum(ut.Miktar) from UretimTB ut where 
	ut.UrunOcakID = uo.ID and ut.UrunBirimID = 3 and ut.UrunDurumID = 1 and ut.Disarda != 1 and uo.OcakAdi !='DIS OCAK'
	) as Adet,

	count(u.KasaNo) as KasaAdedi

from UretimTB u
inner join UrunOcakTB uo on uo.ID = u.UrunOcakID
inner join UrunBirimTB ub on ub.ID = u.UrunBirimID
where u.UrunDurumID = 1 and u.Disarda != 1 and uo.OcakAdi !='DIS OCAK'
group by uo.ID,uo.OcakAdi
order by sum(u.Miktar) desc
                `;
    mssql.query(sql, (err, results) => {
        results.recordset.forEach(x => {
            if (x.M2 == ' ' || x.M2 == 'null' || x.M2 == null) {
                x.M2 = 0;
            } 
            if (x.MT == ' ' || x.MT == 'null' || x.MT == null) {
                x.MT = 0;
            } 
            if (x.Adet == ' ' || x.Adet == 'null' || x.Adet == null) {
                x.Adet = 0;
            } 

        });
        res.status(200).json({ 'list': results.recordset });
    });
});

function noneIntControl(value){
    if(value == null || value == undefined){
        return parseInt(0);
    } else{
        return parseInt(value)
    }
}

function __getCurrency(shipped_date){
    const date = new Date(shipped_date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return new Promise((resolve,reject)=>{
        currency.getDateCurrency(year, month, day).then((response) => {
            resolve(response);
          });
    });

}

var custCurrency = 0;
app.get('/reports/mekmar/ayo/list/:year/:month', (req, res) => {


    const sql = `
     select 
	s.SiparisTarihi,
	s.YuklemeTarihi,
    s.SiparisNo,
	s.NavlunSatis as NavlunSatis,
	s.NavlunAlis as NavlunAlis,
	s.DetayTutar_1 as DetayTutar1,
	s.DetayTutar_2 as DetayTutar2,
	s.DetayTutar_3 as DetayTutar3,
	s.DetayTutar_4 as Mekus,
	s.DetayAlis_1 as DetayAlis1,
	s.DetayAlis_2 as DetayAlis2,
	s.DetayAlis_3 as DetayAlis3,
	s.EvrakGideri as Kurye,
	m.FirmaAdi,
	(select ytu.UlkeAdi from YeniTeklif_UlkeTB ytu where ytu.Id = m.UlkeId) as UlkeAdi,
	(select fkt.FaturaAdi from FaturaKesilmeTB fkt where fkt.ID = s.FaturaKesimTurID) as FaturaAdi,
	(select stt.TeslimTur from SiparisTeslimTurTB stt where stt.ID = s.TeslimTurID) as TeslimTur,
	(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibi,
	(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as Operasyon,
    s.Komisyon,
		(
	   select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo
	) as ToplamSatis,
	(
	   select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo and su.TedarikciID = 1
	) as MekmerSatis,
		(
	   select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo and su.TedarikciID = 123
	) as MekmozSatis,
	(
	   select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo and su.TedarikciID not in (1,123)
	) as DisSatis,
    	(
	   select sum(su.AlisFiyati * su.Miktar) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo
	) as ToplamUretim,
		(
	   select sum(su.AlisFiyati * su.Miktar) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo and su.TedarikciID = 1
	) as MekmerUretim,
			(
	   select sum(su.AlisFiyati * su.Miktar) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo and su.TedarikciID = 123
	) as MekmozUretim,
		(
	   select sum(su.AlisFiyati * su.Miktar) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo and su.TedarikciID not in (1,123)
	) as DisUretim,
	(
		select sum(seg.Tutar) from SiparisEkstraGiderlerTB seg where seg.SiparisNo = s.SiparisNo
	) as OzelIscilik,
	(
		select sum(sfk.Tutar) from SiparisFaturaKayitTB sfk
		inner join KonteynerDigerFaturalarKayitTB kdf on sfk.FaturaKayitID=kdf.ID

		where sfk.SiparisNo=s.SiparisNo and sfk.SiparisFaturaTurID=100 and sfk.YuklemeEvrakID=50
	) as Lashing,
	(
		select sum(sfk.Tutar) from SiparisFaturaKayitTB sfk
		inner join KonteynerDigerFaturalarKayitTB kdf on sfk.FaturaKayitID=kdf.ID

		where sfk.SiparisNo=s.SiparisNo and sfk.SiparisFaturaTurID=9 and sfk.YuklemeEvrakID=50
	) as Liman,
		(
		select sum(sfk.Tutar) from SiparisFaturaKayitTB sfk

		where sfk.SiparisNo=s.SiparisNo and sfk.YuklemeEvrakID=13
	) as Nakliye,
	(
		select sum(sfk.Tutar) from SiparisFaturaKayitTB sfk
		inner join KonteynerDigerFaturalarKayitTB kdf on sfk.FaturaKayitID=kdf.ID

		where sfk.SiparisNo=s.SiparisNo and sfk.YuklemeEvrakID=50 and sfk.SiparisFaturaTurID=102
	) as Spanzlet,
	(
		select sum(sfk.Tutar) from SiparisFaturaKayitTB sfk
		inner join KonteynerDigerFaturalarKayitTB kdf on sfk.FaturaKayitID=kdf.ID

		where sfk.SiparisNo=s.SiparisNo and sfk.YuklemeEvrakID=50 and sfk.SiparisFaturaTurID=101
	) as Booking,
		(
		select sum(sfk.Tutar) from SiparisFaturaKayitTB sfk
		inner join KonteynerDigerFaturalarKayitTB kdf on sfk.FaturaKayitID=kdf.ID

		where sfk.SiparisNo=s.SiparisNo and sfk.YuklemeEvrakID=50 and sfk.SiparisFaturaTurID=73
	) as Ilaclama,
	(
		select sum(sfk.Tutar) from SiparisFaturaKayitTB sfk
		inner join KonteynerDigerFaturalarKayitTB kdf on sfk.FaturaKayitID=kdf.ID

		where sfk.SiparisNo=s.SiparisNo and sfk.YuklemeEvrakID=70 and sfk.SiparisFaturaTurID=7
	) as Gumruk,
	s.sigorta_Tutar as SigortaAlis,
	s.sigorta_tutar_satis as SigortaSatis,
	(
		select sum(o.Tutar) from OdemelerTB o where o.SiparisNo = s.SiparisNo
	) as Odemeler,
	(
		select sum(o.Masraf) from OdemelerTB o where o.SiparisNo = s.SiparisNo
	) as BankaMasraf,
	(
		select top 1 o.Kur from OdemelerTB o where o.SiparisNo = s.SiparisNo order by o.Tarih desc
	) as Kur

from SiparislerTB s
inner join MusterilerTB m on m.ID = s.MusteriID

where m.Marketing = 'Mekmar' and s.SiparisDurumID = 3 and YEAR(s.YuklemeTarihi) = '${req.params.year}' and MONTH(s.YuklemeTarihi) = '${req.params.month}'

    `;
    mssql.query(sql, (err, results) => {
        results.recordset.forEach(x => {
            x.Proforma = (x.ToplamSatis + x.NavlunSatis + x.DetayTutar1 + x.DetayTutar2 + x.DetayTutar3);
            x.MasrafToplam = (x.ToplamUretim + x.Nakliye + x.Gumruk + x.Ilaclama + x.Liman + x.SigortaAlis + x.NavlunAlis + x.Lashing + x.DetayAlis1 + x.DetayAlis2 + x.DetayAlis3 + x.Mekus + x.OzelIscilik + x.BankaMasraf + x.Kurye + x.Komisyon + x.Spanzlet);

            if(noneIntControl(x.Proforma) <= noneIntControl(x.Odemeler) ){
                x.ProfitUsd = (x.Proforma - x.MasrafToplam);
                x.ProfitTl = (x.ProfitUsd * x.Kur)
                if(x.Kur == null || x.Kur == undefined){
                    let data = 0
                   __getCurrency(x.YuklemeTarihi).then(currency=>{
                        custCurrency = currency;
                        data = 1;
                    });
                    x.ProfitTl = (x.Proforma - x.MasrafToplam) * custCurrency;
                }

                
            } else{
                x.ProfitUsd = 0;
            
                x.ProfitTl = 0;
            }

        });
        res.status(200).json({'list':results.recordset});
    });
});

app.get('/reports/mekmar/ayo/by/year/list/:yil', (req, res) => {
        const sql = `
     select 
	s.SiparisTarihi,
	s.YuklemeTarihi,
    s.SiparisNo,
	s.NavlunSatis as NavlunSatis,
	s.NavlunAlis as NavlunAlis,
	s.DetayTutar_1 as DetayTutar1,
	s.DetayTutar_2 as DetayTutar2,
	s.DetayTutar_3 as DetayTutar3,
	s.DetayTutar_4 as Mekus,
	s.DetayAlis_1 as DetayAlis1,
	s.DetayAlis_2 as DetayAlis2,
	s.DetayAlis_3 as DetayAlis3,
	s.EvrakGideri as Kurye,
	m.FirmaAdi,
	(select ytu.UlkeAdi from YeniTeklif_UlkeTB ytu where ytu.Id = m.UlkeId) as UlkeAdi,
	(select fkt.FaturaAdi from FaturaKesilmeTB fkt where fkt.ID = s.FaturaKesimTurID) as FaturaAdi,
	(select stt.TeslimTur from SiparisTeslimTurTB stt where stt.ID = s.TeslimTurID) as TeslimTur,
	(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibi,
	(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as Operasyon,
	s.Komisyon,
		(
	   select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo
	) as ToplamSatis,
	(
	   select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo and su.TedarikciID = 1
	) as MekmerSatis,
		(
	   select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo and su.TedarikciID = 123
	) as MekmozSatis,
	(
	   select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo and su.TedarikciID not in (1,123)
	) as DisSatis,
    	(
	   select sum(su.AlisFiyati * su.Miktar) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo
	) as ToplamUretim,
		(
	   select sum(su.AlisFiyati * su.Miktar) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo and su.TedarikciID = 1
	) as MekmerUretim,
			(
	   select sum(su.AlisFiyati * su.Miktar) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo and su.TedarikciID = 123
	) as MekmozUretim,
		(
	   select sum(su.AlisFiyati * su.Miktar) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo and su.TedarikciID not in (1,123)
	) as DisUretim,
	(
		select sum(seg.Tutar) from SiparisEkstraGiderlerTB seg where seg.SiparisNo = s.SiparisNo
	) as OzelIscilik,
	(
		select sum(sfk.Tutar) from SiparisFaturaKayitTB sfk
		inner join KonteynerDigerFaturalarKayitTB kdf on sfk.FaturaKayitID=kdf.ID

		where sfk.SiparisNo=s.SiparisNo and sfk.SiparisFaturaTurID=100 and sfk.YuklemeEvrakID=50
	) as Lashing,
	(
		select sum(sfk.Tutar) from SiparisFaturaKayitTB sfk
		inner join KonteynerDigerFaturalarKayitTB kdf on sfk.FaturaKayitID=kdf.ID

		where sfk.SiparisNo=s.SiparisNo and sfk.SiparisFaturaTurID=9 and sfk.YuklemeEvrakID=50
	) as Liman,
		(
		select sum(sfk.Tutar) from SiparisFaturaKayitTB sfk

		where sfk.SiparisNo=s.SiparisNo and sfk.YuklemeEvrakID=13
	) as Nakliye,
	(
		select sum(sfk.Tutar) from SiparisFaturaKayitTB sfk
		inner join KonteynerDigerFaturalarKayitTB kdf on sfk.FaturaKayitID=kdf.ID

		where sfk.SiparisNo=s.SiparisNo and sfk.YuklemeEvrakID=50 and sfk.SiparisFaturaTurID=102
	) as Spanzlet,
	(
		select sum(sfk.Tutar) from SiparisFaturaKayitTB sfk
		inner join KonteynerDigerFaturalarKayitTB kdf on sfk.FaturaKayitID=kdf.ID

		where sfk.SiparisNo=s.SiparisNo and sfk.YuklemeEvrakID=50 and sfk.SiparisFaturaTurID=101
	) as Booking,
		(
		select sum(sfk.Tutar) from SiparisFaturaKayitTB sfk
		inner join KonteynerDigerFaturalarKayitTB kdf on sfk.FaturaKayitID=kdf.ID

		where sfk.SiparisNo=s.SiparisNo and sfk.YuklemeEvrakID=50 and sfk.SiparisFaturaTurID=73
	) as Ilaclama,
	(
		select sum(sfk.Tutar) from SiparisFaturaKayitTB sfk
		inner join KonteynerDigerFaturalarKayitTB kdf on sfk.FaturaKayitID=kdf.ID

		where sfk.SiparisNo=s.SiparisNo and sfk.YuklemeEvrakID=70 and sfk.SiparisFaturaTurID=7
	) as Gumruk,
	s.sigorta_Tutar as SigortaAlis,
	s.sigorta_tutar_satis as SigortaSatis,
	(
		select sum(o.Tutar) from OdemelerTB o where o.SiparisNo = s.SiparisNo
	) as Odemeler,
	(
		select sum(o.Masraf) from OdemelerTB o where o.SiparisNo = s.SiparisNo
	) as BankaMasraf,
    (
		select top 1 o.Kur from OdemelerTB o where o.SiparisNo = s.SiparisNo order by o.Tarih desc
	) as Kur

from SiparislerTB s
inner join MusterilerTB m on m.ID = s.MusteriID

where m.Marketing = 'Mekmar' and s.SiparisDurumID = 3 and YEAR(s.YuklemeTarihi) = '${req.params.yil}'

    `;
    mssql.query(sql, (err, results) => {
        results.recordset.forEach(x => {
            x.Proforma = (x.ToplamSatis + x.NavlunSatis + x.DetayTutar1 + x.DetayTutar2 + x.DetayTutar3);
            x.MasrafToplam = (x.ToplamUretim + x.Nakliye + x.Gumruk + x.Ilaclama + x.Liman + x.SigortaAlis + x.NavlunAlis + x.Lashing + x.DetayAlis1 + x.DetayAlis2 + x.DetayAlis3 + x.Mekus + x.OzelIscilik + x.BankaMasraf + x.Kurye + x.Komisyon + x.Spanzlet);

            if(noneIntControl(x.Proforma) <= noneIntControl(x.Odemeler) ){
                x.ProfitUsd = (x.Proforma - x.MasrafToplam);
                x.ProfitTl = (x.ProfitUsd * x.Kur)
                if(x.Kur == null || x.Kur == undefined){

                   __getCurrency(x.YuklemeTarihi).then(currency=>{
                    custCurrency = currency;
                    });
                    x.ProfitTl = (x.Proforma - x.MasrafToplam) * custCurrency;
                    

                }

                
            } else{
                x.ProfitUsd = 0;
            
                x.ProfitTl = 0;
            }

        });
        res.status(200).json({'list':results.recordset});
    });
});

app.get('/reports/mekmar/ayo/year/list', (req, res) => {
    const sql = `
        select YEAR(s.YuklemeTarihi) as Yil from SiparislerTB s
		inner join MusterilerTB m on m.ID = s.MusteriID
		where m.Marketing='Mekmar' and YEAR(s.YuklemeTarihi) is not null
		group by YEAR(s.YuklemeTarihi)  
		order by YEAR(s.YuklemeTarihi) desc
                `;
    mssql.query(sql, (err, results) => {

    res.status(200).json({ 'list': results.recordset });
    });
});
app.get('/reports/mekmar/ayo/month/list/:year', (req, res) => {
    console.log(req.params.year);
    const sql = `
                   select MONTH(s.YuklemeTarihi) as Ay from SiparislerTB s 
				   inner join MusterilerTB m on m.ID = s.MusteriID
where MONTH(s.YuklemeTarihi) is not null and m.Marketing='Mekmar' and YEAR(s.YuklemeTarihi) = '${req.params.year}'
group by MONTH(s.YuklemeTarihi)
order by MONTH(s.YuklemeTarihi) desc
                `;
    mssql.query(sql, (err, results) => {
        res.status(200).json({ 'list': results.recordset });
    });
});





app.get('/reports/mekmar/forwarding/list', (req, res) => {
    const sql = `
    select 
    s.Tarih,
    s.KasaNo,
    s.MusteriID,
    s.BirimFiyat,
    s.Toplam,
    m.FirmaAdi,
    u.SiparisAciklama,
    u.Adet,
    u.KutuAdet,
    u.KutuIciAdet,
    u.Miktar,
    uk.ID as UrunKartId,
    k.KategoriAdi,
    urun.UrunAdi,
    yk.YuzeyIslemAdi,
    ol.En,
    ol.Boy,
    ol.Kenar,
    uoc.OcakAdi,
    ub.BirimAdi,
    t.FirmaAdi as TedarikciAdi,
    u.Aciklama,
	u.Tarih as UretimTarihi
    
    from SevkiyatTB s 
    inner join UretimTB u on u.KasaNo = s.KasaNo
    inner join MusterilerTB m on m.ID = s.MusteriID
    inner join UrunKartTB uk on uk.ID = u.UrunKartID
    inner join KategoriTB k on k.ID = uk.KategoriID
    inner join UrunlerTB urun on urun.ID = uk.UrunID
    inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
    inner join OlculerTB ol on ol.ID = uk.OlcuID
    inner join UrunOcakTB uoc on uoc.ID = u.UrunOcakID
    inner join UrunBirimTB ub on ub.ID = u.UrunBirimID
    inner join TedarikciTB t on t.ID = u.TedarikciID
    where u.UrunDurumID=0 and YEAR(s.Tarih) = YEAR(GETDATE())
    order by s.Tarih desc


    `;
    mssql.query(sql, (err, results) => {
       res.status(200).json({'list':results.recordset}) 
    });
});

app.post('/reports/mekmar/forwarding/filter',(req,res)=>{
    console.log("req.body.product_date",req.body.product_date);
    const supplier = req.body.fromWho.charAt(0).toUpperCase()
    + req.body.fromWho.slice(1);
    const po = req.body.po.toUpperCase();
    
    let new_product_date = '';
    if(req.body.product_date == '' || req.body.product_date == ' ' || req.body.product_date == undefined || req.body.product_date == null){
        new_product_date = '';
    }else{
        const product_date = req.body.product_date.split('-');
        const product_year = product_date[2];
        const product_month = product_date[1];
        const product_day = product_date[0];
        new_product_date = product_year + '-' + product_month + '-' + product_day;
    }

    
    

    
    const sql = `
    
    select 
    s.Tarih,
    s.KasaNo,
    s.MusteriID,
    s.BirimFiyat,
    s.Toplam,
    m.FirmaAdi,
    u.SiparisAciklama,
    u.Adet,
    u.KutuAdet,
    u.KutuIciAdet,
    u.Miktar,
    uk.ID as UrunKartId,
    k.KategoriAdi,
    urun.UrunAdi,
    yk.YuzeyIslemAdi,
    ol.En,
    ol.Boy,
    ol.Kenar,
    uoc.OcakAdi,
    ub.BirimAdi,
    t.FirmaAdi as TedarikciAdi,
    u.Aciklama,
    u.Tarih as UretimTarihi
    
    from SevkiyatTB s 
    inner join UretimTB u on u.KasaNo = s.KasaNo
    inner join MusterilerTB m on m.ID = s.MusteriID
    inner join UrunKartTB uk on uk.ID = u.UrunKartID
    inner join KategoriTB k on k.ID = uk.KategoriID
    inner join UrunlerTB urun on urun.ID = uk.UrunID
    inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
    inner join OlculerTB ol on ol.ID = uk.OlcuID
    inner join UrunOcakTB uoc on uoc.ID = u.UrunOcakID
    inner join UrunBirimTB ub on ub.ID = u.UrunBirimID
    inner join TedarikciTB t on t.ID = u.TedarikciID
    where u.UrunDurumID=0 and 
    s.Tarih Like  '${req.body.date}' + '%' and
    m.FirmaAdi Like  '${req.body.to}' + '%' and
    t.FirmaAdi Like  '${supplier}' + '%' and
    uk.ID Like  '${req.body.productId}' + '%' and
    s.KasaNo Like  '${req.body.crate}' + '%' and
    uoc.OcakAdi Like  '${req.body.mine}' + '%' and
    k.KategoriAdi Like  '${req.body.category}' + '%' and
    urun.UrunAdi Like  '${req.body.product}' + '%' and
    yk.YuzeyIslemAdi Like  '${req.body.surface}' + '%' and
    ol.En Like  '${req.body.width}' + '%' and
    ol.Boy Like  '${req.body.height}' + '%' and
    ol.Kenar Like  '${req.body.edge}' + '%' and
    u.KutuAdet Like  '${req.body.box}' + '%' and
    u.Adet Like  '${req.body.piece}' + '%' and
    u.Miktar Like  '${req.body.amount}' + '%' and
    ub.BirimAdi Like  '${req.body.unit}' + '%' and
    u.SiparisAciklama Like  '${po}' + '%' and
    u.Tarih Like  '${new_product_date}' + '%'

    order by s.Tarih desc
    `;
    mssql.query(sql,(err,forwarding)=>{
        res.status(200).json({'list':forwarding.recordset}) 

        
    });

});


app.post('/reports/mekmar/forwarding/date', (req, res) => {
        const sql = `
       select 
s.Tarih,
s.KasaNo,
s.MusteriID,
s.BirimFiyat,
s.Toplam,
m.FirmaAdi,
u.SiparisAciklama,
u.Adet,
u.KutuAdet,
u.KutuIciAdet,
u.Miktar,
uk.ID as UrunKartId,
k.KategoriAdi,
urun.UrunAdi,
yk.YuzeyIslemAdi,
ol.En,
ol.Boy,
ol.Kenar,
uoc.OcakAdi,
ub.BirimAdi,
t.FirmaAdi as TedarikciAdi,
u.Aciklama,
u.Tarih as UretimTarihi

from SevkiyatTB s 
inner join UretimTB u on u.KasaNo = s.KasaNo
inner join MusterilerTB m on m.ID = s.MusteriID
inner join UrunKartTB uk on uk.ID = u.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join UrunOcakTB uoc on uoc.ID = u.UrunOcakID
inner join UrunBirimTB ub on ub.ID = u.UrunBirimID
inner join TedarikciTB t on t.ID = u.TedarikciID
where u.UrunDurumID=0  and s.Tarih between '${req.body.date1}' and '${req.body.date2}'
order by s.Tarih desc


    `;
    mssql.query(sql, (err, results) => {
       res.status(200).json({'list':results.recordset}) 
    });
});

app.get('/reports/loading/list/:year/:month',(req,res)=>{
    const sql = `
    select  
    s.YuklemeTarihi,  
    s.SiparisNo,  
    m.FirmaAdi as MusteriAdi,  
    (select Sum(SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo) as Fob,  
    (select Sum(SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo)+  
    dbo.Get_SiparisNavlun(s.SiparisNo) + s.sigorta_tutar_satis as Dtp,  
    'Konteyner' as Tur,m.Marketing  
    from  
    SiparislerTB s,MusterilerTB m  
    where Year(YuklemeTarihi)=${req.params.year}
    and Month(YuklemeTarihi)=${req.params.month}
    and m.ID=s.MusteriID  
    and m.Marketing not in ('Mekmar Numune','Seleksiyon','Warehouse')  
    and m.Marketing is not null  
     
    union  
    select  
    s.Tarih as YuklemeTarihi,  
    s.CikisNo as SiparisNo,  
    m.FirmaAdi as MusteriAdi,  
    Sum(Toplam) as Fob  
    ,Sum((s.BirimFiyat+7.5)*u.Miktar) as Dtp,  
    'Depo' as Tur,m.Marketing  
    from  
    SevkiyatTB s,MusterilerTB m,UretimTB u  
    where s.MusteriID=m.ID and u.KasaNo=s.KasaNo  
    and Year(s.Tarih)=${req.params.year} and Month(s.Tarih)=${req.params.month}
    and m.Mt_No=1  
    group by  
    s.Tarih,s.CikisNo,m.FirmaAdi,m.Marketing
    `;
    const yearlySql = `
    select  
    s.YuklemeTarihi,  
    s.SiparisNo,  
    m.FirmaAdi as MusteriAdi,  
    (select Sum(SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo) as Fob,  
    (select Sum(SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo)+  
    dbo.Get_SiparisNavlun(s.SiparisNo)+ s.sigorta_tutar_satis as Dtp,  
    'Konteyner' as Tur,m.Marketing  
    from  
    SiparislerTB s,MusterilerTB m  
    where Year(YuklemeTarihi)=${req.params.year}
    and m.ID=s.MusteriID  
    and m.Marketing not in ('Mekmar Numune','Seleksiyon','Warehouse')  
    and m.Marketing is not null  
     
    union  
    select  
    s.Tarih as YuklemeTarihi,  
    s.CikisNo as SiparisNo,  
    m.FirmaAdi as MusteriAdi,  
    Sum(Toplam) as Fob  
    ,Sum((s.BirimFiyat+7.5)*u.Miktar) as Dtp,  
    'Depo' as Tur,m.Marketing  
    from  
    SevkiyatTB s,MusterilerTB m,UretimTB u  
    where s.MusteriID=m.ID and u.KasaNo=s.KasaNo  
    and Year(s.Tarih)=${req.params.year}
    and m.Mt_No=1  
    group by  
    s.Tarih,s.CikisNo,m.FirmaAdi,m.Marketing
    `;
    mssql.query(sql,(err,loading)=>{
        mssql.query(yearlySql,(err,yearly)=>{
            res.status(200).json({'list':loading.recordset,'yearly':yearly.recordset});

        });
        
    });
});


app.get('/reports/loading/not/year/list',async (req,res)=>{
    const yearSql = `
        select Year(YuklemeTarihi) as Yil from SiparislerTB s

        where SiparisDurumID = 3
        group by YEAR(YuklemeTarihi)
        order by YEAR(YuklemeTarihi) desc
    `;
    await mssql.query(yearSql,async (err,years)=>{
        const monthSql = `
            select MONTH(YuklemeTarihi) as Ay from SiparislerTB s

where SiparisDurumID = 3 and YEAR(YuklemeTarihi) = '${years.recordset[0].Yil}'
group by MONTH(YuklemeTarihi)
order by MONTH(YuklemeTarihi) desc
        `;
        await mssql.query(monthSql,async(err,months)=>{
            const sql = `
            select  
            s.YuklemeTarihi,  
            s.SiparisNo,  
            m.FirmaAdi as MusteriAdi,  
            (select Sum(SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo) as Fob,  
            (select Sum(SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo)+  
            dbo.Get_SiparisNavlun(s.SiparisNo) + s.sigorta_tutar_satis as Dtp,  
            'Konteyner' as Tur,m.Marketing  
            from  
            SiparislerTB s,MusterilerTB m  
            where Year(YuklemeTarihi)=${years.recordset[0].Yil}
            and Month(YuklemeTarihi)=${months.recordset[0].Ay}
            and m.ID=s.MusteriID  
            and m.Marketing not in ('Mekmar Numune','Seleksiyon','Warehouse')  
            and m.Marketing is not null  
             
            union  
            select  
            s.Tarih as YuklemeTarihi,  
            s.CikisNo as SiparisNo,  
            m.FirmaAdi as MusteriAdi,  
            Sum(Toplam) as Fob  
            ,Sum((s.BirimFiyat+7.5)*u.Miktar) as Dtp,  
            'Depo' as Tur,m.Marketing  
            from  
            SevkiyatTB s,MusterilerTB m,UretimTB u  
            where s.MusteriID=m.ID and u.KasaNo=s.KasaNo  
            and Year(s.Tarih)=${years.recordset[0].Yil} and Month(s.Tarih)=${months.recordset[0].Ay}
            and m.Mt_No=1  
            group by  
            s.Tarih,s.CikisNo,m.FirmaAdi,m.Marketing
            `;
            const yearlySql = `
            select  
            s.YuklemeTarihi,  
            s.SiparisNo,  
            m.FirmaAdi as MusteriAdi,  
            (select Sum(SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo) as Fob,  
            (select Sum(SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo)+  
            dbo.Get_SiparisNavlun(s.SiparisNo)+ s.sigorta_tutar_satis as Dtp,  
            'Konteyner' as Tur,m.Marketing  
            from  
            SiparislerTB s,MusterilerTB m  
            where Year(YuklemeTarihi)=${years.recordset[0].Yil}
            and m.ID=s.MusteriID  
            and m.Marketing not in ('Mekmar Numune','Seleksiyon','Warehouse')  
            and m.Marketing is not null  
             
            union  
            select  
            s.Tarih as YuklemeTarihi,  
            s.CikisNo as SiparisNo,  
            m.FirmaAdi as MusteriAdi,  
            Sum(Toplam) as Fob  
            ,Sum((s.BirimFiyat+7.5)*u.Miktar) as Dtp,  
            'Depo' as Tur,m.Marketing  
            from  
            SevkiyatTB s,MusterilerTB m,UretimTB u  
            where s.MusteriID=m.ID and u.KasaNo=s.KasaNo  
            and Year(s.Tarih)=${years.recordset[0].Yil}
            and m.Mt_No=1  
            group by  
            s.Tarih,s.CikisNo,m.FirmaAdi,m.Marketing
            `;
            await mssql.query(sql,async (err,loading)=>{
                await mssql.query(yearlySql,async (err,yearly)=>{
                    res.status(200).json({'list':loading.recordset,'yearly':yearly.recordset});
        
                });
                
            });


        });

    });
    




});


app.get('/reports/loading/list/:year',(req,res)=>{
    const sql = `
            select 
            MONTH(YuklemeTarihi) as Month
        from SiparislerTB where YEAR(YuklemeTarihi) = ${req.params.year}
        group by MONTH(YuklemeTarihi) 
        order by MONTH(YuklemeTarihi) desc
    `;
    mssql.query(sql,(err,months)=>{
        res.status(200).json({'months':months.recordset});
    });
});

app.get('/reports/loading/list/:year/:month',(req,res)=>{
    const sql = `
    select  
    s.YuklemeTarihi,  
    s.SiparisNo,  
    m.FirmaAdi as MusteriAdi,  
    (select Sum(SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo) as Fob,  
    (select Sum(SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo)+  
    dbo.Get_SiparisNavlun(s.SiparisNo) as Dtp,  
    'Konteyner' as Tur,m.Marketing  
    from  
    SiparislerTB s,MusterilerTB m  
    where Year(YuklemeTarihi)=${req.params.year}
    and Month(YuklemeTarihi)=${req.params.month}
    and m.ID=s.MusteriID  
    and m.Marketing not in ('Mekmar Numune','Seleksiyon','Warehouse')  
    and m.Marketing is not null  
     
    union  
    select  
    s.Tarih as YuklemeTarihi,  
    s.CikisNo as SiparisNo,  
    m.FirmaAdi as MusteriAdi,  
    Sum(Toplam) as Fob  
    ,Sum((s.BirimFiyat+7.5)*u.Miktar) as Dtp,  
    'Depo' as Tur,m.Marketing  
    from  
    SevkiyatTB s,MusterilerTB m,UretimTB u  
    where s.MusteriID=m.ID and u.KasaNo=s.KasaNo  
    and Year(s.Tarih)=${req.params.year} and Month(s.Tarih)=${req.params.month}
    and m.Mt_No=1  
    group by  
    s.Tarih,s.CikisNo,m.FirmaAdi,m.Marketing
    `;
    const yearlySql = `
    select  
    s.YuklemeTarihi,  
    s.SiparisNo,  
    m.FirmaAdi as MusteriAdi,  
    (select Sum(SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo) as Fob,  
    (select Sum(SatisToplam) from SiparisUrunTB su where su.SiparisNo=s.SiparisNo)+  
    dbo.Get_SiparisNavlun(s.SiparisNo) as Dtp,  
    'Konteyner' as Tur,m.Marketing  
    from  
    SiparislerTB s,MusterilerTB m  
    where Year(YuklemeTarihi)=${req.params.year}
    and m.ID=s.MusteriID  
    and m.Marketing not in ('Mekmar Numune','Seleksiyon','Warehouse')  
    and m.Marketing is not null  
     
    union  
    select  
    s.Tarih as YuklemeTarihi,  
    s.CikisNo as SiparisNo,  
    m.FirmaAdi as MusteriAdi,  
    Sum(Toplam) as Fob  
    ,Sum((s.BirimFiyat+7.5)*u.Miktar) as Dtp,  
    'Depo' as Tur,m.Marketing  
    from  
    SevkiyatTB s,MusterilerTB m,UretimTB u  
    where s.MusteriID=m.ID and u.KasaNo=s.KasaNo  
    and Year(s.Tarih)=${req.params.year}
    and m.Mt_No=1  
    group by  
    s.Tarih,s.CikisNo,m.FirmaAdi,m.Marketing
    `;
    mssql.query(sql,(err,loading)=>{
        mssql.query(yearlySql,(err,yearly)=>{
            res.status(200).json({'list':loading.recordset,'yearly':yearly.recordset});

        });
        
    });
});

app.get('/reports/loading/list/by/customer/:year/:month',(req,res)=>{
    const sql = `
    select  
    m.ID as MusteriId,  
    m.FirmaAdi as MusteriAdi,  
     m.Marketing, 
     
   (  
      Select Sum(SatisToplam) from SiparislerTB s, SiparisUrunTB u where s.SiparisNo=u.SiparisNo  
      and s.SiparisDurumID=3 and s.MusteriID=m.ID and Year(YuklemeTarihi)='${req.params.year}'  and MONTH(YuklemeTarihi) ='${req.params.month}'  and s.SiparisDurumID=3
   ) 
       
   as Fob, 
   
   (  
      Select Sum(SatisToplam) from SiparislerTB s, SiparisUrunTB u where s.SiparisNo=u.SiparisNo  
      and s.SiparisDurumID=3 and s.MusteriID=m.ID and Year(YuklemeTarihi)='${req.params.year}' and MONTH(YuklemeTarihi) ='${req.params.month}'  and s.SiparisDurumID=3
   )  +  
   (  
       Select Sum(s.NavlunSatis + s.DetayTutar_1 + s.DetayTutar_2 + s.DetayTutar_3 + s.sigorta_tutar_satis) from SiparislerTB s  
       where s.MusteriID=m.ID and YEAR(s.YuklemeTarihi)='${req.params.year}' and MONTH(s.YuklemeTarihi) ='${req.params.month}'  and s.SiparisDurumID=3
   )  
       
   as Dtp 
  
   from  
   MusterilerTB m,YeniTeklif_UlkeTB u  
   where 
   u.Id = m.UlkeId  
   order by  m.FirmaAdi asc
    `;
    mssql.query(sql,(err,results)=>{
        const data = [];
        results.recordset.forEach(x=>{
            if(x.Fob >0){
                data.push(x);
            } 
        })
        res.status(200).json({'list':data});
        
    });

});






app.get('/reports/mekmar/summary/order/list', (req, res) => {
    const sqlThisYear = `
                    select 
                    dbo.SiparisUrunler_Toplami_by_SipTarihi(MONTH(s.SiparisTarihi),YEAR(GETDATE())) as FOB,
                    sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) + sum(s.DetayTutar_4) + dbo.SiparisUrunler_Toplami_by_SipTarihi(MONTH(s.SiparisTarihi),YEAR(GETDATE())) as DDP,
                    MONTH(s.SiparisTarihi) as Month,
					YEAR(s.SiparisTarihi) as Year
                    from SiparislerTB s 
                    inner join MusterilerTB m on m.ID = s.MusteriID
                    where YEAR(s.SiparisTarihi) = YEAR(GETDATE()) and m.Marketing = 'Mekmar'

                    group by MONTH(s.SiparisTarihi),YEAR(s.SiparisTarihi)
                `;
    const sqlPreviousYear = `
                           select 
                    dbo.SiparisUrunler_Toplami_by_SipTarihi(MONTH(s.SiparisTarihi),YEAR(GETDATE())-1) as FOB,
                    sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) + sum(s.DetayTutar_4) + dbo.SiparisUrunler_Toplami_by_SipTarihi(MONTH(s.SiparisTarihi),YEAR(GETDATE())-1) as DDP,
                    MONTH(s.SiparisTarihi) as Month,
					YEAR(s.SiparisTarihi) as Year
                    from SiparislerTB s 
                    inner join MusterilerTB m on m.ID = s.MusteriID
                    where YEAR(s.SiparisTarihi) = YEAR(GETDATE())-1 and m.Marketing = 'Mekmar'

                    group by MONTH(s.SiparisTarihi),YEAR(s.SiparisTarihi)
    `;
    const sqlTwoPreviousYear = `
                                                               select 
                    dbo.SiparisUrunler_Toplami_by_SipTarihi(MONTH(s.SiparisTarihi),YEAR(GETDATE())-2) as FOB,
                    sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) + sum(s.DetayTutar_4) + dbo.SiparisUrunler_Toplami_by_SipTarihi(MONTH(s.SiparisTarihi),YEAR(GETDATE())-2) as DDP,
                    MONTH(s.SiparisTarihi) as Month,
					YEAR(s.SiparisTarihi) as Year
                    from SiparislerTB s 
                    inner join MusterilerTB m on m.ID = s.MusteriID
                    where YEAR(s.SiparisTarihi) = YEAR(GETDATE())-2 and m.Marketing = 'Mekmar'

                    group by MONTH(s.SiparisTarihi),YEAR(s.SiparisTarihi)
                                `
    mssql.query(sqlThisYear, (err, thisYear) => {
        mssql.query(sqlPreviousYear, (err, previousYear) => {
            mssql.query(sqlTwoPreviousYear, (err,twoPreviousYear) => {
            res.status(200).json({ items: [thisYear.recordset, previousYear.recordset,twoPreviousYear.recordset] });
            });
        });
    });
});
app.get('/reports/mekmar/summary/forwarding/list', (req, res) => {
    const sqlThisYear = `
                        select 

                    YEAR(s.YuklemeTarihi) as Year,
                    MONTH(s.YuklemeTarihi) as Month,
                    (sum(s.NavlunSatis) +
                    sum(s.DetayTutar_1) +
                    sum(s.DetayTutar_2) +
                    sum(s.DetayTutar_3) +
                    sum(s.DetayTutar_4) +
                    dbo.SiparisUrunler_Toplami_by_YukTarihi(MONTH(s.YuklemeTarihi),YEAR(GETDATE()))) as DDP,

                    dbo.SiparisUrunler_Toplami_by_YukTarihi(MONTH(s.YuklemeTarihi),YEAR(GETDATE())) as FOB

                from SiparislerTB s
                inner join MusterilerTB m on m.ID = s.MusteriID
                where m.Marketing='Mekmar' and YEAR(s.YuklemeTarihi) = YEAR(GETDATE())
                group by MONTH(s.YuklemeTarihi),YEAR(s.YuklemeTarihi)
    `;
    const sqlPreviousYear = `
        select 

	YEAR(s.YuklemeTarihi) as Year,
	MONTH(s.YuklemeTarihi) as Month,
	(sum(s.NavlunSatis) +
	sum(s.DetayTutar_1) +
	sum(s.DetayTutar_2) +
	sum(s.DetayTutar_3) +
	sum(s.DetayTutar_4) +
	dbo.SiparisUrunler_Toplami_by_YukTarihi(MONTH(s.YuklemeTarihi),YEAR(GETDATE()) - 1)) as DDP,

	dbo.SiparisUrunler_Toplami_by_YukTarihi(MONTH(s.YuklemeTarihi),YEAR(GETDATE()) - 1) as FOB

from SiparislerTB s
inner join MusterilerTB m on m.ID = s.MusteriID
where m.Marketing='Mekmar' and YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) - 1
group by MONTH(s.YuklemeTarihi),YEAR(s.YuklemeTarihi)
    `;
    const sqlTwoPreviousYear = `
        select 

	YEAR(s.YuklemeTarihi) as Year,
	MONTH(s.YuklemeTarihi) as Month,
	(sum(s.NavlunSatis) +
	sum(s.DetayTutar_1) +
	sum(s.DetayTutar_2) +
	sum(s.DetayTutar_3) +
	sum(s.DetayTutar_4) +
	dbo.SiparisUrunler_Toplami_by_YukTarihi(MONTH(s.YuklemeTarihi),YEAR(GETDATE()) - 2)) as DDP,

	dbo.SiparisUrunler_Toplami_by_YukTarihi(MONTH(s.YuklemeTarihi),YEAR(GETDATE()) - 2) as FOB

from SiparislerTB s
inner join MusterilerTB m on m.ID = s.MusteriID
where m.Marketing='Mekmar' and YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) - 2
group by MONTH(s.YuklemeTarihi),YEAR(s.YuklemeTarihi)
    `

    mssql.query(sqlThisYear, (err, thisYear) => {
        mssql.query(sqlPreviousYear, (err, previousYear) => {
            mssql.query(sqlTwoPreviousYear, (err, twoPreviousYear) => {
                res.status(200).json({ items: [thisYear.recordset, previousYear.recordset,twoPreviousYear.recordset] });
            });
    });
    });
});

app.post('/reports/mekmar/summary/order/detail/list', (req, res) => {
    const sql = `   
                    select 

                        dbo.SiparisUrunler_Toplami_by_Po(s.SiparisNo) as Fob,
                        s.NavlunSatis + s.DetayTutar_1 +s.DetayTutar_2+s.DetayTutar_3 + s.DetayTutar_4 + dbo.SiparisUrunler_Toplami_by_Po(s.SiparisNo) as Ddp,
                        s.SiparisNo,
                        s.SiparisTarihi,
                        st.TeslimTur,
                        s.NavlunSatis,
                        s.DetayTutar_1,
                        s.DetayTutar_2,
                        s.DetayTutar_3,
                        s.DetayTutar_4,
                        	m.FirmaAdi


                    from SiparislerTB s
                    inner join MusterilerTB m on m.ID = s.MusteriID
                    inner join SiparisTeslimTurTB st on st.ID = s.TeslimTurID
                    where YEAR(s.SiparisTarihi) = ${req.body.Year} and MONTH(s.SiparisTarihi) = ${req.body.Month} and m.Marketing = 'Mekmar'
                `;
    mssql.query(sql, (err, results) => {
       res.status(200).json({'list':results.recordset}) 
    });
});
app.post('/reports/mekmar/summary/forwarding/detail/list', (req, res) => {
    const sql = `   
                    select 

                        dbo.SiparisUrunler_Toplami_by_Po(s.SiparisNo) as Fob,
                        s.NavlunSatis + s.DetayTutar_1 +s.DetayTutar_2+s.DetayTutar_3 + s.DetayTutar_4 + dbo.SiparisUrunler_Toplami_by_Po(s.SiparisNo) as Ddp,
                        s.SiparisNo,
                        s.SiparisTarihi,
                        st.TeslimTur,
                        s.NavlunSatis,
                        s.DetayTutar_1,
                        s.DetayTutar_2,
                        s.DetayTutar_3,
                        s.DetayTutar_4,
                        	m.FirmaAdi


                    from SiparislerTB s
                    inner join MusterilerTB m on m.ID = s.MusteriID
                    inner join SiparisTeslimTurTB st on st.ID = s.TeslimTurID
                    where YEAR(s.YuklemeTarihi) = ${req.body.Year} and MONTH(s.YuklemeTarihi) = ${req.body.Month} and m.Marketing = 'Mekmar'
                `;
    mssql.query(sql, (err, results) => {
       res.status(200).json({'list':results.recordset}) 
    });
});

app.get('/reports/mekmar/summary/order/list/by/representative/:userId', (req, res) => {
    
    const sqlThisYear = `
select 
dbo.SiparisUrunler_Ozet_Temsilci_Toplam_2(MONTH(s.SiparisTarihi),YEAR(s.SiparisTarihi),'${req.params.userId}','${req.params.userId}') as FOB,
sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) + sum(s.DetayTutar_4) +dbo.SiparisUrunler_Ozet_Temsilci_Toplam_2(MONTH(s.SiparisTarihi),YEAR(s.SiparisTarihi),'${req.params.userId}','${req.params.userId}') as DDP,
MONTH(s.SiparisTarihi) as Month,
YEAR(s.SiparisTarihi) as Year


from SiparislerTB s
where (s.SiparisSahibi = '${req.params.userId}' or s.Operasyon = '${req.params.userId}') and YEAR(s.SiparisTarihi) = YEAR(GETDATE())
group by MONTH(s.SiparisTarihi),YEAR(s.SiparisTarihi)
                `;
    const sqlPreviousYear = `
select 
dbo.SiparisUrunler_Ozet_Temsilci_Toplam_2(MONTH(s.SiparisTarihi),YEAR(GETDATE()) - 1,'${req.params.userId}','${req.params.userId}') as FOB,
sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3) + sum(s.DetayTutar_4) +dbo.SiparisUrunler_Ozet_Temsilci_Toplam_2(MONTH(s.SiparisTarihi),YEAR(GETDATE()) - 1,'${req.params.userId}','${req.params.userId}') as DDP,
MONTH(s.SiparisTarihi) as Month,
YEAR(s.SiparisTarihi) as Year

from SiparislerTB s
where (s.SiparisSahibi = '${req.params.userId}' or s.Operasyon = '${req.params.userId}') and YEAR(s.SiparisTarihi) = YEAR(GETDATE()) - 1
group by MONTH(s.SiparisTarihi),YEAR(s.SiparisTarihi)
    `;

    mssql.query(sqlThisYear, (err, thisYear) => {
        mssql.query(sqlPreviousYear, (err, previousYear) => {
            res.status(200).json({ items: [thisYear.recordset, previousYear.recordset] });

        });
    });
});
app.get('/reports/mekmar/summary/order/list/by/representative/detail/:userId/:month/:year', (req, res) => {
    const detailSql = `
    select 

                        dbo.SiparisUrunler_Toplami_by_Po(s.SiparisNo) as Fob,
                        s.NavlunSatis + s.DetayTutar_1 +s.DetayTutar_2+s.DetayTutar_3 + s.DetayTutar_4 + dbo.SiparisUrunler_Toplami_by_Po(s.SiparisNo) as Ddp,
                        s.SiparisNo,
                        s.SiparisTarihi,
                        st.TeslimTur,
                        s.NavlunSatis,
                        s.DetayTutar_1,
                        s.DetayTutar_2,
                        s.DetayTutar_3,
                        s.DetayTutar_4,
                        	m.FirmaAdi


                    from SiparislerTB s
                    inner join MusterilerTB m on m.ID = s.MusteriID
                    inner join SiparisTeslimTurTB st on st.ID = s.TeslimTurID
                    where YEAR(s.SiparisTarihi) = ${req.params.year} and MONTH(s.SiparisTarihi) = ${req.params.month} and m.Marketing = 'Mekmar' and (s.SiparisSahibi=${req.params.userId} or s.Operasyon=${req.params.userId})
    `;
    mssql.query(detailSql, (err, detail) => {
        res.status(200).json({ 'list': detail.recordset });
    });
});




function noneControl(value) {
    if (value == null || value == undefined) {
        return parseFloat(0).toFixed(4);
    } else{
        return parseFloat(value).toFixed(4);
    }
};


app.get('/reports/mekmar/gu/list', (req, res) => {
    const yearListSql = `
        select YEAR(s.YuklemeTarihi) as Year from SiparislerTB s 
		where YEAR(s.YuklemeTarihi) is not null
        group by YEAR(s.YuklemeTarihi)
        order by YEAR(s.YuklemeTarihi) desc  
    `;

    mssql.query(yearListSql, (err, yearList) => {
        let year = yearList.recordset[0].Year;

        
        const contSql = `
                            select m.UlkeId,ytu.UlkeAdi,sum(s.KonteynirSayisi) as KontSayisi,COUNT(s.ID) as SipSayisi from MusterilerTB m
                            inner join SiparislerTB s on s.MusteriID = m.ID
                            inner join YeniTeklif_UlkeTB ytu on ytu.Id = m.UlkeId
                            where YEAR(s.YuklemeTarihi) = '${year}' and m.Marketing='Mekmar'
                            group by 
                            m.UlkeId,ytu.UlkeAdi
                        `;
            const contByCustSql = `
                                        select m.FirmaAdi,sum(s.KonteynirSayisi) as KontSayisi,COUNT(s.ID) as SipSayisi from MusterilerTB m
                                        inner join SiparislerTB s on s.MusteriID = m.ID
                                        inner join YeniTeklif_UlkeTB ytu on ytu.Id = m.UlkeId
                                        where YEAR(s.YuklemeTarihi) = '${year}' and m.Marketing='Mekmar'
                                        group by 
                                        m.ID,m.FirmaAdi
                                  `
            mssql.query(contSql, (err, contList) => {
                mssql.query(contByCustSql, (err, contByCust) => {
                    const mekusSql = `
                                        select 
                                            s.SiparisNo,
                                            s.DetayTutar_4
                                        from SiparislerTB s where YEAR(s.YuklemeTarihi) = '${year}' and s.depo_yukleme=1
                                     `;
                    mssql.query(mekusSql, (err, mekusList) => {
                        const logsSql = `
                                            select 
                                                YEAR(mad.DegisiklikTarihi) as Yil,
                                                MONTH(mad.DegisiklikTarihi) as Ay,
                                                DAY(mad.DegisiklikTarihi) as Gun,

                                                mad.DegisiklikTarihi,
                                                mad.YuklemeTarihi,
                                                mad.SiparisNo,
                                                mad.DegisiklikYapan,
                                                mad.Renk,
                                                mad.IslemAdi
                                            from MaliyetAnaliziDegisikliklerTB mad
                                            where YEAR(mad.DegisiklikTarihi) = '${year}'
                                            order by mad.DegisiklikTarihi desc
                                        `;
                        mssql.query(logsSql, (err, logsList) => {
                            const forwSql = `
                                                select 
                                                    MONTH(s.YuklemeTarihi) as Ay,
                                                    (sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3)+sum(s.DetayTutar_4)+
                                                    dbo.Gu_Sevk_Ozet_Sip_Urn_Turkey(YEAR(s.YuklemeTarihi),MONTH(s.YuklemeTarihi))
                                                    ) as Ddp,
                                                    dbo.Gu_Sevk_Ozet_Sip_Urn_Turkey(YEAR(s.YuklemeTarihi),MONTH(s.YuklemeTarihi)) as Fob,
                                                    YEAR(s.YuklemeTarihi) as Yil

                                                from SiparislerTB s
                                                inner join MusterilerTB m on m.ID = s.MusteriID
                                                where MONTH(s.YuklemeTarihi) is not null and m.Marketing = 'Mekmar'
                                                group by MONTH(s.YuklemeTarihi),YEAR(s.YuklemeTarihi)
                                                order by MONTH(s.YuklemeTarihi),YEAR(s.YuklemeTarihi)
                                            `;
                            mssql.query(forwSql, (err, forwList) => {
                                const ayoSql = `select Yil,Usd,Tl from Ayo_Total_Custom`;
                                mssql.query(ayoSql, (err, ayo) => {
                                    const orderSummarySql = `
                                                                                    select 
                                                    MONTH(s.SiparisTarihi) as Ay,
                                                    (sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3)+sum(s.DetayTutar_4)+
                                                    dbo.Gu_Order_Ozet_Sip_Urn_Turkey(YEAR(s.SiparisTarihi),MONTH(s.SiparisTarihi))
                                                    ) as Ddp,
                                                    dbo.Gu_Order_Ozet_Sip_Urn_Turkey(YEAR(s.SiparisTarihi),MONTH(s.SiparisTarihi)) as Fob,
                                                    YEAR(s.SiparisTarihi) as Yil

                                                from SiparislerTB s
                                                inner join MusterilerTB m on m.ID = s.MusteriID
                                                where MONTH(s.SiparisTarihi) is not null and m.Marketing = 'Mekmar'
                                                group by MONTH(s.SiparisTarihi),YEAR(s.SiparisTarihi)
                                                order by MONTH(s.SiparisTarihi),YEAR(s.SiparisTarihi)
                                    `;
                                    mssql.query(orderSummarySql,(err,orderSummary)=>{
                                        res.status(200).json({
                                            'contByCust':contByCust.recordset,
                                            'contList':contList.recordset,
                                            'yearList': yearList.recordset,
                                            'mekusList':mekusList.recordset,
                                            'logsList': logsList.recordset,
                                            'forwList': forwList.recordset,
                                            'ayoList':ayo.recordset,
                                            'orderSummaryList':orderSummary.recordset
                                        });
                                    });

                                });

                            });

                        });

                    });

                });

            });

        
        
    });


});

app.get('/reports/mekmar/gu/list/:year', (req, res) => {
        const yearListSql = `
        select YEAR(s.YuklemeTarihi) as Year from SiparislerTB s 
		where YEAR(s.YuklemeTarihi) is not null
        group by YEAR(s.YuklemeTarihi)
        order by YEAR(s.YuklemeTarihi) desc  
    `;

    mssql.query(yearListSql, (err, yearList) => {

            const contListSql = `
                            select m.UlkeId,ytu.UlkeAdi,sum(s.KonteynirSayisi) as KontSayisi,COUNT(s.ID) as SipSayisi from MusterilerTB m
                            inner join SiparislerTB s on s.MusteriID = m.ID
                            inner join YeniTeklif_UlkeTB ytu on ytu.Id = m.UlkeId
                            where YEAR(s.YuklemeTarihi) = ${req.params.year} and m.Marketing='Mekmar'
                            group by 
                            m.UlkeId,ytu.UlkeAdi
                             `;
            mssql.query(contListSql, (err, contList) => {
                const contByCustSql = `
                        select m.FirmaAdi,sum(s.KonteynirSayisi) as KontSayisi,COUNT(s.ID) as SipSayisi from MusterilerTB m
                        inner join SiparislerTB s on s.MusteriID = m.ID
                        inner join YeniTeklif_UlkeTB ytu on ytu.Id = m.UlkeId
                        where YEAR(s.YuklemeTarihi) = ${req.params.year} and m.Marketing='Mekmar'
                        group by 
                        m.ID,m.FirmaAdi`;
                mssql.query(contByCustSql, (err, contByCust) => {
                    const mekusSql = `
                        select 
                            s.SiparisNo,
                            s.DetayTutar_4
                        from SiparislerTB s where YEAR(s.YuklemeTarihi) = ${req.params.year} and s.depo_yukleme=1
                    `;
                    mssql.query(mekusSql, (err, mekusList) => {
                         const logsSql = `
                                            select 
                                                YEAR(mad.DegisiklikTarihi) as Yil,
                                                MONTH(mad.DegisiklikTarihi) as Ay,
                                                DAY(mad.DegisiklikTarihi) as Gun,

                                                mad.DegisiklikTarihi,
                                                mad.YuklemeTarihi,
                                                mad.SiparisNo,
                                                mad.DegisiklikYapan,
                                                mad.Renk,
                                                mad.IslemAdi


                                            from MaliyetAnaliziDegisikliklerTB mad
                                            where YEAR(mad.DegisiklikTarihi) = '${req.params.year}'
                                            order by mad.DegisiklikTarihi desc
                                        `;


                        mssql.query(logsSql, (err, logsList) => {
                         const forwSql = `
                                                select 
                                                    MONTH(s.YuklemeTarihi) as Ay,
                                                    (sum(s.NavlunSatis) + sum(s.DetayTutar_1) + sum(s.DetayTutar_2) + sum(s.DetayTutar_3)+
                                                    dbo.Gu_Sevk_Ozet_Sip_Urn_Turkey(YEAR(s.YuklemeTarihi),MONTH(s.YuklemeTarihi))
                                                    ) as Ddp,
                                                    dbo.Gu_Sevk_Ozet_Sip_Urn_Turkey(YEAR(s.YuklemeTarihi),MONTH(s.YuklemeTarihi)) as Fob,
                                                    YEAR(s.YuklemeTarihi) as Yil

                                                from SiparislerTB s
                                                inner join MusterilerTB m on m.ID = s.MusteriID
                                                where MONTH(s.YuklemeTarihi) is not null and m.Marketing = 'Mekmar'
                                                group by MONTH(s.YuklemeTarihi),YEAR(s.YuklemeTarihi)
                                                order by MONTH(s.YuklemeTarihi),YEAR(s.YuklemeTarihi)
                                            `;
                            mssql.query(forwSql, (err, forwList) => {
                                                        res.status(200).json({
                            'contList': contList.recordset,
                            'yearList': yearList.recordset,
                            'contByCust': contByCust.recordset,
                            'mekusList':mekusList.recordset,
                            'logsList': logsList.recordset,
                            'forwList':forwList.recordset,



                        });
                            });

                    });

                    });

                });

            });

        
        
    });
});

app.get('/reports/mekmar/gu/operation/orderer/list/:userId',async (req,res)=>{
    const thisYearSqlOrderer = `
        select 
            MONTH(s.SiparisTarihi) as Month,
            dbo.Gu_Reports_by_Orderer(MONTH(s.SiparisTarihi),YEAR(GETDATE()),'${req.params.userId}') as FOB,
            SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) + SUM(s.DetayTutar_4) 
            +dbo.Gu_Reports_by_Orderer(MONTH(s.SiparisTarihi),YEAR(GETDATE()),'${req.params.userId}') as DDP
        from SiparislerTB s

        where YEAR(s.SiparisTarihi) = YEAR(GETDATE()) and s.SiparisSahibi = '${req.params.userId}'

        group by MONTH(s.SiparisTarihi)
    `;
    const previousYearSqlOrderer = `
                select 
            MONTH(s.SiparisTarihi) as Month,
            dbo.Gu_Reports_by_Orderer(MONTH(s.SiparisTarihi),YEAR(GETDATE()) - 1,'${req.params.userId}') as FOB,
            SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) + SUM(s.DetayTutar_4) 
            +dbo.Gu_Reports_by_Orderer(MONTH(s.SiparisTarihi),YEAR(GETDATE())- 1,'${req.params.userId}') as DDP
        from SiparislerTB s

        where YEAR(s.SiparisTarihi) = YEAR(GETDATE()) - 1 and s.SiparisSahibi = '${req.params.userId}'

        group by MONTH(s.SiparisTarihi)
    `;
    const twoYearsAgoSqlOrderer = `
                select 
            MONTH(s.SiparisTarihi) as Month,
            dbo.Gu_Reports_by_Orderer(MONTH(s.SiparisTarihi),YEAR(GETDATE())-2,'${req.params.userId}') as FOB,
            SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) + SUM(s.DetayTutar_4) 
            +dbo.Gu_Reports_by_Orderer(MONTH(s.SiparisTarihi),YEAR(GETDATE()) - 2,'${req.params.userId}') as DDP
        from SiparislerTB s

        where YEAR(s.SiparisTarihi) = YEAR(GETDATE()) - 2 and s.SiparisSahibi = '${req.params.userId}'

        group by MONTH(s.SiparisTarihi)
    `;

    const thisYearSqlOperation = `
        select 
	MONTH(s.SiparisTarihi) as Month,
	dbo.Gu_Reports_by_Operation(MONTH(s.SiparisTarihi),YEAR(GETDATE()),'${req.params.userId}') as FOB,
	SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) + SUM(s.DetayTutar_4) 
	+dbo.Gu_Reports_by_Operation(MONTH(s.SiparisTarihi),YEAR(GETDATE()),'${req.params.userId}') as DDP
from SiparislerTB s

where YEAR(s.SiparisTarihi) = YEAR(GETDATE()) and s.Operasyon = '${req.params.userId}'

group by MONTH(s.SiparisTarihi)
    `;
    const previousYearSqlOperation = `
                select 
	MONTH(s.SiparisTarihi) as Month,
	dbo.Gu_Reports_by_Operation(MONTH(s.SiparisTarihi),YEAR(GETDATE())-1,'${req.params.userId}') as FOB,
	SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) + SUM(s.DetayTutar_4) 
	+dbo.Gu_Reports_by_Operation(MONTH(s.SiparisTarihi),YEAR(GETDATE())-1,'${req.params.userId}') as DDP
from SiparislerTB s

where YEAR(s.SiparisTarihi) = YEAR(GETDATE()) -1 and s.Operasyon = '${req.params.userId}'

group by MONTH(s.SiparisTarihi)
    `;
    const twoYearsAgoSqlOperation = `
                        select 
	MONTH(s.SiparisTarihi) as Month,
	dbo.Gu_Reports_by_Operation(MONTH(s.SiparisTarihi),YEAR(GETDATE())-2,'${req.params.userId}') as FOB,
	SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) + SUM(s.DetayTutar_4) 
	+dbo.Gu_Reports_by_Operation(MONTH(s.SiparisTarihi),YEAR(GETDATE())-2,'${req.params.userId}') as DDP
from SiparislerTB s

where YEAR(s.SiparisTarihi) = YEAR(GETDATE()) -2 and s.Operasyon = '${req.params.userId}'

group by MONTH(s.SiparisTarihi)
    `;




    const thisYearSqlOrdererForw = `
select 
            MONTH(s.YuklemeTarihi) as Month,
            dbo.Gu_Reports_by_Orderer_Forw(MONTH(s.YuklemeTarihi),YEAR(GETDATE()),'${req.params.userId}') as FOB,
            SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) + SUM(s.DetayTutar_4) 
            +dbo.Gu_Reports_by_Orderer_Forw(MONTH(s.YuklemeTarihi),YEAR(GETDATE()),'${req.params.userId}') as DDP
        from SiparislerTB s

        where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) and s.SiparisSahibi = '${req.params.userId}' and s.SiparisDurumID=3

        group by MONTH(s.YuklemeTarihi)
    `;
    const previousYearSqlOrdererForw = `
select 
            MONTH(s.YuklemeTarihi) as Month,
            dbo.Gu_Reports_by_Orderer_Forw(MONTH(s.YuklemeTarihi),YEAR(GETDATE()) - 1,'${req.params.userId}') as FOB,
            SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) + SUM(s.DetayTutar_4) 
            +dbo.Gu_Reports_by_Orderer_Forw(MONTH(s.YuklemeTarihi),YEAR(GETDATE()) - 1,'${req.params.userId}') as DDP
        from SiparislerTB s

        where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) - 1 and s.SiparisSahibi = '${req.params.userId}' and s.SiparisDurumID=3

        group by MONTH(s.YuklemeTarihi)
    `;
    const twoYearsAgoSqlOrdererForw = `
                select 
            MONTH(s.YuklemeTarihi) as Month,
            dbo.Gu_Reports_by_Orderer_Forw(MONTH(s.YuklemeTarihi),YEAR(GETDATE()) - 2,'${req.params.userId}') as FOB,
            SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) + SUM(s.DetayTutar_4) 
            +dbo.Gu_Reports_by_Orderer_Forw(MONTH(s.YuklemeTarihi),YEAR(GETDATE()) - 2,'${req.params.userId}') as DDP
        from SiparislerTB s

        where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) - 2 and s.SiparisSahibi = '${req.params.userId}' and s.SiparisDurumID=3

        group by MONTH(s.YuklemeTarihi)
    `;

    const thisYearSqlOperationForw = `
        select 
	MONTH(s.YuklemeTarihi) as Month,
	dbo.Gu_Reports_by_Operation_Forw(MONTH(s.YuklemeTarihi),YEAR(GETDATE()),'${req.params.userId}') as FOB,
	SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) + SUM(s.DetayTutar_4) 
	+dbo.Gu_Reports_by_Operation_Forw(MONTH(s.YuklemeTarihi),YEAR(GETDATE()),'${req.params.userId}') as DDP
from SiparislerTB s

where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) and s.Operasyon = '${req.params.userId}'

group by MONTH(s.YuklemeTarihi)
    `;
    const previousYearSqlOperationForw = `
                      select 
	MONTH(s.YuklemeTarihi) as Month,
	dbo.Gu_Reports_by_Operation_Forw(MONTH(s.YuklemeTarihi),YEAR(GETDATE()) - 1,'${req.params.userId}') as FOB,
	SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) + SUM(s.DetayTutar_4) 
	+dbo.Gu_Reports_by_Operation_Forw(MONTH(s.YuklemeTarihi),YEAR(GETDATE()) - 1,'${req.params.userId}') as DDP
from SiparislerTB s

where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) - 1 and s.Operasyon = '${req.params.userId}'

group by MONTH(s.YuklemeTarihi)
    `;
    const twoYearsAgoSqlOperationForw = `
                                             select 
	MONTH(s.YuklemeTarihi) as Month,
	dbo.Gu_Reports_by_Operation_Forw(MONTH(s.YuklemeTarihi),YEAR(GETDATE()) - 2,'${req.params.userId}') as FOB,
	SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) + SUM(s.DetayTutar_4) 
	+dbo.Gu_Reports_by_Operation_Forw(MONTH(s.YuklemeTarihi),YEAR(GETDATE()) - 2,'${req.params.userId}') as DDP
from SiparislerTB s

where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) - 2 and s.Operasyon = '${req.params.userId}'

group by MONTH(s.YuklemeTarihi)
    `;







    await mssql.query(thisYearSqlOrderer, async (err, thisyear) => {
        await mssql.query(previousYearSqlOrderer, async (err, previusyear) => {
            await mssql.query(twoYearsAgoSqlOrderer, async (err, twoyear) => {
                await mssql.query(thisYearSqlOperation, async (err, thisyearop) => {
                    await mssql.query(previousYearSqlOperation, async (err, previusyearop) => {
                        await mssql.query(twoYearsAgoSqlOperation, async (err, twoyearop) => {
                            await mssql.query(thisYearSqlOrdererForw, async (err, thisyearForw) => {
                                await mssql.query(previousYearSqlOrdererForw, async (err, previousyearForw) => {
                                    await mssql.query(twoYearsAgoSqlOrdererForw, async (err, twoyearagoForw) => {
                                        await mssql.query(thisYearSqlOperationForw, async (err, thisyearopForw) => {
                                            await mssql.query(previousYearSqlOperationForw, async (err, previousopForw) => {
                                                await mssql.query(twoYearsAgoSqlOperationForw, async (err, twoyearagoopForw) => {
                                                   
                                                    res.status(200).json({
                                                        'thisYearOrderer': thisyear.recordset,
                                                        'previusYearOrderer': previusyear.recordset,
                                                        'twoYearOrderer': twoyear.recordset,
                                                        'thisYearOperation': thisyearop.recordset,
                                                        'previusYearOperation': previusyearop.recordset,
                                                        'twoYearOperation': twoyearop.recordset,
                                                        'thisYearForwarding': thisyearForw.recordset,
                                                        'previousYearForwarding': previousyearForw.recordset,
                                                        'twoYearAgoForwarding': twoyearagoForw.recordset,
                                                        'thisYearOperationForwarding': thisyearopForw.recordset,
                                                        'previousYearOperationForwarding': previousopForw.recordset,
                                                        'twoYearAgoOperationForwarding':twoyearagoopForw.recordset
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                   })
               })
            });
        });
    });

});
app.get('/reports/gu/mekmar/order/seller/:month/:year/:userId', async (req, res) => {
    
    const sql = `
        select 
	s.SiparisNo,
	dbo.Gu_Reports_by_Seller_Detail(s.SiparisNo) + SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) + SUM(s.DetayTutar_4) as DDP,
	dbo.Gu_Reports_by_Seller_Detail(s.SiparisNo) as FOB,
	SUM(s.NavlunSatis) as Navlun,
	SUM(s.DetayTutar_1) as Detay1,
	SUM(s.DetayTutar_2) as Detay2,
	SUM(s.DetayTutar_3) as Detay3,
	SUM(s.DetayTutar_4) as Detay4

from SiparislerTB s

where YEAR(s.SiparisTarihi) = '${req.params.year}' and MONTH(s.SiparisTarihi) = '${req.params.month}' and s.SiparisSahibi='${req.params.userId}'
group by s.SiparisNo
    `;
    mssql.query(sql, (err, seller) => {
        res.status(200).json({ 'detail': seller.recordset });
    });
    
});

app.get('/reports/gu/mekmar/forwarding/seller/:month/:year/:userId', async (req, res) => {
        const sql = `
        select 
	s.SiparisNo,
	dbo.Gu_Reports_by_Seller_Detail(s.SiparisNo) + SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) + SUM(s.DetayTutar_4) as DDP,
	dbo.Gu_Reports_by_Seller_Detail(s.SiparisNo) as FOB,
	SUM(s.NavlunSatis) as Navlun,
	SUM(s.DetayTutar_1) as Detay1,
	SUM(s.DetayTutar_2) as Detay2,
	SUM(s.DetayTutar_3) as Detay3,
	SUM(s.DetayTutar_4) as Detay4

from SiparislerTB s

where YEAR(s.YuklemeTarihi) = '${req.params.year}' and MONTH(s.YuklemeTarihi) = '${req.params.month}' and s.SiparisSahibi='${req.params.userId}'
and s.SiparisDurumID=3
group by s.SiparisNo
    `;
    mssql.query(sql, (err, seller) => {
        res.status(200).json({ 'detail': seller.recordset });
    });
});



app.get('/reports/gu/mekmar/order/operation/:month/:year/:userId', async (req, res) => {
    
    const sql = `
        select 
	s.SiparisNo,
	dbo.Gu_Reports_by_Seller_Detail(s.SiparisNo) + SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) + SUM(s.DetayTutar_4) as DDP,
	dbo.Gu_Reports_by_Seller_Detail(s.SiparisNo) as FOB,
	SUM(s.NavlunSatis) as Navlun,
	SUM(s.DetayTutar_1) as Detay1,
	SUM(s.DetayTutar_2) as Detay2,
	SUM(s.DetayTutar_3) as Detay3,
	SUM(s.DetayTutar_4) as Detay4

from SiparislerTB s

where YEAR(s.SiparisTarihi) = '${req.params.year}' and MONTH(s.SiparisTarihi) = '${req.params.month}' and s.Operasyon='${req.params.userId}'
group by s.SiparisNo
    `;
    mssql.query(sql, (err, seller) => {
        res.status(200).json({ 'detail': seller.recordset });
    });
    
});

app.get('/reports/gu/mekmar/forwarding/operation/:month/:year/:userId', async (req, res) => {
        const sql = `
        select 
	s.SiparisNo,
	dbo.Gu_Reports_by_Seller_Detail(s.SiparisNo) + SUM(s.NavlunSatis) + SUM(s.DetayTutar_1) + SUM(s.DetayTutar_2) + SUM(s.DetayTutar_3) + SUM(s.DetayTutar_4) as DDP,
	dbo.Gu_Reports_by_Seller_Detail(s.SiparisNo) as FOB,
	SUM(s.NavlunSatis) as Navlun,
	SUM(s.DetayTutar_1) as Detay1,
	SUM(s.DetayTutar_2) as Detay2,
	SUM(s.DetayTutar_3) as Detay3,
	SUM(s.DetayTutar_4) as Detay4

from SiparislerTB s

where YEAR(s.YuklemeTarihi) = '${req.params.year}' and MONTH(s.YuklemeTarihi) = '${req.params.month}' and s.Operasyon='${req.params.userId}'
and s.SiparisDurumID=3
group by s.SiparisNo
    `;
    mssql.query(sql, (err, seller) => {
        res.status(200).json({ 'detail': seller.recordset });
    });
});



/*Sample */
app.get('/sample/list',async (req,res)=>{
    const yearSql = `
                select 

            YEAR(n.NumuneTarihi) as Yil

        from NumunelerTB n

        group by YEAR(n.NumuneTarihi)
        order by YEAR(n.NumuneTarihi) desc
    `;

    await mssql.query(yearSql, async (err, yearList) => {
        let year = yearList.recordset[0].Yil;
        const sampleSql = `
select 

	n.ID,
	n.NumuneNo,
	n.NumuneTarihi,
    n.DhlTarihi,
	n.NumuneTemsilci,
	n.MusteriID,
	n.Ulke,
	n.Adres,
	n.TrackingNo,
	n.Parite,
	n.Aciklama,
	n.YuklemeTarihi,
	n.KuryeAlis,
	n.KuryeSatis,
	n.GonderiTipi,
	n.BankaSecim,
	n.KategoriID,
	n.UrunBirimi,
	n.Miktar,
	n.Numune_Cloud,
	n.Numune_Cloud_Dosya,
	n.Numune_Cloud2,
	n.Numune_Cloud_Dosya2,
	n.TL_Alis,
	n.TL_Satis,
	n.Euro_Alis,
	n.Euro_Satis,
	(select k.KullaniciAdi from KullaniciTB k where k.ID = n.NumuneTemsilci) as NumuneTemsilciAdi,
	(select m.FirmaAdi from MusterilerTB m where m.ID = n.MusteriID) as NumuneMusteri,
	(select ytu.UlkeAdi from YeniTeklif_UlkeTB ytu where ytu.Id = n.Ulke) as NumuneUlke,
	(select ngt.GonderiAdi from NumuneGonderiTipi ngt where ngt.ID = n.GonderiTipi) as NumuneGonderiTipi,
	(select nbc.BankaAdi from NumuneBankaSecim nbc where nbc.ID = n.BankaSecim) as NumuneBanka,
	(select nk.Urun from NumuneKategoriTB nk where nk.ID = n.KategoriID) as NumuneKategori,
	(select ub.BirimAdi from UrunBirimTB ub where ub.ID = n.UrunBirimi) as NumuneUrunBirim,
	'https://file-service.mekmar.com/file/download/numune/numuneDosya' +'/' +  
LTRIM(str(n.ID))  + '/' +  n.Numune_Cloud_Dosya as OnYuzFoto,
	'https://file-service.mekmar.com/file/download/numune/numuneDosya' + '/' +  
LTRIM(str(n.ID))  + '/' + n.Numune_Cloud_Dosya2 as ArkaYuzFoto


from NumunelerTB n
where YEAR(n.NumuneTarihi) = '${year}'
        `;
        await mssql.query(sampleSql, (err, sampleList) => {
           res.status(200).json({
               'list': sampleList.recordset,
               'years':yearList.recordset
            }) 
        });
    });


});
app.get('/sample/list/:year',(req,res)=>{
    const yearSql = `
                select 

            YEAR(n.NumuneTarihi) as Yil

        from NumunelerTB n

        group by YEAR(n.NumuneTarihi)
        order by YEAR(n.NumuneTarihi) desc
    `;

    mssql.query(yearSql, (err, yearList) => {
        const sampleSql = `
            select 

	n.ID,
	n.NumuneNo,
	n.NumuneTarihi,
	n.NumuneTemsilci,
    n.DhlTarihi,
	n.MusteriID,
	n.Ulke,
	n.Adres,
	n.TrackingNo,
	n.Parite,
	n.Aciklama,
	n.YuklemeTarihi,
	n.KuryeAlis,
	n.KuryeSatis,
	n.GonderiTipi,
	n.BankaSecim,
	n.KategoriID,
	n.UrunBirimi,
	n.Miktar,
	n.Numune_Cloud,
	n.Numune_Cloud_Dosya,
	n.Numune_Cloud2,
	n.Numune_Cloud_Dosya2,
	n.TL_Alis,
	n.TL_Satis,
	n.Euro_Alis,
	n.Euro_Satis,
	(select k.KullaniciAdi from KullaniciTB k where k.ID = n.NumuneTemsilci) as NumuneTemsilciAdi,
	(select m.FirmaAdi from MusterilerTB m where m.ID = n.MusteriID) as NumuneMusteri,
	(select ytu.UlkeAdi from YeniTeklif_UlkeTB ytu where ytu.Id = n.Ulke) as NumuneUlke,
	(select ngt.GonderiAdi from NumuneGonderiTipi ngt where ngt.ID = n.GonderiTipi) as NumuneGonderiTipi,
	(select nbc.BankaAdi from NumuneBankaSecim nbc where nbc.ID = n.BankaSecim) as NumuneBanka,
	(select nk.Urun from NumuneKategoriTB nk where nk.ID = n.KategoriID) as NumuneKategori,
	(select ub.BirimAdi from UrunBirimTB ub where ub.ID = n.UrunBirimi) as NumuneUrunBirim,
	'https://file-service.mekmar.com/file/download/numune/numuneDosya' +'/' +  
LTRIM(str(n.ID))  + '/' +  n.Numune_Cloud_Dosya as OnYuzFoto,
	'https://file-service.mekmar.com/file/download/numune/numuneDosya' + '/' +  
LTRIM(str(n.ID))  + '/' + n.Numune_Cloud_Dosya2 as ArkaYuzFoto


from NumunelerTB n
where YEAR(n.NumuneTarihi) = '${req.params.year}'
        `;
        mssql.query(sampleSql, (err, sampleList) => {
           res.status(200).json({
               'list': sampleList.recordset,
               'years':yearList.recordset
            }) 
        });
    });
});
app.post('/sample/paid/save', (req, res) => {
    const sql = `
        insert into NumuneOdemelerTB(Tarih,MusteriID,NumuneNo,Aciklama,Tutar,Kullanici,Banka)
        VALUES('${req.body.Tarih}','${req.body.MusteriID}','${req.body.NumuneNo}','${req.body.Aciklama}','${req.body.Tutar}','${req.body.Kullanici}','${req.body.Banka}')
    `;
    mssql.query(sql, (err, samplePaid) => {
        if (samplePaid.rowsAffected[0] == 1) {
            const idSql = `select top 1 ID from NumuneOdemelerTB order by ID desc`;
            mssql.query(idSql, (err, id) => {
                
                res.status(200).json({ 'status': true ,'id':id.recordset[0].ID});
            });
        } else{
            res.status(200).json({ 'status': false });
        }
        
    })
});
app.post('/sample/photos/front', (req, res) => {
    const sql = `
        update NumunelerTB SET Numune_Cloud='${req.body.Numune_Cloud}',Numune_Cloud_Dosya='${req.body.Numune_Cloud_Dosya}' where ID='${req.body.ID}';
    `;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0] == 1){
            res.status(200).json({ 'status': true });
        } else {
            res.status(200).json({ 'status': false });
        }
    })
});
app.post('/sample/photos/back', (req, res) => {
    const sql = `
        update NumunelerTB SET Numune_Cloud2='${req.body.Numune_Cloud2}',Numune_Cloud_Dosya2='${req.body.Numune_Cloud_Dosya2}' where ID='${req.body.ID}';
    `;
    mssql.query(sql,(err,results)=>{
        if(results.rowsAffected[0] == 1){
            res.status(200).json({ 'status': true });
        } else {
            res.status(200).json({ 'status': false });
        }
    })
});

function getSampleCustomerId(event){

    return new Promise((resolve,reject)=>{
        const sql = `
        insert into YeniTeklif_MusterilerTB(
            MusteriAdi,
            UlkeId
            )
        VALUES(
        '${event.FirmaAdi}',
        '${event.Ulke}'
        )
        `;
        mssql.query(sql,(err,customer)=>{
            if(customer.rowsAffected[0] == 1){
                const sqlCustomerId = `select top 1 ID from YeniTeklif_MusterilerTB order by ID desc
                `;
                mssql.query(sqlCustomerId,(err,customer_id)=>{
                    resolve(customer_id.recordset[0].ID)
                });
            }   
        });
    });


}





app.post('/sample/save', (req, res) => {
    if(req.body.MusteriID){
        const sql = `
            insert into NumunelerTB(
                    NumuneNo,
                    NumuneTarihi,
                    NumuneTemsilci,
                    MusteriID,
                    Ulke,
                    Adres,
                    TrackingNo,
                    Parite,
                    Aciklama,
                    YuklemeTarihi,
                    KuryeAlis,
                    KuryeSatis,
                    GonderiTipi,
                    BankaSecim,
                    KategoriID,
                    UrunBirimi,
                    Miktar,
                    TL_Alis,
                    TL_Satis,
                    Euro_Alis,
                    Euro_Satis,
                    DhlTarihi
                    )
                    VALUES(
                    '${req.body.NumuneNo}',
                    '${req.body.NumuneTarihi}',
                    '${req.body.NumuneTemsilci}',
                    '${req.body.MusteriID}',
                    '${req.body.Ulke}',
                    '${req.body.Adres}',
                    '${req.body.TrackingNo}',
                    '${req.body.Parite}',
                    '${req.body.Aciklama}',
                    '${req.body.YuklemeTarihi}',
                    '${req.body.KuryeAlis}',
                    '${req.body.KuryeSatis}',
                    '${req.body.GonderiTipi}',
                    '${req.body.BankaSecim}',
                    '${req.body.KategoriID}',
                    '${req.body.UrunBirimi}',
                    '${req.body.Miktar}',
                    '${req.body.TL_Alis}',
                    '${req.body.TL_Satis}',
                    '${req.body.Euro_Alis}',
                    '${req.body.Euro_Satis}',
                    '${req.body.DhlTarihi}'
                    )
    `;
    mssql.query(sql, (err, results) => {
        if (results.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        } else{
            res.status(200).json({'status':false});
        
        }
    });
    } else{
        getSampleCustomerId(req.body).then(customer_id=>{
            const sql = `
            insert into NumunelerTB(
                    NumuneNo,
                    NumuneTarihi,
                    NumuneTemsilci,
                    MusteriID,
                    Ulke,
                    Adres,
                    TrackingNo,
                    Parite,
                    Aciklama,
                    YuklemeTarihi,
                    KuryeAlis,
                    KuryeSatis,
                    GonderiTipi,
                    BankaSecim,
                    KategoriID,
                    UrunBirimi,
                    Miktar,
                    TL_Alis,
                    TL_Satis,
                    Euro_Alis,
                    Euro_Satis,
                    DhlTarihi
                    )
                    VALUES(
                    '${req.body.NumuneNo}',
                    '${req.body.NumuneTarihi}',
                    '${req.body.NumuneTemsilci}',
                    '${customer_id}',
                    '${req.body.Ulke}',
                    '${req.body.Adres}',
                    '${req.body.TrackingNo}',
                    '${req.body.Parite}',
                    '${req.body.Aciklama}',
                    '${req.body.YuklemeTarihi}',
                    '${req.body.KuryeAlis}',
                    '${req.body.KuryeSatis}',
                    '${req.body.GonderiTipi}',
                    '${req.body.BankaSecim}',
                    '${req.body.KategoriID}',
                    '${req.body.UrunBirimi}',
                    '${req.body.Miktar}',
                    '${req.body.TL_Alis}',
                    '${req.body.TL_Satis}',
                    '${req.body.Euro_Alis}',
                    '${req.body.Euro_Satis}',
                    '${req.body.DhlTarihi}'
                    )
    `;
    mssql.query(sql, (err, results) => {
        if (results.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        } else{
            res.status(200).json({'status':false});
        
        }
    });

         });
    };
    
    
});
app.delete('/sample/delete/:id/:po',(req,res)=>{
    const sql = `
                    delete NumunelerTB where ID='${req.params.id}'
                `;
    const bankSql = `
                      delete NumuneOdemelerTB where NumuneNo='${req.params.po}'
                    `;
    mssql.query(bankSql);
    mssql.query(sql,(err,results)=>{
        if (results.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        }else{
            res.status(200).json({ 'status': false });
        }
    })

});

function __getTlToUsdorEuro(date,value){
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    return new Promise(async ( resolve,reject)=>{
       await server
      .get("/finance/doviz/liste/" + year + "/" + month + "/" + day)
      .then( async (tl_to_usd) => {
         await server.get('/finance/doviz/liste/euro/to/tl/'+year + "/" + month + "/" + day)
        .then((tl_to_euro)=>{
          resolve({
            'usd':(parseFloat(value) / parseFloat(tl_to_usd.data)).toFixed(2),
            'euro':(parseFloat(value) / parseFloat(tl_to_euro.data)).toFixed(2)
          })
        });
      });
    });
  };
  function __getUsdToTlorEuro(date,value){
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    return new Promise(async ( resolve,reject)=>{
       await server
      .get("/finance/doviz/liste/" + year + "/" + month + "/" + day)
      .then(async (usd_to_tl) => {
         await server.get('/finance/doviz/liste/usd/to/euro/'+year + "/" + month + "/" + day)
        .then( async (usd_to_euro)=>{
          resolve({
            'tl':(parseFloat(value) * parseFloat(usd_to_tl.data)).toFixed(2),
            'euro':(parseFloat(value) * parseFloat(usd_to_euro.data)).toFixed(2)
          })
        });
      });
    });

  };
  function __getUsdToTlorUsd(date,value){
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    return new Promise(( resolve,reject)=>{
      server
      .get("/finance/doviz/liste/euro/to/tl/" + year + "/" + month + "/" + day)
      .then( (euro_to_tl) => {
        server.get('/finance/doviz/liste/usd/to/euro/'+year + "/" + month + "/" + day)
        .then((usd_to_euro)=>{
          resolve({
            'tl':(parseFloat(value) * parseFloat(euro_to_tl.data)).toFixed(2),
            'usd':(parseFloat(value) / parseFloat(usd_to_euro.data)).toFixed(2)
          })
        });
      });
    });

  };


app.put('/sample/update', async(req, res) => {
    if(req.body.DhlTarihi == null || req.body.DhlTarihi == '' || req.body.DhlTarihi == undefined || req.body.DhlTarihi == '1900-01-01' || req.body.DhlTarihi == '1900-01-01T00:00:00.000Z'){
        console.log('');
    }else{
        if(req.body.KuryeAlis == null || req.body.KuryeAlis == 0 || req.body.KuryeAlis == ' ' || req.body.KuryeAlis == undefined){
            console.log();
          }else{
            await __getUsdToTlorEuro(req.body.DhlTarihi,req.body.KuryeAlis)
            .then((res)=>{
                req.body.Euro_Alis = parseFloat(res.euro);
                req.body.TL_Alis = parseFloat(res.tl);
            });
          }
          if(req.body.Euro_Alis == null || req.body.Euro_Alis == 0 || req.body.Euro_Alis == ' ' || req.body.Euro_Alis == undefined){
            console.log();
          }else{
             await __getUsdToTlorUsd(req.body.DhlTarihi,req.body.Euro_Alis)
            .then(res=>{
                req.body.KuryeAlis = res.usd;
                req.body.TL_Alis = res.tl;
            });
          }
          if(req.body.TL_Alis == null || req.body.TL_Alis == 0 || req.body.TL_Alis == ' ' || req.body.TL_Alis == undefined){
            console.log();
          }else{
             await __getTlToUsdorEuro(req.body.DhlTarihi,req.body.TL_Alis)
            .then(res=>{
                req.body.KuryeAlis = res.usd;
                req.body.Euro_Alis = res.euro;
            });
          }
    
    
    
          if(req.body.KuryeSatis == null || req.body.KuryeSatis == 0 || req.body.KuryeSatis == ' ' || req.body.KuryeSatis == undefined){
            console.log();
          }else{
             await __getUsdToTlorEuro(req.body.DhlTarihi,req.body.KuryeSatis)
            .then((res)=>{
                req.body.Euro_Satis = parseFloat(res.euro);
                req.body.TL_Satis = parseFloat(res.tl);
            });
          }
          if(req.body.Euro_Satis == null || req.body.Euro_Satis == 0 || req.body.Euro_Satis == ' ' || req.body.Euro_Satis == undefined){
            console.log();
          }else{
             await __getUsdToTlorUsd(req.body.DhlTarihi,req.body.Euro_Satis)
            .then(res=>{
                req.body.KuryeSatis = res.usd;
                req.body.TL_Satis = res.tl;
            });
          }
          if(req.body.TL_Satis == null || req.body.TL_Satis == 0 || req.body.TL_Satis == ' ' || req.body.TL_Satis == undefined){
            console.log();
          }else{
             await __getTlToUsdorEuro(req.body.DhlTarihi,req.body.TL_Satis)
            .then(res=>{
                req.body.KuryeSatis = res.usd;
                req.body.Euro_Satis = res.euro;
            });
          }
    }







    if(req.body.MusteriID){
        const sql = `
                    
        update NumunelerTB SET
        NumuneTemsilci='${req.body.NumuneTemsilci}',
        MusteriID='${req.body.MusteriID}',
        Ulke='${req.body.Ulke}',
        Adres='${req.body.Adres}',
        TrackingNo='${req.body.TrackingNo}',
        Parite='${req.body.Parite}',
        Aciklama='${req.body.Aciklama}',
        YuklemeTarihi='${req.body.YuklemeTarihi}',
        KuryeAlis='${req.body.KuryeAlis}',
        KuryeSatis='${req.body.KuryeSatis}',
        GonderiTipi='${req.body.GonderiTipi}',
        BankaSecim='${req.body.BankaSecim}',
        KategoriID='${req.body.KategoriID}',
        UrunBirimi='${req.body.UrunBirimi}',
        Miktar='${req.body.Miktar}',
        TL_Alis='${req.body.TL_Alis}',
        TL_Satis='${req.body.TL_Satis}',
        Euro_Alis='${req.body.Euro_Alis}',
        Euro_Satis='${req.body.Euro_Satis}',
        NumuneTarihi='${req.body.NumuneTarihi}',
        DhlTarihi='${req.body.DhlTarihi}'
        where ID='${req.body.ID}'

        `;

        await mssql.query(sql, (err, results) => {
                if(results.rowsAffected[0] == 1){
                    res.status(200).json({ 'status': true});
                }else{
                    res.status(200).json({'status': false});
                };
        });
    } else{
        getSampleCustomerId(req.body).then((customer_id)=>{
            const sql = `
                    
            update NumunelerTB SET
            NumuneTemsilci='${req.body.NumuneTemsilci}',
            MusteriID='${customer_id}',
            Ulke='${req.body.Ulke}',
            Adres='${req.body.Adres}',
            TrackingNo='${req.body.TrackingNo}',
            Parite='${req.body.Parite}',
            Aciklama='${req.body.Aciklama}',
            YuklemeTarihi='${req.body.YuklemeTarihi}',
            KuryeAlis='${req.body.KuryeAlis}',
            KuryeSatis='${req.body.KuryeSatis}',
            GonderiTipi='${req.body.GonderiTipi}',
            BankaSecim='${req.body.BankaSecim}',
            KategoriID='${req.body.KategoriID}',
            UrunBirimi='${req.body.UrunBirimi}',
            Miktar='${req.body.Miktar}',
            TL_Alis='${req.body.TL_Alis}',
            TL_Satis='${req.body.TL_Satis}',
            Euro_Alis='${req.body.Euro_Alis}',
            Euro_Satis='${req.body.Euro_Satis}',
                    NumuneTarihi='${req.body.NumuneTarihi}'
            where ID='${req.body.ID}'
    
            `;
            mssql.query(sql, (err, results) => {
                if(results.rowsAffected[0] == 1){
                    res.status(200).json({ 'status': true});
                }else{
                    res.status(200).json({'status': false});
                }
                });
        
        });


    };
});
app.get('/sample/detail/paid/list/:po',(req,res)=>{
    const sql = `select nu.ID,nu.Tarih,nu.MusteriID,nu.NumuneNo,nu.Aciklama,nu.Tutar,nu.Banka from NumuneOdemelerTB nu where nu.NumuneNo='${req.params.po}'`;
    mssql.query(sql,(err,results)=>{
        res.status(200).json({ 'list': results.recordset });
    });
});
/*Sample Finance */
app.get('/sample/finance/list', (req, res) => {
    const yearSql = `
                select 

            YEAR(n.NumuneTarihi) as Yil

        from NumunelerTB n

        group by YEAR(n.NumuneTarihi)
        order by YEAR(n.NumuneTarihi) desc
    `;
    mssql.query(yearSql, (err, yearList) => {
        const year = yearList.recordset[0].Yil;
            const sql = `
            select 
                n.MusteriID,
                (select ytm.MusteriAdi from YeniTeklif_MusterilerTB ytm where ytm.Id = n.MusteriID) as MusteriAdi,
                sum(n.KuryeAlis) as AlisUsd,
                sum(n.KuryeSatis) as SatisUsd,
                sum(n.TL_Alis) as AlisTl,
                sum(n.TL_Satis) as SatisTl,
                sum(n.Euro_Alis) as AlisEuro,
                sum(n.Euro_Satis) as SatisEuro
            from NumunelerTB n
            where YEAR(n.YuklemeTarihi) = '${year}'
            group by n.MusteriID
            order by sum(n.KuryeSatis) desc
    `;
        mssql.query(sql, (err, financeList) => {
            const bankSql = `
                select 

                    sum(nuo.Tutar) as Tutar,
                    nuo.Banka

                from NumuneOdemelerTB nuo
                where YEAR(nuo.Tarih) = '${year}'
                group by nuo.Banka
                                order by sum(nuo.Tutar) desc

        
            `;
            mssql.query(bankSql, (err, bankList) => {
                res.status(200).json({ 'list': financeList.recordset,'years':yearList.recordset,'bank':bankList.recordset });
            
            });
    });
    });

});
app.get('/sample/finance/list/:year', (req, res) => {
    const yearSql = `
                select 

            YEAR(n.NumuneTarihi) as Yil

        from NumunelerTB n

        group by YEAR(n.NumuneTarihi)
        order by YEAR(n.NumuneTarihi) desc
    `;
    mssql.query(yearSql, (err, yearList) => {
    const sql = `
            select 
                n.MusteriID,
                (select ytm.MusteriAdi from YeniTeklif_MusterilerTB ytm where ytm.Id = n.MusteriID) as MusteriAdi,
                sum(n.KuryeAlis) as AlisUsd,
                sum(n.KuryeSatis) as SatisUsd,
                sum(n.TL_Alis) as AlisTl,
                sum(n.TL_Satis) as SatisTl,
                sum(n.Euro_Alis) as AlisEuro,
                sum(n.Euro_Satis) as SatisEuro
            from NumunelerTB n
            where YEAR(n.YuklemeTarihi) = '${req.params.year}'
            group by n.MusteriID
            order by sum(n.KuryeSatis) desc
    `;
    mssql.query(sql, (err, financeList) => {
           const bankSql = `
                select 

                    sum(nuo.Tutar) as Tutar,
                    nuo.Banka

                from NumuneOdemelerTB nuo
                where YEAR(nuo.Tarih) = '${req.params.year}'
                group by nuo.Banka
                order by sum(nuo.Tutar) desc
        
            `;
            mssql.query(bankSql, (err, bankList) => {
                res.status(200).json({ 'list': financeList.recordset,'years':yearList.recordset,'bank':bankList.recordset });
            
            });
        });
    });

});
app.get('/sample/finance/detail/list/:year/:customer', (req, res) => {
    const sql = `
        select 

	n.NumuneNo,
	n.NumuneTarihi,
	n.YuklemeTarihi,
	n.KuryeAlis,
	n.KuryeSatis,
	n.TL_Alis,
	n.TL_Satis,
	n.Euro_Alis,
	n.Euro_Satis,
    (select ngt.GonderiAdi from NumuneGonderiTipi ngt where ngt.ID = n.GonderiTipi) as GonderiAdi,
	(select nbs.BankaAdi from NumuneBankaSecim nbs where nbs.ID = n.BankaSecim) as BankaAdi

from NumunelerTB n

where YEAR(n.NumuneTarihi) = '${req.params.year}' and n.MusteriID= '${req.params.customer}'
    `;
    mssql.query(sql,(err,results)=>{
        res.status(200).json({ 'list': results.recordset }); 
    });
});

/*Offer */
app.get('/offer/main/list', (req, res) => {
    const offerByRepresentativeSql = `
    select
	(select k.KullaniciAdi from KullaniciTB k where k.ID = yt.KullaniciId) as TeklifSahibi,
	count(yt.Id) as TeklifSayisi,
	dbo.Offers_A_List_Total(yt.KullaniciId) as TeklifSayisiA,
	dbo.Offers_B_List_Total(yt.KullaniciId) as TeklifSayisiB,
	yt.KullaniciId
			
from YeniTeklifTB yt
where yt.TakipEt=1
group by yt.KullaniciId
order by count(yt.Id) desc
    `;
    mssql.query(offerByRepresentativeSql, (err, offerByRepresentative) => {
        const offerByCountrySql = `
select 
	ytm.UlkeId,
	count(ytm.UlkeId)  as TeklifSayisi,
	(select ytu.UlkeAdi from YeniTeklif_UlkeTB ytu where ytu.Id = ytm.UlkeId) as Ulke


from YeniTeklifTB yt
inner join YeniTeklif_MusterilerTB ytm on ytm.Id = yt.MusteriId
where yt.TakipEt=1 and ytm.UlkeId != 0 and YEAR(yt.Tarih) = YEAR(GETDATE())
group by ytm.UlkeId
order by count(ytm.UlkeId) desc




        `;
        mssql.query(offerByCountrySql, (err, offerByCountry) => {
            res.status(200).json({ 'list': offerByRepresentative.recordset,'country': offerByCountry.recordset});
            
        });
    });
});
app.get('/offer/main/detail/list/:representative', (req, res) => {
    const sql = `
       select 


	yt.Id,
	yt.Tarih,
	yt.HatirlatmaTarihi,
	yt.HatirlatmaSonTarih,
	yt.MusteriId,
	yt.Aciklama,
	yt.Cfr,
	yt.Fob,
	yt.Dtp,
	yt.Fca,
	yt.KullaniciId,
	yt.TakipEt,
	yt.KaynakYeri,
	yt.TeklifYeri,
	yt.HatirlatmaAciklama,
	yt.HatirlatmaId,
	yt.DosyaAdi,
	yt.Numune_Giris_Tarihi,
	yt.Numune_Hatirlatma_Tarihi,
	yt.Numune_Hatirlatma_SonTarih,
	yt.Numune_Tracking_No,
	yt.Numune_Odenen_Tutar,
	yt.Numune_Musteriden_Alinan,
	yt.Proforma_Po_No,
	yt.Proforma_Tarih,
	yt.Proforma_Tutar,
	yt.ProformaNot,
	yt.Teklif_Cloud,
	yt.Teklif_Cloud_Dosya,
	yt.Proforma_Cloud,
	yt.Proforma_Cloud_Dosya,
	yt.Numune_Cloud,
	yt.Numune_Cloud_Dosya,
	yt.NumuneNot,
	yt.TeklifOncelik,
	yt.Sira,
	yt.BList,
	yt.SonGorulme_Cloud,
	yt.SonGorulme_Cloud_Dosya,
	yt.HatirlatilmaDurumu,
	yt.Company,
	yt.Email,
	yt.Phone,
	k.KullaniciAdi,
    (select ytm.MusteriAdi from YeniTeklif_MusterilerTB ytm where ytm.Id = yt.MusteriId) as MusteriAdi,
	(select ytu.UlkeAdi from YeniTeklif_UlkeTB ytu where ytu.Id = (select ytm.UlkeId from YeniTeklif_MusterilerTB ytm where ytm.Id = yt.MusteriId)) as UlkeAdi
    

from YeniTeklifTB yt
inner join KullaniciTB k on k.ID = yt.KullaniciId

where yt.TakipEt = 1 and yt.KullaniciId=${req.params.representative} and yt.BList != 1
    `;
    mssql.query(sql, (err, results) => {
        results.recordset.forEach(x=>{
            x.cloudLink = `https://file-service.mekmar.com/file/download/teklif/teklifDosya/${x.Id}/${x.Teklif_Cloud_Dosya}`;
        });
        res.status(200).json({ 'list': results.recordset }); 
    });
});
app.get('/offer/detail/products/list/:id',(req,res)=>{
    const sql = `
select 

	ytuk.Id,
	ytuk.Tarih,
	ytuk.TeklifId,
	ytuk.KategoriId,
	ytuk.UrunId,
	ytuk.EnBoyId,
	ytuk.YuzeyIslemId,
	ytuk.KalinlikId,
	ytuk.FobFiyat,
	ytuk.TeklifFiyat,
	ytuk.Birim,
	ytuk.FcaFiyat,
	ytuk.CFiyat,
	ytuk.DFiyat,
	ytk.KategoriAdi,
	ytu.UrunAdi,
	yto.EnBoy,
	yty.IslemAdi,
	ytok.Kalinlik

from YeniTeklif_UrunKayitTB ytuk
inner join YeniTeklif_KategorilerTB ytk on ytk.Id = ytuk.KategoriId
inner join YeniTeklif_UrunlerTB ytu on ytu.Id = ytuk.UrunId
inner join YeniTeklif_Olcu_EnBoyTB yto on yto.id = ytuk.EnBoyId
inner join YeniTeklif_YuzeyIslemTB yty on yty.Id = ytuk.YuzeyIslemId
inner join YeniTeklif_Olcu_KalinlikTB ytok on ytok.id = ytuk.KalinlikId

where ytuk.TeklifId='${req.params.id}'
    `;
    mssql.query(sql,(err,results)=>{
        res.status(200).json({ 'list': results.recordset }); 
    });
});

function __offerCategoryId(payload){
    
    return new Promise((resolve,reject)=>{
        if(payload.KategoriId == null || payload.KategoriId == 0 || payload.KategoriId == undefined){
            const insertCategory = `insert into YeniTeklif_KategorilerTB(KategoriAdi) VALUES('${payload.KategoriAdi}')`;
            mssql.query(insertCategory,(err,category)=>{
                if(category.rowsAffected[0] == 1){
                    const sql = `select top 1 Id from YeniTeklif_KategorilerTB order by Id desc`;
                    mssql.query(sql,(err,categoryId)=>{
                        resolve(categoryId.recordset[0].Id);
                    });
                }
            });

        } else{
            resolve(payload.KategoriId);
        }
    });

};
function __offerProductId(payload){
    return new Promise((resolve,reject)=>{
        if(payload.UrunId == null || payload.UrunId == 0 || payload.UrunId ==undefined){
            const insertProduct = `insert into YeniTeklif_UrunlerTB(UrunAdi) VALUES('${payload.UrunAdi}')`;
            mssql.query(insertProduct,(err,product)=>{
                if(product.rowsAffected[0]==1){
                    const productIdSql = `select top 1 Id from YeniTeklif_UrunlerTB order by Id desc`;
                    mssql.query(productIdSql,(err,productId)=>{
                        resolve(productId.recordset[0].Id);
                    });
                }
            });
        }else{
            resolve(payload.UrunId);
        }

    });
};
function __offerSizeId(payload){
    return new Promise((resolve,reject)=>{
        if(payload.EnBoyId == null || payload.EnBoyId == 0 || payload.EnBoyId == undefined){
            const insertSizeSql = `insert into YeniTeklif_Olcu_EnBoyTB(EnBoy) VALUES('${payload.EnBoy}')`;
            mssql.query(insertSizeSql,(err,size)=>{
                if(size.rowsAffected[0]==1){
                    const sizeIdSql = `select top 1 id from YeniTeklif_Olcu_EnBoyTB order by id desc`;
                    mssql.query(sizeIdSql,(err,sizeId)=>{
                        resolve(sizeId.recordset[0].id)
                    });
                }
            });
        }else{
            resolve(payload.EnBoyId);
        }
    });
};
function __offerThicknessId(payload){
    return new Promise((resolve,reject)=>{
        if(payload.KalinlikId == null || payload.KalinlikId == 0 || payload.KalinlikId == undefined){
            const insertThicknessSql = `insert into YeniTeklif_Olcu_KalinlikTB(Kalinlik) VALUES('${payload.Kalinlik}')`;
            mssql.query(insertThicknessSql,(err,thickness)=>{
                if(thickness.rowsAffected[0]==1){
                    const thicknessIdSql = `select top 1 id from YeniTeklif_Olcu_KalinlikTB order by id desc`;
                    mssql.query(thicknessIdSql,(err,thicknessId)=>{
                        resolve(thicknessId.recordset[0].id)
                    });
                }   
            });
        }else{
            resolve(payload.KalinlikId);
        }
    });
};
function __offerSurfaceId(payload){
    return new Promise((resolve,reject)=>{
        if(payload.YuzeyIslemId == null || payload.YuzeyIslemId == 0 || payload.YuzeyIslemId == undefined){
            const insertSurfaceSql = `insert into YeniTeklif_YuzeyIslemTB(IslemAdi) VALUES('${payload.IslemAdi}')`;
            mssql.query(insertSurfaceSql,(err,surface)=>{
                if(surface.rowsAffected[0] == 1){
                    const surfaceIdSql = `select top 1 Id from YeniTeklif_YuzeyIslemTB order by Id desc`;
                    mssql.query(surfaceIdSql,(err,surfaceId)=>{
                        resolve(surfaceId.recordset[0].Id)
                    });
                }
            });
        }else{
            resolve(payload.YuzeyIslemId);
        }
    });
}

app.post('/offer/product/add', (req, res) => {
    __offerCategoryId(req.body)
    .then(categoryId=>{
        __offerProductId(req.body)
        .then(productId=>{
        __offerSizeId(req.body)
        .then(sizeId=>{

            __offerThicknessId(req.body)
            .then(thicknessId=>{
                __offerSurfaceId(req.body)
                .then(surfaceId=>{
                    const addSql = `
                    insert into YeniTeklif_UrunKayitTB(
                        Tarih,
                        TeklifId,
                        KategoriId,
                        UrunId,
                        EnBoyId,
                        YuzeyIslemId,
                        KalinlikId,
                        FobFiyat,
                        Birim,
                        FcaFiyat,
                        CFiyat,
                        DFiyat
                    )
                    VALUES(
                        '${req.body.Tarih}',
                        '${req.body.TeklifId}',
                        '${categoryId}',
                        '${productId}',
                        '${sizeId}',
                        '${surfaceId}',
                        '${thicknessId}',
                        '${req.body.FobFiyat}',
                        '${req.body.Birim}',
                        '${req.body.FcaFiyat}',
                        '${req.body.CFiyat}',
                        '${req.body.DFiyat}'
            
                    )
                    `;
                    const productIdSql = `select top 1 Id from YeniTeklif_UrunKayitTB order by Id desc`;
                    mssql.query(addSql, (err, add) => {
                        if (add.rowsAffected[0] == 1) {
                            mssql.query(productIdSql, (err, id) => {
                                res.status(200).json({ 'id': id.recordset[0].Id ,'status':true}); 
                            });
                        } else {
                            res.status(200).json({ 'id': 0, 'status': false });
                        }
                    });
                });
 
            });
            
        });

        });

    });

});
app.put('/offer/product/update', (req, res) => {
    const sql = `
        update YeniTeklif_UrunKayitTB 
SET
	Tarih='${req.body.Tarih}',
	KategoriId='${req.body.KategoriId}',
	UrunId='${req.body.UrunId}',
	EnBoyId='${req.body.EnBoyId}',
	YuzeyIslemId='${req.body.YuzeyIslemId}',
	KalinlikId='${req.body.KalinlikId}',
	FobFiyat='${req.body.FobFiyat}',
	Birim='${req.body.Birim}',
	FcaFiyat='${req.body.FcaFiyat}',
	CFiyat='${req.body.CFiyat}',
	DFiyat='${req.body.DFiyat}'


WHERE 
	Id = '${req.body.Id}'
    `;
    mssql.query(sql, (err, results) => {
        if (results.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        } else{
            res.status(200).json({ 'status': false });
        
        }
    })
});
app.delete('/offer/product/delete/:id', (req, res) => {
    const sql = `delete YeniTeklif_UrunKayitTB where Id='${req.params.id}'`;
    mssql.query(sql,(err,results)=>{
        if (results.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        }else{
            res.status(200).json({'status':false});
        }
    });
});
function __stringCharacterChange(event) {
    if(event == null || event == undefined){
        return '';
    }else{
        const data = event.split("'");
        let value = "";
        if(data.length >0){
            data.forEach((x) => {
                value += x + "''";
              });
              const value2 = value.substring(0, value.length - 2);
              return value2;
        }else{

            return event
        }

    }

  }
app.post('/offer/save',(req,res)=>{
    if(req.body.customer.Id == 0 || req.body.customer.Id == null){
        const insertCustomerSql = `
            
                insert into YeniTeklif_MusterilerTB
                (
                    MusteriAdi,
                    UlkeId,
                    Company,
                    Mail,
                    Phone,
                    Kullanici,
                    Adress,
                    Description

                )
                VALUES(
                '${__stringCharacterChange(req.body.customer.MusteriAdi)}',
                '${req.body.customer.UlkeId}',
                '${__stringCharacterChange(req.body.customer.Company)}',
                '${__stringCharacterChange(req.body.customer.Mail)}',
                '${__stringCharacterChange(req.body.customer.Phone)}',
                '${req.body.customer.Kullanici}',
                '${__stringCharacterChange(req.body.customer.Adress)}',
                '${__stringCharacterChange(req.body.customer.Description)}'

                )
        `;
        mssql.query(insertCustomerSql, (err, customer) => {
            if (customer.rowsAffected[0] == 1) {
                const idCustomerSql = `select top 1 Id from YeniTeklif_MusterilerTB order by Id desc`;
                mssql.query(idCustomerSql, (err, id) => {
                    const custId = id.recordset[0].Id;
                    const queueSql = `
                        select top 1 Sira + 1 as Sira from YeniTeklifTB order by Sira desc
                    `;
                    mssql.query(queueSql, (err, queue) => {
                        const queueId = queue.recordset[0].Sira;
                                            const offerSql = `
                        insert into YeniTeklifTB
                                    (
                                        Tarih,
                                        MusteriId,
                                        Aciklama,
                                        KullaniciId,
                                        TakipEt,
                                        KaynakYeri,
                                        TeklifYeri,
                                        TeklifOncelik,
                                        Sira,
                                        BList
                                    )
                                    VALUES(
                                    '${req.body.offer.Tarih}',
                                    '${custId}',
                                    '${__stringCharacterChange(req.body.offer.Aciklama)}',
                                    '${req.body.offer.KullaniciId}',
                                    '${req.body.offer.TakipEt}',
                                    '${req.body.offer.KaynakYeri}',
                                    '${req.body.offer.TeklifYeri}',
                                    '${req.body.offer.TeklifOncelik}',
                                    '${queueId}',
                                    '${req.body.offer.BList}'
                                    )
                    `;
                    const offerIdSql = `
                        select top 1 Id from YeniTeklifTB order by Id desc
                    `;
                    mssql.query(offerSql, (err, offer) => {
                        if (offer.rowsAffected[0] == 1) {
                            mssql.query(offerIdSql, (err, offId) => {
                                res.status(200).json({ 'status': true,'id':offId.recordset[0].Id });
                            });
                        } else{
                            res.status(200).json({'status':false});
                            
                        }
                    });
                    });

                });
            }
        });
    } else{
        const updateCustomerSql = `
            update YeniTeklif_MusterilerTB
            SET 
            MusteriAdi='${__stringCharacterChange(req.body.customer.MusteriAdi)}',
            UlkeId='${req.body.customer.UlkeId}',
            Company='${__stringCharacterChange(req.body.customer.Company)}',
            Mail='${__stringCharacterChange(req.body.customer.Mail)}',
            Phone='${__stringCharacterChange(req.body.customer.Phone)}',
            Adress='${__stringCharacterChange(req.body.customer.Adress)}',
            Description='${__stringCharacterChange(req.body.customer.Description)}'
            WHERE Id = '${req.body.customer.Id}'
        `;
        mssql.query(updateCustomerSql);
        const queueSql = `
            select top 1 Sira + 1 as Sira from YeniTeklifTB order by Sira desc
        `;
        mssql.query(queueSql, (err, queue) => {
           const queueId = queue.recordset[0].Sira;
            const insertOfferSql = `
                 insert into YeniTeklifTB
                                    (
                                        Tarih,
                                        MusteriId,
                                        Aciklama,
                                        KullaniciId,
                                        TakipEt,
                                        KaynakYeri,
                                        TeklifYeri,
                                        TeklifOncelik,
                                        Sira,
                                        BList
                                    )
                                    VALUES(
                                    '${req.body.offer.Tarih}',
                                    '${req.body.offer.MusteriId}',
                                    '${__stringCharacterChange(req.body.offer.Aciklama)}',
                                    '${req.body.offer.KullaniciId}',
                                    '${req.body.offer.TakipEt}',
                                    '${req.body.offer.KaynakYeri}',
                                    '${req.body.offer.TeklifYeri}',
                                    '${req.body.offer.TeklifOncelik}',
                                    '${queueId}',
                                    '${req.body.offer.BList}'
                                    )
            `;
            mssql.query(insertOfferSql,(err,offer)=>{
                if (offer.rowsAffected[0] == 1) {
                    const offerId = `
                        select top 1 Id from YeniTeklifTB order by Id desc
                    `;
                    mssql.query(offerId, (err, id) => {
                        if (id.rowsAffected[0] == 1) {
                            res.status(200).json({ 'status': true, 'id': id.recordset[0].Id });
                        } else{
                            res.status(200).json({ 'status': false, 'id': 0 });
                        }
                    });
                };
            });

        });

    }
});



app.put('/offer/update',(req,res)=>{
    const updateOfferSql = `
            update YeniTeklifTB
            SET
                
                    Tarih='${req.body.offer.Tarih}',
                    Aciklama='${__stringCharacterChange(req.body.offer.Aciklama)}',
                    TakipEt='${req.body.offer.TakipEt}',
                    KaynakYeri='${req.body.offer.KaynakYeri}',
                    TeklifYeri='${req.body.offer.TeklifYeri}',
                    TeklifOncelik='${req.body.offer.TeklifOncelik}',
                    BList='${req.body.offer.BList}'
                
            WHERE
                Id='${req.body.offer.Id}'
        `;
    const updateCustomerSql = `
        update YeniTeklif_MusterilerTB
            SET 
            MusteriAdi='${req.body.customer.MusteriAdi}',
            UlkeId='${req.body.customer.UlkeId}',
            Company='${__stringCharacterChange(req.body.customer.Company)}',
            Mail='${__stringCharacterChange(req.body.customer.Mail)}',
            Phone='${__stringCharacterChange(req.body.customer.Phone)}',
            Adress='${__stringCharacterChange(req.body.customer.Adress)}',
            Description='${__stringCharacterChange(req.body.customer.Description)}'
            WHERE Id = '${req.body.customer.Id}'
    `;
    mssql.query(updateCustomerSql);
    mssql.query(updateOfferSql,(err,results)=>{
        if (results.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true});
        } else {
            res.status(200).json({ 'status': false });
        }
    });
});
app.delete('/offer/delete/:id', (req, res) => {
    const deleteOfferSql = `delete YeniTeklifTB where Id='${req.params.id}'`;
    const deleteOfferProductsSql = `delete YeniTeklif_UrunKayitTB where TeklifId='${req.params.id}'`;
    mssql.query(deleteOfferProductsSql);
    mssql.query(deleteOfferSql,(err,deleted)=>{
        if (deleted.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        } else {
            res.status(200).json({ 'status': false });
        }
    });
});
app.get('/offer/detail/all/list', (req, res) => {
    const sql = `
    select 


	yt.Id,
	yt.Tarih,
	yt.HatirlatmaTarihi,
	yt.HatirlatmaSonTarih,
	yt.MusteriId,
	yt.Aciklama,
	yt.Cfr,
	yt.Fob,
	yt.Dtp,
	yt.Fca,
	yt.KullaniciId,
	yt.TakipEt,
	yt.KaynakYeri,
	yt.TeklifYeri,
	yt.HatirlatmaAciklama,
	yt.HatirlatmaId,
	yt.DosyaAdi,
	yt.Numune_Giris_Tarihi,
	yt.Numune_Hatirlatma_Tarihi,
	yt.Numune_Hatirlatma_SonTarih,
	yt.Numune_Tracking_No,
	yt.Numune_Odenen_Tutar,
	yt.Numune_Musteriden_Alinan,
	yt.Proforma_Po_No,
	yt.Proforma_Tarih,
	yt.Proforma_Tutar,
	yt.ProformaNot,
	yt.Teklif_Cloud,
	yt.Teklif_Cloud_Dosya,
	yt.Proforma_Cloud,
	yt.Proforma_Cloud_Dosya,
	yt.Numune_Cloud,
	yt.Numune_Cloud_Dosya,
	yt.NumuneNot,
	yt.TeklifOncelik,
	yt.Sira,
	yt.BList,
	yt.SonGorulme_Cloud,
	yt.SonGorulme_Cloud_Dosya,
	yt.HatirlatilmaDurumu,
	yt.Company,
	yt.Email,
	yt.Phone,
    (select ytm.MusteriAdi from YeniTeklif_MusterilerTB ytm where ytm.Id = yt.MusteriId) as MusteriAdi,
	(select ytu.UlkeAdi from YeniTeklif_UlkeTB ytu where ytu.Id = (select ytm.UlkeId from YeniTeklif_MusterilerTB ytm where ytm.Id = yt.MusteriId)) as UlkeAdi,
	(select k.KullaniciAdi from KullaniciTB k where k.ID = yt.KullaniciId) as KullaniciAdi



from YeniTeklifTB yt
inner join KullaniciTB k on k.ID = yt.KullaniciId
 
where yt.TakipEt = 1 and yt.BList != 1
order by yt.TeklifOncelik,yt.Sira
    `;
    const bListSql =  `
    select 


	yt.Id,
	yt.Tarih,
	yt.HatirlatmaTarihi,
	yt.HatirlatmaSonTarih,
	yt.MusteriId,
	yt.Aciklama,
	yt.Cfr,
	yt.Fob,
	yt.Dtp,
	yt.Fca,
	yt.KullaniciId,
	yt.TakipEt,
	yt.KaynakYeri,
	yt.TeklifYeri,
	yt.HatirlatmaAciklama,
	yt.HatirlatmaId,
	yt.DosyaAdi,
	yt.Numune_Giris_Tarihi,
	yt.Numune_Hatirlatma_Tarihi,
	yt.Numune_Hatirlatma_SonTarih,
	yt.Numune_Tracking_No,
	yt.Numune_Odenen_Tutar,
	yt.Numune_Musteriden_Alinan,
	yt.Proforma_Po_No,
	yt.Proforma_Tarih,
	yt.Proforma_Tutar,
	yt.ProformaNot,
	yt.Teklif_Cloud,
	yt.Teklif_Cloud_Dosya,
	yt.Proforma_Cloud,
	yt.Proforma_Cloud_Dosya,
	yt.Numune_Cloud,
	yt.Numune_Cloud_Dosya,
	yt.NumuneNot,
	yt.TeklifOncelik,
	yt.Sira,
	yt.BList,
	yt.SonGorulme_Cloud,
	yt.SonGorulme_Cloud_Dosya,
	yt.HatirlatilmaDurumu,
	yt.Company,
	yt.Email,
	yt.Phone,

    (select ytm.MusteriAdi from YeniTeklif_MusterilerTB ytm where ytm.Id = yt.MusteriId) as MusteriAdi,
	(select ytu.UlkeAdi from YeniTeklif_UlkeTB ytu where ytu.Id = (select ytm.UlkeId from YeniTeklif_MusterilerTB ytm where ytm.Id = yt.MusteriId)) as UlkeAdi,
	(select k.KullaniciAdi from KullaniciTB k where k.ID = yt.KullaniciId) as KullaniciAdi



from YeniTeklifTB yt
inner join KullaniciTB k on k.ID = yt.KullaniciId
 
where yt.TakipEt = 1 and yt.BList = 1
order by yt.TeklifOncelik,yt.Sira
    `;


    mssql.query(sql,(err,results)=>{
        mssql.query(bListSql,(err,bList)=>{
            results.recordset.forEach(x=>{
                x.cloudLink = `https://file-service.mekmar.com/file/download/teklif/teklifDosya/${x.Id}/${x.Teklif_Cloud_Dosya}`;
            });

            const list = [];
            const _h_a = results.recordset.filter(x=>(x.KullaniciId == 44 && (x.TeklifOncelik == 'A' || x.TeklifOncelik == 'B' ||  x.TeklifOncelik == 'C' || x.TeklifOncelik == 'Toplantı')));
            // const _h_t = results.recordset.filter(x=>(x.KullaniciId == 44 && x.TeklifOncelik == 'Toplantı'));
            const _o_a = results.recordset.filter(x=>(x.KullaniciId == 19 && (x.TeklifOncelik == 'A' || x.TeklifOncelik == 'B' || x.TeklifOncelik == 'C' || x.TeklifOncelik == 'Toplantı')));
            // const _o_t = results.recordset.filter(x=>(x.KullaniciId == 19 && x.TeklifOncelik == 'Toplantı'));

            const a_list = results.recordset.filter(x=>(x.TeklifOncelik == 'A' || x.TeklifOncelik == 'B' || x.TeklifOncelik == 'C' || x.TeklifOncelik == 'Toplantı'));

            // const t_list = results.recordset.filter(x=>(x.TeklifOncelik == 'Toplantı'));


            if(a_list.length > 0){
                let i = 0;
                while (a_list.length  > i){
                    if(_h_a.length >= (i+1)){
                        list.push(_h_a[i]);
                    }
                    if(_o_a.length >= (i+1)){
                        list.push(_o_a[i]);
                    }
                    i+=1;
                }
            }

            // if(t_list.length > 0){
            //     let i = 0;
            //     while (t_list.length  > i){
            //         if(_h_t.length >= (i+1)){
            //             list.push(_h_t[i]);
            //         }
            //         if(_o_t.length >= (i+1)){
            //             list.push(_o_t[i]);
            //         }
            //         i+=1;
            //     }
            // }


            res.status(200).json({ 'list': list,'bList':bList.recordset });

        });
    })
});
app.get('/offer/old/list', (req, res) => {
    const sql = `
    select 
	yt.*,
	(select ytm.MusteriAdi from YeniTeklif_MusterilerTB ytm where ytm.Id = yt.MusteriId) as Customer,
	(select (select ytu.UlkeAdi from YeniTeklif_UlkeTB ytu where ytu.Id = ytm.UlkeId) from YeniTeklif_MusterilerTB ytm where ytm.Id = yt.MusteriId) as Country,
	(select k.KullaniciAdi from KullaniciTB k where k.ID = yt.KullaniciId) as Username,
	yurun.FobFiyat as FobPrice,
	yurun.FcaFiyat as FcaPrice,
	yurun.DFiyat as DtpPrice,
	yurun.CFiyat as CfrPrice,
	(select ytk.KategoriAdi from YeniTeklif_KategorilerTB ytk where ytk.Id = yurun.KategoriId) as Category,
	(select ytu.UrunAdi from YeniTeklif_UrunlerTB ytu where ytu.Id = yurun.UrunId) as Product,
	(select yty.IslemAdi from YeniTeklif_YuzeyIslemTB yty where yty.Id = yurun.YuzeyIslemId) as Surface,
	(select yto.EnBoy from YeniTeklif_Olcu_EnBoyTB yto where yto.id = yurun.EnBoyId) as Size,
	(select ytedge.Kalinlik from YeniTeklif_Olcu_KalinlikTB ytedge where ytedge.id = yurun.KalinlikId) as Edge,
	yurun.Birim






from YeniTeklif_UrunKayitTB yurun
inner join YeniTeklifTB yt on yt.Id = yurun.TeklifId
where yt.TakipEt = 0
order by Tarih desc



    `;
    mssql.query(sql,(err,results)=>{
        results.recordset.forEach(x=>{
            x.cloudLink = `https://file-service.mekmar.com/file/download/teklif/teklifDosya/${x.Id}/${x.Teklif_Cloud_Dosya}`;
            if(parseInt(x.FobPrice) >0){
                x.Price = x.FobPrice
            }
            if(parseInt(x.FcaPrice)>0){
                x.Price = x.FcaPrice;
            }
            if(parseInt(x.DtpPrice)>0){
                x.Price = x.DtpPrice;
            } 
            if(parseInt(x.CfrPrice)>0){
                x.Price = x.CfrPrice;
            }
        });
        res.status(200).json({ 'list': results.recordset });
    });
});
app.get('/offer/main/detail/b/list/:representative',(req,res)=>{
    const bListSql = `
               select 


	yt.Id,
	yt.Tarih,
	yt.HatirlatmaTarihi,
	yt.HatirlatmaSonTarih,
	yt.MusteriId,
	yt.Aciklama,
	yt.Cfr,
	yt.Fob,
	yt.Dtp,
	yt.Fca,
	yt.KullaniciId,
	yt.TakipEt,
	yt.KaynakYeri,
	yt.TeklifYeri,
	yt.HatirlatmaAciklama,
	yt.HatirlatmaId,
	yt.DosyaAdi,
	yt.Numune_Giris_Tarihi,
	yt.Numune_Hatirlatma_Tarihi,
	yt.Numune_Hatirlatma_SonTarih,
	yt.Numune_Tracking_No,
	yt.Numune_Odenen_Tutar,
	yt.Numune_Musteriden_Alinan,
	yt.Proforma_Po_No,
	yt.Proforma_Tarih,
	yt.Proforma_Tutar,
	yt.ProformaNot,
	yt.Teklif_Cloud,
	yt.Teklif_Cloud_Dosya,
	yt.Proforma_Cloud,
	yt.Proforma_Cloud_Dosya,
	yt.Numune_Cloud,
	yt.Numune_Cloud_Dosya,
	yt.NumuneNot,
	yt.TeklifOncelik,
	yt.Sira,
	yt.BList,
	yt.SonGorulme_Cloud,
	yt.SonGorulme_Cloud_Dosya,
	yt.HatirlatilmaDurumu,
	yt.Company,
	yt.Email,
	yt.Phone,
	ytm.MusteriAdi,
	k.KullaniciAdi,
    ytu.UlkeAdi

from YeniTeklifTB yt
inner join YeniTeklif_MusterilerTB ytm on ytm.Id = yt.MusteriId
inner join KullaniciTB k on k.ID = yt.KullaniciId
inner join YeniTeklif_UlkeTB ytu on ytu.Id = ytm.UlkeId

where yt.TakipEt = 1 and yt.KullaniciId='${req.params.representative}' and yt.BList = 1
    `;
    mssql.query(bListSql, (err, bList) => {
        res.status(200).json({ 'list': bList.recordset }); 
    });
});
app.put('/offer/reminder/file/upload',(req,res)=>{
    const sql = `update YeniTeklifTB set Teklif_Cloud='${req.body.cloud}',Teklif_Cloud_Dosya='${req.body.name}',HatirlatmaTarihi='${req.body.date}' where Id='${req.body.id}'`;
    mssql.query(sql,(err,reminder)=>{
        if(reminder.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});
        }
    });
});
app.put('/offer/proforma/file/upload',(req,res)=>{
    const sql = `
    update YeniTeklifTB set Proforma_Po_No='${req.body.po}',Proforma_Tarih='${req.body.date}',Proforma_Tutar='${req.body.amount}',
    Proforma_Cloud='${req.body.cloud}',Proforma_Cloud_Dosya='${req.body.name}',ProformaNot='${req.body.description}' where Id='${req.body.id}'
    `;
    mssql.query(sql,(err,proforma)=>{
        if(proforma.rowsAffected[0]==1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});
            
        }
    });
});
app.put('/offer/sample/file/upload',(req,res)=>{
    const sql = `
    update YeniTeklifTB set Numune_Giris_Tarihi='${req.body.entrydate}',Numune_Hatirlatma_Tarihi='${req.body.reminderdate}',Numune_Hatirlatma_SonTarih='${req.body.lastreminderdate}',
    Numune_Tracking_No='${req.body.followno}',Numune_Odenen_Tutar='${req.body.paid}',Numune_Musteriden_Alinan='${req.body.received}',Numune_Cloud='${req.body.cloud}',
    Numune_Cloud_Dosya='${req.body.name}',NumuneNot='${req.body.description}' where Id='${req.body.id}'
    `;
    try{
        mssql.query(sql,(err,sample)=>{
            if(sample.rowsAffected[0] == 1){
                res.status(200).json({'status':true})    
            }else{
                res.status(200).json({'status':false});
            }
            
        });
    } catch (err){
        console.log(err)
    }
   

});
app.post('/offer/add/size',(req,res)=>{
    const sql = `
    insert into YeniTeklif_Olcu_EnBoyTB(EnBoy)
    VALUES('${req.body.size}')
    `;
    mssql.query(sql,(err,size)=>{
        if(size.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});
        };
    });
});


/*Panel*/
app.get('/panel/published/list', (req, res) => {
        const categorySql = `
        select 

            mck.Id,
            mck.kategoriadi_en,
            mck.kategoriadi_fr,
            mck.kategoriadi_es,
            mck.kategoriadi_ru


        from MekmarCom_Kategoriler mck where mck.Id not in (20,21,22)
    `;

    mssql.query(categorySql, (err, category) => {
        const categoryId = category.recordset[0].Id;
        const publishedSql = `
            select 
	mp.Id,
	mp.urunid,
	mp.kategori_id,
	mp.urunadi_en,
	mp.aciklama_en,
	mp.anahtarlar_en,
	mp.urunadi_fr,
	mp.aciklama_fr,
	mp.anahtarlar_fr,
	mp.urunadi_es,
	mp.aciklama_es,
	mp.anahtarlar_es,
	mp.yayinla,
	mp.birim,
	mp.urunkod,
	mp.testrapor,
	mp.sira,
	mp.stonetype,
	mp.keywords_en,
	mp.keywords_fr,
	mp.keywords_es,
	mp.urunadi_ru,
	mp.aciklama_ru,
	mp.anahtarlar_ru,
	mp.keywords_ru,
    mp.urunadi_ar,
	mp.aciklama_ar,
	mp.anahtarlar_ar,
	mp.keywords_ar,
    (select top 1 mf.imagePath from MekmarCom_Fotolar mf where mf.urunid = mp.urunid order by mf.sira) as Image

from MekmarCom_Products mp
where mp.kategori_id = ${categoryId} and mp.yayinla = 1
order by urunid desc
        `;

        mssql.query(publishedSql, (err, published) => {
            res.status(200).json({
                'list': published.recordset,
                'category':category.recordset
            }); 
        });
        

    });

});
app.get('/panel/not/published/list', (req, res) => {
        const categorySql = `
        select 

            mck.Id,
            mck.kategoriadi_en,
            mck.kategoriadi_fr,
            mck.kategoriadi_es,
            mck.kategoriadi_ru


        from MekmarCom_Kategoriler mck where mck.Id not in (20,21,22)
    `;

    mssql.query(categorySql, (err, category) => {
        const categoryId = category.recordset[0].Id;
        const publishedSql = `
            select 
	mp.Id,
	mp.urunid,
	mp.kategori_id,
	mp.urunadi_en,
	mp.aciklama_en,
	mp.anahtarlar_en,
	mp.urunadi_fr,
	mp.aciklama_fr,
	mp.anahtarlar_fr,
	mp.urunadi_es,
	mp.aciklama_es,
	mp.anahtarlar_es,
	mp.yayinla,
	mp.birim,
	mp.urunkod,
	mp.testrapor,
	mp.sira,
	mp.stonetype,
	mp.keywords_en,
	mp.keywords_fr,
	mp.keywords_es,
	mp.urunadi_ru,
	mp.aciklama_ru,
	mp.anahtarlar_ru,
	mp.keywords_ru,
    mp.urunadi_ar,
	mp.aciklama_ar,
	mp.anahtarlar_ar,
	mp.keywords_ar
from MekmarCom_Products mp
where mp.kategori_id = ${categoryId} and mp.yayinla = 0
order by urunid desc
        `;
        mssql.query(publishedSql, (err, published) => {
            res.status(200).json({
                'list': published.recordset,
                'category':category.recordset
            }); 
        });
        

    });

});
app.get('/panel/published/list/:id', (req, res) => {

        const publishedSql = `
            select 
	mp.Id,
	mp.urunid,
	mp.kategori_id,
	mp.urunadi_en,
	mp.aciklama_en,
	mp.anahtarlar_en,
	mp.urunadi_fr,
	mp.aciklama_fr,
	mp.anahtarlar_fr,
	mp.urunadi_es,
	mp.aciklama_es,
	mp.anahtarlar_es,
	mp.yayinla,
	mp.birim,
	mp.urunkod,
	mp.testrapor,
	mp.sira,
	mp.stonetype,
	mp.keywords_en,
	mp.keywords_fr,
	mp.keywords_es,
	mp.urunadi_ru,
	mp.aciklama_ru,
	mp.anahtarlar_ru,
	mp.keywords_ru,
    mp.urunadi_ar,
	mp.aciklama_ar,
	mp.anahtarlar_ar,
	mp.keywords_ar,
    (select top 1 mf.imagePath from MekmarCom_Fotolar mf where mf.urunid = mp.urunid order by mf.sira) as Image

from MekmarCom_Products mp
where mp.kategori_id = ${req.params.id} and mp.yayinla = 1
order by urunid desc
        `;
        mssql.query(publishedSql, (err, published) => {
            res.status(200).json({
                'list': published.recordset,
            }); 
        });
        


});
app.get('/panel/not/published/list/:id', (req, res) => {

        const publishedSql = `
            select 
	mp.Id,
	mp.urunid,
	mp.kategori_id,
	mp.urunadi_en,
	mp.aciklama_en,
	mp.anahtarlar_en,
	mp.urunadi_fr,
	mp.aciklama_fr,
	mp.anahtarlar_fr,
	mp.urunadi_es,
	mp.aciklama_es,
	mp.anahtarlar_es,
	mp.yayinla,
	mp.birim,
	mp.urunkod,
	mp.testrapor,
	mp.sira,
	mp.stonetype,
	mp.keywords_en,
	mp.keywords_fr,
	mp.keywords_es,
	mp.urunadi_ru,
	mp.aciklama_ru,
	mp.anahtarlar_ru,
	mp.keywords_ru,
    mp.urunadi_ar,
	mp.aciklama_ar,
	mp.anahtarlar_ar,
	mp.keywords_ar
from MekmarCom_Products mp
where mp.kategori_id = ${req.params.id} and mp.yayinla = 0
order by urunid desc
        `;

        const test = "lorem ${}"


        mssql.query(publishedSql, (err, published) => {
            res.status(200).json({
                'list': published.recordset,
            }); 
        });
        


});
app.post('/panel/product/save', (req, res) => {
    const productIdSql = `
        select top 1 urunid + 1 as id from MekmarCom_Products order by urunid desc
    `;
    const queueSql = `select top 1 sira + 1 as sira from MekmarCom_Products order by sira desc`;
    const idSql = `select top 1 Id  from MekmarCom_Products order by Id desc`;
    mssql.query(productIdSql, (err, productId) => {
        const id = productId.recordset[0].id;
        mssql.query(queueSql, (err, queue) => {
            const queueId = queue.recordset[0].sira;
                const insertProductSql = `
        

                    insert into MekmarCom_Products(
                        urunid,
                        kategori_id,
                        urunadi_en,
                        aciklama_en,
                        anahtarlar_en,
                        urunadi_fr,
                        aciklama_fr,
                        anahtarlar_fr,
                        urunadi_es,
                        aciklama_es,
                        anahtarlar_es,
                        yayinla,
                        birim,
                        urunkod,
                        sira,
                        stonetype,
                        keywords_en,
                        keywords_fr,
                        keywords_es,
                        keywords_ru,
                        urunadi_ru,
                        aciklama_ru,
                        anahtarlar_ru,
                        urunadi_ar,
                        aciklama_ar,
                        anahtarlar_ar,
                        keywords_ar
                        
                    )
                    VALUES(
                    '${id}',
                    '${req.body.kategori_id}',
                    '${req.body.urunadi_en}',
                    '${req.body.aciklama_en2}',
                    '${req.body.anahtarlar_en2}',
                    '${req.body.urunadi_fr2}',
                    '${req.body.aciklama_fr2}',
                    '${req.body.anahtarlar_fr2}',
                    '${req.body.urunadi_es}',
                    '${req.body.aciklama_es2}',
                    '${req.body.anahtarlar_es2}',
                    '${req.body.yayinla}',
                    '${req.body.birim}',
                    '${req.body.urunkod}',
                    '${queueId}',
                    '${req.body.stonetype}',
                    '${req.body.keywords_en2}',
                    '${req.body.keywords_fr2}',
                    '${req.body.keywords_es2}',
                    N'${req.body.keywords_ru}',
                    N'${req.body.urunadi_ru}',
                    N'${req.body.aciklama_ru}',
                    N'${req.body.anahtarlar_ru}',
                    N'${req.body.urunadi_ar}',
                    N'${req.body.aciklama_ar}',
                    N'${req.body.anahtarlar_ar}',
                    N'${req.body.keywords_ar}'
                    )

                `;

            mssql.query(insertProductSql, (err, product) => {
                if(product.rowsAffected[0] == 1){
                    mssql.query(idSql, (err, servId) => {
                        if(servId.rowsAffected[0] == 1){
                            res.status(200).json({ 'status': true ,'productId':id,'id':servId.recordset[0].Id,'queue':queueId});
                        } else{
                            res.status(200).json({'status':false,'productId':0,'id':0});
                        };
                    });
                }

                    
                });


        })
    });
});
app.put('/panel/product/update', (req, res) => {
    const updateProductSql = `
            update MekmarCom_Products
            SET
                kategori_id='${req.body.kategori_id}',
                urunadi_en='${req.body.urunadi_en}',
                aciklama_en='${req.body.aciklama_en2}',
                anahtarlar_en='${req.body.anahtarlar_en2}',
                urunadi_fr='${req.body.urunadi_fr2}',
                aciklama_fr='${req.body.aciklama_fr2}',
                anahtarlar_fr='${req.body.anahtarlar_fr2}',
                urunadi_es='${req.body.urunadi_es}',
                aciklama_es='${req.body.aciklama_es2}',
                anahtarlar_es='${req.body.anahtarlar_es2}',
                yayinla='${req.body.yayinla}',
                birim='${req.body.birim}',
                urunkod='${req.body.urunkod}',
                stonetype=${req.body.stonetype},
                keywords_en='${req.body.keywords_en2}',
                keywords_fr='${req.body.keywords_fr2}',
                keywords_es='${req.body.keywords_es2}',
                urunadi_ru=N'${req.body.urunadi_ru}',
                aciklama_ru=N'${req.body.aciklama_ru}',
                keywords_ru=N'${req.body.keywords_ru}',
                anahtarlar_ru=N'${req.body.anahtarlar_ru}',

                urunadi_ar=N'${req.body.urunadi_ar}',
                aciklama_ar=N'${req.body.aciklama_ar}',
                anahtarlar_ar=N'${req.body.anahtarlar_ar}',
                keywords_ar=N'${req.body.keywords_ar}'


            where Id = '${req.body.Id}'
    `;
    if(!req.body.yayinla){
        /*Un publish olan ürün ve suggestedlar eklenecektir. */
        const unpublishSql = `
            select 

                (select p.urunadi_en from MekmarCom_Products p where p.urunid=oner.urunid) as ProductName,
                (select p.urunid from MekmarCom_Products p where p.urunid=oner.urunid) as ProductId


            from MekmarCom_OnerilenUrunler oner where oner.onerilenurunid=${req.body.urunid}
        `;
        let content = `
            <h3>${req.body.urunadi_en} (${req.body.urunid}) ürünü yayından kaldırılmıştır. Aşağıdaki ürünlerin önerilenlerini kontrol ediniz...</h3>
            <br/>
            <table style="border: 1px solid;border-collapse: collapse;width: 100%;">
            <tr style="border: 1px solid;">
                <th style="border: 1px solid;">Ürün Id</th>
                <th style="border: 1px solid;">Ürün Adı</th>
            </tr>
        `;
        mssql.query(unpublishSql,(err,unpublished)=>{
            if(unpublished.recordset.length>0){
                unpublished.recordset.forEach(x=>{
                    content = content + `
                    <tr style="border: 1px solid;">
                        <td style="border: 1px solid;text-align:center;">${x.ProductId}</td>
                        <td style="border: 1px solid;text-align:center;">${x.ProductName}</td>
           
        
                    </tr>`
                });
                
                content = content + '</table>';
                transporter.sendMail({
                    to: 'export1@mekmar.com',
                    from: 'goz@mekmar.com',
                    subject: 'Yayından Kaldırılan Ürün',
                    html: content
                });
                transporter.sendMail({
                    to: 'export2@mekmar.com',
                    from: 'goz@mekmar.com',
                    subject: 'Yayından Kaldırılan Ürün',
                    html: content
                });
                transporter.sendMail({
                    to: 'info@mekmar.com',
                    from: 'goz@mekmar.com',
                    subject: 'Yayından Kaldırılan Ürün',
                    html: content
                });
                transporter.sendMail({
                    to: 'bilgiislem@mekmar.com',
                    from: 'goz@mekmar.com',
                    subject: 'Yayından Kaldırılan Ürün',
                    html: content
                });
            }else{

                content = content + '</table>';
                transporter.sendMail({
                    to: 'export1@mekmar.com',
                    from: 'goz@mekmar.com',
                    subject: 'Yayından Kaldırılan Ürün',
                    html: content
                });
                transporter.sendMail({
                    to: 'export2@mekmar.com',
                    from: 'goz@mekmar.com',
                    subject: 'Yayından Kaldırılan Ürün',
                    html: content
                });
                transporter.sendMail({
                    to: 'bilgiislem@mekmar.com',
                    from: 'goz@mekmar.com',
                    subject: 'Yayından Kaldırılan Ürün',
                    html: content
                });
            }

        });

        const suggestedSqlDelete = `delete MekmarCom_OnerilenUrunler where onerilenurunid='${req.body.urunid}'`;
        mssql.query(suggestedSqlDelete);
    };

    mssql.query(updateProductSql, (err, product) => {
        if(product.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        } else{
            res.status(200).json({'status':false});
        }
    });
});
app.delete('/panel/product/delete/:productId', (req, res) => {
    const productDeleteSql = `delete MekmarCom_Products where urunid='${req.params.productId}'`;
    const sizeDeleteSql = `delete MekmarCom_Ebatlar where urunid='${req.params.productId}'`;
    const finishDeleteSql = `delete MekmarCom_Finish where urunid='${req.params.productId}'`;
    const colorDeleteSql = `delete MekmarCom_UrunlerRenkList where UrunId='${req.params.productId}'`;
    const areaDeleteSql = `delete MekmarCom_ProductAreas where UrunId='${req.params.productId}'`;
    const styleDeleteSql = `delete MekmarCom_StilFiltered where UrunId='${req.params.productId}'`;
    const typeDeleteSql = `delete MekmarCom_TurFiltered where UrunId='${req.params.productId}'`;
    const materialDeleteSql = `delete MekmarCom_MateryalFiltered where UrunId='${req.params.productId}'`;
    const photoDeleteSql = `delete MekmarCom_Fotolar where urunid=${req.params.productId}`;
    const suggestedDeleteSql = `delete MekmarCom_OnerilenUrunler where urunid='${req.params.productId}'`;
    const suggestedSqlDelete = `delete MekmarCom_OnerilenUrunler where onerilenurunid='${req.body.urunid}'`;
    mssql.query(productDeleteSql,(err,product)=>{
        if (product.rowsAffected[0] == 1) {
               mssql.query(sizeDeleteSql);
                mssql.query(finishDeleteSql);
                mssql.query(colorDeleteSql);
                mssql.query(areaDeleteSql);
                mssql.query(styleDeleteSql);
                mssql.query(typeDeleteSql);
                mssql.query(materialDeleteSql);
            mssql.query(photoDeleteSql);
            mssql.query(suggestedDeleteSql);
            mssql.query(suggestedSqlDelete);

           res.status(200).json({ 'status': true });
    } else{
           res.status(200).json({ 'status': false });
    }
    });





});
app.post('/panel/product/filtered/list', (req, res) => {
    const productId = req.body.productId;
    const categoryId = req.body.categoryId;
    const sizeListSql = `select Id,urunid,ebat,birim,fiyat,sira from MekmarCom_Ebatlar where urunid='${productId}' order by sira`;
    const finishListSql = `select Id,urunid,finish_en,finish_fr,finish_es,finish_ru from MekmarCom_Finish where urunid='${productId}'`;
    const colorListSql = `
        select mur.ID,mur.RenkId,mur.UrunId,mpc.renk_en,mpc.renk_fr,mpc.renk_es,mpc.renk_ru 
from MekmarCom_UrunlerRenkList  mur
inner join MekmarCom_ProductsColor mpc on mpc.ID = mur.RenkId

where UrunId=${productId}
    `;
    const areaListSql = `
        select 
            mpa.ID,
            mpa.UrunId,
            mpa.AreaId,
            ma.Areas,
            ma.Areas_fr,
            ma.Areas_es,
            ma.Areas_ru
        from 
        MekmarCom_ProductAreas mpa 
        inner join MekmarCom_Areas ma on ma.ID = mpa.AreaId 
        where mpa.UrunId = ${productId}
    `;
    const typeListSql = `
        select mtf.ID,mtf.TurId,mtf.UrunId,mtl.TurEn,mtl.TurFr,mtl.TurEs,mtl.TurRu from MekmarCom_TurFiltered mtf
        inner join MekmarCom_TurList mtl on mtl.ID = mtf.TurId
        where mtf.UrunId = '${productId}'
    `;
    const materialListSql = `
        select mmf.ID,mmf.MateryalId,mmf.UrunId,mml.MateryalEn,mml.MateryalFr,mml.MateryalEs,mml.MateryalRu from MekmarCom_MateryalFiltered mmf
        inner join MekmarCom_MateryalList mml on mml.ID = mmf.MateryalId
        where mmf.UrunId = '${productId}'
    `;
    const styleListSql = `
        select msf.ID,msf.UrunId,msf.StilId,msf.KategoriId,msl.StilEn,msl.StilFr,msl.StilEs,msl.StilRu from MekmarCom_StilFiltered msf
        inner join MekmarCom_StilList msl on msl.ID = msf.StilId
        where msf.UrunId='${productId}'
    `;
    const photoListSql = `
        select Id,urunid,name,uzanti,imagePath,macPath,sira from MekmarCom_Fotolar where urunid = '${productId}' order by sira
    `;
     const suggestedAllListSql = `
            select 
            mp.urunid as onerilenurunid,
            mp.urunadi_en,
            (select top 1 mf.macPath from MekmarCom_Fotolar mf where mf.urunid = mp.urunid order by sira) as Image,
            mp.sira
        from MekmarCom_Products mp
        where mp.urunid not in (select mou.onerilenurunid from MekmarCom_OnerilenUrunler mou where mou.urunid = '${productId}') and
        mp.yayinla = 1 and mp.kategori_id='${categoryId}'
    `;
    const suggestedListSql = `
    select 

	mou.Id,
	mou.urunid,
	mou.onerilenurunid,
	mou.sira,
	(select top 1 mf.imagePath from MekmarCom_Fotolar mf where mf.urunid = mou.onerilenurunid) as Image,
    	(select mp.urunadi_en from MekmarCom_Products mp where mp.urunid = mou.onerilenurunid) as urunadi_en


from MekmarCom_OnerilenUrunler mou 
inner join MekmarCom_Products mp on mp.urunid = mou.onerilenurunid


where mou.urunid='${productId}' and mp.yayinla=1

order by sira
    
    `;
    const edgeListSql = `
    select msf.ID,msf.UrunId,msf.KenarId,msf.KategoriId,msl.KenarEn,msl.KenarFr,msl.KenarEs,msl.KenarRu from MekmarCom_KenarFiltered msf
    inner join MekmarCom_KenarList msl on msl.ID = msf.KenarId
    where msf.UrunId='${productId}'
    `;
    mssql.query(sizeListSql, (err,size) => {
       mssql.query(finishListSql,(err,finish)=>{
        mssql.query(colorListSql,(err,color)=>{
           mssql.query(areaListSql,(err,area)=>{
           mssql.query(typeListSql,(err,type)=>{
               mssql.query(materialListSql, (err, material) => {
                   mssql.query(styleListSql, (err, style) => {
                       mssql.query(photoListSql, (err, photo) => {
                           mssql.query(suggestedAllListSql, (err, suggestedAll) => {
                               mssql.query(suggestedListSql, (err, suggestedList) => {
                                   mssql.query(edgeListSql, (err, edge) => {
                                       const photosSuggested = [];
                                       let index = 1;
                                       photo.recordset.forEach(x => {
                                           photosSuggested.push({ ...x, sira: index });
                                             index += 1

                                       });
                                    res.status(200).json({
                                        'edge':edge.recordset,
                                        'size': size.recordset,
                                        'finish': finish.recordset,
                                        'color': color.recordset,
                                        'area': area.recordset,
                                        'type': type.recordset,
                                        'material': material.recordset,
                                        'style': style.recordset,
                                        'photo': photosSuggested,
                                        'suggestedall':suggestedAll.recordset,
                                        'suggestedlist':suggestedList.recordset,
                                    });
                                });

                               });
                           });

                    });

                });
               });
        });
        });
        });
    });
    });

});
app.post('/panel/product/size/add', (req, res) => {
    const sizeIdSql = `select top 1 Id from MekmarCom_Ebatlar order by Id desc`;
    const addSizeSql = `
        insert into MekmarCom_Ebatlar(urunid,ebat,fiyat)
        VALUES('${req.body.urunid}','${req.body.ebat}','${req.body.fiyat}')
    `;
    mssql.query(addSizeSql, (err, size) => {
        if(size.rowsAffected[0]==1){
            mssql.query(sizeIdSql, (err, sizeId) => {
                res.status(200).json({
                    'id': sizeId.recordset[0].Id,
                    'status': true
                });
            }); 
        }else{
                res.status(200).json({
                    'id': 0,
                    'status': false
                });
        };

    });
});
app.delete('/panel/product/size/delete/:id',(req,res)=>{
    const deleteSizeSql = `delete MekmarCom_Ebatlar where Id='${req.params.id}'`;
    mssql.query(deleteSizeSql, (err, deleteSize) => {
        if (deleteSize.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        } else{
            res.status(200).json({'status':false});
        }
    });
});
app.put('/panel/product/size/update', (req, res) => {
    const updateSizeSql = `update MekmarCom_Ebatlar SET ebat='${req.body.ebat}',fiyat='${req.body.fiyat}' where Id='${req.body.Id}'`;
    mssql.query(updateSizeSql, (err, updateSize) => {
       if(updateSize.rowsAffected[0] == 1){
           res.status(200).json({ 'status': true });
       } else {
           res.status(200).json({ 'status': false });
        
       }
    });
});
app.post('/panel/product/color/add', (req, res) => {
    const insertColorSql = `
        insert into MekmarCom_UrunlerRenkList(RenkId,UrunId)
        VALUES('${req.body.RenkId}','${req.body.UrunId}')
    `;
    const colorIdSql = `select top 1 ID from MekmarCom_UrunlerRenkList order by ID desc`;
    mssql.query(insertColorSql, (err, color) => {
        if (color.rowsAffected[0] == 1) {
            mssql.query(colorIdSql, (err, colorId) => {
                res.status(200).json({ 'status': true ,'id':colorId.recordset[0].ID});  
                
            });
        } else{
            res.status(200).json({'status':false,'id':0});
        }
    });
});
app.delete('/panel/product/color/delete/:id', (req, res) => {
    const deleteColorSql = `delete MekmarCom_UrunlerRenkList where ID='${req.params.id}'`;
    mssql.query(deleteColorSql, (err, color) => {
        if (color.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        } else {
            res.status(200).json({ 'status': fase });
            
        }
    });
});
app.post('/panel/product/finish/add',(req,res)=>{
    const finishAddSql = `
        insert into MekmarCom_Finish(urunid,finish_en,finish_fr,finish_es,finish_ru)
        VALUES('${req.body.urunid}','${req.body.finish_en}','${req.body.finish_fr}','${req.body.finish_es}',N'${req.body.finish_ru}')
    `;
    const finishIdSql = `select top 1 Id from MekmarCom_Finish order by Id desc`;
    mssql.query(finishAddSql,(err,finish)=>{
        if(finish.rowsAffected[0] == 1){
            mssql.query(finishIdSql,(err,finishId)=>{
                res.status(200).json({ 'status': true, 'id': finishId.recordset[0].Id });  
            });
        } else {
            res.status(200).json({'status':false,'id':0});
        }
    });
});
app.delete('/panel/product/finish/delete/:id', (req, res) => {
    const deleteFinishSql = `delete MekmarCom_Finish where Id = '${req.params.id}'`;
    mssql.query(deleteFinishSql,(err,finish)=>{
        if(finish.rowsAffected[0] == 1){
            res.status(200).json({ 'status': true });
        }else{
            res.status(200).json({'status':false});
        
            }
    })
});
app.post('/panel/product/area/add', (req, res) => {
    const areaInsertSql = `
        insert into MekmarCom_ProductAreas(UrunId,AreaId)
        VALUES('${req.body.UrunId}','${req.body.AreaId}')
    `;
    const areaIdSql = `select top 1 ID from MekmarCom_ProductAreas order by ID desc`;
    mssql.query(areaInsertSql, (err,area)=>{
        if(area.rowsAffected[0]==1){
            mssql.query(areaIdSql,(err,areaId)=>{
                res.status(200).json({ 'status': true, 'id': areaId.recordset[0].ID }); 
            });
        }else{
            res.status(200).json({ 'status': false, 'id': 0 });
        }
    });
});
app.delete('/panel/product/area/delete/:id',(req,res)=>{
    const deleteAreaSql = `delete MekmarCom_ProductAreas where ID='${req.params.id}'`;
    mssql.query(deleteAreaSql,(err,area)=>{
        if (area.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        }else{
            res.status(200).json({ 'status': false });
        }
    })
});
app.post('/panel/product/type/add', (req, res) => {
    const typeInsertSql = `
        insert into MekmarCom_TurFiltered(UrunId,TurId,KategoriId)
            VALUES('${req.body.UrunId}','${req.body.TurId}','${req.body.KategoriId}')
    `;
    const typeIdSql = `select top 1 ID from MekmarCom_TurFiltered order by ID desc`;
    mssql.query(typeInsertSql,(err,type)=>{
       if(type.rowsAffected[0] == 1){
           mssql.query(typeIdSql, (err, typeId) => {
               res.status(200).json({ 'status': true, 'id': typeId.recordset[0].ID });  
           });
        } else{
            res.status(200).json({'status':false,'id':0});
        } 
    });
});
app.delete('/panel/product/type/delete/:id',(req,res)=>{
    const deleteTypeSql = `delete MekmarCom_TurFiltered where ID='${req.params.id}'`;
    mssql.query(deleteTypeSql, (err, type) => {
       if(type.rowsAffected[0]==1){
           res.status(200).json({ 'status': true });
    } else{
           res.status(200).json({ 'status': false });
    }
    });
});
app.post('/panel/product/style/add',(req,res)=>{
    const styleInsertSql = `
        insert into MekmarCom_StilFiltered(UrunId,StilId,KategoriId)
        VALUES('${req.body.UrunId}','${req.body.StilId}','${req.body.KategoriId}')
    `;
    const styleIdSql = `select top 1 ID from MekmarCom_StilFiltered order by ID desc`;
    mssql.query(styleInsertSql, (err, style) => {
        if (style.rowsAffected[0] == 1) {
            mssql.query(styleIdSql, (err, styleId) => {
                res.status(200).json({ 'status': true, 'id': styleId.recordset[0].ID }); 
            });
        }else{
            res.status(200).json({'status':false})
        }
    });
});
app.delete('/panel/product/style/delete/:id',(req,res)=>{
    const styleDeleteSql = `delete MekmarCom_StilFiltered where ID='${req.params.id}'`;
    mssql.query(styleDeleteSql,(err,style)=>{
       if(style.rowsAffected[0] == 1){
           res.status(200).json({ 'status': true });
       } else {
        res.status(200).json({'status':false});
       } 
    });
});
app.post('/panel/product/material/add',(req,res)=>{
    const materialInsertSql = `
                    insert into MekmarCom_MateryalFiltered 
            (MateryalId,UrunId,KategoriId)
            VALUES('${req.body.MateryalId}','${req.body.UrunId}','${req.body.KategoriId}')
    `;
    const materialIdSql = `select top 1 ID from MekmarCom_MateryalFiltered order by ID desc`;
    mssql.query(materialInsertSql, (err, material) => {
       if(material.rowsAffected[0] == 1){
        mssql.query(materialIdSql,(err,materialId)=>{
            res.status(200).json({ 'status': true, 'id': materialId.recordset[0].ID });
        });
       } else{
        res.status(200).json({'status':false,'id':0});
       } 
    });
});
app.delete('/panel/product/material/delete/:id', (req, res) => {
    const deleteMaterialSql = `delete MekmarCom_MateryalFiltered where ID='${req.params.id}'`;
    mssql.query(deleteMaterialSql, (err, material) => {
       if(material.rowsAffected[0] == 1){
           res.status(200).json({ 'status': true });
    } else{
           res.status(200).json({ 'status': false });
    }
    });
});
app.post('/panel/product/edge/add',(req,res)=>{
    const edgeInsertSql = `
                    insert into MekmarCom_KenarFiltered 
            (KenarId,UrunId,KategoriId)
            VALUES('${req.body.KenarId}','${req.body.UrunId}','${req.body.KategoriId}')
    `;
    const edgeIdSql = `select top 1 ID from MekmarCom_KenarFiltered order by ID desc`;
    mssql.query(edgeInsertSql, (err, edge) => {
       if(edge.rowsAffected[0] == 1){
        mssql.query(edgeIdSql,(err,edgeId)=>{
            res.status(200).json({ 'status': true, 'id': edgeId.recordset[0].ID });
        });
       } else{
        res.status(200).json({'status':false,'id':0});
       } 
    });
});
app.delete('/panel/product/edge/delete/:id', (req, res) => {
    const deleteEdgeSql = `delete MekmarCom_KenarFiltered where ID='${req.params.id}'`;
    mssql.query(deleteEdgeSql, (err, edge) => {
       if(edge.rowsAffected[0] == 1){
           res.status(200).json({ 'status': true });
    } else{
           res.status(200).json({ 'status': false });
    }
    });
});
app.post('/panel/products/size/change/queue',(req,res)=>{
    req.body.forEach(x=>{
        const sql = `update MekmarCom_Ebatlar SET sira='${x.sira}' where Id = '${x.Id}'`;
        mssql.query(sql,(err,sizes)=>{
           if(sizes.rowsAffected[0] != 1){
            res.status(200).json({'status':false});
                return;
            }

        });
    });


    res.status(200).json({'status':true});

});


app.delete('/panel/product/photo/one/delete/:id', (req, res) => {
    const photoDeleteSql = `delete MekmarCom_Fotolar where Id='${req.params.id}'`;
    mssql.query(photoDeleteSql, (err, photo) => {
        if(photo.rowsAffected[0] == 1){
            res.status(200).json({ 'status': true });
        } else {
            res.status(200).json({ 'status': false });
            }
    });
});
app.delete('/panel/product/photo/all/delete/:id', (req, res) => {
    const photosDeleteSql = `delete MekmarCom_Fotolar where urunid='${req.params.id}'`;
    mssql.query(photosDeleteSql, (err, photos) => {
        if (photos.rowsAffected[0] >= 1) {
            res.status(200).json({ 'status': true });
        } else {
            res.status(200).json({ 'status': false });
        }
    });
});
app.post('/panel/product/photo/queue/change', (req, res) => {
    req.body.forEach(x=>{
        const queueChangeSql = `update MekmarCom_Fotolar SET sira='${x.sira}' WHERE Id='${x.Id}'`;
        mssql.query(queueChangeSql);
    });
    res.status(200).json({ 'status': true });
});

app.post('/panel/product/photo/add', (req, res) => {
    const photoInsertSql = `
        insert into MekmarCom_Fotolar
        (
            urunid,
            name,
            uzanti,
            imagePath,
            macPath,
            sira
        ) VALUES('${req.body.urunid}','${req.body.name}','${req.body.uzanti}','${req.body.imagePath}','${req.body.macPath}','${req.body.sira}')
    `;
    mssql.query(photoInsertSql,(err,photo)=>{
        if(photo.rowsAffected[0] == 1){
                res.status(200).json({ 'status': true });
        }else{
            res.status(200).json({ 'status': false });
        }
    });
 

});
app.get('/panel/product/photos/list/update/:id', (req, res) => {
    const photosListSql = `select Id,urunid,name,uzanti,imagePath,macPath,sira from MekmarCom_Fotolar where urunid = '${req.params.id}' order by sira`;
    mssql.query(photosListSql,(err,photo)=>{
        res.status(200).json({ 'list': photo.recordset }); 
    });
});
app.post('/panel/product/suggested/add', (req, res) => {
    const suggestedInsertSql = `
        insert into MekmarCom_OnerilenUrunler(urunid,onerilenurunid)
values('${req.body.urunid}','${req.body.onerilenurunid}')
    `;
    mssql.query(suggestedInsertSql,(err,suggested)=>{
       if(suggested.rowsAffected[0] == 1){
           res.status(200).json({ 'status': true });
    } else{
           res.status(200).json({ 'status': false });
        };
    });
});
app.delete('/panel/product/suggested/delete/:id', (req, res) => {
    const suggestedDeleteSql = `delete MekmarCom_OnerilenUrunler where Id='${req.params.id}'`;
    mssql.query(suggestedDeleteSql, (err, suggested) => {
        if (suggested.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        } else{
            res.status(200).json({'status':false});
            
        }
    });
});
app.post('/panel/product/suggested/queue/change', (req, res) => {
    const queueChangeSql = `update MekmarCom_OnerilenUrunler SET sira = '${req.body.sira}' where Id= '${req.body.Id}'`;
        mssql.query(queueChangeSql,(err,queue)=>{
        if(queue.rowsAffected[0] == 1){
            res.status(200).json({ 'status': true });
        } else{
            res.status(200).json({ 'status': false });
            };
        });

});

app.post('/panel/product/test/report', (req, res) => {
    const testReportSql = `update MekmarCom_Products set testrapor = '${req.body.testrapor}' where urunid = '${req.body.urunid}'`;
    mssql.query(testReportSql,(err,testReport)=>{
        if (testReport.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        }else{
            res.status(200).json({'status':false});
        }
    });
});

app.get('/panel/usa/stock/list',(req,res)=>{
    const sql = `
                select 

                dpm.Id,
                dpm.Yayinla,
                dpm.MaxStock,
                dpm.UrunId,
                dpm.UrunAdi,
                dpm.Aciklama,
                dpm.Anahtarlar,
                dpm.Size,
                dpm.LinkSize,
                dpm.Renk,
                dpm.Fiyat,
                dpm.MosaicSize,
                dpm.KutuDetay,
                dpm.KasaDetay,
                dpm.Surface,
                dpm.Edge,
                dpm.Sira,
                dpm.TurkeyStock,
                dpm.urunadi_en,
                dpm.aciklama_en,
                dpm.anahtarlar_en,
                dpm.renk_en,
                dpm.kutudetay_en,
                dpm.kasadetay_en,
                dpm.surface_en,
                dpm.edge_en,
                dpm.urunadi_fr,
                dpm.aciklama_fr,
                dpm.anahtarlar_fr,
                dpm.renk_fr,
                dpm.kutudetay_fr,
                dpm.kasadetay_fr,
                dpm.surface_fr,
                dpm.edge_fr,
                dpm.urunadi_es,
                dpm.aciklama_es,
                dpm.anahtarlar_es,
                dpm.renk_es,
                dpm.kutudetay_es,
                dpm.kasadetay_es,
                dpm.surface_es,
                dpm.edge_es,
                duk.SkuNo,
                duk.MekmarKod,
                duk.UrunTanim,
                duk.UrunAciklama,
                duk.KasaKutu,
                duk.KasaAdet,
                duk.KasaSqft,
                duk.KasaM2,
                duk.KutuAdet,
                duk.KutuSqft,
                duk.KutuM2,
                duk.FobFiyat,
                duk.DtpFiyat,
                duk.UrunSira,
                duk.SiteSira,
                duk.SiteGoster,
                dbo.MekmarUsaYeni_StockSqft(duk.SkuNo) as StokSqft,
                dbo.MekmarUsaYeni_StockBox(duk.SkuNo) as StokBox,
                duk.Kategori,
                duk.ID as ProductId,
                dpm.hashtags,
                dpm.hashtags_fr,
                dpm.hashtags_es




            from DepoUrunKart_MekmarSiteTB dpm 
            inner join DepoUrunKartTB duk on duk.ID = dpm.UrunId
            where Yayinla=1
    `;
    mssql.query(sql,(err,usa)=>{
        res.status(200).json({'list':usa.recordset});
    });
});
app.get('/panel/usa/stock/photos/list/:product_id',(req,res)=>{
    const sql =  `select dum.Id,dum.UrunId,dum.Image,dum.Webp,dum.Sira from DepoUrunKart_MekmarFotolarTB dum where UrunId='${req.params.product_id}'`;
    mssql.query(sql,(err,photos)=>{
        res.status(200).json({'list':photos.recordset})
    });

});

app.put('/panel/usa/stock/update',(req,res)=>{
    const updateStock = `
    update MekmarCom_StockListYeni
    SET
        StockBox='${req.body.StokBox}',
        StockSqft='${req.body.StokSqft}'
    WHERE
        SkuNo='${req.body.SkuNo}'
    `;
    const updateDetail = `

    update DepoUrunKart_MekmarSiteTB
    SET
        UrunAdi='${__stringCharacterChange(req.body.UrunAdi)}',
        Aciklama='${__stringCharacterChange(req.body.aciklama_en)}',
        Anahtarlar='${__stringCharacterChange(req.body.Anahtarlar)}',
        Size='${__stringCharacterChange(req.body.Size)}',
        Renk='${__stringCharacterChange(req.body.Renk)}',
        Fiyat='${req.body.Fiyat}',
        MaxStock='${req.body.MaxStock}',
        KutuDetay='${__stringCharacterChange(req.body.KutuDetay)}',
        KasaDetay='${__stringCharacterChange(req.body.KasaDetay)}',
        Surface='${__stringCharacterChange(req.body.Surface)}',
        Edge='${__stringCharacterChange(req.body.Edge)}',
        Yayinla='${req.body.Yayinla}',
        urunadi_en='${__stringCharacterChange(req.body.UrunAdi)}',
        aciklama_en='${__stringCharacterChange(req.body.aciklama_en)}',
        anahtarlar_en='${__stringCharacterChange(req.body.Anahtarlar)}',
        renk_en='${__stringCharacterChange(req.body.Renk)}',
        kutudetay_en='${__stringCharacterChange(req.body.KutuDetay)}',
        kasadetay_en='${__stringCharacterChange(req.body.KasaDetay)}',
        surface_en='${__stringCharacterChange(req.body.Size)}',
        edge_en='${__stringCharacterChange(req.body.Edge)}',
        urunadi_fr='${__stringCharacterChange(req.body.urunadi_fr)}',
        aciklama_fr='${__stringCharacterChange(req.body.aciklama_fr)}',
        anahtarlar_fr='${__stringCharacterChange(req.body.anahtarlar_fr)}',
        renk_fr='${__stringCharacterChange(req.body.renk_fr)}',
        kutudetay_fr='${__stringCharacterChange(req.body.kutudetay_fr)}',
        kasadetay_fr='${__stringCharacterChange(req.body.kasadetay_fr)}',
        surface_fr='${__stringCharacterChange(req.body.surface_fr)}',
        edge_fr='${__stringCharacterChange(req.body.edge_fr)}',
        urunadi_es='${__stringCharacterChange(req.body.urunadi_es)}',
        aciklama_es='${__stringCharacterChange(req.body.aciklama_es)}',
        anahtarlar_es='${__stringCharacterChange(req.body.anahtarlar_es)}',
        renk_es='${__stringCharacterChange(req.body.renk_es)}',
        kutudetay_es='${__stringCharacterChange(req.body.kutudetay_es)}',
        kasadetay_es='${__stringCharacterChange(req.body.kasadetay_es)}',
        surface_es='${__stringCharacterChange(req.body.surface_es)}',
        edge_es='${__stringCharacterChange(req.body.edge_es)}',
        hashtags='${__stringCharacterChange(req.body.hashtags)}',
        hashtags_fr='${__stringCharacterChange(req.body.hashtags_fr)}',
        hashtags_es='${__stringCharacterChange(req.body.hashtags_es)}'

    where Id='${req.body.Id}'

    `;
    mssql.query(updateDetail);
    mssql.query(updateStock,(err,stock)=>{
        if(stock.rowsAffected[0]==1){
            res.status(200).json({'status':true});
        } else{
            res.status(200).json({'status':false});
            
        }
    });

});
app.post('/panel/usa/stock/photo/upload',async(req,res)=>{
    await req.body.forEach(x=>{
        const sql = `
                INSERT INTO DepoUrunKart_MekmarFotolarTB(UrunId,Image,Webp,Sira)
                VALUES(
                    '${x.UrunId}',
                    '${x.Image}',
                    '${x.Webp}',
                    '${x.Sira}'
                )
            `;
    mssql.query(sql);
    });
    res.status(200).json({'status':true});

});

app.get('/api/usa/photo/delete/:id',(req,res)=>{
    const sql = `delete DepoUrunKart_MekmarFotolarTB where Id=${req.params.id}`;
    mssql.query(sql,(err,result)=>{
        if(result.rowsAffected == 1){
            res.status(200).json({'status':true});
        }
    });
});

app.post('/panel/usa/stock/photos/change/queue',async (req,res)=>{
    await req.body.forEach(x=>{
        const sql = `update DepoUrunKart_MekmarFotolarTB SET Sira='${x.Sira}' where Id='${x.Id}'`;
        mssql.query(sql);
    });
    res.status(200).json({'status':true});

});



/*Mekmar Com Project */
app.get('/panel/project/list', (req, res) => {
    const projectListSql = `
        select 

            mp.ID,
            mp.ProjectName,
            mp.CountryId,
            mp.CountryName,
            mp.Image,
            mp.Queue,
            mp.ProjectName_Fr,
            mp.ProjectName_Es,
            mp.ProjectName_Ru,
			(select mpd.VideosStatus from MekmarCom_Project_Detail mpd where mpd.VideosStatus=1 and mpd.ProjectId = mp.ID) as VideoStatus


        from MekmarCom_Projects mp
        order by mp.Queue
    `;
    mssql.query(projectListSql, (err, project) => {
       res.status(200).json({'list':project.recordset}); 
    });
});
app.get('/panel/project/detail/:id', (req, res) => {
    const photosSql = `
        select 

	mpd.ID,
	mpd.ProjectId,
	mpd.ProductName,
	mpd.ProductName_Fr,
	mpd.ProductName_Es,
	mpd.ProductName_Ru,
	mpd.ProductName_Ar,

	mpd.ImageLink,
	mpd.ImageName,
	mpd.ImageStatus,
    mpd.Queue

from MekmarCom_Project_Detail mpd 
where mpd.ProjectId = '${req.params.id}' and mpd.ImageStatus = 1
order by mpd.Queue
    `;
    const suggestedSql = `
        select 

	mps.ID,
	mps.ProjectId,
	mps.SuggestedId,
	mp.ProjectName,
	mp.Image


from MekmarCom_Projects_Suggested mps
inner join MekmarCom_Projects mp on mp.ID = mps.SuggestedId
where mps.ProjectId = '${req.params.id}'
    `;
    const notSuggestedSql = `
        select 

	mp.ID,
	mp.ProjectName,
	mp.Image

from MekmarCom_Projects mp
where mp.ID not in (select mps.SuggestedId from MekmarCom_Projects_Suggested mps where mps.ProjectId = '${req.params.id}') and mp.ID != '${req.params.id}'
    `;
    const informationSql = `
        select 

            mpi.ID,
            mpi.ProjectId,
            mpi.ProjectInformation,
            mpi.ProjectInformation_Fr,
            mpi.ProjectInformation_Es,
            mpi.ProjectInformation_Ru,
            mpi.ProjectInformation_Ar

        from MekmarCom_Projects_Information mpi
        where mpi.ProjectId = '${req.params.id}'
    `;
    const videoSql = `
        select 

	mpd.ID,
	mpd.ProjectId,
	mpd.VideosStatus,
	mpd.VideosLink

from MekmarCom_Project_Detail mpd 
where mpd.ProjectId = '${req.params.id}' and mpd.VideosStatus = 1
    `;
    mssql.query(photosSql, (err,photos) => {
        mssql.query(suggestedSql, (err,suggested) => {
            mssql.query(notSuggestedSql,(err,notSuggested)=>{
                mssql.query(informationSql, (err,information) => {
                    mssql.query(videoSql, (err, video) => {
                                        res.status(200).json({
                        'photos': photos.recordset,
                        'suggested': suggested.recordset,
                        'notSuggested': notSuggested.recordset,
                        'information': information.recordset,
                        'video':video.recordset
                    });
                    });

                }); 
            });
        }); 
    });
});
app.get('/panel/project/photo/delete/:id',(req,res)=>{
    const deleteProjectPhotoSql = `delete MekmarCom_Project_Detail where ID='${req.params.id}'`;
    mssql.query(deleteProjectPhotoSql,(err,photo)=>{
       if(photo.rowsAffected[0] == 1){
           res.status(200).json({ 'status': true });
       } else {
           res.status(200).json({ 'status': false });
       }
    });
});
app.post('/panel/project/information/update',(req,res)=>{
    const informationUpdateSql = `
        update MekmarCom_Projects_Information
SET
	ProjectInformation='${__stringCharacterChange(req.body.ProjectInformation)}',
	ProjectInformation_Fr='${__stringCharacterChange(req.body.ProjectInformation_Fr)}',
	ProjectInformation_Es='${__stringCharacterChange(req.body.ProjectInformation_Es)}',
	ProjectInformation_Ru=N'${__stringCharacterChange(req.body.ProjectInformation_Ru)}',
    ProjectInformation_Ar=N'${__stringCharacterChange(req.body.ProjectInformation_Ar)}'

WHERE
	ID = '${req.body.ID}'
    
    `;
    mssql.query(informationUpdateSql, (err, information) => {
       if(information.rowsAffected[0] == 1){
           res.status(200).json({ 'status': true });
        } else{
            res.status(200).json({'status':false});
        }
    });
});
app.post('/panel/project/product/photo/save', (req, res) => {
    const photoSaveSql = `
        insert into MekmarCom_Project_Detail (
            ProjectId,
            ImageLink,
            ImageStatus,
            ImageName,
            Queue,
            VideosStatus
        ) VALUES(
            '${req.body.ProjectId}',
            '${req.body.ImageLink}',
            '${req.body.ImageStatus}',
            '${req.body.ImageName}',
            '${req.body.Queue}',
            '0'
        )
    `;
    mssql.query(photoSaveSql,(err,photo)=>{
        if(photo.rowsAffected[0] == 1){
            res.status(200).json({ 'status': true });
        } else{
            res.status(200).json({ 'status': true });
        }
    })
});
app.put('/panel/project/product/photo/name/update', (req, res) => {
    const updatePhotoNameSql = `
        update MekmarCom_Project_Detail 
        SET 
            ProductName='${req.body.ProductName}',
            ProductName_Fr='${req.body.ProductName_Fr}',
            ProductName_Es='${req.body.ProductName_Es}',
            ProductName_Ru=N'${req.body.ProductName_Ru}',
            ProductName_Ar=N'${req.body.ProductName_Ar}'

        WHERE 
            ID = '${req.body.ID}'
    `;
    mssql.query(updatePhotoNameSql, (err, photo) => {
        if(photo.rowsAffected[0] == 1){
            res.status(200).json({ 'status': true });
        }else{
            res.status(200).json({'status':false});
        }
    });
});
app.delete('/panel/project/suggested/delete/:id', (req, res) => {
    const suggestedDeleteSql = `delete MekmarCom_Projects_Suggested where ID='${req.params.id}'`;
    mssql.query(suggestedDeleteSql,(err,suggested)=>{
        if (suggested.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        } else {
            res.status(200).json({'status':false});
        }
    });
});
app.post('/panel/project/suggested/add', (req, res) => {
    const suggestedInsertSql = `insert into MekmarCom_Projects_Suggested(ProjectId,SuggestedId) VALUES('${req.body.ProjectId}','${req.body.ID}')`;
    mssql.query(suggestedInsertSql, (err, suggested) => {
       if(suggested.rowsAffected[0] == 1){
           res.status(200).json({ 'status': true });
    } else{
           res.status(200).json({ 'status': false });
    }
    });
});
app.post('/panel/project/video/add',(req,res)=>{
    const videoInsertSql = `
        	insert into MekmarCom_Project_Detail(ProjectId,VideosLink,VideosStatus,ImageStatus)
	VALUES('${req.body.ProjectId}','${req.body.VideosLink}','${req.body.VideosStatus}','${req.body.ImageStatus}')
    `;
    mssql.query(videoInsertSql,(err,video)=>{
        if(video.rowsAffected[0] == 1){
            res.status(200).json({ 'status': true });
        }else{
            res.status(200).json({'status':false});
        }
    });
});
app.post('/panel/project/save', (req, res) => {
    const projectInsertSql = `
        insert into MekmarCom_Projects(
            ProjectName,
            ProjectName_Fr,
            ProjectName_Es,
            ProjectName_Ru,
            ProjectName_Ar,
            CountryId,
            CountryName,
            CountryName_Fr,
            CountryName_Es,
            CountryName_Ru,
            CountryName_Ar,

            Queue
        )
        VALUES(
            '${__stringCharacterChange(req.body.ProjectName)}',
            '${__stringCharacterChange(req.body.ProjectName_Fr)}',
            '${__stringCharacterChange(req.body.ProjectName_Es)}',
            N'${__stringCharacterChange(req.body.ProjectName_Ru)}',
            N'${__stringCharacterChange(req.body.ProjectName_Ar)}',

            '${req.body.CountryId}',
            '${__stringCharacterChange(req.body.CountryName)}',
            '${__stringCharacterChange(req.body.CountryName_Fr)}',
            '${__stringCharacterChange(req.body.CountryName_Es)}',
            N'${__stringCharacterChange(req.body.CountryName_Ru)}',
            N'${__stringCharacterChange(req.body.CountryName_Ar)}',

            '0'
        )
    `;
    const projectIdSql = `select top 1 ID from MekmarCom_Projects order by ID desc`;
    mssql.query(projectInsertSql, (err, project) => {
        if(project.rowsAffected[0] == 1){
            mssql.query(projectIdSql, (err, projectId) => {
                res.status(200).json({
                    'status':true,
                    'id':projectId.recordset[0].ID
                })
            });
        } else {
            res.status(200).json({ 'status': false });
        }
    });
});
app.put('/panel/project/photos/add', (req, res) => {
    const projectPhotoUpdateSql = `update MekmarCom_Projects SET Image = '${req.body.Image}' where ID='${req.body.ID}'`;
    mssql.query(projectPhotoUpdateSql,(err,photo)=>{
        if(photo.rowsAffected[0] == 1){
            res.status(200).json({ 'status': true });
        }else{
            res.status(200).json({'status':false});
            
        }
    })
});
app.post('/panel/project/information/save', (req, res) => {
    const informationInsertSql = `
        insert into MekmarCom_Projects_Information(
	ProjectId,
	ProjectInformation,
	ProjectInformation_Fr,
	ProjectInformation_Es,
	ProjectInformation_Ru,
    ProjectInformation_Ar
)
VALUES(
	'${req.body.ProjectId}',
	'${__stringCharacterChange(req.body.ProjectInformation)}',
	'${__stringCharacterChange(req.body.ProjectInformation_Fr)}',
	'${__stringCharacterChange(req.body.ProjectInformation_Es)}',
	N'${__stringCharacterChange(req.body.ProjectInformation_Ru)}',
	N'${__stringCharacterChange(req.body.ProjectInformation_Ar)}'

)
    `;
    mssql.query(informationInsertSql,(err,information)=>{
        if(information.rowsAffected[0] == 1){
            res.status(200).json({ 'status': true });
        } else{
            res.status(200).json({ 'status': false });
        }
    });
});

app.post('/panel/projet/photos/queue/change',(req,res)=>{
    req.body.forEach(x=>{
        const sql = `update MekmarCom_Project_Detail SET Queue='${x.Queue}' where ID='${x.ID}'`;
        mssql.query(sql);
    });
    res.status(200).json({'status':true});
});




app.put('/panel/products/queue/change',(req,res)=>{
    const sql = `update MekmarCom_Products SET sira='${req.body.sira}' where urunid='${req.body.urunid}'`;
    mssql.query(sql,(err,drag)=>{
        if(drag.rowsAffected[0] == 1){
            res.status(200).json({ 'status': true });
        } else {
            res.status(200).json({ 'status': false });
        }
     });

});


app.get('/panel/users/list', (req, res) => {
    const usersListSql = `
        select 

	Id,
	adi,
	kullaniciadi,
	mailadres,
	telefon


from MekmarCom_Musteriler 
    `;
    mssql.query(usersListSql,(err,users)=>{
        res.status(200).json({ 'list': users.recordset });
    });
});
app.post('/panel/user/save',(req,res)=>{
    const userInsertSql = `
        insert into MekmarCom_Musteriler(
            adi,kullaniciadi,mailadres,telefon
        )
        VALUES('${req.body.adi}','${req.body.kullaniciadi}','${req.body.mailadres}','${req.body.telefon}')
    `;
    mssql.query(userInsertSql,(err,user)=>{
       if(user.rowsAffected[0] == 1){
           res.status(200).json({ 'status': true });
    } else{
        res.status(200).json({'status':false})
    }
    });
});
app.delete('/panel/user/delete/:id', (req, res) => {
    const userDeleteSql = `delete MekmarCom_Musteriler where Id='${req.params.id}'`;
    mssql.query(userDeleteSql,(err,user)=>{
        if (user.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        } else{
            res.status(200).json({ 'status': false });
        }
    });
});
app.put('/panel/user/update', (req, res) => {
    const userUpdateSql = `
        update MekmarCom_Musteriler SET
adi = '${req.body.adi}',
kullaniciadi = '${req.body.kullaniciadi}',
mailadres = '${req.body.mailadres}',
telefon = '${req.body.telefon}'

where Id = '${req.body.Id}'
    `;
    mssql.query(userUpdateSql,(err,user)=>{
       if(user.rowsAffected[0] == 1){
           res.status(200).json({ 'status': true });
       } else {
           res.status(200).json({ 'status': false });
       }
    });
});
app.put('/panel/project/queue/change',(req,res)=>{
    req.body.forEach(x=>{
        const sql = `update MekmarCom_Projects SET Queue='${x.Queue}' WHERE ID='${x.ID}'`;
        mssql.query(sql);

    });
    res.status(200).json({'status':true});
});
app.put('/panel/project/main/photo/change',(req,res)=>{
    const sql = `update MekmarCom_Projects SET Image='${req.body.link}' where ID='${req.body.id}'`;
    mssql.query(sql,(err,photo)=>{
        if(photo.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});
        
        }
    });
});

/*Todo */
app.get('/todo/main/list/by/username/:username', (req, res) => {
    const todoSql = `
        select 

	y.ID,
	y.Yapilacak,
	y.Yapildi,
	y.GorevVerenID,
	y.GorevVerenAdi,
	y.GirisTarihi,
	y.YapildiTarihi,
	y.YapilacakOncelik,
	y.Acil,
	y.Sira,
	y.OrtakGorev

from Yapilacaklar y
where y.Yapildi=0 and y.OrtakGorev LIKE '%' + '${req.params.username}' +  '%' 
order by y.GirisTarihi desc
    `;
    mssql.query(todoSql, (err, todo) => {
        res.status(200).json({ 'list': todo.recordset });
    });
});
app.post('/todo/by/username/save', (req, res) => {

    if(req.body.GorevVerenID == 10){
        const queueSql = `
        select top 1 Sira + 1 as Sira from Yapilacaklar where GorevVerenAdi='Gizem' and Yapildi=0 and Goruldu=0 order by Sira desc
        `




    mssql.query(queueSql,(err,queueResults)=>{
        const queue = queueResults.recordset[0].Sira;
        const todoInsertSql = `
        insert into Yapilacaklar(
            Yapilacak,
            Yapildi,
            GorevVerenID,
            GorevVerenAdi,
            GirisTarihi,
            YapilacakOncelik,
            Acil,
            OrtakGorev,
            Goruldu,
            Sira
        )
        VALUES('${req.body.CustomYapilacak}','${0}','${req.body.GorevVerenID}','${req.body.GorevVerenAdi}','${req.body.GirisTarihi}','${req.body.YapilacakOncelik}','${req.body.Acil}','${req.body.OrtakGorev}','0',${queue})
        `;
        mssql.query(todoInsertSql,(err,todo)=>{
            if(todo.rowsAffected[0] == 1){
                res.status(200).json({ 'status': true });
         } else{
                res.status(200).json({ 'status': false });
         }
         });
    });
    
    } else{
        const todoInsertSql = `
        insert into Yapilacaklar(
            Yapilacak,
            Yapildi,
            GorevVerenID,
            GorevVerenAdi,
            GirisTarihi,
            YapilacakOncelik,
            Acil,
            OrtakGorev,
            Goruldu
        )
        VALUES('${req.body.CustomYapilacak}','${0}','${req.body.GorevVerenID}','${req.body.GorevVerenAdi}','${req.body.GirisTarihi}','${req.body.YapilacakOncelik}','${req.body.Acil}','${req.body.OrtakGorev}','0')
    `;
    mssql.query(todoInsertSql,(err,todo)=>{
        if(todo.rowsAffected[0] == 1){
            res.status(200).json({ 'status': true });
     } else{
            res.status(200).json({ 'status': false });
     }
     });
    }






});
app.put('/todo/by/username/update', (req, res) => {
    const todoUpdateSql = `
        update Yapilacaklar
SET Yapilacak='${req.body.CustomYapilacak}',
	OrtakGorev='${req.body.OrtakGorev}',
	YapilacakOncelik='${req.body.YapilacakOncelik}',
	Acil='${req.body.Acil}'
WHERE
	ID='${req.body.ID}'
    `;
    mssql.query(todoUpdateSql, (err, todo) => {
        if (todo.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        } else{
            res.status(200).json({ 'status': false });
            
        }
    });
});
app.delete('/todo/by/username/delete/:id', (req, res) => {
    const todoDeleteSql = `delete Yapilacaklar where ID='${req.params.id}'`;
    mssql.query(todoDeleteSql,(err,todo)=>{
        if(todo.rowsAffected[0] == 1){
            res.status(200).json({ 'status': true });
        }else{
            res.status(200).json({'status':false});
        }
    });
});
app.post('/todo/by/username/done', (req, res) => {

    const sql = `
        update Yapilacaklar SET Yapildi=1,YapildiTarihi='${req.body.YapildiTarihi}' WHERE ID='${req.body.ID}'
    `;
    mssql.query(sql, (err, todo) => {
       if(todo.rowsAffected[0] == 1){
           res.status(200).json({ 'status': true });
        } else{
            res.status(200).json({'status':false});
        }
    });
});

/*Finance */
app.get('/finance/list', (req, res) => {
    const financeSql = `
select 

	m.ID,
	m.FirmaAdi,
	(dbo.Finance_Total_Cost_Function(m.ID) +
	dbo.Finance_Total_Order_Function(m.ID) 
	
	) as TotalOrder,
	(
		dbo.Finance_Production_Cost_Function(m.ID) + dbo.Finance_Production_Order_Function(m.ID)
	) as ProductOrder,

	(
		dbo.Finance_Forwarding_Cost_Function(m.ID) + dbo.Finance_Forwarding_Order_Function(m.ID)+ dbo.Finance_Insurance_Total_Function(m.ID)
	) as ForwardingOrder,
	(
		dbo.Finance_Paid_Function(m.ID) 
	) as Paid,
	(
		dbo.Finance_Advanced_Payment_Function(m.ID)
	) as AdvancedPayment
	
	


from MusterilerTB m

where m.ID in (select s.MusteriID from SiparislerTB s group by s.MusteriID) and Mt_No=2








    `;
    const financeExpirySql = `
        select 
s.Vade ,s.SiparisNo,m.FirmaAdi,
(
	select sum(su.SatisToplam) from SiparisUrunTB su where su.SiparisNo = s.SiparisNo
) + s.NavlunSatis + s.DetayTutar_1 + s.DetayTutar_2 + s.DetayTutar_3 

as Total

from SiparislerTB  s
inner join MusterilerTB m on m.ID = s.MusteriID
where s.Vade is not null and
s.Vade > GETDATE()


    `;
    const financeMayaSql = `
    select 

	s.SiparisTarihi,
	s.YuklemeTarihi,
	m.FirmaAdi,
	s.SiparisNo,
	(
		select SUM(su.SatisFiyati * su.Miktar) from SiparisUrunTB su where su.SiparisNo = s.SiparisNo
	) + s.NavlunSatis + s.DetayTutar_1 + s.DetayTutar_2 + s.DetayTutar_3 as Invoice,
	(
		select SUM(o.Tutar) from OdemelerTB o where o.SiparisNo = s.SiparisNo
	) as Paid,
	((
		select SUM(su.SatisFiyati * su.Miktar) from SiparisUrunTB su where su.SiparisNo = s.SiparisNo
	) + s.NavlunSatis + s.DetayTutar_1 + s.DetayTutar_2 + s.DetayTutar_3 ) -
	(
		select SUM(o.Tutar) from OdemelerTB o where o.SiparisNo = s.SiparisNo
	) as  Balance





from SiparislerTB s
inner join MusterilerTB m on m.ID = s.MusteriID

where s.MayaControl=1
    `;
    
    mssql.query(financeExpirySql,(err,financeExpiry)=>{
            mssql.query(financeSql, (err, finance) => {
                mssql.query(financeMayaSql,(err,maya)=>{


                    res.status(200).json({ 'list': finance.recordset,'expiry':financeExpiry.recordset,'maya':maya.recordset }); 

                });
    });
    });

});
app.get('/finance/collection/list', (req, res) => {
    const yearListSql = `
        select 

            YEAR(o.Tarih) as Yil

        from OdemelerTB o

        group by YEAR(o.Tarih)
        order by YEAR(o.Tarih) desc
    `;

    mssql.query(yearListSql, (err, years) => {
        const year = years.recordset[0].Yil;
            const monthListSql = `
        select 

            MONTH(o.Tarih) as Ay

        from OdemelerTB o
        where YEAR(o.Tarih) = '${year}'
        group by MONTH(o.Tarih)
        order by MONTH(o.Tarih) desc
            `;
            mssql.query(monthListSql,(err,months)=>{
                const month = months.recordset[0].Ay;
                const collectionListSql = `
                    select o.ID,o.Tarih,o.MusteriID,m.FirmaAdi,o.Tutar,o.SiparisNo from OdemelerTB o 
                    inner join MusterilerTB m on m.ID = o.MusteriID
                    where YEAR(o.Tarih) = ${year} and MONTH(o.Tarih) =${month} and m.Marketing in ('Mekmar','Imperial Homes') 
                    order by o.Tarih desc    
                `;
                mssql.query(collectionListSql, (err, collection) => {
                    const collectionSampleListSql = `
                    select numune.Tarih,numune.NumuneNo,numune.Tutar,numune.Banka,ytm.MusteriAdi
from NumuneOdemelerTB numune
inner join YeniTeklif_MusterilerTB ytm on ytm.Id = numune.MusteriID
where YEAR(numune.Tarih) = ${year} 
                    `;
                    mssql.query(collectionSampleListSql,(err,sample)=>{
                        res.status(200).json({'list':collection.recordset,'years':years.recordset,'months':months.recordset,'sample':sample.recordset});

                    });

                });

            })
    });
});
app.get('/finance/collection/list/mekmer', (req, res) => {
    const yearListSql = `
        select 

            YEAR(o.Tarih) as Yil

        from OdemelerTB o

        group by YEAR(o.Tarih)
        order by YEAR(o.Tarih) desc
    `;

    mssql.query(yearListSql, (err, years) => {
        const year = years.recordset[0].Yil;
            const monthListSql = `
        select 

            MONTH(o.Tarih) as Ay

        from OdemelerTB o
        where YEAR(o.Tarih) = '${year}'
        group by MONTH(o.Tarih)
        order by MONTH(o.Tarih) desc
            `;
            mssql.query(monthListSql,(err,months)=>{
                const month = months.recordset[0].Ay;
                const collectionListSql = `
                    select o.ID,o.Tarih,o.MusteriID,m.FirmaAdi,o.Tutar,o.SiparisNo from Odemeler_MekmerTB o 
                    inner join MusterilerTB m on m.ID = o.MusteriID
                    where YEAR(o.Tarih) = ${year} and MONTH(o.Tarih) =${month}
                    order by o.Tarih desc    
                `;
                mssql.query(collectionListSql, (err, collection) => {
                    const collectionSampleListSql = `
                    select numune.Tarih,numune.NumuneNo,numune.Tutar,numune.Banka,ytm.MusteriAdi
from NumuneOdemelerTB numune
inner join YeniTeklif_MusterilerTB ytm on ytm.Id = numune.MusteriID
where YEAR(numune.Tarih) = ${year} 
                    `;
                    mssql.query(collectionSampleListSql,(err,sample)=>{
                        res.status(200).json({'list':collection.recordset,'years':years.recordset,'months':months.recordset,'sample':sample.recordset});

                    });

                });

            })
    });
});

app.get('/finance/collection/list/mekmer/year/:year', (req, res) => {

    const year = req.params.year;
            const monthListSql = `
        select 

            MONTH(o.Tarih) as Ay

        from OdemelerTB o
        where YEAR(o.Tarih) = '${year}'
        group by MONTH(o.Tarih)
        order by MONTH(o.Tarih) desc
            `;
            mssql.query(monthListSql,(err,months)=>{
                const month = months.recordset[0].Ay;
                const collectionListSql = `
                    select o.ID,o.Tarih,o.MusteriID,m.FirmaAdi,o.Tutar,o.SiparisNo from Odemeler_MekmerTB o 
                    inner join MusterilerTB m on m.ID = o.MusteriID
                    where YEAR(o.Tarih) = ${year} and MONTH(o.Tarih) =${month}
                    order by o.Tarih desc    
                `;
                mssql.query(collectionListSql, (err, collection) => {
                    const collectionSampleListSql = `
                    select numune.Tarih,numune.NumuneNo,numune.Tutar,numune.Banka,ytm.MusteriAdi
from NumuneOdemelerTB numune
inner join YeniTeklif_MusterilerTB ytm on ytm.Id = numune.MusteriID
where YEAR(numune.Tarih) = ${year} 
                    `;
                    mssql.query(collectionSampleListSql,(err,sample)=>{
                        res.status(200).json({'list':collection.recordset,'months':months.recordset,'sample':sample.recordset});

                    });

                });

            })

});
app.get('/finance/collection/list/mekmer/month/:year/:month', (req, res) => {
    const month = req.params.month;
    const year = req.params.year;
            const collectionListSql = `
                select o.ID,o.Tarih,o.MusteriID,m.FirmaAdi,o.Tutar,o.SiparisNo from Odemeler_MekmerTB o 
                inner join MusterilerTB m on m.ID = o.MusteriID
                where YEAR(o.Tarih) = ${year} and MONTH(o.Tarih) =${month}
                order by o.Tarih desc    
            `;
            mssql.query(collectionListSql, (err, collection) => {
                const collectionSampleListSql = `
                select numune.Tarih,numune.NumuneNo,numune.Tutar,numune.Banka,ytm.MusteriAdi
from NumuneOdemelerTB numune
inner join YeniTeklif_MusterilerTB ytm on ytm.Id = numune.MusteriID
where YEAR(numune.Tarih) = ${year} 
                `;
                mssql.query(collectionSampleListSql,(err,sample)=>{
                    res.status(200).json({'list':collection.recordset,'sample':sample.recordset});

                });

            });
});



app.get('/finance/collection/list/year/:year', (req, res) => {
    const monthListSql = `
        select 

            MONTH(o.Tarih) as Ay

        from OdemelerTB o
        where YEAR(o.Tarih) = '${req.params.year}'
        group by MONTH(o.Tarih)
        order by MONTH(o.Tarih) desc
            `;
            mssql.query(monthListSql,(err,months)=>{
                const month = months.recordset[0].Ay;
                const collectionSql = `
                                        select o.ID,o.Tarih,o.MusteriID,m.FirmaAdi,o.Tutar,o.SiparisNo from OdemelerTB o 
                    inner join MusterilerTB m on m.ID = o.MusteriID
                    where YEAR(o.Tarih) = '${req.params.year}' and MONTH(o.Tarih) ='${month}'
                    order by o.Tarih desc  
                `;
                mssql.query(collectionSql, (err, collection) => {
                    const collectionSampleListSql = `
                    select numune.Tarih,numune.NumuneNo,numune.Tutar,numune.Banka,ytm.MusteriAdi
                    from NumuneOdemelerTB numune
                    inner join YeniTeklif_MusterilerTB ytm on ytm.Id = numune.MusteriID
                    where YEAR(numune.Tarih) = ${req.params.year} 
                                        `;
                    mssql.query(collectionSampleListSql,(err,sample)=>{
                        res.status(200).json({ 'list': collection.recordset, 'months': months.recordset,'sample':sample.recordset });

                    });
                });
            });
});
app.get('/finance/collection/list/month/:month/:year', (req, res) => {
    const collectionSql = `
        select o.ID,o.Tarih,o.MusteriID,m.FirmaAdi,o.Tutar,o.SiparisNo from OdemelerTB o 
                    inner join MusterilerTB m on m.ID = o.MusteriID
                    where YEAR(o.Tarih) = '${req.params.year}' and MONTH(o.Tarih) ='${req.params.month}'
                    order by o.Tarih desc  
        `;
    mssql.query(collectionSql,(err,collection)=>{
       res.status(200).json({'list':collection.recordset});
    });
});

app.get('/finance/advanced/payment/list', (req, res) => {
    const advancedPaymentSql = `
         select
            s.SiparisNo,
            m.FirmaAdi,
            s.MusteriID,
            Sum(s.Pesinat) as Pesinat,
            dbo.Finance_Paid_List_Po(s.SiparisNo) as Odenen,
            (select k.MailAdres from KullaniciTB k where s.SiparisSahibi = k.ID) as Mail,
			 m.Marketing,
             (sum(s.Pesinat)) - dbo.Finance_Paid_List_Po(s.SiparisNo) as Kalan

            from
            SiparislerTB s,MusterilerTB m
            where
            s.SiparisDurumID in (1,2)
            and s.Pesinat >0
            and m.ID = s.MusteriID
            group by s.SiparisNo,s.MusteriID,m.FirmaAdi,m.Marketing,s.siparisSahibi,s.SiparisTarihi
            order by s.SiparisTarihi desc

    `;
    mssql.query(advancedPaymentSql, (err, advancedPayment) => {
       const list = [];
        advancedPayment.recordset.forEach(x=>{
           if((x.Pesinat - noneControl(x.Odenen)) >0){
               list.push(x);
            } 
        });
       res.status(200).json({'list':list}) 
    });
});
app.post('/finance/advanced/payment/save', (req, res) =>{
    const advancedPaymentInsertSql = `
        insert into OdemelerTB(
	        Tarih,
            MusteriID,
            SiparisNo,
            FinansOdemeTurID,
            Aciklama,
            Tutar,
            Masraf,
            KullaniciID,
            Kur
        )
        VALUES(
            '${req.body.Tarih}',
            '${req.body.MusteriID}',
            '${req.body.SiparisNo}',
            '${req.body.FinansOdemeTurID}',
            '${req.body.Aciklama}',
            '${req.body.Tutar}',
            '${req.body.Masraf}',
            '${req.body.KullaniciID}',
            '${req.body.Kur}'

        )
    `;
    const changePoStatusSql = `update SiparislerTB SET SiparisDurumID=2 where SiparisNo='${req.body.SiparisNo}'`;

    mssql.query(advancedPaymentInsertSql, (err, advancedPayment) => {
        if(advancedPayment.rowsAffected[0] == 1){
            mssql.query(changePoStatusSql, (err, poStatus) => {
                if(poStatus.rowsAffected[0] == 1){
                                    res.status(200).json({ 'status': true });

                }else{
                                res.status(200).json({'status':false});

                }
            })
        }else{
            res.status(200).json({'status':false});
        }
    })
});
app.get('/finance/po/list/:customerId', (req, res) => {
    const poListSql = `
       select 
	sd.Durum,
	s.SiparisTarihi,
	s.YuklemeTarihi,
	s.SiparisNo,
	m.FirmaAdi,
	(
		s.NavlunSatis + s.DetayTutar_1 + s.DetayTutar_2 + s.DetayTutar_3 + dbo.Finance_Detail_Po_Order_Total(s.SiparisNo) + s.sigorta_tutar_satis
	) as OrderTotal,
	s.Pesinat,
	dbo.Finance_Detail_Po_Advanced_Payment_Total(s.SiparisNo) as Paid,
    s.MusteriID,
    s.MayaControl

from SiparislerTB s
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisDurumTB sd on sd.ID = s.SiparisDurumID


where s.MusteriID = ${req.params.customerId}

order by s.YuklemeTarihi desc
    `;
    const paidListSql = `
        select o.Tarih,sum(o.Tutar) as Paid from OdemelerTB o
        where o.MusteriID=${req.params.customerId}
        group by o.Tarih 
        order by o.Tarih desc
    `;
    const insuranceListSql = `select sigorta_tutar_satis,SiparisNo from SiparislerTB where MusteriID='${req.params.customerId}' order by YuklemeTarihi desc`;
    mssql.query(poListSql, (err, poList) => {
        const poListData = [];
        poList.recordset.forEach(x => {
            x.Balanced = x.OrderTotal - x.Paid;
            if (x.Durum == 'Sevk Edilen') {
                x.Pesinat = 0;
            };
        });
        const uretimde = poList.recordset.filter(x=>x.Durum == 'Üretimde' || x.Durum == 'Beklemede')
        const sevkiyatta = poList.recordset.filter(x => x.Durum == 'Sevk Edilen');
        uretimde.forEach(x => {
            poListData.push(x); 
        });
        sevkiyatta.forEach(x => {
            poListData.push(x);
        });

        const acikpo = poListData.filter(x => (x.OrderTotal - x.Paid) > 8);
        const kapalipo = poListData.filter(x => (x.OrderTotal - x.Paid) <= 8);

        const finalDatas = [];
        acikpo.forEach(x => {
            finalDatas.push(x); 
        });
        kapalipo.forEach(x => {
            finalDatas.push(x);
        })


        mssql.query(paidListSql, (err, paidList) => {
            mssql.query(insuranceListSql,(err,insurance)=>{
                res.status(200).json({ 'poList': finalDatas,'paidList':paidList.recordset ,'insuranceList':insurance.recordset});

            });

        });
    });
});
app.post('/finance/po/paid/save', (req, res) => {

    const paidInsertSql = `
        insert into OdemelerTB(
	        Tarih,
            MusteriID,
            SiparisNo,
            FinansOdemeTurID,
            Aciklama,
            Tutar,
            Masraf,
            KullaniciID,
            Kur
        )
        VALUES(
            '${req.body.Tarih}',
            '${req.body.MusteriID}',
            '${req.body.SiparisNo}',
            '${req.body.FinansOdemeTurID}',
            '${req.body.Aciklama}',
            '${req.body.Tutar}',
            '${req.body.Masraf}',
            '${req.body.KullaniciID}',
            '${req.body.Kur}'

        )
    `;
    mssql.query(paidInsertSql,(err,paid)=>{
        if(paid.rowsAffected[0] == 1){
            res.status(200).json({ 'status': true });    
        } else{
            res.status(200).json({ 'status': false });
        }
    })
});
app.get('/finance/po/paid/list/:po', (req, res) => {
    const poPaidListSql = `
        select 

	o.ID,
	o.Tarih,
	o.MusteriID,
	o.SiparisNo,
	o.FinansOdemeTurID,
	o.Aciklama,
	o.Tutar,
	o.Masraf,
	o.KullaniciID,
	o.Kur,
	m.FirmaAdi,
	k.KullaniciAdi

from OdemelerTB o
inner join MusterilerTB m on m.ID = o.MusteriID
inner join KullaniciTB k on k.ID = o.KullaniciID
where o.SiparisNo='${req.params.po}'
    `;
    mssql.query(poPaidListSql, (err, paidList) => {
        res.status(200).json({ 'list': paidList.recordset });
    });
});
app.delete('/finance/po/paid/delete/:id',(req,res)=>{
    const poPaidDeleteSql = `delete OdemelerTB where ID='${req.params.id}'`;
    mssql.query(poPaidDeleteSql, (err, paid) => {
        if (paid.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        } else {
            res.status(200).json({ 'status': false });
            
        }
    });
});

app.delete('/finance/po/paid/delete/mekmer/:id',(req,res)=>{
    const poPaidDeleteSql = `delete Odemeler_MekmerTB where ID='${req.params.id}'`;
    mssql.query(poPaidDeleteSql, (err, paid) => {
        if (paid.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        } else {
            res.status(200).json({ 'status': false });
            
        }
    });
});


app.put('/finance/po/paid/update', (req, res) => {
    const poPaidUpdateSql = `
        update OdemelerTB
        SET
            Tarih='${req.body.Tarih}',
            Aciklama='${req.body.Aciklama}',
            Tutar='${req.body.Tutar}',
            Masraf='${req.body.Masraf}',
            KullaniciID='${req.body.KullaniciID}',
            Kur='${req.body.Kur}'

        WHERE 
		 ID='${req.body.ID}'
    `;

    mssql.query(poPaidUpdateSql, (err, paid) => {
        if (paid.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        } else {
            res.status(200).json({ 'status': false });
        }
    })
});
app.get('/finance/po/paid/detail/list/:date/:customerId', (req, res) => {
    const paidDetailListSql = `
        select 

	o.ID,
	o.Tarih,
	o.MusteriID,
	o.SiparisNo,
	o.FinansOdemeTurID,
	o.Tutar,
	o.Masraf,
	o.Aciklama,
	o.Kur,
	o.KullaniciID,
	m.FirmaAdi,
	k.KullaniciAdi

from OdemelerTB o
inner join MusterilerTB m on m.ID = o.MusteriID
inner join KullaniciTB k on k.ID = o.KullaniciID

where o.Tarih='${req.params.date}' and o.MusteriID = '${req.params.customerId}'
    `;
    mssql.query(paidDetailListSql,(err,paid)=>{
        res.status(200).json({ 'list': paid.recordset }); 
    });
});

app.put('/finance/po/paid/update/mekmer', (req, res) => {
    const poPaidUpdateSql = `
        update Odemeler_MekmerTB
        SET
            Tarih='${req.body.tarih}',
            Aciklama='${req.body.aciklama}',
            Tutar='${req.body.tutar}',
            Masraf='${req.body.masraf}',
            KullaniciID='${req.body.KullaniciID}',
            Kur='${req.body.kur}'

        WHERE 
		 ID='${req.body.id}'
    `;

    mssql.query(poPaidUpdateSql, (err, paid) => {
        if (paid.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        } else {
            res.status(200).json({ 'status': false });
        }
    })
});
app.post('/finance/cost/control',(req,res)=>{
    const sql = `
        insert into Finance_Cost_Logs(
        Date,
        Po,
        Freight_Selling,
        Freight_Purchase,
        Detail_1_Selling,
        Detail_2_Selling,
        Detail_3_Selling,
        Detail_1_Purchase,
        Detail_2_Purchase,
        Detail_3_Purchase)
        VALUES('${req.body.now}','${req.body.po}','${req.body.freight_selling}','${req.body.freight_purchase}','${req.body.detail_1_selling}','${req.body.detail_2_selling}','${req.body.detail_3_selling}','${req.body.detail_1_purchase}','${req.body.detail_2_purchase}','${req.body.detail_3_purchase}')
    `;
    mssql.query(sql);
});
function __amountControl(val){
    if(val == 0 || val == undefined || val == '' || val == ' ' || val == null){
        return 0;
    }else{
        return +val.toFixed(2);
    }
};






/*Orders*/
app.get('/order/production/list', async (req, res) => {
    const ordersListSql = `
select 

	s.ID as SiparisId,
s.SiparisNo,
s.SiparisTarihi,
s.OdemeTurID,
ot.OdemeTur,
s.TeslimTurID,
stt.TeslimTur,
s.MusteriID,
m.FirmaAdi,
s.Pesinat,
s.NavlunFirma,
s.NavlunMekmarNot,
s.NavlunAlis,
s.NavlunSatis,
s.KayitTarihi,
s.KullaniciID,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
s.SiparisDurumID,
sdt.Durum,
s.UretimAciklama,
s.SevkiyatAciklama,
s.FinansAciklama,
s.OdemeAciklama,
s.TahminiYuklemeTarihi,
s.YuklemeTarihi,
s.FaturaNo,
s.SiparisFaturaNo,
s.Vade,
s.Ulke,
s.Komisyon,
s.DetayAciklama_1,
s.DetayMekmarNot_1,
s.DetayTutar_1,
s.DetayAlis_1,
s.DetayAciklama_2,
s.DetayMekmarNot_2,
s.DetayTutar_2,
s.DetayAlis_2,
s.DetayAciklama_3,
s.DetayMekmarNot_3,
s.DetayTutar_3,
s.DetayAlis_3,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
s.EvrakGideri,
s.Eta,
s.UlkeId,
ytu.UlkeAdi,
fst.FaturaAdi,
s.depo_yukleme,
s.DetayTutar_4,
s.DetayAciklama_4,
s.sigorta_Tutar,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
(select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
(select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
s.SiparisSahibi,
s.Operasyon,
s.Finansman,
s.Iade,
s.MalBedeli,
s.sigorta_tutar_satis,
s.KonteynerAyrinti,
s.MayaControl,
s.FaturaKesimTurID,
s.KonteynerNo,
s.SiparisKontrol,
s.SiparisKontrolEden,


	su.ID as UrunId,
	su.SiparisNo as UrunSiparisNo,
	su.TedarikciID,
	t.FirmaAdi as UrunFirmaAdi,
	su.UrunKartID,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	su.UrunBirimID,
	ub.BirimAdi,
	su.Miktar,
	su.OzelMiktar,
	su.KasaAdet,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama as UrunUretimAciklama,
	su.MusteriAciklama as UrunMusteriAciklama,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.Adet,
    ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
    dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum,
    dbo.Order_Total_Production_2(su.UrunKartID,su.SiparisNo,su.TedarikciID) as Uretim,
    dbo.Production_Isf_Document_Control4(su.SiparisNo,su.TedarikciID) as Isf,
	(select top 1 uretim.Disarda from UretimTB uretim where uretim.SiparisAciklama = su.SiparisNo and uretim.UrunKartID = su.UrunKartID and uretim.Disarda = 1) as Out


from SiparisUrunTB su
inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
inner join SiparisTeslimTurTB stt on stt.ID = s.TeslimTurID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID
inner join YeniTeklif_UlkeTB ytu on ytu.Id = s.UlkeId
inner join FaturaKesilmeTB fst on fst.ID = s.FaturaKesimTurID

where s.SiparisDurumID = 2 and m.Marketing= 'Mekmar'
order by s.SiparisTarihi desc



    `;
    const orderYearListSql = `
        select YEAR(s.SiparisTarihi) as Yil from SiparislerTB s
        group by YEAR(s.SiparisTarihi) 
        order by YEAR(s.SiparisTarihi) desc
    `;
   await mssql.query(ordersListSql, async (err, orders) => {
        await mssql.query(orderYearListSql, async (err, years) => {
            let customYearList = [];
            let ordersList = [];
            years.recordset.forEach(x => {
                customYearList.push(x);
            });
            orders.recordset.forEach(x => {
                if (__amountControl(x.Uretim) == __amountControl(x.Miktar)) {
                    ordersList.push({...x,style:"background-color: green; color: white"})
                } else if (__amountControl(x.Uretim) > __amountControl(x.Miktar)) {

                    ordersList.push({ ...x, style: "background-color: black; color: white" });
                } else if ((__amountControl(x.Uretim) < __amountControl(x.Miktar) && __amountControl(x.Uretim) != 0)) {

                    ordersList.push({ ...x, style: "background-color: yellow; color: black" });
                }else{
                    ordersList.push({ ...x, style: "background-color:transparent; color: black" });

                }
            });
               await res.status(200).json({'list':ordersList,'years':customYearList});

        });
    });
});

app.get('/order/production/mekmer/list', async (req, res) => {
    const ordersListSqlMekmar = `
select 

	s.ID as SiparisId,
s.SiparisNo,
s.SiparisTarihi,
s.OdemeTurID,
ot.OdemeTur,
s.TeslimTurID,
stt.TeslimTur,
s.MusteriID,
m.FirmaAdi,
s.Pesinat,
s.NavlunFirma,
s.NavlunMekmarNot,
s.NavlunAlis,
s.NavlunSatis,
s.KayitTarihi,
s.KullaniciID,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
s.SiparisDurumID,
sdt.Durum,
s.UretimAciklama,
s.SevkiyatAciklama,
s.FinansAciklama,
s.OdemeAciklama,
s.TahminiYuklemeTarihi,
s.YuklemeTarihi,
s.FaturaNo,
s.SiparisFaturaNo,
s.Vade,
s.Ulke,
s.Komisyon,
s.DetayAciklama_1,
s.DetayMekmarNot_1,
s.DetayTutar_1,
s.DetayAlis_1,
s.DetayAciklama_2,
s.DetayMekmarNot_2,
s.DetayTutar_2,
s.DetayAlis_2,
s.DetayAciklama_3,
s.DetayMekmarNot_3,
s.DetayTutar_3,
s.DetayAlis_3,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
s.EvrakGideri,
s.Eta,
s.UlkeId,
ytu.UlkeAdi,
fst.FaturaAdi,
s.depo_yukleme,
s.DetayTutar_4,
s.DetayAciklama_4,
s.sigorta_Tutar,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
(select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
(select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
s.SiparisSahibi,
s.Operasyon,
s.Finansman,
s.Iade,
s.MalBedeli,
s.sigorta_tutar_satis,
s.KonteynerAyrinti,
s.MayaControl,
s.FaturaKesimTurID,
s.KonteynerNo,


	su.ID as UrunId,
	su.SiparisNo as UrunSiparisNo,
	su.TedarikciID,
	t.FirmaAdi as UrunFirmaAdi,
	su.UrunKartID,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	su.UrunBirimID,
	ub.BirimAdi,
	su.Miktar,
	su.OzelMiktar,
	su.KasaAdet,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama as UrunUretimAciklama,
	su.MusteriAciklama as UrunMusteriAciklama,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.Adet,
    ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
    dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum,
    dbo.Order_Total_Production_2(su.UrunKartID,su.SiparisNo,su.TedarikciID) as Uretim,
    dbo.Production_Isf_Document_Control4(su.SiparisNo,su.TedarikciID) as Isf


from SiparisUrunTB su
inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
inner join SiparisTeslimTurTB stt on stt.ID = s.TeslimTurID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID
inner join YeniTeklif_UlkeTB ytu on ytu.Id = s.UlkeId
inner join FaturaKesilmeTB fst on fst.ID = s.FaturaKesimTurID

where s.SiparisDurumID = 2 and su.TedarikciID in (1,123) and m.Marketing='Mekmar'
order by s.SiparisTarihi desc



    `;
        const ordersListSqlMekmer = `
select 

	s.ID as SiparisId,
s.SiparisNo,
s.SiparisTarihi,
s.OdemeTurID,
ot.OdemeTur,
s.TeslimTurID,
stt.TeslimTur,
s.MusteriID,
m.FirmaAdi,
s.Pesinat,
s.NavlunFirma,
s.NavlunMekmarNot,
s.NavlunAlis,
s.NavlunSatis,
s.KayitTarihi,
s.KullaniciID,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
s.SiparisDurumID,
sdt.Durum,
s.UretimAciklama,
s.SevkiyatAciklama,
s.FinansAciklama,
s.OdemeAciklama,
s.TahminiYuklemeTarihi,
s.YuklemeTarihi,
s.FaturaNo,
s.SiparisFaturaNo,
s.Vade,
s.Ulke,
s.Komisyon,
s.DetayAciklama_1,
s.DetayMekmarNot_1,
s.DetayTutar_1,
s.DetayAlis_1,
s.DetayAciklama_2,
s.DetayMekmarNot_2,
s.DetayTutar_2,
s.DetayAlis_2,
s.DetayAciklama_3,
s.DetayMekmarNot_3,
s.DetayTutar_3,
s.DetayAlis_3,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
s.EvrakGideri,
s.Eta,
s.UlkeId,
ytu.UlkeAdi,
fst.FaturaAdi,
s.depo_yukleme,
s.DetayTutar_4,
s.DetayAciklama_4,
s.sigorta_Tutar,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
(select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
(select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
s.SiparisSahibi,
s.Operasyon,
s.Finansman,
s.Iade,
s.MalBedeli,
s.sigorta_tutar_satis,
s.KonteynerAyrinti,
s.MayaControl,
s.FaturaKesimTurID,
s.KonteynerNo,


	su.ID as UrunId,
	su.SiparisNo as UrunSiparisNo,
	su.TedarikciID,
	t.FirmaAdi as UrunFirmaAdi,
	su.UrunKartID,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	su.UrunBirimID,
	ub.BirimAdi,
	su.Miktar,
	su.OzelMiktar,
	su.KasaAdet,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama as UrunUretimAciklama,
	su.MusteriAciklama as UrunMusteriAciklama,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.Adet,
    ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
    dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum,
dbo.Order_Total_Production_2(su.UrunKartID,su.SiparisNo,su.TedarikciID) as Uretim,
    dbo.Production_Isf_Document_Control4(su.SiparisNo,su.TedarikciID) as Isf


from SiparisUrunTB su
inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
inner join SiparisTeslimTurTB stt on stt.ID = s.TeslimTurID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID
inner join YeniTeklif_UlkeTB ytu on ytu.Id = s.UlkeId
inner join FaturaKesilmeTB fst on fst.ID = s.FaturaKesimTurID

where s.SiparisDurumID = 2 and m.Marketing in ('Mekmer','İç Piyasa','Imperial Homes')
order by s.SiparisTarihi desc



    `;
    const orderYearListSql = `
        select YEAR(s.SiparisTarihi) as Yil from SiparislerTB s
group by YEAR(s.SiparisTarihi) 
order by YEAR(s.SiparisTarihi) desc
    `;
    const ordersİscilikSqlMekmar = `
        select 


		s.ID as SiparisId,
s.SiparisNo,
s.SiparisTarihi,
s.OdemeTurID,
ot.OdemeTur,
s.TeslimTurID,
stt.TeslimTur,
s.MusteriID,
m.FirmaAdi,
s.Pesinat,
s.NavlunFirma,
s.NavlunMekmarNot,
s.NavlunAlis,
s.NavlunSatis,
s.KayitTarihi,
s.KullaniciID,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
s.SiparisDurumID,
sdt.Durum,
s.UretimAciklama,
s.SevkiyatAciklama,
s.FinansAciklama,
s.OdemeAciklama,
s.TahminiYuklemeTarihi,
s.YuklemeTarihi,
s.FaturaNo,
s.SiparisFaturaNo,
s.Vade,
s.Ulke,
s.Komisyon,
s.DetayAciklama_1,
s.DetayMekmarNot_1,
s.DetayTutar_1,
s.DetayAlis_1,
s.DetayAciklama_2,
s.DetayMekmarNot_2,
s.DetayTutar_2,
s.DetayAlis_2,
s.DetayAciklama_3,
s.DetayMekmarNot_3,
s.DetayTutar_3,
s.DetayAlis_3,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
s.EvrakGideri,
s.Eta,
s.UlkeId,
ytu.UlkeAdi,
fst.FaturaAdi,
s.depo_yukleme,
s.DetayTutar_4,
s.DetayAciklama_4,
s.sigorta_Tutar,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
(select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
(select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
s.SiparisSahibi,
s.Operasyon,
s.Finansman,
s.Iade,
s.MalBedeli,
s.sigorta_tutar_satis,
s.KonteynerAyrinti,
s.MayaControl,
s.FaturaKesimTurID,
s.KonteynerNo,


	su.ID as UrunId,
	su.SiparisNo as UrunSiparisNo,
	su.TedarikciID,
	t.FirmaAdi as UrunFirmaAdi,
	su.UrunKartID,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	su.UrunBirimID,
	ub.BirimAdi,
	su.Miktar,
	su.OzelMiktar,
	su.KasaAdet,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama as UrunUretimAciklama,
	su.MusteriAciklama as UrunMusteriAciklama,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.Adet,
    ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
    dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum,
    dbo.Order_Total_Production_2(su.UrunKartID,su.SiparisNo,su.TedarikciID) as Uretim,
    dbo.Production_Isf_Document_Control4(su.SiparisNo,su.TedarikciID) as Isf




from SiparisEkstraGiderlerTB seg
inner join SiparislerTB s on s.SiparisNo=seg.SiparisNo
inner join SiparisUrunTB su on su.UrunKartID = seg.UrunKartId
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
inner join SiparisTeslimTurTB stt on stt.ID = s.TeslimTurID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID
inner join YeniTeklif_UlkeTB ytu on ytu.Id = s.UlkeId
inner join FaturaKesilmeTB fst on fst.ID = s.FaturaKesimTurID


where s.SiparisDurumID=2 and seg.TedarikciID=1
    `;
    await mssql.query(ordersListSqlMekmer, async (err, ordersMekmer) => {
        await mssql.query(ordersListSqlMekmar, async (err, ordersMekmar) => {
                    await mssql.query(orderYearListSql, async(err, years) => {
                        await mssql.query(ordersİscilikSqlMekmar,(err,iscilik)=>{
                            let customYearList = [];
                            years.recordset.forEach(x => {
                                customYearList.push(x);
                            });
                            let orders = ordersMekmer.recordset.concat(ordersMekmar.recordset)

                               res.status(200).json({'list':orders.concat(iscilik.recordset),'years':customYearList});
                
                        }); 
                    });

        });



    });
});
app.get('/order/onhold/mekmer/list', async (req, res) => {
    const ordersListSql = `
select 

	s.ID as SiparisId,
s.SiparisNo,
s.SiparisTarihi,
s.OdemeTurID,
ot.OdemeTur,
s.TeslimTurID,
stt.TeslimTur,
s.MusteriID,
m.FirmaAdi,
s.Pesinat,
s.NavlunFirma,
s.NavlunMekmarNot,
s.NavlunAlis,
s.NavlunSatis,
s.KayitTarihi,
s.KullaniciID,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
s.SiparisDurumID,
sdt.Durum,
s.UretimAciklama,
s.SevkiyatAciklama,
s.FinansAciklama,
s.OdemeAciklama,
s.TahminiYuklemeTarihi,
s.YuklemeTarihi,
s.FaturaNo,
s.SiparisFaturaNo,
s.Vade,
s.Ulke,
s.Komisyon,
s.DetayAciklama_1,
s.DetayMekmarNot_1,
s.DetayTutar_1,
s.DetayAlis_1,
s.DetayAciklama_2,
s.DetayMekmarNot_2,
s.DetayTutar_2,
s.DetayAlis_2,
s.DetayAciklama_3,
s.DetayMekmarNot_3,
s.DetayTutar_3,
s.DetayAlis_3,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
s.EvrakGideri,
s.Eta,
s.UlkeId,
ytu.UlkeAdi,
fst.FaturaAdi,
s.depo_yukleme,
s.DetayTutar_4,
s.DetayAciklama_4,
s.sigorta_Tutar,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
(select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
(select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
s.SiparisSahibi,
s.Operasyon,
s.Finansman,
s.Iade,
s.MalBedeli,
s.sigorta_tutar_satis,
s.KonteynerAyrinti,
s.MayaControl,
s.FaturaKesimTurID,
s.KonteynerNo,
s.SiparisKontrol,
s.SiparisKontrolEden,


	su.ID as UrunId,
	su.SiparisNo as UrunSiparisNo,
	su.TedarikciID,
	t.FirmaAdi as UrunFirmaAdi,
	su.UrunKartID,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	su.UrunBirimID,
	ub.BirimAdi,
	su.Miktar,
	su.OzelMiktar,
	su.KasaAdet,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama as UrunUretimAciklama,
	su.MusteriAciklama as UrunMusteriAciklama,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.Adet,
    ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
    dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum,
    dbo.Order_Total_Production(su.UrunKartID,su.SiparisNo) as Uretim,
    dbo.Production_Isf_Document_Control4(su.SiparisNo,su.TedarikciID) as Isf


from SiparisUrunTB su
inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
inner join SiparisTeslimTurTB stt on stt.ID = s.TeslimTurID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID
inner join YeniTeklif_UlkeTB ytu on ytu.Id = s.UlkeId
inner join FaturaKesilmeTB fst on fst.ID = s.FaturaKesimTurID

where s.SiparisDurumID = 1 and su.TedarikciID in (1,123)
order by s.SiparisTarihi desc



    `;
    const orderYearListSql = `
        select YEAR(s.SiparisTarihi) as Yil from SiparislerTB s
group by YEAR(s.SiparisTarihi) 
order by YEAR(s.SiparisTarihi) desc
    `;
   await mssql.query(ordersListSql, async (err, orders) => {
        await mssql.query(orderYearListSql, (err, years) => {
            let customYearList = [];
            years.recordset.forEach(x => {
                customYearList.push(x);
            });
               res.status(200).json({'list':orders.recordset,'years':customYearList});

        });
    });
});

app.get('/order/production/mekmer2/list', async (req, res) => {
    const ordersListSql = `
select 

	s.ID as SiparisId,
s.SiparisNo,
s.SiparisTarihi,
s.OdemeTurID,
ot.OdemeTur,
s.TeslimTurID,
stt.TeslimTur,
s.MusteriID,
m.FirmaAdi,
s.Pesinat,
s.NavlunFirma,
s.NavlunMekmarNot,
s.NavlunAlis,
s.NavlunSatis,
s.KayitTarihi,
s.KullaniciID,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
s.SiparisDurumID,
sdt.Durum,
s.UretimAciklama,
s.SevkiyatAciklama,
s.FinansAciklama,
s.OdemeAciklama,
s.TahminiYuklemeTarihi,
s.YuklemeTarihi,
s.FaturaNo,
s.SiparisFaturaNo,
s.Vade,
s.Ulke,
s.Komisyon,
s.DetayAciklama_1,
s.DetayMekmarNot_1,
s.DetayTutar_1,
s.DetayAlis_1,
s.DetayAciklama_2,
s.DetayMekmarNot_2,
s.DetayTutar_2,
s.DetayAlis_2,
s.DetayAciklama_3,
s.DetayMekmarNot_3,
s.DetayTutar_3,
s.DetayAlis_3,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
s.EvrakGideri,
s.Eta,
s.UlkeId,
ytu.UlkeAdi,
fst.FaturaAdi,
s.depo_yukleme,
s.DetayTutar_4,
s.DetayAciklama_4,
s.sigorta_Tutar,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
(select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
(select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
s.SiparisSahibi,
s.Operasyon,
s.Finansman,
s.Iade,
s.MalBedeli,
s.sigorta_tutar_satis,
s.KonteynerAyrinti,
s.MayaControl,
s.FaturaKesimTurID,
s.KonteynerNo,


	su.ID as UrunId,
	su.SiparisNo as UrunSiparisNo,
	su.TedarikciID,
	t.FirmaAdi as UrunFirmaAdi,
	su.UrunKartID,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	su.UrunBirimID,
	ub.BirimAdi,
	su.Miktar,
	su.OzelMiktar,
	su.KasaAdet,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama as UrunUretimAciklama,
	su.MusteriAciklama as UrunMusteriAciklama,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.Adet,
    ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
    dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum,
dbo.Order_Total_Production_2(su.UrunKartID,su.SiparisNo,su.TedarikciID) as Uretim,
    dbo.Production_Isf_Document_Control4(su.SiparisNo,su.TedarikciID) as Isf


from SiparisUrunTB su
inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
inner join SiparisTeslimTurTB stt on stt.ID = s.TeslimTurID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID
inner join YeniTeklif_UlkeTB ytu on ytu.Id = s.UlkeId
inner join FaturaKesilmeTB fst on fst.ID = s.FaturaKesimTurID

where s.SiparisDurumID = 2 and m.Marketing in ('Mekmer','İç Piyasa','Imperial Homes')
order by s.SiparisTarihi desc



    `;
    const orderYearListSql = `
        select YEAR(s.SiparisTarihi) as Yil from SiparislerTB s
group by YEAR(s.SiparisTarihi) 
order by YEAR(s.SiparisTarihi) desc
    `;
   await mssql.query(ordersListSql, async (err, orders) => {
        await mssql.query(orderYearListSql, (err, years) => {
            let customYearList = [];
            years.recordset.forEach(x => {
                customYearList.push(x);
            });
               res.status(200).json({'list':orders.recordset,'years':customYearList});

        });
    });
});





app.get('/order/production/list/year/:year', async (req, res) => {
    const productionListYearSql = `
        select 

	s.ID as SiparisId,
s.SiparisNo,
s.SiparisTarihi,
s.OdemeTurID,
ot.OdemeTur,
s.TeslimTurID,
stt.TeslimTur,
s.MusteriID,
m.FirmaAdi,
s.Pesinat,
s.NavlunFirma,
s.NavlunMekmarNot,
s.NavlunAlis,
s.NavlunSatis,
s.KayitTarihi,
s.KullaniciID,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
s.SiparisDurumID,
sdt.Durum,
s.UretimAciklama,
s.SevkiyatAciklama,
s.FinansAciklama,
s.OdemeAciklama,
s.TahminiYuklemeTarihi,
s.YuklemeTarihi,
s.FaturaNo,
s.SiparisFaturaNo,
s.Vade,
s.Ulke,
s.Komisyon,
s.DetayAciklama_1,
s.DetayMekmarNot_1,
s.DetayTutar_1,
s.DetayAlis_1,
s.DetayAciklama_2,
s.DetayMekmarNot_2,
s.DetayTutar_2,
s.DetayAlis_2,
s.DetayAciklama_3,
s.DetayMekmarNot_3,
s.DetayTutar_3,
s.DetayAlis_3,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
s.EvrakGideri,
s.Eta,
s.UlkeId,
ytu.UlkeAdi,
fst.FaturaAdi,
s.depo_yukleme,
s.DetayTutar_4,
s.DetayAciklama_4,
s.sigorta_Tutar,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
(select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
(select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
s.SiparisSahibi,
s.Operasyon,
s.Finansman,
s.Iade,
s.MalBedeli,
s.sigorta_tutar_satis,
s.KonteynerAyrinti,
s.MayaControl,
s.FaturaKesimTurID,
s.KonteynerNo,
s.SiparisKontrol,
s.SiparisKontrolEden,


	su.ID as UrunId,
	su.SiparisNo as UrunSiparisNo,
	su.TedarikciID,
	t.FirmaAdi as UrunFirmaAdi,
	su.UrunKartID,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	su.UrunBirimID,
	ub.BirimAdi,
	su.Miktar,
	su.OzelMiktar,
	su.KasaAdet,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama as UrunUretimAciklama,
	su.MusteriAciklama as UrunMusteriAciklama,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.Adet,
    ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
    dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum,
    dbo.Order_Total_Production(su.UrunKartID,su.SiparisNo) as Uretim,
    dbo.Production_Isf_Document_Control4(su.SiparisNo,su.TedarikciID) as Isf


from SiparisUrunTB su
inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
inner join SiparisTeslimTurTB stt on stt.ID = s.TeslimTurID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID
inner join YeniTeklif_UlkeTB ytu on ytu.Id = s.UlkeId
inner join FaturaKesilmeTB fst on fst.ID = s.FaturaKesimTurID

where s.SiparisDurumID = 2 and YEAR(s.SiparisTarihi) = '${req.params.year}' and m.Marketing= 'Mekmar'
order by s.SiparisTarihi desc

    `;
    await mssql.query(productionListYearSql,(err,production)=>{
        res.status(200).json({ 'list': production.recordset });
    });



});

app.get('/order/shipped/list', async (req, res) => {

        const orderYearListSql = `
        select YEAR(s.YuklemeTarihi) as Yil from SiparislerTB s
		inner join MusterilerTB m on m.ID = s.MusteriID
		where m.Marketing='Mekmar' and YEAR(s.YuklemeTarihi) is not null
		group by YEAR(s.YuklemeTarihi)  
		order by YEAR(s.YuklemeTarihi) desc
    `;
    await mssql.query(orderYearListSql, async(err, years) => {
        console.log('years.recordset[0].Yil',years.recordset[0].Yil)
        let customYearList = [];
        years.recordset.forEach(x => {
            customYearList.push(x);
        });
        const ordersListSql = `
        select 

        s.ID as SiparisId,
    s.SiparisNo,
    s.SiparisTarihi,
    s.OdemeTurID,
    ot.OdemeTur,
    s.TeslimTurID,
    (
        select stt.TeslimTur from SiparisTeslimTurTB stt where stt.ID = s.TeslimTurID
    ) as TeslimTur,
    s.MusteriID,
    m.FirmaAdi,
    s.Pesinat,
    s.NavlunFirma,
    s.NavlunMekmarNot,
    s.NavlunAlis,
    s.NavlunSatis,
    s.KayitTarihi,
    s.KullaniciID,
    (select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
    s.SiparisDurumID,
    sdt.Durum,
    s.UretimAciklama,
    s.SevkiyatAciklama,
    s.FinansAciklama,
    s.OdemeAciklama,
    s.TahminiYuklemeTarihi,
    s.YuklemeTarihi,
    s.FaturaNo,
    s.SiparisFaturaNo,
    s.Vade,
    s.Ulke,
    s.Komisyon,
    s.DetayAciklama_1,
    s.DetayMekmarNot_1,
    s.DetayTutar_1,
    s.DetayAlis_1,
    s.DetayAciklama_2,
    s.DetayMekmarNot_2,
    s.DetayTutar_2,
    s.DetayAlis_2,
    s.DetayAciklama_3,
    s.DetayMekmarNot_3,
    s.DetayTutar_3,
    s.DetayAlis_3,
    (select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
    s.EvrakGideri,
    s.Eta,
    s.UlkeId,
    (
        select ytu.UlkeAdi from YeniTeklif_UlkeTB ytu where ytu.Id = s.UlkeId
    ) as UlkeAdi,
    
    (
        select fst.FaturaAdi from FaturaKesilmeTB fst where fst.ID = s.FaturaKesimTurID
    ) as FaturaAdi,
    s.depo_yukleme,
    s.DetayTutar_4,
    s.DetayAciklama_4,
    s.sigorta_Tutar,
    (select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
    (select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
    (select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
    (select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
    s.SiparisSahibi,
    s.Operasyon,
    s.Finansman,
    s.Iade,
    s.MalBedeli,
    s.sigorta_tutar_satis,
    s.KonteynerAyrinti,
    s.MayaControl,
    s.FaturaKesimTurID,
    s.KonteynerNo,
    s.SiparisKontrol,
s.SiparisKontrolEden,
    
    
        su.ID as UrunId,
        su.SiparisNo as UrunSiparisNo,
        su.TedarikciID,
        t.FirmaAdi as UrunFirmaAdi,
        su.UrunKartID,
        k.KategoriAdi,
        urun.UrunAdi,
        yk.YuzeyIslemAdi,
        ol.En,
        ol.Boy,
        ol.Kenar,
        su.UrunBirimID,
        ub.BirimAdi,
        su.Miktar,
        su.OzelMiktar,
        su.KasaAdet,
        su.SatisFiyati,
        su.SatisToplam,
        su.UretimAciklama as UrunUretimAciklama,
        su.MusteriAciklama as UrunMusteriAciklama,
        su.AlisFiyati,
        su.SiraNo,
        su.Ton,
        su.Adet,
        ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
        dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum
    
    from SiparisUrunTB su
    inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
    inner join TedarikciTB t on t.ID = su.TedarikciID
    inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
    inner join UrunKartTB uk on uk.ID = su.UrunKartID
    inner join KategoriTB k on k.ID = uk.KategoriID
    inner join UrunlerTB urun on urun.ID = uk.UrunID
    inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
    inner join OlculerTB ol on ol.ID = uk.OlcuID
    inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
    inner join MusterilerTB m on m.ID = s.MusteriID
    inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID
    
    where s.SiparisDurumID = 3 and YEAR(s.YuklemeTarihi) = '${years.recordset[0].Yil}' and m.Marketing= 'Mekmar'
    order by s.YuklemeTarihi desc
    `;
        await mssql.query(ordersListSql,async (err, orders) => {
            res.status(200).json({'list':orders.recordset,'years':customYearList});

        });

    });

});

app.get('/order/shipped/mekmer/list', async (req, res) => {
        const ordersListSqlMekmar = `
select 

	s.ID as SiparisId,
s.SiparisNo,
s.SiparisTarihi,
s.OdemeTurID,
ot.OdemeTur,
s.TeslimTurID,
stt.TeslimTur,
s.MusteriID,
m.FirmaAdi,
s.Pesinat,
s.NavlunFirma,
s.NavlunMekmarNot,
s.NavlunAlis,
s.NavlunSatis,
s.KayitTarihi,
s.KullaniciID,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
s.SiparisDurumID,
sdt.Durum,
s.UretimAciklama,
s.SevkiyatAciklama,
s.FinansAciklama,
s.OdemeAciklama,
s.TahminiYuklemeTarihi,
s.YuklemeTarihi,
s.FaturaNo,
s.SiparisFaturaNo,
s.Vade,
s.Ulke,
s.Komisyon,
s.DetayAciklama_1,
s.DetayMekmarNot_1,
s.DetayTutar_1,
s.DetayAlis_1,
s.DetayAciklama_2,
s.DetayMekmarNot_2,
s.DetayTutar_2,
s.DetayAlis_2,
s.DetayAciklama_3,
s.DetayMekmarNot_3,
s.DetayTutar_3,
s.DetayAlis_3,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
s.EvrakGideri,
s.Eta,
s.UlkeId,
ytu.UlkeAdi,
fst.FaturaAdi,
s.depo_yukleme,
s.DetayTutar_4,
s.DetayAciklama_4,
s.sigorta_Tutar,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
(select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
(select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
s.SiparisSahibi,
s.Operasyon,
s.Finansman,
s.Iade,
s.MalBedeli,
s.sigorta_tutar_satis,
s.KonteynerAyrinti,
s.MayaControl,
s.FaturaKesimTurID,
s.KonteynerNo,


	su.ID as UrunId,
	su.SiparisNo as UrunSiparisNo,
	su.TedarikciID,
	t.FirmaAdi as UrunFirmaAdi,
	su.UrunKartID,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	su.UrunBirimID,
	ub.BirimAdi,
	su.Miktar,
	su.OzelMiktar,
	su.KasaAdet,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama as UrunUretimAciklama,
	su.MusteriAciklama as UrunMusteriAciklama,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.Adet,
    ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
    dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum,
    dbo.Order_Total_Production(su.UrunKartID,su.SiparisNo) as Uretim,
    dbo.Production_Isf_Document_Control4(su.SiparisNo,su.TedarikciID) as Isf


from SiparisUrunTB su
inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
inner join SiparisTeslimTurTB stt on stt.ID = s.TeslimTurID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID
inner join YeniTeklif_UlkeTB ytu on ytu.Id = s.UlkeId
inner join FaturaKesilmeTB fst on fst.ID = s.FaturaKesimTurID

where s.SiparisDurumID = 3 and su.TedarikciID in (1,123) and m.Marketing='Mekmar'
order by s.SiparisTarihi desc



    `;
        const ordersListSqlMekmer = `
select 

	s.ID as SiparisId,
s.SiparisNo,
s.SiparisTarihi,
s.OdemeTurID,
ot.OdemeTur,
s.TeslimTurID,
stt.TeslimTur,
s.MusteriID,
m.FirmaAdi,
s.Pesinat,
s.NavlunFirma,
s.NavlunMekmarNot,
s.NavlunAlis,
s.NavlunSatis,
s.KayitTarihi,
s.KullaniciID,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
s.SiparisDurumID,
sdt.Durum,
s.UretimAciklama,
s.SevkiyatAciklama,
s.FinansAciklama,
s.OdemeAciklama,
s.TahminiYuklemeTarihi,
s.YuklemeTarihi,
s.FaturaNo,
s.SiparisFaturaNo,
s.Vade,
s.Ulke,
s.Komisyon,
s.DetayAciklama_1,
s.DetayMekmarNot_1,
s.DetayTutar_1,
s.DetayAlis_1,
s.DetayAciklama_2,
s.DetayMekmarNot_2,
s.DetayTutar_2,
s.DetayAlis_2,
s.DetayAciklama_3,
s.DetayMekmarNot_3,
s.DetayTutar_3,
s.DetayAlis_3,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
s.EvrakGideri,
s.Eta,
s.UlkeId,
ytu.UlkeAdi,
fst.FaturaAdi,
s.depo_yukleme,
s.DetayTutar_4,
s.DetayAciklama_4,
s.sigorta_Tutar,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
(select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
(select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
s.SiparisSahibi,
s.Operasyon,
s.Finansman,
s.Iade,
s.MalBedeli,
s.sigorta_tutar_satis,
s.KonteynerAyrinti,
s.MayaControl,
s.FaturaKesimTurID,
s.KonteynerNo,


	su.ID as UrunId,
	su.SiparisNo as UrunSiparisNo,
	su.TedarikciID,
	t.FirmaAdi as UrunFirmaAdi,
	su.UrunKartID,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	su.UrunBirimID,
	ub.BirimAdi,
	su.Miktar,
	su.OzelMiktar,
	su.KasaAdet,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama as UrunUretimAciklama,
	su.MusteriAciklama as UrunMusteriAciklama,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.Adet,
    ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
    dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum,
    dbo.Order_Total_Production(su.UrunKartID,su.SiparisNo) as Uretim,
    dbo.Production_Isf_Document_Control4(su.SiparisNo,su.TedarikciID) as Isf


from SiparisUrunTB su
inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
inner join SiparisTeslimTurTB stt on stt.ID = s.TeslimTurID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID
inner join YeniTeklif_UlkeTB ytu on ytu.Id = s.UlkeId
inner join FaturaKesilmeTB fst on fst.ID = s.FaturaKesimTurID

where s.SiparisDurumID = 3 and m.Marketing in ('Mekmer','İç Piyasa','Imperial Homes')
order by s.SiparisTarihi desc



    `;
    const orderYearListSql = `
    select YEAR(s.SiparisTarihi) as Yil from SiparislerTB s
group by YEAR(s.SiparisTarihi) 
order by YEAR(s.SiparisTarihi) desc
`;
    await mssql.query(ordersListSqlMekmer, async (err, ordersMekmer) => {
        await mssql.query(ordersListSqlMekmar, async (err, ordersMekmar) => {
                    await mssql.query(orderYearListSql, (err, years) => {
            let customYearList = [];
            years.recordset.forEach(x => {
                customYearList.push(x);
            });
               res.status(200).json({'list':ordersMekmer.recordset.concat(ordersMekmar.recordset),'years':customYearList});

        });

        });



    });
});

app.get('/order/shipped/mekmer2/list', async (req, res) => {
          const ordersListSqlMekmar = `
select 

	s.ID as SiparisId,
s.SiparisNo,
s.SiparisTarihi,
s.OdemeTurID,
ot.OdemeTur,
s.TeslimTurID,
stt.TeslimTur,
s.MusteriID,
m.FirmaAdi,
s.Pesinat,
s.NavlunFirma,
s.NavlunMekmarNot,
s.NavlunAlis,
s.NavlunSatis,
s.KayitTarihi,
s.KullaniciID,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
s.SiparisDurumID,
sdt.Durum,
s.UretimAciklama,
s.SevkiyatAciklama,
s.FinansAciklama,
s.OdemeAciklama,
s.TahminiYuklemeTarihi,
s.YuklemeTarihi,
s.FaturaNo,
s.SiparisFaturaNo,
s.Vade,
s.Ulke,
s.Komisyon,
s.DetayAciklama_1,
s.DetayMekmarNot_1,
s.DetayTutar_1,
s.DetayAlis_1,
s.DetayAciklama_2,
s.DetayMekmarNot_2,
s.DetayTutar_2,
s.DetayAlis_2,
s.DetayAciklama_3,
s.DetayMekmarNot_3,
s.DetayTutar_3,
s.DetayAlis_3,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
s.EvrakGideri,
s.Eta,
s.UlkeId,
ytu.UlkeAdi,
fst.FaturaAdi,
s.depo_yukleme,
s.DetayTutar_4,
s.DetayAciklama_4,
s.sigorta_Tutar,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
(select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
(select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
s.SiparisSahibi,
s.Operasyon,
s.Finansman,
s.Iade,
s.MalBedeli,
s.sigorta_tutar_satis,
s.KonteynerAyrinti,
s.MayaControl,
s.FaturaKesimTurID,
s.KonteynerNo,


	su.ID as UrunId,
	su.SiparisNo as UrunSiparisNo,
	su.TedarikciID,
	t.FirmaAdi as UrunFirmaAdi,
	su.UrunKartID,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	su.UrunBirimID,
	ub.BirimAdi,
	su.Miktar,
	su.OzelMiktar,
	su.KasaAdet,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama as UrunUretimAciklama,
	su.MusteriAciklama as UrunMusteriAciklama,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.Adet,
    ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
    dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum,
    dbo.Order_Total_Production(su.UrunKartID,su.SiparisNo) as Uretim,
    dbo.Production_Isf_Document_Control4(su.SiparisNo,su.TedarikciID) as Isf


from SiparisUrunTB su
inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
inner join SiparisTeslimTurTB stt on stt.ID = s.TeslimTurID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID
inner join YeniTeklif_UlkeTB ytu on ytu.Id = s.UlkeId
inner join FaturaKesilmeTB fst on fst.ID = s.FaturaKesimTurID

where s.SiparisDurumID = 3 and su.TedarikciID in (1,123) and m.Marketing='Mekmar'
order by s.SiparisTarihi desc



    `;
        const ordersListSqlMekmer = `
select 

	s.ID as SiparisId,
s.SiparisNo,
s.SiparisTarihi,
s.OdemeTurID,
ot.OdemeTur,
s.TeslimTurID,
stt.TeslimTur,
s.MusteriID,
m.FirmaAdi,
s.Pesinat,
s.NavlunFirma,
s.NavlunMekmarNot,
s.NavlunAlis,
s.NavlunSatis,
s.KayitTarihi,
s.KullaniciID,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
s.SiparisDurumID,
sdt.Durum,
s.UretimAciklama,
s.SevkiyatAciklama,
s.FinansAciklama,
s.OdemeAciklama,
s.TahminiYuklemeTarihi,
s.YuklemeTarihi,
s.FaturaNo,
s.SiparisFaturaNo,
s.Vade,
s.Ulke,
s.Komisyon,
s.DetayAciklama_1,
s.DetayMekmarNot_1,
s.DetayTutar_1,
s.DetayAlis_1,
s.DetayAciklama_2,
s.DetayMekmarNot_2,
s.DetayTutar_2,
s.DetayAlis_2,
s.DetayAciklama_3,
s.DetayMekmarNot_3,
s.DetayTutar_3,
s.DetayAlis_3,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
s.EvrakGideri,
s.Eta,
s.UlkeId,
ytu.UlkeAdi,
fst.FaturaAdi,
s.depo_yukleme,
s.DetayTutar_4,
s.DetayAciklama_4,
s.sigorta_Tutar,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
(select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
(select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
s.SiparisSahibi,
s.Operasyon,
s.Finansman,
s.Iade,
s.MalBedeli,
s.sigorta_tutar_satis,
s.KonteynerAyrinti,
s.MayaControl,
s.FaturaKesimTurID,
s.KonteynerNo,


	su.ID as UrunId,
	su.SiparisNo as UrunSiparisNo,
	su.TedarikciID,
	t.FirmaAdi as UrunFirmaAdi,
	su.UrunKartID,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	su.UrunBirimID,
	ub.BirimAdi,
	su.Miktar,
	su.OzelMiktar,
	su.KasaAdet,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama as UrunUretimAciklama,
	su.MusteriAciklama as UrunMusteriAciklama,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.Adet,
    ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
    dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum,
    dbo.Order_Total_Production(su.UrunKartID,su.SiparisNo) as Uretim,
    dbo.Production_Isf_Document_Control4(su.SiparisNo,su.TedarikciID) as Isf


from SiparisUrunTB su
inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
inner join SiparisTeslimTurTB stt on stt.ID = s.TeslimTurID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID
inner join YeniTeklif_UlkeTB ytu on ytu.Id = s.UlkeId
inner join FaturaKesilmeTB fst on fst.ID = s.FaturaKesimTurID

where s.SiparisDurumID = 3 and m.Marketing in ('Mekmer','İç Piyasa','Imperial Homes')
order by s.SiparisTarihi desc



    `;
    const orderYearListSql = `
    select YEAR(s.SiparisTarihi) as Yil from SiparislerTB s
group by YEAR(s.SiparisTarihi) 
order by YEAR(s.SiparisTarihi) desc
`;
    await mssql.query(ordersListSqlMekmer, async (err, ordersMekmer) => {
        await mssql.query(ordersListSqlMekmar, async (err, ordersMekmar) => {
                    await mssql.query(orderYearListSql, (err, years) => {
            let customYearList = [];
            years.recordset.forEach(x => {
                customYearList.push(x);
            });
               res.status(200).json({'list':ordersMekmer.recordset.concat(ordersMekmar.recordset),'years':customYearList});

        });

        });



    });
});


app.post('/order/shipped/list/filter',async (req,res)=>{
    
    const company = req.body.company.charAt(0).toUpperCase() + req.body.company.slice(1);
    const po = req.body.po.toUpperCase();
    const width = req.body.width.charAt(0).toUpperCase() + req.body.width.slice(1);
    const ordersListSql = `
    select 

    s.ID as SiparisId,
s.SiparisNo,
s.SiparisTarihi,
s.OdemeTurID,
ot.OdemeTur,
s.TeslimTurID,
(
    select stt.TeslimTur from SiparisTeslimTurTB stt where stt.ID = s.TeslimTurID
) as TeslimTur,
s.MusteriID,
m.FirmaAdi,
s.Pesinat,
s.NavlunFirma,
s.NavlunMekmarNot,
s.NavlunAlis,
s.NavlunSatis,
s.KayitTarihi,
s.KullaniciID,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
s.SiparisDurumID,
sdt.Durum,
s.UretimAciklama,
s.SevkiyatAciklama,
s.FinansAciklama,
s.OdemeAciklama,
s.TahminiYuklemeTarihi,
s.YuklemeTarihi,
s.FaturaNo,
s.SiparisFaturaNo,
s.Vade,
s.Ulke,
s.Komisyon,
s.DetayAciklama_1,
s.DetayMekmarNot_1,
s.DetayTutar_1,
s.DetayAlis_1,
s.DetayAciklama_2,
s.DetayMekmarNot_2,
s.DetayTutar_2,
s.DetayAlis_2,
s.DetayAciklama_3,
s.DetayMekmarNot_3,
s.DetayTutar_3,
s.DetayAlis_3,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
s.EvrakGideri,
s.Eta,
s.UlkeId,
(
    select ytu.UlkeAdi from YeniTeklif_UlkeTB ytu where ytu.Id = s.UlkeId
) as UlkeAdi,

(
    select fst.FaturaAdi from FaturaKesilmeTB fst where fst.ID = s.FaturaKesimTurID
) as FaturaAdi,
s.depo_yukleme,
s.DetayTutar_4,
s.DetayAciklama_4,
s.sigorta_Tutar,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
(select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
(select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
s.SiparisSahibi,
s.Operasyon,
s.Finansman,
s.Iade,
s.MalBedeli,
s.sigorta_tutar_satis,
s.KonteynerAyrinti,
s.MayaControl,
s.FaturaKesimTurID,
s.KonteynerNo,


    su.ID as UrunId,
    su.SiparisNo as UrunSiparisNo,
    su.TedarikciID,
    t.FirmaAdi as UrunFirmaAdi,
    su.UrunKartID,
    k.KategoriAdi,
    urun.UrunAdi,
    yk.YuzeyIslemAdi,
    ol.En,
    ol.Boy,
    ol.Kenar,
    su.UrunBirimID,
    ub.BirimAdi,
    su.Miktar,
    su.OzelMiktar,
    su.KasaAdet,
    su.SatisFiyati,
    su.SatisToplam,
    su.UretimAciklama as UrunUretimAciklama,
    su.MusteriAciklama as UrunMusteriAciklama,
    su.AlisFiyati,
    su.SiraNo,
    su.Ton,
    su.Adet,
    ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
    dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum

from SiparisUrunTB su
inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID

where s.SiparisDurumID = 3 and m.Marketing= 'Mekmar' and
 s.YuklemeTarihi Like '${req.body.loaddate}'  +'%' and 
 m.FirmaAdi Like '${company}' + '%' and
s.SiparisNo Like '${po}' + '%' and 
urun.UrunAdi Like '${req.body.product}' + '%' and
ol.En Like '${width}' + '%' and
ol.Boy Like '${req.body.height}' + '%' and
ol.Kenar Like '${req.body.edge}' + '%' and 
t.FirmaAdi Like '${req.body.supplier}' + '%' and
su.Miktar Like '${req.body.amount}' + '%' 

order by s.YuklemeTarihi desc 
`;


await mssql.query(ordersListSql, (err, orders) => {
    res.status(200).json({'list':orders.recordset});

});
});

app.get('/order/shipped/list/filter/global/:filter',async (req,res)=>{
    const ordersListSql = `
    select 

        s.ID as SiparisId,
        s.SiparisNo,
        s.SiparisTarihi,
        s.OdemeTurID,
        ot.OdemeTur,
        s.TeslimTurID,
        (
            select stt.TeslimTur from SiparisTeslimTurTB stt where stt.ID = s.TeslimTurID
        ) as TeslimTur,
        s.MusteriID,
        m.FirmaAdi,
        s.Pesinat,
        s.NavlunFirma,
        s.NavlunMekmarNot,
        s.NavlunAlis,
        s.NavlunSatis,
        s.KayitTarihi,
        s.KullaniciID,
        (select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
        s.SiparisDurumID,
        sdt.Durum,
        s.UretimAciklama,
        s.SevkiyatAciklama,
        s.FinansAciklama,
        s.OdemeAciklama,
        s.TahminiYuklemeTarihi,
        s.YuklemeTarihi,
        s.FaturaNo,
        s.SiparisFaturaNo,
        s.Vade,
        s.Ulke,
        s.Komisyon,
        s.DetayAciklama_1,
        s.DetayMekmarNot_1,
        s.DetayTutar_1,
        s.DetayAlis_1,
        s.DetayAciklama_2,
        s.DetayMekmarNot_2,
        s.DetayTutar_2,
        s.DetayAlis_2,
        s.DetayAciklama_3,
        s.DetayMekmarNot_3,
        s.DetayTutar_3,
        s.DetayAlis_3,
        (select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
        s.EvrakGideri,
        s.Eta,
        s.UlkeId,
        (
            select ytu.UlkeAdi from YeniTeklif_UlkeTB ytu where ytu.Id = s.UlkeId
        ) as UlkeAdi,

        (
            select fst.FaturaAdi from FaturaKesilmeTB fst where fst.ID = s.FaturaKesimTurID
        ) as FaturaAdi,
        s.depo_yukleme,
        s.DetayTutar_4,
        s.DetayAciklama_4,
        s.sigorta_Tutar,
        (select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
        (select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
        (select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
        (select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
        s.SiparisSahibi,
        s.Operasyon,
        s.Finansman,
        s.Iade,
        s.MalBedeli,
        s.sigorta_tutar_satis,
        s.KonteynerAyrinti,
        s.MayaControl,
        s.FaturaKesimTurID,
        s.KonteynerNo,


        su.ID as UrunId,
        su.SiparisNo as UrunSiparisNo,
        su.TedarikciID,
        t.FirmaAdi as UrunFirmaAdi,
        su.UrunKartID,
        k.KategoriAdi,
        urun.UrunAdi,
        yk.YuzeyIslemAdi,
        ol.En,
        ol.Boy,
        ol.Kenar,
        su.UrunBirimID,
        ub.BirimAdi,
        su.Miktar,
        su.OzelMiktar,
        su.KasaAdet,
        su.SatisFiyati,
        su.SatisToplam,
        su.UretimAciklama as UrunUretimAciklama,
        su.MusteriAciklama as UrunMusteriAciklama,
        su.AlisFiyati,
        su.SiraNo,
        su.Ton,
        su.Adet,
        ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
        dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum

        from SiparisUrunTB su
        inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
        inner join TedarikciTB t on t.ID = su.TedarikciID
        inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
        inner join UrunKartTB uk on uk.ID = su.UrunKartID
        inner join KategoriTB k on k.ID = uk.KategoriID
        inner join UrunlerTB urun on urun.ID = uk.UrunID
        inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
        inner join OlculerTB ol on ol.ID = uk.OlcuID
        inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
        inner join MusterilerTB m on m.ID = s.MusteriID
        inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID

        where s.SiparisDurumID = 3  and m.Marketing= 'Mekmar' and 
        s.YuklemeTarihi Like '%'+'${req.params.filter}'  +'%' or 
        m.FirmaAdi Like '%'+'${req.params.filter}' + '%' or
        s.SiparisNo Like '%'+'${req.params.filter}' + '%' or 
        urun.UrunAdi Like '%'+'${req.params.filter}' + '%' or
        ol.En Like '%'+'${req.params.filter}' + '%' or
        ol.Boy Like '%'+'${req.params.filter}' + '%' or
        ol.Kenar Like '%'+'${req.params.filter}' + '%' or 
        t.FirmaAdi Like '%'+'${req.params.filter}' + '%' or
        su.UretimAciklama Like '%'+'${req.params.filter}' + '%' or
        su.MusteriAciklama Like '%'+'${req.params.filter}' + '%' 


        order by s.SiparisTarihi desc



    `;

    await mssql.query(ordersListSql, (err, orders) => {
        res.status(200).json({'list':orders.recordset});

    });
});



app.get('/order/shipped/list/year/:year',async (req, res) => {
    const shippedListYearSql = `
select 

s.ID as SiparisId,
s.SiparisNo,
s.SiparisTarihi,
s.OdemeTurID,
ot.OdemeTur,
s.TeslimTurID,
(
select stt.TeslimTur from SiparisTeslimTurTB stt where stt.ID = s.TeslimTurID
) as TeslimTur,
s.MusteriID,
m.FirmaAdi,
s.Pesinat,
s.NavlunFirma,
s.NavlunMekmarNot,
s.NavlunAlis,
s.NavlunSatis,
s.KayitTarihi,
s.KullaniciID,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
s.SiparisDurumID,
sdt.Durum,
s.UretimAciklama,
s.SevkiyatAciklama,
s.FinansAciklama,
s.OdemeAciklama,
s.TahminiYuklemeTarihi,
s.YuklemeTarihi,
s.FaturaNo,
s.SiparisFaturaNo,
s.Vade,
s.Ulke,
s.Komisyon,
s.DetayAciklama_1,
s.DetayMekmarNot_1,
s.DetayTutar_1,
s.DetayAlis_1,
s.DetayAciklama_2,
s.DetayMekmarNot_2,
s.DetayTutar_2,
s.DetayAlis_2,
s.DetayAciklama_3,
s.DetayMekmarNot_3,
s.DetayTutar_3,
s.DetayAlis_3,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
s.EvrakGideri,
s.Eta,
s.UlkeId,
(
select ytu.UlkeAdi from YeniTeklif_UlkeTB ytu where ytu.Id = s.UlkeId
) as UlkeAdi,

(
select fst.FaturaAdi from FaturaKesilmeTB fst where fst.ID = s.FaturaKesimTurID
) as FaturaAdi,
s.depo_yukleme,
s.DetayTutar_4,
s.DetayAciklama_4,
s.sigorta_Tutar,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
(select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
(select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
s.SiparisSahibi,
s.Operasyon,
s.Finansman,
s.Iade,
s.MalBedeli,
s.sigorta_tutar_satis,
s.KonteynerAyrinti,
s.MayaControl,
s.FaturaKesimTurID,
s.KonteynerNo,


su.ID as UrunId,
su.SiparisNo as UrunSiparisNo,
su.TedarikciID,
t.FirmaAdi as UrunFirmaAdi,
su.UrunKartID,
k.KategoriAdi,
urun.UrunAdi,
yk.YuzeyIslemAdi,
ol.En,
ol.Boy,
ol.Kenar,
su.UrunBirimID,
ub.BirimAdi,
su.Miktar,
su.OzelMiktar,
su.KasaAdet,
su.SatisFiyati,
su.SatisToplam,
su.UretimAciklama as UrunUretimAciklama,
su.MusteriAciklama as UrunMusteriAciklama,
su.AlisFiyati,
su.SiraNo,
su.Ton,
su.Adet,
('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum

from SiparisUrunTB su
inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID

where s.SiparisDurumID = 3 and YEAR(s.SiparisTarihi) = '${req.params.year}' and m.Marketing= 'Mekmar'
order by s.SiparisTarihi desc







    `;
    await mssql.query(shippedListYearSql,(err,shipped)=>{

        res.status(200).json({ 'list': shipped.recordset });
    });



});


app.get('/order/waiting/list',async (req, res) => {
        const ordersListSql = `
select 

	s.ID as SiparisId,
s.SiparisNo,
s.SiparisTarihi,
s.OdemeTurID,
ot.OdemeTur,
s.TeslimTurID,
stt.TeslimTur,
s.MusteriID,
m.FirmaAdi,
s.Pesinat,
s.NavlunFirma,
s.NavlunMekmarNot,
s.NavlunAlis,
s.NavlunSatis,
s.KayitTarihi,
s.KullaniciID,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
s.SiparisDurumID,
sdt.Durum,
s.UretimAciklama,
s.SevkiyatAciklama,
s.FinansAciklama,
s.OdemeAciklama,
s.TahminiYuklemeTarihi,
s.YuklemeTarihi,
s.FaturaNo,
s.SiparisFaturaNo,
s.Vade,
s.Ulke,
s.Komisyon,
s.DetayAciklama_1,
s.DetayMekmarNot_1,
s.DetayTutar_1,
s.DetayAlis_1,
s.DetayAciklama_2,
s.DetayMekmarNot_2,
s.DetayTutar_2,
s.DetayAlis_2,
s.DetayAciklama_3,
s.DetayMekmarNot_3,
s.DetayTutar_3,
s.DetayAlis_3,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
s.EvrakGideri,
s.Eta,
s.UlkeId,
ytu.UlkeAdi,
fst.FaturaAdi,
s.depo_yukleme,
s.DetayTutar_4,
s.DetayAciklama_4,
s.sigorta_Tutar,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
(select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
(select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
s.SiparisSahibi,
s.Operasyon,
s.Finansman,
s.Iade,
s.MalBedeli,
s.sigorta_tutar_satis,
s.KonteynerAyrinti,
s.MayaControl,
s.FaturaKesimTurID,
s.KonteynerNo,
s.SiparisKontrol,
s.SiparisKontrolEden,



	su.ID as UrunId,
	su.SiparisNo as UrunSiparisNo,
	su.TedarikciID,
	t.FirmaAdi as UrunFirmaAdi,
	su.UrunKartID,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	su.UrunBirimID,
	ub.BirimAdi,
	su.Miktar,
	su.OzelMiktar,
	su.KasaAdet,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama as UrunUretimAciklama,
	su.MusteriAciklama as UrunMusteriAciklama,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.Adet,
    ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
    dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum,
    dbo.Order_Total_Production(su.UrunKartID,su.SiparisNo) as Uretim,
    dbo.Production_Isf_Document_Control3(su.SiparisNo,su.TedarikciID) as Isf


from SiparisUrunTB su
inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
inner join SiparisTeslimTurTB stt on stt.ID = s.TeslimTurID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID
inner join YeniTeklif_UlkeTB ytu on ytu.Id = s.UlkeId
inner join FaturaKesilmeTB fst on fst.ID = s.FaturaKesimTurID

where s.SiparisDurumID = 1 and m.Marketing= 'Mekmar'
order by s.SiparisTarihi desc



    `;
        const orderYearListSql = `
        select YEAR(s.SiparisTarihi) as Yil from SiparislerTB s
group by YEAR(s.SiparisTarihi) 
order by YEAR(s.SiparisTarihi) desc
    `;
    await mssql.query(ordersListSql, async (err, orders) => {
 
        await mssql.query(orderYearListSql, (err, years) => {
            let customYearList = [];
            years.recordset.forEach(x => {
                customYearList.push(x);
            });
               res.status(200).json({'list':orders.recordset,'years':customYearList});

        });
    });
});

app.get('/order/waiting/list/year/:year',async (req, res) => {
    const waitingListYearSql = `
        select 

	s.ID as SiparisId,
s.SiparisNo,
s.SiparisTarihi,
s.OdemeTurID,
ot.OdemeTur,
s.TeslimTurID,
stt.TeslimTur,
s.MusteriID,
m.FirmaAdi,
s.Pesinat,
s.NavlunFirma,
s.NavlunMekmarNot,
s.NavlunAlis,
s.NavlunSatis,
s.KayitTarihi,
s.KullaniciID,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.KullaniciID) as KayitYapan,
s.SiparisDurumID,
sdt.Durum,
s.UretimAciklama,
s.SevkiyatAciklama,
s.FinansAciklama,
s.OdemeAciklama,
s.TahminiYuklemeTarihi,
s.YuklemeTarihi,
s.FaturaNo,
s.SiparisFaturaNo,
s.Vade,
s.Ulke,
s.Komisyon,
s.DetayAciklama_1,
s.DetayMekmarNot_1,
s.DetayTutar_1,
s.DetayAlis_1,
s.DetayAciklama_2,
s.DetayMekmarNot_2,
s.DetayTutar_2,
s.DetayAlis_2,
s.DetayAciklama_3,
s.DetayMekmarNot_3,
s.DetayTutar_3,
s.DetayAlis_3,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.SiparisSahibi) as SiparisSahibiAdi,
s.EvrakGideri,
s.Eta,
s.UlkeId,
ytu.UlkeAdi,
fst.FaturaAdi,
s.depo_yukleme,
s.DetayTutar_4,
s.DetayAciklama_4,
s.sigorta_Tutar,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Operasyon) as OperasyonAdi,
(select k.KullaniciAdi from KullaniciTB k where k.ID = s.Finansman) as FinansmanAdi,
(select k.MailAdres from KullaniciTB k where k.ID = s.Operasyon) as operationMail,
(select k.MailAdres from KullaniciTB k where k.ID = s.SiparisSahibi) as representativeMail,
s.SiparisSahibi,
s.Operasyon,
s.Finansman,
s.Iade,
s.MalBedeli,
s.sigorta_tutar_satis,
s.KonteynerAyrinti,
s.MayaControl,
s.FaturaKesimTurID,
s.KonteynerNo,
s.SiparisKontrol,
s.SiparisKontrolEden,


	su.ID as UrunId,
	su.SiparisNo as UrunSiparisNo,
	su.TedarikciID,
	t.FirmaAdi as UrunFirmaAdi,
	su.UrunKartID,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	su.UrunBirimID,
	ub.BirimAdi,
	su.Miktar,
	su.OzelMiktar,
	su.KasaAdet,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama as UrunUretimAciklama,
	su.MusteriAciklama as UrunMusteriAciklama,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.Adet,
    ('https://file-service.mekmar.com/file/download/2/' + s.SiparisNo) as PI,
    dbo.Finance_Order_PI_Count(s.SiparisNo) as EvrakDurum,
    dbo.Order_Total_Production(su.UrunKartID,su.SiparisNo) as Uretim,
    dbo.Production_Isf_Document_Control3(su.SiparisNo,su.TedarikciID) as Isf


from SiparisUrunTB su
inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join OdemeTurTB ot on ot.ID = s.OdemeTurID
inner join SiparisTeslimTurTB stt on stt.ID = s.TeslimTurID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join SiparisDurumTB sdt on sdt.ID = s.SiparisDurumID
inner join YeniTeklif_UlkeTB ytu on ytu.Id = s.UlkeId
inner join FaturaKesilmeTB fst on fst.ID = s.FaturaKesimTurID

where s.SiparisDurumID = 1 and YEAR(s.SiparisTarihi) = '${req.params.year}' and m.Marketing= 'Mekmar'
order by s.SiparisTarihi desc

    `;
   await mssql.query(waitingListYearSql,(err,waiting)=>{
        res.status(200).json({ 'list': waiting.recordset });
    });



});

app.get('/order/production/product/detail/list/:po', async (req, res) => {
    const sql = `
        select 

	su.ID,
	su.SiparisNo,
	su.TedarikciID,
	t.FirmaAdi,
	su.UrunKartID,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	su.Miktar,
	su.OzelMiktar,
	su.KasaAdet,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama,
	su.MusteriAciklama,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.musteriID,
	su.Adet,
    su.UrunBirimID,
    dbo.Product_Workerman_Cost(su.SiparisNo,su.UrunKartID) as Iscilik


from SiparisUrunTB su
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID

where su.SiparisNo='${req.params.po}'
    `;
    await mssql.query(sql,(err,detail)=>{
        

        res.status(200).json({ 'list': detail.recordset }); 
    });
});

app.get('/order/production/product/detail/mekmer/list/:po', async (req, res) => {
    const sqlMekmer = `
        select 

	su.ID,
	su.SiparisNo,
	su.TedarikciID,
	t.FirmaAdi,
	su.UrunKartID,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	su.Miktar,
	su.OzelMiktar,
	su.KasaAdet,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama,
	su.MusteriAciklama,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.musteriID,
	su.Adet,
    su.UrunBirimID,
    dbo.Product_Workerman_Cost(su.SiparisNo,su.UrunKartID) as Iscilik


from SiparisUrunTB su
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID

where su.SiparisNo='${req.params.po}' and su.TedarikciID in (1,123)
    `;
        const sqlMekmar = `
                select 

                su.ID,
                su.SiparisNo,
                su.TedarikciID,
                t.FirmaAdi,
                su.UrunKartID,
                k.KategoriAdi,
                urun.UrunAdi,
                yk.YuzeyIslemAdi,
                ol.En,
                ol.Boy,
                ol.Kenar,
                su.Miktar,
                su.OzelMiktar,
                su.KasaAdet,
                su.SatisFiyati,
                su.SatisToplam,
                su.UretimAciklama,
                su.MusteriAciklama,
                su.AlisFiyati,
                su.SiraNo,
                su.Ton,
                su.musteriID,
                su.Adet,
                su.UrunBirimID,
                dbo.Product_Workerman_Cost(su.SiparisNo,su.UrunKartID) as Iscilik


            from SiparisUrunTB su
            inner join TedarikciTB t on t.ID = su.TedarikciID
            inner join UrunKartTB uk on uk.ID = su.UrunKartID
            inner join KategoriTB k on k.ID = uk.KategoriID
            inner join UrunlerTB urun on urun.ID = uk.UrunID
            inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
            inner join OlculerTB ol on ol.ID = uk.OlcuID
            inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
            inner join SiparislerTB sip on sip.SiparisNo = su.SiparisNo
            inner join MusterilerTB mus on mus.ID = sip.MusteriID

            where su.SiparisNo='${req.params.po}' and su.TedarikciID not in (1,123) and mus.Marketing in ('Mekmer','İç Piyasa','Imperial Homes')
                `;
    await mssql.query(sqlMekmer, async(err, mekmer) => {
        await mssql.query(sqlMekmar, (err, mekmar) => {
            res.status(200).json({ 'list': mekmer.recordset.concat(mekmar.recordset) }); 
        });
    });
});

function __floatNullControl(value) {
    if (value == 'null' || value == undefined || value == null || value == '' || value == ' ') {
        return 0;
    } else {
        return value;
    }
}



app.post('/order/production/product/add', (req, res) => {
    let buyingPrice = 0;

    if (req.body.AlisFiyati == 0 || req.body.AlisFiyati == undefined || req.body.AlisFiyati == null || req.body.AlisFiyati == "") {
        if (req.body.TedarikciID == 1 || req.body.TedarikciID == 123) {
            buyingPrice = parseFloat(req.body.SatisFiyati) * 0.85;
        }
    } else {
        buyingPrice = req.body.AlisFiyati;
    }
    const insertSql = `
        insert into SiparisUrunTB(
	SiparisNo,
	TedarikciID,
	UrunKartID,
	UrunBirimID,
	Miktar,
	OzelMiktar,
	SatisFiyati,
	SatisToplam,
	UretimAciklama,
	MusteriAciklama,
	AlisFiyati,
	SiraNo,
	Ton,
	Adet
) VALUES(
	'${req.body.SiparisNo}',
	'${__floatNullControl(req.body.TedarikciID)}',
	'${__floatNullControl(req.body.UrunKartID)}',
    '${__floatNullControl(req.body.UrunBirimID)}',
	'${req.body.Miktar}',
	'${__floatNullControl(req.body.OzelMiktar)}',
	'${__floatNullControl(req.body.SatisFiyati)}',
	'${__floatNullControl(req.body.SatisToplam)}',
	'${req.body.UretimAciklama}',
	'${req.body.MusteriAciklama}',
	'${__floatNullControl(buyingPrice)}',
	'${__floatNullControl(req.body.SiraNo)}',
	'${__floatNullControl(req.body.Ton)}',
	'${__floatNullControl(req.body.Adet)}'

)
    `;
    const idSql = `
        select 

	top 1 ID

from SiparisUrunTB
order by ID desc
    `;
    mssql.query(insertSql, (err, product) => {
        if(product.rowsAffected[0] == 1){
            mssql.query(idSql,(err,id)=>{
                res.status(200).json({'status':true,'id':id.recordset[0].ID})
            })
        }else{
               res.status(200).json({'status':false})

        }
    });
});
app.delete('/order/production/product/delete/:id',(req,res)=>{
    const getIdSql = `select SiparisNo,TedarikciID,UrunKartID from SiparisUrunTB where ID='${req.params.id}' `;
    const deleteSql = `delete SiparisUrunTB where ID='${req.params.id}'`;
    mssql.query(getIdSql,(err,id)=>{
        if(id.recordset.length >0){
            const updateProductionSql = `update UretimTB SET SiparisAciklama='Stok',UretimTurID=1 where SiparisAciklama='${id.recordset[0].SiparisNo}' and UrunKartID='${id.recordset[0].UrunKartID}'`;
            mssql.query(updateProductionSql,(err,update)=>{
                mssql.query(deleteSql, (err, product) => {
                    if (product.rowsAffected[0] == 1) {
                        res.status(200).json({ 'status': true });
                    } else {
                        res.status(200).json({ 'status': false });
                    }
                });
            })
        }
    });

});
app.put('/order/production/product/update', (req, res) => {
    let buyingPrice = 0;
    if (req.body.AlisFiyati == 0 || req.body.AlisFiyati == undefined || req.body.AlisFiyati == null || req.body.AlisFiyati == "") {
        if (req.body.TedarikciID == 1 || req.body.TedarikciID == 123) {
                    buyingPrice = parseFloat(req.body.SatisFiyati) * 0.85;

        }
    } else {
        buyingPrice = req.body.AlisFiyati;
    };



    const sql = `
        update SiparisUrunTB SET
        TedarikciID = '${__floatNullControl(req.body.TedarikciID)}',
        UrunKartID = '${__floatNullControl(req.body.UrunKartID)}',
        UrunBirimID = '${__floatNullControl(req.body.UrunBirimID)}',
        Miktar = '${__floatNullControl(req.body.Miktar)}',
        OzelMiktar = '${__floatNullControl(req.body.OzelMiktar)}',
        SatisFiyati = '${__floatNullControl(req.body.SatisFiyati)}',
        SatisToplam = '${__floatNullControl(req.body.SatisToplam)}',
        UretimAciklama = '${req.body.UretimAciklama}',
        MusteriAciklama = '${req.body.MusteriAciklama}',
        AlisFiyati = ${__floatNullControl(buyingPrice)},
        SiraNo = '${__floatNullControl(req.body.SiraNo)}',
        Ton = '${__floatNullControl(req.body.Ton)}',
        Adet = '${__floatNullControl(req.body.Adet)}'
        where ID = '${req.body.ID}'
    `;
    mssql.query(sql,(err,product)=>{
       if(product.rowsAffected[0] == 1){
        res.status(200).json({'status':true});
       } else{
        res.status(200).json({'status':false});
        
    }
    });
});
app.post('/order/production/proforma/upload', (req, res) => {
    const sql = `
                        insert into SiparisFaturaKayitTB 
                   
                  (  
                   Tarih,
                   FaturaKayitID,
                   SiparisFaturaTurID,
                   SiparisNo,
                   YuklemeEvrakID,
                   YuklemeEvrakDurumID,
                   EvrakAdi,
                   EvrakYuklemeTarihi,KullaniciID)
                   
                values ('${req.body.date}','${0}','${0}','${req.body.po}','${req.body.id}',${2},'${req.body.document}','${req.body.date}','${req.body.userId}')
    `;
    mssql.query(sql, (err, proforma) => {
        if (proforma.rowsAffected[0] == 1) {
            res.status(200).json({ 'status': true });
        }
    });
});
app.get('/order/production/cost/list/:po', async (req, res) => {
    const sql = `
                       select *from
                (
                SELECT  sf.siparisNo, sf.Tutar as tut,sf.SiparisFaturaTurID ,sf.Aciklama ,sf.FaturaKayitID  FROM SiparisFaturaKayitTB sf where sf.Tutar>0
              
                )
                SiparisFaturaKayitTB where   SiparisFaturaKayitTB.SiparisNo='${req.params.po}'
    `;
    const sql2 = `
                                 select *,f.Tutar as tut ,(Select t.FirmaAdi from TedarikciTB t where t.ID=f.TedarikciID )  as firma
              from SiparisEkstraGiderlerTB f
               where f.SiparisNo='${req.params.po}'
    `;

    await mssql.query(sql, async (err, cost) => {
        await mssql.query(sql2,(err,cost2)=>{
            let costData = [];
            if (cost2.recordset.length > 0) {
                cost2.recordset.forEach(x => {
                    costData.push({ ...x, 'Tur': 'İşçilik' });
                })
            };
            if(cost.recordset.length >0){
                cost.recordset.forEach(y=>{
                    if(y.SiparisFaturaTurID == 100){
                        costData.push({...y,'Tur':'Lashing'})
                    };
                    if(y.SiparisFaturaTurID == 101){
                        costData.push({...y,'Tur':'Booking'})
                    };
                    if(y.SiparisFaturaTurID == 102){
                        costData.push({...y,'Tur':'Spazlet'})
                    };
                    if(y.SiparisFaturaTurID == 73){
                        costData.push({...y,'Tur':'İlaçlama'})
                    };
                    if(y.SiparisFaturaTurID == 7){
                        costData.push({...y,'Tur':'Gümrük'})
                    };
                    if(y.SiparisFaturaTurID == 11){
                        costData.push({...y,'Tur':'Nakliye'})
                    };
                    if(y.SiparisFaturaTurID == 13){
                        costData.push({...y,'Tur':'Navlun'})
                    };
                    if(y.SiparisFaturaTurID == 9){
                        costData.push({...y,'Tur':'Liman'})
                    };
                });
            }

            res.status(200).json({ 'list': costData });
        });
    });
});
app.get('/order/production/product/supplier/:po', async (req, res) => {
    const sql = `
        select 

	s.TedarikciID,
	t.FirmaAdi

from SiparisUrunTB s
inner join TedarikciTB t on t.ID = s.TedarikciID
where s.SiparisNo='${req.params.po}'
group by s.TedarikciID,t.FirmaAdi
    `;
    await mssql.query(sql,(err,supplier)=>{
        res.status(200).json({ 'list': supplier.recordset }); 
    });
});
app.get('/order/production/supplier/product/:po/:supplier', async (req, res) => {
    const sql = `
        select 
	
	su.ID,
	su.SiparisNo,
	su.TedarikciID,
	t.FirmaAdi as TedarikciAdi,
	su.UrunBirimID,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	ub.BirimAdi as UrunBirimAdi,
	su.Miktar,
	su.OzelMiktar,
	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama,
	su.MusteriAciklama,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.Adet,
    	su.KasaAdet


from SiparisUrunTB su
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join UrunBirimTB ub on ub.ID = su.UrunBirimID
where su.SiparisNo='${req.params.po}' and su.TedarikciID='${req.params.supplier}'


    `;
    await mssql.query(sql, (err, supplier) => {
        if (supplier.recordset.length > 0) {
            supplier.recordset.forEach(x => {
                if (x.AlisFiyati == null || x.AlisFiyati == '') {
                    x.AlisFiyati = 0;
                }
                
            });

        }
        res.status(200).json({ 'list': supplier.recordset });
    });
});
function supplierIsfDocId(value){
    return new Promise((resolve, reject) => {
            const h = ["A", "B", "C", "Ç" ,"D" ,"E", "F", "G", "Ğ", "H", "İ", "I", "J" ,"K" ,"L", "M", "N", "O", "Ö", "P", "R", "S", "Ş", "T" ,"U", "Ü", "V", "Y", "Z"]
        const controlSql = `Select count(*) as durum from YeniIcSiparisFaturaTB where SiparisNo='${value.po}'`;
        let docId = '';
        mssql.query(controlSql, (err, control) => {
            if (control.recordset.length == 0) {
                docId = '3' + h[0];
                resolve(docId)

            } else {
                docId = '3' + h[control.recordset[0].durum];
                resolve(docId)
            };

        });
        const insertSql = `
            INSERT INTO YeniIcSiparisFaturaTB (EvrakID, SiparisNo, EvrakAdi)    values
                ('${docId}','${value.po}','${value.doc}')
        `;
        mssql.query(insertSql);

        resolve(docId);

        

    });

    

}
app.post('/order/production/supplier/isf/save', (req, res) => {
    let isfDocId = 0;
    supplierIsfDocId(req.body).then(response => {
        isfDocId = response;

    });
        const sql = `
        INSERT INTO SiparisFaturaKayitTB (
                    Tarih,
                    FaturaKayitID,
                    SiparisFaturaTurID, 
                    SiparisNo,
                    Tutar,
                   
                    YuklemeEvrakID,
                    YeniEvrakID,
                    YuklemeEvrakDurumID,
                    EvrakYuklemeTarihi,
                    EvrakAdi,KullaniciID ,Evrak_Kontrol
                    )   
                     values
                    ('${req.body.date}','0','0', '${req.body.po}','0','3','${isfDocId}','2','${req.body.date}','${req.body.doc}','${req.body.userId}','1')
    `;
    const productSupplierSql = `
    insert into SiparisUrunTedarikciFormTB (
        SiparisNo,
        TedarikciID,
        TedarikciSiparisFaturaTurID,
        TedarikciTeslimTurID,
        SiparisTarihi,
        TeslimTarihi,
        Madde4,
        Madde5
    )
    VALUES(
    '${req.body.po}',
    '${req.body.supplier}',
    '${1}',
    '${1}',
    '${req.body.productionDate}',
    '${req.body.deliveryDate}',
    '${req.body.m4}',
    '${req.body.m5}')
    `


    mssql.query(sql, (err, isf) => {
        if(isf.rowsAffected[0] == 1){
            mssql.query(productSupplierSql);
            res.status(200).json({ 'status': true });

        } else {
            res.status(200).json({ 'status': false });
        }

    });

});
app.get('/order/production/product/document/:po', async (req, res) => {
    const documentListSql = `
        select
            *,
            
			(select k.KullaniciAdi from KullaniciTB k where k.ID=f.KullaniciID) as kullanici,
			(select nfk.FirmaID from NakliyeFaturaKayitTB nfk where nfk.ID = f.FaturaKayitID) as NakliyeFirmaID,
			(select (select firma.FirmaAdi from FirmalarTB firma where firma.ID = nfk.FirmaID) from NakliyeFaturaKayitTB nfk where nfk.ID = f.FaturaKayitID) as NakliyeFirmaAdi,
            			(select (select firma.FirmaAdi  from FirmalarTB firma  where firma.ID=k.FirmaID) as firma from KonteynerDigerFaturalarKayitTB k where k.ID = f.FaturaKayitID) as KonteynerFirmaAdi,
			(select (select firma.ID  from FirmalarTB firma  where firma.ID=k.FirmaID) as firma from KonteynerDigerFaturalarKayitTB k where k.ID = f.FaturaKayitID) as KonteynerFirmaID
            from
            SiparisFaturaKayitTB f
            where f.SiparisNo in
            (
                Select s.SiparisNo from SiparislerTB s,MusterilerTB m
                where m.ID=s.MusteriID and s.SiparisNo=f.SiparisNo
            
               
              
				and f.SiparisNo='${req.params.po}'
            )
            order by YuklemeEvrakID ASC
    `;
    await mssql.query(documentListSql, (err, document) => {
        document.recordset.forEach(x => {
            if (x.YuklemeEvrakID == 1) {
                x.Link = `https://file-service.mekmar.com/file/download/1/${x.SiparisNo}`;
                x.Evrak = 'Purchase Order';
            };
            if (x.YuklemeEvrakID == 2) {
                x.Link = `https://file-service.mekmar.com/file/download/2/${x.SiparisNo}`;
                x.Evrak = 'Proforma Invoice';
            };
            if((x.YuklemeEvrakID == 3) && (x.Evrak_Kontrol != 1)){
                x.Link = `https://file-service.mekmar.com/file/download/3/${x.SiparisNo}`;
                x.Evrak = 'ISF - ' + x.EvrakAdi;
            };
            if((x.YuklemeEvrakID == 3) && (x.Evrak_Kontrol == 1)){
                x.Link = `https://file-service.mekmar.com/file/download/3/${x.EvrakAdi}`;
                x.Evrak = 'ISF - ' + x.EvrakAdi;
            };
            if (x.YuklemeEvrakID == 4) {
                x.Link = `https://file-service.mekmar.com/file/download/4/${x.SiparisNo}`;
                x.Evrak = 'Packing List (Çeki Listesi)';
            };
            if (x.YuklemeEvrakID == 5) {
                x.Link = `https://file-service.mekmar.com/file/download/5/${x.SiparisNo}`;
                x.Evrak = 'Shipping Instruction (Yükleme Notası)';
            };
            if (x.YuklemeEvrakID == 6) {
                x.Link = `https://file-service.mekmar.com/file/download/6/${x.SiparisNo}`;
                x.Evrak = 'Custom Invoice (Gümrük Faturası)';
            };
            if (x.YuklemeEvrakID == 7) {
                x.Link = `https://file-service.mekmar.com/file/download/7/${x.SiparisNo}`;
                x.Evrak = 'Custom Note (Gümrük Notası)';
            };
            if (x.YuklemeEvrakID == 8) {
                x.Link = `https://file-service.mekmar.com/file/download/8/${x.SiparisNo}`;
                x.Evrak = 'Port Documents (VGM vb)';
            };
            if (x.YuklemeEvrakID == 9) {
                x.Link = `https://file-service.mekmar.com/file/download/9/${x.SiparisNo}`;
                x.Evrak = 'Bill of Lading (Konşimento)';
            };
            if (x.YuklemeEvrakID == 10) {
                x.Link = `https://file-service.mekmar.com/file/download/10/${x.SiparisNo}`;
                x.Evrak = 'Fumigation Certificate (İlaçlama Belgesi)';
            };
            if (x.YuklemeEvrakID == 11) {
                x.Link = `https://file-service.mekmar.com/file/download/11/${x.SiparisNo}`;
                x.Evrak = 'ATR (Dolaşım Belgesi)';
            };
            if (x.YuklemeEvrakID == 12) {
                x.Link = `https://file-service.mekmar.com/file/download/12/${x.SiparisNo}`;
                x.Evrak = 'Export Declaration (Gümrük Çıkış Beyan. GÇB)';
            };
            if (x.YuklemeEvrakID == 14) {
                x.Link = `https://file-service.mekmar.com/file/download/14/${x.SiparisNo}`;
                x.Evrak = 'Packing Declarition';
            };
            if (x.YuklemeEvrakID == 15) {
                x.Link = `https://file-service.mekmar.com/file/download/15/${x.SiparisNo}`;
                x.Evrak = 'Letter of Credit Text (LC Metin)';
            };
            if (x.YuklemeEvrakID == 16) {
                x.Link = `https://file-service.mekmar.com/file/download/16/${x.SiparisNo}`;
                x.Evrak = 'Commercial Invoice (Ticari Fatura)';
            };
            if (x.YuklemeEvrakID == 17) {
                x.Link = `https://file-service.mekmar.com/file/download/17/${x.SiparisNo}`;
                x.Evrak = 'Packing List (Çeki Listesi)';
            };
            if (x.YuklemeEvrakID == 20) {
                x.Link = `https://file-service.mekmar.com/file/download/20/${x.SiparisNo}`;
                x.Evrak = 'Booking Confirmation (Rezervasyon)';
            };
            if (x.YuklemeEvrakID == 30) {
                x.Link = `https://file-service.mekmar.com/file/tedarikci/download/30/${x.SiparisNo}/${x.EvrakAdi}`;
                x.Evrak = 'Supplier Invoices (Tedarikçi Faturaları) - ' + x.EvrakAdi;
            };
            if (x.YuklemeEvrakID == 13) {
                x.Link = `https://file-service.mekmar.com/file/download/customer/${x.NakliyeFirmaID}/${x.EvrakAdi}`;
                x.Evrak = 'Transportation Invoices (Nakliye Faturaları) - ' + x.NakliyeFirmaAdi
            };
            if (x.YuklemeEvrakID == 40) {
                x.Link = `https://file-service.mekmar.com/file/download/40/${x.SiparisNo}`;
                x.Evrak = 'Labor Cost (Özel İşçilik Ft.)';
            };
            if(x.YuklemeEvrakID == 50 && x.SiparisFaturaTurID == 7){
                x.Link = `https://file-service.mekmar.com/file/download/customer/3/${x.EvrakAdi}`;
                x.Evrak = 'Customs - ' + x.KonteynerFirmaAdi;
            }

            if(x.YuklemeEvrakID == 50 && x.SiparisFaturaTurID==9 ){
                x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                x.Evrak = 'Shipping Invoices (Denizcilik Faturaları) - ' + x.KonteynerFirmaAdi;
            };
            if(x.YuklemeEvrakID == 50 && x.SiparisFaturaTurID==13 ){
                x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                x.Evrak = 'Freight - ' + x.KonteynerFirmaAdi;
            };
            if(x.YuklemeEvrakID == 50 && x.SiparisFaturaTurID==13 ){
                x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                x.Evrak = 'Freight - ' + x.KonteynerFirmaAdi;
            };
            if(x.YuklemeEvrakID == 70 && x.SiparisFaturaTurID==7 ){
                x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                x.Evrak = 'Customs - '+ x.KonteynerFirmaAdi;
            };
            if(x.YuklemeEvrakID == 50 && x.SiparisFaturaTurID==73 ){
                x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                x.Evrak = 'Fumigation - ' + x.KonteynerFirmaAdi;
            };
            if(x.YuklemeEvrakID == 71 ){
                x.Link = `https://file-service.mekmar.com/file/download/71/${x.SiparisNo}`;
                x.Evrak = 'Fumigation Note (İlaçlama Notası)';
            };
            if(x.YuklemeEvrakID == 72 ){
                x.Link = `https://file-service.mekmar.com/file/download/72/${x.SiparisNo}`;
                x.Evrak = 'Pictures of Loading';
            };
            if(x.YuklemeEvrakID == 73 ){

                x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                x.Evrak = x.KonteynerFirmaAdi;
            };
            
            if(x.YuklemeEvrakID == 74 ){
                x.Link = `https://file-service.mekmar.com/file/download/74/${x.SiparisNo}`;
                x.Evrak = 'Certificate of Origin';
            };
            if(x.YuklemeEvrakID == 75 ){
                x.Link = `https://file-service.mekmar.com/file/download/75/${x.SiparisNo}`;
                x.Evrak = 'ATR';
            };
            if(x.YuklemeEvrakID == 76 ){
                x.Link = `https://file-service.mekmar.com/file/download/76/${x.SiparisNo}`;
                x.Evrak = 'Dispatch Note (İrsaliye)';
            };
            if(x.YuklemeEvrakID == 77 ){
                x.Link = `https://file-service.mekmar.com/file/download/77/${x.SiparisNo}`;
                x.Evrak = 'Other (Diğer)';
            };

            if(x.YuklemeEvrakID == 99 ){
                x.Link = `https://file-service.mekmar.com/file/download/99/${x.SiparisNo}`;
                x.Evrak = 'Draft';
            };
            if(x.SiparisFaturaTurID == 101 ){
                x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                x.Evrak = ' Booking - ' + x.KonteynerFirmaAdi ;
            };
            if(x.SiparisFaturaTurID == 102 ){
                x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                x.Evrak = 'Spanzet - ' + x.KonteynerFirmaAdi ;
            };
            if(x.SiparisFaturaTurID == 100 ){
                x.Link = `https://file-service.mekmar.com/file/download/customer/${x.KonteynerFirmaID}/${x.EvrakAdi}`;
                x.Evrak = 'Lashing - ' + x.KonteynerFirmaAdi;
            };
        });
        const liste = document.recordset.filter(x=>{
            return !(x.YuklemeEvrakID == 0 && x.SiparisFaturaTurID == 0)
        });
        res.status(200).json({ 'list': liste });
    });
});

app.get('/upload/document/product/supplier/list/:po',async (req,res)=>{
    const sql = `
    select COUNT(su.TedarikciID),su.SiparisNo,su.TedarikciID,(select t.FirmaAdi from TedarikciTB t where t.ID = su.TedarikciID) as TedarikciAdi 
    from SiparisUrunTB as su where su.SiparisNo='${req.params.po}'
    group by su.TedarikciID,su.SiparisNo
    `;
    await mssql.query(sql,(err,supplier)=>{
        res.status(200).json({'list':supplier.recordset});
    });
});

function documentSupplierId(po){
    return new Promise((resolve,reject)=>{
        const sql = `Select count(*) as durum from YeniTedarikciFaturaTB where SiparisNo='${po}'`;
        mssql.query(sql,(err,docId)=>{
            resolve(docId.recordset[0].durum);
        });
    })
}

app.post('/upload/document/product/supplier/save',async (req,res)=>{

    await documentSupplierId(req.body.SiparisNo)
    .then(async docId=>{
        const sql = `
        INSERT INTO SiparisFaturaKayitTB (
            Tarih,
            FaturaKayitID,
            SiparisFaturaTurID, 
            SiparisNo,
            Tutar,
           
            YuklemeEvrakID,
            YuklemeEvrakDurumID,
            EvrakYuklemeTarihi,
            EvrakAdi  ,
            KullaniciID,
            
            YeniEvrakID
           )   
               values
            ('${req.body.date}','${0}','${0}','${req.body.siparisno}','${0}','${30}','${2}','${req.body.date}','${req.body.evrak}','${req.body.kullaniciAdi}','${docId + 101}')
        `;

        await mssql.query(sql,(err,supplier)=>{
            if(supplier.rowsAffected[0] == 1){
                res.status(200).json({'status':true});
            }else{
                res.status(200).json({'status':false});
            }
        });
    });

});


app.get('/upload/document/supplier/list/:po',async(req,res)=>{
    const sql = `
            select 

            *,
            (select t.FirmaAdi from TedarikciTB t where t.ID = sup.TedarikciID) as TedarikciAdi

        from SiparisUrunTedarikciFormTB sup where SiparisNo='${req.params.po}'
    `;
    await mssql.query(sql,(err,supplier)=>{
        res.status(200).json({'list':supplier.recordset});
    });

});


function __getCategoryMass(category) {
        if(category == 'Travertine'){
            return (2.38);
        } else if (category == 'Marble') {
            return (2.76);
        } else if (category == 'Limestone'){
            return (2.58);
        }
    

};
function __amount(amount,unit,w,h,t){
    if(unit == 'Sqm'){

        return amount;
    } 
    else if (unit == 'Pcs'){

        if(w == 'Free' || w == 'FREE' || w == 'Ant' || w == 'VAR' || w == 'Various' || w == 'SLAB' || w == 'Slab' || h == 'Free' || h == 'FREE' || w == 'MINI' || w == 'Mini'){
            return 0;
        }else{
            return (amount * parseFloat(w.toString().replace(',','.')) * parseFloat(h.toString().replace(',','.'))) / 10000
        }
    } else if (unit == 'Mt'){

        if(w == 'Free' || w == 'FREE' || w=='Slab' || w == 'SLAB' || w == 'VAR' || w == 'Var' || w == 'Various'){
            return 0;
        }else{
            return (amount * parseFloat(w.toString().replace(',','.'))) / 100
        }
    }
}
app.get('/order/production/product/check/:po',async (req,res)=>{
    const checkListSql = `
        select    
t.FirmaAdi as TedarikciAdi,    
dbo.Get_KategoriAdi(u.UrunKartID) as KategoriAdi,    
u.KasaNo,    
dbo.Get_KenarIslem(u.UrunKartID) as YuzeyIslem,    
dbo.Get_UrunAdi(u.UrunKartID) as UrunAdi,    
dbo.Get_Olcu_Kenar(u.UrunKartID) as Kenar,    
dbo.Get_Olcu_En(u.UrunKartID) as En,    
dbo.Get_Olcu_Boy(u.UrunKartID) as Boy,    
u.Adet,    
u.Miktar,    
b.BirimAdi,    
u.KutuAdet,    
u.ID  ,  
u.UrunKartID  
from    
UretimTB u,UrunBirimTB b,TedarikciTB t    
where u.SiparisAciklama='${req.params.po}'   
and b.ID = u.UrunBirimID    
and t.ID = u.TedarikciID
and u.TedarikciID in (select surun.TedarikciID from SiparisUrunTB surun where surun.SiparisNo = u.SiparisAciklama)

order by u.UrunKartID,KasaNo asc      
    `;
   await mssql.query(checkListSql, (err, check) => {
        let queue = 1;
        check.recordset.forEach(x => {
            x.Sira = queue;
            queue++;
            x.Ton = __getCategoryMass(x.KategoriAdi.split(' ')[0]) * 10 * __amount(x.Miktar,x.BirimAdi,x.En,x.Boy,x.Kenar) * parseFloat(x.Kenar.replace(',','.')).toFixed(4);
        });
        res.status(200).json({ 'list': check.recordset });
    });
});

app.get('/order/production/product/check/mekmer/:po',async (req,res)=>{
    const checkListSql = `
        select    
t.FirmaAdi as TedarikciAdi,    
dbo.Get_KategoriAdi(u.UrunKartID) as KategoriAdi,    
u.KasaNo,    
dbo.Get_KenarIslem(u.UrunKartID) as YuzeyIslem,    
dbo.Get_UrunAdi(u.UrunKartID) as UrunAdi,    
dbo.Get_Olcu_Kenar(u.UrunKartID) as Kenar,    
dbo.Get_Olcu_En(u.UrunKartID) as En,    
dbo.Get_Olcu_Boy(u.UrunKartID) as Boy,    
u.Adet,    
u.Miktar,    
b.BirimAdi,    
u.KutuAdet,    
u.ID  ,  
u.UrunKartID  
from    
UretimTB u,UrunBirimTB b,TedarikciTB t    
where u.SiparisAciklama='${req.params.po}'   
and b.ID = u.UrunBirimID    
and t.ID = u.TedarikciID   
order by u.UrunKartID asc    
    `;
   await mssql.query(checkListSql, (err, check) => {
        let queue = 1;
        check.recordset.forEach(x => {
            x.Sira = queue;
            queue++;
            x.Ton = __getCategoryMass(x.KategoriAdi.split(' ')[0]) * 10 * x.Miktar * parseFloat(x.Kenar.replace(',','.')).toFixed(4);
        });
        res.status(200).json({ 'list': check.recordset });
    });
});


app.get('/order/production/product/workerman/:po/:productId',async (req,res)=>{
    const sql = `
        select sg.ID,sg.Tarih,sg.TedarikciID,sg.Aciklama,sg.Tutar,t.FirmaAdi

from SiparisEkstraGiderlerTB sg
inner join TedarikciTB t on t.ID = sg.TedarikciID

where sg.SiparisNo='${req.params.po}' and sg.UrunKartId='${req.params.productId}'
    `;
    const sql2 = `
        select sum(sg.Tutar) as Tutar

from SiparisEkstraGiderlerTB sg

where sg.SiparisNo='${req.params.po}'
    `;
    await mssql.query(sql, async (err, workerman) => {
       await mssql.query(sql2,(err,workermanTotalList)=>{
            res.status(200).json({ 'list': workerman.recordset, 'workerman': workermanTotalList.recordset[0] });

        });
    });
});
app.post('/order/production/product/workerman/save', (req, res) => {
    const sql = `
        insert into SiparisEkstraGiderlerTB (Tarih,SiparisNo,UrunKartId,TedarikciID,SiparisEkstraGiderTurID,Aciklama,Tutar)
VALUES('${req.body.Tarih}',
'${req.body.SiparisNo}',
'${req.body.UrunKartId}',
'${req.body.TedarikciID}',
'${req.body.SiparisEkstraGiderTurID}',
'${req.body.Aciklama}',
'${req.body.Tutar}'

)
    `;
    const getIdSql = `
        select top 1 ID from SiparisEkstraGiderlerTB order by ID desc
    `;
    mssql.query(sql,(err,workerman)=>{
        if (workerman.rowsAffected[0] == 1) {
            mssql.query(getIdSql,(err,workermanId)=>{
                res.status(200).json({'status':true,'id':workermanId.recordset[0].ID});

            });
        } else{
            res.status(200).json({'status':false});
            
        }
    });

});
app.delete('/order/production/product/workerman/delete/:id',(req,res)=>{
    const sql = `delete SiparisEkstraGiderlerTB where ID='${req.params.id}'`;
    mssql.query(sql, (err, workerman) => {
        if(workerman.rowsAffected[0] == 1){
            res.status(200).json({ 'status': true });
        } else{
            res.status(200).json({ 'status': false });
        }
    });
});
app.put('/order/production/product/workerman/update', (req, res) => {
    const sql = `
        update SiparisEkstraGiderlerTB
SET
	Tarih='${req.body.Tarih}',
	TedarikciID='${req.body.TedarikciID}',
	Aciklama='${req.body.Aciklama}',
	Tutar='${req.body.Tutar}'
WHERE

	ID='${req.body.ID}'
    `;
    mssql.query(sql,(err,workerman)=>{
        if (workerman.rowsAffected[0] == 1) {
            res.status(200).json({'status':true});
        } else{
            res.status(200).json({'status':false});
            
        }
    });
});
app.post('/order/production/save', async(req, res) => {
    const dhl = await __getDocumentCost(req.body.UlkeId,req.body.TeslimTurID);

    const sql = `
        insert into SiparislerTB(
SiparisNo,
SiparisTarihi,
OdemeTurID,
TeslimTurID,
MusteriID,
Pesinat,
NavlunFirma,
NavlunAlis,
NavlunSatis,
KayitTarihi,
KullaniciID,
SiparisDurumID,
UretimAciklama,
SevkiyatAciklama,
FinansAciklama,
OdemeAciklama,
TahminiYuklemeTarihi,
Ulke,
Komisyon,
DetayAciklama_1,
DetayMekmarNot_1,
DetayTutar_1,
DetayAlis_1,
DetayAciklama_2,
DetayMekmarNot_2,
DetayTutar_2,
DetayAlis_2,
DetayAciklama_3,
DetayMekmarNot_3,
DetayTutar_3,
DetayAlis_3,
SiparisSahibi,
EvrakGideri,
Eta,
KonteynerAyrinti,
UlkeId,
depo_yukleme,
DetayTutar_4,
DetayAciklama_4,
sigorta_id,
sigorta_Tutar,
Operasyon,
Finansman,
Iade,
MalBedeli,
sigorta_tutar_satis,
FaturaKesimTurID

)
VALUES(
	'${req.body.SiparisNo}',
	'${req.body.SiparisTarihi}',
	'${req.body.OdemeTurID}',
	'${req.body.TeslimTurID}',
	'${req.body.MusteriID}',
	'${req.body.Pesinat}',
	'${req.body.NavlunFirma}',
	'${req.body.NavlunAlis}',
	'${req.body.NavlunSatis}',
	'${req.body.KayitTarihi}',
	'${req.body.KullaniciID}',
	'${req.body.SiparisDurumID}',
	'${req.body.UretimAciklama_2}',
	'${req.body.SevkiyatAciklama_2}',
	'${req.body.FinansAciklama_2}',
	'${req.body.OdemeAciklama}',
	'${req.body.TahminiYuklemeTarihi}',
	'${req.body.Ulke}',
	'${req.body.Komisyon}',
	'${req.body.DetayAciklama_1_2}',
	'${req.body.DetayMekmarNot_1_2}',
	'${req.body.DetayTutar_1}',
	'${req.body.DetayAlis_1}',
	'${req.body.DetayAciklama_2_2}',
	'${req.body.DetayMekmarNot_2_2}',
	'${req.body.DetayTutar_2}',
	'${req.body.DetayAlis_2}',
	'${req.body.DetayAciklama_3_2}',
	'${req.body.DetayMekmarNot_3_2}',
	'${req.body.DetayTutar_3}',
	'${req.body.DetayAlis_3}',
	'${req.body.SiparisSahibi}',
	'${dhl}',
	'${req.body.Eta}',
	'${req.body.KonteynerAyrinti}',
	'${req.body.UlkeId}',
	'${req.body.depo_yukleme}',
	'${req.body.DetayTutar_4}',
	'${req.body.DetayAciklama_4_2}',
	'${req.body.sigorta_id}',
	'${req.body.sigorta_Tutar}',
	'${req.body.Operasyon}',
	'${req.body.Finansman}',
	'${req.body.Iade}',
	'${req.body.MalBedeli}',
	'${req.body.sigorta_tutar_satis}',
	'${req.body.FaturaKesimTurID}'


)
    `;
    const sqlId = `select top 1 ID from SiparislerTB order by ID desc
    `;
    await mssql.query(sql, (err, production) => {
        if (production.rowsAffected[0] == 1) {
            mssql.query(sqlId,(err,id)=>{
                if(id.rowsAffected[0] == 1){
                    res.status(200).json({'status':true,'id':id.recordset[0].ID});

                }else{
                    res.status(200).json({'status':false});

                }
            });
        }else{
            res.status(200).json({'status':false});
        };
    });

});

function __getDocumentCost(country,kind){
    if(kind == 7 || kind == 8 || kind == 10 || kind == 12 || kind ==9){
        const sql = `
            select 

                dhl,
                DhlFiyat

            from YeniTeklif_UlkeTB ytu
            inner join DhlFiyatlari dhl on dhl.ID = ytu.dhl
            where ytu.Id='${country}'
        `;
        return new Promise(async(resolve,reject)=>{
            await mssql.query(sql,(err,dhl)=>{
                resolve((dhl.recordset[0].DhlFiyat * 1.33))
            });
        });
    }else{
        return 0;
    }
};

app.put('/order/production/update', async (req, res) => {
    // const dhl = await __getDocumentCost(req.body.UlkeId,req.body.TeslimTurID);
    const sql = `
        update SiparislerTB 
SET
	OdemeTurID='${req.body.OdemeTurID}',
	TeslimTurID='${req.body.TeslimTurID}',
    MusteriID='${req.body.MusteriID}',
	Pesinat='${req.body.Pesinat}',
	NavlunFirma='${req.body.NavlunFirma}',
	NavlunAlis='${req.body.NavlunAlis}',
	NavlunSatis='${req.body.NavlunSatis}',
	SiparisDurumID='${req.body.SiparisDurumID}',
	UretimAciklama='${req.body.UretimAciklama_2}',
	SevkiyatAciklama='${req.body.SevkiyatAciklama_2}',
	FinansAciklama='${req.body.FinansAciklama_2}',
	OdemeAciklama='${req.body.OdemeAciklama}',
	Vade='${req.body.Vade}',
	Ulke='${req.body.Ulke}',
	Komisyon='${req.body.Komisyon}',
	DetayAciklama_1='${req.body.DetayAciklama_1_2}',
	DetayMekmarNot_1='${req.body.DetayMekmarNot_1_2}',
	DetayTutar_1='${req.body.DetayTutar_1}',
	DetayAlis_1='${req.body.DetayAlis_1}',
	DetayAciklama_2='${req.body.DetayAciklama_2_2}',
	DetayMekmarNot_2='${req.body.DetayMekmarNot_2_2}',
	DetayTutar_2='${req.body.DetayTutar_2}',
	DetayAlis_2='${req.body.DetayAlis_2}',
	DetayAciklama_3='${req.body.DetayAciklama_3_2}',
	DetayMekmarNot_3='${req.body.DetayMekmarNot_3_2}',
	DetayTutar_3='${req.body.DetayTutar_3}',
	DetayAlis_3='${req.body.DetayAlis_3}',
	SiparisSahibi='${req.body.SiparisSahibi}',
	EvrakGideri='${req.body.EvrakGideri}',
	KonteynerAyrinti='${req.body.KonteynerAyrinti}',
	UlkeId='${req.body.UlkeId}',
	FaturaKesimTurID='${req.body.FaturaKesimTurID}',
	depo_yukleme='${req.body.depo_yukleme}',
	DetayTutar_4='${req.body.DetayTutar_4}',
	DetayAciklama_4='${req.body.DetayAciklama_4_2}',
	sigorta_Tutar='${req.body.sigorta_Tutar}',
	Operasyon='${req.body.Operasyon}',
	Finansman='${req.body.Finansman}',
	Iade='${req.body.Iade}',
    SiparisKontrol='${req.body.SiparisKontrol}',
    SiparisKontrolEden='${req.body.SiparisKontrolEden}',
	sigorta_tutar_satis='${req.body.sigorta_tutar_satis}'
where
ID='${req.body.SiparisId}'
    `;
    await mssql.query(sql,(err,production)=>{
        if(production.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        } else {
            res.status(200).json({'status':false});
        };
    });
});

app.post('/production/add/cost/list',async(req,res)=>{
    const body = req.body;
    body.forEach(x=>{
        const addCost = `
            insert into MaliyetAnaliziDegisikliklerTB (DegisiklikTarihi,SiparisNo,IslemAdi,DegisiklikYapan)
            values('${x.date}','${x.po}','${x.desc}','${x.user}')
        `;
        mssql.query(addCost);
        res.status(200);
    });

});

app.get('/production/proforma/delete/:id',async(req,res)=>{
    const sql = `delete SiparisFaturaKayitTB where ID='${req.params.id}'`;
    await mssql.query(sql,(err,response)=>{
        if(response){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});
        }
    });
});
app.get('/production/isf/delete/:id/:document/:po',async (req,res)=>{
    const id = req.params.id;
    const document = req.params.document.split('-');
    if(document.length >2){
    console.log(document);
        
    }else{
    const supplierIdSql = `select top 1 ID from TedarikciTB where FirmaAdi='${document[0]}'`;
    await mssql.query(supplierIdSql,async (err,supplier)=>{
        if(supplier){
            const supplierId = supplier.recordset[0].ID;
            const documentProductIdSql = `select top 1 ID from SiparisUrunTedarikciFormTB where SiparisNo='${req.params.po}' and TedarikciID='${supplierId}'
            `;
            await mssql.query(documentProductIdSql,async (err,documentId)=>{
                const deleteDocumentIdSql = `delete SiparisUrunTedarikciFormTB where ID='${documentId.recordset[0].ID}'
                `;
                await mssql.query(deleteDocumentIdSql,async (err,deleteDocumentId)=>{
                    if(deleteDocumentId){
                        const productionDocumentDeleteSql = `delete SiparisFaturaKayitTB where ID='${req.params.id}'
                        `;
                        await mssql.query(productionDocumentDeleteSql,(err,productionDocument)=>{
                            if(productionDocument){
                                res.status(200).json({'status':true});
                            }else{
                                res.status(200).json({'status':false});
                            }
                        
                        });
                    }
                });
                

            });


        }
    });
        
        
    }



});

app.get('/orders/product/divide/list/:po',async (req,res)=>{
    const divideProductListSql = `
        select 
	su.SiparisNo,
	su.ID as UrunId,
	su.UrunKartID,
	su.TedarikciID,
	tb.FirmaAdi,
	k.KategoriAdi,
	urun.UrunAdi,
	yk.YuzeyIslemAdi,
	ol.En,
	ol.Boy,
	ol.Kenar,
	su.Miktar,
	su.UrunBirimID,
	ubt.BirimAdi,
	(tb.FirmaAdi + '/' + STR(su.UrunKartID) +'/' + k.KategoriAdi + '/' + urun.UrunAdi + '/' + yk.YuzeyIslemAdi + '/' + ol.En + '/'+ ol.Boy + '/' + ol.Kenar) as Urun,
    	su.SatisFiyati,
	su.SatisToplam,
	su.UretimAciklama,
	su.MusteriAciklama,
	su.KullaniciID,
	su.AlisFiyati,
	su.SiraNo,
	su.Ton,
	su.musteriID,
	su.Adet
	
from SiparisUrunTB su
inner join UrunKartTB uk on uk.ID = su.UrunKartID
inner join KategoriTB k on k.ID = uk.KategoriID
inner join UrunlerTB urun on urun.ID = uk.UrunID
inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
inner join OlculerTB ol on ol.ID = uk.OlcuID
inner join TedarikciTB tb on tb.ID = su.TedarikciID
inner join UrunBirimTB ubt on ubt.ID = su.UrunBirimID
where su.SiparisNo='${req.params.po}'
    `;
    await mssql.query(divideProductListSql, (err, product) => {
        res.status(200).json({ 'list': product.recordset });
    });
});

app.post('/order/divide',async (req,res)=>{
    const orderInsertSqlGiden =  `
        insert into SiparislerTB(
SiparisNo,
SiparisTarihi,
OdemeTurID,
TeslimTurID,
MusteriID,
Pesinat,
NavlunFirma,
NavlunAlis,
NavlunSatis,
KayitTarihi,
KullaniciID,
SiparisDurumID,
UretimAciklama,
SevkiyatAciklama,
FinansAciklama,
OdemeAciklama,
TahminiYuklemeTarihi,
Ulke,
Komisyon,
DetayAciklama_1,
DetayMekmarNot_1,
DetayTutar_1,
DetayAlis_1,
DetayAciklama_2,
DetayMekmarNot_2,
DetayTutar_2,
DetayAlis_2,
DetayAciklama_3,
DetayMekmarNot_3,
DetayTutar_3,
DetayAlis_3,
SiparisSahibi,
EvrakGideri,
KonteynerAyrinti,
UlkeId,
depo_yukleme,
DetayTutar_4,
DetayAciklama_4,
sigorta_Tutar,
Operasyon,
Finansman,
Iade,
MalBedeli,
sigorta_tutar_satis,
FaturaKesimTurID
)
VALUES(
	'${req.body.order.siparisno_giden}',
	'${req.body.order.siparisTarihi}',
	'${req.body.order.odemeTurId}',
	'${req.body.order.teslimTurId}',
	'${req.body.order.musteriId}',
	'${req.body.order.gidenPesinat}',
	'${req.body.order.navlunFirma}',
	'${req.body.order.gidenNavlunAlis}',
	'${req.body.order.gidenNavlunSatis}',
	'${req.body.order.kayitTarihi}',
	'${req.body.order.kullaniciId}',
	'${req.body.order.siparisDurumId}',
	'${req.body.order.odemeAciklama}',
	'${req.body.order.sevkiyatAciklama}',
	'${req.body.order.finansAciklama}',
	'${req.body.order.odemeAciklama}',
	'${req.body.order.TahminiYuklemeTarihi}',
	'${req.body.order.ulke}',
	'${req.body.order.komisyon}',
	'${req.body.order.detayAciklama_1}',
	'${req.body.order.detayMekmarNot_1}',
	'${req.body.order.gidenDetaySatis_1}',
	'${req.body.order.gidenDetayAlis_1}',
	'${req.body.order.detayAciklama_2}',
	'${req.body.order.detayMekmarNot_2}',
	'${req.body.order.gidenDetaySatis_2}',
	'${req.body.order.gidenDetayAlis_2}',
	'${req.body.order.detayAciklama_3}',
	'${req.body.order.detayMekmarNot_3}',
	'${req.body.order.gidenDetaySatis_3}',
	'${req.body.order.gidenDetayAlis_3}',
	'${req.body.order.siparisSahibi}',
	'${req.body.order.evrakGideri}',
	'${req.body.order.konteynerAyrinti}',
	'${req.body.order.ulkeId}',
	'${req.body.order.depo_yukleme}',
	'${0}',
	'${''}',
	'${req.body.order.sigortaTutar}',
	'${req.body.order.operasyon}',
	'${req.body.order.finansman}',
	'${req.body.order.iade}',
	'${req.body.order.malBedeli}',
	'${req.body.order.sigortaTutarSatis}',
	'${req.body.order.faturaKesimTurId}'
)
    `;

    const orderInsertSqlKalan =  `
        insert into SiparislerTB(
SiparisNo,
SiparisTarihi,
OdemeTurID,
TeslimTurID,
MusteriID,
Pesinat,
NavlunFirma,
NavlunAlis,
NavlunSatis,
KayitTarihi,
KullaniciID,
SiparisDurumID,
UretimAciklama,
SevkiyatAciklama,
FinansAciklama,
OdemeAciklama,
TahminiYuklemeTarihi,
Ulke,
Komisyon,
DetayAciklama_1,
DetayMekmarNot_1,
DetayTutar_1,
DetayAlis_1,
DetayAciklama_2,
DetayMekmarNot_2,
DetayTutar_2,
DetayAlis_2,
DetayAciklama_3,
DetayMekmarNot_3,
DetayTutar_3,
DetayAlis_3,
SiparisSahibi,
EvrakGideri,
KonteynerAyrinti,
UlkeId,
depo_yukleme,
DetayTutar_4,
DetayAciklama_4,
sigorta_Tutar,
Operasyon,
Finansman,
Iade,
MalBedeli,
sigorta_tutar_satis,
FaturaKesimTurID
)
VALUES(
	'${req.body.order.siparisno_kalan}',
	'${req.body.order.siparisTarihi}',
	'${req.body.order.odemeTurId}',
	'${req.body.order.teslimTurId}',
	'${req.body.order.musteriId}',
	'${req.body.order.kalanPesinat}',
	'${req.body.order.navlunFirma}',
	'${req.body.order.kalanNavlunAlis}',
	'${req.body.order.kalanNavlunSatis}',
	'${req.body.order.kayitTarihi}',
	'${req.body.order.kullaniciId}',
	'${req.body.order.siparisDurumId}',
	'${req.body.order.odemeAciklama}',
	'${req.body.order.sevkiyatAciklama}',
	'${req.body.order.finansAciklama}',
	'${req.body.order.odemeAciklama}',
	'${req.body.order.TahminiYuklemeTarihi}',
	'${req.body.order.ulke}',
	'${req.body.order.komisyon}',
	'${req.body.order.detayAciklama_1}',
	'${req.body.order.detayMekmarNot_1}',
	'${req.body.order.kalanDetaySatis_1}',
	'${req.body.order.kalanDetayAlis_1}',
	'${req.body.order.detayAciklama_2}',
	'${req.body.order.detayMekmarNot_2}',
	'${req.body.order.kalanDetaySatis_2}',
	'${req.body.order.kalanDetayAlis_2}',
	'${req.body.order.detayAciklama_3}',
	'${req.body.order.detayMekmarNot_3}',
	'${req.body.order.kalanDetaySatis_3}',
	'${req.body.order.kalanDetayAlis_3}',
	'${req.body.order.siparisSahibi}',
	'${req.body.order.evrakGideri}',
	'${req.body.order.konteynerAyrinti}',
	'${req.body.order.ulkeId}',
	'${req.body.order.depo_yukleme}',
	'${0}',
	'${''}',
	'${req.body.order.sigortaTutar}',
	'${req.body.order.operasyon}',
	'${req.body.order.finansman}',
	'${req.body.order.iade}',
	'${req.body.order.malBedeli}',
	'${req.body.order.sigortaTutarSatis}',
	'${req.body.order.faturaKesimTurId}'
)
    `;



    await mssql.query(orderInsertSqlGiden, async (err, giden) => {
        if (giden.rowsAffected[0] == 1) {
            await mssql.query(orderInsertSqlKalan, async (err, kalan) => {
                if (kalan.rowsAffected[0] == 1) {
                    const sistemdeSiparisDeleteSql = `delete SiparislerTB where SiparisNo='${req.body.order.siparisno}'`;
                    await mssql.query(sistemdeSiparisDeleteSql, async (err, sistemdekiSiparis) => {
                        if (sistemdekiSiparis.rowsAffected[0] == 1) {
                           await req.body.product.forEach(async x => {
                            if (x.kalan == 0) {
                                const kalanSqlDelete = `delete SiparisUrunTB where ID='${x.id}'`;
                                mssql.query(kalanSqlDelete,async (err, kalan) => {
                                    if (kalan.rowsAffected[0] == 1) {
                                        const gidenUrunSql = `
                                                insert into SiparisUrunTB(
                                            SiparisNo,
                                            TedarikciID,
                                            UrunKartID,
                                            UrunBirimID,
                                            Miktar,
                                            OzelMiktar,
                                            SatisFiyati,
                                            SatisToplam,
                                            UretimAciklama,
                                            MusteriAciklama,
                                            AlisFiyati,
                                            SiraNo,
                                            Ton,
                                            Adet
                                        ) VALUES(
                                            '${x.giden_po}',
                                            '${x.tedarikciId}',
                                            '${x.urunKartId}',
                                            '${x.urunBirimId}',
                                            '${x.gonderilen}',
                                            '${x.gonderilen}',
                                            '${x.satisFiyat}',
                                            '${x.gidenToplam}',
                                            '${x.uretimAciklama}',
                                            '${x.musteriAciklama}',
                                            '${x.alisFiyati}',
                                            '${x.siraNo}',
                                            '${x.ton}',
                                            '${x.adet}'

                                        )
                                                                            `;
                                        await mssql.query(gidenUrunSql, async (err, giden) => {
                                            if (giden.rowsAffected[0] == 1) {
                                                res.status(200).json({ 'status': true });
                                                
                                            } else {
                                                res.status(200).json({ 'status': false });
                                                
                                            }
                                        });
                                    } else {
                                        res.status(200).json({ 'status': false });
                                        
                                    }
                                });
                            } else if (x.gonderilen == 0) {
                                const kalanSqlUpdate = `update SiparisUrunTB SET SiparisNo = '${x.kalan_po}' WHERE ID='${x.id}'`;
                                mssql.query(kalanSqlUpdate, (err, kalan) => {
                                    if (kalan.rowsAffected[0] == 1) {
                                        res.status(200).json({ 'status': true });
                                    } else {
                                        res.status(200).json({ 'status': false });
                                        
                                    }
                                });
                            } else {
                                    const gidenUrunSql = `
            insert into SiparisUrunTB(
        SiparisNo,
        TedarikciID,
        UrunKartID,
        UrunBirimID,
        Miktar,
        OzelMiktar,
        SatisFiyati,
        SatisToplam,
        UretimAciklama,
        MusteriAciklama,
        AlisFiyati,
        SiraNo,
        Ton,
        Adet
    ) VALUES(
        '${x.giden_po}',
        '${x.tedarikciId}',
        '${x.urunKartId}',
        '${x.urunBirimId}',
        '${x.gonderilen}',
        '${x.gonderilen}',
        '${x.satisFiyat}',
        '${x.gidenToplam}',
        '${x.uretimAciklama}',
        '${x.musteriAciklama}',
        '${x.alisFiyati}',
        '${x.siraNo}',
        '${x.ton}',
        '${x.adet}'

    )
                                    `;
                                        const kalanUrunSql = `
                        insert into SiparisUrunTB(
                    SiparisNo,
                    TedarikciID,
                    UrunKartID,
                    UrunBirimID,
                    Miktar,
                    OzelMiktar,
                    SatisFiyati,
                    SatisToplam,
                    UretimAciklama,
                    MusteriAciklama,
                    AlisFiyati,
                    SiraNo,
                    Ton,
                    Adet
                ) VALUES(
                    '${x.kalan_po}',
                    '${x.tedarikciId}',
                    '${x.urunKartId}',
                    '${x.urunBirimId}',
                    '${x.kalan}',
                    '${x.kalan}',
                    '${x.satisFiyat}',
                    '${x.kalanToplam}',
                    '${x.uretimAciklama}',
                    '${x.musteriAciklama}',
                    '${x.alisFiyati}',
                    '${x.siraNo}',
                    '${x.ton}',
                    '${x.adet}'

                )
                                    `;
                                const sistemUrunDeleteSql = `delete SiparisUrunTB where ID='${x.id}'`;
                                mssql.query(sistemUrunDeleteSql, async (err, sistem) => {
                                    if (sistem.rowsAffected[0] == 1) {
                                        await mssql.query(gidenUrunSql, async (err, giden) => {
                                            if (giden.rowsAffected[0] == 1) {
                                                await mssql.query(kalanUrunSql, (err, kalan) => {
                                                    if (kalan.rowsAffected[0] == 1) {
                                                        res.status(200).json({ 'status': true });
                                                    } else {
                                                        res.status(200).json({ 'status': false });
                                                    };
                                                });
                                            } else {
                                                res.status(200).json({ 'status': false });
                                            }
                                        });
                                    }
                                });
                               };
                        
                             });
                        } else {
                            res.status(200).json({'status':false})
                       } 
                    });
                    
                } else {
                    res.status(200).json({ 'status': false });
                }
            });
        } else {
            res.status(200).json({ 'status': false });
        }
    });
});

/*Mailler */
app.post('/mail/login/server', (req, res) => {
    transporter.sendMail({
        to: 'bilgiislem@mekmar.com',
        from: 'goz@mekmar.com',
        subject: 'Giriş Tespit Edildi.',
        html: `<h1>${req.body.innerDate} tarihinde ${req.body.username} giriş yaptı.</h1>`
    });
    res.status(200).json({ 'status': true });
});
app.post('/mail/advanced/payment/server',(req,res)=>{
    transporter.sendMail({
        to:req.body.Mail,
        from:'goz@mekmar.com',
        subject:'Peşinat Kayıt İşlemi',
        html: `
            <h3>${req.body.KullaniciAdi} Adlı Kullanıcı ${req.body.BugunTarih} Tarihi İtibariyle ${req.body.FirmaAdi} Firmasına Peşinat Girişi Yaptı.</h3>
            <br/>
            <table style="border: 1px solid;border-collapse: collapse;width: 100%;">
                <tr style="border: 1px solid;">
                    <th style="border: 1px solid;">Peşinat Tarihi</th>
                    <th style="border: 1px solid;">Sipariş No</th>
                    <th style="border: 1px solid;">Tutar</th>
                    <th style="border: 1px solid;">Kur</th>
                    <th style="border: 1px solid;">Masraf</th>
                    <th style="border: 1px solid;">Açıklama</th>
                </tr>
                <tr style="border: 1px solid;">
                    <td style="border: 1px solid;text-align:center;">${req.body.Tarih}</td>
                    <td style="border: 1px solid;text-align:center;">${req.body.SiparisNo}</td>
                    <td style="border: 1px solid;text-align:center;">$${req.body.Tutar}</td>
                    <td style="border: 1px solid;text-align:center;">₺${req.body.Kur}</td>
                    <td style="border: 1px solid;text-align:center;">$${req.body.Masraf}</td>
                    <td style="border: 1px solid;text-align:center;">${req.body.Aciklama}</td>

                </tr>
                </table>
        `
    });
    res.status(200).json({ 'status': true });

});
app.post('/finance/po/paid/send/mail', (req, res) => {
    transporter.sendMail({
        to:req.body.Mail,
        from:'goz@mekmar.com',
        subject:'Tahsilat Kayıt İşlemi',
        html: `
            <h3>${req.body.KullaniciAdi} Adlı Kullanıcı ${req.body.BugunTarih} Tarihi İtibariyle ${req.body.FirmaAdi} Firmasına Tahsilat Girişi Yaptı.</h3>
            <br/>
            <table style="border: 1px solid;border-collapse: collapse;width: 100%;">
                <tr style="border: 1px solid;">
                    <th style="border: 1px solid;">Tahsilat Tarihi</th>
                    <th style="border: 1px solid;">Sipariş No</th>
                    <th style="border: 1px solid;">Tutar</th>
                    <th style="border: 1px solid;">Kur</th>
                    <th style="border: 1px solid;">Masraf</th>
                    <th style="border: 1px solid;">Açıklama</th>
                </tr>
                <tr style="border: 1px solid;">
                    <td style="border: 1px solid;text-align:center;">${req.body.Tarih}</td>
                    <td style="border: 1px solid;text-align:center;">${req.body.SiparisNo}</td>
                    <td style="border: 1px solid;text-align:center;">$${req.body.Tutar}</td>
                    <td style="border: 1px solid;text-align:center;">₺${req.body.Kur}</td>
                    <td style="border: 1px solid;text-align:center;">$${req.body.Masraf}</td>
                    <td style="border: 1px solid;text-align:center;">${req.body.Aciklama}</td>

                </tr>
                </table>
        `
    });
    res.status(200).json({ 'status': true });
});
app.post('/finance/po/paid/delete/send/mail', (req, res) => {
    transporter.sendMail({
        to:req.body.Mail,
        from:'goz@mekmar.com',
        subject:'Tahsilat Silme İşlemi',
        html: `
            <h3>${req.body.KullaniciAdi} Adlı Kullanıcı ${req.body.BugunTarih} Tarihi İtibariyle ${req.body.FirmaAdi} Firmasına Tahsilat Silme İşlemi Yaptı.</h3>
            <br/>
            <table style="border: 1px solid;border-collapse: collapse;width: 100%;">
                <tr style="border: 1px solid;">
                    <th style="border: 1px solid;">Tahsilat Tarihi</th>
                    <th style="border: 1px solid;">Sipariş No</th>
                    <th style="border: 1px solid;">Tutar</th>
                    <th style="border: 1px solid;">Kur</th>
                    <th style="border: 1px solid;">Masraf</th>
                    <th style="border: 1px solid;">Açıklama</th>
                </tr>
                <tr style="border: 1px solid;">
                    <td style="border: 1px solid;text-align:center;">${req.body.Tarih}</td>
                    <td style="border: 1px solid;text-align:center;">${req.body.SiparisNo}</td>
                    <td style="border: 1px solid;text-align:center;">$${req.body.Tutar}</td>
                    <td style="border: 1px solid;text-align:center;">₺${req.body.Kur}</td>
                    <td style="border: 1px solid;text-align:center;">$${req.body.Masraf}</td>
                    <td style="border: 1px solid;text-align:center;">${req.body.Aciklama}</td>

                </tr>
                </table>
        `
    });
    res.status(200).json({ 'status': true });
});

app.post('/finance/po/paid/delete/send/mail/mekmer', (req, res) => {
    transporter.sendMail({
        to:req.body.Mail,
        from:'goz@mekmar.com',
        subject:'Tahsilat Silme İşlemi',
        html: `
            <h3>${req.body.KullaniciAdi} Adlı Kullanıcı ${req.body.BugunTarih} Tarihi İtibariyle ${req.body.musteriadi} Firmasına Tahsilat Silme İşlemi Yaptı.</h3>
            <br/>
            <table style="border: 1px solid;border-collapse: collapse;width: 100%;">
                <tr style="border: 1px solid;">
                    <th style="border: 1px solid;">Tahsilat Tarihi</th>
                    <th style="border: 1px solid;">Sipariş No</th>
                    <th style="border: 1px solid;">Tutar</th>
                    <th style="border: 1px solid;">Kur</th>
                    <th style="border: 1px solid;">Masraf</th>
                    <th style="border: 1px solid;">Açıklama</th>
                </tr>
                <tr style="border: 1px solid;">
                    <td style="border: 1px solid;text-align:center;">${req.body.tarih}</td>
                    <td style="border: 1px solid;text-align:center;">${req.body.siparisno}</td>
                    <td style="border: 1px solid;text-align:center;">$${req.body.tutar}</td>
                    <td style="border: 1px solid;text-align:center;">₺${req.body.kur}</td>
                    <td style="border: 1px solid;text-align:center;">$${req.body.masraf}</td>
                    <td style="border: 1px solid;text-align:center;">${req.body.aciklama}</td>

                </tr>
                </table>
        `
    });
    res.status(200).json({ 'status': true });
});

app.post('/production/isf/send/mail', (req, res) => {
        transporter.sendMail({
        to:'info@mekmar.com',
        from:'goz@mekmar.com',
        subject:'İsf Yükleme İşlemi',
        html: `
            <h3>${req.body.username} adlı kullanıcı ${req.body.po} ' nun  ${req.body.supplierName} tedarikçisine isf girdi.</h3>
           
        `
        });
            transporter.sendMail({
        to:'bilgiislem@mekmar.com',
        from:'goz@mekmar.com',
        subject:'İsf Yükleme İşlemi',
        html: `
            <h3>${req.body.username} adlı kullanıcı ${req.body.po} ' nun  ${req.body.supplierName} tedarikçisine isf girdi.</h3>
           
        `
    });
    res.status(200).json({ 'status': true });

});



app.post('/finance/po/paid/update/send/mail', (req, res) => {

    transporter.sendMail({
        to:req.body.Mail,
        from:'goz@mekmar.com',
        subject:'Tahsilat Güncelleme İşlemi',
        html: `
            <h3>${req.body.KullaniciAdi} Adlı Kullanıcı ${req.body.BugunTarih} Tarihi İtibariyle ${req.body.FirmaAdi} Firmasına Tahsilat Güncelleme İşlemi Yaptı.</h3>
            <br/>
            <table style="border: 1px solid;border-collapse: collapse;width: 100%;">
                <tr style="border: 1px solid;">
                    <th style="border: 1px solid;">Tahsilat Tarihi</th>
                    <th style="border: 1px solid;">Sipariş No</th>
                    <th style="border: 1px solid;">Tutar</th>
                    <th style="border: 1px solid;">Kur</th>
                    <th style="border: 1px solid;">Masraf</th>
                    <th style="border: 1px solid;">Açıklama</th>
                </tr>
                <tr style="border: 1px solid;">
                    <td style="border: 1px solid;text-align:center;">${req.body.Tarih}</td>
                    <td style="border: 1px solid;text-align:center;">${req.body.SiparisNo}</td>
                    <td style="border: 1px solid;text-align:center;">$${req.body.Tutar}</td>
                    <td style="border: 1px solid;text-align:center;">₺${req.body.Kur}</td>
                    <td style="border: 1px solid;text-align:center;">$${req.body.Masraf}</td>
                    <td style="border: 1px solid;text-align:center;">${req.body.Aciklama}</td>

                </tr>
                </table>
        `
    });
    res.status(200).json({ 'status': true });
});
app.post('/finance/po/paid/update/send/mail/mekmer', (req, res) => {

    transporter.sendMail({
        to:req.body.Mail,
        from:'goz@mekmar.com',
        subject:'Tahsilat Güncelleme İşlemi',
        html: `
            <h3>${req.body.KullaniciAdi} Adlı Kullanıcı ${req.body.BugunTarih} Tarihi İtibariyle ${req.body.musteriadi} Firmasına Tahsilat Güncelleme İşlemi Yaptı.</h3>
            <br/>
            <table style="border: 1px solid;border-collapse: collapse;width: 100%;">
                <tr style="border: 1px solid;">
                    <th style="border: 1px solid;">Tahsilat Tarihi</th>
                    <th style="border: 1px solid;">Sipariş No</th>
                    <th style="border: 1px solid;">Tutar</th>
                    <th style="border: 1px solid;">Kur</th>
                    <th style="border: 1px solid;">Masraf</th>
                    <th style="border: 1px solid;">Açıklama</th>
                </tr>
                <tr style="border: 1px solid;">
                    <td style="border: 1px solid;text-align:center;">${req.body.tarih}</td>
                    <td style="border: 1px solid;text-align:center;">${req.body.siparisno}</td>
                    <td style="border: 1px solid;text-align:center;">$${req.body.tutar}</td>
                    <td style="border: 1px solid;text-align:center;">₺${req.body.kur}</td>
                    <td style="border: 1px solid;text-align:center;">$${req.body.masraf}</td>
                    <td style="border: 1px solid;text-align:center;">${req.body.aciklama}</td>

                </tr>
                </table>
        `
    });
    res.status(200).json({ 'status': true });
});



app.post('/finance/po/paid/send/mail/mekmer', (req, res) => {
    transporter.sendMail({
        to:req.body.Mail,
        from:'goz@mekmar.com',
        subject:'Tahsilat Kayıt İşlemi',
        html: `
            <h3>${req.body.KullaniciAdi} Adlı Kullanıcı ${req.body.BugunTarih} Tarihi İtibariyle ${req.body.musteriadi} Firmasına Tahsilat Girişi Yaptı.</h3>
            <br/>
            <table style="border: 1px solid;border-collapse: collapse;width: 100%;">
                <tr style="border: 1px solid;">
                    <th style="border: 1px solid;">Tahsilat Tarihi</th>
                    <th style="border: 1px solid;">Sipariş No</th>
                    <th style="border: 1px solid;">Tutar</th>
                    <th style="border: 1px solid;">Kur</th>
                    <th style="border: 1px solid;">Masraf</th>
                    <th style="border: 1px solid;">Açıklama</th>
                </tr>
                <tr style="border: 1px solid;">
                    <td style="border: 1px solid;text-align:center;">${req.body.Tarih}</td>
                    <td style="border: 1px solid;text-align:center;">${req.body.siparisno}</td>
                    <td style="border: 1px solid;text-align:center;">$${req.body.tutar}</td>
                    <td style="border: 1px solid;text-align:center;">₺${req.body.kur}</td>
                    <td style="border: 1px solid;text-align:center;">$${req.body.masraf}</td>
                    <td style="border: 1px solid;text-align:center;">${req.body.aciklama}</td>

                </tr>
                </table>
        `
    });
    res.status(200).json({ 'status': true });
});




app.get('/finance/mekmer/paid/detail/list/:date/:customer',(req,res)=>{
    const sql = `
        select * from Odemeler_MekmerTB where Tarih='${req.params.date}' and MusteriID='${req.params.customer}'
    `;
    mssql.query(sql,(err,paidDetail)=>{
        res.status(200).json({
            'list':paidDetail.recordset
        });
    });


});

app.put('/finance/mekmer/paid/detail/list/update',(req,res)=>{
    const sql = `update Odemeler_MekmerTB SET Tarih='${req.body.Tarih}',Aciklama='${req.body.Aciklama}',Tutar='${req.body.Tutar}',Masraf='${req.body.Masraf}',Kur='${req.body.Kur}' where ID='${req.body.ID}'`;
    mssql.query(sql,(err,updated)=>{
        if(updated.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});
        }
    });
});
app.delete('/finance/mekmer/paid/detail/list/delete/:id',(req,res)=>{
    const sql = `delete Odemeler_MekmerTB where ID='${req.params.id}'`;
    mssql.query(sql,(err,deleted)=>{
        if(deleted.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});
        }
    });
});










async function addedSendMail(payload) {
    return new Promise((resolve, reject) => {
        let content;
        let customSubject;
        let content_mekmer;

        if(payload.new){
            content = `
            <h3>${payload.username} Adlı Kullanıcı ${payload.date} Tarihinde ${payload.po} Siparişini Girdi.</h3>
            <br/>
            <table style="border: 1px solid;border-collapse: collapse;width: 100%;">
            <tr style="border: 1px solid;">
                <th style="border: 1px solid;">Sipariş No</th>
                <th style="border: 1px solid;">Tedarikçi</th>
                <th style="border: 1px solid;">Ürün Bilgisi</th>
                <th style="border: 1px solid;">Üretim açıklama</th>
                <th style="border: 1px solid;">Miktar</th>
                <th style="border: 1px solid;">Alış Fiyatı</th>
                <th style="border: 1px solid;">Satış Fiyatı</th>

            </tr>
            `;
            customSubject = 'Yeni Sipariş Girişi';
            content_mekmer = `
            <h3>${payload.username} Adlı Kullanıcı ${payload.date} Tarihinde ${payload.po} Siparişini Girdi.</h3>
            <br/>
            <table style="border: 1px solid;border-collapse: collapse;width: 100%;">
            <tr style="border: 1px solid;">
                <th style="border: 1px solid;">Sipariş No</th>
                <th style="border: 1px solid;">Tedarikçi</th>
                <th style="border: 1px solid;">Ürün Bilgisi</th>
                <th style="border: 1px solid;">Üretim açıklama</th>
                <th style="border: 1px solid;">Miktar</th>
                <th style="border: 1px solid;">Alış Fiyatı</th>
                <th style="border: 1px solid;">Satış Fiyatı</th>

            </tr>
            
            `;

        }else{
            content = `
            <h3>${payload.username} Adlı Kullanıcı ${payload.date} Tarihinde ${payload.po} Siparişine Ürün Ekledi.</h3>
            <br/>
            <table style="border: 1px solid;border-collapse: collapse;width: 100%;">
            <tr style="border: 1px solid;">
                <th style="border: 1px solid;">Sipariş No</th>
                <th style="border: 1px solid;">Tedarikçi</th>
                <th style="border: 1px solid;">Ürün Bilgisi</th>
                <th style="border: 1px solid;">Üretim açıklama</th>
                <th style="border: 1px solid;">Miktar</th>
                <th style="border: 1px solid;">Alış Fiyatı</th>
                <th style="border: 1px solid;">Satış Fiyatı</th>

            </tr>
        `;
        customSubject = 'Siparişe Ürün Eklendi';
        content_mekmer =  `
                <h3>${payload.username} Adlı Kullanıcı ${payload.date} Tarihinde ${payload.po} Siparişine Ürün Ekledi.</h3>
                <br/>
                <table style="border: 1px solid;border-collapse: collapse;width: 100%;">
                <tr style="border: 1px solid;">
                    <th style="border: 1px solid;">Sipariş No</th>
                    <th style="border: 1px solid;">Tedarikçi</th>
                    <th style="border: 1px solid;">Ürün Bilgisi</th>
                    <th style="border: 1px solid;">Üretim açıklama</th>
                    <th style="border: 1px solid;">Miktar</th>
                    <th style="border: 1px solid;">Alış Fiyatı</th>
                    <th style="border: 1px solid;">Satış Fiyatı</th>

                </tr>
            `;
        }

        payload.added.forEach(x => {
            content = content + `
            <tr style="border: 1px solid;">
                <td style="border: 1px solid;text-align:center;">${x.SiparisNo}</td>
                <td style="border: 1px solid;text-align:center;">${x.FirmaAdi}</td>
                <td style="border: 1px solid;text-align:center;">${x.KategoriAdi}-${x.UrunAdi}-${x.YuzeyIslemAdi}-${x.En}x${x.Boy}x${x.Kenar}</td>
                <td style="border: 1px solid;text-align:center;">${x.UretimAciklama}</td>
                <td style="border: 1px solid;text-align:center;">${x.Miktar}</td>
                <td style="border: 1px solid;text-align:center;">$${x.AlisFiyati}</td>
                <td style="border: 1px solid;text-align:center;">$${x.SatisFiyati}</td>

            </tr>`
        });
        content = content + '</table>';

        const mekmer_product = payload.added.filter(x=>(x.FirmaAdi == 'Mekmer') || (x.FirmaAdi == 'Mek-Moz'));
        if(mekmer_product.length >0){
            mekmer_product.forEach(x => {
                content_mekmer = content_mekmer + `
                <tr style="border: 1px solid;">
                    <td style="border: 1px solid;text-align:center;">${x.SiparisNo}</td>
                    <td style="border: 1px solid;text-align:center;">${x.FirmaAdi}</td>
                    <td style="border: 1px solid;text-align:center;">${x.KategoriAdi}-${x.UrunAdi}-${x.YuzeyIslemAdi}-${x.En}x${x.Boy}x${x.Kenar}</td>
                    <td style="border: 1px solid;text-align:center;">${x.UretimAciklama}</td>
                    <td style="border: 1px solid;text-align:center;">${x.Miktar}</td>
                    <td style="border: 1px solid;text-align:center;">$${x.AlisFiyati}</td>
                    <td style="border: 1px solid;text-align:center;">$${x.SatisFiyati}</td>
    
                </tr>`
            });
            content_mekmer = content_mekmer + '</table>';

                    transporter.sendMail({
                    to: 'sergen@mekmar.com',
                    from: 'goz@mekmar.com',
                    subject: customSubject,
                    html: content_mekmer
                });
                transporter.sendMail({
                    to: 'muhsin@mekmer.com',
                    from: 'goz@mekmar.com',
                    subject: customSubject,
                    html: content_mekmer
                });
        };
        transporter.sendMail({
            to: 'bilgiislem@mekmar.com',
            from: 'goz@mekmar.com',
            subject: customSubject,
            html: content
        });
       
        transporter.sendMail({
            to: 'export@mekmar.com',
            from: 'goz@mekmar.com',
            subject: customSubject,
            html: content
        });
        transporter.sendMail({
            to: 'export1@mekmar.com',
            from: 'goz@mekmar.com',
            subject: customSubject,
            html: content
        });
        transporter.sendMail({
            to: 'export2@mekmar.com',
            from: 'goz@mekmar.com',
            subject: customSubject,
            html: content
        });
        transporter.sendMail({
            to: 'mehmet@mekmer.com',
            from: 'goz@mekmar.com',
            subject: customSubject,
            html: content
        });
        transporter.sendMail({
            to: 'huseyin@mekmer.com',
            from: 'goz@mekmar.com',
            subject: customSubject,
            html: content
        });

        resolve(true);
    });


};
async function deletedSendMail(payload) {

    return new Promise((resolve, reject) => {
        let content = `
            <h3>${payload.username} Adlı Kullanıcı ${payload.date} Tarihinde ${payload.po} Siparişinden Aşağıdaki Kalemleri Sildi.</h3>
            <br/>
            <table style="border: 1px solid;border-collapse: collapse;width: 100%;">
            <tr style="border: 1px solid;">
                <th style="border: 1px solid;">Sipariş No</th>
                <th style="border: 1px solid;">Tedarikçi</th>
                <th style="border: 1px solid;">Ürün Bilgisi</th>
                <th style="border: 1px solid;">Üretim açıklama</th>
                <th style="border: 1px solid;">Miktar</th>
            </tr>
        `
        payload.deleted.forEach(x => {
            content = content + `
            <tr style="border: 1px solid;">
                <td style="border: 1px solid;text-align:center;">${x.SiparisNo}</td>
                <td style="border: 1px solid;text-align:center;">${x.FirmaAdi}</td>
                <td style="border: 1px solid;text-align:center;">${x.KategoriAdi}-${x.UrunAdi}-${x.YuzeyIslemAdi}-${x.En}x${x.Boy}x${x.Kenar}</td>
                <td style="border: 1px solid;text-align:center;">${x.UretimAciklama}</td>
                <td style="border: 1px solid;text-align:center;">${x.Miktar}</td>
            </tr>`
        });
        content = content + '</table>';
        
        if(payload.operation == payload.representative){
            transporter.sendMail({
                to: payload.representative,
                from: 'goz@mekmar.com',
                subject: 'Sipariş Ürün Silme',
                html: content
            });
        } else{
            transporter.sendMail({
                to: payload.operation,
                from: 'goz@mekmar.com',
                subject: 'Sipariş Ürün Silme',
                html: content
            });
            transporter.sendMail({
                to: payload.representative,
                from: 'goz@mekmar.com',
                subject: 'Sipariş Ürün Silme',
                html: content
            });
        }
        resolve(true);
    });


};
async function updatedSendMail(payload) {
    return new Promise((resolve, reject) => {
        let content = `
            <h3>${payload.username} Adlı Kullanıcı ${payload.date} Tarihinde ${payload.po} Siparişinden Aşağıdaki Kalemleri Güncelledi.</h3>
            <br/>
            <table style="border: 1px solid;border-collapse: collapse;width: 100%;">
            <tr style="border: 1px solid;">
            <th style="border: 1px solid;">Durum</th>
                <th style="border: 1px solid;">Sipariş No</th>
                <th style="border: 1px solid;">Tedarikçi</th>
                <th style="border: 1px solid;">Ürün Bilgisi</th>
                <th style="border: 1px solid;">Üretim açıklama</th>
                <th style="border: 1px solid;">Miktar</th>
                <th style="border: 1px solid;">Alış Fiyatı</th>
                <th style="border: 1px solid;">Satış Fiyatı</th>



            </tr>
        `;
        payload.updated.forEach(x=>{
            const index = payload.notchange.findIndex(y=>y.ID == x.ID);
            const po = payload.notchange[index].SiparisNo;
            const company = payload.notchange[index].FirmaAdi;
            const desc = payload.notchange[index].KategoriAdi + '-' + payload.notchange[index].UrunAdi + '-' + payload.notchange[index].YuzeyIslemAdi + '-' + payload.notchange[index].En + 'x' +payload.notchange[index].Boy + 'x' +payload.notchange[index].Kenar;
            const pdesc = payload.notchange[index].UretimAciklama;
            const amount = payload.notchange[index].Miktar;
            const buying = noneControl(payload.notchange[index].AlisFiyati);
            const selling = noneControl(payload.notchange[index].SatisFiyati);


            content = content + `
            <tr style="border: 1px solid;">
                <td style="border: 1px solid;text-align:center;" style="border:1px solid gray;text-align:center;">Önceki</td>
                <td style="border: 1px solid;text-align:center;" style="border:1px solid gray;text-align:center;">${po}</td>
                <td style="border: 1px solid;text-align:center;" style="border:1px solid gray;text-align:center;background-color:${updateChangedColor(x.FirmaAdi,company)};">${company}</td>
                <td style="border: 1px solid;text-align:center;"style="border:1px solid gray;text-align:center;" >${desc}</td>
                <td style="border: 1px solid;text-align:center;" style="border:1px solid gray;text-align:center;background-color:${updateChangedColor(x.UretimAciklama,pdesc)};">${pdesc}</td>
                <td style="border: 1px solid;text-align:center;" style="border:1px solid gray;text-align:center;background-color:${updateChangedColor(x.Miktar,amount)};">${amount}</td>
                <td style="border: 1px solid;text-align:center;" style="border:1px solid gray;text-align:center;background-color:${updateChangedColor(noneControl(x.AlisFiyati),buying)};">$${buying}</td>
                <td style="border: 1px solid;text-align:center;" style="border:1px solid gray;text-align:center;background-color:${updateChangedColor(noneControl(x.SatisFiyati),selling)};">$${selling}</td>
            </tr>`
        });
        payload.updated.forEach(x => {
            content = content + `
            <tr style="border: 1px solid;">
                <td style="border: 1px solid;text-align:center;">Sonraki</td>
                <td style="border: 1px solid;text-align:center;" >${x.SiparisNo}</td>
                <td style="border: 1px solid;text-align:center;">${x.FirmaAdi}</td>
                <td style="border: 1px solid;text-align:center;">${x.KategoriAdi}-${x.UrunAdi}-${x.YuzeyIslemAdi}-${x.En}x${x.Boy}x${x.Kenar}</td>
                <td style="border: 1px solid;text-align:center;">${x.UretimAciklama}</td>
                <td style="border: 1px solid;text-align:center;">${x.Miktar}</td>
                <td style="border: 1px solid;text-align:center;">$${noneControl(x.AlisFiyati)}</td>
                <td style="border: 1px solid;text-align:center;">$${noneControl(x.SatisFiyati)}</td>
            </tr>`
        });

        content = content + '</table>';

        let content_mekmer = `
            <h3>${payload.username} Adlı Kullanıcı ${payload.date} Tarihinde ${payload.po} Siparişinden Aşağıdaki Kalemleri Güncelledi.</h3>
            <br/>
            <table style="border: 1px solid;border-collapse: collapse;width: 100%;">
            <tr style="border: 1px solid;">
            <th style="border: 1px solid;">Durum</th>
                <th style="border: 1px solid;">Sipariş No</th>
                <th style="border: 1px solid;">Tedarikçi</th>
                <th style="border: 1px solid;">Ürün Bilgisi</th>
                <th style="border: 1px solid;">Üretim açıklama</th>
                <th style="border: 1px solid;">Miktar</th>
                <th style="border: 1px solid;">Alış Fiyatı</th>
                <th style="border: 1px solid;">Satış Fiyatı</th>



            </tr>
        `;
        /*Eğer Mekmer ve Mekmoz ise Sergen ile Muhsin abiye mail gitsin */
        const mekmer_product = payload.updated.filter(x=>(x.FirmaAdi == 'Mekmer') || (x.FirmaAdi == 'Mek-Moz'));
        
        if(mekmer_product.length >0){
            mekmer_product.forEach(x=>{
            const index = payload.notchange.findIndex(y=>y.ID == x.ID);
            const po = payload.notchange[index].SiparisNo;
            const company = payload.notchange[index].FirmaAdi;
            const desc = payload.notchange[index].KategoriAdi + '-' + payload.notchange[index].UrunAdi + '-' + payload.notchange[index].YuzeyIslemAdi + '-' + payload.notchange[index].En + 'x' +payload.notchange[index].Boy + 'x' +payload.notchange[index].Kenar;
            const pdesc = payload.notchange[index].UretimAciklama;
            const amount = payload.notchange[index].Miktar;
            const buying = noneControl(payload.notchange[index].AlisFiyati);
            const selling = noneControl(payload.notchange[index].SatisFiyati);


            content_mekmer = content_mekmer + `
            <tr style="border: 1px solid;">
                <td style="border: 1px solid;text-align:center;" style="border:1px solid gray;text-align:center;">Önceki</td>
                <td style="border: 1px solid;text-align:center;" style="border:1px solid gray;text-align:center;">${po}</td>
                <td style="border: 1px solid;text-align:center;" style="border:1px solid gray;text-align:center;background-color:${updateChangedColor(x.FirmaAdi,company)};">${company}</td>
                <td style="border: 1px solid;text-align:center;"style="border:1px solid gray;text-align:center;" >${desc}</td>
                <td style="border: 1px solid;text-align:center;" style="border:1px solid gray;text-align:center;background-color:${updateChangedColor(x.UretimAciklama,pdesc)};">${pdesc}</td>
                <td style="border: 1px solid;text-align:center;" style="border:1px solid gray;text-align:center;background-color:${updateChangedColor(x.Miktar,amount)};">${amount}</td>
                <td style="border: 1px solid;text-align:center;" style="border:1px solid gray;text-align:center;background-color:${updateChangedColor(noneControl(x.AlisFiyati),buying)};">$${buying}</td>
                <td style="border: 1px solid;text-align:center;" style="border:1px solid gray;text-align:center;background-color:${updateChangedColor(noneControl(x.SatisFiyati),selling)};">$${selling}</td>
            </tr>`
            
            });
            mekmer_product.forEach(x=>{
                content_mekmer = content_mekmer + `
            <tr style="border: 1px solid;">
                <td style="border: 1px solid;text-align:center;">Sonraki</td>
                <td style="border: 1px solid;text-align:center;" >${x.SiparisNo}</td>
                <td style="border: 1px solid;text-align:center;">${x.FirmaAdi}</td>
                <td style="border: 1px solid;text-align:center;">${x.KategoriAdi}-${x.UrunAdi}-${x.YuzeyIslemAdi}-${x.En}x${x.Boy}x${x.Kenar}</td>
                <td style="border: 1px solid;text-align:center;">${x.UretimAciklama}</td>
                <td style="border: 1px solid;text-align:center;">${x.Miktar}</td>
                <td style="border: 1px solid;text-align:center;">$${noneControl(x.AlisFiyati)}</td>
                <td style="border: 1px solid;text-align:center;">$${noneControl(x.SatisFiyati)}</td>
            </tr>`
            });
            content_mekmer = content_mekmer +'</table>';

            transporter.sendMail({
                to: 'muhsin@mekmer.com',
                from: 'goz@mekmar.com',
                subject: 'Sipariş Ürün Güncelleme',
                html: content_mekmer
            });
            transporter.sendMail({
                to: 'sergen@mekmar.com',
                from: 'goz@mekmar.com',
                subject: 'Sipariş Ürün Güncelleme',
                html: content_mekmer
            });

        };

        transporter.sendMail({
            to: 'bilgiislem@mekmar.com',
            from: 'goz@mekmar.com',
            subject: 'Sipariş Ürün Güncelleme',
            html: content
        });


        transporter.sendMail({
            to: 'export@mekmar.com',
            from: 'goz@mekmar.com',
            subject: 'Sipariş Ürün Güncelleme',
            html: content
        });
        transporter.sendMail({
            to: 'export1@mekmar.com',
            from: 'goz@mekmar.com',
            subject: 'Sipariş Ürün Güncelleme',
            html: content
        });
        transporter.sendMail({
            to: 'export2@mekmar.com',
            from: 'goz@mekmar.com',
            subject: 'Sipariş Ürün Güncelleme',
            html: content
        });
        transporter.sendMail({
            to: 'mehmet@mekmer.com',
            from: 'goz@mekmar.com',
            subject: 'Sipariş Ürün Güncelleme',
            html: content
        });
        transporter.sendMail({
            to: 'huseyin@mekmer.com',
            from: 'goz@mekmar.com',
            subject: 'Sipariş Ürün Güncelleme',
            html: content
        });
        
        resolve(true);

    });

};
function updateProductionTotal(po){
    const sql = `select sum(SatisToplam) as Total from SiparisUrunTB where SiparisNo='${po}'`;
    mssql.query(sql,(err,productionTotal)=>{
        if (productionTotal.recordset[0].Total != null) {
            let total = productionTotal.recordset[0].Total;
            const sql2 = `update SiparislerTB SET MalBedeli ='${total}' where SiparisNo='${po}'`;
            mssql.query(sql2);
        } 
    });

};

function updateChangedColor(value1,value2){
    if(value1 == value2){
        return 'transparent';
    } else{
        return 'red';
    }
}


app.post('/order/production/product/save/mail', async (req, res) => {
    if(req.body.updated.length >0 || req.body.added.length >0 || req.body.deleted.length >0){
        if (req.body.added.length > 0) {
            await addedSendMail(req.body).then(response => {
                
                res.status(200).json({'status':true});
            });
        }
        if (req.body.updated.length > 0) {
            await updatedSendMail(req.body).then(response => {
                if(response){
                    res.status(200).json({ 'status': true });
                }
                
            });
        } 
        if(req.body.deleted.length >0){
            await deletedSendMail(req.body).then(response => {
                res.status(200).json({ 'status': true });
            });
        }
            updateProductionTotal(req.body.po);
    
    }else{
        res.status(200).json({'status':false})
    }

    
    
});
app.post('/shipment/products/save/mail',(req,res)=>{
        let content = `
            <h3>${req.body.KullaniciAdi} Adlı Kullanıcı ${req.body.YuklemeTarihi} Tarihinde ${req.body.SiparisNo} Sevkiyatı Gerçekleştirdi.</h3>
            <br/>
            <table style="border: 1px solid;border-collapse: collapse;width: 100%;">
            <tr style="border: 1px solid;">
                <th style="border: 1px solid;">Kasa No</th>
                <th style="border: 1px solid;">Ürün</th>
                <th style="border: 1px solid;">Yüzey</th>
                <th style="border: 1px solid;">Ebat</th>
                <th style="border: 1px solid;">Birim</th>
                <th style="border: 1px solid;">Miktar</th>
                <th style="border: 1px solid;">Toplam</th>

            </tr>
        `
        req.body.data.forEach(x => {
            content = content + `
            <tr style="border: 1px solid;">
                <td style="border: 1px solid;text-align:center;">${x.KasaNo}</td>
                <td style="border: 1px solid;text-align:center;">${x.UrunAdi}</td>
                <td style="border: 1px solid;text-align:center;">${x.YuzeyIslemAdi}</td>
                <td style="border: 1px solid;text-align:center;">${x.En} x ${x.Boy} x ${x.Kenar}</td>
                <td style="border: 1px solid;text-align:center;">${x.BirimAdi}</td>
                <td style="border: 1px solid;text-align:center;">${x.Miktar}</td>
                <td style="border: 1px solid;text-align:center;">$ ${x.TotalProduct}</td>

            </tr>`
        });
        content = content + '</table>';
        transporter.sendMail({
            to: req.body.mail,
            from: 'goz@mekmar.com',
            subject: 'Sipariş Sevkiyat İşlemi',
            html: content
        })
        .then(response=>{
            if(response.response == '250 message sent ok '){
                res.status(200).json({'status':true});
            } else{
                res.status(200).json({'status':false});
            };
        });
        transporter.sendMail({
            to: 'info@mekmar.com',
            from: 'goz@mekmar.com',
            subject: 'Sipariş Sevkiyat İşlemi',
            html: content
        });
        transporter.sendMail({
            to: 'mehmet@mekmer.com',
            from: 'goz@mekmar.com',
            subject: 'Sipariş Sevkiyat İşlemi',
            html: content
        });
        transporter.sendMail({
            to: 'huseyin@mekmer.com',
            from: 'goz@mekmar.com',
            subject: 'Sipariş Sevkiyat İşlemi',
            html: content
        });


});

app.post('/mail/product/control/send',(req,res)=>{
    let content = `
        <h3>${req.body.kontrol_eden} Adlı Kullanıcı ${req.body.po} Siparişini ${req.body.date} Tarihinde Kontrol Etmiştir.</h3>
    `;
    transporter.sendMail({
        to: 'bilgiislem@mekmar.com',
        from: 'goz@mekmar.com',
        subject: 'Sipariş Kontrol Maili',
        html: content
    })        .then(response=>{
        if(response.response == '250 message sent ok '){
            res.status(200).json({'status':true});
        } else{
            res.status(200).json({'status':false});
        };
    });
    transporter.sendMail({
        to: 'export1@mekmar.com',
        from: 'goz@mekmar.com',
        subject: 'Sipariş Kontrol Maili',
        html: content
    })        .then(response=>{
        if(response.response == '250 message sent ok '){
            res.status(200).json({'status':true});
        } else{
            res.status(200).json({'status':false});
        };
    });

    transporter.sendMail({
        to: 'export2@mekmar.com',
        from: 'goz@mekmar.com',
        subject: 'Sipariş Kontrol Maili',
        html: content
    })        .then(response=>{
        if(response.response == '250 message sent ok '){
            res.status(200).json({'status':true});
        } else{
            res.status(200).json({'status':false});
        };
    });
    transporter.sendMail({
        to: 'export@mekmar.com',
        from: 'goz@mekmar.com',
        subject: 'Sipariş Kontrol Maili',
        html: content
    })        .then(response=>{
        if(response.response == '250 message sent ok '){
            res.status(200).json({'status':true});
        } else{
            res.status(200).json({'status':false});
        };
    });
});


/*Logs */
app.post('/logs/save',(req,res)=>{
    const sql = `
    insert into MaliyetAnaliziDegisikliklerTB(
        DegisiklikTarihi,
        DegisiklikYapan,
        SiparisNo,
        IslemAdi,
        Renk
    )
    
    VALUES(
        '${req.body.date}',
        '${req.body.username}',
        '${req.body.po}',
        '${req.body.description}',
        '${req.body.color}'
    )
    `;
    mssql.query(sql,(err,log)=>{
        if(log.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});
            
        }
    });


});


/*Accounts*/
app.get('/accounts/list',(req,res)=>{
    const sql = `select ID,Platform,LoginName,LoginPassword from Accounts`;
    mssql.query(sql,(err,accounts)=>{
        res.status(200).json({'list':accounts.recordset})
    });
});

app.post('/accounts/save',(req,res)=>{
    const sql = `
    insert into Accounts(Platform,LoginName,LoginPassword)
    VALUES('${req.body.Platform}','${req.body.LoginName}','${req.body.LoginPassword}')
    `;
    mssql.query(sql,(err,saved)=>{
        if(saved.rowsAffected[0]==1){
            res.status(200).json({'status':true});

        }else{
            res.status(200).json({'status':false});

        }
    });
});

app.put('/accounts/update',(req,res)=>{
    const sql = `update Accounts SET Platform='${req.body.Platform}',LoginName='${req.body.LoginName}',LoginPassword='${req.body.LoginPassword}' WHERE ID='${req.body.ID}'`;
    mssql.query(sql,(err,accounts)=>{
        if(accounts.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});
        }
    });
});
app.delete('/accounts/delete/:id',(req,res)=>{
    const sql = `delete Accounts WHERE ID='${req.params.id}'`;
    mssql.query(sql,(err,accounts)=>{
        if(accounts.rowsAffected[0]==1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false})
        }
    });
});

/*Quarries Supplier Cost */
app.get('/reports/mekmer/quarries/supplier/:year/:month',(req,res)=>{
    const sqlList = `
 select qs.ID,qs.Date,qs.Supplier,qs.Quarry,qs.StripCost,qs.Strip,qs.StripPrice,qs.StripM2,qs.StripPiece,qs.StripWidth,qs.StripHeight,


	t.FirmaAdi as SupplierName,
	uo.OcakAdi as QuarryName,
	s.Strips as StripName,
    qs.Invoice




from QuarriesSupplierStripsTB qs
inner join TedarikciTB t on t.ID = qs.Supplier
inner join UrunOcakTB uo on uo.ID = qs.Quarry
inner join StripsTB s on s.ID = qs.Strip
where YEAR(Date) = '${req.params.year}' and MONTH(Date) = '${req.params.month}'
    `;
    const suppliersList = 'select ID,FirmaAdi from TedarikciTB';
    const stripsList = 'select ID,Strips from StripsTB';
    const quarriesList = 'select ID,OcakAdi from UrunOcakTB';
    mssql.query(sqlList,(err,list)=>{
        mssql.query(suppliersList,(err,suppliers)=>{
            mssql.query(stripsList,(err,strips)=>{
                mssql.query(quarriesList,(err,quarries)=>{
                    res.status(200).json({
                        'list':list.recordset,
                        'suppliers':suppliers.recordset,
                        'strips':strips.recordset,
                        'quarries':quarries.recordset
                    })
                });
            });
        });
    });
});

function supplierId(id,supplier){
    return new Promise(async (resolve,reject)=>{
        if(id == null || id == '' || id == ' ' || id == undefined || id == 0){
            const insertSql = `insert into TedarikciTB(FirmaAdi) VALUES('${supplier}')`;
            const getIdSql = `select top 1 ID from TedarikciTB order by ID desc`;
            await mssql.query(insertSql,async (err,insert)=>{
                if(insert.rowsAffected[0] == 1){
                    await mssql.query(getIdSql,async (err,getId)=>{
                        if(getId.recordset){
                            await resolve(getId.recordset[0].ID);
                        }
                    })
                }
            });
        }else{
            await resolve(id);
        }
    });
};
function stripId(id,strip){
    return new Promise(async(resolve,reject)=>{
        if(id == null || id == '' || id == 0 || id == undefined || id == ''){
            const insertSql = `insert into StripsTB(Strips) VALUES('${strip}')`;
            const getIdSql = `select top 1 ID from StripsTB order by ID desc`;
            await mssql.query(insertSql,async (err,insert)=>{
                if(insert.rowsAffected[0] == 1){
                    await mssql.query(getIdSql,async (err,_getId)=>{
                        if(_getId.recordset){
                            await resolve(_getId.recordset[0].ID);
                        }else{
                            await reject('Strip Hata Veriyor');
                        }
                    })
                }
            })
        }else{
            await resolve(id);
        }
    });
}
function quarryId(id,quarry){
    return new Promise(async (resolve,reject)=>{
        if(id == null || id == '' || id == ' ' || id == undefined || id == 0){
            const insertSql = `insert into UrunOcakTB(OcakAdi) VALUES('${quarry}')`;
            const _getIdSql = `select top 1 ID from UrunOcakTB order by ID desc`;
            await mssql.query(insertSql,async (err,_insert)=>{
                if(_insert.rowsAffected[0] == 1){
                    await mssql.query(_getIdSql,async (err,_getId)=>{
                        if(_getId.recordset.length >0){
                            await resolve(_getId.recordset[0].ID);
                        }else{
                            console.err('Ocak id eklenirken hata oluştu!');
                        }
                    });
                }else{
                    console.err('Ocak id eklenirken hata oluştu!');
                }
            });
        }else{  
            await resolve(id);
        }
    });
    
}
app.post('/reports/mekmer/quarries/supplier/strips/save',async(req,res)=>{
    const __supplierId = await supplierId(req.body.supplierId,req.body.supplierName);
    const __stripId = await stripId(req.body.stripId,req.body.stripName);
    const __quarryId = await quarryId(req.body.quarryId,req.body.quarryName);


    const insertSql = `
        insert into QuarriesSupplierStripsTB(Date,Supplier,Quarry,StripCost,Strip,StripPrice,StripM2,StripPiece,StripWidth,StripHeight,Invoice)
VALUES('${req.body.date}','${__supplierId}','${__quarryId}','${req.body.stripCost}','${__stripId}','${req.body.stripPrice}','${req.body.stripM2}','${req.body.stripPiece}','${req.body.stripWidth}','${req.body.stripHeight}','${req.body.invoice}')
    `;
    mssql.query(insertSql,(err,insert)=>{
        if(insert.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});
        };
    });
});
app.put('/reports/mekmer/quarries/supplier/strips/update',async(req,res)=>{
    const __supplierId = await supplierId(req.body.supplierId,req.body.supplierName);
    const __stripId = await stripId(req.body.stripId,req.body.stripName);
    const __quarryId = await quarryId(req.body.quarryId,req.body.quarryName);
    const updateSql = `
    update QuarriesSupplierStripsTB 

SET
	Date='${req.body.date}',
	Supplier='${__supplierId}',
	Quarry='${__quarryId}',
	StripCost='${req.body.stripCost}',
	Strip='${__stripId}',
	StripPrice='${req.body.stripPrice}',
	StripM2='${req.body.stripM2}',
	StripPiece='${req.body.stripPiece}',
	StripWidth='${req.body.stripWidth}',
	StripHeight='${req.body.stripHeight}',
    Invoice='${req.body.invoice}'
WHERE
	ID = '${req.body.Id}'

`;
mssql.query(updateSql,(err,_update)=>{
    if(_update.rowsAffected[0] == 1){
        res.status(200).json({'status':true});
    }else{
        res.status(200).json({'status':false});
    };
})
})
app.delete('/reports/mekmer/quarries/supplier/strips/delete/:id',async(req,res)=>{
    const _deleteSql = `delete QuarriesSupplierStripsTB where ID='${req.params.id}'`;
    await mssql.query(_deleteSql,(err,_delete)=>{
        if(_delete.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});
        }
    });

});

/*Molozlar*/
app.post('/reports/mekmer/moloz/save',async(req,res)=>{
    const __supplierId = await supplierId(req.body.supplierId,req.body.supplierName);
    const __stripId = await stripId(req.body.stripId,req.body.stripName);
    const __quarryId = await quarryId(req.body.quarryId,req.body.quarryName);
    const insertSql = `
        insert into QuarriesSupplierMolozTB(Date,Supplier,Quarry,Strip,Ton,PriceTl,PriceUsd,Currency,Total)
        VALUES('${req.body.date}','${__supplierId}','${__quarryId}','${__stripId}','${req.body.ton}','${req.body.price_tl}','${req.body.price_usd}','${req.body.currency}','${req.body.total}')
    `;
    mssql.query(insertSql,(err,insert)=>{
        if(insert.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});
        };
    });
});
app.get('/reports/mekmer/moloz/list/:year/:month',async(req,res)=>{
    const sql = `

        select qsm.ID,qsm.Date,qsm.Supplier,qsm.Quarry,qsm.Strip,qsm.Ton,qsm.PriceTl,qsm.PriceUsd,qsm.Currency,qsm.Total,
        t.FirmaAdi as SupplierName,
        uo.OcakAdi as QuarryName,
        s.Strips as StripName

        from QuarriesSupplierMolozTB qsm
        inner join TedarikciTB t on t.ID = qsm.Supplier
        inner join UrunOcakTB uo on uo.ID = qsm.Quarry
        inner join StripsTB s on s.ID = qsm.Strip
        where YEAR(Date) = '${req.params.year}' and MONTH(Date)= '${req.params.month}'
    `;
    const suppliersList = 'select ID,FirmaAdi from TedarikciTB';
    const stripsList = 'select ID,Strips from StripsTB';
    const quarriesList = 'select ID,OcakAdi from UrunOcakTB';
    mssql.query(sql,(err,list)=>{
        mssql.query(suppliersList,(err,suppliers)=>{
            mssql.query(stripsList,(err,strips)=>{
                mssql.query(quarriesList,(err,quarries)=>{
                    res.status(200).json({
                        'list':list.recordset,
                        'suppliers':suppliers.recordset,
                        'strips':strips.recordset,
                        'quarries':quarries.recordset
                    })
                });
            });
        });
    });
});
app.put('/reports/mekmer/moloz/update',async(req,res)=>{
    const __supplierId = await supplierId(req.body.supplierId,req.body.supplierName);
    const __stripId = await stripId(req.body.stripId,req.body.stripName);
    const __quarryId = await quarryId(req.body.quarryId,req.body.quarryName);
    const updateSql = `
        Update QuarriesSupplierMolozTB SET 
        Date='${req.body.date}',
        Supplier='${__supplierId}',
        Quarry='${__quarryId}',
        Strip='${__stripId}',
        Ton='${req.body.ton}',
        PriceTl='${req.body.price_tl}',
        PriceUsd='${req.body.price_usd}',
        Currency='${req.body.currency}',
        Total = '${req.body.total}'

        where ID = '${req.body.id}'

    `;
    mssql.query(updateSql,(err,_update)=>{
        if(_update.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});
        };
    });
});
app.delete('/reports/mekmer/moloz/delete/:id',async(req,res)=>{
    const deleteSql = `delete QuarriesSupplierMolozTB where ID='${req.params.id}'`;
    mssql.query(deleteSql,(err,_delete)=>{
        if(_delete.rowsAffected[0] == 1){
            res.status(200).json({'status':true});

        }else{
            res.status(200).json({'status':false});


        }
    })
});


/*Shared*/
app.get('/orders/production/list',(req,res)=>{
    const sql = `
    select s.SiparisNo,s.MusteriID from SiparislerTB s where s.SiparisDurumID in (1,2) order by s.SiparisTarihi desc
    `;
    mssql.query(sql,(err,order)=>{
        res.status(200).json({'list':order.recordset});
    });
});
app.get('/country',(req,res)=>{
    const sql = 'select ytu.Id,ytu.UlkeAdi,ytu.Kod,ytu.Icon_Flags,ytu.Png_Flags,ytu.dhl,ytu.UlkeAdi_Fr,ytu.UlkeAdi_Es,ytu.UlkeAdi_Ru,ytu.UlkeAdi_Ar from YeniTeklif_UlkeTB ytu';
    mssql.query(sql,(err,country)=>{
       res.status(200).json({
           'data':country.recordset,
        }) 
    });
});
app.get('/users',(req,res)=>{
    const sql = 'select ID,KullaniciAdi,MailAdres,YSifre from KullaniciTB where Aktif=1'
    mssql.query(sql,(err,users)=>{
       res.status(200).json({
           'users':users.recordset,
        }) 
    });
});
app.get('/orders',(req,res)=>{
    const sql = 'select s.SiparisNo,s.MusteriID from SiparislerTB s where s.SiparisDurumID=2 order by s.SiparisTarihi desc';
    mssql.query(sql,(err,results)=>{
        res.status(200).json({
            'orders':results.recordset
        })
    });
});
app.get('/orders/all',(req,res)=>{
    const sql = 'select s.SiparisNo,s.MusteriID from SiparislerTB s order by s.SiparisTarihi desc';
    mssql.query(sql)
    .then(orders=>{
        res.status(200).json({
            'orders':orders.recordset,
        })
    });
});
app.get('/cards',(req,res)=>{
    const sql = `select 

                    uk.ID,
                    k.KategoriAdi,
                    u.UrunAdi,
                    yk.YuzeyIslemAdi,
                    o.En,
                    o.Boy,
                    o.Kenar,
                    k.ID as KategoriId,
                    u.ID as UrunId,
                    yk.ID as YuzeyId,
                    o.ID as OlcuId

                from UrunKartTB uk
                inner join KategoriTB k on k.ID = uk.KategoriID
                inner join UrunlerTB u on u.ID = uk.UrunID
                inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
                inner join OlculerTB o on o.ID = uk.OlcuID
                order by uk.ID
                `;
    mssql.query(sql,(err,results)=>{
       res.status(200).json({
            'cards':results.recordset,
        }) 
    });
});
app.get('/suppliers',(req,res)=>{
    const sql = `
    
    
                select 
                t.ID,
                t.FirmaAdi,
                (select count(su.TedarikciID) from SiparisUrunTB su where su.TedarikciID = t.ID) as ToplamTedarikci

            from TedarikciTB t
    
    `;
    mssql.query(sql,(err,suppliers)=>{
        res.status(200).json({
           'suppliers':suppliers.recordset, 
        });
    });
});
app.get('/mines',(req,res)=>{
    const sql = 'select uo.ID,uo.OcakAdi from UrunOcakTB uo';
    mssql.query(sql,(err,mines)=>{
       res.status(200).json({
            'mines':mines.recordset
        }) 
    });
});

app.get('/order/products/normal/:po',(req,res)=>{
    const sql = `
    select su.SatisFiyati,su.AlisFiyati,su.ID,su.UrunBirimID,s.SiparisNo,uk.ID as UrunKartId,k.KategoriAdi,ur.UrunAdi,yk.YuzeyIslemAdi,ol.En,ol.Boy,ol.Kenar,su.TedarikciID,(t.FirmaAdi + '/' + k.KategoriAdi + '/' + ur.UrunAdi + '/' + yk.YuzeyIslemAdi + '/' + ol.En + 'x' + ol.Boy + 'x' + ol.Kenar) as Aciklama from SiparislerTB s
    inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
    inner join UrunKartTB uk on uk.ID = su.UrunKartID
    inner join UrunlerTB ur on ur.ID = uk.UrunID
    inner join KategoriTB k on k.ID = uk.KategoriID
    inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
    inner join OlculerTB ol on ol.ID = uk.OlcuID
    inner join TedarikciTB t on t.ID = su.TedarikciID
    
    where s.SiparisDurumID in (1,2) and  s.SiparisNo='${req.params.po}'
    `;
    mssql.query(sql,(err,products)=>{
        res.status(200).json({
            'products':products.recordset,
        })
    });
});


app.get('/order/products/:po',(req,res)=>{
    const sql = `select su.ID,su.UrunBirimID,s.SiparisNo,uk.ID as UrunKartId,k.KategoriAdi,ur.UrunAdi,yk.YuzeyIslemAdi,ol.En,ol.Boy,ol.Kenar,su.TedarikciID,(t.FirmaAdi + '/' + k.KategoriAdi + '/' + ur.UrunAdi + '/' + yk.YuzeyIslemAdi + '/' + ol.En + 'x' + ol.Boy + 'x' + ol.Kenar) as Aciklama from SiparislerTB s
                inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
                inner join UrunKartTB uk on uk.ID = su.UrunKartID
                inner join UrunlerTB ur on ur.ID = uk.UrunID
                inner join KategoriTB k on k.ID = uk.KategoriID
                inner join YuzeyKenarTB yk on yk.ID = uk.YuzeyID
                inner join OlculerTB ol on ol.ID = uk.OlcuID
                inner join TedarikciTB t on t.ID = su.TedarikciID
                
                where s.SiparisDurumID in (1,2) and dbo.Production_Total_Control_Fk(s.SiparisNo,su.UrunKartID) < su.Miktar and  s.SiparisNo='${req.params.po}'
    `;
    mssql.query(sql,(err,products)=>{
        res.status(200).json({
            'products':products.recordset,
        })
    });
});
app.get('/cardcategories',(req,res)=>{
    const sql = 'select ID,KategoriAdi from KategoriTB';
    mssql.query(sql,(err,categories)=>{
       res.status(200).json({
            'categories':categories.recordset,
        }) 
    });
});
app.get('/cardproducts',(req,res)=>{
    const sql = 'select ID,UrunAdi from UrunlerTB';
    mssql.query(sql,(err,products)=>{
       res.status(200).json({
            'products':products.recordset,
        }) 
    });
});
app.get('/cardsurfaces',(req,res)=>{
    const sql = 'select ID,YuzeyIslemAdi from YuzeyKenarTB';
    mssql.query(sql,(err,surfaces)=>{
       res.status(200).json({
            'surfaces':surfaces.recordset,
        }) 
    });
});
app.get('/cardsizes',(req,res)=>{
    const sql = 'select ID,En,Boy,Kenar from OlculerTB';
    mssql.query(sql,(err,sizes)=>{
       res.status(200).json({
            'sizes':sizes.recordset,
        }) 
    });
});
app.get('/selection/surfaces', (req, res) => {
    const sql = `select ID,Surface,UserId from CustomersSurfaceTB`;
    mssql.query(sql, (err, results) => {
        res.status(200).json({
            'surfaces': results.recordset
        })
    })
});
app.get('/loading/years/months', (req, res) => {
    const yearsSql = `
        select 
            YEAR(s.YuklemeTarihi) as Yil
        from SiparislerTB s 
        where YEAR(s.YuklemeTarihi) is not null
        group by YEAR(s.YuklemeTarihi)
        order by YEAR(s.YuklemeTarihi) desc
    `;
    mssql.query(yearsSql, (err, years) => {
        let year = years.recordset[0].Yil;
        const monthsSql = `
        select 
	MONTH(s.YuklemeTarihi) as Ay
from SiparislerTB s 
where MONTH(s.YuklemeTarihi) is not null and YEAR(s.YuklemeTarihi) = '${year}'
group by MONTH(s.YuklemeTarihi)
order by MONTH(s.YuklemeTarihi) desc
                     `;
        mssql.query(monthsSql, (err, months) => {
            res.status(200).json({
                'years': years.recordset,
                'months':months.recordset
            })
        });
    });
});
app.get('/order/year/list', (req, res) => {
    const sql = `select YEAR(s.SiparisTarihi) as Year from SiparislerTB s 

group by YEAR(s.SiparisTarihi)
order by YEAR(s.SiparisTarihi) desc`;
    mssql.query(sql, (err, results) => {
        res.status(200).json({ 'list': results.recordset }); 
    });
});
app.get('/customer/offer/list/all', (req, res) => {
    const sql = `
                    select 

	ytm.Id,
	ytm.UlkeId,
	ytm.MusteriAdi,
	ytm.Adress

from YeniTeklif_MusterilerTB ytm
    `;
    mssql.query(sql, (err, results) => {
        res.status(200).json({ 'list': results.recordset }); 
    });
});
app.get('/sample/category/list', (req, res) => {
    const sql = `select nk.ID,nk.Urun from NumuneKategoriTB nk`;
    mssql.query(sql, (err, results) => {
        res.status(200).json({
            'list':results.recordset
        })
    })
});
app.get('/sample/unit/list', (req, res) => {
    const sql = `select ub.ID,ub.BirimAdi from UrunBirimTB ub`;
    mssql.query(sql, (err, results) => {
        res.status(200).json({ 'list': results.recordset }); 
    });
});
app.get('/sample/sending/type/list', (req, res) => {
    const sql = `select ngt.ID,ngt.GonderiAdi from NumuneGonderiTipi ngt`;
    mssql.query(sql, (err, results) => {
        res.status(200).json({ 'list': results.recordset }); 
    });
});
app.get('/sample/bank/account/type/list', (req, res) => {
    const sql = `select nbs.ID,nbs.BankaAdi from NumuneBankaSecim nbs`;
    mssql.query(sql, (err, results) => {
        res.status(200).json({ 'list': results.recordset }); 
    });
});
app.get('/offer/shared/list',(req,res)=>{
    const categorySql = `
                    select 

                ytk.Id,
                ytk.KategoriAdi

            from YeniTeklif_KategorilerTB ytk
    `;
    const productSql = `
        select 
	ytu.Id,
	ytu.UrunAdi
from YeniTeklif_UrunlerTB ytu
    `;
    const sizeSql = `
        select 
	ytoe.id,
	ytoe.EnBoy
from YeniTeklif_Olcu_EnBoyTB ytoe
    `;
    const thicknessSql = `
                select 
            ytok.id,
            ytok.Kalinlik
        from YeniTeklif_Olcu_KalinlikTB ytok
    `;
    const surfaceSql = `
        select 

	yty.Id,
	yty.IslemAdi

from YeniTeklif_YuzeyIslemTB yty
    `;
    const unitSql = `
        select

            ytu.Birim

        from YeniTeklif_UrunKayitTB ytu
        where ytu.Birim is not null and ytu.Birim != '' and ytu.Birim not in ('Carrara White','Bianco Ibiza')
        group by ytu.Birim
    `;

    mssql.query(categorySql, (err, category) => {
        mssql.query(productSql, (err, product) => {
            mssql.query(sizeSql, (err, size) => {
                mssql.query(thicknessSql, (err, thickness) => {
                    mssql.query(surfaceSql, (err, surface) => {
                      mssql.query(unitSql, (err, unit) => {
                        res.status(200).json({
                            'category':category.recordset,
                            'product':product.recordset,
                            'size':size.recordset,
                            'thickness':thickness.recordset,
                            'unit':unit.recordset,
                            'surface':surface.recordset

                        })
                    }); 
                    });

                });
            });  
        });
    });
});
app.get('/panel/product/shared/list', (req, res) => {
    const sizeSql = `select ebat from MekmarCom_Ebatlar group by ebat`;
    const finishSql = `select finish_en,finish_fr,finish_es,finish_ru from MekmarCom_Finish group by finish_en,finish_fr,finish_es,finish_ru`;
    const colorSql = `select ID,renk_en,renk_es,renk_fr,renk_ru from MekmarCom_ProductsColor`;
    const areaSql = `select ID,Areas,Link,Areas_fr,Areas_es,Areas_ru from MekmarCom_Areas`;
    const styleSql = `select ID,StilEn,StilFr,StilEs,StilRu,StilLink from MekmarCom_StilList`;
    const typeSql = `select ID,TurEn,TurFr,TurEs,TurRu,TurLink from MekmarCom_TurList`;
    const materialSql = `select ID,MateryalEn,MateryalFr,MateryalEs,MateryalRu,MateryalLink from MekmarCom_MateryalList`;
    const edgeSql = `select ID,KenarEn,KenarFr,KenarEs,KenarRu from MekmarCom_KenarList`;
    mssql.query(sizeSql,(err,size)=>{
        mssql.query(finishSql, (err, finish) => {
            mssql.query(colorSql, (err, color) => {
               mssql.query(areaSql,(err,area)=>{
                   mssql.query(styleSql, (err, style) => {
                    mssql.query(typeSql,(err,type)=>{
                        mssql.query(materialSql, (err, material) => {
                            mssql.query(edgeSql,(err,edge)=>{
                                res.status(200).json({
                                    'size':size.recordset,
                                    'finish':finish.recordset,
                                    'color':color.recordset,
                                     'area': area.recordset,
                                    'style':style.recordset,
                                    'type':type.recordset,
                                    'material':material.recordset,
                                    'edge':edge.recordset
                                 });
                            });

                        });
                    });
                   }); 
            });
            });
        }); 
    });

});
app.get('/customers/list', (req, res) => {
    const sql = `
        select 

            ID,
            FirmaAdi,
            Ulke,
            UlkeId

        from MusterilerTB
    `;
    mssql.query(sql,(err,customer)=>{
       res.status(200).json({'list':customer.recordset}) 
    });
});
app.get('/unit/list', (req, res) => {
    const sql = `select ID,BirimAdi from UrunBirimTB`;
    mssql.query(sql, (err, unit) => {
        res.status(200).json({ 'list': unit.recordset });
    });
});
app.get('/order/kind/of/delivery', (req, res) => {
    const sql = `select ID,TeslimTur from SiparisTeslimTurTB where Aciklama is null`;
    mssql.query(sql,(err,delivery)=>{
       res.status(200).json({'list':delivery.recordset}); 
    });
});
app.get('/order/kind/of/payment', (req, res) => {
    const sql = `select ID,OdemeTur from OdemeTurTB`;
    mssql.query(sql,(err,payment)=>{
       res.status(200).json({'list':payment.recordset}); 
    });
});
app.get('/order/kind/of/invoice', (req, res) => {
    const sql = `select ID,FaturaAdi from FaturaKesilmeTB where ID != 2`;
    mssql.query(sql, (err, invoice) => {
        res.status(200).json({'list':invoice.recordset})
    });
});
app.get('/order/kind/of/delivery/supplier', (req, res) => {
    const sql = `select ID,TeslimAdi from Tedarikci_Teslim_TurTB`;
    mssql.query(sql, (err, supplier) => {
        res.status(200).json({ 'list': supplier.recordset }); 
    });
});

app.get('/year/list',(req,res)=>{
    const sql = `
        select YEAR(YuklemeTarihi) as Year from SiparislerTB 
        where YEAR(YuklemeTarihi) is not null
        group by YEAR(YuklemeTarihi) order by YEAR(YuklemeTarihi) desc
        
    `;
    mssql.query(sql,(err,year)=>{
        res.status(200).json({'list':year.recordset});
    });
});
app.get('/month/list',async (req,res)=>{
    const yearsListSql = `
        select Year(YuklemeTarihi) as Yil from SiparislerTB s

where SiparisDurumID = 3
group by YEAR(YuklemeTarihi)
order by YEAR(YuklemeTarihi) desc
    `;

    await mssql.query(yearsListSql,async (err,years)=>{
        
            const sql = `
            select MONTH(YuklemeTarihi) as Month from SiparislerTB s

            where SiparisDurumID = 3 and YEAR(YuklemeTarihi) = '${years.recordset[0].Yil}'
            group by MONTH(YuklemeTarihi)
            order by MONTH(YuklemeTarihi) desc

        `;

        await mssql.query(sql,async (err,year)=>{
            res.status(200).json({'list':year.recordset});
        });

    });



});

app.get('/reports/ayo/currency/list/:year',(req,res)=>{
    const year = req.params.year;
    const sql = `
        select * from AyoCurrency where YEAR='${year}'
    `;
    mssql.query(sql,(err,cost)=>{
        if(cost.recordset.length == 0){
            res.status(200).json({
                'list':[
                    {'month_id':1,'month':'January','currency':0},
                    {'month_id':2,'month':'February','currency':0},
                    {'month_id':3,'month':'March','currency':0},
                    {'month_id':4,'month':'April','currency':0},
                    {'month_id':5,'month':'May','currency':0},
                    {'month_id':6,'month':'June','currency':0},
                    {'month_id':7,'month':'July','currency':0},
                    {'month_id':8,'month':'August','currency':0},
                    {'month_id':9,'month':'September','currency':0},
                    {'month_id':10,'month':'October','currency':0},
                    {'month_id':11,'month':'November','currency':0},
                    {'month_id':12,'month':'December','currency':0}

                ]
            })

        }else{
            const liste = [
                    {'id':0,'month_id':1,'month':'January','currency':0},
                    {'id':0,'month_id':2,'month':'February','currency':0},
                    {'id':0,'month_id':3,'month':'March','currency':0},
                    {'id':0,'month_id':4,'month':'April','currency':0},
                    {'id':0,'month_id':5,'month':'May','currency':0},
                    {'id':0,'month_id':6,'month':'June','currency':0},
                    {'id':0,'month_id':7,'month':'July','currency':0},
                    {'id':0,'month_id':8,'month':'August','currency':0},
                    {'id':0,'month_id':9,'month':'September','currency':0},
                    {'id':0,'month_id':10,'month':'October','currency':0},
                    {'id':0,'month_id':11,'month':'November','currency':0},
                    {'id':0,'month_id':12,'month':'December','currency':0}

            ]
            cost.recordset.forEach(x=>{
                if(x.MONTH === 1){
                    liste[0].id = x.ID;
                    liste[0].currency = x.CURRENCY;
                }else if(x.MONTH === 2){
                    liste[1].id = x.ID;

                    liste[1].currency = x.CURRENCY;
                }else if(x.MONTH === 3){
                    liste[2].id = x.ID;

                    liste[2].currency = x.CURRENCY;
                }else if(x.MONTH === 4){
                    liste[3].id = x.ID;

                    liste[3].currency = x.CURRENCY;
                }else if(x.MONTH === 5){
                    liste[4].id = x.ID;

                    liste[4].currency = x.CURRENCY;
                }else if(x.MONTH === 6){
                    liste[5].id = x.ID;

                    liste[5].currency = x.CURRENCY;
                }else if(x.MONTH === 7){
                    liste[6].id = x.ID;

                    liste[6].currency = x.CURRENCY;
                }else if(x.MONTH === 8){
                    liste[7].id = x.ID;

                    liste[7].currency = x.CURRENCY;
                }else if(x.MONTH === 9){
                    liste[8].id = x.ID;

                    liste[8].currency = x.CURRENCY;
                }else if(x.MONTH === 10){
                    liste[9].id = x.ID;

                    liste[9].currency = x.CURRENCY;
                }else if(x.MONTH === 11){
                    liste[10].id = x.ID;

                    liste[10].currency = x.CURRENCY;
                }else if(x.MONTH === 12){
                    liste[11].id = x.ID;

                    liste[11].currency = x.CURRENCY;
                }
            });
            res.status(200).json({'list':liste})
        }
        
    });
});
app.post('/reports/ayo/currency/save',(req,res)=>{
    const body = req.body;
    const insertSql = `
        insert into AyoCurrency(YEAR,MONTH,CURRENCY)
        VALUES('${body.year}','${body.month}','${body.currency}')
    `;
    mssql.query(insertSql,(err,currency)=>{
        if(currency.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});

        }
    });
});

app.put('/reports/ayo/currency/update',(req,res)=>{
    const body = req.body;
    const updateSql = `
        update AyoCurrency SET CURRENCY='${body.currency}' WHERE ID='${body.id}'
    `;
    mssql.query(updateSql,(err,currency)=>{
        if(currency.rowsAffected[0] == 1){
            res.status(200).json({'status':true});
        }else{
            res.status(200).json({'status':false});
            
        }
    });
});

function getCurrencySql(year){
    const currencySql = `select * from AyoCurrency where YEAR='${year}'`;
    return new Promise(async (resolve,reject)=>{
        await mssql.query(currencySql,(err,currency)=>{
            resolve(currency.recordset);
        });
    });
};

app.get('/reports/ayo/credit/card/cost/list/:year', (req,res)=>{
    const year = req.params.year;
    const sql = `
                        select 

                    ac.ID,
                    ac.YEAR,
                    ac.MONTH,
                    ac.CreditCardUsd,
                    ac.CreditCardTl,
                    (select cur.CURRENCY from AyoCurrency cur where cur.YEAR = ac.YEAR and cur.MONTH = ac.MONTH) as Currency

                from AyoCreditCardCostTB ac where ac.YEAR='${year}'
    `;
    mssql.query(sql, async(err,cost)=>{
        if(cost.recordset.length == 0){
            const currencySql = `select * from AyoCurrency where YEAR='${year}'`;
            let list= [
                    {'month_id':1,'month':'January','value':0,'currency':0,'usd':0},
                    {'month_id':2,'month':'February','value':0,'currency':0,'usd':0},
                    {'month_id':3,'month':'March','value':0,'currency':0,'usd':0},
                    {'month_id':4,'month':'April','value':0,'currency':0,'usd':0},
                    {'month_id':5,'month':'May','value':0,'currency':0,'usd':0},
                    {'month_id':6,'month':'June','value':0,'currency':0,'usd':0},
                    {'month_id':7,'month':'July','value':0,'currency':0,'usd':0},
                    {'month_id':8,'month':'August','value':0,'currency':0,'usd':0},
                    {'month_id':9,'month':'September','value':0,'currency':0,'usd':0},
                    {'month_id':10,'month':'October','value':0,'currency':0,'usd':0},
                    {'month_id':11,'month':'November','value':0,'currency':0,'usd':0},
                    {'month_id':12,'month':'December','value':0,'currency':0,'usd':0}

                ]
            mssql.query(currencySql,(err,currency)=>{
                currency.recordset.forEach(x=>{
                    if(x.MONTH == 1){
                        list[0].currency = x.CURRENCY;
                    }else if (x.MONTH == 2){
                        list[1].currency = x.CURRENCY;
                    }else if (x.MONTH == 3){
                        list[2].currency = x.CURRENCY;
                    }else if (x.MONTH == 4){
                        list[3].currency = x.CURRENCY;
                    }else if (x.MONTH == 5){
                        list[4].currency = x.CURRENCY;
                    }else if (x.MONTH == 6){
                        list[5].currency = x.CURRENCY;
                    }else if (x.MONTH == 7){
                        list[6].currency = x.CURRENCY;
                    }else if (x.MONTH == 8){
                        list[7].currency = x.CURRENCY;
                    }else if (x.MONTH == 9){
                        list[8].currency = x.CURRENCY;
                    }else if (x.MONTH == 10){
                        list[9].currency = x.CURRENCY;
                    }else if (x.MONTH == 11){
                        list[10].currency = x.CURRENCY;
                    }else if (x.MONTH == 12){
                        list[11].currency = x.CURRENCY;
                    }
                });
                res.status(200).json({
                    'list':list
                });
            });

            

        }else{
            const currencySql = `select * from AyoCurrency where YEAR='${year}'`;

            let liste = [
                    {'id':0,'month_id':1,'month':'January','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':2,'month':'February','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':3,'month':'March','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':4,'month':'April','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':5,'month':'May','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':6,'month':'June','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':7,'month':'July','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':8,'month':'August','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':9,'month':'September','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':10,'month':'October','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':11,'month':'November','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':12,'month':'December','value':0,'currency':0,'usd':0}

            ];

            const currency =await getCurrencySql(year);
            currency.forEach(x=>{
                    if(x.MONTH == 1){
                        liste[0].currency = x.CURRENCY;
                    }else if (x.MONTH == 2){
                        liste[1].currency = x.CURRENCY;
                    }else if (x.MONTH == 3){
                        liste[2].currency = x.CURRENCY;
                    }else if (x.MONTH == 4){
                        liste[3].currency = x.CURRENCY;
                    }else if (x.MONTH == 5){
                        liste[4].currency = x.CURRENCY;
                    }else if (x.MONTH == 6){
                        liste[5].currency = x.CURRENCY;
                    }else if (x.MONTH == 7){
                        liste[6].currency = x.CURRENCY;
                    }else if (x.MONTH == 8){
                        liste[7].currency = x.CURRENCY;
                    }else if (x.MONTH == 9){
                        liste[8].currency = x.CURRENCY;
                    }else if (x.MONTH == 10){
                        liste[9].currency = x.CURRENCY;
                    }else if (x.MONTH == 11){
                        liste[10].currency = x.CURRENCY;
                    }else if (x.MONTH == 12){
                        liste[11].currency = x.CURRENCY;
                    }
                });

            cost.recordset.forEach(x=>{
                if(x.MONTH === 1){
                    liste[0].id = x.ID;
                    liste[0].value = x.CreditCardTl;
                    liste[0].currency = x.Currency;
                    liste[0].usd = x.CreditCardUsd;
                }else if(x.MONTH === 2){
                    liste[1].id = x.ID;

                    liste[1].value = x.CreditCardTl;
                    liste[1].currency = x.Currency;
                    liste[1].usd = x.CreditCardUsd;
                }else if(x.MONTH === 3){
                    liste[2].id = x.ID;

                    liste[2].value = x.CreditCardTl;
                    liste[2].currency = x.Currency;
                    liste[2].usd = x.CreditCardUsd;
                }else if(x.MONTH === 4){
                    liste[3].id = x.ID;

                    liste[3].value = x.CreditCardTl;
                    liste[3].currency = x.Currency;
                    liste[3].usd = x.CreditCardUsd;
                }else if(x.MONTH === 5){
                    liste[4].id = x.ID;

                    liste[4].value = x.CreditCardTl;
                    liste[4].currency = x.Currency;
                    liste[4].usd = x.CreditCardUsd;
                }else if(x.MONTH === 6){
                    liste[5].id = x.ID;

                    liste[5].value = x.CreditCardTl;
                    liste[5].currency = x.Currency;
                    liste[5].usd = x.CreditCardUsd;
                }else if(x.MONTH === 7){
                    liste[6].id = x.ID;

                    liste[6].value = x.CreditCardTl;
                    liste[6].currency = x.Currency;
                    liste[6].usd = x.CreditCardUsd;
                }else if(x.MONTH === 8){
                    liste[7].id = x.ID;

                    liste[7].value = x.CreditCardTl;
                    liste[7].currency = x.Currency;
                    liste[7].usd = x.CreditCardUsd;
                }else if(x.MONTH === 9){
                    liste[8].id = x.ID;

                    liste[8].value = x.CreditCardTl;
                    liste[8].currency = x.Currency;
                    liste[8].usd = x.CreditCardUsd;
                }else if(x.MONTH === 10){
                    liste[9].id = x.ID;

                    liste[9].value = x.CreditCardTl;
                    liste[9].currency = x.Currency;
                    liste[9].usd = x.CreditCardUsd;
                }else if(x.MONTH === 11){
                    liste[10].id = x.ID;

                    liste[10].value = x.CreditCardTl;
                    liste[10].currency = x.Currency;
                    liste[10].usd = x.CreditCardUsd;
                }else if(x.MONTH === 12){
                    liste[11].id = x.ID;

                    liste[11].value = x.CreditCardTl;
                    liste[11].currency = x.Currency;
                    liste[11].usd = x.CreditCardUsd;
                }
            });
            res.status(200).json({'list':liste})
        }
        
    })
});

app.post('/reports/ayo/credit/card/cost/save',(req,res)=>{
    const body = req.body;
    const insertSql = `
        insert into AyoCreditCardCostTB(
        YEAR,
        MONTH,
        CreditCardUsd,
        CreditCardTl,
        Currency
        )
        VALUES('${body.year}','${body.month}','${body.usd}','${body.value}','${body.currency}')
    `;
    mssql.query(insertSql,(err,result)=>{
        if(err) throw err;
        res.status(200).json({'message':'Saved successfully'})
    })
});

app.put('/reports/ayo/credit/card/cost/update',(req,res)=>{
    const body = req.body;
    const updateSql = `
        update AyoCreditCardCostTB
        SET
        YEAR='${body.year}',
        MONTH='${body.month}',
        CreditCardUsd='${body.usd}',
        CreditCardTl='${body.value}',
        Currency='${body.currency}'
        where
        ID='${body.id}'
    `;
    mssql.query(updateSql,(err,result)=>{
        if(err) throw err;
        res.status(200).json({'message':'Updated successfully'})
    })
});

app.get('/reports/ayo/travel/cost/list/:year',(req,res)=>{
    const year = req.params.year;
    const sql = `
        select 

	ac.ID,
	ac.YEAR,
	ac.MONTH,
	ac.USD,
	ac.TL,
	(select cur.CURRENCY from AyoCurrency cur where cur.YEAR = ac.YEAR and cur.MONTH = ac.MONTH) as CURRENCY

from AyoTravelCostTB ac where ac.YEAR='${year}'
    `;
    mssql.query(sql,async(err,cost)=>{
        const currency = await getCurrencySql(year);
        if(cost.recordset.length == 0){
            let list = [
                {'month_id':1,'month':'January','value':0,'currency':0,'usd':0},
                {'month_id':2,'month':'February','value':0,'currency':0,'usd':0},
                {'month_id':3,'month':'March','value':0,'currency':0,'usd':0},
                {'month_id':4,'month':'April','value':0,'currency':0,'usd':0},
                {'month_id':5,'month':'May','value':0,'currency':0,'usd':0},
                {'month_id':6,'month':'June','value':0,'currency':0,'usd':0},
                {'month_id':7,'month':'July','value':0,'currency':0,'usd':0},
                {'month_id':8,'month':'August','value':0,'currency':0,'usd':0},
                {'month_id':9,'month':'September','value':0,'currency':0,'usd':0},
                {'month_id':10,'month':'October','value':0,'currency':0,'usd':0},
                {'month_id':11,'month':'November','value':0,'currency':0,'usd':0},
                {'month_id':12,'month':'December','value':0,'currency':0,'usd':0}

            ];
            await currency.forEach(x=>{
                if(x.MONTH == 1){
                    list[0].currency = x.CURRENCY;
                }else if (x.MONTH == 2){
                    list[1].currency = x.CURRENCY;
                }else if (x.MONTH == 3){
                    list[2].currency = x.CURRENCY;
                }else if (x.MONTH == 4){
                    list[3].currency = x.CURRENCY;
                }else if (x.MONTH == 5){
                    list[4].currency = x.CURRENCY;
                }else if (x.MONTH == 6){
                    list[5].currency = x.CURRENCY;
                }else if (x.MONTH == 7){
                    list[6].currency = x.CURRENCY;
                }else if (x.MONTH == 8){
                    list[7].currency = x.CURRENCY;
                }else if (x.MONTH == 9){
                    list[8].currency = x.CURRENCY;
                }else if (x.MONTH == 10){
                    list[9].currency = x.CURRENCY;
                }else if (x.MONTH == 11){
                    list[10].currency = x.CURRENCY;
                }else if (x.MONTH == 12){
                    list[11].currency = x.CURRENCY;
                }
            });


            res.status(200).json({
                list:list
            });

        }else{
            const liste = [
                    {'id':0,'month_id':1,'month':'January','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':2,'month':'February','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':3,'month':'March','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':4,'month':'April','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':5,'month':'May','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':6,'month':'June','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':7,'month':'July','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':8,'month':'August','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':9,'month':'September','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':10,'month':'October','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':11,'month':'November','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':12,'month':'December','value':0,'currency':0,'usd':0}

            ];
            await currency.forEach(x=>{
                if(x.MONTH == 1){
                    liste[0].currency = x.CURRENCY;
                }else if (x.MONTH == 2){
                    liste[1].currency = x.CURRENCY;
                }else if (x.MONTH == 3){
                    liste[2].currency = x.CURRENCY;
                }else if (x.MONTH == 4){
                    liste[3].currency = x.CURRENCY;
                }else if (x.MONTH == 5){
                    liste[4].currency = x.CURRENCY;
                }else if (x.MONTH == 6){
                    liste[5].currency = x.CURRENCY;
                }else if (x.MONTH == 7){
                    liste[6].currency = x.CURRENCY;
                }else if (x.MONTH == 8){
                    liste[7].currency = x.CURRENCY;
                }else if (x.MONTH == 9){
                    liste[8].currency = x.CURRENCY;
                }else if (x.MONTH == 10){
                    liste[9].currency = x.CURRENCY;
                }else if (x.MONTH == 11){
                    liste[10].currency = x.CURRENCY;
                }else if (x.MONTH == 12){
                    liste[11].currency = x.CURRENCY;
                }
            });


            cost.recordset.forEach(x=>{
                if(x.MONTH === 1){
                    liste[0].id = x.ID;
                    liste[0].value = x.TL;
                    liste[0].currency = x.CURRENCY;
                    liste[0].usd = x.USD;
                }else if(x.MONTH === 2){
                    liste[1].id = x.ID;

                    liste[1].value = x.TL;
                    liste[1].currency = x.CURRENCY;
                    liste[1].usd = x.USD;
                }else if(x.MONTH === 3){
                    liste[2].id = x.ID;

                    liste[2].value = x.TL;
                    liste[2].currency = x.CURRENCY;
                    liste[2].usd = x.USD;
                }else if(x.MONTH === 4){
                    liste[3].id = x.ID;

                    liste[3].value = x.TL;
                    liste[3].currency = x.CURRENCY;
                    liste[3].usd = x.USD;
                }else if(x.MONTH === 5){
                    liste[4].id = x.ID;

                    liste[4].value = x.TL;
                    liste[4].currency = x.CURRENCY;
                    liste[4].usd = x.USD;
                }else if(x.MONTH === 6){
                    liste[5].id = x.ID;

                    liste[5].value = x.TL;
                    liste[5].currency = x.CURRENCY;
                    liste[5].usd = x.USD;
                }else if(x.MONTH === 7){
                    liste[6].id = x.ID;

                    liste[6].value = x.TL;
                    liste[6].currency = x.CURRENCY;
                    liste[6].usd = x.USD;
                }else if(x.MONTH === 8){
                    liste[7].id = x.ID;

                    liste[7].value = x.TL;
                    liste[7].currency = x.CURRENCY;
                    liste[7].usd = x.USD;
                }else if(x.MONTH === 9){
                    liste[8].id = x.ID;

                    liste[8].value = x.TL;
                    liste[8].currency = x.CURRENCY;
                    liste[8].usd = x.USD;
                }else if(x.MONTH === 10){
                    liste[9].id = x.ID;

                    liste[9].value = x.TL;
                    liste[9].currency = x.CURRENCY;
                    liste[9].usd = x.USD;
                }else if(x.MONTH === 11){
                    liste[10].id = x.ID;

                    liste[10].value = x.TL;
                    liste[10].currency = x.CURRENCY;
                    liste[10].usd = x.USD;
                }else if(x.MONTH === 12){
                    liste[11].id = x.ID;

                    liste[11].value = x.TL;
                    liste[11].currency = x.CURRENCY;
                    liste[11].usd = x.USD;
                }
            });
            res.status(200).json({'list':liste})
        }
        
    });
});
app.post('/reports/ayo/travel/cost/save',(req,res)=>{
    const body = req.body;
    const insertSql = `
        
insert into AyoTravelCostTB
(
	YEAR,
	MONTH,
	USD,
	TL,
	CURRENCY
) VALUES('${body.year}','${body.month}','${body.usd}','${body.value}','${body.currency}')
    `;
    mssql.query(insertSql,(err,result)=>{
        if(err) throw err;
        res.status(200).json({'message':'Saved successfully'})
    })
});
app.put('/reports/ayo/travel/cost/update',(req,res)=>{
    const body = req.body;
    const updateSql = `
        
        update AyoTravelCostTB
        SET
            YEAR='${body.year}',
            MONTH='${body.month}',
            USD='${body.usd}',
            TL='${body.value}',
            CURRENCY='${body.currency}'
        WHERE
        ID ='${body.id}'
        
    `;
    mssql.query(updateSql,(err,result)=>{
        if(err) throw err;
        res.status(200).json({'message':'Saved successfully'})
    })
});

app.get('/reports/ayo/wage/cost/list/:year',(req,res)=>{
    const year = req.params.year;
    const sql = `
                select 

	ac.ID,
	ac.YEAR,
	ac.MONTH,
	ac.USD,
	ac.TL,
	(select cur.CURRENCY from AyoCurrency cur where cur.YEAR = ac.YEAR and cur.MONTH = ac.MONTH) as CURRENCY

from AyoWageCostTB ac where ac.YEAR='${year}'
    `;
    mssql.query(sql,async (err,cost)=>{
        const currency = await getCurrencySql(year);

        if(cost.recordset.length == 0){
            const list = [
                    {'month_id':1,'month':'January','value':0,'currency':0,'usd':0},
                    {'month_id':2,'month':'February','value':0,'currency':0,'usd':0},
                    {'month_id':3,'month':'March','value':0,'currency':0,'usd':0},
                    {'month_id':4,'month':'April','value':0,'currency':0,'usd':0},
                    {'month_id':5,'month':'May','value':0,'currency':0,'usd':0},
                    {'month_id':6,'month':'June','value':0,'currency':0,'usd':0},
                    {'month_id':7,'month':'July','value':0,'currency':0,'usd':0},
                    {'month_id':8,'month':'August','value':0,'currency':0,'usd':0},
                    {'month_id':9,'month':'September','value':0,'currency':0,'usd':0},
                    {'month_id':10,'month':'October','value':0,'currency':0,'usd':0},
                    {'month_id':11,'month':'November','value':0,'currency':0,'usd':0},
                    {'month_id':12,'month':'December','value':0,'currency':0,'usd':0}

            ];

            await currency.forEach(x=>{
                if(x.MONTH == 1){
                    list[0].currency = x.CURRENCY;
                }else if (x.MONTH == 2){
                    list[1].currency = x.CURRENCY;
                }else if (x.MONTH == 3){
                    list[2].currency = x.CURRENCY;
                }else if (x.MONTH == 4){
                    list[3].currency = x.CURRENCY;
                }else if (x.MONTH == 5){
                    list[4].currency = x.CURRENCY;
                }else if (x.MONTH == 6){
                    list[5].currency = x.CURRENCY;
                }else if (x.MONTH == 7){
                    list[6].currency = x.CURRENCY;
                }else if (x.MONTH == 8){
                    list[7].currency = x.CURRENCY;
                }else if (x.MONTH == 9){
                    list[8].currency = x.CURRENCY;
                }else if (x.MONTH == 10){
                    list[9].currency = x.CURRENCY;
                }else if (x.MONTH == 11){
                    list[10].currency = x.CURRENCY;
                }else if (x.MONTH == 12){
                    list[11].currency = x.CURRENCY;
                }
            });
            res.status(200).json({
                'list':list
            })

        }else{
            const liste = [
                    {'id':0,'month_id':1,'month':'January','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':2,'month':'February','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':3,'month':'March','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':4,'month':'April','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':5,'month':'May','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':6,'month':'June','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':7,'month':'July','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':8,'month':'August','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':9,'month':'September','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':10,'month':'October','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':11,'month':'November','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':12,'month':'December','value':0,'currency':0,'usd':0}

            ];
            await currency.forEach(x=>{
                if(x.MONTH == 1){
                    liste[0].currency = x.CURRENCY;
                }else if (x.MONTH == 2){
                    liste[1].currency = x.CURRENCY;
                }else if (x.MONTH == 3){
                    liste[2].currency = x.CURRENCY;
                }else if (x.MONTH == 4){
                    liste[3].currency = x.CURRENCY;
                }else if (x.MONTH == 5){
                    liste[4].currency = x.CURRENCY;
                }else if (x.MONTH == 6){
                    liste[5].currency = x.CURRENCY;
                }else if (x.MONTH == 7){
                    liste[6].currency = x.CURRENCY;
                }else if (x.MONTH == 8){
                    liste[7].currency = x.CURRENCY;
                }else if (x.MONTH == 9){
                    liste[8].currency = x.CURRENCY;
                }else if (x.MONTH == 10){
                    liste[9].currency = x.CURRENCY;
                }else if (x.MONTH == 11){
                    liste[10].currency = x.CURRENCY;
                }else if (x.MONTH == 12){
                    liste[11].currency = x.CURRENCY;
                }
            });
            cost.recordset.forEach(x=>{
                if(x.MONTH === 1){
                    liste[0].id = x.ID;
                    liste[0].value = x.TL;
                    liste[0].currency = x.CURRENCY;
                    liste[0].usd = x.USD;
                }else if(x.MONTH === 2){
                    liste[1].id = x.ID;

                    liste[1].value = x.TL;
                    liste[1].currency = x.CURRENCY;
                    liste[1].usd = x.USD;
                }else if(x.MONTH === 3){
                    liste[2].id = x.ID;

                    liste[2].value = x.TL;
                    liste[2].currency = x.CURRENCY;
                    liste[2].usd = x.USD;
                }else if(x.MONTH === 4){
                    liste[3].id = x.ID;

                    liste[3].value = x.TL;
                    liste[3].currency = x.CURRENCY;
                    liste[3].usd = x.USD;
                }else if(x.MONTH === 5){
                    liste[4].id = x.ID;

                    liste[4].value = x.TL;
                    liste[4].currency = x.CURRENCY;
                    liste[4].usd = x.USD;
                }else if(x.MONTH === 6){
                    liste[5].id = x.ID;

                    liste[5].value = x.TL;
                    liste[5].currency = x.CURRENCY;
                    liste[5].usd = x.USD;
                }else if(x.MONTH === 7){
                    liste[6].id = x.ID;

                    liste[6].value = x.TL;
                    liste[6].currency = x.CURRENCY;
                    liste[6].usd = x.USD;
                }else if(x.MONTH === 8){
                    liste[7].id = x.ID;

                    liste[7].value = x.TL;
                    liste[7].currency = x.CURRENCY;
                    liste[7].usd = x.USD;
                }else if(x.MONTH === 9){
                    liste[8].id = x.ID;

                    liste[8].value = x.TL;
                    liste[8].currency = x.CURRENCY;
                    liste[8].usd = x.USD;
                }else if(x.MONTH === 10){
                    liste[9].id = x.ID;

                    liste[9].value = x.TL;
                    liste[9].currency = x.CURRENCY;
                    liste[9].usd = x.USD;
                }else if(x.MONTH === 11){
                    liste[10].id = x.ID;

                    liste[10].value = x.TL;
                    liste[10].currency = x.CURRENCY;
                    liste[10].usd = x.USD;
                }else if(x.MONTH === 12){
                    liste[11].id = x.ID;

                    liste[11].value = x.TL;
                    liste[11].currency = x.CURRENCY;
                    liste[11].usd = x.USD;
                }
            });
            res.status(200).json({'list':liste})
        }
        
    });
});
app.post('/reports/ayo/wage/cost/save',(req,res)=>{
    const body = req.body;
    const insertSql = `
        
insert into AyoWageCostTB
(
	YEAR,
	MONTH,
	USD,
	TL,
	CURRENCY
) VALUES('${body.year}','${body.month}','${body.usd}','${body.value}','${body.currency}')
    `;
    mssql.query(insertSql,(err,result)=>{
        if(err) throw err;
        res.status(200).json({'message':'Saved successfully'})
    })
});
app.put('/reports/ayo/wage/cost/update',(req,res)=>{
    const body = req.body;
    const updateSql = `
        
        update AyoWageCostTB
        SET
            YEAR='${body.year}',
            MONTH='${body.month}',
            USD='${body.usd}',
            TL='${body.value}',
            CURRENCY='${body.currency}'
        WHERE
        ID ='${body.id}'
        
    `;
    mssql.query(updateSql,(err,result)=>{
        if(err) throw err;
        res.status(200).json({'message':'Saved successfully'})
    })
});


app.get('/reports/ayo/abroad/cost/list/:year',(req,res)=>{
    const year = req.params.year;
    const sql = `
        select * from AyoAbroadCostTB where YEAR='${year}'
    `;
    mssql.query(sql,(err,cost)=>{
        if(cost.recordset.length == 0){
            res.status(200).json({
                'list':[
                    {'month_id':1,'month':'January','value':0,'currency':0,'usd':0},
                    {'month_id':2,'month':'February','value':0,'currency':0,'usd':0},
                    {'month_id':3,'month':'March','value':0,'currency':0,'usd':0},
                    {'month_id':4,'month':'April','value':0,'currency':0,'usd':0},
                    {'month_id':5,'month':'May','value':0,'currency':0,'usd':0},
                    {'month_id':6,'month':'June','value':0,'currency':0,'usd':0},
                    {'month_id':7,'month':'July','value':0,'currency':0,'usd':0},
                    {'month_id':8,'month':'August','value':0,'currency':0,'usd':0},
                    {'month_id':9,'month':'September','value':0,'currency':0,'usd':0},
                    {'month_id':10,'month':'October','value':0,'currency':0,'usd':0},
                    {'month_id':11,'month':'November','value':0,'currency':0,'usd':0},
                    {'month_id':12,'month':'December','value':0,'currency':0,'usd':0}

                ]
            })

        }else{
            const liste = [
                    {'id':0,'month_id':1,'month':'January','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':2,'month':'February','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':3,'month':'March','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':4,'month':'April','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':5,'month':'May','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':6,'month':'June','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':7,'month':'July','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':8,'month':'August','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':9,'month':'September','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':10,'month':'October','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':11,'month':'November','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':12,'month':'December','value':0,'currency':0,'usd':0}

            ]
            cost.recordset.forEach(x=>{
                if(x.MONTH === 1){
                    liste[0].id = x.ID;
                    liste[0].value = x.TL;
                    liste[0].currency = x.CURRENCY;
                    liste[0].usd = x.USD;
                }else if(x.MONTH === 2){
                    liste[1].id = x.ID;

                    liste[1].value = x.TL;
                    liste[1].currency = x.CURRENCY;
                    liste[1].usd = x.USD;
                }else if(x.MONTH === 3){
                    liste[2].id = x.ID;

                    liste[2].value = x.TL;
                    liste[2].currency = x.CURRENCY;
                    liste[2].usd = x.USD;
                }else if(x.MONTH === 4){
                    liste[3].id = x.ID;

                    liste[3].value = x.TL;
                    liste[3].currency = x.CURRENCY;
                    liste[3].usd = x.USD;
                }else if(x.MONTH === 5){
                    liste[4].id = x.ID;

                    liste[4].value = x.TL;
                    liste[4].currency = x.CURRENCY;
                    liste[4].usd = x.USD;
                }else if(x.MONTH === 6){
                    liste[5].id = x.ID;

                    liste[5].value = x.TL;
                    liste[5].currency = x.CURRENCY;
                    liste[5].usd = x.USD;
                }else if(x.MONTH === 7){
                    liste[6].id = x.ID;

                    liste[6].value = x.TL;
                    liste[6].currency = x.CURRENCY;
                    liste[6].usd = x.USD;
                }else if(x.MONTH === 8){
                    liste[7].id = x.ID;

                    liste[7].value = x.TL;
                    liste[7].currency = x.CURRENCY;
                    liste[7].usd = x.USD;
                }else if(x.MONTH === 9){
                    liste[8].id = x.ID;

                    liste[8].value = x.TL;
                    liste[8].currency = x.CURRENCY;
                    liste[8].usd = x.USD;
                }else if(x.MONTH === 10){
                    liste[9].id = x.ID;

                    liste[9].value = x.TL;
                    liste[9].currency = x.CURRENCY;
                    liste[9].usd = x.USD;
                }else if(x.MONTH === 11){
                    liste[10].id = x.ID;

                    liste[10].value = x.TL;
                    liste[10].currency = x.CURRENCY;
                    liste[10].usd = x.USD;
                }else if(x.MONTH === 12){
                    liste[11].id = x.ID;

                    liste[11].value = x.TL;
                    liste[11].currency = x.CURRENCY;
                    liste[11].usd = x.USD;
                }
            });
            res.status(200).json({'list':liste})
        }
        
    });
});
app.post('/reports/ayo/abroad/cost/save',(req,res)=>{
    const body = req.body;
    const insertSql = `
        
insert into AyoAbroadCostTB
(
	YEAR,
	MONTH,
	USD,
	TL,
	CURRENCY
) VALUES('${body.year}','${body.month}','${body.usd}','${body.value}','${body.currency}')
    `;
    mssql.query(insertSql,(err,result)=>{
        if(err) throw err;
        res.status(200).json({'message':'Saved successfully'})
    })
});
app.put('/reports/ayo/abroad/cost/update',(req,res)=>{
    const body = req.body;
    const updateSql = `
        
        update AyoAbroadCostTB
        SET
            YEAR='${body.year}',
            MONTH='${body.month}',
            USD='${body.usd}',
            TL='${body.value}',
            CURRENCY='${body.currency}'
        WHERE
        ID ='${body.id}'
        
    `;
    mssql.query(updateSql,(err,result)=>{
        if(err) throw err;
        res.status(200).json({'message':'Saved successfully'})
    })
});

app.get('/reports/ayo/sample/cost/list/:year',(req,res)=>{
    const year = req.params.year;
    const sql = `
        select * from AyoSampleCostTB where YEAR='${year}'
    `;
    mssql.query(sql,async (err,cost)=>{
        const currency = await getCurrencySql(year);
        if(cost.recordset.length == 0){
            let list = [
                    {'month_id':1,'month':'January','value':0,'currency':0,'usd':0},
                    {'month_id':2,'month':'February','value':0,'currency':0,'usd':0},
                    {'month_id':3,'month':'March','value':0,'currency':0,'usd':0},
                    {'month_id':4,'month':'April','value':0,'currency':0,'usd':0},
                    {'month_id':5,'month':'May','value':0,'currency':0,'usd':0},
                    {'month_id':6,'month':'June','value':0,'currency':0,'usd':0},
                    {'month_id':7,'month':'July','value':0,'currency':0,'usd':0},
                    {'month_id':8,'month':'August','value':0,'currency':0,'usd':0},
                    {'month_id':9,'month':'September','value':0,'currency':0,'usd':0},
                    {'month_id':10,'month':'October','value':0,'currency':0,'usd':0},
                    {'month_id':11,'month':'November','value':0,'currency':0,'usd':0},
                    {'month_id':12,'month':'December','value':0,'currency':0,'usd':0}

                ]
            await currency.forEach(x=>{
                if(x.MONTH == 1){
                    list[0].currency = x.CURRENCY;
                }else if (x.MONTH == 2){
                    list[1].currency = x.CURRENCY;
                }else if (x.MONTH == 3){
                    list[2].currency = x.CURRENCY;
                }else if (x.MONTH == 4){
                    list[3].currency = x.CURRENCY;
                }else if (x.MONTH == 5){
                    list[4].currency = x.CURRENCY;
                }else if (x.MONTH == 6){
                    list[5].currency = x.CURRENCY;
                }else if (x.MONTH == 7){
                    list[6].currency = x.CURRENCY;
                }else if (x.MONTH == 8){
                    list[7].currency = x.CURRENCY;
                }else if (x.MONTH == 9){
                    list[8].currency = x.CURRENCY;
                }else if (x.MONTH == 10){
                    list[9].currency = x.CURRENCY;
                }else if (x.MONTH == 11){
                    list[10].currency = x.CURRENCY;
                }else if (x.MONTH == 12){
                    list[11].currency = x.CURRENCY;
                }
            });
            res.status(200).json({
                list:list
            })

        }else{
            const liste = [
                    {'id':0,'month_id':1,'month':'January','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':2,'month':'February','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':3,'month':'March','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':4,'month':'April','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':5,'month':'May','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':6,'month':'June','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':7,'month':'July','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':8,'month':'August','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':9,'month':'September','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':10,'month':'October','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':11,'month':'November','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':12,'month':'December','value':0,'currency':0,'usd':0}

            ];
            await currency.forEach(x=>{
                if(x.MONTH == 1){
                    liste[0].currency = x.CURRENCY;
                }else if (x.MONTH == 2){
                    liste[1].currency = x.CURRENCY;
                }else if (x.MONTH == 3){
                    liste[2].currency = x.CURRENCY;
                }else if (x.MONTH == 4){
                    liste[3].currency = x.CURRENCY;
                }else if (x.MONTH == 5){
                    liste[4].currency = x.CURRENCY;
                }else if (x.MONTH == 6){
                    liste[5].currency = x.CURRENCY;
                }else if (x.MONTH == 7){
                    liste[6].currency = x.CURRENCY;
                }else if (x.MONTH == 8){
                    liste[7].currency = x.CURRENCY;
                }else if (x.MONTH == 9){
                    liste[8].currency = x.CURRENCY;
                }else if (x.MONTH == 10){
                    liste[9].currency = x.CURRENCY;
                }else if (x.MONTH == 11){
                    liste[10].currency = x.CURRENCY;
                }else if (x.MONTH == 12){
                    liste[11].currency = x.CURRENCY;
                }
            });
            cost.recordset.forEach(x=>{
                if(x.MONTH === 1){
                    liste[0].id = x.ID;
                    liste[0].value = x.TL;
                    liste[0].currency = x.CURRENCY;
                    liste[0].usd = x.USD;
                }else if(x.MONTH === 2){
                    liste[1].id = x.ID;

                    liste[1].value = x.TL;
                    liste[1].currency = x.CURRENCY;
                    liste[1].usd = x.USD;
                }else if(x.MONTH === 3){
                    liste[2].id = x.ID;

                    liste[2].value = x.TL;
                    liste[2].currency = x.CURRENCY;
                    liste[2].usd = x.USD;
                }else if(x.MONTH === 4){
                    liste[3].id = x.ID;

                    liste[3].value = x.TL;
                    liste[3].currency = x.CURRENCY;
                    liste[3].usd = x.USD;
                }else if(x.MONTH === 5){
                    liste[4].id = x.ID;

                    liste[4].value = x.TL;
                    liste[4].currency = x.CURRENCY;
                    liste[4].usd = x.USD;
                }else if(x.MONTH === 6){
                    liste[5].id = x.ID;

                    liste[5].value = x.TL;
                    liste[5].currency = x.CURRENCY;
                    liste[5].usd = x.USD;
                }else if(x.MONTH === 7){
                    liste[6].id = x.ID;

                    liste[6].value = x.TL;
                    liste[6].currency = x.CURRENCY;
                    liste[6].usd = x.USD;
                }else if(x.MONTH === 8){
                    liste[7].id = x.ID;

                    liste[7].value = x.TL;
                    liste[7].currency = x.CURRENCY;
                    liste[7].usd = x.USD;
                }else if(x.MONTH === 9){
                    liste[8].id = x.ID;

                    liste[8].value = x.TL;
                    liste[8].currency = x.CURRENCY;
                    liste[8].usd = x.USD;
                }else if(x.MONTH === 10){
                    liste[9].id = x.ID;

                    liste[9].value = x.TL;
                    liste[9].currency = x.CURRENCY;
                    liste[9].usd = x.USD;
                }else if(x.MONTH === 11){
                    liste[10].id = x.ID;

                    liste[10].value = x.TL;
                    liste[10].currency = x.CURRENCY;
                    liste[10].usd = x.USD;
                }else if(x.MONTH === 12){
                    liste[11].id = x.ID;

                    liste[11].value = x.TL;
                    liste[11].currency = x.CURRENCY;
                    liste[11].usd = x.USD;
                }
            });
            res.status(200).json({'list':liste})
        }
        
    });
});

app.post('/reports/ayo/sample/cost/save',(req,res)=>{
    const body = req.body;
    const insertSql = `
        
insert into AyoSampleCostTB
(
	YEAR,
	MONTH,
	USD,
	TL,
	CURRENCY
) VALUES('${body.year}','${body.month}','${body.usd}','${body.value}','${body.currency}')
    `;
    mssql.query(insertSql,(err,result)=>{
        if(err) throw err;
        res.status(200).json({'message':'Saved successfully'})
    })
});

app.put('/reports/ayo/sample/cost/update',(req,res)=>{
    const body = req.body;
    const updateSql = `
        
        update AyoSampleCostTB
        SET
            YEAR='${body.year}',
            MONTH='${body.month}',
            USD='${body.usd}',
            TL='${body.value}',
            CURRENCY='${body.currency}'
        WHERE
        ID ='${body.id}'
        
    `;
    mssql.query(updateSql,(err,result)=>{
        if(err) throw err;
        res.status(200).json({'message':'Saved successfully'})
    });
});


app.get('/reports/ayo/costs/list/:year/:month',async(req,res)=>{
    const year = req.params.year;
    const month = req.params.month;
    const sqlOne = `
        select cost.MONTH,cost.CreditCardUsd,cost.CreditCardTl from AyoCreditCardCostTB cost
        where cost.YEAR = '${year}' and cost.MONTH = '${month}'
    `;
    const sqlTwo = `
        select cost.MONTH,cost.USD,cost.TL from AyoTravelCostTB cost
        where cost.YEAR = '${year}' and cost.MONTH = '${month}'
    `;
    const sqlThree = `
        select cost.MONTH,cost.USD,cost.TL from AyoWageCostTB cost
        where cost.YEAR = '${year}' and cost.MONTH = '${month}'
    `;
    const sqlFour = `
        
        select cost.MONTH,cost.USD,cost.TL from AyoSampleCostTB cost
        where cost.YEAR = '${year}' and cost.MONTH = '${month}'
    `;
    const sqlFive = `
        select cost.MONTH,cost.USD,cost.TL from AyoOtherCostTB cost
        where cost.YEAR = '${year}' and cost.MONTH = '${month}'
    `;
    const sqlSix = `
    select cost.MONTH,cost.USD,cost.TL from AyoMekmerCostTB cost
    where cost.YEAR = '${year}' and cost.MONTH = '${month}'
`;
    await mssql.query(sqlOne, async (err,one)=>{
        await mssql.query(sqlTwo, async (err,two)=>{
            await mssql.query(sqlThree,async (err,three)=>{
                await mssql.query(sqlFour,async(err,four)=>{
                    await mssql.query(sqlFive,async (err,five)=>{
                        await mssql.query(sqlSix,async(err,six)=>{
                            let usd = 0;
                            let tl = 0;
                            if(one.recordset.length > 0){
                                 await one.recordset.forEach(x=>{
                                    usd += x.CreditCardUsd,
                                    tl += x.CreditCardTl;
                                });
                            };
     
                            if(two.recordset.length > 0){
                                 await two.recordset.forEach(x=>{
                                    usd += x.USD,
                                    tl += x.TL;
                                });
     
                            };
     
                            if(three.recordset.length > 0){
                                 await three.recordset.forEach(x=>{
                                    usd += x.USD,
                                    tl += x.TL;
                                });
                            };
                            if(four.recordset.length > 0){
                                 await four.recordset.forEach(x=>{
                                    usd += x.USD,
                                    tl += x.TL;
                                });
                            };
                            if(five.recordset.length > 0){
                                
                            
                             await five.recordset.forEach(x=>{
                                    usd += x.USD,
                                    tl += x.TL;
                            });
     
                            };

                            if(six.recordset.length > 0){
                                
                            
                                await six.recordset.forEach(x=>{
                                       usd += x.USD,
                                       tl += x.TL;
                               });
        
                               };
     
     
                            res.status(200).json({
                             'usd':usd,
                              'tl':tl,
                            })
                        });
                   });
               });
           });
       });
   });

});

app.get('/reports/ayo/costs/yearly/:year',async(req,res)=>{
    const year = req.params.year;
    const sqlOne = `
        select cost.MONTH,cost.CreditCardUsd,cost.CreditCardTl from AyoCreditCardCostTB cost
        where cost.YEAR = '${year}' 
    `;
    const sqlTwo = `
        select cost.MONTH,cost.USD,cost.TL from AyoTravelCostTB cost
        where cost.YEAR = '${year}' 
    `;
    const sqlThree = `
        select cost.MONTH,cost.USD,cost.TL from AyoWageCostTB cost
        where cost.YEAR = '${year}' 
    `;
    const sqlFour = `
        
        select cost.MONTH,cost.USD,cost.TL from AyoSampleCostTB cost
        where cost.YEAR = '${year}' 
    `;
    const sqlFive = `
        select cost.MONTH,cost.USD,cost.TL from AyoOtherCostTB cost
        where cost.YEAR = '${year}'
    `;
    const sqlSix = `
            select cost.MONTH,cost.USD,cost.TL from AyoMekmerCostTB cost
        where cost.YEAR = '${year}'
    `;

    await mssql.query(sqlOne, async (err,one)=>{
        await mssql.query(sqlTwo, async (err,two)=>{
            await mssql.query(sqlThree,async (err,three)=>{
                await mssql.query(sqlFour,async(err,four)=>{
                    await mssql.query(sqlFive,async (err,five)=>{
                       await mssql.query(sqlSix,async(err,six)=>{
                        let usd = 0;
                       let tl = 0;
                       if(one.recordset.length > 0){
                            await one.recordset.forEach(x=>{
                               usd += x.CreditCardUsd,
                               tl += x.CreditCardTl;
                           });
                       };

                       if(two.recordset.length > 0){
                            await two.recordset.forEach(x=>{
                               usd += x.USD,
                               tl += x.TL;
                           });

                       };

                       if(three.recordset.length > 0){
                            await three.recordset.forEach(x=>{
                               usd += x.USD,
                               tl += x.TL;
                           });
                       };
                       if(four.recordset.length > 0){
                            await four.recordset.forEach(x=>{
                               usd += x.USD,
                               tl += x.TL;
                           });
                       };
                       if(five.recordset.length > 0){
                           
                       
                        await five.recordset.forEach(x=>{
                               usd += x.USD,
                               tl += x.TL;
                       });

                       };
                       if(six.recordset.length > 0){
                           
                       
                        await six.recordset.forEach(x=>{
                               usd += x.USD,
                               tl += x.TL;
                       });

                       };


                       res.status(200).json({
                        'usd':usd,
                         'tl':tl,
                       });


                       })
                       
                   });
               });
           });
       });
   });

});

app.get('/reports/ayo/costs/quarter/:q1/:q2/:year',async(req,res)=>{
    const q1 = req.params.q1;
    const q2 = req.params.q2;
    const year = req.params.year;
    const sqlOne = `
        select cost.MONTH,cost.CreditCardUsd,cost.CreditCardTl from AyoCreditCardCostTB cost
        where cost.YEAR = '${year}' and (cost.MONTH >= '${q1}' and cost.MONTH <='${q2}')
    `;
    const sqlTwo = `
        select cost.MONTH,cost.USD,cost.TL from AyoTravelCostTB cost
        where cost.YEAR = '${year}' and (cost.MONTH >= '${q1}' and cost.MONTH <='${q2}')
    `;
    const sqlThree = `
        select cost.MONTH,cost.USD,cost.TL from AyoWageCostTB cost
        where cost.YEAR = '${year}' and (cost.MONTH >= '${q1}' and cost.MONTH <='${q2}')
    `;
    const sqlFour = `
        
        select cost.MONTH,cost.USD,cost.TL from AyoSampleCostTB cost
        where cost.YEAR = '${year}' and (cost.MONTH >= '${q1}' and cost.MONTH <='${q2}')
    `;
    const sqlFive = `
        select cost.MONTH,cost.USD,cost.TL from AyoOtherCostTB cost
        where cost.YEAR = '${year}'and (cost.MONTH >= '${q1}' and cost.MONTH <='${q2}')
    `;
    const sqlSix = `
    select cost.MONTH,cost.USD,cost.TL from AyoMekmerCostTB cost
    where cost.YEAR = '${year}'and (cost.MONTH >= '${q1}' and cost.MONTH <='${q2}')
`;


    await mssql.query(sqlOne, async (err,one)=>{
        await mssql.query(sqlTwo, async (err,two)=>{
            await mssql.query(sqlThree,async (err,three)=>{
                await mssql.query(sqlFour,async(err,four)=>{
                    await mssql.query(sqlFive,async (err,five)=>{
                        await mssql.query(sqlSix,async(err,six)=>{
                            let usd = 0;
                            let tl = 0;
                            if(one.recordset.length > 0){
                                 await one.recordset.forEach(x=>{
                                    usd += x.CreditCardUsd,
                                    tl += x.CreditCardTl;
                                });
                            };
     
                            if(two.recordset.length > 0){
                                 await two.recordset.forEach(x=>{
                                    usd += x.USD,
                                    tl += x.TL;
                                });
     
                            };
     
                            if(three.recordset.length > 0){
                                 await three.recordset.forEach(x=>{
                                    usd += x.USD,
                                    tl += x.TL;
                                });
                            };
                            if(four.recordset.length > 0){
                                 await four.recordset.forEach(x=>{
                                    usd += x.USD,
                                    tl += x.TL;
                                });
                            };
                            if(five.recordset.length > 0){
                                
                            
                             await five.recordset.forEach(x=>{
                                    usd += x.USD,
                                    tl += x.TL;
                            });
     
                            };
                            if(six.recordset.length > 0){
                                
                            
                                await six.recordset.forEach(x=>{
                                       usd += x.USD,
                                       tl += x.TL;
                               });
        
                               };
     
     
                            res.status(200).json({
                             'usd':usd,
                              'tl':tl,
                            });
                        })
                       
                   });
               });
           });
       });
   });
});

app.get('/reports/ayo/costs/half/:month_1/:month_2/:year',async(req,res)=>{
    const month_1 = req.params.month_1;
    const month_2 = req.params.month_2;
    const year = req.params.year;
    const sqlOne = `
        select cost.MONTH,cost.CreditCardUsd,cost.CreditCardTl from AyoCreditCardCostTB cost
        where cost.YEAR = '${year}' and (cost.MONTH >= '${month_1}' and cost.MONTH <='${month_2}')
    `;
    const sqlTwo = `
        select cost.MONTH,cost.USD,cost.TL from AyoTravelCostTB cost
        where cost.YEAR = '${year}' and (cost.MONTH >= '${month_1}' and cost.MONTH <='${month_2}')
    `;
    const sqlThree = `
        select cost.MONTH,cost.USD,cost.TL from AyoWageCostTB cost
        where cost.YEAR = '${year}' and (cost.MONTH >= '${month_1}' and cost.MONTH <='${month_2}')
    `;
    const sqlFour = `
        
        select cost.MONTH,cost.USD,cost.TL from AyoSampleCostTB cost
        where cost.YEAR = '${year}' and (cost.MONTH >= '${month_1}' and cost.MONTH <='${month_2}')
    `;
    const sqlFive = `
        select cost.MONTH,cost.USD,cost.TL from AyoOtherCostTB cost
        where cost.YEAR = '${year}'and (cost.MONTH >= '${month_1}' and cost.MONTH <='${month_2}')
    `;
    const sqlSix = `
    select cost.MONTH,cost.USD,cost.TL from AyoMekmerCostTB cost
    where cost.YEAR = '${year}'and (cost.MONTH >= '${month_1}' and cost.MONTH <='${month_2}')
`;

    await mssql.query(sqlOne, async (err,one)=>{
        await mssql.query(sqlTwo, async (err,two)=>{
            await mssql.query(sqlThree,async (err,three)=>{
                await mssql.query(sqlFour,async(err,four)=>{
                    await mssql.query(sqlFive,async (err,five)=>{
                        await mssql.query(sqlSix,async(err,six)=>{
                            let usd = 0;
                            let tl = 0;
                            if(one.recordset.length > 0){
                                 await one.recordset.forEach(x=>{
                                    usd += x.CreditCardUsd,
                                    tl += x.CreditCardTl;
                                });
                            };
     
                            if(two.recordset.length > 0){
                                 await two.recordset.forEach(x=>{
                                    usd += x.USD,
                                    tl += x.TL;
                                });
     
                            };
     
                            if(three.recordset.length > 0){
                                 await three.recordset.forEach(x=>{
                                    usd += x.USD,
                                    tl += x.TL;
                                });
                            };
                            if(four.recordset.length > 0){
                                 await four.recordset.forEach(x=>{
                                    usd += x.USD,
                                    tl += x.TL;
                                });
                            };
                            if(five.recordset.length > 0){
                                
                            
                             await five.recordset.forEach(x=>{
                                    usd += x.USD,
                                    tl += x.TL;
                            });
     
                            };

                            if(six.recordset.length > 0){
                                
                            
                                await six.recordset.forEach(x=>{
                                       usd += x.USD,
                                       tl += x.TL;
                               });
        
                               };
     
     
                            res.status(200).json({
                             'usd':usd,
                              'tl':tl,
                            });
                        });
                       
                   });
               });
           });
       });
   });
});







app.get('/reports/ayo/other/cost/list/:year',(req,res)=>{
    const year = req.params.year;
    console.log(year)
    const sql = `
        select * from AyoOtherCostTB where YEAR='${year}'
    `;
    mssql.query(sql,async (err,cost)=>{
        const currency = await getCurrencySql(year);

        if(cost.recordset.length == 0){
            const list = [
                    {'month_id':1,'month':'January','value':0,'currency':0,'usd':0},
                    {'month_id':2,'month':'February','value':0,'currency':0,'usd':0},
                    {'month_id':3,'month':'March','value':0,'currency':0,'usd':0},
                    {'month_id':4,'month':'April','value':0,'currency':0,'usd':0},
                    {'month_id':5,'month':'May','value':0,'currency':0,'usd':0},
                    {'month_id':6,'month':'June','value':0,'currency':0,'usd':0},
                    {'month_id':7,'month':'July','value':0,'currency':0,'usd':0},
                    {'month_id':8,'month':'August','value':0,'currency':0,'usd':0},
                    {'month_id':9,'month':'September','value':0,'currency':0,'usd':0},
                    {'month_id':10,'month':'October','value':0,'currency':0,'usd':0},
                    {'month_id':11,'month':'November','value':0,'currency':0,'usd':0},
                    {'month_id':12,'month':'December','value':0,'currency':0,'usd':0}

                ];
            await currency.forEach(x=>{
                if(x.MONTH == 1){
                    list[0].currency = x.CURRENCY;
                }else if (x.MONTH == 2){
                    list[1].currency = x.CURRENCY;
                }else if (x.MONTH == 3){
                    list[2].currency = x.CURRENCY;
                }else if (x.MONTH == 4){
                    list[3].currency = x.CURRENCY;
                }else if (x.MONTH == 5){
                    list[4].currency = x.CURRENCY;
                }else if (x.MONTH == 6){
                    list[5].currency = x.CURRENCY;
                }else if (x.MONTH == 7){
                    list[6].currency = x.CURRENCY;
                }else if (x.MONTH == 8){
                    list[7].currency = x.CURRENCY;
                }else if (x.MONTH == 9){
                    list[8].currency = x.CURRENCY;
                }else if (x.MONTH == 10){
                    list[9].currency = x.CURRENCY;
                }else if (x.MONTH == 11){
                    list[10].currency = x.CURRENCY;
                }else if (x.MONTH == 12){
                    list[11].currency = x.CURRENCY;
                }
            });

            res.status(200).json({
                'list':list
            });

        }else{
            const liste = [
                    {'id':0,'month_id':1,'month':'January','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':2,'month':'February','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':3,'month':'March','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':4,'month':'April','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':5,'month':'May','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':6,'month':'June','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':7,'month':'July','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':8,'month':'August','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':9,'month':'September','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':10,'month':'October','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':11,'month':'November','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':12,'month':'December','value':0,'currency':0,'usd':0}

            ];

            await currency.forEach(x=>{
                if(x.MONTH == 1){
                    liste[0].currency = x.CURRENCY;
                }else if (x.MONTH == 2){
                    liste[1].currency = x.CURRENCY;
                }else if (x.MONTH == 3){
                    liste[2].currency = x.CURRENCY;
                }else if (x.MONTH == 4){
                    liste[3].currency = x.CURRENCY;
                }else if (x.MONTH == 5){
                    liste[4].currency = x.CURRENCY;
                }else if (x.MONTH == 6){
                    liste[5].currency = x.CURRENCY;
                }else if (x.MONTH == 7){
                    liste[6].currency = x.CURRENCY;
                }else if (x.MONTH == 8){
                    liste[7].currency = x.CURRENCY;
                }else if (x.MONTH == 9){
                    liste[8].currency = x.CURRENCY;
                }else if (x.MONTH == 10){
                    liste[9].currency = x.CURRENCY;
                }else if (x.MONTH == 11){
                    liste[10].currency = x.CURRENCY;
                }else if (x.MONTH == 12){
                    liste[11].currency = x.CURRENCY;
                }
            });
            cost.recordset.forEach(x=>{
                if(x.MONTH === 1){
                    liste[0].id = x.ID;
                    liste[0].value = x.TL;
                    liste[0].currency = x.CURRENCY;
                    liste[0].usd = x.USD;
                }else if(x.MONTH === 2){
                    liste[1].id = x.ID;

                    liste[1].value = x.TL;
                    liste[1].currency = x.CURRENCY;
                    liste[1].usd = x.USD;
                }else if(x.MONTH === 3){
                    liste[2].id = x.ID;

                    liste[2].value = x.TL;
                    liste[2].currency = x.CURRENCY;
                    liste[2].usd = x.USD;
                }else if(x.MONTH === 4){
                    liste[3].id = x.ID;

                    liste[3].value = x.TL;
                    liste[3].currency = x.CURRENCY;
                    liste[3].usd = x.USD;
                }else if(x.MONTH === 5){
                    liste[4].id = x.ID;

                    liste[4].value = x.TL;
                    liste[4].currency = x.CURRENCY;
                    liste[4].usd = x.USD;
                }else if(x.MONTH === 6){
                    liste[5].id = x.ID;

                    liste[5].value = x.TL;
                    liste[5].currency = x.CURRENCY;
                    liste[5].usd = x.USD;
                }else if(x.MONTH === 7){
                    liste[6].id = x.ID;

                    liste[6].value = x.TL;
                    liste[6].currency = x.CURRENCY;
                    liste[6].usd = x.USD;
                }else if(x.MONTH === 8){
                    liste[7].id = x.ID;

                    liste[7].value = x.TL;
                    liste[7].currency = x.CURRENCY;
                    liste[7].usd = x.USD;
                }else if(x.MONTH === 9){
                    liste[8].id = x.ID;

                    liste[8].value = x.TL;
                    liste[8].currency = x.CURRENCY;
                    liste[8].usd = x.USD;
                }else if(x.MONTH === 10){
                    liste[9].id = x.ID;

                    liste[9].value = x.TL;
                    liste[9].currency = x.CURRENCY;
                    liste[9].usd = x.USD;
                }else if(x.MONTH === 11){
                    liste[10].id = x.ID;

                    liste[10].value = x.TL;
                    liste[10].currency = x.CURRENCY;
                    liste[10].usd = x.USD;
                }else if(x.MONTH === 12){
                    liste[11].id = x.ID;

                    liste[11].value = x.TL;
                    liste[11].currency = x.CURRENCY;
                    liste[11].usd = x.USD;
                }
            });
            res.status(200).json({'list':liste})
        }
        
    });
});

app.post('/reports/ayo/other/cost/save',(req,res)=>{
    const body = req.body;
    const insertSql = `
        
insert into AyoOtherCostTB
(
	YEAR,
	MONTH,
	USD,
	TL,
	CURRENCY
) VALUES('${body.year}','${body.month}','${body.usd}','${body.value}','${body.currency}')
    `;
    mssql.query(insertSql,(err,result)=>{
        if(err) throw err;
        res.status(200).json({'message':'Saved successfully'})
    })
});

app.put('/reports/ayo/other/cost/update',(req,res)=>{
    const body = req.body;
    const updateSql = `
        
        update AyoOtherCostTB
        SET
            YEAR='${body.year}',
            MONTH='${body.month}',
            USD='${body.usd}',
            TL='${body.value}',
            CURRENCY='${body.currency}'
        WHERE
        ID ='${body.id}'
        
    `;
    mssql.query(updateSql,(err,result)=>{
        if(err) throw err;
        res.status(200).json({'message':'Saved successfully'})
    });
});


/*Country Order*/

app.get('/reports/ayo/country/order/list',(req,res)=>{
    const orderFobSql = `
        select 
            YEAR(s.SiparisTarihi) as Year,
            sum(su.SatisToplam) as Fob,
            ytu.UlkeAdi




        from SiparislerTB s 
        inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
        inner join MusterilerTB m on m.ID = s.MusteriID
		inner join YeniTeklif_UlkeTB ytu on ytu.ID = m.UlkeID


        where YEAR(s.SiparisTarihi) >= 2019 and m.Marketing = 'Mekmar'
        group by YEAR(s.SiparisTarihi),ytu.UlkeAdi
        order by sum(su.SatisToplam) desc
    `;
    const orderCostSql = `
        select 
	YEAR(s.SiparisTarihi) as Year,
	ytu.UlkeAdi,
	sum(s.NavlunSatis + s.DetayTutar_1 + s.DetayTutar_2 + s.DetayTutar_3 + s.DetayTutar_4) as Cost





from SiparislerTB s 
inner join MusterilerTB m on m.ID = s.MusteriID
inner join YeniTeklif_UlkeTB ytu on ytu.ID = m.UlkeId


where YEAR(s.SiparisTarihi) >= 2019 and m.Marketing = 'Mekmar'
group by YEAR(s.SiparisTarihi),ytu.UlkeAdi
order by YEAR(s.SiparisTarihi) desc
    `;

    mssql.query(orderFobSql,(err,fob)=>{
        mssql.query(orderCostSql,(err,cost)=>{
            const data = [];
            fob.recordset.forEach(x=>{
                cost.recordset.forEach(y=>{
                    if(x.Year === y.Year && x.UlkeAdi === y.UlkeAdi){
                        data.push({...x,'ddp':x.Fob + y.Cost});
                    }
                });
            });
            res.status(200).json({'list':data});
        });

    });



});

/*Supplier Cost */
app.get('/reports/supplier/cost/list',(req,res)=>{
    const sql = `
        select 


    su.TedarikciID,
    sum(su.AlisFiyati * su.Miktar) as Total,
    t.FirmaAdi,
	YEAR(s.YuklemeTarihi) as Year


from SiparislerTB s
inner join SiparisUrunTB su on su.SiparisNo=s.SiparisNo
inner join TedarikciTB t on t.ID = su.TedarikciID
inner join MusterilerTB m on m.ID = s.MusteriID
where YEAR(s.YuklemeTarihi) >= 2019 and m.Marketing='Mekmar'
group by su.TedarikciID,t.FirmaAdi,YEAR(s.YuklemeTarihi)
order by YEAR(s.YuklemeTarihi) desc,sum(su.AlisFiyati * su.Miktar) desc
    `;

    mssql.query(sql,(err,result)=>{
        const data = [];
        let date = new Date().getFullYear();
        let index = 0;
        for (const x of Array(6).keys()) {
            data.push({ 'year': date, 'data': [],'total':0 });
            for (const y of result.recordset) {
                if (y.Year == date) {
                    data[index].total += y.Total;
                    data[index].data.push(y);
                };
            };
            index += 1;
            date = date - 1;

        };
        res.status(200).json({'list':data})

    });


});

/*Continent */

app.get('/reports/continent/order/list',(req,res)=>{
    const costSql=  `
        select 
            sum(s.NavlunSatis + s.DetayTutar_1 + s.DetayTutar_2 + s.DetayTutar_3 + s.DetayTutar_4) as Cost,
            c.Continent,
            YEAR(s.SiparisTarihi) as Year,
            ytu.ContinentId
        from SiparislerTB s
        inner join MusterilerTB m on m.ID = s.MusteriID
        inner join YeniTeklif_UlkeTB ytu on ytu.ID = m.UlkeId
        inner join ContinentTB c on c.ID = ytu.ContinentId
        where m.Marketing='Mekmar' and YEAR(s.SiparisTarihi) >= YEAR(GETDATE()) - 5
        group by ytu.ContinentId,c.Continent,YEAR(s.SiparisTarihi)
        order by ytu.ContinentId,YEAR(s.SiparisTarihi) desc
    `;
    const orderSql = `
        select 
	sum(su.SatisToplam) as Orders,
	c.Continent,
	YEAR(s.SiparisTarihi) as Year,
	ytu.ContinentId
from SiparislerTB s
inner join SiparisUrunTB su on su.SiparisNo = s.SiparisNo
inner join MusterilerTB m on m.ID = s.MusteriID
inner join YeniTeklif_UlkeTB ytu on ytu.ID = m.UlkeId
inner join ContinentTB c on c.ID = ytu.ContinentId
where m.Marketing='Mekmar' and YEAR(s.SiparisTarihi) >= YEAR(GETDATE()) - 5
group by ytu.ContinentId,c.Continent,YEAR(s.SiparisTarihi)
order by ytu.ContinentId,YEAR(s.SiparisTarihi) desc
    `;

    mssql.query(orderSql,(err,orders)=>{
        mssql.query(costSql,(err,cost)=>{
            const data = [];
            orders.recordset.forEach(x=>{
                cost.recordset.forEach(y=>{
                    if(x.Year == y.Year && x.ContinentId == y.ContinentId){
                        data.push({...x,'Fob':x.Orders,'Ddp':(x.Orders + y.Cost)});
                    }
                });
            });

            const year = new Date().getFullYear();

            const data2 = [
                {'year':year,'data':[]},
                {'year':year-1,'data':[]},
                {'year':year-2,'data':[]},
                {'year':year-3,'data':[]},
                {'year':year-4,'data':[]},
                {'year':year-5,'data':[]},

            ];
            data.forEach(x=>{
                if(x.Year == year){
                    data2[0].data.push(x);
                }else if(x.Year == year - 1){
                    data2[1].data.push(x);
                }else if(x.Year == year - 2){
                    data2[2].data.push(x);
                }else if(x.Year == year - 3){
                    data2[3].data.push(x);
                }else if(x.Year == year - 4){
                    data2[4].data.push(x);
                }
                else if(x.Year == year - 5){
                    data2[5].data.push(x);
                }
            });



            res.status(200).json({'list':data2});
        });
    });


});




/* */
app.get('/reports/ayo/mekmer/cost/list/:year',(req,res)=>{
    const year = req.params.year;
    const sql = `
        select * from AyoMekmerCostTB where YEAR='${year}'
    `;
    mssql.query(sql,async (err,cost)=>{
        const currency = await getCurrencySql(year);

        if(cost.recordset.length == 0){
            const list = [
                    {'month_id':1,'month':'January','value':0,'currency':0,'usd':0},
                    {'month_id':2,'month':'February','value':0,'currency':0,'usd':0},
                    {'month_id':3,'month':'March','value':0,'currency':0,'usd':0},
                    {'month_id':4,'month':'April','value':0,'currency':0,'usd':0},
                    {'month_id':5,'month':'May','value':0,'currency':0,'usd':0},
                    {'month_id':6,'month':'June','value':0,'currency':0,'usd':0},
                    {'month_id':7,'month':'July','value':0,'currency':0,'usd':0},
                    {'month_id':8,'month':'August','value':0,'currency':0,'usd':0},
                    {'month_id':9,'month':'September','value':0,'currency':0,'usd':0},
                    {'month_id':10,'month':'October','value':0,'currency':0,'usd':0},
                    {'month_id':11,'month':'November','value':0,'currency':0,'usd':0},
                    {'month_id':12,'month':'December','value':0,'currency':0,'usd':0}

                ];
            await currency.forEach(x=>{
                if(x.MONTH == 1){
                    list[0].currency = x.CURRENCY;
                }else if (x.MONTH == 2){
                    list[1].currency = x.CURRENCY;
                }else if (x.MONTH == 3){
                    list[2].currency = x.CURRENCY;
                }else if (x.MONTH == 4){
                    list[3].currency = x.CURRENCY;
                }else if (x.MONTH == 5){
                    list[4].currency = x.CURRENCY;
                }else if (x.MONTH == 6){
                    list[5].currency = x.CURRENCY;
                }else if (x.MONTH == 7){
                    list[6].currency = x.CURRENCY;
                }else if (x.MONTH == 8){
                    list[7].currency = x.CURRENCY;
                }else if (x.MONTH == 9){
                    list[8].currency = x.CURRENCY;
                }else if (x.MONTH == 10){
                    list[9].currency = x.CURRENCY;
                }else if (x.MONTH == 11){
                    list[10].currency = x.CURRENCY;
                }else if (x.MONTH == 12){
                    list[11].currency = x.CURRENCY;
                }
            });

            res.status(200).json({
                'list':list
            });

        }else{
            const liste = [
                    {'id':0,'month_id':1,'month':'January','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':2,'month':'February','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':3,'month':'March','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':4,'month':'April','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':5,'month':'May','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':6,'month':'June','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':7,'month':'July','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':8,'month':'August','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':9,'month':'September','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':10,'month':'October','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':11,'month':'November','value':0,'currency':0,'usd':0},
                    {'id':0,'month_id':12,'month':'December','value':0,'currency':0,'usd':0}

            ];

            await currency.forEach(x=>{
                if(x.MONTH == 1){
                    liste[0].currency = x.CURRENCY;
                }else if (x.MONTH == 2){
                    liste[1].currency = x.CURRENCY;
                }else if (x.MONTH == 3){
                    liste[2].currency = x.CURRENCY;
                }else if (x.MONTH == 4){
                    liste[3].currency = x.CURRENCY;
                }else if (x.MONTH == 5){
                    liste[4].currency = x.CURRENCY;
                }else if (x.MONTH == 6){
                    liste[5].currency = x.CURRENCY;
                }else if (x.MONTH == 7){
                    liste[6].currency = x.CURRENCY;
                }else if (x.MONTH == 8){
                    liste[7].currency = x.CURRENCY;
                }else if (x.MONTH == 9){
                    liste[8].currency = x.CURRENCY;
                }else if (x.MONTH == 10){
                    liste[9].currency = x.CURRENCY;
                }else if (x.MONTH == 11){
                    liste[10].currency = x.CURRENCY;
                }else if (x.MONTH == 12){
                    liste[11].currency = x.CURRENCY;
                }
            });
            cost.recordset.forEach(x=>{
                if(x.MONTH === 1){
                    liste[0].id = x.ID;
                    liste[0].value = x.TL;
                    liste[0].currency = x.CURRENCY;
                    liste[0].usd = x.USD;
                }else if(x.MONTH === 2){
                    liste[1].id = x.ID;

                    liste[1].value = x.TL;
                    liste[1].currency = x.CURRENCY;
                    liste[1].usd = x.USD;
                }else if(x.MONTH === 3){
                    liste[2].id = x.ID;

                    liste[2].value = x.TL;
                    liste[2].currency = x.CURRENCY;
                    liste[2].usd = x.USD;
                }else if(x.MONTH === 4){
                    liste[3].id = x.ID;

                    liste[3].value = x.TL;
                    liste[3].currency = x.CURRENCY;
                    liste[3].usd = x.USD;
                }else if(x.MONTH === 5){
                    liste[4].id = x.ID;

                    liste[4].value = x.TL;
                    liste[4].currency = x.CURRENCY;
                    liste[4].usd = x.USD;
                }else if(x.MONTH === 6){
                    liste[5].id = x.ID;

                    liste[5].value = x.TL;
                    liste[5].currency = x.CURRENCY;
                    liste[5].usd = x.USD;
                }else if(x.MONTH === 7){
                    liste[6].id = x.ID;

                    liste[6].value = x.TL;
                    liste[6].currency = x.CURRENCY;
                    liste[6].usd = x.USD;
                }else if(x.MONTH === 8){
                    liste[7].id = x.ID;

                    liste[7].value = x.TL;
                    liste[7].currency = x.CURRENCY;
                    liste[7].usd = x.USD;
                }else if(x.MONTH === 9){
                    liste[8].id = x.ID;

                    liste[8].value = x.TL;
                    liste[8].currency = x.CURRENCY;
                    liste[8].usd = x.USD;
                }else if(x.MONTH === 10){
                    liste[9].id = x.ID;

                    liste[9].value = x.TL;
                    liste[9].currency = x.CURRENCY;
                    liste[9].usd = x.USD;
                }else if(x.MONTH === 11){
                    liste[10].id = x.ID;

                    liste[10].value = x.TL;
                    liste[10].currency = x.CURRENCY;
                    liste[10].usd = x.USD;
                }else if(x.MONTH === 12){
                    liste[11].id = x.ID;

                    liste[11].value = x.TL;
                    liste[11].currency = x.CURRENCY;
                    liste[11].usd = x.USD;
                }
            });
            res.status(200).json({'list':liste})
        }
        
    });
});

app.post('/reports/ayo/mekmer/cost/save',(req,res)=>{
    const body = req.body;
    const insertSql = `
        
insert into AyoMekmerCostTB
(
	YEAR,
	MONTH,
	USD,
	TL,
	CURRENCY
) VALUES('${body.year}','${body.month}','${body.usd}','${body.value}','${body.currency}')
    `;
    mssql.query(insertSql,(err,result)=>{
        if(err) throw err;
        res.status(200).json({'message':'Saved successfully'})
    })
});

app.put('/reports/ayo/mekmer/cost/update',(req,res)=>{
    const body = req.body;
    const updateSql = `
        
        update AyoMekmerCostTB
        SET
            YEAR='${body.year}',
            MONTH='${body.month}',
            USD='${body.usd}',
            TL='${body.value}',
            CURRENCY='${body.currency}'
        WHERE
        ID ='${body.id}'
        
    `;
    mssql.query(updateSql,(err,result)=>{
        if(err) throw err;
        res.status(200).json({'message':'Saved successfully'})
    });
});




/* */
app.get('/important/link/list',(req,res)=>{
    const sql = `
        select 

	im.ID,
	im.Description,
	im.Link,
	im.SaveDate,
	im.UpdatedUserID,
	(select k.KullaniciAdi from KullaniciTB k where k.ID = im.UpdatedUserID) as Username

from ImportantLinksTB im
    `;

    mssql.query(sql,(err,important)=>{
        res.status(200).json({
            'list':important.recordset
        })
    });
});

app.post('/important/link/save',(req,res)=>{
    const insertSql = `
        insert into ImportantLinksTB (Description,Link,SaveDate,UpdatedUserID)

VALUES('${req.body.Description}','${req.body.Link}','${req.body.SaveDate}','${req.body.UpdatedUserID}')
    `;
    const getIdSql = `select top 1 ID from ImportantLinksTB order by ID desc`;
    mssql.query(insertSql,(err,important)=>{
        if(important.rowsAffected[0] == 1){
            mssql.query(getIdSql,(err,id)=>{
                res.status(200).json({
                    'status':true,
                    'id':id.recordset[0].ID
                })
            });

        }else{
            res.status(200).json({
                'status':false
            })
        }
    });
});
app.put('/important/link/update',(req,res)=>{
    const updateSql = `
                update ImportantLinksTB SET 
Description='${req.body.Description}',Link='${req.body.Link}',SaveDate='${req.body.SaveDate}',UpdatedUserID='${req.body.UpdatedUserID}'
where ID='${req.body.ID}'
    `;
    mssql.query(updateSql,(err,important)=>{
        if(important.rowsAffected[0] == 1){
            res.status(200).json({
                'status':true
            })
        }else{
            res.status(200).json({
                'status':false
            })
        };
    });
});

app.delete('/important/link/delete/:id',(req,res)=>{
    const deleteSql = `
delete ImportantLinksTB where ID='${req.params.id}'
    `;
    mssql.query(deleteSql,(err,important)=>{
        if(important.rowsAffected[0] == 1){
            res.status(200).json({
                'status':true
            })
        }else{
            res.status(200).json({
                'status':false
            })
        }
    });
});

app.get(`/maliyet/proforma/currency/:year/:month`,(req,res)=>{
    const currencySql = `select top 1 CURRENCY from AyoCurrency where YEAR='${req.params.year}' and MONTH = '${req.params.month}'`;
    mssql.query(currencySql,(err,currency)=>{
        if(currency.recordset.length == 0){
            res.status(200).json({'currency':0});
        }else{
            res.status(200).json({'currency':currency.recordset[0].CURRENCY});

        }
    });
});

app.get(`/maliyet/proforma/currency/quarter/:year/:q1/:q2`,(req,res)=>{
    const currencySql = `select (sum(CURRENCY) / 3) as curr from AyoCurrency where YEAR='${req.params.year}' and MONTH between '${req.params.q1}' and '${req.params.q2}'`;
    mssql.query(currencySql,(err,currency)=>{
        if(currency.recordset.length == 0){
            res.status(200).json({'currency':0});
        }else{
            res.status(200).json({'currency':currency.recordset[0].curr});

        }
    });
});

app.get(`/maliyet/proforma/currency/half/:year/:q1/:q2`,(req,res)=>{
    const currencySql = `select (sum(CURRENCY) / 6) as curr from AyoCurrency where YEAR='${req.params.year}' and MONTH between '${req.params.q1}' and '${req.params.q2}'`;
    mssql.query(currencySql,(err,currency)=>{
        if(currency.recordset.length == 0){
            res.status(200).json({'currency':0});
        }else{
            res.status(200).json({'currency':currency.recordset[0].curr});

        }
    });
});

app.get(`/maliyet/proforma/all/currency/:year`,(req,res)=>{
    const currencySql = `select (sum(CURRENCY) / 12) as curr from AyoCurrency where YEAR='${req.params.year}'`;
    mssql.query(currencySql,(err,currency)=>{
        if(currency.recordset.length == 0){
            res.status(200).json({'currency':0});
        }else{
            res.status(200).json({'currency':currency.recordset[0].curr});

        }
    });
});


app.get('/production/buying/price/list',(req,res)=>{
    const sql = `
        select 
	u.UrunOcakID,
	uc.OcakAdi,
	u.KasaNo,
	m.FirmaAdi,
	u.SiparisAciklama,
	u.Miktar,
	birim.BirimAdi,
	urun.UrunAdi,
	((select su.AlisFiyati from SiparisUrunTB su where su.SiparisNo = u.SiparisAciklama and su.UrunKartID = u.UrunKartID and su.TedarikciID = u.TedarikciID) * u.Miktar) as AlisToplam,
	(select su.AlisFiyati from SiparisUrunTB su where su.SiparisNo = u.SiparisAciklama and su.UrunKartID = u.UrunKartID and su.TedarikciID = u.TedarikciID) as AlisFiyati,
	MONTH(s.YuklemeTarihi) as Month
from UretimTB u
inner join SiparislerTB s on s.SiparisNo = u.SiparisAciklama
inner join UrunOcakTb ub on ub.ID = u.UrunOcakID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join UrunOcakTB uc on uc.ID = u.UrunOcakID
inner join UrunBirimTB birim on birim.ID = u.UrunBirimID
inner join UrunKartTB uk on uk.ID = u.UrunKartID
inner join UrunlerTB urun on urun.ID = uk.UrunID

where YEAR(s.YuklemeTarihi) = YEAR(GETDATE()) and u.TedarikciID in (1,123)
and s.SiparisDurumID=3


    `;
    mssql.query(sql,(err,buying)=>{
        res.status(200).json({'list':buying.recordset});
    });
});

app.get('/production/buying/price/list/yearly/:year',(req,res)=>{
    const year = req.params.year;
    const sql = `
        select 
	u.UrunOcakID,
	uc.OcakAdi,
	u.KasaNo,
	m.FirmaAdi,
	u.SiparisAciklama,
	u.Miktar,
	birim.BirimAdi,
	urun.UrunAdi,
	((select su.AlisFiyati from SiparisUrunTB su where su.SiparisNo = u.SiparisAciklama and su.UrunKartID = u.UrunKartID and su.TedarikciID = u.TedarikciID) * u.Miktar) as AlisToplam,
	(select su.AlisFiyati from SiparisUrunTB su where su.SiparisNo = u.SiparisAciklama and su.UrunKartID = u.UrunKartID and su.TedarikciID = u.TedarikciID) as AlisFiyati,
	MONTH(s.YuklemeTarihi) as Month
from UretimTB u
inner join SiparislerTB s on s.SiparisNo = u.SiparisAciklama
inner join UrunOcakTb ub on ub.ID = u.UrunOcakID
inner join MusterilerTB m on m.ID = s.MusteriID
inner join UrunOcakTB uc on uc.ID = u.UrunOcakID
inner join UrunBirimTB birim on birim.ID = u.UrunBirimID
inner join UrunKartTB uk on uk.ID = u.UrunKartID
inner join UrunlerTB urun on urun.ID = uk.UrunID

where YEAR(s.YuklemeTarihi) = ${year} and u.TedarikciID in (1,123)
and s.SiparisDurumID=3


    `;
    mssql.query(sql,(err,buying)=>{
        res.status(200).json({'list':buying.recordset});
    });
});

app.get('/gu/reports/finance/purchase-prices',(req,res)=>{
    const sql = `
        select s.SiparisTarihi,m.FirmaAdi,s.SiparisNo,(su.AlisFiyati * su.Miktar) as Purchase,t.FirmaAdi as Tedarikci from SiparisUrunTB su
        inner join SiparislerTB s on s.SiparisNo = su.SiparisNo
        inner join MusterilerTB m on m.ID = s.MusteriID
        inner join TedarikciTB t on t.ID = su.TedarikciID
        where s.SiparisDurumID= 2 and su.TedarikciID not in (1,123,32)
        and m.Marketing = 'Mekmar'
    `;
    mssql.query(sql,(err,data)=>{
        res.status(200).json({'list':data.recordset});
    });

});











module.exports = {
    path:'/api',
    handler:app
}