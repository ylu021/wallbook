import React, { Component } from 'react';
import './App.css';
import Header from './header';
import Feed from './feed';
import { Routes } from './route';
import {
  BrowserRouter as Router,
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    )
  }
}

export default App
