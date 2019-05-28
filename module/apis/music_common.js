module.exports = ({ request, method = 'get', options = {} }) => {
  return request('/cgi-bin/musicu.fcg', method, options, 'u');
}