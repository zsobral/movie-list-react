import React from 'react';

import './Button.css';

function Button(props) {
  const { children, fullWidth, loading, ...otherProps } = props;

  const classNames = ['button'];

  if (fullWidth) {
    classNames.push('button-full-width');
  }

  const loadingIcon = loading ? <i className="fas fa-circle-notch fa-spin fa-lg" />  : null;

  return (
    <button className={classNames.join(' ')} {...otherProps}>
      {children}
      {loadingIcon}
    </button>
  );
}

Button.defaultProps = {
  loading: false,
  fullWidth: false
};

export default Button;
