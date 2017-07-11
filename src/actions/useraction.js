import types from '../constant'
import * as api from '../api'

export const addUser = (user) => {
  return {
    type: types.ADD_USER,
    payload: {
      promise: api.addUser(user),
      added: user // optimal update added user
    }
  }
}

export const addAvatar = (user) => {
  return {
    type: types.ADD_AVATAR,
    payload: {
      promise: api.addAvatar(user),
      addedAvatar: user // optimal update added user
    }
  }
}

export const sendEmail = (email) => {
  return {
    type: types.SEND_EMAIL,
    payload: {
      promise: api.sendEmail(email),
      emailSent: true // optimal update added user
    }
  }
}

export const verifyEmail = (token) => {
  return {
    type: types.VERIFY_EMAIL,
    payload: {
      promise: api.verifyEmail(token),
      isVerified: true // optimal update added user
    }
  }
}

export const loginUser = (user) => {
  return {
    type: types.LOGIN_USER,
    payload: {
      promise: api.loginUser(user),
      logined: true // optimal login user
    }
  }
}

export const fetchUser = ()=> {
  return {
    type: types.FETCH_USER,
    payload: {
      promise: api.fetchUser()
    }
  }
}
// get user not add user
// export const addUser = (user) => {
//   console.log('calling action add user')
//   return {
//     type: types.ADD_USER,
//     payload: {
//         promise: api.getUsers(), // a promise
//         user: user // optional data object for optimistic update
//     }
//   }
// }