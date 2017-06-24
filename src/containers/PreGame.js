import React , { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { room } from '../actions'

import imgPlayer from '../images/player.png'

import b1 from '../images/effect-bomb/b1.png'
import b2 from '../images/effect-bomb/b3.png'
import b3 from '../images/effect-bomb/b3.png'
import b4_horizon from '../images/effect-bomb/b4-horizon.png'
import b4_vertical from '../images/effect-bomb/b4-vertical.png'

class PreGame extends Component {

  constructor(props) {
    super(props)
    this.battlefield = Array(25).fill().map(()=> 0)
    this.shipState   = []
    this.shipLeft    = 1
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

  handleClickField(eleLeft, eleTop) {
    const widthHeight = document.getElementById('slot1').offsetWidth
    const left = widthHeight * eleLeft
    const top  = widthHeight * eleTop
    var d1 = document.getElementById('battle-field');
    const img = `<img src='${imgPlayer}' style='width: ${widthHeight}px; height: ${widthHeight*2-30}px; position: absolute; top: ${top}px; left: ${left}px;' />`
    d1.insertAdjacentHTML('beforeend', img);
  }

  render() {
    return (
      <div className="water-wrap" id="battle-field">
        <img src={imgPlayer} className="ex-ship" alt="player" />
        <div className="player" id="slot1" onClick={ () => this.handleClickField(0, 0) }><span>1</span></div>
        <div className="player" onClick={ () => this.handleClickField(1, 0) }><span>2</span></div>
        <div className="player" onClick={ () => this.handleClickField(2, 0) }><span>3</span></div>
        <div className="player" onClick={ () => this.handleClickField(3, 0) }><span>4</span></div>
        <div className="player" onClick={ () => this.handleClickField(4, 0) }><span>5</span></div>
        {/*<!-- 6 -->*/}
        <div className="player" onClick={ () => this.handleClickField(0, 1) }><span>6</span></div>
        <div className="player" onClick={ () => this.handleClickField(1, 1) }><span>7</span></div>
        <div className="player" onClick={ () => this.handleClickField(2, 1) }><span>8</span></div>
        <div className="player" onClick={ () => this.handleClickField(3, 1) }><span>9</span></div>
        <div className="player" onClick={ () => this.handleClickField(4, 1) }><span>10</span></div>
        {/*<!-- 11 -->*/}
        <div className="player" onClick={ () => this.handleClickField(0, 2) }><span>11</span></div>
        <div className="player" onClick={ () => this.handleClickField(1, 2) }><span>12</span></div>
        <div className="player" onClick={ () => this.handleClickField(2, 2) }><span>13</span></div>
        <div className="player" onClick={ () => this.handleClickField(3, 2) }><span>14</span></div>
        <div className="player" onClick={ () => this.handleClickField(4, 2) }><span>15</span></div>
        {/*<!-- 16 -->*/}
        <div className="player" onClick={ () => this.handleClickField(0, 3) }><span>16</span></div>
        <div className="player" onClick={ () => this.handleClickField(1, 3) }><span>17</span></div>
        <div className="player" onClick={ () => this.handleClickField(2, 3) }><span>18</span></div>
        <div className="player" onClick={ () => this.handleClickField(3, 3) }><span>19</span></div>
        <div className="player" onClick={ () => this.handleClickField(4, 3) }><span>20</span></div>
        {/*<!--  21-->*/}
        <div className="player" onClick={ () => this.handleClickField(0, 3) }><span>21</span></div>
        <div className="player" onClick={ () => this.handleClickField(1, 3) }><span>22</span></div>
        <div className="player" onClick={ () => this.handleClickField(2, 3) }><span>23</span></div>
        <div className="player" onClick={ () => this.handleClickField(3, 3) }><span>24</span></div>
        <div className="player" onClick={ () => this.handleClickField(4, 3) }><span>25</span></div>

        {/*<div className="ship-wrap">*/}
          {/*<div className="b b1"><img src={b1} alt={b1} /></div>*/}
          {/*<div className="b b2"><img src={b2} alt={b2} /></div>*/}
          {/*<div className="b b3"><img src={b3} alt={b3} /></div>*/}
          {/*<div className="b b4"><img src={b4_horizon} alt={b4_horizon} /></div>*/}
        {/*</div>*/}

        {/*<div className="ship-wrap">*/}
          {/*<div className="b b1"><img src={b1} alt={b1} /></div>*/}
          {/*<div className="b b2"><img src={b2} alt={b2} /></div>*/}
          {/*<div className="b b3"><img src={b3} alt={b3} /></div>*/}
          {/*<div className="b b4"><img src={b4_vertical} alt={b4_vertical} /></div>*/}
        {/*</div>*/}
        
        {/*<input type="text" onChange={this.handleShipPosition} value={this.state.shipPosition} />*/}
        <button className="btn-start btn-pre btn-rotate" onClick={this.handleRotate}>Rotate</button>
        <button className="btn-start btn-pre btn-back" onClick={this.handleRollback}>Back</button>
        <button className="btn-start btn-pre btn-ok" onClick={this.handleOK}>OK</button>
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