import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/TestById.css'
import { BsCircleFill } from "react-icons/bs";
import { useEffect, useState } from 'react';
import axios from 'axios';

const TestById = () => {
    const navigate = useNavigate()
    const {quizId} = useParams()
    const [quiz, setQuiz] = useState({})
    const [questions, setQuestions] = useState([])

    const getTest = () => {
		const token = localStorage.getItem("t_token")

		axios
			.get(`http://77.240.39.57/ai/quiz/admin/${quizId}`,{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
				setQuiz(result.data.result)
                console.log(result.data.result)
                setQuestions(result.data.result.questions)
			})
			.catch(error => {
				console.log(error)
			})
	}

    useEffect(()=>{
        getTest()
    }, [])
    return(
        <div className="section">
            <div className="section__header">
                <h1>{quiz.title}</h1>
                <button onClick={()=>navigate(`/admin/test/${quizId}/add`)} className='orange__button'>Добавить студентов</button>
            </div>
            <div className="container">
                <p>Количество вопросов: {quiz.countOfQuestion}</p>
                <p>Пройдено: {quiz.passedCount}</p>
                <div className="testById">
                    <ol>
                        {questions.map((e)=>(
                        <li>
                            <h4>{e.title}</h4>
                            <div className="test__answers">
                                {e.variants.map(j=>(
                                    <p><BsCircleFill className='marker'/>{j.title}</p>
                                ))}
                                    <p>Правильный ответ: {e.correctAnswer}</p>  
                            </div>
                        </li>
                        ))}
                    </ol>
                    
                </div>
            </div>
        </div>
    );
};

export default TestById;