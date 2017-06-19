import React from "react";
import { formValues } from "redux-form";

const FwdField = ({ input, type, label, className, fwd }) => (
  <div
    style={{ display: fwd ? "block" : "none" }}
    className={`form-group ${className}`}
  >
    <label>{label}</label>
    <input
      className="form-control"
      type={type}
      {...input}
    />
  </div>
);

export default formValues('fwd')(FwdField);
