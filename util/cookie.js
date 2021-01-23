/*
 * @Author: Rainy [https://github.com/rain120]
 * @Date: 2021-01-23 16:19:21
 * @LastEditors: Rainy
 * @LastEditTime: 2021-01-23 17:56:29
 */

module.exports = () => async (ctx, next) => {
	if (global.cookie) {
		ctx.request.cookie = global.cookie;
	}
	// const cookieHeader = ctx.headers.cookie;
	// if (cookieHeader) {
	// 	ctx.cookie = {};
	// 	global.cookieList.forEach(cookie => {
	// 		const [key, value = ''] = cookie.split('=');
	// 		if (value) {
	// 			ctx.cookies.set(key, value.trim());
	// 		}
	// 	});
	// }
	await next();
};
