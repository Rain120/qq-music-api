const userInfo = {
  loginUin: '',
  cookie: '',
};

const cookieList = userInfo.cookie.split('; ').map(_ => _.trim());

const cookieObject = {};
cookieList.filter(Boolean).forEach(_ => {
  if (_) {
    const [key, value = ''] = _.split('=');

    cookieObject[key] = value;
  }
});

module.exports = Object.assign(userInfo, {
  uin: userInfo.loginUin || cookieObject.uin,
  cookieList,
  cookieObject,
});
