const { getQQLoginQr } = require('../../module');

module.exports = async (ctx, next) => {
	const props = {
		method: 'get',
	};
	const { status, body } = await getQQLoginQr(props);
	Object.assign(ctx, {
		status,
		body,
	});
};
