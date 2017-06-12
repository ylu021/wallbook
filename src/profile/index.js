import React, { Component } from 'react';
import { Button } from '../component/button';

class Profile extends Component {
  render() {
    return (
      <div className="home">
        {this.props.user? <User /> : <LoginForm />}
      </div>
    );
  }
}

class User extends Component {
  render() {
    return (
      <div>User logined</div>
    )
  }
}

class LoginForm extends Component {
  render() {
    return (
      <div>
        <Button text='Login'/>
        <Button text='Sign Up'/>
      </div>
    )
  }
}

export default Profile;
