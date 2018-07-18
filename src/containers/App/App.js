import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import HomePage from '../HomePage';
import SignUpPage from '../SignUpPage';
import SignInPage from '../SignInPage';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/sign-up">Sign up</Link></li>
            <li><Link to="/sign-in">Sign in</Link></li>
          </ul>

          <Route exact path="/" component={HomePage} />
          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/sign-in" component={SignInPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
