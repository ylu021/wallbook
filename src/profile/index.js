import React, { Component } from 'react';
import Button from '../component/button';

class Profile extends Component {
  render() {
    return (
      <div>
        { this.props.user? <User /> : <LoginForm />}
      </div>
    );
  }
}

const ProfileSection = (props) => {
  return (
    <div className="profile">
      {props.children}
    </div>)
}

class User extends Component {
  render() {
    return (
      <ProfileSection>User logined</ProfileSection>
    )
  }
}

class LoginForm extends Component {
  render() {
    return (
      <ProfileSection>
        <Button text='Login'/>
        <Button text='Sign Up'/>
      </ProfileSection>
    )
  }
}

export default Profile;
