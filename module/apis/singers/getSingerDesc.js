const y_common = require('../y_common');

module.exports = ({ method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, { params, });
  const hasCommonParams = false;
  return y_common({ url: '/splcloud/fcgi-bin/fcg_get_singer_desc.fcg', method, options, hasCommonParams, });
}