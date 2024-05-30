import { CiSearch } from "react-icons/ci";
import '../../styles/Students.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

const StudentsResult = () => {
    const {quizId} = useParams()
    const [students, setStudents] = useState([])
    const [title, setTitle] = useState("")
    const [countOfQuestion, setCountOfQuestion] = useState()

    const getTest = () => {
		const token = localStorage.getItem("t_token")

		axios
			.get(`http://77.240.39.57/ai/quiz/admin/${quizId}`,{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
				setTitle(result.data.result.title)
                setCountOfQuestion(result.data.result.countOfQuestion)
			})
			.catch(error => {
				console.log(error)
			})
	}
    
    const getResult = () => {
		const token = localStorage.getItem("t_token")

		axios
			.get(`http://77.240.39.57/ai/students/${quizId}/result`,{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
				console.log(result.data.result)
                setStudents(result.data.result)
			})
			.catch(error => {
				console.log(error)
			})
	}
    
    useEffect(()=>{
        getResult()
        getTest()
    }, [])
    return(
        <div className="section">
            <div className='section__head'>
                <div className="search">
                    <input placeholder="Поиск"/>
                    <CiSearch className="search__icon"/>
                </div>
            </div>
            <div className="section__header">
                <h1>Результаты теста '{title}'</h1>
            </div>
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th>
                                №
                            </th>
                            <th>
                                Имя
                            </th>
                            <th>
                                Фамилия
                            </th>
                            <th>
                                Название теста
                            </th>
                            <th>
                                Количество вопросов
                            </th>
                            <th>
                                Балл
                            </th>
                            <th>
                                Оценка
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((e, index)=>(
                        <tr>
                            <td>{index+1}</td>
                            <td>{e.firstName}</td>
                            <td>{e.lastName}</td>
                            <td>{title}</td>
                            <td>{countOfQuestion}</td>
                            <td>{e.point}</td>
                            <td>{e.percent}%</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentsResult;