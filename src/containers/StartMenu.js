import React , { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'

import { user } from '../actions'

class StartGame extends Component {

  constructor(props) {
    super(props)
    this.facebookLogin = this.facebookLogin.bind(this)
    this.provider = new firebase.auth.FacebookAuthProvider()
  }

  facebookLogin() {
    firebase.auth().signInWithPopup(this.provider).then((result) => {
      console.log(result)
      const info = {
        token: result.credential.accessToken,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        uid: result.user.uid,
        status: 'online'
      }
      this.props.signin(info).then(() => {
        console.log(11)
      })
    }).catch((error) => {
      // console.log(error.message)
      // var errorCode = error.code
      // var errorMessage = error.message
      // var email = error.email
      // var credential = error.credential
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.facebookLogin}>Login</button>
      </div>
    )
  }
}

export default connect(null, { signin: user.signin })(StartGame)