import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './configureStore';
import AppContainer from 'containers/AppContainer';
import ConnectContainer from 'containers/ConnectContainer';
import CreateContainer from 'containers/CreateContainer';
import QueueContainer from 'containers/QueueContainer';

const store = configureStore(window.initialState);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={ConnectContainer} />
        <Route path="create" component={CreateContainer} />
        <Route path="queue" component={QueueContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
