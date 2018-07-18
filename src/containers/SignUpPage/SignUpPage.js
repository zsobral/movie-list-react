import React from 'react';

import './SignUpPage.css';
import Input from '../../components/Input';
import Button from '../../components/Button';

class SignUpPage extends React.Component {
  render() {
    return (
      <div className="sign-up-wrapper">
        <h1 style={{ color: '#fff' }}>Sign Up</h1>
        <form>
          <Input type="text" placeholder="name" />
          <Input type="email" placeholder="email" />
          <Input type="password" placeholder="password" />
          <Button fullWidth>Sign Up</Button>
        </form>
      </div>
    );
  }
}

export default SignUpPage;
