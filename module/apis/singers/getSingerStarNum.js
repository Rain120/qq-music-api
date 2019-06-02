const y_common = require('../y_common');

module.exports = ({ method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, { params, });
  return y_common({ url: '/rsc/fcgi-bin/fcg_order_singer_getnum.fcg', method, options, });
}