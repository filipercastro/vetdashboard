import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from './SignIn';
import Home from './Home';
import { checkLogin } from '../actions';

class App extends Component {

  componentDidMount() {
    this.props.checkLogin();
  }

  render() {
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
