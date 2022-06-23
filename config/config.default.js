/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1655198081838_7486';


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // add your middleware config here
  config.middleware = [ 'jwtErr' ];
  config.jwt = {
    secret: 'yangmy',
  };
  config.authWhiteList = [ '/', '/login', '/register', '/userlist' ];

  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '118.31.103.55',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'yangming1992',
      // 数据库名
      database: 'chuze',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ], // 配置白名单
  };
  return {
    ...config,
    ...userConfig,
  };
};
