import types from '../constant'
import _ from 'lodash'

const initialState = {
  posts: {},
  done: false
}
export default(state = initialState, action) => {
  switch(action.type) {
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
      let posts = state.posts
      posts = _.map(posts, function(post) {
          return _.merge(post, _.find(action.payload.posts, { 'id' : +post.id }));
      })
      state.posts = posts
      console.log('loading success', posts)
      return {
        ...state,
        done: true
        // posts: action.payload.posts
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
