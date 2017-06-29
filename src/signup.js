
import React, {Component} from 'react';
import './App.css';
import Header from './header';
import Feed from './feed';
import {fakeAuth} from './route';


class Signup extends Component {
  render() {
    return (
      <div id="signup">
        <Header user="" logined={false}/>
        Signup
      </div>
    )
  }
}

export default Signup
