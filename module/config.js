const commonParams = {
  g_tk: 1124214810,
  loginUin: 0,
  hostUin: 0,
  inCharset: 'utf8',
  outCharset: 'utf-8',
  format: 'json',
  notice: 0,
  platform: 'yqq.json',
  needNewCode: 0,
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
