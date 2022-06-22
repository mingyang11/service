'use strict';

module.exports = () => {
  return async function jwtErr(ctx, next) {
    const authWhiteList = ctx.app.config.authWhiteList;
    const token = ctx.request.header.authorization; // 若是没有 token，返回的是 null 字符串
    if (authWhiteList.includes(ctx.url)) {
      await next();
      return;
    }
    if (token !== 'null' && token) {
      try {
        ctx.app.jwt.verify(token, ctx.app.config.jwt.secret); // 验证token
        await next();
      } catch (error) {
        ctx.status = 200;
        ctx.body = {
          msg: 'token已过期，请重新登录',
          code: 401,
        };
        return;
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        msg: 'token不存在',
      };
      return;
    }
  };
};
