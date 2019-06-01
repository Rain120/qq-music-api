const u_common = require('../u_common');
module.exports = ({ method = 'get', option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      host: 'y.qq.com',
      referer: `https://y.qq.com/n/yqq/singer/${params.singermid}.html`,
    },
    params,
  });
  return u_common({ method, options });
}