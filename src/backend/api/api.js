const stocks = require('./stocks');
const stats = require('./stats');
const user = require('./user');

const Api ={
    user: null,
    con: null,

    // combine all of our objects
    ...stocks,
    ...stats,
    ...user,

    setup(con){
        this.con = con;
        //this.user = userID;
    }  
}

module.exports = Api;