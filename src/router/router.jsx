import React from 'react'
import { Provider, connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom';
import store from '../redux/store.js'
import history from '../redux/history.js'
import Login from '../page/main/login.jsx'
import Register from '../page/main/register.jsx'
import Setting from '../page/main/setting.jsx'
import Home from '../page/home/index.jsx'
import App from '../page/app.jsx'
import Express from '../page/express/index.jsx'
import Activity from '../page/activity/index.jsx'
import Offline from '../page/offline/index.jsx'
import Violation from '../page/violation/index.jsx'

const Root = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/setting" component={Setting} />
          <Route path="/express" component={Express} />
          <Route path="/activity" component={Activity} />
          <Route path="/offline" component={Offline} />
          <Route path="/violation" component={Violation} />
        </Switch>
      </Router>
    </Provider>
  )
};

export default Root;

