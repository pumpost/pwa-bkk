import React , { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { room } from '../actions'

import rock_g from '../images/rock-g.png'
import rock_g2 from '../images/rock-g2.png'

class Lobby extends Component {

  componentWillMount() {
    this.props.fetchRooms()

    this.createRoom = this.createRoom.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
  }

  createRoom() {
    const roomInfo = {
      id: this.props.user.uid,
      owner: {
        displayName: this.props.user.displayName,
        photoURL: this.props.user.photoURL,
        uid: this.props.user.uid,
        hp: 8
      },
      joiner: null,
      ready: 0,
      winner: null
    }

    this.props.createRoom(roomInfo, () => {
      browserHistory.push('/room/' + roomInfo.id)
    })
  }

  joinRoom(roomId) {
    this.props.joinRoom(roomId, this.props.user, (status) => {
      if (status) {
        browserHistory.push('/room/' + roomId)
      } else {
        console.log('fail.')
      }
    })
  }

  renderRoomList() {
    if (this.props.rooms) {
      return Object.keys(this.props.rooms).map(key => {
        return (
          <li key={key}>
            <a onClick={() => {this.joinRoom(key)}}>{ this.props.rooms[key].owner.displayName }</a>
          </li>
        )
      })
    } else {
      return ''
    }
  }

  render() {
    return (
      <div className="home lobby-wrap">

          <div className="btn-wrap">
            <div className="btn-gress btn-back">Back</div>
          </div>
          <button onClick={this.createRoom} className="btn-gress btn-createroom">Create Room</button>
          <h1><img src={rock_g} alt="" />Lobby<img src={rock_g2} /></h1>

          <input type="text" placeholder="Search" className="searchroom" />
          <div className="lobby">
            <ul>
              { this.renderRoomList() }
            </ul>
          </div>
       
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    rooms: state.room.list
  }
}

export default connect(mapStateToProps, {
  fetchRooms: room.fetchRooms,
  createRoom: room.createRoom,
  joinRoom: room.joinRoom
})(Lobby)