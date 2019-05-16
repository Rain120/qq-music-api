const Router = require('koa-router');
const router = new Router();
const request = require('../util/request');
const config = require('../module/config');
const apis = require('../module/index');

router.get('/test', async (ctx, next) => {
  let params = Object.assign(config.commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  await apis.test(props).then((res) => {
    let response = res.data;
    ctx.body = {
      response,
    }
  }).catch(error => {
    console.log(error);
  });
}, router.allowedMethods());

router.get('/getsongLists/:limit?', async (ctx, next) => {
  let ein = ctx.query.limit || 20 ;
  let params = Object.assign(config.commonParams, {
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    categoryId: 10000000,
    sin: 0,
    ein,
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  await apis.songLists(props).then((res) => {
    let response = res.data;
    if (typeof response === 'string') {
      let reg = /^\w+\(({[^()]+})\)$/;
      let matches = response.match(reg);
      if (matches) {
        response = JSON.parse(matches[1]);
      }
    }
    ctx.body = {
      response,
    }
  }).catch(error => {
    console.log(error);
  });
}, router.allowedMethods());

router.get('/getSongTags', async (ctx, next) => {
  let params = Object.assign(config.commonParams, {});
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  await apis.songTags(props).then((res) => {
    let response = res.data;
    if (typeof response === 'string') {
      let reg = /^\w+\(({[^()]+})\)$/;
      let matches = response.match(reg);
      if (matches) {
        response = JSON.parse(matches[1]);
      }
    }
    ctx.body = {
      response,
    }
  }).catch(error => {
    console.log(error);
  });
}, router.allowedMethods());

module.exports = router;