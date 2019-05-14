const Router = require('koa-router');
const router = new Router();
const request = require('../util/request');
const apis = require('../module/index');

router.get('/test', async (ctx, next) => {
  await apis.test({ request, method: 'get', options: {} }).then((res) => {
    let response = res.data;
    ctx.body = {
      response,
    }
  }).catch(error => {
    console.log(error);
  });
}, router.allowedMethods());

module.exports = router;