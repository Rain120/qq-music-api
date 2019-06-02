const request = require('../../util/request');
const config = require('../config');

module.exports = ({ options = {}, method = 'get' }) => {
  let opts = Object.assign(options, config.commonParams, {
    headers: {
      referer: 'https://u.y.qq.com/',
      host: 'u.y.qq.com',
    },
  });
  return request('https://u.y.qq.com/cgi-bin/musicu.fcg', method, opts, 'u');
}