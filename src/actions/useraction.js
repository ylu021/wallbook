import types from '../constant'
import getUsers from '../api'

export const addUser = (user) => {
  console.log('calling action add user')
  return {
    type: types.ADD_USER,
    payload: {
        promise: getUsers(), // a promise
        user: user // optional data object for optimistic update
    }
  }
}
// (
//   {
//     type: types.ADD_USER,
//     user: {
//         promise: getUsers(), // a promise
//         data: user // optional data object for optimistic update
//     }
//   }
// )
