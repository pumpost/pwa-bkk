import { room } from '../actions'

const INITIAL_STATE = {list: {}, selected: {}}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case room.ROOM_UPDATED:
      return Object.assign({}, state, { selected: action.payload.data } )
    case room.FETCH_ROOMS:
      return Object.assign({}, state, { list: action.payload.data } )
    default:
      return state
  }
}