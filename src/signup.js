
import React, {Component} from "react";
import "./App.css";
import Header from "./header";
import Feed from "./feed";
import {fakeAuth} from "./route";
import CusButton from './component/button'
import { CusForm, FormRow } from './component/form'
import _ from 'lodash'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formValid: false,
      email: '',
      password: '',
      passwordc: '',
      formErrors: {
        email: false,
        password: false,
        passwordc: false,
      },
    }
  }
  handleInput = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value.trim(),
    })
    this.validateField(name, value)
  }
  validateField = (name, value) => {
    let formErrors = this.state.formErrors
    console.log(formErrors);
    switch(name) {
      case 'email':
        formErrors['email'] = !(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value)
        break
      case 'password':
        formErrors['password'] = !(value.length >= 8)
        break
      case 'passwordc':
        formErrors['passwordc'] = !(this.state.password === value)
      default:
        break
    }
    this.setState({
      formErrors: formErrors,
    })

    this.validateForm()
  }
  validateForm = () => {
    const formErrors = {
      email: false,
      password: false,
      passwordc: false,
    }
    if(this.state.email && this.state.password && this.state.passwordc) {
      this.setState({
        formValid: _.isEqual(formErrors, this.state.formErrors),
      })
    }
  }
  render() {
    const {email, password, passwordc} = this.state.formErrors
    return (
      <div>
        <Header user="" logined={false}/>
        <section id="signup" className="container">
          <h1 className="text-center">Sign Up</h1>
          <div className="row">
            <div className="col-8 mx-auto cusform">
              <CusForm>
                <FormRow label="email" name="email" inputtype="email" onChange={this.handleInput} error={email}/>
                <FormRow label="password" name="password" inputtype="password" onChange={this.handleInput} error={password} />
                <FormRow label="Confirm password" name="passwordc" inputtype="password" onChange={this.handleInput} error={passwordc} />
                <CusButton color="primary" disabled={!this.state.formValid}>Submit</CusButton>
              </CusForm>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Signup
