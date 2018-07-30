import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logoutRequest } from '../../store/auth';

class Logout extends React.Component {

  componentDidMount() {
    this.props.logout();
  }

  render() {

    if (!this.props.isAuthenticated) {
      return <Redirect to="/sign_in" />;
    }

    return null;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.user !== null
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
