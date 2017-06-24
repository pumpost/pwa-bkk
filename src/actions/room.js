import firebase from 'firebase'

export const CREATE_ROOM  = 'CREATE_ROOM'
export const JOIN_ROOM    = 'JOIN_ROOM'
export const LEAVE_ROOM   = 'LEAVE_ROOM'
export const ROOM_UPDATED = 'ROOM_UPDATED'
export const FETCH_ROOMS  = 'FETCH_ROOMS'

export function createRoom(room) {
  return dispatch => {
    const ref = firebase.database().ref('rooms/' + room.id)

    ref.set(room, () => {
      dispatch({
        type: CREATE_ROOM
      })
    })
  }
}


export function leaveRoom(roomId, callback=null) {
  return dispatch => {
    const ref = firebase.database().ref('rooms/' + roomId)
    ref.off("value")
    ref.update({
      joiner: null,
      ready: 0
    }, () => {
      if (callback) callback()
      dispatch({
        type: LEAVE_ROOM
      })
    })
  }
}

export function joinRoom(roomId, user, callback=null) {
  return dispatch => {
    const ref = firebase.database().ref('rooms/' + roomId)

    ref.transaction(function(currentData) {
      if (currentData.joiner === null) {
        return { joiner: user }
      } else {
        return // Abort the transaction.
      }
    }, function(error, committed) {
      callback = callback || () => {}
      if (error) {
        callback(false)
      } else if (!committed) {
        callback(false)
      } else {
        callback(true)
      }

      dispatch({
        type: JOIN_ROOM
      })
    })
  }
}

export function roomUpdated(roomId) {
  return dispatch => {
    firebase.database().ref('rooms/' + roomId).on('value', function(snapshot) {
      dispatch({
        type: ROOM_UPDATED,
        payload: { data: snapshot.val() }
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