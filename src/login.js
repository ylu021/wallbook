import React, { Component } from 'react'
import './App.css'
import Header from './header'
import Feed from './feed'
import { fakeAuth } from './route';
import { Redirect } from 'react-router-dom'
import CusButton from './component/button'
import Loading from './component/loading'
import { CusForm, FormRow, validateField, validateForm } from './component/form'
import Span from './component/span'
import Verification from './verification'
import { FormWrapper } from './signup'
import { StyledContent } from './home'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './actions/useraction'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
  login = (e) => {
    e.preventDefault()
    const {emailerr, passworderr} = this.state.formErrors
    const { email, password, formValid } = this.state
    if(formValid && !emailerr && !passworderr) {
      console.log('calling')
      this.props.actions.loginUser({
        email,
        password
      })
    }
    // fakeAuth.authenticate(() => {
    //   if('redirect' in this.state) {
    //     this.setState({
    //       redirect: true,
    //     })
    //   }
    // })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home' } }
    const { redirect } = this.state
    const {email, password} = this.state.formErrors
    const { isLoggingin, error, logined, done, message, verified, user } = this.props
    if(isLoggingin) {
      return (<Loading text='Logging In' />)
    }
    if(logined) {
      fakeAuth.authenticate(user, () => {
        // console.log('redirecting to', fakeAuth.isAuthenticated)
      })
      return <Redirect to={ from } />
    }
    else {
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
                    <div className='mt-2'>
                      {message? (
                        <Span>
                          {message+' '}
                          {!verified? (<Link to='/verify'>verify here</Link>): null}
                        </Span>) : null}
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

const mapStateToProps = (state, props) => {
    // state from store to props
    console.log(state.users)
  return {
    logined: state.users.logined,
    done: state.users.done,
    isLoggingin: state.users.isLoggingin,
    error: state.users.error,
    message: state.users.message,
    verified: state.users.verified,
    user: state.users.user
  }
}

const mapDispatchToProps = (dispatch) => (
  // action from dispatch to store
  {
    actions: bindActionCreators(Actions, dispatch)
  }
)

Login.PropTypes = {
  logined: PropTypes.boolean,
  isLoggingin: PropTypes.boolean,
  error: PropTypes.boolean,
  actions: PropTypes.function,
  verified: PropTypes.boolean
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
