// const https = require('https');
// const SibApiV3Sdk = require('sib-api-v3-sdk');
// const { brevo: brevoConfig } = require('./server/config/index');

// // Create an HTTPS agent with certificate verification disabled
// const agent = new https.Agent({ rejectUnauthorized: false });

// // Configure Brevo (Sendinblue) API client
// const brevoClient = SibApiV3Sdk.ApiClient.instance;
// const apiKey = brevoClient.authentications['api-key'];
// apiKey.apiKey = brevoConfig.apiKey;
// brevoClient.httpAgent = agent;

// // Create an instance of the TransactionalEmailsApi
// const transactionalEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// function sendTransactionalEmail(emailData) {
//   return new Promise((resolve, reject) => {
//     transactionalEmailApi.sendTransacEmail(emailData).then(
//       (response) => {
//         resolve(response);
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });
// }

// module.exports = { sendTransactionalEmail };





const https = require('https');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const { brevo: brevoConfig } = require('./server/config/index');

// Create an HTTPS agent with certificate verification disabled
const agent = new https.Agent({ rejectUnauthorized: false });

// Configure Brevo (Sendinblue) API client
const brevoClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = brevoClient.authentications['api-key'];
apiKey.apiKey = brevoConfig.apiKey;
brevoClient.httpAgent = agent;

// Create an instance of the TransactionalEmailsApi
const transactionalEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

function sendTransactionalEmail(emailData) {
  return new Promise((resolve, reject) => {
    transactionalEmailApi.sendTransacEmail(emailData).then(
      (response) => {
        resolve(response);
      },
      (error) => {
        // Log the detailed error information
        console.error('Error sending OTP email:', error.response ? error.response.data : error.message);
        reject(error);
      }
    );
  });
}

module.exports = { sendTransactionalEmail };
