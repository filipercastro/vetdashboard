import React from "react";

const TextField = ({ input, label, className, disabled }) => (
  <div className={`form-group ${className}`}>
    <label>{label}</label>
    <input
      className = "form-control"
      type = "text"
      disabled = {disabled}
      {...input}
    />
  </div>
);

export default TextField;
