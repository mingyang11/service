'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 获取用户信息
  async getUser() {
    const { ctx, app } = this;
    const token = ctx.request.headers.authorization;
    try {
      const userData = await app.jwt.verify(token, app.config.jwt.secret);
      const userInfor = await ctx.service.user.getUserByPhone(userData);
      ctx.returnBody(200, '', userInfor, true);
    } catch (error) {
      ctx.returnBody(500, '获取用户信息出错', null, false);
    }
  }
  // 获取所有用户信息
  async getAllUser() {
    const { ctx } = this;
    const { query } = ctx.request;
    const response = await ctx.service.user.getAllUser(query);
    ctx.body = response;
  }

  // 登陆
  async login() {
    const { ctx, app } = this;
    const { body } = ctx.request;
    const { phone, password } = body;
    if (!password || !phone) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        message: '用户名和密码不能为空',
        data: null,
        success: false,
      };
      return;
    }
    const userinfo = await ctx.service.user.getUserByPhone(body);
    if (password !== userinfo.password || phone !== userinfo.phone) {
      ctx.status = 500;
      ctx.body = {
        code: 500,
        message: '账号密码错误',
        data: null,
        success: false,
      };
      return;
    }

    const token = app.jwt.sign({
      userid: userinfo.userid,
      phone: userinfo.phone,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token 有效期为 24 小时
    }, app.config.jwt.secret);
    ctx.set('authorization', token);
    ctx.body = {
      code: 200,
      msg: '登陆成功',
      data: {
        token,
      },
      success: true,
    };
  }

  // 注册
  async register() {
    const { ctx } = this;
    const { body } = ctx.request;
    const userinfo = await ctx.service.user.getUserByPhone(body);
    if (userinfo && userinfo.userid) {
      ctx.body = {
        code: 500,
        msg: '该手机号已注册',
        data: null,
        success: false,
      };
      return;
    }
    const response = await ctx.service.user.register(body);
    ctx.body = response;
  }

  // 更新用户信息
  async updateUser() {
    const { ctx } = this;
    const { body } = ctx.request;
    const response = await ctx.service.user.updateUser(body);
    ctx.body = response;
  }

  // 注销用户
  async deleteUser() {
    const { ctx } = this;
    const { body } = ctx.request;
    const response = await ctx.service.user.deleteUser(body);
    ctx.body = response;
  }

  // 测试token
  async test() {
    const { ctx, app } = this;
    console.log(ctx.user, '---');
    const token = ctx.request.header.authorization; // 请求头获取 authorization 属性，值为 token
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    ctx.body = {
      code: 200,
      data: {
        decode,
      },
      success: true,
    };
  }
}

module.exports = HomeController;
