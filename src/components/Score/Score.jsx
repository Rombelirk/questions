import React from 'react';
import "./Score.scss"

const Score = ({ finalResult, tryAgain }) => {
    return <div className="score">
        <div className="try-again" onClick={tryAgain}>Try again</div>
        <div className="result">{finalResult.correct}/{finalResult.total}</div>
    </div>
}

export default Score;
