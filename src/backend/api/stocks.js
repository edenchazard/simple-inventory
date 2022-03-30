const Utils = require("../Utils");
const Charting = require("../Charting");

module.exports = {
    async getRangeRecordsForStock(id, to = null, from = null){
        let
            sql = `
            SELECT adjustments.*, agents.first_name, agents.last_name
            FROM adjustments
            LEFT JOIN agents
            ON adjustments.agentID = agents.agentID
            WHERE stockID = ?`,
            values = [id];

        if(from){
            if(!Utils.validators.date(from)){
                throw new Error("Date doesn't fit required format.");
            }

            sql += " AND date >= ?";
            values += [from];
        }

        if(to){
            if(!Utils.validators.date(to)){
                throw new Error("Date doesn't fit required format.");
            }

            sql += " AND date <= ?";
            values += [to];
        }

        sql += " ORDER BY id DESC";
    
        const query = await this.con.execute(sql, values);

        return query[0].map((entry) => {
            const {stockID, date_time, adjust, quantity, agentID, first_name,
                    last_name} = entry;

            return {
                stockID,
                date_time,
                quantity,
                adjust,
                agent: {
                    id: agentID,
                    first_name,
                    last_name
                }
            };
        });
    },

    // return all stocks
    // if an id is specified, return just the data
    // for that stock
    async getStocks(id = null){
        let
            q = `SELECT stocks.*, categories.label
                FROM stocks
                LEFT JOIN categories
                ON stocks.category = categories.id`,
            values = [];

        if(id !== null){
            q += " WHERE stocks.stockID = ?";
            values = [id];
        }

        const query = await this.con.execute(q, values);

        const format = (row) => {
            const {
                stockID, quantity, category, label,
                minimum, name, threshold } = row;
            return {
                quantity,
                stockID,
                threshold,
                category: { id: category, label },
                name,
                minimum,
                belowMinimum: row.quantity <= row.minimum
            };
        };

        // return an array of stocks or the singular stock (if id)
        const rows = query[0].map(row => format(row));
        return id === null ? rows : rows[0];
    },

    async getCurrentQuantity(stockID){
        const query = await this.con.execute("SELECT quantity FROM stocks WHERE stockID=?", [stockID]);
        return query[0][0].quantity;
    },

    async addAdjustment(stockID, adjust, agentID, dateTime = null){
        const addQuery = async () =>{
            const curQuantity = await this.getCurrentQuantity(stockID);
            let
                sql = `
                    INSERT INTO adjustments (stockID, adjust, quantity, agentID, date_time)
                    VALUES (?, ?, ?, ?, `,
                values = [stockID, adjust, curQuantity + adjust, agentID];;

            if(!dateTime){
                sql += "NOW()";
            }
            else{
                sql += "?";
                values += [dateTime];
            }

            sql += ")";

            return this.con.execute(sql, values);
        }

        const updateQuantityQuery = async () => {
            const sql = "UPDATE stocks SET quantity = quantity + ? WHERE stockID = ?";
            return this.con.execute(sql, [adjust, stockID]);
        };

        const [add] = await Utils.performTransaction(this.con, [
            addQuery(),
            updateQuantityQuery()
        ]);

        return add[0].insertId;
    },

    async getStockLevels(stockID, from = new Date()){
        return Charting.hour24(this.con, stockID, from);
    }
}