import React , { Component } from 'react'
import { connect } from 'react-redux'
// import { browserHistory } from 'react-router'

import { room } from '../actions'

class Game extends Component {

  constructor(props) {
    super(props)

    this.state = {
      ownerClass: "show",
      joinerClass: "hidden",
      ownerFire: '',
      joinerFire: ''
    }

    this.userType = 'owner'
    if (this.props.room.id !== this.props.user.uid) {
      this.userType = 'joiner'
    }

    this.toggleHidden = this.toggleHidden.bind(this)
    this.renderOwnerTurn  = this.renderOwnerTurn.bind(this)
    this.renderJoinerTurn = this.renderJoinerTurn.bind(this)
    this.fire = this.fire.bind(this)
    this.handleOwnerFire = this.handleOwnerFire.bind(this)
    this.handleJoinerFire = this.handleJoinerFire.bind(this)

    this.props.fireUpdated(this.props.room.id, (data) => {
      if (data.owner) {

      } else if (data.joiner) {

      }

      this.toggleHidden()
    })

  }

  fire(type) {
    if (type === 'owner') {
      this.props.turnAction(this.props.room.id, type, this.state.ownerFire)
    } else {
      this.props.turnAction(this.props.room.id, type, this.state.joinerFire)
    }
    this.setState({
      ownerFire: '',
      joinerFire: ''
    })
  }

  handleOwnerFire(e) {
    this.setState({
      ownerFire: e.target.value
    })
  }

  handleJoinerFire(e) {
    this.setState({
      joinerFire: e.target.value
    })
  }

  toggleHidden() {
    const ownerClass = (this.state.ownerClass === "hidden") ? "show" : "hidden"
    const joinerClass = (this.state.joinerClass === "hidden") ? "show" : "hidden"
    this.setState({
      ownerClass: ownerClass,
      joinerClass: joinerClass
    })
  }

  renderOwnerTurn() {
    let shotBtn = <button onClick={ () => this.fire('owner') }>Fire</button>
    if (this.userType === 'joiner') shotBtn = ''
    return (
      <div className={this.state.ownerClass}>
        1 <input type="text" onChange={this.handleOwnerFire} value={this.state.ownerFire} /> {shotBtn}
      </div>
    )
  }

  renderJoinerTurn() {
    let shotBtn = <button onClick={ () => this.fire('joiner') }>Fire</button>
    if (this.userType === 'owner') shotBtn = ''
    return (
      <div className={this.state.joinerClass}>
        2 <input type="text" onChange={this.handleJoinerFire} value={this.state.joinerFire}/> {shotBtn}
      </div>
    )
  }

  render() {
    return (
      <div>
        <br />
        <br /><br /><br /><br /><br /><br /><br /><br />
        Game
        {this.renderOwnerTurn()}
        {this.renderJoinerTurn()}
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
  turnAction: room.turnAction,
  fireUpdated: room.fireUpdated
})(Game)