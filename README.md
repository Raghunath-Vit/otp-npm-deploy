# Strapi plugin otp-plugin

A quick description of otp-plugin.
Strapi Plugin: OTP Plugin
A Strapi plugin that provides functionality for generating and validating OTPs (One-Time Passwords) for phone number verification. This plugin can be easily integrated into your Strapi project to add OTP-based authentication using Twilio.

Features
Generate OTP and send it to a phone number using Twilio.
Validate OTP with expiration time and usage status.
Customizable OTP expiration duration.
Log and manage OTP requests through the Strapi admin panel.
Installation
To install the plugin in your Strapi project, follow these steps:

1. Install via NPM
Run the following command to install the plugin:

bash
Copy code
npm install otp-plugin
2. Enable the Plugin
In your config/plugins.js file, enable the otp-plugin:

js
Copy code
module.exports = {
  'otp-plugin': {
    enabled: true,
    resolve: './node_modules/otp-plugin',
  },
};
3. Configure Environment Variables
This plugin uses Twilio to send OTPs via SMS. You need to configure the following environment variables in your .env file:

env
Copy code
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
4. Configure HTTPS Agent (Optional)
If your environment requires custom HTTPS settings (e.g., for self-signed certificates), you can configure the HTTPS agent in server/config/index.js:

js
Copy code
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false,
});

module.exports = {
  http: {
    agent,
  },
};
Usage
API Endpoints
This plugin provides several API endpoints to generate, validate, and manage OTP logins. Below are the key endpoints:

Generate OTP

Method: POST

Path: /otp-logins/generate

Body Parameters:

phoneNumber (string): The phone number to which the OTP should be sent.
Example:

bash
Copy code
curl -X POST http://localhost:1337/otp-logins/generate -H "Content-Type: application/json" -d '{"phoneNumber": "1234567890"}'
Validate OTP

Method: POST

Path: /otp-logins/validate

Body Parameters:

phoneNumber (string): The phone number associated with the OTP.
otpCode (string): The OTP code to be validated.
Example:

bash
Copy code
curl -X POST http://localhost:1337/otp-logins/validate -H "Content-Type: application/json" -d '{"phoneNumber": "1234567890", "otpCode": "123456"}'
Find OTP Logins

Method: GET
Path: /otp-logins
Description: Retrieve a list of all OTP login records.
Find One OTP Login

Method: GET
Path: /otp-logins/:id
Description: Retrieve a specific OTP login record by ID.
Create OTP Login

Method: POST
Path: /otp-logins
Description: Manually create a new OTP login record.
Update OTP Login

Method: PUT
Path: /otp-logins/:id
Description: Update an existing OTP login record by ID.
Delete OTP Login

Method: DELETE
Path: /otp-logins/:id
Description: Delete an OTP login record by ID.
Strapi Admin Panel
The OTP plugin creates a content type called OtpLogin in your Strapi admin panel. You can view and manage OTP login records, including phone numbers, OTP codes, expiration times, and usage status.

Services
The plugin also exposes services that can be called from other parts of your Strapi application:

generateAndCreateOtp(phoneNumber): Generates and sends an OTP to the given phone number and logs the request in the database.
validateOtp(phoneNumber, otpCode): Validates the OTP for the given phone number.
Example usage in custom controllers or services:

js
Copy code
const otpService = strapi.plugin('otp-plugin').service('otp');

// Generate OTP
await otpService.generateAndCreateOtp('1234567890');

// Validate OTP
const isValid = await otpService.validateOtp('1234567890', '123456');
Contributing
Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request.

License
This plugin is licensed under the MIT License.

This README should help users understand how to install, configure, and use your OTP plugin within their Strapi projects. You can update the content as needed based on additional features or improvements.