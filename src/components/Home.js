import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';
import Header from './Header';
import PatientsList from './PatientsList';

class Home extends Component {

  render() {
    return (
      // !this.props.user.auth ? (
      //   <Redirect to="/signin" />
      // ) : (
      //   <div>
      //     <Header />
      //     <PatientsList />
      //   </div>
      // )
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
//
// export default connect(mapStateToProps)(Home);
export default Home;
