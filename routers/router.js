const Router = require('koa-router');
const router = new Router();
const request = require('../util/request');
const config = require('../module/config');
const apis = require('../module/index');

router.get('/gethotkey', async (ctx, next) => {
  let params = Object.assign(config.commonParams, {
    hostUin: 0,
    needNewCode: 0
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  await apis.getHotKey(props).then((res) => {
    let response = res.data;
    ctx.body = {
      response,
    }
  }).catch(error => {
    console.log(error);
  });
}, router.allowedMethods());

/**
 * @description: 歌单
 * 1 歌单类型
 * 2 所有歌单
 * 3 分类歌单
 * 4 歌单详情
 *
 */
// 1
router.get('/getSongListCategories', async (ctx, next) => {
  let params = Object.assign(config.commonParams, {});
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  await apis.songListCategories(props).then((res) => {
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

/**
 * @description: 2, 3
 * @param {page} 页数
 * @param {limit} 每页条数[20, 60]
 * @param {categoryId} 分类
 * @return: 
 */
router.get('/getSongLists/:page?/:limit?/:categoryId?', async (ctx, next) => {
  let ein = ctx.query.limit || 19;
  let sin = ctx.query.page || 0;
  let categoryId = ctx.query.categoryId || 10000000;
  let params = Object.assign(config.commonParams, {
    picmid: 1,
    categoryId,
    sortId: 5,
    sin,
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
    next();
  }).catch(error => {
    console.log(error);
  });
}, router.allowedMethods());

// 4
router.get('/getSongListDetail/:disstid', async (ctx, next) => {
  let disstid = ctx.query.disstid;
  let params = Object.assign(config.commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    disstid,
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  await apis.songListDetail(props).then((res) => {
    let response = res.data;
    ctx.body = {
      response,
    }
    next();
  }).catch(error => {
    console.log(error);
  });
}, router.allowedMethods());

module.exports = router;