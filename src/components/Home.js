import React, { Component } from 'react';
//import { connect } from 'react-redux';

import Header from './Header';
import PatientsList from './PatientsList';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <PatientsList />
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return { user: state.user };
// }

//export default connect(mapStateToProps, { logOut })(Home);;
export default Home;
