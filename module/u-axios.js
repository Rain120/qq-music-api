const request = require('../util/request');
const config = require('./config');

module.exports = ({ options = {}, method = 'get' }) => {
  const opts = Object.assign(options, config.commonParams, {
    headers: {
      referer: 'https://y.qq.com/portal/player.html',
      host: 'u.y.qq.com',
      'content-type': 'application/x-www-form-urlencoded',
    },
  });

  global.log && console.log('https://u.y.qq.com/cgi-bin/musicu.fcg', { opts });
  return request('https://u.y.qq.com/cgi-bin/musicu.fcg', method, opts, 'u');
};
