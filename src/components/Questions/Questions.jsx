import React, { useEffect, useState } from 'react';
import cn from 'classnames'
import axios from "axios";
import "./Questions.scss"

export const insertAnswerToRandomIndex = (correctAnswer, incorrectAnswers) => {
    if (!Array.isArray(incorrectAnswers) || !correctAnswer) {
        return []
    }
    const clonedIncorrectAnswers = incorrectAnswers.slice()
    const randomIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1))
    clonedIncorrectAnswers.splice(randomIndex, 0, correctAnswer)
    return clonedIncorrectAnswers;
}

export const getAnswerClassName = (question, answer) => {
    const correct = question.givenAnswer !== null &&
        answer === question.correct_answer;
    const wrong = question.givenAnswer === answer &&
        answer !== null &&
        answer !== question.correct_answer;
    return cn({
        answer: true,
        correct,
        wrong,
        neutral: !correct && !wrong,
    })
}

export const replaceSpecialSymbols = (string) => {
    return string
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, '′')
        .replace(/&#38;/g, '&');	
}

export const getFinalResult = (results) => {
    const result = {
        correct: results.reduce((acc, curr) => {
            if (curr.givenAnswer === curr.correct_answer) {
                return acc + 1
            }
            return acc;
        }, 0), total: results.length
    }
    return result;
}

const Questions = ({ completeTesting }) => {
    const [results, setResults] = useState(() => []);
    useEffect(() => {
        axios.get("https://opentdb.com/api.php?amount=10").then(result =>
            setResults(result.data.results.map(el => {
                return {
                    ...el,
                    givenAnswer: null,
                    question: replaceSpecialSymbols(el.question),
                    answers: insertAnswerToRandomIndex(
                        replaceSpecialSymbols(el.correct_answer),
                        el.incorrect_answers.map(el => replaceSpecialSymbols(el))
                    )
                }
            }))
        ).catch(err => alert(err.message));
    }, [])

    const onQuestionAnswered = (question, answer ,results) => {
        const index = results.findIndex(result => result.question === question);
        if (results[index].givenAnswer) return false;
        const newResults = results.slice();
        newResults[index].givenAnswer = answer;
        setResults(newResults)
        if (newResults.findIndex(el => el.givenAnswer === null) === -1) {
            setTimeout(() => completeTesting(getFinalResult(results)), 500)
        }
    }

    return (
        <div className="questions">
            {
                results.map((result, index) => {
                    return <div className={"question-item"} key={index}>
                        <div className="question-text">{result.question}</div>
                        <div className="answers">
                            {
                                result.answers.map((answer, index) => {
                                    return <div
                                        key={index}
                                        onClick={() => onQuestionAnswered(result.question, answer, results)}
                                        className={getAnswerClassName(result, answer)}>{answer}</div>
                                })
                            }
                        </div>
                    </div>
                })
            }
        </div>
    );
}

export default Questions;
