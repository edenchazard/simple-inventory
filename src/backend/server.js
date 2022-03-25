const Koa = require('koa');
const router = require('./router');
const config = require('./config.js');
const mysql = require('mysql2/promise');

const app = new Koa();
let Globals = require('./globals.js');

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
    waitForConnections: true
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port);

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});