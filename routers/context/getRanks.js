const { UCommon } = require('../../module');
const moment = require('moment');

module.exports = async (ctx, next) => {
	// Desc: https://github.com/Rain120/qq-music-api/issues/14
	// 1. topId is useless
	// 2. qq api period is change not YYYY-MM-DD
	const topId = +ctx.query.topId || 4;
	const num = +ctx.query.limit || 20;
	const offset = +ctx.query.page || 0;
	const date = ctx.query.period || moment();
	const week = moment(date).isoWeek();
	const year = moment(date).year();
	const period = `${year}_${week}`;
	const data = {
		detail: {
			module: 'musicToplist.ToplistInfoServer',
			method: 'GetDetail',
			param: {
				topId,
				offset,
				num,
				period,
			},
		},
		comm: {
			ct: 24,
			cv: 0,
		},
	};
	const params = Object.assign({
		format: 'json',
		data: JSON.stringify(data),
	});
	const props = {
		method: 'get',
		params,
		option: {},
	};
	await UCommon(props)
		.then(res => {
			const response = res.data;
			ctx.status = 200;
			ctx.body = {
				response,
			};
		})
		.catch(error => {
			console.log('error', error);
		});
};
