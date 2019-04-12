import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import EmployeeList from './components/employeelist/EmployeeList';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import About from './components/about/About';
import NoWebsiteError from './components/error/Error';
import VersionView from './components/version/Version';

const testData = [
  {id: 0, firstname: "Max", lastname:"Mustermann", avatar_url: "https://via.placeholder.com/120", email: "example@mail.to"},
  {id: 1, firstname: "Peter", lastname:"Mustermann", avatar_url: "https://via.placeholder.com/120", email: "example@testmail.to"},
  {id: 2, firstname: "Franziska", lastname:"Uebung", avatar_url: "https://via.placeholder.com/120", email: "no@mail.specified"},
  {id: 3, firstname: "Scarlet", lastname: "Example", avatar_url: "https://via.placeholder.com/500", email: "nana@na.de"},
];

class App extends Component {
  state = {
    employees: testData,
    version: "0.1",
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigation/>
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/employees" render={(props) => <EmployeeList {...props} employees={this.state.employees} />} />
              <Route path="/about" component={About}/>
              <Route path="/version" render={(props) => <VersionView {...props} version={this.state.version} />} />
              <Route component={NoWebsiteError}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
