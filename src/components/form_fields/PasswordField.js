import React from "react";

const PasswordField = ({ input, label, placeholder, className, disabled }) => (
  <div className={`${className}`}>
    <label>{label}</label>
    <input
      className = "form-control"
      type = "password"
      disabled = {disabled}
      placeholder = {placeholder}
      {...input}
    />
  </div>
);

export default PasswordField;
