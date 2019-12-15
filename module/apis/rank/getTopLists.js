const y_common = require('../y_common');

module.exports = ({ method = 'get', params = {}, option = {} }) => {
  const hasCommonParams = false;
  const data = Object.assign(params, {
    format: 'json',
    outCharset: 'utf-8',
    platform: 'h5',
    needNewCode: 1,
  });
  const options = Object.assign(option, {
    params: data,
  });
  return y_common({
    url: '/v8/fcg-bin/fcg_myqq_toplist.fcg',
    method,
    options,
    hasCommonParams,
  }).then(res => {
    const response = res.data;
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