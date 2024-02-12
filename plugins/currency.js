import axios from 'axios';
import xml2js, { parseString }  from 'xml2js';

const api = axios.create({
    baseURL: "https://www.tcmb.gov.tr/kurlar/",
      headers: {
        "Cache-Control": "no-cache",
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        "X-Requested-With":"XMLHttpRequest",
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      mode: 'no-cors',
      withCredentials: true,
      credentials: 'same-origin',
      crossdomain: true,
});

function xmlToJson(xml) {
    return new Promise(function(resolve, reject) {
        xml2js.Parser().parseString(xml, function(err,res) {
            resolve(res.Tarih_Date.Currency);
        })
    });
    

};
const currency = {
    
    getDateCurrency(year, month, day) {
        return new Promise((resolve, reject) => {
                if (day.toString().length == 1) {
            day = '0' + day;
        }
        if (month.toString().length == 1) {
            month = '0' + month;
        }
        const link = '/' + (year) + '' + (month) + '/' + (day) + (month) + (year) + '.xml';
        api.get(link)
            .then(response => {
                xmlToJson(response.data).then(data => {
                    resolve(parseFloat(data[0].BanknoteSelling[0]));
                })
   
            });
            
        })

        // const now = new Date();
        // const nowyear = now.getFullYear();
        // const nowmonth = now.getMonth() + 1;
        // const nowday = now.getDate();
        // if(year == nowyear && month == nowmonth && day == nowday){
        //     day = day - 1;
        // };
        // api.get(`api/doviz/${year}/${month}/${day}`)
        // .then(response=>{
        //     if(response.data.Hata){
        //         day = day - 1;
        //     };
        // });
        // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // const date = new Date(`${year}-${month}-${day}`);
        // const monthName = days[date.getDay()];
        // if(monthName == 'Sunday'){
        //     day = day - 2;
        //     if(day == 0){
        //         day = 29;
        //         month = month - 1;
        //     } 
        // }
        // if(monthName == 'Saturday'){
        //     day = day - 1;
        //     if(day == 0){
        //         day = 29;
        //         month = month - 1;
        //     }
        // }
        // return api.get(`api/doviz/${year}/${month}/${day}`).then(response=>{
        //     const usd = parseFloat(response.data.USD.BanknoteBuying);
        //     const eur = parseFloat(response.data.EUR.BanknoteBuying);
        //     const cross = parseFloat((eur / usd));
        //     const currency = {
        //         'usd':usd.toFixed(3),
        //         'eur':eur.toFixed(3),
        //         'cross':cross.toFixed(3),
        //     }
        //     return currency;
        // });
    }
};
export default currency;