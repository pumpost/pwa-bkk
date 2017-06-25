import React , { Component } from 'react'

import start from '../images/star.png'

export default class ScoreBoard extends Component {
  render() {
    return (
      <div>
        <div className="home lobby-wrap">
          <h1><img src={start} alt={start} />Score Board<img src={start} alt={start} /></h1>

          <div className="lobby scoreboard">
            <ul>
              <li><a>Arthur Powell</a><span>9999</span></li>
              <li><a>Virginia Gordon</a><span>5823</span></li>
              <li><a>Diane Wong</a><span>3435</span></li>
              <li><a>Howard Kim</a><span>2345</span></li>
              <li><a>Gregory Guzman</a><span>1084</span></li>
            </ul>
          </div>

        </div>
      </div>
    );
  }
}