// modules
const mysql = require('mysql2/promise');

// globals
const config = require('./config.js');
let Globals = require('./globals.js');

// koa
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const app = new Koa();

app.use(async (ctx, next) => {
    try {
        await next();
    }
    catch(err) {
        console.log(err.status)
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
});


Globals.pool = mysql.createPool({
    ...config.db,
    waitForConnections: true,
    timezone: 'Z'
});

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(config.port);

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});