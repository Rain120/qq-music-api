module.exports = ({ request, method = 'get', params, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      referer: 'https://y.qq.com/',
      host: 'y.qq.com'
    },
    params,
  });
  return request('/download/download.js', method, options);
}