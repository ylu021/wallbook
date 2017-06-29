
import React, {Component} from 'react';
import './App.css';
import Header from './header';
import Feed from './feed';
import {fakeAuth} from './route';


class Home extends Component {
  render() {
    console.log('hello', localStorage.getItem('auth'))
    // this needs to be cached
    if(localStorage.getItem('auth')!==null) {
      // user
      return (
        <div className="home">
          <Header user="" logined={true}/>
          <p>Welcome user XXX</p>
          <Feed/>
        </div>
      )
    }

    return (
      <div className="home">
        <Header user="" logined={false}/>
        <p>Landing</p>
        <Feed/>
      </div>
    )
  }
}

export default Home
