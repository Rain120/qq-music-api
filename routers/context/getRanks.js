const {
  UCommon,
} = require('../../module');
const moment = require('moment');

module.exports = async (ctx, next) => {
  const topId = +ctx.query.limit || 4;
  const num = +ctx.query.limit || 20;
  const offset = +ctx.query.page || 0;
  const data = {
    detail: {
      module: "musicToplist.ToplistInfoServer",
      method: "GetDetail",
      param: {
        topId,
        offset,
        num,
        period: moment().format('YYYY-MM-DD')
      }
    },
    comm: {
      ct: 24,
      cv: 0
    }
  };
  const params = Object.assign({
    format: 'json',
    data: JSON.stringify(data),
  });
  const props = {
    method: 'get',
    params,
    option: {}
  };
  await UCommon(props).then((res) => {
    const response = res.data;
    ctx.status = 200;
    ctx.body = {
      response,
    }
  }).catch(error => {
    console.log(`error`, error);
  });
};
