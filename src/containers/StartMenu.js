import React , { Component } from 'react'
import firebase from 'firebase'

export default class StartGame extends Component {

  constructor(props) {
    super(props)
    this.provider = new firebase.auth.FacebookAuthProvider();
    this.facebookLogin = this.facebookLogin.bind(this)
  }

  facebookLogin() {
    firebase.auth().signInWithPopup(this.provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.facebookLogin}>Login</button>
      </div>
    );
  }
}