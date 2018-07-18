import React from 'react';

import './SignInPage.css';
import Input from '../../components/Input';
import Button from '../../components/Button';

class SignInPage extends React.Component {
  render() {
    return (
      <div className="sign-in-wrapper">
        <h1 style={{ color: '#fff' }}>Sign In</h1>
        <form>
          <Input type="email" placeholder="email" />
          <Input type="password" placeholder="password" />
          <Button fullWidth>Sign In</Button>
        </form>
      </div>
    );
  }
}

export default SignInPage;
