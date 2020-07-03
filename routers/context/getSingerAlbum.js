const { UCommon } = require('../../module');

// singermid=0025NhlN2yWrP4
module.exports = async (ctx, next) => {
	const singermid = ctx.query.singermid;
	const num = +ctx.query.limit || 5;
	const begin = +ctx.query.page || 0;
	const data = {
		comm: {
			ct: 24,
			cv: 0,
		},
		singer: {
			method: 'GetAlbumList',
			param: {
				sort: 5,
				singermid,
				begin,
				num,
			},
			module: 'music.musichallAlbum.AlbumListServer',
		},
	};
	const params = Object.assign({
		format: 'json',
		singermid,
		data: JSON.stringify(data),
	});
	const props = {
		method: 'get',
		params,
		option: {},
	};
	if (singermid) {
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
	} else {
		ctx.status = 400;
		ctx.body = {
			response: 'no singermid',
		};
	}
};
