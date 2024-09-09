'use strict';

module.exports = {
  async generateOtp(ctx) {
    try {
      const { phoneNumber } = ctx.request.body;

      if (!phoneNumber) {
        return ctx.badRequest('Phone number is required');
      }

      if (phoneNumber.length < 10 || phoneNumber.length > 13) {
        return ctx.badRequest('Phone number must be between 10 and 13 characters');
      }

      const otp = await strapi.plugin('otp-plugin').service('otp').generateAndCreateOtp(ctx);
      ctx.body = otp;
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async validateOtp(ctx) {
    try {
      const { phoneNumber, otpCode } = ctx.request.body;
      if (!phoneNumber || !otpCode) {
        return ctx.badRequest('Phone number and OTP code are required');
      }

      if (phoneNumber.length < 10 || phoneNumber.length > 13) {
        return ctx.badRequest('Phone number must be between 10 and 13 characters');
      }

      const isValid = await strapi.plugin('otp-plugin').service('otp').validateOtp(ctx);
      ctx.body = { isValid };
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async find(ctx) {
    try {
      const { query } = ctx;
      const otpLogins = await strapi.plugin("otp-plugin").service("otp").find(query);
      ctx.body = otpLogins;
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const otpLogin = await strapi.plugin("otp-plugin").service("otp").findOne(id);
      if (!otpLogin) {
        return ctx.notFound('OTP login not found');
      }
      ctx.body = otpLogin;
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async create(ctx) {
    try {
      const { body } = ctx.request;
      const newOtpLogin = await strapi.plugin("otp-plugin").service("otp").create(body);
      ctx.body = newOtpLogin;
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async update(ctx) {
    try {
      const { id } = ctx.params;
      const { body } = ctx.request;
      const updatedOtpLogin = await strapi.plugin("otp-plugin").service("otp").update(id, body);
      if (!updatedOtpLogin) {
        return ctx.notFound('OTP login not found');
      }
      ctx.body = updatedOtpLogin;
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async delete(ctx) {
    try {
      const { id } = ctx.params;
      const deletedOtpLogin = await strapi.plugin("otp-plugin").service("otp").delete(id);
      if (!deletedOtpLogin) {
        return ctx.notFound('OTP login not found');
      }
      ctx.body = deletedOtpLogin;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};