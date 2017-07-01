import React, { Component } from 'react';
import requireAuth from './hocs/require_auth';
import Header from './Header';
import PatientsList from './PatientsList';

class Home extends Component {

  render() {
    return (
      <div className="container">
        <Header />
        <PatientsList />
      </div>
    )
  }
}

export default requireAuth(Home);
