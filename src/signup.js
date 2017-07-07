
import React, {Component} from "react";
import "./App.css";
import PickUsername from './profile/pickusername'
import { StyledContent } from './home'
import {fakeAuth} from "./route";
import CusButton from './component/button'
import { CusForm, FormRow, validateField, validateForm } from './component/form'
import Loading from './component/loading'
import _ from 'lodash'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './actions/useraction'
import PropTypes from 'prop-types'

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
    const { isAdding, error, added, done } = this.props
    if(isAdding) {
      return (
        <div>
          <Section>
            <Loading />
          </Section>
        </div>
      )
    }
    if(added) {
      console.log('inside added a user',this.state.email)
      return (
        <div>
          <PickUsername
            email={this.state.email}
          />
        </div>
      )
    }else {
      return (
        <div>
          <StyledContent>
            <section id="signup" className="container">
              <h1 className="text-center">Sign Up</h1>
              <div className="row">
                <FormWrapper className="col-md-6 col-xs-8 mx-auto">
                  <CusForm>
                    <FormRow label="email" name="email" inputtype="email" onChange={this.handleInput} error={email}/>
                    <FormRow label="password" name="password" inputtype="password" onChange={this.handleInput} error={password} />
                    <FormRow onPaste={this.onPaste} label="Confirm password" name="passwordc" inputtype="password" onChange={this.handleInput} error={passwordc} />
                    <CusButton color="primary" disabled={!this.state.formValid} className="btn-submit" onClick={this.signup}>Submit</CusButton>
                    <div className='mt-2'>
                      <Span>{
                        isAdding? 'Signing up': (
                          !error? null: 'Error signing up, please try again'
                        )
                      }</Span>
                      {
                        done && !added ? (
                          <Span>This email is registered</Span>
                        ) : null
                      }
                    </div>
                  </CusForm>
                </FormWrapper>
              </div>
            </section>
          </StyledContent>
        </div>
      )
    }
  }
}

export const FormWrapper = styled.div`
  margin: 3rem 1.5rem;
  border: 1px solid #F1F0F0;
  background: white;
`

const Span = styled.span`
  font-size: 1.8rem;
  color: coral;
`

export const Section = styled.section`
  padding-top: 15%;
`

const mapStateToProps = (state, props) => {
    // state from store to props
  console.log(state.users)
  return {
    added: state.users.added,
    done: state.users.done,
    isAdding: state.users.isAdding,
    error: state.users.error
  }
}

const mapDispatchToProps = (dispatch) => (
  // action from dispatch to store
  {
    actions: bindActionCreators(Actions, dispatch)
  }
)

Signup.PropTypes = {
  added: PropTypes.boolean,
  isAdding: PropTypes.boolean,
  error: PropTypes.boolean,
  actions: PropTypes.function
}

export const TestSignup = Signup
export default connect(mapStateToProps, mapDispatchToProps)(Signup)
