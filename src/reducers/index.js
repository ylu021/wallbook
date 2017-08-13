import users from './users'
import sessions from './sessions'
import posts from './posts'
import { combineReducers } from 'redux'
import types from '../constant'

const appReducer = combineReducers({
  users,
  sessions,
  posts
})

const rootReducer = (state, action) => {
  if (action.type === types.LOGOUT_USER) {
    console.log('old state', state)
    // const { posts } = state
    // state = {
    //   posts
    // } // i dont want it gone
    console.log('new state', state)
  }

  return appReducer(state, action)
}
// const initialState = rootReducer({}, {})

export default rootReducer
