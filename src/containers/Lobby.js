import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import { user, room } from '../actions'

class Lobby extends Component {

  componentWillMount() {
    this.props.fetchPlayers()
    this.createRoom = this.createRoom.bind(this)
  }

  createRoom() {
    const roomId = this.guid()
    const roomInfo = {
      roomId,
      roomName: this.props.user.displayName,
      owner: this.props.user,
      joiner: null,
      ready: 0
    }
    this.prop.createRoom(roomInfo, () => {
      browserHistory.push('/room/' + roomId)
    })
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  render() {
    return (
      <div>
        <button onClick={this.createRoom}>Create Room</button>
        {
          Object.keys(this.props.players).map(key => {
            return (
              <div key={key}>
                <Link to={`/room/${key}`}>{ this.props.players[key].displayName }</Link>
              </div>
            )
          })
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    players: state.user.players
  }
}

export default connect(mapStateToProps, {fetchPlayers: user.fetchPlayers, createRoom: room.createRoom})(Lobby)