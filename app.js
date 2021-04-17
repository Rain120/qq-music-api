require('@babel/register');
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const path = require('path');
const static = require('koa-static');
const exec = require('child_process').exec;
const chalk = require('chalk');

const cors = require('./middlewares/koa-cors');
const router = require('./routers/router');
const newRouter = require('./routers/new-router');
const cookie = require('./util/cookie');
require('./util/colors');
const debug = require('./config/debugger');
const userInfo = require('./config/user-info');
global = Object.assign({}, debug, userInfo);

console.log(
  chalk.yellow(
    '\n💪🙏 CN: 我们在新版本为了语义化修改了路由，当然了，我们也是保留了旧版本的路由，如果你是新项目，推荐使用新路由。 \n',
  ),
);
console.log(chalk.yellow('\n💪🙏 CN: 新路由位置在new-router。\n'));
console.log(
  chalk.yellow(
    '\n🥳🎉 EN: We have modified the routing in the new version for semantic purposes. Of course, we also keep the old version of the routing. If you are a new project, it is recommended to use the new routing.\n',
  ),
);
console.log(chalk.yellow('\n💪🙏 EN: The new version at new-router. \n'));
console.log(chalk.green('\n💪🙏 CN: 我们支持 Cookies 配置了 \n'));
console.log(chalk.green('\n🥳🎉 EN: We had supported config the user cookies. \n'));

if (!(global.loginUin || global.uin)) {
  console.log(
    chalk.yellow(
      `😔 CN: ${chalk.green('config/user-info')} 文件中 ${chalk.red('loginUin')} 或者 ${chalk.red(
        'cookie',
      )}尚未配置。\n`,
    ),
  );
  console.log(
    chalk.yellow(
      `😔 EN: The configuration ${chalk.red('loginUin')} or your ${chalk.red(
        'cookie',
      )} in file ${chalk.green('config/user-info')} has not configured. \n`,
    ),
  );
}

if (!global.cookie) {
  console.log(
    chalk.yellow(
      `😔 CN: ${chalk.green('config/user-info')} 文件中 ${chalk.red('cookie')} 尚未配置。\n`,
    ),
  );
  console.log(
    chalk.yellow(
      `😔 EN: The configuration ${chalk.red('cookie')} in file ${chalk.green(
        'config/user-info',
      )} has not configured. \n`,
    ),
  );
}

exec('npm info QQ-Music-API version', (err, stdout, stderr) => {
  if (!err) {
    let version = stdout.trim();
    if (package.version < version) {
      console.log(
        `Current Version: ${version}, Current Version: ${package.version}, Please update it.`
          .prompt,
      );
    }
  }
});

app.use(bodyParser());
app.use(cookie());
app.use(static(path.join(__dirname, 'public')));

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`.prompt);
});

// cors
app.use(
  cors({
    origin: ctx => ctx.request.header.origin,
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }),
);

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// TODO: v2.0.0 move it
app.use(router.routes()).use(router.allowedMethods());

app.use(newRouter.routes()).use(newRouter.allowedMethods());

const PORT = process.env.PORT || 3200;

app.listen(PORT, () => {
  console.log(`server running @ http://localhost:${PORT}`.prompt);
});
