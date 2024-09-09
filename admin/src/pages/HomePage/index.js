// @ts-nocheck
import React, { useState } from "react";
import {
  Button,
  TextInput,
  Typography,
  Alert,
  Stack,
} from "@strapi/design-system";
import axios from 'axios';


const HomePage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleGenerateOtp = async () => {
    try {
      setError("");
      setSuccess("");
      const response = await axios.post(
        "http://localhost:1337/otp-plugin/otp-logins/generate",
        { phoneNumber }
      );
      setGeneratedOtp(response.data.otpCode);
      console.log("Generated OTP:", response.data.otpCode);
      setSuccess("OTP generated successfully!");
    } catch (err) {
      setError("Failed to generate OTP. Please try again.");
    }
  };

  const handleValidateOtp = async () => {
    try {
      setError("");
      setSuccess("");
      const response = await axios.post(
        "http://localhost:1337/otp-plugin/otp-logins/validate",
        { phoneNumber, otpCode }
      );
      if (response.data.isValid) {
        setSuccess("OTP validated successfully!");
      } else {
        setError("Invalid OTP or OTP expired.");
      }
    } catch (err) {
      setError("Failed to validate OTP. Please try again.");
    }
  };
  return (
    <Stack spacing={4} padding={4}>
      <Typography variant="alpha">OTP Login</Typography>
      <Stack spacing={3}>
        <TextInput
          label="Phone Number"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ width: "300px" }}
        />
        <Button
          onClick={handleGenerateOtp}
          style={{
            width: "100px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Get OTP
        </Button>
      </Stack>
      <Stack spacing={3}>
        <TextInput
          label="OTP Code"
          placeholder="Enter OTP"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          style={{ width: "300px" }}
        />
        <Button
          onClick={handleValidateOtp}
          style={{
            width: "120px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Validate OTP
        </Button>
      </Stack>
      {error && <Alert kind="danger">{error}</Alert>}
      {success && <Alert kind="success">{success}</Alert>}
    </Stack>
  );
};

export default HomePage;
