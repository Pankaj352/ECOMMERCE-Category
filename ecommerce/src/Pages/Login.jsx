import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../API/index";
import "../styles/Signup.css";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${api}/user/login`, { email, password });
      console.log(res,">>>>>>>>>>>>>>>>>>>");
      console.log(res.data.object.token,">>>>>>>>>>>>>>>>>>>");
      console.log(res.data.object.user._id,">>>>>>>>>>>>>>>>>>>");

      // const { token, _id } = res.data;
      // localStorage.setItem("token", token);
      // localStorage.setItem("_id", _id);
      localStorage.setItem("token", res.data.object.token);
      localStorage.setItem("userId", res.data.object.user._id);

      toast.success("Login successful!");
      navigate("/category");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h2 className="form-title">Login</h2>
      <div className="form-input-box">
        <h3 className="form-subtitle">Welcome back to ECOMMERCE</h3>
        <p className="subtitle-desc">The next gen business marketplace</p>
      </div>

      <div className="form-input-box">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter"
        />
      </div>

      <div className="form-input-box">
        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter"
          required
        />
        <span
          className="password-show"
          onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>

      <div className="form-input-box">
        <button type="submit">LOGIN</button>
      </div>

      <div className="form-input-box">
        <p className="link-login">
          Already have an Account?{" "}
          <span
            style={{ color: "#000", cursor: "pointer" }}
            onClick={() => navigate("/")}>
            SIGNUP
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;