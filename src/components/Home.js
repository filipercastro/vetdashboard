import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import PatientsList from './PatientsList';

class Home extends Component {

  render() {
    const { auth } = this.props.user;
    if (auth === null || auth === "loggingIn") {
      return <div>Loading...</div>
    }

    return (
      (auth === "notAuth") ? (
        <Redirect to="/signin" />
      ) : (
        <div className="container">
          <Header />
          <PatientsList />
        </div>
      )
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Home);
