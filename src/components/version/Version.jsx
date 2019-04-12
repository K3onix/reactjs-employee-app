import React, {Component} from 'react';


class VersionView extends Component {
  render() {
    return (
        <div>
            <p className="content-heading">Current version: {this.props.version}</p>
        </div>
    );
  }
}

export default VersionView;