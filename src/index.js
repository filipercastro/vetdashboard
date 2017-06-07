import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import thunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <div>
        <Route path="/" component={App} />
      </div>
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);
