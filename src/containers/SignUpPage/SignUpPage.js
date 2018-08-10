import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './SignUpPage.css';

import Input from '../../components/Input';
import Button from '../../components/Button';

class SignUpPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      done: false,
      loading: false,
      form: {
        name: {
          value: '',
          error: ''
        },
        email: {
          value: '',
          error: ''
        },
        password: {
          value: '',
          error: ''
        }
      }
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  async handleSignUp() {
    this.setState({ loading: true });
    try {
      await axios.post('/api/users', {
        name: this.state.form.name.value,
        email: this.state.form.email.value,
        password: this.state.form.password.value
      });
      this.setState({
        loading: false,
        done: true
      });
    } catch (error) {

      const key = error.response.data.error.details[0].context.key;
      const message = error.response.data.error.details[0].message;

      if (key === 'name') {
        console.log(message);
        this.setState(prevState => ({
          form: {
            ...prevState.form,
            name: {
              value: prevState.form.name.value,
              error: message
            }
          }
        }));
      }
    }
  }

  render() {

    if (this.state.done) {
      return <Redirect to="/sign-in" />
    }

    return (
      <div className="sign-up-wrapper">
        <h1>Sign Up</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input type="text" placeholder="name" name="name" error={this.state.form.name.error} />
          <Input type="email" placeholder="email" name="email" />
          <Input type="password" placeholder="password" name="password" />
          <Button fullWidth onClick={this.handleSignUp}>Sign Up</Button>
        </form>
      </div>
    );
  }
}

export default SignUpPage;
