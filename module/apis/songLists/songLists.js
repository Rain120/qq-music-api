module.exports = ({ request, method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      referer: 'https://y.qq.com/portal/playlist.html',
      host: 'y.qq.com'
    },
    params,
  });
  return request('/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', method, options);
}