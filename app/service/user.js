'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async login(param) {
    const { app } = this;
    try {
      const result = await app.mysql.get('users', param);
      return result;
    } catch (error) {
      return {
        code: 500,
        msg: '请求出错',
        data: null,
        success: false,
      };
    }
  }
  // 注册新增用户
  async register(param) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('users', param);
      return {
        code: 200,
        msg: '成功',
        data: result,
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        msg: '请求出错',
        data: null,
        success: false,
      };
    }
  }

  // 获取所有用户信息
  async updateUser(param) {
    const { app } = this;
    const { userid, ...rest } = param;
    try {
      await app.mysql.update('users', rest, {
        where: {
          userid,
        },
      });
      return {
        code: 200,
        msg: '成功',
        data: {},
        success: true,
      };
    } catch (error) {
      console.log(error, 'updateUser');
      return {
        code: 500,
        msg: '出错',
        data: null,
        success: false,
      };
    }
  }

  // 注销用户
  async deleteUser(param) {
    const { app } = this;
    const { userid } = param;
    try {
      await app.mysql.delete('users', { userid });
      return {
        code: 200,
        msg: '成功',
        data: {},
        success: true,
      };
    } catch (error) {
      console.log(error, 'updateUser');
      return {
        code: 500,
        msg: '出错',
        data: null,
        success: false,
      };
    }
  }

  // 获取所有用户信息
  async getAllUser() {
    const { app } = this;
    // const sqlStr = 'select * from users';
    try {
      // const result = await app.mysql.query(sqlStr);
      const result = await app.mysql.select('users');
      console.log(result, '1111');
      return {
        code: 200,
        msg: '成功',
        data: result,
        success: true,
      };
    } catch (error) {
      return {
        code: 500,
        msg: '出错',
        data: null,
        success: false,
      };
    }
  }
  // 获取单个用户信息
  async getUserByPhone(param) {
    const { app } = this;
    try {
      const result = await app.mysql.get('users', { phone: param.phone });
      return result;
    } catch (error) {
      return null;
    }
  }
}

module.exports = UserService;
