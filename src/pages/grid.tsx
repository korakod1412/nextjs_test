import React from 'react'

function grid() {
  return (
  <>
  <div className="grid grid-cols-4 gap-4 bg-red-500">
    <div>01</div>
    <div>02</div>
    <div>03</div>
    <div>04</div>
    <div>05</div>
    <div className="grid grid-cols-subgrid gap-4 col-span-3">
      <div className="col-start-2">06</div>
    </div>
  </div>
  </>
  )
}

export default grid
