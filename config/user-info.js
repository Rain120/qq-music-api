const fs = require('fs')
const path = require('path')

let userInfo, cookieList, cookieObject;
const infoPath = path.join(__dirname, './user-info.json');
fs.existsSync(infoPath) || fs.writeFileSync(infoPath, '{}', 'utf-8');

const initData = () => {
  
  userInfo = { loginUin: '', cookie: '', ...JSON.parse(fs.readFileSync(infoPath, 'utf-8')) };
  cookieList = userInfo.cookie.split('; ').map(_ => _.trim());

  cookieObject = {};
  cookieList.filter(Boolean).forEach(_ => {
    if (_) {
      const [key, value = ''] = _.split('=');
  
      cookieObject[key] = value;
    }
  });
};

const refreshData = cookie => {
  const uin = cookie.match(/ uin=([^;]+)/)[1];
  fs.writeFileSync(infoPath, JSON.stringify({ loginUin: uin, cookie: cookie }), 'utf-8');
  initData();
  return { 
    ...userInfo, 
    uin: userInfo.loginUin || cookieObject.uin,
    cookieList,
    cookieObject
  };
};

initData();

module.exports = Object.assign(userInfo, {
  uin: userInfo.loginUin || cookieObject.uin,
  cookieList,
  cookieObject,
  refreshData
});
