module.exports = ({ request, method = 'get', params, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      host: 'y.qq.com',
      referer: 'https://y.qq.com/portal/player.html',
    },
    params,
  });
  return request('/splcloud/fcgi-bin/smartbox_new.fcg', method, options);
}