const {
  getMvByTag,
} = require('../../module');

// songmid=001CLC7W2Gpz4J
module.exports = async (ctx, next) => {
  const props = {
    method: 'get',
    params: {},
    option: {}
  };
  const { status, body } = await getMvByTag(props);
  Object.assign(ctx, {
    status,
    body,
  });
};
