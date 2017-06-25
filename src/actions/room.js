import firebase from 'firebase'

export const SET_ROOM     = 'SET_ROOM'
export const JOIN_ROOM    = 'JOIN_ROOM'
export const LEAVE_ROOM   = 'LEAVE_ROOM'
export const FETCH_ROOMS  = 'FETCH_ROOMS'
export const SET_SHIP     = 'SET_SHIP'
export const PUSH_ACTION  = 'PUSH_ACTION'
export const FIRE_UPDATED = 'FIRE_UPDATED'
export const END_GAME     = 'END_GAME'
export const SET_WINNER   = 'SET_WINNER'

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
          uid: user.uid,
          hp: 8
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
        payload: { data: { type: type, field: battlefield } }
      })
    })
  }
}

export function fireUpdated(roomId, callback='') {
  return dispatch => {
    const namespace = 'rooms/' + roomId + '/fire'
    firebase.database().ref(namespace).off('child_added')
    firebase.database().ref(namespace).on('child_added', function(snapshot) {
      const data = snapshot.val()
      if (callback) callback(data)
      dispatch({
        type: FIRE_UPDATED
      })
    })
  }
}

export function turnAction(roomId, type, num) {
  return dispatch => {
    const ref = firebase.database().ref('rooms/' + roomId)
    ref.child('fire').push().set({[type]: num}, () => {
      dispatch({
        type: PUSH_ACTION
      })
    })
  }
}

export function onEndGame(roomId, callback=null) {
  return dispatch => {
    const namespace = 'rooms/' + roomId + '/winner'
    firebase.database().ref(namespace).off('value')
    firebase.database().ref(namespace).on('value', function(snapshot) {
      const data = snapshot.val()
      if (callback) callback(data)
      dispatch({
        type: END_GAME,
      })
    })
  }
}

export function setWinner(roomId, type) {
  return dispatch => {
    const ref = firebase.database().ref('rooms/' + roomId + '/winner')
    ref.set(type, () => {
      dispatch({
        type: SET_WINNER
      })
    })
  }
}