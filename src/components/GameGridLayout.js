import React from 'react'

const shipMapTable = [
  [0,0],[1,0],[2,0],[3,0],[4,0],
  [0,1],[1,1],[2,1],[3,1],[4,1],
  [0,2],[1,2],[2,2],[3,2],[4,2],
  [0,3],[1,3],[2,3],[3,3],[4,3],
]

const genShip = (fieldId, pos, shipImg) => {
  const widthHeight = document.getElementById('slot1').offsetWidth
  const shipPos = shipMapTable[pos]
  const left = widthHeight * shipPos[0]
  const top  = widthHeight * shipPos[1]
  var d1 = document.getElementById(fieldId)
  console.log(d1)
  const img = `<img src='${shipImg}' style='width: ${widthHeight}px; height: ${widthHeight*2-30}px; position: absolute; top: ${top}px; left: ${left}px; z-index: 1;' />`
  d1.insertAdjacentHTML('beforeend', img)
}

export default ({fieldId, ship, shipImg, handleSelectTarget}) => {
  console.log(ship)
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
      genShip(fieldId, pos, shipImg)
    })
  }, 1500)

  return (
    <div id={fieldId}>
      <div className="player" id="slot1" onClick={handleSelectTarget.bind(this, 0)}><span>1</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 1)}><span>2</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 2)}><span>3</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 3)}><span>4</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 4)}><span>5</span></div>
      {/*<!-- 6 -->*/}
      <div className="player" onClick={handleSelectTarget.bind(this, 5)}><span>6</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 6)}><span>7</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 7)}><span>8</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 8)}><span>9</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 9)}><span>10</span></div>
      {/*<!-- 11 -->*/}
      <div className="player" onClick={handleSelectTarget.bind(this, 10)}><span>11</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 11)}><span>12</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 12)}><span>13</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 13)}><span>14</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 14)}><span>15</span></div>
      {/*<!-- 16 -->*/}
      <div className="player" onClick={handleSelectTarget.bind(this, 15)}><span>16</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 16)}><span>17</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 17)}><span>18</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 18)}><span>19</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 19)}><span>20</span></div>
      {/*<!--  21-->*/}
      <div className="player" onClick={handleSelectTarget.bind(this, 20)}><span>21</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 21)}><span>22</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 22)}><span>23</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 23)}><span>24</span></div>
      <div className="player" onClick={handleSelectTarget.bind(this, 24)}><span>25</span></div>
    </div>
  )
}