const {
  getTopLists,
} = require('../../module');
const {
  commonParams
} = require('../../module/config');

module.exports = async (ctx, next) => {
  const props = {
    method: 'get',
    params: commonParams,
    option: {}
  };
  const { status, body } = await getTopLists(props);
  Object.assign(ctx, {
    status,
    body,
  })
};
