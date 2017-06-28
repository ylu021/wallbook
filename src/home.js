import React, { Component } from 'react';
import './App.css';
import Header from './header';
import Feed from './feed';
import { fakeAuth } from './route';


class Home extends Component {
  render() {
    console.log(fakeAuth.isAuthenticated)
    // this needs to be cached
    if(fakeAuth.isAuthenticated) {
      return (
        <div className="home">
          <p>Welcome user XXX</p>
          <Header user=""/>
          <Feed/>
        </div>
      )
    }
    return (
      <div className="home">
        <p>This is default homepage</p>
        <Header user=""/>
        <Feed/>
      </div>
    )
  }
}

export default Home;
