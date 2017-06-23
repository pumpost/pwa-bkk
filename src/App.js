import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Layout from './components/Layout'

import StartMenu from './containers/StartMenu'
import Lobby from './containers/Lobby'
import Room from './containers/Room'
import PreGame from './containers/PreGame'
import Game from './containers/Game'
import Score from './containers/Score'
import ScoreBoard from './containers/ScoreBoard'

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={StartMenu} />
        <Route path="lobby" component={Lobby} />
        <Route path="room" component={Room} />
        <Route path="pre-game" component={PreGame} />
        <Route path="game" component={Game} />
        <Route path="score" component={Score} />
        <Route path="score-board" component={ScoreBoard} />
      </Route>
    </Router>
  )
}
