import React, { Component } from 'react'

import star from '../images/star.png'

class Congrats extends Component {
  render() {
    return(
      <div className="congrats">
        <div className="congrats-inner">
          <div className="detail">
            <div className="star">
              <img src={star} alt={star} />
                <img src={star}  alt={star}/>
                  <img src={star} alt={star} />
            </div>
            <h3>Congratulation</h3>
            <p className="winner">sdfksdf;dskfl;skd;</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Congrats