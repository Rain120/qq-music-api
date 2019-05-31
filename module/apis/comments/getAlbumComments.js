module.exports = ({ request, method = 'get', params, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      host: 'y.qq.com',
      referer: 'https://y.qq.com/portal/player.html',
    },
    params,
  });
  return request('/base/fcgi-bin/fcg_global_comment_h5.fcg', method, options);
}