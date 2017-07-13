import { compose, createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import { autoRehydrate } from 'redux-persist'

const loggerMiddleware = () => {
  return next => action => {
    if (process.env.NODE_ENV !== 'production') {
      const { type, payload, meta } = action

      console.groupCollapsed(type)
      console.log('Payload:', payload)
      console.log('Meta:', meta)
      console.groupEnd()
    }

    return next(action)
  }
}

export default(initState) => {
  return createStore(
    rootReducer, 
    initState, 
    compose(
      applyMiddleware(
        thunkMiddleware,
        promiseMiddleware({
          promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
        }),
        loggerMiddleware
      ),
      autoRehydrate()
    )
  )
}
