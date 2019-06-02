const y_common = require('../y_common');

module.exports = ({ method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, { params, });
  return y_common({ url: '/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', method, options, });
}