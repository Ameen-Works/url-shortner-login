// SignupForm.js

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

const SignupForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least 8 characters, one uppercase letter, one digit, and one special character"
        )
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        // Make a POST request to your backend API to add the user
        const response = await axios.post(
          "https://password-reset-api-xxx6.onrender.com/addUser",
          values
        );

        // Handle success (you can redirect or show a success message)
        console.log("User added successfully", response.data.token);
        navigate("/login");
      } catch (error) {
        // Handle error (display an error message)
        console.error("Error adding user", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="container">
      <div>
        <label htmlFor="username">Email</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
      <button type="submit">Signup</button>
      <button type="reset" onClick={formik.handleReset}>
        Reset
      </button>
      <button type="login" onClick={()=>{navigate("/login")}}>
        Login
      </button>
      <button type="login" onClick={()=>{navigate("/linkRoute")}}>
        Route to Enter Password Reset String
      </button>
    </form>
  );
};

export default SignupForm;
