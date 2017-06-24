import React , { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { room } from '../actions'

class Room extends Component {

  constructor(props) {
    super(props)
    props.roomUpdated(this.props.params.roomId, (data) => {
      if (data.ready === 2) {
        browserHistory.push('/pre-game')
      }
    })
  }

  renderReadyBtn(roomId, type, ready) {
    if (ready) return ''

    return <button onClick={() => this.props.setReady(roomId, type, ready)}>Ready</button>
  }

  renderOwner() {
    if (!this.props.room.owner) return ''
    const owner = this.props.room.owner
    return (
      <div>
        {owner.displayName}
        {this.renderReadyBtn(this.props.room.id, 'owner', owner.ready)}
      </div>
    )
  }

  renderJoiner() {
    if (!this.props.room.joiner) return ''
    const joiner = this.props.room.joiner
    return (
      <div>
        {joiner.displayName}
        {this.renderReadyBtn(this.props.room.id, 'joiner', joiner.ready)}
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>
          { this.renderOwner() }
        </div>
        <div>VS</div>
        <div>
          { this.renderJoiner() }
        </div>
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
  setReady: room.setReady
})(Room)