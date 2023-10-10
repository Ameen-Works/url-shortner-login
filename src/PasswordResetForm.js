// PasswordResetForm.js
import React, { useState } from "react";
import axios from "axios";
import "./PasswordResetForm.css";

const PasswordResetForm = () => {
  const [username, setUsername] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://password-reset-api-xxx6.onrender.com/reset-password",
        {
          username: username,
        }
      );

      // Assuming the reset link generation and email sending were successful
      setResetMessage("Reset link sent to your email!");
    } catch (error) {
      console.error("Password reset error:", error);
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      {resetMessage && <p className="success">{resetMessage}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter your email:</label>
        <input
          type="email"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordResetForm;
