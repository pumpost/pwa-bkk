import React , { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { browserHistory } from 'react-router'

import { user } from '../actions'
// import StartMenuLayout from '../components/Layout/StartMenuLayout'
import ButttonStartMenu from '../components/Button/ButtonStartMenu'

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
      }
      this.props.signin(info, () => {
        browserHistory.push('/lobby')
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
      <div className="home">
        <h1><img src="images/gress8.png" />Pirate of PWA<img src="images/gress8.png" /></h1>
        <h2><img src="images/flag-b.png" /></h2>
        <ButttonStartMenu btnName="Single Mode" icName="ship" />
        <ButttonStartMenu btnName="VS Player" icName="sword" facebookLogin={this.facebookLogin} />
        <ButttonStartMenu btnName="Score" icName="coin" />
      </div>
    )
  }
}

export default connect(null, { signin: user.signin })(StartGame)