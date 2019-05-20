const getHotKey = require('./apis/getHotKey');
const downloadQQMusic = require('./apis/downloadQQMusic');
const songLists = require('./apis/songLists/songLists');
const songListCategories = require('./apis/songLists/songListCategories');
const songListDetail = require('./apis/songLists/songListDetail');
const newDisks = require('./apis/newDisks/newDisks');
const getMvByTag = require('./apis/getMvByTag');
const getSimilarSinger = require('./apis/singers/getSimilarSinger');
const getSingerAlbum = require('./apis/singers/getSingerAlbum');
const getSingerMv = require('./apis/singers/getSingerMv');

module.exports = {
  getHotKey,
  downloadQQMusic,
  songLists,
  songListCategories,
  songListDetail,
  newDisks,
  getMvByTag,
  getSimilarSinger,
  getSingerAlbum,
  getSingerMv,
}