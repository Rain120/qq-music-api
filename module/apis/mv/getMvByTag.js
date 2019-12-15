const y_common = require('../y_common');

module.exports = ({ method = 'get', params = {}, option = {} }) => {
  const data = Object.assign(params, {
    format: 'json',
    outCharset: 'GB2312',
    cmd: 'shoubo',
    lan: 'all',
  });
  const options = Object.assign(option, {
    params: data,
  });
  return y_common({
    url: '/mv/fcgi-bin/getmv_by_tag',
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
  });
}