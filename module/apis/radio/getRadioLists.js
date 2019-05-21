module.exports = ({ request, method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params,
  });
  return request('/v8/fcg-bin/fcg_v8_radiolist.fcg', method, options);
}