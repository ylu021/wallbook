import React, {Component} from 'react';
import PropTypes from 'prop-types'
import * as Actions from '../actions/useraction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import CusButton from '../component/button'
import Title from '../component/title'
import { CusForm, FormRow, validateField, validateForm } from '../component/form'
import _ from 'lodash'
import { avatars, firstName, lastName } from '../constant'
import { ProfileImg } from '../feed'
import { Redirect } from 'react-router-dom'

const getRandomName = () => _.sample(firstName)+_.sample(lastName)

class PickUsername extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      avatar: avatars[Math.floor(avatars.length / 2)]
    }
  }

  getRandomName = (e) => {
    e.preventDefault()
    this.setState({
      username: getRandomName()
    })
  }

  pickAvatar = (e) => {
    e.preventDefault()
    console.log('clicked', e.target.src)
    this.setState({
      avatar: e.target.src.split('/').slice(-1)[0]
    })
  }

  handleInput = (e) => {
    console.log('in handle input', e.target.value)
    this.setState({
      username: e.target.value
    })
  }

  submitUsername = (e) => {
    e.preventDefault()
    console.log('submit', this.state.username)
    if(this.props.hasOwnProperty('email')) {
      // it is a proper registered user
      this.props.actions.addAvatar({
        email: this.props.email,
        avatar: this.state.avatar,
        username: this.state.username
      })
    }
  }

  render() {
    const { email } = this.props
    if(this.props.done && this.props.addedAvatar) {
      console.log('im redirecting')
      // redirect to login page
      setTimeout(()=>{
        return <Redirect to='/' />
      }
      , 3000)
    }
    return (
      <div>
        <Section id='pickusername' className='container'>
          <div className='row'>
            <FormWrapper className='col-8 mx-auto'>
              <InfoTitle>You are registered! </InfoTitle>
              <H2 className='text-center'>Now choose an avatar and pick a username</H2>
              <div className='d-flex justify-content-center'>{avatars.map((avatar, idx) => {
                let active = false
                if(avatar==this.state.avatar) {
                  active = true
                }
                return <AvatarSelector active={active} img={avatar} key={idx} onClick={this.pickAvatar} />
              })}</div>
              <CusForm>
                <FormRow 
                  placeholder={''} 
                  name='username' 
                  inputtype='text'
                  onChange={this.handleInput} 
                  defaultValue={this.state.username}
                  inputRef={input => this.inputUsername = input }
                />
                <div className='d-flex justify-content-center'>
                  <CusButton onClick={ this.getRandomName }>Generate</CusButton>
                  {this.state.username? (
                    <CusButton color={'#8db600'} className="ml-5" onClick={this.submitUsername}>{'Submit'}</CusButton>
                  ) : null}
                </div>
              </CusForm>
            </FormWrapper>
          </div>
        </Section>
      </div>
    )
  }
}

const InfoTitle = Title.extend`
  font-size: 1.8rem;
  color: #FF0322;
`

const H2 = Title.extend`
  color: #9B9B9B;
  font-size: 2.0rem;
`

const Section = styled.section`
  padding-top: 20%;
`

const FormWrapper = styled.div`
  padding: 3em 1em 1em;
  margin: 1.5rem 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Avatar = ProfileImg.extend`
  text-align: center;
  margin: 1rem 0.5rem;
  border-radius: 50%;
  border: 5px solid #fff;
  width: 70px;
  height: 70px;
  &:hover {
    border: 5px solid rgba(255, 3, 34, 0.71);
  }
`

const ActiveAvatar = Avatar.extend`
  border: 5px solid #FF0322;
`

const AvatarSelector = (props) => {
  const { img, ...others } = props
  if(props.active) {
    return (
      <ActiveAvatar {...others}>
        <img src={img} />
      </ActiveAvatar>
    )
  }
  return (
    <Avatar {...others}>
      <img src={img} />
    </Avatar>
  )
}

PickUsername.PropTypes = {
  email: PropTypes.string
}

AvatarSelector.PropTypes = {
  img: PropTypes.string,
  active: PropTypes.boolean
}

const mapStateToProps = (state, props) => {
    // state from store to props
  console.log(state.users)
  return {
    addedAvatar: state.users.addedAvatar,
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

export const TestPickUsername = PickUsername
export default connect(mapStateToProps, mapDispatchToProps)(PickUsername)
