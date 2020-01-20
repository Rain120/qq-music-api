const {
  getLyric,
} = require('../../module');

// songmid=003rJSwm3TechU
module.exports = async (ctx, next) => {
  const {
    songmid,
    isFormat,
  } = ctx.query;
  const props = {
    method: 'get',
    params: {
      songmid,
    },
    option: {},
    isFormat,
  };
  if (songmid) {
    const { status, body } = await getLyric(props);
    Object.assign(ctx, {
      status,
      body,
    })
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'no songmid',
    }
  }
};
