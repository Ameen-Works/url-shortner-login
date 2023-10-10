// PasswordResetForm.js
import React, { useState } from "react";
import axios from "axios";
import "./PasswordResetForm.css";
import { useNavigate } from "react-router-dom";

const LinkRoute = () => {
  const [username, setUsername] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigateTo(`/password-reset/${username}`);
  };

  return (
    <div>
      <h2>Verify Token</h2>
      {resetMessage && <p className="success">{resetMessage}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter your token:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default LinkRoute;
