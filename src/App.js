import React, { Component } from 'react';
import './App.css';
import Header from './header';
import Feed from './feed';
import { Routes } from './route';
import {
  BrowserRouter as Router,
} from 'react-router-dom'

function App(props) {
  console.log(props.children)
  return (
      <div className="App">
        <Header user='' logined={false}/>
        {React.Children.toArray(props.children)}
      </div>
  )
}

export default App
