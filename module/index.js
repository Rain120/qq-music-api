const getHotKey = require('./apis/search/getHotKey');
const downloadQQMusic = require('./apis/downloadQQMusic');

// song list
const songLists = require('./apis/songLists/songLists');
const songListCategories = require('./apis/songLists/songListCategories');
const songListDetail = require('./apis/songLists/songListDetail');
const newDisks = require('./apis/newDisks/newDisks');
const getMvByTag = require('./apis/getMvByTag');

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

module.exports = {
  getHotKey,
  downloadQQMusic,
  // song lists
  songLists,
  songListCategories,
  songListDetail,
  newDisks,
  getMvByTag,
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
}