const music_common = require('../music_common');
module.exports = ({ request, method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      host: 'y.qq.com',
      referer: 'https://y.qq.com/portal/player.html',
    },
    maxContentLength: 4028,
    params,
  });
  return music_common({ request, method, options });
}