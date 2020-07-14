import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './react/App';
import Login from './react/Login';
import NotFound from './react/NotFound';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <>
      <Switch>
        <Route exact path='/' component={App}></Route>
        <Route path='/login' component={Login}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </>
  </Router>
)

ReactDOM.render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
