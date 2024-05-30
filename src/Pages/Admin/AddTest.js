import { useEffect, useState } from 'react';
import '../../styles/AddTest.css'
import axios from 'axios'
import { BsCircleFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineQuiz } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoTimerOutline } from "react-icons/io5";

const AddTest = () => {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [countOfQuestion, setCountOfQuestion] = useState()
    const [questions, setQuestions] = useState([])
    const navigate = useNavigate()
    const {specialId} = useParams()
    const [speciality, setSpeciality] = useState("")
    const [timer, setTimer] = useState()

    const generateQuiz = () => {
        const token = localStorage.getItem("t_token")
        const formDate = new FormData();
        formDate.append("text", text);
        formDate.append("count", countOfQuestion)
		axios
			.post("http://77.240.39.57/ai/quiz/generate", formDate, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
                console.log(result.data.result)
                setQuestions(result.data.result)
			})
			.catch(error => {
				console.log(error)
			})
    }

    const createQuiz = () => {
        const token = localStorage.getItem("t_token")
      
		axios
			.post("http://77.240.39.57/ai/quiz", {
                countOfQuestion,
                questions,
                title,
                "speciality" : specialId,
                'timer' : String(timer)
            }, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
                console.log(result.data)
                toast.success("Успешно создался")
                setQuestions([])
                navigate('/admin/test')
			})
			.catch(error => {
				console.log(error)
			})
    }

    useEffect(()=>{
        console.log(specialId)
    }, [])

    return(
        <div className="section">
            <div className="section__header">
                <h1>Создать Тест</h1>
            </div>
            <div className="container">
                <div className="add__test-form">
                    <div className='form_box'>
                        <label className="form_label">Название теста</label>
                        <div className="form__input">
                            <MdOutlineQuiz className="login__icon"/>
                            <input
                                className="input"
                                type="text"
                                minLength={4}
                                maxLength={50}
                                placeholder="Тест"
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='form_box'>
                        <label className="form_label">Количество вопросов</label>
                        <div className="form__input number">
                            <AiOutlineQuestionCircle className="login__icon"/>
                            <input
                                className="input"
                                type="number"
                                minLength={4}
                                maxLength={50}
                                placeholder=""
                                value={countOfQuestion}
                                onChange={(e)=>setCountOfQuestion(e.target.valueAsNumber)}
                            />
                        </div>
                    </div>

                    <div className='form_box'>
                        <label className="form_label">Ограничение времени</label>
                        <div className="form__input number">
                            <IoTimerOutline className="login__icon"/>
                            <input
                                className="input"
                                type="number"
                                minLength={4}
                                maxLength={50}
                                placeholder="минут"
                                value={timer}
                                onChange={(e)=>setTimer(e.target.valueAsNumber)}
                            />
                        </div>
                    </div>
                </div>
                <div className="form__textarea">
                    <textarea
                        className="textarea"
                        type="number"
                        placeholder="Поставьте текста"
                        value={text}
                        onChange={(e)=>setText(e.target.value)}
                    />
                </div>
                <div className="section__header">
                    <div></div>
                    <button onClick={()=>generateQuiz()} className='orange__button'>Создать Тест</button>
                </div>
                {questions.length === 0 ? "" :
                <div className='question__section'>
                    {questions.map((e, index) => (
                    <div className='question'>
                        <p className='question__title'>{e.id}. {e.title} </p>
                        {e.variants.map((j, i)=>(
                            <div>
                                <p><BsCircleFill className='marker'/>{j.title}</p>
                            </div>
                        ))}
                        <p>Правильный ответ: {e.correctAnswer}</p>
                    </div>
                    ))}
                </div>
                }
                {questions.length === 0 ? "" :
                <div className="section__header">
                    <div></div>
                    <button onClick={()=>createQuiz()} className='orange__button'>Отправить</button>
                </div>
                }
            </div>
        </div>
    );
};

export default AddTest;