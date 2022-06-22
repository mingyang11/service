'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);


  // 注册
  router.post('/register', controller.user.register);
  // 登陆
  router.post('/login', controller.user.login);
  // 注册
  router.post('/updateUserInfo', controller.user.updateUser);
  // 注销
  router.post('/deleteUser', controller.user.deleteUser);
  // 获取登陆用户信息，路由当参数
  router.get('/getUser', controller.user.getUser);
  // 获取所有用户信息
  router.get('/userlist', controller.user.getAllUser);
  // 测试token
  router.get('/api/user/test', controller.user.test);
};
