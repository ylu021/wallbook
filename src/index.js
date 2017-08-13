import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from 'react-redux'
import Store from './store'
import { Routes } from './route'
import { persistStore, createPersistor } from 'redux-persist'
import { asyncSessionStorage } from 'redux-persist/storages'


const storeInstance = Store()
export const persistor = persistStore(storeInstance, {
  storage: asyncSessionStorage,
  whitelist: ['sessions', 'posts']
}, () => {
  console.log('rehydration complete')
})

// export const persistor = createPersistor(storeInstance)

ReactDOM.render(
  <Provider store={ storeInstance }>
    <Routes><App /></Routes>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
