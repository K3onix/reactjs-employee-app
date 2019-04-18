import React, {Component} from 'react';
import '../../App.css';


class NoWebsiteError extends Component {
  render() {
    return (
        <div>
            <p className="content-heading">Sorry. :(</p>
            <p className="content-body">This website does not exist.</p>
        </div>
    );
  }
}

export default NoWebsiteError;