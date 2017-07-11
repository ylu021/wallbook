import users from './users'
import sessions from './sessions'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  users,
  sessions
})

export default rootReducer
