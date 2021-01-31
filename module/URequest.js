const U = require('./u-axios');

module.exports = ({
  method = 'get',
  params = {},
  option = {},
  thenable,
  catcher = err => null,
}) => {
  const options = Object.assign(option, { params });

  return U({ method, options }).then(thenable).catch(catcher);
};
