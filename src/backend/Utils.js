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
    }
}

module.exports = Utils;