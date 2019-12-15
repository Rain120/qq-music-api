const y_common = require('../y_common');

module.exports = ({ method = 'get', params = {}, option = {} }) => {
  const data = Object.assign(params, {
    format: 'json',
    outCharset: 'utf-8',
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
  });
  const options = Object.assign(option, {
    params: data,
  });
  return y_common({
    url: '/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
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