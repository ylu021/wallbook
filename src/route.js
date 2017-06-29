import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  withRouter,
} from 'react-router-dom'
import { Switch, Route } from 'react-router'

import Home from './home'
import Login from './login'
import Signup from './signup'

export const Routes = (props) => (
  <Router {...props}>
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute2 path="/login" component={Login}/>
      <PrivateRoute2 path="/signup" component={Signup}/>
      <PrivateRoute path="/home" component={Home}/>
    </Switch>
  </Router>
)

export const fakeAuth = {
  isAuthenticated: localStorage.getItem('auth') || false,
  authenticate(cb) {
    this.isAuthenticated = true
    localStorage.setItem('auth', true)
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    localStorage.clear()
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

const PrivateRoute2 = ({component: Component, ...rest }) => {
  return (
    <Route {...rest} render={ props => (
      fakeAuth.isAuthenticated? (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location}
        }}/>
      ) : (
        <Component {...props} />
      )
    )}/>
  )
}
