import React from "react";

const TextField = ({ input, label, placeholder, className, disabled }) => (
  <div className={`form-group ${className}`}>
    <label>{label}</label>
    <input
      className = "form-control"
      type = "text"
      disabled = {disabled}
      placeholder = {placeholder}
      {...input}
    />
  </div>
);

export default TextField;
