const request = require('../../util/request');
module.exports = ({ url, method = 'get', options = {} }) => {
  let opts = Object.assign(options, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com',
    },
  });
  return request(url, method, opts);
}