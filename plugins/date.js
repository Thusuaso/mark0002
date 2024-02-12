const convertDate = {
    dateToString(value){
        if(value == null){
            return '';
        } else{
            let date = new Date(value);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
                    if (month.toString().length == 1) {
            month = '0' + month;
                };
                if (day.toString().length == 1) {
                    day = '0' + day;
                }
            return year + '-' + month + '-' + day; 
        }

    },
    stringToDate(value){
        if(value == null){
            return '';
        } else{
            const date = value.split('-');
            const year = date[0];
            const month = date[1];
            const day = date[2];
            return new Date(year + '-' + month + '-' + day);
        }

    }
}
export default convertDate;