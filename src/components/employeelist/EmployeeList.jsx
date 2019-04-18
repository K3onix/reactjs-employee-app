import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './EmployeeList.css';
import roles from '../../utils/Roles';

const apiPath = "http://localhost:8080/api/v1/employees";

class EmployeeCard extends Component {
  handleClicked(employeeId) {

    if (this.props.userRole < roles.MODERATOR) {
      return;
    }
    this.props.history.push("/employees/"+employeeId);
  }

  render() {
    const employee = this.props;
    return (
        <tr className="employee-list-row, hover-row" onClick={() => this.handleClicked(employee.id)}>
          <td><img className="employee-image" src="https://via.placeholder.com/120" alt="Employee avatar"/></td>
          <td>
            <div className="employee-info">
              <div className="employee-name">Name: {employee.firstName} {employee.lastName}</div>
              <div className="employee-mail">E-Mail: {employee.emailId}</div>
            </div>
          </td>
        </tr>
    );
  }
}

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {employees: []};
    this.getAllEmployees();
  }

  getAllEmployees() {
    fetch(apiPath, {
      method: 'GET',
      headers: new Headers({
        'Authorization': this.props.user.app_metadata.token
      })
    }).then((response) => {
      if (!response.ok) { throw response }
      return response.json();
    }).then((json) => {
      this.setState({employees: json});
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="employee-overview">
        {this.props.userRole === roles.ADMINISTRATOR ? <Link to="/employees/new"><button className="add-employee">Add Employee</button></Link> : null}
        <table className="employee-profile">
          <thead>
          <tr>
              <th className="employee-list-header">Avatar</th>
              <th className="employee-list-header">Details</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map(employee =>  <EmployeeCard key={employee.id} {...employee} history={this.props.history} userRole={this.props.userRole}/> )}
          </tbody>
        </table>
        
      </div>
    );
  }
}

export default EmployeeList;