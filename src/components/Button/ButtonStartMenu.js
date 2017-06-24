import React from 'react'

export default ({btnName, icName, facebookLogin}) => {
  return(
    <div className="btn-start btn-startmenu" onClick={facebookLogin}>
      <img src={`images/${icName}.png`} className={`i-home i-${icName}`} />
        { btnName }
    </div>
  )
}