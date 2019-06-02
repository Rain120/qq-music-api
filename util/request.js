const axios = require('axios');
require('../util/colors');

// `withCredentials` 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;text/plain;';
axios.defaults.responseType = 'json;text/plain;charset=utf-8;';

let yURL = 'https://y.qq.com';
let cURL = 'https://c.y.qq.com';
// let uURL = 'https:/u.y.qq.com/cgi-bin/musicu.fcg';

function request (url, method, options = {}, isUUrl = 'c') {
  let baseURL = '';
  switch(isUUrl) {
    case 'y':
        baseURL = yURL + url;
      break;
    case 'u':
        baseURL = url;
      break;
    case 'c':
        baseURL = cURL + url;
      break;
    default:
        baseURL = cURL + url;
      break;
  }
  return axios[method](baseURL, options)
    .then(
      response => {
        if (!response) {
          throw Error('response is null');
        }
        console.log(`${url} request success`.info);
        return response;
      },
      error => {
        console.log(`${url} request error`.error);
        throw error;
      }
    )
}

module.exports = request;
