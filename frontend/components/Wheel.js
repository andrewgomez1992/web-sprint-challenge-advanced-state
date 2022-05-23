import React, { useState } from 'react'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Wheel(props) {
  // console.log(props)

  const initialWheel = ["B", null, null, null, null, null]
  const [wheels, setWheels] = useState(initialWheel)
  const { wheel, moveClockwise, moveCounterClockwise } = props;

  const handleClockwise = () => {
    props.moveClockwise()
  }

  const handleCounterClockwise = () => {
    props.moveCounterClockwise()
  }

  return (
    <div id="wrapper">
      <div id="wheel">
        {
          wheels.map((val, idx) => {
            return (
              <div key={idx} style={{ "--i": idx }} className={`cog ${wheels[idx] ? " cog active" : ""}`}>{val}</div>
            )
          })
        }
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleCounterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleClockwise}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect(st => st, actionCreators)(Wheel)
