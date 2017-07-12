import types from '../constant'

const initialState = {
  token: '',
  fetched: false,
  isFetching: false,
  user: {},
  isAdding: false,
  added: false
}
export default(state = initialState, action) => {
  switch(action.type) {
    case `${types.FETCH_USER}_LOADING`:
      return {
        ...state,
        isFetching: true,
      }
    case `${types.FETCH_USER}_SUCCESS`:
      return {
        ...state,
        user: action.payload.user,
        isFetching: false,
        fetched: action.payload.fetched
      }
    case `${types.FETCH_USER}_ERROR`:
      return {
        user: {},
        isFetching: false,
        error: action.payload,
        fetched: action.payload.fetched,
      }
    case `${types.ADD_POST}_LOADING`:
      return {
        user: state.user,
        isAdding: true,
      }
    case `${types.ADD_POST}_SUCCESS`:
      return {
        user: state.user,
        isAdding: false,
        added: action.payload.added
      }
    case `${types.ADD_POST}_ERROR`:
      return {
        isAdding: false,
        error: action.payload,
        added: action.payload.added,
      }
    default:
      return state
  }
}
