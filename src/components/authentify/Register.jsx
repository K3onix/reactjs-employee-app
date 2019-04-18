import React, {Component} from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import './LogIn.css';

const apiPath = "http://localhost:8080/api/v1/employees";

class Register extends Component {
  constructor(props) {
      super(props);
      this.state = {
          username: '',
          firstName: '',
          lastName: '',
          password: '',
          registerSuccess: false,
        };
      this.createUser = this.createUser.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
        [name]: value
    });
  }

  createUser(usrn, firstName, lastName, pswd, mail) {
    fetch(apiPath,
    {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          userName: usrn, 
          firstName: firstName,
          lastName: lastName,
          emailId: mail,
          password: pswd,
          })
      }).then((response) => {
        if(!response.ok) {
         throw Error("OHJE"); 
        }
        this.setState({registerSuccess: true});
      }).catch((error) => {
        console.log(error);
        alert("The username is already in use");
      });
  }

  handleRegister(event) {
    const email = document.getElementById("emailInput").value;
    this.createUser(this.state.username, this.state.firstName, this.state.lastName, this.state.password, email);
    event.preventDefault();
  }
 
    render() {   
    return (
        <div className="login-container">
            <p className="content-heading">Create Account</p>
            <form onSubmit={this.handleRegister}>
                <div className="container">
                    <label><b>Firstname</b></label>
                    <input className="login-input" type="text" value={this.state.firstName} onChange={this.handleChange} placeholder="Enter your first name" name="firstName" required />

                    <label><b>Lastname</b></label>
                    <input className="login-input" type="text" value={this.state.lastName} onChange={this.handleChange} placeholder="Enter your last name" name="lastName" required />

                    <label><b>Username</b></label>
                    <input className="login-input" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Enter your username" name="username" required />

                    <label><b>Password</b></label>
                    <input className="login-input" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter Password" name="password" required />

                    <label><b>E-Mail</b></label>
                    <input id="emailInput" className="login-input" type="text" value={ this.state.firstName !== '' && this.state.lastName !== '' ?
                        this.state.firstName.toLowerCase() + "." + this.state.lastName.toLowerCase() + "@dot.home" : ''} placeholder="Automatically generated E-Mail" name="email" disabled={true} />

                    <button className="login-button" type="submit">Create Account</button>
                    <p className="register">Already have an account? <NavLink to="/login">Sign in</NavLink></p>
                </div>

            </form>
            { this.state.registerSuccess ? <Redirect to="/" /> : null }
        </div>
    );
  }
}

export default Register;