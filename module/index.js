const downloadQQMusic = require('./apis/downloadQQMusic');
// search
const getHotKey = require('./apis/search/getHotKey');
const getSearchByKey = require('./apis/search/getSearchByKey');
const getSmartbox = require('./apis/search/getSmartbox');

// song list
const songLists = require('./apis/songLists/songLists');
const songListCategories = require('./apis/songLists/songListCategories');
const songListDetail = require('./apis/songLists/songListDetail');

// MV
const getMvByTag = require('./apis/mv/getMvByTag');

// singer
const getSimilarSinger = require('./apis/singers/getSimilarSinger');
const getSingerMv = require('./apis/singers/getSingerMv');
const getSingerDesc = require('./apis/singers/getSingerDesc');
const getSingerStarNum = require('./apis/singers/getSingerStarNum');

// radio
const getRadioLists = require('./apis/radio/getRadioLists');

// DigitalAlbum
const getDigitalAlbumLists = require('./apis/digitalAlbum/getDigitalAlbumLists');

// music
const getLyric = require('./apis/music/getLyric');

// album
const getAlbumInfo = require('./apis/album/getAlbumInfo');

// comments
const getComments = require('./apis/comments/getComments');

// UCommon
const UCommon = require('./apis/UCommon/UCommon');

// getTopLists
const getTopLists = require('./apis/rank/getTopLists');

module.exports = {
  downloadQQMusic,
  // search
  getHotKey,
  getSearchByKey,
  getSmartbox,
  // song lists
  songLists,
  songListCategories,
  songListDetail,
  // MV
  getMvByTag,
  // singer
  getSimilarSinger,
  getSingerMv,
  getSingerDesc,
  getSingerStarNum,
  // radio
  getRadioLists,
  // DigitalAlbum
  getDigitalAlbumLists,
  // music
  getLyric,
  // album
  getAlbumInfo,
  // comments
  getComments,
  // UCommon
  UCommon,
  // getTopLists
  getTopLists,
}