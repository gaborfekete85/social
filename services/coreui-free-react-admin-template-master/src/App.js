import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { Redirect } from "react-router-dom"
import './index.css';
import { getCurrentUser } from './util/APIUtils';
import { ACCESS_TOKEN } from './constants';
import Alert from 'react-s-alert';
import AppHeader from './common/AppHeader';
import OAuth2RedirectHandler from './user/oauth2/OAuth2RedirectHandler';
import Home from './home/Home';
import Profile from './user/profile/Profile';
import store from "./store";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import {loadUser} from "./actions/auth";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
//const Login = React.lazy(() => import('./views/pages/login/Login'));
const Login = React.lazy(() => import('./user/login/Login'));
const Signup = React.lazy(() => import('./user/signup/Signup'));

const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const Cards = React.lazy(() => import('./views/cards/cards'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });
    
    this.props.loadUser();

    //getCurrentUser()
    //.then(response => {
    //  this.setState({
    //    currentUser: response,
    //    authenticated: true,
    //    loading: false
    //  });
    //}).catch(error => {
    //  this.setState({
    //    loading: false
    //  });
    //});
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    //window.location.reload();
    Alert.success("You're safely logged out!");
    window.location='/';
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
    const token = this.getUrlParameter('token');
    if(token) {
      console.log("Token: " + token);
      localStorage.setItem(ACCESS_TOKEN, token);
      window.location='/';
    }
  }

  //this.state.authenticated ? <TheLayout {...props}/> : <Login {...props}/>
  //<Alert stack={{limit: 3}} 
  //  timeout = {3000}
  //  position='top-right' effect='slide' offset={65} />

  // <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="app">
          {!this.props.isLoggedIn &&
            <div className="app-top-box">
              <AppHeader authenticated={this.props.isLoggedIn} onLogout={this.handleLogout} />
            </div>}
          </div>
            <React.Suspense fallback={loading}>
              <Switch>
                <Route path="/oauth2/redirect" name="Login Page" render={props => <OAuth2RedirectHandler {...props}/>} />
                <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                <Route exact path="/signup" name="Signup" render={props => <Signup {...props}/>} />
                <Route exact path="/cards" name="Signup" render={props => <Cards {...props}/>} />
                <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                {/*<Route exact path="/profile" name="Profile" render={props => <Profile {...props}/>} />*/}
                {/*<Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>*/}
                <Route exact path="/dashboard" name="Dashboard" render={props => <TheLayout logoutHandler={this.handleLogout} {...props}/> } />
                <Route path="/" name="Home" render={props => this.props.isLoggedIn ? <TheLayout logoutHandler={this.handleLogout} {...props}/> : <Login {...props}/> } />
              </Switch>
            </React.Suspense>
        </HashRouter>
      </Provider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      loadUser: () => dispatch(loadUser())
    }
};

const mapStateToProps = state => {
  return {
      mode: state.globals.mode,
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

