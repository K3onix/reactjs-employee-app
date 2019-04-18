import React, {Component} from 'react';
import { Redirect, NavLink} from 'react-router-dom';
import './LogIn.css';

const loginApi = "http://localhost:8080/login";

class LogIn extends Component {
  constructor(props) {
      super(props);
      this.state = {
          username: '',
          password: '',
          loginSuccess: false,
          loginFailed: false,
          loginFailMessage: ''
        };
    
      this.handleChange = this.handleChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
      this.validateLogin = this.validateLogin.bind(this);
  }

  validateLogin(usrn, pswd) {
    fetch(loginApi,
    {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
          userName: usrn, 
          password: pswd
          })
    }).then((response) => {
      if(!response.ok) { 
        throw response; 
      };
      const token = response.headers.get("Authorization");
      this.props.appSignIn(usrn, token);
      this.setState({loginSuccess: true});

      }).catch((error) => {
        if(error.status === 403) {
          this.setState({
            loginFailed: true,
            loginFailMessage: "Username or password is wrong"
          })
        }
        else{
          this.setState({
            loginFailed: true,
            loginFailMessage: "Connection to host was not possible"
          });
        }
      });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
        [name]: value
    });
  }

  handleLogin(event) {
    this.validateLogin(this.state.username, this.state.password);
    event.preventDefault();
  }

    render() {   
    return (
        <div className="login-container">
            <p className="content-heading"><span className="headingPrefix">dot</span>Home</p>
            <form onSubmit={this.handleLogin}>
                <div className="container">
                  { this.state.loginFailed ? <div className="login-failed">
                  <p>Sign in failed!</p><p>{this.state.loginFailMessage}</p>
                </div>: null}
                    <label><b>Username</b></label>
                    <input className="login-input" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Enter Username" name="username" required />

                    <label><b>Password</b></label>
                    <input className="login-input" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter Password" name="password" required />

                    <button className="login-button" type="submit">Login</button>
                    <p className="register">Don't have an account yet? <NavLink to="/register">Create Account</NavLink></p>
                </div>

            </form>
            { this.state.loginSuccess ? <Redirect to="/" /> : null }
        </div>
    );
  }
}

export default LogIn;