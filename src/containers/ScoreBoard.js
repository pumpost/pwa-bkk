import React , { Component } from 'react'
import { Link } from 'react-router'

import start from '../images/star.png'

export default class ScoreBoard extends Component {
  render() {
    return (
      <div>
        <div className="home lobby-wrap">
          <div className="btn-wrap">
            <Link to="/" className="btn-gress btn-back">Back</Link>
          </div>
          <h1><img src={start} alt={start} />Score Board<img src={start} alt={start} /></h1>

          <div className="lobby scoreboard">
            <ul>
              <li><a>Arthur Powell</a><span>9999</span></li>
              <li><a>Virginia Gordon</a><span>5823</span></li>
              <li><a>Diane Wong</a><span>3435</span></li>
              <li><a>Howard Kim</a><span>2345</span></li>
              <li><a>Gregory Guzman</a><span>1768</span></li>
              <li><a>Frances Weaver</a><span>1336</span></li>
              <li><a>Douglas Parker</a><span>932</span></li>
            </ul>
          </div>

        </div>
      </div>
    );
  }
}