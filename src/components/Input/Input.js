import React from 'react';
import './Input.css';

function Input(props) {
  const { type, value, onChange, label, error, ...otherProps } = props;

  let errorLabel = null;

  if (error) {
    errorLabel = <span className="input-error-message">{error}</span>;
  }

  return (
    <div className={'input-group' + (error ? ' input-group-error' : '')}>
      {label ? <label>{label}</label> : null}
      <input
        className="input"
        type={type}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
      {errorLabel}
    </div>
  );
}

export default Input;
