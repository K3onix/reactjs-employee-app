import React, {Component} from 'react';
// import { Redirect } from 'react-router-dom'


class LogOut extends Component {
  constructor(props) {
      super(props);
      props.logOut();
  }

  render() {
    return (
        // <Redirect to="/" />
        <div>
            <div>
            <h1>Succesfully logged out</h1>
            <p className="heading-description">Bye Bye!</p>
            </div>
        </div>
    );
  }
}

export default LogOut;