'use strict';

module.exports = {
  returnBody(status, message, data = {}, success) {
    this.status = status;
    this.body = {
      code: status,
      data,
      message,
      success,
    };
  },
};
