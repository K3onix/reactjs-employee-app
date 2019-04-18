import React, {Component} from 'react';
import './User.css';


class UserProfile extends Component {
  render() {
    return (
        <div>
            <div>
                <p className="content-heading">Profile</p>
            </div>
            <div className="userData">
                <ul className="userProfile">
                    <li className="content-body"><span className="userListTag">Username:</span> <span className="userListValue">{this.props.user.username}</span></li>
                    <li className="content-body"><span className="userListTag">Firstname:</span> <span className="userListValue">{this.props.user.firstName}</span></li>
                    <li className="content-body"><span className="userListTag">Lastname:</span> <span className="userListValue">{this.props.user.lastName}</span></li>
                    <li className="content-body"><span className="userListTag">E-Mail:</span> <span className="userListValue">{this.props.user.emailId}</span></li>
                    <li className="content-body"><span className="userListTag">Role:</span> <span className="userListValue">{this.props.user.app_metadata.role}</span></li>
                </ul>
            </div>
        </div>
    );
  }
}

export default UserProfile;