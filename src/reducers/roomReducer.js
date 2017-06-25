import { room } from '../actions'

const INITIAL_STATE = {list: {}, selected: {}}

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case room.SET_ROOM:
      return Object.assign({}, state, { selected: action.payload.data } )
    case room.FETCH_ROOMS:
      return Object.assign({}, state, { list: action.payload.data } )
    case room.SET_SHIP:
      const data = JSON.parse(JSON.stringify(state.selected))
      data[action.payload.data.type] = action.payload.data.field
      return Object.assign({}, state, { selected: data } )
    case room.LEAVE_ROOM:
      return Object.assign({}, state, { selected: {} } )
    default:
      return state
  }
}