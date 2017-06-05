import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { firebaseApp } from './firebase';
import { logUser } from './actions';
import reducers from './reducers';
import SignIn from './components/SignIn';
import Home from './components/Home';

firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    // console.log('user has signed in or up', user);
    const { uid } = user;
    store.dispatch(logUser(uid));
    //browserHistory.push('/home');
  } else {
    console.log('user has signed out or still needs to sign in.')
    //browserHistory.replace('/signin');
  }
})

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/" component={SignIn} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);
