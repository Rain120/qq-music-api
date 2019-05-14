module.exports = ({ request, method = 'get', option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: {
      g_tk: 963298023,
      loginUin: 1085131904,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0
    }
  });
  return request('/splcloud/fcgi-bin/gethotkey.fcg', method, options);
}