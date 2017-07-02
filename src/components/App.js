import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignIn from './SignIn';
import Main from './Main';

const App = () => (
  <div>
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/main" component={Main} />
      <Route path="/" render={() => (
        <Redirect to="/main" />
      )} />
    </Switch>
  </div>
);

export default App;
