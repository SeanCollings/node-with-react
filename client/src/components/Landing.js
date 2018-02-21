import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Landing extends Component {
  displayButton() {
    if (this.props.auth) {
      return <Link to="/surveys" className="btn">Begin</Link>
    }

    return;
  };

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>
          Emaily!
      </h1>
        Collect feedback from your users
        <div style={{ marginTop: '10px' }}>
          {this.displayButton()}
        </div>
      </div>
    );
  };
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);