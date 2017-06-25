import React , { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { room } from '../actions'

import imgPlayer from '../images/player.png'

class PreGame extends Component {

  constructor(props) {
    super(props)

    if (!this.props.user.uid) {
      browserHistory.push('/')
      return
    }

    this.battlefield = Array(25).fill().map(()=> 0)
    this.shipState   = []
    this.shipLeft    = 4

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

  handleOK() {
    if (this.shipLeft > 0) return

    this.shipState.forEach((ele, index) => {
      ele.forEach((num) => {
        this.battlefield[num] = index + 1
      })
    })

    this.props.setShip(this.props.room.id, this.battlefield, this.fieldType)
  }

  handleRollback() {
    if (this.shipLeft >= 4) return
    this.shipLeft++
    var elem = document.getElementById("ship-" + this.shipLeft)
    elem.remove()
    this.shipState.pop()
    console.log(this.shipState)
  }

  handleClickField(eleLeft, eleTop, fields) {
    if (this.shipLeft <= 0) return

    let found = false
    this.shipState.forEach(arr => {
      fields.forEach(num => {
        if (arr.indexOf(num + 1) !== -1) {
          found = true
        }
      })
    })

    if (found) return

    const widthHeight = document.getElementById('slot1').offsetWidth
    const left = widthHeight * eleLeft
    const top  = widthHeight * eleTop
    var d1 = document.getElementById('battle-field')
    const img = `<img src='${imgPlayer}' id="ship-${this.shipLeft}" style='width: ${widthHeight}px; height: ${widthHeight*2-30}px; position: absolute; top: ${top}px; left: ${left}px; z-index: 1;' />`
    d1.insertAdjacentHTML('beforeend', img)

    this.shipState.push(fields)

    this.shipLeft--
  }

  render() {
    return (
      <div className="water-wrap" id="battle-field">
        <img src={imgPlayer} className="ex-ship" alt="player" />
        <div className="player" id="slot1" onClick={ () => this.handleClickField(0, 0, [1,6]) }><span>1</span></div>
        <div className="player" onClick={ () => this.handleClickField(1, 0, [2,7]) }><span>2</span></div>
        <div className="player" onClick={ () => this.handleClickField(2, 0, [3,8]) }><span>3</span></div>
        <div className="player" onClick={ () => this.handleClickField(3, 0, [4,8]) }><span>4</span></div>
        <div className="player" onClick={ () => this.handleClickField(4, 0, [5,10]) }><span>5</span></div>
        {/*<!-- 6 -->*/}
        <div className="player" onClick={ () => this.handleClickField(0, 1, [6,11]) }><span>6</span></div>
        <div className="player" onClick={ () => this.handleClickField(1, 1, [7,12]) }><span>7</span></div>
        <div className="player" onClick={ () => this.handleClickField(2, 1, [8,13]) }><span>8</span></div>
        <div className="player" onClick={ () => this.handleClickField(3, 1, [9,14]) }><span>9</span></div>
        <div className="player" onClick={ () => this.handleClickField(4, 1, [10,15]) }><span>10</span></div>
        {/*<!-- 11 -->*/}
        <div className="player" onClick={ () => this.handleClickField(0, 2, [11,16]) }><span>11</span></div>
        <div className="player" onClick={ () => this.handleClickField(1, 2, [12,17]) }><span>12</span></div>
        <div className="player" onClick={ () => this.handleClickField(2, 2, [13,18]) }><span>13</span></div>
        <div className="player" onClick={ () => this.handleClickField(3, 2, [14,19]) }><span>14</span></div>
        <div className="player" onClick={ () => this.handleClickField(4, 2, [15,20]) }><span>15</span></div>
        {/*<!-- 16 -->*/}
        <div className="player" onClick={ () => this.handleClickField(0, 3, [16,21]) }><span>16</span></div>
        <div className="player" onClick={ () => this.handleClickField(1, 3, [17,22]) }><span>17</span></div>
        <div className="player" onClick={ () => this.handleClickField(2, 3, [18,23]) }><span>18</span></div>
        <div className="player" onClick={ () => this.handleClickField(3, 3, [19,24]) }><span>19</span></div>
        <div className="player" onClick={ () => this.handleClickField(4, 3, [20,25]) }><span>20</span></div>
        {/*<!--  21-->*/}
        <div className="player" onClick={ () => this.handleClickField(0, 3, [16,21]) }><span>21</span></div>
        <div className="player" onClick={ () => this.handleClickField(1, 3, [17,22]) }><span>22</span></div>
        <div className="player" onClick={ () => this.handleClickField(2, 3, [18,23]) }><span>23</span></div>
        <div className="player" onClick={ () => this.handleClickField(3, 3, [19,24]) }><span>24</span></div>
        <div className="player" onClick={ () => this.handleClickField(4, 3, [20,25]) }><span>25</span></div>

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
        {/*<button className="btn-start btn-pre btn-rotate" onClick={this.handleRotate}>Rotate</button>*/}
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