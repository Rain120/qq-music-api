const getDownloadQQMusic = require('./getDownloadQQMusic');
const getHotKey = require('./getHotkey');
const getSearchByKey = require('./getSearchByKey');
const getSmartbox = require('./getSmartbox');
const getSongListCategories = require('./getSongListCategories');
const getSongLists = require('./getSongLists');
const batchGetSongLists = require('./batchGetSongLists');
const getSongInfo = require('./getSongInfo');
const batchGetSongInfo = require('./batchGetSongInfo');
const getSongListDetail = require('./getSongListDetail');
const getNewDisks = require('./getNewDisks');
const getMvByTag = require('./getMvByTag');
const getMv = require('./getMv');
const getSingerList = require('./getSingerList');
const getSimilarSinger = require('./getSimilarSinger');
const getSingerAlbum = require('./getSingerAlbum');
const getSingerHotsong = require('./getSingerHotsong');
const getSingerMv = require('./getSingerMv');
const getSingerDesc = require('./getSingerDesc');
const getSingerStarNum = require('./getSingerStarNum');
const getRadioLists = require('./getRadioLists');
const getDigitalAlbumLists = require('./getDigitalAlbumLists');
const getLyric = require('./getLyric');
const getMusicPlay = require('./getMusicPlay');
const getAlbumInfo = require('./getAlbumInfo');
const getComments = require('./getComments');
const getRecommend = require('./getRecommend');
const getMvPlay = require('./getMvPlay');
const getTopLists = require('./getTopLists');
const getRanks = require('./getRanks');
const getTicketInfo = require('./getTicketInfo');
const getImageUrl = require('./getImageUrl');
const {get: getCookie, set: setCookie} = require('./cookies');

module.exports = {
	getCookie,
	setCookie,
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
	getSimilarSinger,
	getSingerAlbum,
	getSingerHotsong,
	getSingerMv,
	getSingerDesc,
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
