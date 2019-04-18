import React, {Component} from 'react';
import './EmployeeDetails.css'
import roles from '../../../utils/Roles';

const apiAddress = 'http://localhost:8080/api/v1/employees';


class EmployeeDetails extends Component {
    constructor(props) {
        super(props);
        const pageTitle = props.match.params.id !== 'new' ? "Edit employee" : "Create employee"

        this.state = {
            pageTitle: pageTitle,
            existingUser: props.match.params.id !== 'new' ? true : false,
            username: '',
            userRole: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.getEmployee = this.getEmployee.bind(this);

        if(props.match.params.id !== 'new') {
            this.getEmployee(props.match.params.id);
        }
    }

    getEmployee(employeeId) {
        fetch(apiAddress + "/" + employeeId, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
              'Authorization': this.props.userToken
            })
        }).then((result) => {
            return result.json();
          }).then((jsonResult) => {
            this.setState({
                username: jsonResult.userName || "Placeholder",
                firstName: jsonResult.firstName || "Placeholder",
                lastName: jsonResult.lastName || "Placeholder",
                email: jsonResult.emailId || "Placeholder",
                password: '',
                userRole: jsonResult.userRole,
            });
          });
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        const apiEndPoint = this.props.match.params.id === 'new' ? apiAddress : apiAddress + '/' + this.props.match.params.id;
        const apiMethod = this.props.match.params.id === 'new' ? 'POST' : 'PUT';
        
        fetch(apiEndPoint, {
            method: apiMethod,
            mode: 'cors',
            headers: new Headers({
                'Authorization': this.props.userToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }),
            body: JSON.stringify({
                id: 10,
                userName: this.state.username,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailId: this.state.email,
                password: this.state.password,
                userRole: this.state.userRole
                })
            }).then((response) => {
                if (!response.ok) {
                    alert("An error occurred while saving the employee!");
                }
                else {
                    this.props.history.push("/employees");
                }
            });

        event.preventDefault();
    }

    handleDelete(event) {
        const apiEndPoint = apiAddress + '/' + this.props.match.params.id;
        fetch(apiEndPoint, {
            method: 'DELETE',
            headers: new Headers({
              'Authorization': this.props.userToken
            })
        }).then((response) => {
                if (!response.ok) {
                    alert("An error occurred while deleting the employee!");
                }
                else {
                    this.props.history.goBack();
                }
            });

        event.preventDefault();
    }

    render() {
        const { username, firstName, lastName, email } = this.state;
        const formValid = username.length > 0 && firstName.length > 0 && lastName.length > 0 && email.length > 0;
        return (
            
            <div>
                <p className="content-heading">{this.state.pageTitle}</p>
                <div className="employee-container" style={{ height: this.props.userRole === roles.ADMINISTRATOR ? "760px" : "650px"}}>
                    <form onSubmit={this.handleSubmit}>
                        <label>Username:
                            <input type="text" value={this.state.username} name="username" onChange={this.handleChange} required disabled={this.state.existingUser}/>
                        </label>
                        {this.props.userRole === roles.ADMINISTRATOR ? <label >Role:
                            <select name="userRole" value={this.state.userRole} onChange={this.handleChange}>
                                <option value="USER">User</option>
                                <option value="MODERATOR">Moderator</option>
                                <option value="ADMINISTRATOR">Administrator</option>
                            </select>
                        </label> : null}
                        <br />
                        <label>Firstname:
                            <input type="text" value={this.state.firstName} name="firstName" onChange={this.handleChange} required/>
                        </label> <br />
                        <label>Lastname:
                            <input type="text" value={this.state.lastName} name="lastName" onChange={this.handleChange} required/>
                        </label><br />
                        <label>E-Mail:
                            <input type="text" value={this.state.email} name="email" onChange={this.handleChange} required/>
                        </label><br />
                        <label>{this.props.match.params.id !== 'new' ? "New password" : "Password"}:
                            <input type="password" value={this.state.password} name="password" onChange={this.handleChange} disabled={ this.state.userRole === roles.USER || (this.props.userRole === roles.ADMINISTRATOR) || this.props.userName === this.state.username ? false : true}/>
                        </label> <br /><br />
                        <input type="submit" value="Save" disabled={!formValid}/>
                        <button type="reset" onClick={this.props.history.goBack}>Cancel</button>
                        {this.props.match.params.id !== 'new' ? <button type="delete" onClick={this.handleDelete}>Delete</button> : null}
                    </form>
                </div>
            </div>
    );
  }
}

export default EmployeeDetails;