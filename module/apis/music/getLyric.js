const { lyricParse } = require('../../../util/lyricParse');
const moment = require('moment');
const y_common = require('../y_common');

module.exports = ({ method = 'get', params = {}, option = {}, isFormat = false }) => {
  const data = Object.assign(params, {
    format: 'json',
    outCharset: 'utf-8',
    pcachetime: moment().valueOf(),
  });
  const options = Object.assign(option, {
    params: data,
  });
  return y_common({
    url: '/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
    method,
    options,
  }).then((res) => {
    const lyricString = res.data && res.data.lyric &&
      new Buffer.from(res.data.lyric, 'base64').toString();
    const lyric = isFormat ? lyricParse(lyricString) : lyricString;
    const response = {
      ...res.data,
      lyric,
    };
    return {
      status: 200,
      body: {
        response,
      }
    }
  }).catch(error => {
    console.log(`error`, error);
    return {
      body: {
        error,
      }
    };
  });
}