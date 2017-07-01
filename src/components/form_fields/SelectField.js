import React from "react";

const SelectField = ({ input, label, options, className, disabled }) => {
  function renderOptions(options) {
    return options.map((option) => {
      return(
        <option key={option} value={option}>
          {option}
        </option>
      )
    })
  }

  return (
    <div className={`form-group ${className}`}>
      <label>{label}</label>
      <select
        className="form-control"
        disabled = {disabled}
        {...input}
      >
        {renderOptions(options)}
      </select>
    </div>
  );
};

export default SelectField;
