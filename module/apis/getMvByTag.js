module.exports = ({ request, method = 'get', params, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      referer: 'https://y.qq.com/',
      host: 'y.qq.com'
    },
    params,
  });
  return request('/fcgi-bin/getmv_by_tag', method, options);
}