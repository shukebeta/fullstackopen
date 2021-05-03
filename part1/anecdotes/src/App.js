import React, { useState } from 'react'

const Button = ({text, clickHandler}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const HasVotes = ({voteCount}) => {
  return <p>Has {voteCount} votes</p>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [voteCounts, setVoteCounts] = useState(new Array(anecdotes.length).fill(0))
  const getHandleClick = (index) => {
    return () => {
      const newVoteCounts = [...voteCounts]
      newVoteCounts[index] += 1
      setVoteCounts(newVoteCounts)
    }
  }

  const getMaxVotes = () => Math.max(...voteCounts)
  const getAnecdoteWithMostVotes = () => {
    const maxVotes = getMaxVotes()
    const index = voteCounts.indexOf(maxVotes)
    return anecdotes[index]
  }

  const getRandomIndex = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  const [selected, setSelected] = useState(0)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>has {voteCounts[selected]} votes</p>
      <Button text="vote" clickHandler={getHandleClick(selected)} />
      <Button text="next anecdote" clickHandler={() => {
        const randomIndex = getRandomIndex()
        setSelected(randomIndex)
      }} />
      <h2>Anecdote with most votes</h2>
      {getAnecdoteWithMostVotes()}
      <HasVotes voteCount={getMaxVotes()} />
    </div>
  )
}

export default App
