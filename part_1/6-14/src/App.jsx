import { useState } from 'react'

const Header = ({header}) => <h1>{header}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistic = ({text, value}) => <div>{text} {value}</div>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  const all = good + neutral + bad
  const average = (good + bad*(-1)) / (good + neutral + bad)
  const positive = good / (good + neutral + bad)

  return (
    <div>
      <Header header="give feedback"/>

      <Button text="good" onClick={() => handleGoodClick()}/>
      <Button text="neutral" onClick={() => handleNeutralClick()}/>
      <Button text="bad" onClick={() => handleBadClick()}/>

      <Header header="statistics"/>

      <Statistic text="good" value={good}/> 
      <Statistic text="neutral" value={neutral}/>
      <Statistic text="bad" value={bad}/>
      <Statistic text="all" value={all}/>
      <Statistic text="average" value={average}/>
      <Statistic text="positive" value={positive*100 + ' %'}/>
    </div>
  )
}

export default App