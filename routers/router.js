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

// downloadQQMusic
TODO:
router.get('/downloadQQMusic', async (ctx, next) => {
  let params = Object.assign({}, {
    loginUin: 0,
    hostUin: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    format: 'json',
    notice: 0,
    needNewCode: 0,
    format: 'jsonp',
    jsonpCallback: 'MusicJsonCallback',
    platform: 'yqq',
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  await apis.downloadQQMusic(props).then((res) => {
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
  let params = Object.assign({}, config.commonParams, {});
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
  let params = Object.assign({}, config.commonParams, {
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
  }).catch(error => {
    console.log(error);
  });
}, router.allowedMethods());

// 4
router.get('/getSongListDetail/:disstid?', async (ctx, next) => {
  let disstid = ctx.query.disstid;
  let params = Object.assign({}, config.commonParams, {
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
  }).catch(error => {
    console.log(error);
  });
}, router.allowedMethods());

TODO:
router.get('/getNewDisks/:page?/:limit?', async (ctx, next) => {
  let page = +ctx.query.page || 1;
  let num = +ctx.query.limit || 20;
  let start = (page - 1) * num;
  let data = {
    new_album: {
      module: 'newalbum.NewAlbumServer',
      method: 'get_new_album_info',
      param: {
        area: 1,
        start,
        num,
      }
    },
    comm: {
      ct: 24,
      cv: 0
    }
  }
  if (!start) {
    data.new_album_tag = {
      module: 'newalbum.NewAlbumServer',
      method: 'get_new_album_area',
      param: {}
    };
  }
  let params = Object.assign({}, config.commonParams, { data, });
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
  }).catch(error => {
    console.log(error);
  });
}, router.allowedMethods());

// getMvByTag
router.get('/getMvByTag', async (ctx, next) => {
  let params = Object.assign({}, config.commonParams, {
    format: 'json',
    outCharset: 'GB2312',
    cmd: 'shoubo',
    lan: 'all',
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  await apis.getMvByTag(props).then((res) => {
    let response = res.data;
    ctx.body = {
      response,
    }
  }).catch(error => {
    console.log('error', error);
  });
}, router.allowedMethods());

// getSimilarSinger
router.get('/getSimilarSinger/:singermid?', async (ctx, next) => {
  let singermid = ctx.query.singermid;
  let params = Object.assign({}, config.commonParams, {
    utf8: 1,
    singermid,
    start: 0,
    num: 5,
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  if (singermid) {
    await apis.getSimilarSinger(props).then((res) => {
      let response = res.data;
      ctx.body = {
        response,
      }
    }).catch(error => {
      console.log('error', error);
    });
  } else {
    ctx.body = {
      response: 'no singermid',
    }
  }
}, router.allowedMethods());

// getSingerAlbum
// singermid: 0025NhlN2yWrP4
TODO:
router.get('/getSingerAlbum/:singermid?/:limit?/:page?', async (ctx, next) => {
  let singermid = ctx.query.singermid;
  let num = +ctx.query.limit || 5;
  let sin = ctx.query.page;
  console.log(num, sin)
  let params = Object.assign({}, config.commonParams, {
    singermid,
    data: {
      comm: {
        ct: 24,
        cv: 0
      },
      singer: {
        method: 'get_singer_detail_info',
        param: {
          sort: 5,
          singermid,
          sin: 0,
          num,
        },
        module: 'music.web_singer_info_svr',
      }
    }
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  if (singermid) {
    await apis.getSingerAlbum(props).then((res) => {
      let response = res.data;
      ctx.body = {
        response,
      }
    }).catch(error => {
      console.log('error', error);
    });
  } else {
    ctx.body = {
      response: 'no singermid',
    }
  }
}, router.allowedMethods());

/**
 * @description: getSingerMv
 * @param order: time(fan upload) || listen(singer all)
 */
router.get('/getSingerMv/:singermid?/:limit?/:order?', async (ctx, next) => {
  let singermid = ctx.query.singermid;
  let order = ctx.query.order || 'time';
  let num = ctx.query.limit || 5;
  let params = Object.assign({}, config.commonParams, {
    cid: 205360581,
    singermid,
    order,
    begin: 0,
    num,
  });
  if (order.toLowerCase() === 'time') {
    params = Object.assign(params, {
      cmd: 1,
    })
  }
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  if (singermid) {
    await apis.getSingerMv(props).then((res) => {
      let response = res.data;
      ctx.body = {
        response,
      }
    }).catch(error => {
      console.log('error', error);
    });
  } else {
    ctx.body = {
      response: 'no singermid',
    }
  }
}, router.allowedMethods());

router.get('/getSingerDesc/:singermid?', async (ctx, next) => {
  let singermid = ctx.query.singermid;
  let params = Object.assign({}, config.commonParams, {
    singermid,
    utf8: 1,
    format: 'xml',
    r: 1558442453574,
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  if (singermid) {
    await apis.getSingerDesc(props).then((res) => {
      let response = JSON.stringify(res.data);
      ctx.body = {
        response,
      }
    }).catch(error => {
      console.log('error', error);
    });
  } else {
    ctx.body = {
      response: 'no singermid',
    }
  }
}, router.allowedMethods());

// radio
router.get('/getRadioLists', async (ctx, next) => {
  let params = Object.assign({}, config.commonParams, {
    channel: 'radio',
    page: 'index',
    tpl: 'wk',
    new: 1,
    p: Math.round(),
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  await apis.getRadioLists(props).then((res) => {
    let response = res.data;
    ctx.body = {
      response,
    }
  }).catch(error => {
    console.log('error', error);
  });
}, router.allowedMethods());

// DigitalAlbum
router.get('/getDigitalAlbumLists', async (ctx, next) => {
  let params = Object.assign({}, config.commonParams, {
    cmd: 'pc_index_new',
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  await apis.getDigitalAlbumLists(props).then((res) => {
    let response = res.data;
    ctx.body = {
      response,
    }
  }).catch(error => {
    console.log('error', error);
  });
}, router.allowedMethods());

module.exports = router;