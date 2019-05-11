const Koa = require('koa');
const app = new Koa();
const request = require('./util/request');

const PORT = 9527;

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async (ctx) => {
  await request('/splcloud/fcgi-bin/gethotkey.fcg', 'get', {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: {
      g_tk: 963298023,
      loginUin: 1085131904,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0
    }
  }).then(response => {
    ctx.body = 'response';
  });
});

app.listen(PORT, () => {
  console.log(`Listen at ${PORT}`)
});