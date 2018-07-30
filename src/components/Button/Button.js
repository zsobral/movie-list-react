import React from 'react';
import { Link } from 'react-router-dom';
import { Loader } from 'react-feather';

import './Button.css';

function Button(props) {
  const {
    children,
    fullWidth,
    loading,
    to,
    outline,
    secondary,
    ...otherProps
  } = props;

  const classNames = ['button'];

  if (fullWidth) {
    classNames.push('button-full-width');
  }

  if (outline) {
    classNames.push('outline');
  }

  if(secondary) {
    classNames.push('secondary');
  }

  let button;
  const loadingIcon = loading ? <Loader className="spin" /> : null;

  if (to) {
    button = (
      <Link className={classNames.join(' ')} to={to} {...otherProps}>
        {children}
        {loadingIcon}
      </Link>
    );
  } else {
    button = (
      <button className={classNames.join(' ')} {...otherProps}>
        {children}
        {loadingIcon}
      </button>
    );
  }

  return button;
}

Button.defaultProps = {
  loading: false,
  fullWidth: false
};

export default Button;
