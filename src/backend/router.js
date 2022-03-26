const Router = require('@koa/router');
const Api = require("./api");
const config = require('./config');
const Globals = require('./globals');

const router = new Router({ prefix: config.apiPath });

router.get('/', (ctx) => {
    ctx.body = "REST API for the lineage builder. You shouldn't be here!";
});

router.get('/stats', async (ctx) =>{
    try{
        const con = await Globals.pool.getConnection();
        Api.setup(con);
        const stocksBelowMinimum = await Api.countStocksBelowMin();
        console.log(stocksBelowMinimum)
        ctx.body = {
            stocksBelowMinimum
        };
        con.release();
    }

    catch(err){
        console.log(err)
        ctx.status = 500;
        //ctx.body = { errors: 1, message: "Sorry, an error has occurred." };
    }
});

router.get('/stocks', async (ctx) =>{
    try{
        const con = await Globals.pool.getConnection();
        Api.setup(con);
        const stocks = await Api.getStocks();
        ctx.body = stocks;
        con.release();
    }

    catch(err){
        console.log(err)
        ctx.status = 500;
        //ctx.body = { errors: 1, message: "Sorry, an error has occurred." };
    }
});


router.get('/stock/:id', async (ctx) => {
    try{
        const
            { id } = ctx.params,
            con = await Globals.pool.getConnection();

        Api.setup(con);

        const [info, changes] = await Promise.all([
            Api.getStocks(id),
            Api.getRangeRecordsForStock(id)
        ]);

        ctx.body = {
            ...info,
            changes,
            notes: []
        };

        con.release();
    }

    catch(err){
        console.log(err)
        ctx.status = 500;
        //ctx.body = { errors: 1, message: "Sorry, an error has occurred." };
    }
});

router.get('/stock/:id/range/:from/:to', async (ctx) => {
    try{
        const
            { id, from, to } = ctx.params,
            con = await Globals.pool.getConnection();

        Api.setup(con);

        const records = Api.getRangeRecordsForStock(id, from, to);

        console.log(records);

        ctx.body = records;
        con.release();
    }

    catch(err){
        console.log(err)
        ctx.status = 500;
        //ctx.body = { errors: 1, message: "Sorry, an error has occurred." };
    }
});

module.exports = router;