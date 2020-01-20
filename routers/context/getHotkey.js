const {
  getHotKey,
} = require('../../module');

module.exports = async (ctx, next) => {
  const props = {
    method: 'get',
    params: {},
    option: {}
  };
  const { status, body } = await getHotKey(props);
  Object.assign(ctx, {
    status,
    body,
  });
}
