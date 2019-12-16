const moment = require('moment');
const Router = require('koa-router');
const router = new Router();
const { _guid, commonParams, } = require('../module/config');
const apis = require('../module/index');
const context = require('./context');

// downloadQQMusic
router.get('/downloadQQMusic', context.getDownloadQQMusic);

router.get('/getHotkey', context.getHotKey);

router.get('/getSearchByKey/:key?/:limit?/:page?/:catZhida?', context.getSearchByKey);

// search smartbox
router.get('/getSmartbox/:key?', async (ctx, next) => {
  const { key } = ctx.query;
  const props = {
    method: 'get',
    params: {
      key,
    },
    options: {}
  };
  if (key) {
    const { status, body } = await apis.getSmartbox(props);
    Object.assign(ctx, {
      status,
      body,
    });
  } else {
    ctx.status = 200;
    ctx.body = {
      response: null,
    }
  }
});

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
  const props = {
    method: 'get',
    params: {},
    options: {}
  };
  const { status, body } = await apis.songListCategories(props);
  Object.assign(ctx, {
    status,
    body
  })
});

/**
 * @description: 2, 3
 * @param {page} 页数
 * @param {limit} 每页条数[20, 60]
 * @param {categoryId} 分类
 * @param {sortId} 分类
 * @return: 
 */
router.get('/getSongLists/:page?/:limit?/:categoryId?/:sortId?', async (ctx, next) => {
  const {
    limit: ein = 19,
    page: sin = 0,
    sortId = 5,
    categoryId = 10000000
  } = ctx.query;
  const params = Object.assign({
    categoryId,
    sortId,
    sin,
    ein,
  });
  const props = {
    method: 'get',
    params,
    options: {}
  };
  const { status, body } = await apis.songLists(props);
  Object.assign(ctx, {
    status,
    body,
  })
});

// getSongInfo
router.get('/getSongInfo/:songmid?/:songid?', async (ctx, next) => {
  const song_mid = ctx.query.songmid;
  const song_id = ctx.query.songid || '';

  const params = Object.assign(commonParams, {
    format: "json",
    inCharset: "utf8",
    outCharset: "utf-8",
    notice: 0,
    platform: "yqq.json",
    needNewCode: 0,
    data: {
        comm: {
            ct: 24,
            cv: 0
        },
        songinfo: {
            method: "get_song_detail_yqq",
            param: {
                song_type: 0,
                song_mid,
                song_id,
            },
            module: "music.pf_song_detail_svr"
        }
    }
  });
  const props = {
    method: 'get',
    params,
    options: {}
  };

  await apis.UCommon(props).then((res) => {
    const response = res.data;
    ctx.status = 200;
    ctx.body = {
      response,
    }
  }).catch(error => {
    console.log(`error`, error);
  });
});

// 4
// disstid=7011264340
router.get('/getSongListDetail/:disstid?', async (ctx, next) => {
  const { disstid } = ctx.query;
  const props = {
    method: 'get',
    params: {
      disstid,
    },
    options: {}
  };
  const { status, body } = await apis.songListDetail(props);
  Object.assign(ctx, {
    status,
    body,
  })
});

// newDisk
router.get('/getNewDisks/:page?/:limit?', async (ctx, next) => {
  const page = +ctx.query.page || 1;
  const num = +ctx.query.limit || 20;
  const start = (page - 1) * num;
  const data = {
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
  const params = Object.assign({
    format: 'json',
    data: JSON.stringify(data),
  });
  const props = {
    method: 'get',
    params,
    options: {}
  };
  await apis.UCommon(props).then((res) => {
    const response = res.data;
    ctx.status = 200;
    ctx.body = {
      response,
    }
  }).catch(error => {
    console.log(`error`, error);
  });
});

// getMvByTag
router.get('/getMvByTag', async (ctx, next) => {
  const props = {
    method: 'get',
    params: {},
    options: {}
  };
  const { status, body } = await apis.getMvByTag(props);
  Object.assign(ctx, {
    status,
    body,
  });
});

// MV
// area_id=15&version_id=7
router.get('/getMv/:area_id?/:version_id?/:limit?/:page?', async (ctx, next) => {
  const {
    area_id = 15,
    version_id = 7,
    size = 20,
    page = 0,
  } = ctx.query;
  const start = (page - 1 || 0) * size;
  const data = {
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
  const params = Object.assign({
    format: 'json',
    data: JSON.stringify(data),
  });
  const props = {
    method: 'get',
    params,
    options: {}
  };
  if (version_id && area_id) {
    await apis.UCommon(props).then((res) => {
      const response = res.data;
      ctx.status = 200;
      ctx.body = {
        response,
      }
    }).catch(error => {
      console.log(`error`, error);
    });
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'version_id or area_id is null',
    }
  }
});


// getSimilarSinger
// singermid=0025NhlN2yWrP4
router.get('/getSimilarSinger/:singermid?', async (ctx, next) => {
  const {
    singermid: singer_mid
  } = ctx.query;
  const props = {
    method: 'get',
    params: {
      singer_mid,
    },
    options: {}
  };
  if (singer_mid) {
    const { status, body } = await apis.getSimilarSinger(props);
    Object.assign(ctx, {
      status,
      body
    })
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'no singermid',
    }
  }
});

// getSingerAlbum
// singermid=0025NhlN2yWrP4
router.get('/getSingerAlbum/:singermid?/:limit?/:page?', async (ctx, next) => {
  const singermid = ctx.query.singermid;
  const num = +ctx.query.limit || 5;
  const sin = ctx.query.page || 0;
  const data = {
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
  };
  const params = Object.assign({
    format: 'json',
    singermid,
    data: JSON.stringify(data),
  });
  const props = {
    method: 'get',
    params,
    options: {}
  };
  if (singermid) {
    await apis.UCommon(props).then((res) => {
      const response = res.data;
      ctx.status = 200;
      ctx.body = {
        response,
      }
    }).catch(error => {
      console.log(`error`, error);
    });
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'no singermid',
    }
  }
});

/**
 * @description: getSingerMv
 * @param order: time(fan upload) || listen(singer all)
 */
router.get('/getSingerMv/:singermid?/:limit?/:order?', async (ctx, next) => {
  const {
    singermid,
    order,
    num = 5,
  } = ctx.query;
  const params = Object.assign({
    singermid,
    order,
    num,
  });
  if (order && order.toLowerCase() === 'time') {
    params = Object.assign(params, {
      cmd: 1,
    })
  }
  const props = {
    method: 'get',
    params,
    options: {}
  };
  if (singermid) {
    const { status, body } = await apis.getSingerMv(props);
    Object.assign(ctx, {
      status,
      body,
    })
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'no singermid',
    }
  }
});

router.get('/getSingerDesc/:singermid?', async (ctx, next) => {
  const {
    singermid,
  } = ctx.query;
  const props = {
    method: 'get',
    params: {
      singermid,
    },
    options: {}
  };
  if (singermid) {
    const { status, body } = await apis.getSingerDesc(props);
    Object.assign(ctx, {
      status,
      body,
    })
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'no singermid',
    }
  }
});

router.get('/getSingerStarNum/:singermid?', async (ctx, next) => {
  const {
    singermid,
  } = ctx.query;
  const props = {
    method: 'get',
    params: {
      singermid,
    },
    options: {}
  };
  if (singermid) {
    const { status, body } = await apis.getSingerStarNum(props);
    Object.assign(ctx, {
      status,
      body,
    })
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'no singermid',
    }
  }
});

// radio
router.get('/getRadioLists', async (ctx, next) => {
  const props = {
    method: 'get',
    params: {},
    options: {}
  };
  const { status, body } = await apis.getRadioLists(props);
  Object.assign(ctx, {
    status,
    body,
  })
});

// DigitalAlbum
router.get('/getDigitalAlbumLists', async (ctx, next) => {
  const props = {
    method: 'get',
    params: {},
    options: {}
  };
  const { status, body } = await apis.getDigitalAlbumLists(props);
  Object.assign(ctx, {
    status,
    body,
  })
});

// music
// getLyric
// songmid=003rJSwm3TechU
router.get('/getLyric/:songmid?/:isFormat?', async (ctx, next) => {
  const {
    songmid,
    isFormat,
  } = ctx.query;
  const props = {
    method: 'get',
    params: {
      songmid,
    },
    options: {},
    isFormat,
  };
  if (songmid) {
    const { status, body } = await apis.getLyric(props);
    Object.assign(ctx, {
      status,
      body,
    })
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'no songmid',
    }
  }
});

// songmid=003rJSwm3TechU
router.get('/getMusicVKey/:songmid?', async (ctx, next) => {
  const songmid = ctx.query.songmid + '';
  const guid = _guid ? _guid + '' : '1429839143';
  const data = {
    req: {
      module: "CDN.SrfCdnDispatchServer",
      method: "GetCdnDispatch",
      param: {
        guid,
        calltype: 0,
        userip: ""
      }
    },
    req_0: {
      module: "vkey.GetVkeyServer",
      method: "CgiGetVkey",
      param: {
        guid,
        songmid: [songmid],
        songtype: [0],
        uin: "0",
        loginflag: 1,
        platform: "20"
      }
    },
    comm: {
      uin: 0,
      format: "json",
      ct: 24,
      cv: 0
    }
  }
  const params = Object.assign({
    format: 'json',
    data: JSON.stringify(data),
  });
  const props = {
    method: 'get',
    params,
    options: {},
  };
  if (songmid) {
    await apis.UCommon(props).then((res) => {
      const response = res.data;
      let playLists = [];
      const req_0 = response.req_0.data;
      req_0.sip.map(sipURL => {
        const purl = req_0.midurlinfo[0].purl;
        const URI = `${sipURL}${purl}`
        playLists.push(URI);
      });
      response.playLists = playLists;
      ctx.body = {
        response,
      }
    }).catch(error => {
      console.log(`error`, error);
    });
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'no songmid',
    }
  }
});

// album
// albummid=0016l2F430zMux
router.get('/getAlbumInfo/:albummid?', async (ctx, next) => {
  const { albummid } = ctx.query;
  const props = {
    method: 'get',
    params: {
      albummid,
    },
    options: {}
  };
  if (albummid) {
    const { status, body } = await apis.getAlbumInfo(props);
    Object.assign(ctx, {
      status,
      body,
    })
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'no albummid',
    }
  }
});

TODO:
// comments: params error
// id: 专辑或者歌单请求结果的id
// rootcommentid: 上一次请求结果的最后一项, comment.commentlist[commentlist.length - 1].rootcommentid
// id=8220
// rootcommentid=album_8220_1003310416_1558068713
// cid=205360772
router.get('/getComments/:id?/:rootcommentid?/:cid?/:pagesize?/:pagenum?/:cmd?/:reqtype?/:biztype?', async (ctx, next) => {
  const {
    id,
    pagesize = 25,
    pagenum = 0,
    cid = 205360772,
    cmd = 8,
    reqtype = 2,
    biztype = 2,
    rootcommentid = !pagenum && '',
  } = ctx.query;
  const checkrootcommentid = !pagenum ? true : !!rootcommentid;

  const params = Object.assign({
    cid,
    reqtype,
    biztype,
    topid: id,
    cmd,
    pagenum,
    pagesize,
    lasthotcommentid: rootcommentid,
  });
  const props = {
    method: 'get',
    params,
    options: {}
  };
  if (id && checkrootcommentid) {
    const { status, body } = await apis.getComments(props);
    Object.assign(ctx, {
      status,
      body,
    })
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'Don\'t have id or rootcommentid',
    }
  }
});

// recommend
router.get('/getRecommend', async (ctx, next) => {
  const data = {
    comm: {
      ct: 24
    },
    category: {
      method: "get_hot_category",
      param: {
        qq: ""
      },
      module: "music.web_category_svr"
    },
    recomPlaylist: {
      method: "get_hot_recommend",
      param: {
        async: 1,
        cmd: 2
      },
      module: "playlist.HotRecommendServer"
    },
    playlist: {
      method: "get_playlist_by_category",
      param: {
        id: 8,
        curPage: 1,
        size: 40,
        order: 5,
        titleid: 8
      },
      module: "playlist.PlayListPlazaServer"
    },
    new_song: {
      module: "newsong.NewSongServer",
      method: "get_new_song_info",
      param: {
        type: 5
      }
    },
    new_album: {
      module: "newalbum.NewAlbumServer",
      method: "get_new_album_info",
      param: {
        area: 1,
        sin: 0,
        num: 10
      }
    },
    new_album_tag: {
      module: "newalbum.NewAlbumServer",
      method: "get_new_album_area",
      param: {}
    },
    toplist: {
      module: "musicToplist.ToplistInfoServer",
      method: "GetAll",
      param: {}
    },
    focus: {
      module: "QQMusic.MusichallServer",
      method: "GetFocus",
      param: {}
    }
  };
  const params = Object.assign({
    format: 'json',
    data: JSON.stringify(data),
  });
  const props = {
    method: 'get',
    params,
    options: {}
  };
  await apis.UCommon(props).then((res) => {
    const response = res.data;
    ctx.status = 200;
    ctx.body = {
      response,
    }
  }).catch(error => {
    console.log(`error`, error);
  });
});

// mv play
// vid=u00222le4ox
router.get('/getMvPlay/:vid?', async (ctx, next) => {
  const {
    vid,
  } = ctx.query;
  const data = {
    comm: {
      ct: 24,
      cv: 4747474
    },
    getMVUrl: {
      module: "gosrf.Stream.MvUrlProxy",
      method: "GetMvUrls",
      param: {
        vids: [vid],
        request_typet: 10001
      }
    },
    mvinfo: {
      module: "video.VideoDataServer",
      method: "get_video_info_batch",
      param: {
        vidlist: [vid],
        required: [
          "vid",
          "type",
          "sid",
          "cover_pic",
          "duration",
          "singers",
          "video_switch",
          "msg",
          "name",
          "desc",
          "playcnt",
          "pubdate",
          "isfav",
          "gmid"
        ]
      }
    },
    other: {
      module: "video.VideoLogicServer",
      method: "rec_video_byvid",
      param: {
        vid,
        required: [
          "vid",
          "type",
          "sid",
          "cover_pic",
          "duration",
          "singers",
          "video_switch",
          "msg",
          "name",
          "desc",
          "playcnt",
          "pubdate",
          "isfav",
          "gmid",
          "uploader_headurl",
          "uploader_nick",
          "uploader_encuin",
          "uploader_uin",
          "uploader_hasfollow",
          "uploader_follower_num"
        ],
        support: 1
      }
    }
  };
  const params = Object.assign({
    format: 'json',
    data: JSON.stringify(data),
  });
  const props = {
    method: 'get',
    params,
    options: {}
  };
  if (vid) {
    await apis.UCommon(props).then((res) => {
      const response = res.data;
      let mvurls = response.getMVUrl.data;
      let mvurlskey = Object.keys(mvurls)[0];
      let mp4_urls = mvurls[mvurlskey].mp4.map(item => item.freeflow_url);
      let hls_urls = mvurls[mvurlskey].hls.map(item => item.freeflow_url);
      let urls = [...mp4_urls, ...hls_urls];
      let play_urls = [];
      let playLists = {};
      urls.length && urls.forEach(url => {
        play_urls = [...play_urls, ...url]
      });
      playLists = {
        f10: play_urls.filter(item => /\.f10\.mp4/.test(item)),
        f20: play_urls.filter(item => /\.f20\.mp4/.test(item)),
        f30: play_urls.filter(item => /\.f30\.mp4/.test(item)),
        f40: play_urls.filter(item => /\.f40\.mp4/.test(item)),
      }
      response.playLists = playLists;
      ctx.status = 200;
      ctx.body = {
        response,
      }
    }).catch(error => {
      console.log(`error`, error);
    });
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'vid is null',
    }
  }
});

// rankList: getTopLists
router.get('/getTopLists', async (ctx, next) => {
  const props = {
    method: 'get',
    params: commonParams,
    options: {}
  };
  const { status, body } = await apis.getTopLists(props);
  Object.assign(ctx, {
    status,
    body,
  })
});

// ranks
router.get('/getRanks/:topId?/:limit?/:page?', async (ctx, next) => {
  const topId = +ctx.query.limit || 4;
  const num = +ctx.query.limit || 20;
  const offset = +ctx.query.page || 0;
  const data = {
    detail: {
      module: "musicToplist.ToplistInfoServer",
      method: "GetDetail",
      param: {
        topId,
        offset,
        num,
        period: moment().format('YYYY-MM-DD')
      }
    },
    comm: {
      ct: 24,
      cv: 0
    }
  };
  const params = Object.assign({
    format: 'json',
    data: JSON.stringify(data),
  });
  const props = {
    method: 'get',
    params,
    options: {}
  };
  await apis.UCommon(props).then((res) => {
    const response = res.data;
    ctx.status = 200;
    ctx.body = {
      response,
    }
  }).catch(error => {
    console.log(`error`, error);
  });
});


// ticket
router.get('/getTicketInfo', async (ctx, next) => {
  const data = {
    comm: {
      ct: 24,
      cv: 0
    },
    getFirstData: {
      module: "mall.ticket_index_page_svr",
      method: "GetTicketIndexPage",
      param: {
        city_id: -1
      }
    },
    getTag: {
      module: "mall.ticket_index_page_svr",
      method: "GetShowTypeList",
      param: {}
    }
  };
  const params = Object.assign({
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'GB2312',
    platform: 'yqq.json',
    data: JSON.stringify(data),
  });
  const props = {
    method: 'get',
    params,
    options: {}
  };
  await apis.UCommon(props).then((res) => {
    const response = res.data;
    ctx.status = 200;
    ctx.body = {
      response,
    }
  }).catch(error => {
    console.log(`error`, error);
  });
});

module.exports = router;