module.exports = ({ request, method = 'get', params, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      host: 'c.y.qq.com',
      referer: 'https://c.y.qq.com',
    },
    params,
  });
  return request('/splcloud/fcgi-bin/gethotkey.fcg', method, options);
}