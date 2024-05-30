import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import { toast } from "react-toastify";

const TestById = () => {
    const {quizId} = useParams()
    const [test, setTest] = useState({})
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([]);
    const [point, setPoint] = useState(0)
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    const [isPassed, setIsPassed] = useState()

    const [timeLeft, setTimeLeft] = useState(60); // 300 секунд = 5 минут
    const [testCompleted, setTestCompleted] = useState(false);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
      };

    const handleAnswer = (questionId, answer) => {
        //setAnswers({ ...answers, [questionId]: answer });
        const newArray = [...answers]
        newArray[questionId]=(answer)
        setAnswers(newArray)
    };

    const EndTest = () => {
        let p=0
        let c=0
        {questions.map((e, index)=> (
            <>
            {console.log(answers[index], e.correctAnswer)}
            {e.correctAnswer === answers[index] ? p++ : ""}
            </>
            ))}

        {answers.map((e, index)=>(
            <>
                {e.length > 0 ? c++  : ""}
            </>
        ))}

        if(questions.length != c && !testCompleted){
            alert("Вы полностью не ответили")
        }else{                                                               
            quizSubmit(p)
        }
    }

    const getTest = () => {
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
                setIsPassed(result.data.result.isPassed)
                setTimeLeft(Number(result.data.result.timer)*60)
			})
			.catch(error => {
				console.log(error)
			})
	}

    const quizSubmit = (p) => {
        const token = localStorage.getItem("t_token")

		axios
			.post(`http://77.240.39.57/ai/quiz/submit/${quizId}`,{
                "points" : p,
                answers
            },{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
				console.log(result)
                setPoint(p)
                setVisible(true)
			})
			.catch(error => {
				console.log(error)
			})
    }

    const handleSubmit = () => {
        setTestCompleted(true);
        EndTest()
        alert('Время вышло! Тест завершен.');
    };

    useEffect(()=>{
        getTest()
    }, [])
    
    useEffect(()=>{

        if (timeLeft > 0 && !testCompleted) {
            const timerId = setInterval(() => {
              setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else if (timeLeft === 0) {
            handleSubmit();
        }
    },[timeLeft, testCompleted])
    
    return(
        <div className="section">
            <div className="section__header">
                <h1>{test.title}</h1>
            </div>
            <div className="container">
                {!testCompleted ? (
                <div>
                <p>Количество вопросов: {test.countOfQuestion}</p>
                <h3>Оставшееся время: {formatTime(timeLeft)}</h3>
                <div className="testById">
                    <ol>
                        {questions.map((e, index)=>(
                        <li>
                            <h4>{e.title}</h4>
                            <div className="test__answers">
                                {e.variants.map(j=>(
                                    <div className="flex">
                                        <input 
                                            type="radio" 
                                            value={answers[index]}
                                            onChange={()=>handleAnswer(index,j.title)}
                                            className="radio"
                                            checked={j.title===answers[index]}
                                        />
                                        <p>{j.title}</p>
                                    </div>
                                ))}  
                            </div>
                        </li>
                        ))}
                    </ol>
                    <button onClick={()=>EndTest()} className="orange__button">Завершить</button>
                
                </div>
                </div>
                ) : (
                    <div>Тест завершен.</div>
                  )}
            </div>
            <ConfirmDialog visible={visible} 
                    onHide={() => setVisible(false)} 
                    header={`Вы получили ${point} из ${test.countOfQuestion}`} 
                    accept={() => navigate(`/user/test`)}
                    reject={() => navigate(`/user/test`)}
                    acceptLabel="Да"
                    rejectLabel="."
                />
        </div>
    );
};

export default TestById;