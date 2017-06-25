import React from 'react'

export default (props) => {

  if( document.body.className.match('bg') || document.body.className.match('home-bg-top')  ) {
    document.body.className = 'bg-water'
  }

  return (
    <div>
      {props.children}
    </div>
  )
}