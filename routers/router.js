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
router.get('/downloadQQMusic', async (ctx, next) => {
  let params = Object.assign({}, config.commonParams, {
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
// disstid=7011264340
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
  let params = Object.assign({ data, }, config.commonParams);
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  await apis.newDisks(props).then((res) => {
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
// singermid=0025NhlN2yWrP4
router.get('/getSimilarSinger/:singermid?', async (ctx, next) => {
  let singer_mid = ctx.query.singermid;
  let params = Object.assign({}, config.commonParams, {
    utf8: 1,
    singer_mid,
    start: 0,
    num: 5,
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  if (singer_mid) {
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
    p: Math.round(1),
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

// music
// getLyric
// songmid=003rJSwm3TechU
router.get('/getLyric/:songmid?', async (ctx, next) => {
  let songmid = ctx.query.songmid;
  let params = Object.assign({}, config.commonParams, {
    pcachetime: new Date().getTime(),
    songmid,
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  if (songmid) {
    await apis.getLyric(props).then((res) => {
      let lyric = res.data && res.data.lyric && new Buffer(res.data.lyric, 'base64').toString();
      let response = {
        ...res.data,
        lyric,
      };
      ctx.body = {
        response,
      }
    }).catch(error => {
      console.log('error', error);
    });
  } else {
    ctx.body = {
      response: 'no songmid',
    }
  }
}, router.allowedMethods());

TODO:
router.get('/getMusicVKey/:songmid?', async (ctx, next) => {
  let songmid = ctx.query.songmid;
  let params = Object.assign({}, config.commonParams, {
    data: {
      req_0: {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: {
          guid: 1429839143,
          songmid: [songmid],
          songtype: [
            0,
          ],
          uin: 0,
          loginflag: 1,
          platform: 20
        }
      },
      comm: {
        uin: 0,
        format: 'json',
        ct: 24,
        cv: 0
      }
    }
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  if (songmid) {
    await apis.getMusicVKey(props).then((res) => {
      let response = res.data;
      ctx.body = {
        response,
      }
    }).catch(error => {
      console.log('error', error);
    });
  } else {
    ctx.body = {
      response: 'no songmid',
    }
  }
}, router.allowedMethods());

// album
// albummid=0016l2F430zMux
router.get('/getAlbum/:albummid?', async (ctx, next) => {
  let albummid = ctx.query.albummid;
  let params = Object.assign({}, config.commonParams, {
    albummid,
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  if (albummid) {
    await apis.getAlbum(props).then((res) => {
      let response = res.data;
      ctx.body = {
        response,
      }
    }).catch(error => {
      console.log('error', error);
    });
  } else {
    ctx.body = {
      response: 'no albummid',
    }
  }
}, router.allowedMethods());

module.exports = router;