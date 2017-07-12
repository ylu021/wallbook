import users from './users'
import sessions from './sessions'
import posts from './posts'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  users,
  sessions,
  posts
})

export default rootReducer
