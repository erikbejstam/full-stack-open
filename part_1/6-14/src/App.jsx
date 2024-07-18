import { useState } from 'react'

const Header = ({header}) => <h1>{header}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistic = ({text, value}) => <div>{text} {value}</div>

const Statistics = ({statistics}) => {
  const {lines} = statistics

  const listItems  = lines.map(statistic => <Statistic key={statistic.text} text={statistic.text} value={statistic.value}/>)
  console.log(lines[3].value)
  return(
    <div>
      <h1>statistics</h1>
      {lines[3].value ? 
        listItems
        : <div> No feedback given</div> 
      }
    </div>
  )
}


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
  const average = all ? (good - bad) / all : 0
  const positive = all ? good / all : 0

  const statistics = {
    lines : [
      {text: 'good', value: good},
      {text: 'neutral', value: neutral},
      {text: 'bad', value: bad},
      {text: 'all', value: all},
      {text: 'average', value: average},
      {text: 'positive', value: positive*100 + ' %'}
    ]
  }

  return (
    <div>
      <Header header="give feedback"/>

      <Button text="good" onClick={() => handleGoodClick()}/>
      <Button text="neutral" onClick={() => handleNeutralClick()}/>
      <Button text="bad" onClick={() => handleBadClick()}/>

      <Statistics statistics={statistics}/>
    </div>
  )
}

export default App