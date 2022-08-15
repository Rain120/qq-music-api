module.exports = () => async (ctx, next) => {
  if (global.cookie) {
    ctx.request.cookie = global.cookie;
  }

  const cookieHeader = ctx.request.headers;

  if (cookieHeader) {
    global.cookieList.forEach(cookie => {
      const [key, value = ''] = cookie.split('=');

      if (value) {
        ctx.cookies.set(key, value.trim(), {
        //   maxAge: 24 * 60 * 60 * 1000,
          overwirte: true,
        });
      }
    });
  }

  await next();
};
