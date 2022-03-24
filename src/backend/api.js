const SQL = require('sql-template-strings');
const Utils = require('./Utils');

const Api ={
    db: null,
    user: null,

    setup(userID, pool){
        this.db = pool;
        this.user = userID;
    },

    async getRangeRecords(from, to){
        if(!Utils.validators.date(from) || !Utils.validators.date(to)){
            throw new Error("Date doesn't fit required format.");
        }

        return this.db.execute(
            SQL`SELECT *
            FROM changes
            WHERE \`date\` >= ${from}
            AND \`date\` <= ${to}`);
    }
}

module.exports = Api;