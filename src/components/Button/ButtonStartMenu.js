import React from 'react'

export default ({btnName, icName, facebookLogin, imgSrc , btnid}) => {
  return(
    <div id={btnid} className="btn-start btn-startmenu" onClick={facebookLogin}>
      <img src={imgSrc} className={`i-home i-${icName}`} alt={btnName} />
        { btnName }
    </div>
  )
}
