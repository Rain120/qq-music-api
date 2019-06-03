const y_common = require('../y_common');

module.exports = ({ method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, { params, });
  const hasCommonParams = false;
  return y_common({ url: '/v8/fcg-bin/fcg_myqq_toplist.fcg', method, options, hasCommonParams, });
}