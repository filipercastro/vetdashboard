import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import { auth } from './firebase';
import { setAuth, fetchUser } from './actions';
import reducers from './reducers';
import App from './components/App';

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
      <App />
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);
