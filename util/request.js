const axios = require('axios');

axios.defaults.baseURL = 'https://c.y.qq.com';
// `withCredentials` 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = false;
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.responseType = '*';

// let cURL = 'https://c.y.qq.com';
// let uURL = 'https:/u.y.qq.com';

function request (url, method, options = {}) {
  return axios[method](url, options)
    .then(
      response => {
        if (!response) {
          throw Error('response is null')
        }
        return response
      },
      error => { throw error }
    )
}

module.exports = request;
