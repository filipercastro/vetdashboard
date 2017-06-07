import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions'

class Home extends Component {
  render() {
    return (
      <div>
        {this.props.user.role}
        <button
          className="btn btn-danger"
          onClick={() => {
            this.props.logOut(() => {
              this.props.history.push('/signin');
            });
          }}
        >
          Log Out
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { logOut })(Home);;
