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
        return new Promise(async (resolve, reject) =>{
            try {
                let
                    q = `
                    SELECT changes.*, agents.first_name, agents.last_name
                    FROM changes
                    LEFT JOIN agents
                    ON changes.agentID = agents.id
                    WHERE stockID = ?`,
                    values = [id];

                if(from){
                    if(!Utils.validators.date(from)){
                        throw new Error("Date doesn't fit required format.");
                    }

                    q += " AND date >= ?";
                    values += [from];
                }

                if(to){
                    if(!Utils.validators.date(to)){
                        throw new Error("Date doesn't fit required format.");
                    }

                    q += " AND date <= ?";
                    values += [to];
                }

                const query = await this.con.execute(q, values);
                const format = (entry) => {
                    const {
                        stockID, date_time, adjust,
                        agentID, first_name, last_name
                    } = entry;
    
                    return {
                        stockID,
                        date_time,
                        adjust,
                        agent: {
                            id: agentID,
                            first_name,
                            last_name
                        }
                    };
                }
                const r = query[0].map(row => format(row));
                resolve(r)
            }
            catch (error) {
                reject();
            }
        });
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
                    const { id, quantity, category, label, minimum, name } = row;
                    return {
                        quantity,
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
    },

    countStocksBelowMin(){
        return new Promise(async (resolve, reject) =>{
            try {
                const query = await this.con.execute("SELECT COUNT(*) AS n FROM stocks WHERE quantity < minimum");
                resolve(query[0][0].n);
            }
            catch (error) {
                reject();
            }
        });
    }
}

module.exports = Api;