const getDownloadQQMusic = require('./context/getDownloadQQMusic');
const getHotKey = require('./context/getHotkey');
const getSearchByKey = require('./context/getSearchByKey');
const getSmartbox = require('./context/getSmartbox');
const getSongListCategories = require('./context/getSongListCategories');
const getSongLists = require('./context/getSongLists');
const batchGetSongLists = require('./context/batchGetSongLists');
const getSongInfo = require('./context/getSongInfo');
const batchGetSongInfo = require('./context/batchGetSongInfo');
const getSongListDetail = require('./context/getSongListDetail');
const getNewDisks = require('./context/getNewDisks');
const getMvByTag = require('./context/getMvByTag');
const getMv = require('./context/getMv');
const getSingerList = require('./context/getSingerList');
// const getSimilarSinger = require('./getSimilarSinger');
const getSingerAlbum = require('./context/getSingerAlbum');
const getSingerHotsong = require('./context/getSingerHotsong');
const getSingerMv = require('./context/getSingerMv');
// const getSingerDesc = require('./getSingerDesc');
const getSingerStarNum = require('./context/getSingerStarNum');
const getRadioLists = require('./context/getRadioLists');
const getDigitalAlbumLists = require('./context/getDigitalAlbumLists');
const getLyric = require('./context/getLyric');
const getMusicPlay = require('./context/getMusicPlay');
const getAlbumInfo = require('./context/getAlbumInfo');
const getComments = require('./context/getComments');
const getRecommend = require('./context/getRecommend');
const getMvPlay = require('./context/getMvPlay');
const getTopLists = require('./context/getTopLists');
const getRanks = require('./context/getRanks');
const getTicketInfo = require('./context/getTicketInfo');
const getImageUrl = require('./context/getImageUrl');
// Cookies
const cookies = require('./user');

// Singer
const singer = require('./singer');

module.exports = {
  ...cookies,
  ...singer,
  getDownloadQQMusic,
  getHotKey,
  getSearchByKey,
  getSmartbox,
  getSongListCategories,
  getSongLists,
  batchGetSongLists,
  getSongInfo,
  batchGetSongInfo,
  getSongListDetail,
  getNewDisks,
  getMvByTag,
  getMv,
  getSingerList,
  // getSimilarSinger,
  getSingerAlbum,
  getSingerHotsong,
  getSingerMv,
  // getSingerDesc,
  getSingerStarNum,
  getRadioLists,
  getDigitalAlbumLists,
  getLyric,
  getMusicPlay,
  getAlbumInfo,
  getComments,
  getRecommend,
  getMvPlay,
  getTopLists,
  getRanks,
  getTicketInfo,
  getImageUrl,
};
