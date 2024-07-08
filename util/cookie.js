module.exports = () => async (ctx, next) => {
  if (global.userInfo.cookie) {
    ctx.request.cookie = global.userInfo.cookie;
  }

  const cookieHeader = ctx.request.headers;

  if (cookieHeader) {
    global.userInfo.cookieList.forEach(cookie => {
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
