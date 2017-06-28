import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  withRouter,
} from 'react-router-dom'
import { Switch, Route } from 'react-router'

import Home from './home'
import Login from './login'

export const Routes = (props) => (
  <Router {...props}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login}/>
      <PrivateRoute path="/home" component={Home}/>
    </Switch>
  </Router>
);

export const fakeAuth = {
  isAuthenticated: localStorage.getItem('auth') || false,
  authenticate(cb) {
    this.isAuthenticated = true
    cb()
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) // fake async
  }
}

const PrivateRoute = ({component: Component, ...rest }) => (
  <Route {...rest} render={ props => (
    fakeAuth.isAuthenticated? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location}
      }}/>
    )
  )}/>
)
