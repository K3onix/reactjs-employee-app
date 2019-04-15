import React, {Component} from 'react';
import './LogIn.css'


class LogIn extends Component {
  constructor(props) {
      super(props);
      this.state = {
          username: '',
          password: ''};
    
      this.handleChange = this.handleChange.bind(this);
      this.logIn = this.logIn.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
        [name]: value
    });
  }

  logIn() {
    const result = this.props.logIn(this.state.username, this.state.password);
    if (result) {
        console.log(this.props);
        this.props.history.push("/");
        console.log("-> OK  ");
    }
    else {
        alert("WRONG USER!");
    }
  }
  
    render() {   
    return (
        <div className="login-container">
            <p className="content-heading">LogIn .Home</p>
            <form onSubmit={this.logIn}>
                <div className="container">
                    <label><b>Username</b></label>
                    <input className="login-input" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Enter Username" name="username" required />

                    <label><b>Password</b></label>
                    <input className="login-input" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter Password" name="password" required />
                        
                    <button className="login-button" type="submit">Login</button>
                </div>

            </form>
        </div>
    );
  }
}

export default LogIn;