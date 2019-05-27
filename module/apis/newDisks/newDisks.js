module.exports = ({ request, method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      host: 'u.y.qq.com',
      referer: 'https://y.qq.com/portal/album_lib.html',
    },
    params,
  });
  return request('/cgi-bin/musicu.fcg', method, options, 'u');
}