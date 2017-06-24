import React , { Component } from 'react'
import { connect } from 'react-redux'

class PreGame extends Component {

  render() {
    return (
      <div>
        PreGame
      </div>
    );
  }
}

export default connect()(PreGame)