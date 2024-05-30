import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import '../../styles/Test.css'
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import { ConfirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/lara-light-indigo/theme.css'

const Test = () => {
    const [tests, setTests] = useState([])
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const [idQuiz, setIdQuiz] = useState()

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
            <div className='head__rectangle'><div className='head__circle'></div></div>
            <div className="section__header">
                <h1>Тесты</h1>
            </div>
            <div className="container">
                <div className='test__container'>
                    {tests.length === 0 ? "Здесь пока пусто" : <>
                    {tests.map(e=>(
                        <div className='test__item'>
                            <h3>{setSpecialityFunction(e.speciality)}</h3>
                            <p>{e.title}</p>
                            <p>{e.countOfQuestion} вопросов</p>
                            <div className="test__icons">
                                {e.isPassed === true ? <p className="">Пройдено</p>:
                                <p onClick={()=> {setIdQuiz(e.id); setVisible(true)}}>Начать тест</p>
                                }
                            </div>
                        </div>
                    ))}
                    </>}
                </div>
            </div>
            <ConfirmDialog visible={visible} 
                    onHide={() => setVisible(false)} 
                    header="Начинать тест?" 
                    reject={()=>setVisible(false)} 
                    accept={() => navigate(`/user/test/${idQuiz}`)}
                    acceptLabel="Да"
                    rejectLabel="Нет"
                />
        </div>
    );
};

export default Test;