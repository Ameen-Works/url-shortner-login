import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import Loading from "./Loading";

const LoginForm = () => {
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://password-reset-api-xxx6.onrender.com/login",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      // Assuming the JWT token is received in the response
      const token = response.data.token;

      // Store the token in localStorage
      localStorage.setItem("token", token);
      setLoading(false);
      navigateTo("/success");
      // Redirect or perform any other actions upon successful login
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Login failed. Please check your credentials.");
    }
  };
  const handleResetPassword = () => {
    navigateTo("/password-reset-link");
  };
  return (
    <div className="container">
      <h2>Login</h2>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username (Email)</label>
            <input
              type="email"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
      {loginError && <p className="error">{loginError}</p>}
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default LoginForm;
