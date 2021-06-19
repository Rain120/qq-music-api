/*
 * @Author: Rainy [https://github.com/rain120]
 * @Date: 2021-01-23 15:41:41
 * @LastEditors: Rainy
 * @LastEditTime: 2021-06-19 22:22:31
 */
module.exports = {
	get: async (ctx, next) => {
		ctx.status = 200;
		ctx.body = {
			data: {
				code: 200,
				cookie: global.cookie,
				cookieList: global.cookieList,
				cookieObject: global.cookieObject,
			},
		};

		await next();
	},
	set: async (ctx, next) => {
		ctx.request.cookies = global.cookie;
		ctx.request.header['Access-Control-Allow-Origin'] = 'https://y.qq.com';
		ctx.request.header['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE';
		ctx.request.header['Access-Control-Allow-Headers'] = 'Content-Type';
		ctx.request.header['Access-Control-Allow-Credentials'] = true;
		ctx.body = {
			data: {
				code: 200,
				message: '操作成功',
			}
		};

		await next();
	},
}
