const y_common = require('../y_common');

module.exports = ({ method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, { params, });
  return y_common({ url: '/base/fcgi-bin/fcg_global_comment_h5.fcg', method, options, });
}