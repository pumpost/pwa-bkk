import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { user } from '../actions'

class Lobby extends Component {

  componentWillMount() {
    this.props.fetchPlayers()
  }

  render() {
    return (
      <div>
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
    players: state.user.players
  }
}

export default connect(mapStateToProps, {fetchPlayers: user.fetchPlayers})(Lobby)