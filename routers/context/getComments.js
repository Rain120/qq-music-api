const {
  getComments,
} = require('../../module');

TODO:
// comments: params error
// id: 专辑或者歌单请求结果的id
// rootcommentid: 上一次请求结果的最后一项, comment.commentlist[commentlist.length - 1].rootcommentid
// id=8220
// rootcommentid=album_8220_1003310416_1558068713
// cid=205360772
module.exports = async (ctx, next) => {
  const {
    id,
    pagesize = 25,
    pagenum = 0,
    cid = 205360772,
    cmd = 8,
    reqtype = 2,
    biztype = 2,
    rootcommentid = !pagenum && '',
  } = ctx.query;
  const checkrootcommentid = !pagenum ? true : !!rootcommentid;

  const params = Object.assign({
    cid,
    reqtype,
    biztype,
    topid: id,
    cmd,
    pagenum,
    pagesize,
    lasthotcommentid: rootcommentid,
  });
  const props = {
    method: 'get',
    params,
    option: {}
  };
  if (id && checkrootcommentid) {
    const { status, body } = await getComments(props);
    Object.assign(ctx, {
      status,
      body,
    })
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'Don\'t have id or rootcommentid',
    }
  }
};
