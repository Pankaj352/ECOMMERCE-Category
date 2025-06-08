import React, { useState, useEffect } from "react";
import OtpInput from "../components/OtpInput";
import { useNavigate } from "react-router-dom";
import { useContextAPI } from "../context/OtpContext";
import { toast } from "react-toastify";
import "../styles/OtpVerify.css";
import axios from "axios";
import api from "../API/index.js";

const OtpVerify = () => {
  const { userEmail } = useContextAPI();
  const [enteredOtp, setEnteredOtp] = useState("");
  const navigate = useNavigate();

  const storedUserId = localStorage.getItem("_id");
  const emailToShow = userEmail || localStorage.getItem("email");

  useEffect(() => {
    const fetchOtp = async () => {
      console.log(storedUserId,"stored id");
      
      try {
        if (!storedUserId) return;

        const response = await axios.get(`${api}/user/${storedUserId}`);
        // console.log(response,"resssssssssssss");
        
        const savedOtp = response.data.otp;

        if (savedOtp) {
          toast.info(`Your OTP is: ${savedOtp}`, { autoClose: 7000 });
        }
      } catch (error) {
        console.error("Error fetching OTP:", error);
        toast.error("Could not fetch OTP from server.");
      }
    };

    fetchOtp();
  }, [storedUserId]);

  const handleOtpSubmit = async () => {
    try {
      if (!storedUserId) {
        toast.error("User ID missing. Please signup again.");
        return;
      }

      if (!enteredOtp.trim()) {
        toast.error("Please enter the OTP.");
        return;
      }

      const response = await axios.post(`${api}/user/verify-otp`, {
        userId: storedUserId,
        otp: enteredOtp.trim(),
      });

      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error(
        "OTP verification error:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Invalid or incorrect OTP.");
    }
  };

  return (
    <form className="otp-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-title">
        <h2>Verify your email</h2>
        <p>
          Enter the 8-digit code you have received on <br />
          <strong>{emailToShow}</strong>
        </p>
      </div>
      <div className="otp-container">
        <p>Code</p>
        <OtpInput
          length={8}
          onChange={(otp) => {
            setEnteredOtp(otp);
          }}
        />
        <div className="button-box">
          <button type="button" onClick={handleOtpSubmit}>
            VERIFY
          </button>
        </div>
      </div>
    </form>
  );
};

export default OtpVerify;
