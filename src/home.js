import React, { Component } from 'react';
import './App.css';
import Header from './header';
import Feed from './feed';


class Home extends Component {
  render() {
    return (
      <div className="home">
        <Header user=""/>
        <Feed/>
      </div>
    );
  }
}

export default Home;
