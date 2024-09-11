# OTP Plugin for Strapi
A Strapi plugin that provides functionality for generating and validating OTPs (One-Time Passwords) for phone number verification. This plugin uses Twilio to send OTPs via SMS, making it easy to add OTP-based authentication to your Strapi application.

## Features
- Generate OTP and send it to a phone number using Twilio.
- Validate OTP with expiration time and usage status.
- Customizable OTP expiration duration.
- Log and manage OTP requests through the Strapi admin panel.
## Prerequisites
Before using this plugin, you must have a Twilio account. You'll need the following credentials from Twilio:

- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_PHONE_NUMBER
Make sure to store these in your .env file for use.

## Installation
Step 1: Install via NPM
To install the plugin, run the following command in your project:

``` 
npm install otp-plugin 
```

Step 2: Enable the Plugin
In your config/plugins.js file, enable the otp-plugin:

``` 
module.exports = {
  'otp-plugin': {
    enabled: true,
    resolve: './node_modules/otp-plugin',
  },
}; 

```

Step 3: Configure Environment Variables
You need to configure the following environment variables in your .env file to enable Twilio for sending OTPs via SMS:
```
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

Step 4: Configure HTTPS Agent (Optional)
If your environment requires custom HTTPS settings (e.g., for self-signed certificates), configure the HTTPS agent in server/config/index.js:

```
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false,
});

module.exports = {
  http: {
    agent,
  },
};
```

## Usage
This plugin provides several API endpoints to generate, validate, and manage OTP logins. Below are the key endpoints:

### Generate OTP
Generates an OTP and sends it to the specified phone number.

- Method: POST
- Path: /otp-logins/generate
- Body Parameters: 
- - phoneNumber (string): The phone number to which the OTP should be sent.

Example:
```
curl -X POST http://localhost:1337/otp-logins/generate \
-H "Content-Type: application/json" \
-d '{"phoneNumber": "1234567890"}'
```

### Validate OTP
Validates the OTP for the given phone number.

- Method: POST
- Path: /otp-logins/validate
- Body Parameters:
- - phoneNumber (string): The phone number associated with the OTP.
- - otpCode (string): The OTP code to be validated.

Example:
```
curl -X POST http://localhost:1337/otp-logins/validate \
-H "Content-Type: application/json" \
-d '{"phoneNumber": "1234567890", "otpCode": "123456"}'
```

## More Endpoints
### Find OTP Logins
#### Retrieve a list of all OTP login records.

- Method: GET
- Path: /otp-logins

### Find One OTP Login
#### Retrieve a specific OTP login record by ID.

- Method: GET
- Path: /otp-logins/:id

### Create OTP Login
#### Manually create a new OTP login record.

-  Method: POST
- Path: /otp-logins

### Update OTP Login
#### Update an existing OTP login record by ID.

- Method: PUT
- Path: /otp-logins/:id

### Delete OTP Login
#### Delete an OTP login record by ID.

- Method: DELETE
- Path: /otp-logins/:id

## Strapi Admin Panel
The OTP plugin creates a content type called OtpLogin in your Strapi admin panel. You can view and manage OTP login records, including phone numbers, OTP codes, expiration times, and usage status.

## Services
The plugin exposes services that can be called from other parts of your Strapi application:

### Generate and Create OTP
Generates and sends an OTP to the given phone number and logs the request in the database.

```
const otpService = strapi.plugin('otp-plugin').service('otp');
await otpService.generateAndCreateOtp('1234567890');
```

### Validate OTP
Validates the OTP for the given phone number.

```
const isValid = await otpService.validateOtp('1234567890', '123456');
```

## License
This plugin is licensed under the MIT License.