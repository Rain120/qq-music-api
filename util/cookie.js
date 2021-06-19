/*
 * @Author: Rainy [https://github.com/rain120]
 * @Date: 2021-01-23 16:19:21
 * @LastEditors: Rainy
 * @LastEditTime: 2021-06-19 22:20:01
 */

module.exports = () => async (ctx, next) => {
	if (global.cookie) {
		ctx.request.cookie = global.cookie;
	}

	const cookieHeader = ctx.request.headers;

	if (cookieHeader) {
		global.cookieList.forEach(cookie => {
			const [key, value = ''] = cookie.split('=');

			if (value) {
				ctx.cookies.set(key, value.trim(), {
					maxAge: 24 * 60 * 60 * 1000,
					// overwirte: true,
				});
			}
		});
	}

	await next();
};
