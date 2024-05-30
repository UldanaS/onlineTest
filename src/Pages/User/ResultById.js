import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

const ResultById = () => {
    const [test, setTest] = useState({})
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([]);
    const {quizId} = useParams()
    const [point, setPoint] = useState()
    const [percent, setPercent] = useState()
    
    const getQuiz = () => {
		const token = localStorage.getItem("t_token")

		axios
			.get(`http://77.240.39.57/ai/quiz/user/${quizId}`,{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
				setTest(result.data.result)
                setQuestions(result.data.result.questions)
			})
			.catch(error => {
				console.log(error)
			})
	}

    const getAnswer = () => {
		const token = localStorage.getItem("t_token")

		axios
			.get(`http://77.240.39.57/ai/students/quiz/${quizId}/result`,{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
				setAnswers(result.data.result.answers)
                setPoint(result.data.result.point)
                setPercent(result.data.result.percent)
                console.log(result.data.result)
			})
			.catch(error => {
				console.log(error)
			})
	}

    useEffect(()=>{
        getQuiz()
        getAnswer()
    }, [])

    return(
        <div className="section">
            <div className="section__header">
                <h1>{test.title}</h1>
            </div>
            <div className="container">
                <p>Количество вопросов: {test.countOfQuestion}</p>
                <p>Количество правильных ответов: <b>{point}</b></p>
                <p>Ваш балл: <b>{percent} % </b></p>
                <div className="testById">
                    <ol>
                        {questions.map((e, index)=>(
                        <li>
                            <h4>{e.title}</h4>
                            <div className="test__answers">
                                  <p>Правильный ответ: {e.correctAnswer} </p>
                                    <p>Ваш ответ: {answers[index]}</p>
                            </div>
                        </li>
                        ))}
                    </ol>
                </div>
            </div>

        </div>
    );
};

export default ResultById;