import React from 'react'
import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      {
        props.parts.map((_, index) => <Part partName={_.name} exercise={_.exercises} key={index} />)
      }
    </div>
  )
}

export default Content
