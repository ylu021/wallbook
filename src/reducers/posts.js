import types from '../constant'
import _ from 'lodash'
import merge from 'merge'

const initialState = {
  posts: {},
  done: false,
  isAdding: false,
  // added: false
}
export default(state = initialState, action) => {
  switch(action.type) {
    case `${types.ADD_POST}_LOADING`:
      return {
        ...state,
        isAdding: true,
      }
    case `${types.ADD_POST}_SUCCESS`:
      return {
        isAdding: false,
        added: action.payload.added,
        posts: action.payload.posts
      }
    case `${types.ADD_POST}_ERROR`:
      return {
        ...state,
        isAdding: false,
        error: action.payload,
        added: action.payload.added,
      }
    case `${types.FETCH_POSTS}_SUCCESS`:
      return {
        ...state,
        posts: action.payload.posts
      }
    case `${types.FETCH_POSTS}_ERROR`:
      return {
        posts: {},
        error: action.payload
      }
    case `${types.FETCH_POSTS_AUTH}_SUCCESS`:
      return {
        done: true,
        posts: action.payload.posts
      }
    case `${types.FETCH_POSTS_AUTH}_ERROR`:
      return {
        error: action.payload
      }
    case `${types.LIKE_POST}_ERROR`:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
