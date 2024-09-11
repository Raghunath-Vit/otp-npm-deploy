const https = require('https');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const agent = new https.Agent({
  rejectUnauthorized: false,
});

module.exports = {
  http: {
    agent,
  },
  
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },
  brevo: {
    apiKey: process.env.BREVO_API_KEY,
  },
};



