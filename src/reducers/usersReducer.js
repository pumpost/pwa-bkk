import { user } from '../actions'

export default function (state = {}, action) {
  console.log(action)
  switch(action.type) {
    case user.SIGNIN:
      return Object.assign({}, state, action.payload.data)
    default:
      return state
  }
}