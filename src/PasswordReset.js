import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./PasswordReset.css";

function PasswordReset() {
  const { token } = useParams(); // Get the token from the route
  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [resetMessage, setResetMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.get(
        `https://password-reset-api-xxx6.onrender.com/validate-reset-link?token=${token}`
      );
      if (response.status === 200) {
        const newResponse = await axios.post(
          "https://password-reset-api-xxx6.onrender.com/update-password",
          {
            username: username,
            password: newPassword,
          }
        );
        setResetMessage("Password reset successful!");
      }
      // Assuming the password reset was successful

      // Redirect the user to the login page or any other appropriate location
      history("/login");
    } catch (error) {
      console.error("Password reset error:", error);
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Password Reset</h2>
      {resetMessage && <p className="success">{resetMessage}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default PasswordReset;
