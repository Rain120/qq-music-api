module.exports = ({ request, method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      host: 'y.qq.com',
      referer: `https://y.qq.com/n/yqq/singer/${params.singermid}.html`,
    },
    params,
  });
  return request('/cgi-bin/musicu.fcg', method, options, 'u');
}