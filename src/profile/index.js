import React, { Component } from 'react'
import CusButton from '../component/button'
import { Link } from 'react-router-dom'
import { withRouter, Redirect } from 'react-router-dom'
import { fakeAuth } from '../route';

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
        {/* <CusButton color="primary" onClick={this.signout}>{'Sign Out'}</CusButton> */}
      </ProfileSection>
    )
  }
}

const LoginForm = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <ProfileSection>
      <span>User logined</span>
      <CusButton color="primary" onClick={
        () => (fakeAuth.signout(() => {
          localStorage.clear()  
          history.push('/')
        }))
      }>{'Sign Out'}</CusButton>
    </ProfileSection>
  ) : (
    <ProfileSection>
      <Link to={'/login'}><CusButton color="primary">{'Log In'}</CusButton></Link>{' '}
      <Link to={'/signup'}><CusButton color="primary">{'Sign Up'}</CusButton></Link>
    </ProfileSection>
  )
))

// class LoginForm extends Component {
//   render() {
//     return (
//       <ProfileSection>
//         <Link to={'/login'}><CusButton color="primary">{'Log In'}</CusButton></Link>{' '}
//         <Link to={'/signup'}><CusButton color="primary">{'Sign Up'}</CusButton></Link>
//       </ProfileSection>
//     )
//   }
// }

export default Profile
