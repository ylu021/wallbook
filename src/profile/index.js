import React, { Component } from 'react'
import CusButton from '../component/button'
import { Link } from 'react-router-dom'
import { withRouter, Redirect } from 'react-router-dom'
import { fakeAuth } from '../route';
import styled from 'styled-components'

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        { this.props.logined? <User /> : <LoginForm />}
      </div>
    )
  }
}

const ProfileSection = (props) => {
  return (
    <div>
      {props.children}
    </div>)
}

class User extends Component {
  render() {
    return (
      <ProfileSection>
        <LoginForm />
      </ProfileSection>
    )
  }
}

const CusLink = styled(Link)`
  color: #333;
  font-size: 14px;
  font-size: 1.4rem;
  margin-right: 1rem;
`

const BoldCusLink = CusLink.extend`
  font-weight: 500;
`

const LoginForm = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <ProfileSection>
      <span>User logined</span>{' '}
      <BoldCusLink to='' onClick={
        () => (fakeAuth.signout(() => {
          localStorage.clear()
          history.push('/')
        }))
      } bold>{'Sign Out'}</BoldCusLink>

    </ProfileSection>
  ) : (
    <ProfileSection>

        <BoldCusLink to={'/login'}>{'Log In'}</BoldCusLink>
        <CusLink to={'/signup'}>{'Sign Up'}</CusLink>

    </ProfileSection>
  )
))

export default Profile
