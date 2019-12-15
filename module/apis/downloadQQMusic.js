const request = require('../../util/request');

module.exports = ({ method = 'get', params = {}, option = {} }) => {
  const data = Object.assign(params, {
    format: 'jsonp',
    jsonpCallback: 'MusicJsonCallback',
    platform: 'yqq',
  });
  const options = Object.assign(option, {
    headers: {
      host: 'y.qq.com',
      referer: 'https://y.qq.com/',
    },
    params: data,
  });
  return request(
    '/download/download.js',
    method,
    options,
    'y'
  ).then(res => {
    let response = res.data;
    if (typeof response === 'string') {
      const reg = /^\w+\(({[^()]+})\)$/;
      const matches = response.match(reg);
      if (matches) {
        response = JSON.parse(matches[1]);
      }
    }
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