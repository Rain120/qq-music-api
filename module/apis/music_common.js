module.exports = ({ request, method = 'get', options = {} }) => {
  let opts = Object.assign(options, {});
  return request('/cgi-bin/musicu.fcg', method, opts, 'u');
}