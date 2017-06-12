import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { Switch, Route } from 'react-router'

import Home from './home'

export const Routes = (props) => (
  <Router {...props}>
    <Switch>
      <Route path="/" component={Home}/>
    </Switch>
  </Router>
);
