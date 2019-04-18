import React, {Component} from 'react';
import './EmployeeDetails.css'

const apiAddress = 'http://localhost:8080/api/v1/employees';


class EmployeeDetails extends Component {
    constructor(props) {
        super(props);
        const pageTitle = props.match.params.id !== 'new' ? "Edit employee" : "Create employee"

        this.state = {
            pageTitle: pageTitle,
            username: '',
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
                username: jsonResult.username || "Placeholder",
                firstName: jsonResult.firstName || "Placeholder",
                lastName: jsonResult.lastName || "Placeholder",
                email: jsonResult.emailId || "Placeholder",
                password: jsonResult.password || "Placeholder",
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
                'Authorization': this.props.userToken
              }),
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailId: this.state.email,
                //password: this.state.password
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
        const { username, firstName, lastName, email, password } = this.state;
        const formValid = username.length > 0 && firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0;
        return (
            
            <div>
                <p className="content-heading">{this.state.pageTitle}</p>
                <div className="employee-container">
                    <form onSubmit={this.handleSubmit}>
                        <label>Username:
                            <input type="text" value={this.state.username} name="username" onChange={this.handleChange} required/>
                        </label> <br />
                        <label>Firstname:
                            <input type="text" value={this.state.firstName} name="firstName" onChange={this.handleChange} required/>
                        </label> <br />
                        <label>Lastname:
                            <input type="text" value={this.state.lastName} name="lastName" onChange={this.handleChange} required/>
                        </label><br />
                        <label>E-Mail:
                            <input type="text" value={this.state.email} name="email" onChange={this.handleChange} required/>
                        </label><br />
                        <label>Password:
                            <input type="password" value={this.state.password} name="password" onChange={this.handleChange} required/>
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