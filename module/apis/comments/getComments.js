const y_common = require('../y_common');

module.exports = ({ method = 'get', params = {}, option = {} }) => {
  const data = Object.assign(params, {
    format: 'json',
    outCharset: 'GB2312',
    domain: 'qq.com',
    ct: 24,
    cv: 10101010,
    needmusiccrit: 0,
  })
  const options = Object.assign(option, { params:data, });
  return y_common({
    url: '/base/fcgi-bin/fcg_global_comment_h5.fcg',
    method,
    options,
  }).then(res => {
    const response = res.data;
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
  })
}