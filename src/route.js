import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  withRouter,
} from 'react-router-dom'
import { Switch, Route } from 'react-router'

import Header from './header'
import Home from './home'
import Login from './login'
import Signup from './signup'
import Verification from './verification'
// import Verified from './verification/verified'
import Loading from './component/loading'
import Verified from './verification/confirmation'

let user = {}

export const Routes = (props) => (
  <Router {...props}>
    <div>
      <Header user={fakeAuth.isAuthenticated}/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/verify/:token" component={Verified} />
        <Route exact path="/verify" component={Verification} />
        <PrivateRoute2 path="/login" component={Login}/>
        <PrivateRoute2 path="/signup" component={Signup}/>
        <PrivateRoute path="/home" component={Home}/>
      </Switch>
    </div>
  </Router>
)

export const fakeAuth = {
  isAuthenticated: !!sessionStorage.getItem('auth'),
  authenticate(user, cb) {
    this.isAuthenticated = true
    this.user = user
    sessionStorage.setItem('auth', JSON.stringify(user))
    // console.log('inside authenticate')
    // setTimeout(cb, 100) // fake async
    cb()

  },
  signout(cb) {
    this.isAuthenticated = false
    sessionStorage.removeItem('auth')
    // sessionStorage.clear()
    console.log('inside signout')
    // setTimeout(cb, 100) // fake async
    cb()
  }
}

console.log(!!sessionStorage.getItem('auth'))

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
