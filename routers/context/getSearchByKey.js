const {
  getSearchByKey,
} = require('../../module');


// w：搜索关键字
// p：当前页
// n：每页歌曲数量
// catZhida: 0表示歌曲, 2表示歌手, 3表示专辑, 4, 5
module.exports =  async (ctx, next) => {
  const { key: w, limit: n, page: p, catZhida } = ctx.query;
  const props = {
    method: 'get',
    params: {
      w,
      n: +n || 10,
      p: +p || 1,
      catZhida: +catZhida || 1,
    },
    option: {}
  };
  if (w) {
    const { status, body } = await getSearchByKey(props);
    Object.assign(ctx, {
      status,
      body,
    });
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'search key is null',
    }
  }
}
