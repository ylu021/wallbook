import { createStore } from 'redux'
import rootReducer from '../reducers'

export default(initState) => {
  return createStore(rootReducer, initState)
}
