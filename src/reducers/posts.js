import types from '../constant'
import _ from 'lodash'
import merge from 'merge'

const initialState = {
  posts: {},
  done: false,
  isAdding: false,
  added: false
}
export default(state = initialState, action) => {
  switch(action.type) {
    case `${types.ADD_POST}_LOADING`:
      return {
        ...state,
        isAdding: true,
      }
    case `${types.ADD_POST}_SUCCESS`:
      // state.posts.append(action.payload.post)
      // console.log('added', posts)
      posts = state.posts
      console.log(_.size(posts), action.payload.post)
      posts[_.size(posts)] = action.payload.post
      console.log(posts)
      return {
        isAdding: false,
        added: action.payload.added,
        posts: posts
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
      let posts = state.posts
      posts = _.map(posts, function(post) {
          return _.merge(post, _.find(action.payload.posts, { 'id' : +post.id }));
      })
      state.posts = posts
      // console.log('loading success', posts)
      return {
        ...state,
        done: true,
        posts: posts
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
