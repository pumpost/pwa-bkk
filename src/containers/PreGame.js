import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { user } from '../actions'

class PreGame extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div>
        PreGame
      </div>
    );
  }
}

export default connect()(PreGame)