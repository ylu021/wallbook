
import React, {Component} from "react";
import "./App.css";
import Header from "./header";
import Feed from "./feed";
import {fakeAuth} from "./route";
import CusButton from './component/button'
import { CusForm, FormRow, validateField, validateForm } from './component/form'
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
    validateField(this.state, name, value, (res) => {
      this.setState({
        formErrors: res,
      })
      validateForm('signup', this.state, (res)=>{
        this.setState({
          formValid: res
        })
      })
    })
  }
  onPaste = (e) => {
    e.preventDefault()
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
                <FormRow onPaste={this.onPaste} label="Confirm password" name="passwordc" inputtype="password" onChange={this.handleInput} error={passwordc} />
                <CusButton color="primary" disabled={!this.state.formValid} className="btn-submit">Submit</CusButton>
              </CusForm>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Signup
