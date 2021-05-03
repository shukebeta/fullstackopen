import React from 'react'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>{props.partName} {props.exercise}</p>
)

const Content = (props) => {
  return (
    <div>
      {
        props.parts.map((_, index) => <Part partName={_.name} exercise={_.exercises} key={index} />)
      }
    </div>
  )
}

const Total = (props) => (
  <p>Number of exercises {props.parts.reduce((x,{exercises}) => x + exercises, 0)}</p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;
