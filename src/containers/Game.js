import React , { Component } from 'react'
import { connect } from 'react-redux'
// import { browserHistory } from 'react-router'

import { room } from '../actions'
import GameGridLayout from '../components/GameGridLayout'

import imgPlayer from '../images/player.png'
import imgEnemy from '../images/enemy.png'
import effBomb1 from '../images/effect-bomb/b1.png'
import effBomb2 from '../images/effect-bomb/b2.png'
import effBomb3 from '../images/effect-bomb/b3.png'
import eff4horizon from '../images/effect-bomb/b4-horizon.png'
import eff4vertical from '../images/effect-bomb/b4-vertical.png'

class Game extends Component {

  constructor(props) {
    super(props)

    this.state = {
      ownerClass: "show",
      joinerClass: "hidden",
      ownerFire: '',
      joinerFire: ''
    }

    this.toggleHidden = this.toggleHidden.bind(this)
    this.renderOwnerTurn  = this.renderOwnerTurn.bind(this)
    this.renderJoinerTurn = this.renderJoinerTurn.bind(this)
    this.fire = this.fire.bind(this)
    this.handleOwnerFire = this.handleOwnerFire.bind(this)
    this.handleJoinerFire = this.handleJoinerFire.bind(this)

    if (this.props.room.id !== this.props.user.uid) {
      this.userType   = 'joiner'
      this.joinerShip = this.props.room.joinerField
      this.ownerShip  = ''
    } else {
      this.userType = 'owner'
      this.ownerShip  = this.props.room.ownerField
      this.joinerShip = ''
    }

    this.props.onEndGame(this.props.room.id, (data) => {
      if (!data) return

      if (data.owner) {
        console.log(this.props.room.joinerField)
      } else if (data.joiner) {
        console.log(this.props.room.ownerField)
      }

      this.toggleHidden()
    })

    this.props.fireUpdated(this.props.room.id, (data) => {
      if (!data) return
      if (data.owner) {
        console.log(this.props.room.joinerField)
      } else if (data.joiner) {
        console.log(this.props.room.ownerField)
      }

      this.toggleHidden()
    })

  }

  handleSelectTarget(position, e) {

    let x = document.getElementsByClassName("player")
    for (let i = 0; i < x.length; i++) {
      x[i].style.border = '1px solid rgb(141, 218, 241)'
    }

    e.currentTarget.style.border = '2px solid red'
    console.log(position)
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
    let shotBtn = <button className="btn-start btn-pre btn-ok btn-shoot" onClick={ () => this.fire('owner') }>Fire</button>
    let handleSelectTarget = this.handleSelectTarget
    if (this.userType === 'joiner') {
      shotBtn = ''
      handleSelectTarget = () => {}
    }

    return (
      <div className={this.state.ownerClass}>
        <div className="player-info">
          <img src={imgPlayer} className="" alt={imgPlayer} />
          {/*&nbsp;Timer: <span className="red">10</span> sec*/}
          &nbsp;{this.props.room.owner.displayName} Turn!!
        </div>
        <GameGridLayout
          ship={this.joinerShip}
          shipImg={imgEnemy}
          fieldId="joinerField"
          handleSelectTarget={handleSelectTarget}
        />
        {shotBtn}
      </div>
    )
  }

  renderJoinerTurn() {
    let shotBtn = <button className="btn-start btn-pre btn-ok btn-shoot btn-enemy" onClick={ () => this.fire('joiner') }>Fire</button>
    let handleSelectTarget = this.handleSelectTarget
    if (this.userType === 'owner') {
      shotBtn = ''
      handleSelectTarget = () => {}
    }
    return (
      <div className={this.state.joinerClass}>
        <div className="player-info enemy-turn">
          <img src={imgEnemy} className="" alt={imgEnemy} />
          &nbsp;{this.props.room.joiner.displayName} Turn!!
        </div>
        <GameGridLayout
          ship={this.ownerShip}
          shipImg={imgPlayer}
          fieldId="ownerField"
          handleSelectTarget={handleSelectTarget}
        />
        {shotBtn}
      </div>
    )
  }

  render() {
    return (
      <div className="water-wrap game">


        {this.renderOwnerTurn()}
        {this.renderJoinerTurn()}

        {/*<div className="ship-wrap add-bomb">*/}
          {/*<div className="b b1"><img src={effBomb1} alt={effBomb1} /></div>*/}
          {/*<div className="b b2"><img src={effBomb2} alt={effBomb2} /></div>*/}
          {/*<div className="b b3"><img src={effBomb3} alt={effBomb3} /></div>*/}
          {/*<div className="b b4"><img src={eff4horizon} alt={eff4horizon} /></div>*/}
        {/*</div>*/}

        {/*<div className="ship-wrap">*/}
          {/*<div className="b b1"><img src={effBomb1} alt={effBomb1} /></div>*/}
          {/*<div className="b b2"><img src={effBomb2} alt={effBomb2} /></div>*/}
          {/*<div className="b b3"><img src={effBomb3} alt={effBomb3} /></div>*/}
          {/*<div className="b b4"><img src={eff4vertical} alt={eff4vertical} /></div>*/}
        {/*</div>*/}

        {/*<div className="btn-start btn-pre btn-ok btn-shoot">Shoot</div>*/}

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
  fireUpdated: room.fireUpdated,
  onEndGame: room.onEndGame,
  setWinner: room.setWinner
})(Game)