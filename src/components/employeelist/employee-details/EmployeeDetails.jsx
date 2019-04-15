import React, {Component} from 'react';
import './EmployeeDetails.css'

const apiAddress = 'http://localhost:8080/api/v1/employees';


class EmployeeDetails extends Component {
    constructor(props) {
        super(props);
        const pageTitle = props.match.params.id !== 'new' ? "Edit employee" : "Create employee"

        this.state = {
            pageTitle: pageTitle,
            firstName: '',
            lastName: '',
            email: ''
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
        fetch(apiAddress + "/" + employeeId).then((result) => {
            return result.json();
          }).then((jsonResult) => {
            this.setState({
                firstName: jsonResult.firstName,
                lastName: jsonResult.lastName,
                email: jsonResult.emailId
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

    // async handleSubmit(event) {
    //     const apiEndPoint = this.props.match.params.id === 'new' ? apiAddress : apiAddress + '/' + this.props.match.params.id;
    //     const apiMethod = this.props.match.params.id === 'new' ? 'POST' : 'PUT';
    //     const response = await fetch(
    //         apiEndPoint, {
    //             method: apiMethod,
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 firstName: this.state.firstName,
    //                 lastName: this.state.lastName,
    //                 emailId: this.state.email,
    //                 })
    //             }
    //     );
    //     if (!response.ok) {
    //         alert("An error occurred while saving the employee!");
    //     }
    //     else {
    //         this.props.history.push("/employees");
    //     }
    //     event.preventDefault();
    // }

    handleSubmit(event) {
        const apiEndPoint = this.props.match.params.id === 'new' ? apiAddress : apiAddress + '/' + this.props.match.params.id;
        const apiMethod = this.props.match.params.id === 'new' ? 'POST' : 'PUT';
        
        fetch(apiEndPoint, {
            method: apiMethod,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailId: this.state.email,
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
            method: 'DELETE'}).then((response) => {
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
        const { firstName, lastName, email } = this.state;
        const formValid = firstName.length > 0 && lastName.length > 0 && email.length > 0;
        return (
            
            <div>
                <p className="content-heading">{this.state.pageTitle}</p>
                <div className="employee-container">
                    <form onSubmit={this.handleSubmit}>
                        <label>First name:
                            <input type="text" value={this.state.firstName} name="firstName" onChange={this.handleChange} required/>
                        </label> <br />
                        <label>Last name:
                            <input type="text" value={this.state.lastName} name="lastName" onChange={this.handleChange} required/>
                        </label><br />
                        <label>E-Mail:
                            <input type="text" value={this.state.email} name="email" onChange={this.handleChange} required/>
                        </label><br /><br />
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