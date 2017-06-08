import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from './SignIn';
import Home from './Home';
import { checkLogin } from '../actions';

class App extends Component {

  componentDidMount() {
    this.props.checkLogin(
      () => {this.props.history.push('/home');},
      () => {this.props.history.push('/signin');},
    );
  }

  render() {
    // const { user } = this.props;
    // if (!user.role) {
    //   historyHandler.push('/signin');
    //   console.log("no user");
    // }
    // else {
    //   debugger;
    //   historyHandler.push('/home');
    //   console.log("has user");
    // }

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/signin" component={SignIn} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { checkLogin })(App);
