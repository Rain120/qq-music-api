const request = require('../util/request');
const config = require('./config');

module.exports = ({
  url,
  method = 'get',
  options = {},
  hasCommonParams = true,
  thenable,
  catcher = err => null,
}) => {
  const commonParams = hasCommonParams ? config.commonParams : {};
  const opts = Object.assign(options, commonParams, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com',
    },
  });

  global.log && console.log(url, { opts });
  return request(url, method, opts).then(thenable).catch(catcher);
};
