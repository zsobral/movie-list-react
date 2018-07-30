import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './NavItem.css';

function NavItem(props) {
  const {
    to,
    children,
    ...otherProps
  } = props;

  return (
    <NavLink className="nav-item" activeClassName="active" to={to} {...otherProps} >
      {children}
    </NavLink>
  );
}

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string
};

export default NavItem;
