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
        "Content-Type": "application/x-www-form-urlencoded",
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
        return new Promise(async (resolve, reject) => {
        if (day.toString().length == 1) {
            day = '0' + day;
        };
        if (month.toString().length == 1) {
            month = '0' + month;
        };
        const link = '/' + (year) + '' + (month) + '/' + (day) + (month) + (year) + '.xml';
        await api.get(link)
            .then(async (response) => {
                await xmlToJson(response.data).then(async (data) => {
                    await resolve(parseFloat(data[0].BanknoteSelling[0]));
                })
   
            });
        })

    },


};
export default currency;