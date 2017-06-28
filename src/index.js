import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes } from './route';
import {
  BrowserRouter as Router,
} from 'react-router-dom'

ReactDOM.render(
  <Routes>
    <App/>
  </Routes>
  , document.getElementById('root'));
registerServiceWorker();
