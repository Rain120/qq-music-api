const Router = require('koa-router');
const router = new Router();
const mapRouter = require('./map-router');

Object.keys(mapRouter).forEach(key => {
  if (key && mapRouter[key]) {
    const { method = 'get', cb } = mapRouter[key];
    router[method](key, cb);
  }
});

module.exports = router;
