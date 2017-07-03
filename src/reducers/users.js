import types from '../constant'

const initialState = {}
export default(state = initialState, action) => {
  switch(action.type) {
    case types.ADD_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}
