//const SQL = require('sql-template-strings');
const Globals = require('./globals');
const Utils = require('./Utils');

const Api ={
    user: null,
    con: null,

    setup(con){
        this.con = con;
        //this.user = userID;
    },

    getRangeRecordsForStock(id, to = null, from = null){
        let
            q = "SELECT * FROM changes WHERE id = ?",
            values = [id];

        if(from && to){
            if(!Utils.validators.date(from) || !Utils.validators.date(to)){
                throw new Error("Date doesn't fit required format.");
            }

            q += "AND date >= ? AND date <= ?";
            values += [from, to];
        }

        return this.con.execute(q, values);
    },

    // return all stocks
    // if an id is specified, return just the data
    // for that stock
    getStocks(id = null){
        return new Promise(async (resolve, reject) => {
            try{
                let
                    q = `SELECT stocks.*, categories.label
                        FROM stocks
                        LEFT JOIN categories
                        ON stocks.category = categories.id`,
                    values = [];

                if(id !== null){
                    q += " WHERE stocks.id = ?";
                    values = [id];
                }

                const query = await this.con.execute(q, values);

                const format = (row) => {
                    const { id, category, label, minimum, name } = row;
                    return {
                        id,
                        category: { id: category, label },
                        name,
                        minimum
                    };
                };

                // return an array of stocks or the singular stock (if id)
                const rows = query[0].map(row => format(row));
                resolve(rows.length > 1 ? rows : rows[0]);
            }
            catch(e){
                reject();
            }
        });
    }
}

module.exports = Api;