import types from '../constant'

const initialState = {
  token: '',
  fetched: false,
  isFetching: false,
  user: {}
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
    default:
      return state
  }
}
