import { room } from '../actions'

const INITIAL_STATE = {list: {}, selected: {}}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case room.SET_ROOM:
      return Object.assign({}, state, { selected: action.payload.data } )
    case room.FETCH_ROOMS:
      return Object.assign({}, state, { list: action.payload.data } )
    case room.LEAVE_ROOM:
      return Object.assign({}, state, { selected: {} } )
    default:
      return state
  }
}