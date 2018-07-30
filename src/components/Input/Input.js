import React from 'react';
import { Loader } from 'react-feather';

import './Input.css';

function Input(props) {
  const {
    type,
    value,
    onChange,
    label,
    error,
    loading,
    autoFocus,
    ...otherProps
  } = props;

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
        autoFocus={autoFocus}
        {...otherProps}
      />
      {loading ? <Loader className="loader spin" /> : null}
      {errorLabel}
    </div>
  );
}

export default Input;
