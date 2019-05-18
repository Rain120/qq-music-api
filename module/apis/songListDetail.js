module.exports = ({ request, method = 'get', params = {}, option = {} }) => {
  let options = Object.assign(option, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'y.qq.com'
    },
    params,
  });
  return request('/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg', method, options);
}