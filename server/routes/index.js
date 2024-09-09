module.exports = [
 
  {
    method: "POST",
    path: "/otp-logins/validate",
    handler: "otp.validateOtp",
    config: {
      policies: [],
      auth: false
    }
  },
  {
    method: "GET",
    path: "/otp-logins",
    handler: "otp.find",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/otp-logins/:id",
    handler: "otp.findOne",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/otp-logins",
    handler: "otp.create",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "PUT",
    path: "/otp-logins/:id",
    handler: "otp.update",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "DELETE",
    path: "/otp-logins/:id",
    handler: "otp.delete",
    config: {
      policies: [],
      auth: false,
    },
  },
  
  {
    method: "POST",
    path: "/otp-logins/generate",
    handler: "otp.generateOtp",
    config: {
      policies: [],
      auth: false
    },
  },
];