import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBRAxIT3zdKQHvUlpa2-nrVH1dyswDCj8I",
  authDomain: "pwa-bkk.firebaseapp.com",
  databaseURL: "https://pwa-bkk.firebaseio.com",
  projectId: "pwa-bkk",
  storageBucket: "pwa-bkk.appspot.com",
  messagingSenderId: "102756528266"
}

firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
