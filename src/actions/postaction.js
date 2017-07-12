import types from '../constant'
import * as api from '../api'

export const likePost = (post) => {
  return {
    type: types.LIKE_POST,
    payload: {
      promise: api.likePost(post)
    }
  }
}

export const fetchPosts = () => {
  return {
    type: types.FETCH_POSTS,
    payload: {
      promise: api.fetchPosts()
    }
  }
}
