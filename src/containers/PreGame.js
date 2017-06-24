import React , { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { room } from '../actions'

class PreGame extends Component {

  constructor(props) {
    super(props)
    this.battlefield = Array(25).fill().map(()=> 0)
    this.shipState   = []
    this.state = {
      shipPosition: ''
    }

    this.handleShipPosition = this.handleShipPosition.bind(this)
    this.handleOK = this.handleOK.bind(this)
    this.handleRollback = this.handleRollback.bind(this)

    props.roomUpdated(this.props.room.id, (data) => {
      console.log(data)
    })
  }

  handleShipPosition(event) {
    this.setState({
      shipPosition: event.target.value
    })
  }

  handleOK() {

  }

  handleRollback() {
    
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleShipPosition} value={this.state.shipPosition} />
        <button onClick={this.handleRollback}>back</button>
        <button onClick={this.handleOK}>OK</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    room: state.room.selected
  }
}

export default connect(mapStateToProps, {
  roomUpdated: room.roomUpdated,
  setPlay: room.setPlay,
  setShip: room.setShip
})(PreGame)