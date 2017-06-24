import React , { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { room } from '../actions'

class PreGame extends Component {

  constructor(props) {
    super(props)
    this.battlefield = Array(25).fill().map(()=> 0)
    this.shipState   = []
    this.shipLeft    = 4
    this.state = {
      shipPosition: ''
    }

    this.handleShipPosition = this.handleShipPosition.bind(this)
    this.handleOK = this.handleOK.bind(this)
    this.handleRollback = this.handleRollback.bind(this)

    this.userType = 'owner'
    if (this.props.room.id !== this.props.user.uid) {
      this.userType = 'joiner'
    }

    this.fieldType = this.userType + 'Field'

    props.roomUpdated(this.props.room.id, (data) => {
      if (data.ownerField && data.joinerField) {
        browserHistory.push('/game')
      }
    })
  }

  handleShipPosition(event) {
    this.setState({
      shipPosition: event.target.value
    })
  }

  handleOK() {
    this.setState({
      shipPosition: ''
    })
    const position = this.state.shipPosition.split(",")
    const shipNum  = this.shipLeft
    position.forEach((num) => {
      this.battlefield[num] = shipNum
    })
    this.shipState.push(position)

    this.shipLeft--
    if (this.shipLeft <= 0) {
      this.props.setShip(this.props.room.id, this.battlefield, this.fieldType)
    }
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
  setShip: room.setShip
})(PreGame)