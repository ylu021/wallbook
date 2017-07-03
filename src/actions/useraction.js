import types from '../constant'

export const addUser = (user) => (
  {
    type: types.ADD_USER,
    user
  }
)
