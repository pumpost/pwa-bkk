import React , { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { room } from '../actions'

import imgPlayer from '../images/player.png'

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

  render() {
    return (
      <div className="water-wrap">
        <img src={imgPlayer} className="ex-ship" alt="player" />
        <div className="player"><span>1</span></div>
        <div className="player"><span>2</span></div>
        <div className="player"><span>3</span></div>
        <div className="player"><span>4</span></div>
        <div className="player"><span>5</span></div>
        {/*<!-- 6 -->*/}
        <div className="player"><span>6</span></div>
        <div className="player"><span>7</span></div>
        <div className="player"><span>8</span></div>
        <div className="player"><span>9</span></div>
        <div className="player"><span>10</span></div>
        {/*<!-- 11 -->*/}
        <div className="player"><span>11</span></div>
        <div className="player"><span>12</span></div>
        <div className="player"><span>13</span></div>
        <div className="player"><span>14</span></div>
        <div className="player"><span>15</span></div>
        {/*<!-- 16 -->*/}
        <div className="player"><span>16</span></div>
        <div className="player"><span>17</span></div>
        <div className="player"><span>18</span></div>
        <div className="player"><span>19</span></div>
        <div className="player"><span>20</span></div>
        {/*<!--  21-->*/}
        <div className="player"><span>21</span></div>
        <div className="player"><span>22</span></div>
        <div className="player"><span>23</span></div>
        <div className="player"><span>24</span></div>
        <div className="player"><span>25</span></div>
        {/*<input type="text" onChange={this.handleShipPosition} value={this.state.shipPosition} />*/}
        <button className="btn-start btn-pre btn-rotate">Rotate</button>
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