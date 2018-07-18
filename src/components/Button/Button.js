import React from 'react';

import './Button.css';

function Button(props) {
  const { children, fullWidth, ...otherProps } = props;

  const classNames = ['button'];

  if (fullWidth) {
    classNames.push('button-full-width');
  }

  return (
    <button className={classNames.join(' ')} {...otherProps}>
      {children}
    </button>
  );
}

export default Button;
