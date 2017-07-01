import React from "react";

const CheckboxField = ({ input, label, className, disabled }) => (
  <div className={`form-group ${className}`}>
    <label>{label}</label>
    <input
      type = "checkbox"
      disabled = {disabled}
      {...input}
    />
  </div>
);

export default CheckboxField;
