import React, { Component } from 'react'
import './App.css'
import Header from './header'
import Feed from './feed'
import { fakeAuth } from './route';
import { Redirect } from 'react-router-dom'
import CusButton from './component/button'
import { CusForm, FormRow, validateField, validateForm } from './component/form'


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      formValid: false,
      email: '',
      password: '',
      formErrors: {
        email: false,
        password: false,
      },
    }
  }
  handleInput = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value.trim(),
    })
    validateField(this.state, name, value, (res) => {
      this.setState({
        formErrors: res,
      })
      validateForm('login', this.state, (res)=>{
        this.setState({
          formValid: res
        })
      })
    })
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
    const {email, password} = this.state.formErrors
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
                <FormRow label="email" name="email" inputtype="email" onChange={this.handleInput} error={email}/>
                <FormRow label="password" name="password" inputtype="password" onChange={this.handleInput} error={password}/>
                <CusButton className="btn-login" onClick={this.login} color="primary" disabled={!this.state.formValid}>Login</CusButton>
              </CusForm>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
