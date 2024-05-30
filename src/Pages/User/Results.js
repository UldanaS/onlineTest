import { CiSearch } from "react-icons/ci";
import '../../styles/Students.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'

const Results = () => {
    const [tests, setTests] = useState([])
    const navigate = useNavigate()

    const getTest = () => {
		const token = localStorage.getItem("t_token")

		axios
			.get("http://77.240.39.57/ai/quiz/user",{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(result => {
				setTests(result.data.result)
                console.log(result.data.result)
			})
			.catch(error => {
				console.log(error)
			})
	}

    const setSpecialityFunction = (speciality) => {
        if(speciality==="is"){
            return "7М06136 - Информационные системы";
        }else if(speciality==="management"){
            return "7M06137 - IT-менеджмент"
        }else if(speciality==="chemistry"){
            return "7М07138 - Химическая технология органических веществ";
        }
        else if(speciality==="food-safety"){
            return "7М07241- Пищевая безопасность"
        }else if(speciality==="food-tech"){
            return "7М07239 - Технология продовольственных продуктов"
        }else if(speciality==="cons"){
            return "7М07242 - Технология и конструирование изделий легкой промышленности"
        }else if(speciality==="gor"){
            return "7М07252 - Горное дело"
        }else if(speciality==="neft"){
            return "7M07253 - Нефтегазовое дело"
        }
    }
    
    useEffect(()=>{
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
                <h1>Мои результаты</h1>
            </div>
            <div className="container">
                <div className='test__container'>
                    {tests.filter(item=>item.isPassed===true).length === 0 ? "Здесь пока пусто": <>
                    {tests.filter(item=>item.isPassed===true).map(e=>(
                        <div className='test__item'>
                            <h3>{setSpecialityFunction(e.speciality)}</h3>
                            <p>{e.title}</p>
                            <p>{e.countOfQuestion} вопросов</p>
                            <div className="test__icons">
                                <p onClick={()=>navigate(`/user/results/${e.id}`)}>Посмотреть результаты</p>
                            </div>
                        </div>
                    ))}
                    </>}
                </div>
            </div>
        </div>
    );
}

export default Results;