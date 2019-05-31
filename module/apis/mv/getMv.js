const music_common = require('../music_common');
module.exports = ({ request, method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, {
    maxContentLength: 2318,
    params,
  });
  return music_common({ request, method, options });
}