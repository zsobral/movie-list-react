import React from 'react';
import PropTypes from 'prop-types';

import './Nav.css';

function Nav(props) {

  const {
    brand,
    children
  } = props;

  return (
    <div className="nav-wrapper">
      <nav className="nav">
        <div className="nav-brand">{brand}</div>
        <div className="nav-items">{children}</div>
      </nav>
    </div>
  );
}

Nav.defaultProps = {
  brand: 'Nav Brand'
};

Nav.propTypes = {
  brand: PropTypes.string
};

export default Nav;
