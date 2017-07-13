import types from '../constant'
import _ from 'lodash'

const initialState = {
  clickLiked: false,
  newlikes: null,
  posts: {},
  done: false,
  likes: null,
  postid: null
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
      // let posts = state.posts
      // let merged = _.map(posts, function(post) {
      //     return _.merge(post, _.find(action.payload.postsLiked, { 'id' : +post.id }));
      // })
      // console.log('loading success', merged)
      return {
        ...state,
        posts: action.payload.posts
      }
    case `${types.FETCH_POSTS_AUTH}_ERROR`:
      return {
        error: action.payload
      }
    
    case `${types.LIKE_POST}_SUCCESS`:
      return {
        ...state,
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
