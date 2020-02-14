import React, { useState } from 'react';
import Questions from './components/Questions/Questions'
import Score from './components/Score/Score'

const App = () => {
  const [finalResult, setFinalResult] = useState(null)
  const completeTesting = (result) => {
    setFinalResult(result)
  }
  const tryAgain = () => {
    setFinalResult(null);
  }
  if (finalResult === null) {
    return <Questions completeTesting={completeTesting} />
  }
  return <Score tryAgain={tryAgain} finalResult={finalResult} />
}

export default App;
