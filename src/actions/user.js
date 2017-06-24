import firebase from 'firebase'

export const SIGNIN = 'SIGNIN'
export const FETCH_PLAYERS = 'FETCH_PLAYERS'

export function signin(info, callback=null) {
  return dispatch => {

    const ref = firebase.database().ref('users/' + info.uid)

    ref.onDisconnect().update({
      status: 'offline'
    })

    ref.set({
      displayName: info.displayName,
      email: info.email,
      photoURL: info.photoURL,
      status: 'online',
      uid: info.uid
    }, () => {
      if (callback) callback()
      dispatch({
        type: SIGNIN,
        payload: { data: info }
      })
    })
  }
}

export function fetchPlayers() {
  return dispatch => {
    firebase.database().ref('users').on('value', function(snapshot) {
      dispatch({
        type: FETCH_PLAYERS,
        payload: { data: snapshot.val() }
      })
    })
  }
}