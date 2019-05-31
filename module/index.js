const downloadQQMusic = require('./apis/downloadQQMusic');
// search
const getHotKey = require('./apis/search/getHotKey');
const getSearchByKey = require('./apis/search/getSearchByKey');
const getSmartbox = require('./apis/search/getSmartbox');

// song list
const songLists = require('./apis/songLists/songLists');
const songListCategories = require('./apis/songLists/songListCategories');
const songListDetail = require('./apis/songLists/songListDetail');
const newDisks = require('./apis/newDisks/newDisks');

// MV
const getMvByTag = require('./apis/mv/getMvByTag');
const getMv = require('./apis/mv/getMv');

// singer
const getSimilarSinger = require('./apis/singers/getSimilarSinger');
const getSingerAlbum = require('./apis/singers/getSingerAlbum');
const getSingerMv = require('./apis/singers/getSingerMv');
const getSingerDesc = require('./apis/singers/getSingerDesc');
// radio
const getRadioLists = require('./apis/radio/getRadioLists');

// DigitalAlbum
const getDigitalAlbumLists = require('./apis/digitalAlbum/getDigitalAlbumLists');

// music
const getLyric = require('./apis/music/getLyric');
const getMusicVKey = require('./apis/music/getMusicVKey');

// album
const getAlbum = require('./apis/album/getAlbum');

// comments
const getAlbumComments = require('./apis/comments/getAlbumComments');

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
  newDisks,
  // MV
  getMvByTag,
  getMv,
  // singer
  getSimilarSinger,
  getSingerAlbum,
  getSingerMv,
  getSingerDesc,
  // radio
  getRadioLists,
  // DigitalAlbum
  getDigitalAlbumLists,
  // music
  getLyric,
  getMusicVKey,
  // album
  getAlbum,
  // comments
  getAlbumComments,
}