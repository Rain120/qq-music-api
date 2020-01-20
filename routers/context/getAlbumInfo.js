const {
  getAlbumInfo,
} = require('../../module');

// albummid=0016l2F430zMux
module.exports = async (ctx, next) => {
  const { albummid } = ctx.query;
  const props = {
    method: 'get',
    params: {
      albummid,
    },
    option: {}
  };
  if (albummid) {
    const { status, body } = await getAlbumInfo(props);
    Object.assign(ctx, {
      status,
      body,
    })
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'no albummid',
    }
  }
};
