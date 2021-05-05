import React , { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { room } from '../actions'
import flag2 from '../images/flag2.png'
import imgplayer from '../images/player.png'
import enemy from '../images/enemy.png'
import sword from '../images/sword.png'

class Room extends Component {

  constructor(props) {
    super(props)
    this.noti = true
    props.roomUpdated(this.props.params.roomId, (data) => {
      // if (data && data.joiner && data.joiner.uid !== this.props.user.uid && this.noti) {
      //   this.userJoinedNotification(data.joiner)
      // }
      if (data && data.ready === 2) {
        browserHistory.push('/pre-game')
      }
    })
  }

  userJoinedNotification(joiner) {
    if (Notification.permission !== "granted")  return
    var options = {
      body: 'เตรียมพร้อมลุยย !!',
      icon: sword
    }

    var n = new Notification(joiner.displayName + ' has been joined!!', options);
    setTimeout(n.close.bind(n), 5000);
    this.noti = false
  }

  renderReadyBtn(roomId, type, ready) {
    if (ready) return ''

    return <button className="btn-start" onClick={() => this.props.setReady(roomId, type, ready)}>Ready</button>
  }

  renderOwner() {
    if (!this.props.room || !this.props.room.owner) return ''
    const owner = this.props.room.owner

    return (
      <div className="room-ship-player p1">
        <img src={imgplayer} alt="player" />
        <p>{owner.displayName}</p>
        {this.renderReadyBtn(this.props.room.id, 'owner', owner.ready)}
      </div>
    )
  }

  renderJoiner() {
    if (!this.props.room || !this.props.room.joiner) return ''
    const joiner = this.props.room.joiner
    return (
      <div className="room-ship-player p2">
        <img src={enemy} alt="enemy" />
        <p>{joiner.displayName}</p>
        {this.renderReadyBtn(this.props.room.id, 'joiner', joiner.ready)}
      </div>
    )
  }

  render() {
    return (
      <div className="home">
        <h1 className="room-title"><img src={flag2} alt="flag" /> Room <img src={flag2} alt="flag" /></h1>
        <h2 className="room-title">
          <span className="w w1">w</span>
          <span className="w w2">a</span>
          <span className="w w3">i</span>
          <span className="w w4">t</span>
          <span className="w w5">i</span>
          <span className="w w6">n</span>
          <span className="w w7">g</span>
          <span className="w w8">.</span>
          <span className="w w9">.</span>
        </h2>

        <div className="room-ship">
          { this.renderOwner() }
          <p className="vs"><span>--</span> VS <span>--</span></p>
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
