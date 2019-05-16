const commonParams = {
  g_tk: 963298023,
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp',
  loginUin: 0,
}

const options = {
  param: 'jsonpCallback',
  prefix: 'tan',
  // prefix: 'jp',
}

const optionsPrefix = {
  param: 'jsonpCallback',
  prefix: 'playlistinfoCallback'
}

module.exports = {
  commonParams,
  options,
  optionsPrefix,
}
