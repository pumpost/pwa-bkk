import firebase from 'firebase'

export const SET_ROOM     = 'SET_ROOM'
export const JOIN_ROOM    = 'JOIN_ROOM'
export const LEAVE_ROOM   = 'LEAVE_ROOM'
export const FETCH_ROOMS  = 'FETCH_ROOMS'
export const SET_SHIP     = 'SET_SHIP'
export const PUSH_ACTION  = 'PUSH_ACTION'

export function createRoom(room, callback=null) {
  return dispatch => {
    const ref = firebase.database().ref('rooms/' + room.id)

    ref.onDisconnect().remove()

    ref.set(room, () => {
      if (callback) callback()
      dispatch({
        type: SET_ROOM,
        payload: { data: room }
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
      if (!currentData.joiner) {
        currentData.joiner = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid
        }
        return currentData
      } else {
        return // Abort the transaction.
      }
    }, function(error, committed) {
      callback = callback || function() {}
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

export function roomUpdated(roomId, callback=null) {
  return dispatch => {
    firebase.database().ref('rooms/' + roomId).off('value')
    firebase.database().ref('rooms/' + roomId).on('value', function(snapshot) {
      const data = snapshot.val()
      if (callback) callback(data)
      dispatch({
        type: SET_ROOM,
        payload: { data: data }
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

export function setReady(roomId, type) {
  return dispatch => {
    const ref = firebase.database().ref('rooms/' + roomId)

    ref.transaction(function(currentData) {
      if (currentData) {
        currentData[type].ready = true
        currentData.ready++
        return currentData
      } else {
        return // Abort the transaction.
      }
    }, function(error, committed, snapshot) {
      dispatch({
        type: SET_ROOM,
        payload: { data: snapshot.val() }
      })
    })
  }
}

export function setShip(roomId, battlefield, type) {
  return dispatch => {
    const ref = firebase.database().ref('rooms/' + roomId)
    ref.update({
      [type]: battlefield
    }, () => {
      dispatch({
        type: SET_SHIP,
      })
    })
  }
}

export function turnAction(roomId, type, num) {
  return dispatch => {
    const ref = firebase.database().ref('rooms/' + roomId + '/' + type + 'Fire')
    ref.push(num, () => {
      dispatch({
        type: PUSH_ACTION,
      })
    })
  }
}