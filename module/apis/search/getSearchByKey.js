const y_common = require('../y_common');

module.exports = ({ method = 'get', params = {}, option = {} }) => {
	const data = Object.assign(params, {
		format: 'json',
		outCharset: 'utf-8',
		ct: 24,
		qqmusic_ver: 1298,
		new_json: 1,
		remoteplace: 'txt.yqq.song',
		// searchid: 58932895599763136,
		t: 0,
		aggr: 1,
		cr: 1,
		lossless: 0,
		flag_qc: 0,
		platform: 'yqq.json',
	});
	const options = Object.assign(option, {
		params: data,
	});
	return y_common({
		url: '/soso/fcgi-bin/client_search_cp',
		method,
		options,
	})
		.then(res => {
			const response = res.data;
			return {
				status: 200,
				body: {
					response,
				},
			};
		})
		.catch(error => {
			console.log('error', error);
			return {
				body: {
					error,
				},
			};
		});
};
