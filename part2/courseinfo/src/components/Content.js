import React from 'react'
import Part from "./Part";
import {nanoid} from 'nanoid'

const Content = (props) => {
  return (
    <div>
      {
        props.parts.map((_, index) => <Part partName={_.name} exercise={_.exercises} key={nanoid()} />)
      }
    </div>
  )
}

export default Content
