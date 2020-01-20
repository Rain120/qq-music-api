const {
  songLists,
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
  const {
    limit: ein = 19,
    page: sin = 0,
    sortId = 5,
    categoryIds = [10000000]
  } = ctx.request.body;

  const params = {
    sortId,
    sin,
    ein,
  }

  const props = {
    method: 'get',
    option: {},
    params,
  }
  
  const data = await Promise.all(
    categoryIds.map(
      async categoryId => await songLists({
        ...props,
        params: {
          ...params,
          categoryId,
        }
      }).then(res => {
        if (res.body.response && +res.body.response.code === 0) {
          return res.body.response.data;
        } else {
          return res.body.response;
        }
      })
    )
  );
  Object.assign(ctx, {
    body: {
      status: 200,
      data,
    },
  });
}
