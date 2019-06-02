const y_common = require('../y_common');

module.exports = ({ method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, { params, });
  return y_common({ url: '/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg', method, options, });
}