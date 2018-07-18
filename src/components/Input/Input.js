import React from 'react';
import './Input.css';

function Input(props) {
  const { type, value, onChange, label, ...otherProps } = props;

  return (
    <div className="input-group">
      {label ? <label>{label}</label> : null}
      <input
        className="input"
        type={type}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
    </div>
  );
}

export default Input;
