const Router = require('@koa/router');
const Api = require("./api");
const config = require('./config');
const globals = require('./globals');

Api.setup(1, globals.pool);

const router = new Router({ prefix: config.apiPath });

router.get('/get-records/:from/:to', async (ctx) => {
    try{
        const { from, to } = ctx.params;

        const records = Api.getRangeRecords(from, to);

        console.log(records);

        ctx.body = records;
    }

    catch(err){
        console.log(err)
        ctx.status = 500;
        //ctx.body = { errors: 1, message: "Sorry, an error has occurred." };
    }
});

module.exports = router;