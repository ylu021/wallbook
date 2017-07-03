import types from '../constant'

const initialState = {
  isFetching: false,
  error: false,
  user: []
}
export default(state = initialState, action) => {
  switch(action.type) {
    case `${types.ADD_USER}_LOADING`:
      console.log('loading')
      return {
        user: [],
        isFetching: true
      }
    case `${types.ADD_USER}_SUCCESS`:
      return {
        user: action.payload,
        isFetching: false,
      }
    case `${types.ADD_USER}_ERROR`:
      return {
        error: action.payload,
        isFetching: false,
      }
    default:
      return state
  }
}
