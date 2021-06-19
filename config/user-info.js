/*
 * @Author: Rainy [https://github.com/rain120]
 * @Date: 2021-01-23 15:38:31
 * @LastEditors: Rainy
 * @LastEditTime: 2021-06-19 22:25:49
 */

const userInfo = {
	loginUin: '',
	cookie: '',
}

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
