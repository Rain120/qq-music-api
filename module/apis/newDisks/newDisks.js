module.exports = ({ request, method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      referer: 'https://u.y.qq.com/',
      host: 'y.qq.com'
    },
    params,
  });
  return request('/cgi-bin/musicu.fcg', method, options, true);
}