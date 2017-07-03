
import React, {Component} from "react";
import "./App.css";
import Header from "./header";
import Feed from "./feed";
import {fakeAuth} from "./route";
import CusButton from './component/button'
import { CusForm, FormRow, validateField, validateForm } from './component/form'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './actions/useraction'

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

  signup = (e) => {
    e.preventDefault()
    const { email, password } = this.state
    console.log('im here')

    this.props.actions.addUser({
      email,
      password
    })
  }

  render() {
    const {email, password, passwordc} = this.state.formErrors
    const { isFetching, error, user } = this.props
    return (
      <div>
        <span>Something should happen {
          isFetching? 'LOADING User': (
            !error? 'DONE': 'ERROR'
          )
        }</span>
        {user.length > 0 ? (
          <ul>
            {user.map((u, idx) => (
              <li key={idx}>{u.email}-{u.password}</li>
            ))}
          </ul>
          ) : null
        }
        <Header user="" logined={false}/>
        <section id="signup" className="container">
          <h1 className="text-center">Sign Up</h1>
          <div className="row">
            <div className="col-8 mx-auto cusform">
              <CusForm>
                <FormRow label="email" name="email" inputtype="email" onChange={this.handleInput} error={email}/>
                <FormRow label="password" name="password" inputtype="password" onChange={this.handleInput} error={password} />
                <FormRow onPaste={this.onPaste} label="Confirm password" name="passwordc" inputtype="password" onChange={this.handleInput} error={passwordc} />
                <CusButton color="primary" disabled={!this.state.formValid} className="btn-submit" onClick={this.signup}>Submit</CusButton>
              </CusForm>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
    // state from store to props
  console.log(state.users)
  return {
    user: state.users.user,
    isFetching: state.users.isFetching,
    error: state.users.error
  }
}

const mapDispatchToProps = (dispatch) => (
  // action from dispatch to store
  {
    actions: bindActionCreators(Actions, dispatch)
  }
)

export const TestSignup = Signup
export default connect(mapStateToProps, mapDispatchToProps)(Signup)
