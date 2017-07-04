import types from '../constant'

const initialState = {
  isFetching: false,
  error: false,
  added: false,
  done: false,
}
export default(state = initialState, action) => {
  switch(action.type) {
    case `${types.ADD_USER}_LOADING`:
      console.log('loading')
      return {
        added: false,
        isAdding: true,
        done: false
      }
    case `${types.ADD_USER}_SUCCESS`:
      return {
        added: action.payload.added,
        isAdding: false,
        done: true
      }
    case `${types.ADD_USER}_ERROR`:
      return {
        error: action.payload,
        isAdding: false,
        done: false
      }

    case `${types.ADD_AVATAR}_LOADING`:
      console.log('loading')
      return {
        addedAvatar: false,
        isAdding: true,
        done: false
      }
    case `${types.ADD_AVATAR}_SUCCESS`:
      return {
        added: true,
        addedAvatar: action.payload.added,
        isAdding: false,
        done: true
      }
    case `${types.ADD_AVATAR}_ERROR`:
      return {
        error: action.payload,
        isAdding: false,
        done: false
      }
    default:
      return state
  }
}
