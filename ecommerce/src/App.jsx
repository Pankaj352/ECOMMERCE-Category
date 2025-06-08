import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { OtpProvider } from "./context/OtpContext";
import Signup from "./Pages/Signup";
import OtpVerify from "./Pages/OtpVerify";
import Login from "./Pages/Login";
import Category from "./Pages/Category";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally, verify token with backend
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <OtpProvider>
      <Header />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/otpVerify" element={<OtpVerify />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/category"
          element={
            isAuthenticated ? (
              <Category userId={localStorage.getItem("userId")} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </OtpProvider>
  );
};

export default App;
