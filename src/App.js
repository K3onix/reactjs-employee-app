import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import EmployeeList from './components/employeelist/EmployeeList';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import About from './components/about/About';
import NoWebsiteError from './components/error/Error';
import VersionView from './components/version/Version';
import EmployeeDetails from './components/employeelist/employee-details/EmployeeDetails';
import LogIn from './components/authentify/LogIn';
import LogOut from './components/authentify/LogOut';
import Register from './components/authentify/Register';
import roles from './utils/Roles';
import UserProfile from './components/user/User';


const appVersion = "0.2";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUser: {
        username: localStorage.getItem('username') || null,
        firstName: localStorage.getItem('firstName') || null,
        lastName: localStorage.getItem('lastName') || null,
        emailId: localStorage.getItem('emailId') || null,
        app_metadata: {
          token: localStorage.getItem('token') || null,
          userRole: localStorage.getItem('userRole') || roles.ANONYMOUS}},
        isLoggedIn: localStorage.getItem('loggedIn') || false};
    
    this.saveUserToStorage = this.saveUserToStorage.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  saveUserToStorage(currentUser, token) {
    localStorage.setItem('username', currentUser.userName);
    localStorage.setItem('firstName', currentUser.firstName);
    localStorage.setItem('lastName', currentUser.lastName);
    localStorage.setItem('emailId', currentUser.emailId);
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', currentUser.userRole);
    localStorage.setItem('loggedIn', this.state.isLoggedIn);

    console.log("Saved account: " + currentUser.userName);
  }

  deleteUserFromStorage() {
    const user = localStorage.getItem('username');

    localStorage.removeItem('username');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('emailId');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('loggedIn');

    console.log("Deleted account: " + user);
  }

  setCurrentUser(username, token) {
    fetch("http://localhost:8080/api/v1/employees/usernames/" + username, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        'Authorization': token
      })
    }).then((response) => {
      return response.json();
    }).then((user) => {
      this.setState({
        activeUser: {
          username: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          emailId: user.emailId,
          app_metadata: {
            token: token,
            userRole: user.userRole,
          }
        },
        isLoggedIn: true
      });
      this.saveUserToStorage(user, token);
    });
  }

  logOut() {
    this.setState({
      activeUser: {
        username: null,
        firstName: null,
        lastName: null,
        emailId: null,
        app_metadata: {
          userRole: roles.ANONYMOUS}},
      isLoggedIn: false
    })
    this.deleteUserFromStorage();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigation version={appVersion} isLoggedIn={this.state.isLoggedIn} userName={this.state.activeUser.firstName}/>
            <Switch>
              <Route path="/" component={Home} exact/>
              {this.state.isLoggedIn && this.state.activeUser.app_metadata.userRole !== roles.ANONYMOUS ? <Route path="/employees" render={(props) => <EmployeeList {...props} user={this.state.activeUser} userRole={this.state.activeUser.app_metadata.userRole} />} exact />: null}
              {this.state.isLoggedIn && (this.state.activeUser.app_metadata.userRole === roles.MODERATOR || this.state.activeUser.app_metadata.userRole === roles.ADMINISTRATOR) ? <Route path="/employees/:id" render={(props) => <EmployeeDetails {...props} 
              userToken={this.state.activeUser.app_metadata.token} userRole={this.state.activeUser.app_metadata.userRole} userName={this.state.activeUser.username}/>} exact /> : null }
              <Route path="/about" component={About}/>
              <Route path="/version" render={(props) => <VersionView {...props} version={appVersion} />} />
              {this.state.isLoggedIn ? <Route path="/user" render={() => <UserProfile user={this.state.activeUser}/>} /> : null }
              <Route path="/login" render={(props) => <LogIn {...props} appSignIn={this.setCurrentUser} />} />
              <Route path="/register" render={(props) => <Register {...props} createUser={this.createUser} />} />
              <Route path="/logout" render={(props) => <LogOut {...props} logOut={this.logOut} />} />
              <Route component={NoWebsiteError}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
