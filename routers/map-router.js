/*
 * @Author: Rainy [https://github.com/rain120]
 * @Date: 2021-01-30 15:30:13
 * @LastEditors: Rainy
 * @LastEditTime: 2021-01-31 11:46:13
 */
const context = require('.');

module.exports = {
  // INFO: singer Module
  // /getSimilarSinger?singermid=0025NhlN2yWrP4
  '/getSimilarSinger/:singermid?': {
    cb: context.getSimilarSinger,
  },
  // /singe/similar?id=4558&singermid=0025NhlN2yWrP4
  '/singer/similar/:id/:singermid/:pageNum?': {
    cb: context.getSimilarSinger,
  },
  // TODO:
  '/getSingerList/:area?/:sex?/:genre?/:index?/:page?': {
    cb: context.getSingerList,
  },
  '/getSingerAlbum/:singermid?/:limit?/:page?': {
    cb: context.getSingerAlbum,
  },
  '/getSingerHotsong/:singermid?/:limit?/:page?': {
    cb: context.getSingerHotsong,
  },
  '/getSingerMv/:singermid?/:limit?/:order?': {
    cb: context.getSingerMv,
  },
  '/getSingerDesc/:singermid?': {
    cb: context.getSingerDesc,
  },
  '/singer/desc/:singermid?': {
    cb: context.getSingerDesc,
  },
  '/getSingerStarNum/:singermid?': {
    cb: context.getSingerStarNum,
  },

  // INFO: user Module
  '/user/getCookie': {
    cb: context.getCookie,
  },
  '/user/setCookie': {
    cb: context.setCookie,
  },

  // INFO: app Module
  '/downloadQQMusic': {
    cb: context.getDownloadQQMusic,
  },

  // INFO: search-hot Module
  '/getHotkey': {
    cb: context.getHotKey,
  },
  '/getSearchByKey/:key?/:limit?/:page?/:catZhida?': {
    cb: context.getSearchByKey,
  },
  '/getSmartbox/:key?': {
    cb: context.getSmartbox,
  },

  // INFO: song Module
  '/getSongListCategories': {
    cb: context.getSongListCategories,
  },
  '/getMusicPlay/:songmid?': {
    cb: context.getMusicPlay,
  },
  '/getSongLists/:page?/:limit?/:categoryId?/:sortId?': {
    cb: context.getSongLists,
  },
  '/batchGetSongLists': {
    method: 'post',
    cb: context.batchGetSongLists,
  },
  '/getSongInfo/:songmid?/:songid?': {
    cb: context.getSongInfo,
  },
  '/batchGetSongInfo': {
    method: 'post',
    cb: context.batchGetSongInfo,
  },
  '/getSongListDetail/:disstid?': {
    cb: context.getSongListDetail,
  },
  '/getLyric/:songmid?/:isFormat?': {
    cb: context.getLyric,
  },

  '/getNewDisks/:page?/:limit?': {
    cb: context.getNewDisks,
  },

  // INFO: MV Module
  '/getMvByTag': {
    cb: context.getMvByTag,
  },
  '/getMv/:area_id?/:version_id?/:limit?/:page?': {
    cb: context.getMv,
  },
  '/getMvPlay/:vid?': {
    cb: context.getMvPlay,
  },

  '/getRadioLists': {
    cb: context.getRadioLists,
  },
  '/getDigitalAlbumLists': {
    cb: context.getDigitalAlbumLists,
  },
  '/getAlbumInfo/:albummid?': {
    cb: context.getAlbumInfo,
  },
  '/getComments/:id?/:rootcommentid?/:cid?/:pagesize?/:pagenum?/:cmd?/:reqtype?/:biztype?': {
    cb: context.getComments,
  },
  '/getRecommend': {
    cb: context.getRecommend,
  },
  '/getTopLists': {
    cb: context.getTopLists,
  },
  '/getRanks/:topId?/:limit?/:page?': {
    cb: context.getRanks,
  },
  '/getTicketInfo': {
    cb: context.getTicketInfo,
  },
  '/getImageUrl': {
    cb: context.getImageUrl,
  },
};
