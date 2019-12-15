const y_common = require('../y_common');

module.exports = ({ method = 'get', params = {}, option = {} }) => {
  const data = Object.assign(params, {
    format: 'json',
    outCharset: 'utf-8',
    hostUin: 0,
    needNewCode: 0
  });
  const options = Object.assign(option, {
    params: data,
  });
  return y_common({
    url: '/splcloud/fcgi-bin/gethotkey.fcg',
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