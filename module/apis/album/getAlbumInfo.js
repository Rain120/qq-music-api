const y_common = require('../y_common');

module.exports = ({ method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, { params, });
  return y_common({ url: '/v8/fcg-bin/fcg_v8_album_info_cp.fcg', method, options, });
}