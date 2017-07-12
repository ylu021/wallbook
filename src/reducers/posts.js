import types from '../constant'

const initialState = {
  liked: false,
  likes: 0,
  posts: {}
}
export default(state = initialState, action) => {
  switch(action.type) {
    case `${types.FETCH_POSTS}_SUCCESS`:
      return {
        posts: action.payload.posts
      }
    case `${types.FETCH_POSTS}_ERROR`:
      return {
        posts: {},
        error: action.payload
      }
    case `${types.LIKE_POST}_SUCCESS`:
      return {
        ...state,
        liked: action.payload.liked,
        likes: action.payload.likes
      }
    case `${types.LIKE_POST}_ERROR`:
      return {
        ...state,
        error: action.payload,
        liked: action.payload.liked
      }
    default:
      return state
  }
}
