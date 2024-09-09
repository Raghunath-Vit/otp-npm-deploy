const https = require('https');
const { twilio: twilioConfig } = require('./server/config/index'); 

const agent = new https.Agent({ rejectUnauthorized: false });

function createTwilioMessage(options) {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: 'POST',
      hostname: 'api.twilio.com',
      path: `/2010-04-01/Accounts/${twilioConfig.accountSid}/Messages.json`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${twilioConfig.accountSid}:${twilioConfig.authToken}`).toString('base64')}`
      },
      agent
    };

    const req = https.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(`From=${encodeURIComponent(options.from)}&To=${encodeURIComponent(options.to)}&Body=${encodeURIComponent(options.body)}`);
    req.end();
  });
}

module.exports = { createTwilioMessage };
