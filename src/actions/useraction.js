import types from '../constant'
import * as api from '../api'

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

export const addUser = (user) => {
    return {
      type: types.ADD_USER,
      payload: {
        promise: api.addUser(user),
        added: user // optimal update added user
      }
    }
}
