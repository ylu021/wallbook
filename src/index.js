import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux'
import Store from './store'
import { Routes } from './route';

// ReactDOM.render(
//   <Routes>
//     <App/>
//   </Routes>
//   , document.getElementById('root'));

const storeInstance = Store()

ReactDOM.render(
  <Provider store={ storeInstance }>
    <Routes><App /></Routes>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
