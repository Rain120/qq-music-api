const {
  getSingerMv,
} = require('../../module');

module.exports = async (ctx, next) => {
  const {
    singermid,
    order,
    num = 5,
  } = ctx.query;
  const params = Object.assign({
    singermid,
    order,
    num,
  });
  if (order && order.toLowerCase() === 'time') {
    params = Object.assign(params, {
      cmd: 1,
    })
  }
  const props = {
    method: 'get',
    params,
    option: {}
  };
  if (singermid) {
    const { status, body } = await getSingerMv(props);
    Object.assign(ctx, {
      status,
      body,
    })
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'no singermid',
    }
  }
};
