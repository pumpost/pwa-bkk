import { user } from '../actions'

const INITIAL_STATE = {players: {}, user: {}}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case user.SIGNIN:
      return Object.assign({}, state, { user: action.payload.data } )
    case user.FETCH_PLAYERS:
      return Object.assign({}, state, { players: action.payload.data } )
    default:
      return state
  }
}