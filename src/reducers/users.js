import types from '../constant'

export const initialState = {
  isFetching: false,
  error: false,
  added: false,
  done: false,
  emailSent: false,
  isSending: false,
  isVerfied: false,
  isVerifying: false,
  logined: false,
  isLoggingin: false,
  message: ''
}
export default(state = initialState, action) => {
  switch(action.type) {
    case `${types.ADD_USER}_LOADING`:
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
        ...state,
        addedAvatar: false,
        isAdding: true,
        done: false
      }
    case `${types.ADD_AVATAR}_SUCCESS`:
      return {
        ...state,
        added: true,
        addedAvatar: action.payload.added,
        emailSent: action.payload.emailSent,
        isAdding: false,
        done: true
      }
    case `${types.ADD_AVATAR}_ERROR`:
      return {
        error: action.payload,
        isAdding: false,
        done: false
      }
    case `${types.SEND_EMAIL}_LOADING`:
      return {
        ...state,
        isSending: true,
        done: false
      }
    case `${types.SEND_EMAIL}_SUCCESS`:
      return {
        ...state,
        emailSent: action.payload.emailSent,
        isSending: false,
        done: true
      }
    case `${types.SEND_EMAIL}_ERROR`:
      return {
        error: action.payload,
        isSending: false,
        done: false
      }
    case `${types.VERIFY_EMAIL}_LOADING`:
      return {
        done: false,
        isVerifying: true
      }
    case `${types.VERIFY_EMAIL}_SUCCESS`:
      return {
        isVerified: action.payload.isVerified,
        isVerifying: false,
        done: true
      }
    case `${types.VERIFY_EMAIL}_ERROR`:
      return {
        error: action.payload,
        done: false
      }
    case `${types.LOGIN_USER}_LOADING`:
      return {
        logined: false,
        isLoggingin: true,
        done: false,
      }
    case `${types.LOGIN_USER}_SUCCESS`:
      return {
        logined: action.payload.logined,
        message: action.payload.message,
        verified: action.payload.verified,
        exist: action.payload.exist,
        isLoggingin: false,
        user: action.payload.user,
        done: true
      }
    case `${types.LOGIN_USER}_ERROR`:
      return {
        error: action.payload,
        isLoggingin: false,
        done: false
      }
    default:
      return state
  }
}
