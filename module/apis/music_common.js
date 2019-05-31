module.exports = ({ request, method = 'get', options = {} }) => {
  let opts = Object.assign(options, {
    headers: {
      referer: 'https://u.y.qq.com/',
      host: 'u.y.qq.com',
    },
  });
  return request('/cgi-bin/musicu.fcg', method, opts, 'u');
}