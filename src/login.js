import React, { Component } from 'react'
import './App.css'
import Header from './header'
import Feed from './feed'
import { fakeAuth } from './route';
import { Redirect } from 'react-router-dom'
import CusButton from './component/button'
import { CusForm, FormRow, validateField, validateForm } from './component/form'
import { FormWrapper } from './signup'
import { StyledContent } from './home'


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
      <div>
        <StyledContent>
          <section id="login" className="container">
            <h1 className="text-center">Log In</h1>
            <div className="row">
              <FormWrapper className="col-md-6 mx-auto">
                <CusForm>
                  <FormRow label="email" name="email" inputtype="email" onChange={this.handleInput} error={email}/>
                  <FormRow label="password" name="password" inputtype="password" onChange={this.handleInput} error={password}/>
                  <CusButton className="btn-login" onClick={this.login} color="primary" disabled={!this.state.formValid}>Login</CusButton>
                </CusForm>
              </FormWrapper>
            </div>
          </section>
        </StyledContent>
      </div>
    );
  }
}

export default Login;
