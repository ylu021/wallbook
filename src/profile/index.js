import React, { Component } from 'react'
import CusButton from '../component/button'
import { ProfileImg, Img } from '../component/usercomponent'
import { Link } from 'react-router-dom'
import { withRouter, Redirect } from 'react-router-dom'
import { fakeAuth } from '../route';
import styled from 'styled-components'
import { Nav, NavItem } from 'reactstrap'
import FeedForm from '../feed/feed_form'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/useraction'
import ReactDOM from 'react-dom'
import _ from 'lodash'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      logined: !!sessionStorage.getItem('auth'),
      showPostForm: false
    }
  }

  componentDidMount() {
    // using token to load user info
    this.props.actions.fetchUser()
  }

  post = () => {
    this.setState({
      showPostForm: true
    })
  }

  render() {
    const { user, fetched, logined } = this.props
    console.log('inside profile', this.props)
    if(logined && Object.keys(user).length===0) {
      // end up calling fetch inside render
      this.props.actions.fetchUser()
    }
    return (
        logined ? (
          <div>
            <ProfileSection className={'d-flex'}>
              <FeedForm />
              <User user={user} />
            </ProfileSection>
          </div>
        ) : (
          <ProfileSection>
              <BoldCusLink to={'/login'}>{'Log In'}</BoldCusLink>
              <CusLink to={'/signup'}>{'Sign Up'}</CusLink>
          </ProfileSection>
        )
    )
  }
}

const ProfileSection = (props) => {
  const className = 'pl-2 my-auto '+props.className
  return (
    <div className={ className }>
      { props.children }
    </div>
    )
}

const Fixed = styled.div`
  position: fixed;
  background: white;
  padding: 1rem 0;
  border: 1px solid #EFF2F7;
  border-radius: 5px;
  right: 1.5rem;
`

const Span = styled.span`
  font-size: 1.2rem;
  padding: 3px 1.5rem;
  color: rgba(0,0,0,.4);
`

const BoldSpan = Span.extend`
  font-weight: 500;
  font-size: 1.4rem;
  color: inherit;
`

class UserPre extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showOption: false
    }
  }
  componentWillMount() {
    document.addEventListener('click', this.hideOption, true)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.hideOption, true)
  }
  showOption = () => {
    this.setState({
      showOption: true
    })
  }
  hideOption = (e) => {
    console.log('in here')
    const domNode = ReactDOM.findDOMNode(this)
    if(!domNode || !domNode.contains(e.target)) {
      this.setState({
        showOption: false
      })
    }
  }

  render() {
    const { showOption } = this.state
    const { username, avatar, email } = this.props.user
    return (
      <ProfileSection>
        {/* <CusButton color="#E5E9F2">Post on wall</CusButton> */}
        <ProfileImg onMouseEnter={ this.showOption }>
        {/* <ProfileImg> */}
          <Img src={ avatar } />
        </ProfileImg>
        {showOption?
          <Fixed>
            <div className='d-flex flex-column'>
              <BoldSpan>{ username }</BoldSpan>
              <Span>{ email }</Span>
            </div>
            <div className='dropdown-divider'></div>
            <div className='d-flex'>
              <BoldCusLink to='' onClick={
                () => (fakeAuth.signout(() => {
                  return <Redirect to={'/'} />
                }))
              }>{'Sign Out'}</BoldCusLink>
            </div>
          </Fixed>
        : null}

      </ProfileSection>
    )
  }
}

const User = withRouter(UserPre)

User.PropTypes = {
  user: PropTypes.object.required
}

const CusLink = styled(Link)`
  color: #333;
  font-size: 14px;
  font-size: 1.4rem;
  margin-right: 1rem;
`

const BoldCusLink = CusLink.extend`
  font-weight: 600;
  color: #FF0322;
  padding: 3px 1.5rem;
`

const mapStateToProps = (state, props) => {
    // state from store to props
    console.log('sessions', state.sessions)
  return {
    fetched: state.sessions.fetched,
    user: state.sessions.user
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
