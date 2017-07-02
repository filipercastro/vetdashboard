import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {

    render() {
      const { auth } = this.props;
      if (auth === null || auth === "loggingIn") {
        return <div>Loading...</div>
      }

      return (
        (auth === "notAuth") ? (
          <Redirect to="/signin" />
        ) : (
          <div className="container">
            <ComposedComponent {...this.props} />
          </div>
        )
      )
    }
  }

  function mapStateToProps(state) {
    return {auth: state.auth};
  }

  return connect(mapStateToProps)(Authentication);
}
