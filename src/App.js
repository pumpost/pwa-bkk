import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Layout from './components/Layout'
import LayoutGame from './components/LayoutGame'
import LayoutCongrats from './components/LayoutCongrats'

import StartMenu from './containers/StartMenu'
import Lobby from './containers/Lobby'
import Room from './containers/Room'
import PreGame from './containers/PreGame'
import Game from './containers/Game'
import Score from './containers/Score'
import ScoreBoard from './containers/ScoreBoard'
import Congrats from './containers/Congrats'


export default () => {
  
  Notification.requestPermission()

  return (
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={StartMenu} />
        <Route path="lobby" component={Lobby} />
        <Route path="room/:roomId" component={Room} />
        <Route path="score" component={Score} />
        <Route path="score-board" component={ScoreBoard} />
      </Route>
      <Route path="/" components={LayoutGame}>
        <Route path="pre-game" component={PreGame} />
        <Route path="game" component={Game} />
      </Route>
      <Route path="/" components={LayoutCongrats}>
        <Route path="congrats" component={Congrats} />
      </Route>
    </Router>
  )
}
