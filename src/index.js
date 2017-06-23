import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import firebase from 'firebase'

import App from './App'
import reducers from './reducers'
import registerServiceWorker from './registerServiceWorker'

import './index.css'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

const config = {
  apiKey: "AIzaSyBRAxIT3zdKQHvUlpa2-nrVH1dyswDCj8I",
  authDomain: "pwa-bkk.firebaseapp.com",
  databaseURL: "https://pwa-bkk.firebaseio.com",
  projectId: "pwa-bkk",
  storageBucket: "pwa-bkk.appspot.com",
  messagingSenderId: "102756528266"
}

firebase.initializeApp(config)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
