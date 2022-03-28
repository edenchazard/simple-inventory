module.exports ={
    async countStocksBelowMin(){
        const query = await this.con.execute(`
        SELECT COUNT(*) AS n
        FROM stocks
        WHERE quantity <= minimum`);
        return query[0][0].n;
    },

    async countStocksWithinThreshold(){
        const query = await this.con.execute(`
        SELECT COUNT(*) AS n
        FROM stocks
        WHERE quantity < (minimum + threshold)
        AND quantity > minimum`);
        return query[0][0].n;
    },

    async countStocks(){
        const query = await this.con.execute(`
        SELECT COUNT(*) as n
        FROM stocks`);
        return query[0][0].n;
    },

    async getTodaysChanges(start = 0, perPage = 10){
        const query = await this.con.execute(`
        SELECT adjustments.*, stocks.name, agents.first_name, agents.last_name
        FROM adjustments
        LEFT JOIN stocks ON adjustments.stockID = stocks.stockID
        LEFT JOIN agents ON adjustments.agentID = agents.agentID
        WHERE date_time > CURDATE()
        ORDER BY adjustments.id DESC
        LIMIT ?, ?`, [start, perPage]);

        return query[0].map(change =>{
            const {adjust, date_time, id, name, stockID} = change; 
            return {
                adjust, date_time, id, name, stockID,
                agent:{
                    id: change.agentID,
                    first_name: change.first_name,
                    last_name: change.last_name
                }
            }
        })
    },

    getVersion(){
        return process.env.VERSION || "UNKNOWN";
    }
};