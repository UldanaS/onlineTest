import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa6";
import { FaDeleteLeft } from "react-icons/fa6";
import { toast } from "react-toastify";

const AddStudents = () => {
    const {quizId} = useParams() 
    const [title, setTitle] = useState("")
    const [students, setStudents] = useState([])
    const [idStudent, setIdStudent] = useState()
    const [addedStudents, setAddedStudents] = useState([])
    const [isTrue, setIsTrue] = useState(false)

    const getTestById = () => {
		const token = localStorage.getItem("t_token")

		axios
			.get(`http://77.240.39.57/ai/quiz/admin/${quizId}`,{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
                setTitle(result.data.result.title)
                
			})
			.catch(error => {
				console.log(error)
			})
	}

    const getAllStudents= () => {
		const token = localStorage.getItem("t_token")

		axios
			.get(`http://77.240.39.57/ai/students`,{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
                setStudents(result.data.result)
			})
			.catch(error => {
				console.log(error)
			})
	}

    const getStudentsByQuiz= () => {
		const token = localStorage.getItem("t_token")

		axios
			.get(`http://77.240.39.57/ai/students/${quizId}`,{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
                setAddedStudents(result.data.result)
			})
			.catch(error => {
				console.log(error)
			})
	}

    const addToStudents = () => {
        const token = localStorage.getItem("t_token")

		axios
			.post(`http://77.240.39.57/ai/students/quiz/add?quizId=${quizId}&studentId=${idStudent}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
                setIsTrue(true)
                console.log(result.data.result)
                toast.success("Студент добавлен")
			})
			.catch(error => {
				console.log(error)
			})
    }

    const deleteAddedStudent =(id) => {
        const token = localStorage.getItem("t_token")

		axios
			.delete(`http://77.240.39.57/ai/students/quiz/${quizId}/delete/${id}`,{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
                console.log(result.data)    
                toast.success("Студент удалился")
                setIsTrue(true)
			})
			.catch(error => {
				console.log(error)
			})
    }

    useEffect(()=>{
        getTestById()
        getAllStudents()
        getStudentsByQuiz()
        setIsTrue(false)
    }, [isTrue])
    return(
        <div className="section">
            <div className="section__header">
                <h2>Добавить студентов на '{title}'</h2>
            </div>
            <div className="container">
                <div className="add__students">
                <div className="form_box">
                    <label className="form_label">Выберите студент</label>
                    <div  className="form__input">
                        <FaUserPlus className="login__icon"/>
                        <select onChange={(e)=>setIdStudent(e.target.value)} className="input">
                            <option value="">Студент</option>
                            {students.map(e=>(
                                <option value={e.id}>{e.firstName} {e.lastName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button onClick={()=>addToStudents()} className="orange__button">Добавить</button>
                </div>
                <div className="add__students-quiz">
                    <h4>Список добавленных студентов</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Студенты</th>
                                <th>Удалить</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addedStudents.map((e,index)=>(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{e.firstName} {e.lastName}</td>
                                    <td><FaDeleteLeft onClick={()=>deleteAddedStudent(e.id)}/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AddStudents;