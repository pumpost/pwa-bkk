import React from 'react'

export default ({btnName, icName, facebookLogin, imgSrc }) => {
  return(
    <div className="btn-start btn-startmenu" onClick={facebookLogin}>
      <img src={imgSrc} className={`i-home i-${icName}`} alt={btnName} />
        { btnName }
    </div>
  )
}
