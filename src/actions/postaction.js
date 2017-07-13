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

export const fetchPostsAuth = () => {
  return {
    type: types.FETCH_POSTS_AUTH,
    payload: {
      promise: api.fetchPostsAuth()
    }
  }
}

export const fetchLiked = (postid) => {
  return {
    type: types.USER_LIKED,
    payload: {
      promise: api.fetchLiked(postid)
    }
  }
}
