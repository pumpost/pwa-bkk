import { combineReducers } from 'redux'
import userReducer from './userReducer'
import roomReducer from './roomReducer'

const rootReducer = combineReducers({
  user: userReducer,
  room: roomReducer
})

export default rootReducer
