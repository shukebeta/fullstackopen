import React from 'react'

const Total = (props) => (
  <p><b>Total of {props.parts.reduce((x,{exercises}) => x + exercises, 0)} exercises</b></p>
)

export default Total
