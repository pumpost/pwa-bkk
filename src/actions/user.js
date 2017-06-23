import firebase from 'firebase'

export const SIGNIN = 'SIGNIN'

export function signin(info) {
  return dispatch => {

    const ref = firebase.database().ref('users/' + info.uid)

    ref.onDisconnect().update({
      status: 'offline'
    })

    ref.set(info, () => {
      dispatch({
        type: SIGNIN,
        payload: { data: info }
      })
    })
  }
}