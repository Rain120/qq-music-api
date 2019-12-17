const {
  getSmartbox,
} = require('../../module');

module.exports = async (ctx, next) => {
  const { key } = ctx.query;
  const props = {
    method: 'get',
    params: {
      key,
    },
    options: {}
  };
  if (key) {
    const { status, body } = await getSmartbox(props);
    Object.assign(ctx, {
      status,
      body,
    });
  } else {
    ctx.status = 200;
    ctx.body = {
      response: null,
    }
  }
}
