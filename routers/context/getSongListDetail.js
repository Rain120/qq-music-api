const {
  songListDetail,
} = require('../../module');

/**
 * @description: 2, 3
 * @param {page} 页数
 * @param {limit} 每页条数[20, 60]
 * @param {categoryId} 分类
 * @param {sortId} 分类
 * @return: 
 */
module.exports = async (ctx, next) => {
  const { disstid } = ctx.query;
  const props = {
    method: 'get',
    params: {
      disstid,
    },
    option: {}
  };
  const { status, body } = await songListDetail(props);
  Object.assign(ctx, {
    status,
    body,
  })
};
