import React, { Component } from 'react';
import Button from '../component/button';

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        { this.props.user? <User /> : <LoginForm />}
      </div>
    );
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
