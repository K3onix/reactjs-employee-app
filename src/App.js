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

// const testData = [
//   {id: 0, firstName: "Max", lastName:"Mustermann", emailId: "example@mail.to"},
//   {id: 1, firstName: "Peter", lastName:"Mustermann", emailId: "example@testmail.to"},
//   {id: 2, firstName: "Franziska", lastName:"Uebung", emailId: "no@mail.specified"},
//   {id: 3, firstName: "Scarlet", lastName: "Example", emailId: "nana@na.de"},
// ];
const appVersion = "0.2";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};

    this.validateLogin = this.validateLogin.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  validateLogin(usrn, pswd) {
    if (usrn === 'admin' && pswd === 'admin'){
      this.setState({isLoggedIn: true});
      return true;
    }
    return false;
  }

  logOut() {
    this.setState({isLoggedIn: false})
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigation version={appVersion} isLoggedIn={this.state.isLoggedIn}/>
            <Switch>
              <Route path="/" component={Home} exact/>
              {this.state.isLoggedIn ? <Route path="/employees" component={EmployeeList} />: null}
              {this.state.isLoggedIn ? <Route path="/employee/:id" component={EmployeeDetails} exact /> : null }
              <Route path="/about" component={About}/>
              <Route path="/version" render={(props) => <VersionView {...props} version={appVersion} />} />
              <Route path="/login" render={(props) => <LogIn {...props} logIn={this.validateLogin} />} />
              {this.state.isLoggedIn ? <Route path="/logout" render={(props) => <LogOut {...props} logOut={this.logOut} />} /> : null }
              <Route component={NoWebsiteError}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
