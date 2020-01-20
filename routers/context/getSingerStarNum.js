const {
  getSingerStarNum,
} = require('../../module');

module.exports = async (ctx, next) => {
  const {
    singermid,
  } = ctx.query;
  const props = {
    method: 'get',
    params: {
      singermid,
    },
    option: {}
  };
  if (singermid) {
    const { status, body } = await getSingerStarNum(props);
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
