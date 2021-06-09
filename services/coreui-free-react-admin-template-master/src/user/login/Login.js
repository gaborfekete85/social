import React, { Component } from 'react';
import './Login.css';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from '../../constants';
import { login, socialLogin } from '../../util/APIUtils';
import { Link, Redirect } from 'react-router-dom'
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import Alert from 'react-s-alert';
import { connect } from "react-redux";
import {
    LOGIN_SUCCESS
} from "../../actions/types";

class Login extends Component {
    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                Alert.error(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
        
    }
    
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="login-container">
                <div className="login-content">
                    <h1 className="login-title">Login to SpringSocial</h1>
                    <SocialLogin />
                    <div className="or-separator">
                        <span className="or-text">OR</span>
                    </div>
                    <LoginForm {...this.props} />
                    <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>
                </div>
            </div>
        );
    }
}
//<button type="submit" className="btn btn-block btn-primary" onClick={() => this.handleLogin(FACEBOOK_AUTH_URL)}>Login with Facebook</button>

class SocialLogin extends Component {
    constructor(props) {
        super(props);
        let splits = window.location.href.split("/");

        let URL = splits[0] + "//" + splits[2];

        this.state = {
            authorizationUrl: URL + '/security/oauth2/authorize/[SERVICE_PROVIDER]?redirect_uri=' + URL + '/oauth2/redirect'
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }

    render() {
        return (
            <div className="social-login">
                <a className="btn btn-block social-btn google" href={this.state.authorizationUrl.replace("[SERVICE_PROVIDER]", "google")}>
                    <img src={googleLogo} alt="Google" /> Log in with Google</a>
                <a className="btn btn-block social-btn facebook" href={this.state.authorizationUrl.replace("[SERVICE_PROVIDER]", "facebook")}>
                    <img src={fbLogo} alt="Facebook" /> Log in with Facebook</a>
                {/*<a className="btn btn-block social-btn github" href={this.state.authorizationUrl.replace("[SERVICE_PROVIDER]", "github")}>
                    <img src={githubLogo} alt="Github" /> Log in with Github</a>*/}
            </div>
        );
    }
}


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }

    handleSubmit(event) {
        event.preventDefault();   

        const loginRequest = Object.assign({}, this.state);

        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            //Alert.success("You're successfully logged in!");
            //this.props.history.push("/");
            window.location='/';
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="email" name="email" 
                        className="form-control" placeholder="Email"
                        value={this.state.email} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="password" name="password" 
                        className="form-control" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary">Login</button>
                </div>
            </form>                    
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoggedIn: (token, user) => dispatch({
            type: LOGIN_SUCCESS,
            payload: {}
          })
    }
};

const mapStateToProps = state => {
    return {
        mode: state.globals.mode,
        loggedIn: state.auth.isLoggedIn
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);