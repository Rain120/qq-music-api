module.exports = ({ request, method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params,
  });
  return request('/splcloud/fcgi-bin/fcg_get_singer_desc.fcg', method, options);
}