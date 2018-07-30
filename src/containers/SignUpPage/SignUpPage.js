import React from 'react';

import './SignUpPage.css';
import Input from '../../components/Input';
import Button from '../../components/Button';

class SignUpPage extends React.Component {
  render() {
    return (
      <div className="sign-up-wrapper">
        <h1>Sign Up</h1>
        <form>
          <Input type="text" placeholder="name" name="name" />
          <Input type="email" placeholder="email" name="email" />
          <Input type="password" placeholder="password" name="password" />
          <Button fullWidth>Sign Up</Button>
        </form>
      </div>
    );
  }
}

export default SignUpPage;
