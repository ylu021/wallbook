import React, { Component } from 'react'
import './App.css'
import Header from './header'
import Feed from './feed'
import { fakeAuth } from './route';
import { Redirect } from 'react-router-dom'
import CusButton from './component/button'
import { CusForm, FormRow } from './component/form'


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
    }
  }
  login = () => {
    fakeAuth.authenticate(() => {
      if('redirect' in this.state) {
        this.setState({
          redirect: true,
        })
      }
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home' } }
    const { redirect } = this.state
    if(redirect) {
      return <Redirect to={ from } />
    }
    return (
      <div className="home">
        <Header user="" logined={false}/>
        <section id="login" className="container">
          <h1 className="text-center">Log In</h1>
          <div className="row">
            <div className="col-8 mx-auto cusform">
              <CusForm>
                <FormRow label="email" inputtype="email"/>
                <FormRow label="password" inputtype="password"/>
                <CusButton className="btn-login" onClick={this.login} color="primary">Login</CusButton>
              </CusForm>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
