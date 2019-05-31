const Router = require('koa-router');
const router = new Router();
const request = require('../util/request');
const { lyricParse } = require('../util/lyricParse');
const config = require('../module/config');
const apis = require('../module/index');

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

router.get('/getHotkey', async (ctx, next) => {
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

// w：搜索关键字
// p：当前页
// n：每页歌曲数量
// catZhida: 0表示歌曲, 2表示歌手, 3表示专辑, 4, 5
router.get('/getSearchByKey/:key?/:limit?/:page?/:catZhida?', async (ctx, next) => {
  let w = ctx.query.key;
  let n = +ctx.query.limit || 10;
  let p = +ctx.query.page || 1;
  let catZhida = +ctx.query.catZhida || 1;
  let params = Object.assign(config.commonParams, {
    ct: 24,
    qqmusic_ver: 1298,
    new_json: 1,
    remoteplace: 'txt.yqq.song',
    // searchid: 58932895599763136,
    t: 0,
    aggr: 1,
    cr: 1,
    catZhida,
    lossless: 0,
    flag_qc: 0,
    p: 1,
    n,
    w,
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  if (w) {
    await apis.getSearchByKey(props).then((res) => {
      let response = res.data;
      ctx.body = {
        response,
      }
    }).catch(error => {
      console.log(error);
    });
  } else {
    ctx.body = {
      response: 'search key is null',
    }
  }
}, router.allowedMethods());

// search smartbox
router.get('/getSmartbox/:key?', async (ctx, next) => {
  let key = ctx.query.key;
  let params = Object.assign(config.commonParams, {
    is_xml: 0,
    key,
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  if (key) {
    await apis.getSmartbox(props).then((res) => {
      let response = res.data;
      ctx.body = {
        response,
      }
    }).catch(error => {
      console.log(error);
    });
  } else {
    ctx.body = {
      response: null,
    }
  }
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
 * @param {sortId} 分类
 * @return: 
 */
router.get('/getSongLists/:page?/:limit?/:categoryId?/:sortId?', async (ctx, next) => {
  let ein = ctx.query.limit || 19;
  let sin = ctx.query.page || 0;
  let sortId = ctx.query.sortId || 5;
  let categoryId = ctx.query.categoryId || 10000000;
  let params = Object.assign({}, config.commonParams, {
    picmid: 1,
    categoryId,
    sortId,
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

TODO:
// MV
// area_id=15&version_id=7
router.get('/getMv/:area_id?/:version_id?/:limit?/:page?', async (ctx, next) => {
  let area_id = +ctx.query.area_id;
  let version_id = +ctx.query.version_id;
  let size = +ctx.query.limit || 20;
  let start = (ctx.query.page - 1 || 0) * size;
  let data = {
    comm: {
      ct: 24
    },
    mv_tag: {
      module: 'MvService.MvInfoProServer',
      method: 'GetAllocTag',
      param: {}
    },
    mv_list: {
      module: 'MvService.MvInfoProServer',
      method: 'GetAllocMvInfo',
      param: {
        start,
        size,
        version_id,
        area_id,
        order: 1
      }
    }
}
  let params = Object.assign({ data: JSON.stringify(data), }, config.commonParams);
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  if (version_id && area_id) {
    await apis.getMv(props).then((res) => {
      let response = res.data;
      ctx.body = {
        response,
      }
    }).catch(error => {
      console.log('error', error);
    });
  } else {
    ctx.body = {
      response: 'version_id or area_id is null',
    }
  }
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
  let sin = ctx.query.page || 0;
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
          sin,
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
  let order = ctx.query.order;
  let num = ctx.query.limit || 5;
  let params = Object.assign({}, config.commonParams, {
    cid: 205360581,
    singermid,
    order,
    begin: 0,
    num,
  });
  if (order && order.toLowerCase() === 'time') {
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
router.get('/getLyric/:songmid?/:isFormat?', async (ctx, next) => {
  let songmid = ctx.query.songmid;
  let isFormat = ctx.query.isFormat || false;
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
      let lyricString = res.data && res.data.lyric &&
        new Buffer.from(res.data.lyric, 'base64').toString();
      let lyric = isFormat ? lyricParse(lyricString) : lyricString;
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

// comments
// albumm_id: album请求结果的id值
// rootcommentid: 上一次请求结果的最后一项, comment.commentlist[commentlist.length - 1].rootcommentid
// albumm_id: 8220
// rootcommentid=album_8220_1003310416_1558068713
// cid=205360772
router.get('/getAlbumComments/:albumm_id?/:rootcommentid?/:cid?/:pagesize?/:pagenum?/:cmd?/:reqtype?/:biztype?', async (ctx, next) => {
  let albumm_id = ctx.query.albumm_id;
  let pagesize = ctx.query.pagesize || 25;
  let pagenum = ctx.query.pagenum || 0;
  let cid = ctx.query.cid || 205360772;
  let cmd = ctx.query.cmd || 8;
  let reqtype = ctx.query.reqtype || 2;
  let biztype = ctx.query.biztype || 2;
  let rootcommentid = pagenum ? ctx.query.rootcommentid : '';
  let checkrootcommentid = !pagenum ? true : !!rootcommentid;
  let params = Object.assign({}, config.commonParams, {
    outCharset: 'GB2312',
    cid,
    reqtype,
    biztype,
    topid: albumm_id,
    cmd,
    needmusiccrit: 0,
    pagenum,
    pagesize,
    lasthotcommentid: rootcommentid,
    domain: 'qq.com',
    ct: 24,
    cv: 10101010,
  });
  let props = {
    request,
    method: 'get',
    params,
    options: {}
  };
  if (albumm_id && checkrootcommentid) {
    await apis.getAlbumComments(props).then((res) => {
      let response = res.data;
      ctx.body = {
        response,
      }
    }).catch(error => {
      console.log('error', error);
    });
  } else {
    ctx.body = {
      response: 'Don\'t have albumm_id or rootcommentid',
    }
  }
}, router.allowedMethods());
module.exports = router;