module.exports = ({ request, method = 'get', params, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      host: 'y.qq.com',
      referer: 'https://y.qq.com/portal/player.html',
    },
    params,
  });
  return request('/v8/fcg-bin/fcg_v8_album_info_cp.fcg', method, options);
}