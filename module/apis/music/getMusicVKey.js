const u_common = require('../u_common');
module.exports = ({ method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, {
    maxContentLength: 4028,
    params,
  });
  return u_common({ method, options });
}