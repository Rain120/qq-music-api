const y_common = require('../y_common');

module.exports = ({ method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, { params, });
  return y_common({ url: '/lyric/fcgi-bin/fcg_query_lyric_new.fcg', method, options, });
}