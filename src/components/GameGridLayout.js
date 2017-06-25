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

export default ({fieldId, ship, shipImg}) => {
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
      <div className="player" id="slot1"><span>1</span></div>
      <div className="player"><span>2</span></div>
      <div className="player"><span>3</span></div>
      <div className="player"><span>4</span></div>
      <div className="player"><span>5</span></div>
      {/*<!-- 6 -->*/}
      <div className="player"><span>6</span></div>
      <div className="player"><span>7</span></div>
      <div className="player"><span>8</span></div>
      <div className="player"><span>9</span></div>
      <div className="player"><span>10</span></div>
      {/*<!-- 11 -->*/}
      <div className="player"><span>11</span></div>
      <div className="player"><span>12</span></div>
      <div className="player"><span>13</span></div>
      <div className="player"><span>14</span></div>
      <div className="player"><span>15</span></div>
      {/*<!-- 16 -->*/}
      <div className="player"><span>16</span></div>
      <div className="player"><span>17</span></div>
      <div className="player"><span>18</span></div>
      <div className="player"><span>19</span></div>
      <div className="player"><span>20</span></div>
      {/*<!--  21-->*/}
      <div className="player"><span>21</span></div>
      <div className="player"><span>22</span></div>
      <div className="player"><span>23</span></div>
      <div className="player"><span>24</span></div>
      <div className="player"><span>25</span></div>
    </div>
  )
}