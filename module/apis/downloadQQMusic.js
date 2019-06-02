const request = require('../../util/request');

module.exports = ({ method = 'get', params, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      host: 'y.qq.com',
      referer: 'https://y.qq.com/',
    },
    params,
  });
  return request('/download/download.js', method, options, 'y');
}