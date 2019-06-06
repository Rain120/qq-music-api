require("@babel/register");
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const path = require('path');
const static = require('koa-static');
const exec = require('child_process').exec;

const cors = require('./middlewares/koa-cors');
const router = require('./routers/router');
require('./util/colors');

exec('npm info QQ-Music-API version', (err, stdout, stderr) => {
  if(!err){
    let version = stdout.trim()
    if(package.version < version){
      console.log(`Current Version: ${version}, Current Version: ${package.version}, Please update it.`.prompt);
    }
  }
});

app.use(bodyParser());
app.use(static(
  path.join(__dirname,  'public')
));

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`.prompt);
});

// cors
app.use(cors({
  origin: function (ctx) {
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(router.routes())
  .use(router.allowedMethods());

const PORT = process.env.PORT || 3200;

app.listen(PORT, () => {
  console.log(`server running @ http://localhost:${PORT}`.prompt)
});