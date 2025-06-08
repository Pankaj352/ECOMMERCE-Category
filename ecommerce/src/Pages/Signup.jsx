import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/index";
import axios from "axios";
import { useContextAPI } from "../context/OtpContext";
import "../styles/Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserId, setUserEmail } = useContextAPI();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/user/register`, {
        name,
        email,
        password,
      });

      const { _id, email: registeredEmail } = res.data.data;

      console.log("Register success: ", res.data.data._id);

      // Save OTP and userId in localStorage or Context
      localStorage.setItem("_id", _id);

      localStorage.setItem("email", registeredEmail);

      const userId = res.data.data._id;
      localStorage.setItem("_id", userId);

      setUserId && setUserId(userId);
      setUserEmail(registeredEmail);

      navigate("/otpVerify");
    } catch (error) {
      console.error("Register error: ",error.message);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h2 className="form-title">Create your account</h2>

      <div className="form-input-box">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          required
          placeholder="Enter"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-input-box">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          required
          placeholder="Enter"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-input-box">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          required
          placeholder="Enter"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-input-box">
        <button type="submit">CREATE ACCOUNT</button>
      </div>

      <div className="form-input-box">
        <p className="link-login">
          Have an Account?{" "}
          <span
            style={{ color: "#000", cursor: "pointer" }}
            onClick={() => navigate("/login")}>
            LOGIN
          </span>
        </p>
      </div>
    </form>
  );
};

export default Signup;
