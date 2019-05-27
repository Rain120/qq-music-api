const axios = require('axios');

// axios.defaults.baseURL = 'https://c.y.qq.com';
// `withCredentials` 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;text/plain;';
axios.defaults.responseType = 'json;text/plain;charset=utf-8;';

let yURL = 'https://y.qq.com';
let cURL = 'https://c.y.qq.com';
let uURL = 'https:/u.y.qq.com';

function request (url, method, options = {}, isUUrl = 'c') {
  let baseURL = '';
  switch(isUUrl) {
    case 'y':
        baseURL = yURL + url;
      break;
    case 'u':
        baseURL = uURL + url;
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
        return response;
      },
      error => { throw error }
    )
}

module.exports = request;
