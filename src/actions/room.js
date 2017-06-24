import firebase from 'firebase'

export const JOIN_ROOM = 'JOIN_ROOM'
export const ROOM_UPDATED = 'ROOM_UPDATED'
export const FETCH_ROOMS = 'FETCH_ROOMS'

export function joinRoom(room, callback=null) {
  return dispatch => {

    const ref = firebase.database().ref('rooms/' + room.id)

    ref.set(room, () => {
      callback()
      dispatch({
        type: JOIN_ROOM
      })
    })
  }
}

export function fetchRooms() {
  return dispatch => {
    firebase.database().ref('rooms').on('value', function(snapshot) {
      dispatch({
        type: FETCH_ROOMS,
        payload: { data: snapshot.val() }
      })
    })
  }
}