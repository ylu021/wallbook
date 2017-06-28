import React, { Component } from 'react'
import './App.css'
import Header from './header'
import Feed from './feed'
import { fakeAuth } from './route';
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
    }
  }
  login = () => {
    fakeAuth.authenticate(() => {
      localStorage.setItem('auth', true)
      this.setState({
        redirect: true,
      })
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home' } }
    const { redirect } = this.state
    if(localStorage.getItem('auth')!==null) {
      return <Redirect to={'/'} />
    }
    if(redirect) {
      return <Redirect to={ from } />
    }
    return (
      <div className="home">
        <Header user=""/>
        <Feed/>
        <Button className="btn-login" onClick={this.login} color="primary">Login</Button>
      </div>
    );
  }
}

export default Login;
