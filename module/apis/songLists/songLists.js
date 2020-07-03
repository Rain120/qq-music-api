const y_common = require('../y_common');

module.exports = ({ method = 'get', params = {}, option = {} }) => {
	const data = Object.assign(params, {
		format: 'json',
		outCharset: 'utf-8',
		picmid: 1,
	});
	const options = Object.assign(option, {
		params: data,
	});
	return y_common({
		url: '/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
		method,
		options,
	})
		.then(res => {
			const response = res.data;
			if (typeof response === 'string') {
				const reg = /^\w+\(({[^()]+})\)$/;
				const matches = response.match(reg);
				if (matches) {
					response = JSON.parse(matches[1]);
				}
			}
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
