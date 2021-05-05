import React from 'react'

const shipMapTable = [
  [0,0],[1,0],[2,0],[3,0],[4,0],
  [0,1],[1,1],[2,1],[3,1],[4,1],
  [0,2],[1,2],[2,2],[3,2],[4,2],
  [0,3],[1,3],[2,3],[3,3],[4,3],
]

const genShip = (fieldId, pos, shipImg, type) => {
  const widthHeight = document.getElementById(type + '-slot1').offsetWidth
  const shipPos = shipMapTable[pos]
  const left = widthHeight * shipPos[0]
  const top  = widthHeight * shipPos[1]
  var d1 = document.getElementById(fieldId)
  const img = `<img src='${shipImg}' style='width: ${widthHeight}px; height: ${widthHeight*2-30}px; position: absolute; top: ${top}px; left: ${left}px; z-index: 1;' />`
  d1.insertAdjacentHTML('beforeend', img)
}

export default ({fieldId, ship, shipImg, handleSelectTarget, type, fire}) => {
  let position = []
  let found = []
  for (let i in ship) {
    const item = ship[i]
    if (item !== 0 && found.indexOf(item) === -1) {
      found.push(item)
      position.push(i)
    }
  }

  setTimeout(() => {
    position.forEach((pos) => {
      genShip(fieldId, pos, shipImg, type)
    })
  }, 1500)

  const mark = []
  for (let index in fire) {
    if(fire[index].hasOwnProperty(type)) {
      mark.push(fire[index][type])
    }
  }

  const cssClass = "player " + "player-" + type
  return (
    <div id={fieldId}>
      { shipMapTable.map((arr, index) => {
          const id = type + '-slot' + index
          const style = (mark.indexOf(index) !== -1) ? {border: 'red solid 2px'} : {}
          return  <div key={id} className={cssClass} style={style} id={id} onClick={handleSelectTarget.bind(this, id, index, type)}><span>{index+1}</span></div>
      }) }
    </div>
  )
}