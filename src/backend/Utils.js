const Utils = {
    validators:{
        date(){
            return true;
        }
    },

    async performTransaction(con, queries){
        try{
            await con.beginTransaction();
            const results = await Promise.all(queries);
            await con.commit();
            return results;
        }

        // there was an error performing a query,
        // all queries need to succeed so rollback
        catch(error){
            await con.rollback();
            throw new Error("DATABASE rolled back");
        }
    },

    formatDate(date) {
        const padTo2Digits = (num) => num.toString().padStart(2, '0');

        return (
            date.getFullYear() + '-' +
            [
                date.getMonth() + 1,
                date.getDate()].map(padTo2Digits).join('-') +' '+
            [
                date.getHours(),
                date.getMinutes(),
                date.getSeconds()].map(padTo2Digits).join(':')
        );
    }
}

module.exports = Utils;