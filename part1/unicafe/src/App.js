import React, {useState} from 'react'

const Button = ({text, clickHandler}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const Row = ({title, value}) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  )
}

const Content = ({dataList}) => {
  if (dataList.all === 0)
    return <p>No feedback given</p>
  return (
    <div>
      <table>
        <tbody>
        {
          Object.entries(dataList).map(([key, value], index) => {
            return <Row title={key} value={value} key={index}/>
          })
        }
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const getAll = () => good + neutral + bad
  const getAverage = () => (good - bad) / getAll()
  const getPositive = () => good * 100 / getAll() + ' %'
  const getDataList = () => ({
    good,
    neutral,
    bad,
    all: getAll(),
    average: getAverage(),
    positive: getPositive(),
  })

  return (
    <div>
      <h2> give feedback</h2>
      <Button text="good" clickHandler={() => setGood(good + 1)}/>

      <Button text="neutral" clickHandler={() => setNeutral(neutral + 1)}/>

      <Button text="bad" clickHandler={() => setBad(bad + 1)}/>
      <h2>statistics</h2>
      <Content dataList={getDataList()}/>
    </div>
  )
}

export default App
