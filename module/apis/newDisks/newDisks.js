const u_common = require('../u_common');
module.exports = ({ method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      host: 'y.qq.com',
      referer: 'https://y.qq.com/portal/album_lib.html',
    },
    maxContentLength: 2018,
    params,
  });
  return u_common({ method, options });
}