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
      <Part partName={props.part1} exercise={props.exercise1} />
      <Part partName={props.part2} exercise={props.exercise2} />
      <Part partName={props.part3} exercise={props.exercise3} />
    </div>
  )
}

const Total = (props) => (
  <p>Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercise1={exercises1} part2={part2} exercise2={exercises2} part3={part3} exercise3={exercises3} />
      <Total exercise1={exercises1} exercise2={exercises2} exercise3={exercises3} />
    </div>
  )
}

export default App;
