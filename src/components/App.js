// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
//
//
// import SignIn from './SignIn';
// import Home from './Home';
// import PatientNew from './PatientNew';
// import PatientView from './PatientView';
// import ProtocolView from './ProtocolView';
// 
// class App extends Component {
//
//   render() {
//     return (
//       <BrowserRouter>
//         <div>
//           <Switch>
//             <Route path="/signin" component={SignIn} />
//             <Route path="/home" component={Home} />
//             <Route path="/patient/new" component={PatientNew} />
//             <Route path="/patient/:id" component={PatientView} />
//             <Route path="/protocol/:id" component={ProtocolView} />
//           </Switch>
//         </div>
//       </BrowserRouter>
//     );
//   }
// }
//
// // function mapStateToProps(state) {
// //   return { user: state.user };
// // }
//
// export default connect(null, { fetchUser })(App);
