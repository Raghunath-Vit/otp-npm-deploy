'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('otp-plugin')
      .service('myService')
      .getWelcomeMessage();
  },
  otpinfo(ctx){
    ctx.body = strapi
      .plugin('otp-plugin')
      .service('otp')
      .find(ctx.query)
  }
});


