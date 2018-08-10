import React from 'react';
import { connect } from 'react-redux';

import './SignInPage.css';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as actions from '../../store/auth';

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      ...this.state,
      email: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      ...this.state,
      password: event.target.value
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.signIn(this.state.email, this.state.password);
  }

  render() {

    let errors = {
      email: null,
      password: null
    };

    if(this.props.error) {
      const error = this.props.error.data.error;
      console.log(error);
      if(error.code === 'VALIDATION_ERR') {
        errors[error.details[0].context.key] = error.details[0].message;
      }

      if(error.code === 'UNAUTHORIZED_ERR') {
        if(error.message === 'invalid email') {
          errors.email = 'email not found';
        }

        if(error.message === 'invalid password') {
          errors.password = 'incorrect password';
        }
      }
    }

    return (
      <div className="sign-in-wrapper">
        <h1>Sign In</h1>
        <form onSubmit={this.handleFormSubmit}>
          <Input
            type="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
            error={errors.email}
            placeholder="email"
            name="email"
          />
          <Input
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            error={errors.password}
            placeholder="password"
            name="password"
          />
          <Button loading={this.props.loading} disabled={this.props.loading} fullWidth>Sign In</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.fetching,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: (email, password) => dispatch(actions.signIn(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPage);
