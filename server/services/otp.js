'use strict';

const crypto = require('crypto');
const { createTwilioMessage } = require('../../twilioClient.js');
const twilio = require('twilio');
const https = require('https');
const { twilio: twilioConfig } = require('../config/index.js');
const { ValidationError } = require('@strapi/utils').errors;

const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);
const agent = new https.Agent({ rejectUnauthorized: false });

module.exports = {
  async generateAndCreateOtp(ctx) {
    console.log('Request body:', ctx.request.body);
    const { phoneNumber } = ctx.request.body;

    try {
      await strapi.db.query('plugin::otp-plugin.otplogin').updateMany({
        where: {
          phoneNumber,
          isUsed: false,
          expiresAt: { $gte: new Date() },
        },
        data: { isUsed: true },
      });

      const otpCode = crypto.randomInt(100000, 999999).toString();
      console.log(`Generated OTP: ${otpCode}`);
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 5);

      const otpRecord = await strapi.db.query('plugin::otp-plugin.otplogin').create({
        data: {
          phoneNumber,
          otpCode,
          isUsed: false,
          expiresAt,
        },
      });

      const message = await createTwilioMessage({
        body: `Your OTP is ${otpCode}. It is valid for 5 minutes.`,
        from: twilioConfig.phoneNumber,
        to: phoneNumber,  
      });

      console.log(`Message SID: ${message.sid}`);
      return otpRecord;
    } catch (error) {
      console.error('Error generating or sending OTP:', error);
    }
  },

  async validateOtp(ctx) {
    const { phoneNumber, otpCode } = ctx.request.body;
  
    try {
      const otpRecord = await strapi.db.query('plugin::otp-plugin.otplogin').findOne({
        where: {
          phoneNumber,
          otpCode,
          isUsed: false,
          expiresAt: { $gte: new Date() },
        },
      });
  
      if (!otpRecord) {
        ctx.badRequest('Invalid OTP or OTP expired');
        return;
      }
  
      await strapi.db.query('plugin::otp-plugin.otplogin').update({
        where: { id: otpRecord.id },
        data: { isUsed: true },
      });
  
      const username = phoneNumber;
      const email = `${phoneNumber.slice(1)}@gmail.com`;
  
      let existingUser = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { $or: [{ username }, { email }] },
      });
  
      if (!existingUser) {
        existingUser = await strapi.db.query('plugin::users-permissions.user').create({
          data: {
            username,
            email,
            password: phoneNumber,
            role: 2,
          },
        });
      }
  
      // Generate JWT token
      const jwtToken = await strapi.plugins['users-permissions'].services.jwt.issue({
        id: existingUser.id,
      });
  
      // Log the generated token for confirmation
      console.log('Generated JWT token:', jwtToken);
  
      // Send the token in the response
      ctx.body = {
        isValid: true,
        message: 'OTP validated successfully, user created or exists',
        jwt: jwtToken,
        user: {
          id: existingUser.id,
          username: existingUser.username,
          email: existingUser.email,
        },
      };

      console.log(ctx.body);
      return ctx.body;
    } catch (error) {
      console.error('Error validating OTP:', error);
      ctx.badRequest('Failed to validate OTP', { error });
      ctx.body = { isValid: false, message: 'Failed to validate OTP' };
    }
  },
  

  // Other functions remain unchanged
};
