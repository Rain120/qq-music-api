const request = require('../../util/request');
const config = require('../config');

module.exports = ({ url, method = 'get', options = {}, hasCommonParams = true }) => {
  let commonParams = hasCommonParams ? config.commonParams : {};
  let opts = Object.assign(options, commonParams, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com',
    },
  });
  return request(url, method, opts);
}