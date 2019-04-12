import React, {Component} from 'react';
import './Navigation.css';
import {  NavLink } from 'react-router-dom';

class NavigationElement extends Component {
    render() {
        //return <li><a onClick={() => this.props.onClick(this.props.page)}>{this.props.name}</a></li>;
        return <li><NavLink to={this.props.page}>{this.props.name}</NavLink></li>;
    }
}

class Navigation extends Component {
    render() {
        return (
            <div className="navigation-bar">
                <ul>
                    <NavigationElement key="homePage" name="Home" page="/"/>
                    <NavigationElement key="employeeListPage" name="Employees" page="employees"/>
                    <NavigationElement key="aboutPage" name="About" page="about"/>
                    <NavigationElement key="versionPage" name="Version 0.1" page="version"/>
                </ul>
            </div>
        );
    }
}

export default Navigation;
