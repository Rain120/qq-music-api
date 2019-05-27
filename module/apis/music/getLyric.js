module.exports = ({ request, method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      host: 'c.y.qq.com',
      referer: 'https://y.qq.com/portal/player.html',
    },
    params,
  });
  return request('/lyric/fcgi-bin/fcg_query_lyric_new.fcg', method, options);
}