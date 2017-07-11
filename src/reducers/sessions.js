import types from '../constant'

const initialState = {
  token: '',
  fetched: true,
  user: {}
}
export default(state = initialState, action) => {
  switch(action.type) {
    case `${types.FETCH_USER}_SUCCESS`:
      return {
        user: action.payload.user,
        fetched: action.payload.fetched || state.fetched
      }
    case `${types.FETCH_USER}_ERROR`:
      return {
        error: action.payload,
        fetched: action.payload.fetched
      }
    default:
      return state
  }
}
