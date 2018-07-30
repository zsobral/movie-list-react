import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import { Nav, NavItem } from '../../components/Nav';
import Footer from '../../components/Footer';
import NotFound from '../../components/NotFound';
import Logout from '../Logout';
import HomePage from '../HomePage';
import SignUpPage from '../SignUpPage';
import SignInPage from '../SignInPage';
import MyListsPage from '../MyListsPage';
import ListBuilderPage from '../ListBuilderPage';
import MovieSearchPage from '../MovieSearchPage';
import { checkAuth } from '../../store/auth';


class App extends React.Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    if (!this.props.init) {
      return null;
    }

    const protectedRoutes = [
      '/',
      '/lists',
      '/logout'
    ];
    const authRoutes = [
      '/sign_in',
      '/sign_up'
    ];
    const pathname = this.props.location.pathname;

    if (this.props.isAuthenticated && authRoutes.indexOf(pathname) >= 0) {
      return <Redirect to="/" />;
    }

    if (!this.props.isAuthenticated && protectedRoutes.indexOf(pathname) >= 0) {
        return <Redirect to="/sign_in" />;
    }

    let navItems;

    if (!this.props.isAuthenticated) {
      navItems = (
        <React.Fragment>
          <NavItem to="/sign_in">Sign In</NavItem>
          <NavItem to="/sign_up">Sign Up</NavItem>
        </React.Fragment>
      );
    } else {
      navItems = (
        <React.Fragment>
          <NavItem to="/lists">Lists</NavItem>
          <NavItem to="/logout">Logout</NavItem>
        </React.Fragment>
      );
    }
    return (
      <div className="app">
        <Nav brand="Movie List">
          {navItems}
        </Nav>

        <div className="content">
          <Switch>
            <Route path="/sign_up" component={SignUpPage} />
            <Route path="/sign_in" component={SignInPage} />
            <Route path="/logout" component={Logout} />
            <Route path="/movies/search" component={MovieSearchPage} />
            <Route path="/lists/new" component={ListBuilderPage} />
            <Route exact path="/lists" component={MyListsPage} />
            <Route exact path="/" component={HomePage} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.user !== null,
  loading: state.auth.fetching,
  init: state.auth.init
});

const mapDispatchToProps = dispatch => ({
  checkAuth: () => dispatch(checkAuth())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
