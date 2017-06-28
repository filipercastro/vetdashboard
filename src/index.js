import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import thunk from 'redux-thunk';

import { auth } from './firebase';
import { setAuth, fetchUser } from './actions';
import reducers from './reducers';
import SignIn from './components/SignIn';
import Home from './components/Home';
import PatientView from './components/PatientView';
import PatientNew from './components/PatientNew';
// import ProtocolView from './components/ProtocolView';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

auth.onAuthStateChanged(data => {
  if (data) {
    store.dispatch(setAuth("auth"));
    store.dispatch(fetchUser(data.uid));
  } else {
    store.dispatch(setAuth("notAuth"));
  }
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/patient/new" component={PatientNew} />
          {/*<Route path="/protocol/:id" component={ProtocolView} /> */}
          <Route path="/patient/:id" component={PatientView} />
          <Route path="/signin" component={SignIn} />
          <Route path="/home" component={Home} />
          <Route path="/" render={() => (
            <Redirect to="/home" />
          )} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);
