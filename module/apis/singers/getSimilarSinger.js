module.exports = ({ request, method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      host: 'c.y.qq.com',
      referer: 'https://c.y.qq.com',
    },
    params,
  });
  return request('/v8/fcg-bin/fcg_v8_simsinger.fcg', method, options);
}