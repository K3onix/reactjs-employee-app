import React, {Component} from 'react';
import './EmployeeList.css';

class EmployeeCard extends Component {
  render() {
    const employee = this.props;
    return (
      
        <tr className="employee-list-row, hover-row" onClick={this.redirectToDetails}>
          <td><img className="employee-image" src={employee.avatar_url}/></td>
          <td>
            <div className="employee-info">
              <div className="employee-name">Name: {employee.firstname} {employee.lastname}</div>
              <div className="employee-mail">E-Mail: {employee.email}</div>
            </div>
          </td>
        </tr>
      
    );
  }
}

class EmployeeList extends Component {
  render() {
    return (
      <div>
        <table className="employee-profile">
          <tr>
            <th className="employee-list-header">Avatar</th>
            <th className="employee-list-header">Details</th>
          </tr>
          {this.props.employees.map(employee =>  <EmployeeCard key={employee.id} {...employee}/> )}
        </table>
        
      </div>
    );
  }
}

export default EmployeeList;