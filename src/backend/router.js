const Router = require('@koa/router');

const Api = require("./api/api");
const Globals = require('./globals');
const { apiPath } = require('./config');

const router = new Router({ prefix: apiPath });

router.use(async (ctx, next) => {
    try {
        const con = await Globals.pool.getConnection();
        Api.setup(con);
        await next();
        Api.con.release();
    }
    catch(err) {
        console.log(err)
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
});

router.get('/', async (ctx) => {
    ctx.body = `
        Congratulations, you've found the backend for simple inventory.
        Why not celebrate with a cookie?`;
});

router.get('/user', async (ctx) =>{
    const userID = 1;
    const [user, permissions] = await Promise.all([
        Api.getUser(userID),
        Api.getPermissionsForUser(userID)
    ]);

    ctx.body = {
        ...user,
        permissions
    };
});

router.get('/stats', async (ctx) =>{
    const [
        stocksBelowMinimum, stocksWithinThreshold,
        totalStocks, changesToday] = await Promise.all([
        Api.countStocksBelowMin(),
        Api.countStocksWithinThreshold(),
        Api.countStocks(),
        Api.getTodaysChanges()
    ]);

    ctx.body = {
        dash:{
            stocksBelowMinimum,
            stocksWithinThreshold,
            totalStocks,
            changesToday
        },
        other:{
            version: Api.getVersion()
        }
    };
});

router.get('/stocks', async (ctx) =>{
    const stocks = await Api.getStocks();
    ctx.body = stocks;
});

router.get('/stock/:stockID', async (ctx) => {
    const {stockID} = ctx.params;
    const [info, changes] = await Promise.all([
        Api.getStocks(stockID),
        Api.getRangeRecordsForStock(stockID)
    ]);

    ctx.body = {
        ...info,
        changes,
        notes: []
    };
});

router.post("/stock/:stockID/adjustments/add", async (ctx) =>{
    const
        {adjustment} = ctx.request.body,
        {stockID} = ctx.params;

    const adjustmentID = await Api.addAdjustment(stockID, adjustment, 1);

    ctx.body ={
        adjustmentID
    };
});

router.get('/stock/:stockID/adjustments/range', async (ctx) => {
    const
        {stockID} = ctx.request.params,
        {from, to} = ctx.request.query,
        records = Api.getRangeRecordsForStock(stockID, from, to);

    console.log(records);

    ctx.body = records;
});

router.get('/stocks/:stockID/level/24hours', async (ctx) => {
    const
        {stockID} = ctx.request.params,
        records = await Api.getStockLevels(stockID);

    console.log(records)
    ctx.body = records;
});
module.exports = router;