import React, { Component } from 'react'
import CusButton from '../component/button'
import { Link } from 'react-router-dom'
import { withRouter, Redirect } from 'react-router-dom'
import { fakeAuth } from '../route';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/useraction'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
  }

  componentWillMount() {
    // using token to load user info
    const { username } = JSON.parse(sessionStorage.getItem('auth'))
    if(username) {
      this.setState({
        username
      })
      this.props.actions.fetchUser(username)
    }
    
  }
  render() {
    const { username } = this.state
    return (
      <div className="profile">
        <LoginForm username={username} />
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

/*const LoginForm = withRouter(({ history }) => {
  return (
    fakeAuth.isAuthenticated ? (
    <ProfileSection>
      <span>User logined</span>{' '}
      <BoldCusLink to='' onClick={
        () => (fakeAuth.signout(() => {
          localStorage.clear()
          history.push('/')
        }))
      }>{'Sign Out'}</BoldCusLink>

    </ProfileSection>
  ) : (
    <ProfileSection>

        <BoldCusLink to={'/login'}>{'Log In'}</BoldCusLink>
        <CusLink to={'/signup'}>{'Sign Up'}</CusLink>

    </ProfileSection>
      )
  )
})*/

const LoginPreform = (props) => {
  const { history } = props
  const { username } = JSON.parse(sessionStorage.getItem('auth')) || ''
  return(
    fakeAuth.isAuthenticated ? (
    <ProfileSection>
      <span>{username}</span>{' '}
      <BoldCusLink to='' onClick={
        () => (fakeAuth.signout(() => {
          localStorage.clear()
          history.push('/')
        }))
      }>{'Sign Out'}</BoldCusLink>

    </ProfileSection>
  ) : (
    <ProfileSection>

        <BoldCusLink to={'/login'}>{'Log In'}</BoldCusLink>
        <CusLink to={'/signup'}>{'Sign Up'}</CusLink>

    </ProfileSection>
      )
  )
}

const LoginForm = withRouter(LoginPreform)

const mapStateToProps = (state, props) => {
    // state from store to props
    console.log(state.users)
  return {
    user: state.users.user
  }
}

const mapDispatchToProps = (dispatch) => (
  // action from dispatch to store
  {
    actions: bindActionCreators(Actions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
// export default Profile