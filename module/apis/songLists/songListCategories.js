module.exports = ({ request, method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'y.qq.com'
    },
    params,
  });
  return request('/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg', method, options);
}